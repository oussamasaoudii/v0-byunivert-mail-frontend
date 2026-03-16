'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      
      if (email && password && password.length >= 6) {
        router.push('/mail')
      } else {
        setError('Veuillez vérifier vos identifiants')
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Atmospheric background layer - primary emerald glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main radial glow - centered behind form */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-[#00d9a5]/8 via-[#00d9a5]/4 to-transparent rounded-full blur-[120px] opacity-40" />
        
        {/* Secondary accent glow - lower right corner */}
        <div className="absolute -bottom-96 -right-96 w-[600px] h-[600px] bg-gradient-to-tl from-[#00d9a5]/6 via-transparent to-transparent rounded-full blur-[100px] opacity-30" />
        
        {/* Tertiary accent glow - upper left corner for balance */}
        <div className="absolute -top-80 -left-80 w-[500px] h-[500px] bg-gradient-to-br from-[#00d9a5]/4 via-transparent to-transparent rounded-full blur-[80px] opacity-25" />
        
        {/* Subtle vignette - elegant depth from edges */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
        
        {/* Soft radial vignette - darker at edges */}
        <div className="absolute inset-0 bg-radial-vignette opacity-40" style={{
          backgroundImage: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)'
        }} />
        
        {/* Low-contrast gradient wash - subtle depth layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#00d9a5]/[0.02] via-transparent to-[#0a0a0a]/40 opacity-50" />
      </div>

      {/* Main container */}
      <div className="w-full max-w-md relative z-10">
        {/* Header - Logo and Branding */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#00d9a5]/10 mb-6 shadow-lg shadow-[#00d9a5]/20 border border-[#00d9a5]/20">
            <svg className="w-6 h-6 text-[#00d9a5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-[28px] font-bold text-white mb-2 tracking-tight">Byunivert Mail</h1>
          <p className="text-[14px] text-gray-500 font-medium">Une interface de messagerie moderne et sécurisée</p>
        </div>

        {/* Login card container */}
        <div className="bg-[#0f0f0f] rounded-2xl border border-white/[0.08] p-8 shadow-2xl shadow-black/50">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error message */}
            {error && (
              <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-[13px] font-medium">
                {error}
              </div>
            )}

            {/* Email field */}
            <div className="space-y-2.5">
              <label className="text-[12px] font-semibold text-gray-300 uppercase tracking-wide">Adresse e-mail</label>
              <input
                type="email"
                placeholder="vous@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full h-11 bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-4 text-[14px] text-white placeholder:text-gray-700 focus:outline-none focus:border-[#00d9a5]/50 focus:bg-[#0a0a0a]/80 transition-all disabled:opacity-60"
              />
            </div>

            {/* Password field */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-semibold text-gray-300 uppercase tracking-wide">Mot de passe</label>
                <a href="#" className="text-[12px] text-[#00d9a5] hover:text-[#00d9a5]/80 font-medium transition-colors">
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
                  className="w-full h-11 bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-4 pr-11 text-[14px] text-white placeholder:text-gray-700 focus:outline-none focus:border-[#00d9a5]/50 focus:bg-[#0a0a0a]/80 transition-all disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-500 transition-colors p-1"
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
                className="w-4 h-4 rounded border border-white/[0.08] bg-[#0a0a0a] accent-[#00d9a5] cursor-pointer disabled:opacity-60"
              />
              <label htmlFor="remember" className="text-[13px] text-gray-400 font-medium cursor-pointer select-none">
                Se souvenir de moi
              </label>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-[#00d9a5] text-black rounded-lg font-semibold text-[14px] hover:bg-[#00d9a5]/90 active:bg-[#00d9a5]/80 disabled:opacity-70 transition-all shadow-lg shadow-[#00d9a5]/25 hover:shadow-lg hover:shadow-[#00d9a5]/35 font-bold tracking-wide"
            >
              {isLoading ? 'Connexion...' : 'Connexion'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-white/[0.08] text-center">
          <p className="text-[12px] text-gray-600 font-medium">
            © 2024 Byunivert Mail. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  )
}
