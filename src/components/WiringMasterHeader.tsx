import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Search, ZoomIn, ZoomOut, Volume2, VolumeX, Sparkles, X } from 'lucide-react';
import { SystemCategory } from '../types/wiring';
import { playChime } from '../utils/audio';

interface WiringMasterHeaderProps {
  currentCategory: SystemCategory;
  onSelectCategory: (cat: SystemCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  zoomLevel: number;
  onZoomChange: (level: number) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const WiringMasterHeader: React.FC<WiringMasterHeaderProps> = ({
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  zoomLevel,
  onZoomChange,
  soundEnabled,
  onToggleSound,
}) => {
  const zoomSteps = [100, 120, 140, 160, 180, 200];

  const handleZoom = (step: number) => {
    if (soundEnabled) playChime(600, 0.1);
    onZoomChange(step);
  };

  const handleStepZoom = (delta: number) => {
    const next = Math.min(220, Math.max(90, zoomLevel + delta));
    handleZoom(next);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-amber-500/30 text-stone-100 shadow-2xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
        {/* Top Row: Brand & Main Title & Actions */}
        <div className="flex items-center justify-between gap-3">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <BrandLogo size="md" showModalOnClick={true} />

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-black text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 tracking-wide">
                  ★ GREATSTAR.Z.N.W ★
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  PRO
                </span>
                {/* Visual indicator for Aircon update so Sayar can immediately distinguish old vs new app */}
                <span className="text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-400/70 flex items-center gap-1 shadow-md shadow-cyan-500/30 animate-pulse">
                  <span className="text-[11px]">❄️</span>
                  <span>A/C အဲကွန်းပါ</span>
                </span>
              </div>

              <h1 className="text-xs sm:text-sm font-bold text-stone-200 flex items-center gap-1.5 flex-wrap mt-0.5">
                <span className="text-cyan-400 font-mono font-semibold">⚙ ZAW NAING WIN ⚙</span>
                <span className="text-stone-500">•</span>
                <span className="text-stone-300 text-[11px] sm:text-xs font-normal">
                  ဝါယာရိန်း၊ ဆန်ဆာ & <span className="text-cyan-300 font-bold">❄️ ကားအဲကွန်း (A/C) မာစတာ</span>
                </span>
              </h1>
            </div>
          </div>

          {/* Sound & Zoom Controls on Right */}
          <div className="flex items-center gap-2">
            {/* Workshop Zoom Quick Buttons */}
            <div className="hidden lg:flex items-center gap-1 bg-stone-900 border border-stone-800 p-1 rounded-xl text-xs">
              <button
                onClick={() => handleStepZoom(-20)}
                className="p-1 text-stone-400 hover:text-white rounded hover:bg-stone-800"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              {zoomSteps.map((s) => (
                <button
                  key={s}
                  onClick={() => handleZoom(s)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all ${
                    zoomLevel === s
                      ? 'bg-amber-500 text-stone-950'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {s}%
                </button>
              ))}
              <button
                onClick={() => handleStepZoom(20)}
                className="p-1 text-stone-400 hover:text-white rounded hover:bg-stone-800"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={onToggleSound}
              className="p-2 rounded-xl bg-stone-900 border border-stone-800 hover:bg-stone-800 text-stone-300 hover:text-amber-300 transition-colors"
              title={soundEnabled ? 'Mute Chime' : 'Enable Chime'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-amber-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-stone-500" />
              )}
            </button>
          </div>
        </div>

        {/* Global Live Instant Search Bar */}
        <div className="mt-2.5 relative">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ကားတစ်စီးလုံး ဝါယာရိန်း၊ Pinout၊ ဆန်ဆာ၊ အပြစ်ရှာနည်း ရိုက်ရှာပါ (ဥပမာ: 5V, E2, TPS, Crank, OCV, Relay 87, ရေအပူချိန်)..."
            className="w-full bg-stone-900 border border-amber-500/30 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-9 text-xs sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-2.5 text-stone-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation Categories Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pt-2.5 pb-1 no-scrollbar text-xs">
          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.08);
              onSelectCategory('all');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all shrink-0 ${
              currentCategory === 'all'
                ? 'bg-amber-500 text-stone-950 font-black shadow-md shadow-amber-500/30'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            ⭐ အားလုံး (All Overview)
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.08);
              onSelectCategory('power_ground');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all shrink-0 ${
              currentCategory === 'power_ground'
                ? 'bg-amber-500 text-stone-950 font-black shadow-md shadow-amber-500/30'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            ⚡ ၁။ ပါဝါ & ဂရောင်း (Relay 30/87)
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.08);
              onSelectCategory('pinouts');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all shrink-0 ${
              currentCategory === 'pinouts'
                ? 'bg-cyan-500 text-stone-950 font-black shadow-md shadow-cyan-500/30'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            🔌 ၂။ Pinout ဘာသာပြန်ဇယား
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.08);
              onSelectCategory('sensors');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all shrink-0 ${
              currentCategory === 'sensors'
                ? 'bg-emerald-500 text-stone-950 font-black shadow-md shadow-emerald-500/30'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            🔍 ၃။ ဆန်ဆာ (၃၈) မျိုး လမ်းညွှန်
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.08);
              onSelectCategory('assemblies');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all shrink-0 ${
              currentCategory === 'assemblies'
                ? 'bg-orange-500 text-stone-950 font-black shadow-md shadow-orange-500/30'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            ⚙️ ၄။ လေတံခါး/VVT-i/EGR
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.08);
              onSelectCategory('fuse_box');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all shrink-0 ${
              currentCategory === 'fuse_box'
                ? 'bg-yellow-500 text-stone-950 font-black shadow-md shadow-yellow-500/30'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            🛡️ ၅။ ဖျူးခုံ & အရောင်စံချိန်
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.08);
              onSelectCategory('interior_symbols');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all shrink-0 ${
              currentCategory === 'interior_symbols'
                ? 'bg-indigo-500 text-stone-950 font-black shadow-md shadow-indigo-500/30'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            🎛️ ၆။ အတွင်းခန်း ခလုတ်များ
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.08);
              onSelectCategory('dashboard_lights');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all shrink-0 ${
              currentCategory === 'dashboard_lights'
                ? 'bg-rose-500 text-stone-950 font-black shadow-md shadow-rose-500/30'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            🚦 ၇။ ဒိုင်ခွက် မီးနီ/မီးဝါ လက်စွဲ
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.08);
              onSelectCategory('manual_reset');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all shrink-0 ${
              currentCategory === 'manual_reset'
                ? 'bg-emerald-500 text-stone-950 font-black shadow-md shadow-emerald-500/30'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            ✨ ၈။ လက်ဖြင့် Reset နည်းများ (Manual Resets)
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.08);
              onSelectCategory('jdm_translator');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all shrink-0 ${
              currentCategory === 'jdm_translator'
                ? 'bg-cyan-500 text-stone-950 font-black shadow-md shadow-cyan-500/30'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            🇯🇵 ၉။ စခရင် ဂျပန်စာ ဘာသာပြန် (JDM Decoder)
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.08);
              onSelectCategory('dtc_codes');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all shrink-0 ${
              currentCategory === 'dtc_codes'
                ? 'bg-blue-500 text-stone-950 font-black shadow-md shadow-blue-500/30'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            💻 ၁၀။ အယ်တာကုဒ် DTC မာစတာ (OBD Decoder)
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.08);
              onSelectCategory('bench_tester');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all shrink-0 ${
              currentCategory === 'bench_tester'
                ? 'bg-purple-500 text-stone-950 font-black shadow-md shadow-purple-500/30'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            🛠️ ၁၁။ DIY ဆန်ဆာစမ်းသပ်ခုံ
          </button>
        </nav>
      </div>
    </header>
  );
};
