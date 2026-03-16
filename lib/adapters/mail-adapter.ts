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

// Mock data
const mockFolders: Folder[] = [
  { id: 'inbox', name: 'Inbox', nameTranslated: 'Boîte de réception', icon: 'inbox', unread: 3, total: 24, color: '#6366f1' },
  { id: 'drafts', name: 'Drafts', nameTranslated: 'Brouillons', icon: 'file', unread: 0, total: 2, color: '#f59e0b' },
  { id: 'sent', name: 'Sent', nameTranslated: 'Envoyés', icon: 'send', unread: 0, total: 45, color: '#10b981' },
  { id: 'trash', name: 'Trash', nameTranslated: 'Corbeille', icon: 'trash', unread: 0, total: 8, color: '#ef4444' },
]

const mockContacts = {
  cloudflare: { email: 'security@cloudflare.com', name: 'Cloudflare' },
  john: { email: 'john.doe@example.com', name: 'John Doe' },
  alice: { email: 'alice.smith@example.com', name: 'Alice Smith' },
  bob: { email: 'bob.johnson@example.com', name: 'Bob Johnson' },
  support: { email: 'support@byunivert.com', name: 'Byunivert Support' },
}

const mockMessages: Message[] = [
  {
    id: 'msg-1',
    from: mockContacts.cloudflare,
    to: [{ email: 'setifmail@byunivert.com', name: 'You' }],
    subject: 'Your Cloudflare login token: 2060881',
    body: 'Your Cloudflare login token is: 2060881. This token expires in 30 minutes.',
    date: new Date(Date.now() - 1 * 60 * 60 * 1000),
    read: false,
    starred: false,
    attachments: [],
    tags: [],
  },
  {
    id: 'msg-2',
    from: mockContacts.john,
    to: [{ email: 'setifmail@byunivert.com', name: 'You' }],
    subject: 'Project Review Meeting Next Week',
    body: 'Hi, I wanted to schedule a project review meeting for next week. Are you available on Tuesday or Wednesday afternoon? Let me know what works best for you.',
    date: new Date(Date.now() - 3 * 60 * 60 * 1000),
    read: true,
    starred: true,
    attachments: [],
    tags: ['work'],
  },
  {
    id: 'msg-3',
    from: mockContacts.alice,
    to: [{ email: 'setifmail@byunivert.com', name: 'You' }],
    subject: 'Design Assets Ready for Review',
    body: 'The design assets for the new dashboard are ready. I\'ve uploaded them to the shared drive. Please review and provide feedback by Friday.',
    date: new Date(Date.now() - 5 * 60 * 60 * 1000),
    read: true,
    starred: false,
    attachments: [
      { id: 'att-1', name: 'design-assets.zip', size: 45678900, mimeType: 'application/zip' },
    ],
    tags: ['design', 'review'],
  },
  {
    id: 'msg-4',
    from: mockContacts.bob,
    to: [{ email: 'setifmail@byunivert.com', name: 'You' }],
    subject: 'Team Building Event - RSVP Requested',
    body: 'We\'re organizing a team building event next month. Please RSVP by the 25th. More details will follow soon.',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: false,
    starred: false,
    attachments: [],
    tags: ['social'],
  },
  {
    id: 'msg-5',
    from: mockContacts.support,
    to: [{ email: 'setifmail@byunivert.com', name: 'You' }],
    subject: 'Welcome to Byunivert Mail',
    body: 'Welcome to your new Byunivert Mail account! We\'re excited to have you on board. Please explore our features and don\'t hesitate to reach out if you have any questions.',
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
