import { useEffect, useMemo, useRef, useState } from "react";
import { Header } from "../components/dashboard/Header";
import { ChatInterface } from "../components/chat/ChatInterface";
import { Search } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  type AdminChatConversation,
  type AdminChatMessage,
  useGetAdminChatConversationsQuery,
  useGetAdminChatMessagesQuery,
  useSendAdminChatMessageMutation,
} from "@/redux/features/api/baseApi";

export function ChatsPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "user" | "vendor">(
    "all",
  );
  const [searchValue, setSearchValue] = useState("");
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<AdminChatConversation[]>(
    [],
  );
  const [messages, setMessages] = useState<AdminChatMessage[]>([]);
  const selectedThreadRef = useRef<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const {
    data: conversationsData = [],
    refetch: refetchConversations,
    isLoading,
  } = useGetAdminChatConversationsQuery();
  const { data: messagesData = [], isFetching: messagesLoading } =
    useGetAdminChatMessagesQuery(selectedThreadId ?? skipToken);
  const [sendAdminChatMessage] = useSendAdminChatMessageMutation();

  useEffect(() => {
    setConversations(conversationsData);
  }, [conversationsData]);

  useEffect(() => {
    if (!conversations.length) {
      setSelectedThreadId(null);
      return;
    }

    if (
      !selectedThreadId ||
      !conversations.some((item) => item.threadId === selectedThreadId)
    ) {
      setSelectedThreadId(conversations[0].threadId);
    }
  }, [conversations, selectedThreadId]);

  useEffect(() => {
    selectedThreadRef.current = selectedThreadId;
  }, [selectedThreadId]);

  useEffect(() => {
    setMessages(messagesData);

    if (selectedThreadId && messagesData.length) {
      setConversations((prev) =>
        prev.map((item) =>
          item.threadId === selectedThreadId ? { ...item, unreadCount: 0 } : item,
        ),
      );
    }
  }, [messagesData, selectedThreadId]);

  useEffect(() => {
    const token = localStorage?.getItem("accessToken");
    if (!token) return;

    const socketBaseUrl =
      import.meta.env.VITE_BASE_API_URL || window.location.origin;
    const socket = io(`${socketBaseUrl}/admin-chats`, {
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
  }, [refetchConversations]);

  const filteredConversations = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();
    return conversations.filter((chat) => {
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

  type ChatUiMessage = {
    id: string;
    text: string;
    sender: "admin" | "user";
    timestamp: string;
    status: "sent" | "delivered" | "read";
  };

  const uiMessages = useMemo<ChatUiMessage[]>(
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

    setMessages((prev) => {
      if (prev.some((item) => item.id === message.id)) {
        return prev;
      }
      return [...prev, message];
    });
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

        <div className="grid min-h-0 flex-1 grid-cols-12 gap-6">
          {/* Sidebar List */}
          <div className="col-span-12 flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:col-span-4">
            <div className="space-y-4 border-b border-gray-100 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {(["all", "user", "vendor"] as const).map((f) => (
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
              {isLoading && !conversations.length ? (
                <div className="p-4 text-sm text-gray-400">
                  Loading conversations...
                </div>
              ) : null}
              {filteredConversations.map((chat) => {
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
                    <div className="mb-1 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <h3
                          className={`font-medium text-sm ${selectedThreadId === chat.threadId ? "text-[#278687]" : "text-gray-900"}`}
                        >
                          {chat.participant.name}
                        </h3>
                      </div>
                      <span className="text-xs text-gray-400">{lastTime}</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="mr-2 line-clamp-1 flex-1 text-xs text-gray-500">
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
              {!isLoading && !filteredConversations.length ? (
                <div className="p-4 text-sm text-gray-400">
                  No conversations found.
                </div>
              ) : null}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-12 h-full lg:col-span-8">
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
              <div className="flex h-full items-center justify-center rounded-2xl border border-gray-100 bg-white text-gray-400 shadow-sm">
                Loading conversation...
              </div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-2xl border border-gray-100 bg-white text-gray-400 shadow-sm">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
