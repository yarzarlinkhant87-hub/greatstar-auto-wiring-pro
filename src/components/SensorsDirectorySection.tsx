import React, { useState } from 'react';
import { ALL_SENSORS_DATA } from '../data/sensorsData';
import { SensorDetail, SensorCategory } from '../types/wiring';
import { Search, Gauge, Eye, X, Activity, Wrench, AlertTriangle, ShieldCheck, ChevronRight, Zap, Sparkles, BookOpen, Cpu, Radio, HelpCircle } from 'lucide-react';
import { playChime } from '../utils/audio';

interface SensorsDirectorySectionProps {
  soundEnabled: boolean;
  searchQuery?: string;
}

// ECU ဆီသို့ အချက်အလက် ပြန်ပို့ပုံ သဘောတရား (ဆရာ Zaw Naing Win ၏ မေးခွန်း: ၅ ဗို့ကြိုးက ပြန်ပို့တာလား?)
const getEcuSignalExplanation = (sensor: SensorDetail) => {
  const typeLower = sensor.type.toLowerCase();
  const nameLower = sensor.nameEn.toLowerCase();

  // 1. Thermistor / Temperature Sensors (ECT, IAT, Fuel Temp)
  if (typeLower.includes('ntc') || typeLower.includes('thermistor') || nameLower.includes('temp')) {
    return {
      title: '🌡️ ၂ ကြိုး အပူချိန်ဆန်ဆာ (Pull-up Voltage Divider စနစ်)',
      powerDesc: 'ECU ကွန်ပျူတာမှ 5.0V ရည်ညွှန်းဗို့အားကို ကြိုးတစ်ချောင်းတည်းဖြင့် ဆန်ဆာဆီသို့ အမြဲလွှတ်ပေးထားသည်။',
      signalDesc: 'အပူချိန်တက်လာပါက ဆန်ဆာအတွင်းရှိ NTC ပြားလေး ခုခံအား (Ω) ကျသွားသဖြင့် အဆိုပါ 5V လိုင်းပေါ်ရှိ ဗို့အားသည် (အေးချိန် ၃.၈ ဗို့ မှ ပူချိန် ၀.၈ ဗို့ သို့) အလိုအလျောက် ထိုးကျသွားသည်။ ECU သည် ဤ 5V လိုင်းပေါ်ရှိ ဗို့အားကျဆင်းမှု (Voltage Drop) ကို ကွန်ပျူတာအတွင်းမှ တိုက်ရိုက်တိုင်းတာ၍ အပူချိန်ကို အတိအကျ သိရှိသည်။',
      takeaway: '👉 ဆရာ့သင်ကြားချက်: ဤဆန်ဆာတွင် ၅ ဗို့ကြိုးသည် ပါဝါကျွေးခြင်းရော အချက်ပြပြန်ပို့ခြင်းပါ တစ်ပြိုင်နက်တည်း လုပ်ဆောင်သော စနစ် ဖြစ်သည်။'
    };
  }

  // 2. Magnetic Inductive Sensors (CKP/CMP Inductive, ABS)
  if (typeLower.includes('magnetic') || typeLower.includes('inductive')) {
    return {
      title: '🧲 ၂ ကြိုး သံလိုက်ဆန်ဆာ (Magnetic Induction AC Generator စနစ်)',
      powerDesc: 'ECU မှ မည်သည့် 5V သို့မဟုတ် 12V လျှပ်စစ်ပါဝါမှ ကျွေးစရာ မလိုပါ။',
      signalDesc: 'ဖလိုက်ဝှီး သွားစိတ်များ သံလိုက်ထိပ်ဝကို ဖြတ်သွားချိန်တွင် ဘီးထောက်ဒိုင်နမိုကဲ့သို့ ဆန်ဆာကိုယ်တိုင်က AC အေစီဗို့အား (1V ~ 15V AC) ကို ကိုယ်တိုင် ထုတ်လုပ်ပေးပြီး အချက်ပြကြိုးမှတစ်ဆင့် ECU သို့ လှိုင်းကြိမ်နှုန်း (Hz) အဖြစ် ပြန်ပို့သည်။',
      takeaway: '👉 ဆရာ့သင်ကြားချက်: ပြင်ပ ၅ ဗို့ မပါဝင်ဘဲ ဆန်ဆာကိုယ်တိုင် လျှပ်စစ်ထုတ်လုပ်၍ ECU သို့ အချက်ပြ ပြန်ပို့သည်။'
    };
  }

  // 3. Actuators (Injectors, Ignition Coil, Solenoids, Motors)
  if (typeLower.includes('solenoid') || typeLower.includes('motor') || typeLower.includes('injector') || typeLower.includes('coil') || typeLower.includes('pwm')) {
    return {
      title: '⚡ ထိန်းချုပ်မှုပစ္စည်း (ECU Power & Ground Pulse Control စနစ်)',
      powerDesc: '၁၂ ဗို့ (သို့မဟုတ် ဘူစတာ 80V) ဓာတ်အား အမြဲရောက်ရှိနေသည်။',
      signalDesc: 'ဆန်ဆာကဲ့သို့ ECU သို့ ဗို့အားပြန်ပို့ခြင်း မဟုတ်ဘဲ၊ ပြောင်းပြန်အားဖြင့် ECU အတွင်းရှိ Power Transistor (MOSFET/IGBT) က အနှုတ်မြေခ (Ground Pulse / PWM Duty %) ခတ်ပေးကာ ဆီဖြန်းခြင်း၊ မီးပွင့်စေခြင်းနှင့် ဘားဖွင့်ခြင်းများကို မောင်းနှင်ပေးသည်။',
      takeaway: '👉 ဆရာ့သင်ကြားချက်: ၎င်းသည် ဆန်ဆာ မဟုတ်ဘဲ ECU က ခလုတ်ဖွင့်/ပိတ် လှိုင်းခတ်၍ မောင်းနှင်ပေးရသော အလုပ်လုပ်သည့် ပစ္စည်း (Actuator) ဖြစ်သည်။'
    };
  }

  // 4. Standard 3-Wire / 5V Sensors (TPS, FRP, MAP, APPS, Hall CKP/CMP)
  return {
    title: '🔌 ၃ ကြိုး / ၅ ဗို့ ဆန်ဆာ (5V Ref, Signal 0.5V~4.5V, Ground စနစ်)',
    powerDesc: 'ECU မှ ပေးပို့သော 5.0V (VC/VCC) သည် ဆန်ဆာ အလုပ်လုပ်ရန် ပါဝါအဝင် သက်သက်သာဖြစ်ပြီး ဘာအချက်အလက်မှ ပြန်မပို့ပါ။',
    signalDesc: 'သီးသန့်ပါရှိသော Signal (ဆစ်ဂနယ်ကြိုး) ကမှ လီဗာနင်းအား သို့မဟုတ် ဆီဖိအားအလိုက် 0.5V (စလိုး/ဖိအားနည်း) မှ 4.5V (ဝန်ပြည့်/ဖိအားမြင့်) အကြား ဗို့အားကို အချိုးကျ ပြောင်းလဲကာ ECU ဆီသို့ အချက်ပြ ပြန်ပို့ပေးသည်။',
    takeaway: '👉 ဆရာ့သင်ကြားချက်: ၅ ဗို့ကြိုးက မုန့်ဖိုးပေးလိုက်သလို ပါဝါအဝင်ဖြစ်ပြီး၊ Signal ကြိုးကမှ ၀.၅ ဗို့ မှ ၄.၅ ဗို့ ကြား ဗို့အားဖြင့် ECU ဆီသို့ အချက်အလက် ပြန်သတင်းပို့သည်။'
  };
};

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
    { key: 'fuel_injectors', labelMy: 'ဆီဖြန်း & အင်ဂျက်တာ (Fuel/Injectors)', icon: '⛽' },
    { key: 'timing', labelMy: 'ကရိုင်း/မီးချိန် (Timing/Ignition)', icon: '⚙️' },
    { key: 'throttle_pedal', labelMy: 'လေတံခါး & လီဗာ (Throttle/Pedal)', icon: '⚡' },
    { key: 'turbo_vvt', labelMy: 'တာဘို & ဘားချိန် (Turbo/VVT)', icon: '🌀' },
    { key: 'air_fuel', labelMy: 'လေမီတာ/ဖိအား (Air/Boost)', icon: '💨' },
    { key: 'fluids_temp', labelMy: 'ရေ/ဆီ/အပူချိန် (Fluids/Temp)', icon: '🌡️' },
    { key: 'exhaust', labelMy: 'အောက်ဆီဂျင်/အိပ်ဇော (Exhaust/EGR)', icon: '🔥' },
    { key: 'transmission', labelMy: 'ဂီယာဘောက်စ် (Transmission)', icon: '🚗' },
    { key: 'chassis_safety', labelMy: 'ABS/ဘရိတ် (Safety)', icon: '🛑' },
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
              ၃။ ကားတစ်စီးလုံး ဆန်ဆာ & EFI/CRDi ထိန်းချုပ်မှု စနစ်များ မာစတာလမ်းညွှန်
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                Sensors & Actuators Master Directory
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

            {/* Modal Body: 5-Pillar Architecture */}
            <div className="mt-4 space-y-4 text-xs">
              
              {/* PILLAR 1: တည်ဆောက်ပုံ & ပလပ်ခေါင်း (Socket View) */}
              <div className="bg-stone-950 p-4 rounded-xl border border-cyan-500/30 shadow-sm">
                <span className="font-bold text-cyan-300 block mb-2 text-sm flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-cyan-400" /> ၁။ တည်ဆောက်ပုံ & ပလပ်ခေါင်း (Anatomy & Socket Pinout):
                </span>
                
                {/* Visual Socket Diagram if available */}
                {selectedSensor.socketViewDiagram && selectedSensor.socketViewDiagram.length > 0 && (
                  <div className="mb-3 p-3.5 bg-stone-900 rounded-xl border border-cyan-500/30">
                    <div className="text-[11px] font-bold text-cyan-200 mb-2.5 flex flex-wrap items-center justify-between gap-1.5 pb-2 border-b border-stone-800">
                      <span className="flex items-center gap-1.5">
                        <span className="text-base">🔌</span> ပလပ်ခေါင်း ပင်ပေါက် တည်ဆောက်ပုံ ({selectedSensor.socketPinsCount || selectedSensor.socketViewDiagram.length}-Pin Socket Layout)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
                        Front Plug View
                      </span>
                    </div>

                    {/* ORIENTATION RULE BANNER (ဆရာ Zaw Naing Win ၏ အကြံပြုချက်: အပေါ်/အောက် ဇောက်ထိုးမဖြစ်စေရန်) */}
                    <div className="mb-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-200 text-[11px]">
                      <div className="font-bold flex items-center gap-1.5 text-amber-300 mb-1">
                        <span>🔒</span> ပလပ်ခေါင်း ကိုင်တွယ်ကြည့်ရှုနည်း စည်းမျဉ်း (Orientation Rule):
                      </div>
                      <p className="leading-relaxed">
                        ပလပ်ခေါင်း၏ <strong className="text-amber-100 underline decoration-amber-400">သော့ကလစ်ငုတ် (Locking Clip / Release Tab) ကို အပေါ်ဘက် (TOP) တွင် ထားရှိပြီး</strong> မိမိဘက်သို့ မျက်နှာချင်းဆိုင် ကိုင်ကြည့်ပါက —
                      </p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2 font-mono text-[10px] text-stone-300 bg-stone-950/80 px-2 py-1 rounded border border-stone-800">
                        <span className="text-cyan-300 font-bold">👉 ဘယ်ဘက်စွန်း (Left): Pin 1</span>
                        <span>|</span>
                        <span className="text-amber-300 font-bold">အလယ် (Center): Pin 2</span>
                        {selectedSensor.socketViewDiagram.length > 2 && (
                          <>
                            <span>|</span>
                            <span className="text-emerald-300 font-bold">ညာဘက်စွန်း (Right): Pin {selectedSensor.socketViewDiagram.length}</span>
                          </>
                        )}
                        <span className="text-rose-400 font-bold ml-auto">⚠️ ဇောက်ထိုး ပြောင်းပြန်မကြည့်ရ</span>
                      </div>
                    </div>

                    {/* PHYSICAL CONNECTOR GRAPHIC WITH TOP LOCKING TAB */}
                    <div className="mb-3.5 flex flex-col items-center">
                      {/* Top Locking Tab */}
                      <div className="w-16 h-3 bg-cyan-600/80 rounded-t-md border-t-2 border-x-2 border-cyan-300 flex items-center justify-center text-[8px] font-black text-stone-950 uppercase tracking-tighter">
                        LOCK CLIP (အပေါ်)
                      </div>
                      {/* Connector Shell Body */}
                      <div className="w-full max-w-md bg-stone-950 p-2.5 rounded-xl border-2 border-cyan-500/60 shadow-inner flex items-center justify-around gap-1.5">
                        {selectedSensor.socketViewDiagram.map((pin, i) => (
                          <div
                            key={pin.pinNumber}
                            className="flex-1 bg-stone-900 border border-cyan-500/40 rounded-lg p-2 text-center flex flex-col items-center justify-center shadow-sm"
                          >
                            <span className="w-5 h-5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-black text-xs flex items-center justify-center mb-1 border border-cyan-500/30">
                              {pin.pinNumber}
                            </span>
                            <span className="text-[10px] font-bold text-stone-100 truncate w-full block">
                              {pin.label}
                            </span>
                            <span className="text-[9px] text-amber-300 font-mono font-bold block mt-0.5">
                              {i === 0 ? '(ဘယ်စွန်း)' : i === selectedSensor.socketViewDiagram!.length - 1 ? '(ညာစွန်း)' : '(အလယ်)'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Detailed Pin Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedSensor.socketViewDiagram.map((pin, i) => (
                        <div key={pin.pinNumber} className="bg-stone-950/90 p-2.5 rounded-lg border border-stone-800 flex items-start gap-2.5">
                          <div className="w-7 h-7 rounded-md bg-cyan-500/20 text-cyan-300 font-mono font-black text-xs flex items-center justify-center shrink-0 border border-cyan-500/40">
                            {pin.pinNumber}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-bold text-stone-100 text-xs">
                                {pin.label} <span className="text-[10px] text-stone-400 font-normal">({i === 0 ? 'ဘယ်စွန်းငုတ်' : i === selectedSensor.socketViewDiagram!.length - 1 ? 'ညာစွန်းငုတ်' : 'အလယ်ငုတ်'})</span>
                              </span>
                              <span className="font-mono text-[10px] text-amber-300 font-bold">{pin.voltage}</span>
                            </div>
                            <div className="text-[10px] text-stone-400 font-mono mt-0.5">{pin.wireColor}</div>
                            <div className="text-[10px] text-cyan-300 mt-0.5 leading-snug">{pin.descriptionMy}</div>
                            <div className="text-[9px] text-stone-400 mt-0.5 font-mono">➔ ချိတ်ဆက်ရာ: {pin.destination}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-stone-300 leading-relaxed bg-stone-900/50 p-2.5 rounded-lg border border-stone-850">
                  {selectedSensor.internalStructure}
                </p>
              </div>

              {/* PILLAR 2: အလုပ်လုပ်ပုံ (System Operation) */}
              <div className="bg-stone-950 p-4 rounded-xl border border-amber-500/30 shadow-sm">
                <span className="font-bold text-amber-300 block mb-1.5 text-sm flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-amber-400" /> ၂။ အလုပ်လုပ်ပုံ နိယာမ (System Operation & Role):
                </span>
                {selectedSensor.systemRoleMy && (
                  <div className="mb-2 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-200 text-[11px] font-bold">
                    🎯 အဓိက တာဝန်: {selectedSensor.systemRoleMy}
                  </div>
                )}
                <p className="text-stone-300 leading-relaxed">
                  {selectedSensor.workingPrinciple}
                </p>
              </div>

              {/* PILLAR 3: ဝါယာဝင်ပုံ (Wiring Diagram & ECU Pinout) */}
              <div className="bg-stone-950 p-4 rounded-xl border border-emerald-500/30 shadow-sm">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-emerald-400" /> ၃။ ဝါယာဝင်ပုံ & ECU Pinout (Wiring Connections):
                  </span>
                  {selectedSensor.wireColorGuide && (
                    <span className="text-[10px] text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                      {selectedSensor.wireColorGuide}
                    </span>
                  )}
                </div>
                <div className="space-y-1.5">
                  {selectedSensor.pinoutSummary.map((p, idx) => (
                    <div key={idx} className="bg-stone-900 p-2.5 rounded-lg border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-emerald-400 text-xs px-2 py-0.5 rounded bg-stone-950 border border-emerald-500/30">
                          {p.pin}
                        </span>
                        <span className="font-bold text-stone-200">{p.signalType}</span>
                        {p.ecuTerminal && (
                          <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            ECU: {p.ecuTerminal}
                          </span>
                        )}
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="font-mono text-cyan-300 text-[11px] block">{p.standardValue}</span>
                        <span className="text-[10px] text-stone-400">{p.description}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ECU သို့ အချက်အလက် ပြန်ပို့ပုံ သဘောတရား (ဆရာ Zaw Naing Win ၏ မေးခွန်း: ၅ ဗို့ကြိုးက ပြန်ပို့တာလား?) */}
                {(() => {
                  const ecuSignal = getEcuSignalExplanation(selectedSensor);
                  return (
                    <div className="mt-3 p-3 bg-stone-900/90 rounded-xl border border-emerald-500/40">
                      <div className="text-[11px] font-bold text-emerald-300 mb-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <span>💡</span> {ecuSignal.title}
                        </span>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                          ECU Signal Logic
                        </span>
                      </div>
                      
                      <div className="space-y-1.5 text-[11px]">
                        <div className="bg-stone-950/80 p-2 rounded-lg border border-stone-800">
                          <span className="font-bold text-cyan-300 block text-[10px] mb-0.5">⚡ ပါဝါဓာတ်အားအဝင် (Power Feed):</span>
                          <p className="text-stone-300 leading-snug">{ecuSignal.powerDesc}</p>
                        </div>
                        <div className="bg-stone-950/80 p-2 rounded-lg border border-stone-800">
                          <span className="font-bold text-amber-300 block text-[10px] mb-0.5">📡 ECU သို့ ပြန်ပို့သည့်ပုံစံ (Signal Return):</span>
                          <p className="text-stone-200 leading-snug">{ecuSignal.signalDesc}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 font-bold text-[10px] leading-snug">
                          {ecuSignal.takeaway}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* PILLAR 4: စမ်းသပ်တိုင်းတာပုံ & Live Data စံနှုန်းများ */}
              <div className="bg-stone-950 p-4 rounded-xl border border-purple-500/30 shadow-sm">
                <span className="font-bold text-purple-300 block mb-2 text-sm flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-purple-400" /> ၄။ စမ်းသပ်တိုင်းတာပုံ & Scanner Live Data စံသတ်မှတ်ချက်များ:
                </span>
                
                {/* Live Data Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                  {selectedSensor.specifications.resistance && (
                    <div className="bg-stone-900/90 p-2 rounded-lg border border-stone-800">
                      <span className="text-[10px] text-stone-400 block">အုမ်းတန်ဖိုး (Resistance Ω):</span>
                      <span className="font-mono text-xs font-bold text-amber-300">{selectedSensor.specifications.resistance}</span>
                    </div>
                  )}
                  {selectedSensor.specifications.operatingVoltage && (
                    <div className="bg-stone-900/90 p-2 rounded-lg border border-stone-800">
                      <span className="text-[10px] text-stone-400 block">အလုပ်လုပ်ဗို့အား (Operating V):</span>
                      <span className="font-mono text-xs font-bold text-emerald-300">{selectedSensor.specifications.operatingVoltage}</span>
                    </div>
                  )}
                  {selectedSensor.specifications.pressureRange && (
                    <div className="bg-stone-900/90 p-2 rounded-lg border border-stone-800">
                      <span className="text-[10px] text-stone-400 block">ဖိအားစံချိန် (Pressure bar/psi):</span>
                      <span className="font-mono text-xs font-bold text-rose-300">{selectedSensor.specifications.pressureRange}</span>
                    </div>
                  )}
                  {selectedSensor.specifications.liveDataIdle && (
                    <div className="bg-stone-900/90 p-2 rounded-lg border border-stone-800">
                      <span className="text-[10px] text-stone-400 block">စလိုးလည်ချိန် (Idle 750 RPM):</span>
                      <span className="font-mono text-xs font-bold text-cyan-300">{selectedSensor.specifications.liveDataIdle}</span>
                    </div>
                  )}
                  {selectedSensor.specifications.liveDataLoad && (
                    <div className="bg-stone-900/90 p-2 rounded-lg border border-stone-800">
                      <span className="text-[10px] text-stone-400 block">ဝန်ပြည့်ချိန် (Full Load / WOT):</span>
                      <span className="font-mono text-xs font-bold text-purple-300">{selectedSensor.specifications.liveDataLoad}</span>
                    </div>
                  )}
                  {selectedSensor.specifications.waveformType && (
                    <div className="bg-stone-900/90 p-2 rounded-lg border border-stone-800">
                      <span className="text-[10px] text-stone-400 block">အချက်ပြလှိုင်းပုံစံ (Waveform):</span>
                      <span className="font-mono text-[10px] font-bold text-teal-300">{selectedSensor.specifications.waveformType}</span>
                    </div>
                  )}
                </div>

                {/* RPM အလိုက် Signal ဗို့အား စံနှုန်းများနှင့် ချို့ယွင်းချက် သုံးသပ်ခြင်း (ဆရာ Zaw Naing Win အကြံပြုချက်) */}
                <div className="mb-3.5 p-3.5 bg-stone-900 rounded-xl border border-purple-500/30">
                  <div className="font-bold text-xs text-purple-200 mb-2.5 flex flex-wrap items-center justify-between gap-1.5 pb-2 border-b border-stone-800">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-purple-400" />
                      အင်ဂျင်လည်နှုန်း (RPM) အလိုက် Signal ဗို့အား စံနှုန်းများနှင့် ချို့ယွင်းချက် ခွဲခြမ်းစိတ်ဖြာချက်
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-mono">
                      Live Voltage Matrix
                    </span>
                  </div>

                  {/* 3-Stage RPM Voltage Benchmark */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                    {/* 1. စလိုး (Idle ~750 RPM) */}
                    <div className="bg-stone-950 p-2.5 rounded-lg border border-cyan-500/30">
                      <div className="flex items-center justify-between text-[11px] font-bold text-cyan-300 mb-1">
                        <span>🟢 စလိုး (Idle)</span>
                        <span className="font-mono text-[10px] text-stone-400">~750 RPM</span>
                      </div>
                      <div className="font-mono font-bold text-xs text-cyan-200 leading-snug">
                        {selectedSensor.specifications.liveDataIdle || '0.5V ~ 1.2V DC (သို့မဟုတ် စလိုးစံနှုန်း)'}
                      </div>
                      <div className="text-[10px] text-stone-400 mt-1 leading-tight">
                        စက်နိုးပြီး အနှေးလည်နေချိန် ရှိရမည့် ဗို့အား/ဖိအား စံနှုန်း
                      </div>
                    </div>

                    {/* 2. နော်မယ် ပုံမှန်ပြေးနှုန်း (Normal Cruise ~2,000 RPM) */}
                    <div className="bg-stone-950 p-2.5 rounded-lg border border-amber-500/30">
                      <div className="flex items-center justify-between text-[11px] font-bold text-amber-300 mb-1">
                        <span>🟡 နော်မယ် (Normal Cruise)</span>
                        <span className="font-mono text-[10px] text-stone-400">~2,000 RPM</span>
                      </div>
                      <div className="font-mono font-bold text-xs text-amber-200 leading-snug">
                        {selectedSensor.specifications.liveDataCruise || '1.8V ~ 2.8V DC (သို့မဟုတ် ပုံမှန်မောင်းစံနှုန်း)'}
                      </div>
                      <div className="text-[10px] text-stone-400 mt-1 leading-tight">
                        ပုံမှန် အဝေးပြေး မောင်းနှင်နေချိန် ထွက်ပေါ်မည့် တန်ဖိုး
                      </div>
                    </div>

                    {/* 3. ဟိုက်စပိ/ဝန်ပြည့် (High Speed / WOT 3,500+ RPM) */}
                    <div className="bg-stone-950 p-2.5 rounded-lg border border-rose-500/30">
                      <div className="flex items-center justify-between text-[11px] font-bold text-rose-300 mb-1">
                        <span>🔴 ဟိုက်စပိ (High Speed/WOT)</span>
                        <span className="font-mono text-[10px] text-stone-400">3,500+ RPM</span>
                      </div>
                      <div className="font-mono font-bold text-xs text-rose-200 leading-snug">
                        {selectedSensor.specifications.liveDataLoad || '3.5V ~ 4.5V DC (သို့မဟုတ် ဝန်ပြည့်စံနှုန်း)'}
                      </div>
                      <div className="text-[10px] text-stone-400 mt-1 leading-tight">
                        လီဗာအပြည့်နင်းချိန် / အဆွဲအရုန်း အမြင့်ဆုံးတန်ဖိုး
                      </div>
                    </div>
                  </div>

                  {/* Over / Under Voltage Fault Diagnostic Guide */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-800">
                    <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      ဗို့အား လို/ပို ချို့ယွင်းချက် သုံးသပ်ခြင်း (Voltage Diagnostic Analysis):
                    </div>
                    
                    {/* Too Low */}
                    <div className="bg-stone-950/80 p-2.5 rounded-lg border border-rose-500/30 text-[11px] flex flex-col sm:flex-row items-start gap-2">
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold shrink-0 text-[10px]">
                        🔻 ဗို့အား သတ်မှတ်ထက် နည်းနေပါက (Too Low / Under Range)
                      </span>
                      <span className="text-stone-300 leading-relaxed">
                        {selectedSensor.specifications.overUnderDiagnostic?.tooLowMeaning ||
                          'ဆန်ဆာသို့ 5V/12V မီးမရောက်ခြင်း၊ ဝါယာကြိုး ကြားခံခုခံအား တက်နေခြင်း (High Resistance)၊ အာရုံခံမျက်နှာပြင် ဖုန်/ဂျီးပိတ်ခြင်း သို့မဟုတ် Air-gap ကွာလွန်းခြင်းကြောင့် ဖြစ်သည်။'}
                      </span>
                    </div>

                    {/* Too High */}
                    <div className="bg-stone-950/80 p-2.5 rounded-lg border border-amber-500/30 text-[11px] flex flex-col sm:flex-row items-start gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold shrink-0 text-[10px]">
                        🔺 ဗို့အား သတ်မှတ်ထက် ပိုများနေပါက (Too High / Over Range)
                      </span>
                      <span className="text-stone-300 leading-relaxed">
                        {selectedSensor.specifications.overUnderDiagnostic?.tooHighMeaning ||
                          'Signal လိုင်းသည် 12V/5V Power ကြိုးနှင့် ကပ်ကျွံရှော့ဖြစ်နေခြင်း (Short to Voltage)၊ အတွင်းပိုင်း ဆန်ဆာပြား ဂျမ်းဖြစ်ခြင်း သို့မဟုတ် ဂရောင်းကြိုးပြတ်နေခြင်း (Open Ground) ကြောင့် ဖြစ်သည်။'}
                      </span>
                    </div>

                    {/* Flatline */}
                    <div className="bg-stone-950/80 p-2.5 rounded-lg border border-stone-800 text-[11px] flex flex-col sm:flex-row items-start gap-2">
                      <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-bold shrink-0 text-[10px]">
                        🛑 လုံးဝမတက်/မလှုပ်ပါက (Flatline / Frozen)
                      </span>
                      <span className="text-stone-400 leading-relaxed">
                        {selectedSensor.specifications.overUnderDiagnostic?.flatlineMeaning ||
                          'ဆန်ဆာ အူတိုင်သေဆုံးနေခြင်း သို့မဟုတ် ECU မှ Signal မဖတ်နိုင်ဘဲ လိုင်းပြတ်တောက်နေခြင်း ဖြစ်သည်။'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step-by-Step Procedure */}
                <div className="space-y-2 mt-2">
                  <div className="text-[11px] font-bold text-stone-300 mb-1 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> မီတာဖြင့် အဆင့်ဆင့် တိုင်းတာနည်းများ:
                  </div>
                  {selectedSensor.testingSteps.map((step) => (
                    <div key={step.step} className="bg-stone-900/80 p-2.5 rounded-lg border border-stone-800">
                      <div className="font-bold text-stone-200 text-xs flex items-center gap-1.5 mb-1">
                        <span className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px] font-bold">
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

              {/* PILLAR 5: သင်တန်းသား/အခြားသူများကို ရှင်းပြရန် အတွင်းပိုင်း ရူပဗေဒ/အီလက်ထရောနစ် သဘောတရား */}
              {selectedSensor.teachingMasterclass && (
                <div className="bg-gradient-to-br from-amber-950/40 via-stone-950 to-stone-950 p-4 rounded-xl border-2 border-amber-500/60 shadow-xl shadow-amber-500/10">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-amber-500/30 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                        ၅။ သင်တန်းသား/အခြားသူများကို ရှင်းပြရန် ဆရာစား လျှို့ဝှက်ချက်
                      </h4>
                      <p className="text-[10px] text-amber-200/80">
                        အတွင်းပိုင်း ဘာဝင်လို့၊ ဘာကွေးညွတ်လို့၊ အပူကြောင့်၊ ထရန်စစ်စတာ အချိတ်အဆက် ပြုလုပ်ပုံ (Masterclass Guide)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {/* Trigger Mechanism */}
                    <div className="bg-stone-900/90 p-3 rounded-lg border border-amber-500/25">
                      <span className="font-bold text-amber-300 text-xs block mb-1 flex items-center gap-1.5">
                        ⚡ ဘာဖြစ်ပေါ်လို့ Signal ထွက်လာသလဲ (Trigger Mechanism):
                      </span>
                      <p className="text-stone-200 text-xs leading-relaxed">
                        {selectedSensor.teachingMasterclass.triggerMechanism}
                      </p>
                    </div>

                    {/* Physics Principle */}
                    <div className="bg-stone-900/90 p-3 rounded-lg border border-amber-500/25">
                      <span className="font-bold text-cyan-300 text-xs block mb-1 flex items-center gap-1.5">
                        🔬 ရူပဗေဒ သိပ္ပံ သဘောတရား (Physics Principle):
                      </span>
                      <p className="text-stone-200 text-xs leading-relaxed">
                        {selectedSensor.teachingMasterclass.physicsPrinciple}
                      </p>
                    </div>

                    {/* Electronics Control */}
                    <div className="bg-stone-900/90 p-3 rounded-lg border border-amber-500/25">
                      <span className="font-bold text-emerald-300 text-xs block mb-1 flex items-center gap-1.5">
                        🔌 ထရန်စစ်စတာ/MOSFET အချိတ်အဆက် ပြုလုပ်ပုံ (Electronics Control):
                      </span>
                      <p className="text-stone-200 text-xs leading-relaxed">
                        {selectedSensor.teachingMasterclass.electronicsControl}
                      </p>
                    </div>

                    {/* Analogy for Students */}
                    <div className="bg-amber-500/15 p-3 rounded-lg border border-amber-500/40">
                      <span className="font-bold text-amber-200 text-xs block mb-1 flex items-center gap-1.5">
                        🗣️ တပည့်များ ချက်ချင်း သဘောပေါက်စေမည့် မြင်သာသော ဥပမာ (Teaching Analogy):
                      </span>
                      <p className="text-amber-100 text-xs italic leading-relaxed">
                        &quot;{selectedSensor.teachingMasterclass.analogyForStudents}&quot;
                      </p>
                    </div>
                  </div>
                </div>
              )}

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
