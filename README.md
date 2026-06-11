# Real-Time Customer Feedback Synthesis

An AI-powered dashboard that queries and synthesizes customer feedback across **6 channels** into unified insights — powered by Claude Opus 4.8.

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![Claude](https://img.shields.io/badge/Claude-Opus%204.8-orange) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## What it does

Ask natural language questions across all your customer feedback channels at once. Instead of manually reading through hundreds of NPS comments, app reviews, and support tickets, Claude synthesizes patterns and surfaces actionable insights in real time.

**Example queries:**
- *"What are the top 3 issues customers are complaining about this week?"*
- *"What's driving negative NPS scores and what should we fix first?"*
- *"Are there any critical bugs in our mobile app based on reviews and chats?"*
- *"Summarize all billing issues and their current resolution status"*

## Data Sources

| Source | Sample Size | Description |
|---|---|---|
| 📊 NPS | 15 responses | Score + verbatim comment, product, segment |
| ⭐ CSAT | 15 responses | Rating, category, channel |
| 📱 App Reviews | 12 reviews | iOS & Android, version, title + body |
| 🎫 Complaints | 8 tickets | Priority, category, status, resolution notes |
| 📞 Call Transcripts | 8 calls | Sentiment, topic, duration, excerpt |
| 💬 Chat Logs | 8 conversations | Full message threads, sentiment, CSAT |

## Features

- **Streaming AI responses** — Claude streams insights token-by-token for a real-time feel
- **Adaptive thinking** — Claude reasons through the data before responding
- **Source filtering** — scope analysis to specific channels (e.g., only NPS + complaints)
- **Data explorer tabs** — browse raw data for each source with stats and badges
- **6 suggested queries** — one-click to common analysis questions

## Tech Stack

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS
- **AI:** Anthropic TypeScript SDK, `claude-opus-4-8`, adaptive thinking, SSE streaming
- **Data:** Static TypeScript sample data (swap in your real API calls)

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/prernaj/feedback-demo.git
cd feedback-demo

# 2. Install dependencies
npm install

# 3. Set your Anthropic API key
export ANTHROPIC_API_KEY=your_key_here

# 4. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
├── page.tsx                  # Main dashboard UI
├── api/
│   └── synthesize/
│       └── route.ts          # Streaming API route → Claude
└── data/
    └── sampleData.ts         # Sample feedback data (all 6 sources)
```

## Connecting Real Data

`app/api/synthesize/route.ts` builds a context string from `sampleData.ts` and sends it to Claude. To use real data, replace the imports in that file with calls to your actual data sources (database queries, CRM API, app store API, etc.).

## Built for

AI Hackathon — Real-Time Customer Feedback track
