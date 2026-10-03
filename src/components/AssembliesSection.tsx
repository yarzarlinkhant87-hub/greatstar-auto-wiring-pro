import React, { useState } from 'react';
import { MAJOR_ASSEMBLIES_DATA } from '../data/assembliesData';
import { ComponentAssembly } from '../types/wiring';
import { Cpu, Wrench, AlertTriangle, ShieldCheck, ChevronRight, X, Sparkles, Activity, Layers } from 'lucide-react';
import { playChime } from '../utils/audio';

interface AssembliesSectionProps {
  soundEnabled: boolean;
  searchQuery?: string;
}

export const AssembliesSection: React.FC<AssembliesSectionProps> = ({
  soundEnabled,
  searchQuery = '',
}) => {
  const [selectedAssembly, setSelectedAssembly] = useState<ComponentAssembly | null>(null);

  const effectiveSearch = searchQuery.toLowerCase().trim();

  const filteredAssemblies = MAJOR_ASSEMBLIES_DATA.filter((item) => {
    if (!effectiveSearch) return true;
    return (
      item.nameEn.toLowerCase().includes(effectiveSearch) ||
      item.nameMy.toLowerCase().includes(effectiveSearch) ||
      item.subtitle.toLowerCase().includes(effectiveSearch) ||
      item.sensorsInstalled.some((s) => s.toLowerCase().includes(effectiveSearch)) ||
      item.workingPrinciple.toLowerCase().includes(effectiveSearch) ||
      item.commonProblems.some((p) => p.problem.toLowerCase().includes(effectiveSearch))
    );
  });

  const handleOpenAssembly = (assembly: ComponentAssembly) => {
    if (soundEnabled) playChime(620, 0.15);
    setSelectedAssembly(assembly);
  };

  return (
    <div className="bg-stone-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-amber-500/20 shrink-0">
            <Cpu className="w-5 h-5 text-stone-950 fill-stone-950" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-amber-300 flex items-center gap-2">
              ၄။ ဆန်ဆာတပ် ပင်မအစိတ်အပိုင်းကြီးများ (Actuators & Modules)
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300">
                Major Assemblies
              </span>
            </h2>
            <p className="text-xs text-stone-400">
              လေတံခါး၊ VVT-i/VTEC၊ EGR၊ အဲကွန်း၊ တာဘို၊ ကွန်မွန်းရေး၊ မီးကွိုင် စနစ်များ၏ အလုပ်လုပ်ပုံနှင့် စစ်ဆေးနည်းများ
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-stone-400 bg-stone-950 px-3 py-1.5 rounded-xl border border-stone-800 w-fit">
          အစိတ်အပိုင်း: <span className="font-bold text-amber-400">{filteredAssemblies.length}</span> ခု
        </span>
      </div>

      {/* Assembly Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredAssemblies.map((assembly) => (
          <div
            key={assembly.id}
            onClick={() => handleOpenAssembly(assembly)}
            className="bg-stone-950/80 hover:bg-stone-850 border border-stone-800 hover:border-amber-500/50 rounded-xl p-4 transition-all cursor-pointer group flex flex-col justify-between shadow-md"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {assembly.subtitle}
                </span>
              </div>

              <h3 className="font-bold text-sm text-stone-100 group-hover:text-amber-300 transition-colors">
                {assembly.nameMy}
              </h3>
              <p className="text-xs font-mono text-stone-400">
                {assembly.nameEn}
              </p>

              {/* Connected Sensors Pills */}
              <div className="mt-2.5 flex flex-wrap gap-1">
                {assembly.sensorsInstalled.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 text-cyan-300 border border-stone-800"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-2.5 text-[11px] text-stone-400 line-clamp-2 bg-stone-900/60 p-2 rounded-lg border border-stone-850">
                {assembly.workingPrinciple}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-stone-850 flex items-center justify-between text-xs text-stone-400">
              <span className="text-[11px] text-stone-500">
                {assembly.testingAndInspection.length} Tests
              </span>
              <span className="inline-flex items-center gap-1 text-amber-400 font-bold group-hover:translate-x-1 transition-transform">
                အပြည့်အစုံ ကြည့်မည် <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ASSEMBLY DETAIL MODAL */}
      {selectedAssembly && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-150 overflow-y-auto"
          onClick={() => setSelectedAssembly(null)}
        >
          <div
            className="bg-stone-900 border-2 border-amber-500/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedAssembly(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="pb-3 border-b border-stone-800">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" /> {selectedAssembly.subtitle}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-stone-100">
                {selectedAssembly.nameMy}
              </h3>
              <p className="text-xs font-mono text-cyan-400">
                {selectedAssembly.nameEn}
              </p>
            </div>

            {/* Modal Content */}
            <div className="mt-4 space-y-4 text-xs">
              {/* Working Principle */}
              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                <span className="font-bold text-amber-300 block mb-1 text-sm flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-amber-400" /> အလုပ်လုပ်ပုံ နိယာမ:
                </span>
                <p className="text-stone-300 leading-relaxed">
                  {selectedAssembly.workingPrinciple}
                </p>
              </div>

              {/* Internal Components */}
              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                <span className="font-bold text-cyan-300 block mb-2 text-sm flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-400" /> အတွင်းပိုင်း အစိတ်အပိုင်းများ:
                </span>
                <ul className="list-disc list-inside space-y-1 text-stone-300 text-[11px]">
                  {selectedAssembly.internalComponents.map((c, idx) => (
                    <li key={idx} className="leading-relaxed font-mono">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testing & Inspection */}
              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                <span className="font-bold text-emerald-300 block mb-2 text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> စစ်ဆေးအပြစ်ရှာနည်းနှင့် စံချိန်များ:
                </span>
                <div className="space-y-2">
                  {selectedAssembly.testingAndInspection.map((t, idx) => (
                    <div key={idx} className="bg-stone-900 p-2.5 rounded-lg border border-stone-800">
                      <div className="font-bold text-stone-100 text-xs flex items-center justify-between mb-1">
                        <span>{t.testName}</span>
                        <span className="font-mono text-emerald-400 text-[11px] bg-stone-950 px-2 py-0.5 rounded border border-emerald-500/20">
                          {t.standardValue}
                        </span>
                      </div>
                      <p className="text-stone-300 text-[11px] leading-relaxed">
                        {t.procedure}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Workshop Problems & Fixes */}
              <div className="bg-rose-950/20 p-3.5 rounded-xl border border-rose-500/30">
                <span className="font-bold text-rose-300 block mb-2 text-sm flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" /> အဖြစ်များသော ပြဿနာများနှင့် ဖြေရှင်းနည်း:
                </span>
                <div className="space-y-2.5">
                  {selectedAssembly.commonProblems.map((prob, idx) => (
                    <div key={idx} className="bg-stone-900/90 p-2.5 rounded-lg border border-stone-800">
                      <div className="font-bold text-rose-300 text-xs mb-1">
                        ⚠️ ပြဿနာ: {prob.problem}
                      </div>
                      <div className="text-stone-400 text-[11px] mb-1">
                        <strong>အကြောင်းရင်း:</strong> {prob.cause}
                      </div>
                      <div className="text-emerald-300 text-[11px] font-semibold">
                        <strong>✓ ဖြေရှင်းနည်း:</strong> {prob.fix}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wiring Brief & Pro Tip */}
              <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/30 text-amber-200 text-[11px] space-y-1">
                <div>
                  <strong className="text-amber-300">🔌 ဝါယာလိုင်း အကျဉ်း:</strong> {selectedAssembly.wiringDiagramBrief}
                </div>
                <div>
                  <strong className="text-amber-300">💡 ဆရာကျ လက်တွေ့အကြံပြုချက်:</strong> {selectedAssembly.proTip}
                </div>
              </div>
            </div>

            {/* Bottom Close Button */}
            <button
              onClick={() => setSelectedAssembly(null)}
              className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-bold text-xs shadow-lg transition-all"
            >
              ပိတ်မည် (Close)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
