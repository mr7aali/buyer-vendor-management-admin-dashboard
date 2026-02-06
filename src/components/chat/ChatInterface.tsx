import React, { useEffect, useState, useRef } from 'react';
import { Send, Paperclip, MoreVertical, Check, CheckCheck } from 'lucide-react';
interface Message {
  id: string;
  text: string;
  sender: 'admin' | 'user';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}
interface ChatInterfaceProps {
  recipientName: string;
  recipientAvatar: string;
  recipientRole: string;
  messages: Message[];
  onSendMessage?: (text: string) => void;
}
export function ChatInterface({
  recipientName,
  recipientAvatar,
  recipientRole,
  messages,
  onSendMessage
}: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setNewMessage('');
    onSendMessage?.(newMessage);
  };
  return <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={recipientAvatar} alt={recipientName} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{recipientName}</h3>
            <p className="text-xs text-gray-500">{recipientRole}</p>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map(msg => <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${msg.sender === 'admin' ? 'bg-[#278687] text-white rounded-br-none' : 'bg-white text-gray-900 border border-gray-100 rounded-bl-none'}`}>
              <p className="text-sm">{msg.text}</p>
              <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${msg.sender === 'admin' ? 'text-white/80' : 'text-gray-400'}`}>
                <span>{msg.timestamp}</span>
                {msg.sender === 'admin' && (msg.status === 'read' ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />)}
              </div>
            </div>
          </div>)}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2">
          <button type="button" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]" />
          <button type="submit" disabled={!newMessage.trim()} className="p-2 bg-[#278687] text-white rounded-full hover:bg-[#1e6b6c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>;
}
