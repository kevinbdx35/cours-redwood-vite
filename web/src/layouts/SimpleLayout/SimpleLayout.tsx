import { ReactNode } from 'react'

import { Link } from '@redwoodjs/router'

interface SimpleLayoutProps {
  children: ReactNode
  title?: string
}

const SimpleLayout = ({
  children,
  title = 'Cours RedwoodJS & Vite',
}: SimpleLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            🌲⚡️ RedwoodJS Course
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          {title && (
            <h1 className="mb-6 text-3xl font-bold text-gray-900">{title}</h1>
          )}
          {children}
        </div>
      </main>
    </div>
  )
}

export default SimpleLayout
