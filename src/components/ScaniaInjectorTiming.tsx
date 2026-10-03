import React, { useState } from 'react';
import { Truck, Cog, CheckCircle2, AlertTriangle, ArrowRight, Gauge, Wrench, ShieldAlert, Sparkles, BookOpen, Download, Check, Loader2 } from 'lucide-react';
import { playChime } from '../utils/audio';
import { downloadElementAsImage } from '../utils/imageExporter';

interface ScaniaInjectorTimingProps {
  soundEnabled: boolean;
}

export const ScaniaInjectorTiming: React.FC<ScaniaInjectorTimingProps> = ({ soundEnabled }) => {
  const [selectedEngine, setSelectedEngine] = useState<'dc12' | 'dc13' | 'dc16'>('dc12');
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isSavingImage, setIsSavingImage] = useState<boolean>(false);
  const [imageSaved, setImageSaved] = useState<boolean>(false);

  const handleSaveScaniaCard = async () => {
    setIsSavingImage(true);
    const fileName = `scania-${selectedEngine}-timing-specs-${Date.now()}.png`;
    const success = await downloadElementAsImage('scania-printable-card', fileName);
    setIsSavingImage(false);
    if (success) {
      setImageSaved(true);
      if (soundEnabled) playChime(880, 0.8);
      setTimeout(() => setImageSaved(false), 3000);
    }
  };

  const engineSpecs = {
    dc12: {
      name: 'Scania DC11 / DC12 (6-Cylinder PDE)',
      type: 'Inline 6 Cylinder PDE (Unit Injector)',
      firingOrder: '1 - 5 - 3 - 6 - 2 - 4',
      intakeValve: '0.45 mm (0.018 in)',
      exhaustValve: '0.70 mm (0.028 in)',
      pdeGaugeHeight: '66.9 mm (PDE31) သို့မဟုတ် 69.9 mm (PDE32)',
      gaugeTool: 'Scania Tool 99414 / 99442',
      lockNutTorque: '39 N·m (29 ပေါင် / ft-lb)',
      rockerShaftTorque: '105 N·m + 60° (77 ပေါင် + 60 ဒီဂရီ)',
      flywheelMarks: ['TDC Down / 0° (Cyl 1/6)', '120° (Cyl 2/5)', '240° (Cyl 3/4)'],
    },
    dc13: {
      name: 'Scania DC13 (6-Cylinder PDE / XPI)',
      type: 'Inline 6 Cylinder Euro 4/5 PDE & XPI Common Rail',
      firingOrder: '1 - 5 - 3 - 6 - 2 - 4',
      intakeValve: '0.45 mm (0.018 in)',
      exhaustValve: '0.70 mm (0.028 in)',
      pdeGaugeHeight: '66.9 mm ± 0.1 mm (PDE setting) / XPI ချိန်ညှိမှု',
      gaugeTool: 'Scania Special Tool 99414 / 99442',
      lockNutTorque: '39 N·m (29 ပေါင် / ft-lb)',
      rockerShaftTorque: '105 N·m + 60°',
      flywheelMarks: ['TDC Down (0°)', '120°', '240°'],
    },
    dc16: {
      name: 'Scania DC16 V8 (V8 PDE / XPI Engine)',
      type: 'V8 90° Engine PDE / XPI',
      firingOrder: '1 - 5 - 4 - 2 - 6 - 3 - 7 - 8',
      intakeValve: '0.45 mm (0.018 in)',
      exhaustValve: '0.70 mm (0.028 in)',
      pdeGaugeHeight: '66.9 mm (PDE) / 69.9 mm',
      gaugeTool: 'Scania Special Gauge 99414 / 99442',
      lockNutTorque: '39 N·m (29 ပေါင် / ft-lb)',
      rockerShaftTorque: '105 N·m + 60°',
      flywheelMarks: ['TDC 0°', '90°', '180°', '270°'],
    },
  };

  const currentSpec = engineSpecs[selectedEngine];

  const cylinderPairs6Cyl = [
    {
      flywheelMark: 'TDC 0° (နံပါတ် ၁ ဆလင်ဒါ အပေါ်ဆုံး ကွန်ပရက်ရှင်)',
      overlapCyl: 'နံပါတ် ၆ ဗား အဖွင့်အပိတ် ကူးပြောင်းချိန် (Overlap)',
      adjustValves: 'နံပါတ် ၁ အင်တိတ် (0.45mm) နှင့် အိတ်ဇော (0.70mm) ဗားများ ချိန်ရန်',
      adjustInjector: 'နံပါတ် ၄ သို့မဟုတ် နံပါတ် ၁ နော်ဇယ် ယူနစ် အမြင့်ချိန်ညှိရန် (66.9mm)',
    },
    {
      flywheelMark: '120° (နံပါတ် ၅ ဆလင်ဒါ ကွန်ပရက်ရှင်)',
      overlapCyl: 'နံပါတ် ၂ ဗား အဖွင့်အပိတ် ကူးပြောင်းချိန် (Overlap)',
      adjustValves: 'နံပါတ် ၅ အင်တိတ် (0.45mm) နှင့် အိတ်ဇော (0.70mm) ဗားများ ချိန်ရန်',
      adjustInjector: 'နံပါတ် ၂ သို့မဟုတ် နံပါတ် ၅ နော်ဇယ် ယူနစ် အမြင့်ချိန်ညှိရန်',
    },
    {
      flywheelMark: '240° (နံပါတ် ၃ ဆလင်ဒါ ကွန်ပရက်ရှင်)',
      overlapCyl: 'နံပါတ် ၄ ဗား အဖွင့်အပိတ် ကူးပြောင်းချိန် (Overlap)',
      adjustValves: 'နံပါတ် ၃ အင်တိတ် (0.45mm) နှင့် အိတ်ဇော (0.70mm) ဗားများ ချိန်ရန်',
      adjustInjector: 'နံပါတ် ၆ သို့မဟုတ် နံပါတ် ၃ နော်ဇယ် ယူနစ် အမြင့်ချိန်ညှိရန်',
    },
    {
      flywheelMark: '360° / TDC 0° (နံပါတ် ၆ ဆလင်ဒါ ကွန်ပရက်ရှင်)',
      overlapCyl: 'နံပါတ် ၁ ဗား အဖွင့်အပိတ် ကူးပြောင်းချိန် (Overlap)',
      adjustValves: 'နံပါတ် ၆ အင်တိတ် (0.45mm) နှင့် အိတ်ဇော (0.70mm) ဗားများ ချိန်ရန်',
      adjustInjector: 'နံပါတ် ၁ သို့မဟုတ် နံပါတ် ၆ နော်ဇယ် ယူနစ် အမြင့်ချိန်ညှိရန်',
    },
    {
      flywheelMark: '480° / 120° (နံပါတ် ၂ ဆလင်ဒါ ကွန်ပရက်ရှင်)',
      overlapCyl: 'နံပါတ် ၅ ဗား အဖွင့်အပိတ် ကူးပြောင်းချိန် (Overlap)',
      adjustValves: 'နံပါတ် ၂ အင်တိတ် (0.45mm) နှင့် အိတ်ဇော (0.70mm) ဗားများ ချိန်ရန်',
      adjustInjector: 'နံပါတ် ၅ သို့မဟုတ် နံပါတ် ၂ နော်ဇယ် ယူနစ် အမြင့်ချိန်ညှိရန်',
    },
    {
      flywheelMark: '600° / 240° (နံပါတ် ၄ ဆလင်ဒါ ကွန်ပရက်ရှင်)',
      overlapCyl: 'နံပါတ် ၃ ဗား အဖွင့်အပိတ် ကူးပြောင်းချိန် (Overlap)',
      adjustValves: 'နံပါတ် ၄ အင်တိတ် (0.45mm) နှင့် အိတ်ဇော (0.70mm) ဗားများ ချိန်ရန်',
      adjustInjector: 'နံပါတ် ၃ သို့မဟုတ် နံပါတ် ၄ နော်ဇယ် ယူနစ် အမြင့်ချိန်ညှိရန်',
    },
  ];

  const handleSelectEngine = (eng: 'dc12' | 'dc13' | 'dc16') => {
    setSelectedEngine(eng);
    if (soundEnabled) playChime(640, 0.4);
  };

  return (
    <section id="scania-section" className="py-8 sm:py-12 px-4 sm:px-6 bg-stone-900/80 border-b border-amber-500/20">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Truck className="w-4 h-4 text-amber-400" />
            Scania Heavy Truck Engine Service Guide
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight font-['Noto_Sans_Myanmar']">
            စကန်နီယာ (Scania) ကားကြီး အင်ဂျင် နော်ဇယ် / တိုက်ပစ်ချိန်နည်း
          </h2>
          <p className="text-sm sm:text-base text-stone-300 mt-2 leading-relaxed font-['Noto_Sans_Myanmar']">
            Scania DC11, DC12, DC13 (6 လုံးထိုး) နှင့် DC16 (V8) အင်ဂျင်များ၏ PDE Unit Injector အမြင့်ချိန်ညှိခြင်းနှင့် ဗားကလီးရန့် (Valve Clearance) တိုက်ပစ်ချိန်နည်း အဆင့်ဆင့် လမ်းညွှန်။
          </p>
        </div>

        {/* Engine Selector Tabs & Download Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 bg-stone-950 p-1.5 rounded-2xl border border-stone-800 w-full sm:w-auto">
            <button
              onClick={() => handleSelectEngine('dc12')}
              className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedEngine === 'dc12'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-stone-100'
              }`}
            >
              Scania DC11 / DC12
            </button>
            <button
              onClick={() => handleSelectEngine('dc13')}
              className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedEngine === 'dc13'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-stone-100'
              }`}
            >
              Scania DC13 (Euro 4/5/6)
            </button>
            <button
              onClick={() => handleSelectEngine('dc16')}
              className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedEngine === 'dc16'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-stone-100'
              }`}
            >
              Scania DC16 (V8)
            </button>
          </div>

          {/* Download Card as Image (PNG) Button */}
          <button
            id="save-scania-image-btn"
            onClick={handleSaveScaniaCard}
            disabled={isSavingImage}
            className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-95 cursor-pointer disabled:opacity-50 font-['Noto_Sans_Myanmar']"
          >
            {isSavingImage ? (
              <>
                <Loader2 className="w-4 h-4 text-stone-950 animate-spin" />
                <span>ပုံထုတ်ယူနေပါသည်...</span>
              </>
            ) : imageSaved ? (
              <>
                <Check className="w-4 h-4 text-stone-950" />
                <span>ပုံသိမ်းဆည်းပြီးပါပြီ! (Saved)</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-stone-950" />
                <span>Scania ချိန်နည်းဇယားကို ပုံသိမ်းမည် (PNG)</span>
              </>
            )}
          </button>
        </div>

        {/* Printable Card Area */}
        <div id="scania-printable-card" className="space-y-8 bg-stone-950/60 p-4 sm:p-6 rounded-3xl border border-stone-800">
          
          {/* Card Header for exported image */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div>
              <span className="text-xs uppercase font-mono text-amber-400 font-bold">Scania Service Sheet</span>
              <h3 className="text-xl font-black text-stone-100 font-['Noto_Sans_Myanmar']">{currentSpec.name}</h3>
            </div>
            <div className="text-xs bg-stone-900 px-3 py-1 rounded-xl text-stone-300 font-mono border border-stone-700">
              Firing: {currentSpec.firingOrder}
            </div>
          </div>

          {/* Key Quick Specifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-stone-950 border border-amber-500/30">
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1 font-['Noto_Sans_Myanmar']">
              အင်တိတ်ဗား (Intake Valve)
            </div>
            <div className="text-2xl font-black text-stone-100 font-mono">
              0.45 mm
            </div>
            <div className="text-xs text-stone-400 font-sans mt-0.5">(0.018 inch) ကလီးရန့်</div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950 border border-amber-500/30">
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1 font-['Noto_Sans_Myanmar']">
              အိတ်ဇောဗား (Exhaust Valve)
            </div>
            <div className="text-2xl font-black text-stone-100 font-mono">
              0.70 mm
            </div>
            <div className="text-xs text-stone-400 font-sans mt-0.5">(0.028 inch) ကလီးရန့်</div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950 border border-amber-500/30">
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1 font-['Noto_Sans_Myanmar']">
              နော်ဇယ်အမြင့် (PDE Height)
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
              66.9 mm
            </div>
            <div className="text-xs text-stone-400 font-['Noto_Sans_Myanmar'] mt-0.5">(သို့ 69.9mm PDE32 စံနှုန်း)</div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950 border border-amber-500/30">
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1 font-['Noto_Sans_Myanmar']">
              နော့နတ်လိမ်အား (Locknut)
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              39 N·m
            </div>
            <div className="text-xs text-stone-400 font-['Noto_Sans_Myanmar'] mt-0.5">(၂၉ ပေါင် / ft-lb လိမ်အား)</div>
          </div>
        </div>

        {/* Core Step-by-Step Practical Procedure in Burmese */}
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-950 border border-stone-800 space-y-6">
          <div className="flex items-center gap-2 text-amber-400">
            <BookOpen className="w-5 h-5" />
            <h3 className="text-xl sm:text-2xl font-bold text-stone-100 font-['Noto_Sans_Myanmar']">
              စကန်နီယာ နော်ဇယ်နှင့် ဗား ချိန်ညှိနည်း အဆင့် (၅) ဆင့် (Detailed Steps)
            </h3>
          </div>

          <div className="space-y-4 font-['Noto_Sans_Myanmar']">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 font-black flex items-center justify-center shrink-0">
                ၁
              </div>
              <div className="space-y-1 text-sm text-stone-200 leading-relaxed">
                <strong className="text-amber-300 text-base block font-bold">
                  ပြင်ဆင်ခြင်းနှင့် ဖလိုင်းဝှီး တိုက်ပစ်မှတ် (Flywheel Mark) ရှာဖွေခြင်း
                </strong>
                <p>
                  အင်ဂျင်ကို အေးနေချိန်တွင်သာ ချိန်ညှိရပါမည်။ ဖလိုင်းဝှီး အောက်ဘက် အပေါက် (Flywheel Window) မှ အင်ဂျင်လည်ပတ်ရာ ဦးတည်ဘက်အတိုင်း (ပုံမှန်လည်သည့်ဘက်) သာ လှည့်ပေးပါ။ ဖလိုင်းဝှီးပေါ်တွင် <strong>TDC 0° (Down)</strong> အမှတ်အသားနှင့် အမှတ်တံဆိပ် မျဉ်းကြောင်းကို တည့်အောင်ချိန်ပါ။
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 font-black flex items-center justify-center shrink-0">
                ၂
              </div>
              <div className="space-y-1 text-sm text-stone-200 leading-relaxed">
                <strong className="text-amber-300 text-base block font-bold">
                  ဖိုင်းရင်းအော်ဒါ (Firing Order: 1 - 5 - 3 - 6 - 2 - 4) စစ်ဆေးခြင်း
                </strong>
                <p>
                  <strong>TDC 0°</strong> တွင် နံပါတ် (၁) ဆလင်ဒါသည် ကွန်ပရက်ရှင် (Compression) ဖြစ်နေလျှင် နံပါတ် (၆) ဆလင်ဒါ၏ အိတ်ဇောဗား ပိတ်ကာစနှင့် အင်တိတ်ဗား စဖွင့်ချိန် (Valve Overlap) ဖြစ်နေရပါမည်။
                </p>
                <div className="mt-2 p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-amber-200">
                  ⚡ <strong>အလွယ်မှတ်ရန်:</strong> နံပါတ် ၆ ဗားလှုပ်ရှားနေချိန်တွင် နံပါတ် ၁ ကို ချိန်နိုင်ပြီး၊ နံပါတ် ၁ ဗားလှုပ်ရှားချိန်တွင် နံပါတ် ၆ ကို ချိန်ရပါမည်။
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 font-black flex items-center justify-center shrink-0">
                ၃
              </div>
              <div className="space-y-1 text-sm text-stone-200 leading-relaxed">
                <strong className="text-amber-300 text-base block font-bold">
                  PDE နော်ဇယ် ယူနစ် အမြင့်ချိန်ညှိခြင်း (Injector Dimension Gauge Setting)
                </strong>
                <p>
                  Scania Special Tool (ဂိတ်တံ 99414 သို့မဟုတ် 99442) ကို အသုံးပြု၍ ဆလင်ဒါခေါင်း မျက်နှာပြင် (Cylinder head surface) မှ နော်ဇယ် စပရင်ထိုင်ခုံ (Spring seat) အထက်သို့ အမြင့် <strong>66.9 mm ± 0.1 mm</strong> (PDE32 ဖြစ်ပါက 69.9 mm) တိကျစွာ ရောက်အောင် ရော့ကာအာမ် ထိပ်ရှိ ချိန်ညှိဝက်အူ (Adjuster Screw) ကို လှည့်ချိန်ပါ။
                </p>
                <p className="text-stone-400 text-xs">
                  (ဂိတ်တံ မရှိပါက: ရော့ကာအာမ် ဝက်အူကို အဆုံးထိ လက်ဖြင့် တင်းတင်းထောက်ပြီးမှ သတ်မှတ် ဒီဂရီ/ပတ် ပြန်လျော့ကာ ချိန်သည့် နည်းလမ်းရှိသော်လည်း Scania အင်ဂျင်များတွင် <strong>66.9mm ဂိတ်တံ</strong> သုံးခြင်းသည် ဆီဖိအားနှင့် အငွေ့ထွက်မှုအတွက် အတိကျဆုံး ဖြစ်ပါသည်)။
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 font-black flex items-center justify-center shrink-0">
                ၄
              </div>
              <div className="space-y-1 text-sm text-stone-200 leading-relaxed">
                <strong className="text-amber-300 text-base block font-bold">
                  အင်တိတ်ဗား (0.45 mm) နှင့် အိတ်ဇောဗား (0.70 mm) ချိန်ညှိခြင်း
                </strong>
                <p>
                  ဖီးလာဂိတ် (Feeler Gauge) ကို သုံး၍ အင်တိတ်ဗားအတွက် <strong>0.45 mm</strong>၊ အိတ်ဇောဗားအတွက် <strong>0.70 mm</strong> ပြားထည့်ကာ အနေတော် စီးစီးလေး သွားလာနိုင်သည်အထိ ချိန်ညှိဝက်အူကို လှည့်ပါ။ ပြီးလျှင် နော့နတ် (Locknut) ကို လိမ်အားဂွဖြင့် <strong>39 N·m (၂၉ ပေါင်)</strong> တိကျစွာ ပြန်ကြပ်ပါ။
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 font-black flex items-center justify-center shrink-0">
                ၅
              </div>
              <div className="space-y-1 text-sm text-stone-200 leading-relaxed">
                <strong className="text-amber-300 text-base block font-bold">
                  ဖလိုင်းဝှီးကို ၁၂၀ ဒီဂရီစီ အဆင့်ဆင့်လှည့်၍ ကျန်ဆလင်ဒါများ ဆက်တိုက်ချိန်ခြင်း
                </strong>
                <p>
                  ဖလိုင်းဝှီးကို နောက်ထပ် <strong>120°</strong> လှည့်ပြီး (ဆလင်ဒါ ၅)၊ ထို့နောက် နောက်ထပ် <strong>120° (240°)</strong> လှည့်ပြီး (ဆလင်ဒါ ၃) စသည်ဖြင့် ဖိုင်းရင်းအော်ဒါအတိုင်း ဆလင်ဒါ ၆ လုံးစလုံးကို အစဉ်လိုက် ပြီးစီးအောင် ချိန်ညှိပါ။
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 6-Cylinder Flywheel Step Timing Matrix Table */}
        <div className="p-6 rounded-3xl bg-stone-950 border border-stone-800">
          <h3 className="text-lg sm:text-xl font-bold text-amber-300 font-['Noto_Sans_Myanmar'] mb-3 flex items-center gap-2">
            <Gauge className="w-5 h-5 text-amber-400" />
            Scania ၆ လုံးထိုး အင်ဂျင် ဖလိုင်းဝှီး ဒီဂရီအလိုက် ချိန်ညှိရမည့် ဆလင်ဒါ တွဲဖက်ဇယား
          </h3>
          <p className="text-xs text-stone-400 mb-4 font-['Noto_Sans_Myanmar']">
            ဖလိုင်းဝှီး ၂ ပတ် (၇၂၀ ဒီဂရီ) လှည့်ပတ်မှုအတွင်း ဆလင်ဒါအားလုံးကို အောက်ပါဇယားအတိုင်း အလွယ်တကူ ချိန်ညှိနိုင်ပါသည် -
          </p>

          <div className="overflow-x-auto rounded-2xl border border-stone-800">
            <table className="w-full text-left text-xs sm:text-sm font-['Noto_Sans_Myanmar']">
              <thead className="bg-stone-900 text-amber-300 font-bold border-b border-stone-800">
                <tr>
                  <th className="py-3 px-4">ဖလိုင်းဝှီးအမှတ် (Flywheel Mark)</th>
                  <th className="py-3 px-4 text-stone-400">ဗားကူးပြောင်းနေသောဆလင်ဒါ (Overlap)</th>
                  <th className="py-3 px-4 text-amber-200 bg-amber-500/10">ဗားချိန်ရမည့် ဆလင်ဒါ (0.45 / 0.70mm)</th>
                  <th className="py-3 px-4 text-emerald-300">နော်ဇယ်ချိန်ရမည့် ဆလင်ဒါ (66.9mm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800 text-stone-200">
                {cylinderPairs6Cyl.map((row, idx) => (
                  <tr key={idx} className="hover:bg-stone-900/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-amber-400 font-mono">{row.flywheelMark}</td>
                    <td className="py-3.5 px-4 text-stone-400 text-xs">{row.overlapCyl}</td>
                    <td className="py-3.5 px-4 font-semibold text-stone-100 bg-amber-500/5">{row.adjustValves}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-400 text-xs font-mono">{row.adjustInjector}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Warning Symptoms of Bad Injector Timing */}
        <div className="p-6 rounded-3xl bg-rose-950/30 border border-rose-800/40 text-stone-200 font-['Noto_Sans_Myanmar'] space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
            <AlertTriangle className="w-5 h-5" />
            နော်ဇယ်တိုက်ပစ်ချိန် လွဲမှားပါက ဖြစ်ပေါ်တတ်သော ချွတ်ယွင်းချက်များ (Symptoms):
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-stone-300 list-disc list-inside leading-relaxed">
            <li><strong>မီးခိုးမည်းထွက်ခြင်း</strong> — ဆီပိုထည့်မိပြီး အောက်ဆီဂျင်မလုံလောက်ခြင်း။</li>
            <li><strong>မီးခိုးဖြူထွက်ခြင်း / စူးရှသောအနံ့</strong> — ဆီလောင်ကျွမ်းမှု နောက်ကျခြင်း (Late Injection Timing)။</li>
            <li><strong>အင်ဂျင်ခေါက်သံ (Knocking / Tappet Noise)</strong> — နော်ဇယ်/ဗား ကလီးရန့် ချောင်လွန်းခြင်း သို့မဟုတ် စောလွန်းခြင်း။</li>
            <li><strong>အင်ဂျင်ဆွဲအားကျခြင်း (Loss of Power)</strong> — ဒီဇယ်ဆီဖိအား အပြည့်မရရှိခြင်း။</li>
            <li><strong>မနက်ခင်း စက်နှိုးခက်ခဲခြင်း</strong> — အအေးခန်းတွင် ဆီဖြန်းဖိအား မမှန်ခြင်း။</li>
            <li><strong>ဆီစားလွန်ကဲခြင်း</strong> — ဒီဇယ်ဆီ မီးမလောင်ဘဲ အိတ်ဇောမှ ထွက်သွားခြင်း။</li>
          </ul>
        </div>

        </div>
        {/* End of scania printable card */}

      </div>
    </section>
  );
};
