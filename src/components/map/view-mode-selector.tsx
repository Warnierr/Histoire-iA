'use client';

import { Network, Clock, Globe, Grid, BarChart3, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type ViewMode = 'graph' | 'timeline' | 'globe' | 'matrix' | 'stats' | 'story';

interface ViewModeSelectorProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

const viewModes = [
  {
    id: 'graph' as ViewMode,
    name: 'Graphe',
    icon: Network,
    description: 'Visualisation en réseau hiérarchique',
    color: 'blue',
  },
  {
    id: 'timeline' as ViewMode,
    name: 'Timeline',
    icon: Clock,
    description: 'Chronologie interactive des religions',
    color: 'purple',
  },
  {
    id: 'globe' as ViewMode,
    name: 'Globe',
    icon: Globe,
    description: 'Répartition géographique mondiale',
    color: 'green',
  },
  {
    id: 'matrix' as ViewMode,
    name: 'Matrix',
    icon: Grid,
    description: 'Matrice des influences croisées',
    color: 'orange',
  },
  {
    id: 'stats' as ViewMode,
    name: 'Stats',
    icon: BarChart3,
    description: 'Statistiques et analyses',
    color: 'pink',
  },
  {
    id: 'story' as ViewMode,
    name: 'Story',
    icon: Sparkles,
    description: 'Mode récit narratif',
    color: 'indigo',
  },
];

const colorClasses = {
  blue: {
    bg: 'bg-blue-500',
    hover: 'hover:bg-blue-600',
    text: 'text-blue-600',
    border: 'border-blue-500',
    lightBg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  purple: {
    bg: 'bg-purple-500',
    hover: 'hover:bg-purple-600',
    text: 'text-purple-600',
    border: 'border-purple-500',
    lightBg: 'bg-purple-50 dark:bg-purple-900/20',
  },
  green: {
    bg: 'bg-green-500',
    hover: 'hover:bg-green-600',
    text: 'text-green-600',
    border: 'border-green-500',
    lightBg: 'bg-green-50 dark:bg-green-900/20',
  },
  orange: {
    bg: 'bg-orange-500',
    hover: 'hover:bg-orange-600',
    text: 'text-orange-600',
    border: 'border-orange-500',
    lightBg: 'bg-orange-50 dark:bg-orange-900/20',
  },
  pink: {
    bg: 'bg-pink-500',
    hover: 'hover:bg-pink-600',
    text: 'text-pink-600',
    border: 'border-pink-500',
    lightBg: 'bg-pink-50 dark:bg-pink-900/20',
  },
  indigo: {
    bg: 'bg-indigo-500',
    hover: 'hover:bg-indigo-600',
    text: 'text-indigo-600',
    border: 'border-indigo-500',
    lightBg: 'bg-indigo-50 dark:bg-indigo-900/20',
  },
};

export function ViewModeSelector({ currentMode, onModeChange }: ViewModeSelectorProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-4">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
        Mode de Visualisation
      </h3>
      
      <div className="space-y-2">
        {viewModes.map((mode) => {
          const isActive = currentMode === mode.id;
          const Icon = mode.icon;
          const colors = colorClasses[mode.color as keyof typeof colorClasses];
          
          return (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`
                w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all
                ${isActive 
                  ? `${colors.border} ${colors.lightBg}`
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }
              `}
            >
              <div className={`
                p-2 rounded-lg
                ${isActive ? `${colors.bg} text-white` : `${colors.lightBg} ${colors.text}`}
              `}>
                <Icon className="w-4 h-4" />
              </div>
              
              <div className="flex-1 text-left">
                <div className={`
                  text-sm font-semibold
                  ${isActive ? colors.text : 'text-slate-900 dark:text-slate-100'}
                `}>
                  {mode.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {mode.description}
                </div>
              </div>
              
              {isActive && (
                <div className={`w-2 h-2 rounded-full ${colors.bg} animate-pulse`} />
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          💡 Chaque mode offre une perspective unique sur les données
        </div>
      </div>
    </div>
  );
}

