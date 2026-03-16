'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

/* Custom Icons */
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z"/>
  </svg>
)

const InboxIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M19 5V7H5V5H19M5 19V9H19V19H5Z"/>
  </svg>
)

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
  </svg>
)

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99021575 L3.03521743,10.4312088 C3.03521743,10.5883061 3.34915502,10.7454035 3.50612381,10.7454035 L16.6915026,11.5308905 C16.6915026,11.5308905 17.1624089,11.5308905 17.1624089,12.0021827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"/>
  </svg>
)

const DraftIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3M17 5V7H19V19H5V5H17Z"/>
  </svg>
)

const SpamIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M12.5 7H11V13H12.5V7M12.5 15H11V17H12.5V15Z"/>
  </svg>
)

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19M19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"/>
  </svg>
)

const CoinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M12 6V18M15 9.5C15 8.12 13.66 7 12 7C10.34 7 9 8.12 9 9.5C9 10.88 10.34 12 12 12C13.66 12 15 13.12 15 14.5C15 15.88 13.66 17 12 17C10.34 17 9 15.88 9 14.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
)

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M5 9.2H3V21H5V9.2M11 5H9V21H11V5M17 13H15V21H17V13Z"/>
  </svg>
)

const CrownIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2L2 7L4 14H20L22 7L12 2M12 6L15 10L9 10L12 6Z"/>
  </svg>
)

const DiamondIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2L2 10V14L12 22L22 14V10L12 2M12 6L18 10L14 18L10 18L6 10L12 6Z"/>
  </svg>
)

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M2 12H22M12 2C14.5 4.5 15.5 8 15.5 12C15.5 16 14.5 19.5 12 22C9.5 19.5 8.5 16 8.5 12C8.5 8 9.5 4.5 12 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
)

const SwapIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M7 16L11 12L7 8M17 8L13 12L17 16M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)

const MAIN_NAV = [
  { id: 'inbox', label: 'Inbox', icon: InboxIcon, badge: null },
  { id: 'starred', label: 'Starred', icon: StarIcon, badge: null },
  { id: 'sent', label: 'Sent', icon: SendIcon, badge: null },
  { id: 'drafts', label: 'Drafts', icon: DraftIcon, badge: null },
  { id: 'spam', label: 'Spam', icon: SpamIcon, badge: 4 },
  { id: 'trash', label: 'Trash', icon: TrashIcon, badge: null },
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
        className="md:hidden fixed bottom-6 left-6 z-50 w-12 h-12 rounded-lg bg-[#00d9a5] text-black flex items-center justify-center shadow-lg shadow-[#00d9a5]/30 hover:bg-[#00d9a5]/90 transition-colors"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative w-[220px] h-full bg-[#0a0a0a] flex flex-col z-40 transform transition-transform md:translate-x-0 border-r border-white/5 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Logo section */}
        <div className="px-5 pt-6 pb-4 border-b border-white/5">
          <Link href="/mail" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#00d9a5] flex items-center justify-center flex-shrink-0 shadow-md shadow-[#00d9a5]/30">
              <MailIcon />
            </div>
            <span className="text-sm font-bold tracking-wider text-white">DMAIL</span>
          </Link>
        </div>

        {/* Compose button */}
        <div className="px-4 py-4 border-b border-white/5">
          <button className="w-full h-10 bg-white text-black font-semibold rounded-full text-sm transition-all hover:bg-gray-100 shadow-md hover:shadow-lg">
            Compose
          </button>
        </div>

        {/* Main navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
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
                  className={`w-full px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-3 relative ${
                    isActive
                      ? 'bg-[#00d9a5] text-black glow-primary-subtle'
                      : 'text-gray-400 hover:text-white hover:bg-white/8'
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
          <div className="my-4 border-t border-white/8" />

          {/* Secondary navigation */}
          <div className="space-y-1">
            {SECONDARY_NAV.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-300 hover:bg-white/8 transition-all flex items-center gap-3"
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
