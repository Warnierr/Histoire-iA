# 🎨 Histoire iA

> Plateforme artistique interactive d'exploration de l'histoire à travers multiples thèmes avec assistance IA conversationnelle

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748)](https://www.prisma.io/)

## 📋 Vue d'Ensemble

Histoire iA est une œuvre artistique interactive permettant d'explorer visuellement l'histoire humaine à travers 10 thèmes interconnectés :

- 🗺️ **Graphes interactifs multi-thématiques** : Visualisation des liens entre entités historiques (religions, mouvements artistiques, philosophies, etc.)
- 🤖 **IA conversationnelle contextuelle** : Questions/réponses adaptées à chaque thème avec RAG (Retrieval-Augmented Generation)
- 📅 **Timeline universelle** : Évolution temporelle cross-thématique
- 🔄 **Comparaison inter-thèmes** : Découvrez comment art, philosophie, sciences et religions s'influencent
- 📚 **Sources académiques traçables** : Citations systématiques et vérifiables

### 🌳 Thèmes Disponibles

1. 🕉️ **Religions & Spiritualités** (Actif)
2. 🎨 **Histoire de l'Art** (Planifié)
3. 🏛️ **Histoire Générale** (Planifié)
4. 🎵 **Histoire de la Musique** (Planifié)
5. 📖 **Histoire de la Littérature** (Planifié)
6. 🔬 **Histoire des Sciences** (Planifié)
7. 🏗️ **Histoire de l'Architecture** (Planifié)
8. 💭 **Histoire de la Philosophie** (Planifié)
9. 🎬 **Histoire du Cinéma** (Planifié)
10. 🎮 **Histoire du Jeu Vidéo** (Planifié)

### Principes Fondamentaux

- ✨ **Accessibilité** : Gratuit, open source, multilingue
- 🎯 **Rigueur** : Sources académiques, citations traçables
- 🌈 **Diversité** : Toutes les cultures, toutes les perspectives
- 🎨 **Beauté** : Design soigné, expérience esthétique
- 💡 **Innovation** : IA, visualisation, interactivité

---

## 🚀 Quick Start

### Prérequis

- Node.js ≥ 20.0
- PostgreSQL ≥ 16 avec extension pgvector
- Git
- Clés API :
  - OpenRouter (pour LLM)
  - OpenAI (pour embeddings)

### Installation

```bash
# 1. Cloner le projet (ou naviguer dans le dossier)
cd histoire-ia

# 2. Installer les dépendances
npm install

# 3. Créer le fichier de configuration
cp .env.example .env.local
# Puis éditer .env.local avec vos clés API
```

### Configuration PostgreSQL

```sql
-- Ouvrir psql
psql -U postgres

-- Créer la base de données
CREATE DATABASE histoire_ia;

-- Se connecter
\c histoire_ia

-- Activer pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- Vérifier
\dx

-- Quitter
\q
```

### Configuration Variables d'Environnement

Éditer `.env.local` :

```bash
# Base de données
DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/histoire_ia?schema=public"
DIRECT_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/histoire_ia?schema=public"

# OpenRouter (LLM)
OPENROUTER_API_KEY="sk-or-v1-..."

# OpenAI (embeddings)
OPENAI_API_KEY="sk-..."

# Configuration Next.js
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Histoire iA"
```

### Initialisation Base de Données

```bash
# Générer le client Prisma
npm run db:generate

# Créer les tables
npm run db:push

# Charger les données initiales (20 religions, 17 influences, 5 sources)
npm run db:seed
```

### Lancer le Serveur

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) 🎉

---

## 📚 Stack Technique

### Frontend
- **Next.js 15** - Framework React avec App Router
- **TypeScript 5** - Type safety
- **Tailwind CSS** - Styling utilitaire
- **React Flow 11** - Graphe interactif (MVP)
- **Framer Motion** - Animations
- **Zustand** - État global

### Backend & Base de Données
- **Node.js 20 LTS** - Runtime
- **PostgreSQL 16** - Base de données principale
- **pgvector** - Recherche vectorielle pour RAG
- **Prisma 5** - ORM moderne

### IA & RAG
- **OpenRouter** - Accès multi-modèles LLM (Claude, GPT, etc.)
- **Vercel AI SDK** - Streaming et cache de prompts
- **OpenAI Embeddings** - text-embedding-ada-002
- **LangChain.js** - Orchestration RAG (Phase 2)

### Infrastructure (Production)
- **Vercel** - Hébergement Next.js
- **Neon/Supabase** - PostgreSQL serverless
- **Upstash** - Redis serverless

---

## 📁 Structure du Projet

```
histoire-ia/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Page d'accueil
│   │   └── api/                # API Routes (chat, search, etc.)
│   │
│   ├── components/             # Composants React
│   │   ├── map/                # Graphe interactif
│   │   ├── chat/               # Interface chat IA
│   │   ├── panels/             # Panneaux détail/comparaison
│   │   └── ui/                 # Composants UI (shadcn)
│   │
│   ├── lib/                    # Bibliothèques
│   │   ├── ai/                 # OpenRouter, RAG, prompts
│   │   ├── db/                 # Prisma, queries
│   │   └── graph/              # Construction graphe
│   │
│   ├── types/                  # Types TypeScript
│   │   ├── religion.ts
│   │   ├── graph.ts
│   │   └── database.ts
│   │
│   ├── hooks/                  # Hooks React personnalisés
│   └── data/seed/              # Données de seed (JSON)
│
├── prisma/
│   ├── schema.prisma           # Schéma base de données
│   ├── seed.ts                 # Script de seed
│   └── migrations/             # Migrations (git-ignorées)
│
├── scripts/                    # Scripts utilitaires
│   ├── generate-embeddings.ts # Génération embeddings
│   └── evaluate-rag.ts         # Évaluation qualité RAG
│
├── public/                     # Assets statiques
│   ├── images/
│   └── icons/
│
└── Documentation/              # Documentation projet
    └── Prompt Init/
        └── religious_map_project_plan.md
```

---

## 🗄️ Modèle de Données

### Entités Principales

- **Religion** : Informations complètes (nom, catégorie, démographie, relations)
- **TextChunk** : Chunks de texte pour RAG avec embeddings vectoriels
- **Source** : Sources académiques avec métadonnées de qualité
- **Influence** : Relations d'influence entre religions (dérivation, inspiration, etc.)
- **Event** : Événements historiques majeurs
- **Place** : Lieux géographiques avec coordonnées
- **ChatSession** / **Message** : Historique conversations IA

### Catégories de Religions

- `ABRAHAMIQUE` : Judaïsme, Christianisme, Islam
- `DHARMIC` : Hindouisme, Bouddhisme, Jaïnisme, Sikhisme
- `TAOIC` : Taoïsme, Confucianisme, Shinto
- `INDIGENE` : Religions autochtones
- `MODERNE` : Nouveaux mouvements religieux
- `ANCIEN` : Religions antiques (égyptienne, grecque, etc.)
- `PHILOSOPHIQUE` : Stoïcisme, Épicurisme, etc.
- `SYNCHRETIQUE` : Syncrétismes modernes

---

## 🛠️ Commandes Utiles

```bash
# Développement
npm run dev              # Lancer Next.js (http://localhost:3000)
npm run build            # Build production
npm run start            # Serveur production local
npm run lint             # ESLint

# Base de données
npm run db:generate      # Générer client Prisma
npm run db:push          # Appliquer schéma sans migration
npm run db:migrate       # Créer migration formelle
npm run db:seed          # (Re)charger données initiales
npm run db:studio        # Interface graphique BDD (http://localhost:5555)

# Scripts avancés (Phase 2+)
npm run embeddings:generate  # Générer embeddings pour RAG
```

---

## 🎯 Roadmap

### ✅ Phase 1.1 : Setup & Infrastructure (Terminé)
- [x] Initialisation Next.js 15 + TypeScript
- [x] Configuration Prisma + PostgreSQL
- [x] Schéma BDD complet avec pgvector
- [x] Script de seed avec 20 religions

### ✅ Phase 1.2 : Données & Configuration (Terminé)
- [x] 20 religions principales
- [x] 17 relations d'influence
- [x] 5 sources académiques
- [x] 8 chunks de texte pour RAG
- [x] Page d'accueil avec statistiques

### 🔜 Phase 1.3 : Graphe Interactif (Semaine 2)
- [ ] Composant ReligionGraph avec React Flow
- [ ] Nœuds personnalisés (cartes religion)
- [ ] Edges animés (influences)
- [ ] Filtres (catégorie, époque, famille)
- [ ] Interactivité (click, hover, zoom)

### 🔜 Phase 2 : Intégration IA & RAG (Semaines 3-4)
- [ ] Client OpenRouter
- [ ] Interface chat
- [ ] Génération embeddings
- [ ] Recherche vectorielle pgvector
- [ ] Pipeline RAG complet
- [ ] Citations de sources

### 🔜 Phase 3 : Features Avancées (Semaines 5-6)
- [ ] Timeline historique
- [ ] Comparaison multi-religions
- [ ] Guardrails éthiques
- [ ] Export PDF
- [ ] Carte géographique

### 🔮 Phase 4+ : Production & Évolution
- [ ] Optimisation performance
- [ ] SEO complet
- [ ] Tests E2E (Playwright)
- [ ] Déploiement Vercel
- [ ] RAG hybride (BM25 + Vector)
- [ ] Neo4j pour graphe avancé
- [ ] Authentification utilisateurs

---

## 📖 Documentation

- **Guide de démarrage détaillé** : `DEMARRAGE.md`
- **Plan complet du projet** : `Documentation/Prompt Init/religious_map_project_plan.md`
- **Documentation Prisma** : [prisma.io/docs](https://www.prisma.io/docs)
- **Documentation Next.js 15** : [nextjs.org/docs](https://nextjs.org/docs)
- **Documentation React Flow** : [reactflow.dev](https://reactflow.dev/)

---

## 🐛 Résolution de Problèmes

### "relation does not exist"
```bash
npm run db:push
```

### "pgvector extension not found"
```sql
\c religious_map
CREATE EXTENSION IF NOT EXISTS vector;
```

### "Cannot connect to database"
```bash
# Windows PowerShell
Get-Service postgresql*
Start-Service postgresql-x64-16
```

### Erreur de migration Prisma
```bash
npm run db:push -- --force-reset
npm run db:seed
```

---

## 🤝 Contribution

Projet en développement actif. Contributions bienvenues !

### Guidelines
- Code en TypeScript strict
- Commits conventionnels (`feat:`, `fix:`, `docs:`, etc.)
- Tests pour nouvelles fonctionnalités
- Respect de la neutralité religieuse

---

## 📄 Licence

MIT © 2025

---

## 🎉 État Actuel du Projet

**Version** : 0.1.0 (MVP en développement)

**Ce qui fonctionne** :
- ✅ Infrastructure complète Next.js + PostgreSQL
- ✅ Schéma BDD avec 8 modèles
- ✅ 20 religions avec relations
- ✅ Page d'accueil avec statistiques

**Prochaine étape** : Graphe interactif React Flow (Phase 1.3)

---

**🚀 Prêt à explorer les religions du monde ! Pour démarrer, voir [DEMARRAGE.md](./DEMARRAGE.md)**
