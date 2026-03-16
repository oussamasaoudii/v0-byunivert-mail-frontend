'use client'

import { ReactNode } from 'react'

export default function MailLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-background">
      {children}
    </div>
  )
}
