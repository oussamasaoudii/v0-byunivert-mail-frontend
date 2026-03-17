import { Users } from 'lucide-react'
import Link from 'next/link'

interface ContactsButtonProps {
  onClick?: () => void
  className?: string
}

export default function ContactsButton({ onClick, className = '' }: ContactsButtonProps) {
  const handleClick = () => {
    onClick?.()
  }

  return (
    <Link href="/index.php?_task=addressbook" prefetch={false}>
      <button
        onClick={handleClick}
        className={`h-8 px-3.5 rounded-full border border-white/15 text-[12px] text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-colors flex items-center gap-2 font-medium ${className}`}
      >
        <Users className="w-3.5 h-3.5 text-[#00d9a5]" />
        Contacts
      </button>
    </Link>
  )
}
