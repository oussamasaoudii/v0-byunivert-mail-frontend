'use client'

import { useState, useEffect } from 'react'
import { Message, getMessages } from '@/lib/adapters/mail-adapter'
import { Search, RotateCw, MoreVertical, Bell, Settings } from 'lucide-react'
import ContactsButton from './contacts-button'
import DiscuterButton from './discuter-button'

interface MessageListProps {
  selectedMessageId: string | null
  onSelectMessage: (messageId: string) => void
  activeFolder?: string
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

export default function MessageList({ selectedMessageId, onSelectMessage, activeFolder }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'mail' | 'subscription'>('mail')
  
  // Ensure folder is always defined for stable dependency
  const currentFolder = activeFolder || 'inbox'
  
  // Folder titles in French
  const folderTitles: Record<string, string> = {
    inbox: 'Boîte de réception',
    starred: 'Favoris',
    sent: 'Envoyés',
    drafts: 'Brouillons',
    spam: 'Spam',
    trash: 'Corbeille',
  }

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true)
      const allMessages = await getMessages()
      
      // Filter messages based on currentFolder
      let filteredMessages = allMessages
      
      switch (currentFolder) {
        case 'starred':
          filteredMessages = allMessages.filter(msg => msg.starred)
          break
        case 'sent':
          filteredMessages = allMessages.filter(msg => msg.folder === 'sent')
          break
        case 'drafts':
          filteredMessages = allMessages.filter(msg => msg.folder === 'drafts')
          break
        case 'spam':
          filteredMessages = allMessages.filter(msg => msg.folder === 'spam')
          break
        case 'trash':
          filteredMessages = allMessages.filter(msg => msg.folder === 'trash')
          break
        default: // inbox
          filteredMessages = allMessages.filter(msg => msg.folder !== 'sent' && msg.folder !== 'drafts' && msg.folder !== 'spam' && msg.folder !== 'trash')
      }
      
      setMessages(filteredMessages)
      setIsLoading(false)
    }
    
    fetchMessages()
  }, [currentFolder])

  return (
    <div className="flex flex-col bg-[#0a0a0a] min-w-0 w-[420px] flex-shrink-0">
      {/* Top header bar - Folder title + Contact/Chat buttons */}
      <div className="h-[68px] px-6 flex items-center justify-between border-b border-white/[0.08]">
        <h1 className="text-[20px] font-bold text-white">{folderTitles[currentFolder] || 'Boîte de réception'}</h1>
        <div className="flex items-center gap-2">
          <ContactsButton />
          <DiscuterButton />
        </div>
      </div>

      {/* Action toolbar row - Premium dark styling */}
      <div className="h-10 px-6 flex items-center gap-3 border-b border-white/[0.08] bg-white/[0.01]">
        <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-transparent accent-[#00d9a5] cursor-pointer" />
        <button className="p-1.5 text-gray-700 hover:text-gray-500 hover:bg-white/5 rounded transition-colors">
          <RotateCw className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-gray-700 hover:text-gray-500 hover:bg-white/5 rounded transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
        <div className="flex-1" />
        <button className="p-1.5 text-gray-700 hover:text-gray-500 hover:bg-white/5 rounded transition-colors">
          <Bell className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-gray-700 hover:text-gray-500 hover:bg-white/5 rounded transition-colors">
          <Settings className="w-4 h-4" />
        </button>
        <span className="text-[11px] text-gray-700 ml-1">1 / 1</span>
      </div>

      {/* Inner black card container - key visual element */}
      <div className="flex-1 m-3.5 mt-3 bg-[#0a0a0a] rounded-2xl flex flex-col overflow-hidden border border-white/[0.06]">
        {/* Search bar */}
        <div className="px-5 pt-4 pb-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700" />
            <input
              type="text"
              placeholder="Rechercher"
              className="w-full h-10 pl-11 pr-4 bg-white/[0.03] rounded-lg border border-white/[0.08] text-[13px] text-white placeholder:text-gray-700 focus:outline-none focus:border-[#00d9a5]/50 focus:bg-white/[0.05] transition-colors"
            />
          </div>
        </div>

        {/* Mail / Subscription tabs - Premium styling */}
        <div className="px-4 border-b border-white/[0.08] bg-white/[0.01]">
          <div className="flex">
            <button
              onClick={() => setActiveTab('mail')}
              className={`flex items-center gap-2 px-5 py-3 text-[12px] font-semibold transition-all relative ${
                activeTab === 'mail' ? 'text-[#00d9a5]' : 'text-gray-700 hover:text-gray-500'
              }`}
            >
              <MailTabIcon />
              Courrier
              {activeTab === 'mail' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00d9a5]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('subscription')}
              className={`flex items-center gap-2 px-5 py-3 text-[12px] font-semibold transition-all relative ${
                activeTab === 'subscription' ? 'text-[#00d9a5]' : 'text-gray-700 hover:text-gray-500'
              }`}
            >
              <SubscriptionIcon />
              Abonnements
              {activeTab === 'subscription' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00d9a5]" />
              )}
            </button>
          </div>
        </div>

        {/* Message list with scroll */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[92px] bg-[#0f0f0f] rounded-xl animate-pulse" />
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
                  className={`p-3.5 cursor-pointer transition-all rounded-xl ${
                    isSelected
                      ? 'bg-[#0d1f1c] border-2 border-[#00d9a5] shadow-[0_0_20px_rgba(0,217,165,0.15)]'
                      : 'bg-[#0a0a0a] border-2 border-transparent hover:border-[#00d9a5]/20 hover:bg-[#0f0f0f]'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Avatar - gradient teal circle with initial */}
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#00d9a5] to-[#008f70] flex items-center justify-center text-[13px] font-bold text-black flex-shrink-0 shadow-md shadow-[#00d9a5]/20 mt-0.5">
                      {message.from.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2 mb-0.5">
                        <p className="text-[13.5px] font-semibold text-white truncate">
                          {message.from.name}
                        </p>
                        <span className="text-[11px] text-gray-600 flex-shrink-0 whitespace-nowrap">
                          {new Date(message.date).toLocaleString('fr-FR', { 
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className={`text-[12.5px] line-clamp-1 mb-1.5 ${!message.read ? 'font-semibold text-white' : 'text-gray-500 font-medium'}`}>
                        {message.subject}
                      </p>
                      <p className="text-[12px] text-gray-600 line-clamp-2 leading-[1.4]">
                        {message.body.substring(0, 95)}...
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
