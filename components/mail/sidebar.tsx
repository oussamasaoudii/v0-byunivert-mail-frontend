'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

/* Icons matching reference design */
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const InboxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path d="M22 12H16L14 15H10L8 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.45 5.11L2 12V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V12L18.55 5.11C18.3844 4.77679 18.1292 4.49637 17.813 4.30028C17.4967 4.10419 17.1321 4.0002 16.76 4H7.24C6.86792 4.0002 6.50326 4.10419 6.18704 4.30028C5.87083 4.49637 5.61558 4.77679 5.45 5.11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const DraftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const SpamIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CoinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 6V18M15 9.5C15 8.12 13.66 7 12 7C10.34 7 9 8.12 9 9.5C9 10.88 10.34 12 12 12C13.66 12 15 13.12 15 14.5C15 15.88 13.66 17 12 17C10.34 17 9 15.88 9 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path d="M18 20V10M12 20V4M6 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CrownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const DiamondIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path d="M6 3H18L22 9L12 22L2 9L6 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 9H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 22V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 2C14.5 4.5 15.5 8 15.5 12C15.5 16 14.5 19.5 12 22C9.5 19.5 8.5 16 8.5 12C8.5 8 9.5 4.5 12 2Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
)

const SwapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path d="M16 3L20 7L16 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 7H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 21L4 17L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const MAIN_NAV = [
  { id: 'inbox', label: 'Boîte de réception', icon: InboxIcon, badge: null },
  { id: 'starred', label: 'Favoris', icon: StarIcon, badge: null },
  { id: 'sent', label: 'Envoyés', icon: SendIcon, badge: null },
  { id: 'drafts', label: 'Brouillons', icon: DraftIcon, badge: null },
  { id: 'spam', label: 'Spam', icon: SpamIcon, badge: 4 },
  { id: 'trash', label: 'Corbeille', icon: TrashIcon, badge: null },
]

const SECONDARY_NAV = [
  { id: 'earning', label: 'Earning', icon: CoinIcon },
  { id: 'dex', label: 'DEX Tool', icon: ChartIcon },
  { id: 'subscription', label: 'Subscription', icon: CrownIcon },
  { id: 'nft', label: 'NFT Market', icon: DiamondIcon },
  { id: 'domain', label: 'Domain', icon: GlobeIcon },
  { id: 'swap', label: 'Swap DMAIL', icon: SwapIcon },
]

export default function MailSidebar() {
  const [activeFolder, setActiveFolder] = useState('inbox')
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed bottom-6 left-6 z-50 w-14 h-14 rounded-xl bg-[#00d9a5] text-black flex items-center justify-center shadow-lg shadow-[#00d9a5]/30"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/80 z-30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar - exact width matching reference (~240px) */}
      <aside className={`fixed md:relative w-[240px] h-screen bg-[#0a0a0a] flex flex-col z-40 transform transition-transform md:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Logo section */}
        <div className="px-5 pt-6 pb-5">
          <Link href="/mail" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00d9a5] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#00d9a5]/30">
              <MailIcon />
            </div>
            <span className="text-base font-bold tracking-wide text-white">BYUNIVERT</span>
          </Link>
        </div>

        {/* Compose button - white/light as in reference */}
        <div className="px-4 pb-5">
          <button className="w-full h-11 bg-white/95 hover:bg-white text-black font-semibold rounded-full text-sm transition-all shadow-sm hover:shadow-md">
            Compose
          </button>
        </div>

        {/* Main navigation */}
        <nav className="flex-1 overflow-y-auto px-3">
          <div className="space-y-1">
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
                  className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 relative ${
                    isActive
                      ? 'bg-[#00d9a5] text-black glow-primary-subtle'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className={`text-xs font-bold min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center ${
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
          <div className="my-4 border-t border-white/10" />

          {/* Secondary navigation */}
          <div className="space-y-1">
            {SECONDARY_NAV.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  className="w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all flex items-center gap-3"
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
