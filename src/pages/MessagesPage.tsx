import React, { useState } from 'react';
import { Header } from '../components/dashboard/Header';
import { Search, Edit, Star, MoreHorizontal, Paperclip, Send, Phone, Video } from 'lucide-react';
const messages = [{
  id: 1,
  sender: 'TechGiant Solutions',
  avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  subject: 'Question about new inventory policy',
  preview: 'Hi there, we noticed the new policy update regarding...',
  time: '10:24 AM',
  unread: true,
  type: 'Vendor'
}, {
  id: 2,
  sender: 'Alice Johnson',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  subject: 'Order #12345 not received',
  preview: 'I placed an order 5 days ago and it still says processing...',
  time: 'Yesterday',
  unread: true,
  type: 'Buyer'
}, {
  id: 3,
  sender: 'System Notification',
  avatar: 'https://ui-avatars.com/api/?name=System&background=278687&color=fff',
  subject: 'Platform Maintenance Scheduled',
  preview: 'We will be performing scheduled maintenance on Sunday...',
  time: 'Yesterday',
  unread: false,
  type: 'System'
}, {
  id: 4,
  sender: 'Fashion Forward',
  avatar: 'https://images.unsplash.com/photo-1554774853-719586f8c277?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  subject: 'Re: Partnership Agreement',
  preview: 'Thanks for sending over the documents. We have signed...',
  time: 'Oct 24',
  unread: false,
  type: 'Vendor'
}, {
  id: 5,
  sender: 'Michael Smith',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  subject: 'Return Request',
  preview: 'The item I received is damaged. I would like to return it...',
  time: 'Oct 22',
  unread: false,
  type: 'Buyer'
}];
export function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);
  return <div className="min-h-screen bg-[#E8F3F1] font-sans text-gray-900 pb-12">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 pt-8 h-[calc(100vh-64px-32px)]">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full overflow-hidden flex">
          {/* Sidebar / Message List */}
          <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-100 flex flex-col bg-white">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Inbox</h2>
                <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-full">
                  <Edit className="w-5 h-5" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search messages..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#278687]/20 focus:border-[#278687]" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {messages.map(msg => <div key={msg.id} onClick={() => setSelectedMessage(msg)} className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${selectedMessage.id === msg.id ? 'bg-[#E8F3F1]/50 border-l-4 border-l-[#278687]' : 'border-l-4 border-l-transparent'}`}>
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-sm font-semibold ${msg.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                        {msg.sender}
                      </h4>
                      {msg.unread && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                    </div>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-800 mb-1 truncate">
                    {msg.subject}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {msg.preview}
                  </div>
                  <div className="mt-2">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${msg.type === 'Vendor' ? 'bg-purple-100 text-purple-700' : msg.type === 'Buyer' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                      {msg.type}
                    </span>
                  </div>
                </div>)}
            </div>
          </div>

          {/* Message Detail */}
          <div className="hidden md:flex flex-1 flex-col bg-white">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img src={selectedMessage.avatar} alt="" className="w-12 h-12 rounded-full border border-gray-200" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {selectedMessage.sender}
                  </h3>
                  <div className="text-sm text-gray-500">To: Support Team</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-full">
                  <Star className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {selectedMessage.subject}
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p>Hello Support Team,</p>
                <p className="mt-4">{selectedMessage.preview}</p>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam auctor, nisl eget ultricies tincidunt, nisl nisl
                  aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam
                  auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,
                  eget ultricies nisl nisl eget nisl.
                </p>
                <p className="mt-4">
                  Best regards,
                  <br />
                  {selectedMessage.sender}
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="text-sm font-bold text-gray-900 mb-4">
                  Previous conversation
                </h4>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                      You
                    </div>
                    <div>
                      <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none text-sm text-gray-700">
                        Hi there! Thanks for reaching out. Could you provide
                        more details about the issue?
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Oct 23, 2:30 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reply Box */}
            <div className="p-4 border-t border-gray-100">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-2">
                <textarea placeholder="Type your reply..." className="w-full bg-transparent border-none focus:ring-0 resize-none text-sm p-2 h-24"></textarea>
                <div className="flex justify-between items-center px-2 pb-1">
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200">
                      <Paperclip className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#278687] text-white rounded-lg text-sm font-medium hover:bg-[#1e6b6c] transition-colors">
                    Send Reply <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
}