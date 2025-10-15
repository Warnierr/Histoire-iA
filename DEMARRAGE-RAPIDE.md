# 🚀 Démarrage Rapide - Religious Map

## ✅ Ce qui est fait

### 1. **Données Mock Complètes** (27 religions)
- ✅ Traditions abrahamiques (Judaïsme, Christianisme, Islam + branches)
- ✅ Traditions dharmiques (Hindouisme, Bouddhisme, Jaïnisme, Sikhisme)
- ✅ Traditions taoïques (Taoïsme, Confucianisme, Shintoïsme)
- ✅ Religions anciennes (Zoroastrisme, Égypte, Gréco-romaine)
- ✅ Mouvements modernes (Bahaïsme, Mormonisme)

### 2. **Graphe Interactif Hiérarchique**
- ✅ Layout en arbre avec embranchements visuels
- ✅ Couleurs personnalisées par religion
- ✅ Connexions animées parent → enfant
- ✅ Filtres par catégorie (ABRAHAMIQUE, DHARMIC, etc.)
- ✅ Effets hover et zoom
- ✅ Nodes cliquables pour voir les détails

### 3. **Chat IA Intégré**
- ✅ Panneau latéral droit avec interface moderne
- ✅ Questions suggérées contextuelles
- ✅ Historique de conversation
- ✅ Prêt pour OpenRouter (à configurer)
- ✅ Bouton toggle pour ouvrir/fermer

### 4. **UI Moderne & Responsive**
- ✅ Design avec Tailwind CSS
- ✅ Animations fluides (hover, scale, transitions)
- ✅ Mode sombre/clair (thème Next.js)
- ✅ Composants shadcn/ui professionnels
- ✅ Header avec badge "Version Démo"

---

## 🌐 Accès à la plateforme

Ouvrez votre navigateur et allez sur :

### **http://localhost:3000**

---

## 🎯 Comment utiliser

### 1. **Explorer le Graphe**
- 🖱️ **Cliquer** sur un nœud → Voir les détails dans le panneau gauche
- 🔍 **Zoom** avec la molette ou les contrôles
- 🎨 **Filtrer** par catégorie avec les boutons en haut à droite
- 🔄 **Reset** pour revenir à la vue initiale

### 2. **Discuter avec l'IA** (à configurer)
- 💬 Le panneau de chat est à droite
- 📝 Pour l'activer, voir section "Configuration" ci-dessous
- ❓ Questions suggérées disponibles

### 3. **Navigation**
- Les religions **racines** sont en haut
- Les **branches** descendent verticalement
- Les **connexions colorées** montrent les liens parent-enfant

---

## ⚙️ Configuration (optionnel pour la démo)

### Option 1 : Chat IA uniquement (sans base de données)

1. **Obtenez une clé OpenRouter** :
   - Allez sur https://openrouter.ai/
   - Créez un compte (gratuit, 10$ de crédits offerts)
   - Copiez votre clé API

2. **Créez un fichier `.env`** :
   ```bash
   cd religious-map
   copy .env.example .env
   ```

3. **Éditez `.env`** et ajoutez votre clé :
   ```env
   OPENROUTER_API_KEY="sk-or-v1-VOTRE_VRAIE_CLE"
   ```

4. **Relancez le serveur** :
   ```bash
   npm run dev
   ```

### Option 2 : Configuration Complète (avec PostgreSQL)

Si vous voulez connecter une vraie base de données :

1. **Démarrez PostgreSQL** :
   ```powershell
   Start-Service postgresql-x64-16
   ```

2. **Créez la base de données** :
   ```sql
   psql -U postgres
   CREATE DATABASE religious_map;
   CREATE EXTENSION IF NOT EXISTS vector;
   \q
   ```

3. **Configurez `.env`** :
   ```env
   DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/religious_map"
   OPENROUTER_API_KEY="sk-or-v1-..."
   OPENAI_API_KEY="sk-..."
   ```

4. **Initialisez Prisma** :
   ```powershell
   npx prisma db push
   npx prisma db seed
   ```

---

## 📁 Structure des fichiers créés

```
religious-map/
├── src/
│   ├── data/
│   │   └── mock-religions.ts          # ✅ 27 religions avec données complètes
│   │
│   ├── components/
│   │   ├── map/
│   │   │   ├── religion-graph.tsx     # ✅ Layout hiérarchique amélioré
│   │   │   ├── religion-node.tsx      # ✅ Nodes colorés et animés
│   │   │   └── religion-map-view.tsx  # ✅ Vue principale avec chat
│   │   │
│   │   └── chat/
│   │       └── chat-interface.tsx     # ✅ Interface de chat IA
│   │
│   └── app/
│       └── page.tsx                   # ✅ Homepage avec données mock
│
├── .env.example                       # ✅ Template de configuration
├── CREATE-ENV-EXAMPLE.bat             # ✅ Script helper
└── DEMARRAGE-RAPIDE.md                # 📖 Ce fichier
```

---

## 🎨 Fonctionnalités Visuelles

### Couleurs par Tradition
- 🔵 **Abrahamique** : Nuances de bleu (Judaïsme), rouge (Christianisme), vert (Islam)
- 🟠 **Dharmique** : Nuances d'orange (Hindouisme, Bouddhisme)
- 🟢 **Taoïque** : Nuances de vert (Taoïsme, Confucianisme)
- 🟡 **Ancien** : Nuances d'ambre et or
- 🟣 **Moderne** : Nuances de rose et magenta

### Animations
- ✨ **Hover sur node** : Scale 105%, shadow accrue
- 🎯 **Filtre actif** : Nodes non-sélectionnés deviennent translucides et flous
- 🔄 **Connexions animées** : Flux parent → enfant
- 💬 **Chat toggle** : Slide-in/out fluide

---

## 🐛 Troubleshooting

### Le serveur ne démarre pas
```powershell
# Tuez les processus node existants
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# Relancez
cd C:\Users\User\Desktop\Projets\THOLOG~1\religious-map
npm run dev
```

### Le graphe est vide
- ✅ C'est normal ! Les données mock se chargent automatiquement
- 🔄 Rechargez la page (F5)
- 🔍 Vérifiez la console du navigateur (F12)

### Le chat ne répond pas
- C'est normal sans la clé OpenRouter !
- Un message d'instructions s'affiche pour vous guider
- Configurez `.env` avec votre clé API

### Erreur de base de données
- ✅ Pas de problème ! L'app fonctionne avec les données mock
- La BDD est optionnelle pour la démo
- Commentez `DATABASE_URL` dans `.env` si besoin

---

## 🚀 Prochaines Étapes

### Immédiat (déjà fait)
- ✅ Graphe interactif fonctionnel
- ✅ 27 religions avec hiérarchie
- ✅ Interface de chat prête
- ✅ UI moderne et responsive

### Court terme (vous pouvez faire)
1. **Ajouter votre clé OpenRouter** → Chat IA fonctionnel
2. **Configurer PostgreSQL** → Données persistantes
3. **Générer embeddings** → RAG pour réponses contextuelles

### Moyen terme (développement)
- 📊 Timeline historique interactive
- 🗺️ Carte géographique des religions
- 🔀 Mode comparaison multi-religions
- 📚 Citations et sources traçables
- 🎨 Export du graphe en image

---

## 📞 Aide & Documentation

- **Plan complet** : `Documentation/Prompt Init/religious_map_project_plan.md`
- **Architecture** : `Documentation/Architecture/`
- **Démarrage rapide** : Ce fichier !

---

## 🎉 Vous êtes prêt !

Votre plateforme **Religious Map** est opérationnelle en mode démo.

**Ouvrez http://localhost:3000 et explorez ! 🗺️✨**

---

*Créé avec ❤️ - Version Démo avec données mock*
*Pour activer toutes les fonctionnalités, configurez `.env`*

