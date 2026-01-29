# ✨ Cloudflare-AI

A stateful AI-powered chat application built entirely on Cloudflare Developer Platform.

## 🛠️ Cloudflare Stack

* **AI (LLM):** Leveraging `@cf/meta/llama-3.3-70b-instruct-fp8-fast` via **Workers AI**
* **State (Memory):** Utilizing **Cloudflare KV** to maintain a persistent "sliding window" of history for each user.
* **Coordination (Workflows):** Implementing **Cloudflare Workflows** to handle background tasks (logging and summary processing) asynchronously, ensuring zero latency impact on the user experience.
