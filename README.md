# Cours Interactif RedwoodJS & Vite

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/W7W61I0YBJ)
[![CI](https://github.com/kevinbdx35/cours-redwood-vite/actions/workflows/ci.yml/badge.svg)](https://github.com/kevinbdx35/cours-redwood-vite/actions/workflows/ci.yml)

Plateforme d'apprentissage interactive pour maîtriser RedwoodJS avec Vite. Chaque leçon combine théorie, éditeur de code en direct et quiz pour une progression concrète du niveau débutant au niveau avancé.

## Fonctionnalités

- **Éditeur de code interactif** — écrivez et validez votre code directement dans le navigateur
- **Quiz par leçon** — questions à choix multiples avec explications
- **Suivi de progression** — persisté dans `localStorage`, survit aux rechargements de page
- **Défis pratiques** — exercices gamifiés avec système de points et indices progressifs
- **7 leçons** — de l'introduction au déploiement en production

## Stack technique

| Couche    | Technologie                                      |
| --------- | ------------------------------------------------ |
| Framework | RedwoodJS 8.8.0                                  |
| Frontend  | React 18 + Vite + TypeScript                     |
| Backend   | GraphQL (Envelop) + Node.js                      |
| ORM       | Prisma (SQLite en dev, PostgreSQL/MySQL en prod) |
| Styles    | Tailwind CSS 3                                   |
| UI        | Atlaskit (design system Atlassian)               |
| Tests     | Jest + Testing Library                           |
| CI        | GitHub Actions                                   |

## Prérequis

- Node.js 20.x
- Yarn 4.x (`corepack enable`)

## Démarrage rapide

```bash
# Cloner
git clone https://github.com/kevinbdx35/cours-redwood-vite.git
cd cours-redwood-vite

# Installer les dépendances
yarn install

# Initialiser la base de données
yarn rw prisma migrate dev --name init
yarn rw prisma db seed

# Lancer en développement
yarn rw dev
```

Ouvrir [http://localhost:8910](http://localhost:8910).

## Structure du projet

```
cours-redwood-vite/
├── .github/workflows/ci.yml     # CI : lint, typecheck, tests, build
├── .husky/pre-commit            # Hook : lint-staged avant chaque commit
├── api/
│   ├── db/schema.prisma         # Modèles : User, Lesson, LessonProgress, Challenge
│   └── src/
│       ├── directives/          # requireAuth / skipAuth
│       ├── functions/graphql.ts # Point d'entrée GraphQL
│       └── lib/                 # auth, db, logger
├── scripts/seed.ts              # Données initiales (7 leçons)
└── web/src/
    ├── components/
    │   ├── CodeEditor/          # Éditeur + validation + compteur de caractères
    │   ├── QuizComponent/       # Quiz interactif avec score
    │   └── SimpleLessonCard/    # Carte de leçon (états : normal, terminée, verrouillée)
    ├── contexts/
    │   └── ProgressContext.tsx  # État global de progression (persisté en localStorage)
    ├── layouts/                 # SimpleLayout, CourseLayout
    └── pages/
        ├── HomePage/            # Liste des leçons + barre de progression
        ├── SimpleLessonPage/    # Leçon : théorie + exercice + quiz
        └── ChallengesPage/      # Défis pratiques avec indices
```

## Modules du cours

| #   | Leçon                            | Niveau        | Durée  |
| --- | -------------------------------- | ------------- | ------ |
| 1   | Introduction à RedwoodJS         | Débutant      | 15 min |
| 2   | Configuration de l'environnement | Débutant      | 25 min |
| 3   | Création de composants React     | Intermédiaire | 35 min |
| 4   | Routage et navigation            | Intermédiaire | 30 min |
| 5   | Gestion des données avec Prisma  | Intermédiaire | 45 min |
| 6   | Authentification et sécurité     | Avancé        | 35 min |
| 7   | Déploiement et production        | Avancé        | 30 min |

## Défis pratiques

- **Composant Compteur** — `useState`, incrémentation/décrémentation
- **Liste de Cartes Utilisateur** — filtrage et tri de données
- **Hook API Personnalisé** — `useEffect`, gestion loading/error
- **Guards de Route** — `useAuth`, rôles et permissions

## Base de données

Le schéma Prisma définit les modèles suivants :

- `User` — compte utilisateur
- `Lesson` — leçon du cours (id textuel : `"intro"`, `"setup"`, etc.)
- `LessonProgress` — progression d'un utilisateur sur une leçon (exercice + score quiz)
- `Challenge` — défi pratique
- `ChallengeCompletion` — complétion d'un défi par un utilisateur

```bash
# Appliquer les migrations
yarn rw prisma migrate dev

# Remplir avec les données initiales
yarn rw prisma db seed

# Visualiser la base de données
yarn rw prisma studio
```

## Tests

```bash
# Lancer tous les tests
yarn rw test

# Mode watch (développement)
yarn rw test --watch
```

Les tests couvrent :

- `ProgressContext` — logique de complétion, persistance localStorage
- `CodeEditor` — validation d'input, limite de caractères, exécution
- `QuizComponent` — navigation, calcul du score, réinitialisation
- `SimpleLessonCard` — états (normal/terminé/verrouillé), accessibilité
- Directives GraphQL — `requireAuth`, `skipAuth`

## Commandes utiles

```bash
yarn rw dev          # Démarrage dev (frontend + backend)
yarn rw test         # Lancer les tests
yarn rw lint         # Linter ESLint
yarn rw build        # Build de production
yarn rw prisma studio # Interface graphique base de données
yarn rw --help       # Toutes les commandes disponibles
```

## CI / Qualité

À chaque push sur `main` et pull request, GitHub Actions exécute :

1. **Lint & Typecheck** — ESLint + `tsc --noEmit` (web et api)
2. **Tests** — Jest sur toute la codebase
3. **Build** — vérification que la compilation de production passe

Le hook `pre-commit` (Husky + lint-staged) formate automatiquement les fichiers avant chaque commit.

## Déploiement

RedwoodJS supporte plusieurs cibles :

```bash
# Voir les options disponibles
yarn rw setup deploy --help
```

Cibles recommandées : Netlify, Vercel, Render, Fly.io.

En production, pensez à :

- Remplacer SQLite par PostgreSQL (`DATABASE_URL` dans `.env`)
- Configurer un vrai fournisseur d'authentification (`yarn rw setup auth --help`)
- Changer `WEBHOOK_SECRET` par une valeur sécurisée

## Contribution

Les contributions sont bienvenues :

- **Bug** — ouvrir une issue avec les étapes pour reproduire
- **Nouvelle leçon / défi** — PR avec contenu dans `SimpleLessonPage` + données dans `seed.ts`
- **UI/UX** — améliorer l'expérience dans les composants `web/src/components/`

## Ressources

- [Documentation RedwoodJS](https://redwoodjs.com/docs)
- [Tutoriel officiel](https://redwoodjs.com/docs/tutorial/foreword)
- [Documentation Vite](https://vitejs.dev/)
- [Discord RedwoodJS](https://discord.gg/redwoodjs)
- [Forum communautaire](https://community.redwoodjs.com)

## Licence

MIT — voir [LICENSE](LICENSE) pour les détails.

---

Construit avec RedwoodJS et Vite
