# 🚀 Guide de Démarrage - Religious Map

## ✅ Prérequis

Avant de commencer, assurez-vous d'avoir :

- ✅ **Node.js 20+** installé
- ✅ **PostgreSQL 16+** installé et lancé
- ✅ **Git** configuré
- ✅ Clés API :
  - OpenRouter API Key
  - OpenAI API Key (pour embeddings)

---

## 📦 Étape 1 : Installation des Dépendances

Ouvrir PowerShell dans le dossier `religious-map` :

```powershell
cd religious-map
npm install
```

Cela va installer toutes les dépendances nécessaires (~5 minutes).

---

## 🗄️ Étape 2 : Configuration PostgreSQL

### 2.1 Créer la Base de Données

Ouvrir `psql` (PostgreSQL) :

```powershell
psql -U postgres
```

Puis exécuter :

```sql
-- Créer la base de données
CREATE DATABASE religious_map;

-- Se connecter
\c religious_map

-- Activer l'extension pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- Vérifier
\dx

-- Quitter
\q
```

### 2.2 Configurer les Variables d'Environnement

Créer un fichier `.env.local` à la racine du projet :

```bash
# Base de données PostgreSQL
DATABASE_URL="postgresql://postgres:votremotdepasse@localhost:5432/religious_map?schema=public"
DIRECT_URL="postgresql://postgres:votremotdepasse@localhost:5432/religious_map?schema=public"

# OpenRouter (pour LLM)
OPENROUTER_API_KEY="sk-or-v1-..."

# OpenAI (pour embeddings uniquement)
OPENAI_API_KEY="sk-..."

# URL du site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Religious Map"
```

**⚠️ Important** : Remplacez `votremotdepasse` par votre mot de passe PostgreSQL !

---

## 🔨 Étape 3 : Prisma - Migrations & Seed

### 3.1 Générer le Client Prisma

```powershell
npm run db:generate
```

### 3.2 Créer les Tables (Migration)

```powershell
npm run db:push
```

Ou pour une migration formelle :

```powershell
npm run db:migrate
```

Si demandé un nom, entrer : `init`

### 3.3 Seed les Données Initiales

```powershell
npm run db:seed
```

Vous devriez voir :

```
🌱 Starting database seed...
📚 Creating sources...
✅ Created 5 sources
🕉️  Creating religions...
✅ Created 20 religions
📝 Creating text chunks for RAG...
✅ Created 8 text chunks
🔗 Creating influences...
✅ Created 17 influences
✅ Seed completed successfully! 🎉
```

---

## 🎨 Étape 4 : Lancer le Serveur de Développement

```powershell
npm run dev
```

Le serveur démarre sur **http://localhost:3000**

Ouvrir dans votre navigateur ! 🎉

---

## 🔍 Étape 5 : Vérifier l'Installation

### Option 1 : Interface Web

Visiter http://localhost:3000

Vous devriez voir :
- 📊 Statistiques (20 religions, 17 influences, 5 sources)
- 📋 Liste des religions principales

### Option 2 : Prisma Studio (Interface BDD)

Ouvrir un nouveau terminal :

```powershell
npm run db:studio
```

Interface graphique de la BDD sur http://localhost:5555

---

## 🛠️ Commandes Utiles

```powershell
# Développement
npm run dev              # Lancer le serveur Next.js

# Base de données
npm run db:studio        # Interface graphique BDD
npm run db:generate      # Générer le client Prisma
npm run db:push          # Appliquer le schéma sans migration
npm run db:migrate       # Créer une migration
npm run db:seed          # Re-seed les données

# Build production
npm run build            # Build pour production
npm run start            # Serveur production local

# Qualité code
npm run lint             # Linter ESLint
```

---

## 🐛 Résolution de Problèmes

### Problème : "relation does not exist"

Solution :
```powershell
npm run db:push
```

### Problème : "pgvector extension not found"

Solution :
```sql
-- Dans psql
\c religious_map
CREATE EXTENSION IF NOT EXISTS vector;
```

### Problème : "Cannot connect to database"

Vérifier que PostgreSQL est lancé :
```powershell
# Vérifier le service
Get-Service postgresql*

# Si arrêté, lancer :
Start-Service postgresql-x64-16
```

### Problème : Erreur de migration Prisma

Reset complet :
```powershell
npm run db:push -- --force-reset
npm run db:seed
```

---

## 📖 Prochaines Étapes

Une fois le projet lancé :

1. **Explorer la page d'accueil** : Liste des religions
2. **Consulter Prisma Studio** : Voir les données
3. **Prochaine phase** : Graphe React Flow interactif
4. **Puis** : Chat IA avec RAG

Référez-vous au `religious_map_project_plan.md` pour la roadmap complète.

---

## 📞 Besoin d'Aide ?

- 📄 **Documentation complète** : `Documentation/Prompt Init/religious_map_project_plan.md`
- 🐛 **Issues** : Vérifier les erreurs dans la console
- 💡 **Stack Overflow** : Rechercher l'erreur exacte

---

**🎉 Félicitations ! Votre projet Religious Map est maintenant opérationnel !**

