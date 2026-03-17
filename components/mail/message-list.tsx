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
  const [menuOpen, setMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  
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
      
      // Ensure allMessages is an array
      if (!Array.isArray(allMessages)) {
        setMessages([])
        setIsLoading(false)
        return
      }
      
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
    <div className="flex flex-col dark:bg-[#0a0a0a] light:bg-card min-w-0 w-[420px] flex-shrink-0" suppressHydrationWarning>
      {/* Top header bar - Folder title + Contact/Chat buttons */}
      <div className="h-[68px] px-6 flex items-center justify-between dark:border-b dark:border-white/[0.08] light:border-b light:border-border" suppressHydrationWarning>
        <h1 className="text-[20px] font-bold dark:text-white light:text-foreground">{folderTitles[currentFolder] || 'Boîte de réception'}</h1>
        <div className="flex items-center gap-2">
          <ContactsButton />
          <DiscuterButton />
        </div>
      </div>

      {/* Action toolbar row - Premium styling with interactive elements */}
      <div className="h-10 px-6 flex items-center gap-3 dark:border-b dark:border-white/[0.08] dark:bg-white/[0.01] light:border-b light:border-border light:bg-secondary/30" suppressHydrationWarning>
        <input type="checkbox" className="w-4 h-4 rounded dark:border-muted light:border-border dark:bg-transparent light:bg-card dark:accent-primary light:accent-primary cursor-pointer" />
        <button 
          onClick={() => window.location.reload()}
          className="p-1.5 dark:text-muted-foreground dark:hover:text-gray-500 dark:hover:bg-white/5 light:text-muted-foreground light:hover:text-primary light:hover:bg-primary/8 rounded transition-colors"
          title="Actualiser"
        >
          <RotateCw className="w-4 h-4" />
        </button>
        
        {/* More options button with dropdown */}
        <div className="relative">
          <button 
            onClick={() => {
              setMenuOpen(!menuOpen)
              setNotificationsOpen(false)
              setSettingsOpen(false)
            }}
            className={`p-1.5 rounded transition-colors ${menuOpen ? 'dark:text-primary dark:bg-primary/10 light:text-primary light:bg-primary/10' : 'dark:text-muted-foreground dark:hover:text-gray-500 dark:hover:bg-white/5 light:text-muted-foreground light:hover:text-primary light:hover:bg-primary/8'}`}
            title="Plus d'options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {menuOpen && (
            <div className="absolute left-0 top-full mt-2 dark:bg-[#0d0d0d] light:bg-card rounded-lg dark:border dark:border-primary/20 light:border light:border-border dark:shadow-[0_4px_20px_rgba(0,217,165,0.15)] light:shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden z-50 min-w-[180px]">
              <button onClick={() => setMenuOpen(false)} className="w-full px-4 py-2.5 text-[12px] dark:text-muted-foreground dark:hover:text-primary dark:hover:bg-primary/5 light:text-muted-foreground light:hover:text-primary light:hover:bg-primary/8 transition-colors text-left flex items-center gap-2">
                <span className="w-4 h-4 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </span>
                Sélectionner tout
              </button>
              <button onClick={() => setMenuOpen(false)} className="w-full px-4 py-2.5 text-[12px] dark:text-muted-foreground dark:hover:text-primary dark:hover:bg-primary/5 light:text-muted-foreground light:hover:text-primary light:hover:bg-primary/8 transition-colors text-left flex items-center gap-2">
                <span className="w-4 h-4 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </span>
                Marquer comme lu
              </button>
              <button onClick={() => setMenuOpen(false)} className="w-full px-4 py-2.5 text-[12px] dark:text-muted-foreground dark:hover:text-primary dark:hover:bg-primary/5 light:text-muted-foreground light:hover:text-primary light:hover:bg-primary/8 transition-colors text-left flex items-center gap-2">
                <span className="w-4 h-4 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V4z" /></svg>
                </span>
                Archiver
              </button>
              <button onClick={() => setMenuOpen(false)} className="w-full px-4 py-2.5 text-[12px] dark:text-gray-400 dark:hover:text-[#00d9a5] dark:hover:bg-[#00d9a5]/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 transition-colors text-left flex items-center gap-2 dark:border-t dark:border-white/[0.08] light:border-t light:border-[#00956a]/8">
                <span className="w-4 h-4 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 -10a9 9 0 110 18 9 9 0 010-18z" /></svg>
                </span>
                Mettre en spam
              </button>
              <button onClick={() => setMenuOpen(false)} className="w-full px-4 py-2.5 text-[12px] dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-500/10 light:text-red-600 light:hover:text-red-500 light:hover:bg-red-50 transition-colors text-left flex items-center gap-2">
                <span className="w-4 h-4 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </span>
                Supprimer
              </button>
            </div>
          )}
        </div>
        
        <div className="flex-1" />
        
        {/* Notifications button with dropdown */}
        <div className="relative">
          <button 
            onClick={() => {
              setNotificationsOpen(!notificationsOpen)
              setMenuOpen(false)
              setSettingsOpen(false)
            }}
            className={`p-1.5 rounded transition-colors ${notificationsOpen ? 'dark:text-[#00d9a5] dark:bg-[#00d9a5]/10 light:text-[#00956a] light:bg-[#00956a]/10' : 'dark:text-gray-700 dark:hover:text-gray-500 dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8'}`}
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-2 dark:bg-[#0d0d0d] light:bg-white rounded-lg dark:border dark:border-[#00d9a5]/20 light:border light:border-[#00956a]/15 dark:shadow-[0_4px_20px_rgba(0,217,165,0.15)] light:shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden z-50 min-w-[200px]">
              <div className="px-4 py-3 dark:border-b dark:border-white/[0.08] light:border-b light:border-[#00956a]/8">
                <p className="text-[11px] font-semibold dark:text-gray-300 light:text-[#1a1a1a]">Notifications récentes</p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="px-4 py-3 dark:hover:bg-white/[0.02] light:hover:bg-[#00956a]/5 transition-colors cursor-pointer dark:border-b dark:border-white/[0.08] light:border-b light:border-[#00956a]/8">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full dark:bg-[#00d9a5] light:bg-[#00956a] mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-[12px] dark:text-gray-300 light:text-[#1a1a1a] font-medium">Nouveau message de Rishak</p>
                      <p className="text-[11px] dark:text-gray-600 light:text-[#6b7370] mt-0.5">Il y a 2 minutes</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 dark:hover:bg-white/[0.02] light:hover:bg-[#00956a]/5 transition-colors cursor-pointer dark:border-b dark:border-white/[0.08] light:border-b light:border-[#00956a]/8">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full dark:bg-[#008f70] light:bg-[#007d54] flex items-center justify-center flex-shrink-0">
                      <span className="text-[11px] font-medium dark:text-white light:text-white">✓</span>
                    </div>
                    <div>
                      <p className="text-[12px] dark:text-gray-300 light:text-[#1a1a1a] font-medium">Message marqué comme lu</p>
                      <p className="text-[11px] dark:text-gray-600 light:text-[#6b7370] mt-0.5">Il y a 5 minutes</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 dark:hover:bg-white/[0.02] light:hover:bg-[#00956a]/5 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full dark:bg-orange-500/10 light:bg-orange-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-[11px] font-medium dark:text-orange-400 light:text-orange-600">!</span>
                    </div>
                    <div>
                      <p className="text-[12px] dark:text-gray-300 light:text-[#1a1a1a] font-medium">Confirmation de sécurité requise</p>
                      <p className="text-[11px] dark:text-gray-600 light:text-[#6b7370] mt-0.5">Il y a 1 jour</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Settings button with dropdown */}
        <div className="relative">
          <button 
            onClick={() => {
              setSettingsOpen(!settingsOpen)
              setMenuOpen(false)
              setNotificationsOpen(false)
            }}
            className={`p-1.5 rounded transition-colors ${settingsOpen ? 'dark:text-[#00d9a5] dark:bg-[#00d9a5]/10 light:text-[#00956a] light:bg-[#00956a]/10' : 'dark:text-gray-700 dark:hover:text-gray-500 dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8'}`}
            title="Paramètres"
          >
            <Settings className="w-4 h-4" />
          </button>
          {settingsOpen && (
            <div className="absolute right-0 top-full mt-2 dark:bg-[#0d0d0d] light:bg-white rounded-lg dark:border dark:border-[#00d9a5]/20 light:border light:border-[#00956a]/15 dark:shadow-[0_4px_20px_rgba(0,217,165,0.15)] light:shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden z-50 min-w-[200px]">
              <a href="/mail/settings" className="w-full px-4 py-2.5 text-[12px] dark:text-gray-400 dark:hover:text-[#00d9a5] dark:hover:bg-[#00d9a5]/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 transition-colors text-left flex items-center gap-2 block">
                <Settings className="w-3.5 h-3.5" />
                Paramètres généraux
              </a>
              <a href="/mail/signatures" className="w-full px-4 py-2.5 text-[12px] dark:text-gray-400 dark:hover:text-[#00d9a5] dark:hover:bg-[#00d9a5]/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 transition-colors text-left flex items-center gap-2 block">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                Signatures
              </a>
              <a href="/mail/rules" className="w-full px-4 py-2.5 text-[12px] dark:text-gray-400 dark:hover:text-[#00d9a5] dark:hover:bg-[#00d9a5]/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 transition-colors text-left flex items-center gap-2 block dark:border-t dark:border-white/[0.08] light:border-t light:border-[#00956a]/8">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                Règles de filtrage
              </a>
            </div>
          )}
        </div>
        
        <span className="text-[11px] dark:text-gray-700 light:text-[#6b7370] ml-1">{messages.length} / {messages.length}</span>
      </div>

      {/* Inner card container - soft warm surfaces in light mode */}
      <div className="flex-1 m-3.5 mt-3 dark:bg-gradient-to-b dark:from-[#0a1210] dark:to-[#0a0a0a] light:bg-gradient-to-b light:from-[#fdfcfb] light:to-[#faf8f5] rounded-2xl flex flex-col overflow-hidden dark:border dark:border-[#00d9a5]/10 light:border light:border-[#00956a]/8 dark:shadow-[0_0_30px_rgba(0,217,165,0.08)] light:shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
        {/* Search bar */}
        <div className="px-5 pt-4 pb-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-gray-700 light:text-[#00956a]/50" />
            <input
              type="text"
              placeholder="Rechercher"
              className="w-full h-10 pl-11 pr-4 dark:bg-white/[0.03] dark:border dark:border-white/[0.08] light:bg-[#f8f7f6] light:border light:border-[#00956a]/15 rounded-lg text-[13px] dark:text-white light:text-[#1a1a1a] dark:placeholder:text-gray-700 light:placeholder:text-[#00956a]/50 focus:outline-none dark:focus:border-[#00d9a5]/50 light:focus:border-[#00956a]/50 dark:focus:bg-white/[0.05] light:focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Mail / Subscription tabs - Premium styling */}
        <div className="px-4 dark:border-b dark:border-white/[0.08] dark:bg-white/[0.01] light:border-b light:border-[#00956a]/8 light:bg-[#faf8f5]/40">
          <div className="flex">
            <button
              onClick={() => setActiveTab('mail')}
              className={`flex items-center gap-2 px-5 py-3 text-[12px] font-semibold transition-all relative ${
                activeTab === 'mail' ? 'dark:text-[#00d9a5] light:text-[#00956a]' : 'dark:text-gray-700 dark:hover:text-gray-500 light:text-[#6b7370] light:hover:text-[#00956a]'
              }`}
            >
              <MailTabIcon />
              Courrier
              {activeTab === 'mail' && (
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 dark:bg-[#00d9a5] light:bg-[#00956a]`} />
              )}
            </button>
            <button
              onClick={() => setActiveTab('subscription')}
              className={`flex items-center gap-2 px-5 py-3 text-[12px] font-semibold transition-all relative ${
                activeTab === 'subscription' ? 'dark:text-[#00d9a5] light:text-[#00956a]' : 'dark:text-gray-700 dark:hover:text-gray-500 light:text-[#6b7370] light:hover:text-[#00956a]'
              }`}
            >
              <SubscriptionIcon />
              Abonnements
              {activeTab === 'subscription' && (
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 dark:bg-[#00d9a5] light:bg-[#00956a]`} />
              )}
            </button>
          </div>
        </div>

        {/* Message list with scroll */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[92px] dark:bg-[#0f0f0f] light:bg-[#fdfcfb] rounded-xl animate-pulse dark:border dark:border-white/[0.05] light:border light:border-[#00956a]/8" />
              ))}
            </>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full dark:text-gray-500 light:text-[#6b7370] text-sm">
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
                      ? 'dark:bg-[#0d1f1c] dark:border-2 dark:border-[#00d9a5] dark:shadow-[0_0_20px_rgba(0,217,165,0.15)] light:bg-[#f9f7f4] light:border-2 light:border-[#00956a] light:shadow-[0_0_16px_rgba(0,149,106,0.15)]'
                      : 'dark:bg-[#0a0a0a] dark:border-2 dark:border-transparent dark:hover:border-[#00d9a5]/20 dark:hover:bg-[#0f0f0f] light:bg-[#fdfcfb] light:border-2 light:border-transparent light:hover:border-[#00956a]/15 light:hover:bg-[#f9f7f4]'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Avatar - gradient teal circle with initial */}
                    <div className="w-11 h-11 rounded-full dark:bg-gradient-to-br dark:from-[#00d9a5] dark:to-[#008f70] light:bg-gradient-to-br light:from-[#00956a] light:to-[#007d54] flex items-center justify-center text-[13px] font-bold dark:text-black light:text-white flex-shrink-0 dark:shadow-md dark:shadow-[#00d9a5]/20 light:shadow-md light:shadow-[#00956a]/15 mt-0.5">
                      {message.from.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2 mb-0.5">
                        <p className="text-[13.5px] font-semibold dark:text-white light:text-[#1a1a1a] truncate">
                          {message.from.name}
                        </p>
                        <span className="text-[11px] dark:text-gray-600 light:text-[#6b7370] flex-shrink-0 whitespace-nowrap">
                          {new Date(message.date).toLocaleString('fr-FR', { 
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className={`text-[12.5px] line-clamp-1 mb-1.5 ${!message.read ? 'font-semibold dark:text-white light:text-[#1a1a1a]' : 'dark:text-gray-500 light:text-[#6b7370] font-medium'}`}>
                        {message.subject}
                      </p>
                      <p className="text-[12px] dark:text-gray-600 light:text-[#8b9295] line-clamp-2 leading-[1.4]">
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
