'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Bold,
  Italic,
  Link,
  Paperclip,
  Send,
  X,
  Maximize2,
  ChevronDown,
} from 'lucide-react'

interface ComposerProps {
  onClose?: () => void
  onSend?: (message: { to: string; subject: string; body: string }) => void
}

export default function Composer({ onClose, onSend }: ComposerProps) {
  const [to, setTo] = useState('')
  const [cc, setCc] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [showCc, setShowCc] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const handleSend = async () => {
    if (!to || !subject) {
      return
    }

    setIsSending(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      onSend?.({ to, subject, body })
      setTo('')
      setCc('')
      setSubject('')
      setBody('')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-background border border-border rounded-lg overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <h3 className="font-semibold text-sm">Nouveau message</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Maximize2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Recipients */}
      <div className="px-4 py-3 space-y-2 border-b border-border">
        <div>
          <Input
            placeholder="À"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="h-8 text-sm placeholder:text-muted-foreground"
          />
        </div>

        {showCc && (
          <div>
            <Input
              placeholder="Cc"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              className="h-8 text-sm placeholder:text-muted-foreground"
            />
          </div>
        )}

        {!showCc && (
          <button
            onClick={() => setShowCc(true)}
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            <ChevronDown className="w-3 h-3" />
            Ajouter Cc
          </button>
        )}
      </div>

      {/* Subject */}
      <div className="px-4 py-2 border-b border-border">
        <Input
          placeholder="Objet"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="h-8 text-sm placeholder:text-muted-foreground font-medium"
        />
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 py-2 border-b border-border bg-muted/20">
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <Bold className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <Italic className="w-4 h-4" />
        </Button>
        <div className="w-px h-4 bg-border mx-1" />
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <Link className="w-4 h-4" />
        </Button>
        <div className="flex-1" />
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <Paperclip className="w-4 h-4" />
        </Button>
      </div>

      {/* Body */}
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Écrivez votre message..."
        className="flex-1 px-4 py-3 resize-none bg-background text-sm placeholder:text-muted-foreground focus:outline-none"
      />

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20">
        <Button variant="ghost" size="sm">
          Paramètres
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isSending}
          >
            Brouillon
          </Button>
          <Button
            size="sm"
            onClick={handleSend}
            disabled={!to || !subject || isSending}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            Envoyer
          </Button>
        </div>
      </div>
    </div>
  )
}
