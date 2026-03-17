'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2.5 rounded-lg transition-all duration-300 hover:scale-105 dark:hover:bg-white/8 light:hover:bg-[#00956a]/8 text-gray-600 dark:text-gray-400 light:text-[#00956a] dark:hover:text-gray-300 light:hover:text-[#00956a]"
      title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  )
}
