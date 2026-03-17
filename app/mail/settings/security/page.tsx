'use client'

import { useEffect, useState } from 'react'
import { KeyRound, Loader2, ShieldCheck } from 'lucide-react'
import SettingsShell from '@/components/mail/settings-shell'
import { getSecuritySettings, getProfileSummary, type ProfileSummary, type SecuritySettings } from '@/lib/adapters/mail-adapter'

export default function SecurityPage() {
  const [security, setSecurity] = useState<SecuritySettings | null>(null)
  const [profile, setProfile] = useState<ProfileSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    Promise.all([getSecuritySettings(), getProfileSummary()])
      .then(([securityData, profileData]) => {
        if (!active) {
          return
        }

        setSecurity(securityData)
        setProfile(profileData)
      })
      .catch(() => {
        if (!active) {
          return
        }

        setSecurity(null)
        setProfile(null)
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
      title="Mot de passe"
      description="La sécurité reste gérée par Roundcube et son plugin password. Cette vue centralise les informations avant ouverture du formulaire natif."
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-3 rounded-[24px] border border-border/70 bg-card/80 px-5 py-20 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Vérification des réglages de sécurité…
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr),360px]">
          <section className="rounded-[24px] border border-border/70 bg-card/85 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Sécurité du compte</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Le changement de mot de passe reste pris en charge par le backend Roundcube pour conserver la
                  compatibilité avec l’infrastructure existante.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-border/70 bg-background/55 px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Plugin actif</p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {security?.enabled ? 'Oui, plugin password détecté' : 'Plugin non détecté'}
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/55 px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Mot de passe actuel</p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {security?.confirmCurrent ? 'Vérification requise' : 'Non exigé'}
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/55 px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Longueur minimale</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{security?.minimumLength ?? '—'} caractères</p>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-primary/15 bg-primary/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">Action backend</p>
              <p className="mt-2 text-sm leading-6 text-foreground/90">
                La procédure d’enregistrement reste celle de Roundcube, ce qui évite de casser les plugins ou les
                sessions existantes.
              </p>
              {security?.actionUrl ? (
                <a
                  href={security.actionUrl}
                  className="mt-5 inline-flex h-11 items-center gap-2 rounded-2xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_rgba(0,217,165,0.18)] transition-transform hover:-translate-y-0.5"
                >
                  <KeyRound className="h-4 w-4" />
                  Ouvrir le formulaire sécurisé
                </a>
              ) : null}
            </div>
          </section>

          <aside className="rounded-[24px] border border-border/70 bg-card/85 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Compte courant</p>
            <h4 className="mt-3 text-lg font-semibold text-foreground">{profile?.displayName || 'Compte Roundcube'}</h4>
            <p className="mt-2 text-sm text-primary">{profile?.email || '—'}</p>
            <dl className="mt-5 space-y-4">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Backend</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">{profile?.backend || 'Roundcube'}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Fuseau horaire</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">{profile?.timezone || 'UTC'}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Langue</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">{profile?.language || 'fr_FR'}</dd>
              </div>
            </dl>
          </aside>
        </div>
      )}
    </SettingsShell>
  )
}
