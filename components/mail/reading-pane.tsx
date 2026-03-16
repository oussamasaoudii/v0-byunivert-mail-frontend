'use client'

import { useState, useEffect } from 'react'
import { Message, getMessage } from '@/lib/adapters/mail-adapter'
import {
  Archive,
  Trash2,
  Star,
  Reply,
  MoreVertical,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Send,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface ReadingPaneProps {
  messageId: string | null
}

export default function ReadingPane({ messageId }: ReadingPaneProps) {
  const [message, setMessage] = useState<Message | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showReply, setShowReply] = useState(false)
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
      <div className="hidden md:flex flex-1 items-center justify-center bg-background text-muted-foreground">
        <div className="text-center">
          <p className="text-lg">Select an email to read</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center bg-background">
        <div className="space-y-4 w-full max-w-2xl mx-auto px-8">
          <div className="h-8 bg-muted rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
          <div className="h-64 bg-muted rounded animate-pulse" />
        </div>
      </div>
    )
  }

  if (!message) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center bg-background text-muted-foreground">
        <p className="text-sm">Email not found</p>
      </div>
    )
  }

  return (
    <div className="hidden md:flex flex-1 flex-col bg-background overflow-hidden">
      {/* Top toolbar - compact */}
      <div className="border-b border-border/20 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground">
            <ChevronRight className="w-4 h-4" />
          </Button>
          <div className="w-px h-4 bg-border/30 mx-1" />
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground">
            <Archive className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground">
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground">
            <Star className="w-4 h-4" fill={message.starred ? 'currentColor' : 'none'} />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Contact</span>
          <span className="text-xs text-muted-foreground">Chat</span>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground ml-2">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Message content */}
      <div className="flex-1 overflow-y-auto">
        {/* Sender info header - elegant block */}
        <div className="border-b border-border/20 px-6 py-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary-foreground">
                {message.from.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-bold text-foreground">{message.from.name}</h2>
              <p className="text-xs text-muted-foreground">{message.from.email}</p>
            </div>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {message.date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <h1 className="text-lg font-bold text-foreground leading-snug">{message.subject}</h1>
        </div>

        {/* Message body */}
        <div className="px-6 py-5">
          <p className="text-sm leading-relaxed text-foreground/85 whitespace-pre-wrap">
            {message.body}
          </p>

          {/* Attachments */}
          {message.attachments.length > 0 && (
            <div className="mt-6 pt-6 border-t border-border/20">
              <h3 className="text-xs font-semibold text-foreground/80 uppercase tracking-wide mb-3">Attachments</h3>
              <div className="grid grid-cols-2 gap-3">
                {message.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="p-3 rounded border border-primary/50 bg-card/40 hover:bg-card/70 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Download className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate text-foreground/80">
                          {attachment.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {typeof attachment.size === 'number' 
                            ? (attachment.size / 1024 / 1024).toFixed(2) + ' MB'
                            : attachment.size
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reply section */}
      <div className="border-t border-border/20 px-6 py-4 bg-background/40 space-y-3">
        {!showReply ? (
          <div className="text-sm text-muted-foreground">
            Write your message...
          </div>
        ) : (
          <div className="space-y-3">
            <Textarea
              placeholder="Write your message..."
              className="min-h-20 bg-card/50 border-border/40 rounded text-sm resize-none"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="flex gap-2 justify-between items-center">
              <div className="flex gap-2 text-xs text-muted-foreground">
                {/* Formatting toolbar placeholder */}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowReply(false)
                    setReplyText('')
                  }}
                  className="border-border/40 hover:bg-card/60 h-9 px-4 rounded text-xs"
                >
                  Cancel
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-9 px-6 rounded text-xs">
                  <Send className="w-3.5 h-3.5 mr-1.5" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
