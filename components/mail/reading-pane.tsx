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
      <div className="hidden md:flex flex-1 items-center justify-center bg-[#0d4d45]">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-[#00d9a5]/10 flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-[#00d9a5]/50">
              <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-gray-400 text-lg">Sélectionnez un email</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="hidden md:flex flex-1 bg-[#0d4d45] p-4">
        <div className="flex-1 bg-[#0a0a0a] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#111111] animate-pulse" />
            <div className="space-y-2 flex-1">
              <div className="h-5 bg-[#111111] rounded w-32 animate-pulse" />
              <div className="h-4 bg-[#111111] rounded w-48 animate-pulse" />
            </div>
          </div>
          <div className="h-40 bg-[#111111] rounded-xl animate-pulse" />
        </div>
      </div>
    )
  }

  if (!message) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center bg-[#0d4d45] text-gray-500">
        <p className="text-sm">Email introuvable</p>
      </div>
    )
  }

  return (
    <div className="hidden md:flex flex-1 flex-col bg-[#0d4d45] p-3 overflow-hidden">
      {/* Main reading panel - black rounded container */}
      <div className="flex-1 bg-[#0a0a0a] rounded-2xl flex flex-col overflow-hidden">
        {/* Sender header section */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-start gap-4">
            {/* Avatar - large, matching reference */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00d9a5] to-[#008866] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#00d9a5]/30">
              <span className="text-lg font-bold text-black">
                {message.from.name.charAt(0).toUpperCase()}
              </span>
            </div>
            
            {/* Sender info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-white mb-0.5">{message.from.name}</h2>
              <p className="text-sm text-[#00d9a5]">{message.from.email}</p>
            </div>
          </div>
        </div>

        {/* Email content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Greeting and body */}
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p className="text-white font-medium">Bonjour,</p>
            <p className="whitespace-pre-wrap">{message.body}</p>
            <p>Cordialement,<br />{message.from.name}</p>
          </div>

          {/* Attachments section - matching reference with image previews */}
          {message.attachments.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-bold text-white mb-4">Pièces jointes</h3>
              <div className="grid grid-cols-2 gap-4">
                {message.attachments.map((attachment, index) => (
                  <div
                    key={attachment.id}
                    className="relative rounded-xl overflow-hidden bg-[#111111] border border-white/10 hover:border-[#00d9a5]/50 transition-all cursor-pointer group aspect-[4/3]"
                  >
                    {/* Placeholder image styled like reference CRM images */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00d9a5]/20 to-[#004d3d] flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-[#00d9a5]/20 flex items-center justify-center mx-auto mb-2">
                          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#00d9a5]">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <p className="text-xs text-[#00d9a5] font-medium">{attachment.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {typeof attachment.size === 'number' 
                            ? (attachment.size / 1024 / 1024).toFixed(2) + ' MB'
                            : attachment.size
                          }
                        </p>
                      </div>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#00d9a5]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reply composer - matching reference with formatting toolbar */}
        <div className="border-t border-white/10 p-4">
          <div className="bg-[#0c0c0c] rounded-xl border border-white/10 overflow-hidden">
            {/* Text input area */}
            <div className="p-4">
              <textarea
                placeholder="Écrivez votre message..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full bg-transparent text-white placeholder:text-gray-600 text-sm resize-none focus:outline-none min-h-[60px]"
              />
            </div>
            
            {/* Formatting toolbar - matching reference exactly */}
            <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <Bold className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <Italic className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <Underline className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-white/10 mx-1" />
                <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <List className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <ListOrdered className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-white/10 mx-1" />
                <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <AlignLeft className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <AlignRight className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <AlignJustify className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-white/10 mx-1" />
                <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <Quote className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <Link2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <Mic className="w-4 h-4" />
                </button>
              </div>
              
              {/* Send button - matching reference */}
              <button className="px-5 py-2 bg-transparent border border-[#00d9a5] text-[#00d9a5] rounded-full text-sm font-medium hover:bg-[#00d9a5]/10 transition-all flex items-center gap-2">
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
