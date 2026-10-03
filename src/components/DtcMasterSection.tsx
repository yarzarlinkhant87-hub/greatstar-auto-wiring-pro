import React, { useState } from 'react';
import { DTC_MASTER_DATA, DtcItem, DtcSystem, DtcFaultType } from '../data/dtcMasterData';
import { Search, X, Check, ChevronRight, Cpu, AlertTriangle, Zap, Wrench, Info, Copy, Car, ShieldAlert } from 'lucide-react';
import { playChime } from '../utils/audio';

interface DtcMasterSectionProps {
  soundEnabled: boolean;
  searchQuery?: string;
}

export const DtcMasterSection: React.FC<DtcMasterSectionProps> = ({
  soundEnabled,
  searchQuery = '',
}) => {
  const [selectedSystem, setSelectedSystem] = useState<DtcSystem | 'all'>('all');
  const [selectedFaultType, setSelectedFaultType] = useState<DtcFaultType | 'all'>('all');
  const [internalSearch, setInternalSearch] = useState<string>('');
  const [selectedDtc, setSelectedDtc] = useState<DtcItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showCircuitExplainer, setShowCircuitExplainer] = useState<boolean>(true);

  const effectiveSearch = (searchQuery || internalSearch).toLowerCase().trim();

  const systems: { key: DtcSystem | 'all'; labelMy: string; icon: string }[] = [
    { key: 'all', labelMy: 'အားလုံး (All Codes)', icon: '⭐' },
    { key: 'P', labelMy: '🔴 P (အင်ဂျင် & ဂီယာ)', icon: '⚙️' },
    { key: 'C', labelMy: '🟡 C (ABS & အောက်ပိုင်း)', icon: '🛑' },
    { key: 'B', labelMy: '🔵 B (လေအိတ် & ကိုယ်ထည်)', icon: '🛡️' },
    { key: 'U', labelMy: '🟣 U (CAN ကွန်ရက်လိုင်း)', icon: '🌐' },
  ];

  const faultTypes: { key: DtcFaultType | 'all'; labelMy: string }[] = [
    { key: 'all', labelMy: 'အားလုံး' },
    { key: 'circuit_low', labelMy: '⚡ Low (Short ကိုယ်ထည်ရှော့)' },
    { key: 'circuit_high', labelMy: '⚡ High (Open ကြိုးပြတ်)' },
    { key: 'range_performance', labelMy: '⚙️ Range / Performance' },
    { key: 'mechanical_misfire', labelMy: '💥 Misfire / စက်ပိုင်း' },
    { key: 'network_lost', labelMy: '🌐 Network လိုင်းပြတ်' },
  ];

  const filteredDtcs = DTC_MASTER_DATA.filter((item) => {
    if (selectedSystem !== 'all' && item.system !== selectedSystem) return false;
    if (selectedFaultType !== 'all' && item.faultType !== selectedFaultType) return false;

    if (!effectiveSearch) return true;

    return (
      item.code.toLowerCase().includes(effectiveSearch) ||
      item.nameMy.toLowerCase().includes(effectiveSearch) ||
      item.nameEn.toLowerCase().includes(effectiveSearch) ||
      item.meaningMy.toLowerCase().includes(effectiveSearch) ||
      item.wireCause.toLowerCase().includes(effectiveSearch) ||
      item.proDiagnosticTip.toLowerCase().includes(effectiveSearch) ||
      item.commonCars.toLowerCase().includes(effectiveSearch)
    );
  });

  const handleOpenDtc = (dtc: DtcItem) => {
    if (soundEnabled) playChime(650, 0.12);
    setSelectedDtc(dtc);
  };

  const handleCopyDtc = (dtc: DtcItem) => {
    const text = `【 OBD-II DTC ကုဒ်: ${dtc.code} 】\nအမည်: ${dtc.nameMy} (${dtc.nameEn})\nအမျိုးအစား: ${dtc.faultTypeLabelMy}\n\nရှင်းလင်းချက်: ${dtc.meaningMy}\n\nဝါယာဖြစ်နိုင်ခြေ: ${dtc.wireCause}\nဗို့အားတိုင်းနည်း: ${dtc.voltageCheck}\n\nဆရာကြီးအကြံပြုချက်: ${dtc.proDiagnosticTip}`;
    navigator.clipboard.writeText(text);
    setCopiedId(dtc.id);
    if (soundEnabled) playChime(800, 0.1);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getSeverityStyle = (sev: 'critical' | 'warning' | 'info') => {
    switch (sev) {
      case 'critical':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'warning':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'info':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
    }
  };

  return (
    <div className="bg-stone-900/90 border border-blue-500/30 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-blue-500/20 shrink-0">
            <Cpu className="w-5 h-5 text-stone-950" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-blue-300 flex items-center gap-2">
              ၁၀။ OBD-II အယ်တာကုဒ် DTC မာစတာလက်စွဲ
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300">
                Master DTC Decoder
              </span>
            </h2>
            <p className="text-xs text-stone-400">
              ဆန်ဆာပျက်၊ ဝါယာကြိုးပြတ် (Open Circuit) နှင့် ကိုယ်ထည်ရှော့ကျခြင်း (Short to Ground) အပြစ်ရှာနည်း လျှို့ဝှက်စနစ်
            </p>
          </div>
        </div>

        {/* System Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          {systems.map((sys) => (
            <button
              key={sys.key}
              onClick={() => {
                if (soundEnabled) playChime(500, 0.08);
                setSelectedSystem(sys.key);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                selectedSystem === sys.key
                  ? 'bg-blue-500 text-stone-950 font-black shadow-md shadow-blue-500/30'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              <span>{sys.icon}</span>
              <span>{sys.labelMy}</span>
            </button>
          ))}
        </div>
      </div>

      {/* EDUCATIONAL EXPLAINER BANNER (CIRCUIT HIGH VS LOW) */}
      {showCircuitExplainer && (
        <div className="mt-3.5 bg-stone-950 border border-stone-800 rounded-xl p-3.5 relative">
          <button
            onClick={() => setShowCircuitExplainer(false)}
            className="absolute top-2.5 right-2.5 text-stone-500 hover:text-stone-300 p-1"
            title="ပိတ်မည်"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <h4 className="text-xs font-bold text-amber-300">
              ဝါယာသမား သိထားရမည့် Circuit High / Circuit Low လျှို့ဝှက်ချက် (ပစ္စည်းမလဲမီ ဖတ်ရန်):
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] leading-relaxed">
            <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/30">
              <strong className="text-rose-300 block mb-0.5">⚡ Circuit Low (Short to Ground):</strong>
              Signal ကြိုးသည် <strong>ကိုယ်ထည်သံဘောင်နှင့် ပွတ်ရှော့ကျနေခြင်း</strong> သို့မဟုတ် ဆန်ဆာအတွင်း ရှော့ဖြစ်၍ ဗို့အား 0V သို့ ထိုးကျနေခြင်း။
            </div>

            <div className="p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/30">
              <strong className="text-cyan-300 block mb-0.5">⚡ Circuit High (Open Circuit):</strong>
              <strong>ဝါယာကြိုး ပြတ်တောက်နေခြင်း</strong> သို့မဟုတ် <strong>ပလပ်ကျွတ်နေခြင်း</strong>! ECU က ဆွဲတင်ထားသော 5V Pull-up ဗို့အား အပြည့်ဖြစ်နေခြင်း (စကင်နာတွင် -40°C ဟု ပြတတ်သည်)။
            </div>

            <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/30">
              <strong className="text-amber-300 block mb-0.5">⚙️ Range / Performance:</strong>
              ဆန်ဆာမသေ၊ ကြိုးမပြတ်သော်လည်း <strong>ဒေတာမမှန်ကန်ခြင်း</strong> (ဥပမာ ရေဆန်ဆာကောင်းသော်လည်း သာမိုစတက် ပွင့်လျက် ဂျမ်းဖြစ်နေခြင်း)။
            </div>
          </div>
        </div>
      )}

      {/* Fault Type Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar border-b border-stone-850">
        <span className="text-[11px] text-stone-500 font-bold shrink-0 mr-1">ပတ်လမ်းအမျိုးအစား:</span>
        {faultTypes.map((ft) => (
          <button
            key={ft.key}
            onClick={() => {
              if (soundEnabled) playChime(500, 0.08);
              setSelectedFaultType(ft.key);
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
              selectedFaultType === ft.key
                ? 'bg-amber-500 text-stone-950 font-black'
                : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            {ft.labelMy}
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
            placeholder="အယ်တာကုဒ် ရိုက်ရှာပါ (ဥပမာ: P0117, P0118, P0171, P0300, P0335, C0200, U0100, ရေဆန်ဆာ, မီးကွိုင်, MAF, ရှော့ကျ)..."
            className="w-full bg-stone-950 border border-stone-800 rounded-xl py-2 pl-9 pr-4 text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      )}

      {/* DTC Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4">
        {filteredDtcs.map((dtc) => (
          <div
            key={dtc.id}
            onClick={() => handleOpenDtc(dtc)}
            className="rounded-xl border border-stone-800 hover:border-blue-500/50 bg-stone-950/60 hover:bg-stone-950/90 p-4 transition-all cursor-pointer group flex flex-col justify-between shadow-md"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                {/* Monospace DTC Code Badge */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black font-mono px-2.5 py-1 rounded-lg bg-stone-900 border border-blue-500/40 text-blue-300 shadow-inner group-hover:border-blue-400 transition-colors">
                    {dtc.code}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getSeverityStyle(dtc.severity)}`}>
                    {dtc.severity === 'critical' ? '🔴 စက်ရပ်/အန္တရာယ်' : '🟡 သတိပေး'}
                  </span>
                </div>

                <span className="text-[10px] text-stone-500 font-mono">
                  {dtc.systemLabelMy}
                </span>
              </div>

              {/* Title & Fault Type */}
              <h4 className="font-bold text-sm text-stone-100 group-hover:text-blue-300 transition-colors mt-1">
                {dtc.nameMy}
              </h4>
              <p className="text-xs font-mono text-stone-400 line-clamp-1">
                {dtc.nameEn}
              </p>

              {/* Fault Type Tag */}
              <div className="mt-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-300 inline-block">
                  {dtc.faultTypeLabelMy}
                </span>
              </div>

              {/* Wire Cause Summary */}
              <p className="mt-2 text-xs text-stone-300 line-clamp-2 leading-relaxed bg-stone-900/60 p-2 rounded-lg border border-stone-850">
                <strong>ဖြစ်နိုင်ခြေ:</strong> {dtc.wireCause}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
              <span className="text-[10px] text-stone-500">အပြစ်ရှာနည်းဖတ်မည်</span>
              <span className="font-bold text-blue-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                အသေးစိတ် <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL MODAL WITH COMPLETE DIAGNOSTIC BREAKDOWN */}
      {selectedDtc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-150 overflow-y-auto"
          onClick={() => setSelectedDtc(null)}
        >
          <div
            className="bg-stone-900 border-2 border-blue-500/50 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedDtc(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="pb-3 border-b border-stone-800 pr-10">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-black font-mono px-3 py-1 rounded-xl bg-stone-950 border border-blue-500/50 text-blue-300 shadow-inner">
                  {selectedDtc.code}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getSeverityStyle(selectedDtc.severity)}`}>
                  {selectedDtc.severity === 'critical' ? '🔴 အန္တရာယ် / စက်ရပ်' : '🟡 သတိထားစစ်'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-stone-100 mt-1">
                {selectedDtc.nameMy}
              </h3>
              <p className="text-xs font-mono text-stone-400">
                {selectedDtc.nameEn}
              </p>
              <span className="text-[11px] text-amber-300 font-bold mt-1 inline-block">
                အမျိုးအစား: {selectedDtc.faultTypeLabelMy}
              </span>
            </div>

            {/* Modal Body */}
            <div className="mt-3.5 space-y-3 text-xs">
              {/* Meaning */}
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <strong className="text-stone-300 block mb-1 text-[11px] flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-blue-400" />
                  ဒီကုဒ်က ကားမှာ ဘာဖြစ်နေတာလဲ:
                </strong>
                <p className="text-stone-200 leading-relaxed text-[11px]">{selectedDtc.meaningMy}</p>
              </div>

              {/* Wire & Component Causes */}
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <strong className="text-amber-300 block mb-1 text-[11px] flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  ဝါယာရှော့ / ကြိုးပြတ် ဖြစ်နိုင်ခြေ:
                </strong>
                <p className="text-stone-200 leading-relaxed text-[11px]">{selectedDtc.wireCause}</p>
              </div>

              {/* Voltage & Multimeter Check */}
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <strong className="text-cyan-300 block mb-1 text-[11px] flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-cyan-400" />
                  မီတာဖြင့် ထိုးတိုင်းရမည့် ဗို့အား / စစ်ဆေးနည်း:
                </strong>
                <p className="text-stone-200 leading-relaxed text-[11px] font-mono bg-stone-900 p-2 rounded-lg border border-stone-800">
                  {selectedDtc.voltageCheck}
                </p>
              </div>

              {/* Pro Diagnostic Tip (Magic Swap Test) */}
              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-emerald-200">
                <strong className="text-emerald-300 block mb-1 text-[11px] flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  ဝါယာသမား ဆရာကြီး လျှို့ဝှက်အပြစ်ရှာနည်း:
                </strong>
                <p className="leading-relaxed text-[11px]">{selectedDtc.proDiagnosticTip}</p>
              </div>

              {/* Symptoms */}
              <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/30 text-[11px] text-rose-200">
                <strong className="text-rose-300 block mb-0.5">⚠️ ကားတွင် တွေ့ရမည့် ရောဂါလက္ခဏာများ:</strong>
                <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                  {selectedDtc.symptoms.map((sym, idx) => (
                    <li key={idx}>{sym}</li>
                  ))}
                </ul>
              </div>

              {/* Applicable Cars */}
              <div className="p-2 rounded-lg bg-stone-950 border border-stone-800 text-[10px] text-stone-400 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span><strong>အဖြစ်များသော ကားများ:</strong> {selectedDtc.commonCars}</span>
              </div>
            </div>

            {/* Actions: Copy & Close */}
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => handleCopyDtc(selectedDtc)}
                className="flex-1 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-stone-700"
              >
                {copiedId === selectedDtc.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>ကူးယူပြီးပါပြီ (Copied)</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-400" />
                    <span>ကုဒ်အချက်အလက် ကူးယူမည် (Copy)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedDtc(null)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-stone-950 font-bold text-xs shadow-lg transition-all"
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
