import { MessageSquare } from 'lucide-react'
import Link from 'next/link'

interface DiscuterButtonProps {
  onClick?: () => void
  className?: string
}

export default function DiscuterButton({ onClick, className = '' }: DiscuterButtonProps) {
  const handleClick = () => {
    onClick?.()
  }

  return (
    <Link href="/index.php?_task=mail&_action=compose" prefetch={false}>
      <button
        onClick={handleClick}
        className={`h-8 px-3.5 rounded-full border border-white/15 text-[12px] text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-colors flex items-center gap-2 font-medium ${className}`}
      >
        <MessageSquare className="w-3.5 h-3.5" />
        Discuter
      </button>
    </Link>
  )
}
