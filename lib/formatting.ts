/**
 * Formatting utilities for Byunivert Mail
 */

/**
 * Format file size to human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Format date to French locale
 */
export function formatDate(date: Date, format: 'short' | 'long' | 'time' = 'short'): string {
  const options: Intl.DateTimeFormatOptions = {
    locale: 'fr-FR',
  }

  switch (format) {
    case 'short':
      return date.toLocaleDateString('fr-FR', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    case 'long':
      return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    case 'time':
      return date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      })
    default:
      return date.toLocaleString('fr-FR')
  }
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export function getRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'À l\'instant'
  if (diffMins < 60) return `Il y a ${diffMins}m`
  if (diffHours < 24) return `Il y a ${diffHours}h`
  if (diffDays < 7) return `Il y a ${diffDays}j`

  return formatDate(date, 'short')
}

/**
 * Truncate text to a maximum length
 */
export function truncateText(text: string, maxLength: number = 60): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Extract first letter for avatar
 */
export function getAvatarLetter(name: string): string {
  return name.charAt(0).toUpperCase()
}

/**
 * Generate avatar background color from email/name
 */
export function getAvatarColor(input: string): string {
  const colors = [
    '#6366f1', // primary purple
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#f43f5e', // rose
    '#fb7185', // light red
    '#fbbf24', // amber
    '#34d399', // emerald
    '#06b6d4', // cyan
  ]

  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash)
  }

  return colors[Math.abs(hash) % colors.length]
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Parse email addresses from comma-separated string
 */
export function parseEmailAddresses(input: string): string[] {
  return input
    .split(',')
    .map((email) => email.trim())
    .filter((email) => email.length > 0 && isValidEmail(email))
}
