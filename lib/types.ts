/**
 * Global TypeScript types for Byunivert Mail
 */

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
}

/**
 * Pagination info
 */
export interface PaginationInfo {
  page: number
  pageSize: number
  total: number
  hasMore: boolean
}

/**
 * User session
 */
export interface UserSession {
  id: string
  email: string
  name: string
  accounts: MailAccount[]
  activeAccountId: string
}

/**
 * Mail account
 */
export interface MailAccount {
  id: string
  email: string
  name: string
  provider: 'imap' | 'api' | 'roundcube' | 'oauth'
  isDefault: boolean
  unreadCount: number
}

/**
 * UI State
 */
export interface MailUIState {
  selectedMessageId: string | null
  selectedFolderId: string
  selectedMessages: Set<string>
  isComposerOpen: boolean
  searchQuery: string
  sortBy: 'date' | 'from' | 'subject'
  sortOrder: 'asc' | 'desc'
}

/**
 * Notification
 */
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}
