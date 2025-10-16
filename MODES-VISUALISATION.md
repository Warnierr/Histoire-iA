# 🎨 Modes de Visualisation - Histoire iA

## 📅 Date : 16 octobre 2025

## 🌟 Vue d'Ensemble

Histoire iA propose **6 modes de visualisation** complémentaires pour explorer les religions du monde sous différents angles. Chaque mode offre une perspective unique et des interactions spécifiques.

---

## 🔵 1. Mode Graphe (Network Graph)

### Description
Visualisation en réseau hiérarchique montrant les relations parent-enfant entre religions.

### Fonctionnalités
- ✅ **Graphe hiérarchique** avec layout automatique
- ✅ **Filtres multi-critères** (famille, époque, recherche)
- ✅ **Mode Focus** (clic sur nœud)
- ✅ **Mini-map** pour navigation
- ✅ **Légende interactive**
- ✅ **Statistiques temps réel**

### Interactions
- 🖱️ **Glisser** : Déplacer la vue
- 🔍 **Molette** : Zoom
- 👆 **Clic** : Activer le mode focus
- 🔎 **Recherche** : Filtrer par nom

### Cas d'Usage
- Explorer les branches d'une religion
- Visualiser les dérivations historiques
- Identifier les familles religieuses

---

## 🟣 2. Mode Timeline

### Description
Chronologie horizontale interactive affichant les religions selon leur date de fondation.

### Fonctionnalités
- ✅ **Axe temporel** de -3000 av. J.-C. à aujourd'hui
- ✅ **Époques colorées** (Antiquité, Moyen Âge, Moderne, Contemporain)
- ✅ **Zoom et pan** pour navigation temporelle
- ✅ **Graduation par siècle**
- ✅ **Tooltip détaillé** au survol

### Interactions
- 🖱️ **Glisser** : Naviguer dans le temps
- 🔍 **Boutons** : Zoom avant/arrière
- 🎯 **Survoler** : Voir les détails
- 👆 **Cliquer** : Ouvrir le panneau détail

### Cas d'Usage
- Comprendre l'évolution historique
- Identifier les périodes d'émergence
- Comparer les âges des religions

### Technique
- Canvas 2D natif
- Responsive et performant
- Animations fluides

---

## 🟢 3. Mode Globe 3D

### Description
Globe terrestre 3D interactif avec points géolocalisés des origines religieuses.

### Fonctionnalités
- ✅ **Projection 3D** avec rotation manuelle ou automatique
- ✅ **Géolocalisation** des lieux de fondation
- ✅ **Taille proportionnelle** au nombre de fidèles
- ✅ **Grille lat/long** pour repères géographiques
- ✅ **Effet glow** au survol
- ✅ **Fond étoilé** immersif

### Interactions
- 🖱️ **Glisser** : Faire pivoter le globe
- 🔍 **Boutons** : Zoom/Dézoom
- 🌍 **Toggle** : Rotation automatique
- 🎯 **Survoler** : Voir la religion

### Cas d'Usage
- Visualiser la distribution géographique
- Identifier les foyers religieux
- Explorer les migrations

### Technique
- Canvas 2D avec projection 3D mathématique
- Rotation en temps réel
- Algorithme de visibilité (back-face culling)

---

## 🟠 4. Mode Matrix (Heatmap)

### Description
Matrice de chaleur montrant les influences croisées entre religions.

### Fonctionnalités
- ✅ **Matrice NxN** (jusqu'à 30 religions)
- ✅ **Codage couleur** par type d'influence
  - 🔵 **Bleu** : Dérivation directe (10/10)
  - 🟣 **Violet** : Influence réciproque (5/10)
  - 🟢 **Vert** : Famille commune (3/10)
  - ⚪ **Gris** : Aucune influence
- ✅ **Filtre par famille**
- ✅ **Tooltip détaillé** au survol
- ✅ **Labels rotatifs** pour lisibilité

### Interactions
- 🎯 **Survoler** : Voir la relation
- 👆 **Cliquer** : Explorer la religion
- 🔽 **Filtres** : Affiner la sélection

### Cas d'Usage
- Analyser les réseaux d'influence
- Identifier les clusters
- Comparer les familles

### Technique
- Grille CSS avec sticky headers
- Calcul d'influence basé sur parentId et famille
- Performance optimisée pour grandes matrices

---

## 🟣 5. Mode Stats (Statistiques)

### Description
Tableaux de bord analytiques avec graphiques et classements.

### Fonctionnalités
- ✅ **4 métriques clés**
  - Total religions
  - Fidèles totaux
  - Année moyenne de fondation
  - Nombre de familles
- ✅ **Graphiques à barres**
  - Répartition par famille
  - Répartition par époque
- ✅ **Top 10**
  - Par nombre de fidèles
  - Par ancienneté
- ✅ **Pourcentages** et visualisations

### Cas d'Usage
- Obtenir une vue d'ensemble
- Comparer les tailles
- Analyser la distribution temporelle

### Design
- Layout responsive en grille
- Cards avec bordures et ombres
- Gradients colorés

---

## 🔮 6. Mode Story (À venir)

### Description
Mode narratif interactif pour explorer l'histoire des religions comme un récit.

### Fonctionnalités Prévues
- 📖 Récits chronologiques
- 🎬 Animations de transition
- 🗺️ Cartes narratives
- 🎯 Parcours guidés
- 🎨 Visuels enrichis

### Statut
🚧 **En développement** - Prochainement disponible

---

## 🎮 Interface Utilisateur

### Navigation Entre Modes

#### Bouton "Modes de Vue"
- 📍 **Position** : Haut gauche
- 🎨 **Style** : Bouton bleu avec icône Layout
- 🖱️ **Action** : Ouvre le sélecteur de modes

#### Sélecteur de Modes
- 📋 **6 options** avec icônes et descriptions
- 🎨 **Couleurs** : Chaque mode a sa couleur
- ✨ **Animation** : Pulse sur le mode actif
- 📝 **Info-bulle** : Description de chaque mode

#### Badge Indicateur
- 📍 **Position** : Bas gauche
- 📊 **Affichage** : Nom du mode actuel
- 🎨 **Style** : Translucide avec backdrop-blur

### Workflow Utilisateur
```
1. Clic sur "Modes de Vue" → Sélecteur s'ouvre
2. Choix d'un mode → Vue change instantanément
3. Interaction avec la visualisation
4. Clic sur une religion → Panneau détail s'ouvre
5. Chat IA disponible en permanence (côté droit)
```

---

## 📁 Architecture Technique

### Composants Créés

```
src/components/map/
├── view-mode-selector.tsx      # Sélecteur de modes
├── timeline-view.tsx            # Timeline canvas
├── globe-view.tsx               # Globe 3D canvas
├── matrix-view.tsx              # Matrice influences
├── stats-view.tsx               # Statistiques
├── religion-graph.tsx           # Graphe (amélioré)
└── religion-map-view.tsx        # Vue principale (modifiée)
```

### Types

```typescript
export type ViewMode = 'graph' | 'timeline' | 'globe' | 'matrix' | 'stats' | 'story';
```

### États React

```typescript
const [viewMode, setViewMode] = useState<ViewMode>('graph');
const [isModeSelectorOpen, setIsModeSelectorOpen] = useState(false);
```

### Rendu Conditionnel

```typescript
const renderView = () => {
  switch (viewMode) {
    case 'graph': return <ReligionGraph ... />;
    case 'timeline': return <TimelineView ... />;
    case 'globe': return <GlobeView ... />;
    case 'matrix': return <MatrixView ... />;
    case 'stats': return <StatsView ... />;
    case 'story': return <ComingSoon />;
  }
};
```

---

## 🎨 Design System

### Couleurs Par Mode

| Mode     | Couleur Primaire | Hex       |
|----------|-----------------|-----------|
| Graph    | Bleu            | `#3b82f6` |
| Timeline | Violet          | `#8b5cf6` |
| Globe    | Vert            | `#10b981` |
| Matrix   | Orange          | `#f59e0b` |
| Stats    | Rose            | `#ec4899` |
| Story    | Indigo          | `#6366f1` |

### Thèmes
- ✅ **Light** : Fond blanc, texte sombre
- ✅ **Dark** : Fond slate-900, texte clair
- 🔄 **Transitions** : 300ms smooth

---

## 🚀 Performance

### Optimisations

#### Timeline & Globe
- **Canvas natif** : Pas de surcharge DOM
- **RequestAnimationFrame** : Animations fluides 60fps
- **Calculs mémoïsés** : Éviter les recalculs

#### Matrix
- **Sticky positioning** : Headers toujours visibles
- **Filtres** : Réduire la taille de la matrice
- **Lazy rendering** : Uniquement les cellules visibles

#### Stats
- **Calculs à la demande** : Pas de re-renders inutiles
- **Tri optimisé** : Algorithmes efficaces

---

## 📱 Responsive

### Breakpoints
- **Mobile** : < 768px
- **Tablet** : 768px - 1024px
- **Desktop** : > 1024px

### Adaptations
- Timeline : Scrolling horizontal sur mobile
- Globe : Contrôles tactiles
- Matrix : Scroll 2D
- Stats : Grille adaptative (1→2→4 colonnes)

---

## 🧪 Tests Recommandés

### Scénarios
1. ✅ Basculer entre tous les modes
2. ✅ Interagir avec chaque visualisation
3. ✅ Cliquer sur une religion dans chaque mode
4. ✅ Tester les filtres (Matrix, Graph)
5. ✅ Zoom et pan (Timeline, Globe)
6. ✅ Thème dark/light sur tous les modes
7. ✅ Responsive mobile/tablet/desktop

---

## 📊 Comparaison des Modes

| Critère        | Graph | Timeline | Globe | Matrix | Stats |
|----------------|-------|----------|-------|--------|-------|
| **Complexité** | ★★★★☆ | ★★★☆☆    | ★★★★☆ | ★★★☆☆  | ★★☆☆☆ |
| **Interactif** | ★★★★★ | ★★★☆☆    | ★★★★☆ | ★★★☆☆  | ★☆☆☆☆ |
| **Visuel**     | ★★★★☆ | ★★★★☆    | ★★★★★ | ★★★☆☆  | ★★★☆☆ |
| **Pédagogique**| ★★★★☆ | ★★★★★    | ★★★★☆ | ★★★☆☆  | ★★★★★ |
| **Performance**| ★★★★☆ | ★★★★★    | ★★★★☆ | ★★★★☆  | ★★★★★ |

---

## 🎯 Recommandations d'Usage

### Pour Découvrir
→ **Graph** ou **Globe**

### Pour Comprendre l'Histoire
→ **Timeline**

### Pour Analyser les Relations
→ **Matrix** ou **Graph**

### Pour les Chiffres
→ **Stats**

### Pour une Expérience Narrative
→ **Story** (bientôt)

---

## 🔮 Évolutions Futures

### Phase 2
- [ ] Mode Story complet
- [ ] Animations de transition entre modes
- [ ] Comparaison côte-à-côte (split screen)
- [ ] Export d'images/vidéos
- [ ] Mode présentation (slides)

### Phase 3
- [ ] WebGL pour le Globe (Three.js)
- [ ] Timeline avec événements historiques
- [ ] Matrix avec forces d'attraction
- [ ] Réalité Augmentée (AR)
- [ ] Visualisation VR

---

**Développé pour Histoire iA**  
*Où le passé prend vie* ✨

**Technologies** : React 19, Next.js 15, Canvas 2D, TypeScript, Tailwind CSS

