'use client'

import { ReactNode } from 'react'

export default function MailLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden" suppressHydrationWarning>
      {children}
    </div>
  )
}
