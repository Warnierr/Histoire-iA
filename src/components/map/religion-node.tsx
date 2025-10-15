'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Religion } from '@/types/religion';

interface ReligionNodeData {
  religion: Religion;
  isHighlighted?: boolean;
}

export const ReligionNode = memo(({ data }: NodeProps<ReligionNodeData>) => {
  const { religion, isHighlighted = true } = data;

  // Utiliser la couleur de la religion directement
  const religionColor = religion.color || '#94a3b8';

  const formatFollowers = (followers: bigint | number | null) => {
    if (!followers) return null;
    const num = Number(followers);
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}Md`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(0)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <Card
      className={`w-[250px] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:z-50 ${
        isHighlighted
          ? 'opacity-100 shadow-lg'
          : 'opacity-20 blur-[2px]'
      } cursor-pointer`}
      style={{
        borderColor: religionColor,
        borderWidth: 3,
        backgroundColor: `${religionColor}08`,
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2 !h-2"
        style={{ backgroundColor: religionColor }}
      />

      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle 
            className="text-lg font-bold line-clamp-2"
            style={{ color: religionColor }}
          >
            {religion.name}
          </CardTitle>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ backgroundColor: religionColor }}
          >
            {religion.name.charAt(0)}
          </div>
        </div>
        {religion.autonym && religion.autonym !== religion.name && (
          <p className="text-xs text-muted-foreground italic mt-1">
            {religion.autonym}
          </p>
        )}
      </CardHeader>

      <CardContent className="p-4 pt-2 space-y-2">
        <Badge 
          className="text-xs font-semibold"
          style={{
            backgroundColor: religionColor,
            color: 'white',
          }}
        >
          {religion.category}
        </Badge>

        {religion.foundedYear && (
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span>📅</span>
            {religion.foundedYear > 0
              ? religion.foundedYear
              : `${Math.abs(religion.foundedYear)} av. J.-C.`}
          </p>
        )}

        {religion.followers && (
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span>👥</span>
            {formatFollowers(religion.followers)} fidèles
          </p>
        )}

        {religion.foundedPlace && (
          <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
            <span>📍</span>
            {religion.foundedPlace}
          </p>
        )}

        {religion.status === 'EXTINCT' && (
          <Badge variant="outline" className="text-xs">
            ⏳ Éteinte
          </Badge>
        )}
      </CardContent>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2 !h-2"
        style={{ backgroundColor: religionColor }}
      />
    </Card>
  );
});

ReligionNode.displayName = 'ReligionNode';

