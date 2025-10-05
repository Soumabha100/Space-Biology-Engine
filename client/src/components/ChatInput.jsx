import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 bg-surface border-t border-border">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a follow-up question..."
        className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="p-3 rounded-lg bg-primary text-white disabled:bg-gray-500 transition-colors"
        disabled={isLoading}
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;