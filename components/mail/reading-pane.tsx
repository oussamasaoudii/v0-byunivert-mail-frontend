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

  useEffect(() => {
    if (!messageId) {
      setMessage(null)
      return
    }

    setIsLoading(true)
    getMessage(messageId).then((data) => {
      setMessage(data)
      setIsLoading(false)
    })
  }, [messageId])

  if (!messageId) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center bg-[#0c4a42]">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-[#00d9a5]/10 flex items-center justify-center mx-auto mb-4 border border-[#00d9a5]/20">
            <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-[#00d9a5]/50">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
              <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <p className="text-gray-500 text-[14px]">Select an email</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="hidden md:flex flex-1 bg-[#0c4a42] p-4">
        <div className="flex-1 bg-[#0a0a0a] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#111] animate-pulse" />
            <div className="space-y-2 flex-1">
              <div className="h-5 bg-[#111] rounded w-32 animate-pulse" />
              <div className="h-4 bg-[#111] rounded w-48 animate-pulse" />
            </div>
          </div>
          <div className="h-48 bg-[#111] rounded-xl animate-pulse" />
        </div>
      </div>
    )
  }

  if (!message) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center bg-[#0c4a42] text-gray-500">
        <p className="text-sm">Email not found</p>
      </div>
    )
  }

  return (
    <div className="hidden md:flex flex-1 flex-col bg-[#0c4a42] p-4 pl-0 overflow-hidden">
      {/* Reading panel card - matches reference */}
      <div className="flex-1 bg-[#0a0a0a] rounded-2xl flex flex-col overflow-hidden">
        
        {/* Sender header */}
        <div className="px-6 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-4">
            {/* Avatar with gradient */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00d9a5] to-[#008f70] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#00d9a5]/25 text-[18px] font-bold text-black">
              {message.from.name.charAt(0).toUpperCase()}
            </div>
            
            <div className="flex-1 min-w-0">
              <h2 className="text-[16px] font-bold text-white mb-0.5">{message.from.name}</h2>
              <p className="text-[13px] text-[#00d9a5]">{message.from.email}</p>
            </div>
          </div>
        </div>

        {/* Email body content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="text-gray-300 text-[14px] leading-relaxed space-y-4">
            <p className="text-white">Hi, Shiru</p>
            <p className="whitespace-pre-wrap">{message.body}</p>
            <div className="pt-2">
              <p>Thank & Regards</p>
              <p>{message.from.name}</p>
            </div>
          </div>

          {/* Attachments section - CRM themed cards matching reference */}
          {message.attachments.length > 0 && (
            <div className="mt-8">
              <h3 className="text-[15px] font-bold text-white mb-4">Attachments</h3>
              <div className="grid grid-cols-2 gap-4">
                {message.attachments.map((attachment, index) => (
                  <div
                    key={attachment.id}
                    className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#0a3d35] via-[#0c3b33] to-[#082b25] border border-white/[0.06] hover:border-[#00d9a5]/40 transition-all cursor-pointer group h-[140px]"
                  >
                    {/* CRM-style visualization matching reference */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Circular network graphic */}
                      <div className="relative">
                        {/* Outer ring */}
                        <div className="w-20 h-20 rounded-full border border-[#00d9a5]/30 flex items-center justify-center">
                          {/* Inner content */}
                          <div className="w-12 h-12 rounded-full border border-[#00d9a5]/40 flex items-center justify-center bg-[#00d9a5]/5">
                            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#00d9a5]">
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
                        {/* CRM badge */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#00d9a5] text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-lg shadow-[#00d9a5]/30">
                          CRM
                        </div>
                      </div>
                      
                      {/* Connection dots around the edge */}
                      <div className="absolute top-4 right-6 w-2 h-2 rounded-full bg-[#00d9a5]/40" />
                      <div className="absolute top-8 left-4 w-1.5 h-1.5 rounded-full bg-[#00d9a5]/30" />
                      <div className="absolute bottom-6 right-4 w-1.5 h-1.5 rounded-full bg-[#00d9a5]/30" />
                      <div className="absolute bottom-8 left-6 w-2 h-2 rounded-full bg-[#00d9a5]/20" />
                    </div>
                    
                    {/* Subtle grid pattern */}
                    <div 
                      className="absolute inset-0 opacity-[0.03]" 
                      style={{
                        backgroundImage: 'linear-gradient(rgba(0,217,165,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,165,1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }}
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#00d9a5]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick reply composer - matching reference */}
        <div className="border-t border-white/[0.06] p-4">
          <div className="bg-[#0c0c0c] rounded-xl border border-white/[0.06] overflow-hidden">
            {/* Text input */}
            <div className="px-5 py-4">
              <textarea
                placeholder="Write your message..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full bg-transparent text-white placeholder:text-gray-600 text-[14px] resize-none focus:outline-none min-h-[56px]"
              />
            </div>
            
            {/* Formatting toolbar */}
            <div className="px-4 py-3 border-t border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-0.5">
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded transition-colors">
                  <Bold className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded transition-colors">
                  <Italic className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded transition-colors">
                  <Underline className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-white/10 mx-1.5" />
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded transition-colors">
                  <List className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded transition-colors">
                  <ListOrdered className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-white/10 mx-1.5" />
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded transition-colors">
                  <AlignLeft className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded transition-colors">
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded transition-colors">
                  <AlignRight className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded transition-colors">
                  <AlignJustify className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-white/10 mx-1.5" />
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded transition-colors">
                  <Quote className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded transition-colors">
                  <Link2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded transition-colors">
                  <Mic className="w-4 h-4" />
                </button>
              </div>
              
              {/* Send button - teal pill */}
              <button className="h-9 px-5 bg-[#00d9a5] text-black rounded-full text-[13px] font-semibold hover:bg-[#00d9a5]/90 transition-colors flex items-center gap-2 shadow-lg shadow-[#00d9a5]/25">
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
