'use client'

import Link from 'next/link'
import { ArrowLeft, Bell, Shield, Eye, Lock } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    twoFactor: false,
    darkMode: true,
    privateMessages: false,
  })

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="flex-1 flex flex-col bg-[#0a0a0a] p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/mail" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-400" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Paramètres</h1>
      </div>

      {/* Settings */}
      <div className="flex-1 bg-[#0a0a0a] rounded-xl border border-white/[0.08] overflow-hidden flex flex-col">
        <div className="divide-y divide-white/[0.08]">
          {/* Notifications */}
          <div className="px-6 py-4 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                  <p className="text-xs text-gray-600 mt-1">Recevoir des notifications pour les nouveaux messages</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.notifications} onChange={() => toggleSetting('notifications')} className="sr-only peer" />
                <div className="w-9 h-5 bg-white/10 peer-checked:bg-[#00d9a5] rounded-full peer-checked:shadow-md peer-checked:shadow-[#00d9a5]/30 transition-all" />
              </label>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="px-6 py-4 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <h3 className="text-sm font-semibold text-white">Authentification 2FA</h3>
                  <p className="text-xs text-gray-600 mt-1">Ajouter une couche de sécurité supplémentaire</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.twoFactor} onChange={() => toggleSetting('twoFactor')} className="sr-only peer" />
                <div className="w-9 h-5 bg-white/10 peer-checked:bg-[#00d9a5] rounded-full peer-checked:shadow-md peer-checked:shadow-[#00d9a5]/30 transition-all" />
              </label>
            </div>
          </div>

          {/* Theme */}
          <div className="px-6 py-4 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <h3 className="text-sm font-semibold text-white">Mode sombre</h3>
                  <p className="text-xs text-gray-600 mt-1">Utiliser le mode sombre par défaut</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.darkMode} onChange={() => toggleSetting('darkMode')} className="sr-only peer" />
                <div className="w-9 h-5 bg-white/10 peer-checked:bg-[#00d9a5] rounded-full peer-checked:shadow-md peer-checked:shadow-[#00d9a5]/30 transition-all" />
              </label>
            </div>
          </div>

          {/* Private Messages */}
          <div className="px-6 py-4 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <h3 className="text-sm font-semibold text-white">Messages privés</h3>
                  <p className="text-xs text-gray-600 mt-1">Chiffrer les messages sensibles</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.privateMessages} onChange={() => toggleSetting('privateMessages')} className="sr-only peer" />
                <div className="w-9 h-5 bg-white/10 peer-checked:bg-[#00d9a5] rounded-full peer-checked:shadow-md peer-checked:shadow-[#00d9a5]/30 transition-all" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
