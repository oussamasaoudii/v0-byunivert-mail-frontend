'use client'

import { useEffect, useState } from 'react'
import { Loader2, SlidersHorizontal } from 'lucide-react'
import SettingsShell from '@/components/mail/settings-shell'
import { getPreferences, type PreferenceSection } from '@/lib/adapters/mail-adapter'

function formatValue(value: string | boolean | number | null) {
  if (typeof value === 'boolean') {
    return value ? 'Activé' : 'Désactivé'
  }
  if (value === null || value === '') {
    return 'Non défini'
  }
  return String(value)
}

export default function PreferencesPage() {
  const [sections, setSections] = useState<PreferenceSection[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    getPreferences()
      .then((data) => {
        if (active) {
          setSections(data)
        }
      })
      .catch(() => {
        if (active) {
          setSections([])
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
      title="Préférences"
      description="Cette vue affiche les préférences réellement stockées dans Roundcube, regroupées pour rester lisibles dans le nouveau thème."
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-3 rounded-[24px] border border-border/70 bg-card/80 px-5 py-20 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Lecture des préférences…
        </div>
      ) : (
        <div className="space-y-5">
          {sections.map((section) => (
            <section
              key={section.id}
              className="rounded-[24px] border border-border/70 bg-card/85 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-start gap-3 border-b border-border/70 pb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <SlidersHorizontal className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{section.label}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{section.description}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {section.items.map((item) => (
                  <div
                    key={item.key}
                    className="flex flex-col gap-2 rounded-2xl border border-border/70 bg-background/55 px-4 py-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="shrink-0">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          typeof item.value === 'boolean'
                            ? item.value
                              ? 'bg-primary/12 text-primary'
                              : 'bg-muted text-muted-foreground'
                            : 'bg-card text-foreground'
                        }`}
                      >
                        {formatValue(item.value)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </SettingsShell>
  )
}
