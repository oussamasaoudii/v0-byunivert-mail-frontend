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
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-[#00d9a5] light:text-[#00956a]/50 pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full h-12 pl-12 pr-6 dark:bg-[#0a0a0a] light:bg-[#f8f7f6] rounded-xl dark:border dark:border-[#00d9a5]/30 light:border light:border-[#00956a]/15 text-[13px] dark:text-white light:text-[#1a1a1a] dark:placeholder:text-gray-700 light:placeholder:text-[#00956a]/50 focus:outline-none dark:focus:border-[#00d9a5] light:focus:border-[#00956a] dark:focus:bg-[#0a0a0a] light:focus:bg-white dark:focus:shadow-[0_0_20px_rgba(0,217,165,0.3),inset_0_0_20px_rgba(0,217,165,0.05)] light:focus:shadow-[0_0_16px_rgba(0,149,106,0.15),inset_0_0_16px_rgba(0,149,106,0.04)] transition-all duration-300"
      />
    </div>
  )
}
