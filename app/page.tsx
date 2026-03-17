'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Eye, EyeOff } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { getSession, login } from '@/lib/adapters/mail-adapter'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    getSession()
      .then((session) => {
        if (active && session.authenticated) {
          router.replace('/mail')
        }
      })
      .catch(() => {
        // Stay on login if session lookup fails.
      })
      .finally(() => {
        if (active) {
          setIsCheckingSession(false)
        }
      })

    return () => {
      active = false
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
      router.replace('/mail')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center" suppressHydrationWarning>
        <div className="w-10 h-10 rounded-full border-2 border-[#00d9a5]/30 border-t-[#00d9a5] animate-spin" suppressHydrationWarning />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] dark:bg-[#0a0a0a] light:bg-white flex items-center justify-center px-4 py-8 relative overflow-hidden" suppressHydrationWarning>
      {/* Theme Toggle - top right */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Atmospheric background layer - primary emerald glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main radial glow - centered behind form (dark mode) */}
        <div className="dark:block hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-[#00d9a5]/8 via-[#00d9a5]/4 to-transparent rounded-full blur-[120px] opacity-40" />
        
        {/* Main radial glow - centered behind form (light mode) */}
        <div className="light:block hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-[#00956a]/6 via-[#00956a]/3 to-transparent rounded-full blur-[120px] opacity-25" />
        
        {/* Secondary accent glow - lower right corner (light mode) */}
        <div className="light:block hidden absolute -bottom-96 -right-96 w-[600px] h-[600px] bg-gradient-to-tl from-[#00956a]/4 via-transparent to-transparent rounded-full blur-[100px] opacity-15" />
        
        {/* Tertiary accent glow - upper left corner for balance (light mode) */}
        <div className="light:block hidden absolute -top-80 -left-80 w-[500px] h-[500px] bg-gradient-to-br from-[#00956a]/3 via-transparent to-transparent rounded-full blur-[80px] opacity-12" />
        
        {/* Subtle vignette - elegant depth from edges (dark mode) */}
        <div className="dark:block hidden absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
        
        {/* Subtle vignette - elegant depth from edges (light mode) */}
        <div className="light:block hidden absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5" />
        
        {/* Soft radial vignette - darker at edges (dark mode) */}
        <div className="dark:block hidden absolute inset-0 bg-radial-vignette opacity-40" style={{
          backgroundImage: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)'
        }} />
        
        {/* Soft radial vignette - lighter at edges (light mode) */}
        <div className="light:block hidden absolute inset-0 bg-radial-vignette opacity-15" style={{
          backgroundImage: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.08) 100%)'
        }} />
        
        {/* Low-contrast gradient wash - subtle depth layers (dark mode) */}
        <div className="dark:block hidden absolute inset-0 bg-gradient-to-b from-[#00d9a5]/[0.02] via-transparent to-[#0a0a0a]/40 opacity-50" />
        
        {/* Low-contrast gradient wash - subtle depth layers (light mode) */}
        <div className="light:block hidden absolute inset-0 bg-gradient-to-b from-[#00956a]/[0.01] via-transparent to-white/20 opacity-30" />
      </div>

      {/* Main container */}
      <div className="w-full max-w-md relative z-10">
        {/* Header - Logo and Branding */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg dark:bg-[#00d9a5]/10 light:bg-[#00956a]/12 mb-6 dark:shadow-lg dark:shadow-[#00d9a5]/20 light:shadow-lg light:shadow-[#00956a]/10 dark:border dark:border-[#00d9a5]/20 light:border light:border-[#00956a]/20">
            <svg className="w-6 h-6 dark:text-[#00d9a5] light:text-[#00956a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-[28px] font-bold dark:text-white light:text-[#1a1a1a] mb-2 tracking-tight">Byunivert Mail</h1>
          <p className="text-[14px] dark:text-gray-500 light:text-[#6b7370] font-medium">Une interface de messagerie moderne et sécurisée</p>
        </div>

        {/* Login card container */}
        <div className="dark:bg-[#0f0f0f] light:bg-white rounded-2xl dark:border dark:border-white/[0.08] light:border light:border-[#00956a]/15 p-8 dark:shadow-2xl dark:shadow-black/50 light:shadow-lg light:shadow-[#00956a]/8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error message */}
            {error && (
              <div className="p-3.5 rounded-lg dark:bg-red-500/10 light:bg-red-50 dark:border dark:border-red-500/30 light:border light:border-red-200 dark:text-red-400 light:text-red-600 text-[13px] font-medium">
                {error}
              </div>
            )}

            {/* Email field */}
            <div className="space-y-2.5">
              <label className="text-[12px] font-semibold dark:text-gray-300 light:text-[#6b7370] uppercase tracking-wide">Adresse e-mail</label>
              <input
                type="email"
                placeholder="vous@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full h-11 dark:bg-[#0a0a0a] light:bg-[#f8f7f6] dark:border dark:border-white/[0.08] light:border light:border-[#00956a]/15 rounded-lg px-4 text-[14px] dark:text-white light:text-[#1a1a1a] dark:placeholder:text-gray-700 light:placeholder:text-[#00956a]/50 dark:focus:outline-none dark:focus:border-[#00d9a5]/50 dark:focus:bg-[#0a0a0a]/80 light:focus:outline-none light:focus:border-[#00956a]/50 light:focus:bg-white transition-all disabled:opacity-60"
              />
            </div>

            {/* Password field */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-semibold dark:text-gray-300 light:text-[#6b7370] uppercase tracking-wide">Mot de passe</label>
                <a href="#" className="text-[12px] dark:text-[#00d9a5] light:text-[#00956a] dark:hover:text-[#00d9a5]/80 light:hover:text-[#007d54] font-medium transition-colors">
                  Oublié ?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full h-11 dark:bg-[#0a0a0a] light:bg-[#f8f7f6] dark:border dark:border-white/[0.08] light:border light:border-[#00956a]/15 rounded-lg px-4 pr-11 text-[14px] dark:text-white light:text-[#1a1a1a] dark:placeholder:text-gray-700 light:placeholder:text-[#00956a]/50 dark:focus:outline-none dark:focus:border-[#00d9a5]/50 dark:focus:bg-[#0a0a0a]/80 light:focus:outline-none light:focus:border-[#00956a]/50 light:focus:bg-white transition-all disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 dark:text-gray-700 dark:hover:text-gray-500 light:text-[#00956a]/60 light:hover:text-[#00956a] transition-colors p-1"
                  tabIndex={-1}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
                className="w-4 h-4 rounded dark:border dark:border-white/[0.08] light:border light:border-[#00956a]/20 dark:bg-[#0a0a0a] light:bg-white dark:accent-[#00d9a5] light:accent-[#00956a] cursor-pointer disabled:opacity-60"
              />
              <label htmlFor="remember" className="text-[13px] dark:text-gray-400 light:text-[#6b7370] font-medium cursor-pointer select-none">
                Se souvenir de moi
              </label>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 dark:bg-[#00d9a5] dark:text-black light:bg-[#00956a] light:text-white rounded-lg font-semibold text-[14px] dark:hover:bg-[#00d9a5]/90 dark:active:bg-[#00d9a5]/80 light:hover:bg-[#007d54] light:active:bg-[#006a46] disabled:opacity-70 transition-all dark:shadow-lg dark:shadow-[#00d9a5]/25 dark:hover:shadow-lg dark:hover:shadow-[#00d9a5]/35 light:shadow-md light:shadow-[#00956a]/20 light:hover:shadow-md light:hover:shadow-[#00956a]/30 font-bold tracking-wide"
            >
              {isLoading ? 'Connexion...' : 'Connexion'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 dark:border-t dark:border-white/[0.08] light:border-t light:border-[#00956a]/10 text-center">
          <p className="text-[12px] dark:text-gray-600 light:text-[#6b7370] font-medium">
            © 2024 Byunivert Mail. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  )
}
