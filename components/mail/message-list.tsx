'use client'

import { useState, useEffect } from 'react'
import { Message, getMessages } from '@/lib/adapters/mail-adapter'
import { Search, ChevronDown, MoreVertical, Check, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface MessageListProps {
  selectedMessageId: string | null
  onSelectMessage: (messageId: string) => void
}

export default function MessageList({ selectedMessageId, onSelectMessage }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')

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

  const handleToggleSelect = (messageId: string) => {
    const newSelected = new Set(selectedMessages)
    if (newSelected.has(messageId)) {
      newSelected.delete(messageId)
    } else {
      newSelected.add(messageId)
    }
    setSelectedMessages(newSelected)
  }

  return (
    <div className="flex-1 flex flex-col border-r border-border/30 bg-background min-w-0 md:min-w-96">
      {/* Top toolbar */}
      <div className="border-b border-border/20 px-5 py-4">
        {/* Controls row */}
        <div className="flex items-center gap-2.5 mb-4">
          <input type="checkbox" className="w-4 h-4 rounded border border-border/40 cursor-pointer accent-primary" />
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground">
            <ChevronDown className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground">
            <MoreVertical className="w-3.5 h-3.5" />
          </Button>
          <span className="text-lg font-bold ml-auto">Inbox</span>
        </div>
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-10 h-9 bg-card/50 rounded border-border/40 text-xs placeholder:text-muted-foreground/60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border/20 px-5 pt-3">
        <div className="flex gap-6 text-sm font-medium">
          <button className="pb-3 text-foreground border-b-2 border-primary relative -mb-px">
            Mail
          </button>
          <button className="pb-3 text-muted-foreground hover:text-foreground">
            Subscription
          </button>
        </div>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="space-y-1.5 px-3 py-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 bg-card/50 rounded animate-pulse" />
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            No emails
          </div>
        ) : (
          <div className="space-y-1 px-3 py-3">
            {messages.map((message) => {
              const isSelected = selectedMessageId === message.id
              return (
                <div
                  key={message.id}
                  onClick={(e) => handleSelectMessage(e, message.id)}
                  className={`px-3.5 py-3 cursor-pointer transition-all rounded border-2 ${
                    isSelected
                      ? 'bg-card/70 border-primary shadow-lg shadow-primary/30'
                      : 'bg-card/40 border-border/40 hover:border-primary/40 hover:bg-card/60'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-xs font-bold text-primary-foreground flex-shrink-0">
                      {message.from.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2 mb-0.5">
                        <p className="text-xs font-semibold text-foreground/90">
                          {message.from.name}
                        </p>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {message.date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <p className={`text-xs line-clamp-1 ${!message.read ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                        {message.subject}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {message.body.substring(0, 70)}...
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border/20 px-5 py-3 flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-medium">1 / {Math.max(messages.length, 1)}</span>
        <div className="flex gap-2">
          <button className="w-5 h-5 flex items-center justify-center rounded hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground text-lg">
            ←
          </button>
          <button className="w-5 h-5 flex items-center justify-center rounded hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground text-lg">
            →
          </button>
        </div>
      </div>
    </div>
  )
}
