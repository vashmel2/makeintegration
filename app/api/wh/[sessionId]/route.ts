import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

async function handleWebhook(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params
  const supabase = createServerClient()

  // Verify session exists
  const { data: session } = await supabase
    .from("webhook_sessions")
    .select("id")
    .eq("session_token", sessionId)
    .single()

  if (!session) {
    return NextResponse.json(
      { error: "Session not found or expired" },
      { status: 404 }
    )
  }

  // Parse body
  let body: unknown = null
  let rawBody = ""
  try {
    rawBody = await req.text()
    body = rawBody ? JSON.parse(rawBody) : null
  } catch {
    body = null
  }

  // Extract headers
  const headers: Record<string, string> = {}
  req.headers.forEach((value, key) => {
    headers[key] = value
  })

  // Extract query params
  const queryParams: Record<string, string> = {}
  req.nextUrl.searchParams.forEach((value, key) => {
    queryParams[key] = value
  })

  // Store the request
  const { error } = await supabase.from("webhook_requests").insert({
    session_id: session.id,
    method: req.method,
    headers,
    body,
    raw_body: rawBody,
    query_params: queryParams,
    ip_address:
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown",
  })

  if (error) {
    return NextResponse.json(
      { error: "Failed to store request" },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true, message: "Webhook received" })
}

export const GET = handleWebhook
export const POST = handleWebhook
export const PUT = handleWebhook
export const PATCH = handleWebhook
export const DELETE = handleWebhook
