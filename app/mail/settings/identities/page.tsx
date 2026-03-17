'use client'

import { useEffect, useState } from 'react'
import { IdCard, Loader2, PenSquare } from 'lucide-react'
import SettingsShell from '@/components/mail/settings-shell'
import { getIdentities, type IdentityProfile } from '@/lib/adapters/mail-adapter'

export default function IdentitiesPage() {
  const [identities, setIdentities] = useState<IdentityProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    getIdentities()
      .then((data) => {
        if (active) {
          setIdentities(data)
        }
      })
      .catch(() => {
        if (active) {
          setIdentities([])
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
      title="Identités"
      description="Chaque identité provient directement de Roundcube. Les signatures et options d’envoi sont conservées."
      actions={
        <a
          href="/index.php?_task=settings&_action=identities"
          className="inline-flex h-11 items-center gap-2 rounded-2xl border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
        >
          <PenSquare className="h-4 w-4" />
          Éditer dans Roundcube
        </a>
      }
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-3 rounded-[24px] border border-border/70 bg-card/80 px-5 py-20 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Chargement des identités…
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {identities.map((identity) => (
            <article
              key={identity.id}
              className="rounded-[24px] border border-border/70 bg-card/85 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <IdCard className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{identity.name}</h3>
                    <p className="mt-1 text-sm text-primary">{identity.email}</p>
                    {identity.organization ? (
                      <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">{identity.organization}</p>
                    ) : null}
                  </div>
                </div>
                {identity.isDefault ? (
                  <span className="rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">Par défaut</span>
                ) : null}
              </div>

              <div className="mt-5 rounded-2xl border border-border/70 bg-background/55 p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Signature</p>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-foreground/90">
                  {identity.signature?.trim() || 'Aucune signature enregistrée pour cette identité.'}
                </p>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-border/70 bg-background/55 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Répondre à</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {identity.replyTo?.trim() || identity.email}
                  </p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/55 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Dernière mise à jour</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {identity.changedAt
                      ? new Date(identity.changedAt).toLocaleString('fr-FR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Non renseignée'}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </SettingsShell>
  )
}
