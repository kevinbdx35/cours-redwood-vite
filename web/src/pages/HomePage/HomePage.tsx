import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import SimpleLessonCard from 'src/components/SimpleLessonCard/SimpleLessonCard'
import { useProgress } from 'src/contexts/ProgressContext'
import SimpleLayout from 'src/layouts/SimpleLayout/SimpleLayout'

interface Lesson {
  id: string
  title: string
  description: string
  duration: string
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé'
  completed: boolean
  locked: boolean
}

const HomePage = () => {
  const { isLessonCompleted, getCompletedLessonsCount } = useProgress()

  const lessons: Lesson[] = [
    {
      id: 'intro',
      title: 'Introduction à RedwoodJS',
      description:
        'Découvrez les concepts fondamentaux de RedwoodJS, son architecture full-stack et pourquoi il révolutionne le développement web moderne.',
      duration: '15 min',
      difficulty: 'Débutant',
      completed: false,
      locked: false,
    },
    {
      id: 'setup',
      title: "Configuration de l'environnement",
      description:
        'Installez et configurez votre environnement de développement RedwoodJS : Node.js, Yarn, VS Code, base de données et outils de déploiement.',
      duration: '25 min',
      difficulty: 'Débutant',
      completed: false,
      locked: false,
    },
    {
      id: 'components',
      title: 'Création de composants React',
      description:
        'Maîtrisez la création de composants React avec RedwoodJS : hooks personnalisés, patterns avancés, tests et documentation Storybook.',
      duration: '35 min',
      difficulty: 'Intermédiaire',
      completed: false,
      locked: false,
    },
    {
      id: 'routing',
      title: 'Routage et navigation',
      description:
        "Système de routage RedwoodJS : routes typées, navigation programmatique, guards d'authentification et gestion des layouts.",
      duration: '30 min',
      difficulty: 'Intermédiaire',
      completed: false,
      locked: false,
    },
    {
      id: 'data',
      title: 'Gestion des données avec Prisma',
      description:
        'Découvrez Prisma ORM, la création de schémas de base de données et les opérations CRUD avec GraphQL.',
      duration: '45 min',
      difficulty: 'Intermédiaire',
      completed: false,
      locked: false,
    },
    {
      id: 'auth',
      title: 'Authentification et sécurité',
      description:
        "Implémentez un système d'authentification robuste avec la gestion des utilisateurs et des permissions.",
      duration: '35 min',
      difficulty: 'Avancé',
      completed: false,
      locked: false,
    },
    {
      id: 'deploy',
      title: 'Déploiement et production',
      description:
        "Déployez votre application RedwoodJS en production avec les meilleures pratiques de CI/CD et d'optimisation.",
      duration: '30 min',
      difficulty: 'Avancé',
      completed: false,
      locked: false,
    },
  ]

  const handleStartLesson = (lessonId: string) => {
    // Navigation vers la leçon spécifique
    navigate(`/lesson/${lessonId}`)
  }

  const completedLessons = getCompletedLessonsCount()
  const totalLessons = lessons.length
  const progressPercentage = (completedLessons / totalLessons) * 100

  return (
    <>
      <MetaTags
        title="Cours RedwoodJS & Vite - Accueil"
        description="Apprenez RedwoodJS et Vite avec notre cours interactif pour débutants"
      />

      <SimpleLayout title="Bienvenue dans le cours RedwoodJS & Vite !">
        <div className="space-y-8">
          {/* Introduction */}
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              🚀 Commencez votre aventure avec RedwoodJS
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-gray-700">
              Ce cours interactif vous guidera à travers tous les aspects de
              RedwoodJS et Vite, du niveau débutant aux concepts avancés. Chaque
              leçon combine théorie, pratique et exercices interactifs pour une
              expérience d&apos;apprentissage optimale.
            </p>

            <div className="mb-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="mb-2 text-2xl">⏱️</div>
                <h3 className="font-semibold">Durée totale</h3>
                <p className="text-gray-600">~3.5 heures</p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="mb-2 text-2xl">🎯</div>
                <h3 className="font-semibold">Niveau</h3>
                <p className="text-gray-600">Débutant à Avancé</p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="mb-2 text-2xl">🏆</div>
                <h3 className="font-semibold">Projets</h3>
                <p className="text-gray-600">Application complète</p>
              </div>
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-blue-400">ℹ</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800">
                    Prérequis recommandés
                  </p>
                  <p className="text-sm text-blue-700">
                    Connaissance de base de JavaScript/TypeScript et des
                    concepts React. Node.js et Yarn doivent être installés sur
                    votre machine.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Progression */}
          <div className="rounded-lg border bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Votre progression</h3>
              <span className="text-sm text-gray-600">
                {completedLessons}/{totalLessons} leçons terminées
              </span>
            </div>
            <div className="mb-2 h-3 w-full rounded-full bg-gray-200">
              <div
                className="h-3 rounded-full bg-green-600 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              {progressPercentage.toFixed(0)}% du cours terminé
            </p>
          </div>

          {/* Leçons */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              📚 Modules du cours
            </h2>

            <div className="grid gap-6">
              {lessons.map((lesson) => (
                <SimpleLessonCard
                  key={lesson.id}
                  title={lesson.title}
                  description={lesson.description}
                  duration={lesson.duration}
                  difficulty={lesson.difficulty}
                  completed={isLessonCompleted(lesson.id)}
                  locked={lesson.locked}
                  onStart={() => handleStartLesson(lesson.id)}
                />
              ))}
            </div>
          </div>

          {/* Section défis pratiques */}
          <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-6">
            <h3 className="mb-4 text-xl font-semibold">🏆 Défis Pratiques</h3>
            <p className="mb-4 text-gray-700">
              Prêt à mettre vos compétences à l&apos;épreuve ? Découvrez nos
              défis pratiques pour approfondir votre maîtrise de RedwoodJS avec
              des exercices concrets.
            </p>
            <div className="mb-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-white p-4">
                <h4 className="mb-2 font-medium">🎯 Défis Variés</h4>
                <p className="text-sm text-gray-600">
                  Composants React, hooks personnalisés, routage avancé et plus
                  encore
                </p>
              </div>
              <div className="rounded-lg bg-white p-4">
                <h4 className="mb-2 font-medium">📊 Système de Points</h4>
                <p className="text-sm text-gray-600">
                  Gagnez des points et suivez votre progression à travers les
                  défis
                </p>
              </div>
            </div>
            <Link
              to={routes.challenges()}
              className="inline-block rounded-lg bg-purple-600 px-6 py-2 text-white transition-colors hover:bg-purple-700"
            >
              Découvrir les défis →
            </Link>
          </div>

          {/* Ressources additionnelles */}
          <div className="rounded-lg bg-gray-50 p-6">
            <h3 className="mb-4 text-xl font-semibold">📖 Ressources utiles</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-medium">Documentation officielle</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>
                    •{' '}
                    <a
                      href="https://redwoodjs.com/docs"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      RedwoodJS Docs
                    </a>
                  </li>
                  <li>
                    •{' '}
                    <a
                      href="https://vitejs.dev/"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Vite Documentation
                    </a>
                  </li>
                  <li>
                    •{' '}
                    <a
                      href="https://atlassian.design/"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Atlassian Design System
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-medium">Outils de développement</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• VS Code avec extensions React</li>
                  <li>• RedwoodJS CLI</li>
                  <li>• Prisma Studio</li>
                  <li>• GraphQL Playground</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export default HomePage
