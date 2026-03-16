'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Search, Send, Paperclip } from 'lucide-react'

interface Conversation {
  id: string
  name: string
  avatar: string
  initials: string
  lastMessage: string
  lastTime: string
  unread: number
  messages: Message[]
}

interface Message {
  id: string
  sender: 'user' | 'other'
  text: string
  time: string
}

const CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    name: 'Rishak',
    avatar: 'R',
    initials: 'R',
    lastMessage: 'D\'accord, à bientôt',
    lastTime: '14:32',
    unread: 2,
    messages: [
      { id: '1', sender: 'other', text: 'Bonjour, tu es disponible?', time: '14:20' },
      { id: '2', sender: 'user', text: 'Oui, bien sûr!', time: '14:21' },
      { id: '3', sender: 'other', text: 'D\'accord, à bientôt', time: '14:32' },
    ]
  },
  {
    id: '2',
    name: 'Sarah Ahmed',
    avatar: 'SA',
    initials: 'SA',
    lastMessage: 'Merci pour ton aide',
    lastTime: '13:15',
    unread: 0,
    messages: [
      { id: '1', sender: 'other', text: 'Merci pour ton aide', time: '13:15' },
    ]
  },
  {
    id: '3',
    name: 'Mohamed Hassan',
    avatar: 'MH',
    initials: 'MH',
    lastMessage: 'À demain',
    lastTime: '12:45',
    unread: 0,
    messages: [
      { id: '1', sender: 'user', text: 'À demain', time: '12:45' },
    ]
  },
]

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(CONVERSATIONS[0])
  const [messageText, setMessageText] = useState('')

  const filteredConversations = CONVERSATIONS.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return

    const newMessage: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: messageText,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }

    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage]
    })

    setMessageText('')
  }

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] overflow-hidden">
      {/* Conversations List - Left panel */}
      <div className="w-[360px] flex flex-col border-r border-white/[0.08]">
        {/* Header */}
        <div className="h-[68px] px-6 flex items-center justify-between border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <Link href="/mail" className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-400 hover:text-gray-200" />
            </Link>
            <h1 className="text-[20px] font-bold text-white">Messages</h1>
          </div>
          <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700" />
            <input
              type="text"
              placeholder="Rechercher conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-white/[0.03] rounded-lg border border-white/[0.08] text-[13px] text-white placeholder:text-gray-700 focus:outline-none focus:border-[#00d9a5]/50 focus:bg-white/[0.05] transition-colors"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`w-full p-3 rounded-lg text-left transition-all ${
                selectedConversation?.id === conversation.id
                  ? 'bg-[#0d1f1c] border-2 border-[#00d9a5]'
                  : 'hover:bg-white/5 border-2 border-transparent'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d9a5] to-[#008f70] flex items-center justify-center text-[12px] font-bold text-black flex-shrink-0 shadow-md shadow-[#00d9a5]/20 relative">
                  {conversation.initials}
                  {conversation.unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#e74c3c] rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                      {conversation.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-white truncate">{conversation.name}</p>
                  <p className="text-[12px] text-gray-600 truncate">{conversation.lastMessage}</p>
                  <p className="text-[11px] text-gray-700 mt-0.5">{conversation.lastTime}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area - Right panel */}
      <div className="flex-1 bg-[#0a0a0a] p-4 overflow-hidden">
        {selectedConversation ? (
          <div className="h-full bg-[#0a0a0a] rounded-xl border border-white/[0.06] flex flex-col overflow-hidden">
            {/* Chat header */}
            <div className="px-6 py-4 border-b border-white/[0.08] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d9a5] to-[#008f70] flex items-center justify-center text-[12px] font-bold text-black shadow-md shadow-[#00d9a5]/20">
                {selectedConversation.initials}
              </div>
              <div>
                <h2 className="text-[14px] font-semibold text-white">{selectedConversation.name}</h2>
                <p className="text-[11px] text-gray-600">Actif maintenant</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2.5 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-[#00d9a5] text-black'
                        : 'bg-white/5 text-white border border-white/[0.08]'
                    }`}
                  >
                    <p className="text-[13px] leading-relaxed">{message.text}</p>
                    <p className={`text-[10px] mt-1.5 ${message.sender === 'user' ? 'text-black/60' : 'text-gray-600'}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="px-6 py-4 border-t border-white/[0.08] bg-white/[0.01]">
              <div className="flex gap-3">
                <button className="p-2.5 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded-lg transition-colors flex-shrink-0">
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  placeholder="Rédiger un message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="flex-1 bg-white/[0.03] rounded-lg border border-white/[0.08] px-4 py-2.5 text-[13px] text-white placeholder:text-gray-700 focus:outline-none focus:border-[#00d9a5]/50 focus:bg-white/[0.05] transition-colors"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="p-2.5 text-gray-600 hover:text-gray-400 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <div className="w-16 h-16 rounded-full bg-[#00d9a5]/8 flex items-center justify-center mx-auto mb-4 border border-[#00d9a5]/20">
                <Send className="w-8 h-8 text-[#00d9a5]/60" />
              </div>
              <p className="text-gray-600 text-[13px] font-medium">Sélectionner une conversation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
