import React, { useState } from "react";
import { useChat } from "../../../hooks/useChat";
import { ChatWindow } from "./ChatWindow";
import { Window } from "../../ui/Window";

export const FriendsList: React.FC = () => {
  const { friends } = useChat();
  const [openChats, setOpenChats] = useState<Set<string>>(new Set());

  const toggleChat = (friendId: string) => {
    const newChats = new Set(openChats);
    if (newChats.has(friendId)) {
      newChats.delete(friendId);
    } else {
      newChats.add(friendId);
    }
    setOpenChats(newChats);
  };

  const closeChat = (friendId: string) => {
    const newChats = new Set(openChats);
    newChats.delete(friendId);
    setOpenChats(newChats);
  };

  return (
    <>
      <Window
        id="friends-list"
        title="AIM Buddy List"
        icon="👥"
        initialSize={{ width: 200, height: 350 }}
      >
        <div className="bg-[#c0c0c0] p-2">
          <div className="text-xs font-bold mb-2 text-blue-600">ONLINE</div>
          {friends
            .filter((f) => f.status === "online")
            .map((friend) => (
              <div
                key={friend.id}
                onClick={() => toggleChat(friend.id)}
                className="p-1 text-xs cursor-pointer hover:bg-blue-400 hover:text-white mb-1 rounded"
              >
                🟢 {friend.name}
              </div>
            ))}

          <div className="text-xs font-bold my-2 text-gray-600">AWAY</div>
          {friends
            .filter((f) => f.status === "away")
            .map((friend) => (
              <div
                key={friend.id}
                onClick={() => toggleChat(friend.id)}
                className="p-1 text-xs cursor-pointer hover:bg-blue-400 hover:text-white mb-1 rounded text-gray-600"
              >
                🟡 {friend.name}
              </div>
            ))}

          <div className="text-xs font-bold my-2 text-gray-400">OFFLINE</div>
          {friends
            .filter((f) => f.status === "offline")
            .map((friend) => (
              <div
                key={friend.id}
                onClick={() => toggleChat(friend.id)}
                className="p-1 text-xs cursor-pointer hover:bg-blue-400 hover:text-white mb-1 rounded text-gray-400"
              >
                ⚫ {friend.name}
              </div>
            ))}
        </div>
      </Window>

      {Array.from(openChats).map((friendId) => (
        <ChatWindow
          key={`chat-${friendId}`}
          friendId={friendId}
          onClose={() => closeChat(friendId)}
        />
      ))}
    </>
  );
};
