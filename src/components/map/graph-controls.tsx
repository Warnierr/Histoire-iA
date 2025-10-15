'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Filter } from 'lucide-react';

interface GraphControlsProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onReset: () => void;
  totalReligions: number;
  visibleReligions: number;
}

const categories = [
  { id: 'ABRAHAMIQUE', label: 'Abrahamique', color: 'bg-blue-500' },
  { id: 'DHARMIC', label: 'Dharmique', color: 'bg-orange-500' },
  { id: 'TAOIC', label: 'Taoïque', color: 'bg-green-500' },
  { id: 'INDIGENE', label: 'Indigène', color: 'bg-purple-500' },
  { id: 'MODERNE', label: 'Moderne', color: 'bg-pink-500' },
  { id: 'ANCIEN', label: 'Ancien', color: 'bg-amber-500' },
  { id: 'PHILOSOPHIQUE', label: 'Philosophique', color: 'bg-cyan-500' },
  { id: 'SYNCHRETIQUE', label: 'Syncrétique', color: 'bg-indigo-500' },
];

export function GraphControls({
  selectedCategory,
  onCategoryChange,
  onReset,
  totalReligions,
  visibleReligions,
}: GraphControlsProps) {
  return (
    <div className="space-y-4 w-64">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <h3 className="font-semibold text-sm">Filtres</h3>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={onReset}
          className="h-8 px-2"
        >
          <RotateCcw className="w-3 h-3 mr-1" />
          Reset
        </Button>
      </div>

      <div className="text-xs text-muted-foreground">
        {visibleReligions} / {totalReligions} religions affichées
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase">
          Par catégorie
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                onCategoryChange(
                  selectedCategory === category.id ? null : category.id
                )
              }
              className={`
                px-3 py-1 rounded-full text-xs font-medium transition-all
                ${
                  selectedCategory === category.id
                    ? `${category.color} text-white shadow-md scale-105`
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t">
        <p className="text-xs text-muted-foreground">
          💡 <strong>Astuce :</strong> Cliquez sur une religion pour voir les détails
        </p>
      </div>
    </div>
  );
}

