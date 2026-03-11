import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_BODY_BYTES = 64 * 1024          // 64 KB
const MAX_REQUESTS_PER_SESSION = 25       // hard cap on stored requests
const SESSION_MAX_AGE_MS = 2 * 60 * 60 * 1000  // 2 hours
const RATE_LIMIT_WINDOW_MS = 60 * 1000   // 1 minute window
const RATE_LIMIT_MAX = 10                 // max requests per session per minute

// ---------------------------------------------------------------------------
// In-memory rate limiter
// Tracks hit counts per session token within a rolling window.
// Not perfect across multiple serverless instances but still effective
// as a first line of defence against rapid hammering on a single instance.
// ---------------------------------------------------------------------------

const rateLimitMap = new Map<string, { count: number; windowStart: number }>()

function isRateLimited(sessionId: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(sessionId)

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(sessionId, { count: 1, windowStart: now })
    return false
  }

  entry.count++
  if (entry.count > RATE_LIMIT_MAX) return true
  return false
}

// Prune stale entries occasionally to avoid memory leak
function pruneRateLimitMap() {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
      rateLimitMap.delete(key)
    }
  }
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

async function handleWebhook(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params

  // 1. Rate limit check (fast, no DB hit)
  if (isRateLimited(sessionId)) {
    if (Math.random() < 0.05) pruneRateLimitMap()
    return NextResponse.json(
      { error: "Too many requests. Slow down." },
      { status: 429 }
    )
  }

  // 2. Body size guard — reject before reading full body
  const contentLength = req.headers.get("content-length")
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Payload too large. Max 64 KB." },
      { status: 413 }
    )
  }

  // 3. Read body with size enforcement
  let body: unknown = null
  let rawBody = ""
  try {
    const buffer = await req.arrayBuffer()
    if (buffer.byteLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Payload too large. Max 64 KB." },
        { status: 413 }
      )
    }
    rawBody = new TextDecoder().decode(buffer)
    body = rawBody ? JSON.parse(rawBody) : null
  } catch {
    body = null
  }

  const supabase = createServerClient()

  // 4. Verify session exists and has not expired
  const { data: session } = await supabase
    .from("webhook_sessions")
    .select("id, created_at")
    .eq("session_token", sessionId)
    .single()

  if (!session) {
    return NextResponse.json(
      { error: "Session not found or expired." },
      { status: 404 }
    )
  }

  const sessionAge = Date.now() - new Date(session.created_at).getTime()
  if (sessionAge > SESSION_MAX_AGE_MS) {
    return NextResponse.json(
      { error: "Session expired. Please start a new session." },
      { status: 410 }
    )
  }

  // 5. Request count cap — count existing rows for this session
  const { count } = await supabase
    .from("webhook_requests")
    .select("id", { count: "exact", head: true })
    .eq("session_id", session.id)

  if (count !== null && count >= MAX_REQUESTS_PER_SESSION) {
    return NextResponse.json(
      { error: `Session limit reached (${MAX_REQUESTS_PER_SESSION} requests). Start a new session.` },
      { status: 429 }
    )
  }

  // 6. Extract headers (strip sensitive/large values)
  const headers: Record<string, string> = {}
  const SKIP_HEADERS = new Set(["cookie", "authorization", "x-api-key", "x-auth-token"])
  req.headers.forEach((value, key) => {
    if (!SKIP_HEADERS.has(key.toLowerCase())) {
      headers[key] = value.slice(0, 500) // cap individual header values
    }
  })

  // 7. Extract query params
  const queryParams: Record<string, string> = {}
  req.nextUrl.searchParams.forEach((value, key) => {
    queryParams[key] = value
  })

  // 8. Store the request
  const { error } = await supabase.from("webhook_requests").insert({
    session_id: session.id,
    method: req.method,
    headers,
    body,
    raw_body: rawBody.slice(0, MAX_BODY_BYTES), // belt-and-suspenders truncation
    query_params: queryParams,
    ip_address:
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown",
  })

  if (error) {
    return NextResponse.json(
      { error: "Failed to store request." },
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
