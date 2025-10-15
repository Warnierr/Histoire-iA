'use client';

import { useState } from 'react';
import { ReligionGraph } from './religion-graph';
import { ReligionDetailPanel } from '@/components/panels/religion-detail';
import { ChatInterface } from '@/components/chat/chat-interface';
import type { Religion } from '@/types/religion';
import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';

interface ReligionMapViewProps {
  religions: Religion[];
}

export function ReligionMapView({ religions }: ReligionMapViewProps) {
  const [selectedReligion, setSelectedReligion] = useState<Religion | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);

  const handleNodeClick = (religion: Religion) => {
    setSelectedReligion(religion);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <div className="relative w-full h-screen flex">
      {/* Graphe principal */}
      <div className={`flex-1 transition-all duration-300 ${isChatOpen ? 'mr-[400px]' : 'mr-0'}`}>
        <ReligionGraph 
          religions={religions} 
          onNodeClick={handleNodeClick}
        />
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
    </div>
  );
}
