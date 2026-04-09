import { MetaTags } from '@redwoodjs/web'

import SimpleLayout from 'src/layouts/SimpleLayout/SimpleLayout'

const TestPage = () => {
  return (
    <>
      <MetaTags title="Test - Cours RedwoodJS" description="Page de test" />

      <SimpleLayout title="Test de fonctionnement">
        <div className="space-y-6">
          <div className="rounded-lg border border-green-200 bg-green-50 p-6">
            <h2 className="mb-3 text-xl font-semibold text-green-800">
              ✅ Application fonctionnelle !
            </h2>
            <p className="text-green-700">
              RedwoodJS et Vite fonctionnent correctement. Cette page de test
              confirme que l&apos;environnement de base est opérationnel.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <h3 className="mb-2 font-semibold text-blue-800">
                🏗️ Technologies
              </h3>
              <ul className="space-y-1 text-blue-700">
                <li>• RedwoodJS 8.8.0</li>
                <li>• Vite (intégré)</li>
                <li>• React 18</li>
                <li>• TypeScript</li>
                <li>• TailwindCSS</li>
              </ul>
            </div>

            <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
              <h3 className="mb-2 font-semibold text-purple-800">
                🎯 Prochaines étapes
              </h3>
              <ul className="space-y-1 text-purple-700">
                <li>• Corriger les imports Atlassian</li>
                <li>• Tester les composants interactifs</li>
                <li>• Finaliser l&apos;interface utilisateur</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-2 font-semibold text-gray-800">
              🔧 Statut du développement
            </h3>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-gray-700">
                Serveur de développement actif
              </span>
            </div>
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export default TestPage
