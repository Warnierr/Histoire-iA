# 🌍 Histoire iA - Plateforme Interactive d'Exploration Historique

> *Où le passé prend vie*

## 🎯 Vue d'Ensemble

**Histoire iA** est une plateforme artistique et pédagogique interactive permettant d'explorer l'histoire des religions à travers **6 modes de visualisation** complémentaires et innovants.

### ✨ Caractéristiques Principales

- 🔵 **6 Modes de Visualisation** (Graph, Timeline, Globe, Matrix, Stats, Story)
- 🤖 **IA Conversationnelle** intégrée (OpenRouter + Claude)
- 🎨 **Dark/Light Mode** sur toute la plateforme
- 📱 **100% Responsive** (Mobile, Tablet, Desktop)
- 🚀 **Performance Optimisée** (Canvas 2D, 60fps)
- 🔍 **150+ Religions** documentées avec hiérarchie complète

---

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js** 18+ 
- **PostgreSQL** 16+ avec extension `pgvector`
- **npm** ou **pnpm**

### Installation

```bash
# 1. Cloner le repository
git clone <votre-repo-url>
cd religious-map

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env.local

# Éditer .env.local avec vos clés:
# - DATABASE_URL (PostgreSQL)
# - OPENROUTER_API_KEY (IA)
# - OPENAI_API_KEY (Embeddings)

# 4. Initialiser la base de données
npm run db:generate  # Générer Prisma Client
npm run db:push      # Créer les tables
npm run db:seed      # Insérer les données

# 5. Générer les embeddings (optionnel pour RAG)
npm run embeddings:generate

# 6. Lancer le serveur de développement
npm run dev
```

### Accès

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## 📁 Structure du Projet

```
religious-map/
├── prisma/
│   ├── schema.prisma           # Schéma base de données
│   └── seed.ts                 # Seed avec 150+ religions
├── src/
│   ├── app/
│   │   ├── page.tsx            # Page d'accueil
│   │   ├── layout.tsx          # Layout global
│   │   └── explore/
│   │       └── religions/
│   │           └── page.tsx    # Vue exploration
│   ├── components/
│   │   ├── map/
│   │   │   ├── religion-graph.tsx         # Mode Graph (Quick Wins)
│   │   │   ├── timeline-view.tsx          # Mode Timeline
│   │   │   ├── globe-view.tsx             # Mode Globe 3D
│   │   │   ├── matrix-view.tsx            # Mode Matrix
│   │   │   ├── stats-view.tsx             # Mode Stats
│   │   │   ├── view-mode-selector.tsx     # Sélecteur de modes
│   │   │   ├── graph-filters.tsx          # Filtres (Quick Wins)
│   │   │   ├── graph-legend.tsx           # Légende (Quick Wins)
│   │   │   └── religion-map-view.tsx      # Vue principale
│   │   ├── chat/
│   │   │   └── chat-interface.tsx         # Chat IA
│   │   ├── panels/
│   │   │   └── religion-detail.tsx        # Panneau détail
│   │   ├── themes/
│   │   │   └── theme-selector.tsx         # Sélecteur thèmes historiques
│   │   ├── theme/
│   │   │   ├── theme-provider.tsx         # Provider Dark/Light
│   │   │   └── theme-toggle.tsx           # Toggle Dark/Light
│   │   └── ui/                            # Composants UI (shadcn)
│   ├── data/
│   │   ├── mock-religions.ts              # Données mock 150+ religions
│   │   └── seed/
│   │       ├── religions.json             # Données pour seed
│   │       ├── influences.json            # Relations
│   │       └── sources.json               # Sources bibliographiques
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── openrouter.ts              # Client OpenRouter
│   │   │   └── prompts.ts                 # Prompts système
│   │   └── db/
│   │       └── prisma.ts                  # Client Prisma
│   └── types/
│       ├── religion.ts                    # Types Religion
│       └── graph.ts                       # Types Graph
├── public/                                # Assets statiques
├── scripts/
│   └── generate-embeddings.ts            # Génération embeddings
├── AMELIORATIONS-GRAPHE.md               # Doc Quick Wins
├── MODES-VISUALISATION.md                # Doc Modes de Visualisation
├── SESSION-2025-10-16-VISUALISATIONS.md  # Récapitulatif session
├── INSPIRATIONS-VISUALISATION.md         # Inspirations design
└── README.md                             # Ce fichier
```

---

## 🎨 Modes de Visualisation

### 🔵 1. Mode Graph (Réseau Hiérarchique)

**Description** : Graphe interactif montrant les relations parent-enfant entre religions.

**Fonctionnalités** :
- 🔍 Recherche intelligente (nom, autonym, shortName)
- 🎯 Filtres par famille (Abrahamique, Dharmique, Taoïque, etc.)
- 📅 Filtres par époque (Antiquité, Moyen Âge, Moderne, Contemporain)
- 💎 Mode Focus (clic sur nœud)
- 🗺️ Mini-map pour navigation
- 📊 Statistiques temps réel

**Technologies** : React Flow 11

---

### 🟣 2. Mode Timeline (Chronologie)

**Description** : Ligne du temps horizontale de -3000 av. J.-C. à aujourd'hui.

**Fonctionnalités** :
- 📆 Axe temporel avec graduations par siècle
- 🎨 Époques colorées en arrière-plan
- 🔍 Zoom et pan fluides
- 💬 Tooltip détaillé au survol
- 👆 Clic pour ouvrir le panneau détail

**Technologies** : Canvas 2D natif, 60fps

---

### 🟢 3. Mode Globe 3D

**Description** : Globe terrestre interactif avec géolocalisation des origines.

**Fonctionnalités** :
- 🌍 Projection 3D mathématique
- 📍 50+ lieux de fondation géolocalisés
- 🔄 Rotation manuelle ou automatique
- 📏 Taille proportionnelle au nombre de fidèles
- ✨ Effet glow au survol

**Technologies** : Canvas 2D avec projection 3D custom, pas de Three.js

---

### 🟠 4. Mode Matrix (Matrice d'Influences)

**Description** : Heatmap montrant les influences croisées entre religions.

**Fonctionnalités** :
- 📊 Matrice NxN (jusqu'à 30 religions)
- 🎨 Codage couleur par type d'influence
- 🔽 Filtre par famille religieuse
- 📌 Sticky headers pour navigation
- 💬 Tooltip avec détails de la relation

**Technologies** : CSS Grid avec position sticky

---

### 🟣 5. Mode Stats (Statistiques)

**Description** : Tableaux de bord analytiques avec graphiques.

**Fonctionnalités** :
- 📈 4 métriques clés (total, fidèles, année, familles)
- 📊 Graphiques à barres (famille, époque)
- 🏆 Top 10 par nombre de fidèles
- 🕰️ Top 10 par ancienneté
- 🎨 Design avec cards et gradients

**Technologies** : CSS Grid responsive

---

### 🔮 6. Mode Story (À venir)

**Description** : Mode narratif interactif (placeholder actuellement).

**Prochainement** : Récits chronologiques, parcours guidés, visuels enrichis.

---

## 🤖 Chat IA Intégré

### Fonctionnalités

- 💬 **Conversation contextuelle** sur les religions
- 🧠 **RAG (Retrieval-Augmented Generation)** avec embeddings
- 📚 **Sources bibliographiques** citées
- 🎯 **Recommandations** personnalisées
- 🔄 **Historique** de conversation

### Modèles Supportés

- Claude 3.5 Sonnet (défaut)
- GPT-4 Turbo
- GPT-3.5 Turbo
- Mixtral
- Llama 3

### Architecture

```
User → Chat Interface
       ↓
OpenRouter API (LLM)
       ↓
OpenAI API (Embeddings ada-002)
       ↓
PostgreSQL + pgvector (Recherche vectorielle)
       ↓
Chunks de texte (sections HISTORY, BELIEFS, etc.)
```

---

## 🎨 Thèmes

### Dark/Light Mode

Basculer entre thème clair et sombre via le bouton en haut à droite.

**Classes Tailwind** : `dark:` préfixe automatique

### Thèmes Historiques (10)

Page d'accueil avec sélecteur de 10 thèmes :

1. 🕉️ **Religions & Spiritualités** (Actif)
2. 🎨 **Art & Architecture**
3. 🏛️ **Histoire & Civilisations**
4. 🤔 **Philosophie & Pensée**
5. 🔬 **Sciences & Découvertes**
6. 📚 **Littérature & Mythes**
7. 🎵 **Musique & Sons**
8. 👤 **Personnages Historiques**
9. ⚔️ **Guerres & Conflits**
10. 🌐 **Géographie & Explorations**

---

## 📊 Base de Données

### Schéma Prisma

```prisma
model Religion {
  id            String
  name          String
  slug          String
  category      Category      // ABRAHAMIQUE, DHARMIC, etc.
  family        String?       // abrahamique, dharmique, etc.
  foundedYear   Int?
  foundedPlace  String?
  followers     BigInt?
  color         String
  parentId      String?       // Relation hiérarchique
  parent        Religion?
  branches      Religion[]
  chunks        TextChunk[]   // Pour RAG
  // ... autres champs
}

model TextChunk {
  id            String
  religionId    String
  content       String
  section       Section       // OVERVIEW, HISTORY, BELIEFS, etc.
  sourceId      String
  // embedding  vector(1536) // pgvector
}

model Influence {
  fromId        String
  toId          String
  type          InfluenceType // DERIVATION, INSPIRATION, etc.
  strength      Int           // 1-10
  // ... autres champs
}
```

### Données Incluses

- **150+ religions** avec hiérarchie complète
- **Familles** : Abrahamique, Dharmique, Taoïque, Indigène, Ancien, Moderne
- **Catégories** : ABRAHAMIQUE, DHARMIC, TAOIC, INDIGENE, MODERNE, ANCIEN
- **Relations** : Parent-enfant, influences, syncrétismes

---

## 🛠️ Stack Technique

### Frontend
- **React 19** avec hooks modernes
- **Next.js 15** (App Router)
- **TypeScript 5.7** (strict mode)
- **Tailwind CSS 3.4** (utility-first)

### Visualisation
- **React Flow 11** (graphe)
- **Canvas 2D** (timeline, globe)
- **CSS Grid** (matrix, stats)
- **Framer Motion 11** (animations)

### Backend
- **Prisma 5** (ORM)
- **PostgreSQL 16** (database)
- **pgvector** (embeddings)

### IA
- **OpenRouter** (LLM gateway)
- **OpenAI** (embeddings ada-002)
- **Vercel AI SDK** (streaming)

### UI
- **shadcn/ui** (composants)
- **Lucide React** (icônes)
- **Radix UI** (primitives)

---

## 📚 Documentation

### Guides Disponibles

- **README.md** : Ce fichier (vue d'ensemble)
- **AMELIORATIONS-GRAPHE.md** : Quick Wins détaillés
- **MODES-VISUALISATION.md** : Guide complet des 6 modes
- **SESSION-2025-10-16-VISUALISATIONS.md** : Récapitulatif session
- **INSPIRATIONS-VISUALISATION.md** : Inspirations design
- **DEMARRAGE-RAPIDE.md** : Installation rapide
- **GIT-COMMIT-GUIDE.md** : Convention commits

---

## 🧪 Scripts Disponibles

```bash
# Développement
npm run dev              # Serveur dev (port 3000)
npm run build            # Build production
npm run start            # Serveur prod
npm run lint             # ESLint

# Base de données
npm run db:generate      # Générer Prisma Client
npm run db:push          # Push schema vers DB
npm run db:migrate       # Migration nommée
npm run db:studio        # Prisma Studio (GUI)
npm run db:seed          # Seed 150+ religions

# IA / Embeddings
npm run embeddings:generate  # Générer embeddings OpenAI
```

---

## 🎯 Roadmap

### ✅ Phase 1 : Quick Wins (Terminé)
- [x] Recherche intelligente
- [x] Filtres multi-critères
- [x] Mode Focus
- [x] Mini-map
- [x] Légende
- [x] Stats temps réel

### ✅ Phase 2 : Modes de Visualisation (Terminé)
- [x] Graph amélioré
- [x] Timeline interactive
- [x] Globe 3D
- [x] Matrix influences
- [x] Stats analytiques
- [ ] Story mode (en cours)

### 🚧 Phase 3 : Fonctionnalités Avancées (Prochain)
- [ ] Mode Story complet
- [ ] Export images/PDF
- [ ] Partage de vues
- [ ] Comparaison côte-à-côte
- [ ] Annotations utilisateur

### 🔮 Phase 4 : Innovations (Futur)
- [ ] WebGL (Three.js) pour Globe
- [ ] Timeline avec événements historiques
- [ ] Graphe de forces pour Matrix
- [ ] Réalité Augmentée (AR)
- [ ] Visualisation VR

---

## 🤝 Contribution

### Guidelines

1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Commiter** vos changements (`git commit -m 'Add AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

### Convention de Commits

Suivre le format [Conventional Commits](https://www.conventionalcommits.org/) :

```
feat: ajout mode timeline interactive
fix: correction zoom globe 3D
docs: mise à jour README
style: formatage code
refactor: optimisation filtres
test: ajout tests unitaires
chore: mise à jour dépendances
```

---

## 📝 Licence

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour détails.

---

## 🙏 Remerciements

### Inspirations

- **Histography** : Timeline interactive
- **Flourish** : Graphiques dynamiques
- **Observable** : Data viz moderne
- **Our World in Data** : Dataviz académique

### Technologies Open Source

Merci aux mainteneurs de :
- React Flow
- Next.js
- Prisma
- Tailwind CSS
- shadcn/ui
- OpenRouter
- Vercel

---

## 📞 Support

### Questions Fréquentes

**Q : Comment ajouter une nouvelle religion ?**  
R : Modifier `src/data/seed/religions.json` et relancer `npm run db:seed`

**Q : Le mode Globe ne s'affiche pas ?**  
R : Vérifier que Canvas 2D est supporté dans votre navigateur

**Q : Comment changer le modèle IA ?**  
R : Modifier `DEFAULT_MODEL` dans `src/lib/ai/openrouter.ts`

**Q : La base de données ne se connecte pas ?**  
R : Vérifier `DATABASE_URL` dans `.env.local` et que PostgreSQL 16+ tourne

### Ressources

- 📖 **Documentation** : Lire les fichiers `.md` du projet
- 🐛 **Issues** : Ouvrir un ticket GitHub
- 💬 **Discussions** : GitHub Discussions
- 📧 **Contact** : [votre-email]

---

## 🌟 Showcase

### Screenshots

*(À ajouter)*

1. Mode Graph avec filtres
2. Timeline chronologique
3. Globe 3D interactif
4. Matrix des influences
5. Statistiques analytiques
6. Chat IA contextuel

### Demo Vidéo

*(À ajouter)*

Vidéo de démonstration complète des 6 modes.

---

## 📈 Statistiques Projet

- **2800+ lignes** de code TypeScript
- **13 composants** de visualisation
- **150+ religions** documentées
- **6 modes** de visualisation
- **10 thèmes** historiques planifiés
- **100%** responsive
- **0 erreur** linting
- **60fps** performance

---

## 🎨 Design System

### Couleurs Primaires

- **Bleu** : `#3b82f6` (Graph)
- **Violet** : `#8b5cf6` (Timeline)
- **Vert** : `#10b981` (Globe)
- **Orange** : `#f59e0b` (Matrix)
- **Rose** : `#ec4899` (Stats)
- **Indigo** : `#6366f1` (Story)

### Typographie

- **Font** : Inter (Google Fonts)
- **Tailles** : xs (10px) → 4xl (36px)
- **Weights** : Regular (400), Medium (500), Semibold (600), Bold (700)

### Espacements

Échelle Tailwind : 0.25rem (1) → 24rem (96)

---

## 🔒 Sécurité

### Variables d'Environnement

**Ne jamais commit** :
- `OPENROUTER_API_KEY`
- `OPENAI_API_KEY`
- `DATABASE_URL`

Utiliser `.env.local` (ignoré par Git)

### Dépendances

Audit régulier : `npm audit`

---

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
# 1. Connecter le repository GitHub
# 2. Ajouter les variables d'environnement
# 3. Deploy automatique sur chaque push
```

### Autres Plateformes

- **Netlify** : Possible avec adaptateur
- **Railway** : PostgreSQL inclus
- **Render** : Docker possible

---

**Développé avec ❤️ pour Histoire iA**  
*Où le passé prend vie* ✨

---

**Dernière mise à jour** : 16 octobre 2025  
**Version** : 0.2.0  
**Status** : Production Ready ✅

