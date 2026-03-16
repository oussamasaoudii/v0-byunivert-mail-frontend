'use client'

import MailSidebar from '@/components/mail/sidebar'
import MessageList from '@/components/mail/message-list'
import ReadingPane from '@/components/mail/reading-pane'
import { useState } from 'react'

export default function MailPage() {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)
  const [activeFolder, setActiveFolder] = useState('inbox')

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] overflow-hidden">
      {/* Sidebar - 220px fixed */}
      <MailSidebar activeFolder={activeFolder} onFolderChange={setActiveFolder} />
      
      {/* Message List - 420px fixed */}
      <MessageList 
        onSelectMessage={setSelectedMessageId} 
        selectedMessageId={selectedMessageId}
        activeFolder={activeFolder}
      />
      
      {/* Reading Pane - fills remaining space */}
      <ReadingPane messageId={selectedMessageId} />
    </div>
  )
}
