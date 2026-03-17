'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import MailSidebar from '@/components/mail/sidebar'
import MessageList from '@/components/mail/message-list'
import ReadingPane from '@/components/mail/reading-pane'
import { ThemeToggle } from '@/components/theme-toggle'
import { getSession } from '@/lib/adapters/mail-adapter'

type SessionState = 'checking' | 'authenticated' | 'anonymous'

export default function MailPageClient({
  initialFolder,
}: {
  initialFolder: string
}) {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)
  const [activeFolder, setActiveFolder] = useState(initialFolder)
  const [sessionState, setSessionState] = useState<SessionState>('checking')
  const router = useRouter()

  useEffect(() => {
    let active = true

    getSession()
      .then((session) => {
        if (!active) {
          return
        }

        if (!session.authenticated) {
          setSessionState('anonymous')
          router.replace('/')
          return
        }

        setSessionState('authenticated')
      })
      .catch(() => {
        if (active) {
          setSessionState('anonymous')
          router.replace('/')
        }
      })

    return () => {
      active = false
    }
  }, [router])

  useEffect(() => {
    setActiveFolder(initialFolder)
  }, [initialFolder])

  useEffect(() => {
    setSelectedMessageId(null)
  }, [activeFolder])

  const handleFolderChange = (folder: string) => {
    setActiveFolder(folder)
    router.replace(`/mail?folder=${encodeURIComponent(folder)}`)
  }

  if (sessionState !== 'authenticated') {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0a0a0a]">
        <div className="w-10 h-10 rounded-full border-2 border-[#00d9a5]/30 border-t-[#00d9a5] animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full dark:bg-[#0a0a0a] light:bg-background overflow-hidden relative" suppressHydrationWarning>
      <div className="absolute top-4 right-4 z-50" suppressHydrationWarning>
        <ThemeToggle />
      </div>

      <div
        className="dark:block light:hidden absolute inset-0 pointer-events-none z-0 bg-radial-vignette opacity-40"
        suppressHydrationWarning
        style={{
          backgroundImage: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 100%)',
        }}
      />

      <div
        className="light:block dark:hidden absolute inset-0 pointer-events-none z-0 bg-radial-vignette opacity-10"
        suppressHydrationWarning
        style={{
          backgroundImage: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.05) 100%)',
        }}
      />

      <div className="relative z-10 dark:bg-transparent light:bg-card" suppressHydrationWarning>
        <MailSidebar activeFolder={activeFolder} onFolderChange={handleFolderChange} />
      </div>

      <div className="relative z-10 dark:bg-transparent light:bg-secondary border-l dark:border-white/[0.05] light:border-border" suppressHydrationWarning>
        <MessageList
          onSelectMessage={setSelectedMessageId}
          selectedMessageId={selectedMessageId}
          activeFolder={activeFolder}
        />
      </div>

      <div className="relative z-10 flex-1 dark:bg-transparent light:bg-background overflow-hidden" suppressHydrationWarning>
        <ReadingPane messageId={selectedMessageId} />
      </div>
    </div>
  )
}
