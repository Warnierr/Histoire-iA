import { Node, Edge } from 'reactflow';

export interface ReligionNode extends Node {
  data: {
    id: string;
    name: string;
    color: string;
    category: string;
    followers?: bigint | null;
    foundedYear?: number | null;
  };
}

export interface InfluenceEdge extends Edge {
  data?: {
    type: string;
    strength: number;
    description?: string;
  };
}

export interface GraphData {
  nodes: ReligionNode[];
  edges: InfluenceEdge[];
}

