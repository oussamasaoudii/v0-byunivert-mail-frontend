'use client'

import { ReactNode } from 'react'

export default function MailLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {children}
    </div>
  )
}
