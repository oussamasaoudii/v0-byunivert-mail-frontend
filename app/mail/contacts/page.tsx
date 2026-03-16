'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Search, Mail, Phone, MapPin } from 'lucide-react'

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  initials: string
}

const CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Rishak',
    email: 'rishak09@gmail.com',
    phone: '+1 (555) 123-4567',
    initials: 'R'
  },
  {
    id: '2',
    name: 'Sarah Ahmed',
    email: 'sarah.ahmed@company.com',
    phone: '+1 (555) 234-5678',
    initials: 'SA'
  },
  {
    id: '3',
    name: 'Mohamed Hassan',
    email: 'm.hassan@company.com',
    phone: '+1 (555) 345-6789',
    initials: 'MH'
  },
  {
    id: '4',
    name: 'Fatima Al-Rashid',
    email: 'fatima.rashid@company.com',
    phone: '+1 (555) 456-7890',
    initials: 'FR'
  },
  {
    id: '5',
    name: 'Omar Ibrahim',
    email: 'omar.ibrahim@company.com',
    phone: '+1 (555) 567-8901',
    initials: 'OI'
  },
]

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  const filteredContacts = CONTACTS.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] overflow-hidden">
      {/* Contacts List - Left panel */}
      <div className="w-[360px] flex flex-col border-r border-white/[0.08]">
        {/* Header */}
        <div className="h-[68px] px-6 flex items-center justify-between border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <Link href="/mail" className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-400 hover:text-gray-200" />
            </Link>
            <h1 className="text-[20px] font-bold text-white">Contacts</h1>
          </div>
          <button className="p-2 text-gray-600 hover:text-gray-400 hover:bg-white/5 rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700" />
            <input
              type="text"
              placeholder="Rechercher contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-white/[0.03] rounded-lg border border-white/[0.08] text-[13px] text-white placeholder:text-gray-700 focus:outline-none focus:border-[#00d9a5]/50 focus:bg-white/[0.05] transition-colors"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`w-full p-3 rounded-lg text-left transition-all ${
                selectedContact?.id === contact.id
                  ? 'bg-[#0d1f1c] border-2 border-[#00d9a5]'
                  : 'hover:bg-white/5 border-2 border-transparent'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d9a5] to-[#008f70] flex items-center justify-center text-[12px] font-bold text-black flex-shrink-0 shadow-md shadow-[#00d9a5]/20">
                  {contact.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-white truncate">{contact.name}</p>
                  <p className="text-[12px] text-gray-600 truncate">{contact.email}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Details - Right panel */}
      <div className="flex-1 bg-[#0a0a0a] p-4 overflow-hidden">
        {selectedContact ? (
          <div className="h-full bg-[#0a0a0a] rounded-xl border border-white/[0.06] p-6 flex flex-col overflow-y-auto">
            {/* Avatar and name */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00d9a5] to-[#008f70] flex items-center justify-center text-[28px] font-bold text-black shadow-lg shadow-[#00d9a5]/20 flex-shrink-0">
                {selectedContact.initials}
              </div>
              <div className="flex-1">
                <h2 className="text-[20px] font-bold text-white mb-1">{selectedContact.name}</h2>
                <p className="text-[14px] text-[#00d9a5] font-medium">{selectedContact.email}</p>
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-4 mb-8">
              {selectedContact.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-[12px] text-gray-600 mb-0.5">Email</p>
                    <a href={`mailto:${selectedContact.email}`} className="text-[13px] text-white hover:text-[#00d9a5] transition-colors">
                      {selectedContact.email}
                    </a>
                  </div>
                </div>
              )}
              {selectedContact.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-[12px] text-gray-600 mb-0.5">Téléphone</p>
                    <a href={`tel:${selectedContact.phone}`} className="text-[13px] text-white hover:text-[#00d9a5] transition-colors">
                      {selectedContact.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-auto pt-6 border-t border-white/[0.08]">
              <Link href={`/mail?search=${selectedContact.email}`} className="flex-1">
                <button className="w-full h-9 bg-[#00d9a5] text-black rounded-lg text-[13px] font-semibold hover:bg-[#00d9a5]/90 transition-colors">
                  Envoyer un email
                </button>
              </Link>
              <button className="flex-1 h-9 bg-white/5 text-white rounded-lg text-[13px] font-semibold hover:bg-white/10 transition-colors border border-white/[0.08]">
                Éditer
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <div className="w-16 h-16 rounded-full bg-[#00d9a5]/8 flex items-center justify-center mx-auto mb-4 border border-[#00d9a5]/20">
                <Mail className="w-8 h-8 text-[#00d9a5]/60" />
              </div>
              <p className="text-gray-600 text-[13px] font-medium">Sélectionner un contact</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
