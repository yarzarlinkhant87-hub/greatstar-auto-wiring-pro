import React, { useState } from 'react';
import { JDM_VOCABULARY_DATA, JDM_SCREEN_FLOWS, JdmVocabularyItem, JdmScreenFlow, JdmCategory } from '../data/jdmTranslatorData';
import { Search, X, Check, ChevronRight, Languages, Sparkles, HelpCircle, Navigation, Info, Car } from 'lucide-react';
import { playChime } from '../utils/audio';

interface JdmScreenTranslatorSectionProps {
  soundEnabled: boolean;
  searchQuery?: string;
}

export const JdmScreenTranslatorSection: React.FC<JdmScreenTranslatorSectionProps> = ({
  soundEnabled,
  searchQuery = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<JdmCategory | 'all' | 'screen_flow'>('all');
  const [internalSearch, setInternalSearch] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<JdmVocabularyItem | null>(null);
  const [selectedFlow, setSelectedFlow] = useState<JdmScreenFlow | null>(null);

  const effectiveSearch = (searchQuery || internalSearch).toLowerCase().trim();

  const categories: { key: JdmCategory | 'all' | 'screen_flow'; labelMy: string; icon: string }[] = [
    { key: 'all', labelMy: 'အားလုံး (All)', icon: '⭐' },
    { key: 'screen_flow', labelMy: 'စခရင် နှိပ်လမ်းကြောင်းများ', icon: '🗺️' },
    { key: 'settings_menu', labelMy: 'ဆက်တင် & ခလုတ်များ', icon: '⚙️' },
    { key: 'maintenance_oil', labelMy: 'အင်ဂျင်ဝိုင် & စစ်ဆေးမှု', icon: '🛢️' },
    { key: 'warnings_alerts', labelMy: 'ဒိုင်ခွက် သတိပေးချက်များ', icon: '⚠️' },
  ];

  const filteredVocab = JDM_VOCABULARY_DATA.filter((item) => {
    if (selectedCategory !== 'all' && selectedCategory !== item.category) return false;

    if (!effectiveSearch) return true;

    return (
      item.japanese.toLowerCase().includes(effectiveSearch) ||
      item.romaji.toLowerCase().includes(effectiveSearch) ||
      item.burmesePronunciation.toLowerCase().includes(effectiveSearch) ||
      item.meaningMy.toLowerCase().includes(effectiveSearch) ||
      item.english.toLowerCase().includes(effectiveSearch) ||
      item.actionGuide.toLowerCase().includes(effectiveSearch)
    );
  });

  const filteredFlows = JDM_SCREEN_FLOWS.filter((flow) => {
    if (selectedCategory !== 'all' && selectedCategory !== 'screen_flow') return false;

    if (!effectiveSearch) return true;

    return (
      flow.titleMy.toLowerCase().includes(effectiveSearch) ||
      flow.titleEn.toLowerCase().includes(effectiveSearch) ||
      flow.carModels.toLowerCase().includes(effectiveSearch) ||
      flow.steps.some(
        (s) =>
          s.japaneseText.toLowerCase().includes(effectiveSearch) ||
          s.englishText.toLowerCase().includes(effectiveSearch) ||
          s.descriptionMy.toLowerCase().includes(effectiveSearch)
      )
    );
  });

  return (
    <div className="bg-stone-900/90 border border-cyan-500/30 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-cyan-500/20 shrink-0">
            <Languages className="w-5 h-5 text-stone-950" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-cyan-300 flex items-center gap-2">
              ၉။ ဒိုင်ခွက် & TV စခရင် ဂျပန်စာ ဘာသာပြန်
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                JDM Screen Decoder
              </span>
            </h2>
            <p className="text-xs text-stone-400">
              ဂျပန်ကား JDM ဒိုင်ခွက်နှင့် တီဗွီစခရင်ပေါ်ရှိ ဂျပန်စာလုံးများ၊ အသံထွက်၊ အဓိပ္ပာယ်နှင့် အဆင့်လိုက် နှိပ်ရမည့် လမ်းကြောင်းများ
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
                  ? 'bg-cyan-500 text-stone-950 font-black shadow-md shadow-cyan-500/30'
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
            placeholder="ဂျပန်စာလုံး သို့မဟုတ် မြန်မာအဓိပ္ပာယ် ရိုက်ရှာပါ (ဥပမာ: 設定, Settei, ဆီလဲ, သော့ဓာတ်ခဲ, Maintenance, ဘက်ကင်မရာ)..."
            className="w-full bg-stone-950 border border-stone-800 rounded-xl py-2 pl-9 pr-4 text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      )}

      {/* SECTION 1: SCREEN NAVIGATION FLOWS (စခရင် နှိပ်လမ်းကြောင်းများ) */}
      {(selectedCategory === 'all' || selectedCategory === 'screen_flow') && filteredFlows.length > 0 && (
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-stone-200">
              စခရင်ပေါ်တွင် တစ်ဆင့်ချင်း နှိပ်သွားရမည့် လမ်းကြောင်းများ (Screen Click Navigation Paths):
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFlows.map((flow) => (
              <div
                key={flow.id}
                className="bg-stone-950/80 border border-cyan-500/30 rounded-xl p-4 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      အဆင့်လိုက် လမ်းပြ
                    </span>
                    <span className="text-[10px] text-amber-300 flex items-center gap-1 font-mono">
                      <Car className="w-3 h-3 text-amber-400" /> {flow.carModels}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-stone-100">{flow.titleMy}</h4>
                  <p className="text-[11px] text-stone-400 font-mono">{flow.titleEn}</p>
                  <p className="text-xs text-stone-300 mt-2 bg-stone-900/60 p-2 rounded-lg border border-stone-850">
                    {flow.purpose}
                  </p>

                  {/* Step-by-Step Flow Path */}
                  <div className="mt-3 space-y-2">
                    {flow.steps.map((st) => (
                      <div
                        key={st.stepNum}
                        className="p-2 rounded-lg bg-stone-900 border border-stone-800 flex items-start gap-2.5 text-xs"
                      >
                        <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-black text-[10px] flex items-center justify-center shrink-0 border border-cyan-500/40 mt-0.5">
                          {st.stepNum}
                        </span>
                        <div className="space-y-0.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-black text-cyan-300 tracking-wide font-sans">
                              {st.japaneseText}
                            </span>
                            <span className="text-[10px] text-stone-400 font-mono">({st.englishText})</span>
                            <span className="text-[10px] text-amber-300 bg-stone-950 px-1.5 py-0.5 rounded border border-stone-800">
                              🗣️ {st.burmesePronunciation}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-300 leading-relaxed">{st.descriptionMy}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pro tip */}
                <div className="mt-3 p-2 rounded-lg bg-amber-950/20 border border-amber-500/30 text-[11px] text-amber-200">
                  <strong className="text-amber-300">💡 ဆရာကြီး အကြံပြုချက်:</strong> {flow.proTip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: JDM VOCABULARY & KANJI MATCHING CARDS */}
      {selectedCategory !== 'screen_flow' && (
        <div className="mt-5">
          <div className="flex items-center gap-2 mb-3">
            <Languages className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-stone-200">
              စခရင်ပေါ်ရှိ ဂျပန်စာလုံးနှင့် တိုက်စစ်ရန် ဇယား (Japanese Screen Kanji Matching):
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredVocab.map((vocab) => (
              <div
                key={vocab.id}
                onClick={() => {
                  if (soundEnabled) playChime(600, 0.1);
                  setSelectedItem(vocab);
                }}
                className="rounded-xl border border-stone-800 hover:border-cyan-500/50 bg-stone-950/60 hover:bg-stone-950/90 p-4 transition-all cursor-pointer group flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    {/* Big Japanese Text */}
                    <span className="text-xl sm:text-2xl font-black text-cyan-300 tracking-wider font-sans group-hover:scale-105 transition-transform inline-block">
                      {vocab.japanese}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                      {vocab.badge}
                    </span>
                  </div>

                  {/* Burmese pronunciation & English */}
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-amber-300 flex items-center gap-1">
                      <span>🗣️ အသံထွက်:</span>
                      <span>{vocab.burmesePronunciation}</span>
                      <span className="text-[10px] text-stone-500 font-mono">({vocab.romaji})</span>
                    </p>
                    <h4 className="text-xs font-bold text-stone-100">{vocab.meaningMy}</h4>
                    <p className="text-[11px] font-mono text-stone-400">{vocab.english}</p>
                  </div>

                  {/* Action guide */}
                  <div className="mt-2.5 p-2 rounded-lg bg-stone-900/80 border border-stone-850 text-[11px] text-stone-300 line-clamp-2">
                    <strong className="text-cyan-300">လုပ်ဆောင်ရန်:</strong> {vocab.actionGuide}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                  <span className="text-[10px] text-stone-500">အသေးစိတ်</span>
                  <span className="font-bold text-cyan-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    ကြည့်မည် <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-150 overflow-y-auto"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-stone-900 border-2 border-cyan-500/50 rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="pb-3 border-b border-stone-800 pr-10">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-500/40 bg-cyan-500/20 text-cyan-300 inline-block mb-1.5">
                {selectedItem.badge}
              </span>
              <div className="text-3xl sm:text-4xl font-black text-cyan-300 tracking-wider">
                {selectedItem.japanese}
              </div>
              <p className="text-xs text-amber-300 mt-1 font-bold">
                🗣️ အသံထွက်: {selectedItem.burmesePronunciation} ({selectedItem.romaji})
              </p>
            </div>

            {/* Modal Body */}
            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <strong className="text-stone-400 block mb-0.5 text-[10px]">မြန်မာအဓိပ္ပာယ်:</strong>
                <p className="text-sm font-bold text-stone-100">{selectedItem.meaningMy}</p>
                <p className="text-xs font-mono text-cyan-300 mt-0.5">{selectedItem.english}</p>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
                <strong className="text-cyan-300 block mb-1 text-xs flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-cyan-400" />
                  စခရင်တွင် တွေ့ရှိပါက ဘာလုပ်ရမလဲ:
                </strong>
                <p className="text-stone-200 leading-relaxed text-[11px]">{selectedItem.actionGuide}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-[10px] text-stone-400">
                💡 <strong>အကြံပြုချက်:</strong> ကားတီဗွီ သို့မဟုတ် ဒိုင်ခွက်ပေါ်က ဂျပန်စာလုံးနှင့် ဤနေရာရှိ စာလုံးကို ပုံစံတူ တိုက်ကြည့်၍ ခလုတ်နှိပ် ဆက်တင်ပြုလုပ်နိုင်ပါသည်။
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-stone-950 font-bold text-xs shadow-lg transition-all"
            >
              ပိတ်မည် (Close)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
