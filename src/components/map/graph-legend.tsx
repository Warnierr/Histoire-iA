'use client';

import { Info } from 'lucide-react';

export function GraphLegend() {
  const families = [
    { name: 'Abrahamique', color: '#3b82f6', description: 'Judaïsme, Christianisme, Islam' },
    { name: 'Dharmique', color: '#f59e0b', description: 'Hindouisme, Bouddhisme, Jaïnisme' },
    { name: 'Taoïque', color: '#10b981', description: 'Taoïsme, Confucianisme, Shinto' },
    { name: 'Indigène', color: '#8b5cf6', description: 'Religions autochtones' },
    { name: 'Ancien', color: '#6366f1', description: 'Religions antiques' },
    { name: 'Moderne', color: '#ec4899', description: 'Nouveaux mouvements religieux' },
  ];

  const relationships = [
    { type: 'Dérivation', color: '#3b82f6', description: 'Religion issue d\'une autre' },
    { type: 'Inspiration', color: '#8b5cf6', description: 'Influence philosophique' },
    { type: 'Syncrétisme', color: '#10b981', description: 'Mélange de traditions' },
    { type: 'Opposition', color: '#ef4444', description: 'Réaction contre' },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-4 space-y-4 max-w-sm">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
          Légende
        </h3>
      </div>

      {/* Families */}
      <div>
        <h4 className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
          Familles Religieuses
        </h4>
        <div className="space-y-2">
          {families.map((family) => (
            <div key={family.name} className="flex items-start gap-2">
              <div
                className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0"
                style={{ backgroundColor: family.color }}
              />
              <div>
                <div className="text-xs font-medium text-slate-900 dark:text-slate-100">
                  {family.name}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  {family.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Relationships */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
        <h4 className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
          Types de Relations
        </h4>
        <div className="space-y-2">
          {relationships.map((rel) => (
            <div key={rel.type} className="flex items-start gap-2">
              <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: rel.color }} />
                <svg width="16" height="2" className="flex-shrink-0">
                  <line x1="0" y1="1" x2="16" y2="1" stroke={rel.color} strokeWidth="2" />
                </svg>
                <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4" style={{ borderTopColor: rel.color }} />
              </div>
              <div>
                <div className="text-xs font-medium text-slate-900 dark:text-slate-100">
                  {rel.type}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  {rel.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
        <h4 className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
          💡 Astuces
        </h4>
        <ul className="text-[10px] text-slate-600 dark:text-slate-400 space-y-1">
          <li>• <strong>Clic</strong> sur un nœud pour le mode focus</li>
          <li>• <strong>Molette</strong> pour zoomer</li>
          <li>• <strong>Glisser</strong> pour déplacer la vue</li>
          <li>• <strong>Double-clic</strong> pour centrer</li>
        </ul>
      </div>
    </div>
  );
}

