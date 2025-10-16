'use client';

import { useState } from 'react';
import { Religion } from '@/types/religion';
import { ArrowRight } from 'lucide-react';

interface MatrixViewProps {
  religions: Religion[];
  onReligionClick?: (religion: Religion) => void;
}

interface InfluenceCell {
  from: Religion;
  to: Religion;
  strength: number;
  type: string;
}

export function MatrixView({ religions, onReligionClick }: MatrixViewProps) {
  const [hoveredCell, setHoveredCell] = useState<InfluenceCell | null>(null);
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);

  // Filtrer les religions affichées
  const displayedReligions = selectedFamily
    ? religions.filter(r => r.family?.toLowerCase() === selectedFamily)
    : religions.slice(0, 30); // Limiter à 30 pour la lisibilité

  // Construire la matrice des influences basée sur parentId
  const getInfluenceStrength = (from: Religion, to: Religion): number => {
    if (to.parentId === from.id) return 10; // Influence directe (dérivation)
    if (from.parentId === to.id) return 5; // Influence inverse
    
    // Vérifier si même famille (influence indirecte)
    if (from.family && to.family && from.family === to.family && from.id !== to.id) {
      return 3;
    }
    
    return 0;
  };

  const influenceTypes: Record<number, { label: string; color: string }> = {
    10: { label: 'Dérivation directe', color: '#3b82f6' },
    5: { label: 'Influence réciproque', color: '#8b5cf6' },
    3: { label: 'Famille commune', color: '#10b981' },
    0: { label: 'Aucune influence', color: '#e5e7eb' },
  };

  const families = Array.from(new Set(religions.filter(r => r.family).map(r => r.family!.toLowerCase())));

  return (
    <div className="w-full h-full relative bg-white dark:bg-slate-950 overflow-auto">
      {/* Title & Filters */}
      <div className="sticky top-0 left-0 z-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              Matrice des Influences
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {displayedReligions.length} × {displayedReligions.length} religions
            </p>
          </div>

          {/* Family Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFamily(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                !selectedFamily
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Toutes
            </button>
            {families.map(family => (
              <button
                key={family}
                onClick={() => setSelectedFamily(family)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  selectedFamily === family
                    ? 'bg-purple-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {family}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Légende:</span>
          {Object.entries(influenceTypes).map(([strength, { label, color }]) => (
            <div key={strength} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-slate-600 dark:text-slate-400">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Matrix */}
      <div className="relative">
        {/* Top labels (religions de destination) */}
        <div className="sticky top-[120px] z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
          <div className="flex">
            {/* Empty corner */}
            <div className="w-48 flex-shrink-0 border-r border-slate-200 dark:border-slate-700" />

            {/* Column headers */}
            <div className="flex">
              {displayedReligions.map((religion) => (
                <div
                  key={`col-${religion.id}`}
                  className="w-12 flex-shrink-0 p-1 border-r border-slate-200 dark:border-slate-700"
                >
                  <div
                    className="text-[9px] font-medium transform -rotate-45 origin-left whitespace-nowrap cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                    style={{ color: religion.color }}
                    onClick={() => onReligionClick?.(religion)}
                    title={religion.name}
                  >
                    {religion.name.substring(0, 15)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Matrix rows */}
        {displayedReligions.map((fromReligion, rowIndex) => (
          <div key={`row-${fromReligion.id}`} className="flex hover:bg-slate-50 dark:hover:bg-slate-900/50">
            {/* Row label (religion source) */}
            <div className="w-48 flex-shrink-0 p-2 border-r border-b border-slate-200 dark:border-slate-700 sticky left-0 bg-white dark:bg-slate-900">
              <button
                onClick={() => onReligionClick?.(fromReligion)}
                className="text-xs font-medium truncate hover:underline text-left w-full"
                style={{ color: fromReligion.color }}
                title={fromReligion.name}
              >
                {fromReligion.name}
              </button>
            </div>

            {/* Cells */}
            <div className="flex">
              {displayedReligions.map((toReligion, colIndex) => {
                const strength = getInfluenceStrength(fromReligion, toReligion);
                const influenceInfo = influenceTypes[strength as keyof typeof influenceTypes];
                const isDiagonal = rowIndex === colIndex;
                const isHovered = hoveredCell?.from.id === fromReligion.id && hoveredCell?.to.id === toReligion.id;

                return (
                  <div
                    key={`cell-${fromReligion.id}-${toReligion.id}`}
                    className={`
                      w-12 h-12 flex-shrink-0 border-r border-b border-slate-200 dark:border-slate-700
                      flex items-center justify-center cursor-pointer transition-all
                      ${isDiagonal ? 'bg-slate-100 dark:bg-slate-800' : ''}
                      ${isHovered ? 'ring-2 ring-blue-500 z-10' : ''}
                    `}
                    style={{
                      backgroundColor: isDiagonal ? undefined : influenceInfo.color + (strength > 0 ? '40' : '20'),
                    }}
                    onMouseEnter={() => {
                      if (!isDiagonal && strength > 0) {
                        setHoveredCell({
                          from: fromReligion,
                          to: toReligion,
                          strength,
                          type: influenceInfo.label,
                        });
                      }
                    }}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {!isDiagonal && strength > 0 && (
                      <div className="text-[10px] font-bold" style={{ color: influenceInfo.color }}>
                        {strength}
                      </div>
                    )}
                    {isDiagonal && (
                      <div className="text-slate-400 text-xs">—</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Hover Tooltip */}
      {hoveredCell && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="bg-black/90 text-white rounded-lg shadow-2xl p-4 max-w-md">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: hoveredCell.from.color }}
              />
              <span className="font-bold text-sm">{hoveredCell.from.name}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: hoveredCell.to.color }}
              />
              <span className="font-bold text-sm">{hoveredCell.to.name}</span>
            </div>

            <div className="text-xs text-slate-300">
              <div><strong>Type:</strong> {hoveredCell.type}</div>
              <div><strong>Force:</strong> {hoveredCell.strength}/10</div>
            </div>

            {hoveredCell.to.parentId === hoveredCell.from.id && (
              <div className="mt-2 text-xs text-blue-300">
                ℹ️ {hoveredCell.to.name} est une branche directe de {hoveredCell.from.name}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="sticky bottom-4 left-4 z-10 inline-block">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-lg px-3 py-2 border border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            🖱️ Survoler une cellule pour voir les détails • 👆 Cliquer sur un nom pour explorer
          </p>
        </div>
      </div>
    </div>
  );
}

