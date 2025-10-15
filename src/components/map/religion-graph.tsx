'use client';

import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
  BackgroundVariant,
  ConnectionMode,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { ReligionNode } from './religion-node';
import { GraphControls } from './graph-controls';
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
    const positions = calculateHierarchicalLayout(religions);
    
    const graphNodes: Node[] = religions.map((religion) => ({
      id: religion.id,
      type: 'religion',
      position: positions.get(religion.id) || { x: 0, y: 0 },
      data: {
        religion,
        isHighlighted: selectedCategory
          ? religion.category === selectedCategory
          : true,
      },
    }));

    // Créer les edges depuis les relations parent/enfant
    const graphEdges: Edge[] = [];
    
    religions.forEach((religion) => {
      if (religion.parentId) {
        const parent = religions.find(r => r.id === religion.parentId);
        const edgeColor = parent ? parent.color : '#94a3b8';
        
        graphEdges.push({
          id: `parent-${religion.parentId}-${religion.id}`,
          source: religion.parentId,
          target: religion.id,
          type: 'smoothstep',
          animated: true,
          style: { 
            stroke: edgeColor, 
            strokeWidth: 3,
            opacity: selectedCategory && 
                     (religion.category !== selectedCategory || 
                      parent?.category !== selectedCategory) 
                     ? 0.2 : 0.8
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: edgeColor,
            width: 20,
            height: 20,
          },
        });
      }
    });

    setNodes(graphNodes);
    setEdges(graphEdges);
  }, [religions, selectedCategory, setNodes, setEdges]);

  // Initialiser le graphe au montage et quand les dépendances changent
  useEffect(() => {
    initializeGraph();
  }, [initializeGraph]);

  // Gérer le click sur un nœud
  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const religion = religions.find((r) => r.id === node.id);
      if (religion && onNodeClick) {
        onNodeClick(religion);
      }
    },
    [religions, onNodeClick]
  );

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
        <Controls />

        <Panel position="top-right" className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-4 m-4">
          <GraphControls
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryFilter}
            onReset={handleReset}
            totalReligions={religions.length}
            visibleReligions={
              selectedCategory
                ? religions.filter((r) => r.category === selectedCategory)
                    .length
                : religions.length
            }
          />
        </Panel>
      </ReactFlow>
    </div>
  );
}

