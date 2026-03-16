'use client'

import Link from 'next/link'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface Signature {
  id: string
  name: string
  content: string
  isDefault: boolean
}

const SIGNATURES: Signature[] = [
  { id: '1', name: 'Professionnelle', content: 'Cordialement,\nJohn Doe\nByunivert Mail\njohn@byunivert.com', isDefault: true },
  { id: '2', name: 'Informelle', content: 'À bientôt,\nJD', isDefault: false },
]

export default function SignaturesPage() {
  const [signatures, setSignatures] = useState<Signature[]>(SIGNATURES)
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div className="flex-1 flex flex-col bg-[#0a0a0a] p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/mail" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-400" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Signatures</h1>
      </div>

      {/* Add Signature Button */}
      <button className="mb-6 h-10 px-4 bg-[#00d9a5] text-black rounded-lg font-medium hover:bg-[#00d9a5]/90 transition-colors flex items-center gap-2 w-fit">
        <Plus className="w-4 h-4" />
        Nouvelle signature
      </button>

      {/* Signatures List */}
      <div className="flex-1 bg-[#0a0a0a] rounded-xl border border-white/[0.08] overflow-hidden flex flex-col">
        <div className="divide-y divide-white/[0.08]">
          {signatures.map((signature) => (
            <div key={signature.id} className="px-6 py-4 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-white">{signature.name}</h3>
                  {signature.isDefault && <span className="text-xs text-[#00d9a5] mt-1">Par défaut</span>}
                </div>
                <button className="p-2 text-gray-600 hover:text-red-500 hover:bg-white/5 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-600 whitespace-pre-wrap mb-3">{signature.content}</p>
              {!signature.isDefault && (
                <button className="text-xs text-[#00d9a5] hover:text-[#00d9a5]/80 transition-colors">
                  Définir par défaut
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
