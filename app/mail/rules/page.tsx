'use client'

import Link from 'next/link'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface Rule {
  id: string
  name: string
  condition: string
  action: string
  enabled: boolean
}

const RULES: Rule[] = [
  { id: '1', name: 'Spam automatique', condition: 'Provenance: unknown', action: 'Déplacer vers Spam', enabled: true },
  { id: '2', name: 'Newsletter', condition: 'Contient: newsletter', action: 'Ajouter étiquette: Newsletter', enabled: true },
  { id: '3', name: 'Factures', condition: 'Objet: facture', action: 'Ajouter étiquette: Factures', enabled: false },
]

export default function RulesPage() {
  const [rules, setRules] = useState<Rule[]>(RULES)

  return (
    <div className="flex-1 flex flex-col bg-[#0a0a0a] p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/mail" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-400" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Règles</h1>
      </div>

      {/* Add Rule Button */}
      <button className="mb-6 h-10 px-4 bg-[#00d9a5] text-black rounded-lg font-medium hover:bg-[#00d9a5]/90 transition-colors flex items-center gap-2 w-fit">
        <Plus className="w-4 h-4" />
        Nouvelle règle
      </button>

      {/* Rules List */}
      <div className="flex-1 bg-[#0a0a0a] rounded-xl border border-white/[0.08] overflow-hidden flex flex-col">
        <div className="divide-y divide-white/[0.08]">
          {rules.map((rule) => (
            <div key={rule.id} className="px-6 py-4 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-white">{rule.name}</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={rule.enabled} className="sr-only peer" />
                  <div className="w-9 h-5 bg-white/10 peer-checked:bg-[#00d9a5] rounded-full peer-checked:shadow-md peer-checked:shadow-[#00d9a5]/30 transition-all" />
                  <span className="ml-2 text-xs text-gray-600">{rule.enabled ? 'Actif' : 'Inactif'}</span>
                </label>
              </div>
              <p className="text-xs text-gray-600 mb-1">Condition: {rule.condition}</p>
              <p className="text-xs text-gray-600 mb-3">Action: {rule.action}</p>
              <button className="text-xs text-red-500 hover:text-red-400 transition-colors">Supprimer</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
