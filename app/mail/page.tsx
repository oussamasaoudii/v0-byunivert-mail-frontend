'use client'

import MailSidebar from '@/components/mail/sidebar'
import MessageList from '@/components/mail/message-list'
import ReadingPane from '@/components/mail/reading-pane'
import { useState } from 'react'

export default function MailPage() {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)

  return (
    <div className="flex h-screen w-full bg-[#0d4d45] overflow-hidden">
      {/* Sidebar - 240px fixed */}
      <MailSidebar />
      
      {/* Message List - 380px fixed */}
      <MessageList onSelectMessage={setSelectedMessageId} selectedMessageId={selectedMessageId} />
      
      {/* Reading Pane - fills remaining space */}
      <ReadingPane messageId={selectedMessageId} />
    </div>
  )
}
