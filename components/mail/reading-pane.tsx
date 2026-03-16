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
          <p className="text-lg">Sélectionnez un email</p>
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
        <p className="text-sm">Email non trouvé</p>
      </div>
    )
  }

  return (
    <div className="hidden md:flex flex-1 flex-col bg-background overflow-hidden">
      {/* Top toolbar */}
      <div className="border-b border-border px-6 py-4 flex items-center justify-between bg-background/50">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground">
            <ChevronRight className="w-5 h-5" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground">
            <Check className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground">
            <Trash2 className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground">
            <Star className="w-5 h-5" fill={message.starred ? 'currentColor' : 'none'} />
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {/* Message content */}
      <div className="flex-1 overflow-y-auto">
        {/* Sender info header */}
        <div className="border-b border-border px-6 py-6 bg-background/70">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-bold text-primary-foreground">
                {message.from.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-foreground">{message.from.name}</h2>
              <p className="text-sm text-muted-foreground">{message.from.email}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {message.date.toLocaleDateString('fr-FR', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground leading-tight">{message.subject}</h1>
        </div>

        {/* Message body */}
        <div className="px-6 py-6">
          <p className="text-base leading-relaxed text-foreground/90 whitespace-pre-wrap mb-6">
            {message.body}
          </p>

          {/* Attachments */}
          {message.attachments.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-base font-semibold mb-4">Attachments</h3>
              <div className="grid grid-cols-2 gap-4">
                {message.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-sidebar transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Download className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-foreground">
                          {attachment.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
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
      <div className="border-t border-border px-6 py-4 bg-background/50 space-y-4">
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowReply(!showReply)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg h-10 px-6"
          >
            <Reply className="w-4 h-4 mr-2" />
            Reply
          </Button>
          <Button 
            variant="outline" 
            className="border-border hover:bg-sidebar rounded-lg h-10 px-4"
          >
            <Reply className="w-4 h-4 mr-2 transform scale-x-[-1]" />
            Reply All
          </Button>
        </div>

        {showReply && (
          <div className="space-y-3 pt-3 border-t border-border">
            <Textarea
              placeholder="Write your message..."
              className="min-h-24 bg-sidebar border-border rounded-lg"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowReply(false)
                  setReplyText('')
                }}
                className="border-border hover:bg-sidebar rounded-lg"
              >
                Cancel
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg px-6">
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
