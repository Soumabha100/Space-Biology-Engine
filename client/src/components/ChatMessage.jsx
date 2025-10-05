import React from "react";
import { Bot, ClockAlert, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

const ChatMessage = ({ message }) => {
  const { role, content } = message;

  return (
    <div
      className={`flex items-start gap-3 my-4 ${
        role == "assistant" ? "" : "flex-row-reverse"
      }`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          role == "assistant" ? "bg-primary/20 text-primary" : "bg-gray-600 text-gray-200"
        }`}
      >
        {role == "assistant" ? <Bot size={20} /> : (role == "user" ? <User size={20} /> : <ClockAlert size={20} />)}
      </div>
      <div
        className={`p-3 rounded-xl max-w-lg ${
          role == "assistant" ? "bg-surface" : "bg-primary text-white"
        }`}
      >
        {/*
          THE FIX: The 'prose' classes are now on a wrapper div
          instead of the ReactMarkdown component itself.
        */}
        <div className="prose prose-sm prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
