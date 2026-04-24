import React, { useState } from "react";
import { useChat } from "../../../hooks/useChat";
import { Window } from "../../ui/Window";

interface ChatWindowProps {
  friendId: string;
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  friendId,
  onClose,
}) => {
  const { messages, friends, sendMessage } = useChat();
  const [messageText, setMessageText] = useState("");
  const friend = friends.find((f) => f.id === friendId);

  if (!friend) return null;

  const handleSend = () => {
    if (messageText.trim()) {
      sendMessage(messageText, friendId);
      setMessageText("");
    }
  };

  return (
    <Window
      id={`chat-${friendId}`}
      title={friend.name}
      icon="💬"
      onClose={onClose}
      initialSize={{ width: 320, height: 400 }}
    >
      <div className="flex flex-col h-full bg-white">
        <div className="bg-blue-600 text-white px-3 py-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold">{friend.name}</span>
            <span
              className={`text-xs ${friend.status === "online" ? "text-green-300" : "text-gray-300"}`}
            >
              {friend.status === "online"
                ? "🟢 Online"
                : friend.status === "away"
                  ? "🟡 Away"
                  : "⚫ Offline"}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 bg-white space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`text-xs p-2 rounded ${
                msg.isUser
                  ? "bg-blue-100 text-blue-900 ml-6 text-right"
                  : "bg-gray-100 text-gray-900 mr-6"
              }`}
            >
              <div className="font-bold text-xs">{msg.sender}</div>
              <div>{msg.text}</div>
              <div className="text-xs text-gray-500">
                {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-2 bg-gray-100 flex gap-1">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type message..."
            className="flex-1 px-2 py-1 text-xs border border-gray-400 rounded"
          />
          <button
            onClick={handleSend}
            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </Window>
  );
};
