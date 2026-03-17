'use client'

import { useEffect, useState } from 'react'
import { Loader2, MessageSquareQuote } from 'lucide-react'
import SettingsShell from '@/components/mail/settings-shell'
import { getResponses, type SavedResponse } from '@/lib/adapters/mail-adapter'

export default function ResponsesPage() {
  const [responses, setResponses] = useState<SavedResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    getResponses()
      .then((data) => {
        if (active) {
          setResponses(data)
        }
      })
      .catch(() => {
        if (active) {
          setResponses([])
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
      title="Réponses"
      description="Les réponses enregistrées de Roundcube sont présentées ici dans le même langage visuel que la messagerie."
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-3 rounded-[24px] border border-border/70 bg-card/80 px-5 py-20 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Chargement des réponses enregistrées…
        </div>
      ) : responses.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-border/70 bg-card/60 px-5 py-20 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MessageSquareQuote className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium text-foreground">Aucune réponse enregistrée</p>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">
            Ajoutez des réponses préremplies dans Roundcube pour les retrouver ici.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {responses.map((response) => (
            <article
              key={response.id}
              className="rounded-[24px] border border-border/70 bg-card/85 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <MessageSquareQuote className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-foreground">{response.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {response.isHtml ? 'HTML' : 'Texte'}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-border/70 bg-background/55 p-4">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-6 text-foreground/90">
                  {response.content.trim() || 'Réponse vide'}
                </pre>
              </div>
            </article>
          ))}
        </div>
      )}
    </SettingsShell>
  )
}
