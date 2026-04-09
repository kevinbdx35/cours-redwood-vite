import { ReactNode } from 'react'

import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs'
import Button from '@atlaskit/button'

import { Link } from '@redwoodjs/router'

interface CourseLayoutProps {
  children: ReactNode
  title?: string
  currentStep?: number
  totalSteps?: number
  breadcrumbs?: Array<{ label: string; href?: string }>
}

const CourseLayout = ({
  children,
  title = 'Cours RedwoodJS & Vite',
  currentStep = 1,
  totalSteps = 7,
  breadcrumbs = [],
}: CourseLayoutProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                🌲⚡️ RedwoodJS Course
              </Link>
              {breadcrumbs.length > 0 && (
                <Breadcrumbs>
                  {breadcrumbs.map((crumb, index) => (
                    <BreadcrumbsItem
                      key={index}
                      href={crumb.href}
                      text={crumb.label}
                    />
                  ))}
                </Breadcrumbs>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Étape {currentStep} sur {totalSteps}
              </span>
              <div className="w-32">
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          {title && (
            <h1 className="mb-6 text-3xl font-bold text-gray-900">{title}</h1>
          )}
          {children}
        </div>
      </main>

      <footer className="mt-16 border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              © 2024 Cours RedwoodJS & Vite - Apprentissage interactif
            </p>
            <div className="flex space-x-4">
              <Button appearance="subtle">Aide</Button>
              <Button appearance="subtle">Ressources</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CourseLayout
