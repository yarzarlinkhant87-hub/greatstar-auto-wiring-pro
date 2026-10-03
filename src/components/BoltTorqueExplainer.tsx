import React, { useState } from 'react';
import { Wrench, Sparkles, AlertTriangle, Calculator, Download, Check, Loader2, BookOpen, Info, Smartphone, Sliders, Table, Layers, ChevronRight, Binary } from 'lucide-react';
import { playChime } from '../utils/audio';
import { downloadElementAsImage } from '../utils/imageExporter';
import { PWAInstallButton } from './PWAInstallButton';
import { TorqueFormulaCalculator } from './TorqueFormulaCalculator';

interface BoltTorqueExplainerProps {
  soundEnabled: boolean;
}

export interface SocketBoltSpec {
  socketSize: number; // ဂွ/ခေါင်းဆိုက် (mm)
  boltDiameter: string; // နတ်ချောင်း အချင်း (Thread Size)
  threadPitch: string; // သွားစိတ်/သွားကြဲ
  standard: string; // JIS / ISO / DIN
  grade88TorqueNm: number; // Grade 8.8 N.m
  grade88TorqueFtLb: number; // Grade 8.8 ft-lb (ပေါင်)
  grade109TorqueNm: number; // Grade 10.9 N.m
  grade109TorqueFtLb: number; // Grade 10.9 ft-lb (ပေါင်)
  grade129TorqueNm: number; // Grade 12.9 N.m
  grade129TorqueFtLb: number; // Grade 12.9 ft-lb (ပေါင်)
  commonUsage: string; // တွေ့ရလေ့ရှိသောနေရာ
}

export const SOCKET_SPECS: SocketBoltSpec[] = [
  {
    socketSize: 8,
    boltDiameter: 'M5 (၅ မီလီ နတ်ချောင်း)',
    threadPitch: '0.8 mm',
    standard: 'ISO / JIS',
    grade88TorqueNm: 6,
    grade88TorqueFtLb: 4.5,
    grade109TorqueNm: 8.5,
    grade109TorqueFtLb: 6.2,
    grade129TorqueNm: 10,
    grade129TorqueFtLb: 7.5,
    commonUsage: 'အဖုံးငယ်များ၊ အာရုံခံ ဆင်ဆာနတ်များ၊ ဝါယာကြိုးထိန်းနတ်များ',
  },
  {
    socketSize: 10,
    boltDiameter: 'M6 (၆ မီလီ နတ်ချောင်း)',
    threadPitch: '1.0 mm',
    standard: 'ISO / JIS',
    grade88TorqueNm: 10,
    grade88TorqueFtLb: 7.5,
    grade109TorqueNm: 14,
    grade109TorqueFtLb: 10.5,
    grade129TorqueNm: 17,
    grade129TorqueFtLb: 12.5,
    commonUsage: 'ဗားအဖုံး (Valve Cover)၊ ရေလိုင်းပိုက်ကုပ်များ၊ ဝါယာကလစ်များ',
  },
  {
    socketSize: 12,
    boltDiameter: 'M8 (၈ မီလီ ဂျပန်စံနှုန်း)',
    threadPitch: '1.25 mm',
    standard: 'JIS (ဂျပန်ကား/စက်များ)',
    grade88TorqueNm: 25,
    grade88TorqueFtLb: 18.5,
    grade109TorqueNm: 35,
    grade109TorqueFtLb: 26,
    grade129TorqueNm: 42,
    grade129TorqueFtLb: 31,
    commonUsage: 'ဂျပန်ကား/စက်များ၏ အင်တိတ်မနီဖိုး၊ ရေဘုံဘိုင် (Water pump)၊ တာမိုစတက်အိမ်',
  },
  {
    socketSize: 13,
    boltDiameter: 'M8 (၈ မီလီ ဥရောပစံနှုန်း)',
    threadPitch: '1.25 mm',
    standard: 'ISO (Scania / Benz / Volvo)',
    grade88TorqueNm: 25,
    grade88TorqueFtLb: 18.5,
    grade109TorqueNm: 35,
    grade109TorqueFtLb: 26,
    grade129TorqueNm: 42,
    grade129TorqueFtLb: 31,
    commonUsage: 'ဥရောပကားကြီးများ၏ ရော့ကာအာမ်ကာဗာ၊ ဆီပိုက်ကလစ်၊ အိတ်ဇောအကာ',
  },
  {
    socketSize: 14,
    boltDiameter: 'M10 (၁၀ မီလီ ဂျပန်စံနှုန်း)',
    threadPitch: '1.25 mm (သွားစိတ်) / 1.5 mm',
    standard: 'JIS (ဂျပန်ကား/စက်များ)',
    grade88TorqueNm: 49,
    grade88TorqueFtLb: 36,
    grade109TorqueNm: 69,
    grade109TorqueFtLb: 51,
    grade129TorqueNm: 83,
    grade129TorqueFtLb: 61,
    commonUsage: 'ဘရိတ်ကာလီပါ၊ အင်ဂျင်မောင့်တိန်၊ ဒိုင်နမိုဆွဲနတ်များ',
  },
  {
    socketSize: 17,
    boltDiameter: 'M10 (ဥရောပ) / M12 (ဂျပန်)',
    threadPitch: '1.5 mm / 1.75 mm',
    standard: 'ISO / JIS',
    grade88TorqueNm: 85,
    grade88TorqueFtLb: 63,
    grade109TorqueNm: 120,
    grade109TorqueFtLb: 89,
    grade129TorqueNm: 145,
    grade129TorqueFtLb: 107,
    commonUsage: 'ဆိုင်းဘုတ်မောင့်တိန်၊ ဂီယာဘောက်ဘောလ်၊ ရှော့ဘားနတ်များ',
  },
  {
    socketSize: 19,
    boltDiameter: 'M12 (ဥရောပ) / M14 (ဂျပန်)',
    threadPitch: '1.5 mm / 2.0 mm',
    standard: 'ISO / JIS',
    grade88TorqueNm: 140,
    grade88TorqueFtLb: 103,
    grade109TorqueNm: 195,
    grade109TorqueFtLb: 144,
    grade129TorqueNm: 230,
    grade129TorqueFtLb: 170,
    commonUsage: 'ဘီးနတ်အသေးများ၊ ချာစီဖရိမ်နတ်များ၊ ကွန်နက်တင်းရော့ဘောလ်အချို့',
  },
  {
    socketSize: 21,
    boltDiameter: 'M14 (၁၄ မီလီ ဂျပန်စံနှုန်း)',
    threadPitch: '1.5 mm',
    standard: 'JIS / Spark Plug',
    grade88TorqueNm: 145,
    grade88TorqueFtLb: 107,
    grade109TorqueNm: 205,
    grade109TorqueFtLb: 151,
    grade129TorqueNm: 245,
    grade129TorqueFtLb: 181,
    commonUsage: 'ဂျပန်ကား ဘီးနတ်ကြီးများ၊ ပလပ်ခေါင်းများ၊ အောက်ပိုင်းလက်မောင်းဘောလ်',
  },
  {
    socketSize: 22,
    boltDiameter: 'M14 (ဥရောပ) / M16 (ဂျပန်)',
    threadPitch: '1.5 mm / 2.0 mm',
    standard: 'ISO / JIS',
    grade88TorqueNm: 215,
    grade88TorqueFtLb: 159,
    grade109TorqueNm: 305,
    grade109TorqueFtLb: 225,
    grade129TorqueNm: 365,
    grade129TorqueFtLb: 269,
    commonUsage: 'ဆလင်ဒါခေါင်း (Cylinder Head)၊ ဖလိုင်းဝှီးဘောလ်၊ အောက်ပိုင်းအဆစ်ကြီးများ',
  },
  {
    socketSize: 24,
    boltDiameter: 'M16 (၁၆ မီလီ နတ်ချောင်း)',
    threadPitch: '2.0 mm',
    standard: 'ISO / DIN',
    grade88TorqueNm: 215,
    grade88TorqueFtLb: 159,
    grade109TorqueNm: 305,
    grade109TorqueFtLb: 225,
    grade129TorqueNm: 365,
    grade129TorqueFtLb: 269,
    commonUsage: 'ခရိုင်းရှပ် ပူလီဘောလ်၊ ကားကြီးဆိုင်းထိန်းဘောလ်ကြီးများ',
  },
  {
    socketSize: 27,
    boltDiameter: 'M18 (၁၈ မီလီ နတ်ချောင်း)',
    threadPitch: '2.5 mm',
    standard: 'ISO / DIN',
    grade88TorqueNm: 300,
    grade88TorqueFtLb: 221,
    grade109TorqueNm: 425,
    grade109TorqueFtLb: 313,
    grade129TorqueNm: 510,
    grade129TorqueFtLb: 376,
    commonUsage: 'ထရပ်ကားကြီးများ၏ မာစတာအောက်ပိုင်းလက်မောင်း၊ ကုန်တင်ကားဖရိမ်ဘောလ်',
  },
  {
    socketSize: 30,
    boltDiameter: 'M20 (၂၀ မီလီ နတ်ချောင်း)',
    threadPitch: '2.5 mm',
    standard: 'ISO / DIN',
    grade88TorqueNm: 430,
    grade88TorqueFtLb: 317,
    grade109TorqueNm: 610,
    grade109TorqueFtLb: 450,
    grade129TorqueNm: 730,
    grade129TorqueFtLb: 538,
    commonUsage: 'ခရိုင်းရှပ် ပင်မမိန်းဘယ်ရင်ဘောလ် (Main Bearing)၊ ဖလိုင်းဝှီးကြီးများ',
  },
  {
    socketSize: 32,
    boltDiameter: 'M22 (၂၂ မီလီ နတ်ချောင်း)',
    threadPitch: '2.5 mm',
    standard: 'ISO / DIN',
    grade88TorqueNm: 580,
    grade88TorqueFtLb: 428,
    grade109TorqueNm: 820,
    grade109TorqueFtLb: 605,
    grade129TorqueNm: 990,
    grade129TorqueFtLb: 730,
    commonUsage: '၁၀ ဘီး/၂၂ ဘီး ထရပ်ကား ဘီးနတ်ကြီးများ၊ ကလပ်ပန်းကန်ပြား မူလီကြီးများ',
  },
];

export const BoltTorqueExplainer: React.FC<BoltTorqueExplainerProps> = ({ soundEnabled }) => {
  const [activeTab, setActiveTab] = useState<'master' | 'single' | 'custom' | 'formula'>('master');
  const [selectedSocket, setSelectedSocket] = useState<number>(12);
  const [selectedGrade, setSelectedGrade] = useState<'8.8' | '10.9' | '12.9'>('8.8');
  
  // Custom Live Slider for any bolt mm diameter
  const [customDiameterMm, setCustomDiameterMm] = useState<number>(8);
  const [customGrade, setCustomGrade] = useState<'8.8' | '10.9' | '12.9'>('8.8');

  const [isSavingMasterImage, setIsSavingMasterImage] = useState<boolean>(false);
  const [masterImageSaved, setMasterImageSaved] = useState<boolean>(false);

  const [isSavingSingleImage, setIsSavingSingleImage] = useState<boolean>(false);
  const [singleImageSaved, setSingleImageSaved] = useState<boolean>(false);

  const currentSpec = SOCKET_SPECS.find((s) => s.socketSize === selectedSocket) || SOCKET_SPECS[2];

  const handleSelectSocket = (size: number) => {
    setSelectedSocket(size);
    if (soundEnabled) playChime(520, 0.4);
  };

  // Export the All-in-One Master Chart as a single PNG image containing ALL sizes
  const handleSaveMasterChart = async () => {
    setIsSavingMasterImage(true);
    const fileName = `bolt-torque-master-all-sizes-${Date.now()}.png`;
    const success = await downloadElementAsImage('bolt-torque-master-printable-card', fileName);
    setIsSavingMasterImage(false);
    if (success) {
      setMasterImageSaved(true);
      if (soundEnabled) playChime(880, 0.8);
      setTimeout(() => setMasterImageSaved(false), 3000);
    }
  };

  // Export single focus card
  const handleSaveSingleChart = async () => {
    setIsSavingSingleImage(true);
    const fileName = `bolt-torque-${selectedSocket}mm-${Date.now()}.png`;
    const success = await downloadElementAsImage('bolt-torque-single-printable-card', fileName);
    setIsSavingSingleImage(false);
    if (success) {
      setSingleImageSaved(true);
      if (soundEnabled) playChime(880, 0.8);
      setTimeout(() => setSingleImageSaved(false), 3000);
    }
  };

  // Custom calculation formula: T = K * D * F
  // Approximation for standard friction K=0.17
  const calculateCustomTorque = (dMm: number, grade: '8.8' | '10.9' | '12.9') => {
    const yieldStress = grade === '8.8' ? 640 : grade === '10.9' ? 900 : 1080; // MPa (N/mm^2)
    // Approximate stress area
    const area = 0.7854 * Math.pow(dMm - 0.9382 * (dMm > 14 ? 2.0 : dMm > 8 ? 1.5 : 1.25), 2);
    const proofForce = area * yieldStress * 0.75; // 75% proof load
    const nm = Math.round((0.17 * dMm * proofForce) / 1000);
    const ftlb = Math.round(nm * 0.73756 * 10) / 10;
    const kgfm = Math.round(nm * 0.10197 * 10) / 10;
    return { nm: Math.max(1, nm), ftlb: Math.max(0.7, ftlb), kgfm: Math.max(0.1, kgfm) };
  };

  const customTorqueResult = calculateCustomTorque(customDiameterMm, customGrade);

  const currentTorqueNm =
    selectedGrade === '8.8'
      ? currentSpec.grade88TorqueNm
      : selectedGrade === '10.9'
      ? currentSpec.grade109TorqueNm
      : currentSpec.grade129TorqueNm;

  const currentTorqueFtLb =
    selectedGrade === '8.8'
      ? currentSpec.grade88TorqueFtLb
      : selectedGrade === '10.9'
      ? currentSpec.grade109TorqueFtLb
      : currentSpec.grade129TorqueFtLb;

  return (
    <section id="bolt-torque-section" className="py-8 sm:py-12 px-4 sm:px-6 bg-stone-900/90 border-b border-amber-500/20 text-stone-100">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Wrench className="w-4 h-4 text-amber-400" />
            Bolt & Socket Torque System (မြန်မာလို နတ်ကြပ်အား စနစ်)
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight font-['Noto_Sans_Myanmar']">
            နတ်လိမ့်အား (Torque) တွက်နည်းနှင့် ဂွဆိုက် (12 / 13) အလိုက် ကြပ်အားဇယား
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-['Noto_Sans_Myanmar']">
            ဂွဆိုက် <strong>၈ မီလီ မှ ၃၂ မီလီအထိ</strong> နတ်ချောင်းအချင်း (Thread) နှင့် သံမာစံနှုန်း (Grade 8.8 / 10.9 / 12.9) အလိုက် <strong>ပေါင် (ft-lb) နှင့် N·m</strong> များကို တိုက်ရိုက် ရွေးချယ်တွက်ချက်နိုင်ပါသည်။
          </p>
        </div>

        {/* Dynamic App Install / Offline Notice Banner */}
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/20 via-stone-900 to-amber-500/20 border-2 border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-4 font-['Noto_Sans_Myanmar']">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500 text-stone-950 shrink-0 shadow-lg shadow-amber-500/30">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-amber-300 flex items-center gap-2">
                <span>📱 ဖုန်းထဲတွင် ဆော့ဝဲအစစ်ကဲ့သို့ အရှင်အသုံးပြုလိုပါသလား?</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-200 text-xs font-normal">အင်တာနက်မလို</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 mt-0.5">
                ဓာတ်ပုံ (PNG) အဖြစ် သိမ်းပါက ရွေးထားသည့် နံပါတ်တစ်ခုတည်းသာ ပုံသေဖြစ်နေတတ်ပါသည်။ <strong>"Install App"</strong> နှိပ်၍ သွင်းထားပါက ဂွဆိုက်အားလုံးကို အချိန်မရွေး စိတ်ကြိုက် နှိပ်ရွှေ့တွက်ချက်နိုင်ပါမည်။
              </p>
            </div>
          </div>
          <div className="shrink-0 w-full sm:w-auto">
            <PWAInstallButton soundEnabled={soundEnabled} />
          </div>
        </div>

        {/* Essential Workshop Clarification (12 vs 13 Explanation) */}
        <div className="p-6 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 font-['Noto_Sans_Myanmar']">
            <div className="inline-flex items-center gap-2 text-amber-300 font-bold text-base">
              <Info className="w-5 h-5 text-amber-400" />
              ၁၂ နတ် နှင့် ၁၃ နတ် ဘာကြောင့် အတူတူဖြစ်နေရသလဲ?
            </div>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              • <strong>၁၂ ဂွခေါင်း</strong> နှင့် <strong>၁၃ ဂွခေါင်း</strong> နှစ်ခုစလုံးသည် အတွင်းပိုင်းတွင် <strong>M8 (၈ မီလီ)</strong> နတ်ချောင်းချည်းသာ ဖြစ်ပါသည်။
            </p>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              • <strong>ဂျပန်ကား/စက်များ (JIS):</strong> M8 နတ်ချောင်းကို ၁၂ ဂွခေါင်းဖြင့် ထုတ်လုပ်သည်။<br/>
              • <strong>ဥရောပကားများ (Scania, Volvo, Benz ISO):</strong> M8 နတ်ချောင်းကို ၁၃ ဂွခေါင်းဖြင့် ထုတ်လုပ်သည်။
            </p>
            <div className="text-xs text-amber-300 bg-stone-900/80 p-2.5 rounded-xl border border-stone-800">
              💡 <strong>ရလဒ်:</strong> Standard Grade 8.8 မာကျောမှုတွင် ၁၂ ဂွ နှင့် ၁၃ ဂွ နတ်နှစ်မျိုးစလုံးသည် <strong>၂၅ N·m (၁၈.၅ ပေါင်ခန့် / ft-lb)</strong> အညီအမျှ ကြပ်ရပါမည်!
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3 font-['Noto_Sans_Myanmar']">
            <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-400" />
              နတ်လိမ့်အား အမြန်တွက်နည်း သာမန်ဖော်မြူလာ:
            </h4>
            <div className="p-3 bg-stone-900 rounded-xl text-xs font-mono text-emerald-400 border border-stone-800 space-y-1">
              <div>T (Torque) = K × D × F</div>
              <div className="text-stone-400 text-[11px] font-sans">
                (D = နတ်အချင်း မီလီ၊ F = ဆွဲဆန့်ခံနိုင်မှုအင်အား၊ K = ပွတ်တိုက်မှုမြှောက်ဖော်ကိန်း 0.15~0.20)
              </div>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              ပေါင်ချိန်ဂွ (Torque Wrench) မရှိချိန် အကြမ်းဖျင်းမှတ်သားရန်:
              <br />
              • <strong>1 N·m = 0.738 ft-lb (ပေါင်)</strong>
              <br />
              • <strong>1 ft-lb (ပေါင်) = 1.356 N·m</strong>
            </p>
          </div>
        </div>

        {/* Navigation Tabs for Views */}
        <div className="flex flex-wrap items-center justify-center gap-2 bg-stone-950 p-1.5 rounded-2xl border border-stone-800 max-w-4xl mx-auto font-['Noto_Sans_Myanmar']">
          <button
            onClick={() => {
              setActiveTab('master');
              if (soundEnabled) playChime(600, 0.3);
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 min-w-[150px] ${
              activeTab === 'master'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/40'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>ဇယားကြီးတစ်ခုလုံး (All Master)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('single');
              if (soundEnabled) playChime(600, 0.3);
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 min-w-[150px] ${
              activeTab === 'single'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/40'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>ဂွဆိုက်တစ်ခုချင်း (Single)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('custom');
              if (soundEnabled) playChime(600, 0.3);
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 min-w-[150px] ${
              activeTab === 'custom'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/40'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>တိုက်ရိုက်တွက်စက် (Live Slider)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('formula');
              if (soundEnabled) playChime(650, 0.3);
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 min-w-[180px] ${
              activeTab === 'formula'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/40'
            }`}
          >
            <Binary className="w-4 h-4" />
            <span>T = K × F × d တွက်နည်း (Formula)</span>
          </button>
        </div>

        {/* TAB 1: ALL-IN-ONE MASTER TABLE VIEW & EXPORT */}
        {activeTab === 'master' && (
          <div className="space-y-6 font-['Noto_Sans_Myanmar'] animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-stone-100 flex items-center gap-2">
                  <Table className="w-5 h-5 text-amber-400" />
                  ၈ မီလီ မှ ၃၂ မီလီအထိ ဂွဆိုက်အားလုံး ပေါင်းစပ်ဇယားကြီး
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  ဤပုံကို သိမ်းဆည်းထားပါက ဂွဆိုက်နံပါတ်အားလုံး (၈ မှ ၃၂ အထိ) ပုံတစ်ပုံတည်းတွင် အကုန်ပါဝင်ပါမည်။
                </p>
              </div>

              <button
                id="save-master-chart-btn"
                onClick={handleSaveMasterChart}
                disabled={isSavingMasterImage}
                className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {isSavingMasterImage ? (
                  <>
                    <Loader2 className="w-4 h-4 text-stone-950 animate-spin" />
                    <span>ပုံထုတ်ယူနေပါသည်...</span>
                  </>
                ) : masterImageSaved ? (
                  <>
                    <Check className="w-4 h-4 text-stone-950" />
                    <span>ဇယားကြီး ပုံသိမ်းပြီးပါပြီ! (Saved)</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-stone-950" />
                    <span>ဇယားကြီးတစ်ခုလုံး ပုံသိမ်းမည် (Master Sheet PNG)</span>
                  </>
                )}
              </button>
            </div>

            {/* Printable Master Card Container */}
            <div
              id="bolt-torque-master-printable-card"
              className="p-4 sm:p-8 rounded-3xl bg-stone-950 border border-stone-800 space-y-6"
            >
              {/* Header inside the master exported image */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-800 pb-4 gap-2">
                <div>
                  <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider">
                    Full Metric Bolt Torque Master Reference Sheet
                  </span>
                  <h3 className="text-2xl font-black text-stone-100">
                    ဂွခေါင်းဆိုက်နှင့် နတ်လိမ့်အား (Torque) အပြည့်အစုံ ဇယားကြီး
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    (Standard Dry Thread • K=0.17 • 75% Proof Strength)
                  </p>
                </div>
                <div className="text-xs bg-stone-900 px-3 py-1.5 rounded-xl border border-stone-800 text-amber-300 font-mono">
                  1 N·m = 0.738 ft-lb (ပေါင်)
                </div>
              </div>

              {/* Master Full Table */}
              <div className="overflow-x-auto rounded-2xl border border-stone-800">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-stone-900 text-amber-300 font-bold border-b border-stone-800">
                    <tr>
                      <th className="py-3 px-3 sm:px-4 bg-amber-500/10 text-amber-300 font-black">ဂွဆိုက် (Socket)</th>
                      <th className="py-3 px-3 sm:px-4">နတ်ချောင်းအချင်း (Thread)</th>
                      <th className="py-3 px-3 sm:px-4">စံနှုန်း (Standard)</th>
                      <th className="py-3 px-3 sm:px-4 text-center bg-stone-950/60 border-l border-r border-stone-800">
                        <span className="text-amber-400 block font-black">Grade 8.8 (ရိုးရိုး)</span>
                        <span className="text-[10px] text-stone-400 font-normal">N·m / ပေါင် (ft-lb)</span>
                      </th>
                      <th className="py-3 px-3 sm:px-4 text-center bg-amber-500/10 border-r border-stone-800">
                        <span className="text-amber-300 block font-black">Grade 10.9 (သံမာ)</span>
                        <span className="text-[10px] text-stone-400 font-normal">N·m / ပေါင် (ft-lb)</span>
                      </th>
                      <th className="py-3 px-3 sm:px-4 text-center bg-emerald-500/10">
                        <span className="text-emerald-300 block font-black">Grade 12.9 (အလွန်မာ)</span>
                        <span className="text-[10px] text-stone-400 font-normal">N·m / ပေါင် (ft-lb)</span>
                      </th>
                      <th className="py-3 px-3 sm:px-4 text-stone-300 hidden md:table-cell">အသုံးများသည့်နေရာ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/80 text-stone-200">
                    {SOCKET_SPECS.map((spec, idx) => (
                      <tr
                        key={spec.socketSize}
                        className={`hover:bg-stone-900/60 transition-colors ${
                          idx % 2 === 0 ? 'bg-stone-950' : 'bg-stone-900/30'
                        }`}
                      >
                        <td className="py-3 px-3 sm:px-4 font-black text-amber-400 font-mono text-sm sm:text-base bg-amber-500/5">
                          {spec.socketSize} mm
                        </td>
                        <td className="py-3 px-3 sm:px-4 font-semibold text-stone-100 font-mono">
                          {spec.boltDiameter}
                        </td>
                        <td className="py-3 px-3 sm:px-4 text-xs text-stone-400">
                          {spec.standard}
                        </td>
                        
                        {/* Grade 8.8 Column */}
                        <td className="py-3 px-3 sm:px-4 text-center font-mono border-l border-r border-stone-800">
                          <span className="text-stone-100 font-bold">{spec.grade88TorqueNm} N·m</span>
                          <span className="block text-emerald-400 font-black text-xs sm:text-sm">({spec.grade88TorqueFtLb} ပေါင်)</span>
                        </td>

                        {/* Grade 10.9 Column */}
                        <td className="py-3 px-3 sm:px-4 text-center font-mono bg-amber-500/5 border-r border-stone-800">
                          <span className="text-amber-200 font-bold">{spec.grade109TorqueNm} N·m</span>
                          <span className="block text-amber-400 font-black text-xs sm:text-sm">({spec.grade109TorqueFtLb} ပေါင်)</span>
                        </td>

                        {/* Grade 12.9 Column */}
                        <td className="py-3 px-3 sm:px-4 text-center font-mono bg-emerald-500/5">
                          <span className="text-emerald-200 font-bold">{spec.grade129TorqueNm} N·m</span>
                          <span className="block text-emerald-300 font-black text-xs sm:text-sm">({spec.grade129TorqueFtLb} ပေါင်)</span>
                        </td>

                        <td className="py-3 px-3 sm:px-4 text-xs text-stone-400 hidden md:table-cell">
                          {spec.commonUsage}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Master Card Footnote */}
              <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 text-xs text-stone-300 flex flex-col sm:flex-row items-center justify-between gap-2">
                <div>
                  <strong>မှတ်ချက်:</strong> ၁၂ နှင့် ၁၃ ဂွဆိုက် နှစ်မျိုးစလုံးသည် အတွင်းပိုင်း ၈ မီလီ (M8) နတ်ချောင်းဖြစ်၍ ပေါင်ချိန် ၁၈.၅ ပေါင် (၂၅ N·m) အတူတူဖြစ်ပါသည်။
                </div>
                <div className="text-amber-400 font-bold">
                  Mingalaba Workshop Guide
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SINGLE SOCKET FOCUS CALCULATOR */}
        {activeTab === 'single' && (
          <div className="space-y-6 font-['Noto_Sans_Myanmar'] animate-in fade-in duration-300">
            {/* Interactive Selector & Image Download Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Socket Size Picker */}
              <div className="w-full sm:w-auto">
                <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-2">
                  ဂွခေါင်းဆိုက် (Socket Size) ရွေးချယ်ပါ:
                </span>
                <div className="flex flex-wrap gap-1.5 bg-stone-950 p-1.5 rounded-2xl border border-stone-800">
                  {SOCKET_SPECS.map((spec) => (
                    <button
                      key={spec.socketSize}
                      id={`single-socket-btn-${spec.socketSize}`}
                      onClick={() => handleSelectSocket(spec.socketSize)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedSocket === spec.socketSize
                          ? 'bg-amber-500 text-stone-950 shadow-md'
                          : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/60'
                      }`}
                    >
                      {spec.socketSize}mm ဂွ
                    </button>
                  ))}
                </div>
              </div>

              {/* Download Chart as PNG Image */}
              <button
                id="save-single-bolt-chart-btn"
                onClick={handleSaveSingleChart}
                disabled={isSavingSingleImage}
                className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {isSavingSingleImage ? (
                  <>
                    <Loader2 className="w-4 h-4 text-stone-950 animate-spin" />
                    <span>ပုံထုတ်ယူနေပါသည်...</span>
                  </>
                ) : singleImageSaved ? (
                  <>
                    <Check className="w-4 h-4 text-stone-950" />
                    <span>ပုံသိမ်းဆည်းပြီးပါပြီ! (Saved)</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-stone-950" />
                    <span>{selectedSocket}mm ကတ်ပြား ပုံသိမ်းမည် (PNG)</span>
                  </>
                )}
              </button>
            </div>

            {/* Printable Single Card Area */}
            <div id="bolt-torque-single-printable-card" className="p-6 sm:p-8 rounded-3xl bg-stone-950 border border-stone-800 space-y-6">
              
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
                <div>
                  <div className="text-xs font-mono uppercase text-amber-400 font-bold">Standard Metric Bolt Specifications</div>
                  <h3 className="text-2xl font-black text-stone-100 flex items-center gap-2">
                    <span>{currentSpec.socketSize} mm ဂွဆိုက်</span>
                    <span className="text-base font-normal text-stone-400">({currentSpec.boltDiameter})</span>
                  </h3>
                </div>

                {/* Bolt Grade Selector */}
                <div className="flex items-center gap-2 bg-stone-900 p-1 rounded-xl border border-stone-800">
                  <span className="text-xs text-stone-400 px-2">သံမာစံနှုန်း (Grade):</span>
                  {(['8.8', '10.9', '12.9'] as const).map((grade) => (
                    <button
                      key={grade}
                      onClick={() => {
                        setSelectedGrade(grade);
                        if (soundEnabled) playChime(600, 0.3);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        selectedGrade === grade
                          ? 'bg-amber-500 text-stone-950 shadow-sm'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      Grade {grade}
                    </button>
                  ))}
                </div>
              </div>

              {/* Big Torque Metrics Display */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 text-center space-y-1">
                  <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                    ကြပ်ပေးရမည့် လိမ့်အား (ပေါင် / ft-lb)
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-amber-400 font-mono tracking-tight">
                    {currentTorqueFtLb}
                  </div>
                  <div className="text-xs text-stone-300">ပေါင် (ft-lb / Foot-Pound)</div>
                </div>

                <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 text-center space-y-1">
                  <div className="text-xs text-stone-400 font-bold uppercase tracking-wider">
                    နယူတန် မီတာ (N·m)
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-stone-100 font-mono tracking-tight">
                    {currentTorqueNm}
                  </div>
                  <div className="text-xs text-stone-400">N·m (Newton Meter)</div>
                </div>

                <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 text-center space-y-1">
                  <div className="text-xs text-stone-400 font-bold uppercase tracking-wider">
                    ကီလိုဂရမ် မီတာ (kgf·m)
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-stone-100 font-mono tracking-tight">
                    {(currentTorqueNm * 0.10197).toFixed(1)}
                  </div>
                  <div className="text-xs text-stone-400">kgf·m (Kilogram-Force Meter)</div>
                </div>
              </div>

              {/* Full Specifications Table for Selected Bolt */}
              <div className="overflow-x-auto rounded-2xl border border-stone-800">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-stone-900 text-amber-300 font-bold border-b border-stone-800">
                    <tr>
                      <th className="py-3 px-4">သံရည်မာကြောမှု (Grade)</th>
                      <th className="py-3 px-4">နတ်ခေါင်းပေါ်ရှိ အမှတ်အသား</th>
                      <th className="py-3 px-4 text-amber-300 bg-amber-500/10">ကြပ်အား (N·m)</th>
                      <th className="py-3 px-4 text-emerald-300 bg-emerald-500/10">ကြပ်အား (ပေါင် / ft-lb)</th>
                      <th className="py-3 px-4 text-stone-300">အသုံးပြုသည့် အနေအထား</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-200">
                    <tr className={selectedGrade === '8.8' ? 'bg-amber-500/10' : ''}>
                      <td className="py-3.5 px-4 font-bold text-stone-100 font-mono">Grade 8.8 (Standard)</td>
                      <td className="py-3.5 px-4 text-stone-400 font-mono">နတ်ခေါင်းတွင် "8.8" သို့မဟုတ် မျဉ်း ၃ ကြောင်း</td>
                      <td className="py-3.5 px-4 font-bold text-amber-400 font-mono">{currentSpec.grade88TorqueNm} N·m</td>
                      <td className="py-3.5 px-4 font-black text-emerald-400 font-mono text-base">{currentSpec.grade88TorqueFtLb} ft-lb</td>
                      <td className="py-3.5 px-4 text-xs text-stone-300">အင်ဂျင်အပြင်ပိုင်း၊ ပိုက်လိုင်း၊ သာမန်ဘောလ်များ</td>
                    </tr>
                    <tr className={selectedGrade === '10.9' ? 'bg-amber-500/10' : ''}>
                      <td className="py-3.5 px-4 font-bold text-stone-100 font-mono">Grade 10.9 (High Tensile)</td>
                      <td className="py-3.5 px-4 text-stone-400 font-mono">နတ်ခေါင်းတွင် "10.9" သို့မဟုတ် မျဉ်း ၅ ကြောင်း</td>
                      <td className="py-3.5 px-4 font-bold text-amber-400 font-mono">{currentSpec.grade109TorqueNm} N·m</td>
                      <td className="py-3.5 px-4 font-black text-emerald-400 font-mono text-base">{currentSpec.grade109TorqueFtLb} ft-lb</td>
                      <td className="py-3.5 px-4 text-xs text-stone-300">ဆိုင်းဘုတ်၊ ဘရိတ်ကာလီပါ၊ အင်ဂျင်မောင့်တိန်များ</td>
                    </tr>
                    <tr className={selectedGrade === '12.9' ? 'bg-amber-500/10' : ''}>
                      <td className="py-3.5 px-4 font-bold text-stone-100 font-mono">Grade 12.9 (Extreme Strength)</td>
                      <td className="py-3.5 px-4 text-stone-400 font-mono">နတ်ခေါင်းတွင် "12.9" (အလွန်မာကျောသောအနက်)</td>
                      <td className="py-3.5 px-4 font-bold text-amber-400 font-mono">{currentSpec.grade129TorqueNm} N·m</td>
                      <td className="py-3.5 px-4 font-black text-emerald-400 font-mono text-base">{currentSpec.grade129TorqueFtLb} ft-lb</td>
                      <td className="py-3.5 px-4 text-xs text-stone-300">ဆလင်ဒါခေါင်း၊ ဖလိုင်းဝှီး၊ ခရိုင်းရှပ် ပူလီဘောလ်များ</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 text-xs text-stone-300 flex items-center justify-between">
                <div>
                  <strong>တွေ့ရလေ့ရှိသောနေရာ:</strong> {currentSpec.commonUsage}
                </div>
                <div className="text-amber-400 font-mono">
                  Thread Pitch: {currentSpec.threadPitch}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: LIVE CUSTOM BOLT CALCULATOR (Interactive Slider & Dial) */}
        {activeTab === 'custom' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-stone-950 border border-stone-800 space-y-6 font-['Noto_Sans_Myanmar'] animate-in fade-in duration-300">
            <div className="border-b border-stone-800 pb-4">
              <span className="text-xs font-mono uppercase text-amber-400 font-bold">Interactive Live Dial</span>
              <h3 className="text-2xl font-bold text-stone-100 flex items-center gap-2">
                <Sliders className="w-6 h-6 text-amber-400" />
                စိတ်ကြိုက် နတ်ချောင်းအချင်း (mm) တိုက်ရိုက် ရွှေ့ပြောင်းတွက်ချက်စက်
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                အောက်ပါ Slider ကို ဘယ်/ညာ ရွှေ့၍ မည်သည့် နတ်ချောင်းအချင်းအတွက်မဆို ပေါင်ချိန်ကို ချက်ချင်း တွက်ယူနိုင်ပါသည်။
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Controls Column */}
              <div className="space-y-6 bg-stone-900/60 p-6 rounded-2xl border border-stone-800">
                {/* Bolt Diameter Slider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-stone-200">
                      နတ်ချောင်း အချင်း (Bolt Thread Diameter):
                    </label>
                    <span className="text-2xl font-black text-amber-400 font-mono bg-stone-950 px-4 py-1 rounded-xl border border-amber-500/30">
                      M{customDiameterMm} ({customDiameterMm} mm)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={36}
                    step={1}
                    value={customDiameterMm}
                    onChange={(e) => {
                      setCustomDiameterMm(Number(e.target.value));
                      if (soundEnabled) playChime(400 + Number(e.target.value) * 15, 0.1);
                    }}
                    className="w-full accent-amber-500 h-3 bg-stone-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                    <span>M4 (4mm)</span>
                    <span>M8 (8mm)</span>
                    <span>M12 (12mm)</span>
                    <span>M16 (16mm)</span>
                    <span>M20 (20mm)</span>
                    <span>M24 (24mm)</span>
                    <span>M36 (36mm)</span>
                  </div>
                </div>

                {/* Grade Picker */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-200 block">
                    သံမာစံနှုန်း (Steel Hardness Grade):
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['8.8', '10.9', '12.9'] as const).map((grade) => (
                      <button
                        key={grade}
                        onClick={() => {
                          setCustomGrade(grade);
                          if (soundEnabled) playChime(650, 0.3);
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer text-center ${
                          customGrade === grade
                            ? 'bg-amber-500 text-stone-950 shadow-md scale-102'
                            : 'bg-stone-950 text-stone-300 border border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        Grade {grade}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Approximate Socket Recommendation */}
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-xs text-stone-300 space-y-1">
                  <div className="text-amber-400 font-bold flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5" />
                    ခန့်မှန်း အသုံးပြုရမည့် ဂွခေါင်းဆိုက်များ:
                  </div>
                  <div>
                    • ဂျပန်ကား/စက် (JIS): <strong>{customDiameterMm === 8 ? '12mm' : customDiameterMm === 10 ? '14mm' : customDiameterMm === 12 ? '17mm' : customDiameterMm === 14 ? '19/21mm' : customDiameterMm === 16 ? '22mm' : `${Math.round(customDiameterMm * 1.5)}mm`} ဂွခေါင်း</strong>
                  </div>
                  <div>
                    • ဥရောပကား/စက် (ISO): <strong>{customDiameterMm === 8 ? '13mm' : customDiameterMm === 10 ? '16/17mm' : customDiameterMm === 12 ? '18/19mm' : customDiameterMm === 14 ? '21/22mm' : customDiameterMm === 16 ? '24mm' : `${Math.round(customDiameterMm * 1.5)}mm`} ဂွခေါင်း</strong>
                  </div>
                </div>
              </div>

              {/* Live Output Gauge Column */}
              <div className="p-6 rounded-2xl bg-stone-900 border-2 border-amber-500/40 text-center space-y-4 shadow-xl">
                <div className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                  သတ်မှတ်ကြပ်ပေးရမည့် လိမ့်အား (Torque Result)
                </div>

                <div className="p-6 rounded-2xl bg-stone-950 border border-amber-500/30 space-y-2">
                  <div className="text-5xl sm:text-6xl font-black text-amber-400 font-mono tracking-tight animate-in zoom-in-95 duration-150">
                    {customTorqueResult.ftlb}
                  </div>
                  <div className="text-sm font-bold text-amber-200">
                    ပေါင် (ft-lb / Foot-Pounds)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                    <div className="text-2xl font-bold text-stone-100">{customTorqueResult.nm}</div>
                    <div className="text-[11px] text-stone-400">N·m (Newton Meters)</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                    <div className="text-2xl font-bold text-stone-100">{customTorqueResult.kgfm}</div>
                    <div className="text-[11px] text-stone-400">kgf·m (Kg-Force Meters)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: T = K * F * d STEP-BY-STEP FORMULA & CONVERSION CALCULATOR */}
        {activeTab === 'formula' && (
          <div className="animate-in fade-in duration-300">
            <TorqueFormulaCalculator soundEnabled={soundEnabled} />
          </div>
        )}

      </div>
    </section>
  );
};
