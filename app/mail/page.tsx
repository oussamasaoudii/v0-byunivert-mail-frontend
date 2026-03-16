'use client'

import MailSidebar from '@/components/mail/sidebar'
import MessageList from '@/components/mail/message-list'
import ReadingPane from '@/components/mail/reading-pane'
import { useState } from 'react'

export default function MailPage() {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)
  const [activeFolder, setActiveFolder] = useState('inbox')

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] overflow-hidden relative">
      {/* Subtle atmospheric vignette overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-radial-vignette opacity-40" style={{
        backgroundImage: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 100%)'
      }} />

      {/* Sidebar - 220px fixed with atmospheric background */}
      <div className="relative z-10 bg-surface-primary">
        <MailSidebar activeFolder={activeFolder} onFolderChange={setActiveFolder} />
      </div>
      
      {/* Message List - 420px fixed with subtle atmospheric treatment */}
      <div className="relative z-10 bg-surface-secondary border-l border-white/[0.05]">
        <MessageList 
          onSelectMessage={setSelectedMessageId} 
          selectedMessageId={selectedMessageId}
          activeFolder={activeFolder}
        />
      </div>
      
      {/* Reading Pane - fills remaining space with atmospheric depth */}
      <div className="relative z-10 flex-1 bg-surface-tertiary overflow-hidden">
        <ReadingPane messageId={selectedMessageId} />
      </div>
    </div>
  )
}
