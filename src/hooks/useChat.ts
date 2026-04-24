import { useState, useCallback } from "react";

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
}

export interface Friend {
  id: string;
  name: string;
  status: "online" | "away" | "busy" | "offline";
  avatar?: string;
  autoReply?: string;
}

const AUTO_REPLIES = [
  "Hey! I'm at the library, back in 30min! 💻",
  "Yo! Playing games rn, msg me l8r! 🎮",
  "BUSY - do not disturb! 😎",
  "Away from keyboard... probably eating snacks 🍕",
];

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [friends] = useState<Friend[]>([
    {
      id: "1",
      name: "CyberChick99",
      status: "online",
      autoReply: AUTO_REPLIES[0],
    },
    { id: "2", name: "PixelDream", status: "away", autoReply: AUTO_REPLIES[1] },
    { id: "3", name: "NeonKid", status: "offline", autoReply: AUTO_REPLIES[2] },
    {
      id: "4",
      name: "GlitchGamer",
      status: "busy",
      autoReply: AUTO_REPLIES[3],
    },
  ]);

  const sendMessage = useCallback(
    (text: string, friendId: string) => {
      const newMessage: ChatMessage = {
        id: Math.random().toString(),
        sender: "You",
        text,
        timestamp: new Date(),
        isUser: true,
      };

      setMessages((prev) => [...prev, newMessage]);

      const friend = friends.find((f) => f.id === friendId);
      if (friend?.autoReply && friend.status !== "online") {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: Math.random().toString(),
              sender: friend.name,
              text: friend.autoReply || "...",
              timestamp: new Date(),
              isUser: false,
            },
          ]);
        }, 1000);
      }
    },
    [friends],
  );

  return {
    messages,
    friends,
    sendMessage,
  };
}
