'use client'

import { useEffect, useState } from 'react'
import { FolderOpen, Loader2, RefreshCw } from 'lucide-react'
import SettingsShell from '@/components/mail/settings-shell'
import { getFolderSettings, type FolderSetting } from '@/lib/adapters/mail-adapter'

export default function FolderSettingsPage() {
  const [folders, setFolders] = useState<FolderSetting[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    getFolderSettings()
      .then((data) => {
        if (active) {
          setFolders(data)
        }
      })
      .catch(() => {
        if (active) {
          setFolders([])
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
      title="Dossiers"
      description="Vue thémée des dossiers IMAP réellement connus par Roundcube. Les statuts, rôles spéciaux et volumes viennent du backend."
      actions={
        <a
          href="/index.php?_task=settings&_action=folders"
          className="inline-flex h-11 items-center gap-2 rounded-2xl border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
        >
          <RefreshCw className="h-4 w-4" />
          Vue Roundcube classique
        </a>
      }
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-3 rounded-[24px] border border-border/70 bg-card/80 px-5 py-20 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Analyse des dossiers en cours…
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {folders.map((folder) => (
            <article
              key={folder.id}
              className="rounded-[24px] border border-border/70 bg-card/85 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <FolderOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{folder.label}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">{folder.mailbox}</p>
                  </div>
                </div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    folder.subscribed ? 'bg-primary/12 text-primary' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {folder.subscribed ? 'Abonné' : 'Masqué'}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">{folder.description}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-border/70 bg-background/60 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Total</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">{folder.total}</p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/60 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Non lus</p>
                  <p className="mt-1 text-lg font-semibold text-primary">{folder.unread}</p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/60 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Rôle</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {folder.specialRole ? folder.specialRole : 'Standard'}
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
