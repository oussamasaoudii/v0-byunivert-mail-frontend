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
      <div className="flex-1 bg-gradient-to-b from-[#0a1210] to-[#0a0a0a] rounded-xl flex flex-col overflow-hidden border border-[#00d9a5]/10 shadow-[0_0_30px_rgba(0,217,165,0.08)]">
        
        {/* Sender header */}
        <div className="px-6 py-5 border-b border-[#00d9a5]/10 bg-gradient-to-r from-[#0a1210] to-[#0a0a0a]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {/* Avatar with gradient */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d9a5] to-[#008f70] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#00d9a5]/20 text-[16px] font-bold text-black mt-0.5">
                {message.from.name.charAt(0).toUpperCase()}
              </div>
              
              <div className="flex-1 min-w-0 pt-0.5">
                <h2 className="text-[14px] font-semibold text-white leading-snug">{message.from.name}</h2>
                <p className="text-[12px] text-[#00d9a5] mt-0.5 font-medium">{message.from.email}</p>
                <p className="text-[11px] text-gray-600 mt-1.5">
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
                    ? 'text-[#00d9a5] bg-[#00d9a5]/10 hover:bg-[#00d9a5]/15' 
                    : 'text-gray-700 hover:text-gray-500 hover:bg-white/5'
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
                className="p-2 text-gray-700 hover:text-gray-500 hover:bg-white/5 rounded-lg transition-colors relative"
                title="Plus d'actions"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown menu - actions */}
              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-[#0d0d0d] rounded-lg border border-white/[0.08] shadow-xl overflow-hidden z-50 min-w-[180px]">
                  <button className="w-full px-4 py-2.5 text-[12px] text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                    Marquer comme lu
                  </button>
                  <button className="w-full px-4 py-2.5 text-[12px] text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                    Archiver
                  </button>
                  <button className="w-full px-4 py-2.5 text-[12px] text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                    Mettre en spam
                  </button>
                  <button className="w-full px-4 py-2.5 text-[12px] text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left border-t border-white/[0.08]">
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Email body content - with atmospheric background */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 relative bg-gradient-to-b from-[#0a1a18] via-[#0a0a0a] to-[#0a0a0a]">
          {/* Atmospheric neon glow background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#00d9a5]/5 rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#00d9a5]/3 rounded-full blur-3xl opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#00d9a5]/[0.02] via-transparent to-transparent" />
          </div>

          {/* Content - relative positioning to appear above background */}
          <div className="max-w-3xl space-y-4 relative z-10">
            <p className="text-white font-medium text-[14px]">Hi, Shiru</p>
            <div className="text-gray-300 text-[13.5px] leading-relaxed space-y-3 whitespace-pre-wrap">
              {message.body}
            </div>
            
            <div className="pt-3 mt-6 border-t border-white/[0.08] space-y-1.5">
              <p className="text-gray-500 text-[13px]">Meilleures salutations,</p>
              <p className="text-white font-medium text-[13px]">{message.from.name}</p>
            </div>
          </div>

          {/* Attachments section - premium cards */}
          {message.attachments.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/[0.08] relative z-10">
              <h3 className="text-[13px] font-semibold text-white mb-4">Pièces jointes ({message.attachments.length})</h3>
              <div className="grid grid-cols-2 gap-3">
                {message.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="relative rounded-lg overflow-hidden bg-gradient-to-br from-[#0a3d35] via-[#0c3b33] to-[#082b25] border border-white/[0.08] hover:border-[#00d9a5]/40 transition-all cursor-pointer group h-[130px] shadow-sm"
                  >
                    {/* CRM-style visualization */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full border border-[#00d9a5]/30 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full border border-[#00d9a5]/40 flex items-center justify-center bg-[#00d9a5]/5">
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#00d9a5]">
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
                        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 bg-[#00d9a5] text-black text-[8px] font-bold px-1.5 py-0.5 rounded shadow-md shadow-[#00d9a5]/30">
                          CRM
                        </div>
                      </div>
                      
                      <div className="absolute top-3 right-5 w-1.5 h-1.5 rounded-full bg-[#00d9a5]/40" />
                      <div className="absolute top-6 left-3 w-1 h-1 rounded-full bg-[#00d9a5]/30" />
                      <div className="absolute bottom-5 right-3 w-1 h-1 rounded-full bg-[#00d9a5]/30" />
                      <div className="absolute bottom-7 left-5 w-1.5 h-1.5 rounded-full bg-[#00d9a5]/20" />
                    </div>
                    
                    <div 
                      className="absolute inset-0 opacity-[0.02]" 
                      style={{
                        backgroundImage: 'linear-gradient(rgba(0,217,165,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,165,1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }}
                    />
                    
                    <div className="absolute inset-0 bg-[#00d9a5]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick reply composer */}
        <div className="border-t border-white/[0.08] p-4 bg-white/[0.01]">
          <div className="bg-[#0c0c0c] rounded-lg border border-white/[0.08] overflow-hidden shadow-sm">
            {/* Text input */}
            <div className="px-5 py-4">
              <textarea
                placeholder="Rédiger votre message..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full bg-transparent text-white placeholder:text-gray-700 text-[13px] resize-none focus:outline-none min-h-[56px] font-normal leading-relaxed"
              />
            </div>
            
            {/* Formatting toolbar */}
            <div className="px-4 py-3 border-t border-white/[0.08] flex items-center justify-between bg-white/[0.01]">
              <div className="flex items-center gap-0.5">
                <button className="p-1.5 text-gray-700 hover:text-gray-500 hover:bg-white/5 rounded transition-colors" title="Bold">
                  <Bold className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-700 hover:text-gray-500 hover:bg-white/5 rounded transition-colors" title="Italic">
                  <Italic className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-700 hover:text-gray-500 hover:bg-white/5 rounded transition-colors" title="Underline">
                  <Underline className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-white/5 mx-1" />
                <button className="p-1.5 text-gray-700 hover:text-gray-500 hover:bg-white/5 rounded transition-colors" title="List">
                  <List className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-700 hover:text-gray-500 hover:bg-white/5 rounded transition-colors" title="Ordered list">
                  <ListOrdered className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-white/5 mx-1" />
                <button className="p-1.5 text-gray-700 hover:text-gray-500 hover:bg-white/5 rounded transition-colors" title="Align left">
                  <AlignLeft className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-700 hover:text-gray-500 hover:bg-white/5 rounded transition-colors" title="Align center">
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-700 hover:text-gray-500 hover:bg-white/5 rounded transition-colors" title="Align right">
                  <AlignRight className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-700 hover:text-gray-500 hover:bg-white/5 rounded transition-colors" title="Justify">
                  <AlignJustify className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-white/5 mx-1" />
                <button className="p-1.5 text-gray-700 hover:text-gray-500 hover:bg-white/5 rounded transition-colors" title="Quote">
                  <Quote className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-700 hover:text-gray-500 hover:bg-white/5 rounded transition-colors" title="Link">
                  <Link2 className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-700 hover:text-gray-500 hover:bg-white/5 rounded transition-colors" title="Voice">
                  <Mic className="w-4 h-4" />
                </button>
              </div>
              
              {/* Send button */}
              <button className="h-8 px-4 bg-[#00d9a5] text-black rounded-full text-[12px] font-semibold hover:bg-[#00d9a5]/90 active:bg-[#00d9a5]/80 transition-colors flex items-center gap-2 shadow-md shadow-[#00d9a5]/20">
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
