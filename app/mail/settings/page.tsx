'use client'

import Link from 'next/link'
import { FolderOpen, IdCard, KeyRound, MessageSquareQuote, SlidersHorizontal, UserRound } from 'lucide-react'
import SettingsShell from '@/components/mail/settings-shell'

const cards = [
  {
    title: 'Préférences',
    description: 'Langue, fuseau horaire, options d’affichage et comportement par défaut.',
    href: '/mail/settings/preferences',
    icon: SlidersHorizontal,
  },
  {
    title: 'Dossiers',
    description: 'Abonnements IMAP, totaux, marquage des dossiers spéciaux et structure backend.',
    href: '/mail/settings/folders',
    icon: FolderOpen,
  },
  {
    title: 'Identités',
    description: 'Signatures, profils d’envoi et adresses configurées dans Roundcube.',
    href: '/mail/settings/identities',
    icon: IdCard,
  },
  {
    title: 'Réponses',
    description: 'Réponses enregistrées et blocs de texte réutilisables pour gagner du temps.',
    href: '/mail/settings/responses',
    icon: MessageSquareQuote,
  },
  {
    title: 'Mot de passe',
    description: 'Statut de la sécurité du compte et passerelle vers le plugin de changement de mot de passe.',
    href: '/mail/settings/security',
    icon: KeyRound,
  },
  {
    title: 'Infos utilisateur',
    description: 'Résumé du compte, backend, langue, fuseau horaire et identités disponibles.',
    href: '/mail/settings/profile',
    icon: UserRound,
  },
]

export default function SettingsOverviewPage() {
  return (
    <SettingsShell
      title="Paramètres"
      description="Toutes les vues de configuration sont maintenant alignées avec le nouveau thème, sans remplacer le moteur Roundcube ni ses plugins."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon

          return (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-[24px] border border-border/70 bg-card/85 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_0_24px_rgba(0,217,165,0.12)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.description}</p>
              <span className="mt-5 inline-flex items-center text-sm font-medium text-primary transition-transform group-hover:translate-x-0.5">
                Ouvrir
              </span>
            </Link>
          )
        })}
      </div>
    </SettingsShell>
  )
}
