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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Byunivert Mail</h1>
          <p className="text-sm text-muted-foreground">Votre messagerie sécurisée</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Adresse email</label>
            <Input
              type="email"
              placeholder="nom@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Mot de passe</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="h-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border" />
              <span>Se souvenir de moi</span>
            </label>
            <a href="#" className="text-primary hover:underline">
              Mot de passe oublié?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full h-10 text-base font-semibold"
            disabled={isLoading}
          >
            {isLoading ? 'Connexion...' : 'CONNEXION'}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground mb-4">
            Vous n&apos;avez pas encore de compte?{' '}
            <a href="#" className="text-primary hover:underline font-medium">
              Créer un compte
            </a>
          </p>
          <p className="text-xs text-muted-foreground">
            © 2024 Byunivert. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  )
}
