import { useState } from "react";
import Navbar from "../components/Navbar";

const ChatCoach = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    const aiMsg = { role: "assistant", text: data.reply || data.message || "Error occurred" };
    setMessages((prev) => [...prev, aiMsg]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white h-96 p-4 rounded-2xl shadow overflow-y-auto mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-3 flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-xs ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 border rounded-xl p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your AI coach..."
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-5 rounded-xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatCoach;
