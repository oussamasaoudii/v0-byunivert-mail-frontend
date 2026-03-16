import { Users } from 'lucide-react'

interface ContactsButtonProps {
  onClick?: () => void
  className?: string
}

export default function ContactsButton({ onClick, className = '' }: ContactsButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`h-8 px-3.5 rounded-full border border-white/15 text-[12px] text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-colors flex items-center gap-2 font-medium ${className}`}
    >
      <Users className="w-3.5 h-3.5 text-[#00d9a5]" />
      Contacts
    </button>
  )
}
