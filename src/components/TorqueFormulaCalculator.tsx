import React, { useState } from 'react';
import { Calculator, Sparkles, BookOpen, Check, ArrowRight, Wrench, ShieldAlert, Sliders, ChevronDown, Copy } from 'lucide-react';
import { playChime } from '../utils/audio';

interface TorqueFormulaCalculatorProps {
  soundEnabled: boolean;
}

export const TorqueFormulaCalculator: React.FC<TorqueFormulaCalculatorProps> = ({ soundEnabled }) => {
  // Standard metric bolt choices
  const [boltDiameterMm, setBoltDiameterMm] = useState<number>(10); // Default M10
  const [grade, setGrade] = useState<'8.8' | '10.9' | '12.9'>('8.8');
  const [lubeCondition, setLubeCondition] = useState<'dry' | 'standard' | 'oiled'>('standard');

  // K Factor (Nut factor / Friction coefficient)
  const kFactors = {
    dry: { k: 0.20, label: 'အခြောက် (Dry / ဆီမသုတ်ထားသော နတ်)', desc: 'ပွတ်တိုက်အားများပြီး K = 0.20' },
    standard: { k: 0.17, label: 'ပုံမှန် (Standard / အင်ဂျင်နီယာစံနှုန်း)', desc: 'အများသုံး ပျမ်းမျှ K = 0.17' },
    oiled: { k: 0.15, label: 'အစို (Oiled / စက်ဆီ အနည်းငယ်သုတ်ထား)', desc: 'ချောမွေ့ပြီး K = 0.15' },
  };

  const selectedK = kFactors[lubeCondition].k;

  // Steel Yield Strength (MPa = N/mm^2)
  const yieldStrengths = {
    '8.8': 640,
    '10.9': 900,
    '12.9': 1080,
  };
  const yieldStrength = yieldStrengths[grade];

  // Pitch approximation for standard coarse thread
  const pitch = boltDiameterMm <= 6 ? 1.0 : boltDiameterMm <= 8 ? 1.25 : boltDiameterMm <= 10 ? 1.5 : boltDiameterMm <= 12 ? 1.75 : boltDiameterMm <= 16 ? 2.0 : 2.5;

  // Tensile Stress Area As = 0.7854 * (d - 0.9382 * P)^2
  const stressArea = Math.round(0.7854 * Math.pow(boltDiameterMm - 0.9382 * pitch, 2) * 10) / 10;

  // Preload Clamping Force F = 75% of Proof Load = 0.75 * Area * YieldStrength (Newtons)
  const forceN = Math.round(stressArea * yieldStrength * 0.75);
  const forceKg = Math.round(forceN / 9.80665);

  // d in meters
  const dMeters = boltDiameterMm / 1000;

  // T = K * F * d (in N.m)
  const torqueNm = Math.round(selectedK * forceN * dMeters * 10) / 10;

  // Conversion to ft-lb (ပေါင်)
  // 1 N.m = 0.73756 ft-lb (or N.m / 1.3558)
  const torqueFtLb = Math.round(torqueNm * 0.73756 * 10) / 10;
  const torqueKgfm = Math.round(torqueNm * 0.10197 * 10) / 10;

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-stone-900 border-2 border-amber-500/40 text-stone-100 space-y-6 font-['Noto_Sans_Myanmar'] shadow-2xl">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold font-mono">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            T = K × F × d Step-by-Step
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-stone-100 mt-1">
            နတ်တစ်လုံး၏ လိမ့်အား (Torque) ကို သင်္ချာနည်းဖြင့် အစအဆုံး ကိုယ်တိုင်တွက်နည်း
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 mt-0.5">
            အောက်တွင် နတ်အချင်းကို ရွေးချယ်ပြီး အဆင့် (၁) မှ အဆင့် (၄) အထိ အမြှောက်/အစား သင်္ချာအဆင့်ဆင့်နှင့် <strong>ပေါင် (ft-lb) သို့ ပြောင်းနည်း</strong> ကို လေ့လာနိုင်ပါသည်။
          </p>
        </div>
      </div>

      {/* Interactive Selectors for Bolt Diameter & Grade */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl bg-stone-950 border border-stone-800">
        
        {/* 1. Bolt Diameter */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-amber-400 flex items-center gap-1">
            <Wrench className="w-3.5 h-3.5" />
            နတ်ချောင်းအချင်း (d) ရွေးပါ:
          </label>
          <select
            value={boltDiameterMm}
            onChange={(e) => {
              setBoltDiameterMm(Number(e.target.value));
              if (soundEnabled) playChime(500, 0.2);
            }}
            className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-sm font-bold text-stone-100 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value={6}>M6 (၆ မီလီ နတ်ချောင်း - ၁၀ ဂွခေါင်း)</option>
            <option value={8}>M8 (၈ မီလီ နတ်ချောင်း - ၁၂/၁၃ ဂွခေါင်း)</option>
            <option value={10}>M10 (၁၀ မီလီ နတ်ချောင်း - ၁၄ ဂွခေါင်း - အသုံးအများဆုံး)</option>
            <option value={12}>M12 (၁၂ မီလီ နတ်ချောင်း - ၁၇/၁၉ ဂွခေါင်း)</option>
            <option value={14}>M14 (၁၄ မီလီ နတ်ချောင်း - ၁၉/၂၁ ဂွခေါင်း)</option>
            <option value={16}>M16 (၁၆ မီလီ နတ်ချောင်း - ၂၂/၂၄ ဂွခေါင်း)</option>
            <option value={20}>M20 (၂၀ မီလီ နတ်ချောင်း - ၃၀ ဂွခေါင်း)</option>
          </select>
        </div>

        {/* 2. Bolt Grade */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-amber-400 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            သံမာစံနှုန်း (Bolt Grade) ရွေးပါ:
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(['8.8', '10.9', '12.9'] as const).map((g) => (
              <button
                key={g}
                onClick={() => {
                  setGrade(g);
                  if (soundEnabled) playChime(600, 0.2);
                }}
                className={`py-2 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                  grade === g
                    ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                    : 'bg-stone-900 text-stone-300 border border-stone-800 hover:border-stone-700'
                }`}
              >
                Grade {g}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Lubrication Condition (K Factor) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-amber-400 flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5" />
            နတ်မျက်နှာပြင် အနေအထား (K Factor):
          </label>
          <select
            value={lubeCondition}
            onChange={(e) => {
              setLubeCondition(e.target.value as any);
              if (soundEnabled) playChime(550, 0.2);
            }}
            className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs font-bold text-stone-100 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="standard">ပုံမှန် K = 0.17 (စံနှုန်း)</option>
            <option value="dry">အခြောက် K = 0.20 (ဆီမသုတ်)</option>
            <option value="oiled">အစို K = 0.15 (စက်ဆီသုတ်)</option>
          </select>
        </div>

      </div>

      {/* STEP-BY-STEP CALCULATION WORKFLOW */}
      <div className="space-y-4">
        
        {/* Formula Box */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-center space-y-2">
          <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
            အခြေခံ အင်ဂျင်နီယာ နတ်လိမ့်အား ဖော်မြူလာ
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-wide">
            T = K × F × d
          </div>
          <div className="text-xs text-stone-300 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span>• <strong>T</strong> = လိမ့်အား (Torque in N·m)</span>
            <span>• <strong>K</strong> = ပွတ်တိုက်အား ကိန်းသေ ({selectedK})</span>
            <span>• <strong>F</strong> = နတ်ဆွဲဆန့်အား (Preload Force in N)</span>
            <span>• <strong>d</strong> = နတ်အချင်း (Bolt Diameter in meters)</span>
          </div>
        </div>

        {/* Detailed 4 Steps */}
        <div className="grid grid-cols-1 gap-3">
          
          {/* STEP 1: d (Diameter in meters) */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-mono font-bold">1</span>
              <span>အဆင့် (၁) - နတ်အချင်း (d) ကို မီတာ (m) သို့ ပြောင်းပါ</span>
            </div>
            <p className="text-xs text-stone-300 pl-8">
              နတ်ချောင်းအထူ = <strong>{boltDiameterMm} မီလီမီတာ (mm)</strong> ဖြစ်ပါက —<br />
              <span className="font-mono text-emerald-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800 inline-block mt-1">
                d = {boltDiameterMm} mm ÷ 1000 = {dMeters} m (မီတာ)
              </span>
            </p>
          </div>

          {/* STEP 2: F (Clamp Preload Force) */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-mono font-bold">2</span>
              <span>အဆင့် (၂) - နတ်ကို ဆွဲညှပ်မည့် အင်အား (F - Clamp Force) ကို တွက်ပါ</span>
            </div>
            <p className="text-xs text-stone-300 pl-8 leading-relaxed">
              M{boltDiameterMm} (Grade {grade}) နတ်၏ သံမာဆွဲဆန့်ခံနိုင်မှု = <strong>{yieldStrength} N/mm²</strong> ၊ နတ်သွားဖြတ်ပိုင်းဧရိယာ = <strong>{stressArea} mm²</strong><br />
              စက်ရုံထုတ် စံနှုန်းအရ ၇၅% (0.75) ဆွဲအားဖြင့် တွက်ပါသည်:<br />
              <span className="font-mono text-emerald-400 bg-stone-900 px-2 py-1 rounded border border-stone-800 inline-block mt-1">
                F = {stressArea} mm² × {yieldStrength} N/mm² × 0.75 = {forceN.toLocaleString()} N (နယူတန်)
              </span>
              <span className="text-stone-400 block text-[11px] mt-0.5">
                (၎င်းသည် ကီလိုဂရမ်အားဖြင့် <strong>{forceKg.toLocaleString()} kg / {Math.round(forceKg/1000 * 10)/10} တန်</strong> ဆွဲညှပ်အားနှင့် ညီမျှပါသည်)
              </span>
            </p>
          </div>

          {/* STEP 3: T = K * F * d Multiplication */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-mono font-bold">3</span>
              <span>အဆင့် (၃) - T = K × F × d ဖြင့် မြှောက်ပါ (N·m ရလဒ် ထွက်လာပါမည်)</span>
            </div>
            <div className="pl-8 space-y-1 text-xs">
              <div className="font-mono text-emerald-300 bg-stone-900 p-2.5 rounded-xl border border-stone-800">
                T = {selectedK} (K) × {forceN.toLocaleString()} N (F) × {dMeters} m (d)<br />
                <strong className="text-amber-400 text-sm">👉 T = {torqueNm} N·m (Newton Meters)</strong>
              </div>
            </div>
          </div>

          {/* STEP 4: CONVERSION TO POUNDS (ft-lb) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 via-stone-950 to-stone-950 border-2 border-amber-500/50 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-xs font-mono font-black">4</span>
              <span>အဆင့် (၄) - N·m မှ ပေါင် (ft-lb / Foot-Pounds) သို့ ပြောင်းနည်း (ပေါင်ဖွဲ့နည်း)</span>
            </div>
            <div className="pl-8 space-y-2 text-xs leading-relaxed">
              <p className="text-stone-200">
                ဝပ်ရှော့သုံး ပေါင်ချိန်ဂွများသည် <strong>ပေါင် (ft-lb)</strong> ဖြင့် အများဆုံးပြသထားသောကြောင့် <strong>N·m ကို 0.738 နှင့် မြှောက်ရပါသည်</strong> (သို့မဟုတ် <strong>1.356 ဖြင့် စားရပါသည်</strong>)။
              </p>

              {/* Multiplication Method */}
              <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 space-y-1 font-mono">
                <div className="text-amber-300 font-bold font-sans text-xs">
                  နည်းလမ်း (က) - 0.738 ဖြင့် မြှောက်နည်း (အလွယ်ဆုံး):
                </div>
                <div className="text-emerald-400">
                  ပေါင် (ft-lb) = {torqueNm} N·m × 0.73756 = <span className="text-amber-400 font-black text-sm">{torqueFtLb} ပေါင် (ft-lb)</span>
                </div>
              </div>

              {/* Division Method */}
              <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 space-y-1 font-mono">
                <div className="text-amber-300 font-bold font-sans text-xs">
                  နည်းလမ်း (ခ) - 1.356 ဖြင့် စားနည်း:
                </div>
                <div className="text-emerald-400">
                  ပေါင် (ft-lb) = {torqueNm} N·m ÷ 1.3558 = <span className="text-amber-400 font-black text-sm">{torqueFtLb} ပေါင် (ft-lb)</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Final Summary Card for Quick Reading */}
      <div className="p-5 rounded-2xl bg-amber-500 text-stone-950 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="text-xs font-extrabold uppercase tracking-wider text-stone-900">
            M{boltDiameterMm} (Grade {grade}) နတ်တစ်လုံးအတွက် နောက်ဆုံး အဖြေ:
          </div>
          <div className="text-3xl sm:text-4xl font-black font-mono mt-0.5">
            {torqueFtLb} ပေါင် (ft-lb)
          </div>
          <div className="text-xs font-bold text-stone-900 mt-1">
            = {torqueNm} N·m (သို့မဟုတ် {torqueKgfm} kgf·m)
          </div>
        </div>

        <div className="p-3 bg-stone-950/20 rounded-xl text-xs font-semibold text-stone-950 border border-stone-950/20 max-w-xs text-center sm:text-right">
          💡 <strong>ပေါင်ချိန်ဂွတွင်:</strong> {torqueFtLb} ft-lb (သို့မဟုတ် {torqueNm} N·m) ချိန်၍ "ဒေါက်" ခနဲ အသံမြည်သည်အထိ ကြပ်ပေးရပါမည်။
        </div>
      </div>

    </div>
  );
};
