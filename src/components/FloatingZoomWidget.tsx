import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { playChime } from '../utils/audio';

interface FloatingZoomWidgetProps {
  zoomLevel: number;
  onZoomChange: (level: number) => void;
  soundEnabled: boolean;
}

export const FloatingZoomWidget: React.FC<FloatingZoomWidgetProps> = ({
  zoomLevel,
  onZoomChange,
  soundEnabled,
}) => {
  const handleZoom = (delta: number) => {
    if (soundEnabled) playChime(600, 0.1);
    const next = Math.min(220, Math.max(90, zoomLevel + delta));
    onZoomChange(next);
  };

  const handleReset = () => {
    if (soundEnabled) playChime(500, 0.1);
    onZoomChange(100);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 bg-stone-900/95 border-2 border-amber-500/60 p-1.5 rounded-2xl shadow-2xl backdrop-blur-md">
      <button
        onClick={() => handleZoom(-15)}
        className="w-9 h-9 rounded-xl bg-stone-850 hover:bg-stone-750 text-stone-300 hover:text-white flex items-center justify-center font-bold text-sm transition-all active:scale-95 cursor-pointer"
        title="Zoom Out (-)"
      >
        <ZoomOut className="w-4 h-4" />
      </button>

      <button
        onClick={handleReset}
        className="px-2.5 h-9 rounded-xl bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/40 flex items-center justify-center font-mono font-black text-xs transition-all active:scale-95 cursor-pointer"
        title="Reset Zoom (100%)"
      >
        {zoomLevel}%
      </button>

      <button
        onClick={() => handleZoom(15)}
        className="w-9 h-9 rounded-xl bg-stone-850 hover:bg-stone-750 text-stone-300 hover:text-white flex items-center justify-center font-bold text-sm transition-all active:scale-95 cursor-pointer"
        title="Zoom In (+)"
      >
        <ZoomIn className="w-4 h-4 text-amber-400" />
      </button>
    </div>
  );
};
