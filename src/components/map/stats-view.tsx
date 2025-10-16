'use client';

import { Religion } from '@/types/religion';
import { Users, Calendar, MapPin, GitBranch, TrendingUp } from 'lucide-react';

interface StatsViewProps {
  religions: Religion[];
}

export function StatsView({ religions }: StatsViewProps) {
  // Calculs statistiques
  const totalFollowers = religions.reduce((sum, r) => sum + (Number(r.followers) || 0), 0);
  const avgFoundedYear = religions
    .filter(r => r.foundedYear !== null)
    .reduce((sum, r) => sum + r.foundedYear!, 0) / religions.filter(r => r.foundedYear).length;

  const byFamily = religions.reduce((acc, r) => {
    if (r.family) {
      acc[r.family] = (acc[r.family] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const byCategory = religions.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const byEpoch = {
    'Antiquité (-3000 à 500)': religions.filter(r => r.foundedYear && r.foundedYear < 500).length,
    'Moyen Âge (500 à 1500)': religions.filter(r => r.foundedYear && r.foundedYear >= 500 && r.foundedYear < 1500).length,
    'Moderne (1500 à 1900)': religions.filter(r => r.foundedYear && r.foundedYear >= 1500 && r.foundedYear < 1900).length,
    'Contemporain (1900+)': religions.filter(r => r.foundedYear && r.foundedYear >= 1900).length,
  };

  const topReligions = religions
    .filter(r => r.followers)
    .sort((a, b) => Number(b.followers) - Number(a.followers))
    .slice(0, 10);

  const oldestReligions = religions
    .filter(r => r.foundedYear)
    .sort((a, b) => a.foundedYear! - b.foundedYear!)
    .slice(0, 10);

  const formatNumber = (num: number) => {
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}Mrd`;
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="w-full h-full overflow-auto bg-slate-50 dark:bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h2 className="text-3xl font-bold mb-2">Statistiques Globales</h2>
          <p className="text-blue-100">Analyse approfondie des religions du monde</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <GitBranch className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Religions</div>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{religions.length}</div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Fidèles Totaux</div>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{formatNumber(totalFollowers)}</div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Année Moyenne</div>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              {avgFoundedYear < 0 ? `${Math.abs(Math.round(avgFoundedYear))} av. J.-C.` : Math.round(avgFoundedYear)}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Familles</div>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              {Object.keys(byFamily).length}
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* By Family */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Répartition par Famille</h3>
            <div className="space-y-3">
              {Object.entries(byFamily)
                .sort(([, a], [, b]) => b - a)
                .map(([family, count]) => {
                  const percent = (count / religions.length) * 100;
                  return (
                    <div key={family}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium capitalize text-slate-700 dark:text-slate-300">{family}</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">{count} ({percent.toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* By Epoch */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Répartition par Époque</h3>
            <div className="space-y-3">
              {Object.entries(byEpoch).map(([epoch, count]) => {
                const percent = (count / religions.filter(r => r.foundedYear).length) * 100;
                return (
                  <div key={epoch}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{epoch}</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">{count} ({percent.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top by Followers */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Top 10 - Nombre de Fidèles</h3>
            </div>
            <div className="space-y-2">
              {topReligions.map((religion, index) => (
                <div key={religion.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded">
                  <div className="w-6 h-6 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold">
                    {index + 1}
                  </div>
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: religion.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{religion.name}</div>
                  </div>
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {formatNumber(Number(religion.followers))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Oldest Religions */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Top 10 - Plus Anciennes</h3>
            </div>
            <div className="space-y-2">
              {oldestReligions.map((religion, index) => (
                <div key={religion.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded">
                  <div className="w-6 h-6 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold">
                    {index + 1}
                  </div>
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: religion.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{religion.name}</div>
                  </div>
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {religion.foundedYear! < 0 
                      ? `${Math.abs(religion.foundedYear!)} av.` 
                      : religion.foundedYear}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

