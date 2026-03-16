'use client'

import { useState, useEffect } from 'react'
import { Message, getMessages } from '@/lib/adapters/mail-adapter'
import { Search, RotateCw, MoreVertical, Bell, Settings } from 'lucide-react'

interface MessageListProps {
  selectedMessageId: string | null
  onSelectMessage: (messageId: string) => void
}

/* Custom icons */
const MailTabIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
    <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const SubscriptionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

  const handleSelectMessage = (e: React.MouseEvent, messageId: string) => {
    if ((e.target as HTMLElement).closest('button')) {
      e.stopPropagation()
      return
    }
    onSelectMessage(messageId)
  }

  return (
    <div className="flex flex-col bg-[#0c4a42] min-w-0 w-[380px] flex-shrink-0 border-r border-white/5">
      {/* Top header bar */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-white/5">
        <h1 className="text-xl font-bold text-white tracking-tight">Inbox</h1>
        <div className="flex items-center gap-2">
          <button className="px-4 py-1.5 rounded-full border border-white/15 text-xs text-gray-300 hover:bg-white/5 transition-colors flex items-center gap-1.5 font-medium">
            <span className="text-[#00d9a5]">+</span>
            Contact
          </button>
          <button className="px-4 py-1.5 rounded-full border border-white/15 text-xs text-gray-300 hover:bg-white/5 transition-colors flex items-center gap-1.5 font-medium">
            <span>💬</span>
            Chat
          </button>
          <button className="ml-1 px-3 py-1.5 rounded-full border border-[#00d9a5] text-xs text-[#00d9a5] font-semibold hover:bg-[#00d9a5]/8 transition-colors">
            0xa6a***3c7f
          </button>
        </div>
      </div>

      {/* Action bar */}
      <div className="px-6 py-2.5 flex items-center gap-2.5 border-b border-white/5">
        <input type="checkbox" className="w-4 h-4 rounded border border-gray-600 bg-transparent cursor-pointer accent-[#00d9a5]" />
        <button className="p-1 text-gray-500 hover:text-gray-300 transition-colors">
          <RotateCw className="w-4 h-4" />
        </button>
        <button className="p-1 text-gray-500 hover:text-gray-300 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
        <div className="flex-1" />
        <button className="p-1 text-gray-500 hover:text-gray-300 transition-colors">
          <Bell className="w-4 h-4" />
        </button>
        <button className="p-1 text-gray-500 hover:text-gray-300 transition-colors">
          <Settings className="w-4 h-4" />
        </button>
        <span className="text-xs text-gray-500 ml-1">1 / 1</span>
      </div>

      {/* Inner card panel */}
      <div className="flex-1 mx-4 mb-4 mt-3 bg-[#0a0a0a] rounded-2xl flex flex-col overflow-hidden border border-white/5 shadow-xl shadow-black/40">
        {/* Search bar */}
        <div className="px-5 py-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              type="text"
              placeholder="Search"
              className="w-full h-10 pl-10 pr-4 bg-[#0f0f0f] rounded-xl border border-white/8 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00d9a5]/40 transition-all focus:shadow-lg focus:shadow-[#00d9a5]/10"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 border-b border-white/5">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('mail')}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all relative ${
                activeTab === 'mail'
                  ? 'text-[#00d9a5]'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <MailTabIcon />
              Mail
              {activeTab === 'mail' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00d9a5]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('subscription')}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all relative ${
                activeTab === 'subscription'
                  ? 'text-[#00d9a5]'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <SubscriptionIcon />
              Subscription
              {activeTab === 'subscription' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00d9a5]" />
              )}
            </button>
          </div>
        </div>

        {/* Message list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-[#0f0f0f] rounded-lg animate-pulse border border-white/5" />
              ))}
            </>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              No emails
            </div>
          ) : (
            messages.map((message) => {
              const isSelected = selectedMessageId === message.id
              return (
                <div
                  key={message.id}
                  onClick={(e) => handleSelectMessage(e, message.id)}
                  className={`p-3.5 cursor-pointer transition-all rounded-lg border-2 ${
                    isSelected
                      ? 'bg-[#0c1f1c] border-[#00d9a5] shadow-lg shadow-[#00d9a5]/15'
                      : 'bg-[#0b0b0b] border-transparent hover:border-[#00d9a5]/30 hover:bg-[#0f0f0f]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d9a5] to-[#00a080] flex items-center justify-center text-xs font-bold text-black flex-shrink-0 shadow-md shadow-[#00d9a5]/25">
                      {message.from.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className="text-sm font-semibold text-white truncate">
                          {message.from.name}
                        </p>
                      </div>
                      <p className={`text-sm line-clamp-1 mb-0.5 ${!message.read ? 'font-semibold text-white' : 'text-gray-400'}`}>
                        {message.subject}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-snug">
                        {message.body.substring(0, 90)}...
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
