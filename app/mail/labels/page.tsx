'use client'

import Link from 'next/link'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface Label {
  id: string
  name: string
  color: string
  count: number
}

const LABELS: Label[] = [
  { id: '1', name: 'Travail', color: '#00d9a5', count: 12 },
  { id: '2', name: 'Personnel', color: '#8b5cf6', count: 8 },
  { id: '3', name: 'Urgent', color: '#ef4444', count: 5 },
  { id: '4', name: 'Factures', color: '#f59e0b', count: 3 },
  { id: '5', name: 'Suivi', color: '#3b82f6', count: 7 },
]

export default function LabelsPage() {
  const [labels, setLabels] = useState<Label[]>(LABELS)
  const [newLabelName, setNewLabelName] = useState('')

  const handleAddLabel = () => {
    if (newLabelName.trim()) {
      const newLabel: Label = {
        id: Date.now().toString(),
        name: newLabelName,
        color: '#00d9a5',
        count: 0,
      }
      setLabels([...labels, newLabel])
      setNewLabelName('')
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-[#0a0a0a] p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/mail" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-400" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Étiquettes</h1>
      </div>

      {/* Add Label Card */}
      <div className="mb-6 bg-[#0a0a0a] rounded-xl border border-white/[0.08] p-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nouvelle étiquette..."
            value={newLabelName}
            onChange={(e) => setNewLabelName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddLabel()}
            className="flex-1 h-10 px-4 bg-white/[0.03] rounded-lg border border-white/[0.08] text-sm text-white placeholder:text-gray-700 focus:outline-none focus:border-[#00d9a5]/50"
          />
          <button
            onClick={handleAddLabel}
            className="h-10 px-4 bg-[#00d9a5] text-black rounded-lg font-medium hover:bg-[#00d9a5]/90 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </button>
        </div>
      </div>

      {/* Labels List */}
      <div className="flex-1 bg-[#0a0a0a] rounded-xl border border-white/[0.08] overflow-hidden flex flex-col">
        <div className="divide-y divide-white/[0.08]">
          {labels.map((label) => (
            <div key={label.id} className="px-6 py-4 hover:bg-white/[0.02] transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: label.color }} />
                <div>
                  <p className="text-sm font-medium text-white">{label.name}</p>
                  <p className="text-xs text-gray-600">{label.count} messages</p>
                </div>
              </div>
              <button className="p-2 text-gray-600 hover:text-red-500 hover:bg-white/5 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
