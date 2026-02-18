import type { Message } from "../types/chat";

const ChatBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";
  return (
    <div
      className={`w-full flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 rounded-lg text-sm ${
          isUser
            ? "bg-white text-black"
            : "bg-[#1a1a1a] text-white border border-white"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatBubble;
