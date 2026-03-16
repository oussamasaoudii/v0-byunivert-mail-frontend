'use client'

import { ReactNode } from 'react'

export default function MailLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex h-screen bg-[#0d4d45] overflow-hidden">
      {children}
    </div>
  )
}
