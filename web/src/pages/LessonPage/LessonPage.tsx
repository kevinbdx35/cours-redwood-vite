import { useState } from 'react'

import Button from '@atlaskit/button'
import SectionMessage from '@atlaskit/section-message'
import Tabs, { TabList, Tab, TabPanel } from '@atlaskit/tabs'

import { MetaTags } from '@redwoodjs/web'

import CodeEditor from 'src/components/CodeEditor/CodeEditor'
import QuizComponent from 'src/components/QuizComponent/QuizComponent'
import CourseLayout from 'src/layouts/CourseLayout/CourseLayout'

interface LessonPageProps {
  lessonId: string
}

const LessonPage = ({ lessonId = 'intro' }: LessonPageProps) => {
  const [currentTab, setCurrentTab] = useState(0)
  const [exerciseCompleted, setExerciseCompleted] = useState(false)
  const [quizScore, setQuizScore] = useState<number | null>(null)

  // Contenu des leçons enrichi
  const lessonContent = {
    intro: {
      title: 'Introduction à RedwoodJS',
      description:
        'Découvrez les concepts fondamentaux de RedwoodJS et son écosystème',
      theory: {
        title: "Qu'est-ce que RedwoodJS ?",
        content: `
          RedwoodJS est un framework full-stack moderne créé par Tom Preston-Werner (co-fondateur de GitHub) 
          qui combine le meilleur de React, GraphQL, et Prisma pour créer des applications web robustes et scalables.

          ## 🎯 Vision et Philosophie

          RedwoodJS vise à créer "The App Framework for Startups" en offrant :
          - Une structure d'application opiniâtre mais flexible
          - Des conventions sensées qui accélèrent le développement
          - Une expérience développeur exceptionnelle
          - Une architecture prête pour la mise à l'échelle

          ## 🏗️ Architecture Full-Stack

          ### Frontend (Web)
          - **React 18** avec hooks et Suspense
          - **TypeScript** pour la sécurité des types
          - **Vite** pour un développement ultra-rapide
          - **Storybook** pour le développement de composants
          - **Testing Library** pour les tests

          ### Backend (API)
          - **Node.js** avec architecture serverless
          - **GraphQL** avec SDL (Schema Definition Language)
          - **Prisma** comme ORM type-safe
          - **Jest** pour les tests backend
          - **Envelop** pour les plugins GraphQL

          ### Base de données
          - Support **multi-base** (PostgreSQL, MySQL, SQLite, SQL Server)
          - **Migrations** automatisées avec Prisma
          - **Seeds** pour les données de test
          - **Studio** pour l'administration graphique

          ## ⚡ Avantages du Développement

          ### Génération de Code Intelligente
          \`\`\`bash
          # Créer un modèle complet CRUD
          yarn rw generate scaffold Post
          
          # Générer des composants
          yarn rw generate component Button
          
          # Créer des services
          yarn rw generate service posts
          \`\`\`

          ### Hot Reload Instantané
          - Rechargement en <100ms avec Vite
          - Préservation de l'état des composants
          - Mise à jour automatique du schéma GraphQL

          ### CLI Puissant
          - Plus de 30 commandes intégrées
          - Déploiement en one-click
          - Intégration continue simplifiée

          ## 🛡️ Sécurité by Design

          ### Authentification Intégrée
          - Support de 15+ fournisseurs OAuth
          - dbAuth pour l'authentification locale
          - JWT et sessions sécurisées
          - Protection automatique CSRF

          ### Autorisations Granulaires
          \`\`\`javascript
          // Directives GraphQL pour les permissions
          export const posts = () => {
            return db.post.findMany({
              where: { published: true }
            })
          }
          \`\`\`

          ### Validation Robuste
          - Validation côté client et serveur
          - Sanitisation automatique des entrées
          - Protection contre les injections SQL

          ## 🚀 Déploiement Moderne

          ### Jamstack Ready
          - Génération de sites statiques
          - CDN et mise en cache optimisés
          - Performance maximale

          ### Serverless First
          - AWS Lambda, Vercel, Netlify
          - Scaling automatique
          - Coûts optimisés

          ### CI/CD Intégré
          - GitHub Actions préconfigurées
          - Tests automatisés
          - Déploiement automatique

          ## 📊 Écosystème et Outils

          ### Développement
          - **RedwoodJS CLI** : Outil en ligne de commande
          - **Storybook** : Développement de composants isolés
          - **GraphQL Playground** : Exploration de l'API
          - **Prisma Studio** : Administration de base de données

          ### Testing
          - Tests unitaires avec Jest
          - Tests d'intégration
          - Tests end-to-end avec Playwright
          - Mocking GraphQL automatique

          ### Monitoring
          - Logging structuré
          - Métriques de performance
          - Gestion d'erreurs
          - Analytics intégrées

          ## 🌟 Cas d'Usage Idéaux

          ### Startups et MVP
          - Développement rapide de prototypes
          - Itération agile
          - Time-to-market réduit

          ### Applications d'Entreprise
          - Sécurité et compliance
          - Scalabilité enterprise
          - Maintenance long terme

          ### SaaS et Plateformes
          - Multi-tenancy
          - APIs robustes
          - Intégrations tierces

          ## 🤝 Communauté et Support

          - **Forum Discourse** : community.redwoodjs.com
          - **Discord** : 4000+ développeurs actifs
          - **GitHub** : 15k+ stars, contributions actives
          - **Newsletter** : Mises à jour régulières
          - **Conférences** : RedwoodJS Conf annuelle

          ## 🔮 Roadmap et Futur

          ### Version 1.0 (Stable)
          - API stable et documentée
          - Outils de migration
          - Support long terme

          ### Fonctionnalités à Venir
          - React Server Components
          - Edge Computing
          - Real-time avec WebSockets
          - GraphQL Federation
        `,
      },
      exercise: {
        title: 'Votre premier composant RedwoodJS',
        instructions: `
          Créez un composant React qui :
          1. Affiche "Welcome to RedwoodJS!"
          2. Utilise une classe CSS "welcome-container"
          3. Inclut un sous-titre "Building the future of web development"
          
          Conseils :
          - Utilisez les éléments <h1> et <p>
          - Structurez votre JSX de manière lisible
          - N'oubliez pas les className pour le styling
        `,
        initialCode: `const WelcomeComponent = () => {
  return (
    <div className="welcome-container">
      {/* Ajoutez votre titre principal ici */}
      {/* Ajoutez votre sous-titre ici */}
    </div>
  )
}

export default WelcomeComponent`,
        expectedOutput: 'Welcome to RedwoodJS!',
        solution: `const WelcomeComponent = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to RedwoodJS!</h1>
      <p>Building the future of web development</p>
    </div>
  )
}

export default WelcomeComponent`,
      },
      quiz: [
        {
          id: '1',
          question: 'Qui est le créateur principal de RedwoodJS ?',
          options: [
            'Dan Abramov',
            'Tom Preston-Werner',
            'Ryan Dahl',
            'Evan You',
          ],
          correctAnswer: 1,
          explanation:
            'Tom Preston-Werner, co-fondateur de GitHub, est le créateur de RedwoodJS. Il a voulu créer "The App Framework for Startups".',
        },
        {
          id: '2',
          question: 'Quel est le principal avantage de RedwoodJS ?',
          options: [
            'Il est uniquement pour le frontend',
            'Il combine frontend et backend dans un seul framework opiniâtre',
            'Il ne supporte que JavaScript',
            "Il n'utilise pas de base de données",
          ],
          correctAnswer: 1,
          explanation:
            'RedwoodJS est un framework full-stack opiniâtre qui intègre React, GraphQL, et Prisma dans une architecture cohérente.',
        },
        {
          id: '3',
          question: 'Quel outil utilise RedwoodJS pour la base de données ?',
          options: ['MongoDB Driver', 'Sequelize', 'Prisma ORM', 'TypeORM'],
          correctAnswer: 2,
          explanation:
            'RedwoodJS utilise Prisma ORM pour la gestion des bases de données, offrant type-safety, migrations automatiques et support multi-DB.',
        },
        {
          id: '4',
          question: "Quelle technologie utilise RedwoodJS pour l'API ?",
          options: ['REST API', 'GraphQL avec SDL', 'gRPC', 'SOAP'],
          correctAnswer: 1,
          explanation:
            'RedwoodJS utilise GraphQL avec Schema Definition Language (SDL), permettant des requêtes efficaces et une introspection automatique.',
        },
        {
          id: '5',
          question: 'Quel bundler utilise RedwoodJS pour le développement ?',
          options: ['Webpack', 'Rollup', 'Vite', 'Parcel'],
          correctAnswer: 2,
          explanation:
            'RedwoodJS utilise Vite pour un hot reload ultra-rapide (<100ms) et une expérience de développement optimale.',
        },
        {
          id: '6',
          question:
            "Combien de fournisseurs d'authentification RedwoodJS supporte-t-il nativement ?",
          options: [
            'Seulement dbAuth local',
            '5 fournisseurs OAuth',
            '15+ fournisseurs OAuth',
            "Aucun système d'auth intégré",
          ],
          correctAnswer: 2,
          explanation:
            'RedwoodJS supporte plus de 15 fournisseurs OAuth (Google, GitHub, Auth0, etc.) plus son système dbAuth local.',
        },
      ],
    },

    setup: {
      title: "Configuration de l'environnement",
      description:
        'Installez et configurez votre environnement de développement RedwoodJS',
      theory: {
        title: "Configuration de l'environnement de développement",
        content: `
          ## 🛠️ Prérequis Système

          ### Node.js et Package Managers
          - **Node.js** : Version 20.x LTS (recommandée)
          - **Yarn** : Package manager principal (version 1.22+)
          - **npm** : Alternative acceptable (version 8+)
          
          ⚠️ **Important** : RedwoodJS nécessite Node.js >= 20.0.0 et < 21.0.0

          ### Outils de Développement Recommandés
          - **VS Code** avec extensions React/TypeScript
          - **Git** pour le contrôle de version
          - **Terminal** moderne (iTerm2, Windows Terminal, etc.)

          ## 🚀 Installation de RedwoodJS

          ### Méthode 1 : Yarn Create (Recommandée)
          \`\`\`bash
          # Créer un nouveau projet
          yarn create redwood-app mon-app
          cd mon-app
          
          # Installer les dépendances
          yarn install
          
          # Démarrer le serveur de développement
          yarn rw dev
          \`\`\`

          ### Méthode 2 : Clonage depuis un Template
          \`\`\`bash
          # Cloner le template officiel
          git clone https://github.com/redwoodjs/redwood.git mon-app
          cd mon-app
          yarn install
          \`\`\`

          ## 📁 Structure du Projet

          \`\`\`
          mon-app/
          ├── api/                  # Backend (GraphQL + Prisma)
          │   ├── db/              # Schéma et migrations Prisma
          │   │   ├── schema.prisma
          │   │   └── migrations/
          │   ├── src/
          │   │   ├── functions/   # Fonctions serverless
          │   │   ├── graphql/     # Schémas GraphQL
          │   │   ├── lib/         # Utilitaires backend
          │   │   └── services/    # Logique métier
          │   └── types/           # Types TypeScript générés
          ├── web/                 # Frontend (React + Vite)
          │   ├── public/          # Assets statiques
          │   ├── src/
          │   │   ├── components/  # Composants React
          │   │   ├── layouts/     # Layouts de page
          │   │   ├── pages/       # Pages de l'application
          │   │   └── lib/         # Utilitaires frontend
          │   └── config/          # Configuration Vite/Webpack
          ├── scripts/             # Scripts de développement
          └── redwood.toml         # Configuration RedwoodJS
          \`\`\`

          ## ⚙️ Configuration Avancée

          ### Fichier redwood.toml
          \`\`\`toml
          [web]
            title = "Mon Application RedwoodJS"
            port = 8910
            apiUrl = "/.redwood/functions"
            
          [api]
            port = 8911
            
          [browser]
            open = true
            
          [generate]
            tests = true
            stories = true
          \`\`\`

          ### Variables d'Environnement
          \`\`\`bash
          # .env
          DATABASE_URL="postgresql://user:pass@localhost/mydb"
          SESSION_SECRET="super-secret-session-key"
          API_ROOT_PATH="/.redwood/functions"
          \`\`\`

          ## 🔧 Extensions VS Code Recommandées

          ### Essentielles
          - **ES7+ React/Redux/React-Native snippets**
          - **GraphQL for VSCode**
          - **Prisma** (pour l'autocomplétion du schéma)
          - **TypeScript Importer**

          ### Productivité
          - **Auto Rename Tag**
          - **Bracket Pair Colorizer**
          - **GitLens**
          - **Prettier - Code formatter**

          ### Configuration VS Code
          \`\`\`json
          {
            "editor.formatOnSave": true,
            "editor.codeActionsOnSave": {
              "source.fixAll.eslint": true
            },
            "typescript.preferences.includePackageJsonAutoImports": "on"
          }
          \`\`\`

          ## 📦 Gestion des Dépendances

          ### Workspaces Yarn
          RedwoodJS utilise Yarn Workspaces pour gérer les dépendances :
          \`\`\`bash
          # Installer une dépendance web
          yarn workspace web add lodash
          yarn workspace web add -D @types/lodash
          
          # Installer une dépendance api
          yarn workspace api add jsonwebtoken
          \`\`\`

          ### Commandes Utiles
          \`\`\`bash
          # Vérifier les dépendances
          yarn rw check
          
          # Mettre à jour RedwoodJS
          yarn rw upgrade
          
          # Nettoyer les modules
          yarn rw clean
          \`\`\`

          ## 🚦 Scripts de Développement

          ### Commandes Principales
          \`\`\`bash
          # Démarrer le développement (web + api)
          yarn rw dev
          
          # Démarrer seulement le web
          yarn rw dev web
          
          # Démarrer seulement l'api
          yarn rw dev api
          
          # Construire pour la production
          yarn rw build
          
          # Lancer les tests
          yarn rw test
          \`\`\`

          ### Débogage
          \`\`\`bash
          # Démarrer avec le débogueur
          yarn rw dev api --debug
          
          # Vérifier la configuration
          yarn rw info
          
          # Diagnostics complets
          yarn rw diagnostics
          \`\`\`

          ## 🗄️ Configuration Base de Données

          ### PostgreSQL (Recommandée)
          \`\`\`bash
          # Installation sur macOS
          brew install postgresql
          brew services start postgresql
          
          # Créer une base de données
          createdb mon_app_dev
          \`\`\`

          ### Configuration Prisma
          \`\`\`prisma
          // api/db/schema.prisma
          generator client {
            provider = "prisma-client-js"
          }

          datasource db {
            provider = "postgresql"
            url      = env("DATABASE_URL")
          }
          \`\`\`

          ### Migration Initiale
          \`\`\`bash
          # Créer et appliquer la migration
          yarn rw prisma migrate dev --name init
          
          # Générer le client Prisma
          yarn rw prisma generate
          \`\`\`

          ## 🧪 Configuration des Tests

          ### Jest Configuration
          \`\`\`javascript
          // jest.config.js
          module.exports = {
            projects: [
              '<rootDir>/api',
              '<rootDir>/web'
            ]
          }
          \`\`\`

          ### Tests Types
          - **Unitaires** : Composants et services individuels
          - **Intégration** : Interaction entre composants
          - **E2E** : Scénarios utilisateur complets

          ## 🌐 Configuration Déploiement

          ### Netlify
          \`\`\`bash
          yarn rw setup deploy netlify
          \`\`\`

          ### Vercel
          \`\`\`bash
          yarn rw setup deploy vercel
          \`\`\`

          ### AWS
          \`\`\`bash
          yarn rw setup deploy aws-serverless
          \`\`\`

          ## 📚 Ressources et Documentation

          ### Liens Utiles
          - **Documentation officielle** : redwoodjs.com/docs
          - **Tutorial** : redwoodjs.com/tutorial
          - **Cookbook** : redwoodjs.com/cookbook
          - **Forum** : community.redwoodjs.com

          ### Commandes d'Aide
          \`\`\`bash
          # Aide générale
          yarn rw --help
          
          # Aide pour une commande spécifique
          yarn rw generate --help
          \`\`\`
        `,
      },
      exercise: {
        title: 'Configuration de votre premier projet',
        instructions: `
          Créez la structure basique d'un projet RedwoodJS :
          1. Initialisez un composant de configuration
          2. Affichez les informations de l'environnement
          3. Incluez un message de bienvenue personnalisé
          
          Utilisez les props pour personnaliser le nom de l'application.
        `,
        initialCode: `const ProjectSetup = ({ appName }) => {
  const environment = process.env.NODE_ENV || 'development'
  
  return (
    <div className="setup-container">
      {/* Affichez le nom de l'application */}
      {/* Affichez l'environnement actuel */}
      {/* Ajoutez un message de bienvenue */}
    </div>
  )
}

export default ProjectSetup`,
        expectedOutput: 'Environment: development',
        solution: `const ProjectSetup = ({ appName }) => {
  const environment = process.env.NODE_ENV || 'development'
  
  return (
    <div className="setup-container">
      <h1>Application: {appName}</h1>
      <p>Environment: {environment}</p>
      <p>Welcome to your RedwoodJS setup!</p>
    </div>
  )
}

export default ProjectSetup`,
      },
      quiz: [
        {
          id: '1',
          question: 'Quelle version de Node.js est requise pour RedwoodJS ?',
          options: [
            'Version 16.x ou supérieure',
            'Version 18.x uniquement',
            'Version 20.x (entre 20.0.0 et 21.0.0)',
            "N'importe quelle version récente",
          ],
          correctAnswer: 2,
          explanation:
            'RedwoodJS nécessite Node.js version 20.x, spécifiquement entre 20.0.0 et 21.0.0 pour assurer la compatibilité.',
        },
        {
          id: '2',
          question:
            'Quel est le package manager principal recommandé pour RedwoodJS ?',
          options: ['npm', 'Yarn', 'pnpm', 'Peu importe'],
          correctAnswer: 1,
          explanation:
            'Yarn est le package manager principal recommandé car RedwoodJS utilise Yarn Workspaces pour gérer les dépendances web et api.',
        },
        {
          id: '3',
          question: 'Où se trouve la configuration principale de RedwoodJS ?',
          options: [
            'package.json',
            'redwood.config.js',
            'redwood.toml',
            'config/redwood.json',
          ],
          correctAnswer: 2,
          explanation:
            'Le fichier redwood.toml contient la configuration principale de RedwoodJS, incluant les ports, URLs et options de génération.',
        },
        {
          id: '4',
          question:
            'Quelle commande démarre le serveur de développement complet ?',
          options: [
            'yarn start',
            'yarn dev',
            'yarn rw dev',
            'yarn redwood serve',
          ],
          correctAnswer: 2,
          explanation:
            'La commande "yarn rw dev" démarre à la fois le serveur web et api en mode développement avec hot reload.',
        },
        {
          id: '5',
          question: 'Quel ORM utilise RedwoodJS pour la base de données ?',
          options: ['TypeORM', 'Sequelize', 'Prisma', 'Mongoose'],
          correctAnswer: 2,
          explanation:
            'RedwoodJS utilise Prisma ORM pour sa type-safety, ses migrations automatiques et son support multi-base de données.',
        },
      ],
    },

    components: {
      title: 'Création de composants React',
      description:
        'Apprenez à créer des composants React réutilisables avec RedwoodJS',
      theory: {
        title: 'Composants React dans RedwoodJS',
        content: `
          ## 🧩 Philosophie des Composants RedwoodJS

          RedwoodJS encourage une approche **composant-first** avec :
          - Séparation claire des responsabilités
          - Réutilisabilité maximale
          - Testabilité intégrée
          - Documentation automatique avec Storybook

          ## 📁 Structure des Composants

          ### Organisation Recommandée
          \`\`\`
          web/src/components/
          ├── Button/
          │   ├── Button.tsx           # Composant principal
          │   ├── Button.test.tsx      # Tests unitaires
          │   ├── Button.stories.tsx   # Stories Storybook
          │   └── Button.module.css    # Styles spécifiques
          ├── UserCard/
          └── ProductList/
          \`\`\`

          ### Génération Automatique
          \`\`\`bash
          # Générer un composant complet
          yarn rw generate component Button
          
          # Avec tests et stories
          yarn rw generate component Button --tests --stories
          
          # Dans un sous-dossier
          yarn rw generate component ui/Button
          \`\`\`

          ## 🎨 Types de Composants

          ### 1. Composants de Présentation (Presentational)
          Composants purs qui affichent des données sans logique métier.

          \`\`\`tsx
          interface UserCardProps {
            user: {
              id: string
              name: string
              email: string
              avatar?: string
            }
            onEdit?: (userId: string) => void
          }

          const UserCard = ({ user, onEdit }: UserCardProps) => {
            return (
              <div className="user-card">
                {user.avatar && (
                  <img src={user.avatar} alt={user.name} className="avatar" />
                )}
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                </div>
                {onEdit && (
                  <button onClick={() => onEdit(user.id)}>
                    Modifier
                  </button>
                )}
              </div>
            )
          }
          \`\`\`

          ### 2. Composants Conteneurs (Container)
          Composants qui gèrent l'état et la logique métier.

          \`\`\`tsx
          const UserManagement = () => {
            const [users, setUsers] = useState([])
            const [loading, setLoading] = useState(true)

            useEffect(() => {
              fetchUsers().then(setUsers).finally(() => setLoading(false))
            }, [])

            const handleEditUser = (userId: string) => {
              navigate(routes.editUser({ id: userId }))
            }

            if (loading) return <LoadingSpinner />

            return (
              <div className="user-management">
                {users.map(user => (
                  <UserCard 
                    key={user.id} 
                    user={user} 
                    onEdit={handleEditUser}
                  />
                ))}
              </div>
            )
          }
          \`\`\`

          ### 3. Composants d'Interface (UI Components)
          Composants réutilisables pour l'interface utilisateur.

          \`\`\`tsx
          interface ButtonProps {
            variant?: 'primary' | 'secondary' | 'danger'
            size?: 'small' | 'medium' | 'large'
            disabled?: boolean
            loading?: boolean
            children: React.ReactNode
            onClick?: () => void
          }

          const Button = ({ 
            variant = 'primary', 
            size = 'medium',
            disabled = false,
            loading = false,
            children,
            onClick 
          }: ButtonProps) => {
            const className = \`btn btn--\${variant} btn--\${size} \${disabled ? 'btn--disabled' : ''}\`
            
            return (
              <button 
                className={className}
                onClick={onClick}
                disabled={disabled || loading}
              >
                {loading ? <Spinner /> : children}
              </button>
            )
          }
          \`\`\`

          ## 🔄 Hooks Personnalisés

          ### Logique Réutilisable
          \`\`\`tsx
          // hooks/useLocalStorage.ts
          const useLocalStorage = <T>(key: string, initialValue: T) => {
            const [value, setValue] = useState<T>(() => {
              try {
                const item = window.localStorage.getItem(key)
                return item ? JSON.parse(item) : initialValue
              } catch {
                return initialValue
              }
            })

            const setStoredValue = (value: T) => {
              setValue(value)
              window.localStorage.setItem(key, JSON.stringify(value))
            }

            return [value, setStoredValue] as const
          }
          \`\`\`

          ### Hook d'API
          \`\`\`tsx
          // hooks/useApi.ts
          const useApi = <T>(url: string) => {
            const [data, setData] = useState<T | null>(null)
            const [loading, setLoading] = useState(true)
            const [error, setError] = useState<string | null>(null)

            useEffect(() => {
              fetch(url)
                .then(res => res.json())
                .then(setData)
                .catch(err => setError(err.message))
                .finally(() => setLoading(false))
            }, [url])

            return { data, loading, error }
          }
          \`\`\`

          ## 🎭 Patterns Avancés

          ### Render Props
          \`\`\`tsx
          interface DataFetcherProps<T> {
            url: string
            children: (data: {
              data: T | null
              loading: boolean
              error: string | null
            }) => React.ReactNode
          }

          const DataFetcher = <T,>({ url, children }: DataFetcherProps<T>) => {
            const apiData = useApi<T>(url)
            return <>{children(apiData)}</>
          }

          // Usage
          <DataFetcher url="/api/users">
            {({ data, loading, error }) => (
              loading ? <Spinner /> : 
              error ? <ErrorMessage error={error} /> :
              <UserList users={data} />
            )}
          </DataFetcher>
          \`\`\`

          ### Higher-Order Components (HOC)
          \`\`\`tsx
          const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
            return (props: P) => {
              const { isAuthenticated, currentUser } = useAuth()
              
              if (!isAuthenticated) {
                return <Redirect to={routes.login()} />
              }
              
              return <Component {...props} currentUser={currentUser} />
            }
          }

          // Usage
          const ProtectedProfile = withAuth(ProfilePage)
          \`\`\`

          ## 📱 Responsive Design

          ### Composants Adaptatifs
          \`\`\`tsx
          const ResponsiveLayout = ({ children }: { children: React.ReactNode }) => {
            const [isMobile, setIsMobile] = useState(false)

            useEffect(() => {
              const checkDevice = () => setIsMobile(window.innerWidth < 768)
              checkDevice()
              window.addEventListener('resize', checkDevice)
              return () => window.removeEventListener('resize', checkDevice)
            }, [])

            return (
              <div className={\`layout \${isMobile ? 'layout--mobile' : 'layout--desktop'}\`}>
                {children}
              </div>
            )
          }
          \`\`\`

          ## ♿ Accessibilité

          ### Bonnes Pratiques
          \`\`\`tsx
          const AccessibleButton = ({ 
            children, 
            ariaLabel,
            onClick 
          }: {
            children: React.ReactNode
            ariaLabel?: string
            onClick: () => void
          }) => {
            return (
              <button
                onClick={onClick}
                aria-label={ariaLabel}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onClick()
                  }
                }}
              >
                {children}
              </button>
            )
          }
          \`\`\`

          ## 🧪 Testing des Composants

          ### Tests avec Testing Library
          \`\`\`tsx
          import { render, screen, fireEvent } from '@redwoodjs/testing/web'
          import Button from './Button'

          describe('Button', () => {
            it('renders children correctly', () => {
              render(<Button>Click me</Button>)
              expect(screen.getByText('Click me')).toBeInTheDocument()
            })

            it('calls onClick when clicked', () => {
              const onClick = jest.fn()
              render(<Button onClick={onClick}>Click me</Button>)
              
              fireEvent.click(screen.getByText('Click me'))
              expect(onClick).toHaveBeenCalledTimes(1)
            })

            it('is disabled when loading', () => {
              render(<Button loading>Click me</Button>)
              expect(screen.getByRole('button')).toBeDisabled()
            })
          })
          \`\`\`

          ## 📖 Documentation avec Storybook

          ### Stories Complètes
          \`\`\`tsx
          import type { Meta, StoryObj } from '@storybook/react'
          import Button from './Button'

          const meta: Meta<typeof Button> = {
            title: 'Components/Button',
            component: Button,
            parameters: {
              layout: 'centered',
            },
            tags: ['autodocs'],
            argTypes: {
              variant: {
                control: { type: 'select' },
                options: ['primary', 'secondary', 'danger'],
              },
            },
          }

          export default meta
          type Story = StoryObj<typeof meta>

          export const Primary: Story = {
            args: {
              variant: 'primary',
              children: 'Button',
            },
          }

          export const Secondary: Story = {
            args: {
              variant: 'secondary',
              children: 'Button',
            },
          }

          export const Loading: Story = {
            args: {
              loading: true,
              children: 'Loading...',
            },
          }
          \`\`\`

          ## 🎯 Optimisation Performance

          ### Mémoïsation
          \`\`\`tsx
          import { memo, useMemo, useCallback } from 'react'

          interface ExpensiveListProps {
            items: Array<{ id: string; name: string; price: number }>
            onItemClick: (id: string) => void
          }

          const ExpensiveList = memo(({ items, onItemClick }: ExpensiveListProps) => {
            const sortedItems = useMemo(() => 
              items.sort((a, b) => b.price - a.price), 
              [items]
            )

            const handleClick = useCallback((id: string) => {
              onItemClick(id)
            }, [onItemClick])

            return (
              <ul>
                {sortedItems.map(item => (
                  <ExpensiveListItem 
                    key={item.id} 
                    item={item} 
                    onClick={handleClick}
                  />
                ))}
              </ul>
            )
          })
          \`\`\`
        `,
      },
      exercise: {
        title: 'Composant ProductCard avec props et événements',
        instructions: `
          Créez un composant ProductCard qui :
          1. Affiche les informations d'un produit (nom, prix, description)
          2. Gère un état "favori" avec un bouton toggle
          3. Émet un événement onAddToCart avec l'ID du produit
          4. Utilise la props "discount" pour afficher un prix réduit si applicable
          
          Props attendues :
          - product: { id, name, price, description }
          - discount?: number (pourcentage de réduction)
          - onAddToCart: (productId: string) => void
        `,
        initialCode: `import { useState } from 'react'

const ProductCard = ({ product, discount, onAddToCart }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  
  // Calculer le prix final avec la réduction
  const finalPrice = discount ? product.price * (1 - discount / 100) : product.price
  
  return (
    <div className="product-card">
      {/* Ajoutez le nom du produit */}
      {/* Ajoutez le prix (original et réduit si discount) */}
      {/* Ajoutez la description */}
      {/* Bouton favori qui toggle isFavorite */}
      {/* Bouton "Ajouter au panier" qui appelle onAddToCart */}
    </div>
  )
}

export default ProductCard`,
        expectedOutput: 'Product: Sample Product',
        solution: `import { useState } from 'react'

const ProductCard = ({ product, discount, onAddToCart }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  
  const finalPrice = discount ? product.price * (1 - discount / 100) : product.price
  
  return (
    <div className="product-card">
      <h3>Product: {product.name}</h3>
      <div className="price">
        {discount && <span className="original-price">${product.price}</span>}
        <span className="final-price">${finalPrice.toFixed(2)}</span>
        {discount && <span className="discount">-{discount}%</span>}
      </div>
      <p>{product.description}</p>
      <button 
        onClick={() => setIsFavorite(!isFavorite)}
        className={isFavorite ? 'favorite active' : 'favorite'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
      <button onClick={() => onAddToCart(product.id)}>
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard`,
      },
      quiz: [
        {
          id: '1',
          question:
            'Quelle commande génère un composant avec tests et stories ?',
          options: [
            'yarn rw generate component Button',
            'yarn rw generate component Button --tests --stories',
            'yarn rw create component Button --all',
            'yarn rw make component Button --complete',
          ],
          correctAnswer: 1,
          explanation:
            'La commande "yarn rw generate component Button --tests --stories" génère le composant avec ses fichiers de test et de documentation Storybook.',
        },
        {
          id: '2',
          question: 'Quel hook est idéal pour optimiser les calculs coûteux ?',
          options: ['useState', 'useEffect', 'useMemo', 'useCallback'],
          correctAnswer: 2,
          explanation:
            'useMemo permet de mémoïser le résultat de calculs coûteux et ne les recalcule que si les dépendances changent.',
        },
        {
          id: '3',
          question: "Comment éviter le re-rendu inutile d'un composant ?",
          options: [
            'Utiliser useEffect',
            'Utiliser React.memo()',
            'Utiliser useState',
            'Utiliser useContext',
          ],
          correctAnswer: 1,
          explanation:
            "React.memo() enveloppe un composant et empêche son re-rendu si ses props n'ont pas changé (shallow comparison).",
        },
        {
          id: '4',
          question:
            "Où placer la logique métier dans l'architecture RedwoodJS ?",
          options: [
            'Dans les composants de présentation',
            'Dans les composants conteneurs',
            'Dans les hooks personnalisés ou services',
            'Directement dans les pages',
          ],
          correctAnswer: 2,
          explanation:
            'La logique métier doit être centralisée dans des hooks personnalisés ou des services pour favoriser la réutilisabilité et la testabilité.',
        },
        {
          id: '5',
          question:
            'Quel outil RedwoodJS utilise pour la documentation des composants ?',
          options: ['JSDoc', 'Docusaurus', 'Storybook', 'GitBook'],
          correctAnswer: 2,
          explanation:
            'RedwoodJS intègre Storybook pour documenter et tester visuellement les composants en isolation.',
        },
      ],
    },

    routing: {
      title: 'Routage et navigation',
      description:
        'Maîtrisez le système de routage RedwoodJS et la navigation dynamique',
      theory: {
        title: 'Système de routage RedwoodJS',
        content: `
          ## 🗺️ Architecture du Routage

          RedwoodJS utilise un système de routage **file-based** combiné à un routeur centralisé pour une approche hybride optimale.

          ### Concepts Clés
          - **Routes déclaratives** dans \`Routes.tsx\`
          - **Pages automatiques** basées sur la structure de fichiers
          - **Navigation programmatique** avec le hook \`navigate\`
          - **Paramètres typés** avec TypeScript
          - **Guards et redirections** intégrées

          ## 📁 Structure des Routes

          ### Fichier Routes Principal
          \`\`\`tsx
          // web/src/Routes.tsx
          import { Router, Route, Set } from '@redwoodjs/router'
          import MainLayout from 'src/layouts/MainLayout/MainLayout'
          import AdminLayout from 'src/layouts/AdminLayout/AdminLayout'

          const Routes = () => {
            return (
              <Router>
                {/* Routes publiques */}
                <Route path="/" page={HomePage} name="home" />
                <Route path="/about" page={AboutPage} name="about" />
                <Route path="/contact" page={ContactPage} name="contact" />
                
                {/* Routes avec layout */}
                <Set wrap={MainLayout}>
                  <Route path="/products" page={ProductsPage} name="products" />
                  <Route path="/product/{id:Int}" page={ProductPage} name="product" />
                </Set>
                
                {/* Routes protégées */}
                <Set wrap={AdminLayout} prerender={false}>
                  <Route path="/admin" page={AdminDashboardPage} name="adminDashboard" />
                  <Route path="/admin/users" page={AdminUsersPage} name="adminUsers" />
                </Set>
                
                {/* Route 404 */}
                <Route notfound page={NotFoundPage} />
              </Router>
            )
          }

          export default Routes
          \`\`\`

          ## 🎯 Types de Routes

          ### Routes Basiques
          \`\`\`tsx
          // Route simple
          <Route path="/about" page={AboutPage} name="about" />

          // Route avec paramètre obligatoire
          <Route path="/user/{id}" page={UserPage} name="user" />

          // Route avec paramètre typé
          <Route path="/product/{id:Int}" page={ProductPage} name="product" />

          // Route avec paramètre optionnel
          <Route path="/category/{slug?}" page={CategoryPage} name="category" />
          \`\`\`

          ### Paramètres Avancés
          \`\`\`tsx
          // Paramètres multiples
          <Route 
            path="/blog/{year:Int}/{month:Int}/{slug}" 
            page={BlogPostPage} 
            name="blogPost" 
          />

          // Contraintes sur les paramètres
          <Route 
            path="/api/v{version:Int}/users/{id:Int}" 
            page={ApiUserPage} 
            name="apiUser" 
            constraint={{ version: /[1-3]/ }}
          />

          // Segments wilcard
          <Route 
            path="/files/{...path}" 
            page={FileViewerPage} 
            name="fileViewer" 
          />
          \`\`\`

          ## 🏗️ Organisation avec Sets

          ### Layouts Partagés
          \`\`\`tsx
          <Set wrap={MainLayout}>
            <Route path="/dashboard" page={DashboardPage} name="dashboard" />
            <Route path="/profile" page={ProfilePage} name="profile" />
            <Route path="/settings" page={SettingsPage} name="settings" />
          </Set>
          \`\`\`

          ### Sets Imbriqués
          \`\`\`tsx
          <Set wrap={AppLayout}>
            <Set wrap={AuthLayout} prerender={false}>
              <Route path="/login" page={LoginPage} name="login" />
              <Route path="/register" page={RegisterPage} name="register" />
            </Set>
            
            <Set wrap={UserLayout} private>
              <Route path="/dashboard" page={DashboardPage} name="dashboard" />
              <Route path="/profile" page={ProfilePage} name="profile" />
            </Set>
          </Set>
          \`\`\`

          ## 🔄 Navigation Programmatique

          ### Hook navigate
          \`\`\`tsx
          import { navigate, routes } from '@redwoodjs/router'

          const ProductList = () => {
            const handleProductClick = (productId: number) => {
              // Navigation simple
              navigate('/product/\${productId}')
              
              // Navigation avec nom de route (recommandé)
              navigate(routes.product({ id: productId }))
              
              // Navigation avec remplacement de l'historique
              navigate(routes.home(), { replace: true })
            }

            return (
              <div>
                {products.map(product => (
                  <button 
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                  >
                    {product.name}
                  </button>
                ))}
              </div>
            )
          }
          \`\`\`

          ### Hook useParams
          \`\`\`tsx
          import { useParams } from '@redwoodjs/router'

          const ProductPage = () => {
            const { id } = useParams()
            
            // id est automatiquement typé selon la définition de route
            const productId = parseInt(id, 10)
            
            return (
              <div>
                <h1>Produit #{productId}</h1>
              </div>
            )
          }
          \`\`\`

          ## 🔍 Query Parameters et Hash

          ### Gestion des Query Params
          \`\`\`tsx
          import { useLocation } from '@redwoodjs/router'

          const SearchPage = () => {
            const location = useLocation()
            const searchParams = new URLSearchParams(location.search)
            
            const query = searchParams.get('q') || ''
            const page = parseInt(searchParams.get('page') || '1', 10)
            const filters = searchParams.getAll('filter')

            const updateSearch = (newQuery: string) => {
              const params = new URLSearchParams(location.search)
              params.set('q', newQuery)
              params.set('page', '1') // Reset page
              
              navigate(\`\${location.pathname}?\${params.toString()}\`)
            }

            return (
              <div>
                <input 
                  value={query}
                  onChange={(e) => updateSearch(e.target.value)}
                  placeholder="Rechercher..."
                />
                <p>Page {page}</p>
                <p>Filtres: {filters.join(', ')}</p>
              </div>
            )
          }
          \`\`\`

          ## 🛡️ Routes Protégées

          ### Authentication Guards
          \`\`\`tsx
          import { useAuth } from '@redwoodjs/auth'
          import { Redirect, routes } from '@redwoodjs/router'

          const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
            const { isAuthenticated, loading } = useAuth()
            
            if (loading) return <div>Chargement...</div>
            
            if (!isAuthenticated) {
              return <Redirect to={routes.login()} />
            }
            
            return <>{children}</>
          }

          // Usage dans Routes.tsx
          <Set wrap={PrivateRoute}>
            <Route path="/dashboard" page={DashboardPage} name="dashboard" />
          </Set>
          \`\`\`

          ### Role-based Access
          \`\`\`tsx
          const AdminRoute = ({ children }: { children: React.ReactNode }) => {
            const { currentUser, hasRole } = useAuth()
            
            if (!hasRole('admin')) {
              return <Redirect to={routes.unauthorized()} />
            }
            
            return <>{children}</>
          }
          \`\`\`

          ## 🎨 Liens et Navigation

          ### Composant Link
          \`\`\`tsx
          import { Link, routes } from '@redwoodjs/router'

          const Navigation = () => {
            return (
              <nav>
                {/* Lien simple */}
                <Link to={routes.home()}>Accueil</Link>
                
                {/* Lien avec paramètres */}
                <Link to={routes.product({ id: 123 })}>
                  Produit 123
                </Link>
                
                {/* Lien avec classes CSS */}
                <Link 
                  to={routes.about()} 
                  className="nav-link"
                  activeClassName="nav-link--active"
                >
                  À propos
                </Link>
                
                {/* Lien externe */}
                <a href="https://redwoodjs.com" target="_blank" rel="noopener">
                  RedwoodJS
                </a>
              </nav>
            )
          }
          \`\`\`

          ### Navigation Conditionnelle
          \`\`\`tsx
          const ConditionalNavigation = () => {
            const { isAuthenticated, currentUser } = useAuth()
            
            return (
              <nav>
                <Link to={routes.home()}>Accueil</Link>
                
                {isAuthenticated ? (
                  <>
                    <Link to={routes.dashboard()}>Dashboard</Link>
                    <Link to={routes.profile()}>
                      {currentUser.name}
                    </Link>
                    <button onClick={() => logOut()}>Déconnexion</button>
                  </>
                ) : (
                  <>
                    <Link to={routes.login()}>Connexion</Link>
                    <Link to={routes.register()}>Inscription</Link>
                  </>
                )}
              </nav>
            )
          }
          \`\`\`

          ## 📱 Routage Mobile et PWA

          ### Deep Linking
          \`\`\`tsx
          // Support des liens profonds pour mobile
          const handleShareProduct = (productId: number) => {
            const url = \`\${window.location.origin}\${routes.product({ id: productId })}\`
            
            if (navigator.share) {
              navigator.share({
                title: 'Découvrez ce produit',
                url: url
              })
            } else {
              navigator.clipboard.writeText(url)
            }
          }
          \`\`\`

          ## 🔧 Configuration Avancée

          ### Custom Router Options
          \`\`\`tsx
          <Router 
            trailingSlashes="preserve"
            useAuth={useAuth}
            pageLoadingDelay={350}
          >
            {/* Routes */}
          </Router>
          \`\`\`

          ### Route Preloading
          \`\`\`tsx
          import { preload } from '@redwoodjs/router'

          const ProductCard = ({ product }) => {
            const handleMouseEnter = () => {
              // Précharger la page produit
              preload(routes.product({ id: product.id }))
            }
            
            return (
              <div onMouseEnter={handleMouseEnter}>
                <Link to={routes.product({ id: product.id })}>
                  {product.name}
                </Link>
              </div>
            )
          }
          \`\`\`

          ## 🧪 Testing du Routage

          ### Tests des Routes
          \`\`\`tsx
          import { renderWithRouter } from '@redwoodjs/testing/web'
          import { routes } from '@redwoodjs/router'

          describe('ProductPage', () => {
            it('displays product information', () => {
              const { getByText } = renderWithRouter(
                <ProductPage />,
                { 
                  route: routes.product({ id: 123 }),
                  path: '/product/{id:Int}'
                }
              )
              
              expect(getByText('Produit #123')).toBeInTheDocument()
            })
          })
          \`\`\`

          ## 📊 Analytics et Tracking

          ### Route Change Tracking
          \`\`\`tsx
          import { useLocation } from '@redwoodjs/router'
          import { useEffect } from 'react'

          const Analytics = () => {
            const location = useLocation()
            
            useEffect(() => {
              // Track page view
              gtag('config', 'GA_TRACKING_ID', {
                page_path: location.pathname + location.search
              })
            }, [location])
            
            return null
          }

          // Ajouter dans App.tsx
          const App = () => (
            <FatalErrorBoundary page={FatalErrorPage}>
              <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
                <RedwoodApolloProvider>
                  <Analytics />
                  <Routes />
                </RedwoodApolloProvider>
              </RedwoodProvider>
            </FatalErrorBoundary>
          )
          \`\`\`
        `,
      },
      exercise: {
        title: 'Système de navigation avec paramètres',
        instructions: `
          Créez un composant BlogNavigation qui :
          1. Affiche une liste de catégories de blog
          2. Navigue vers une page de catégorie avec le slug
          3. Highlights la catégorie actuelle si on est sur sa page
          4. Inclut un breadcrumb avec la navigation précédente
          
          Utilisez useParams pour détecter la catégorie actuelle et 
          le système de routes RedwoodJS pour la navigation.
        `,
        initialCode: `import { Link, routes, useParams, useLocation } from '@redwoodjs/router'

const BlogNavigation = () => {
  const { slug } = useParams()
  const location = useLocation()
  
  const categories = [
    { slug: 'tech', name: 'Technology' },
    { slug: 'design', name: 'Design' },
    { slug: 'business', name: 'Business' }
  ]
  
  const isActive = (categorySlug) => {
    // Vérifier si cette catégorie est active
    return slug === categorySlug
  }
  
  return (
    <nav className="blog-navigation">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        {/* Lien vers l'accueil */}
        {/* Si on est sur une catégorie, l'afficher */}
      </div>
      
      {/* Navigation des catégories */}
      <ul className="categories">
        {/* Mapper les catégories avec Link et classe active */}
      </ul>
    </nav>
  )
}

export default BlogNavigation`,
        expectedOutput: 'Category: Technology',
        solution: `import { Link, routes, useParams, useLocation } from '@redwoodjs/router'

const BlogNavigation = () => {
  const { slug } = useParams()
  const location = useLocation()
  
  const categories = [
    { slug: 'tech', name: 'Technology' },
    { slug: 'design', name: 'Design' },
    { slug: 'business', name: 'Business' }
  ]
  
  const isActive = (categorySlug) => {
    return slug === categorySlug
  }
  
  const currentCategory = categories.find(cat => cat.slug === slug)
  
  return (
    <nav className="blog-navigation">
      <div className="breadcrumb">
        <Link to={routes.home()}>Home</Link>
        {currentCategory && (
          <>
            <span> / </span>
            <span>Category: {currentCategory.name}</span>
          </>
        )}
      </div>
      
      <ul className="categories">
        {categories.map(category => (
          <li key={category.slug}>
            <Link 
              to={routes.blogCategory({ slug: category.slug })}
              className={isActive(category.slug) ? 'active' : ''}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default BlogNavigation`,
      },
      quiz: [
        {
          id: '1',
          question: 'Où sont définies les routes dans RedwoodJS ?',
          options: [
            'Dans chaque page individuellement',
            'Dans le fichier web/src/Routes.tsx',
            'Dans le fichier api/src/routes.js',
            'Automatiquement par la structure de fichiers',
          ],
          correctAnswer: 1,
          explanation:
            'Les routes sont définies de manière centralisée dans le fichier web/src/Routes.tsx pour une gestion claire et organisée.',
        },
        {
          id: '2',
          question: 'Comment définir un paramètre de route typé en entier ?',
          options: [
            'path="/user/{id}"',
            'path="/user/{id:number}"',
            'path="/user/{id:Int}"',
            'path="/user/{id:integer}"',
          ],
          correctAnswer: 2,
          explanation:
            'RedwoodJS utilise la syntaxe {id:Int} pour définir des paramètres typés en entier, ce qui assure la validation automatique.',
        },
        {
          id: '3',
          question:
            'Quel hook utilise-t-on pour la navigation programmatique ?',
          options: [
            'useNavigate',
            'useRouter',
            'navigate (fonction)',
            'useRedirect',
          ],
          correctAnswer: 2,
          explanation:
            'RedwoodJS utilise la fonction navigate importée de @redwoodjs/router pour la navigation programmatique.',
        },
        {
          id: '4',
          question: 'Comment organiser des routes avec un layout commun ?',
          options: [
            'Utiliser le composant <Set wrap={Layout}>',
            'Envelopper chaque Route individuellement',
            'Définir le layout dans chaque page',
            'Utiliser useLayout hook',
          ],
          correctAnswer: 0,
          explanation:
            'Le composant <Set wrap={Layout}> permet de grouper plusieurs routes qui partagent le même layout, évitant la répétition.',
        },
        {
          id: '5',
          question:
            'Comment accéder aux paramètres de route dans un composant ?',
          options: [
            'useRouteParams()',
            'useParams()',
            'useQuery()',
            'useLocation().params',
          ],
          correctAnswer: 1,
          explanation:
            'Le hook useParams() de @redwoodjs/router donne accès aux paramètres de route avec typage automatique.',
        },
        {
          id: '6',
          question:
            'Comment créer une route protégée nécessitant une authentification ?',
          options: [
            'Ajouter private={true} à la Route',
            'Utiliser <PrivateRoute>',
            "Envelopper avec <Set> et un composant d'auth",
            'Utiliser beforeEnter guard',
          ],
          correctAnswer: 2,
          explanation:
            "On crée un composant d'authentification et on l'utilise avec <Set wrap={AuthComponent}> pour protéger un groupe de routes.",
        },
      ],
    },
  }

  const lesson =
    lessonContent[lessonId as keyof typeof lessonContent] || lessonContent.intro

  const breadcrumbs = [
    { label: 'Accueil', href: '/' },
    { label: 'Leçons' },
    { label: lesson.title },
  ]

  const handleExerciseValidation = (isCorrect: boolean) => {
    setExerciseCompleted(isCorrect)
  }

  const handleQuizComplete = (score: number) => {
    setQuizScore(score)
  }

  const canProceedToNext =
    exerciseCompleted && quizScore !== null && quizScore >= 60

  return (
    <>
      <MetaTags
        title={`${lesson.title} - Cours RedwoodJS`}
        description={lesson.description}
      />

      <CourseLayout
        title={lesson.title}
        currentStep={1}
        totalSteps={7}
        breadcrumbs={breadcrumbs}
      >
        <div className="space-y-6">
          <Tabs onChange={(index) => setCurrentTab(index)} id="lesson-tabs">
            <TabList>
              <Tab>📖 Théorie</Tab>
              <Tab>💻 Exercice</Tab>
              <Tab>🧠 Quiz</Tab>
            </TabList>

            <TabPanel>
              <div className="prose max-w-none">
                <div className="rounded-lg bg-white p-8">
                  <h2 className="mb-6 text-2xl font-bold">
                    {lesson.theory.title}
                  </h2>
                  <div className="whitespace-pre-line leading-relaxed text-gray-700">
                    {lesson.theory.content}
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="space-y-6">
                <div className="rounded-lg bg-blue-50 p-6">
                  <h3 className="mb-3 text-lg font-semibold">
                    💡 Instructions
                  </h3>
                  <p className="text-gray-700">
                    {lesson.exercise.instructions}
                  </p>
                </div>

                <CodeEditor
                  initialCode={lesson.exercise.initialCode}
                  expectedOutput={lesson.exercise.expectedOutput}
                  lesson={lessonId}
                  onValidate={handleExerciseValidation}
                />

                {exerciseCompleted && (
                  <SectionMessage
                    appearance="success"
                    title="Exercice terminé !"
                  >
                    Excellent ! Vous pouvez maintenant passer au quiz pour
                    valider vos connaissances.
                  </SectionMessage>
                )}
              </div>
            </TabPanel>

            <TabPanel>
              <div className="space-y-6">
                <div className="rounded-lg bg-purple-50 p-6">
                  <h3 className="mb-3 text-lg font-semibold">
                    🧠 Testez vos connaissances
                  </h3>
                  <p className="text-gray-700">
                    Répondez aux questions suivantes pour valider votre
                    compréhension de cette leçon. Un score de 60% minimum est
                    requis pour passer à la leçon suivante.
                  </p>
                </div>

                <QuizComponent
                  questions={lesson.quiz}
                  onComplete={handleQuizComplete}
                />
              </div>
            </TabPanel>
          </Tabs>

          {/* Navigation */}
          <div className="flex items-center justify-between border-t pt-8">
            <Button appearance="subtle">← Leçon précédente</Button>

            <div className="text-center">
              <p className="mb-2 text-sm text-gray-600">
                Progression de la leçon
              </p>
              <div className="flex items-center space-x-2">
                <span
                  className={`h-3 w-3 rounded-full ${currentTab >= 0 ? 'bg-green-500' : 'bg-gray-300'}`}
                ></span>
                <span
                  className={`h-3 w-3 rounded-full ${exerciseCompleted ? 'bg-green-500' : 'bg-gray-300'}`}
                ></span>
                <span
                  className={`h-3 w-3 rounded-full ${quizScore !== null && quizScore >= 60 ? 'bg-green-500' : 'bg-gray-300'}`}
                ></span>
              </div>
            </div>

            <Button appearance="primary" isDisabled={!canProceedToNext}>
              Leçon suivante →
            </Button>
          </div>

          {!canProceedToNext && (
            <SectionMessage
              appearance="information"
              title="Terminez tous les exercices"
            >
              Vous devez terminer l&apos;exercice pratique et obtenir au moins
              60% au quiz pour passer à la leçon suivante.
            </SectionMessage>
          )}
        </div>
      </CourseLayout>
    </>
  )
}

export default LessonPage
