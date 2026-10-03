import React, { useState } from 'react';
import { ALL_SENSORS_DATA } from '../data/sensorsData';
import { SensorDetail, SensorCategory } from '../types/wiring';
import { Search, Gauge, Eye, X, Activity, Wrench, AlertTriangle, ShieldCheck, ChevronRight, Zap } from 'lucide-react';
import { playChime } from '../utils/audio';

interface SensorsDirectorySectionProps {
  soundEnabled: boolean;
  searchQuery?: string;
}

export const SensorsDirectorySection: React.FC<SensorsDirectorySectionProps> = ({
  soundEnabled,
  searchQuery = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SensorCategory | 'all'>('all');
  const [selectedSensor, setSelectedSensor] = useState<SensorDetail | null>(null);
  const [internalSearch, setInternalSearch] = useState<string>('');

  const effectiveSearch = (searchQuery || internalSearch).toLowerCase().trim();

  const categories: { key: SensorCategory | 'all'; labelMy: string; icon: string }[] = [
    { key: 'all', labelMy: 'အားလုံး (All)', icon: '⭐' },
    { key: 'timing', labelMy: 'ကရိုင်း/မီးချိန် (Timing)', icon: '⚙️' },
    { key: 'air_fuel', labelMy: 'လေမီတာ/ဆီရောစပ် (Air/Fuel)', icon: '💨' },
    { key: 'fluids_temp', labelMy: 'ရေ/ဆီ/အပူချိန် (Fluids)', icon: '🌡️' },
    { key: 'exhaust', labelMy: 'အောက်ဆီဂျင်/အိပ်ဇော (Exhaust)', icon: '🔥' },
    { key: 'transmission', labelMy: 'ဂီယာဘောက်စ် (Transmission)', icon: '🚗' },
    { key: 'chassis_safety', labelMy: 'ABS/ဘရိတ် (Chassis/Safety)', icon: '🛑' },
    { key: 'body_ac', labelMy: 'အဲကွန်း/ကိုယ်ထည် (Body/AC)', icon: '❄️' },
  ];

  const filteredSensors = ALL_SENSORS_DATA.filter((s) => {
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!effectiveSearch) return true;

    return (
      s.acronym.toLowerCase().includes(effectiveSearch) ||
      s.nameEn.toLowerCase().includes(effectiveSearch) ||
      s.nameMy.toLowerCase().includes(effectiveSearch) ||
      s.type.toLowerCase().includes(effectiveSearch) ||
      s.symptomsOfFailure.some((sym) => sym.toLowerCase().includes(effectiveSearch)) ||
      s.workingPrinciple.toLowerCase().includes(effectiveSearch)
    );
  });

  const handleOpenSensor = (sensor: SensorDetail) => {
    if (soundEnabled) playChime(650, 0.15);
    setSelectedSensor(sensor);
  };

  return (
    <div className="bg-stone-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-emerald-500/20 shrink-0">
            <Gauge className="w-5 h-5 text-stone-950 fill-stone-950" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-emerald-300 flex items-center gap-2">
              ၃။ ကားတစ်စီးလုံး ဆန်ဆာ (၃၈) မျိုး အပြည့်အစုံ လမ်းညွှန်
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                Master Sensor Directory
              </span>
            </h2>
            <p className="text-xs text-stone-400">
              အလုပ်လုပ်ပုံ၊ ဖွဲ့စည်းပုံ၊ ဗို့အား/အုမ်းစံချိန်၊ Pinout နှင့် မီတာဖြင့် အပြစ်ရှာ စစ်ဆေးနည်းများ
            </p>
          </div>
        </div>

        {/* Total Badge */}
        <div className="text-xs font-mono text-stone-400 bg-stone-950 px-3 py-1.5 rounded-xl border border-stone-800 w-fit">
          ရရှိနိုင်သော ဆန်ဆာ: <span className="font-bold text-amber-400">{filteredSensors.length}</span> / {ALL_SENSORS_DATA.length} မျိုး
        </div>
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
                ? 'bg-emerald-500 text-stone-950 shadow-md shadow-emerald-500/20 font-black'
                : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.labelMy}</span>
          </button>
        ))}
      </div>

      {/* Local search bar if no global query */}
      {!searchQuery && (
        <div className="mt-3 relative">
          <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={internalSearch}
            onChange={(e) => setInternalSearch(e.target.value)}
            placeholder="ဆန်ဆာအမည်၊ ရောဂါလက္ခဏာ ရိုက်ရှာပါ (ဥပမာ: CKP, TPS, O2, ကရိုင်း, လီဗာ, ရေအပူချိန်, ဆီစား, စလိုး)..."
            className="w-full bg-stone-950 border border-stone-800 rounded-xl py-2 pl-9 pr-4 text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      )}

      {/* Sensors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4">
        {filteredSensors.map((sensor) => (
          <div
            key={sensor.id}
            onClick={() => handleOpenSensor(sensor)}
            className="bg-stone-950/80 hover:bg-stone-850 border border-stone-800 hover:border-emerald-500/50 rounded-xl p-3.5 transition-all cursor-pointer group flex flex-col justify-between shadow-md"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-mono font-black text-sm px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {sensor.acronym}
                </span>
                <span className="text-[10px] text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                  {sensor.categoryNameMy}
                </span>
              </div>

              <h3 className="font-bold text-sm text-stone-100 group-hover:text-emerald-300 transition-colors line-clamp-1">
                {sensor.nameMy}
              </h3>
              <p className="text-xs font-mono text-stone-400 line-clamp-1">
                {sensor.nameEn}
              </p>

              <div className="mt-2 text-[11px] text-stone-400 bg-stone-900/60 p-2 rounded-lg border border-stone-850 line-clamp-2">
                {sensor.workingPrinciple}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-stone-850 flex items-center justify-between text-xs text-stone-400">
              <span className="text-[11px] font-mono text-amber-300">
                {sensor.pinoutSummary.length} Pins
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                အသေးစိတ် ကြည့်မည် <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* SENSOR DETAIL MODAL */}
      {selectedSensor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-150 overflow-y-auto"
          onClick={() => setSelectedSensor(null)}
        >
          <div
            className="bg-stone-900 border-2 border-emerald-500/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedSensor(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-stone-800">
              <span className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 font-mono font-black text-xl flex items-center justify-center shrink-0">
                {selectedSensor.acronym}
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-100">
                  {selectedSensor.nameMy}
                </h3>
                <p className="text-xs font-mono text-emerald-400">
                  {selectedSensor.nameEn} • {selectedSensor.type}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="mt-4 space-y-4 text-xs">
              {/* Working Principle */}
              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                <span className="font-bold text-amber-300 block mb-1 text-sm flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-amber-400" /> အလုပ်လုပ်ပုံ နိယာမ:
                </span>
                <p className="text-stone-300 leading-relaxed">
                  {selectedSensor.workingPrinciple}
                </p>
              </div>

              {/* Internal Structure */}
              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                <span className="font-bold text-cyan-300 block mb-1 text-sm flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-cyan-400" /> အတွင်းဖွဲ့စည်းပုံ:
                </span>
                <p className="text-stone-300 leading-relaxed">
                  {selectedSensor.internalStructure}
                </p>
              </div>

              {/* Pinout & Specs Table */}
              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                <span className="font-bold text-emerald-300 block mb-2 text-sm flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-emerald-400" /> Pinout ဝါယာလိုင်းများနှင့် စံချိန်များ:
                </span>
                <div className="space-y-1.5">
                  {selectedSensor.pinoutSummary.map((p, idx) => (
                    <div key={idx} className="bg-stone-900 p-2.5 rounded-lg border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-emerald-400 text-xs px-2 py-0.5 rounded bg-stone-950 border border-emerald-500/30">
                          {p.pin}
                        </span>
                        <span className="font-bold text-stone-200">{p.signalType}</span>
                      </div>
                      <div className="text-right sm:text-right">
                        <span className="font-mono text-cyan-300 text-[11px] block">{p.standardValue}</span>
                        <span className="text-[10px] text-stone-400">{p.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testing Steps */}
              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                <span className="font-bold text-purple-300 block mb-2 text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-purple-400" /> မီတာဖြင့် အပြစ်ရှာ စစ်ဆေးနည်း အဆင့်ဆင့်:
                </span>
                <div className="space-y-2">
                  {selectedSensor.testingSteps.map((step) => (
                    <div key={step.step} className="bg-stone-900/80 p-2.5 rounded-lg border border-stone-800">
                      <div className="font-bold text-stone-200 text-xs flex items-center gap-1.5 mb-1">
                        <span className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px]">
                          {step.step}
                        </span>
                        {step.title}
                      </div>
                      <p className="text-stone-300 text-[11px] pl-5 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Symptoms of Failure */}
              <div className="bg-rose-950/20 p-3.5 rounded-xl border border-rose-500/30">
                <span className="font-bold text-rose-300 block mb-2 text-sm flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" /> ပျက်စီးပါက ဖြစ်ပေါ်မည့် လက္ခဏာများ:
                </span>
                <ul className="list-disc list-inside space-y-1 text-stone-300 text-[11px]">
                  {selectedSensor.symptomsOfFailure.map((sym, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {sym}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro Tip */}
              <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/30 text-amber-200 text-[11px]">
                <strong className="text-amber-300 block mb-0.5">💡 ဝပ်ရှော့သမား ဆရာကျ အကြံပြုချက်:</strong>
                {selectedSensor.diagnosticTips}
              </div>
            </div>

            {/* Bottom Close Button */}
            <button
              onClick={() => setSelectedSensor(null)}
              className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-stone-950 font-bold text-xs shadow-lg transition-all"
            >
              ပိတ်မည် (Close)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
