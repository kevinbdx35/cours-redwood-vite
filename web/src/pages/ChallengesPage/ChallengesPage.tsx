import { useState } from 'react'

import Button from '@atlaskit/button'

import { MetaTags } from '@redwoodjs/web'

import CodeEditor from 'src/components/CodeEditor/CodeEditor'
import SimpleLayout from 'src/layouts/SimpleLayout/SimpleLayout'

// Composant Badge simple pour remplacer @atlaskit/badge
const Badge = ({
  appearance,
  children,
}: {
  appearance?: string
  children: React.ReactNode
}) => {
  const getColorClasses = (appearance?: string) => {
    switch (appearance) {
      case 'green':
        return 'bg-green-100 text-green-800'
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800'
      case 'red':
        return 'bg-red-100 text-red-800'
      case 'primary':
        return 'bg-blue-100 text-blue-800'
      case 'success':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${getColorClasses(appearance)}`}
    >
      {children}
    </span>
  )
}

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'Facile' | 'Moyen' | 'Difficile'
  points: number
  category: 'React' | 'RedwoodJS' | 'TypeScript' | 'Hooks'
  initialCode: string
  expectedOutput: string
  hints: string[]
  solution: string
}

const ChallengesPage = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  )
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([])
  const [showHints, setShowHints] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(0)

  const challenges: Challenge[] = [
    {
      id: 'counter-component',
      title: 'Composant Compteur Avancé',
      description:
        'Créez un composant compteur avec incrémentation, décrémentation et reset. Incluez des validations pour empêcher les valeurs négatives.',
      difficulty: 'Facile',
      points: 10,
      category: 'React',
      initialCode: `const Counter = () => {
  // Ajoutez votre logique ici
  
  return (
    <div className="counter">
      {/* Affichage du compteur */}
      {/* Boutons d'action */}
    </div>
  )
}

export default Counter`,
      expectedOutput: 'Count: 0',
      hints: [
        'Utilisez useState pour gérer la valeur du compteur',
        'Créez des fonctions pour increment, decrement et reset',
        'Ajoutez une condition pour empêcher les valeurs négatives',
      ],
      solution: `const Counter = () => {
  const [count, setCount] = useState(0)
  
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count > 0 ? count - 1 : 0)
  const reset = () => setCount(0)
  
  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default Counter`,
    },
    {
      id: 'user-card-list',
      title: 'Liste de Cartes Utilisateur',
      description:
        "Créez un composant qui affiche une liste d'utilisateurs avec filtrage par nom et tri par âge.",
      difficulty: 'Moyen',
      points: 20,
      category: 'React',
      initialCode: `const UserCardList = () => {
  const users = [
    { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
    { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
    { id: 3, name: 'Charlie', age: 22, email: 'charlie@example.com' }
  ]
  
  // Ajoutez votre logique de filtrage et tri ici
  
  return (
    <div className="user-list">
      {/* Barre de recherche */}
      {/* Bouton de tri */}
      {/* Liste des utilisateurs */}
    </div>
  )
}

export default UserCardList`,
      expectedOutput: 'Users: 3',
      hints: [
        "Utilisez useState pour le terme de recherche et l'ordre de tri",
        'Filtrez les utilisateurs avec filter() sur le nom',
        'Triez avec sort() en comparant les âges',
        'Combinez filter et sort dans la bonne ordre',
      ],
      solution: `const UserCardList = () => {
  const users = [
    { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
    { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
    { id: 3, name: 'Charlie', age: 22, email: 'charlie@example.com' }
  ]
  
  const [searchTerm, setSearchTerm] = useState('')
  const [sortByAge, setSortByAge] = useState(false)
  
  const filteredAndSortedUsers = users
    .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortByAge ? a.age - b.age : 0)
  
  return (
    <div className="user-list">
      <input 
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setSortByAge(!sortByAge)}>
        Sort by Age
      </button>
      <p>Users: {filteredAndSortedUsers.length}</p>
      {filteredAndSortedUsers.map(user => (
        <div key={user.id} className="user-card">
          <h3>{user.name}</h3>
          <p>Age: {user.age}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  )
}`,
    },
    {
      id: 'custom-hook-api',
      title: 'Hook Personnalisé pour API',
      description:
        'Créez un hook personnalisé useApi qui gère les états de chargement, données et erreurs pour les appels API.',
      difficulty: 'Difficile',
      points: 30,
      category: 'Hooks',
      initialCode: `// Créez le hook useApi
const useApi = (url) => {
  // Votre logique ici
}

// Utilisez le hook dans ce composant
const ApiDataComponent = () => {
  // Utilisez useApi ici
  
  return (
    <div>
      {/* Affichez loading, error ou data */}
    </div>
  )
}

export default ApiDataComponent`,
      expectedOutput: 'Loading: false',
      hints: [
        'Utilisez useState pour loading, data et error',
        "Utilisez useEffect pour faire l'appel API",
        "Gérez les cas de succès et d'erreur",
        'Retournez un objet avec les trois états',
      ],
      solution: `const useApi = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url)
        if (!response.ok) throw new Error('Failed to fetch')
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [url])
  
  return { data, loading, error }
}

const ApiDataComponent = () => {
  const { data, loading, error } = useApi('/api/users')
  
  return (
    <div>
      <p>Loading: {loading.toString()}</p>
      {error && <p>Error: {error}</p>}
      {data && <p>Data loaded successfully</p>}
    </div>
  )
}`,
    },
    {
      id: 'redwood-route-guard',
      title: 'Route Guard RedwoodJS',
      description:
        'Créez un composant de protection de routes qui redirige les utilisateurs non authentifiés.',
      difficulty: 'Difficile',
      points: 35,
      category: 'RedwoodJS',
      initialCode: `import { useAuth } from '@redwoodjs/auth'
import { Redirect, routes } from '@redwoodjs/router'

const ProtectedRoute = ({ children, requiredRole }) => {
  // Votre logique de protection ici
  
  return (
    <div>
      {/* Logique conditionnelle pour afficher children ou rediriger */}
    </div>
  )
}

// Composant d'utilisation
const ProtectedPage = () => {
  return (
    <ProtectedRoute requiredRole="admin">
      <h1>Page protégée</h1>
    </ProtectedRoute>
  )
}

export default ProtectedPage`,
      expectedOutput: 'Protected: true',
      hints: [
        'Utilisez useAuth pour obtenir isAuthenticated et hasRole',
        "Vérifiez d'abord si l'utilisateur est authentifié",
        "Ensuite vérifiez s'il a le rôle requis",
        'Retournez children si toutes les conditions sont remplies',
      ],
      solution: `import { useAuth } from '@redwoodjs/auth'
import { Redirect, routes } from '@redwoodjs/router'

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, hasRole, loading } = useAuth()
  
  if (loading) return <div>Loading...</div>
  
  if (!isAuthenticated) {
    return <Redirect to={routes.login()} />
  }
  
  if (requiredRole && !hasRole(requiredRole)) {
    return <Redirect to={routes.unauthorized()} />
  }
  
  return <>{children}</>
}

const ProtectedPage = () => {
  return (
    <ProtectedRoute requiredRole="admin">
      <h1>Protected: true</h1>
      <p>Page protégée accessible uniquement aux admins</p>
    </ProtectedRoute>
  )
}

export default ProtectedPage`,
    },
  ]

  const handleChallengeComplete = (challengeId: string) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges([...completedChallenges, challengeId])
    }
  }

  const showNextHint = () => {
    if (
      selectedChallenge &&
      currentHintIndex < selectedChallenge.hints.length - 1
    ) {
      setCurrentHintIndex(currentHintIndex + 1)
    }
  }

  const totalPoints = completedChallenges.reduce((sum, challengeId) => {
    const challenge = challenges.find((c) => c.id === challengeId)
    return sum + (challenge?.points || 0)
  }, 0)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile':
        return 'green'
      case 'Moyen':
        return 'yellow'
      case 'Difficile':
        return 'red'
      default:
        return 'neutral'
    }
  }

  if (selectedChallenge) {
    return (
      <>
        <MetaTags
          title={`Défi: ${selectedChallenge.title} - Cours RedwoodJS`}
          description={selectedChallenge.description}
        />

        <SimpleLayout title={selectedChallenge.title}>
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <Button
                appearance="subtle"
                onClick={() => {
                  setSelectedChallenge(null)
                  setShowHints(false)
                  setCurrentHintIndex(0)
                }}
              >
                ← Retour aux défis
              </Button>

              <div className="flex items-center space-x-2">
                <Badge
                  appearance={getDifficultyColor(selectedChallenge.difficulty)}
                >
                  {selectedChallenge.difficulty}
                </Badge>
                <Badge appearance="primary">
                  {selectedChallenge.points} points
                </Badge>
                <Badge>{selectedChallenge.category}</Badge>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 p-6">
              <h3 className="mb-3 text-lg font-semibold">
                Description du défi
              </h3>
              <p className="text-gray-700">{selectedChallenge.description}</p>
            </div>

            <CodeEditor
              initialCode={selectedChallenge.initialCode}
              expectedOutput={selectedChallenge.expectedOutput}
              lesson={selectedChallenge.id}
              onValidate={(isCorrect) => {
                if (isCorrect) {
                  handleChallengeComplete(selectedChallenge.id)
                }
              }}
            />

            <div className="flex items-center justify-between">
              <div className="space-x-2">
                <Button
                  appearance="subtle"
                  onClick={() => setShowHints(!showHints)}
                >
                  {showHints ? 'Masquer' : 'Afficher'} les indices
                </Button>

                {showHints &&
                  currentHintIndex < selectedChallenge.hints.length - 1 && (
                    <Button appearance="subtle" onClick={showNextHint}>
                      Indice suivant
                    </Button>
                  )}
              </div>

              {completedChallenges.includes(selectedChallenge.id) && (
                <Badge appearance="success">✓ Défi complété!</Badge>
              )}
            </div>

            {showHints && (
              <div className="rounded-lg bg-yellow-50 p-4">
                <h4 className="mb-2 font-semibold">
                  💡 Indice {currentHintIndex + 1}/
                  {selectedChallenge.hints.length}
                </h4>
                <p className="text-gray-700">
                  {selectedChallenge.hints[currentHintIndex]}
                </p>
              </div>
            )}
          </div>
        </SimpleLayout>
      </>
    )
  }

  return (
    <>
      <MetaTags
        title="Défis Pratiques - Cours RedwoodJS"
        description="Testez vos compétences avec des défis pratiques RedwoodJS et React"
      />

      <SimpleLayout title="🏆 Défis Pratiques">
        <div className="space-y-8">
          {/* Statistiques */}
          <div className="rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {completedChallenges.length}
                </div>
                <div className="text-sm text-gray-600">Défis complétés</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {totalPoints}
                </div>
                <div className="text-sm text-gray-600">Points gagnés</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(
                    (completedChallenges.length / challenges.length) * 100
                  )}
                  %
                </div>
                <div className="text-sm text-gray-600">Progression</div>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">
              🎯 Mettez vos compétences à l&apos;épreuve
            </h2>
            <p className="mb-4 text-gray-700">
              Ces défis pratiques vous permettent d&apos;appliquer vos
              connaissances RedwoodJS et React dans des situations réelles.
              Chaque défi est conçu pour renforcer des concepts spécifiques et
              vous faire progresser vers une maîtrise complète du framework.
            </p>
            <div className="grid gap-4 text-sm md:grid-cols-3">
              <div className="flex items-center space-x-2">
                <Badge appearance="green">Facile</Badge>
                <span>Concepts de base</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge appearance="yellow">Moyen</Badge>
                <span>Logique intermédiaire</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge appearance="red">Difficile</Badge>
                <span>Patterns avancés</span>
              </div>
            </div>
          </div>

          {/* Liste des défis */}
          <div className="grid gap-6">
            {challenges.map((challenge) => {
              const isCompleted = completedChallenges.includes(challenge.id)

              return (
                <div
                  key={challenge.id}
                  role="button"
                  tabIndex={0}
                  className={`cursor-pointer rounded-lg border-2 p-6 transition-all hover:shadow-md ${
                    isCompleted
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedChallenge(challenge)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedChallenge(challenge)
                    }
                  }}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="text-lg font-semibold">
                      {isCompleted && '✓ '}
                      {challenge.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Badge
                        appearance={getDifficultyColor(challenge.difficulty)}
                      >
                        {challenge.difficulty}
                      </Badge>
                      <Badge appearance="primary">{challenge.points} pts</Badge>
                      <Badge>{challenge.category}</Badge>
                    </div>
                  </div>

                  <p className="mb-4 text-gray-700">{challenge.description}</p>

                  <Button appearance={isCompleted ? 'subtle' : 'primary'}>
                    {isCompleted ? 'Revoir le défi' : 'Commencer le défi'}
                  </Button>
                </div>
              )
            })}
          </div>

          {/* Conseils */}
          <div className="rounded-lg bg-gray-50 p-6">
            <h3 className="mb-4 text-lg font-semibold">
              💡 Conseils pour réussir
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Lisez attentivement la description avant de commencer</li>
              <li>• Utilisez les indices si vous êtes bloqué</li>
              <li>
                • N&apos;hésitez pas à consulter la documentation RedwoodJS
              </li>
              <li>• Testez votre code étape par étape</li>
              <li>
                • Les défis sont conçus pour être progressifs - commencez par
                les plus faciles
              </li>
            </ul>
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export default ChallengesPage
