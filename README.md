# ✨ Cloudflare-AI

A stateful AI-powered chat application built entirely on Cloudflare Developer Platform.

## 🚀 Live Links
- **Live Demo:** https://c3a37bb1.cf-ai-frontend.pages.dev
- **Worker API:** https://proud-silence-9c58.juannespitia.workers.dev/

## 🛠️ Cloudflare Stack

* **AI (LLM):** Leveraging `@cf/meta/llama-3.3-70b-instruct-fp8-fast` via **Workers AI**
* **State (Memory):** Utilizing **Cloudflare KV** to maintain a persistent "sliding window" of history for each user.
* **Coordination (Workflows):** Implementing **Cloudflare Workflows** to handle background tasks (logging and summary processing) asynchronously, ensuring zero latency impact on the user experience.

## How to try it out!

###  Option 1: Live
You can use the "Live demo" link provided above to try it out!

### Option 2: Locally
If you'd like to run t:

1. **Prerequisites:** - Node.js installed.
   - A Cloudflare account (for Workers AI and KV access).

2. **Setup:**
   ```bash
   git clone [https://github.com/Juann-Espitia/cf_ai_cloudfare-ai.git](https://github.com/Juann-Espitia/cf_ai_cloudfare-ai.git)
   cd cf_ai_cloudfare-ai/proud-silence-9c58
   npm install
