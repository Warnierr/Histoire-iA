import { ReligionMapView } from '@/components/map/religion-map-view';
import { mockReligions, mockStats } from '@/data/mock-religions';

// VERSION DÉMO avec données mock
// Sera remplacé par Prisma une fois la BDD configurée avec les variables d'environnement

export default function HomePage() {
  const religions = mockReligions;
  const stats = mockStats;

  return (
    <main className="min-h-screen relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 border-b bg-white/80 backdrop-blur dark:bg-slate-900/80 pointer-events-none">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                🎨 Histoire iA
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {stats.religions} religions • {stats.influences} influences • {stats.sources} sources
              </p>
            </div>
            <div className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 text-xs font-medium pointer-events-auto">
              🚧 Version Démo - Données Mock
            </div>
          </div>
        </div>
      </header>

      {/* Graph View avec chat IA intégré */}
      <div className="pt-[80px] h-screen">
        <ReligionMapView religions={religions} />
      </div>
    </main>
  );
}
