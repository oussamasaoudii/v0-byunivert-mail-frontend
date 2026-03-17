'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { getFolders, type Folder } from '@/lib/adapters/mail-adapter'

/* DMail Logo - house/home icon matching reference */
const DMailLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
)

/* Navigation Icons - matching reference exactly */
const InboxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M3 12h6l2 3h2l2-3h6"/>
  </svg>
)

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
  </svg>
)

const DraftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
)

const SpamIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
)

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
)

const CoinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v12M9 9a3 3 0 1 0 6 0"/>
  </svg>
)

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
    <path d="M18 20V10M12 20V4M6 20v-6"/>
  </svg>
)

const CrownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
    <rect x="3" y="8" width="18" height="12" rx="2"/>
    <path d="M7 8V6a5 5 0 0 1 10 0v2"/>
  </svg>
)

const DiamondIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
    <path d="M12 2L2 7l10 15 10-15z"/>
  </svg>
)

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const SwapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M7 8l3-3 3 3M17 16l-3 3-3-3M10 5v14M14 5v14"/>
  </svg>
)

const MAIN_NAV = [
  { id: 'inbox', label: 'Boîte de réception', icon: InboxIcon },
  { id: 'starred', label: 'Favoris', icon: StarIcon },
  { id: 'sent', label: 'Envoyés', icon: SendIcon },
  { id: 'drafts', label: 'Brouillons', icon: DraftIcon },
  { id: 'spam', label: 'Spam', icon: SpamIcon },
  { id: 'trash', label: 'Corbeille', icon: TrashIcon },
]

const SECONDARY_NAV = [
  { id: 'contacts', label: 'Contacts', icon: DiamondIcon, href: '/index.php?_task=addressbook' },
  { id: 'labels', label: 'Étiquettes', icon: CrownIcon, href: '/index.php?_task=settings&_action=folders' },
  { id: 'rules', label: 'Règles', icon: ChartIcon, href: '/index.php?_task=settings&_action=preferences' },
  { id: 'signatures', label: 'Signatures', icon: GlobeIcon, href: '/index.php?_task=settings&_action=identities' },
  { id: 'settings', label: 'Paramètres', icon: SwapIcon, href: '/index.php?_task=settings' },
]

export default function MailSidebar({ activeFolder = 'inbox', onFolderChange }: { activeFolder?: string; onFolderChange?: (folder: string) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [folders, setFolders] = useState<Folder[]>([])

  useEffect(() => {
    let active = true

    getFolders()
      .then((data) => {
        if (active) {
          setFolders(data)
        }
      })
      .catch(() => {
        if (active) {
          setFolders([])
        }
      })

    return () => {
      active = false
    }
  }, [])

  const folderMap = useMemo(() => {
    return new Map(folders.map((folder) => [folder.id, folder]))
  }, [folders])

  const handleFolderChange = (folder: string) => {
    onFolderChange?.(folder)
    setMobileOpen(false)
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed bottom-6 left-6 z-50 w-12 h-12 rounded-xl bg-[#00d9a5] text-black flex items-center justify-center shadow-lg shadow-[#00d9a5]/30"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/60 z-30" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar - exact 220px width like reference */}
      <aside className={`fixed md:relative md:translate-x-0 w-[220px] h-full bg-transparent flex flex-col z-40 transition-transform dark:border-r dark:border-white/[0.05] light:border-r light:border-[#00956a]/10 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Logo - matches reference: teal rounded box with house icon */}
        <div className="px-4 py-5" suppressHydrationWarning>
          <Link href="/mail" className="flex items-center gap-2.5" prefetch={false}>
            <div className="w-8 h-8 rounded-lg dark:bg-[#00d9a5] light:bg-[#00956a] flex items-center justify-center flex-shrink-0 dark:shadow-md dark:shadow-[#00d9a5]/30 light:shadow-sm light:shadow-[#00956a]/20" suppressHydrationWarning>
              <DMailLogo />
            </div>
            <span className="text-[14px] font-bold tracking-wide dark:text-white light:text-[#1a1a1a]">Byunivert Mail</span>
          </Link>
        </div>

        {/* Compose button - white pill, full width with padding */}
        <div className="px-3 pb-5" suppressHydrationWarning>
          <button className="w-full h-10 dark:bg-white dark:text-black dark:hover:bg-gray-100 light:bg-primary light:text-primary-foreground light:hover:bg-primary/90 font-semibold rounded-full text-[13px] transition-colors shadow-sm">
            Composer
          </button>
        </div>

        {/* Main nav - primary folders */}
        <nav className="flex-1 overflow-y-auto px-2.5" suppressHydrationWarning>
          <div className="space-y-0.5">
            {MAIN_NAV.map((item) => {
              const isActive = activeFolder === item.id
              const Icon = item.icon
              const folder = folderMap.get(item.id)
              const badge = folder ? (folder.unread > 0 ? folder.unread : null) : null
              return (
                <button
                  key={item.id}
                  onClick={() => handleFolderChange(item.id)}
                  className={`w-full px-3 py-2 rounded-lg text-[12.5px] font-medium transition-all flex items-center gap-3 ${
                    isActive
                      ? 'dark:bg-[#00d9a5] dark:text-black dark:shadow-[0_0_20px_rgba(0,217,165,0.35)] light:bg-[#00956a] light:text-white light:shadow-[0_0_16px_rgba(0,149,106,0.2)]'
                      : 'dark:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8'
                  }`}
                  >
                    <Icon />
                    <span className="flex-1 text-left">{item.label}</span>
                  {badge && (
                    <span className={`text-[10px] font-bold min-w-[18px] h-5 px-1.5 rounded-full flex items-center justify-center ${
                      isActive ? 'dark:bg-black/20 dark:text-black light:bg-white/20 light:text-white' : 'dark:bg-[#e74c3c] dark:text-white light:bg-[#d63e38] light:text-white'
                    }`}>
                      {badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Divider */}
          <div className="my-5 dark:border-t dark:border-white/[0.08] light:border-t light:border-[#00956a]/10" />

          {/* Secondary nav - email features */}
          <div className="space-y-0.5">
            {SECONDARY_NAV.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.id} href={item.href} prefetch={false}>
                  <button
                    className="w-full px-3 py-2 rounded-lg text-[12.5px] font-medium dark:text-gray-600 dark:hover:text-gray-400 dark:hover:bg-white/5 light:text-[#6b7370] light:hover:text-[#00956a] light:hover:bg-[#00956a]/8 transition-all flex items-center gap-3"
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </button>
                </Link>
              )
            })}
          </div>
        </nav>
      </aside>
    </>
  )
}
