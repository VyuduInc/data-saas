import Link from 'next/link'
import { useState } from 'react'
import Settings from './Settings'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

export function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-indigo-600">
                DataViz
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Cog6ToothIcon className="h-5 w-5 text-gray-500" />
            </button>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </header>
  )
}