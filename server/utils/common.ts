import type { EventHandlerRequest, H3Event } from 'h3'
import { OpenAI } from 'openai'

export { upperFirst as capitalize } from 'scule'

export function useOpenAI(event: H3Event<EventHandlerRequest>) {
  const apiKey = process.env.NUXT_OPENAI_API_KEY || event.node.req.headers['x-openai-key']?.toString()
  return new OpenAI({
    apiKey,
  })
}

export function useSSE(event: H3Event<EventHandlerRequest>) {
  // Enable SSE endpoint
  setHeader(event, 'cache-control', 'no-cache')
  setHeader(event, 'connection', 'keep-alive')
  setHeader(event, 'content-type', 'text/event-stream')
  setResponseStatus(event, 200)

  // Let the connection opened
  event._handled = true

  const close = () => {
    // Close connection, trigger release locked
    event.node.res.end()
  }
  // event.node.req.on('close', close)

  return {
    close,
  }
}

export const randomString = (length = 5) => Math.random().toString(36).substr(2, length)
