export interface WebhookRequest {
  id: string
  session_id: string
  method: string
  headers: Record<string, string>
  body: unknown
  raw_body: string | null
  query_params: Record<string, string>
  ip_address: string | null
  received_at: string
}
