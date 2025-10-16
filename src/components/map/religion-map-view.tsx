'use client';

import { useState } from 'react';
import { ReligionGraph } from './religion-graph';
import { TimelineView } from './timeline-view';
import { GlobeView } from './globe-view';
import { MatrixView } from './matrix-view';
import { StatsView } from './stats-view';
import { ViewModeSelector, type ViewMode } from './view-mode-selector';
import { ReligionDetailPanel } from '@/components/panels/religion-detail';
import { ChatInterface } from '@/components/chat/chat-interface';
import type { Religion } from '@/types/religion';
import { Button } from '@/components/ui/button';
import { MessageSquare, X, Layout } from 'lucide-react';

interface ReligionMapViewProps {
  religions: Religion[];
}

export function ReligionMapView({ religions }: ReligionMapViewProps) {
  const [selectedReligion, setSelectedReligion] = useState<Religion | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('graph');
  const [isModeSelectorOpen, setIsModeSelectorOpen] = useState(false);

  const handleNodeClick = (religion: Religion) => {
    setSelectedReligion(religion);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  // Rendu du mode de visualisation actif
  const renderView = () => {
    switch (viewMode) {
      case 'graph':
        return <ReligionGraph religions={religions} onNodeClick={handleNodeClick} />;
      case 'timeline':
        return <TimelineView religions={religions} onReligionClick={handleNodeClick} />;
      case 'globe':
        return <GlobeView religions={religions} onReligionClick={handleNodeClick} />;
      case 'matrix':
        return <MatrixView religions={religions} onReligionClick={handleNodeClick} />;
      case 'stats':
        return <StatsView religions={religions} />;
      case 'story':
        return (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900 text-white p-12">
            <div className="max-w-2xl text-center space-y-6">
              <h2 className="text-4xl font-bold">Mode Story - Bientôt Disponible</h2>
              <p className="text-xl text-slate-300">
                Explorez l'histoire des religions à travers des récits interactifs et immersifs.
              </p>
              <div className="text-sm text-slate-400">
                🚧 En développement • Prochainement
              </div>
            </div>
          </div>
        );
      default:
        return <ReligionGraph religions={religions} onNodeClick={handleNodeClick} />;
    }
  };

  return (
    <div className="relative w-full h-screen flex">
      {/* Vue principale */}
      <div className={`flex-1 transition-all duration-300 ${isChatOpen ? 'mr-[400px]' : 'mr-0'}`}>
        {renderView()}
      </div>
      
      {/* Panneau de détail (Sheet côté gauche) */}
      <ReligionDetailPanel
        religion={selectedReligion}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />

      {/* Panneau de chat (côté droit) */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-background border-l shadow-2xl transition-transform duration-300 z-40 ${
          isChatOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ChatInterface
          religionContext={
            selectedReligion
              ? {
                  name: selectedReligion.name,
                  category: selectedReligion.category,
                }
              : undefined
          }
        />
      </div>

      {/* Sélecteur de mode de visualisation (côté gauche) */}
      <div
        className={`fixed top-4 left-4 z-50 transition-transform duration-300 ${
          isModeSelectorOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ViewModeSelector currentMode={viewMode} onModeChange={setViewMode} />
      </div>

      {/* Bouton toggle mode selector */}
      <Button
        onClick={() => setIsModeSelectorOpen(!isModeSelectorOpen)}
        className={`fixed top-4 left-4 z-50 shadow-lg transition-all ${
          isModeSelectorOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        size="lg"
        variant="default"
      >
        <Layout className="w-5 h-5 mr-2" />
        Modes de Vue
      </Button>

      {/* Overlay pour fermer le mode selector */}
      {isModeSelectorOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsModeSelectorOpen(false)}
        />
      )}

      {/* Bouton toggle chat */}
      <Button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed top-4 right-4 z-50 shadow-lg"
        size="lg"
        variant={isChatOpen ? 'secondary' : 'default'}
      >
        {isChatOpen ? (
          <>
            <X className="w-5 h-5 mr-2" />
            Fermer Chat
          </>
        ) : (
          <>
            <MessageSquare className="w-5 h-5 mr-2" />
            Ouvrir Chat IA
          </>
        )}
      </Button>

      {/* Badge indicateur du mode actuel */}
      <div className="fixed bottom-4 left-4 z-40 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 border border-slate-200 dark:border-slate-700">
        <div className="text-xs font-medium text-slate-600 dark:text-slate-400">Mode actuel</div>
        <div className="text-sm font-bold text-slate-900 dark:text-slate-100 capitalize">{viewMode}</div>
      </div>
    </div>
  );
}
