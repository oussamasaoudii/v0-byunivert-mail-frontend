'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Scroll, LogOut, Settings, Plus, Menu, X } from 'lucide-react'
import { Folder, getFolders } from '@/lib/adapters/mail-adapter'

export default function MailSidebar() {
  const [folders, setFolders] = useState<Folder[]>([])
  const [activeFolderId, setActiveFolderId] = useState<string>('inbox')
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    getFolders().then((data) => {
      setFolders(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed bottom-4 left-4 z-50 p-2 rounded-lg bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative w-64 h-full border-r border-sidebar-border bg-sidebar text-sidebar-foreground flex flex-col z-40 transform transition-transform md:translate-x-0 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
      {/* Header with logo */}
      <div className="border-b border-sidebar-border px-4 py-4">
        <Link href="/mail" className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Scroll className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <span className="font-semibold text-sm">Byunivert</span>
        </Link>
        <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Rédiger
        </Button>
      </div>

      {/* Account info */}
      <div className="px-4 py-3 border-b border-sidebar-border">
        <p className="text-xs font-medium text-sidebar-muted-foreground">Compte</p>
        <p className="text-sm truncate mt-1">setifmail@byunivert.com</p>
      </div>

      {/* Folders */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <p className="text-xs font-medium text-sidebar-muted-foreground px-2 mb-2">DOSSIERS</p>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 bg-sidebar-accent rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setActiveFolderId(folder.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between group ${
                  activeFolderId === folder.id
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs">{folder.icon === 'inbox' ? '📥' : folder.icon === 'send' ? '📤' : folder.icon === 'file' ? '📝' : '🗑️'}</span>
                  <span className="flex-1">{folder.nameTranslated}</span>
                </div>
                {folder.unread > 0 && (
                  <span className="text-xs bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center">
                    {folder.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border px-2 py-3 space-y-1">
        <button className="w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-sidebar-accent flex items-center gap-2">
          <Settings className="w-4 h-4" />
          <span>Paramètres</span>
        </button>
        <button className="w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-sidebar-accent flex items-center gap-2 text-destructive">
          <LogOut className="w-4 h-4" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  )
}
