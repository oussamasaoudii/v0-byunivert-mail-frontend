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
  Print,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ReadingPaneProps {
  messageId: string | null
}

export default function ReadingPane({ messageId }: ReadingPaneProps) {
  const [message, setMessage] = useState<Message | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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
          <p className="text-sm">Sélectionnez un email pour le lire</p>
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
      {/* Header with toolbar */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Archive className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Star className="w-4 h-4" fill={message.starred ? 'currentColor' : 'none'} />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Trash2 className="w-4 h-4" />
            </Button>
            <div className="w-px h-6 bg-border" />
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Print className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Subject */}
        <h1 className="text-2xl font-bold mb-4">{message.subject}</h1>

        {/* From/To info */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-medium text-sm">
                {message.from.name.substring(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-sm">{message.from.name}</p>
                <p className="text-xs text-muted-foreground">{message.from.email}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              {message.date.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>

        {/* Recipient info (collapsible) */}
        <details className="mt-3 cursor-pointer">
          <summary className="text-xs text-muted-foreground hover:text-foreground">
            À: {message.to.map((t) => t.name).join(', ')}
            {message.cc && message.cc.length > 0 && ` • Cc: ${message.cc.map((c) => c.name).join(', ')}`}
          </summary>
        </details>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-2xl">
          {/* Body */}
          <div className="prose prose-sm dark:prose-invert max-w-none mb-6">
            <div className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
              {message.body}
            </div>
          </div>

          {/* Attachments */}
          {message.attachments.length > 0 && (
            <div className="border-t border-border pt-4">
              <p className="text-sm font-medium mb-3">Pièces jointes ({message.attachments.length})</p>
              <div className="space-y-2">
                {message.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-xs font-medium">
                        {attachment.name.split('.').pop()?.substring(0, 3).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{attachment.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(attachment.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reply area */}
      <div className="border-t border-border px-6 py-4 bg-muted/30">
        <Button className="gap-2">
          <Reply className="w-4 h-4" />
          Répondre
        </Button>
      </div>
    </div>
  )
}
