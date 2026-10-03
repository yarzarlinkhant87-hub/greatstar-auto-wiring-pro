import React, { useState } from 'react';
import { DASHBOARD_LIGHTS_DATA, DashboardLightItem, LightSeverity, DashboardLightCategory } from '../data/dashboardLightsData';
import { DashboardSymbolIcon } from './DashboardSymbolIcon';
import { AlertCircle, AlertTriangle, Search, X, ShieldAlert, Wrench, ChevronRight } from 'lucide-react';
import { playChime } from '../utils/audio';

interface DashboardLightsSectionProps {
  soundEnabled: boolean;
  searchQuery?: string;
}

export const DashboardLightsSection: React.FC<DashboardLightsSectionProps> = ({
  soundEnabled,
  searchQuery = '',
}) => {
  const [selectedSeverity, setSelectedSeverity] = useState<LightSeverity | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<DashboardLightCategory | 'all'>('all');
  const [internalSearch, setInternalSearch] = useState<string>('');
  const [selectedLight, setSelectedLight] = useState<DashboardLightItem | null>(null);

  const effectiveSearch = (searchQuery || internalSearch).toLowerCase().trim();

  const categories: { key: DashboardLightCategory | 'all'; labelMy: string; icon: string }[] = [
    { key: 'all', labelMy: 'အားလုံး (All)', icon: '⭐' },
    { key: 'engine', labelMy: 'အင်ဂျင် & ဆီပေးစနစ်', icon: '⚙️' },
    { key: 'brake', labelMy: 'ဘရိတ် & လျှောချော်မှု', icon: '🛑' },
    { key: 'electrical', labelMy: 'လျှပ်စစ် & ဘက်ထရီ', icon: '🔋' },
    { key: 'safety', labelMy: 'လေအိတ် & ခါးပတ်', icon: '🛡️' },
    { key: 'lighting', labelMy: 'မီးကြီး & မီးခိုးခွဲ', icon: '💡' },
    { key: 'chassis_4wd', labelMy: '4WD & စတီယာရင်', icon: '🛞' },
  ];

  const filteredLights = DASHBOARD_LIGHTS_DATA.filter((item) => {
    const matchesSev = selectedSeverity === 'all' || item.severity === selectedSeverity;
    if (!matchesSev) return false;

    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    if (!matchesCat) return false;

    if (!effectiveSearch) return true;

    return (
      item.nameMy.toLowerCase().includes(effectiveSearch) ||
      item.nameEn.toLowerCase().includes(effectiveSearch) ||
      item.causes.some((c) => c.toLowerCase().includes(effectiveSearch)) ||
      item.diagnosticCheck.toLowerCase().includes(effectiveSearch) ||
      item.canDrive.toLowerCase().includes(effectiveSearch)
    );
  });

  const handleOpenLight = (light: DashboardLightItem) => {
    if (soundEnabled) playChime(650, 0.12);
    setSelectedLight(light);
  };

  const getBorderColor = (sev: LightSeverity) => {
    switch (sev) {
      case 'red':
        return 'border-rose-500/50 hover:border-rose-400 bg-rose-950/20';
      case 'yellow':
        return 'border-amber-500/50 hover:border-amber-400 bg-amber-950/20';
      case 'green':
        return 'border-emerald-500/50 hover:border-emerald-400 bg-emerald-950/20';
      case 'blue':
        return 'border-cyan-500/50 hover:border-cyan-400 bg-cyan-950/20';
    }
  };

  const getBadgeStyle = (sev: LightSeverity) => {
    switch (sev) {
      case 'red':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'yellow':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'green':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'blue':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
    }
  };

  return (
    <div className="bg-stone-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 via-amber-500 to-yellow-600 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-rose-500/20 shrink-0">
            <ShieldAlert className="w-5 h-5 text-stone-950 fill-stone-950" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-rose-300 flex items-center gap-2">
              ၇။ ဒိုင်ခွက် မီးနီ/မီးဝါ အချက်ပြသင်္ကေတများ မာစတာလက်စွဲ
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300">
                Dashboard Vector Lights
              </span>
            </h2>
            <p className="text-xs text-stone-400">
              ကားဒိုင်ခွက်ပေါ်ရှိ မူရင်းသင်္ကေတရုပ်ပုံစစ်စစ်များ (ISO Standard Automotive Symbols) နှင့် စစ်ဆေးနည်း
            </p>
          </div>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex flex-wrap gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs shrink-0">
          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.08);
              setSelectedSeverity('all');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              selectedSeverity === 'all'
                ? 'bg-amber-500 text-stone-950 font-black'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            အားလုံး (All)
          </button>
          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.08);
              setSelectedSeverity('red');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              selectedSeverity === 'red'
                ? 'bg-rose-500 text-stone-950 font-black'
                : 'text-rose-400 hover:text-white'
            }`}
          >
            🔴 မီးနီ (စက်ရပ်ရန်)
          </button>
          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.08);
              setSelectedSeverity('yellow');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              selectedSeverity === 'yellow'
                ? 'bg-amber-500 text-stone-950 font-black'
                : 'text-amber-400 hover:text-white'
            }`}
          >
            🟡 မီးဝါ (စစ်ဆေးရန်)
          </button>
          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.08);
              setSelectedSeverity('green');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              selectedSeverity === 'green'
                ? 'bg-emerald-500 text-stone-950 font-black'
                : 'text-emerald-400 hover:text-white'
            }`}
          >
            🟢 မီးစိမ်း / 🔵 မီးပြာ
          </button>
        </div>
      </div>

      {/* Category Horizontal Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar border-b border-stone-850">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              if (soundEnabled) playChime(500, 0.08);
              setSelectedCategory(cat.key);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              selectedCategory === cat.key
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/25 font-black'
                : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.labelMy}</span>
          </button>
        ))}
      </div>

      {/* Local Search Input if no global query */}
      {!searchQuery && (
        <div className="mt-3 relative">
          <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={internalSearch}
            onChange={(e) => setInternalSearch(e.target.value)}
            placeholder="ဒိုင်ခွက်မီး အမည် ရိုက်ရှာပါ (ဥပမာ: ဆီကရားနီ, ဘက်ထရီ, ဘရိတ်, ရေဆူ, ချက်အင်ဂျင်, ABS, TPMS, သော့မီး)..."
            className="w-full bg-stone-950 border border-stone-800 rounded-xl py-2 pl-9 pr-4 text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-rose-500 transition-colors"
          />
        </div>
      )}

      {/* Warning Lights Grid with Authentic Automotive Cluster SVGs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4">
        {filteredLights.map((light) => (
          <div
            key={light.id}
            onClick={() => handleOpenLight(light)}
            className={`rounded-xl border p-4 transition-all cursor-pointer group flex flex-col justify-between shadow-md ${getBorderColor(
              light.severity
            )}`}
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                {/* Authentic Automotive Cluster Vector Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-stone-950 border border-stone-800 shadow-inner flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform">
                  <DashboardSymbolIcon
                    symbolKey={light.symbolKey}
                    severity={light.severity}
                    size={32}
                  />
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getBadgeStyle(
                      light.severity
                    )}`}
                  >
                    {light.severityLabelMy}
                  </span>
                  <span className="text-[9px] text-stone-500">
                    {light.categoryLabelMy}
                  </span>
                </div>
              </div>

              <h4 className="font-bold text-sm text-stone-100 group-hover:text-amber-300 transition-colors mt-1">
                {light.nameMy}
              </h4>
              <p className="text-xs font-mono text-stone-400 line-clamp-1">
                {light.nameEn}
              </p>

              {/* Can I Drive Badge */}
              <div className="mt-2.5">
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded inline-block ${
                    light.canDrive.includes('လုံးဝ')
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : light.canDrive.includes('သတိထား')
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  🚗 {light.canDrive}
                </span>
              </div>

              {/* Causes Brief */}
              <div className="mt-2 text-[11px] text-stone-300 line-clamp-2 bg-stone-950/60 p-2 rounded-lg border border-stone-850">
                <strong>ဖြစ်နိုင်သော အကြောင်းရင်း:</strong> {light.causes[0]}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
              <span className="text-[10px] text-stone-500">နှိပ်၍ အချက်အလက်နှင့် ပုံစံကြည့်မည်</span>
              <span className="font-bold text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                အသေးစိတ် <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL MODAL WITH LARGE AUTHENTIC VECTOR DASHBOARD GRAPHIC */}
      {selectedLight && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-150 overflow-y-auto"
          onClick={() => setSelectedLight(null)}
        >
          <div
            className="bg-stone-900 border-2 border-amber-500/50 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedLight(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header with High-Resolution Dashboard Symbol Graphic */}
            <div className="flex items-center gap-4 pb-4 border-b border-stone-800">
              {/* Large Glowing Cluster Symbol */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-stone-950 border-2 border-stone-800 shadow-2xl flex items-center justify-center p-3 shrink-0 relative overflow-hidden">
                {/* Glow backdrop */}
                <div
                  className="absolute inset-0 opacity-20 blur-md"
                  style={{
                    backgroundColor:
                      selectedLight.severity === 'red'
                        ? '#ef4444'
                        : selectedLight.severity === 'yellow'
                        ? '#f59e0b'
                        : selectedLight.severity === 'green'
                        ? '#10b981'
                        : '#38bdf8',
                  }}
                ></div>
                <DashboardSymbolIcon
                  symbolKey={selectedLight.symbolKey}
                  severity={selectedLight.severity}
                  size={48}
                  className="relative z-10"
                />
              </div>

              <div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border inline-block mb-1 ${getBadgeStyle(
                    selectedLight.severity
                  )}`}
                >
                  {selectedLight.severityLabelMy}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-stone-100">
                  {selectedLight.nameMy}
                </h3>
                <p className="text-xs font-mono text-stone-400">
                  {selectedLight.nameEn}
                </p>
                <span className="text-[10px] text-stone-500 mt-1 block">
                  အမျိုးအစား: {selectedLight.categoryLabelMy}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="mt-4 space-y-3.5 text-xs">
              {/* Can I Drive Callout */}
              <div
                className={`p-3 rounded-xl border font-bold flex items-center gap-2 ${
                  selectedLight.canDrive.includes('လုံးဝ')
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                    : selectedLight.canDrive.includes('သတိထား')
                    ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                    : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                }`}
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>ကားဆက်မောင်းလို့ ရ/မရ: {selectedLight.canDrive}</span>
              </div>

              {/* Causes */}
              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                <strong className="text-amber-300 block mb-1.5 text-xs flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  လင်းလာရသည့် အဓိက အကြောင်းရင်းများ:
                </strong>
                <ul className="list-disc list-inside space-y-1 text-stone-300 text-[11px]">
                  {selectedLight.causes.map((c, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Diagnostic Check */}
              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                <strong className="text-cyan-300 block mb-1 text-xs flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-cyan-400" />
                  ဝပ်ရှော့သမား စစ်ဆေးအပြစ်ရှာနည်း:
                </strong>
                <p className="text-stone-300 leading-relaxed text-[11px]">
                  {selectedLight.diagnosticCheck}
                </p>
              </div>

              {/* Symptoms / Danger */}
              <div className="bg-rose-950/20 p-3 rounded-xl border border-rose-500/30 text-rose-200 text-[11px]">
                <strong className="text-rose-300 block mb-0.5">⚠️ ဖြစ်ပေါ်နိုင်သော အန္တရာယ်:</strong>
                {selectedLight.symptoms}
              </div>

              {/* Manufacturer Notes if any */}
              {selectedLight.manufacturerNotes && (
                <div className="bg-purple-950/20 p-3 rounded-xl border border-purple-500/30 text-purple-200 text-[11px]">
                  <strong className="text-purple-300 block mb-0.5">💡 ကားကုမ္ပဏီအလိုက် မှတ်ချက်:</strong>
                  {selectedLight.manufacturerNotes}
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedLight(null)}
              className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-stone-950 font-bold text-xs shadow-lg transition-all"
            >
              ပိတ်မည် (Close)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
