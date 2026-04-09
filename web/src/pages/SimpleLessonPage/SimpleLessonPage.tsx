import { useState, useEffect } from 'react'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { Link, navigate } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useProgress } from 'src/contexts/ProgressContext'
import SimpleLayout from 'src/layouts/SimpleLayout/SimpleLayout'

interface SimpleLessonPageProps {
  lessonId: string
}

const SimpleLessonPage = ({ lessonId = 'intro' }: SimpleLessonPageProps) => {
  const {
    markExerciseCompleted,
    setQuizScore: setProgressQuizScore,
    progress,
  } = useProgress()
  const [currentTab, setCurrentTab] = useState(0)
  const [localExerciseCompleted, setLocalExerciseCompleted] = useState(false)
  const [localQuizScore, setLocalQuizScore] = useState<number | null>(null)

  // Récupérer la progression depuis le contexte
  const lessonProgress = progress[lessonId]
  const exerciseCompleted =
    lessonProgress?.exerciseCompleted || localExerciseCompleted
  const quizScore = lessonProgress?.quizScore ?? localQuizScore

  // Liste des leçons dans l'ordre
  const lessonOrder = [
    'intro',
    'setup',
    'components',
    'routing',
    'data',
    'auth',
    'deploy',
  ]

  // Contenu de la leçon d'introduction
  const lessonContent = {
    intro: {
      title: 'Introduction à RedwoodJS',
      description: 'Découvrez les concepts fondamentaux de RedwoodJS',
      theory: {
        title: "Qu'est-ce que RedwoodJS ?",
        content: `RedwoodJS est un framework full-stack moderne créé par Tom Preston-Werner (co-fondateur de GitHub). Il combine le meilleur de React, GraphQL, et Prisma pour créer des applications web robustes et scalables.

## 🎯 Philosophie de RedwoodJS

RedwoodJS suit la philosophie "Convention over Configuration" - il fournit une structure prédéfinie qui permet aux développeurs de se concentrer sur la logique métier plutôt que sur la configuration.

### Le Stack Redwood

\`\`\`
┌─────────────────┐    ┌─────────────────┐
│   FRONTEND      │    │    BACKEND      │
│                 │    │                 │
│  React + Vite   │◄──►│ Node.js + GQL   │
│  TypeScript     │    │   Prisma ORM    │
│  Storybook      │    │   Functions     │
└─────────────────┘    └─────────────────┘
\`\`\`

## 🏗️ Architecture Détaillée

### Frontend (Web Side)
- **React 18** : Avec Hooks, Suspense et Concurrent Features
- **Vite** : Bundler ultra-rapide pour le développement
- **TypeScript** : Type safety native
- **Storybook** : Développement isolé des composants
- **React Router** : Routage côté client
- **CSS/SCSS/Styled Components** : Support de tous les systèmes de style

### Backend (API Side)
- **GraphQL** : API moderne avec introspection automatique
- **Prisma ORM** : Type-safe database access
- **Functions** : Serverless functions pour la logique métier
- **Services** : Couche logique métier
- **Authentication** : Système d'auth intégré (dbAuth, Auth0, etc.)

### Base de données
- **Support multi-DB** : PostgreSQL, MySQL, SQLite, MongoDB
- **Migrations** : Gestion automatique des changements de schéma
- **Seeding** : Population de données de développement

## ⚡ Avantages de RedwoodJS

### 1. Développement Rapide
\`\`\`bash
# Génération automatique
yarn rw generate scaffold Post
# Crée automatiquement :
# - Pages CRUD complètes
# - Composants React
# - Services GraphQL
# - Tests unitaires
\`\`\`

### 2. Type Safety Complète
- **Frontend ↔ Backend** : Types partagés automatiquement
- **Database ↔ API** : Prisma génère les types depuis le schéma
- **GraphQL** : Génération automatique des types TypeScript

### 3. DevEx (Developer Experience) Optimale
- **Hot Reload** : Rechargement instantané en développement
- **Error Messages** : Messages d'erreur clairs et utiles
- **Auto-completion** : IntelliSense complet dans VS Code
- **Debugging** : Outils de debug intégrés

### 4. Déploiement Moderne
- **Jamstack Ready** : Optimisé pour Netlify, Vercel
- **Serverless** : Functions déployables individuellement
- **CDN Friendly** : Assets optimisés pour la distribution
- **CI/CD** : Intégration GitHub Actions native

## 🔧 Concepts Clés

### Cells
Les Cells sont un pattern unique à RedwoodJS pour gérer les états de loading, erreur et succès :

\`\`\`typescript
// PostsCell.tsx
export const QUERY = gql\`
  query PostsQuery {
    posts {
      id
      title
      body
    }
  }
\`

export const Loading = () => <div>Chargement...</div>
export const Empty = () => <div>Aucun post</div>
export const Failure = ({ error }) => <div>Erreur: {error.message}</div>
export const Success = ({ posts }) => <PostsList posts={posts} />
\`\`\`

### Services
Les Services encapsulent la logique métier côté API :

\`\`\`typescript
// services/posts.ts
export const posts = () => {
  return db.post.findMany()
}

export const createPost = ({ input }) => {
  return db.post.create({ data: input })
}
\`\`\`

### Pages et Layouts
- **Pages** : Composants de niveau supérieur accessibles via URL
- **Layouts** : Wrappers réutilisables pour grouper des pages
- **Routes** : Configuration centralisée dans \`Routes.tsx\`

## 🚀 Cas d'usage idéaux

### ✅ Parfait pour :
- **Startups** : MVP rapide avec possibilité d'évolution
- **Applications B2B** : Dashboards, CRM, outils internes
- **E-commerce** : Boutiques en ligne avec gestion backend
- **Blogs/CMS** : Sites de contenu avec administration
- **SaaS** : Applications web avec authentification

### ⚠️ À éviter pour :
- **Sites statiques simples** : Utilisez Next.js ou Gatsby
- **Applications mobiles natives** : Utilisez React Native
- **Microservices complexes** : Architecture trop opinionated

## 📈 Écosystème et Communauté

### Ressources Officielles
- **Documentation** : redwoodjs.com/docs
- **Tutorial Complet** : Guide pas-à-pas de 2h
- **Discord** : Communauté active de 15k+ développeurs
- **GitHub** : Open source avec 15k+ stars

### Extensions Populaires
- **Redwood Record** : ORM alternatif
- **Redwood Realtime** : WebSockets et subscriptions
- **Auth Providers** : Auth0, Supabase, Clerk intégrations

## 🎓 Prochaines étapes

Dans les prochaines leçons, nous allons :
1. **Installer** et configurer votre environnement
2. **Créer** votre première application
3. **Développer** des composants interactifs
4. **Intégrer** une base de données
5. **Implémenter** l'authentification
6. **Déployer** en production

RedwoodJS transforme le développement full-stack en une expérience fluide et productive !`,
      },
      exercise: {
        title: 'Votre premier composant RedwoodJS',
        instructions:
          'Créez un composant React simple qui affiche "Hello RedwoodJS"',
        solution: "Un exemple de solution sera affiché ici après l'exercice.",
      },
      quiz: [
        {
          id: '1',
          question: 'Quel est le principal avantage de RedwoodJS ?',
          options: [
            'Il est uniquement pour le frontend',
            'Il combine frontend et backend dans un seul framework',
            'Il ne supporte que JavaScript',
            "Il n'utilise pas de base de données",
          ],
          correctAnswer: 1,
          explanation:
            'RedwoodJS est un framework full-stack qui intègre React pour le frontend et GraphQL/Prisma pour le backend.',
        },
        {
          id: '2',
          question: 'Quel outil utilise RedwoodJS pour la base de données ?',
          options: ['MongoDB Driver', 'Sequelize', 'Prisma ORM', 'TypeORM'],
          correctAnswer: 2,
          explanation:
            'RedwoodJS utilise Prisma ORM pour la gestion des bases de données, offrant type-safety et migrations automatiques.',
        },
      ],
    },
    setup: {
      title: "Configuration de l'environnement",
      description:
        'Installez et configurez votre environnement de développement',
      theory: {
        title: "Configuration de l'environnement de développement",
        content: `## 🔧 Prérequis Système

### Node.js (Version 20.x)
RedwoodJS nécessite Node.js 20.x pour des raisons de compatibilité avec les déploiements AWS Lambda.

\`\`\`bash
# Vérifier votre version Node.js
node --version
# Doit afficher v20.x.x

# Installation avec nvm (recommandé)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
nvm alias default 20
\`\`\`

### Yarn Package Manager
RedwoodJS utilise Yarn pour la gestion des dépendances et des workspaces.

\`\`\`bash
# Installation Yarn
npm install -g yarn

# Vérification
yarn --version
# Doit afficher 1.22.x ou plus
\`\`\`

### Git (Optionnel mais recommandé)
\`\`\`bash
git --version
# Pour versionner votre code
\`\`\`

## 🚀 Création d'un Projet RedwoodJS

### Méthode 1 : Create RedwoodJS App (Recommandée)
\`\`\`bash
# Création d'un nouveau projet
npx create-redwood-app@latest mon-app --typescript --git --commit

# Options disponibles :
# --typescript : Active TypeScript (recommandé)
# --javascript : Utilise JavaScript uniquement
# --git : Initialise un repository Git
# --commit : Fait le commit initial
# --overwrite : Écrase un dossier existant
\`\`\`

### Méthode 2 : Yarn Create
\`\`\`bash
yarn create redwood-app mon-app --typescript
\`\`\`

### Méthode 3 : Git Clone Template
\`\`\`bash
git clone https://github.com/redwoodjs/redwood mon-app
cd mon-app
yarn install
\`\`\`

## 📁 Architecture du Projet

\`\`\`
mon-app/
├── api/                    # Backend (Node.js + GraphQL)
│   ├── db/
│   │   ├── schema.prisma   # Schéma de base de données
│   │   └── migrations/     # Migrations Prisma
│   ├── src/
│   │   ├── directives/     # Directives GraphQL personnalisées
│   │   ├── functions/      # Fonctions serverless
│   │   │   └── graphql.ts  # Point d'entrée GraphQL
│   │   ├── graphql/        # Schémas GraphQL générés
│   │   ├── lib/            # Utilitaires (db, auth, logger)
│   │   └── services/       # Logique métier
│   └── types/              # Types TypeScript générés
├── web/                    # Frontend (React + Vite)
│   ├── public/             # Assets statiques
│   ├── src/
│   │   ├── components/     # Composants React réutilisables
│   │   ├── layouts/        # Layouts de page
│   │   ├── pages/          # Pages de l'application
│   │   ├── App.tsx         # Composant racine
│   │   ├── Routes.tsx      # Configuration du routage
│   │   └── index.html      # Template HTML
│   └── types/              # Types GraphQL côté client
├── scripts/                # Scripts utilitaires
│   └── seed.ts            # Script de population de données
├── .env                    # Variables d'environnement
├── .env.defaults          # Valeurs par défaut
├── redwood.toml           # Configuration RedwoodJS
└── package.json           # Dépendances du workspace
\`\`\`

## ⚙️ Configuration Détaillée

### redwood.toml
Fichier de configuration principal :

\`\`\`toml
[web]
  title = "Mon App RedwoodJS"
  port = 8910
  apiUrl = "/.redwood/functions"

[api]
  port = 8911
  debugPort = 18911

[browser]
  open = true

[generate]
  tests = true
  stories = true
\`\`\`

### Variables d'Environnement
\`\`\`bash
# .env.defaults (valeurs par défaut)
DATABASE_URL="file:./dev.db"
TEST_DATABASE_URL="file:./.redwood/test.db"
LOG_LEVEL="trace"

# .env (vos valeurs spécifiques)
DATABASE_URL="postgresql://user:password@localhost:5432/myapp"
SESSION_SECRET="super-secret-session-key"
\`\`\`

### Base de Données
RedwoodJS utilise Prisma par défaut avec SQLite :

\`\`\`bash
# Initialiser la base de données
yarn rw prisma migrate dev

# Générer le client Prisma
yarn rw prisma generate

# Ouvrir Prisma Studio (interface graphique)
yarn rw prisma studio
\`\`\`

## 🏃‍♂️ Premiers pas

### Installation et Démarrage
\`\`\`bash
# 1. Naviguer dans le projet
cd mon-app

# 2. Installer les dépendances
yarn install

# 3. Démarrer le serveur de développement
yarn rw dev

# Raccourcis disponibles :
# yarn dev        - Démarre web + api
# yarn rw dev web - Frontend uniquement
# yarn rw dev api - Backend uniquement
\`\`\`

### URLs de Développement
- **Frontend** : http://localhost:8910
- **API GraphQL** : http://localhost:8911/graphql
- **GraphQL Playground** : http://localhost:8911/graphql
- **Fonctions** : http://localhost:8911/hello

## 🛠️ Outils de Développement

### CLI RedwoodJS
\`\`\`bash
# Aide générale
yarn rw --help

# Générer des éléments
yarn rw generate page About
yarn rw generate component Button
yarn rw generate cell Posts
yarn rw generate service Post

# Base de données
yarn rw prisma studio
yarn rw prisma migrate dev

# Tests
yarn rw test
yarn rw test --watch

# Build
yarn rw build
yarn rw build web
yarn rw build api
\`\`\`

### Extensions VS Code Recommandées
\`\`\`json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "Prisma.prisma",
    "GraphQL.vscode-graphql",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode"
  ]
}
\`\`\`

## 🔍 Vérification de l'Installation

### Checklist de Validation
\`\`\`bash
# 1. Versions correctes
node --version    # v20.x.x
yarn --version    # 1.22.x+

# 2. Projet créé
ls -la mon-app/   # api/ web/ scripts/

# 3. Dépendances installées
cd mon-app && yarn install

# 4. Serveurs démarrés
yarn rw dev
# ✅ Web: http://localhost:8910
# ✅ API: http://localhost:8911/graphql

# 5. Page d'accueil accessible
curl http://localhost:8910
# Doit retourner du HTML
\`\`\`

## ⚠️ Résolution des Problèmes Courants

### Erreur de Version Node.js
\`\`\`bash
# Utiliser nvm pour changer de version
nvm use 20
yarn rw dev
\`\`\`

### Ports Occupés
\`\`\`bash
# Modifier redwood.toml
[web]
port = 3000
[api]
port = 3001
\`\`\`

### Problèmes d'Installation
\`\`\`bash
# Nettoyer et réinstaller
rm -rf node_modules
rm -rf web/node_modules  
rm -rf api/node_modules
yarn install
\`\`\`

## 🎯 Prochaine Étape

Maintenant que votre environnement est configuré, nous allons créer vos premiers composants React et explorer l'architecture RedwoodJS !`,
      },
      exercise: {
        title: 'Configuration de votre premier projet',
        instructions:
          'Suivez les étapes pour créer un nouveau projet RedwoodJS',
      },
      quiz: [
        {
          id: '1',
          question:
            'Quelle commande utilise-t-on pour créer un nouveau projet RedwoodJS ?',
          options: [
            'npm create redwood-app',
            'npx create-redwood-app@latest',
            'yarn create redwood',
            'git clone redwood',
          ],
          correctAnswer: 1,
          explanation:
            'La commande npx create-redwood-app@latest permet de créer un nouveau projet avec la dernière version.',
        },
      ],
    },
    components: {
      title: 'Création de composants React',
      description: 'Apprenez à créer des composants React réutilisables',
      theory: {
        title: 'Composants React dans RedwoodJS',
        content: `## 🧩 Composants React dans RedwoodJS

### Philosophie des Composants
RedwoodJS encourage la création de composants réutilisables, testables et documentés. Chaque composant devrait suivre le principe de responsabilité unique.

## 🎯 Types de Composants RedwoodJS

### 1. Composants Traditionnels
Composants React classiques pour l'interface utilisateur :

\`\`\`bash
yarn rw generate component Button
yarn rw generate component Card
yarn rw generate component Modal
\`\`\`

### 2. Cells (Spécifique à RedwoodJS)
Pattern unique pour gérer les données avec états automatiques :

\`\`\`bash
yarn rw generate cell Posts
yarn rw generate cell User
\`\`\`

### 3. Pages
Composants de niveau supérieur liés aux routes :

\`\`\`bash
yarn rw generate page About
yarn rw generate page Contact /contact
\`\`\`

### 4. Layouts
Wrappers pour grouper des pages avec du contenu commun :

\`\`\`bash
yarn rw generate layout Blog
\`\`\`

## 🔧 Génération avec CLI

### Composant de Base
\`\`\`bash
# Génération simple
yarn rw generate component Button

# Avec tests et stories
yarn rw generate component Button --tests --stories

# Dans un sous-dossier
yarn rw generate component ui/Button
\`\`\`

Génère :
\`\`\`
web/src/components/Button/
├── Button.tsx
├── Button.test.tsx
└── Button.stories.tsx
\`\`\`

## 📝 Structure d'un Composant TypeScript

### Composant Simple
\`\`\`tsx
// web/src/components/Button/Button.tsx
import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2'
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <button
      className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]} \${disabled ? 'opacity-50 cursor-not-allowed' : ''}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
\`\`\`

### Composant avec Hooks
\`\`\`tsx
// web/src/components/Counter/Counter.tsx
import { useState } from 'react'

interface CounterProps {
  initialValue?: number
  step?: number
  min?: number
  max?: number
}

const Counter: React.FC<CounterProps> = ({
  initialValue = 0,
  step = 1,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER
}) => {
  const [count, setCount] = useState(initialValue)

  const increment = () => {
    setCount(prev => Math.min(prev + step, max))
  }

  const decrement = () => {
    setCount(prev => Math.max(prev - step, min))
  }

  const reset = () => {
    setCount(initialValue)
  }

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={decrement}
        disabled={count <= min}
        className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
      >
        -
      </button>
      
      <span className="text-xl font-mono min-w-[3ch] text-center">
        {count}
      </span>
      
      <button
        onClick={increment}
        disabled={count >= max}
        className="px-3 py-1 bg-green-500 text-white rounded disabled:opacity-50"
      >
        +
      </button>
      
      <button
        onClick={reset}
        className="px-3 py-1 bg-gray-500 text-white rounded"
      >
        Reset
      </button>
    </div>
  )
}

export default Counter
\`\`\`

## 🔄 Pattern Cells (Unique à RedwoodJS)

### Qu'est-ce qu'une Cell ?
Une Cell est un composant qui encapsule la logique de récupération de données avec gestion automatique des états.

### Structure d'une Cell
\`\`\`bash
yarn rw generate cell Posts
\`\`\`

\`\`\`tsx
// web/src/components/PostsCell/PostsCell.tsx
import type { PostsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

// Requête GraphQL
export const QUERY = gql\`
  query PostsQuery {
    posts {
      id
      title
      body
      createdAt
      author {
        name
      }
    }
  }
\`

// Composant Loading
export const Loading = () => (
  <div className="flex justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
)

// Composant Empty (aucune donnée)
export const Empty = () => (
  <div className="text-center p-8 text-gray-500">
    <p>Aucun post pour le moment.</p>
  </div>
)

// Composant Failure (erreur)
export const Failure = ({ error }: CellFailureProps) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
    <h3 className="text-red-800 font-semibold">Erreur de chargement</h3>
    <p className="text-red-600">{error.message}</p>
  </div>
)

// Composant Success (données chargées)
export const Success = ({ posts }: CellSuccessProps<PostsQuery>) => (
  <div className="space-y-4">
    {posts.map(post => (
      <article key={post.id} className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.body}</p>
        <footer className="text-sm text-gray-500">
          Par {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
        </footer>
      </article>
    ))}
  </div>
)
\`\`\`

### Utilisation d'une Cell
\`\`\`tsx
// web/src/pages/HomePage/HomePage.tsx
import PostsCell from 'src/components/PostsCell'

const HomePage = () => {
  return (
    <div>
      <h1>Mon Blog</h1>
      <PostsCell />
    </div>
  )
}
\`\`\`

## 🎨 Styling et CSS

### TailwindCSS (Recommandé)
\`\`\`bash
yarn rw setup ui tailwindcss
\`\`\`

### CSS Modules
\`\`\`tsx
// Button.module.css
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
}

.primary {
  background-color: theme('colors.blue.600');
  color: white;
}

// Button.tsx
import styles from './Button.module.css'

const Button = ({ variant = 'primary' }) => (
  <button className={\`\${styles.button} \${styles[variant]}\`}>
    Click me
  </button>
)
\`\`\`

### Styled Components
\`\`\`bash
yarn workspace web add styled-components
yarn workspace web add -D @types/styled-components
\`\`\`

\`\`\`tsx
import styled from 'styled-components'

const StyledButton = styled.button<{ variant: string }>\`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  background-color: \${props => props.variant === 'primary' ? '#2563eb' : '#6b7280'};
  color: white;
  
  &:hover {
    opacity: 0.9;
  }
\`
\`\`\`

## 🧪 Tests de Composants

### Test avec Jest et Testing Library
\`\`\`tsx
// Button.test.tsx
import { render, screen, fireEvent } from '@redwoodjs/web/test'
import Button from './Button'

describe('Button', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Button>Click me</Button>)
    }).not.toThrow()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies correct variant classes', () => {
    render(<Button variant="danger">Delete</Button>)
    const button = screen.getByRole('button')
    
    expect(button).toHaveClass('bg-red-600')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Can't click</Button>)
    const button = screen.getByRole('button')
    
    expect(button).toBeDisabled()
    expect(button).toHaveClass('opacity-50')
  })
})
\`\`\`

## 📚 Storybook pour Documentation

### Configuration Storybook
\`\`\`bash
yarn rw storybook
\`\`\`

### Story d'un Composant
\`\`\`tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary'
  }
}

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary'
  }
}

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg'
  }
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true
  }
}
\`\`\`

## 🎯 Bonnes Pratiques

### 1. Structure et Organisation
- Un composant = un dossier
- Index.ts pour les exports propres
- Co-location des tests et stories

### 2. TypeScript
- Interfaces explicites pour les props
- Types génériques pour la réutilisabilité
- Props optionnelles avec valeurs par défaut

### 3. Performance
- React.memo pour éviter les re-renders
- useMemo et useCallback pour les calculs coûteux
- Lazy loading pour les composants lourds

### 4. Accessibilité
- Attributs ARIA appropriés
- Support clavier complet
- Contraste de couleurs conforme

### 5. Tests
- Tests unitaires pour chaque composant
- Tests d'intégration pour les workflows
- Tests visuels avec Storybook

## 🚀 Prochaine Étape

Maintenant que vous maîtrisez les composants, nous allons explorer le routage et la navigation dans RedwoodJS !`,
      },
      exercise: {
        title: 'Créer un composant Button',
        instructions: 'Créez un composant Button réutilisable avec TypeScript',
      },
      quiz: [
        {
          id: '1',
          question: 'Comment génère-t-on un composant avec RedwoodJS CLI ?',
          options: [
            'yarn rw create component',
            'yarn rw generate component',
            'yarn rw make component',
            'yarn rw new component',
          ],
          correctAnswer: 1,
          explanation:
            'La commande "yarn rw generate component" permet de générer un nouveau composant.',
        },
      ],
    },
  }

  const lesson =
    lessonContent[lessonId as keyof typeof lessonContent] || lessonContent.intro

  const tabs = ['📖 Théorie', '💻 Exercice', '🧠 Quiz']

  const canProceedToNext =
    exerciseCompleted && quizScore !== null && quizScore >= 60

  // Logique de navigation
  const currentIndex = lessonOrder.indexOf(lessonId)
  const hasNextLesson = currentIndex < lessonOrder.length - 1
  const nextLessonId = hasNextLesson ? lessonOrder[currentIndex + 1] : null
  const nextLessonTitle = nextLessonId
    ? lessonContent[nextLessonId as keyof typeof lessonContent]?.title
    : null

  const handleNextLesson = () => {
    if (nextLessonId) {
      navigate(`/lesson/${nextLessonId}`)
    }
  }

  const handleTabClick = (index: number) => {
    setCurrentTab(index)
  }

  const handleCompleteExercise = () => {
    setLocalExerciseCompleted(true)
    markExerciseCompleted(lessonId)
  }

  const handleQuizComplete = (score: number) => {
    setLocalQuizScore(score)
    setProgressQuizScore(lessonId, score)
  }

  // État pour le quiz
  const [quizAnswers, setQuizAnswers] = useState<{
    [questionId: string]: number
  }>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Reset quiz state when lesson changes
  useEffect(() => {
    setQuizAnswers({})
    setQuizSubmitted(false)
    setLocalExerciseCompleted(false)
    setLocalQuizScore(null)
  }, [lessonId])

  const handleQuizAnswerSelect = (questionId: string, answerIndex: number) => {
    if (!quizSubmitted) {
      setQuizAnswers((prev) => ({
        ...prev,
        [questionId]: answerIndex,
      }))
    }
  }

  const handleQuizSubmit = () => {
    const totalQuestions = lesson.quiz.length
    const correctAnswers = lesson.quiz.filter(
      (question) => quizAnswers[question.id] === question.correctAnswer
    ).length

    const score = Math.round((correctAnswers / totalQuestions) * 100)
    setQuizSubmitted(true)
    handleQuizComplete(score)
  }

  const canSubmitQuiz = Object.keys(quizAnswers).length === lesson.quiz.length

  const renderTabContent = () => {
    switch (currentTab) {
      case 0: // Théorie
        return (
          <div className="rounded-lg bg-white p-8">
            <h2 className="mb-6 text-2xl font-bold">{lesson.theory.title}</h2>
            <div className="max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="mb-6 mt-8 text-3xl font-bold text-gray-900">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mb-4 mt-8 text-2xl font-semibold text-gray-800">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-800">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 leading-relaxed text-gray-700">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-4 ml-4 list-inside list-disc text-gray-700">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => <li className="mb-2">{children}</li>,
                  code: ({ children, className }) => {
                    const match = /language-(\w+)/.exec(className || '')

                    if (match) {
                      // Bloc de code avec langage spécifié
                      return (
                        <span className="whitespace-pre-wrap bg-transparent font-mono text-sm text-green-400">
                          {children}
                        </span>
                      )
                    } else {
                      // Code inline ou bloc simple
                      const hasNewlines = String(children).includes('\n')

                      if (hasNewlines) {
                        // Bloc de code multiligne
                        return (
                          <span className="block whitespace-pre-wrap bg-transparent font-mono text-sm text-green-400">
                            {children}
                          </span>
                        )
                      } else {
                        // Code inline
                        return (
                          <code className="rounded border-0 bg-gray-100 px-2 py-1 font-mono text-sm text-purple-600">
                            {children}
                          </code>
                        )
                      }
                    }
                  },
                  pre: ({ children }) => (
                    <div className="mb-4 overflow-x-auto rounded-lg border-0 bg-gray-900 p-4">
                      <div className="whitespace-pre-wrap font-mono text-sm text-green-400">
                        {children}
                      </div>
                    </div>
                  ),
                }}
              >
                {lesson.theory.content}
              </ReactMarkdown>
            </div>
          </div>
        )

      case 1: // Exercice
        return (
          <div className="space-y-6">
            <div className="rounded-lg bg-blue-50 p-6">
              <h3 className="mb-3 text-lg font-semibold">💡 Instructions</h3>
              <p className="text-gray-700">{lesson.exercise.instructions}</p>
            </div>

            <div className="rounded-lg bg-gray-800 p-6 text-white">
              <h3 className="mb-4 text-lg font-semibold">Éditeur de Code</h3>
              <textarea
                className="h-48 w-full resize-none rounded border-0 bg-gray-900 p-4 font-mono text-sm text-green-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Écrivez votre code ici..."
                defaultValue={`const WelcomeComponent = () => {
  return (
    <div>
      {/* Ajoutez votre code ici */}
    </div>
  )
}

export default WelcomeComponent`}
              />
              <div className="mt-4 flex space-x-2">
                <button
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  onClick={handleCompleteExercise}
                >
                  Valider l&apos;exercice
                </button>
              </div>
            </div>

            {exerciseCompleted && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="flex items-center">
                  <span className="mr-3 text-green-400">✓</span>
                  <div>
                    <p className="font-medium text-green-800">
                      Exercice terminé !
                    </p>
                    <p className="text-green-700">
                      Excellent ! Vous pouvez maintenant passer au quiz.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case 2: // Quiz
        return (
          <div className="space-y-6">
            <div className="rounded-lg bg-purple-50 p-6">
              <h3 className="mb-3 text-lg font-semibold">
                🧠 Testez vos connaissances
              </h3>
              <p className="text-gray-700">
                Répondez aux questions suivantes pour valider votre
                compréhension de cette leçon.
              </p>
            </div>

            <div className="space-y-4">
              {lesson.quiz.map((question, index) => {
                const selectedAnswer = quizAnswers[question.id]

                return (
                  <div
                    key={question.id}
                    className="rounded-lg border bg-white p-6"
                  >
                    <h4 className="mb-4 font-medium">
                      Question {index + 1}: {question.question}
                    </h4>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isSelected = selectedAnswer === optionIndex
                        const isCorrectOption =
                          optionIndex === question.correctAnswer

                        let buttonClass =
                          'w-full text-left p-3 border rounded transition-colors '

                        if (quizSubmitted) {
                          if (isCorrectOption) {
                            buttonClass +=
                              'border-green-500 bg-green-50 text-green-800'
                          } else if (isSelected && !isCorrectOption) {
                            buttonClass +=
                              'border-red-500 bg-red-50 text-red-800'
                          } else {
                            buttonClass +=
                              'border-gray-200 bg-gray-50 text-gray-500'
                          }
                        } else {
                          if (isSelected) {
                            buttonClass +=
                              'border-blue-500 bg-blue-50 text-blue-800'
                          } else {
                            buttonClass += 'border-gray-200 hover:bg-gray-50'
                          }
                        }

                        return (
                          <button
                            key={optionIndex}
                            className={buttonClass}
                            onClick={() =>
                              handleQuizAnswerSelect(question.id, optionIndex)
                            }
                            disabled={quizSubmitted}
                          >
                            {String.fromCharCode(65 + optionIndex)}. {option}
                            {quizSubmitted && isCorrectOption && (
                              <span className="ml-2 text-green-600">✓</span>
                            )}
                            {quizSubmitted &&
                              isSelected &&
                              !isCorrectOption && (
                                <span className="ml-2 text-red-600">✗</span>
                              )}
                          </button>
                        )
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="mt-4 rounded border border-blue-200 bg-blue-50 p-3">
                        <p className="font-medium text-blue-800">
                          Explication :
                        </p>
                        <p className="text-blue-700">{question.explanation}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {!quizSubmitted && (
              <div className="flex justify-center">
                <button
                  onClick={handleQuizSubmit}
                  disabled={!canSubmitQuiz}
                  className={`rounded-lg px-6 py-3 font-medium ${
                    canSubmitQuiz
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'cursor-not-allowed bg-gray-300 text-gray-500'
                  }`}
                >
                  {canSubmitQuiz
                    ? 'Valider le quiz'
                    : `Répondez aux ${lesson.quiz.length - Object.keys(quizAnswers).length} questions restantes`}
                </button>
              </div>
            )}

            {quizScore !== null && (
              <div
                className={`rounded-lg p-4 ${quizScore >= 60 ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
              >
                <p
                  className={`font-medium ${quizScore >= 60 ? 'text-green-800' : 'text-red-800'}`}
                >
                  Score: {quizScore}%
                </p>
                <p
                  className={`${quizScore >= 60 ? 'text-green-700' : 'text-red-700'}`}
                >
                  {quizScore >= 60
                    ? 'Excellent ! Vous pouvez passer à la leçon suivante.'
                    : 'Réessayez pour obtenir un meilleur score.'}
                </p>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      <MetaTags
        title={`${lesson.title} - Cours RedwoodJS`}
        description={lesson.description}
      />

      <SimpleLayout title={lesson.title}>
        <div className="space-y-6">
          {/* Breadcrumbs */}
          <nav className="flex text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600">
              Accueil
            </Link>
            <span className="mx-2">›</span>
            <span>Leçons</span>
            <span className="mx-2">›</span>
            <span className="text-gray-900">{lesson.title}</span>
          </nav>

          {/* Tabs */}
          <div className="border-b">
            <nav className="flex space-x-8">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  className={`border-b-2 px-1 py-2 text-sm font-medium ${
                    currentTab === index
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div>{renderTabContent()}</div>

          {/* Navigation */}
          <div className="flex items-center justify-between border-t pt-8">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              ← Retour à l&apos;accueil
            </button>

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

            <div className="text-right">
              {canProceedToNext && hasNextLesson && nextLessonTitle && (
                <p className="mb-2 text-sm text-gray-600">
                  Prochaine leçon : {nextLessonTitle}
                </p>
              )}
              <button
                className={`rounded px-4 py-2 ${
                  canProceedToNext && hasNextLesson
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : !hasNextLesson && canProceedToNext
                      ? 'bg-green-600 text-white'
                      : 'cursor-not-allowed bg-gray-300 text-gray-500'
                }`}
                disabled={!canProceedToNext}
                onClick={hasNextLesson ? handleNextLesson : () => navigate('/')}
              >
                {!hasNextLesson && canProceedToNext
                  ? "🎉 Retour à l'accueil"
                  : 'Leçon suivante →'}
              </button>
            </div>
          </div>

          {!canProceedToNext && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="font-medium text-blue-800">
                Terminez tous les exercices
              </p>
              <p className="text-blue-700">
                Vous devez terminer l&apos;exercice pratique et obtenir au moins
                60% au quiz pour passer à la leçon suivante.
              </p>
            </div>
          )}
        </div>
      </SimpleLayout>
    </>
  )
}

export default SimpleLessonPage
