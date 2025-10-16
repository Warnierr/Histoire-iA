'use client';

import { useEffect, useRef, useState } from 'react';
import { Religion } from '@/types/religion';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface TimelineViewProps {
  religions: Religion[];
  onReligionClick?: (religion: Religion) => void;
}

interface TimelineEvent {
  year: number;
  religion: Religion;
  label: string;
  color: string;
}

export function TimelineView({ religions, onReligionClick }: TimelineViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [hoveredEvent, setHoveredEvent] = useState<TimelineEvent | null>(null);

  // Préparer les événements pour la timeline
  const events: TimelineEvent[] = religions
    .filter(r => r.foundedYear !== null)
    .map(r => ({
      year: r.foundedYear!,
      religion: r,
      label: r.name,
      color: r.color,
    }))
    .sort((a, b) => a.year - b.year);

  const minYear = Math.min(...events.map(e => e.year), -3000);
  const maxYear = Math.max(...events.map(e => e.year), 2000);
  const yearRange = maxYear - minYear;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Responsive canvas
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        drawTimeline();
      }
    };

    const drawTimeline = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear
      ctx.clearRect(0, 0, width, height);

      // Background
      ctx.fillStyle = getComputedStyle(canvas).getPropertyValue('background-color') || '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // Axe principal
      const axisY = height / 2;
      const padding = 100;
      const timelineWidth = width - padding * 2;

      // Ligne principale
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(padding, axisY);
      ctx.lineTo(width - padding, axisY);
      ctx.stroke();

      // Graduations par siècle
      ctx.font = '11px sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.textAlign = 'center';

      for (let year = Math.ceil(minYear / 100) * 100; year <= maxYear; year += 100) {
        const x = padding + ((year - minYear) / yearRange) * timelineWidth * zoom + offset;
        
        if (x >= padding && x <= width - padding) {
          // Trait
          ctx.beginPath();
          ctx.moveTo(x, axisY - 10);
          ctx.lineTo(x, axisY + 10);
          ctx.stroke();

          // Label
          ctx.fillText(
            year < 0 ? `${Math.abs(year)} av. J.-C.` : `${year}`,
            x,
            axisY + 25
          );
        }
      }

      // Époques en arrière-plan
      const epochs = [
        { start: -3000, end: 500, label: 'Antiquité', color: '#fef3c7' },
        { start: 500, end: 1500, label: 'Moyen Âge', color: '#ddd6fe' },
        { start: 1500, end: 1900, label: 'Moderne', color: '#fce7f3' },
        { start: 1900, end: 2100, label: 'Contemporain', color: '#cffafe' },
      ];

      epochs.forEach(epoch => {
        const startX = padding + ((epoch.start - minYear) / yearRange) * timelineWidth * zoom + offset;
        const endX = padding + ((epoch.end - minYear) / yearRange) * timelineWidth * zoom + offset;
        
        ctx.fillStyle = epoch.color + '40';
        ctx.fillRect(
          Math.max(startX, padding),
          50,
          Math.min(endX - startX, width - padding - startX),
          height - 100
        );

        // Label époque
        if (startX >= padding - 50 && startX <= width - padding) {
          ctx.fillStyle = '#475569';
          ctx.font = 'bold 12px sans-serif';
          ctx.fillText(epoch.label, (startX + endX) / 2, 40);
        }
      });

      // Événements (religions)
      events.forEach((event, index) => {
        const x = padding + ((event.year - minYear) / yearRange) * timelineWidth * zoom + offset;
        
        if (x >= padding - 20 && x <= width - padding + 20) {
          const isTop = index % 2 === 0;
          const eventY = isTop ? axisY - 60 : axisY + 60;

          // Ligne de connexion
          ctx.strokeStyle = event.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x, axisY);
          ctx.lineTo(x, eventY);
          ctx.stroke();

          // Point sur l'axe
          ctx.fillStyle = event.color;
          ctx.beginPath();
          ctx.arc(x, axisY, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Nom de la religion
          ctx.fillStyle = event.color;
          ctx.font = 'bold 11px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(event.label, x, eventY + (isTop ? -5 : 15));
        }
      });

      // Hover tooltip
      if (hoveredEvent) {
        const x = padding + ((hoveredEvent.year - minYear) / yearRange) * timelineWidth * zoom + offset;
        const tooltipWidth = 200;
        const tooltipHeight = 80;
        const tooltipX = Math.min(Math.max(x - tooltipWidth / 2, 10), width - tooltipWidth - 10);
        const tooltipY = 10;

        // Fond tooltip
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);

        // Contenu
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(hoveredEvent.label, tooltipX + 10, tooltipY + 20);

        ctx.font = '11px sans-serif';
        ctx.fillStyle = '#d1d5db';
        ctx.fillText(
          `Fondée: ${hoveredEvent.year < 0 ? `${Math.abs(hoveredEvent.year)} av. J.-C.` : hoveredEvent.year}`,
          tooltipX + 10,
          tooltipY + 40
        );

        if (hoveredEvent.religion.foundedPlace) {
          ctx.fillText(
            `Lieu: ${hoveredEvent.religion.foundedPlace}`,
            tooltipX + 10,
            tooltipY + 55
          );
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [events, zoom, offset, hoveredEvent, minYear, maxYear, yearRange]);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart(e.clientX - offset);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setOffset(e.clientX - dragStart);
    }

    // Detect hover
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const padding = 100;
    const timelineWidth = canvas.width - padding * 2;

    const hoveredEv = events.find(event => {
      const eventX = padding + ((event.year - minYear) / yearRange) * timelineWidth * zoom + offset;
      return Math.abs(x - eventX) < 15;
    });

    setHoveredEvent(hoveredEv || null);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (hoveredEvent && onReligionClick) {
      onReligionClick(hoveredEvent.religion);
    }
  };

  return (
    <div className="w-full h-full relative bg-slate-50 dark:bg-slate-950">
      {/* Controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={() => setZoom(z => Math.min(z * 1.2, 5))}
          className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
          title="Zoom avant"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom(z => Math.max(z / 1.2, 0.5))}
          className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
          title="Zoom arrière"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => { setZoom(1); setOffset(0); }}
          className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
          title="Réinitialiser"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Title */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-slate-900 dark:text-slate-100">
            Timeline Historique
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {events.length} religions • Du {Math.abs(minYear)} av. J.-C. à {maxYear}
          </p>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ backgroundColor: 'var(--canvas-bg, #f8fafc)' }}
      />

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-lg px-3 py-2 border border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            🖱️ Glisser pour naviguer • 🔍 Survoler pour infos • 👆 Cliquer pour détails
          </p>
        </div>
      </div>
    </div>
  );
}

