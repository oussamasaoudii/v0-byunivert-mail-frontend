'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import MailSidebar from '@/components/mail/sidebar'
import { ThemeToggle } from '@/components/theme-toggle'
import { getSession } from '@/lib/adapters/mail-adapter'

type SessionState = 'checking' | 'authenticated' | 'anonymous'

export default function ProtectedMailShell({
  children,
  activeFolder = null,
}: {
  children: ReactNode
  activeFolder?: string | null
}) {
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
        if (!active) {
          return
        }

        setSessionState('anonymous')
        router.replace('/')
      })

    return () => {
      active = false
    }
  }, [router])

  if (sessionState !== 'authenticated') {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/25 border-t-primary" />
      </div>
    )
  }

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-background" suppressHydrationWarning>
      <div
        className="pointer-events-none absolute inset-0 z-0 dark:opacity-30 light:opacity-100"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 22%, rgba(0, 217, 165, 0.08), transparent 34%), radial-gradient(circle at 82% 14%, rgba(0, 217, 165, 0.05), transparent 28%), linear-gradient(135deg, rgba(255,255,255,0.01), transparent 35%, rgba(0,217,165,0.02) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 dark:hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 20%, rgba(0, 149, 106, 0.08), transparent 32%), radial-gradient(circle at 82% 12%, rgba(0, 149, 106, 0.04), transparent 28%), linear-gradient(135deg, rgba(255,255,255,0.42), transparent 42%, rgba(0,149,106,0.03) 100%)',
        }}
      />

      <div className="absolute right-4 top-4 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 flex min-w-0 flex-1">
        <MailSidebar activeFolder={activeFolder} />
        <main className="flex min-w-0 flex-1">{children}</main>
      </div>
    </div>
  )
}
