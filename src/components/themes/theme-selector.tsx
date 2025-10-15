'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

interface Theme {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  description: string;
  order: number;
  status: 'active' | 'planned' | 'development';
}

const themes: Theme[] = [
  {
    id: '1',
    name: 'Religions & Spiritualités',
    slug: 'religions',
    icon: '🕉️',
    color: '#4A90E2',
    description: 'Explorez l\'histoire des religions du monde, leurs influences mutuelles et leurs traditions spirituelles',
    order: 1,
    status: 'active'
  },
  {
    id: '2',
    name: 'Histoire de l\'Art',
    slug: 'art',
    icon: '🎨',
    color: '#FF6B9D',
    description: 'Parcourez l\'évolution de l\'art à travers les siècles, des grottes de Lascaux à l\'art numérique contemporain',
    order: 2,
    status: 'planned'
  },
  {
    id: '3',
    name: 'Histoire Générale',
    slug: 'history',
    icon: '🏛️',
    color: '#F5A623',
    description: 'Explorez les grandes civilisations, événements et personnages qui ont façonné notre monde',
    order: 3,
    status: 'planned'
  },
  {
    id: '4',
    name: 'Histoire de la Musique',
    slug: 'music',
    icon: '🎵',
    color: '#9013FE',
    description: 'Du chant grégorien au hip-hop, explorez l\'évolution des genres musicaux',
    order: 4,
    status: 'planned'
  },
  {
    id: '5',
    name: 'Histoire de la Littérature',
    slug: 'literature',
    icon: '📖',
    color: '#50E3C2',
    description: 'Épopées antiques, romans du 19e, postmodernisme. Suivez les courants littéraires',
    order: 5,
    status: 'planned'
  },
  {
    id: '6',
    name: 'Histoire des Sciences',
    slug: 'sciences',
    icon: '🔬',
    color: '#0077BE',
    description: 'Révolutions scientifiques, découvertes majeures, figures emblématiques',
    order: 6,
    status: 'planned'
  },
  {
    id: '7',
    name: 'Histoire de l\'Architecture',
    slug: 'architecture',
    icon: '🏗️',
    color: '#E67E22',
    description: 'Pyramides, cathédrales gothiques, Bauhaus, gratte-ciels',
    order: 7,
    status: 'planned'
  },
  {
    id: '8',
    name: 'Histoire de la Philosophie',
    slug: 'philosophy',
    icon: '💭',
    color: '#B8B0FF',
    description: 'Courants de pensée, écoles philosophiques, débats intellectuels',
    order: 8,
    status: 'planned'
  },
  {
    id: '9',
    name: 'Histoire du Cinéma',
    slug: 'cinema',
    icon: '🎬',
    color: '#FFA726',
    description: 'Cinéma muet, nouvelle vague, blockbusters, streaming',
    order: 9,
    status: 'planned'
  },
  {
    id: '10',
    name: 'Histoire du Jeu Vidéo',
    slug: 'gaming',
    icon: '🎮',
    color: '#00BCD4',
    description: 'Des premiers jeux arcade à la VR, explorez l\'évolution du média interactif',
    order: 10,
    status: 'planned'
  }
];

export function ThemeSelector() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Explorez l'Histoire par Thèmes
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Une œuvre artistique interactive où chaque thème révèle les connexions fascinantes entre cultures, époques et idées
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          theme.status === 'active' ? (
            <Link key={theme.id} href={`/explore/${theme.slug}`} className="block focus:outline-none">
              <Card 
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer group relative overflow-hidden"
                style={{
                  borderLeft: `4px solid ${theme.color}`
                }}
              >
                <div className="absolute top-0 right-0 opacity-10 text-8xl group-hover:opacity-20 transition-opacity">
                  {theme.icon}
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{theme.icon}</div>
                    <Badge 
                      variant="default"
                      className="text-xs"
                    >
                      ✓ Actif
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                    {theme.name}
                  </h3>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    {theme.description}
                  </p>

                  <div className="flex items-center text-sm text-purple-600 font-medium">
                    Explorer maintenant →
                  </div>
                </div>
              </Card>
            </Link>
          ) : (
            <Card 
              key={theme.id}
              className="p-6 hover:shadow-lg transition-shadow group relative overflow-hidden"
              style={{
                borderLeft: `4px solid ${theme.color}`
              }}
            >
              <div className="absolute top-0 right-0 opacity-10 text-8xl group-hover:opacity-20 transition-opacity">
                {theme.icon}
              </div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{theme.icon}</div>
                  <Badge 
                    variant="secondary"
                    className="text-xs"
                  >
                    🔜 Bientôt
                  </Badge>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                  {theme.name}
                </h3>
                
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  {theme.description}
                </p>

                <div className="flex items-center text-sm text-slate-400">
                  En développement...
                </div>
              </div>
            </Card>
          )
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium">
          💡 Nouveaux thèmes ajoutés régulièrement
        </div>
      </div>
    </div>
  );
}

