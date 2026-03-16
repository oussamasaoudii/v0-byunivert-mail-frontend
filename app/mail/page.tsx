'use client'

import MailSidebar from '@/components/mail/sidebar'
import MessageList from '@/components/mail/message-list'
import ReadingPane from '@/components/mail/reading-pane'
import { useState } from 'react'

export default function MailPage() {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar */}
      <MailSidebar />
      
      {/* Message List */}
      <MessageList onSelectMessage={setSelectedMessageId} selectedMessageId={selectedMessageId} />
      
      {/* Reading Pane */}
      <ReadingPane messageId={selectedMessageId} />
    </div>
  )
}
