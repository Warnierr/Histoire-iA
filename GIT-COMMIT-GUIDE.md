# 📝 Guide pour Commit Git

> Instructions pour committer le travail d'aujourd'hui

---

## 🎯 Résumé du Travail

**Date** : 15 Octobre 2025  
**Phases complétées** : 1.2 (Organisation) + 1.3 (Graphe Interactif)

### Changements Majeurs
1. ✅ Nettoyage et organisation du projet
2. ✅ Documentation complète (README, STRUCTURE, guides)
3. ✅ Implémentation du graphe interactif avec React Flow
4. ✅ 9 nouveaux composants React
5. ✅ Interface utilisateur complète

---

## 📋 Fichiers à Vérifier Avant Commit

### ⚠️ NE PAS COMMITTER
- ❌ `.env.local` (secrets)
- ❌ `node_modules/` (dépendances)
- ❌ `.next/` (build)
- ❌ `prisma/migrations/` (généré)

### ✅ À COMMITTER
- ✅ Tous les fichiers source `src/`
- ✅ Configuration (package.json, tsconfig, tailwind, etc.)
- ✅ Documentation (README, DEMARRAGE, STRUCTURE, etc.)
- ✅ `.gitignore`
- ✅ `.env.example`
- ✅ `prisma/schema.prisma`
- ✅ `prisma/seed.ts`
- ✅ `src/data/seed/*.json`

---

## 🚀 Commandes Git Recommandées

### Option 1 : Un Seul Commit (Simple)

```bash
cd religious-map

# Vérifier l'état
git status

# Voir les changements
git diff

# Ajouter tous les fichiers
git add .

# Commit avec message descriptif
git commit -m "feat: implement interactive religion graph (Phase 1.2-1.3)

Major changes:
- Clean and organize project structure
- Add comprehensive documentation (README, guides)
- Install shadcn/ui components (Button, Card, Badge, Sheet)
- Implement ReligionGraph with React Flow
- Add ReligionNode custom nodes with categories
- Add GraphControls with category filtering
- Add ReligionDetailPanel (Sheet) on node click
- Update homepage with full-screen graph
- Add animated edges for parent-child relationships
- Add responsive design and dark mode support

Components created: 9
Documentation files: 5
Lines of code: ~1800

Phase 1.3 complete ✅"
```

### Option 2 : Deux Commits (Organisé)

#### Commit 1 : Organisation

```bash
# Ajouter seulement les fichiers de documentation/nettoyage
git add README.md DEMARRAGE.md STRUCTURE.md .gitignore .env.example SESSION-2025-10-15.md PHASE-1.3-COMPLETE.md

git commit -m "chore: clean and organize project structure (Phase 1.2)

- Remove redundant LISEZ-MOI-DABORD.txt
- Improve README.md with badges and complete documentation
- Create comprehensive .gitignore with organized sections
- Add .env.example template with all variables
- Create STRUCTURE.md for project organization
- Prepare directories for future phases (components, hooks, scripts)

Documentation complete ✅"
```

#### Commit 2 : Graphe Interactif

```bash
# Ajouter tout le reste
git add .

git commit -m "feat: add interactive graph with React Flow (Phase 1.3)

- Install shadcn/ui and configure components.json
- Create UI components: Button, Card, Badge, Sheet
- Implement ReligionGraph with React Flow
- Create ReligionNode custom component with category colors
- Add GraphControls with 8-category filtering
- Create ReligionDetailPanel (Sheet) for node details
- Add ReligionMapView orchestrator component
- Update homepage with full-screen graph
- Add animated edges for parent-child relationships
- Implement highlight/dimming based on filters
- Add zoom, pan, and fit-view controls

Components: 9 created
Features: 12 implemented  
No linter errors ✅

Phase 1.3 complete ✅"
```

---

## 📊 Vérifications Avant Push

### Checklist
- [ ] `git status` montre les bons fichiers
- [ ] Pas de `.env.local` dans le commit
- [ ] Pas de `node_modules/` dans le commit
- [ ] `package.json` à jour avec toutes les dépendances
- [ ] README.md est complet
- [ ] Pas d'erreurs TypeScript (`npm run lint`)
- [ ] Le projet compile (tester avec `npm run dev`)

### Tester le Projet
```bash
# Vérifier que tout fonctionne
npm run dev

# Ouvrir http://localhost:3000
# ✅ Le graphe s'affiche
# ✅ Les filtres fonctionnent
# ✅ Le panneau détail s'ouvre au click
```

---

## 🔄 Si Premier Commit du Projet

### Initialiser Git

```bash
cd religious-map

# Initialiser le repo
git init

# Configurer la branche principale
git branch -M main

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "feat: initial commit - Religious Map MVP

Complete Next.js 15 application with:
- Project infrastructure and configuration
- PostgreSQL + Prisma database with 8 models
- 20 religions seed data with relationships
- Interactive graph with React Flow
- shadcn/ui components
- Category filtering and detail panel
- Comprehensive documentation

Phases completed: 1.1, 1.2, 1.3 ✅"

# Ajouter le remote (si vous avez créé un repo GitHub)
git remote add origin https://github.com/VOTRE-USERNAME/religious-map.git

# Push initial
git push -u origin main
```

---

## 📌 Branches Recommandées (Optionnel)

Si vous voulez travailler avec des branches :

```bash
# Créer une branche pour Phase 2
git checkout -b phase-2-ai-integration

# Ou rester sur main pour MVP
git checkout main
```

---

## 🎯 Après le Commit

### Documentation à Jour
- ✅ README.md complet
- ✅ DEMARRAGE.md avec instructions
- ✅ STRUCTURE.md avec organisation
- ✅ SESSION-2025-10-15.md avec résumé
- ✅ PHASE-1.3-COMPLETE.md avec détails

### Prêt pour la Suite
- ✅ Structure propre
- ✅ Graphe fonctionnel
- ✅ Code organisé
- ✅ Documentation complète
- ✅ Prêt pour Phase 2 (IA & RAG)

---

## 💡 Conseils

### Messages de Commit
Suivez le format **Conventional Commits** :

- `feat:` - Nouvelle fonctionnalité
- `fix:` - Correction de bug
- `docs:` - Documentation
- `style:` - Formatage, pas de changement de code
- `refactor:` - Refactoring
- `test:` - Ajout de tests
- `chore:` - Maintenance (build, config, etc.)

### Exemple de Message Structuré
```
feat: add user authentication

- Add login/logout functionality
- Implement JWT tokens
- Create protected routes
- Add user session management

Closes #123
```

---

## 🎉 C'est Prêt !

Votre projet est maintenant :
- ✅ Propre et organisé
- ✅ Bien documenté
- ✅ Prêt pour git
- ✅ Prêt pour le déploiement
- ✅ Prêt pour la Phase 2

**Bonne continuation ! 🚀**

---

**📅 Date** : 15 Octobre 2025  
**Phase** : 1.3 Complete  
**Statut** : Ready for commit ✅

