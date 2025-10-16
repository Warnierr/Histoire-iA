'use client';

import { useEffect, useRef, useState } from 'react';
import { Religion } from '@/types/religion';
import { RotateCcw, Plus, Minus } from 'lucide-react';

interface GlobeViewProps {
  religions: Religion[];
  onReligionClick?: (religion: Religion) => void;
}

interface GeoPoint {
  lat: number;
  lon: number;
  religion: Religion;
  size: number;
}

export function GlobeView({ religions, onReligionClick }: GlobeViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [autoRotate, setAutoRotate] = useState(false); // Immobile par défaut
  const [hoveredPoint, setHoveredPoint] = useState<GeoPoint | null>(null);

  // Coordonnées approximatives des régions d'origine
  const geoMapping: Record<string, { lat: number; lon: number }> = {
    'Inde': { lat: 20, lon: 77 },
    'Vallée de l\'Indus': { lat: 25, lon: 68 },
    'Palestine': { lat: 31.5, lon: 35 },
    'Arabie': { lat: 24, lon: 45 },
    'Chine': { lat: 35, lon: 105 },
    'Japon': { lat: 36, lon: 138 },
    'Grèce': { lat: 39, lon: 22 },
    'Rome': { lat: 41.9, lon: 12.5 },
    'Égypte': { lat: 26, lon: 30 },
    'Perse': { lat: 32, lon: 53 },
    'Mésopotamie': { lat: 33, lon: 44 },
    'Tibet': { lat: 29.6, lon: 91 },
    'Iran': { lat: 32, lon: 53 },
    'Turquie': { lat: 39, lon: 35 },
    'Mexique': { lat: 23, lon: -102 },
    'Amérique': { lat: 40, lon: -100 },
  };

  // Préparer les points géographiques
  const geoPoints: GeoPoint[] = religions
    .filter(r => r.foundedPlace)
    .map(r => {
      const place = r.foundedPlace!;
      let coords = geoMapping[place];
      
      // Si pas de correspondance exacte, chercher une correspondance partielle
      if (!coords) {
        const match = Object.keys(geoMapping).find(key => 
          place.toLowerCase().includes(key.toLowerCase()) ||
          key.toLowerCase().includes(place.toLowerCase())
        );
        coords = match ? geoMapping[match] : { lat: 0, lon: 0 };
      }

      return {
        lat: coords.lat,
        lon: coords.lon,
        religion: r,
        size: r.followers ? Math.log10(Number(r.followers)) * 2 : 5,
      };
    });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let currentRotation = { ...rotation };

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    const drawGlobe = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.4 * zoom;

      // Clear
      ctx.clearRect(0, 0, width, height);

      // Background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Stars
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.fillRect(x, y, 1, 1);
      }

      // Globe shadow
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius);
      gradient.addColorStop(0, '#1e40af');
      gradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Globe
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Latitude lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        for (let lon = -180; lon <= 180; lon += 5) {
          const point = project3D(lat, lon, radius, centerX, centerY, currentRotation);
          if (point.visible) {
            if (lon === -180) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          }
        }
        ctx.stroke();
      }

      // Longitude lines
      for (let lon = -180; lon <= 180; lon += 30) {
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 5) {
          const point = project3D(lat, lon, radius, centerX, centerY, currentRotation);
          if (point.visible) {
            if (lat === -90) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          }
        }
        ctx.stroke();
      }

      // Dessiner les continents (contours simplifiés)
      drawContinents(ctx, radius, centerX, centerY, currentRotation);

      // Religion points
      const sortedPoints = geoPoints
        .map(gp => ({
          ...gp,
          projected: project3D(gp.lat, gp.lon, radius, centerX, centerY, currentRotation),
        }))
        .filter(gp => gp.projected.visible)
        .sort((a, b) => a.projected.z - b.projected.z);

      sortedPoints.forEach(({ religion, size, projected }) => {
        const isHovered = hoveredPoint?.religion.id === religion.id;
        const pointSize = (size + 2) * (isHovered ? 1.5 : 1);

        // Glow effect
        if (isHovered) {
          const glowGradient = ctx.createRadialGradient(
            projected.x, projected.y, 0,
            projected.x, projected.y, pointSize * 2
          );
          glowGradient.addColorStop(0, religion.color + '80');
          glowGradient.addColorStop(1, religion.color + '00');
          ctx.fillStyle = glowGradient;
          ctx.fillRect(
            projected.x - pointSize * 2,
            projected.y - pointSize * 2,
            pointSize * 4,
            pointSize * 4
          );
        }

        // Point
        ctx.fillStyle = religion.color;
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, pointSize, 0, Math.PI * 2);
        ctx.fill();

        // Border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Hover tooltip
      if (hoveredPoint) {
        const projected = project3D(
          hoveredPoint.lat,
          hoveredPoint.lon,
          radius,
          centerX,
          centerY,
          currentRotation
        );

        if (projected.visible) {
          const tooltipWidth = 180;
          const tooltipHeight = 70;
          const tooltipX = Math.min(Math.max(projected.x - tooltipWidth / 2, 10), width - tooltipWidth - 10);
          const tooltipY = Math.max(projected.y - tooltipHeight - 20, 10);

          // Tooltip background
          ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
          ctx.fillRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);

          // Content
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(hoveredPoint.religion.name, tooltipX + 10, tooltipY + 20);

          ctx.font = '10px sans-serif';
          ctx.fillStyle = '#d1d5db';
          ctx.fillText(
            `Lieu: ${hoveredPoint.religion.foundedPlace}`,
            tooltipX + 10,
            tooltipY + 38
          );

          if (hoveredPoint.religion.followers) {
            ctx.fillText(
              `Fidèles: ${(Number(hoveredPoint.religion.followers) / 1_000_000).toFixed(0)}M`,
              tooltipX + 10,
              tooltipY + 53
            );
          }
        }
      }
    };

    const animate = () => {
      if (autoRotate && !isDragging) {
        currentRotation = { ...currentRotation, y: (currentRotation.y + 0.2) % 360 }; // Réduit de 0.3 à 0.2
      }
      drawGlobe();
      animationId = requestAnimationFrame(animate);
    };

    // Fonction pour dessiner les continents (contours simplifiés)
    const drawContinents = (
      ctx: CanvasRenderingContext2D,
      radius: number,
      centerX: number,
      centerY: number,
      rotation: { x: number; y: number }
    ) => {
      // Données simplifiées des continents (points clés lat/lon)
      const continents = [
        // Afrique
        { name: 'Africa', points: [[37, -6], [35, 30], [10, 45], [-35, 50], [-35, 15], [10, -15], [37, -6]] },
        // Europe
        { name: 'Europe', points: [[71, 25], [71, 50], [36, 40], [36, -10], [60, -10], [71, 25]] },
        // Asie
        { name: 'Asia', points: [[80, 60], [70, 180], [10, 140], [0, 100], [10, 70], [35, 50], [60, 60], [80, 60]] },
        // Amérique du Nord
        { name: 'North America', points: [[72, -170], [72, -50], [25, -80], [10, -110], [30, -170], [72, -170]] },
        // Amérique du Sud
        { name: 'South America', points: [[10, -80], [10, -35], [-55, -70], [-55, -80], [10, -80]] },
        // Australie
        { name: 'Australia', points: [[-10, 113], [-10, 154], [-44, 147], [-39, 115], [-10, 113]] },
      ];

      ctx.strokeStyle = '#475569'; // Couleur visible pour les continents
      ctx.lineWidth = 2;

      continents.forEach(continent => {
        ctx.beginPath();
        let firstPoint = true;

        for (let i = 0; i < continent.points.length; i++) {
          const [lat, lon] = continent.points[i];
          const point = project3D(lat, lon, radius, centerX, centerY, rotation);

          if (point.visible) {
            if (firstPoint) {
              ctx.moveTo(point.x, point.y);
              firstPoint = false;
            } else {
              ctx.lineTo(point.x, point.y);
            }
          }
        }

        ctx.stroke();
      });
    };

    // Sync currentRotation avec rotation state au démarrage et lors des changements manuels
    currentRotation = { ...rotation };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [geoPoints, zoom, isDragging, autoRotate, hoveredPoint]);

  // 3D projection helper
  const project3D = (
    lat: number,
    lon: number,
    radius: number,
    centerX: number,
    centerY: number,
    rot: { x: number; y: number }
  ) => {
    const latRad = (lat * Math.PI) / 180;
    const lonRad = ((lon + rot.y) * Math.PI) / 180;
    const rotXRad = (rot.x * Math.PI) / 180;

    let x = radius * Math.cos(latRad) * Math.sin(lonRad);
    let y = radius * Math.sin(latRad);
    let z = radius * Math.cos(latRad) * Math.cos(lonRad);

    // Rotation X
    const y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
    const z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);

    return {
      x: centerX + x,
      y: centerY - y2,
      z: z2,
      visible: z2 > 0,
    };
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setAutoRotate(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setRotation(r => ({
        x: r.x + dy * 0.5,
        y: r.y + dx * 0.5,
      }));
      setDragStart({ x: e.clientX, y: e.clientY });
    } else {
      // Detect hover
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.4 * zoom;

      const hovered = geoPoints.find(gp => {
        const projected = project3D(gp.lat, gp.lon, radius, centerX, centerY, rotation);
        if (!projected.visible) return false;
        const dist = Math.sqrt((x - projected.x) ** 2 + (y - projected.y) ** 2);
        return dist < (gp.size + 2) * 1.5;
      });

      setHoveredPoint(hovered || null);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (hoveredPoint && onReligionClick) {
      onReligionClick(hoveredPoint.religion);
    }
  };

  return (
    <div className="w-full h-full relative bg-slate-900">
      {/* Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button
          onClick={() => setZoom(z => Math.min(z * 1.2, 3))}
          className="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 text-white"
          title="Zoom avant"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom(z => Math.max(z / 1.2, 0.5))}
          className="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 text-white"
          title="Zoom arrière"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={() => { setRotation({ x: 0, y: 0 }); setZoom(1); setAutoRotate(true); }}
          className="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 text-white"
          title="Réinitialiser"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2 backdrop-blur-sm rounded-lg border border-white/20 text-white ${
            autoRotate ? 'bg-blue-500/50' : 'bg-white/10 hover:bg-white/20'
          }`}
          title="Rotation automatique"
        >
          🌍
        </button>
      </div>

      {/* Title */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20 text-white">
          <h3 className="font-bold">Globe Interactif</h3>
          <p className="text-xs opacity-80">
            {geoPoints.length} religions géolocalisées
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
      />

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 text-white text-xs">
          🖱️ Glisser pour faire pivoter • 🔍 Survoler pour infos • 🌍 Toggle pour rotation auto
        </div>
      </div>
    </div>
  );
}

