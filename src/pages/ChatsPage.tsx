import React, { useEffect, useMemo, useRef, useState } from "react";
import { Header } from "../components/dashboard/Header";
import { ChatInterface } from "../components/chat/ChatInterface";
import { Search, AlertCircle } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useGetAdminChatConversationsQuery,
  useGetAdminChatMessagesQuery,
  useSendAdminChatMessageMutation,
} from "@/redux/features/api/baseApi";

type AdminChatConversation = {
  threadId: string;
  participantType: "buyer" | "vendor";
  participant: {
    id: string;
    userId: string;
    name: string;
    avatar: string;
    role: string;
    email?: string;
  };
  lastMessage: AdminChatMessage | null;
  unreadCount: number;
  updatedAt: string;
};

type AdminChatMessage = {
  id: string;
  threadId: string;
  senderType: "ADMIN" | "BUYER" | "VENDOR";
  messageText: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

export function ChatsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<AdminChatConversation[]>(
    [],
  );
  const [messages, setMessages] = useState<AdminChatMessage[]>([]);
  const selectedThreadRef = useRef<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const {
    data: conversationsDataRw,
    refetch: refetchConversations,
    isLoading,
  } = useGetAdminChatConversationsQuery();
  const conversationsData = conversationsDataRw?.data || [];
  const { data: messagesData, isFetching: messagesLoading } =
    useGetAdminChatMessagesQuery(selectedThreadId ?? skipToken);
  const [sendAdminChatMessage] = useSendAdminChatMessageMutation();

  useEffect(() => {
    if (conversationsData) {
      setConversations(conversationsData as AdminChatConversation[]);
    }
  }, [conversationsData]);

  useEffect(() => {
    if (!selectedThreadId && conversations.length > 0) {
      setSelectedThreadId(conversations[0].threadId);
    }
  }, [conversations, selectedThreadId]);

  useEffect(() => {
    selectedThreadRef.current = selectedThreadId;
  }, [selectedThreadId]);

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData as AdminChatMessage[]);
      if (selectedThreadId) {
        setConversations((prev) =>
          prev.map((item) =>
            item.threadId === selectedThreadId
              ? { ...item, unreadCount: 0 }
              : item,
          ),
        );
      }
    }
  }, [messagesData, selectedThreadId]);

  useEffect(() => {
    const token = localStorage?.getItem("accessToken");
    if (!token) return;

    const socket = io("http://localhost:3000/admin-chats", {
      auth: { token },
    });
    socketRef.current = socket;

    socket.on("admin_chat_new_message", (message: AdminChatMessage) => {
      setConversations((prev) => {
        if (!prev.some((item) => item.threadId === message.threadId)) {
          refetchConversations();
          return prev;
        }

        const updated = prev.map((item) => {
          if (item.threadId !== message.threadId) return item;
          const isActive = selectedThreadRef.current === item.threadId;
          const unreadCount =
            message.senderType !== "ADMIN" && !isActive
              ? item.unreadCount + 1
              : isActive
                ? 0
                : item.unreadCount;
          return {
            ...item,
            lastMessage: message,
            unreadCount,
            updatedAt: message.createdAt,
          };
        });

        return updated.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
      });

      if (selectedThreadRef.current === message.threadId) {
        setMessages((prev) => {
          if (prev.some((item) => item.id === message.id)) return prev;
          return [...prev, message];
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const filteredConversations = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();
    return conversations?.filter((chat) => {
      const type =
        chat.participantType.toLocaleLowerCase() === "buyer"
          ? "user"
          : "vendor";
      const matchesFilter = activeFilter === "all" || activeFilter === type;
      const matchesSearch =
        !normalizedSearch ||
        chat.participant.name.toLowerCase().includes(normalizedSearch);
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, conversations, searchValue]);

  const activeChat = useMemo(
    () =>
      conversations.find((item) => item.threadId === selectedThreadId) || null,
    [conversations, selectedThreadId],
  );

  const uiMessages = useMemo(
    () =>
      messages.map((msg) => ({
        id: msg.id,
        text: msg.messageText,
        sender: msg.senderType === "ADMIN" ? "admin" : "user",
        timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: msg.senderType === "ADMIN" && msg.isRead ? "read" : "sent",
      })),
    [messages],
  );

  const handleSendMessage = async (text: string) => {
    if (!selectedThreadId) return;

    if (socketRef.current?.connected) {
      socketRef.current.emit("admin_chat_send", {
        threadId: selectedThreadId,
        messageText: text,
      });
      return;
    }

    const message = await sendAdminChatMessage({
      threadId: selectedThreadId,
      messageText: text,
    }).unwrap();

    setMessages((prev) => [...prev, message as AdminChatMessage]);
  };

  return (
    <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8 h-[calc(100vh-64px)] flex flex-col">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Messages & Complaints
          </h1>
          <p className="text-gray-500">
            Manage support requests and communications.
          </p>
        </div>

        <div className="grid flex-1 min-h-0 grid-cols-12 gap-6">
          {/* Sidebar List */}
          <div className="flex flex-col col-span-12 overflow-hidden bg-white border border-gray-100 shadow-sm lg:col-span-4 rounded-2xl">
            <div className="p-4 space-y-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]"
                />
              </div>
              <div className="flex gap-2 pb-2 overflow-x-auto">
                {["all", "user", "vendor", "complaint"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap transition-colors ${activeFilter === f ? "bg-[#E8F3F1] text-[#278687]" : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((chat) => {
                const type =
                  chat.participantType === "buyer" ? "user" : "vendor";
                const lastTime = chat.lastMessage?.createdAt
                  ? new Date(chat.lastMessage.createdAt).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" },
                    )
                  : new Date(chat.updatedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                const lastMsg =
                  chat.lastMessage?.messageText || "No messages yet";
                return (
                  <div
                    key={chat.threadId}
                    onClick={() => setSelectedThreadId(chat.threadId)}
                    className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${selectedThreadId === chat.threadId ? "bg-[#E8F3F1]/30 border-l-4 border-l-[#278687]" : "border-l-4 border-l-transparent"}`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3
                          className={`font-medium text-sm ${selectedThreadId === chat.threadId ? "text-[#278687]" : "text-gray-900"}`}
                        >
                          {chat.participant.name}
                        </h3>
                        {type === "complaint" && (
                          <AlertCircle className="w-3 h-3 text-red-500" />
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{lastTime}</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="flex-1 mr-2 text-xs text-gray-500 line-clamp-1">
                        {lastMsg}
                      </p>
                      {chat.unreadCount > 0 && (
                        <span className="w-5 h-5 rounded-full bg-[#278687] text-white text-[10px] font-bold flex items-center justify-center">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat Area */}
          <div className="h-full col-span-12 lg:col-span-8">
            {activeChat ? (
              <ChatInterface
                recipientName={activeChat.participant.name}
                recipientAvatar={
                  activeChat.participant.avatar ||
                  "https://ui-avatars.com/api/?name=User&background=278687&color=fff"
                }
                recipientRole={activeChat.participant.role}
                messages={uiMessages}
                onSendMessage={handleSendMessage}
              />
            ) : messagesLoading ? (
              <div className="flex items-center justify-center h-full text-gray-400 bg-white border border-gray-100 shadow-sm rounded-2xl">
                Loading conversation...
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 bg-white border border-gray-100 shadow-sm rounded-2xl">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
