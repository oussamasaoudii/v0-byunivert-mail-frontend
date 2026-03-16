'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

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
  { id: 'inbox', label: 'Boîte de réception', icon: InboxIcon, badge: null },
  { id: 'starred', label: 'Favoris', icon: StarIcon, badge: null },
  { id: 'sent', label: 'Envoyés', icon: SendIcon, badge: null },
  { id: 'drafts', label: 'Brouillons', icon: DraftIcon, badge: null },
  { id: 'spam', label: 'Spam', icon: SpamIcon, badge: 2 },
  { id: 'trash', label: 'Corbeille', icon: TrashIcon, badge: null },
]

const SECONDARY_NAV = [
  { id: 'contacts', label: 'Contacts', icon: DiamondIcon },
  { id: 'labels', label: 'Étiquettes', icon: CrownIcon },
  { id: 'rules', label: 'Règles', icon: ChartIcon },
  { id: 'signatures', label: 'Signatures', icon: GlobeIcon },
  { id: 'settings', label: 'Paramètres', icon: SwapIcon },
]

export default function MailSidebar() {
  const [activeFolder, setActiveFolder] = useState('inbox')
  const [mobileOpen, setMobileOpen] = useState(false)

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
      <aside className={`fixed md:relative w-[220px] h-full bg-[#0a0a0a] flex flex-col z-40 transition-transform md:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Logo - matches reference: teal rounded box with house icon */}
        <div className="px-5 py-6">
          <Link href="/mail" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00d9a5] flex items-center justify-center flex-shrink-0 shadow-md shadow-[#00d9a5]/40">
              <DMailLogo />
            </div>
            <span className="text-[15px] font-bold tracking-wide text-white">Byunivert Mail</span>
          </Link>
        </div>

        {/* Compose button - white pill, full width with padding */}
        <div className="px-4 pb-5">
          <button className="w-full h-11 bg-white text-black font-semibold rounded-full text-[14px] hover:bg-gray-100 transition-colors">
            Composer
          </button>
        </div>

        {/* Main nav - primary folders */}
        <nav className="flex-1 overflow-y-auto px-3">
          <div className="space-y-0.5">
            {MAIN_NAV.map((item) => {
              const isActive = activeFolder === item.id
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveFolder(item.id)
                    setMobileOpen(false)
                  }}
                  className={`w-full px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all flex items-center gap-3 ${
                    isActive
                      ? 'bg-[#00d9a5] text-black shadow-[0_0_20px_rgba(0,217,165,0.4)]'
                      : 'text-[#888] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[11px] font-bold min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center ${
                      isActive ? 'bg-black/20 text-black' : 'bg-[#e74c3c] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-white/[0.06]" />

          {/* Secondary nav - Web3 features */}
          <div className="space-y-0.5">
            {SECONDARY_NAV.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  className="w-full px-3 py-2.5 rounded-lg text-[13px] font-medium text-[#555] hover:text-[#888] hover:bg-white/5 transition-all flex items-center gap-3"
                >
                  <Icon />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </nav>
      </aside>
    </>
  )
}
