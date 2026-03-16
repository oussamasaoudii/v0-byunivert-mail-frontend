'use client'

import { Search } from 'lucide-react'

interface SearchInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export default function SearchInput({
  placeholder = 'Rechercher...',
  value = '',
  onChange,
  className = '',
}: SearchInputProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00d9a5] pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full h-12 pl-12 pr-6 bg-[#0a0a0a] rounded-xl border border-[#00d9a5]/30 text-[13px] text-white placeholder:text-gray-700 focus:outline-none focus:border-[#00d9a5] focus:bg-[#0a0a0a] focus:shadow-[0_0_20px_rgba(0,217,165,0.3),inset_0_0_20px_rgba(0,217,165,0.05)] transition-all duration-300"
      />
    </div>
  )
}
