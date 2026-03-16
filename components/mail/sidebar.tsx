'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Mail } from 'lucide-react'

const DEFAULT_FOLDERS = [
  { id: 'inbox', name: 'Boîte de réception', icon: '📥', unread: 3 },
  { id: 'starred', name: 'Marqués', icon: '⭐', unread: 0 },
  { id: 'sent', name: 'Envoyés', icon: '📤', unread: 0 },
  { id: 'drafts', name: 'Brouillons', icon: '📝', unread: 0 },
  { id: 'spam', name: 'Spam', icon: '⚠️', unread: 1 },
  { id: 'trash', name: 'Corbeille', icon: '🗑️', unread: 0 },
  { id: 'earning', name: 'Earning', icon: '💰', unread: 0 },
  { id: 'dex', name: 'DEX Tool', icon: '🔧', unread: 0 },
  { id: 'subscription', name: 'Subscription', icon: '🔔', unread: 2 },
  { id: 'nft', name: 'NFT Market', icon: '🖼️', unread: 0 },
  { id: 'domain', name: 'Domain', icon: '🌐', unread: 0 },
  { id: 'swap', name: 'Swap DMAIL', icon: '🔄', unread: 0 },
]

export default function MailSidebar() {
  const [activeFolderId, setActiveFolderId] = useState<string>('inbox')
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed bottom-4 left-4 z-50 p-2.5 rounded-lg bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/70 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 h-screen border-r border-border bg-sidebar text-sidebar-foreground flex flex-col z-40 transform transition-transform md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header with logo */}
        <div className="px-5 py-5 border-b border-border">
          <Link href="/mail" className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">DMAIL</span>
          </Link>
          <Button 
            onClick={() => setIsMobileOpen(false)}
            className="w-full bg-white hover:bg-gray-100 text-black font-semibold rounded-full h-10" 
            size="sm"
          >
            Compose
          </Button>
        </div>

        {/* Folders - scrollable */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {DEFAULT_FOLDERS.map((folder) => (
            <button
              key={folder.id}
              onClick={() => {
                setActiveFolderId(folder.id)
                setIsMobileOpen(false)
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-between group ${
                activeFolderId === folder.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="text-base">{folder.icon}</span>
                <span>{folder.name}</span>
              </div>
              {folder.unread > 0 && (
                <span className={`text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center ${
                  activeFolderId === folder.id
                    ? 'bg-primary-foreground/20'
                    : 'bg-destructive text-white'
                }`}>
                  {folder.unread}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>
    </>
  )
}
