'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Mail } from 'lucide-react'

const FOLDERS = [
  { id: 'inbox', label: 'Inbox', emoji: '📥', unread: 3 },
  { id: 'starred', label: 'Starred', emoji: '⭐', unread: 0 },
  { id: 'sent', label: 'Sent', emoji: '📤', unread: 0 },
  { id: 'drafts', label: 'Drafts', emoji: '📝', unread: 0 },
  { id: 'spam', label: 'Spam', emoji: '⚠️', unread: 1 },
  { id: 'trash', label: 'Trash', emoji: '🗑️', unread: 0 },
]

export default function MailSidebar() {
  const [activeFolder, setActiveFolder] = useState('inbox')
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed bottom-6 left-6 z-50 w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/70 z-30" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar - 280px fixed width */}
      <aside className={`fixed md:relative w-72 h-screen bg-card flex flex-col border-r border-border/30 z-40 transform transition-transform md:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Header: Logo and Compose */}
        <div className="px-5 pt-5 pb-4 border-b border-border/20">
          <Link href="/mail" className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold tracking-tight">DMAIL</span>
          </Link>
          <Button className="w-full h-9 bg-white/95 hover:bg-white text-black/90 font-semibold rounded-full text-sm shadow-sm">
            Compose
          </Button>
        </div>

        {/* Folders - tight spacing */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
          {FOLDERS.map((folder) => {
            const isActive = activeFolder === folder.id
            return (
              <button
                key={folder.id}
                onClick={() => {
                  setActiveFolder(folder.id)
                  setMobileOpen(false)
                }}
                className={`w-full px-3.5 py-2.5 rounded text-sm font-medium transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/50'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <span className="text-base flex-shrink-0">{folder.emoji}</span>
                  <span className="text-sm truncate">{folder.label}</span>
                </div>
                {folder.unread > 0 && (
                  <span className={`text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ml-1.5 ${
                    isActive ? 'bg-primary-foreground/20' : 'bg-destructive/80 text-white'
                  }`}>
                    {folder.unread}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
