'use client';

import { Search, X, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface GraphFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFamilies: string[];
  onFamilyToggle: (family: string) => void;
  selectedEpoch: string | null;
  onEpochChange: (epoch: string | null) => void;
  focusedNode: string | null;
  onClearFocus: () => void;
  onResetFilters: () => void;
}

const families = [
  { id: 'abrahamique', name: 'Abrahamique', color: '#3b82f6' },
  { id: 'dharmique', name: 'Dharmique', color: '#f59e0b' },
  { id: 'taoïque', name: 'Taoïque', color: '#10b981' },
  { id: 'indigène', name: 'Indigène', color: '#8b5cf6' },
  { id: 'ancien', name: 'Ancien', color: '#6366f1' },
  { id: 'moderne', name: 'Moderne', color: '#ec4899' },
];

const epochs = [
  { id: 'ancient', name: 'Antiquité', range: '(-3000 à 500)' },
  { id: 'medieval', name: 'Moyen Âge', range: '(500 à 1500)' },
  { id: 'modern', name: 'Moderne', range: '(1500 à 1900)' },
  { id: 'contemporary', name: 'Contemporain', range: '(1900+)' },
];

export function GraphFilters({
  searchQuery,
  onSearchChange,
  selectedFamilies,
  onFamilyToggle,
  selectedEpoch,
  onEpochChange,
  focusedNode,
  onClearFocus,
  onResetFilters,
}: GraphFiltersProps) {
  const hasActiveFilters = 
    searchQuery || 
    selectedFamilies.length > 0 || 
    selectedEpoch || 
    focusedNode;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            Filtres
          </h3>
        </div>
        {hasActiveFilters && (
          <Button
            onClick={onResetFilters}
            variant="ghost"
            size="sm"
            className="h-8 text-xs"
          >
            Réinitialiser
          </Button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher une religion..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Focused Node */}
      {focusedNode && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-blue-900 dark:text-blue-100">
                Mode Focus Actif
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                Connexions de ce nœud visibles uniquement
              </div>
            </div>
            <button
              onClick={onClearFocus}
              className="p-1 hover:bg-blue-100 dark:hover:bg-blue-800 rounded"
            >
              <X className="w-4 h-4 text-blue-600 dark:text-blue-300" />
            </button>
          </div>
        </div>
      )}

      {/* Family Filters */}
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
          Familles Religieuses
        </label>
        <div className="flex flex-wrap gap-2">
          {families.map((family) => {
            const isSelected = selectedFamilies.includes(family.id);
            return (
              <button
                key={family.id}
                onClick={() => onFamilyToggle(family.id)}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-medium transition-all
                  ${isSelected 
                    ? 'ring-2 ring-offset-2 dark:ring-offset-slate-800' 
                    : 'opacity-60 hover:opacity-100'
                  }
                `}
                style={{
                  backgroundColor: isSelected ? family.color : `${family.color}40`,
                  color: isSelected ? 'white' : family.color,
                  ringColor: family.color,
                }}
              >
                {family.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Epoch Filter */}
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
          Époque
        </label>
        <div className="grid grid-cols-2 gap-2">
          {epochs.map((epoch) => {
            const isSelected = selectedEpoch === epoch.id;
            return (
              <button
                key={epoch.id}
                onClick={() => onEpochChange(isSelected ? null : epoch.id)}
                className={`
                  px-3 py-2 rounded-lg text-xs font-medium transition-all
                  border-2
                  ${isSelected
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                    : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 text-slate-600 dark:text-slate-400'
                  }
                `}
              >
                <div className="font-semibold">{epoch.name}</div>
                <div className="text-[10px] opacity-70 mt-0.5">{epoch.range}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-medium">Filtres actifs:</span>
            {searchQuery && (
              <Badge variant="secondary" className="text-xs">
                Recherche: "{searchQuery}"
              </Badge>
            )}
            {selectedFamilies.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {selectedFamilies.length} familles
              </Badge>
            )}
            {selectedEpoch && (
              <Badge variant="secondary" className="text-xs">
                {epochs.find(e => e.id === selectedEpoch)?.name}
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

