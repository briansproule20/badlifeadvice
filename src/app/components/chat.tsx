"use client";

import { useState } from "react";

interface ChatProps {
  characterId?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

export default function Chat({ characterId }: ChatProps = {}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  console.log("Chat component rendered with characterId:", characterId);
  console.log("Chat state:", { messages, isLoading, input, inputLength: input.length });

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    console.log("Sending message:", input);
    const userMessage: Message = {
      role: 'user',
      content: input,
      id: Date.now().toString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    const currentInput = input;
    setInput("");
    
    // Simple non-streaming response
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          characterId
        })
      });
      
      console.log("API Response status:", response.status);
      console.log("API Response statusText:", response.statusText);
      console.log("API Response ok:", response.ok);
      
      if (response.ok) {
        const data = await response.text();
        console.log("API Response data:", data);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data,
          id: (Date.now() + 1).toString()
        }]);
      } else {
        const errorText = await response.text();
        console.error("API Error status:", response.status);
        console.error("API Error statusText:", response.statusText);
        console.error("API Error text:", errorText);
        throw new Error(`API call failed: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
        id: (Date.now() + 1).toString()
      }]);
    } finally {
      setIsLoading(false);
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
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}