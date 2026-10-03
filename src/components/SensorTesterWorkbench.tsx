import React, { useState } from 'react';
import { 
  Download, 
  Camera, 
  Check, 
  Loader2, 
  Zap, 
  Cpu, 
  Sliders, 
  Layers, 
  Info, 
  Sparkles, 
  Eye, 
  Activity, 
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  X,
  RotateCcw
} from 'lucide-react';
import { playChime } from '../utils/audio';
import { downloadElementAsImage } from '../utils/imageExporter';

interface SensorTesterWorkbenchProps {
  soundEnabled: boolean;
}

type TabType = 'photo' | 'schematic' | 'simulator' | 'symbols';
type SensorSimulationType = 'tps' | 'map' | 'hall' | 'pot';

interface ComponentSymbolItem {
  id: string;
  name: string;
  burmeseName: string;
  code: string;
  symbol: string;
  packageType: string;
  polarityRule: string;
  role: string;
  pinout: { pin: string; function: string }[];
}

const COMPONENT_SYMBOLS: ComponentSymbolItem[] = [
  {
    id: 'diode',
    name: 'Diode',
    burmeseName: 'ဒိုင်အုတ် (နောက်ပြန်မီးကာကွယ်မှု)',
    code: '1N4007',
    symbol: '▶|— (Anode ➔ Cathode)',
    packageType: 'DO-41 Through-Hole',
    polarityRule: 'ကိုယ်ထည်ပေါ်က "ငွေရောင်ခေါင်းစည်း (Silver Band)" သည် Cathode (-) ဘက်ဖြစ်ပြီး မီးစီးထွက်သွားမည့် 7805 ဘက်သို့ လှည့်ရမည်။',
    role: '+12V နှင့် Ground မှားယွင်းချိတ်မိပါက ဆားကစ်ပြားနှင့် ဆန်ဆာများ လုံးဝမလောင်စေရန် အလိုအလျောက် မီးဖြတ်တောက်ပေးသည်။',
    pinout: [
      { pin: 'Anode (မည်းသောဘက်)', function: '+12V ဘက်ထရီ အနီကြိုး အဝင်' },
      { pin: 'Cathode (ငွေရောင်စင်းဘက်)', function: '100uH အင်ဒပ်တာကွိုင်ဆီသို့ မီးအထွက်' }
    ]
  },
  {
    id: 'regulator',
    name: 'Voltage Regulator IC',
    burmeseName: '၅ ဗို့ တည်ငြိမ်ဗို့အားထိန်း အိုင်စီ',
    code: 'L7805 CV',
    symbol: '[ IN | GND | OUT ]',
    packageType: 'TO-220 (အလူမီနီယမ် အပူခံပြားတပ်)',
    polarityRule: 'စာတန်းပါသော မျက်နှာစာကို မိမိဘက် လှည့်ကြည့်ပါက ဘယ်မှညာသို့ Pin 1, 2, 3 အစဉ်အတိုင်း ဖြစ်သည်။',
    role: 'ဘက်ထရီမှ မည်သည့်ဗို့အား (11V ~ 15V) ပဲ ဝင်လာပါစေ ဆန်ဆာများအတွက် အလွန်တိကျငြိမ်သက်သော +5.0V အတိအကျကို အမြဲတမ်း ထုတ်ပေးသည်။',
    pinout: [
      { pin: 'Pin 1 (ဘယ်ဘက်)', function: 'Input (+12V အဝင်မီးလိုင်း)' },
      { pin: 'Pin 2 (အလယ်ခေါင်)', function: 'Ground (ဘက်ထရီ အနှုတ်လိုင်း)' },
      { pin: 'Pin 3 (ညာဘက်)', function: 'Output (+5.0V တည်ငြိမ်မီးအထွက်)' }
    ]
  },
  {
    id: 'transistor',
    name: 'NPN Bipolar Transistor',
    burmeseName: 'အချက်ပြခလုတ်ဖွင့် ထရန်စစ္စတာ',
    code: 'BC547',
    symbol: 'NPN (C - B - E)',
    packageType: 'TO-92 (အမည်းခြမ်းဝိုင်း)',
    polarityRule: 'အပြားမျက်နှာစာကို မိမိဘက် လှည့်ကြည့်ပါက ဘယ်မှညာသို့ Collector, Base, Emitter အစဉ်အတိုင်း ဖြစ်သည်။',
    role: 'ဆန်ဆာဆီမှ အချက်ပြ Signal လာသည့်အခါ အလိုအလျောက် ခလုတ်ပွင့်ပေးပြီး LED စမ်းသပ်မီးသီးကို မီးလင်းစေသည်။',
    pinout: [
      { pin: 'Pin 1 (C - Collector)', function: 'LED မီးသီးနှင့် 330Ω ရေစစ္စတာသို့' },
      { pin: 'Pin 2 (B - Base အလယ်)', function: '10kΩ ခံပြီး ဆန်ဆာ Signal စမ်းသပ်ကြိုးသို့' },
      { pin: 'Pin 3 (E - Emitter)', function: 'Ground အနှုတ်လိုင်းသို့' }
    ]
  },
  {
    id: 'cap_elec',
    name: 'Electrolytic Capacitor',
    burmeseName: 'လျှပ်စစ်သို ကာပါစီတာ အကြီး',
    code: '10 µF (25V ~ 50V)',
    symbol: '—[|— (+ / - အစွန်းပါ)',
    packageType: 'Radial Can အဝိုင်းတောင့်',
    polarityRule: 'ကိုယ်ထည်ဘေးက "အဖြူရောင် အစင်းကြောင်းနှင့် အနှုတ်ပြထားသောဘက်" သည် အနှုတ် Ground သို့ မဖြစ်မနေ လှည့်ရမည် (မှားတပ်ပါက ပေါက်ကွဲတတ်သည်)။',
    role: 'ဘက်ထရီမှ ဝင်လာသော လျှပ်စစ်အားကို သိုလှောင်ထိန်းညှိပေးပြီး 7805 အဝင်တွင် ဗို့အား ရုတ်တရက် ကျဆင်းခြင်း မရှိစေရန် အကာအကွယ်ပေးသည်။',
    pinout: [
      { pin: 'ခြေထောက်ရှည် (+)', function: '12V အဝင်လိုင်းတွင် တပ်ပါ' },
      { pin: 'ခြေထောက်တို / အစင်းပါ (-)', function: 'Ground အနှုတ်လိုင်းသို့' }
    ]
  },
  {
    id: 'cap_ceramic',
    name: 'Ceramic Capacitor',
    burmeseName: 'ကြွေကာပါစီတာ အသေး (ဆူညံသံစစ်ထုတ်)',
    code: '100 nF (ကုဒ်နံပါတ်: 104)',
    symbol: '—||— (အပေါင်းအနှုတ် မခွဲပါ)',
    packageType: 'Ceramic Disc / Yellow Drop',
    polarityRule: 'အပေါင်းအနှုတ် မရှိပါ။ မည်သည့်ဘက်မဆို စိတ်ကြိုက် ပြောင်းပြန် တပ်ဆင်နိုင်သည်။',
    role: 'ဆန်ဆာဆီသို့ သွားမည့် 5V လိုင်းထဲရှိ မိုက်ခရို စက္ကန့်ပိုင်း လျှပ်စစ်တုန်ခါမှု (High Frequency Noise) များကို စစ်ထုတ်ပြီး အချက်ပြမမှားအောင် ချောမွေ့စေသည်။',
    pinout: [
      { pin: 'ခြေထောက် ၁', function: '+5.0V ထွက်ပေါက်လိုင်းသို့' },
      { pin: 'ခြေထောက် ၂', function: 'Ground အနှုတ်လိုင်းသို့' }
    ]
  },
  {
    id: 'inductor',
    name: 'Inductor Coil',
    burmeseName: 'အင်ဒပ်တာ လျှပ်စစ်ကွိုင်ခွေ',
    code: '100 µH',
    symbol: '∿∿∿∿ (Coil)',
    packageType: 'Axial / Toroid Coil',
    polarityRule: 'အပေါင်းအနှုတ် မရှိပါ။ စိတ်ကြိုက် တပ်ဆင်နိုင်သည်။',
    role: 'ဒိုင်နမို သို့မဟုတ် မီးပလပ်များကြောင့် ဖြစ်ပေါ်လာသည့် လျှပ်စစ်လှိုင်းဆောင့်တက်မှု (Voltage Spikes) များကို အဟန့်အတား ပြုလုပ်ပေးသည်။',
    pinout: [
      { pin: 'အဝင်ဘက်', function: 'ဒိုင်အုတ်မှ ထွက်လာသော မီး' },
      { pin: 'အထွက်ဘက်', function: '7805 Pin 1 အဝင်ဆီသို့' }
    ]
  },
  {
    id: 'potentiometer',
    name: 'Potentiometer',
    burmeseName: '၁၀ ကီလိုအုန်းမ် လက်လှည့်ခလုတ်',
    code: '10 kΩ Rotary Pot',
    symbol: '—[vvv]— (အလယ်မြှားပါ Variable Resistor)',
    packageType: '3-Pin Rotary Dial',
    polarityRule: 'ဘေး ၂ ပင်ကို 5V နှင့် Ground ပေးပြီး၊ အလယ်ပင်မှ ဗို့အား စိတ်ကြိုက် လှည့်ထုတ်သည်။',
    role: 'ဆန်ဆာယောင်ဆောင်ပြီး ECU ဆီသို့ 0.0V မှ 5.0V အထိ စိတ်ကြိုက် ဗို့အားထုတ်ပေးသည့် Signal Generator အဖြစ် အသုံးပြုနိုင်သည်။',
    pinout: [
      { pin: 'ဘယ်ဘက် Pin 1', function: '+5.0V လိုင်းသို့' },
      { pin: 'အလယ် Pin 2 (Wiper)', function: '0V ~ 5V ပြောင်းလဲထွက်မည့် Signal ကြိုးသို့' },
      { pin: 'ညာဘက် Pin 3', function: 'Ground အနှုတ်လိုင်းသို့' }
    ]
  },
  {
    id: 'voltmeter',
    name: 'Mini Digital Voltmeter',
    burmeseName: '၃ ကြိုးပါ ဒစ်ဂျစ်တယ် ဗို့မီတာ အသေးစား',
    code: '0.28" / 0.36" LED Display',
    symbol: '[ 5.00 V ]',
    packageType: '3-Wire Digital Module',
    polarityRule: 'အနီကြိုး = ပါဝါ (+), အနက်ကြိုး = Ground (-), အဝါ (သို့) အဖြူကြိုး = တိုင်းတာမည့် Signal ကြိုး။',
    role: 'ဆန်ဆာဆီမှ ထွက်လာသော ဗို့အားကို ဒိုင်ခွက်ပေါ်တွင် ဒစ်ဂျစ်တယ် ဂဏန်းလေးဖြင့် တိုက်ရိုက် ပြသပေးသည်။',
    pinout: [
      { pin: 'အနီကြိုး (Red)', function: 'မီတာဖွင့်ရန် +5V ပါဝါမီး' },
      { pin: 'အနက်ကြိုး (Black)', function: 'Ground အနှုတ်' },
      { pin: 'အဝါ/အဖြူကြိုး (Yellow)', function: 'တိုင်းတာမည့် ဆန်ဆာ Signal သို့' }
    ]
  }
];

export const SensorTesterWorkbench: React.FC<SensorTesterWorkbenchProps> = ({ soundEnabled }) => {
  const [activeTab, setActiveTab] = useState<TabType>('photo');
  const [selectedSensor, setSelectedSensor] = useState<SensorSimulationType>('tps');
  const [tpsPercent, setTpsPercent] = useState<number>(20);
  const [mapVacuum, setMapVacuum] = useState<number>(30); // 0 to 80 kPa
  const [potPercent, setPotPercent] = useState<number>(50); // 0 to 100%
  const [hallTriggered, setHallTriggered] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [selectedSymbolId, setSelectedSymbolId] = useState<string>('regulator');
  const [isZoomModalOpen, setIsZoomModalOpen] = useState<boolean>(false);
  const [zoomScale, setZoomScale] = useState<number>(1);

  // Calculate live simulator voltages
  const getSimulatedVoltage = (): number => {
    switch (selectedSensor) {
      case 'tps':
        // TPS typically 0.60V at idle to 4.50V at WOT
        return Number((0.60 + (tpsPercent / 100) * 3.90).toFixed(2));
      case 'map':
        // MAP: High atmospheric pressure (low vacuum) = 3.8V; High vacuum = 1.2V
        return Number((3.80 - (mapVacuum / 80) * 2.60).toFixed(2));
      case 'pot':
        return Number(((potPercent / 100) * 5.00).toFixed(2));
      case 'hall':
        return hallTriggered ? 5.00 : 0.05;
      default:
        return 5.00;
    }
  };

  const currentVoltage = getSimulatedVoltage();

  const handleTriggerHall = () => {
    if (soundEnabled) playChime(880, 0.15);
    setHallTriggered(true);
    setTimeout(() => {
      setHallTriggered(false);
    }, 400);
  };

  const handleDownloadCard = async () => {
    if (soundEnabled) playChime(640, 0.25);
    setIsSaving(true);
    setSaveSuccess(false);

    const success = await downloadElementAsImage(
      'sensor-tester-export-card',
      'diy-sensor-tester-workbench-catalog'
    );

    setIsSaving(false);
    if (success) {
      setSaveSuccess(true);
      if (soundEnabled) playChime(950, 0.4);
      setTimeout(() => setSaveSuccess(false), 3500);
    }
  };

  const activeSymbol = COMPONENT_SYMBOLS.find((s) => s.id === selectedSymbolId) || COMPONENT_SYMBOLS[1];

  return (
    <section className="max-w-6xl mx-auto px-4 py-6" id="sensor-tester-section">
      {/* Top Banner Card */}
      <div className="bg-stone-900/90 border border-amber-500/30 rounded-2xl p-5 shadow-2xl backdrop-blur-sm mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                DIY Electronics Workbench
              </span>
              <span className="text-xs text-stone-400 font-medium">ဝပ်ရှော့သုံး ဆန်ဆာစမ်းသပ်ခုံ</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-amber-100 tracking-tight">
              ဆန်ဆာစမ်းသပ်ဘုတ်ပြား သရုပ်ပြပုံနှင့် အစိတ်အပိုင်း သင်္ကေတများ
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
              ၁၂ ဗို့မှ တည်ငြိမ်သော ၅ ဗို့ထုတ်လုပ်ပေးသည့် ဆားကစ်ပြား တပ်ဆင်ပုံ၊ အစိတ်အပိုင်းများ၏ အပေါင်း/အနှုတ် လျှို့ဝှက်ချက်နှင့် စားပွဲပေါ်တွင် ဆန်ဆာများ စမ်းသပ်ပုံ သရုပ်ပြလမ်းညွှန်။
            </p>
          </div>

          {/* Export / Download Image Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDownloadCard}
              disabled={isSaving}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-all shadow-lg active:scale-95 ${
                saveSuccess
                  ? 'bg-emerald-600 text-stone-950 border border-emerald-400'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 border border-amber-300'
              }`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                  <span>ဓာတ်ပုံဖန်တီးနေသည်...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-stone-950 stroke-[3]" />
                  <span>သိမ်းဆည်းပြီးပါပြီ!</span>
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 text-stone-950" />
                  <span>ကတ်တလောက် ဓာတ်ပုံသိမ်းရန်</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* View Selection Tabs */}
        <div className="flex items-center gap-2 mt-5 border-t border-stone-800 pt-4 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => {
              if (soundEnabled) playChime(600, 0.15);
              setActiveTab('photo');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'photo'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>သရုပ်ပြ ဓာတ်ပုံကြီး (Visual Diagram)</span>
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playChime(600, 0.15);
              setActiveTab('schematic');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'schematic'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>ဆားကစ် ချိတ်ဆက်ပုံ (Layout Schematic)</span>
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playChime(600, 0.15);
              setActiveTab('simulator');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>လက်တွေ့ စမ်းသပ်ခန်း (Live Simulator)</span>
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playChime(600, 0.15);
              setActiveTab('symbols');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'symbols'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>ပစ္စည်း သင်္ကေတနှင့် ပင်နံပါတ်များ (Symbols)</span>
          </button>
        </div>
      </div>

      {/* Main Display Container that can be exported as an image */}
      <div
        id="sensor-tester-export-card"
        className="bg-stone-950 border border-stone-800 rounded-3xl p-4 sm:p-6 shadow-2xl relative"
      >
        {/* TAB 1: Real-life Generated Technical Visual Photo */}
        {activeTab === 'photo' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-base sm:text-lg font-bold text-amber-200">
                  တပ်ဆင်ထားသော စမ်းသပ်ဘုတ်ပြား လက်တွေ့ပုံစံ (Top-Down PCB View)
                </h3>
              </div>
              <button
                onClick={() => {
                  if (soundEnabled) playChime(700, 0.15);
                  setZoomScale(1.5);
                  setIsZoomModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>ပုံကြီးအကျယ်ချဲ့ကြည့်ရန် (Zoom)</span>
              </button>
            </div>

            {/* Generated Image Showcase - Completely unobstructed with NO badge covering it */}
            <div 
              onClick={() => {
                if (soundEnabled) playChime(700, 0.15);
                setZoomScale(1.5);
                setIsZoomModalOpen(true);
              }}
              className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-stone-900 group cursor-zoom-in"
              title="အကျယ်ချဲ့ကြည့်ရန် နှိပ်ပါ"
            >
              <img
                src="/sensor_tester_board.jpg"
                alt="DIY Automotive Sensor Tester PCB Board Diagram"
                className="w-full h-auto max-h-[580px] object-contain mx-auto transition-transform duration-300 group-hover:scale-[1.01]"
                loading="eager"
              />
              
              <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md border border-amber-500/40 px-2.5 py-1 rounded-lg text-[11px] text-amber-300 font-bold opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                <Maximize2 className="w-3 h-3" />
                <span>ချဲ့ကြည့်ရန် နှိပ်ပါ</span>
              </div>
            </div>

            {/* Explanatory Caption placed cleanly OUTSIDE and BELOW the image */}
            <div className="bg-stone-900/90 border border-amber-500/20 px-3.5 py-2.5 rounded-xl text-xs text-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-md">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="font-medium">+12V အဝင်မှ တည်ငြိမ်သော +5.0V ထုတ်ပေးပြီး မီတာဂဏန်းဖြင့် တိုက်ရိုက်တိုင်းတာပုံ</span>
              </div>
              <button
                onClick={() => {
                  if (soundEnabled) playChime(700, 0.15);
                  setZoomScale(2);
                  setIsZoomModalOpen(true);
                }}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 shrink-0 text-xs cursor-pointer ml-auto sm:ml-0"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>စာတန်းများ အသေးစိတ်ချဲ့ဖတ်ရန်</span>
              </button>
            </div>

            {/* Explanatory callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-stone-900/80 border border-stone-800 p-3 rounded-xl">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold mb-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  ပါဝါအဝင်လိုင်း (Left Side)
                </div>
                <p className="text-xs text-stone-300">
                  ၁၂ ဗို့ ဘက်ထရီကလစ် ချိတ်ဆက်ထားပြီး 1N4007 ဒိုင်အုတ်နှင့် ကာပါစီတာဖြင့် ဆားကစ်ပြားကို ကာကွယ်ထားသည်။
                </p>
              </div>

              <div className="bg-stone-900/80 border border-stone-800 p-3 rounded-xl">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  ဗို့အားထိန်းဇုန် (Center)
                </div>
                <p className="text-xs text-stone-300">
                  L7805 အလူမီနီယမ် အပူခံပြားတပ် အိုင်စီက မည်သည့်ဗို့အားမဆို တိကျသော +5.0V အဖြစ် ငြိမ်သက်စွာ ထိန်းပေးသည်။
                </p>
              </div>

              <div className="bg-stone-900/80 border border-stone-800 p-3 rounded-xl">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold mb-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  ဆန်ဆာစမ်းသပ်ဇုန် (Right Side)
                </div>
                <p className="text-xs text-stone-300">
                  ဒစ်ဂျစ်တယ် ဗို့မီတာ၊ BC547 အချက်ပြ မီးသီးနှင့် မိကျောင်းကလစ် (နီ/နက်/ဝါ) ၃ ချောင်းဖြင့် ဆန်ဆာကို ထိုးစမ်းသည်။
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Schematic Circuit Diagram & Step 1, 2, 3 Wiring Layout */}
        {activeTab === 'schematic' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-amber-200">
                ဆားကစ်ဘုတ်ပြား ဝါယာကြိုးနှင့် အစိတ်အပိုင်း ချိတ်ဆက်ပုံ (Layout Schematic)
              </h3>
              <span className="text-xs text-amber-400/90 font-mono">Dotted Board Wiring</span>
            </div>

            {/* Interactive Wiring Blueprint Box */}
            <div className="bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-inner font-mono text-xs">
              {/* Stage 1 */}
              <div className="border border-rose-500/30 bg-rose-950/20 rounded-xl p-3.5 mb-3">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-xs sm:text-sm mb-2 font-sans">
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-stone-950 flex items-center justify-center font-black text-xs">
                    ၁
                  </span>
                  အဆင့် (၁) — ပါဝါအဝင် ဘေးကင်းရေးလိုင်း
                </div>
                <div className="space-y-1 text-stone-300 leading-relaxed font-sans text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-rose-400 font-bold">[+12V အနီကြိုး]</span> ➔{' '}
                    <span className="text-amber-300 font-semibold">[1N4007 ဒိုင်အုတ် အနက်ဘက်]</span> ➔{' '}
                    <span className="text-stone-400">[ငွေရောင်စင်းဘက်]</span> ➔{' '}
                    <span className="text-cyan-300 font-semibold">[100uH ကွိုင်]</span> ➔ 7805 Pin 1 အဝင်
                  </div>
                  <div className="flex items-center gap-2 text-stone-400">
                    <span className="text-blue-400 font-bold">[10uF C1 ကာပါစီတာ]</span> : (+) ခြေထောက်ကို 12V လိုင်းတွင် တပ်ပြီး၊ (-) အစင်းဘက်ကို Ground အနှုတ်လိုင်းသို့ ဆက်ပါ။
                  </div>
                </div>
              </div>

              {/* Stage 2 */}
              <div className="border border-amber-500/30 bg-amber-950/20 rounded-xl p-3.5 mb-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs sm:text-sm mb-2 font-sans">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-black text-xs">
                    ၂
                  </span>
                  အဆင့် (၂) — 7805 IC ဖြင့် တည်ငြိမ်သော 5V ထုတ်လုပ်ခြင်း
                </div>
                <div className="space-y-1.5 text-stone-300 leading-relaxed font-sans text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1">
                    <div className="bg-stone-900/90 border border-stone-800 p-2 rounded-lg">
                      <span className="text-rose-400 font-bold">7805 Pin 1 (ဘယ်):</span>
                      <p className="text-stone-300 text-[11px] mt-0.5">ကွိုင်မှလာသော +12V မီးအဝင်</p>
                    </div>
                    <div className="bg-stone-900/90 border border-stone-800 p-2 rounded-lg">
                      <span className="text-stone-400 font-bold">7805 Pin 2 (အလယ်):</span>
                      <p className="text-stone-300 text-[11px] mt-0.5">ဘက်ထရီ အနှုတ် Ground လိုင်း</p>
                    </div>
                    <div className="bg-stone-900/90 border border-stone-800 p-2 rounded-lg">
                      <span className="text-emerald-400 font-bold">7805 Pin 3 (ညာ):</span>
                      <p className="text-stone-300 text-[11px] mt-0.5">+5.0V တည်ငြိမ်မီး ထွက်ပေါက်</p>
                    </div>
                  </div>
                  <div className="text-stone-400">
                    <span className="text-amber-300 font-semibold">[100nF C2 ကြွေကာပါစီတာ]</span> : 7805 Pin 3 နှင့် Ground ကြားတွင် ကန့်လန့်ဖြတ် ခံပေးပါ။
                  </div>
                </div>
              </div>

              {/* Stage 3 */}
              <div className="border border-emerald-500/30 bg-emerald-950/20 rounded-xl p-3.5">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs sm:text-sm mb-2 font-sans">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center font-black text-xs">
                    ၃
                  </span>
                  အဆင့် (၃) — အချက်ပြစမ်းသပ်မှုနှင့် ဒစ်ဂျစ်တယ် မော်နီတာ
                </div>
                <div className="space-y-1.5 text-stone-300 leading-relaxed font-sans text-xs">
                  <div>
                    <span className="text-cyan-400 font-bold">BC547 ထရန်စစ္စတာ ဆက်ပုံ:</span>
                    <span className="text-stone-300 ml-1">
                      Collector (ညာ) ➔ 330Ω + LED မီး ➔ 5V သို့ ချိတ်ပါ။ Base (အလယ်) ➔ 10kΩ ခံပြီး Signal ကလစ်သို့ ချိတ်ပါ။ Emitter (ဘယ်) ➔ Ground သို့ ဆက်ပါ။
                    </span>
                  </div>
                  <div className="pt-1 flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2 py-0.5 bg-rose-950/80 border border-rose-500/40 text-rose-300 rounded font-bold">
                      🔴 အနီရောင်ကလစ် = +5.0V Output
                    </span>
                    <span className="px-2 py-0.5 bg-stone-900 border border-stone-700 text-stone-300 rounded font-bold">
                      ⚫ အနက်ရောင်ကလစ် = Ground (-)
                    </span>
                    <span className="px-2 py-0.5 bg-amber-950/80 border border-amber-500/40 text-amber-300 rounded font-bold">
                      🟡 အဝါရောင်ကလစ် = Signal Probe (ဆန်ဆာအထွက်ဖတ်ရန်)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Interactive Bench Simulator */}
        {activeTab === 'simulator' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-amber-200">
                  စားပွဲပေါ်တွင် ဆန်ဆာများ လက်တွေ့စမ်းသပ်ခြင်း (Interactive Simulation)
                </h3>
                <p className="text-xs text-stone-400">
                  ဆန်ဆာအမျိုးအစား ရွေးချယ်ပြီး လီဗာလှည့်ခြင်း၊ လေစုပ်ခြင်းများ ပြုလုပ်ကြည့်ပါ
                </p>
              </div>
              <span className="text-xs bg-emerald-950 border border-emerald-500/40 text-emerald-300 px-2.5 py-1 rounded-md font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Circuit Active
              </span>
            </div>

            {/* Sensor Selection Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => {
                  if (soundEnabled) playChime(550, 0.15);
                  setSelectedSensor('tps');
                }}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedSensor === 'tps'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="text-xs font-black">TPS Sensor</div>
                <div className="text-[11px] text-stone-400 mt-0.5">လိပ်ပြာတံခါး ဆန်ဆာ</div>
              </button>

              <button
                onClick={() => {
                  if (soundEnabled) playChime(550, 0.15);
                  setSelectedSensor('map');
                }}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedSensor === 'map'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="text-xs font-black">MAP Sensor</div>
                <div className="text-[11px] text-stone-400 mt-0.5">လေဟာနယ် ဖိအားဆန်ဆာ</div>
              </button>

              <button
                onClick={() => {
                  if (soundEnabled) playChime(550, 0.15);
                  setSelectedSensor('hall');
                }}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedSensor === 'hall'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="text-xs font-black">Crank / Cam Hall</div>
                <div className="text-[11px] text-stone-400 mt-0.5">သံလိုက်စက်ကွင်း ဆန်ဆာ</div>
              </button>

              <button
                onClick={() => {
                  if (soundEnabled) playChime(550, 0.15);
                  setSelectedSensor('pot');
                }}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedSensor === 'pot'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="text-xs font-black">10kΩ Potentiometer</div>
                <div className="text-[11px] text-stone-400 mt-0.5">0V ~ 5V Signal Generator</div>
              </button>
            </div>

            {/* Interactive Workbench Cockpit */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-stone-900/90 border border-stone-800 p-4 sm:p-5 rounded-2xl">
              {/* Virtual Voltmeter Display */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-black rounded-2xl border-2 border-stone-800 shadow-2xl relative">
                <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1">
                  Digital Voltmeter Readout
                </div>
                <div className="font-mono font-black text-5xl sm:text-6xl text-cyan-400 tracking-wider py-2 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                  {currentVoltage.toFixed(2)}
                  <span className="text-2xl text-cyan-600 ml-1 font-bold">V</span>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-stone-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                    <span>+5.00V Power OK</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-150 ${
                        currentVoltage > 2.0
                          ? 'bg-amber-400 shadow-[0_0_10px_#f59e0b]'
                          : 'bg-stone-700'
                      }`}
                    />
                    <span>BC547 LED Indicator</span>
                  </div>
                </div>
              </div>

              {/* Interactive Controls according to Sensor */}
              <div className="md:col-span-7 flex flex-col justify-center space-y-3">
                {selectedSensor === 'tps' && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-amber-300 font-bold">လိပ်ပြာတံခါး ဝင်ရိုးလှည့်ခြင်း (TPS Opening):</span>
                      <span className="font-mono text-amber-400 font-bold">{tpsPercent}% ပွင့်သည်</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={tpsPercent}
                      onChange={(e) => setTpsPercent(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-stone-800 rounded-lg"
                    />
                    <div className="text-[11px] text-stone-400 leading-relaxed bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                      💡 <strong className="text-amber-200">ရောဂါရှာနည်း:</strong> လီဗာကို ဖြည်းဖြည်းချင်း လှည့်နေစဉ် ဗို့အားသည် <span className="text-cyan-300 font-mono">0.60V မှ 4.50V အထိ</span> တစ်သမတ်တည်း တက်သွားရမည်။ အကယ်၍ ကြားထဲတွင် 0V ဒုန်းခနဲ ပြုတ်ကျသွားပါက TPS ဆန်ဆာ ကာဗွန်လမ်းကြောင်း ပြတ်နေပါပြီ။
                    </div>
                  </div>
                )}

                {selectedSensor === 'map' && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-cyan-300 font-bold">လေဟာနယ် စုပ်အား (Vacuum Pressure):</span>
                      <span className="font-mono text-cyan-400 font-bold">{mapVacuum} kPa</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="80"
                      value={mapVacuum}
                      onChange={(e) => setMapVacuum(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer h-2 bg-stone-800 rounded-lg"
                    />
                    <div className="text-[11px] text-stone-400 leading-relaxed bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                      💡 <strong className="text-cyan-200">ရောဂါရှာနည်း:</strong> ဆေးထိုးပြွန်ဖြင့် လေစုပ်လိုက်သည်နှင့် ဗို့အားသည် <span className="text-cyan-300 font-mono">3.80V မှ 1.20V သို့</span> ချက်ချင်း အောက်သို့ ထိုးဆင်းသွားရပါမည်။ ဗို့အားမပြောင်းပါက ဆန်ဆာအတွင်း အမြှေးပါး ပေါက်နေခြင်း ဖြစ်သည်။
                    </div>
                  </div>
                )}

                {selectedSensor === 'hall' && (
                  <div className="space-y-2.5">
                    <div className="text-xs text-stone-300 font-semibold">
                      ကရိုင်း / ကင်ရှပ် Hall Sensor ထိပ်ကို သံချောင်းဖြင့် တို့ထိစမ်းသပ်ပါ —
                    </div>
                    <button
                      onClick={handleTriggerHall}
                      className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${
                        hallTriggered
                          ? 'bg-amber-400 text-stone-950 shadow-[0_0_20px_#f59e0b]'
                          : 'bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{hallTriggered ? 'သံချောင်း ထိစပ်နေသည်! (5.0V Pulse)' : 'သံချောင်းဖြင့် ထိုးကပ်ကြည့်ပါ (Tap Magnet)'}</span>
                    </button>
                    <div className="text-[11px] text-stone-400 leading-relaxed bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                      💡 <strong className="text-amber-200">ရောဂါရှာနည်း:</strong> ဆန်ဆာထိပ်ကို သံချောင်း သို့မဟုတ် ဂွလက်ကိုင်ဖြင့် အနားကပ်လိုက်သည်နှင့် ဘုတ်ပြားပေါ်ရှိ LED မီးသီးလေးသည် ချက်ချင်း မီးလင်းသွားပြီး ခွာလိုက်ပါက ပြန်ငြိမ်းသွားရပါမည်။
                    </div>
                  </div>
                )}

                {selectedSensor === 'pot' && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-emerald-300 font-bold">10kΩ Potentiometer လှည့်ထုတ်ခြင်း:</span>
                      <span className="font-mono text-emerald-400 font-bold">{potPercent}% ({(potPercent * 0.05).toFixed(2)}V)</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={potPercent}
                      onChange={(e) => setPotPercent(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer h-2 bg-stone-800 rounded-lg"
                    />
                    <div className="text-[11px] text-stone-400 leading-relaxed bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                      💡 <strong className="text-emerald-200">အသုံးချနည်း:</strong> ဤလက်လှည့်ခလုတ်ဖြင့် ကား ECU ဆီသို့ 0.0V မှ 5.0V အထိ စိတ်ကြိုက် ဗို့အားပေးပို့ပြီး ကားဒိုင်ခွက်ပေါ်က အပူချိန်တက်သလား၊ လီဗာတက်သလား စမ်းသပ်နိုင်သည်။
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Detailed Component Symbols, Pinouts & Polarity Catalog */}
        {activeTab === 'symbols' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-amber-200">
                  အစိတ်အပိုင်းများ၏ သင်္ကေတနှင့် အပေါင်း/အနှုတ် လျှို့ဝှက်ချက် (Component Pinouts)
                </h3>
                <p className="text-xs text-stone-400">
                  ပစ္စည်းတစ်ခုချင်းစီကို နှိပ်ပြီး ခြေထောက်နံပါတ်နှင့် မှန်ကန်စွာ တပ်ဆင်ပုံကို လေ့လာပါ
                </p>
              </div>
              <span className="text-xs bg-stone-900 border border-stone-800 px-2.5 py-1 rounded text-stone-300">
                8 Core Components
              </span>
            </div>

            {/* Quick Component Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {COMPONENT_SYMBOLS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (soundEnabled) playChime(700, 0.1);
                    setSelectedSymbolId(item.id);
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                    selectedSymbolId === item.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md'
                      : 'bg-stone-900/80 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-stone-200">{item.code}</div>
                    <div className="text-[11px] text-stone-400 truncate">{item.name}</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
                </button>
              ))}
            </div>

            {/* Detailed Selected Component Card */}
            <div className="bg-stone-900/90 border border-amber-500/40 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-amber-200">{activeSymbol.code}</span>
                    <span className="text-xs text-stone-400 font-mono">({activeSymbol.packageType})</span>
                  </div>
                  <div className="text-sm font-semibold text-amber-400">{activeSymbol.burmeseName}</div>
                </div>
                <div className="bg-stone-950 px-3 py-1.5 rounded-lg border border-stone-800 text-xs font-mono text-cyan-300 text-center">
                  သင်္ကေတ: {activeSymbol.symbol}
                </div>
              </div>

              {/* Polarity Rule - Crucial for avoiding blown parts */}
              <div className="bg-rose-950/20 border border-rose-500/40 p-3 rounded-xl">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300 mb-1">
                  <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>အပေါင်း/အနှုတ် နှင့် နေရာမမှားစေရန် လျှို့ဝှက်ချက် (Polarity Rule):</span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed font-medium">
                  {activeSymbol.polarityRule}
                </p>
              </div>

              {/* Pinout Details */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-stone-400">ခြေထောက်နံပါတ်နှင့် ဝါယာချိတ်ဆက်ပုံ (Pinout):</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeSymbol.pinout.map((pin, idx) => (
                    <div
                      key={idx}
                      className="bg-stone-950 border border-stone-800 p-2.5 rounded-xl flex items-center justify-between text-xs"
                    >
                      <span className="font-mono text-amber-300 font-bold">{pin.pin}</span>
                      <span className="text-stone-300 text-[11px]">{pin.function}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Functional Role */}
              <div className="text-xs text-stone-400 bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
                <strong className="text-stone-300">ဆားကစ်ပြားထဲတွင် တာဝန်ယူပုံ:</strong> {activeSymbol.role}
              </div>
            </div>
          </div>
        )}

        {/* Card Footer Stamp */}
        <div className="mt-5 pt-3 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-500">
          <div>DIY Automotive Sensor Bench Tester • 12V Battery to Stable 5.0V Regulator</div>
          <div className="font-mono text-amber-500/70 font-semibold">Protected with 1N4007 & L7805 CV</div>
        </div>
      </div>

      {/* Fullscreen High-Resolution Zoom Lightbox Modal */}
      {isZoomModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Header & Zoom Controls */}
          <div className="flex items-center justify-between px-4 py-3 bg-stone-950 border-b border-stone-800 text-stone-200 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div className="text-xs sm:text-sm font-bold text-amber-200">
                ဆားကစ်ဘုတ်ပြား အသေးစိတ် အကျယ်ချဲ့ကြည့်ရှုခန်း (Full Zoom Viewer)
              </div>
            </div>

            {/* Zoom Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => {
                  if (soundEnabled) playChime(600, 0.1);
                  setZoomScale((prev) => Math.max(0.8, Number((prev - 0.25).toFixed(2))));
                }}
                disabled={zoomScale <= 0.8}
                className="p-1.5 sm:p-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 disabled:opacity-40 cursor-pointer transition-all"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="font-mono text-xs font-bold text-amber-400 min-w-[50px] text-center px-1">
                {Math.round(zoomScale * 100)}%
              </span>

              <button
                onClick={() => {
                  if (soundEnabled) playChime(750, 0.1);
                  setZoomScale((prev) => Math.min(3.5, Number((prev + 0.25).toFixed(2))));
                }}
                disabled={zoomScale >= 3.5}
                className="p-1.5 sm:p-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 disabled:opacity-40 cursor-pointer transition-all"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (soundEnabled) playChime(650, 0.1);
                  setZoomScale(1);
                }}
                className="p-1.5 sm:p-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-400 hover:text-stone-200 cursor-pointer transition-all text-xs flex items-center gap-1"
                title="မူလအရွယ်အစား (Reset)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">1x</span>
              </button>

              <div className="h-4 w-px bg-stone-800 mx-1" />

              <button
                onClick={() => {
                  if (soundEnabled) playChime(500, 0.15);
                  setIsZoomModalOpen(false);
                  setZoomScale(1);
                }}
                className="p-1.5 sm:p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 cursor-pointer transition-all font-bold text-xs flex items-center gap-1"
                title="ပိတ်မည်"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">ပိတ်မည်</span>
              </button>
            </div>
          </div>

          {/* Subheader hint */}
          <div className="bg-stone-900/60 border-b border-stone-850 px-4 py-1.5 text-[11px] text-stone-400 text-center flex items-center justify-center gap-2">
            <span>💡 လက်ချောင်းဖြင့် ဆွဲရွှေ့ပြီး 1N4007၊ L7805၊ ကာပါစီတာနှင့် မီတာချိတ်ဆက်ပုံ စာတန်းများကို အနှောင့်အယှက်ကင်းရှင်းစွာ လွတ်လပ်စွာ လေ့လာနိုင်ပါသည်</span>
          </div>

          {/* Interactive Scrollable Canvas */}
          <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center cursor-grab active:cursor-grabbing select-none bg-[radial-gradient(#292524_1px,transparent_1px)] [background-size:16px_16px]">
            <div 
              style={{
                transform: `scale(${zoomScale})`,
                transformOrigin: 'center center',
                transition: 'transform 0.15s ease-out'
              }}
              className="inline-block max-w-none transition-transform"
            >
              <img
                src="/sensor_tester_board.jpg"
                alt="DIY Automotive Sensor Tester PCB Board Diagram - Full Zoom View"
                className="max-w-[90vw] max-h-[80vh] sm:max-h-[85vh] object-contain rounded-xl shadow-2xl border border-stone-700 bg-stone-900 pointer-events-auto"
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
