'use client'

import { useState, useEffect } from 'react'
import { Message, getMessage } from '@/lib/adapters/mail-adapter'
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Quote,
  Link2,
  Mic,
  Send,
} from 'lucide-react'

interface ReadingPaneProps {
  messageId: string | null
}

export default function ReadingPane({ messageId }: ReadingPaneProps) {
  const [message, setMessage] = useState<Message | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [isStarred, setIsStarred] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!messageId) {
      setMessage(null)
      return
    }

    setIsLoading(true)
    setIsStarred(false)
    setMenuOpen(false)
    getMessage(messageId).then((data) => {
      setMessage(data)
      setIsStarred(data?.starred || false)
      setIsLoading(false)
    })
  }, [messageId])

  if (!messageId) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#00d9a5]/8 flex items-center justify-center mx-auto mb-4 border border-[#00d9a5]/20">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#00d9a5]/60">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
              <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <p className="text-gray-600 text-[13px] font-medium">Sélectionner un courrier</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="hidden md:flex flex-1 bg-surface-tertiary p-4 overflow-hidden">
        <div className="flex-1 bg-gradient-to-b from-[#0a1210] to-[#0a0a0a] rounded-xl p-6 space-y-6 border border-[#00d9a5]/10 shadow-[0_0_30px_rgba(0,217,165,0.08)]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 animate-pulse flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-white/5 rounded w-40 animate-pulse" />
              <div className="h-3 bg-white/5 rounded w-56 animate-pulse" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-3 bg-white/5 rounded w-full animate-pulse" />
            <div className="h-3 bg-white/5 rounded w-5/6 animate-pulse" />
            <div className="h-3 bg-white/5 rounded w-4/5 animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (!message) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center bg-surface-tertiary text-gray-600">
        <p className="text-[13px]">Courrier introuvable</p>
      </div>
    )
  }

  return (
    <div className="hidden md:flex flex-1 flex-col bg-surface-tertiary p-4 overflow-hidden">
      {/* Reading panel card - premium dark glass with atmospheric gradient */}
      <div className="flex-1 dark:bg-gradient-to-b dark:from-[#0a1210] dark:to-[#0a0a0a] light:bg-gradient-to-b light:from-[#ffffff] light:to-[#faf8f5] rounded-xl flex flex-col overflow-hidden dark:border dark:border-[#00d9a5]/10 light:border light:border-[#00956a]/10 dark:shadow-[0_0_30px_rgba(0,217,165,0.08)] light:shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
        
        {/* Sender header */}
        <div className="px-6 py-5 dark:border-b dark:border-[#00d9a5]/10 dark:bg-gradient-to-r dark:from-[#0a1210] dark:to-[#0a0a0a] light:border-b light:border-[#00956a]/10 light:bg-gradient-to-r light:from-[#ffffff] light:to-[#faf8f5]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {/* Avatar with gradient */}
              <div className="w-12 h-12 rounded-full dark:bg-gradient-to-br dark:from-[#00d9a5] dark:to-[#008f70] light:bg-gradient-to-br light:from-[#00956a] light:to-[#007d54] flex items-center justify-center flex-shrink-0 dark:shadow-lg dark:shadow-[#00d9a5]/20 light:shadow-lg light:shadow-[#00956a]/15 text-[16px] font-bold dark:text-black light:text-white mt-0.5">
                {message.from.name.charAt(0).toUpperCase()}
              </div>
              
              <div className="flex-1 min-w-0 pt-0.5">
                <h2 className="text-[14px] font-semibold dark:text-white light:text-[#1a1a1a] leading-snug">{message.from.name}</h2>
                <p className="text-[12px] dark:text-[#00d9a5] light:text-[#00956a] mt-0.5 font-medium">{message.from.email}</p>
                <p className="text-[11px] dark:text-gray-600 light:text-[#6b7370] mt-1.5">
                  {new Date(message.date).toLocaleString('fr-FR', { 
                    year: 'numeric',
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 mt-0.5 relative">
              {/* Star button - interactive */}
              <button 
                onClick={() => setIsStarred(!isStarred)}
                className={`p-2 rounded-lg transition-all ${
                  isStarred 
                    ? 'dark:text-[#00d9a5] dark:bg-[#00d9a5]/10 dark:hover:bg-[#00d9a5]/15 light:text-[#00956a] light:bg-[#00956a]/10 light:hover:bg-[#00956a]/15' 
                    : 'dark:text-gray-700 dark:hover:text-gray-500 dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8'
                }`}
                title={isStarred ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              >
                <svg 
                  className="w-4 h-4" 
                  fill={isStarred ? 'currentColor' : 'none'} 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888 1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674-3.976-2.888c-.784-.57-.381-1.81.588-1.81h4.914l1.518-4.674z" />
                </svg>
              </button>

              {/* Dropdown menu button */}
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 dark:text-gray-700 dark:hover:text-gray-500 dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 rounded-lg transition-colors relative"
                title="Plus d'actions"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown menu - actions */}
              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 dark:bg-[#0d0d0d] light:bg-white rounded-lg dark:border dark:border-white/[0.08] light:border light:border-[#00956a]/10 dark:shadow-xl light:shadow-lg overflow-hidden z-50 min-w-[180px]">
                  <button className="w-full px-4 py-2.5 text-[12px] dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 transition-colors text-left">
                    Marquer comme lu
                  </button>
                  <button className="w-full px-4 py-2.5 text-[12px] dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 transition-colors text-left">
                    Archiver
                  </button>
                  <button className="w-full px-4 py-2.5 text-[12px] dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 transition-colors text-left">
                    Mettre en spam
                  </button>
                  <button className="w-full px-4 py-2.5 text-[12px] dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 transition-colors text-left dark:border-t dark:border-white/[0.08] light:border-t light:border-[#00956a]/10">
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Email body content - with atmospheric background */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 relative dark:bg-gradient-to-b dark:from-[#0a1a18] dark:via-[#0a0a0a] dark:to-[#0a0a0a] light:bg-gradient-to-b light:from-white light:via-[#faf8f5] light:to-[#faf8f5]">
          {/* Atmospheric neon glow background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="dark:block light:hidden absolute top-0 left-1/3 w-96 h-96 bg-[#00d9a5]/5 rounded-full blur-3xl opacity-20" />
            <div className="dark:block light:hidden absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#00d9a5]/3 rounded-full blur-3xl opacity-15" />
            <div className="dark:block light:hidden absolute inset-0 bg-gradient-to-b from-[#00d9a5]/[0.02] via-transparent to-transparent" />
            
            <div className="light:block dark:hidden absolute top-0 left-1/3 w-96 h-96 bg-[#00956a]/4 rounded-full blur-3xl opacity-15" />
            <div className="light:block dark:hidden absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#00956a]/2 rounded-full blur-3xl opacity-10" />
            <div className="light:block dark:hidden absolute inset-0 bg-gradient-to-b from-[#00956a]/[0.01] via-transparent to-transparent" />
          </div>

          {/* Content - relative positioning to appear above background */}
          <div className="max-w-3xl space-y-4 relative z-10">
            <p className="dark:text-white light:text-[#1a1a1a] font-medium text-[14px]">Hi, Shiru</p>
            <div className="dark:text-gray-300 light:text-[#2a2a2a] text-[13.5px] leading-relaxed space-y-3 whitespace-pre-wrap">
              {message.body}
            </div>
            
            <div className="pt-3 mt-6 dark:border-t dark:border-white/[0.08] light:border-t light:border-[#00956a]/10 space-y-1.5">
              <p className="dark:text-gray-500 light:text-[#6b7370] text-[13px]">Meilleures salutations,</p>
              <p className="dark:text-white light:text-[#1a1a1a] font-medium text-[13px]">{message.from.name}</p>
            </div>
          </div>

          {/* Attachments section - premium cards */}
          {message.attachments.length > 0 && (
            <div className="mt-8 pt-6 dark:border-t dark:border-white/[0.08] light:border-t light:border-[#00956a]/10 relative z-10">
              <h3 className="text-[13px] font-semibold dark:text-white light:text-[#1a1a1a] mb-4">Pièces jointes ({message.attachments.length})</h3>
              <div className="grid grid-cols-2 gap-3">
                {message.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="relative rounded-lg overflow-hidden dark:bg-gradient-to-br dark:from-[#0a3d35] dark:via-[#0c3b33] dark:to-[#082b25] light:bg-gradient-to-br light:from-[#f3f8f6] light:via-[#f0f5f3] light:to-[#ecf3f0] dark:border dark:border-white/[0.08] light:border light:border-[#00956a]/15 dark:hover:border-[#00d9a5]/40 light:hover:border-[#00956a]/40 transition-all cursor-pointer group h-[130px] dark:shadow-sm light:shadow-sm"
                  >
                    {/* CRM-style visualization */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full dark:border dark:border-[#00d9a5]/30 light:border light:border-[#00956a]/30 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full dark:border dark:border-[#00d9a5]/40 light:border light:border-[#00956a]/40 flex items-center justify-center dark:bg-[#00d9a5]/5 light:bg-[#00956a]/8">
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 dark:text-[#00d9a5] light:text-[#00956a]">
                              <circle cx="12" cy="12" r="3" fill="currentColor"/>
                              <circle cx="12" cy="4" r="2" fill="currentColor" opacity="0.6"/>
                              <circle cx="19" cy="8" r="2" fill="currentColor" opacity="0.6"/>
                              <circle cx="19" cy="16" r="2" fill="currentColor" opacity="0.6"/>
                              <circle cx="12" cy="20" r="2" fill="currentColor" opacity="0.6"/>
                              <circle cx="5" cy="16" r="2" fill="currentColor" opacity="0.6"/>
                              <circle cx="5" cy="8" r="2" fill="currentColor" opacity="0.6"/>
                              <path d="M12 7v2M16 9.5l-1.5 1M16 14.5l-1.5-1M12 15v2M8 14.5l1.5-1M8 9.5l1.5 1" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                            </svg>
                          </div>
                        </div>
                        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 dark:bg-[#00d9a5] light:bg-[#00956a] dark:text-black light:text-white text-[8px] font-bold px-1.5 py-0.5 rounded dark:shadow-md dark:shadow-[#00d9a5]/30 light:shadow-md light:shadow-[#00956a]/20">
                          CRM
                        </div>
                      </div>
                      
                      <div className="absolute top-3 right-5 w-1.5 h-1.5 rounded-full dark:bg-[#00d9a5]/40 light:bg-[#00956a]/40" />
                      <div className="absolute top-6 left-3 w-1 h-1 rounded-full dark:bg-[#00d9a5]/30 light:bg-[#00956a]/30" />
                      <div className="absolute bottom-5 right-3 w-1 h-1 rounded-full dark:bg-[#00d9a5]/30 light:bg-[#00956a]/30" />
                      <div className="absolute bottom-7 left-5 w-1.5 h-1.5 rounded-full dark:bg-[#00d9a5]/20 light:bg-[#00956a]/20" />
                    </div>
                    
                    <div 
                      className="absolute inset-0 opacity-[0.02]" 
                      style={{
                        backgroundImage: `linear-gradient(rgba(${0}, ${217}, ${165}, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,165,1) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                      }}
                    />
                    
                    <div className="absolute inset-0 dark:bg-[#00d9a5]/5 light:bg-[#00956a]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick reply composer */}
        <div className="dark:border-t dark:border-white/[0.08] light:border-t light:border-[#00956a]/10 p-4 dark:bg-white/[0.01] light:bg-[#f8f7f6]/50">
          <div className="dark:bg-[#0c0c0c] light:bg-white rounded-lg dark:border dark:border-white/[0.08] light:border light:border-[#00956a]/15 overflow-hidden dark:shadow-sm light:shadow-sm">
            {/* Text input */}
            <div className="px-5 py-4">
              <textarea
                placeholder="Rédiger votre message..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full dark:bg-transparent light:bg-transparent dark:text-white light:text-[#1a1a1a] dark:placeholder:text-gray-700 light:placeholder:text-[#00956a]/50 text-[13px] resize-none focus:outline-none min-h-[56px] font-normal leading-relaxed"
              />
            </div>
            
            {/* Formatting toolbar */}
            <div className="px-4 py-3 dark:border-t dark:border-white/[0.08] light:border-t light:border-[#00956a]/10 flex items-center justify-between dark:bg-white/[0.01] light:bg-[#f8f7f6]/30">
              <div className="flex items-center gap-0.5">
                <button className="p-1.5 dark:text-gray-700 dark:hover:text-gray-500 dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 rounded transition-colors" title="Bold">
                  <Bold className="w-4 h-4" />
                </button>
                <button className="p-1.5 dark:text-gray-700 dark:hover:text-gray-500 dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 rounded transition-colors" title="Italic">
                  <Italic className="w-4 h-4" />
                </button>
                <button className="p-1.5 dark:text-gray-700 dark:hover:text-gray-500 dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 rounded transition-colors" title="Underline">
                  <Underline className="w-4 h-4" />
                </button>
                <div className="w-px h-4 dark:bg-white/5 light:bg-[#00956a]/10 mx-1" />
                <button className="p-1.5 dark:text-gray-700 dark:hover:text-gray-500 dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 rounded transition-colors" title="List">
                  <List className="w-4 h-4" />
                </button>
                <button className="p-1.5 dark:text-gray-700 dark:hover:text-gray-500 dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 rounded transition-colors" title="Ordered list">
                  <ListOrdered className="w-4 h-4" />
                </button>
                <div className="w-px h-4 dark:bg-white/5 light:bg-[#00956a]/10 mx-1" />
                <button className="p-1.5 dark:text-gray-700 dark:hover:text-gray-500 dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 rounded transition-colors" title="Align left">
                  <AlignLeft className="w-4 h-4" />
                </button>
                <button className="p-1.5 dark:text-gray-700 dark:hover:text-gray-500 dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 rounded transition-colors" title="Align center">
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button className="p-1.5 dark:text-gray-700 dark:hover:text-gray-500 dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 rounded transition-colors" title="Align right">
                  <AlignRight className="w-4 h-4" />
                </button>
                <button className="p-1.5 dark:text-gray-700 dark:hover:text-gray-500 dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 rounded transition-colors" title="Justify">
                  <AlignJustify className="w-4 h-4" />
                </button>
                <div className="w-px h-4 dark:bg-white/5 light:bg-[#00956a]/10 mx-1" />
                <button className="p-1.5 dark:text-gray-700 dark:hover:text-gray-500 dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 rounded transition-colors" title="Quote">
                  <Quote className="w-4 h-4" />
                </button>
                <button className="p-1.5 dark:text-gray-700 dark:hover:text-gray-500 dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 rounded transition-colors" title="Link">
                  <Link2 className="w-4 h-4" />
                </button>
                <button className="p-1.5 dark:text-gray-700 dark:hover:text-gray-500 dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 rounded transition-colors" title="Voice">
                  <Mic className="w-4 h-4" />
                </button>
              </div>
              
              {/* Send button */}
              <button className="h-8 px-4 dark:bg-[#00d9a5] dark:text-black light:bg-[#00956a] light:text-white rounded-full text-[12px] font-semibold dark:hover:bg-[#00d9a5]/90 dark:active:bg-[#00d9a5]/80 light:hover:bg-[#007d54] light:active:bg-[#006a46] transition-colors flex items-center gap-2 dark:shadow-md dark:shadow-[#00d9a5]/20 light:shadow-md light:shadow-[#00956a]/20">
                <Send className="w-3.5 h-3.5" />
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
