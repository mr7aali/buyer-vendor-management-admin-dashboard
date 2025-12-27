import React, { useState } from 'react';
import { Header } from '../components/dashboard/Header';
import { ChatInterface } from '../components/chat/ChatInterface';
import { Search, Filter, MessageSquare, AlertCircle, User, Store } from 'lucide-react';
export function ChatsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedChat, setSelectedChat] = useState('1');
  const chats = [{
    id: '1',
    name: 'Alice Johnson',
    role: 'Buyer',
    type: 'user',
    lastMsg: 'I have a question about my order...',
    time: '10:30 AM',
    unread: 2,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }, {
    id: '2',
    name: 'TechGiant Solutions',
    role: 'Vendor',
    type: 'vendor',
    lastMsg: 'When will the payout be processed?',
    time: '09:15 AM',
    unread: 0,
    avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  }, {
    id: '3',
    name: 'Michael Smith',
    role: 'Buyer',
    type: 'complaint',
    lastMsg: 'Item received damaged, need refund',
    time: 'Yesterday',
    unread: 1,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }];
  const activeChat = chats.find(c => c.id === selectedChat);
  return <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8 h-[calc(100vh-64px)] flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Messages & Complaints
          </h1>
          <p className="text-gray-500">
            Manage support requests and communications.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          {/* Sidebar List */}
          <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search messages..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]" />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {['all', 'user', 'vendor', 'complaint'].map(f => <button key={f} onClick={() => setActiveFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap transition-colors ${activeFilter === f ? 'bg-[#E8F3F1] text-[#278687]' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                    {f}
                  </button>)}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {chats.map(chat => <div key={chat.id} onClick={() => setSelectedChat(chat.id)} className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${selectedChat === chat.id ? 'bg-[#E8F3F1]/30 border-l-4 border-l-[#278687]' : 'border-l-4 border-l-transparent'}`}>
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-medium text-sm ${selectedChat === chat.id ? 'text-[#278687]' : 'text-gray-900'}`}>
                        {chat.name}
                      </h3>
                      {chat.type === 'complaint' && <AlertCircle className="w-3 h-3 text-red-500" />}
                    </div>
                    <span className="text-xs text-gray-400">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-xs text-gray-500 line-clamp-1 flex-1 mr-2">
                      {chat.lastMsg}
                    </p>
                    {chat.unread > 0 && <span className="w-5 h-5 rounded-full bg-[#278687] text-white text-[10px] font-bold flex items-center justify-center">
                        {chat.unread}
                      </span>}
                  </div>
                </div>)}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-12 lg:col-span-8 h-full">
            {activeChat ? <ChatInterface recipientName={activeChat.name} recipientAvatar={activeChat.avatar} recipientRole={activeChat.role} initialMessages={[{
            id: '1',
            text: activeChat.lastMsg,
            sender: 'user',
            timestamp: activeChat.time,
            status: 'read'
          }]} /> : <div className="h-full bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-400">
                Select a conversation to start messaging
              </div>}
          </div>
        </div>
      </main>
    </div>;
}