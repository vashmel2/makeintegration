"use client"

import { useEffect, useState, useCallback } from "react"
import { Copy, Check, RefreshCw, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { RequestList } from "./RequestList"
import { RequestDetail } from "./RequestDetail"
import type { WebhookRequest } from "./types"

function generateSessionToken(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function InspectorPanel() {
  const [sessionToken, setSessionToken] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [requests, setRequests] = useState<WebhookRequest[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  const webhookUrl =
    sessionToken && typeof window !== "undefined"
      ? `${window.location.origin}/api/wh/${sessionToken}`
      : ""

  // Initialize or restore session
  const initSession = useCallback(
    async (token?: string) => {
      setLoading(true)
      const t = token || generateSessionToken()

      // Try to find existing session
      const { data: existing } = await supabase
        .from("webhook_sessions")
        .select("id, session_token")
        .eq("session_token", t)
        .single()

      if (existing) {
        setSessionToken(existing.session_token)
        setSessionId(existing.id)

        // Load existing requests
        const { data: reqs } = await supabase
          .from("webhook_requests")
          .select("*")
          .eq("session_id", existing.id)
          .order("received_at", { ascending: false })

        setRequests((reqs as WebhookRequest[]) || [])
      } else {
        // Create new session
        const { data: newSession } = await supabase
          .from("webhook_sessions")
          .insert({ session_token: t })
          .select("id, session_token")
          .single()

        if (newSession) {
          setSessionToken(newSession.session_token)
          setSessionId(newSession.id)
          setRequests([])
        }
      }

      // Store in URL without reload
      const url = new URL(window.location.href)
      url.searchParams.set("session", t)
      window.history.replaceState({}, "", url.toString())

      setLoading(false)
    },
    [supabase]
  )

  // On mount: restore from URL param or localStorage
  useEffect(() => {
    const url = new URL(window.location.href)
    const fromUrl = url.searchParams.get("session")
    const fromStorage = localStorage.getItem("wh-inspector-session")
    initSession(fromUrl || fromStorage || undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Save session token to localStorage
  useEffect(() => {
    if (sessionToken) {
      localStorage.setItem("wh-inspector-session", sessionToken)
    }
  }, [sessionToken])

  // Supabase Realtime subscription
  useEffect(() => {
    if (!sessionId) return

    const channel = supabase
      .channel(`wh-${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "webhook_requests",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          const newReq = payload.new as WebhookRequest
          setRequests((prev) => [newReq, ...prev])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [sessionId, supabase])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(webhookUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleNewSession = () => {
    setSelectedId(null)
    setRequests([])
    initSession()
  }

  const handleClearRequests = async () => {
    if (!sessionId) return
    await supabase
      .from("webhook_requests")
      .delete()
      .eq("session_id", sessionId)
    setRequests([])
    setSelectedId(null)
  }

  const selectedRequest = requests.find((r) => r.id === selectedId) || null

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Setting up session...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Endpoint URL bar */}
      <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex-1">
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            Your webhook endpoint
          </label>
          <div className="flex items-center gap-2">
            <code className="flex-1 truncate rounded-lg bg-muted px-3 py-2 text-sm font-mono">
              {webhookUrl}
            </code>
            <button
              onClick={handleCopy}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border transition-colors hover:bg-muted"
              title="Copy URL"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
        <div className="flex gap-2 sm:self-end">
          <button
            onClick={handleClearRequests}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            title="Clear all requests"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </button>
          <button
            onClick={handleNewSession}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            New Session
          </button>
        </div>
      </div>

      {/* Live indicator */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
        </span>
        Listening for incoming requests...
        <span className="ml-auto">{requests.length} request{requests.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Inspector split view */}
      <div className="grid min-h-[500px] gap-4 lg:grid-cols-[320px_1fr]">
        <RequestList
          requests={requests}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <RequestDetail request={selectedRequest} />
      </div>
    </div>
  )
}
