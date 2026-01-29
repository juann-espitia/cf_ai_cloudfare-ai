import { WorkflowEntrypoint } from "cloudflare:workers";

export class ChatSummaryWorkflow extends WorkflowEntrypoint {
  async run(event, step) {
    const { userId, lastMessage } = event.payload;

    await step.do('log-interaction', async () => {
      return { status: "processed", user: userId };
    });
  }
}

export default {
    async fetch(request, env) {
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            })
        }

        if (request.method !== 'POST') {
            return new Response('Please send a POST request', 
            { status: 400 })
        }

        try {
            const { message, userId } = await request.json()

            if (!message || !userId) {
                return new Response(JSON.stringify({ error: 'Missing message or userId' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                })
            }

            const conversationKey = `chat:${userId}`
            const historyJson = await env.CHAT_HISTORY.get(conversationKey)
            const history = historyJson ? JSON.parse(historyJson) : []

            history.push({
                 role: 'user', content: message 
            })

            const aiResponse = await env.AI.run(
                '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
                { messages: history }
            )

            history.push({ 
                role: 'assistant',
                 content: aiResponse.response
            })

            const recentHistory = history.slice(-25)

            await env.CHAT_HISTORY.put(conversationKey, JSON.stringify(recentHistory))

            const safeInstanceId = `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
            await env.CHAT_SUMMARY_WORKFLOW.create({
                id: safeInstanceId,
                params: { userId, lastMessage: message }
            })

            return new Response(JSON.stringify({
                reply: aiResponse.response,
                messageCount: recentHistory.length
            }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
        } catch (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
        }
    }
}
