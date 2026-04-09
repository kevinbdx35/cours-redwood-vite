import { db } from 'api/src/lib/db'

// Manually apply seeds via the `yarn rw prisma db seed` command.
//
// Seeds automatically run the first time you run the `yarn rw prisma migrate dev`
// command and every time you run the `yarn rw prisma migrate reset` command.
//
// See https://redwoodjs.com/docs/database-seeds for more info

export default async () => {
  try {
    const lessons = [
      {
        id: 'intro',
        title: 'Introduction à RedwoodJS',
        description:
          'Découvrez les concepts fondamentaux de RedwoodJS, son architecture full-stack et pourquoi il révolutionne le développement web moderne.',
        duration: '15 min',
        difficulty: 'Débutant',
        order: 1,
        locked: false,
      },
      {
        id: 'setup',
        title: "Configuration de l'environnement",
        description:
          'Installez et configurez votre environnement de développement RedwoodJS : Node.js, Yarn, VS Code, base de données et outils de déploiement.',
        duration: '25 min',
        difficulty: 'Débutant',
        order: 2,
        locked: false,
      },
      {
        id: 'components',
        title: 'Création de composants React',
        description:
          'Maîtrisez la création de composants React avec RedwoodJS : hooks personnalisés, patterns avancés, tests et documentation Storybook.',
        duration: '35 min',
        difficulty: 'Intermédiaire',
        order: 3,
        locked: false,
      },
      {
        id: 'routing',
        title: 'Routage et navigation',
        description:
          "Système de routage RedwoodJS : routes typées, navigation programmatique, guards d'authentification et gestion des layouts.",
        duration: '30 min',
        difficulty: 'Intermédiaire',
        order: 4,
        locked: false,
      },
      {
        id: 'data',
        title: 'Gestion des données avec Prisma',
        description:
          'Découvrez Prisma ORM, la création de schémas de base de données et les opérations CRUD avec GraphQL.',
        duration: '45 min',
        difficulty: 'Intermédiaire',
        order: 5,
        locked: false,
      },
      {
        id: 'auth',
        title: 'Authentification et sécurité',
        description:
          "Implémentez un système d'authentification robuste avec la gestion des utilisateurs et des permissions.",
        duration: '35 min',
        difficulty: 'Avancé',
        order: 6,
        locked: false,
      },
      {
        id: 'deploy',
        title: 'Déploiement et production',
        description:
          "Déployez votre application RedwoodJS en production avec les meilleures pratiques de CI/CD et d'optimisation.",
        duration: '30 min',
        difficulty: 'Avancé',
        order: 7,
        locked: false,
      },
    ]

    for (const lesson of lessons) {
      await db.lesson.upsert({
        where: { id: lesson.id },
        update: lesson,
        create: lesson,
      })
    }

    console.info(`\n  Seeded ${lessons.length} lessons successfully.\n`)
  } catch (error) {
    console.error(error)
  }
}
