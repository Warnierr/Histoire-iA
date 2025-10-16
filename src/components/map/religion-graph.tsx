'use client';

import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel,
  BackgroundVariant,
  ConnectionMode,
  MarkerType,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { ReligionNode } from './religion-node';
import { GraphControls } from './graph-controls';
import { GraphFilters } from './graph-filters';
import { GraphLegend } from './graph-legend';
import type { Religion } from '@/types/religion';

const nodeTypes = {
  religion: ReligionNode,
};

// Couleurs par type d'influence
const influenceColors: Record<string, string> = {
  DERIVATION: '#3b82f6', // blue
  INSPIRATION: '#8b5cf6', // purple
  SYNCRETISME: '#10b981', // green
  OPPOSITION: '#ef4444', // red
  REFORM: '#f59e0b', // amber
  COEXISTENCE: '#06b6d4', // cyan
  CONFLICT: '#dc2626', // red-600
  ABSORPTION: '#6366f1', // indigo
};

interface ReligionGraphProps {
  religions: Religion[];
  onNodeClick?: (religion: Religion) => void;
}

export function ReligionGraph({ religions, onNodeClick }: ReligionGraphProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Nouveaux états pour les filtres
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const [selectedEpoch, setSelectedEpoch] = useState<string | null>(null);
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);
  
  // Fonction pour filtrer les religions selon les critères
  const getFilteredReligions = useCallback(() => {
    let filtered = [...religions];
    
    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.autonym && r.autonym.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (r.shortName && r.shortName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filtre par familles
    if (selectedFamilies.length > 0) {
      filtered = filtered.filter(r => 
        r.family && selectedFamilies.includes(r.family.toLowerCase())
      );
    }
    
    // Filtre par époque
    if (selectedEpoch) {
      filtered = filtered.filter(r => {
        if (!r.foundedYear) return false;
        const year = r.foundedYear;
        switch (selectedEpoch) {
          case 'ancient': return year < 500;
          case 'medieval': return year >= 500 && year < 1500;
          case 'modern': return year >= 1500 && year < 1900;
          case 'contemporary': return year >= 1900;
          default: return true;
        }
      });
    }
    
    return filtered;
  }, [religions, searchQuery, selectedFamilies, selectedEpoch]);

  // Fonction pour calculer la position des nœuds (layout hiérarchique)
  const calculateHierarchicalLayout = (religions: Religion[]) => {
    // Construire un arbre hiérarchique
    const roots = religions.filter((r) => !r.parentId);
    const nodePositions = new Map<string, { x: number; y: number }>();
    const levelWidths = new Map<number, number>();

    // Calculer récursivement la position de chaque nœud
    const positionNode = (
      religion: Religion,
      level: number,
      xOffset: number
    ): number => {
      const children = religions.filter((r) => r.parentId === religion.id);
      const nodeWidth = 320;
      const levelHeight = 180;

      if (children.length === 0) {
        // Feuille
        nodePositions.set(religion.id, {
          x: xOffset,
          y: level * levelHeight,
        });
        return xOffset + nodeWidth;
      }

      // Positionner les enfants d'abord
      let childXOffset = xOffset;
      const childPositions: number[] = [];

      children.forEach((child) => {
        const childX = positionNode(child, level + 1, childXOffset);
        childPositions.push(childXOffset);
        childXOffset = childX + 100; // Espacement entre branches
      });

      // Centrer le parent au-dessus de ses enfants
      const firstChildX = childPositions[0];
      const lastChildX = childXOffset - nodeWidth - 100;
      const parentX = (firstChildX + lastChildX) / 2;

      nodePositions.set(religion.id, {
        x: parentX,
        y: level * levelHeight,
      });

      return childXOffset;
    };

    // Positionner chaque arbre racine
    let currentXOffset = 0;
    roots.forEach((root) => {
      currentXOffset = positionNode(root, 0, currentXOffset);
      currentXOffset += 200; // Espacement entre les arbres
    });

    return nodePositions;
  };

  // Transformer les religions en nœuds React Flow
  const initializeGraph = useCallback(() => {
    const filteredReligions = getFilteredReligions();
    const positions = calculateHierarchicalLayout(filteredReligions);
    
    // Déterminer quelles religions doivent être visibles
    const visibleReligionIds = new Set(filteredReligions.map(r => r.id));
    
    // En mode focus, ajouter les connexions du nœud focal
    if (focusedNodeId) {
      const focusedReligion = religions.find(r => r.id === focusedNodeId);
      if (focusedReligion) {
        // Ajouter les parents et enfants directs
        if (focusedReligion.parentId) {
          visibleReligionIds.add(focusedReligion.parentId);
        }
        religions.filter(r => r.parentId === focusedNodeId).forEach(r => {
          visibleReligionIds.add(r.id);
        });
      }
    }
    
    const graphNodes: Node[] = religions.map((religion) => {
      const isVisible = visibleReligionIds.has(religion.id);
      const isFocused = focusedNodeId === religion.id;
      const isConnectedToFocus = focusedNodeId && (
        religion.parentId === focusedNodeId || 
        religion.id === religions.find(r => r.id === focusedNodeId)?.parentId
      );
      
      return {
        id: religion.id,
        type: 'religion',
        position: positions.get(religion.id) || { x: 0, y: 0 },
        data: {
          religion,
          isHighlighted: isVisible,
          isFocused,
          isConnected: Boolean(isConnectedToFocus),
        },
        hidden: !isVisible && !focusedNodeId ? true : undefined,
      };
    });

    // Créer les edges depuis les relations parent/enfant
    const graphEdges: Edge[] = [];
    
    religions.forEach((religion) => {
      if (religion.parentId) {
        const parent = religions.find(r => r.id === religion.parentId);
        const edgeColor = parent ? parent.color : '#94a3b8';
        
        const isSourceVisible = visibleReligionIds.has(religion.parentId);
        const isTargetVisible = visibleReligionIds.has(religion.id);
        const isConnectedToFocus: boolean = focusedNodeId !== null && (
          religion.id === focusedNodeId || 
          religion.parentId === focusedNodeId
        );
        
        graphEdges.push({
          id: `parent-${religion.parentId}-${religion.id}`,
          source: religion.parentId,
          target: religion.id,
          type: 'smoothstep',
          animated: isConnectedToFocus,
          style: { 
            stroke: edgeColor, 
            strokeWidth: isConnectedToFocus ? 4 : 3,
            opacity: (!isSourceVisible || !isTargetVisible) && !focusedNodeId ? 0.1 : 0.8
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: edgeColor,
            width: 20,
            height: 20,
          },
          hidden: (!isSourceVisible || !isTargetVisible) && !focusedNodeId ? true : undefined,
        });
      }
    });

    setNodes(graphNodes);
    setEdges(graphEdges);
  }, [religions, selectedCategory, getFilteredReligions, focusedNodeId, setNodes, setEdges]);

  // Initialiser le graphe au montage et quand les dépendances changent
  useEffect(() => {
    initializeGraph();
  }, [initializeGraph]);

  // Gérer le click sur un nœud
  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const religion = religions.find((r) => r.id === node.id);
      
      // Toggle focus mode
      if (focusedNodeId === node.id) {
        setFocusedNodeId(null);
      } else {
        setFocusedNodeId(node.id);
      }
      
      // Aussi appeler le callback parent si fourni
      if (religion && onNodeClick) {
        onNodeClick(religion);
      }
    },
    [religions, onNodeClick, focusedNodeId]
  );
  
  // Handlers pour les filtres
  const handleFamilyToggle = useCallback((family: string) => {
    setSelectedFamilies(prev => 
      prev.includes(family) 
        ? prev.filter(f => f !== family)
        : [...prev, family]
    );
  }, []);
  
  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedFamilies([]);
    setSelectedEpoch(null);
    setFocusedNodeId(null);
    setSelectedCategory(null);
  }, []);

  // Filtrer par catégorie
  const handleCategoryFilter = useCallback(
    (category: string | null) => {
      setSelectedCategory(category);
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          data: {
            ...node.data,
            isHighlighted: category
              ? node.data.religion.category === category
              : true,
          },
        }))
      );
    },
    [setNodes]
  );

  // Reset
  const handleReset = useCallback(() => {
    setSelectedCategory(null);
    initializeGraph();
  }, [initializeGraph]);

  return (
    <div className="w-full h-screen relative bg-slate-50 dark:bg-slate-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        minZoom={0.1}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
        }}
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls showInteractive={false} />
        
        {/* Mini-map pour navigation */}
        <MiniMap 
          nodeColor={(node) => {
            const religion = node.data.religion;
            return religion.color;
          }}
          nodeStrokeWidth={3}
          zoomable
          pannable
          className="!bg-white dark:!bg-slate-800 !border-2 !border-slate-200 dark:!border-slate-700 !rounded-lg"
        />

        {/* Filtres à gauche */}
        <Panel position="top-left" className="m-4 max-w-xs">
          <GraphFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedFamilies={selectedFamilies}
            onFamilyToggle={handleFamilyToggle}
            selectedEpoch={selectedEpoch}
            onEpochChange={setSelectedEpoch}
            focusedNode={focusedNodeId}
            onClearFocus={() => setFocusedNodeId(null)}
            onResetFilters={handleResetFilters}
          />
        </Panel>

        {/* Contrôles catégories à droite (haut) */}
        <Panel position="top-right" className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-4 m-4">
          <GraphControls
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryFilter}
            onReset={handleReset}
            totalReligions={religions.length}
            visibleReligions={getFilteredReligions().length}
          />
        </Panel>

        {/* Légende à droite (bas) */}
        <Panel position="bottom-right" className="m-4">
          <GraphLegend />
        </Panel>

        {/* Statistiques en bas au centre */}
        <Panel position="bottom-center" className="m-4">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-600 dark:text-slate-400">Visible:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {getFilteredReligions().length} / {religions.length}
                </span>
              </div>
              {focusedNodeId && (
                <div className="flex items-center gap-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">Mode Focus</span>
                </div>
              )}
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}

