'use client';

import { ThemeSelector } from '@/components/themes/theme-selector';
import { ThemeToggle } from '@/components/theme/theme-toggle';

// VERSION 0.2.0 - Plateforme Multi-Thématique
// Interface d'accueil avec sélection des thèmes

export default function HomePage() {
  const scrollToThemes = () => {
    const themesSection = document.getElementById('themes');
    if (themesSection) {
      themesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        
        {/* Content */}
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-800">
            <span className="text-2xl">🎨</span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Version 0.2.0 - Plateforme Multi-Thématique
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Histoire iA
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-4 max-w-3xl mx-auto">
            Où le passé prend vie
          </p>
          
          <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            Une œuvre artistique interactive pour explorer l'histoire à travers 10 thèmes interconnectés.
            Découvrez comment religions, art, philosophie et sciences s'influencent mutuellement.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">10</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Thèmes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">1</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Actif</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">∞</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Connexions</div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={scrollToThemes}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              Explorez les Thèmes
            </button>
            <a 
              href="/explore/religions"
              className="px-8 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-full font-medium border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all hover:scale-105"
            >
              🕉️ Religions (Actif)
            </a>
          </div>
        </div>
      </section>

      {/* Themes Section */}
      <section id="themes" className="relative py-16">
        <ThemeSelector />
      </section>

      {/* Features Section */}
      <section className="relative py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-slate-200">
            Une Expérience Unique
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">
                Graphes Interactifs
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Visualisez les connexions entre entités historiques de manière intuitive et esthétique
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">
                IA Contextuelle
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Conversez avec une IA experte qui s'adapte à chaque thème historique
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🔗</div>
              <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">
                Liens Inter-Thématiques
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Découvrez comment art, philosophie et religions s'influencent mutuellement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
          <p className="mb-2">
            🎨 <strong>Histoire iA</strong> - Où le passé prend vie
          </p>
          <p className="text-sm">
            Version 0.2.0 • Open Source • Made with ❤️
          </p>
        </div>
      </footer>
    </main>
  );
}
