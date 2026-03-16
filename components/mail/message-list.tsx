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
    <div className="flex-1 flex flex-col border-r border-border bg-background min-w-0 md:min-w-96">
      {/* Toolbar */}
      <div className="border-b border-border/50 px-6 py-5">
        <div className="flex items-center gap-3 mb-5">
          <input type="checkbox" className="w-4 h-4 rounded border-border cursor-pointer" />
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
            <ChevronDown className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
            <Check className="w-4 h-4" />
          </Button>
          <span className="text-xl font-bold">Inbox</span>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-11 h-11 bg-sidebar/60 rounded-lg border-border/40 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="space-y-1 p-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-muted rounded animate-pulse" />
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <p className="text-sm">No emails</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2 p-3">
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={(e) => handleSelectMessage(e, message.id)}
                className={`px-4 py-4 cursor-pointer transition-all rounded-lg border-2 ${
                  selectedMessageId === message.id
                    ? 'bg-sidebar border-primary'
                    : 'bg-sidebar border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground flex-shrink-0">
                    {message.from.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className={`text-sm font-semibold`}>
                        {message.from.name}
                      </p>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {message.date.toLocaleDateString('fr-FR', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className={`text-sm line-clamp-1 ${message.read ? 'text-muted-foreground' : 'font-semibold text-foreground'}`}>
                      {message.subject}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {message.body.substring(0, 80)}...
                    </p>
                  </div>

                  {/* Star */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className="flex-shrink-0 text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Star className="w-4 h-4" fill={message.starred ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border/50 px-6 py-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>1 / {messages.length > 0 ? '1' : '0'}</span>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground">
            ←
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground">
            →
          </Button>
        </div>
      </div>
    </div>
  )
}
