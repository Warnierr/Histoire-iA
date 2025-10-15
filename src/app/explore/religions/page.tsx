import { ReligionMapView } from '@/components/map/religion-map-view';
import { mockReligions, mockStats } from '@/data/mock-religions';
import Link from 'next/link';

// Page du thème Religions & Spiritualités

export default function ReligionsPage() {
  const religions = mockReligions;
  const stats = mockStats;

  return (
    <main className="min-h-screen relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 border-b bg-white/80 backdrop-blur dark:bg-slate-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
              >
                ← Accueil
              </Link>
              <div className="h-6 w-px bg-slate-300 dark:bg-slate-700" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🕉️</span>
                  <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                    Religions & Spiritualités
                  </h1>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {stats.religions} religions • {stats.influences} influences • {stats.sources} sources
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-700 dark:text-green-300 text-xs font-medium">
                ✓ Actif
              </div>
              <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-medium">
                🤖 IA Disponible
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Graph View avec chat IA intégré */}
      <div className="pt-[90px] h-screen">
        <ReligionMapView religions={religions} />
      </div>
    </main>
  );
}

