import React, { useState } from 'react';
import { INTERIOR_SYMBOLS_DATA, InteriorSymbolItem, SymbolCategory } from '../data/interiorSymbolsData';
import { Search, Sliders, AlertTriangle, ShieldCheck, HelpCircle, Eye, Car, Sparkles } from 'lucide-react';
import { playChime } from '../utils/audio';

interface InteriorSymbolsSectionProps {
  soundEnabled: boolean;
  searchQuery?: string;
}

export const InteriorSymbolsSection: React.FC<InteriorSymbolsSectionProps> = ({
  soundEnabled,
  searchQuery = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SymbolCategory | 'all'>('all');
  const [internalSearch, setInternalSearch] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<InteriorSymbolItem | null>(null);

  const effectiveSearch = (searchQuery || internalSearch).toLowerCase().trim();

  const categories: { key: SymbolCategory | 'all'; labelMy: string; icon: string }[] = [
    { key: 'all', labelMy: 'အားလုံး (All)', icon: '⭐' },
    { key: 'steering', labelMy: 'စတီယာရင် (Steering)', icon: '🏎️' },
    { key: 'console_mode', labelMy: 'ECO/SPORT/မုဒ်များ', icon: '⚡' },
    { key: 'dash_warning', labelMy: 'ဒိုင်ခွက် မီးနီ/မီးဝါ', icon: '⚠️' },
    { key: 'climate', labelMy: 'အဲကွန်း/DUAL/မှန်ဝါး', icon: '❄️' },
    { key: 'door_mirror', labelMy: 'တံခါး/မှန်ခေါက်', icon: '🪟' },
    { key: 'audio_tv', labelMy: 'အော်ဒီယို/360 ကင်မရာ', icon: '📷' },
  ];

  const filteredItems = INTERIOR_SYMBOLS_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!effectiveSearch) return true;

    return (
      item.nameMy.toLowerCase().includes(effectiveSearch) ||
      item.nameEn.toLowerCase().includes(effectiveSearch) ||
      item.descriptionMy.toLowerCase().includes(effectiveSearch) ||
      item.howToUse.toLowerCase().includes(effectiveSearch) ||
      item.workshopCheckTip.toLowerCase().includes(effectiveSearch)
    );
  });

  const handleSelectItem = (item: InteriorSymbolItem) => {
    if (soundEnabled) playChime(620, 0.12);
    setSelectedItem(item);
  };

  return (
    <div className="bg-stone-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-purple-500/20 shrink-0">
            <Sliders className="w-5 h-5 text-stone-950 fill-stone-950" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-purple-300 flex items-center gap-2">
              ၆။ ကားအတွင်းခန်း ခလုတ်များနှင့် ဒက်ရှ်ဘုတ် သင်္ကေတများ
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300">
                Interior Buttons & Dashboard Symbols
              </span>
            </h2>
            <p className="text-xs text-stone-400">
              စတီယာရင်၊ ဒက်ရှ်ဘုတ်၊ တံခါး၊ အဲကွန်း၊ အော်ဒီယို၊ ဒိုင်ခွက်မီးနီ/မီးဝါ သင်္ကေတများနှင့် လုပ်ဆောင်ချက်များ
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-stone-400 bg-stone-950 px-3 py-1.5 rounded-xl border border-stone-800 w-fit">
          သင်္ကေတ: <span className="font-bold text-amber-400">{filteredItems.length}</span> ခု
        </span>
      </div>

      {/* Category Pills */}
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
                ? 'bg-purple-500 text-stone-950 shadow-md shadow-purple-500/25 font-black'
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
            placeholder="ခလုတ်အမည်၊ သင်္ကေတ ရိုက်ရှာပါ (ဥပမာ: ECO, Cruise, TRC, ESP, DUAL, Defog, EPB, Check Engine, TPMS)..."
            className="w-full bg-stone-950 border border-stone-800 rounded-xl py-2 pl-9 pr-4 text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      )}

      {/* Symbols Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelectItem(item)}
            className="bg-stone-950/80 hover:bg-stone-850 border border-stone-800 hover:border-purple-500/40 rounded-xl p-3.5 transition-all cursor-pointer group flex flex-col justify-between shadow-md"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xl p-1.5 rounded-lg bg-stone-900 border border-stone-800 shadow-inner">
                  {item.iconSymbol}
                </span>
                <span className="text-[10px] text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                  {item.categoryNameMy}
                </span>
              </div>

              <h4 className="font-bold text-sm text-stone-100 group-hover:text-purple-300 transition-colors line-clamp-1">
                {item.nameMy}
              </h4>
              <p className="text-xs font-mono text-stone-400 line-clamp-1">
                {item.nameEn}
              </p>

              <p className="mt-2 text-[11px] text-stone-300 line-clamp-2 bg-stone-900/60 p-2 rounded-lg border border-stone-850">
                {item.descriptionMy}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-stone-850 text-xs text-purple-400 font-bold flex items-center justify-between">
              <span className="text-[10px] text-stone-500">အသေးစိတ် နှိပ်ကြည့်ပါ</span>
              <span className="group-hover:translate-x-1 transition-transform">➔</span>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL MODAL */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-150 overflow-y-auto"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-stone-900 border-2 border-purple-500/50 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 pb-3 border-b border-stone-800">
              <span className="text-3xl p-2 rounded-xl bg-stone-950 border border-purple-500/30">
                {selectedItem.iconSymbol}
              </span>
              <div>
                <h3 className="text-base font-bold text-stone-100">
                  {selectedItem.nameMy}
                </h3>
                <p className="text-xs font-mono text-purple-400">
                  {selectedItem.nameEn}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                <strong className="text-amber-300 block mb-1">အဓိပ္ပာယ်နှင့် လုပ်ဆောင်ချက်:</strong>
                <p className="text-stone-300 leading-relaxed">
                  {selectedItem.descriptionMy}
                </p>
              </div>

              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                <strong className="text-cyan-300 block mb-1">အသုံးပြုနည်း လမ်းညွှန်:</strong>
                <p className="text-stone-300 leading-relaxed">
                  {selectedItem.howToUse}
                </p>
              </div>

              <div className="bg-purple-950/20 p-3 rounded-xl border border-purple-500/30 text-purple-200">
                <strong className="text-purple-300 block mb-1">💡 ဝပ်ရှော့သမား စစ်ဆေးအပြစ်ရှာနည်း:</strong>
                <p className="leading-relaxed">
                  {selectedItem.workshopCheckTip}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-stone-950 font-bold text-xs shadow-lg transition-all"
            >
              ပိတ်မည် (Close)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
