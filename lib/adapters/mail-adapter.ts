/**
 * Mail Adapter - Abstraction layer for email backend
 * Currently uses mock data, ready for real IMAP/API integration
 */

export interface Contact {
  email: string
  name: string
  avatar?: string
}

export interface Message {
  id: string
  from: Contact
  to: Contact[]
  cc?: Contact[]
  subject: string
  body: string
  htmlBody?: string
  date: Date
  read: boolean
  starred: boolean
  attachments: Attachment[]
  tags: string[]
}

export interface Attachment {
  id: string
  name: string
  size: number
  mimeType: string
  url?: string
}

export interface Folder {
  id: string
  name: string
  nameTranslated: string
  icon: string
  unread: number
  total: number
  color?: string
}

export interface MailAccount {
  id: string
  email: string
  name: string
  provider: string
}

// Mock data - styled like reference DMail design
const mockFolders: Folder[] = [
  { id: 'inbox', name: 'Inbox', nameTranslated: 'Boîte de réception', icon: 'inbox', unread: 3, total: 24, color: '#00d9a5' },
  { id: 'drafts', name: 'Drafts', nameTranslated: 'Brouillons', icon: 'file', unread: 0, total: 2, color: '#f59e0b' },
  { id: 'sent', name: 'Sent', nameTranslated: 'Envoyés', icon: 'send', unread: 0, total: 45, color: '#10b981' },
  { id: 'trash', name: 'Trash', nameTranslated: 'Corbeille', icon: 'trash', unread: 0, total: 8, color: '#ef4444' },
]

const mockContacts = {
  byunivert: { email: 'welcome@byunivert.com', name: 'Byunivert Mail' },
  rishak: { email: 'rishak09@gmail.com', name: 'Rishak' },
  market: { email: 'updates@market.byunivert.com', name: 'Weekly Market Snapshot' },
  security: { email: 'security@byunivert.com', name: 'Action Required' },
  support: { email: 'support@byunivert.com', name: 'Just Circling Back' },
}

const mockMessages: Message[] = [
  {
    id: 'msg-1',
    from: mockContacts.byunivert,
    to: [{ email: 'user@byunivert.com', name: 'You' }],
    subject: 'Welcome to Byunivert Mail!',
    body: 'Welcome to Byunivert Mail – the modern email solution for professionals like you. We\'re excited to have you onboard...',
    date: new Date(Date.now() - 1 * 60 * 60 * 1000),
    read: false,
    starred: false,
    attachments: [],
    tags: [],
  },
  {
    id: 'msg-2',
    from: mockContacts.rishak,
    to: [{ email: 'user@byunivert.com', name: 'You' }],
    subject: 'Re: CRM Integration Discussion',
    body: 'I hope you\'re doing well. I wanted to quickly follow up on our recent discussion about the integration of new CRM tools. I\'ve been thinking about some of the points we covered, and I\'d be happy to help with next steps or provide any additional information you might need.\n\nLet me know if there\'s a good time to reconnect or if you\'d like me to send over any materials in the meantime.\n\nThank & Regards,\nRishak',
    date: new Date(Date.now() - 3 * 60 * 60 * 1000),
    read: true,
    starred: true,
    attachments: [
      { id: 'att-1', name: 'CRM-Overview.pdf', size: 2567800, mimeType: 'application/pdf' },
      { id: 'att-2', name: 'Integration-Plan.pdf', size: 1234500, mimeType: 'application/pdf' },
    ],
    tags: ['work', 'crm'],
  },
  {
    id: 'msg-3',
    from: mockContacts.market,
    to: [{ email: 'user@byunivert.com', name: 'You' }],
    subject: 'Weekly Market Snapshot',
    body: 'Here\'s your weekly market snapshot:\n\n• Market trends are looking positive\n• New opportunities in cloud services\n• AI integration continues to grow\n\nStay informed with our weekly updates.',
    date: new Date(Date.now() - 5 * 60 * 60 * 1000),
    read: true,
    starred: false,
    attachments: [],
    tags: ['newsletter'],
  },
  {
    id: 'msg-4',
    from: mockContacts.security,
    to: [{ email: 'user@byunivert.com', name: 'You' }],
    subject: 'Action Required',
    body: 'To complete your registration and unlock full Byunivert Mail features, please verify your email address. This is an important security step to protect your account.',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: false,
    starred: false,
    attachments: [],
    tags: ['security'],
  },
  {
    id: 'msg-5',
    from: mockContacts.support,
    to: [{ email: 'user@byunivert.com', name: 'You' }],
    subject: 'Just Circling Back',
    body: 'Hi there! Just wanted to check in and see if you had any questions about Byunivert Mail. Our team is here to help you get the most out of your email experience.',
    date: new Date(Date.now() - 48 * 60 * 60 * 1000),
    read: true,
    starred: false,
    attachments: [],
    tags: [],
  },
]

// Adapter functions
export async function getFolders(): Promise<Folder[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockFolders), 300)
  })
}

export async function getMessages(folderId: string = 'inbox'): Promise<Message[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMessages), 300)
  })
}

export async function getMessage(messageId: string): Promise<Message | null> {
  return new Promise((resolve) => {
    const message = mockMessages.find((m) => m.id === messageId)
    setTimeout(() => resolve(message || null), 200)
  })
}

export async function updateMessage(messageId: string, updates: Partial<Message>): Promise<Message | null> {
  return new Promise((resolve) => {
    const index = mockMessages.findIndex((m) => m.id === messageId)
    if (index !== -1) {
      mockMessages[index] = { ...mockMessages[index], ...updates }
      setTimeout(() => resolve(mockMessages[index]), 200)
    } else {
      setTimeout(() => resolve(null), 200)
    }
  })
}

export async function deleteMessage(messageId: string): Promise<boolean> {
  return new Promise((resolve) => {
    const index = mockMessages.findIndex((m) => m.id === messageId)
    if (index !== -1) {
      mockMessages.splice(index, 1)
      setTimeout(() => resolve(true), 200)
    } else {
      setTimeout(() => resolve(false), 200)
    }
  })
}

export async function searchMessages(query: string): Promise<Message[]> {
  return new Promise((resolve) => {
    const results = mockMessages.filter(
      (m) =>
        m.subject.toLowerCase().includes(query.toLowerCase()) ||
        m.body.toLowerCase().includes(query.toLowerCase()) ||
        m.from.name.toLowerCase().includes(query.toLowerCase())
    )
    setTimeout(() => resolve(results), 300)
  })
}
