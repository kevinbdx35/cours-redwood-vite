import { useState } from 'react'

import Button from '@atlaskit/button'
import SectionMessage from '@atlaskit/section-message'

interface CodeEditorProps {
  initialCode: string
  expectedOutput: string
  lesson: string
  onValidate?: (isCorrect: boolean) => void
}

const CodeEditor = ({
  initialCode,
  expectedOutput,
  lesson,
  onValidate,
}: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [hasRun, setHasRun] = useState(false)
  const [validationError, setValidationError] = useState('')

  const MAX_CODE_LENGTH = 5000

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length > MAX_CODE_LENGTH) {
      setValidationError(
        `Le code ne peut pas dépasser ${MAX_CODE_LENGTH} caractères.`
      )
      return
    }
    setValidationError('')
    setCode(value)
  }

  const runCode = async () => {
    if (!code.trim()) {
      setValidationError('Le code ne peut pas être vide.')
      return
    }
    setValidationError('')
    setIsRunning(true)

    // Simulation d'exécution de code
    setTimeout(() => {
      // Logique avancée pour vérifier le code selon la leçon
      let simulatedOutput = ''
      let isCodeValid = false

      switch (lesson) {
        case 'intro':
          if (
            code.includes('Welcome to RedwoodJS!') &&
            code.includes('className="welcome-container"')
          ) {
            simulatedOutput = 'Welcome to RedwoodJS!'
            isCodeValid = true
          } else if (code.includes('Hello RedwoodJS')) {
            simulatedOutput = 'Hello RedwoodJS'
            isCodeValid = false // Ancienne version, ne pas accepter
          } else {
            simulatedOutput =
              'Erreur: Vous devez afficher "Welcome to RedwoodJS!" avec une div ayant la classe "welcome-container"'
          }
          break

        case 'setup':
          if (
            code.includes('Environment: {environment}') &&
            code.includes('Application: {appName}')
          ) {
            simulatedOutput = 'Environment: development'
            isCodeValid = true
          } else {
            simulatedOutput =
              "Erreur: Vous devez afficher l'environnement et le nom de l'application"
          }
          break

        case 'components':
          if (
            code.includes('Product: {product.name}') &&
            code.includes('useState') &&
            code.includes('isFavorite') &&
            code.includes('onAddToCart(product.id)')
          ) {
            simulatedOutput = 'Product: Sample Product'
            isCodeValid = true
          } else {
            simulatedOutput =
              'Erreur: Le composant doit afficher le nom du produit, gérer les favoris et le panier'
          }
          break

        case 'routing':
          if (
            code.includes('Category: {currentCategory.name}') &&
            code.includes('useParams') &&
            code.includes('routes.home()')
          ) {
            simulatedOutput = 'Category: Technology'
            isCodeValid = true
          } else {
            simulatedOutput =
              'Erreur: Le composant doit utiliser useParams et afficher la catégorie actuelle'
          }
          break

        // Défis pratiques
        case 'counter-component':
          if (
            code.includes('useState') &&
            code.includes('Count: {count}') &&
            code.includes('increment') &&
            code.includes('decrement')
          ) {
            simulatedOutput = 'Count: 0'
            isCodeValid = true
          } else {
            simulatedOutput =
              'Erreur: Le composant doit utiliser useState et afficher le compteur avec les boutons'
          }
          break

        case 'user-card-list':
          if (
            code.includes('filter') &&
            code.includes('sort') &&
            code.includes('Users: {filteredAndSortedUsers.length}')
          ) {
            simulatedOutput = 'Users: 3'
            isCodeValid = true
          } else {
            simulatedOutput =
              'Erreur: Vous devez implémenter le filtrage et le tri des utilisateurs'
          }
          break

        case 'custom-hook-api':
          if (
            code.includes('useApi') &&
            code.includes('useState') &&
            code.includes('useEffect') &&
            code.includes('Loading: {loading.toString()}')
          ) {
            simulatedOutput = 'Loading: false'
            isCodeValid = true
          } else {
            simulatedOutput =
              'Erreur: Le hook useApi doit gérer loading, data et error avec useState et useEffect'
          }
          break

        case 'redwood-route-guard':
          if (
            code.includes('useAuth') &&
            code.includes('isAuthenticated') &&
            code.includes('hasRole') &&
            code.includes('Protected: true')
          ) {
            simulatedOutput = 'Protected: true'
            isCodeValid = true
          } else {
            simulatedOutput =
              "Erreur: Le composant doit utiliser useAuth pour vérifier l'authentification et les rôles"
          }
          break

        default:
          // Fallback pour les anciennes leçons
          if (code.includes('Hello RedwoodJS')) {
            simulatedOutput = 'Hello RedwoodJS'
            isCodeValid = true
          } else if (code.includes('Hello, John!')) {
            simulatedOutput = 'Hello, John!'
            isCodeValid = true
          } else {
            simulatedOutput = 'Erreur: Code non reconnu pour cette leçon'
          }
      }

      setOutput(simulatedOutput)
      const correct = isCodeValid && simulatedOutput === expectedOutput
      setIsCorrect(correct)
      setHasRun(true)
      setIsRunning(false)

      if (onValidate) {
        onValidate(correct)
      }
    }, 1500)
  }

  const resetCode = () => {
    setCode(initialCode)
    setOutput('')
    setHasRun(false)
    setIsCorrect(false)
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="bg-gray-800 p-4 text-white">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Éditeur de Code</h3>
          <div className="flex space-x-2">
            <Button
              appearance="primary"
              onClick={runCode}
              isLoading={isRunning}
              isDisabled={isRunning}
            >
              {isRunning ? 'Exécution...' : 'Exécuter'}
            </Button>
            <Button appearance="subtle" onClick={resetCode}>
              Reset
            </Button>
          </div>
        </div>

        <textarea
          value={code}
          onChange={handleCodeChange}
          className="h-64 w-full resize-none rounded border-0 bg-gray-900 p-4 font-mono text-sm text-green-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Écrivez votre code ici..."
          spellCheck={false}
          aria-label="Éditeur de code"
        />
        <div className="flex items-center justify-between px-4 pb-2">
          <span
            className={`text-xs ${code.length > MAX_CODE_LENGTH * 0.9 ? 'text-red-400' : 'text-gray-500'}`}
          >
            {code.length}/{MAX_CODE_LENGTH}
          </span>
          {validationError && (
            <span className="text-xs text-red-400">{validationError}</span>
          )}
        </div>
      </div>

      {hasRun && (
        <div className="bg-gray-100 p-4">
          <h4 className="mb-2 font-semibold">Sortie:</h4>
          <div className="rounded bg-black p-3 font-mono text-sm text-green-400">
            {output || 'Aucune sortie'}
          </div>

          <div className="mt-4">
            {isCorrect ? (
              <SectionMessage appearance="success" title="Excellent !">
                Votre code fonctionne parfaitement ! Vous pouvez passer à
                l&apos;exercice suivant.
              </SectionMessage>
            ) : (
              <SectionMessage appearance="error" title="Pas tout à fait...">
                Votre code ne produit pas la sortie attendue. Attendu: &quot;
                {expectedOutput}&quot;
              </SectionMessage>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CodeEditor
