import { useEffect, useRef, useState } from "react";
import ChatBubble from "./chatBubble";
import { v4 as uuid } from "uuid";
import type { Message } from "../types/chat";

const ChatPanel = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "Hi Tell me what website do you want to build",
    },
  ]);

  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: uuid(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto p-4">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t border-white flex gap-2">
        <input
          type="text"
          value={input}
          className="flex-1 bg-[#1a1a1a] rounded-xl px-4 py-3 outline-none"
          placeholder="Ask anything to AI"
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className="bg-white text-black px-5 rounded-xl"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
