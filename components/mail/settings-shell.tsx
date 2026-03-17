'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FolderOpen,
  IdCard,
  KeyRound,
  MessageSquareQuote,
  Settings2,
  SlidersHorizontal,
  UserRound,
} from 'lucide-react'
import ProtectedMailShell from '@/components/mail/protected-mail-shell'

const SETTINGS_NAV = [
  {
    id: 'preferences',
    label: 'Préférences',
    description: 'Affichage et comportement',
    href: '/mail/settings/preferences',
    icon: SlidersHorizontal,
  },
  {
    id: 'folders',
    label: 'Dossiers',
    description: 'Abonnements et hiérarchie IMAP',
    href: '/mail/settings/folders',
    icon: FolderOpen,
  },
  {
    id: 'identities',
    label: 'Identités',
    description: 'Signatures et profils d’envoi',
    href: '/mail/settings/identities',
    icon: IdCard,
  },
  {
    id: 'responses',
    label: 'Réponses',
    description: 'Réponses enregistrées',
    href: '/mail/settings/responses',
    icon: MessageSquareQuote,
  },
  {
    id: 'security',
    label: 'Mot de passe',
    description: 'Sécurité du compte',
    href: '/mail/settings/security',
    icon: KeyRound,
  },
  {
    id: 'profile',
    label: 'Infos utilisateur',
    description: 'Résumé du compte',
    href: '/mail/settings/profile',
    icon: UserRound,
  },
]

export default function SettingsShell({
  title,
  description,
  children,
  actions,
}: {
  title: string
  description: string
  children: React.ReactNode
  actions?: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <ProtectedMailShell activeFolder={null}>
      <div className="flex min-w-0 flex-1">
        <aside className="hidden w-[290px] shrink-0 border-r border-border/70 bg-secondary/25 xl:flex xl:flex-col">
          <div className="border-b border-border/70 px-6 py-6">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/80">
              <Settings2 className="h-3.5 w-3.5" />
              Réglages Roundcube
            </div>
            <h1 className="text-2xl font-semibold text-foreground">Paramètres</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Toute la configuration backend reste gérée par Roundcube. Cette couche remplace uniquement
              l’interface.
            </p>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
            {SETTINGS_NAV.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`block rounded-2xl border px-4 py-3 transition-all ${
                    active
                      ? 'border-primary/30 bg-primary/10 shadow-[0_0_24px_rgba(0,217,165,0.16)]'
                      : 'border-transparent bg-transparent hover:border-border hover:bg-card/80'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl ${
                        active ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground'
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-medium ${active ? 'text-foreground' : 'text-foreground/90'}`}>
                        {item.label}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="border-b border-border/70 bg-secondary/20 px-6 py-5">
            <div className="mx-auto flex w-full max-w-6xl items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">Byunivert Mail</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
              {actions ? <div className="shrink-0">{actions}</div> : null}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </div>
        </div>
      </div>
    </ProtectedMailShell>
  )
}
