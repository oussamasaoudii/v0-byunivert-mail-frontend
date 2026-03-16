'use client'

import { ReactNode } from 'react'

export default function MailLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a3d36] p-4">
      {/* Floating container with rounded corners and shadow */}
      <div className="flex w-full max-w-[1400px] h-[85vh] rounded-3xl overflow-hidden shadow-2xl shadow-black/80 border border-white/5">
        {children}
      </div>
    </div>
  )
}
