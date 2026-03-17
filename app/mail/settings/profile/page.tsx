'use client'

import { useEffect, useState } from 'react'
import { Loader2, ServerCog, UserRound } from 'lucide-react'
import SettingsShell from '@/components/mail/settings-shell'
import { getProfileSummary, type ProfileSummary } from '@/lib/adapters/mail-adapter'

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    getProfileSummary()
      .then((data) => {
        if (active) {
          setProfile(data)
        }
      })
      .catch(() => {
        if (active) {
          setProfile(null)
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <SettingsShell
      title="Infos utilisateur"
      description="Résumé technique du compte actuellement ouvert dans Roundcube, réexposé dans le nouveau frontend."
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-3 rounded-[24px] border border-border/70 bg-card/80 px-5 py-20 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Chargement du profil…
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr),320px]">
          <section className="rounded-[24px] border border-border/70 bg-card/85 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <UserRound className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-primary/70">Profil actif</p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">{profile?.displayName || 'Utilisateur'}</h3>
                <p className="mt-2 text-sm text-primary">{profile?.email || '—'}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-background/55 px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Nom d’utilisateur</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{profile?.username || '—'}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/55 px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Langue</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{profile?.language || 'fr_FR'}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/55 px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Fuseau horaire</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{profile?.timezone || 'UTC'}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/55 px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Serveur IMAP</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{profile?.storageHost || '—'}</p>
              </div>
            </div>
          </section>

          <aside className="rounded-[24px] border border-border/70 bg-card/85 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <ServerCog className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Backend</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{profile?.backend || 'Roundcube'}</p>
              </div>
            </div>

            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Identités</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">{profile?.identitiesCount ?? 0}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Réponses enregistrées</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">{profile?.responsesCount ?? 0}</dd>
              </div>
            </dl>

            <a
              href="/index.php?_task=settings&_action=plugin.userinfo"
              className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-2xl border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary"
            >
              Ouvrir les détails backend
            </a>
          </aside>
        </div>
      )}
    </SettingsShell>
  )
}
