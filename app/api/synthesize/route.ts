import Anthropic from "@anthropic-ai/sdk";
import {
  npsData,
  csatData,
  appReviewsData,
  complaintsData,
  callTranscriptsData,
  chatLogsData,
} from "@/app/data/sampleData";

const client = new Anthropic();

function buildFeedbackContext(sources: string[]): string {
  const sections: string[] = [];

  if (sources.includes("nps") || sources.includes("all")) {
    sections.push(`## NPS RESPONSES (${npsData.length} responses)
${npsData
  .map(
    (r) =>
      `[Score: ${r.score}/10 | Product: ${r.product} | Segment: ${r.segment} | Date: ${r.date}]
"${r.comment}"`
  )
  .join("\n\n")}`);
  }

  if (sources.includes("csat") || sources.includes("all")) {
    sections.push(`## CSAT RESPONSES (${csatData.length} responses)
${csatData
  .map(
    (r) =>
      `[Rating: ${r.rating}/5 | Category: ${r.category} | Channel: ${r.channel} | Date: ${r.date}]
"${r.comment}"`
  )
  .join("\n\n")}`);
  }

  if (sources.includes("reviews") || sources.includes("all")) {
    sections.push(`## APP REVIEWS (${appReviewsData.length} reviews)
${appReviewsData
  .map(
    (r) =>
      `[Rating: ${r.rating}/5 | Platform: ${r.platform} | Version: ${r.version} | Date: ${r.date}]
Title: "${r.title}"
"${r.body}"`
  )
  .join("\n\n")}`);
  }

  if (sources.includes("complaints") || sources.includes("all")) {
    sections.push(`## SUPPORT COMPLAINTS (${complaintsData.length} tickets)
${complaintsData
  .map(
    (c) =>
      `[Priority: ${c.priority.toUpperCase()} | Category: ${c.category} | Status: ${c.status} | Date: ${c.date}]
Subject: "${c.subject}"
"${c.description}"${c.resolution ? `\nResolution: "${c.resolution}"` : ""}`
  )
  .join("\n\n")}`);
  }

  if (sources.includes("calls") || sources.includes("all")) {
    sections.push(`## CALL TRANSCRIPTS (${callTranscriptsData.length} calls)
${callTranscriptsData
  .map(
    (c) =>
      `[Sentiment: ${c.sentiment} | Topic: ${c.topic} | Duration: ${c.duration} | Date: ${c.date}]
Excerpt: "${c.excerpt}"`
  )
  .join("\n\n")}`);
  }

  if (sources.includes("chats") || sources.includes("all")) {
    sections.push(`## CHAT LOGS (${chatLogsData.length} conversations)
${chatLogsData
  .map(
    (c) =>
      `[Sentiment: ${c.sentiment} | Topic: ${c.topic} | CSAT: ${c.csat ?? "N/A"}/5 | Date: ${c.date}]
${c.messages.map((m) => `  ${m.role === "customer" ? "Customer" : "Agent"}: ${m.text}`).join("\n")}`
  )
  .join("\n\n")}`);
  }

  return sections.join("\n\n---\n\n");
}

export async function POST(req: Request) {
  const { query, sources = ["all"] } = await req.json();

  if (!query) {
    return new Response(JSON.stringify({ error: "Query is required" }), {
      status: 400,
    });
  }

  const feedbackContext = buildFeedbackContext(sources);

  const systemPrompt = `You are an expert customer insights analyst. You have access to real customer feedback data from multiple channels. Your job is to synthesize this data to answer questions and surface actionable insights.

When analyzing feedback:
- Identify patterns and themes across sources
- Quantify issues when possible (e.g., "3 out of 5 app reviews mention search problems")
- Highlight critical issues that need immediate attention
- Note what's working well alongside what needs improvement
- Provide specific, actionable recommendations
- Reference specific customer quotes when they illustrate a point

Format your response with clear sections. Use markdown formatting.`;

  const userMessage = `Here is the customer feedback data from multiple channels:

${feedbackContext}

---

Question: ${query}

Please analyze the feedback data above and provide a comprehensive, synthesized answer. Reference specific data points and quotes to support your insights.`;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const anthropicStream = await client.messages.stream({
          model: "claude-opus-4-8",
          max_tokens: 2000,
          thinking: { type: "adaptive" },
          system: systemPrompt,
          messages: [{ role: "user", content: userMessage }],
        });

        for await (const event of anthropicStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            const data = JSON.stringify({ type: "text", text: event.delta.text });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
        controller.close();
      } catch (err) {
        const error = err instanceof Error ? err.message : "Unknown error";
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: "error", error })}\n\n`)
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
