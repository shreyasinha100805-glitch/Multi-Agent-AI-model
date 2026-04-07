const OpenAI = require("openai");
const taskAgent = require("./taskAgent");
const calendarAgent = require("./calendarAgent");
const notesAgent = require("./notesAgent");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function processMessage(message) {
    if (!message) return "❌ No message provided";

    console.log("User:", message);

    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `
You are an AI assistant controlling agents.

IMPORTANT:
- Always reply ONLY in valid JSON
- No extra text

Format:
{
  "action": "task | calendar | notes | none",
  "data": "short text"
}
`
                },
                {
                    role: "user",
                    content: message
                }
            ]
        });

        let aiReply = response.choices[0].message.content;

        console.log("AI RAW:", aiReply);

        // 🔥 FIX: Extract JSON safely
        const jsonMatch = aiReply.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            return "⚠️ AI did not return valid format";
        }

        const parsed = JSON.parse(jsonMatch[0]);

        // ROUTING
        if (parsed.action === "task") {
            await taskAgent.addTask(parsed.data);
            return "✅ Task added: " + parsed.data;
        }

        if (parsed.action === "calendar") {
            await calendarAgent.scheduleEvent(parsed.data, "Tomorrow");
            return "📅 Event scheduled: " + parsed.data;
        }

        if (parsed.action === "notes") {
            await notesAgent.saveNote(parsed.data);
            return "📝 Note saved: " + parsed.data;
        }

        return "🤖 " + parsed.data;

    } catch (err) {
    console.error("FULL ERROR:", err);
    return "⚠️ AI processing failed";
}
}

module.exports = { processMessage };