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
      <div className="hidden md:flex flex-1 items-center justify-center bg-[#0c4a42] p-4">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-[#00d9a5]/8 flex items-center justify-center mx-auto mb-5 border border-[#00d9a5]/20">
            <svg viewBox="0 0 24 24" fill="none" className="w-11 h-11 text-[#00d9a5]/40">
              <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-gray-500 text-base font-medium">Select an email</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="hidden md:flex flex-1 bg-[#0c4a42] p-4">
        <div className="flex-1 bg-[#0a0a0a] rounded-2xl p-6 space-y-6 border border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#0f0f0f] animate-pulse border border-white/5" />
            <div className="space-y-2 flex-1">
              <div className="h-5 bg-[#0f0f0f] rounded w-32 animate-pulse" />
              <div className="h-4 bg-[#0f0f0f] rounded w-48 animate-pulse" />
            </div>
          </div>
          <div className="h-40 bg-[#0f0f0f] rounded-xl animate-pulse" />
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
    <div className="hidden md:flex flex-1 flex-col bg-[#0c4a42] p-4 overflow-hidden">
      {/* Main reading panel */}
      <div className="flex-1 bg-[#0a0a0a] rounded-2xl flex flex-col overflow-hidden border border-white/5 shadow-xl shadow-black/40">
        {/* Sender header section */}
        <div className="px-6 py-5 border-b border-white/5">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00d9a5] to-[#00a080] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#00d9a5]/25 text-lg font-bold text-black">
              {message.from.name.charAt(0).toUpperCase()}
            </div>
            
            {/* Sender info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-white mb-0.5">{message.from.name}</h2>
              <p className="text-sm text-[#00d9a5] font-medium">{message.from.email}</p>
            </div>
          </div>
        </div>

        {/* Email content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="text-gray-300 leading-relaxed space-y-4 text-sm">
            <p className="text-white font-medium">Hi, Shiru</p>
            <p className="whitespace-pre-wrap">{message.body}</p>
            <p className="text-sm">Thank & Regards<br />{message.from.name}</p>
          </div>

          {/* Attachments section */}
          {message.attachments.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-bold text-white mb-4 text-base">Attachments</h3>
              <div className="grid grid-cols-2 gap-4">
                {message.attachments.map((attachment, index) => (
                  <div
                    key={attachment.id}
                    className="relative rounded-xl overflow-hidden bg-[#0f0f0f] border border-white/8 hover:border-[#00d9a5]/40 transition-all cursor-pointer group aspect-video"
                  >
                    {/* CRM-themed attachment preview */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0f4a42] via-[#0d3d35] to-[#0a3028] flex items-center justify-center p-4 overflow-hidden">
                      <div className="text-center z-10">
                        <div className="mb-2 flex justify-center">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full border border-[#00d9a5]/40 flex items-center justify-center">
                              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#00d9a5]">
                                <circle cx="12" cy="12" r="1" fill="currentColor"/>
                                <circle cx="18" cy="8" r="1" fill="currentColor"/>
                                <circle cx="6" cy="16" r="1" fill="currentColor"/>
                                <path d="M12 7V17M7 12H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                              </svg>
                            </div>
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#00d9a5] rounded-full flex items-center justify-center text-xs font-bold text-black shadow-lg shadow-[#00d9a5]/30">
                              CRM
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-[#00d9a5] font-semibold mt-3">{attachment.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {typeof attachment.size === 'number' 
                            ? (attachment.size / 1024 / 1024).toFixed(2) + ' MB'
                            : attachment.size
                          }
                        </p>
                      </div>
                      {/* Subtle grid overlay */}
                      <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 217, 165, 0.05) 25%, rgba(0, 217, 165, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 217, 165, 0.05) 75%, rgba(0, 217, 165, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 217, 165, 0.05) 25%, rgba(0, 217, 165, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 217, 165, 0.05) 75%, rgba(0, 217, 165, 0.05) 76%, transparent 77%, transparent)', backgroundSize: '40px 40px'}}/>
                    </div>
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-[#00d9a5]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reply composer */}
        <div className="border-t border-white/5 px-4 py-4">
          <div className="bg-[#0f0f0f] rounded-xl border border-white/8 overflow-hidden">
            {/* Text input area */}
            <div className="px-5 py-4">
              <textarea
                placeholder="Write your message..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full bg-transparent text-white placeholder:text-gray-600 text-sm resize-none focus:outline-none min-h-14"
              />
            </div>
            
            {/* Formatting toolbar */}
            <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-0.5">
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded-md transition-colors">
                  <Bold className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded-md transition-colors">
                  <Italic className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded-md transition-colors">
                  <Underline className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-white/10 mx-1" />
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded-md transition-colors">
                  <List className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded-md transition-colors">
                  <ListOrdered className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-white/10 mx-1" />
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded-md transition-colors">
                  <AlignLeft className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded-md transition-colors">
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded-md transition-colors">
                  <AlignRight className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded-md transition-colors">
                  <AlignJustify className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-white/10 mx-1" />
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded-md transition-colors">
                  <Quote className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded-md transition-colors">
                  <Link2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded-md transition-colors">
                  <Mic className="w-4 h-4" />
                </button>
              </div>
              
              {/* Send button */}
              <button className="px-5 py-1.5 bg-[#00d9a5] text-black rounded-full text-sm font-semibold hover:bg-[#00d9a5]/90 transition-all flex items-center gap-2 shadow-lg shadow-[#00d9a5]/25">
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
