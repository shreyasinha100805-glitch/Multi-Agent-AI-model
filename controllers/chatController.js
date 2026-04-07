const { processMessage } = require("../services/agentService");

async function handleChat(req, res) {
    try {
        const message = req.body?.message;

        if (!message) {
            return res.status(400).json({
                reply: "❌ Message is required"
            });
        }

        const reply = await processMessage(message);

        res.json({ reply });

    } catch (error) {
        console.error("❌ ERROR:", error);
        res.status(500).json({
            reply: "⚠️ AI processing failed"
        });
    }
}

module.exports = { handleChat }; // ✅ VERY IMPORTANT