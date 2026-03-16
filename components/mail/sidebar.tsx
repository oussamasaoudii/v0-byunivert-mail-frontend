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

  const handleFolderClick = (folderId: string) => {
    setActiveFolder(folderId)
    setMobileOpen(false)
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed bottom-6 left-6 z-50 w-12 h-12 rounded-lg bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 flex items-center justify-center transition-all"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-30 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-80 h-screen bg-sidebar text-sidebar-foreground flex flex-col z-40 transform transition-transform duration-200 md:translate-x-0 md:border-r md:border-border ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo & Compose */}
        <div className="px-6 py-6 border-b border-border/50">
          <Link href="/mail" className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-primary-foreground font-bold" />
            </div>
            <span className="text-lg font-bold tracking-tight">Byunivert</span>
          </Link>
          <Button
            className="w-full h-10 bg-white hover:bg-gray-50 text-black font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-150"
          >
            Compose
          </Button>
        </div>

        {/* Folders Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {FOLDERS.map((folder) => {
            const isActive = activeFolder === folder.id
            return (
              <button
                key={folder.id}
                onClick={() => handleFolderClick(folder.id)}
                className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 flex items-center justify-between group ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/40'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/80'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-base">{folder.emoji}</span>
                  <span className="truncate">{folder.label}</span>
                </div>
                {folder.unread > 0 && (
                  <span
                    className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ml-2 ${
                      isActive
                        ? 'bg-primary-foreground/25 text-primary-foreground'
                        : 'bg-destructive/90 text-white'
                    }`}
                  >
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
