'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Loader2, Mail, Phone, Search, Users } from 'lucide-react'
import ProtectedMailShell from '@/components/mail/protected-mail-shell'
import { getContacts, type AddressBookContact } from '@/lib/adapters/mail-adapter'

export default function ContactsPage() {
  const [contacts, setContacts] = useState<AddressBookContact[]>([])
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    getContacts()
      .then((data) => {
        if (!active) {
          return
        }

        setContacts(data)
        setSelectedContactId(data[0]?.id ?? null)
      })
      .catch(() => {
        if (active) {
          setContacts([])
          setSelectedContactId(null)
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

  const filteredContacts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) {
      return contacts
    }

    return contacts.filter((contact) =>
      [contact.name, contact.email, contact.organization ?? '', contact.phone ?? '']
        .join(' ')
        .toLowerCase()
        .includes(query),
    )
  }, [contacts, searchQuery])

  const selectedContact = filteredContacts.find((contact) => contact.id === selectedContactId) ?? filteredContacts[0] ?? null

  return (
    <ProtectedMailShell activeFolder={null}>
      <div className="flex min-w-0 flex-1">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="border-b border-border/70 bg-secondary/20 px-6 py-5">
            <div className="mx-auto flex w-full max-w-6xl items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">Carnet d’adresses</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Contacts</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Accédez à vos contacts Roundcube, vérifiez les adresses enregistrées et lancez un nouveau
                  message depuis la nouvelle interface.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card/80 px-4 py-3 text-right shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Sources chargées</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">{contacts.length}</p>
                <p className="mt-1 text-xs text-muted-foreground">contacts détectés</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-[380px,minmax(0,1fr)] gap-6">
              <section className="rounded-[24px] border border-border/70 bg-card/85 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
                <div className="border-b border-border/70 px-5 py-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Rechercher un contact…"
                      className="h-11 w-full rounded-2xl border border-border bg-background/70 pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/45 focus:bg-background"
                    />
                  </div>
                </div>

                <div className="max-h-[calc(100vh-260px)] overflow-y-auto p-3">
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-3 rounded-2xl border border-border/70 bg-background/60 px-4 py-16 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Chargement des contacts…
                    </div>
                  ) : filteredContacts.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border/70 bg-background/50 px-4 py-16 text-center">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Users className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-medium text-foreground">Aucun contact trouvé</p>
                      <p className="mt-2 text-xs leading-6 text-muted-foreground">
                        Ajustez votre recherche ou ajoutez des contacts depuis Roundcube si nécessaire.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredContacts.map((contact) => {
                        const active = selectedContact?.id === contact.id
                        return (
                          <button
                            key={contact.id}
                            onClick={() => setSelectedContactId(contact.id)}
                            className={`w-full rounded-2xl border px-4 py-4 text-left transition-all ${
                              active
                                ? 'border-primary/30 bg-primary/10 shadow-[0_0_24px_rgba(0,217,165,0.14)]'
                                : 'border-transparent bg-background/50 hover:border-border/80 hover:bg-background/80'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground">
                                {contact.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-foreground">{contact.name}</p>
                                <p className="mt-1 truncate text-xs text-muted-foreground">{contact.email}</p>
                                {contact.organization ? (
                                  <p className="mt-2 truncate text-[11px] uppercase tracking-[0.12em] text-primary/70">
                                    {contact.organization}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              </section>

              <section className="rounded-[24px] border border-border/70 bg-card/85 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
                {selectedContact ? (
                  <div className="flex h-full flex-col">
                    <div className="flex items-start gap-4 border-b border-border/70 pb-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-primary text-xl font-semibold text-primary-foreground shadow-[0_0_28px_rgba(0,217,165,0.18)]">
                        {selectedContact.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">Contact sélectionné</p>
                        <h2 className="mt-2 text-2xl font-semibold text-foreground">{selectedContact.name}</h2>
                        <p className="mt-2 text-sm text-primary">{selectedContact.email}</p>
                        {selectedContact.organization ? (
                          <p className="mt-2 text-sm text-muted-foreground">{selectedContact.organization}</p>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Adresse principale</p>
                        <div className="mt-3 flex items-center gap-3">
                          <div className="rounded-xl bg-primary/10 p-2 text-primary">
                            <Mail className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{selectedContact.email}</p>
                            <p className="text-xs text-muted-foreground">Routage via Roundcube</p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Téléphone</p>
                        <div className="mt-3 flex items-center gap-3">
                          <div className="rounded-xl bg-primary/10 p-2 text-primary">
                            <Phone className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {selectedContact.phone || 'Aucun numéro enregistré'}
                            </p>
                            <p className="text-xs text-muted-foreground">Synchronisé depuis le carnet d’adresses</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[24px] border border-border/70 bg-background/50 p-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Actions rapides</p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Link
                          href={`/index.php?_task=mail&_action=compose&_to=${encodeURIComponent(selectedContact.email)}`}
                          className="inline-flex h-11 items-center justify-center rounded-2xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_rgba(0,217,165,0.18)] transition-transform hover:-translate-y-0.5"
                        >
                          Composer avec ce contact
                        </Link>
                        <Link
                          href="/mail"
                          className="inline-flex h-11 items-center justify-center rounded-2xl border border-border bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary"
                        >
                          Retour à la messagerie
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full min-h-[520px] items-center justify-center rounded-[24px] border border-dashed border-border/70 bg-background/40">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Users className="h-7 w-7" />
                      </div>
                      <p className="text-sm font-medium text-foreground">Sélectionner un contact</p>
                      <p className="mt-2 text-xs leading-6 text-muted-foreground">
                        Choisissez une fiche dans la colonne de gauche pour afficher ses détails.
                      </p>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </ProtectedMailShell>
  )
}
