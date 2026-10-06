import React, { useState } from 'react';
import {
  Snowflake,
  Gauge,
  Wrench,
  AlertTriangle,
  Flame,
  CheckCircle2,
  HelpCircle,
  Cpu,
  Info,
  Thermometer,
  Zap,
  RotateCw,
  Search,
  Scale,
  ShieldAlert,
  Wind,
  BookOpen
} from 'lucide-react';
import {
  AC_GAUGE_SCENARIOS,
  COMPRESSOR_TEST_STEPS,
  AMBIENT_PRESSURE_CHART,
  VEHICLE_GRAM_ESTIMATES,
  AC_SENSORS_DIRECTORY,
  REFRIGERANT_COMPARISONS,
  COMPRESSOR_OILS,
  REFRIGERATION_CYCLE_STEPS,
  RefrigerationCycleStep,
  AC_TERMINOLOGY_GLOSSARY,
  AcTerminologyItem,
  AC_WIRING_CIRCUITS,
  AcWiringCircuitGuide,
  AcGaugeScenario
} from '../data/carAcMasterData';
import { playChime } from '../utils/audio';

interface CarAcMasterSectionProps {
  soundEnabled: boolean;
  searchQuery?: string;
}

type AcTab = 'refrigeration_cycle' | 'gauge_simulator' | 'compressor_health' | 'charging_calc' | 'sensors_ecu' | 'gas_oil' | 'auto_climate' | 'ac_glossary' | 'wiring_troubleshoot';

export const CarAcMasterSection: React.FC<CarAcMasterSectionProps> = ({
  soundEnabled,
  searchQuery = ''
}) => {
  const [activeTab, setActiveTab] = useState<AcTab>('refrigeration_cycle');
  const [selectedCycleStep, setSelectedCycleStep] = useState<RefrigerationCycleStep>(REFRIGERATION_CYCLE_STEPS[0]);
  const [selectedScenario, setSelectedScenario] = useState<AcGaugeScenario>(AC_GAUGE_SCENARIOS[1]); // Default to Bad Compressor as requested!
  const [selectedCircuit, setSelectedCircuit] = useState<AcWiringCircuitGuide>(AC_WIRING_CIRCUITS[0]);
  const [ambientTempInput, setAmbientTempInput] = useState<number>(35); // Default 35°C (Myanmar summer)
  const [searchTerm, setSearchTerm] = useState<string>(searchQuery);
  const [glossarySearch, setGlossarySearch] = useState<string>('');
  const [glossaryCategory, setGlossaryCategory] = useState<string>('all');

  const handleTabChange = (tab: AcTab) => {
    if (soundEnabled) playChime(550, 0.08);
    setActiveTab(tab);
  };

  const handleSelectScenario = (scenario: AcGaugeScenario) => {
    if (soundEnabled) playChime(620, 0.1);
    setSelectedScenario(scenario);
  };

  // Calculate estimated pressures based on ambient temp
  const calculateDynamicPressures = (tempC: number) => {
    const baseLow = 20 + (tempC - 20) * 0.7;
    const baseHigh = 140 + (tempC - 20) * 5.5;
    return {
      lowMin: Math.max(18, Math.round(baseLow - 3)),
      lowMax: Math.round(baseLow + 4),
      highMin: Math.max(130, Math.round(baseHigh - 10)),
      highMax: Math.round(baseHigh + 15),
      ventTemp: Math.max(3, Math.round(3 + (tempC - 20) * 0.3))
    };
  };

  const dynamicCalc = calculateDynamicPressures(ambientTempInput);

  const filteredGlossary = AC_TERMINOLOGY_GLOSSARY.filter((item) => {
    const matchesCat = glossaryCategory === 'all' || item.category === glossaryCategory;
    const matchesSearch =
      !glossarySearch ||
      item.termEn.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      item.pronunciationMy.includes(glossarySearch) ||
      item.termMy.includes(glossarySearch) ||
      item.workshopSlangMy.includes(glossarySearch) ||
      item.functionMy.includes(glossarySearch);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Main Header Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border-2 border-cyan-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase border border-cyan-400/30">
              <Snowflake className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              Automotive Air Conditioning Engineering Masterclass
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
              <span>၁၂။ မော်တော်ကား အဲကွန်းစနစ် မဟာလက်စွဲ (Car A/C Master Pro)</span>
            </h2>
            <p className="text-xs sm:text-sm text-cyan-200/80 leading-relaxed max-w-3xl">
              Compressor ပျက်စီးမှု စစ်ဆေးနည်း၊ Manifold ပေါင်ဂိတ်ဖတ်နည်း၊ ပြင်ပအပူချိန်အလိုက် ဂတ်စ်ဖြည့်နည်း၊ စာတန်းပျက်နေပါက ချိန်တွယ်နည်း၊ ဆန်ဆာများနှင့် ECU ထိန်းချုပ်မှု သဘောတရားများ အစအဆုံး
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-cyan-900/60 border border-cyan-400/40 text-cyan-200 text-xs font-mono font-bold flex items-center gap-1.5 shadow-inner">
              <Gauge className="w-4 h-4 text-cyan-400" />
              R134a / R1234yf Standard
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-4 pt-3 border-t border-cyan-800/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => handleTabChange('refrigeration_cycle')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'refrigeration_cycle'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-stone-950 font-black shadow-lg shadow-cyan-500/40 ring-2 ring-cyan-300'
                : 'bg-stone-900/80 text-cyan-300 hover:text-white border border-cyan-800/60'
            }`}
          >
            <RotateCw className={`w-4 h-4 ${activeTab === 'refrigeration_cycle' ? 'animate-spin' : ''}`} />
            🔄 ၀။ အဲကွန်း သံသရာလည်ပတ်ပုံ (Cycle Masterclass)
          </button>

          <button
            onClick={() => handleTabChange('gauge_simulator')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'gauge_simulator'
                ? 'bg-cyan-500 text-stone-950 shadow-lg shadow-cyan-500/30'
                : 'bg-stone-900/80 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <Gauge className="w-4 h-4" />
            ၁။ ပေါင်ဂိတ် Simulator & ရောဂါရှာဖွေမှု
          </button>

          <button
            onClick={() => handleTabChange('compressor_health')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'compressor_health'
                ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/30'
                : 'bg-stone-900/80 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <Wrench className="w-4 h-4" />
            ၂။ Compressor ပျက်/မကောင်း စစ်ဆေးနည်း
          </button>

          <button
            onClick={() => handleTabChange('charging_calc')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'charging_calc'
                ? 'bg-emerald-500 text-stone-950 shadow-lg shadow-emerald-500/30'
                : 'bg-stone-900/80 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <Scale className="w-4 h-4" />
            ၃။ ဂတ်စ်ဖြည့်နည်း & ပေါင်/ဂရမ် တွက်ချက်မှု
          </button>

          <button
            onClick={() => handleTabChange('sensors_ecu')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'sensors_ecu'
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                : 'bg-stone-900/80 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <Cpu className="w-4 h-4" />
            ၄။ အဲကွန်းဆန်ဆာ & ECU ထိန်းချုပ်ပုံ
          </button>

          <button
            onClick={() => handleTabChange('gas_oil')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'gas_oil'
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                : 'bg-stone-900/80 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <Snowflake className="w-4 h-4" />
            ၅။ R134a vs အိမ်သုံးဂတ်စ် & ဆီအမျိုးအစား
          </button>

          <button
            onClick={() => handleTabChange('auto_climate')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'auto_climate'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                : 'bg-stone-900/80 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <Wind className="w-4 h-4" />
            ၆။ အော်တိုအဲကွန်း & Blend Door မော်တာများ
          </button>

          <button
            onClick={() => handleTabChange('ac_glossary')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'ac_glossary'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-black shadow-lg shadow-amber-400/30 ring-2 ring-amber-300'
                : 'bg-stone-900/80 text-amber-300 hover:text-white border border-amber-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            📖 ၇။ အဲကွန်း ဝေါဟာရ & ပစ္စည်းအဘိဓာန်
          </button>

          <button
            onClick={() => handleTabChange('wiring_troubleshoot')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'wiring_troubleshoot'
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-stone-950 font-black shadow-lg shadow-yellow-400/40 ring-2 ring-yellow-300'
                : 'bg-stone-900/80 text-yellow-300 hover:text-white border border-yellow-800/60'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            ⚡ ၈။ ဝါယာရိန်း မီးလိုင်းလိုက်နည်း (အမဲဖြတ်နည်း)
          </button>
        </div>
      </div>

      {/* TAB 0: REFRIGERATION CYCLE MASTERCLASS (အဲကွန်း သံသရာလည်ပတ်ပုံ) */}
      {activeTab === 'refrigeration_cycle' && (
        <div className="space-y-5">
          {/* Cycle Overview Banner */}
          <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-red-950 border border-cyan-500/40 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-800">
              <div>
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <RotateCw className="w-5 h-5 text-cyan-400 animate-spin" />
                  <span>ကားအဲကွန်း သံသရာလည်ပတ်ပုံ မဟာသင်တန်း (Automotive Refrigeration Cycle Masterclass)</span>
                </h3>
                <p className="text-xs text-cyan-200/80 mt-1">
                  Compressor ကနေ ဂတ်စ်တွေကို ဘယ်လောက် PSI ဖိသိပ်ပြီး အရည်ဖြစ်၊ အငွေ့ဖြစ်၊ ဘယ်ကနေ ဘယ်ထဲရောက်၊ အပူစွန့်ထုတ်ပြီး သံသရာလည်နေပုံ မျက်စိထဲ ကွင်းကွင်းကွက်ကွက် မြင်သာစေရန်:
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 font-bold">
                  HIGH SIDE (အနီ - 200 PSI)
                </span>
                <span className="text-stone-500 font-bold">vs</span>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold">
                  LOW SIDE (အပြာ - 30 PSI)
                </span>
              </div>
            </div>

            {/* 4 Interactive Cycle Step Cards with Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {REFRIGERATION_CYCLE_STEPS.map((step) => {
                const isSelected = selectedCycleStep.id === step.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      if (soundEnabled) playChime(580 + step.stepNumber * 40, 0.1);
                      setSelectedCycleStep(step);
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between relative overflow-hidden ${
                      isSelected
                        ? step.side === 'high_side'
                          ? 'bg-red-950/80 border-red-400 ring-2 ring-red-500/50 shadow-xl shadow-red-950/50'
                          : 'bg-blue-950/80 border-blue-400 ring-2 ring-blue-500/50 shadow-xl shadow-blue-950/50'
                        : 'bg-stone-900/90 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-black text-xs ${
                            step.side === 'high_side'
                              ? 'bg-red-500 text-stone-950'
                              : 'bg-blue-500 text-stone-950'
                          }`}
                        >
                          {step.stepNumber}
                        </span>

                        <span
                          className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${
                            step.side === 'high_side'
                              ? 'bg-red-500/20 text-red-300'
                              : 'bg-blue-500/20 text-blue-300'
                          }`}
                        >
                          {step.side === 'high_side' ? 'High Side' : 'Low Side'}
                        </span>
                      </div>

                      <div className="font-bold text-white text-xs leading-snug">
                        {step.componentNameMy.split('(')[0]}
                      </div>

                      <div className="space-y-1 text-[11px] font-mono">
                        <div className="text-stone-300">
                          ဖိအား: <strong className={step.side === 'high_side' ? 'text-red-400' : 'text-blue-400'}>{step.pressureRange.split(' ')[0]} PSI</strong>
                        </div>
                        <div className="text-stone-400 text-[10px]">
                          အခြေအနေ: <span className="text-amber-300">{step.stateType === 'vapor' ? 'ဓာတ်ငွေ့ (Vapor)' : step.stateType === 'liquid' ? 'အရည် (Liquid)' : 'နှင်းမှုန်အရည် (Cold Mist)'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-800/80 text-[10px] text-stone-400 flex items-center justify-between">
                      <span>အသေးစိတ် ကြည့်မည်</span>
                      <span className="text-cyan-400 font-bold">→</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Selected Step Training Spotlight */}
          <div className="bg-stone-900/95 border-2 border-stone-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-black text-sm ${
                      selectedCycleStep.side === 'high_side'
                        ? 'bg-red-500 text-stone-950'
                        : 'bg-blue-500 text-stone-950'
                    }`}
                  >
                    {selectedCycleStep.stepNumber}
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-white">
                    {selectedCycleStep.componentNameMy}
                  </h4>
                </div>
                <div className="text-xs font-mono text-stone-400 pl-9">
                  {selectedCycleStep.componentNameEn}
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs font-mono px-3 py-1 rounded-xl bg-stone-950 border border-stone-800 text-stone-300">
                  📍 {selectedCycleStep.location}
                </span>
              </div>
            </div>

            {/* Input vs Output Thermodynamic Transformation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
                <div className="font-bold text-cyan-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <span>📥 ပစ္စည်းထဲသို့ ဝင်ရောက်လာသော အခြေအနေ (Input State):</span>
                </div>
                <div className="text-sm font-semibold text-stone-200">
                  {selectedCycleStep.inputState}
                </div>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
                <div className="font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <span>📤 ပစ္စည်းမှ ပြန်လည် ထွက်ခွာသွားသော အခြေအနေ (Output State):</span>
                </div>
                <div className="text-sm font-semibold text-stone-200">
                  {selectedCycleStep.outputState}
                </div>
              </div>
            </div>

            {/* In-Depth Explanation: What Happens Inside */}
            <div className="bg-stone-950/80 p-4 rounded-xl border border-stone-800 space-y-3 text-xs">
              <div>
                <strong className="text-emerald-400 text-sm font-bold block mb-1">
                  ⚙️ အထဲမှာ ဂတ်စ်တွေ ဘာဖြစ်သွားသလဲ (What Actually Happens Inside):
                </strong>
                <p className="text-stone-200 leading-relaxed text-xs sm:text-sm">
                  {selectedCycleStep.whatHappens}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-800/80 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <strong className="text-purple-300 font-semibold block mb-0.5">
                    🔬 သိပ္ပံနှင့် ရူပဗေဒ အခြေခံ (Thermodynamic Law):
                  </strong>
                  <p className="text-stone-300 leading-relaxed">
                    {selectedCycleStep.thermodynamicPrinciple}
                  </p>
                </div>

                <div>
                  <strong className="text-amber-300 font-semibold block mb-0.5">
                    💡 တပည့်များ ချက်ချင်း နားလည်စေမည့် မြင်သာသော ဥပမာ (Teaching Analogy):
                  </strong>
                  <p className="text-amber-200/90 leading-relaxed">
                    {selectedCycleStep.teachingAnalogy}
                  </p>
                </div>
              </div>

              {/* Touch Check Banner */}
              <div className="mt-2 p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-2.5 text-xs text-cyan-200">
                <Wrench className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-cyan-300">လက်တွေ့ ပိုက်လိုင်း စမ်းသပ်စစ်ဆေးနည်း (Hands-on Touch Check): </strong>
                  <span>{selectedCycleStep.touchCheck}</span>
                </div>
              </div>
            </div>

            {/* Quick 4-Step Summary Table */}
            <div className="space-y-2 pt-2">
              <h5 className="text-xs font-bold text-stone-300 uppercase tracking-wider">
                📊 အဲကွန်းစနစ် အဆင့် (၄) ဆင့်လုံး၏ ဖိအားနှင့် အပူချိန် အကျဉ်းချုပ် ဇယား:
              </h5>
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-xs text-left border-collapse border border-stone-800">
                  <thead>
                    <tr className="bg-stone-950 text-stone-400 border-b border-stone-800">
                      <th className="p-2 border-r border-stone-800">အဆင့်</th>
                      <th className="p-2 border-r border-stone-800">ပစ္စည်း</th>
                      <th className="p-2 border-r border-stone-800">ဖိအား (Pressure)</th>
                      <th className="p-2 border-r border-stone-800">အပူချိန် (Temp)</th>
                      <th className="p-2 border-r border-stone-800">အခြေအနေ (State)</th>
                      <th className="p-2">အပူစွန့်/အပူစုပ် လုပ်ဆောင်ချက်</th>
                    </tr>
                  </thead>
                  <tbody>
                    {REFRIGERATION_CYCLE_STEPS.map((s) => (
                      <tr
                        key={s.id}
                        className={`border-b border-stone-800/60 hover:bg-stone-800/40 cursor-pointer ${
                          selectedCycleStep.id === s.id ? 'bg-cyan-500/10 font-bold' : ''
                        }`}
                        onClick={() => setSelectedCycleStep(s)}
                      >
                        <td className="p-2 border-r border-stone-800 font-mono text-center">
                          {s.stepNumber}
                        </td>
                        <td className="p-2 border-r border-stone-800 font-semibold text-white">
                          {s.componentNameMy.split('(')[0]}
                        </td>
                        <td className="p-2 border-r border-stone-800 font-mono text-cyan-300">
                          {s.pressureRange}
                        </td>
                        <td className="p-2 border-r border-stone-800 font-mono text-amber-300">
                          {s.tempRange}
                        </td>
                        <td className="p-2 border-r border-stone-800 text-stone-300">
                          {s.stateType === 'vapor' ? 'ဓာတ်ငွေ့ (Vapor)' : s.stateType === 'liquid' ? 'အရည် (Liquid)' : 'နှင်းမှုန်အရည် (Cold Mist)'}
                        </td>
                        <td className="p-2 text-stone-300">
                          {s.stepNumber === 1 && 'ဖိသိပ်ပြီး အပူချိန်ထိုးတက်'}
                          {s.stepNumber === 2 && 'ပြင်ပလေထုထဲ အပူစွန့်ထုတ် (ငွေ့ရည်ဖွဲ့)'}
                          {s.stepNumber === 3 && 'ဖိအားရုတ်တရက်ချပြီး ရေခဲမှတ်နီးပါး အေးခဲ'}
                          {s.stepNumber === 4 && 'ကားထဲက အပူကို စုပ်ယူပြီး လေအေးမှုတ်ထုတ်'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: MANIFOLD GAUGE SIMULATOR & DIAGNOSTIC MATRIX */}
      {activeTab === 'gauge_simulator' && (
        <div className="space-y-4">
          {/* Quick Scenario Picker Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {AC_GAUGE_SCENARIOS.map((scenario) => {
              const isSelected = selectedScenario.id === scenario.id;
              return (
                <button
                  key={scenario.id}
                  onClick={() => handleSelectScenario(scenario)}
                  className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 ring-2 ring-cyan-500/40 shadow-lg'
                      : 'bg-stone-900/90 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-800 text-cyan-300 font-bold">
                        L: {scenario.lowPressurePsi} / H: {scenario.highPressurePsi}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          scenario.severity === 'normal'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : scenario.severity === 'critical'
                            ? 'bg-red-500/20 text-red-400 animate-pulse'
                            : scenario.severity === 'danger'
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {scenario.coolingStatus}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-stone-100 line-clamp-2">
                      {scenario.titleMy}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* DUAL GAUGE SIMULATOR VISUALIZER */}
          <div className="bg-stone-900/95 border border-stone-800 rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base sm:text-lg font-bold text-white">
                  ပေါင်ဂိတ် ဖိအားတိုင်းတာမှု ရလဒ် (Live Manifold Gauge Visualizer)
                </h3>
              </div>
              <div className="text-xs text-stone-400 font-mono">
                {selectedScenario.titleEn}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* LOW SIDE GAUGE (BLUE) */}
              <div className="bg-gradient-to-b from-blue-950/60 to-stone-950 border-2 border-blue-500/40 rounded-2xl p-4 text-center relative overflow-hidden shadow-lg">
                <div className="text-xs font-mono font-bold text-blue-300 uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                  LOW SIDE (အနိမ့်ဖိအား - အပြာရောင်)
                </div>

                {/* Dial Graphic Simulation */}
                <div className="relative w-44 h-44 mx-auto my-2 rounded-full border-4 border-blue-500/60 bg-stone-950 flex flex-col items-center justify-center shadow-inner">
                  {/* Gauge Ring Ticks */}
                  <div className="absolute inset-2 rounded-full border border-dashed border-blue-500/30" />
                  <span className="text-[10px] text-stone-500 absolute top-2 font-mono">60 PSI</span>
                  <span className="text-[10px] text-stone-500 absolute bottom-2 font-mono">0 (VAC)</span>
                  <span className="text-[10px] text-stone-500 absolute left-2 font-mono">30</span>
                  <span className="text-[10px] text-stone-500 absolute right-2 font-mono">90</span>

                  {/* Big Number */}
                  <div className="text-4xl font-black font-mono text-blue-400 tracking-tight">
                    {selectedScenario.lowPressurePsi}
                  </div>
                  <div className="text-xs font-mono text-stone-400">PSI</div>

                  {/* Needle Angle representation */}
                  <div
                    className="absolute w-1 bg-blue-400 rounded-full transition-all duration-700 origin-bottom"
                    style={{
                      height: '55px',
                      bottom: '50%',
                      transform: `rotate(${Math.min(180, selectedScenario.lowPressurePsi * 1.5 - 90)}deg)`
                    }}
                  />
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-500 z-10 border-2 border-white shadow" />
                </div>

                <div className="mt-2 text-xs font-mono text-stone-300">
                  စံသတ်မှတ်ချက်: <strong className="text-blue-300">{selectedScenario.lowNormalRange}</strong>
                </div>
                <div className="text-[11px] text-stone-400 mt-1">
                  (စုပ်ပိုက်မည်းကြီး - Suction Line)
                </div>
              </div>

              {/* HIGH SIDE GAUGE (RED) */}
              <div className="bg-gradient-to-b from-red-950/60 to-stone-950 border-2 border-red-500/40 rounded-2xl p-4 text-center relative overflow-hidden shadow-lg">
                <div className="text-xs font-mono font-bold text-red-300 uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  HIGH SIDE (အမြင့်ဖိအား - အနီရောင်)
                </div>

                {/* Dial Graphic Simulation */}
                <div className="relative w-44 h-44 mx-auto my-2 rounded-full border-4 border-red-500/60 bg-stone-950 flex flex-col items-center justify-center shadow-inner">
                  {/* Gauge Ring Ticks */}
                  <div className="absolute inset-2 rounded-full border border-dashed border-red-500/30" />
                  <span className="text-[10px] text-stone-500 absolute top-2 font-mono">250 PSI</span>
                  <span className="text-[10px] text-stone-500 absolute bottom-2 font-mono">0</span>
                  <span className="text-[10px] text-stone-500 absolute left-2 font-mono">125</span>
                  <span className="text-[10px] text-stone-500 absolute right-2 font-mono">375</span>

                  {/* Big Number */}
                  <div className="text-4xl font-black font-mono text-red-400 tracking-tight">
                    {selectedScenario.highPressurePsi}
                  </div>
                  <div className="text-xs font-mono text-stone-400">PSI</div>

                  {/* Needle Angle representation */}
                  <div
                    className="absolute w-1 bg-red-400 rounded-full transition-all duration-700 origin-bottom"
                    style={{
                      height: '55px',
                      bottom: '50%',
                      transform: `rotate(${Math.min(180, selectedScenario.highPressurePsi * 0.45 - 90)}deg)`
                    }}
                  />
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500 z-10 border-2 border-white shadow" />
                </div>

                <div className="mt-2 text-xs font-mono text-stone-300">
                  စံသတ်မှတ်ချက်: <strong className="text-red-300">{selectedScenario.highNormalRange}</strong>
                </div>
                <div className="text-[11px] text-stone-400 mt-1">
                  (မှုတ်ပိုက်သေး - Discharge Line)
                </div>
              </div>
            </div>

            {/* In-Depth Diagnostic Breakdown */}
            <div className="mt-6 bg-stone-950 border border-stone-800 rounded-xl p-4 sm:p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800">
                <div>
                  <h4 className="text-base font-bold text-amber-300 flex items-center gap-2">
                    <Info className="w-4 h-4 text-amber-400" />
                    {selectedScenario.titleMy}
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {selectedScenario.symptomSummary}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 self-start sm:self-auto ${
                    selectedScenario.coolingStatus === 'အေးစက်သည်'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-red-500/20 text-red-400 border border-red-500/40'
                  }`}
                >
                  အအေးအခြေအနေ: {selectedScenario.coolingStatus}
                </span>
              </div>

              {/* 3 Columns: Causes, Diagnostics, Solutions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Causes */}
                <div className="bg-stone-900/60 p-3.5 rounded-xl border border-stone-800 space-y-2">
                  <div className="font-bold text-red-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    ဖြစ်ပွားရသော အကြောင်းရင်းများ (Root Causes)
                  </div>
                  <ul className="space-y-1.5 text-stone-300">
                    {selectedScenario.causes.map((cause, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-red-400">•</span>
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Diagnostics */}
                <div className="bg-stone-900/60 p-3.5 rounded-xl border border-stone-800 space-y-2">
                  <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5 text-cyan-400" />
                    စစ်ဆေးအတည်ပြုနည်း (Diagnostic Steps)
                  </div>
                  <ul className="space-y-1.5 text-stone-300">
                    {selectedScenario.diagnosisSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-cyan-400">✓</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solutions */}
                <div className="bg-stone-900/60 p-3.5 rounded-xl border border-stone-800 space-y-2">
                  <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ပြင်ဆင်ရမည့် နည်းလမ်း (Repair Solution)
                  </div>
                  <p className="text-stone-200 leading-relaxed">
                    {selectedScenario.repairSolution}
                  </p>
                </div>
              </div>

              {/* Master Pro-Tip Banner */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-200">
                <Wrench className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300">ဆရာသမား လက်တွေ့မှတ်သားဖွယ် (Master Mechanic Note): </strong>
                  <span>{selectedScenario.mechanicNote}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMPRESSOR FAULT & HEALTH TESTS */}
      {activeTab === 'compressor_health' && (
        <div className="space-y-4">
          <div className="bg-stone-900/95 border border-stone-800 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-5 h-5 text-amber-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                Compressor ပျက်စီးမှု/အားမရှိမှု အဆင့်ဆင့် စစ်ဆေးနည်း မာစတာလက်စွဲ
              </h3>
            </div>
            <p className="text-xs text-stone-400 mb-4 leading-relaxed">
              ကားပေါ်တွင် ပေါင်ဂိတ်ဖြင့် စစ်ဆေးခြင်းမှစ၍ စားပွဲတင် စစ်ဆေးနည်း၊ ကွန်ပရက်ဆာဆီ အရောင်ဖြင့် အထဲပျက်စီးမှု စစ်ဆေးခြင်း၊ ကလပ်မပါသော ခေတ်ပေါ် Control Valve စစ်ဆေးနည်းများ အပြည့်အစုံ:
            </p>

            <div className="space-y-4">
              {COMPRESSOR_TEST_STEPS.map((test) => (
                <div
                  key={test.id}
                  className="bg-stone-950 border border-stone-800/80 hover:border-amber-500/40 rounded-xl p-4 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-800">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-amber-300 flex items-center gap-2">
                        <span>{test.testNameMy}</span>
                      </h4>
                      <span className="text-xs font-mono text-stone-500">
                        {test.testNameEn}
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded self-start sm:self-auto uppercase font-mono ${
                        test.type === 'gauge'
                          ? 'bg-blue-500/20 text-blue-400'
                          : test.type === 'mechanical'
                          ? 'bg-orange-500/20 text-orange-400'
                          : test.type === 'chemical'
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {test.type} test
                    </span>
                  </div>

                  {/* Procedure */}
                  <div className="space-y-1.5 text-xs">
                    <strong className="text-stone-300 block font-semibold">
                      🛠️ စမ်းသပ်လုပ်ဆောင်ပုံ အဆင့်ဆင့်:
                    </strong>
                    <ol className="list-decimal list-inside space-y-1 text-stone-300">
                      {test.procedure.map((step, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Good vs Fault Sign */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="bg-emerald-950/30 border border-emerald-500/30 p-2.5 rounded-lg space-y-1">
                      <div className="font-bold text-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ကွန်ပရက်ဆာ ကောင်းမွန်ပါက တွေ့ရမည့်အခြေအနေ:
                      </div>
                      <p className="text-emerald-200/90 leading-relaxed">
                        {test.expectedGood}
                      </p>
                    </div>

                    <div className="bg-red-950/30 border border-red-500/30 p-2.5 rounded-lg space-y-1">
                      <div className="font-bold text-red-300 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                        ကွန်ပရက်ဆာ ပျက်စီး/အားမရှိပါက တွေ့ရမည့် လက္ခဏာ:
                      </div>
                      <p className="text-red-200/90 leading-relaxed">
                        {test.faultSign}
                      </p>
                    </div>
                  </div>

                  {/* Root Cause & ProTip */}
                  <div className="bg-stone-900/70 p-3 rounded-lg border border-stone-800 text-xs space-y-1.5">
                    <div className="text-stone-300">
                      <strong className="text-cyan-300">🔍 အကြောင်းရင်း သုံးသပ်ချက်: </strong>
                      <span>{test.causeAnalysis}</span>
                    </div>
                    <div className="text-amber-200 flex items-start gap-1.5 pt-1">
                      <Wrench className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-amber-300">Pro-Tip လက်တွေ့အချက်: </strong>
                        {test.proTip}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GAS CHARGING & PSI/GRAMS CALCULATOR */}
      {activeTab === 'charging_calc' && (
        <div className="space-y-4">
          {/* Dynamic Ambient Temperature vs Pressure Calculator */}
          <div className="bg-gradient-to-br from-emerald-950/50 via-stone-900 to-stone-950 border border-emerald-500/40 rounded-2xl p-4 sm:p-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800 mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-emerald-400" />
                  စာတန်းပျက်နေပါက ပြင်ပအပူချိန်ကြည့်၍ ပေါင်ဂိတ်ဖြင့် ချိန်တွယ်ဖြည့်နည်း
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  ပြင်ပအပူချိန် (Ambient Temp) မြင့်လာလေ ဂတ်စ်ဖိအား ပိုတက်လာလေ ဖြစ်သဖြင့် အပူချိန်အလိုက် တိကျစွာ တွက်ချက်နိုင်ပါသည်:
                </p>
              </div>

              {/* Temperature Slider & Quick Controls */}
              <div className="flex items-center gap-2 bg-stone-900 border border-stone-700 px-3 py-1.5 rounded-xl">
                <span className="text-xs text-stone-400 font-bold">ပြင်ပအပူချိန်:</span>
                <input
                  type="range"
                  min="20"
                  max="45"
                  value={ambientTempInput}
                  onChange={(e) => setAmbientTempInput(Number(e.target.value))}
                  className="w-24 accent-emerald-500"
                />
                <span className="text-sm font-black text-emerald-400 font-mono w-12">
                  {ambientTempInput}°C
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  ({Math.round((ambientTempInput * 9) / 5 + 32)}°F)
                </span>
              </div>
            </div>

            {/* Calculated Results Display Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              <div className="bg-blue-950/50 border border-blue-500/40 p-3.5 rounded-xl text-center">
                <div className="text-xs text-blue-300 font-mono font-bold mb-1">
                  စံသတ်မှတ် LOW SIDE (အပြာ)
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-blue-400">
                  {dynamicCalc.lowMin} ~ {dynamicCalc.lowMax} <span className="text-xs">PSI</span>
                </div>
                <div className="text-[11px] text-stone-400 mt-1">
                  (အင်ဂျင် 1500 RPM တွင် တိုင်းတာပါ)
                </div>
              </div>

              <div className="bg-red-950/50 border border-red-500/40 p-3.5 rounded-xl text-center">
                <div className="text-xs text-red-300 font-mono font-bold mb-1">
                  စံသတ်မှတ် HIGH SIDE (အနီ)
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-red-400">
                  {dynamicCalc.highMin} ~ {dynamicCalc.highMax} <span className="text-xs">PSI</span>
                </div>
                <div className="text-[11px] text-stone-400 mt-1">
                  (Condenser ပန်ကာ အလုပ်လုပ်ချိန်)
                </div>
              </div>

              <div className="bg-emerald-950/50 border border-emerald-500/40 p-3.5 rounded-xl text-center">
                <div className="text-xs text-emerald-300 font-mono font-bold mb-1">
                  လေထွက်ပေါက် အအေးနှုန်း (Vent Temp)
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                  {dynamicCalc.ventTemp}°C ~ {dynamicCalc.ventTemp + 4}°C
                </div>
                <div className="text-[11px] text-stone-400 mt-1">
                  (အလွန် အေးစက်သော စံနှုန်း)
                </div>
              </div>
            </div>

            {/* Standard Reference Table */}
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-xs text-left border-collapse border border-stone-800">
                <thead>
                  <tr className="bg-stone-950 text-stone-300 border-b border-stone-800">
                    <th className="p-2 border-r border-stone-800">ပြင်ပအပူချိန်</th>
                    <th className="p-2 border-r border-stone-800 text-blue-400">Low Side PSI</th>
                    <th className="p-2 border-r border-stone-800 text-red-400">High Side PSI</th>
                    <th className="p-2 border-r border-stone-800 text-emerald-400">လေထွက်ပေါက်အပူချိန်</th>
                    <th className="p-2">ရာသီဥတု အခြေအနေ</th>
                  </tr>
                </thead>
                <tbody>
                  {AMBIENT_PRESSURE_CHART.map((row) => (
                    <tr
                      key={row.ambientTempC}
                      className={`border-b border-stone-800/60 hover:bg-stone-800/40 ${
                        ambientTempInput === row.ambientTempC ? 'bg-emerald-500/10 font-bold' : ''
                      }`}
                    >
                      <td className="p-2 border-r border-stone-800 font-mono">
                        {row.ambientTempC}°C ({row.ambientTempF}°F)
                      </td>
                      <td className="p-2 border-r border-stone-800 font-mono text-blue-300 font-semibold">
                        {row.lowSidePsiRange}
                      </td>
                      <td className="p-2 border-r border-stone-800 font-mono text-red-300 font-semibold">
                        {row.highSidePsiRange}
                      </td>
                      <td className="p-2 border-r border-stone-800 font-mono text-emerald-300">
                        {row.recommendedVentTempC}
                      </td>
                      <td className="p-2 text-stone-400">
                        {row.weatherMyanmar}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Vehicle Grams Estimates & Charging Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Grams by vehicle type */}
            <div className="bg-stone-900/95 border border-stone-800 rounded-xl p-4 space-y-3">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400" />
                ကားအမျိုးအစားအလိုက် စံသတ်မှတ် ဂတ်စ် ဂရမ် (Grams) ပမာဏ
              </h4>
              <p className="text-xs text-stone-400">
                အင်ဂျင်ခန်းထဲက စတစ်ကာ စာတန်းများ ပျက်နေပါက ချိန်တွယ်နိုင်ရန် ပျမ်းမျှ ဂရမ်စာရင်း:
              </p>
              <div className="space-y-2 text-xs">
                {VEHICLE_GRAM_ESTIMATES.map((v, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 flex items-center justify-between"
                  >
                    <span className="text-stone-300">{v.vehicleType}</span>
                    <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      {v.avgGrams}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step by Step Liquid vs Vapor Charging rules */}
            <div className="bg-stone-900/95 border border-stone-800 rounded-xl p-4 space-y-3">
              <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                ဂတ်စ်သွင်းနည်း (၂) မျိုး၏ အရေးကြီးသော ကွာခြားချက်
              </h4>

              <div className="space-y-2.5 text-xs text-stone-300">
                <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800 space-y-1">
                  <strong className="text-blue-300 block">
                    ၁။ အငွေ့သွင်းနည်း (Vapor Charging - Low Side မှ သွင်းခြင်း):
                  </strong>
                  <p className="text-stone-300 leading-relaxed">
                    ဂတ်စ်ဘူးကို <strong>မတ်တပ်ထောင်၍</strong> Low Side (အပြာပိုက်) မှ ဖြည်းဖြည်းချင်း သွင်းရသည်။ <strong>ကားစက်နှိုးပြီး အဲကွန်းဖွင့်ထားရမည်။</strong> အငွေ့သာ ဝင်သဖြင့် အန္တရာယ်ကင်းသည်။
                  </p>
                </div>

                <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800 space-y-1">
                  <strong className="text-red-300 block">
                    ၂။ အရည်သွင်းနည်း (Liquid Charging - High Side မှ သွင်းခြင်း):
                  </strong>
                  <p className="text-stone-300 leading-relaxed">
                    Vacuum ဆွဲပြီးနောက် ဂတ်စ်ဘူးကို <strong>ဇောက်ထိုးမှောက်၍</strong> High Side (အနီပိုက်) မှ သွင်းရသည်။ <strong>ကားစက် လုံးဝ သေထားရမည် (အင်ဂျင်မနှိုးရပါ)!</strong>
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/40 p-2.5 rounded-lg text-red-200">
                  <strong className="text-red-300 flex items-center gap-1">
                    <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                    သေစေနိုင်သော အမှား (Fatal Mistake):
                  </strong>
                  <p className="text-[11px] mt-0.5 leading-relaxed">
                    ကားစက်နှိုးထားစဉ် ဂတ်စ်ဘူးမှောက်ပြီး Low Side ထဲသို့ အရည် လုံးဝ မသွင်းရပါ! ကွန်ပရက်ဆာသည် အရည်ကို ဖိညှပ်မရသဖြင့် (Hydrolock) ပစ္စတင်များ ကျိုးကြေသွားပါလိမ့်မည်!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: A/C SENSORS & ECU CONTROL INTERLOCK */}
      {activeTab === 'sensors_ecu' && (
        <div className="space-y-4">
          {/* ECU Logic Banner */}
          <div className="bg-indigo-950/40 border border-indigo-500/40 rounded-2xl p-4 sm:p-5 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              ECU က အဲကွန်းကို ဘယ်လို အချက်ပြလက်ခံပြီး ထိန်းချုပ်ထားသလဲ (ECU Interlock Logic)
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              ခေတ်သစ်ကားများတွင် အဲကွန်းခလုတ် (A/C Switch) နှိပ်လိုက်သည်နှင့် ကွန်ပရက်ဆာသို့ မီး တိုက်ရိုက်မသွားပါ။ အောက်ပါ လုံခြုံရေးနှင့် ဝန်ထိန်း စနစ်များ ဖြတ်သန်းရပါသည်:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
              <div className="bg-stone-900/80 p-3 rounded-xl border border-indigo-500/30 space-y-1">
                <span className="text-indigo-300 font-bold font-mono">1. Idle-Up Control</span>
                <div className="font-semibold text-white">စလိုးတင်ပေးခြင်း</div>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  A/C ခလုတ်နှိပ်ပါက ECU က Throttle Body ကို စလိုး 200 RPM ခန့် အရင်တင်ပြီးမှ ကလပ်ကို မီးလွှတ်ပေးသည်။ (မို့ဆို အင်ဂျင် သေသွားမည်)
                </p>
              </div>

              <div className="bg-stone-900/80 p-3 rounded-xl border border-indigo-500/30 space-y-1">
                <span className="text-indigo-300 font-bold font-mono">2. WOT Acceleration</span>
                <div className="font-semibold text-white">လီဗာကုန်နင်းချိန် ဖြတ်ခြင်း</div>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  ကုန်းတက်ချိန် သို့မဟုတ် ကားကျော်တက်ရန် လီဗာ အပြည့်နင်းလိုက်ပါက ECU က ကားပြေးအားရစေရန် အဲကွန်းကို ၅ စက္ကန့်ခန့် ယာယီဖြတ်ပေးသည်။
                </p>
              </div>

              <div className="bg-stone-900/80 p-3 rounded-xl border border-indigo-500/30 space-y-1">
                <span className="text-indigo-300 font-bold font-mono">3. Overheat Cut-off</span>
                <div className="font-semibold text-white">အင်ဂျင်အပူတက်ချိန် ကာကွယ်ခြင်း</div>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  ရေအပူချိန် (ECT) 105°C ကျော်တက်လာပါက အင်ဂျင် မပူလောင်စေရန် ECU သည် အဲကွန်းကို အလိုအလျောက် ချက်ချင်း ဖြတ်ချပစ်သည်။
                </p>
              </div>

              <div className="bg-stone-900/80 p-3 rounded-xl border border-indigo-500/30 space-y-1">
                <span className="text-indigo-300 font-bold font-mono">4. Anti-Freeze Logic</span>
                <div className="font-semibold text-white">ကွိုင်အေး ရေခဲမကပ်အောင် ထိန်းခြင်း</div>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  ကွိုင်အေး အပူချိန် 2°C သို့ ရောက်ပါက ရေခဲပိတ်ပြီး လေမထွက်တော့မည်စိုး၍ မီးဖြတ်သည်။ 4°C ပြန်တက်မှ ပြန်ကပ်ပေးသည်။
                </p>
              </div>
            </div>
          </div>

          {/* Sensors Directory Cards */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-200">
              အဲကွန်းစနစ်တွင် ပါဝင်သော အဓိက ဆန်ဆာ (၄) မျိုး၏ အလုပ်လုပ်ပုံနှင့် စစ်ဆေးနည်းများ:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {AC_SENSORS_DIRECTORY.map((s) => (
                <div
                  key={s.id}
                  className="bg-stone-900/95 border border-stone-800 rounded-xl p-4 space-y-3 text-xs"
                >
                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-stone-800">
                    <div>
                      <h5 className="font-bold text-indigo-300 text-sm">
                        {s.nameMy}
                      </h5>
                      <span className="text-[11px] font-mono text-stone-500">
                        {s.nameEn}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] bg-stone-800 text-cyan-300 px-2 py-0.5 rounded font-bold">
                      {s.wiringCount} Wires
                    </span>
                  </div>

                  <div className="space-y-1.5 text-stone-300">
                    <div>
                      <strong className="text-stone-400">📍 တပ်ဆင်ထားသည့် နေရာ: </strong>
                      <span>{s.location}</span>
                    </div>
                    <div>
                      <strong className="text-stone-400">⚡ အလုပ်လုပ်ပုံ သဘောတရား: </strong>
                      <span>{s.operatingPrinciple}</span>
                    </div>
                    <div>
                      <strong className="text-cyan-300">📊 စံသတ်မှတ် တန်ဖိုးများ: </strong>
                      <span className="font-mono text-cyan-200">{s.normalValues}</span>
                    </div>
                  </div>

                  {/* Failure symptoms & ECU Logic */}
                  <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800/80 space-y-1.5">
                    <strong className="text-red-300 block">
                      ⚠️ ပျက်စီးပါက တွေ့ရမည့် လက္ခဏာများ:
                    </strong>
                    <ul className="list-disc list-inside space-y-0.5 text-stone-300 text-[11px]">
                      {s.failureSymptoms.map((sym, i) => (
                        <li key={i}>{sym}</li>
                      ))}
                    </ul>

                    <div className="pt-1 text-[11px] text-indigo-200">
                      <strong className="text-indigo-300">🧠 ECU အချက်ပြ ထိန်းချုပ်ပုံ: </strong>
                      <span>{s.ecuSignalLogic}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: REFRIGERANTS & COMPRESSOR OILS */}
      {activeTab === 'gas_oil' && (
        <div className="space-y-4">
          {/* Why Car uses R134a vs Home R22/R410A */}
          <div className="bg-stone-900/95 border border-stone-800 rounded-2xl p-4 sm:p-5 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Snowflake className="w-5 h-5 text-purple-400" />
              ကားတွေမှာ ဘာကြောင့် အိမ်သုံးအဲကွန်းတွေလို မဟုတ်ဘဲ R134a ကို အသုံးပြုရသလဲ?
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              ကားအဲကွန်းနှင့် အိမ်သုံးအဲကွန်းသည် လုံးဝ မတူညီသော ပတ်ဝန်းကျင်တွင် အလုပ်လုပ်ရပါသည် — ကားအင်ဂျင်ခန်းသည် 80°C မှ 100°C အထိ အပူချိန်မြင့်မားပြီး၊ လမ်းကြမ်းတုန်ခါမှု အလွန်များပြားသည့်အတွက် ဖိအားနှင့် မီးလောင်လွယ်မှု အန္တရာယ် မတူညီပါ:
            </p>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-xs text-left border-collapse border border-stone-800">
                <thead>
                  <tr className="bg-stone-950 text-stone-300 border-b border-stone-800">
                    <th className="p-2 border-r border-stone-800">ဂတ်စ် အမျိုးအစား</th>
                    <th className="p-2 border-r border-stone-800">ကားတွင် သုံးနိုင်/မသုံးနိုင်</th>
                    <th className="p-2 border-r border-stone-800">ပုံမှန်ဖိအား (Low / High)</th>
                    <th className="p-2 border-r border-stone-800">အသုံးပြုသည့် ဆီ</th>
                    <th className="p-2">သုံးရခြင်း/မသုံးရခြင်း အကြောင်းရင်း</th>
                  </tr>
                </thead>
                <tbody>
                  {REFRIGERANT_COMPARISONS.map((gas, i) => (
                    <tr
                      key={i}
                      className={`border-b border-stone-800/60 ${
                        gas.canUseInCar ? 'bg-cyan-950/20' : 'bg-red-950/10'
                      }`}
                    >
                      <td className="p-2 border-r border-stone-800 font-bold font-mono text-stone-200">
                        {gas.refrigerant}
                      </td>
                      <td className="p-2 border-r border-stone-800">
                        {gas.canUseInCar ? (
                          <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold text-[10px]">
                            ကားသုံး ဂတ်စ် ✓
                          </span>
                        ) : (
                          <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-bold text-[10px]">
                            ကားတွင် လုံးဝ မသုံးရ ❌
                          </span>
                        )}
                      </td>
                      <td className="p-2 border-r border-stone-800 font-mono text-[11px] text-stone-300">
                        {gas.operatingPressureLow} / {gas.operatingPressureHigh}
                      </td>
                      <td className="p-2 border-r border-stone-800 font-mono text-stone-300 text-[11px]">
                        {gas.oilCompatibility}
                      </td>
                      <td className="p-2 text-stone-300 text-[11px] leading-relaxed">
                        {gas.whyCarOrHome}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Compressor Oils (PAG vs POE / Hybrid EV) */}
          <div className="bg-stone-900/95 border border-stone-800 rounded-2xl p-4 sm:p-5 space-y-3">
            <h4 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              ကွန်ပရက်ဆာဆီ အမျိုးအစားများ (PAG 46, PAG 100 vs Hybrid/EV POE ဆီ)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {COMPRESSOR_OILS.map((oil, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border space-y-2 ${
                    oil.hybirdEvSafe
                      ? 'bg-amber-950/30 border-amber-500/50'
                      : 'bg-stone-950 border-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-stone-100 font-mono">
                      {oil.oilType}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        oil.hybirdEvSafe
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {oil.viscosity}
                    </span>
                  </div>

                  <div className="text-stone-300 text-[11px]">
                    <strong className="text-stone-400">သုံးသောကားများ: </strong>
                    <span>{oil.application}</span>
                  </div>

                  <div
                    className={`p-2 rounded text-[11px] leading-relaxed ${
                      oil.hybirdEvSafe
                        ? 'bg-red-500/20 text-red-200 border border-red-500/30'
                        : 'bg-stone-900 text-stone-400'
                    }`}
                  >
                    {oil.warningNote}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: AUTO CLIMATE & BLEND DOORS */}
      {activeTab === 'auto_climate' && (
        <div className="bg-stone-900/95 border border-stone-800 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-800">
            <Wind className="w-5 h-5 text-rose-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              အော်တိုအဲကွန်း စနစ်နှင့် လေလမ်းကြောင်း မော်တာများ (Auto Climate & Blend Doors)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Dual Zone Issue */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2.5">
              <h4 className="font-bold text-rose-300 text-sm flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                တစ်ဖက်က အေးပြီး တစ်ဖက်က ပူနေရသည့် အကြောင်းရင်း (Split Temp Issue)
              </h4>
              <p className="text-stone-300 leading-relaxed">
                ဝပ်ရှော့သို့ လာရောက်တတ်သော ကားများတွင် <strong>ယာဉ်မောင်းဘက် အေးပြီး ဘေးခရီးသည်ဘက် မအေးခြင်း</strong> သို့မဟုတ် ပြောင်းပြန် ဖြစ်နေပါက အောက်ပါ (၂) ချက်သာ ဖြစ်နိုင်ပါသည်:
              </p>
              <ul className="space-y-1.5 text-stone-300 list-disc list-inside">
                <li>
                  <strong>၁။ Blend Door Servo Motor ပျက်စီးခြင်း:</strong> ဒက်ရှ်ဘုတ်အောက်ရှိ လေပူ/လေအေး ရောစပ်ပေးသော ဆာဗိုမော်တာ ဂီယာကြိုးပဲ့၍ အပူဘက်သို့ ပွင့်လျက်သား ရပ်နေခြင်း။
                </li>
                <li>
                  <strong>၂။ ဂတ်စ် နည်းနည်း လျော့နည်းနေခြင်း:</strong> ကွိုင်အေးသည် ၂ ခြမ်းခွဲထားသဖြင့် ဂတ်စ်အားနည်းပါက အဝင်ပိုင်း တစ်ခြမ်းသာ အေးပြီး ကျန်တစ်ခြမ်း မအေးနိုင်တော့ခြင်း။
                </li>
              </ul>
            </div>

            {/* Cabin Buttons Decoded */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2.5">
              <h4 className="font-bold text-cyan-300 text-sm flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-cyan-400" />
                ကားအတွင်းခန်း အဲကွန်းခလုတ်များ၏ လျှို့ဝှက်ချက်
              </h4>
              <div className="space-y-2 text-stone-300">
                <div className="border-b border-stone-800 pb-1.5">
                  <strong className="text-amber-300">RECIRC (ကားပုံထဲ မြှားကွေးပါသော ခလုတ်): </strong>
                  <span>ကားထဲက လေအေးကိုသာ ပြန်လှည့်သုံးသည်။ အမြန်ဆုံး အေးပြီး ပြင်ပ အနံ့ဆိုးများ မဝင်စေပါ။</span>
                </div>
                <div className="border-b border-stone-800 pb-1.5">
                  <strong className="text-cyan-300">FRESH AIR (အပြင်မှ မြှားဝင်သော ခလုတ်): </strong>
                  <span>ပြင်ပလေကို ကားထဲသွင်းသည်။ မိုးရွာချိန်တွင် မှန်ငွေ့မရိုက်စေရန် ဖွင့်ရသည်။</span>
                </div>
                <div>
                  <strong className="text-emerald-300">DEFROST (ရှေ့လေကာမှန်ငွေ့ဖျောက်): </strong>
                  <span>နှိပ်လိုက်သည်နှင့် ECU သည် A/C Compressor ကို အလိုအလျောက် ဖွင့်ပြီး လေအေးဖြင့် မှန်ငွေ့ကို စက္ကန့် ၃၀ အတွင်း အမြန်ဆုံး ဖျောက်ပေးသည်။</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: AUTOMOTIVE A/C TERMINOLOGY GLOSSARY (မီးနှင်း & ဝေါဟာရ အဘိဓာန်) */}
      {activeTab === 'ac_glossary' && (
        <div className="space-y-4">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-amber-950/60 via-stone-900 to-stone-950 border border-amber-500/40 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <span>အဲကွန်း ဝေါဟာရ & ပစ္စည်းအဘိဓာန် (Car A/C Master Glossary & Meanings)</span>
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  ဆရာ့ တပည့်များနှင့် သင်တန်းသားများ အလွယ်တကူ လေ့လာနိုင်ရန် အင်္ဂလိပ်စကားလုံး၊ အသံထွက်၊ မြန်မာပြန် (Meaning) နှင့် ဝပ်ရှော့အခေါ်အဝေါ်များ စုံလင်စွာ စုစည်းမှု:
                </p>
              </div>

              {/* Instant Glossary Search */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  placeholder="ပစ္စည်းအမည် ရိုက်ရှာပါ (ဥပမာ: Condenser, အပူကွိုင်, Valve)..."
                  className="w-full bg-stone-950 border border-amber-500/40 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400 shadow-inner"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 text-xs">
              {[
                { id: 'all', label: 'အားလုံး (All 26)' },
                { id: 'core_parts', label: 'အဓိက အစိတ်အပိုင်းကြီးများ' },
                { id: 'valves_pipes', label: 'ဘားနှင့် ပိုက်လိုင်းများ' },
                { id: 'electrical_sensors', label: 'လျှပ်စစ်နှင့် ဆန်ဆာများ' },
                { id: 'doors_motors', label: 'မော်တာနှင့် လေတံခါးများ' },
                { id: 'tools_service', label: 'ကိရိယာနှင့် ဝန်ဆောင်မှု' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    if (soundEnabled) playChime(500, 0.05);
                    setGlossaryCategory(c.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                    glossaryCategory === c.id
                      ? 'bg-amber-400 text-stone-950 shadow-md font-black'
                      : 'bg-stone-950/80 text-stone-400 hover:text-white border border-stone-800'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredGlossary.map((item) => (
              <div
                key={item.id}
                className="bg-stone-900/95 border border-stone-800 hover:border-amber-500/50 rounded-xl p-4 transition-all space-y-2.5 text-xs shadow-lg"
              >
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-stone-800">
                  <div>
                    <h4 className="font-mono font-black text-sm sm:text-base text-amber-300">
                      {item.termEn}
                    </h4>
                    <span className="text-[11px] font-semibold text-cyan-300">
                      🗣️ အသံထွက်: <strong>{item.pronunciationMy}</strong>
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-950 text-stone-400 border border-stone-800">
                    {item.categoryLabelMy}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="text-stone-200">
                    <strong className="text-emerald-400">🇲🇲 မြန်မာပြန်: </strong>
                    <span className="font-bold text-white">{item.termMy}</span>
                  </div>

                  <div className="text-stone-300">
                    <strong className="text-amber-400">🔧 ဝပ်ရှော့အခေါ်: </strong>
                    <span className="text-amber-200 font-semibold">{item.workshopSlangMy}</span>
                  </div>
                </div>

                <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800/80 text-[11px] text-stone-300 leading-relaxed">
                  <strong className="text-cyan-300 block mb-0.5">💡 တပည့်များ ရှင်းပြရန် လုပ်ဆောင်ချက်:</strong>
                  {item.functionMy}
                </div>
              </div>
            ))}
          </div>

          {filteredGlossary.length === 0 && (
            <div className="p-8 text-center text-stone-500 text-xs">
              ရှာဖွေတွေ့ရှိမှု မရှိပါ။ စကားလုံး စစ်ဆေးပြီး ပြန်လည် ရိုက်ရှာကြည့်ပါ ခင်ဗျာ။
            </div>
          )}
        </div>
      )}

      {/* TAB 8: WIRING CIRCUIT TRACING & RELAY/SENSOR TROUBLESHOOTING (အမဲဖြတ်နည်း) */}
      {activeTab === 'wiring_troubleshoot' && (
        <div className="space-y-5">
          {/* Header Banner with Teacher's Wisdom Quote */}
          <div className="bg-gradient-to-r from-yellow-950 via-stone-900 to-amber-950 border-2 border-yellow-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-800">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 text-[11px] font-mono font-bold border border-yellow-400/30 mb-1">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  Hands-on Electrical Diagnostics & Wire Tracing
                </div>
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <span>⚡ အဲကွန်း ဝါယာရိန်း မီးလိုင်းလိုက်နည်း & Relay/ဆန်ဆာ ပြုပြင်နည်း</span>
                </h3>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl text-amber-200 text-xs font-semibold shrink-0">
                &ldquo;အသားဟင်း ဘယ်ကရမှန်း သိရုံမက အမဲပါ ဖြတ်တတ်စေမည့် မဟာလက်စွဲ&rdquo; 🥩✨
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              ခလုတ်ကပဲဖြစ်ဖြစ်၊ ဖျူး၊ ရီလေး၊ ဆန်ဆာနဲ့ ဝါယာကြိုးတွေက ဆက်သွယ်မှု မရလို့ အဲကွန်း မကပ်/မအေးတော့တဲ့အခါ စမ်းသပ်မီးသီး (Test Light)၊ မီတာတို့နဲ့ မီးလိုင်းလိုက်စစ်ပြီး တိုက်ရိုက် Jump ထိုး အဖြေရှာနည်းများ:
            </p>

            {/* Circuit Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
              {AC_WIRING_CIRCUITS.map((circuit) => {
                const isSelected = selectedCircuit.id === circuit.id;
                return (
                  <button
                    key={circuit.id}
                    onClick={() => {
                      if (soundEnabled) playChime(640, 0.1);
                      setSelectedCircuit(circuit);
                    }}
                    className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-yellow-950/80 border-yellow-400 ring-2 ring-yellow-500/40 shadow-xl'
                        : 'bg-stone-950/80 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-800 text-yellow-300 font-bold uppercase">
                          {circuit.circuitCategory}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                        )}
                      </div>
                      <h4 className="font-bold text-xs text-white leading-snug">
                        {circuit.titleMy}
                      </h4>
                    </div>

                    <div className="text-[11px] text-stone-400 mt-2 line-clamp-1">
                      ⚠️ {circuit.symptomMy}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Circuit Workbench for Selected Circuit */}
          <div className="bg-stone-900/95 border-2 border-stone-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-5">
            {/* Title & Symptoms Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-black text-yellow-300 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span>{selectedCircuit.titleMy}</span>
                </h4>
                <div className="text-xs text-stone-400 font-mono">
                  {selectedCircuit.titleEn}
                </div>
              </div>

              {/* Tools needed pill */}
              <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
                {selectedCircuit.toolsNeeded.map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-950 border border-stone-800 text-stone-300"
                  >
                    🛠️ {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Symptom Callout */}
            <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl text-xs text-red-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <div>
                <strong>တွေ့ရမည့် ပြဿနာ (Symptom): </strong>
                <span>{selectedCircuit.symptomMy}</span>
              </div>
            </div>

            {/* Pin-by-Pin Tracing Table */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                <span>🔌 ခြေထောက်တစ်ခုချင်းစီ မီးရောက်/မရောက် စစ်ဆေးရမည့် စံနှုန်းများ:</span>
              </h5>
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-xs text-left border-collapse border border-stone-800">
                  <thead>
                    <tr className="bg-stone-950 text-stone-400 border-b border-stone-800">
                      <th className="p-2.5 border-r border-stone-800">ခြေထောက် (Pin)</th>
                      <th className="p-2.5 border-r border-stone-800">တာဝန် (Role)</th>
                      <th className="p-2.5 border-r border-stone-800 text-yellow-300">မီတာပြရမည့်ဗို့ (Volts)</th>
                      <th className="p-2.5 border-r border-stone-800 text-cyan-300">Test Light မီးသီးစစ်ဆေးချက်</th>
                      <th className="p-2.5 text-red-300">မီးမရောက်ပါက ဖြစ်နိုင်သောအပြစ်</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCircuit.pins.map((pin, i) => (
                      <tr key={i} className="border-b border-stone-800/70 hover:bg-stone-800/30">
                        <td className="p-2.5 border-r border-stone-800 font-mono font-bold text-white whitespace-nowrap">
                          {pin.pinLabel}
                        </td>
                        <td className="p-2.5 border-r border-stone-800 text-stone-200">
                          {pin.pinRoleMy}
                        </td>
                        <td className="p-2.5 border-r border-stone-800 font-mono text-yellow-300 font-bold whitespace-nowrap">
                          {pin.expectedReading}
                        </td>
                        <td className="p-2.5 border-r border-stone-800 text-cyan-200">
                          {pin.testLightResult}
                        </td>
                        <td className="p-2.5 text-red-200/90">
                          {pin.failureSign}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Step-by-Step Hands-on Tracing Instructions */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2 text-xs">
              <strong className="text-emerald-400 text-sm font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                လက်တွေ့ မီးလိုင်းလိုက် စစ်ဆေးနည်း အဆင့်ဆင့် (Step-by-Step Tracing):
              </strong>
              <ol className="list-decimal list-inside space-y-1.5 text-stone-200 pl-1">
                {selectedCircuit.stepByStepTracing.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Quick Bypass Test & Common Failure Point */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {/* Quick Bypass Test */}
              <div className="bg-amber-950/40 border border-amber-500/40 p-3.5 rounded-xl space-y-1.5">
                <div className="font-bold text-amber-300 flex items-center gap-1.5 text-xs sm:text-sm">
                  <Zap className="w-4 h-4 text-amber-400" />
                  ဆရာသမား လျှို့ဝှက် Jump ထိုး စမ်းသပ်နည်း (Quick Bypass Test):
                </div>
                <p className="text-amber-100/90 leading-relaxed">
                  {selectedCircuit.quickBypassTest}
                </p>
              </div>

              {/* Common Failure Point */}
              <div className="bg-red-950/30 border border-red-500/30 p-3.5 rounded-xl space-y-1.5">
                <div className="font-bold text-red-300 flex items-center gap-1.5 text-xs sm:text-sm">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  အဖြစ်အများဆုံး ပျက်စီးသည့် နေရာ (Common Failure Point):
                </div>
                <p className="text-red-100/90 leading-relaxed">
                  {selectedCircuit.commonFailurePoint}
                </p>
              </div>
            </div>

            {/* Pro Butcher Tip Box */}
            <div className="bg-gradient-to-r from-yellow-500/10 via-amber-500/15 to-yellow-500/10 border-2 border-yellow-500/40 p-4 rounded-xl flex items-start gap-3 text-xs text-yellow-200 shadow-lg">
              <span className="text-2xl shrink-0 mt-0.5">🥩</span>
              <div className="space-y-1">
                <strong className="text-yellow-300 text-sm font-bold block">
                  ဆရာ့စကားပုံ: &ldquo;အမဲဖြတ်နည်း&rdquo; လက်တွေ့ အကြံပြုချက် (Pro Butcher Tip):
                </strong>
                <p className="leading-relaxed text-stone-200">
                  {selectedCircuit.proButcherTip}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
