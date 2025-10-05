import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getEntityData, sendChatMessage } from "../services/api";
import { ArrowLeft, Dna, TestTube, FileText } from "lucide-react";

import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";

const getIconForType = (type) => {
  switch (type) {
    case "Disease":
      return <TestTube className="w-6 h-6 text-primary" />;
    case "Gene":
      return <Dna className="w-6 h-6 text-primary" />;
    default:
      return <FileText className="w-6 h-6 text-primary" />;
  }
};

const ChatPage = () => {
  const { entityId } = useParams();
  const [entity, setEntity] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const setupChat = async () => {
      setIsLoading(true);
      const data = await getEntityData(entityId);
      setEntity(data);
      if (data?.summary) {
        setMessages([
          {
            role: "model",
            parts: `Here's a summary about ${data.title}:\n\n${data.summary}\n\nWhat would you like to know more about?`,
          },
        ]);
      }
      setIsLoading(false);
    };
    setupChat();
  }, [entityId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (userInput) => {
    const newUserMessage = { role: "user", parts: userInput };

    // Use the functional form of setMessages to ensure we have the latest state
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    const updatedMessages = [...messages, newUserMessage];
    const aiResponse = await sendChatMessage(entityId, updatedMessages);

    // Use the functional form again to add the AI's response correctly
    setMessages((prevMessages) => [...prevMessages, aiResponse]);
    setIsLoading(false);
  };

  if (!entity && isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-text-dim">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border bg-surface">
        <Link
          to="/explorer"
          className="flex items-center gap-2 text-sm text-primary hover:underline mb-2"
        >
          <ArrowLeft size={16} />
          Back to Explorer
        </Link>
        {entity && (
          <div className="flex items-center gap-3">
            {getIconForType(entity.type)}
            <div>
              <h1 className="text-xl font-bold">{entity.title}</h1>
              <p className="text-sm text-text-dim">{entity.type}</p>
            </div>
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && messages.length > 0 && (
          <p className="text-center text-text-dim my-4">AI is thinking...</p>
        )}
      </div>

      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatPage;
