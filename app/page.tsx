'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('setifmail@byunivert.com')
  const [password, setPassword] = useState('••••••••')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // In a real app, validate credentials against backend
      if (email && password && password.length > 0) {
        router.push('/mail')
      } else {
        setError('Veuillez remplir tous les champs')
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo and branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/20 mb-6">
            <Mail className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Byunivert Mail</h1>
          <p className="text-base text-muted-foreground">Votre messagerie sécurisée</p>
        </div>

        {/* Login form card */}
        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm font-medium">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Email Address</label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="h-11 bg-sidebar border-border rounded-xl text-base px-4"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="h-11 bg-sidebar border-border rounded-xl text-base px-4 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border" />
              <span className="text-foreground">Remember me</span>
            </label>
            <a href="#" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'CONNEXION'}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="h-11 border-border hover:bg-sidebar rounded-xl" disabled={isLoading}>
              Google
            </Button>
            <Button variant="outline" className="h-11 border-border hover:bg-sidebar rounded-xl" disabled={isLoading}>
              GitHub
            </Button>
            <Button variant="outline" className="h-11 border-border hover:bg-sidebar rounded-xl" disabled={isLoading}>
              Apple
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Don&apos;t have an account?{' '}
            <a href="#" className="text-primary hover:text-primary/80 font-semibold transition-colors">
              Sign up
            </a>
          </p>
          <p className="text-xs text-muted-foreground">
            © 2024 Byunivert. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
