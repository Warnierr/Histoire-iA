# 🚀 Prochaines Étapes - Histoire iA

## ✅ Ce qui est fait (Version 0.2.0)

### Architecture ✅
- [x] Structure multi-thématique créée (`src/themes/`)
- [x] Schéma Prisma multi-thèmes (`prisma/schema-multi-themes.prisma`)
- [x] Configuration pour 4 thèmes (religions, art, history, philosophy)
- [x] Entités core définies (Person, Place, Event, TextWork, Institution, Concept)

### Composants ✅
- [x] `ThemeSelector` : Grille de sélection des thèmes
- [x] Composants existants adaptés (graphe, chat, panels)

### Documentation ✅
- [x] `VISION.md` : Vision artistique du projet
- [x] `CHANGELOG.md` : Suivi des versions
- [x] `TRANSFORMATION.md` : Documentation de la transformation
- [x] `README.md` mis à jour
- [x] `.env.template` créé

### Git ✅
- [x] Dépôt initialisé
- [x] Premier commit réalisé
- [x] Historique propre

---

## 🎯 Actions Immédiates (Cette Semaine)

### 1. Tester l'Application
```bash
cd "c:/Users/User/Desktop/Projets/Histoire iA/religious-map"
npm install
npm run dev
```

### 2. Intégrer ThemeSelector
- [ ] Modifier `src/app/page.tsx`
- [ ] Ajouter le composant `ThemeSelector` sur la page d'accueil
- [ ] Tester la navigation

### 3. Valider le Nouveau Schéma
- [ ] Configurer PostgreSQL
- [ ] Créer la base `histoire_ia`
- [ ] Tester `prisma/schema-multi-themes.prisma`
```bash
# Copier le nouveau schéma
cp prisma/schema-multi-themes.prisma prisma/schema.prisma

# Générer le client Prisma
npm run db:generate

# Créer les tables
npm run db:push
```

### 4. Créer le Fichier .env.local
```bash
# Copier le template
cp .env.template .env.local

# Éditer avec vos clés API
# DATABASE_URL, OPENROUTER_API_KEY, OPENAI_API_KEY
```

---

## 🛠️ Développement Court Terme (2 Semaines)

### Phase 1.3 : Graphe Interactif
- [ ] Adapter `ReligionGraph` pour être générique (`ThemeGraph`)
- [ ] Support multi-thèmes dans le graphe
- [ ] Filtres dynamiques par thème
- [ ] Tests avec données religions existantes

### Phase 1.4 : Chat IA Contextuel
- [ ] Adapter l'interface chat pour multi-thèmes
- [ ] Prompts IA spécialisés par thème (déjà dans configs)
- [ ] RAG avec embedding des nodes
- [ ] Tests de génération de réponses

---

## 🌳 Ajout du Premier Nouveau Thème (Semaines 3-4)

### Recommandation : Commencer par "Histoire de l'Art" 🎨

**Pourquoi ?**
- Visuel et engageant
- Données riches et accessibles
- Bonne complémentarité avec Religions

### Actions

#### 1. Préparer les Données
- [ ] Créer `src/themes/art/data/nodes.json`
  - 20-30 mouvements artistiques
  - De l'art pariétal à l'art contemporain
- [ ] Créer `src/themes/art/data/relations.json`
  - Relations d'influence entre mouvements
- [ ] Créer `src/themes/art/data/sources.json`
  - Sources académiques (livres, encyclopédies)

**Structure Node Art Exemple** :
```json
{
  "slug": "impressionnisme",
  "name": "Impressionnisme",
  "nodeType": "ArtMovement",
  "startYear": 1860,
  "endYear": 1890,
  "location": "France, Paris",
  "description": "Mouvement artistique...",
  "themeData": {
    "keyFigures": [
      {"name": "Claude Monet", "role": "Fondateur"},
      {"name": "Pierre-Auguste Renoir", "role": "Peintre majeur"}
    ],
    "keyWorks": [
      {"title": "Impression, soleil levant", "artist": "Monet", "year": 1872}
    ],
    "characteristics": [
      "Touches visibles",
      "Lumière naturelle",
      "Vie moderne"
    ]
  }
}
```

#### 2. Créer le Script de Seed
- [ ] Créer `prisma/seeds/seed-art.ts`
- [ ] Importer et parser les JSON
- [ ] Créer les nodes et relations dans la BDD
- [ ] Tester l'import

```typescript
// Exemple structure
import { PrismaClient } from '@prisma/client';
import artNodes from '@/themes/art/data/nodes.json';
import artRelations from '@/themes/art/data/relations.json';

const prisma = new PrismaClient();

async function seedArt() {
  // Créer le thème
  const artTheme = await prisma.theme.create({
    data: {
      slug: 'art',
      name: 'Histoire de l\'Art',
      icon: '🎨',
      color: '#FF6B9D',
      // ...
    }
  });

  // Créer les nodes
  for (const node of artNodes) {
    await prisma.node.create({
      data: {
        themeId: artTheme.id,
        slug: node.slug,
        name: node.name,
        // ...
      }
    });
  }

  // Créer les relations
  // ...
}
```

#### 3. Tester et Valider
- [ ] Vérifier l'affichage dans le graphe
- [ ] Tester le chat IA avec contexte Art
- [ ] Valider les filtres

---

## 🔗 Implémenter les Liens Inter-Thématiques (Semaine 5)

### Objectif
Connecter **Religions** et **Art** via des liens universels.

### Exemples de Liens
- Art Byzantin ↔ Christianisme Orthodoxe
- Art Islamique ↔ Islam
- Cathédrales Gothiques ↔ Catholicisme Médiéval
- Iconographie Hindoue ↔ Hindouisme

### Actions
- [ ] Créer `src/themes/cross-references/religion-art.json`
```json
[
  {
    "from": {"theme": "religions", "slug": "christianisme-orthodoxe"},
    "to": {"theme": "art", "slug": "art-byzantin"},
    "linkType": "INFLUENCES",
    "description": "L'art byzantin exprime les valeurs du christianisme orthodoxe",
    "weight": 9
  }
]
```

- [ ] Script d'import des liens universels
- [ ] Affichage visuel dans le graphe (nœuds de différentes couleurs)
- [ ] Panneau "Connexions inter-thèmes" dans le détail

---

## 🎨 Améliorations UX (Semaines 6-8)

### Timeline Interactive Globale
- [ ] Composant `GlobalTimeline`
- [ ] Affichage de tous les événements cross-thèmes
- [ ] Filtres par thème, époque, région
- [ ] Animations de transitions

### Carte Géographique
- [ ] Intégration Mapbox ou Leaflet
- [ ] Points géolocalisés pour events et places
- [ ] Heatmaps par époque
- [ ] Animation temporelle (play button)

### Comparateur Multi-Thèmes
- [ ] Sélection de 2-4 nœuds de thèmes différents
- [ ] Tableau comparatif
- [ ] Visualisation Venn Diagram
- [ ] Export PDF

---

## 📊 Analytics & Métriques (Semaine 9)

### Tracking Basique
- [ ] Nombre de vues par thème
- [ ] Nodes les plus consultés
- [ ] Temps moyen par session
- [ ] Parcours utilisateurs

### Dashboard Admin (optionnel)
- [ ] Statistiques en temps réel
- [ ] Graphiques d'utilisation
- [ ] Logs des questions IA

---

## 🚀 Déploiement (Semaine 10)

### Préparation
- [ ] Optimisation des images (next/image)
- [ ] Lazy loading des composants
- [ ] Tests de performance (Lighthouse)
- [ ] SEO (meta tags, sitemap)

### Vercel
- [ ] Créer compte Vercel
- [ ] Lier le repo GitHub
- [ ] Configurer les variables d'environnement
- [ ] Déployer en production

### Base de Données Production
- [ ] Neon ou Supabase (PostgreSQL serverless)
- [ ] Migration des données
- [ ] Backup automatique

---

## 🎯 Roadmap 6 Mois

### Mois 1-2 : Fondations
- ✅ Architecture multi-thèmes
- 🔜 2 thèmes actifs (Religions, Art)
- 🔜 Liens inter-thèmes
- 🔜 Chat IA fonctionnel

### Mois 3-4 : Expansion
- Ajout de 3 nouveaux thèmes (Histoire, Philosophie, Musique)
- Timeline globale
- Carte interactive
- Galeries d'images

### Mois 5-6 : Enrichissement
- 5 thèmes restants
- Parcours guidés thématiques
- Quiz génératifs IA
- Export PDF enrichis
- Mobile responsive

---

## 💡 Idées Futures

### Fonctionnalités Avancées
- [ ] Mode 3D pour architecture (Three.js)
- [ ] Lecteur audio intégré (musique)
- [ ] Lecteur vidéo (cinéma)
- [ ] Annotations communautaires (modérées)
- [ ] API publique REST

### Gamification
- [ ] Système de points
- [ ] Badges de découverte
- [ ] Défis hebdomadaires
- [ ] Leaderboard

### IA Avancée
- [ ] Génération d'images (Stable Diffusion)
- [ ] Synthèse vocale (TTS) pour narration
- [ ] Quiz adaptatifs
- [ ] Recommandations personnalisées

---

## 📞 Besoin d'Aide ?

### Ressources
- **Documentation Next.js** : https://nextjs.org/docs
- **Documentation Prisma** : https://www.prisma.io/docs
- **Documentation React Flow** : https://reactflow.dev
- **Discord Histoire iA** : (à créer)

### Contact
- GitHub Issues : Pour bugs et suggestions
- Discussions : Pour questions générales

---

## ✅ Checklist de Validation

Avant de passer à la phase suivante, vérifier :

### Phase Actuelle (0.2.0)
- [x] Architecture en place
- [x] Documentation complète
- [x] Git configuré
- [ ] Application démarrable localement
- [ ] Tests manuels réussis

### Prochaine Phase (0.3.0)
- [ ] 2 thèmes actifs (Religions + Art)
- [ ] Graphe interactif fonctionnel
- [ ] Chat IA contextuel
- [ ] Au moins 5 liens inter-thèmes
- [ ] Timeline basique

---

**🎨 Histoire iA - Où le passé prend vie**

*Dernière mise à jour : 15 octobre 2025*

