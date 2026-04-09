# Cours Interactif RedwoodJS & Vite

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/W7W61I0YBJ)

Bienvenue dans le cours interactif complet pour apprendre RedwoodJS avec Vite ! Ce projet offre une approche pratique et progressive pour maîtriser le développement web full-stack moderne avec des leçons détaillées, des exercices pratiques et des défis de codage.

## 🎯 Objectifs du Cours

- Maîtriser les fondamentaux et concepts avancés de RedwoodJS
- Apprendre Vite pour un développement ultra-rapide
- Construire des applications web interactives et évolutives
- Implémenter des patterns de design modernes et des bonnes pratiques
- Développer avec TypeScript pour des applications type-safe
- Pratiquer des scénarios réels à travers des défis de codage

## 🚀 Technologies Utilisées

- **RedwoodJS 8.8.0** - Framework React full-stack avec GraphQL
- **Vite** - Outils frontend nouvelle génération pour un développement rapide
- **TypeScript** - Développement JavaScript type-safe
- **React 18** - React moderne avec hooks et fonctionnalités concurrentes
- **Prisma** - ORM nouvelle génération pour la gestion de base de données
- **GraphQL** - Langage de requête API efficace
- **Tailwind CSS** - Framework CSS utility-first

## 📚 Structure du Cours

### Leçons Interactives

1. **Introduction à RedwoodJS** - Fondamentaux du framework et écosystème
2. **Configuration d'Environnement** - Configuration complète de l'environnement de développement
3. **Composants React** - Patterns de composants avancés et hooks
4. **Routage et Navigation** - Routage dynamique et guards d'authentification
5. **Gestion des Données** - Intégration Prisma ORM et GraphQL
6. **Authentification** - Sécurité et gestion des utilisateurs
7. **Déploiement** - Stratégies de déploiement en production

### 🏆 Défis Pratiques

- **Composant Compteur** - Bases de la gestion d'état
- **Liste de Cartes Utilisateur** - Filtrage et tri de données
- **Hook API Personnalisé** - Patterns React avancés
- **Guards de Route** - Authentification et autorisation

### ✨ Fonctionnalités Clés

- 🎮 **Éditeur de Code Interactif** - Pratiquez le codage directement dans le navigateur
- 🧠 **Quiz Complets** - Testez vos connaissances avec des explications détaillées
- 📊 **Suivi de Progression** - Surveillez votre parcours d'apprentissage
- 💡 **Système d'Indices** - Obtenez de l'aide quand vous êtes bloqué
- 🎯 **Points et Badges** - Expérience d'apprentissage gamifiée

## 📋 Prérequis

- Node.js (>=20.0.0 <21.0.0)
- Gestionnaire de paquets Yarn
- Connaissances de base en JavaScript/TypeScript
- Compréhension de base des concepts React

## 🛠️ Démarrage Rapide

1. **Cloner ce dépôt**

   ```bash
   git clone https://github.com/your-username/cours-redwood-vite.git
   cd cours-redwood-vite
   ```

2. **Installer les dépendances**

   ```bash
   yarn install
   ```

3. **Démarrer le serveur de développement**

   ```bash
   yarn rw dev
   ```

4. **Ouvrir votre navigateur**
   Naviguez vers [http://localhost:8910](http://localhost:8910) pour commencer votre parcours d'apprentissage interactif !

## 🎓 Comment Utiliser ce Cours

### Pour Commencer

1. Commencez par la leçon **Introduction à RedwoodJS** pour comprendre le framework
2. Progressez à travers les leçons de manière séquentielle pour une meilleure expérience d'apprentissage
3. Complétez tous les exercices et quiz avant de passer à la leçon suivante
4. Relevez les défis pratiques pour tester vos compétences

### Navigation

- **Page d'Accueil** (`/`) - Aperçu du cours et sélection des leçons
- **Pages de Leçon** (`/lesson/{id}`) - Contenu des leçons individuelles avec théorie, exercices et quiz
- **Défis** (`/challenges`) - Défis de codage pratiques avec difficulté progressive

### Conseils d'Apprentissage

- Lisez attentivement les sections théoriques avant de tenter les exercices
- Utilisez le système d'indices quand vous êtes bloqué sur les défis
- Essayez de comprendre le "pourquoi" derrière chaque concept, pas seulement le "comment"
- Pratiquez régulièrement pour renforcer votre apprentissage

> **Le CLI Redwood**
>
> Félicitations pour avoir exécuté votre première commande CLI Redwood ! Du développement au déploiement, le CLI vous accompagne tout au long du processus. Et vous avez de nombreuses commandes à votre disposition :
>
> ```
> yarn redwood --help
> ```
>
> Pour tous les détails, consultez la [référence CLI](https://redwoodjs.com/docs/cli-commands).

## Prisma et la base de données

Redwood ne serait pas un framework full-stack sans base de données. Tout commence par le schéma. Ouvrez le fichier [`schema.prisma`](api/db/schema.prisma) dans `api/db` et remplacez le modèle `UserExample` par le modèle `Post` suivant :

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  createdAt DateTime @default(now())
}
```

Redwood utilise [Prisma](https://www.prisma.io/), un ORM Node.js et TypeScript nouvelle génération, pour communiquer avec la base de données. Le schéma de Prisma offre une façon déclarative de définir les modèles de données de votre application. Et Prisma [Migrate](https://www.prisma.io/migrate) utilise ce schéma pour rendre les migrations de base de données sans tracas :

```
yarn rw prisma migrate dev

# ...

? Enter a name for the new migration: › create posts
```

> `rw` est l'abréviation de `redwood`

Vous serez invité à saisir le nom de votre migration. `create posts` fera l'affaire.

Maintenant, générons tout ce dont nous avons besoin pour effectuer toutes les actions CRUD (Create, Retrieve, Update, Delete) sur notre modèle `Post` :

```
yarn redwood generate scaffold post
```

Naviguez vers [http://localhost:8910/posts/new](http://localhost:8910/posts/new), remplissez le titre et le corps, puis cliquez sur "Save".

Avons-nous créé un post dans la base de données ? Oui ! Avec `yarn rw generate scaffold <model>`, Redwood a créé toutes les pages, composants et services nécessaires pour effectuer toutes les actions CRUD sur notre table de posts.

## Frontend d'abord avec Storybook

Vous ne savez pas à quoi ressemblent vos modèles de données ? Ce n'est pas grave—Redwood intègre Storybook pour que vous puissiez travailler sur le design sans vous soucier des données. Maquettez, construisez et vérifiez vos composants React, même en isolement complet du backend :

```
yarn rw storybook
```

Vous voyez "Couldn't find any stories" ? C'est parce que vous avez besoin d'un fichier `*.stories.{tsx,jsx}`. Le CLI Redwood facilite la création—essayez de générer une [Cell](https://redwoodjs.com/docs/cells), l'abstraction de récupération de données de Redwood :

```
yarn rw generate cell examplePosts
```

Le serveur Storybook devrait se recharger à chaud et vous aurez maintenant quatre stories avec lesquelles travailler. Elles sembleront probablement un peu fades car il n'y a pas de style. Voyez si la commande `setup ui` du CLI Redwood a votre bibliothèque de style préférée :

```
yarn rw setup ui --help
```

## Tests avec Jest

Il serait difficile de passer d'un projet parallèle à une startup sans quelques tests. Redwood intègre entièrement Jest avec le frontend et le backend, et facilite la couverture complète de votre application en générant des fichiers de test avec tous vos composants et services :

```
yarn rw test
```

Pour rendre l'intégration encore plus transparente, Redwood augmente Jest avec des [scénarios](https://redwoodjs.com/docs/testing#scenarios) de base de données et des [mocks GraphQL](https://redwoodjs.com/docs/testing#mocking-graphql-calls).

## Déploiement

Redwood est conçu à la fois pour les cibles de déploiement serverless comme Netlify et Vercel et les cibles de déploiement serverful comme Render et AWS :

```
yarn rw setup deploy --help
```

Ne mettez pas en ligne sans authentification ! Sécurisez votre application avec le système d'authentification intégré et basé sur base de données de Redwood ([dbAuth](https://redwoodjs.com/docs/authentication#self-hosted-auth-installation-and-setup)), ou intégrez avec près d'une douzaine de fournisseurs d'authentification tiers :

```
yarn rw setup auth --help
```

## 🏗️ Structure du Projet

```
cours-redwood-vite/
├── web/                          # Application React frontend
│   ├── src/
│   │   ├── components/          # Composants React réutilisables
│   │   │   ├── CodeEditor/      # Éditeur de code interactif
│   │   │   ├── QuizComponent/   # Fonctionnalité de quiz
│   │   │   └── LessonCard/      # Cartes d'affichage des leçons
│   │   ├── pages/               # Pages de l'application
│   │   │   ├── HomePage/        # Aperçu du cours
│   │   │   ├── LessonPage/      # Leçons individuelles
│   │   │   └── ChallengesPage/  # Défis de codage
│   │   ├── layouts/             # Layouts de page
│   │   └── contexts/            # Contextes React pour l'état
├── api/                         # API GraphQL backend
│   ├── db/                      # Schéma de base de données et migrations
│   └── src/                     # Logique API et services
└── scripts/                     # Scripts de développement
```

## 🎯 Parcours d'Apprentissage

### Parcours Débutant (1-2 heures)

1. **Introduction à RedwoodJS** - Comprendre la philosophie du framework
2. **Configuration d'Environnement** - Préparer votre environnement de développement
3. **Composants de Base** - Apprendre les fondamentaux des composants React

### Parcours Intermédiaire (2-3 heures)

4. **Composants Avancés** - Maîtriser les hooks et patterns
5. **Routage et Navigation** - Construire des applications multi-pages
6. **Défis Pratiques** - Appliquer vos connaissances

### Parcours Avancé (1-2 heures)

7. **Gestion des Données** - Travailler avec les bases de données et APIs
8. **Authentification** - Sécuriser vos applications
9. **Déploiement** - Livrer en production

## 🤝 Contribution

Ce cours est open source et accueille les contributions ! Voici comment vous pouvez aider :

- 🐛 **Signaler des bugs** - Trouvé un problème ? Faites-le nous savoir !
- 💡 **Suggérer des améliorations** - Avez-vous des idées pour améliorer le contenu ?
- 📝 **Ajouter du contenu** - Créer de nouvelles leçons ou défis
- 🎨 **Améliorer l'UI/UX** - Rendre l'expérience d'apprentissage meilleure

## 📚 Ressources Additionnelles

### Documentation Officielle

- [Documentation RedwoodJS](https://redwoodjs.com/docs)
- [Tutoriel RedwoodJS](https://redwoodjs.com/docs/tutorial/foreword)
- [Documentation Vite](https://vitejs.dev/)

### Communauté

- [Discord RedwoodJS](https://discord.gg/redwoodjs)
- [Forum Communautaire](https://community.redwoodjs.com)
- [Dépôt GitHub](https://github.com/redwoodjs/redwood)

### Rester à Jour

- [Newsletter RedwoodJS](https://redwoodjs.com/newsletter)
- [Twitter @redwoodjs](https://twitter.com/redwoodjs)
- [Chaîne YouTube](https://www.youtube.com/channel/UC28N4mqMIdKOKkOvyNmfpKQ)

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**Bon Apprentissage ! 🚀**

Construit avec ❤️ en utilisant RedwoodJS et Vite
