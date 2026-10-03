import React, { useState } from 'react';
import { Battery, Zap, Shield, HelpCircle, Activity, CheckCircle2, AlertTriangle, ArrowRight, Gauge, Layers } from 'lucide-react';
import { RELAY_STANDARDS } from '../data/pinoutsData';
import { playChime } from '../utils/audio';

interface PowerGroundSectionProps {
  soundEnabled: boolean;
}

export const PowerGroundSection: React.FC<PowerGroundSectionProps> = ({ soundEnabled }) => {
  const [selectedRelayPin, setSelectedRelayPin] = useState<string>('30');
  const [activeTab, setActiveTab] = useState<'flow' | 'relay' | 'voltage_drop' | 'ground_types'>('flow');

  const selectedRelay = RELAY_STANDARDS.find((p) => p.pinNumber === selectedRelayPin) || RELAY_STANDARDS[0];

  const handleSelectPin = (pin: string) => {
    if (soundEnabled) playChime(600, 0.15);
    setSelectedRelayPin(pin);
  };

  return (
    <div className="bg-stone-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Header Accent */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-amber-500/20 shrink-0">
            <Zap className="w-5 h-5 text-stone-950 fill-stone-950" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-amber-300 flex items-center gap-2">
              ၁။ ကားတစ်စီးလုံး ပါဝါ & ဂရောင်း ဖြန့်ဝေမှုစနစ်
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300">
                Power & Ground Architecture
              </span>
            </h2>
            <p className="text-xs text-stone-400">
              ဘက်ထရီ ➔ ပင်မဖျူးစ် ➔ ရီလေး (30/87/85/86) ➔ ECU (+B/BATT) ➔ ဆန်ဆာ (5V/Ground) လိုင်းများ
            </p>
          </div>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex flex-wrap gap-1.5 bg-stone-950 p-1 rounded-xl border border-stone-800">
          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.1);
              setActiveTab('flow');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'flow'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            ⚡ ပင်မစီးဆင်းပုံ
          </button>
          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.1);
              setActiveTab('relay');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'relay'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            🔌 ရီလေး Pinout (30/87/85/86)
          </button>
          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.1);
              setActiveTab('voltage_drop');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'voltage_drop'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            📉 ဗို့ကျဆင်းမှု စစ်ဆေးနည်း
          </button>
          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.1);
              setActiveTab('ground_types');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'ground_types'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            ⏚ အာသီး/ဂရောင်း ၃ မျိုး
          </button>
        </div>
      </div>

      {/* TAB 1: Complete Power & Ground Flow Diagram */}
      {activeTab === 'flow' && (
        <div className="mt-4 space-y-4">
          <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 sm:p-5">
            <h3 className="text-sm font-bold text-amber-300 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              လျှပ်စစ်စီးဆင်းမှု အဆင့် ၅ ဆင့် (အစမှ အဆုံး လမ်းကြောင်းပြမြေပုံ)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {/* Step 1 */}
              <div className="bg-stone-900/90 border border-amber-500/20 rounded-xl p-3 relative flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 w-fit mb-2">
                    အဆင့် ၁ : ဘက်ထရီ
                  </div>
                  <div className="font-bold text-sm text-stone-100 flex items-center gap-1.5">
                    <Battery className="w-4 h-4 text-amber-400" />
                    +12.6V Battery
                  </div>
                  <p className="text-xs text-stone-400 mt-1">
                    ဘက်ထရီ အပေါင်းတိုင်မှ 100A Main Fusible Link သို့ တိုက်ရိုက် ထွက်ရှိသည်။
                  </p>
                </div>
                <div className="text-[11px] font-mono text-emerald-400 mt-2 pt-2 border-t border-stone-800">
                  စံချိန်: 12.6V DC
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-stone-900/90 border border-amber-500/20 rounded-xl p-3 relative flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 w-fit mb-2">
                    အဆင့် ၂ : ဖျူးစ်များ
                  </div>
                  <div className="font-bold text-sm text-stone-100 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-cyan-400" />
                    BATT & EFI Fuse
                  </div>
                  <p className="text-xs text-stone-400 mt-1">
                    BATT Fuse (15A) မှ ECU မှတ်ဉာဏ်သို့ သွားပြီး၊ EFI Fuse (20A) မှ ရီလေးသို့ သွားသည်။
                  </p>
                </div>
                <div className="text-[11px] font-mono text-cyan-300 mt-2 pt-2 border-t border-stone-800">
                  စံချိန်: 12V အမြဲစောင့်
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-stone-900/90 border border-amber-500/20 rounded-xl p-3 relative flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 w-fit mb-2">
                    အဆင့် ၃ : EFI ရီလေး
                  </div>
                  <div className="font-bold text-sm text-stone-100 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Relay (30 ➔ 87)
                  </div>
                  <p className="text-xs text-stone-400 mt-1">
                    သော့ဖွင့်ချိန် ကွိုင်ဆွဲပြီး ပင် ၃၀ မှ ပင် ၈၇ သို့ +12V ပါဝါ ကူးဆက်ပေးသည်။
                  </p>
                </div>
                <div className="text-[11px] font-mono text-amber-300 mt-2 pt-2 border-t border-stone-800">
                  စံချိန်: သော့ဖွင့်မှ 12V ထွက်
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-stone-900/90 border border-amber-500/20 rounded-xl p-3 relative flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 w-fit mb-2">
                    အဆင့် ၄ : ECU ကွန်ပျူတာ
                  </div>
                  <div className="font-bold text-sm text-stone-100 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-purple-400" />
                    +B ➔ 5V Regulator
                  </div>
                  <p className="text-xs text-stone-400 mt-1">
                    ECU က +B မှ 12V ဖြင့် နိုးထပြီး ဆန်ဆာများအတွက် တည်ငြိမ် +5.0V VC ထုတ်ပေးသည်။
                  </p>
                </div>
                <div className="text-[11px] font-mono text-purple-300 mt-2 pt-2 border-t border-stone-800">
                  စံချိန်: VC = 5.0V (±0.05V)
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-stone-900/90 border border-amber-500/20 rounded-xl p-3 relative flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 w-fit mb-2">
                    အဆင့် ၅ : ဆန်ဆာများ
                  </div>
                  <div className="font-bold text-sm text-stone-100 flex items-center gap-1.5">
                    <Gauge className="w-4 h-4 text-emerald-400" />
                    Sensors (5V & E2)
                  </div>
                  <p className="text-xs text-stone-400 mt-1">
                    ဆန်ဆာများက 5V သုံးပြီး 0.5V~4.5V အချက်ပြ ထုတ်ကာ E2 သန့်စင်ဂရောင်းဖြင့် ပြန်ဆင်းသည်။
                  </p>
                </div>
                <div className="text-[11px] font-mono text-emerald-400 mt-2 pt-2 border-t border-stone-800">
                  စံချိန်: E2 Ground = 0.00V
                </div>
              </div>
            </div>
          </div>

          {/* Quick Critical Rules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="font-bold text-amber-300 flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                အပေါင်းလိုင်း စစ်ဆေးချက် ရွှေစည်းကမ်း (+ Lines)
              </div>
              <p className="text-stone-300">
                ဆန်ဆာတစ်ခုခုတွင် 5V Reference ပျောက်နေပါက ဆန်ဆာအားလုံး၏ ပလပ်များကို တစ်ခုချင်းစီ ဆွဲဖြုတ်ကြည့်ပါ။ ဆန်ဆာတစ်ခုခု အတွင်းပိုင်း ရှော့ကျနေပါက ECU ၏ 5V တစ်လိုင်းလုံး ပြုတ်ကျသွားတတ်သည်။
              </p>
            </div>

            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
              <div className="font-bold text-cyan-300 flex items-center gap-1.5 mb-1">
                <AlertTriangle className="w-4 h-4 text-cyan-400" />
                အနှုတ်ဂရောင်း စစ်ဆေးချက် ရွှေစည်းကမ်း (- Lines)
              </div>
              <p className="text-stone-300">
                ဆန်ဆာများ၏ အနှုတ် (E2 / SGND) သည် ကားဘော်ဒီနှင့် တိုက်ရိုက် မထိရပါ။ ECU အတွင်းမှ သန့်စင်ပြီးမှ ထွက်လာသော အနှုတ် ဖြစ်သည်။ ဘော်ဒီနှင့် တိုက်ရိုက် ပေးလိုက်ပါက ဆန်ဆာဗို့အားများ လှိုင်းထပြီး စက်မငြိမ် ဖြစ်တတ်သည်။
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ISO/DIN Relay Standards (30, 87, 85, 86, 87a) */}
      {activeTab === 'relay' && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Interactive Visual Relay Pinout */}
            <div className="lg:col-span-5 bg-stone-950 border border-stone-800 rounded-xl p-4 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-stone-400 mb-3 uppercase tracking-wider">
                Relay Socket View (အောက်ခြေ ပင်ပေါက် မြင်ကွင်း)
              </span>

              {/* Graphical Relay Socket Layout */}
              <div className="w-56 h-56 rounded-2xl bg-stone-900 border-2 border-amber-500/40 p-4 relative flex flex-col justify-between shadow-inner">
                {/* Pin 30 (Top/Bottom) */}
                <div className="flex justify-center">
                  <button
                    onClick={() => handleSelectPin('30')}
                    className={`w-14 h-8 rounded-md font-mono font-black text-xs flex items-center justify-center border-2 transition-all cursor-pointer ${
                      selectedRelayPin === '30'
                        ? 'bg-amber-500 text-stone-950 border-amber-300 scale-110 shadow-lg shadow-amber-500/50'
                        : 'bg-stone-800 text-amber-300 border-amber-500/40 hover:bg-stone-750'
                    }`}
                  >
                    30
                  </button>
                </div>

                {/* Middle Row: Pin 86 (Left) - Pin 87a (Center) - Pin 85 (Right) */}
                <div className="flex items-center justify-between px-2">
                  <button
                    onClick={() => handleSelectPin('86')}
                    className={`w-8 h-12 rounded-md font-mono font-black text-xs flex items-center justify-center border-2 transition-all cursor-pointer ${
                      selectedRelayPin === '86'
                        ? 'bg-cyan-500 text-stone-950 border-cyan-300 scale-110 shadow-lg shadow-cyan-500/50'
                        : 'bg-stone-800 text-cyan-300 border-cyan-500/40 hover:bg-stone-750'
                    }`}
                  >
                    86
                  </button>

                  <button
                    onClick={() => handleSelectPin('87a')}
                    className={`w-10 h-10 rounded-md font-mono font-black text-xs flex items-center justify-center border-2 transition-all cursor-pointer ${
                      selectedRelayPin === '87a'
                        ? 'bg-purple-500 text-stone-950 border-purple-300 scale-110 shadow-lg shadow-purple-500/50'
                        : 'bg-stone-850 text-purple-300 border-purple-500/40 hover:bg-stone-750'
                    }`}
                    title="5-Pin only (Normally Closed)"
                  >
                    87a
                  </button>

                  <button
                    onClick={() => handleSelectPin('85')}
                    className={`w-8 h-12 rounded-md font-mono font-black text-xs flex items-center justify-center border-2 transition-all cursor-pointer ${
                      selectedRelayPin === '85'
                        ? 'bg-rose-500 text-stone-950 border-rose-300 scale-110 shadow-lg shadow-rose-500/50'
                        : 'bg-stone-800 text-rose-300 border-rose-500/40 hover:bg-stone-750'
                    }`}
                  >
                    85
                  </button>
                </div>

                {/* Pin 87 (Bottom) */}
                <div className="flex justify-center">
                  <button
                    onClick={() => handleSelectPin('87')}
                    className={`w-14 h-8 rounded-md font-mono font-black text-xs flex items-center justify-center border-2 transition-all cursor-pointer ${
                      selectedRelayPin === '87'
                        ? 'bg-emerald-500 text-stone-950 border-emerald-300 scale-110 shadow-lg shadow-emerald-500/50'
                        : 'bg-stone-800 text-emerald-300 border-emerald-500/40 hover:bg-stone-750'
                    }`}
                  >
                    87
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-stone-400 mt-3 text-center">
                👉 စစ်ဆေးလိုသော Pin နံပါတ်ကို နှိပ်ပြီး ညာဘက်တွင် အသေးစိတ် ကြည့်ပါ
              </p>
            </div>

            {/* Selected Pin Details */}
            <div className="lg:col-span-7 bg-stone-950 border border-stone-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <span className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500 text-amber-300 font-mono font-black text-lg flex items-center justify-center">
                      {selectedRelay.pinNumber}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-stone-100">
                        {selectedRelay.burmeseName}
                      </h4>
                      <p className="text-xs font-mono text-stone-400">
                        {selectedRelay.standardName}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-stone-800 text-amber-300 border border-stone-700">
                    {selectedRelay.normalStatus}
                  </span>
                </div>

                <div className="mt-4 space-y-3 text-xs">
                  <div>
                    <span className="text-stone-400 font-bold block mb-0.5">လုပ်ဆောင်ချက် (Function):</span>
                    <p className="text-stone-200 bg-stone-900/80 p-2.5 rounded-lg border border-stone-800">
                      {selectedRelay.function}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="bg-stone-900/80 p-2.5 rounded-lg border border-stone-800">
                      <span className="text-stone-400 font-bold block mb-0.5">အဝင်လမ်းကြောင်း (From):</span>
                      <span className="text-amber-300 font-mono text-[11px]">{selectedRelay.connectionFrom}</span>
                    </div>
                    <div className="bg-stone-900/80 p-2.5 rounded-lg border border-stone-800">
                      <span className="text-stone-400 font-bold block mb-0.5">အထွက်လမ်းကြောင်း (To):</span>
                      <span className="text-emerald-300 font-mono text-[11px]">{selectedRelay.connectionTo}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-stone-400 font-bold block mb-0.5 flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-cyan-400" /> မီတာဖြင့် တိုင်းတာစစ်ဆေးနည်း:
                    </span>
                    <p className="text-cyan-200 bg-cyan-950/20 p-2.5 rounded-lg border border-cyan-500/30 font-sans">
                      {selectedRelay.testMethod}
                    </p>
                  </div>
                </div>
              </div>

              {/* Relay Quick Jump Chips */}
              <div className="flex gap-2 pt-4 mt-3 border-t border-stone-800">
                {RELAY_STANDARDS.map((p) => (
                  <button
                    key={p.pinNumber}
                    onClick={() => handleSelectPin(p.pinNumber)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                      selectedRelayPin === p.pinNumber
                        ? 'bg-amber-500 text-stone-950 font-black'
                        : 'bg-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    Pin {p.pinNumber}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Voltage Drop Testing Guide */}
      {activeTab === 'voltage_drop' && (
        <div className="mt-4 space-y-4">
          <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 sm:p-5">
            <h3 className="text-sm font-bold text-amber-300 mb-2 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-amber-400" />
              ဗို့အားကျဆင်းမှု စစ်ဆေးခြင်း (Voltage Drop Test - ဝါယာသမား၏ လျှို့ဝှက်လက်နက်)
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed mb-4">
              ဝါယာကြိုး အတွင်းပိုင်း ကျိုးပြတ်လုဆဲဆဲ ဖြစ်နေခြင်း၊ ငြိမ်းချေးကပ်နေခြင်း (Corrosion) သို့မဟုတ် ဂရောင်းနပ် မကြပ်ခြင်းတို့သည် သာမန်အချိန်တွင် 12V ပြနေသော်လည်း စက်နှိုးချိန် သို့မဟုတ် ဝန်ဆွဲချိန်တွင် ဗို့အား ထိုးကျသွားတတ်သည်။ ၎င်းကို ရှာဖွေနိုင်သော တစ်ခုတည်းသော နည်းလမ်းမှာ <strong>Voltage Drop Test</strong> ဖြစ်သည်။
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-stone-900 border border-stone-800 p-3.5 rounded-xl">
                <span className="font-bold text-amber-300 block mb-1">၁။ စတက်တာ မော်တာ အပေါင်းလိုင်း</span>
                <p className="text-stone-300 mb-2">
                  မီတာ အနီကို ဘက်ထရီ အပေါင်းတိုင် (+) ထောက်၊ မီတာ အနက်ကို စတက်တာ Terminal 30 နပ်ခေါင်းတွင် ထောက်ပြီး စက်နှိုးကြည့်ပါ။
                </p>
                <div className="p-2 rounded bg-stone-950 border border-amber-500/20 text-emerald-400 font-mono text-[11px]">
                  ခွင့်ပြုစံချိန်: &lt; 0.5V Drop (0.5V ထက် မကျော်ရပါ)
                </div>
              </div>

              <div className="bg-stone-900 border border-stone-800 p-3.5 rounded-xl">
                <span className="font-bold text-cyan-300 block mb-1">၂။ အင်ဂျင်ဘလောက် ဂရောင်းလိုင်း</span>
                <p className="text-stone-300 mb-2">
                  မီတာ အနက်ကို ဘက်ထရီ အနှုတ်တိုင် (-) ထောက်၊ မီတာ အနီကို အင်ဂျင်ဘလောက်တုံး သတ္တုပေါ်တွင် ထောက်ပြီး စက်နှိုးကြည့်ပါ။
                </p>
                <div className="p-2 rounded bg-stone-950 border border-cyan-500/20 text-emerald-400 font-mono text-[11px]">
                  ခွင့်ပြုစံချိန်: &lt; 0.2V Drop (0.2V ထက် မကျော်ရပါ)
                </div>
              </div>

              <div className="bg-stone-900 border border-stone-800 p-3.5 rounded-xl">
                <span className="font-bold text-purple-300 block mb-1">၃။ ဆန်ဆာ ဂရောင်းလိုင်း (E2)</span>
                <p className="text-stone-300 mb-2">
                  မီတာ အနက်ကို ဘက်ထရီ အနှုတ် (-) ထောက်၊ မီတာ အနီကို ဆန်ဆာ၏ E2 ဂရောင်းပင်တွင် ထောက်ပြီး စက်နှိုးထားစဉ် တိုင်းပါ။
                </p>
                <div className="p-2 rounded bg-stone-950 border border-purple-500/20 text-emerald-400 font-mono text-[11px]">
                  ခွင့်ပြုစံချိန်: &lt; 0.05V Drop (အလွန်သန့်စင်ရမည်)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Ground Types (Chassis vs Sensor vs Power Ground) */}
      {activeTab === 'ground_types' && (
        <div className="mt-4 space-y-4">
          <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 sm:p-5">
            <h3 className="text-sm font-bold text-amber-300 mb-2 flex items-center gap-2">
              ⏚ ကားတစ်စီးလုံးရှိ ဂရောင်း (အာသီး) ၃ မျိုး ကွဲပြားပုံ
            </h3>
            <p className="text-xs text-stone-300 mb-4">
              ဂရောင်းတိုင်း မတူပါ။ ဆန်ဆာဂရောင်းနှင့် ပါဝါဂရောင်းကို ပူးရိုက်ဆက်လိုက်ပါက ဆန်ဆာများ ပျက်စီးပြီး Error ကုဒ်များ အဆက်မပြတ် တက်လာတတ်သည်။
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <span className="font-bold text-emerald-300 block mb-1">၁။ E2 / SGND (Sensor Clean Ground)</span>
                <p className="text-stone-300 mb-2">
                  ဆန်ဆာများ (TPS, MAP, ECT, FRP) သီးသန့် အသုံးပြုသော သန့်စင်ဂရောင်း ဖြစ်သည်။ ဘော်ဒီနှင့် တိုက်ရိုက် မထိရပါ။ ECU အတွင်းပိုင်း ချစ်ပ်မှ ထွက်လာသည်။
                </p>
                <span className="text-[11px] text-emerald-400 font-bold">စည်းကမ်း: ဘော်ဒီနပ်နှင့် မထိစေရ!</span>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30">
                <span className="font-bold text-amber-300 block mb-1">၂။ E01 / E02 (ECU Power Ground)</span>
                <p className="text-stone-300 mb-2">
                  မီးကွိုင်နှင့် အင်ဂျက်တာများ အလုပ်လုပ်ချိန် အင်အားကြီးသော ဓာတ်အားများကို အင်ဂျင်ဘလောက်တုံးသို့ စွန့်ထုတ်သော ပင်မ ပါဝါဂရောင်း ဖြစ်သည်။
                </p>
                <span className="text-[11px] text-amber-400 font-bold">စည်းကမ်း: အင်ဂျင်ခေါင်းနပ်တွင် တင်းကြပ်စွာ တပ်ရမည်!</span>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
                <span className="font-bold text-cyan-300 block mb-1">၃။ Chassis / Body Ground (EC / ဘော်ဒီ)</span>
                <p className="text-stone-300 mb-2">
                  မီးကြီး၊ ဟွန်း၊ ဝိုင်ဘာမော်တာ၊ အဲကွန်းပန်ကာ အစရှိသည့် ကိုယ်ထည်သုံး ပစ္စည်းများ မြေစိုက်ရန် ကားကိုယ်ထည် သံပြားတွင် တပ်ဆင်သော အနှုတ် ဖြစ်သည်။
                </p>
                <span className="text-[11px] text-cyan-400 font-bold">စည်းကမ်း: သံချေးနှင့် ဆေးသား ကင်းစင်အောင် ပွတ်တိုက်ရမည်!</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
