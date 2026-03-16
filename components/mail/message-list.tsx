'use client'

import { useState, useEffect } from 'react'
import { Message, getMessages } from '@/lib/adapters/mail-adapter'
import { Search, RotateCw, MoreVertical, Bell, Settings, Users, MessageSquare } from 'lucide-react'

interface MessageListProps {
  selectedMessageId: string | null
  onSelectMessage: (messageId: string) => void
}

/* Tab icons matching reference */
const MailTabIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const SubscriptionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M2 17L12 22L22 17"/>
    <path d="M2 12L12 17L22 12"/>
    <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
  </svg>
)

export default function MessageList({ selectedMessageId, onSelectMessage }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('mail')

  useEffect(() => {
    getMessages().then((data) => {
      setMessages(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="flex flex-col bg-[#0a0a0a] min-w-0 w-[420px] flex-shrink-0">
      {/* Top header bar - Inbox title + Contact/Chat/Wallet buttons */}
      <div className="h-[72px] px-6 flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-white">Boîte de réception</h1>
        <div className="flex items-center gap-2.5">
          <button className="h-9 px-4 rounded-full border border-white/15 text-[13px] text-gray-300 hover:bg-white/5 transition-colors flex items-center gap-2 font-medium">
            <Users className="w-4 h-4 text-[#00d9a5]" />
            Contacts
          </button>
          <button className="h-9 px-4 rounded-full border border-white/15 text-[13px] text-gray-300 hover:bg-white/5 transition-colors flex items-center gap-2 font-medium">
            <MessageSquare className="w-4 h-4" />
            Discuter
          </button>
        </div>
      </div>

      {/* Action toolbar row */}
      <div className="h-11 px-6 flex items-center gap-3 border-b border-white/[0.06]">
        <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-transparent accent-[#00d9a5]" />
        <button className="p-1.5 text-gray-500 hover:text-gray-300 transition-colors">
          <RotateCw className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-gray-500 hover:text-gray-300 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
        <div className="flex-1" />
        <button className="p-1.5 text-gray-500 hover:text-gray-300 transition-colors">
          <Bell className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-gray-500 hover:text-gray-300 transition-colors">
          <Settings className="w-4 h-4" />
        </button>
        <span className="text-[12px] text-gray-500 ml-1">1 / 1</span>
      </div>

      {/* Inner black card container - key visual element */}
      <div className="flex-1 m-4 mt-3 bg-[#0a0a0a] rounded-2xl flex flex-col overflow-hidden">
        {/* Search bar */}
        <div className="px-5 pt-5 pb-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              type="text"
              placeholder="Rechercher"
              className="w-full h-11 pl-11 pr-4 bg-transparent rounded-xl border border-white/[0.08] text-[14px] text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00d9a5]/40 transition-colors"
            />
          </div>
        </div>

        {/* Mail / Subscription tabs */}
        <div className="px-5 border-b border-white/[0.06]">
          <div className="flex">
            <button
              onClick={() => setActiveTab('mail')}
              className={`flex items-center gap-2 px-5 py-3.5 text-[13px] font-medium transition-colors relative ${
                activeTab === 'mail' ? 'text-[#00d9a5]' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <MailTabIcon />
              Courrier
              {activeTab === 'mail' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00d9a5]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('subscription')}
              className={`flex items-center gap-2 px-5 py-3.5 text-[13px] font-medium transition-colors relative ${
                activeTab === 'subscription' ? 'text-[#00d9a5]' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <SubscriptionIcon />
              Abonnements
              {activeTab === 'subscription' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00d9a5]" />
              )}
            </button>
          </div>
        </div>

        {/* Message list with scroll */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[88px] bg-[#111] rounded-xl animate-pulse" />
              ))}
            </>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              Pas de courrier
            </div>
          ) : (
            messages.map((message) => {
              const isSelected = selectedMessageId === message.id
              return (
                <div
                  key={message.id}
                  onClick={() => onSelectMessage(message.id)}
                  className={`p-4 cursor-pointer transition-all rounded-xl ${
                    isSelected
                      ? 'bg-[#0d1f1c] border-2 border-[#00d9a5] shadow-[0_0_16px_rgba(0,217,165,0.2)]'
                      : 'bg-[#0c0c0c] border-2 border-transparent hover:border-[#00d9a5]/30 hover:bg-[#0f0f0f]'
                  }`}
                >
              <div className="flex items-start gap-3">
                    {/* Avatar - gradient teal circle with initial */}
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#00d9a5] to-[#008f70] flex items-center justify-center text-[14px] font-bold text-black flex-shrink-0 shadow-md shadow-[#00d9a5]/20">
                      {message.from.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-white truncate mb-0.5">
                        {message.from.name}
                      </p>
                      <p className={`text-[13px] line-clamp-1 mb-1 ${!message.read ? 'font-semibold text-white' : 'text-gray-400'}`}>
                        {message.subject}
                      </p>
                      <p className="text-[12px] text-gray-500 line-clamp-2 leading-relaxed">
                        {message.body.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
