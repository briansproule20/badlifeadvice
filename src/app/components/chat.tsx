"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

interface ChatProps {
  characterId?: string;
}

export default function Chat({ characterId }: ChatProps = {}) {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat({
    api: '/api/chat',
    body: characterId ? { characterId } : undefined
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Messages Container */}
      <div className="chat-container p-4 space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <div className="text-lg font-medium mb-2">Welcome to NPC Chat</div>
              <p className="text-sm">Start a conversation with AI. Get advice from your favorite characters!</p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={message.id || index} className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}>
              <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="text-sm">
                  {message.parts?.[0]?.text || message.content}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Form */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}