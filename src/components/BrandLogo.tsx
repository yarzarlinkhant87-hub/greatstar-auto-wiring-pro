import React, { useState } from 'react';
import { X, Award, ShieldCheck, Zap, Cpu, Sparkles, Wrench } from 'lucide-react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showModalOnClick?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showModalOnClick = true,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dimensionClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-44 h-44',
  }[size];

  const handleClick = () => {
    if (showModalOnClick) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {/* Interactive Circular Vector Logo Emblem */}
      <div
        onClick={handleClick}
        className={`${dimensionClasses} relative cursor-pointer select-none group transition-transform active:scale-95 duration-200 shrink-0`}
        title="★ GREATSTAR.Z.N.W ★ (Zaw Naing Win) - Click to view Full HD Logo"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(245,158,11,0.45)] group-hover:drop-shadow-[0_0_20px_rgba(245,158,11,0.7)] transition-all"
        >
          <defs>
            {/* Rich Metallic Gold Gradient */}
            <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="25%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="75%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            {/* Deep Industrial Navy/Carbon Gradient */}
            <radialGradient id="darkCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="60%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* Electric Blue Neon Accent */}
            <linearGradient id="electricBlue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>

            {/* Circular Text Paths */}
            <path
              id="topArcPath"
              d="M 28,100 A 72,72 0 0,1 172,100"
              fill="none"
            />
            <path
              id="bottomArcPath"
              d="M 32,102 A 68,68 0 0,0 168,102"
              fill="none"
            />
          </defs>

          {/* Outer Industrial Gear Teeth Ring */}
          <circle
            cx="100"
            cy="100"
            r="94"
            fill="none"
            stroke="url(#goldMetallic)"
            strokeWidth="3.5"
            strokeDasharray="4 2"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1.5"
          />

          {/* Deep Navy Inner Body */}
          <circle cx="100" cy="100" r="86" fill="url(#darkCore)" />

          {/* Inner Golden Ring */}
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="url(#goldMetallic)"
            strokeWidth="2.5"
          />

          {/* Top Curved Text: ★ GREATSTAR.Z.N.W ★ */}
          <text
            fontSize="10.8"
            fontWeight="900"
            letterSpacing="1.8"
            fill="url(#goldMetallic)"
            textAnchor="middle"
          >
            <textPath href="#topArcPath" startOffset="50%">
              ★ GREATSTAR.Z.N.W ★
            </textPath>
          </text>

          {/* Bottom Curved Text: ⚙ ZAW NAING WIN ⚙ */}
          <text
            fontSize="10"
            fontWeight="900"
            letterSpacing="1.4"
            fill="url(#electricBlue)"
            textAnchor="middle"
          >
            <textPath href="#bottomArcPath" startOffset="50%">
              ⚙ ZAW NAING WIN ⚙
            </textPath>
          </text>

          {/* Central High-Tech ECU, Wiring & Oscilloscope Wave Graphics */}
          <g transform="translate(100, 100)">
            {/* Circuit Microchip Box */}
            <rect
              x="-24"
              y="-24"
              width="48"
              height="48"
              rx="6"
              fill="#090d16"
              stroke="url(#goldMetallic)"
              strokeWidth="2"
            />

            {/* Chip Connection Pins */}
            {[-16, -8, 0, 8, 16].map((offset) => (
              <React.Fragment key={offset}>
                <line x1={offset} y1="-28" x2={offset} y2="-24" stroke="#fbbf24" strokeWidth="1.8" />
                <line x1={offset} y1="24" x2={offset} y2="28" stroke="#fbbf24" strokeWidth="1.8" />
                <line x1="-28" y1={offset} x2="-24" y2={offset} stroke="#38bdf8" strokeWidth="1.8" />
                <line x1="24" y1={offset} x2="28" y2={offset} stroke="#38bdf8" strokeWidth="1.8" />
              </React.Fragment>
            ))}

            {/* Center Electric Spark / Oscilloscope Waveform */}
            <path
              d="M -18,2 L -10,2 L -6,-12 L -1,14 L 4,-8 L 8,4 L 18,2"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Glowing Sensor Center Dot */}
            <circle cx="0" cy="0" r="3.5" fill="#f59e0b" />
            <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
          </g>
        </svg>

        {/* Small gold sparkle badge */}
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-[9px] font-black shadow-md border border-amber-300">
          ★
        </div>
      </div>

      {/* Full HD Logo Showcase Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-gradient-to-b from-stone-900 via-stone-950 to-black border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full shadow-2xl shadow-amber-500/20 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Full HD Vector Logo */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-4 relative">
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_30px_rgba(245,158,11,0.6)]">
                <circle cx="100" cy="100" r="94" fill="none" stroke="url(#goldMetallic)" strokeWidth="4" strokeDasharray="4 2" />
                <circle cx="100" cy="100" r="90" fill="none" stroke="#fbbf24" strokeWidth="2" />
                <circle cx="100" cy="100" r="86" fill="url(#darkCore)" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="url(#goldMetallic)" strokeWidth="3" />

                <text fontSize="10.8" fontWeight="900" letterSpacing="1.8" fill="url(#goldMetallic)" textAnchor="middle">
                  <textPath href="#topArcPath" startOffset="50%">
                    ★ GREATSTAR.Z.N.W ★
                  </textPath>
                </text>

                <text fontSize="10" fontWeight="900" letterSpacing="1.4" fill="url(#electricBlue)" textAnchor="middle">
                  <textPath href="#bottomArcPath" startOffset="50%">
                    ⚙ ZAW NAING WIN ⚙
                  </textPath>
                </text>

                <g transform="translate(100, 100)">
                  <rect x="-24" y="-24" width="48" height="48" rx="6" fill="#090d16" stroke="url(#goldMetallic)" strokeWidth="2.5" />
                  {[-16, -8, 0, 8, 16].map((offset) => (
                    <React.Fragment key={offset}>
                      <line x1={offset} y1="-28" x2={offset} y2="-24" stroke="#fbbf24" strokeWidth="2" />
                      <line x1={offset} y1="24" x2={offset} y2="28" stroke="#fbbf24" strokeWidth="2" />
                      <line x1="-28" y1={offset} x2="-24" y2={offset} stroke="#38bdf8" strokeWidth="2" />
                      <line x1="24" y1={offset} x2="28" y2={offset} stroke="#38bdf8" strokeWidth="2" />
                    </React.Fragment>
                  ))}
                  <path
                    d="M -18,2 L -10,2 L -6,-12 L -1,14 L 4,-8 L 8,4 L 18,2"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="0" cy="0" r="4" fill="#f59e0b" />
                  <circle cx="0" cy="0" r="2" fill="#ffffff" />
                </g>
              </svg>
            </div>

            {/* Official Title Information */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                OFFICIAL WORKSHOP BRAND
              </div>
              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 tracking-wide">
                GREATSTAR.Z.N.W
              </h2>
              <p className="text-sm font-semibold text-cyan-400 flex items-center justify-center gap-1.5">
                <Wrench className="w-4 h-4" />
                Engineered & Created by Zaw Naing Win
              </p>
              <p className="text-xs text-stone-300 pt-2 border-t border-stone-800">
                ကားတစ်စီးလုံး ဝါယာရိန်း၊ ဆန်ဆာ & ECU ထိန်းချုပ်မှု မာစတာလက်စွဲ
              </p>
              <div className="text-[11px] text-stone-400 flex items-center justify-center gap-3 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Offline Ready
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Automotive Wiring Master
                </span>
              </div>
            </div>

            {/* Close Button at bottom */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all"
            >
              ပိတ်မည် (Close)
            </button>
          </div>
        </div>
      )}
    </>
  );
};
