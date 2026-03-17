'use client'

import MailSidebar from '@/components/mail/sidebar'
import MessageList from '@/components/mail/message-list'
import ReadingPane from '@/components/mail/reading-pane'
import { ThemeToggle } from '@/components/theme-toggle'
import { useState } from 'react'

export default function MailPage() {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)
  const [activeFolder, setActiveFolder] = useState('inbox')

  return (
    <div className="flex h-screen w-full dark:bg-[#0a0a0a] light:bg-[#f9f7f4] overflow-hidden relative">
      {/* Theme Toggle - top right */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Subtle atmospheric vignette overlay */}
      <div className="dark:block light:hidden absolute inset-0 pointer-events-none z-0 bg-radial-vignette opacity-40" style={{
        backgroundImage: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 100%)'
      }} />
      
      {/* Light mode vignette */}
      <div className="light:block dark:hidden absolute inset-0 pointer-events-none z-0 bg-radial-vignette opacity-10" style={{
        backgroundImage: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.05) 100%)'
      }} />

      {/* Sidebar - premium warm tone */}
      <div className="relative z-10 bg-surface-primary dark:bg-transparent light:bg-[#fefdfb]">
        <MailSidebar activeFolder={activeFolder} onFolderChange={setActiveFolder} />
      </div>
      
      {/* Message List - subtle warm gradient */}
      <div className="relative z-10 bg-surface-secondary dark:bg-transparent light:bg-[#fbf9f6] border-l dark:border-white/[0.05] light:border-[#00956a]/5">
        <MessageList 
          onSelectMessage={setSelectedMessageId} 
          selectedMessageId={selectedMessageId}
          activeFolder={activeFolder}
        />
      </div>
      
      {/* Reading Pane - premium atmospheric background */}
      <div className="relative z-10 flex-1 bg-surface-tertiary dark:bg-transparent light:bg-[#f9f7f4] overflow-hidden">
        <ReadingPane messageId={selectedMessageId} />
      </div>
    </div>
  )
}
