import React, { useState } from 'react';
import { BLADE_FUSE_COLORS, FUSE_ABBREVIATIONS, FuseColorCode, FuseAbbreviation } from '../data/fuseData';
import { Shield, Zap, Search, HelpCircle, CheckCircle2, AlertTriangle, Eye, Gauge, Sparkles } from 'lucide-react';
import { playChime } from '../utils/audio';

interface FuseBoxSectionProps {
  soundEnabled: boolean;
  searchQuery?: string;
}

export const FuseBoxSection: React.FC<FuseBoxSectionProps> = ({
  soundEnabled,
  searchQuery = '',
}) => {
  const [activeTab, setActiveTab] = useState<'colors' | 'dictionary' | 'testing'>('colors');
  const [selectedAmp, setSelectedAmp] = useState<number>(15);
  const [locationFilter, setLocationFilter] = useState<'all' | 'Under Bonnet' | 'Under Dashboard'>('all');
  const [internalSearch, setInternalSearch] = useState<string>('');

  const effectiveSearch = (searchQuery || internalSearch).toLowerCase().trim();

  const selectedFuseColor = BLADE_FUSE_COLORS.find((f) => f.amperage === selectedAmp) || BLADE_FUSE_COLORS[4];

  const filteredAbbreviations = FUSE_ABBREVIATIONS.filter((item) => {
    const matchesLoc =
      locationFilter === 'all' ||
      item.location.includes(locationFilter) ||
      item.location.includes('Both');
    if (!matchesLoc) return false;

    if (!effectiveSearch) return true;

    return (
      item.code.toLowerCase().includes(effectiveSearch) ||
      item.fullNameEn.toLowerCase().includes(effectiveSearch) ||
      item.meaningMy.toLowerCase().includes(effectiveSearch) ||
      item.circuitPowered.toLowerCase().includes(effectiveSearch)
    );
  });

  const handleSelectAmp = (amp: number) => {
    if (soundEnabled) playChime(550, 0.1);
    setSelectedAmp(amp);
  };

  return (
    <div className="bg-stone-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-amber-500/20 shrink-0">
            <Shield className="w-5 h-5 text-stone-950 fill-stone-950" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-amber-300 flex items-center gap-2">
              ၅။ ဖျူးစ်ခုံ & ဖျူးစ်အရောင် စံချိန်စံညွှန်းများ
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300">
                Fuse Box & Color Standards
              </span>
            </h2>
            <p className="text-xs text-stone-400">
              ဖျူးစ်အရောင်ကြည့်ခွဲနည်း (Amp Color Code) နှင့် ဖျူးစ်ခုံ အတိုကောက် စာသားများ အဘိဓာန်
            </p>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex flex-wrap gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.1);
              setActiveTab('colors');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'colors'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            🎨 ဖျူးစ်အရောင် ကြည့်ခွဲနည်း
          </button>
          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.1);
              setActiveTab('dictionary');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'dictionary'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            📖 ဖျူးစ်ခုံ အတိုကောက် အဘိဓာန်
          </button>
          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.1);
              setActiveTab('testing');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'testing'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            💡 ဖျူးစ်မဖြုတ်ဘဲ စစ်ဆေးနည်း
          </button>
        </div>
      </div>

      {/* TAB 1: FUSE COLOR CODING STANDARDS */}
      {activeTab === 'colors' && (
        <div className="mt-4 space-y-4">
          <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                ကမ္ဘာ့စံချိန်စံညွှန်း ဘလိတ်ဖျူးစ် အရောင်နှင့် အမ်ပီယာ (Blade Fuse Color Code)
              </h3>
              <span className="text-xs text-stone-400">
                👉 ဖျူးစ်တစ်ခုချင်းစီကို နှိပ်၍ သုံးစွဲသည့်ပစ္စည်းများ ကြည့်နိုင်သည်
              </span>
            </div>

            {/* Quick Fuse Color Swatches Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
              {BLADE_FUSE_COLORS.map((fuse) => (
                <button
                  key={fuse.amperage}
                  onClick={() => handleSelectAmp(fuse.amperage)}
                  className={`p-2.5 rounded-xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer ${
                    selectedAmp === fuse.amperage
                      ? 'border-white scale-105 shadow-lg shadow-amber-500/25'
                      : 'border-stone-800 hover:border-stone-700'
                  }`}
                  style={{ backgroundColor: `${fuse.colorHex}22` }}
                >
                  {/* Fuse Icon Graphic */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-black text-sm text-stone-950 shadow-md relative"
                    style={{ backgroundColor: fuse.colorHex }}
                  >
                    {fuse.amperage}A
                    {/* Metal blade prongs */}
                    <div className="absolute -bottom-1.5 left-2 w-1.5 h-1.5 bg-stone-400 rounded-b"></div>
                    <div className="absolute -bottom-1.5 right-2 w-1.5 h-1.5 bg-stone-400 rounded-b"></div>
                  </div>

                  <span className="text-[11px] font-bold text-stone-200 mt-2 text-center line-clamp-1">
                    {fuse.amperage} Amp
                  </span>
                  <span className="text-[9px] text-stone-400 line-clamp-1">
                    {fuse.colorNameEn}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Fuse Details Card */}
          <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-mono font-black text-xl text-stone-950 shadow-xl shrink-0"
                style={{ backgroundColor: selectedFuseColor.colorHex }}
              >
                <span>{selectedFuseColor.amperage}A</span>
                <span className="text-[9px] uppercase tracking-wider -mt-1 font-bold">Fuse</span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base text-stone-100">
                    {selectedFuseColor.colorNameMy}
                  </h4>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-stone-900 text-amber-300 border border-stone-800">
                    {selectedFuseColor.amperage} Amperes
                  </span>
                </div>
                <p className="text-xs text-stone-300 mt-1">
                  <strong>အသုံးအများဆုံး နေရာများ:</strong> {selectedFuseColor.commonUses}
                </p>
                <div className="text-[11px] text-stone-400 mt-1">
                  အမျိုးအစား: {selectedFuseColor.bladeType} Blade Fuse
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] text-stone-400 block mb-1">လောင်ကျွမ်းမှု သတိပေးချက်:</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                {selectedFuseColor.amperage}A အစား အမ်ပီယာပိုကြီးသော ဖျူးစ် လုံးဝမထိုးရပါ!
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FUSE ABBREVIATIONS DICTIONARY */}
      {activeTab === 'dictionary' && (
        <div className="mt-4 space-y-4">
          {/* Search & Location Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={internalSearch}
                onChange={(e) => setInternalSearch(e.target.value)}
                placeholder="ဖျူးစ်အတိုကောက် ရိုက်ရှာပါ (ဥပမာ: EFI, DOME, STOP, CIG, HORN, WIPER, DEFOG, ECU-B)..."
                className="w-full bg-stone-950 border border-stone-800 rounded-xl py-2 pl-9 pr-4 text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="flex gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs shrink-0">
              <button
                onClick={() => setLocationFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  locationFilter === 'all' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
                }`}
              >
                အားလုံး
              </button>
              <button
                onClick={() => setLocationFilter('Under Bonnet')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  locationFilter === 'Under Bonnet' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
                }`}
              >
                အင်ဂျင်ခန်း
              </button>
              <button
                onClick={() => setLocationFilter('Under Dashboard')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  locationFilter === 'Under Dashboard' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
                }`}
              >
                ဒက်ရှ်ဘုတ်အောက်
              </button>
            </div>
          </div>

          {/* Abbreviations List Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-1">
            {filteredAbbreviations.length === 0 ? (
              <div className="col-span-2 py-8 text-center text-stone-500 text-xs">
                ရှာဖွေမှုနှင့် ကိုက်ညီသော ဖျူးစ်အတိုကောက် မတွေ့ရှိပါ
              </div>
            ) : (
              filteredAbbreviations.map((f, idx) => (
                <div
                  key={idx}
                  className="bg-stone-950 border border-stone-800 rounded-xl p-3.5 hover:border-amber-500/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-mono font-black text-sm px-2.5 py-0.5 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {f.code}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 text-cyan-300 border border-stone-800">
                      {f.typicalAmp}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs text-stone-100">
                    {f.meaningMy}
                  </h4>
                  <p className="text-[11px] font-mono text-stone-400">
                    {f.fullNameEn}
                  </p>

                  <div className="mt-2 text-[11px] text-stone-300 bg-stone-900/60 p-2 rounded-lg border border-stone-850">
                    <strong>မီးကျွေးထားသော ပစ္စည်းများ:</strong> {f.circuitPowered}
                  </div>

                  <div className="mt-2 text-[10px] text-stone-500 flex items-center justify-between">
                    <span>တည်နေရာ: {f.location}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: TESTING FUSES WITHOUT REMOVAL */}
      {activeTab === 'testing' && (
        <div className="mt-4 space-y-4">
          <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 sm:p-5">
            <h3 className="text-sm font-bold text-amber-300 mb-2 flex items-center gap-2">
              💡 ဖျူးစ်များကို တစ်လုံးချင်း ဆွဲမဖြုတ်ဘဲ ၁၀ စက္ကန့်အတွင်း စစ်ဆေးနည်း
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed mb-4">
              ဖျူးစ်ခုံထဲက ဖျူးစ်တွေကို ပလာယာနဲ့ တစ်လုံးချင်း ဆွဲဖြုတ်ကြည့်စရာ မလိုပါဘူး။ Blade Fuse တိုင်းရဲ့ ထိပ်ဘက် အပေါ်မျက်နှာပြင်မှာ <strong>သတ္တုစမ်းသပ်ပေါက် သေးသေးလေး ၂ ပေါက် (Test Points)</strong> ပါရှိပါတယ်။
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <div className="font-bold text-emerald-300 flex items-center gap-1.5 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ၁။ နှစ်ဖက်စလုံး 12V လာခြင်း (GOOD)
                </div>
                <p className="text-stone-300 leading-relaxed">
                  Test Light (မီးစမ်းမီးသီး) အပ်ချွန်ဖြင့် ဖျူးစ်ထိပ်က အပေါက် ၂ ပေါက်စလုံးကို ထောက်ကြည့်ပါ။ ၂ ပေါက်စလုံး မီးလင်းပါက <strong>ဖျူးစ်ကောင်းမွန်ပြီး ဓာတ်အားစီးဆင်းနေသည်</strong>။
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30">
                <div className="font-bold text-rose-300 flex items-center gap-1.5 mb-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  ၂။ တစ်ဖက်မီးလင်းပြီး တစ်ဖက်မလင်းခြင်း (BLOWN)
                </div>
                <p className="text-stone-300 leading-relaxed">
                  တစ်ဖက်တွင် 12V မီးလင်းသော်လည်း နောက်တစ်ဖက်သို့ ဓာတ်အားမကူးပါက <strong>ဖျူးစ်အတွင်းပိုင်း နန်းကြိုး ပြတ်တောက်/လောင်ကျွမ်းနေပြီ</strong> ဖြစ်သည်။ ထိုဖျူးစ်ကိုသာ တိုက်ရိုက် ဆွဲဖြုတ်လဲလှယ်ပါ။
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                <div className="font-bold text-stone-300 flex items-center gap-1.5 mb-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  ၃။ နှစ်ဖက်စလုံး မီးမလင်းခြင်း (OFF)
                </div>
                <p className="text-stone-400 leading-relaxed">
                  ၂ ဖက်စလုံး မီးမလင်းပါက ဖျူးစ်ပြတ်ခြင်း မဟုတ်ပါ။ ထိုပစ္စည်း၏ ခလုတ် (ဥပမာ မီးကြီးခလုတ်၊ သော့ ON သို့မဟုတ် အဲကွန်း) ပိတ်ထား၍ မီးမရောက်သေးခြင်း ဖြစ်သည်။ ခလုတ်ဖွင့်ပြီးမှ ပြန်စစ်ပါ။
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
