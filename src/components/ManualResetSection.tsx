import React, { useState } from 'react';
import { MANUAL_RESET_DATA, ManualResetItem, ResetCategory } from '../data/manualResetData';
import { Sparkles, Search, X, CheckCircle2, ChevronRight, Wrench, AlertTriangle, Car, Key, Copy, Check } from 'lucide-react';
import { playChime } from '../utils/audio';

interface ManualResetSectionProps {
  soundEnabled: boolean;
  searchQuery?: string;
}

export const ManualResetSection: React.FC<ManualResetSectionProps> = ({
  soundEnabled,
  searchQuery = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ResetCategory | 'all'>('all');
  const [internalSearch, setInternalSearch] = useState<string>('');
  const [selectedReset, setSelectedReset] = useState<ManualResetItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const effectiveSearch = (searchQuery || internalSearch).toLowerCase().trim();

  const categories: { key: ResetCategory | 'all'; labelMy: string; icon: string }[] = [
    { key: 'all', labelMy: 'အားလုံး (All)', icon: '⭐' },
    { key: 'oil_engine', labelMy: 'အင်ဂျင် & ဆီပေးစနစ်', icon: '🛢️' },
    { key: 'windows_doors', labelMy: 'မှန် & တံခါးစနစ်', icon: '🪟' },
    { key: 'brakes_steering', labelMy: 'ဘရိတ် & စတီယာရင်', icon: '🛑' },
    { key: 'keys_electronics', labelMy: 'သော့ & အီလက်ထရောနစ်', icon: '🔑' },
  ];

  const filteredItems = MANUAL_RESET_DATA.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    if (!matchesCat) return false;

    if (!effectiveSearch) return true;

    return (
      item.titleMy.toLowerCase().includes(effectiveSearch) ||
      item.titleEn.toLowerCase().includes(effectiveSearch) ||
      item.applicableCars.toLowerCase().includes(effectiveSearch) ||
      item.summary.toLowerCase().includes(effectiveSearch) ||
      item.steps.some((s) => s.toLowerCase().includes(effectiveSearch)) ||
      item.proTips.toLowerCase().includes(effectiveSearch)
    );
  });

  const handleOpenModal = (item: ManualResetItem) => {
    if (soundEnabled) playChime(600, 0.12);
    setSelectedReset(item);
  };

  const handleCopySteps = (item: ManualResetItem) => {
    const textToCopy = `【 ${item.titleMy} 】\nအသုံးပြုနိုင်သောကား: ${item.applicableCars}\n\nလုပ်နည်းအဆင့်ဆင့်:\n${item.steps.join('\n')}\n\nအကြံပြုချက်: ${item.proTips}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    if (soundEnabled) playChime(800, 0.1);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="bg-stone-900/90 border border-emerald-500/30 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-emerald-500/20 shrink-0">
            <Sparkles className="w-5 h-5 text-stone-950" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-emerald-300 flex items-center gap-2">
              ၈။ စက်မသုံးဘဲ လက်ဖြင့် Reset ပြုလုပ်နည်းများ
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                Secret Manual Resets
              </span>
            </h2>
            <p className="text-xs text-stone-400">
              စကင်နာစက်မသုံးဘဲ သော့၊ ခြေနင်းပြားနှင့် ခလုတ်များဖြင့် ကွန်ပျူတာ Reset လုပ်နိုင်သော မာစတာပညာများ
            </p>
          </div>
        </div>

        {/* Category Horizontal Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                if (soundEnabled) playChime(500, 0.08);
                setSelectedCategory(cat.key);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                selectedCategory === cat.key
                  ? 'bg-emerald-500 text-stone-950 font-black shadow-md shadow-emerald-500/30'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.labelMy}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Local Search Input if no global query */}
      {!searchQuery && (
        <div className="mt-3 relative">
          <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={internalSearch}
            onChange={(e) => setInternalSearch(e.target.value)}
            placeholder="Reset ပြုလုပ်နည်း ရိုက်ရှာပါ (ဥပမာ: ပါဝါဝင်းဒိုး, အင်ဂျင်ဝိုင်, T-BELT, ဘက်ကင်မရာ, တာယာလေပေါင်, စလိုးချနည်း, သော့မီး)..."
            className="w-full bg-stone-950 border border-stone-800 rounded-xl py-2 pl-9 pr-4 text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      )}

      {/* Grid of Reset Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenModal(item)}
            className="rounded-xl border border-stone-800 hover:border-emerald-500/50 bg-stone-950/60 hover:bg-stone-950/90 p-4 transition-all cursor-pointer group flex flex-col justify-between shadow-md"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-2xl p-2 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center">
                  {item.icon}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                  {item.badge}
                </span>
              </div>

              <h4 className="font-bold text-sm text-stone-100 group-hover:text-emerald-300 transition-colors mt-1">
                {item.titleMy}
              </h4>
              <p className="text-xs font-mono text-stone-400 line-clamp-1">
                {item.titleEn}
              </p>

              {/* Applicable Cars Badge */}
              <div className="mt-2 text-[11px] text-amber-300/90 flex items-center gap-1.5 font-medium line-clamp-1">
                <Car className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                <span>{item.applicableCars}</span>
              </div>

              {/* Summary */}
              <p className="mt-2 text-xs text-stone-300 line-clamp-2 leading-relaxed bg-stone-900/60 p-2 rounded-lg border border-stone-850">
                {item.summary}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
              <span className="text-[10px] text-stone-500">အဆင့်လိုက် လုပ်နည်း</span>
              <span className="font-bold text-emerald-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                ဖတ်ရှုမည် <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL MODAL */}
      {selectedReset && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-150 overflow-y-auto"
          onClick={() => setSelectedReset(null)}
        >
          <div
            className="bg-stone-900 border-2 border-emerald-500/50 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedReset(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-stone-800 pr-10">
              <span className="text-3xl p-2.5 rounded-2xl bg-stone-950 border border-stone-800 shadow-inner">
                {selectedReset.icon}
              </span>
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40 bg-emerald-500/20 text-emerald-300 inline-block mb-1">
                  {selectedReset.badge}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-stone-100">
                  {selectedReset.titleMy}
                </h3>
                <p className="text-xs font-mono text-stone-400">
                  {selectedReset.titleEn}
                </p>
              </div>
            </div>

            {/* Applicable Cars */}
            <div className="mt-3 p-2.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center gap-2 text-xs text-amber-300">
              <Car className="w-4 h-4 shrink-0 text-amber-400" />
              <span><strong>အသုံးပြုနိုင်သော ကားများ:</strong> {selectedReset.applicableCars}</span>
            </div>

            {/* Conditions Required */}
            <div className="mt-3 bg-stone-950 p-3 rounded-xl border border-stone-800 text-xs">
              <strong className="text-cyan-300 block mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                ကြိုတင် ပြင်ဆင်ထားရမည့် အခြေအနေ:
              </strong>
              <ul className="list-disc list-inside space-y-1 text-stone-300 text-[11px]">
                {selectedReset.conditions.map((cond, idx) => (
                  <li key={idx}>{cond}</li>
                ))}
              </ul>
            </div>

            {/* Numbered Step-by-Step Execution */}
            <div className="mt-3 bg-stone-950 p-3.5 rounded-xl border border-emerald-500/30 text-xs">
              <strong className="text-emerald-300 block mb-2 text-xs flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-emerald-400" />
                လက်တွေ့ လုပ်ဆောင်ရမည့် အဆင့်ဆင့်:
              </strong>
              <div className="space-y-2 text-stone-200 text-[11px] leading-relaxed">
                {selectedReset.steps.map((step, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tips */}
            <div className="mt-3 bg-amber-950/20 p-3 rounded-xl border border-amber-500/30 text-amber-200 text-[11px]">
              <strong className="text-amber-300 block mb-0.5 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                ဝပ်ရှော့ ဆရာကြီး လျှို့ဝှက်အကြံပြုချက်:
              </strong>
              {selectedReset.proTips}
            </div>

            {/* Why Needed */}
            <div className="mt-2.5 bg-stone-950 p-2.5 rounded-xl border border-stone-800 text-stone-400 text-[10px]">
              <strong className="text-stone-300">💡 ဘာကြောင့် ဒီ Reset ကို လုပ်ရသလဲ:</strong> {selectedReset.whyNeeded}
            </div>

            {/* Actions: Copy and Close */}
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => handleCopySteps(selectedReset)}
                className="flex-1 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-stone-700"
              >
                {copiedId === selectedReset.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>ကူးယူပြီးပါပြီ (Copied)</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-400" />
                    <span>လုပ်နည်း ကူးယူမည် (Copy)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedReset(null)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-stone-950 font-bold text-xs shadow-lg transition-all"
              >
                ပိတ်မည် (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
