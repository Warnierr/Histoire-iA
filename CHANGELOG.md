# 📝 Changelog - Histoire iA

Toutes les modifications importantes du projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

---

## [0.2.0] - 2025-10-15

### 🎨 Changements Majeurs
- **Transformation du projet** : "Religious Map" devient "Histoire iA"
- **Vision élargie** : Plateforme multi-thématique d'exploration de l'histoire

### ✨ Ajouts
- Architecture multi-thèmes avec 10 catégories planifiées :
  - 🕉️ Religions & Spiritualités (actif)
  - 🎨 Histoire de l'Art (planifié)
  - 🏛️ Histoire Générale (planifié)
  - 🎵 Histoire de la Musique (planifié)
  - 📖 Histoire de la Littérature (planifié)
  - 🔬 Histoire des Sciences (planifié)
  - 🏗️ Histoire de l'Architecture (planifié)
  - 💭 Histoire de la Philosophie (planifié)
  - 🎬 Histoire du Cinéma (planifié)
  - 🎮 Histoire du Jeu Vidéo (planifié)

- **Nouveau schéma Prisma** (`schema-multi-themes.prisma`) :
  - Entités core partagées (Person, Place, Event, TextWork, Institution, Concept)
  - Modèle Theme pour gérer les catégories
  - Modèle Node générique pour tous les types d'entités historiques
  - UniversalLink pour connexions inter-thématiques

- **Structure thématique** (`src/themes/`) :
  - Fichiers de configuration JSON par thème
  - README documentant l'architecture
  - Configs pour religions, art, history, philosophy

- **Composants React** :
  - `ThemeSelector` pour afficher tous les thèmes disponibles

- **Documentation** :
  - `VISION.md` : Document de vision artistique du projet
  - `CHANGELOG.md` : Suivi des modifications
  - `.env.template` : Template de configuration

### 🔄 Modifications
- Renommage du package : `religious-map` → `histoire-ia`
- Mise à jour de la version : `0.1.0` → `0.2.0`
- Renommage de la base de données : `religious_map` → `histoire_ia`
- Mise à jour du branding dans tous les fichiers
- README.md complètement revu avec nouveaux objectifs

### 📖 Documentation
- Inspirations ajoutées (Inkulinati, InstantMesh 3D, Workshops Art & IA)
- Guide d'architecture multi-thématique
- Design system avec palette de couleurs par thème

---

## [0.1.0] - 2025-10-14

### ✨ Version Initiale - Religious Map

- Infrastructure Next.js 15 + TypeScript
- Configuration Prisma + PostgreSQL avec pgvector
- Schéma BDD avec 8 modèles (Religion, TextChunk, Source, Influence, Event, Place, ChatSession, Message)
- Script de seed avec 20 religions principales
- 17 relations d'influence entre religions
- 5 sources académiques
- 8 chunks de texte pour RAG
- Page d'accueil avec statistiques
- Composants React pour graphe et chat (structure de base)

---

## Format des Entrées

### Types de Changements
- **Ajouts** (`Added`) : Nouvelles fonctionnalités
- **Modifications** (`Changed`) : Changements dans les fonctionnalités existantes
- **Dépréciations** (`Deprecated`) : Fonctionnalités bientôt retirées
- **Suppressions** (`Removed`) : Fonctionnalités retirées
- **Corrections** (`Fixed`) : Corrections de bugs
- **Sécurité** (`Security`) : Vulnérabilités corrigées

---

**Prochaine version prévue** : 0.3.0 (Graphe interactif + Chat IA)

