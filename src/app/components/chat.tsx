"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat({
    api: '/api/chat'
  });
  return (
    <div>
      {messages.map((message, index) => (
        <div key={message.id || index}>{JSON.stringify(message)}</div>
      ))}
      <input value={input} onChange={(e) => setInput(e.currentTarget.value)} />
      <button type="submit" onClick={() => sendMessage({ text: input })}>Send</button>
    </div>
  );
}