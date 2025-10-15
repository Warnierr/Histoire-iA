# 📁 Structure du Projet - Religious Map

> Documentation de l'organisation des fichiers et dossiers

## 📊 État Actuel (Phase 1.2 - Terminée)

```
religious-map/
│
├── 📄 Configuration Racine
│   ├── package.json              ✅ Dépendances configurées
│   ├── tsconfig.json              ✅ TypeScript configuré
│   ├── next.config.js             ✅ Next.js configuré
│   ├── tailwind.config.ts         ✅ Tailwind CSS configuré
│   ├── postcss.config.mjs         ✅ PostCSS configuré
│   ├── .prettierrc                ✅ Prettier configuré
│   ├── .eslintrc.json             ✅ ESLint configuré
│   ├── .gitignore                 ✅ Git ignore complet
│   └── .env.example               ✅ Template environnement
│
├── 📚 Documentation
│   ├── README.md                  ✅ Documentation principale
│   ├── DEMARRAGE.md               ✅ Guide de démarrage
│   └── STRUCTURE.md               ✅ Ce fichier
│
├── 🗄️ prisma/                     Base de données
│   ├── schema.prisma              ✅ Schéma complet (8 modèles)
│   └── seed.ts                    ✅ Script seed (20 religions)
│
├── 💾 src/                        Code source
│   │
│   ├── app/                       ✅ Next.js App Router
│   │   ├── layout.tsx             ✅ Layout principal
│   │   ├── page.tsx               ✅ Page d'accueil
│   │   ├── globals.css            ✅ Styles globaux
│   │   └── api/                   🔜 Routes API (Phase 2)
│   │       ├── chat/
│   │       ├── search/
│   │       ├── religions/
│   │       └── graph/
│   │
│   ├── components/                🔜 Composants React (Phase 1.3+)
│   │   ├── ui/                    🔜 Composants UI (shadcn)
│   │   ├── map/                   🔜 Graphe interactif
│   │   ├── chat/                  🔜 Interface chat IA
│   │   └── panels/                🔜 Panneaux détail
│   │
│   ├── lib/                       ✅ Bibliothèques
│   │   ├── ai/
│   │   │   ├── openrouter.ts      ✅ Client OpenRouter
│   │   │   └── prompts.ts         ✅ System prompts
│   │   ├── db/
│   │   │   └── prisma.ts          ✅ Client Prisma
│   │   └── graph/                 🔜 Construction graphe
│   │
│   ├── types/                     ✅ Types TypeScript
│   │   ├── religion.ts            ✅ Types religions
│   │   └── graph.ts               ✅ Types graphe
│   │
│   ├── hooks/                     🔜 Hooks React (Phase 1.3+)
│   │   ├── use-chat.ts
│   │   ├── use-graph.ts
│   │   └── use-religion-data.ts
│   │
│   └── data/                      ✅ Données
│       └── seed/
│           ├── religions.json     ✅ 20 religions
│           ├── influences.json    ✅ 17 influences
│           └── sources.json       ✅ 5 sources
│
├── 🔧 scripts/                    🔜 Scripts utilitaires (Phase 2+)
│   ├── generate-embeddings.ts
│   ├── import-wikidata.ts
│   └── evaluate-rag.ts
│
└── 🖼️ public/                     🔜 Assets statiques (Phase 1.3+)
    ├── images/
    │   └── religions/
    └── icons/
```

---

## ✅ Fichiers Créés / Modifiés Aujourd'hui

### 🧹 Nettoyage
- ✅ **Supprimé** : `LISEZ-MOI-DABORD.txt` (redondant)
- ✅ **Amélioré** : `.gitignore` (sections organisées, commentaires)
- ✅ **Fusionné** : `README.md` (complet et professionnel)

### 📝 Documentation
- ✅ **Créé** : `.env.example` (template avec tous les paramètres)
- ✅ **Créé** : `STRUCTURE.md` (ce fichier)

### 📁 Dossiers Préparés
- ✅ `src/components/` avec `.gitkeep`
- ✅ `src/hooks/` avec `.gitkeep`
- ✅ `scripts/` avec `.gitkeep`
- ✅ `public/` avec `.gitkeep`

---

## 🎯 Conventions de Nommage

### Fichiers
- **Composants React** : `kebab-case.tsx` (ex: `religion-graph.tsx`)
- **Hooks** : `use-*.ts` (ex: `use-chat.ts`)
- **Types** : `*.ts` (ex: `religion.ts`)
- **Utilitaires** : `*.ts` (ex: `formatting.ts`)
- **Configuration** : `*.config.*` (ex: `next.config.js`)

### Dossiers
- **Pluriel** : `components/`, `types/`, `hooks/`
- **Singulier** : `lib/`, `data/`, `public/`
- **kebab-case** : `app/`, `text-chunk/`

### Code
- **Composants** : `PascalCase` (ex: `ReligionGraph`)
- **Fonctions** : `camelCase` (ex: `getReligions`)
- **Constantes** : `UPPER_SNAKE_CASE` (ex: `API_BASE_URL`)
- **Types/Interfaces** : `PascalCase` (ex: `ReligionData`)
- **Enums** : `PascalCase` (ex: `Category`)

---

## 📦 Dépendances Installées

### Production
```json
{
  "@prisma/client": "^5.22.0",
  "@vercel/postgres": "^0.10.0",
  "ai": "^3.4.33",
  "date-fns": "^4.1.0",
  "framer-motion": "^11.15.0",
  "lucide-react": "^0.468.0",
  "next": "15.5.5",
  "openai": "^4.80.2",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "reactflow": "^11.11.4",
  "sharp": "^0.33.5",
  "zod": "^3.24.1",
  "zustand": "^5.0.2"
}
```

### Développement
```json
{
  "@types/node": "^22.10.5",
  "@types/react": "^19.0.6",
  "@types/react-dom": "^19.0.2",
  "eslint": "^9.17.0",
  "eslint-config-next": "15.5.5",
  "postcss": "^8.4.49",
  "prettier": "^3.4.2",
  "prisma": "^5.22.0",
  "tailwindcss": "^3.4.17",
  "tsx": "^4.19.2",
  "typescript": "^5.7.2"
}
```

---

## 🚀 Prochaines Étapes

### Phase 1.3 - Graphe Interactif (Cette semaine)
1. Installer shadcn/ui
2. Créer composants de base
3. Implémenter `ReligionGraph` avec React Flow
4. Créer nœuds et edges personnalisés
5. Ajouter filtres et contrôles

### Phase 2 - IA & RAG (Semaine 3-4)
1. Routes API `/api/chat`
2. Interface chat
3. Génération embeddings
4. Pipeline RAG complet

---

## 📋 Checklist Git

Avant de faire votre commit, vérifiez :

- ✅ Pas de `.env.local` committé (dans .gitignore)
- ✅ Pas de `node_modules/` committé (dans .gitignore)
- ✅ Pas de `/prisma/migrations/` committé (dans .gitignore)
- ✅ `.env.example` est présent (template public)
- ✅ README.md est à jour
- ✅ package.json est complet
- ✅ Prisma schema est présent
- ✅ Fichiers seed sont présents

### Commandes Git Recommandées

```bash
# Voir l'état
git status

# Ajouter tous les fichiers
git add .

# Commit avec message conventionnel
git commit -m "chore: reorganize project structure and improve documentation"

# Ou plus détaillé
git commit -m "chore: project cleanup and organization

- Remove redundant LISEZ-MOI-DABORD.txt
- Improve and merge README.md with badges and complete info
- Create comprehensive .env.example template
- Enhance .gitignore with organized sections
- Add .gitkeep files for future directories
- Create STRUCTURE.md documentation
"

# Premier push (si nécessaire)
git branch -M main
git remote add origin <votre-repo>
git push -u origin main
```

---

## 🔍 Fichiers Ignorés (`.gitignore`)

Ces fichiers/dossiers NE SONT PAS versionnés :
- `node_modules/`
- `.next/`
- `prisma/migrations/`
- `.env.local`, `.env`
- `*.log`
- `.vscode/`, `.idea/`
- `*.tsbuildinfo`

---

## 💡 Notes Importantes

1. **Variables d'environnement** : Toujours utiliser `.env.local` en local (jamais committé)
2. **Migrations Prisma** : Générées automatiquement, ne pas committer
3. **Node modules** : Toujours réinstaller avec `npm install`
4. **Dossiers vides** : Utiliser `.gitkeep` pour les tracker dans git
5. **Configuration** : Les fichiers `.config.*` sont committés

---

**📅 Dernière mise à jour** : Phase 1.2 - Infrastructure et configuration terminées

**🎯 Prochain objectif** : Phase 1.3 - Graphe interactif React Flow

