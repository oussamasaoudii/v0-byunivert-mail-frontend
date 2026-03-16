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
    <div className="flex-1 flex flex-col border-r border-border bg-background min-w-0 md:min-w-80">
      {/* Toolbar */}
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-2 mb-3">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ChevronDown className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground">Boîte de réception</span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher les emails..."
            className="pl-9 h-9"
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
              <p className="text-sm">Aucun email</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={(e) => handleSelectMessage(e, message.id)}
                className={`px-3 py-3 cursor-pointer transition-colors border-l-2 ${
                  selectedMessageId === message.id
                    ? 'bg-accent/5 border-l-primary'
                    : 'hover:bg-muted border-l-transparent'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <div className="mt-1 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={selectedMessages.has(message.id)}
                      onChange={() => handleToggleSelect(message.id)}
                      className="w-4 h-4 rounded border-border cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  {/* Star */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className="mt-1 flex-shrink-0 text-muted-foreground hover:text-accent"
                  >
                    <Star className="w-4 h-4" fill={message.starred ? 'currentColor' : 'none'} />
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <p className={`text-sm ${message.read ? 'text-muted-foreground' : 'font-semibold'}`}>
                        {message.from.name}
                      </p>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {message.date.toLocaleDateString('fr-FR', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${message.read ? 'text-muted-foreground' : 'font-medium'}`}>
                      {message.subject}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {message.body.substring(0, 60)}...
                    </p>
                  </div>

                  {/* Unread indicator */}
                  {!message.read && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>Affichage 1 à {messages.length} sur {messages.length}</span>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            ←
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            →
          </Button>
        </div>
      </div>
    </div>
  )
}
