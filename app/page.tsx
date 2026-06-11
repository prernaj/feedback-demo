"use client";

import { useState } from "react";
import {
  npsData,
  csatData,
  appReviewsData,
  complaintsData,
  callTranscriptsData,
  chatLogsData,
  allFeedbackSummary,
} from "@/app/data/sampleData";

const SUGGESTED_QUERIES = [
  "What are the top 3 issues customers are complaining about this week?",
  "What's driving negative NPS scores and what should we fix first?",
  "Are there any critical bugs in our mobile app based on reviews and chats?",
  "What are customers praising most across all channels?",
  "Summarize all billing and payment issues and their current resolution status",
  "What patterns appear in negative call transcripts and chats?",
];

const SOURCE_CONFIG = [
  { key: "nps", label: "NPS", icon: "📊", count: npsData.length },
  { key: "csat", label: "CSAT", icon: "⭐", count: csatData.length },
  { key: "reviews", label: "App Reviews", icon: "📱", count: appReviewsData.length },
  { key: "complaints", label: "Complaints", icon: "🎫", count: complaintsData.length },
  { key: "calls", label: "Call Transcripts", icon: "📞", count: callTranscriptsData.length },
  { key: "chats", label: "Chat Logs", icon: "💬", count: chatLogsData.length },
];

function ScoreBadge({ score, max }: { score: number; max: number }) {
  const pct = score / max;
  const color = pct >= 0.7 ? "text-green-400" : pct >= 0.4 ? "text-yellow-400" : "text-red-400";
  return <span className={`font-bold ${color}`}>{score}/{max}</span>;
}

function SentimentBadge({ sentiment }: { sentiment: string }) {
  const styles: Record<string, string> = {
    positive: "bg-green-900 text-green-300",
    neutral: "bg-gray-700 text-gray-300",
    negative: "bg-red-900 text-red-300",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[sentiment] ?? styles.neutral}`}>
      {sentiment}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    critical: "bg-red-900 text-red-300",
    high: "bg-orange-900 text-orange-300",
    medium: "bg-yellow-900 text-yellow-300",
    low: "bg-gray-700 text-gray-300",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[priority] ?? styles.low}`}>
      {priority}
    </span>
  );
}

type Tab = "query" | "nps" | "csat" | "reviews" | "complaints" | "calls" | "chats";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("query");
  const [query, setQuery] = useState("");
  const [selectedSources, setSelectedSources] = useState<string[]>(["all"]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  function toggleSource(key: string) {
    if (key === "all") {
      setSelectedSources(["all"]);
      return;
    }
    setSelectedSources((prev) => {
      const without = prev.filter((s) => s !== "all");
      if (without.includes(key)) {
        const next = without.filter((s) => s !== key);
        return next.length === 0 ? ["all"] : next;
      }
      return [...without, key];
    });
  }

  async function handleQuery(q?: string) {
    const queryText = q ?? query;
    if (!queryText.trim()) return;
    setQuery(queryText);
    setResponse("");
    setLoading(true);
    setActiveTab("query");

    try {
      const res = await fetch("/api/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryText, sources: selectedSources }),
      });

      const reader = res.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const json = line.slice(6);
            const parsed = JSON.parse(json);
            if (parsed.type === "text") {
              setResponse((prev) => prev + parsed.text);
            }
          }
        }
      }
    } catch {
      setResponse("Error connecting to the API. Make sure ANTHROPIC_API_KEY is set.");
    } finally {
      setLoading(false);
    }
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "query", label: "AI Insights", icon: "🤖" },
    { id: "nps", label: "NPS", icon: "📊" },
    { id: "csat", label: "CSAT", icon: "⭐" },
    { id: "reviews", label: "App Reviews", icon: "📱" },
    { id: "complaints", label: "Complaints", icon: "🎫" },
    { id: "calls", label: "Calls", icon: "📞" },
    { id: "chats", label: "Chats", icon: "💬" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">🔊</span> Real-Time Customer Feedback
            </h1>
            <p className="text-gray-400 text-sm mt-0.5">AI-powered synthesis across all feedback channels</p>
          </div>
          <div className="flex gap-4 text-sm text-gray-400">
            <span>{allFeedbackSummary.totalResponses} data points</span>
            <span>·</span>
            <span>NPS avg: <span className="text-white font-semibold">{allFeedbackSummary.avgNPS}</span></span>
            <span>·</span>
            <span>CSAT avg: <span className="text-white font-semibold">{allFeedbackSummary.avgCSAT}/5</span></span>
            <span>·</span>
            <span className="text-red-400">{allFeedbackSummary.criticalComplaints} critical issues</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats Row */}
        <div className="grid grid-cols-6 gap-3 mb-6">
          {SOURCE_CONFIG.map((src) => (
            <div key={src.key} className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
              <div className="text-2xl mb-1">{src.icon}</div>
              <div className="text-lg font-bold text-white">{src.count}</div>
              <div className="text-xs text-gray-400">{src.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-900 rounded-lg p-1 border border-gray-800 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Query Tab */}
        {activeTab === "query" && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-4">
              {/* Query Input */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                <div className="mb-3">
                  <div className="text-sm font-medium text-gray-300 mb-2">Filter Sources</div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleSource("all")}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        selectedSources.includes("all")
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      }`}
                    >
                      All Sources
                    </button>
                    {SOURCE_CONFIG.map((src) => (
                      <button
                        key={src.key}
                        onClick={() => toggleSource(src.key)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          selectedSources.includes(src.key)
                            ? "bg-blue-600 text-white"
                            : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        }`}
                      >
                        {src.icon} {src.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleQuery();
                    }}
                    placeholder="Ask anything about your customer feedback... (⌘+Enter to send)"
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                    rows={3}
                  />
                  <button
                    onClick={() => handleQuery()}
                    disabled={loading || !query.trim()}
                    className="px-5 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 rounded-lg text-sm font-medium transition-colors self-end"
                  >
                    {loading ? "⏳" : "Analyze →"}
                  </button>
                </div>
              </div>

              {/* Response */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-5 min-h-64">
                {!response && !loading && (
                  <div className="text-gray-500 text-sm text-center mt-8">
                    Ask a question to get AI-synthesized insights from all your feedback channels
                  </div>
                )}
                {loading && !response && (
                  <div className="flex items-center gap-3 text-blue-400 text-sm">
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    Synthesizing insights with Claude...
                  </div>
                )}
                {response && (
                  <div>
                    <div
                      className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: response
                          .replace(/^## (.*)/gm, '<h2 style="color:white;font-weight:bold;font-size:1rem;margin-top:1rem;margin-bottom:0.5rem">$1</h2>')
                          .replace(/^### (.*)/gm, '<h3 style="color:#d1d5db;font-weight:600;margin-top:0.75rem;margin-bottom:0.25rem">$1</h3>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong style="color:white">$1</strong>')
                          .replace(/^- (.*)/gm, '<li style="margin-left:1rem;color:#d1d5db">$1</li>'),
                      }}
                    />
                    {loading && (
                      <span className="inline-block w-1.5 h-4 bg-blue-400 animate-pulse ml-1 align-middle" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Suggested Queries */}
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-400">Suggested Queries</div>
              {SUGGESTED_QUERIES.map((sq) => (
                <button
                  key={sq}
                  onClick={() => handleQuery(sq)}
                  disabled={loading}
                  className="w-full text-left bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-600 rounded-lg px-4 py-3 text-sm text-gray-300 transition-colors disabled:opacity-50"
                >
                  {sq}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* NPS Tab */}
        {activeTab === "nps" && (
          <div className="space-y-3">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
                <div className="text-2xl font-bold text-white">{allFeedbackSummary.avgNPS}</div>
                <div className="text-xs text-gray-400">Avg NPS Score</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
                <div className="text-2xl font-bold text-green-400">{npsData.filter(n => n.score >= 9).length}</div>
                <div className="text-xs text-gray-400">Promoters (9-10)</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
                <div className="text-2xl font-bold text-yellow-400">{npsData.filter(n => n.score >= 7 && n.score <= 8).length}</div>
                <div className="text-xs text-gray-400">Passives (7-8)</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
                <div className="text-2xl font-bold text-red-400">{npsData.filter(n => n.score <= 6).length}</div>
                <div className="text-xs text-gray-400">Detractors (0-6)</div>
              </div>
            </div>
            {npsData.map((r) => (
              <div key={r.id} className="bg-gray-900 rounded-lg border border-gray-800 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <ScoreBadge score={r.score} max={10} />
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">{r.product}</span>
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">{r.segment}</span>
                  </div>
                  <span className="text-xs text-gray-500">{r.date}</span>
                </div>
                <p className="text-sm text-gray-300 italic">&ldquo;{r.comment}&rdquo;</p>
              </div>
            ))}
          </div>
        )}

        {/* CSAT Tab */}
        {activeTab === "csat" && (
          <div className="space-y-3">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
                <div className="text-2xl font-bold text-white">{allFeedbackSummary.avgCSAT}</div>
                <div className="text-xs text-gray-400">Avg CSAT Rating</div>
              </div>
              {["5","4","3","2","1"].map(star => (
                <div key={star} className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
                  <div className="text-2xl font-bold text-white">{csatData.filter(c => String(c.rating) === star).length}</div>
                  <div className="text-xs text-gray-400">{"⭐".repeat(Number(star))}</div>
                </div>
              ))}
            </div>
            {csatData.map((r) => (
              <div key={r.id} className="bg-gray-900 rounded-lg border border-gray-800 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <ScoreBadge score={r.rating} max={5} />
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">{r.category}</span>
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">{r.channel}</span>
                  </div>
                  <span className="text-xs text-gray-500">{r.date}</span>
                </div>
                <p className="text-sm text-gray-300 italic">&ldquo;{r.comment}&rdquo;</p>
              </div>
            ))}
          </div>
        )}

        {/* App Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="space-y-3">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
                <div className="text-2xl font-bold text-white">{allFeedbackSummary.avgAppRating}</div>
                <div className="text-xs text-gray-400">Avg App Rating</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
                <div className="text-2xl font-bold text-gray-300">{appReviewsData.filter(r => r.platform === "iOS").length}</div>
                <div className="text-xs text-gray-400">iOS Reviews</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
                <div className="text-2xl font-bold text-green-400">{appReviewsData.filter(r => r.platform === "Android").length}</div>
                <div className="text-xs text-gray-400">Android Reviews</div>
              </div>
            </div>
            {appReviewsData.map((r) => (
              <div key={r.id} className="bg-gray-900 rounded-lg border border-gray-800 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <ScoreBadge score={r.rating} max={5} />
                    <span className={`text-xs px-2 py-0.5 rounded ${r.platform === "iOS" ? "bg-blue-900 text-blue-300" : "bg-green-900 text-green-300"}`}>{r.platform}</span>
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">v{r.version}</span>
                    <span className="text-sm font-medium text-white">{r.title}</span>
                  </div>
                  <span className="text-xs text-gray-500">{r.date}</span>
                </div>
                <p className="text-sm text-gray-300">{r.body}</p>
              </div>
            ))}
          </div>
        )}

        {/* Complaints Tab */}
        {activeTab === "complaints" && (
          <div className="space-y-3">
            <div className="flex items-center gap-4 mb-4">
              {["open","in_progress","resolved"].map(status => (
                <div key={status} className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
                  <div className="text-2xl font-bold text-white">{complaintsData.filter(c => c.status === status).length}</div>
                  <div className="text-xs text-gray-400 capitalize">{status.replace("_"," ")}</div>
                </div>
              ))}
              {["critical","high","medium","low"].map(p => (
                <div key={p} className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
                  <div className="text-2xl font-bold text-white">{complaintsData.filter(c => c.priority === p).length}</div>
                  <div className="text-xs text-gray-400 capitalize">{p}</div>
                </div>
              ))}
            </div>
            {complaintsData.map((c) => (
              <div key={c.id} className="bg-gray-900 rounded-lg border border-gray-800 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <PriorityBadge priority={c.priority} />
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">{c.category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${c.status === "resolved" ? "bg-green-900 text-green-300" : c.status === "in_progress" ? "bg-yellow-900 text-yellow-300" : "bg-red-900 text-red-300"}`}>{c.status.replace("_"," ")}</span>
                    <span className="text-sm font-medium text-white">{c.subject}</span>
                  </div>
                  <span className="text-xs text-gray-500">{c.date}</span>
                </div>
                <p className="text-sm text-gray-300 mb-2">{c.description}</p>
                {c.resolution && (
                  <p className="text-xs text-green-400 italic border-t border-gray-800 pt-2 mt-2">✓ {c.resolution}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Call Transcripts Tab */}
        {activeTab === "calls" && (
          <div className="space-y-3">
            <div className="flex items-center gap-4 mb-4">
              {["positive","neutral","negative"].map(s => (
                <div key={s} className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
                  <div className="text-2xl font-bold text-white">{callTranscriptsData.filter(c => c.sentiment === s).length}</div>
                  <div className="text-xs text-gray-400 capitalize">{s}</div>
                </div>
              ))}
            </div>
            {callTranscriptsData.map((c) => (
              <div key={c.id} className="bg-gray-900 rounded-lg border border-gray-800 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <SentimentBadge sentiment={c.sentiment} />
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">{c.topic}</span>
                    <span className="text-xs text-gray-500">⏱ {c.duration}</span>
                  </div>
                  <span className="text-xs text-gray-500">{c.date}</span>
                </div>
                <p className="text-sm text-gray-300 italic border-l-2 border-gray-700 pl-3">{c.excerpt}</p>
              </div>
            ))}
          </div>
        )}

        {/* Chat Logs Tab */}
        {activeTab === "chats" && (
          <div className="space-y-3">
            <div className="flex items-center gap-4 mb-4">
              {["positive","neutral","negative"].map(s => (
                <div key={s} className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center">
                  <div className="text-2xl font-bold text-white">{chatLogsData.filter(c => c.sentiment === s).length}</div>
                  <div className="text-xs text-gray-400 capitalize">{s}</div>
                </div>
              ))}
            </div>
            {chatLogsData.map((c) => (
              <div key={c.id} className="bg-gray-900 rounded-lg border border-gray-800 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <SentimentBadge sentiment={c.sentiment} />
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">{c.topic}</span>
                    {c.csat && <span className="text-xs text-yellow-400">CSAT: {c.csat}/5</span>}
                  </div>
                  <span className="text-xs text-gray-500">{c.date}</span>
                </div>
                <div className="space-y-2">
                  {c.messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === "customer" ? "justify-start" : "justify-end"}`}>
                      <div className={`max-w-lg px-3 py-2 rounded-lg text-sm ${
                        m.role === "customer"
                          ? "bg-gray-800 text-gray-200"
                          : "bg-blue-900 text-blue-100"
                      }`}>
                        <span className={`text-xs font-medium block mb-0.5 ${m.role === "customer" ? "text-gray-400" : "text-blue-400"}`}>
                          {m.role === "customer" ? "Customer" : "Support Agent"}
                        </span>
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
