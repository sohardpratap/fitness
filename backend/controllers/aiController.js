const OpenAI = require("openai");

let openai = null;
try {
  if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
} catch (error) {
  console.warn("Failed to initialize OpenAI client:", error.message);
}

exports.chatWithAI = async (req, res) => {
  try {
    if (!openai) {
      return res.status(503).json({
        reply: "AI service is currently unavailable. Please check backend configuration.",
      });
    }

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required." });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ reply: "An error occurred while processing your request." });
  }
};
