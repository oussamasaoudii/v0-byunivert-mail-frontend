export interface Contact {
  email: string
  name: string
  avatar?: string
}

export interface AddressBookContact {
  id: string
  name: string
  email: string
  phone?: string | null
  organization?: string | null
  source?: string | null
  groups?: string[]
}

export interface Attachment {
  id: string
  name: string
  size: number
  mimeType: string
  url?: string | null
}

export interface Message {
  id: string
  from: Contact
  to: Contact[]
  cc?: Contact[]
  subject: string
  body: string
  htmlBody?: string | null
  date: Date
  read: boolean
  starred: boolean
  attachments: Attachment[]
  tags: string[]
  folder?: 'inbox' | 'starred' | 'sent' | 'drafts' | 'spam' | 'trash' | string
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

export interface FolderSetting {
  id: string
  label: string
  mailbox: string
  unread: number
  total: number
  subscribed: boolean
  specialRole: string
  description: string
}

export interface IdentityProfile {
  id: string
  name: string
  email: string
  organization?: string | null
  replyTo?: string | null
  signature?: string | null
  isDefault: boolean
  changedAt?: string | null
}

export interface PreferenceItem {
  key: string
  label: string
  description: string
  value: string | boolean | number | null
  type: 'boolean' | 'text' | 'number'
}

export interface PreferenceSection {
  id: string
  label: string
  description: string
  items: PreferenceItem[]
}

export interface SavedResponse {
  id: string
  name: string
  content: string
  isHtml: boolean
}

export interface SecuritySettings {
  enabled: boolean
  confirmCurrent: boolean
  minimumLength: number
  actionUrl: string
}

export interface ProfileSummary {
  email: string
  displayName: string
  username: string
  language: string
  timezone: string
  storageHost: string
  identitiesCount: number
  responsesCount: number
  backend: string
}

interface SessionResponse {
  ok: boolean
  authenticated: boolean
  user: MailAccount | null
}

interface FoldersResponse {
  ok: boolean
  folders: Folder[]
}

interface MessagesResponse {
  ok: boolean
  messages: MessagePayload[]
}

interface MessageResponse {
  ok: boolean
  message: MessagePayload | null
}

interface ContactsResponse {
  ok: boolean
  contacts: AddressBookContact[]
}

interface FolderSettingsResponse {
  ok: boolean
  folders: FolderSetting[]
}

interface IdentitiesResponse {
  ok: boolean
  identities: IdentityProfile[]
}

interface PreferencesResponse {
  ok: boolean
  sections: PreferenceSection[]
}

interface ResponsesResponse {
  ok: boolean
  responses: SavedResponse[]
}

interface SecurityResponse {
  ok: boolean
  security: SecuritySettings
}

interface ProfileResponse {
  ok: boolean
  profile: ProfileSummary
}

interface MessagePayload {
  id: string
  from: Contact
  to: Contact[]
  cc?: Contact[]
  subject: string
  body: string
  htmlBody?: string | null
  date: string
  read: boolean
  starred: boolean
  attachments: Attachment[]
  tags?: string[]
  folder?: string
}

const API_BASE = process.env.NEXT_PUBLIC_RC_API_BASE ?? ''

function apiUrl(path: string): string {
  return `${API_BASE}${path}`
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(apiUrl(path), {
    credentials: 'include',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  const payload = (await response.json().catch(() => null)) as T | null

  if (!response.ok || !payload) {
    const message =
      typeof payload === 'object' &&
      payload !== null &&
      'error' in payload &&
      typeof (payload as { error?: unknown }).error === 'string'
        ? (payload as { error: string }).error
        : `Request failed with status ${response.status}`
    throw new Error(message)
  }

  return payload
}

function toMessage(payload: MessagePayload): Message {
  return {
    ...payload,
    htmlBody: payload.htmlBody ?? null,
    attachments: payload.attachments ?? [],
    tags: payload.tags ?? [],
    date: new Date(payload.date),
  }
}

export async function login(email: string, password: string): Promise<MailAccount> {
  const payload = await fetchJson<SessionResponse>('/rc-api/login.php', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'UTC',
    }),
  })

  if (!payload.authenticated || !payload.user) {
    throw new Error('Veuillez vérifier vos identifiants')
  }

  return payload.user
}

export async function getSession(): Promise<SessionResponse> {
  return fetchJson<SessionResponse>('/rc-api/session.php', {
    method: 'GET',
    headers: {},
  })
}

export async function logout(): Promise<void> {
  await fetchJson('/rc-api/logout.php', {
    method: 'POST',
  })
}

export async function getFolders(): Promise<Folder[]> {
  const payload = await fetchJson<FoldersResponse>('/rc-api/folders.php', {
    method: 'GET',
    headers: {},
  })

  return payload.folders
}

export async function getMessages(folderId: string = 'inbox'): Promise<Message[]> {
  const payload = await fetchJson<MessagesResponse>(`/rc-api/messages.php?folder=${encodeURIComponent(folderId)}`, {
    method: 'GET',
    headers: {},
  })

  return payload.messages.map(toMessage)
}

export async function getMessage(messageId: string): Promise<Message | null> {
  const payload = await fetchJson<MessageResponse>(`/rc-api/message.php?id=${encodeURIComponent(messageId)}`, {
    method: 'GET',
    headers: {},
  })

  return payload.message ? toMessage(payload.message) : null
}

export async function updateMessage(messageId: string, updates: Partial<Message>): Promise<Message | null> {
  const current = await getMessage(messageId)
  if (!current) {
    return null
  }

  return {
    ...current,
    ...updates,
    date: updates.date ? new Date(updates.date) : current.date,
  }
}

export async function deleteMessage(_messageId: string): Promise<boolean> {
  return false
}

export async function searchMessages(query: string): Promise<Message[]> {
  const folders = ['inbox', 'sent', 'drafts', 'spam', 'trash']
  const results = await Promise.all(folders.map((folder) => getMessages(folder)))
  const normalized = query.trim().toLowerCase()

  if (!normalized) {
    return results.flat()
  }

  return results
    .flat()
    .filter((message) => {
      return (
        message.subject.toLowerCase().includes(normalized) ||
        message.body.toLowerCase().includes(normalized) ||
        message.from.name.toLowerCase().includes(normalized) ||
        message.from.email.toLowerCase().includes(normalized)
      )
    })
}

export async function getContacts(): Promise<AddressBookContact[]> {
  const payload = await fetchJson<ContactsResponse>('/rc-api/contacts.php', {
    method: 'GET',
    headers: {},
  })

  return payload.contacts
}

export async function getFolderSettings(): Promise<FolderSetting[]> {
  const payload = await fetchJson<FolderSettingsResponse>('/rc-api/folder-settings.php', {
    method: 'GET',
    headers: {},
  })

  return payload.folders
}

export async function getIdentities(): Promise<IdentityProfile[]> {
  const payload = await fetchJson<IdentitiesResponse>('/rc-api/identities.php', {
    method: 'GET',
    headers: {},
  })

  return payload.identities
}

export async function getPreferences(): Promise<PreferenceSection[]> {
  const payload = await fetchJson<PreferencesResponse>('/rc-api/preferences.php', {
    method: 'GET',
    headers: {},
  })

  return payload.sections
}

export async function getResponses(): Promise<SavedResponse[]> {
  const payload = await fetchJson<ResponsesResponse>('/rc-api/responses.php', {
    method: 'GET',
    headers: {},
  })

  return payload.responses
}

export async function getSecuritySettings(): Promise<SecuritySettings> {
  const payload = await fetchJson<SecurityResponse>('/rc-api/security.php', {
    method: 'GET',
    headers: {},
  })

  return payload.security
}

export async function getProfileSummary(): Promise<ProfileSummary> {
  const payload = await fetchJson<ProfileResponse>('/rc-api/profile.php', {
    method: 'GET',
    headers: {},
  })

  return payload.profile
}
