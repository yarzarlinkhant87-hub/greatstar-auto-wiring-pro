import React, { useState } from 'react';
import { Truck, AlertTriangle, CheckCircle2, BookOpen, Gauge, RefreshCw, Download, Check, Loader2 } from 'lucide-react';
import { playChime } from '../utils/audio';
import { downloadElementAsImage } from '../utils/imageExporter';

interface CumminsTimingProps {
  soundEnabled: boolean;
}

export const CumminsTimingGuide: React.FC<CumminsTimingProps> = ({ soundEnabled }) => {
  const [selectedEngine, setSelectedEngine] = useState<'isx' | 'nt855' | 'm11' | 'isb'>('isx');
  const [isSavingImage, setIsSavingImage] = useState<boolean>(false);
  const [imageSaved, setImageSaved] = useState<boolean>(false);

  const handleSaveCumminsCard = async () => {
    setIsSavingImage(true);
    const fileName = `cummins-${selectedEngine}-timing-specs-${Date.now()}.png`;
    const success = await downloadElementAsImage('cummins-printable-card', fileName);
    setIsSavingImage(false);
    if (success) {
      setImageSaved(true);
      if (soundEnabled) playChime(880, 0.8);
      setTimeout(() => setImageSaved(false), 3000);
    }
  };

  const engineData = {
    isx: {
      name: 'Cummins ISX / ISX15 / QSX15 (Double Overhead Cam)',
      fuelSystem: 'HPI-TP / XPI Unit Injectors (DOHC ကမ်ရှပ် ၂ ချောင်းစနစ်)',
      firingOrder: '1 - 5 - 3 - 6 - 2 - 4',
      intakeValve: '0.36 mm (0.014 in)',
      exhaustValve: '0.69 mm (0.027 in)',
      engineBrake: '7.0 mm (0.276 in) Jake Brake Clearance',
      injectorMethod: 'Zero-Lash / Bottoming Method + Angle Or In-lb Torque Method',
      injectorSettingDesc: 'နော်ဇယ်ဝက်အူကို အဆုံးထိ လက်ဖြင့်လှည့်ထောက်ပြီး (Zero-lash) မှ ၇၂ N·m (၈ ပေါင်ခန့် / in-lb) ကြပ်၍ သတ်မှတ် ဒီဂရီ ပြန်လျော့ကာ ချိန်သည့်စနစ် (Scania လို ဂိတ်တံ အမြင့်တိုင်းတာ မဟုတ်ပါ)။',
      lockNutTorque: '65 N·m (48 ပေါင် / ft-lb)',
      timingMarks: ['A (Cyl 1 & 6)', 'B (Cyl 2 & 5)', 'C (Cyl 3 & 4)'],
    },
    nt855: {
      name: 'Cummins NT855 / N14 (Big Cam / Small Cam)',
      fuelSystem: 'PT (Pressure-Time) Mechanical Unit Injectors',
      firingOrder: '1 - 5 - 3 - 6 - 2 - 4',
      intakeValve: '0.28 mm (0.011 in) [N14: 0.35 mm / 0.014 in]',
      exhaustValve: '0.58 mm (0.023 in) [N14: 0.68 mm / 0.027 in]',
      engineBrake: '0.58 mm (0.023 in)',
      injectorMethod: 'OBC Method (Dial Indicator အမြင့်တိုင်း) သို့မဟုတ် Inner Base Circle (IBC: 70-75 in-lb Torque Method)',
      injectorSettingDesc: 'Dial Gauge တံဖြင့် Pushrod Travel ကို တိုင်းတာချိန်ညှိခြင်း (OBC) သို့မဟုတ် Base Circle တွင် ၈ ပေါင် (70 in-lb) တင်းအားဖြင့် ထောက်၍ Locknut ပြန်ကြပ်သည့် စနစ်။',
      lockNutTorque: '60 N·m (45 ပေါင် / ft-lb)',
      timingMarks: ['1-6 VS (Valve Set)', '2-5 VS', '3-4 VS'],
    },
    m11: {
      name: 'Cummins M11 / ISM / QSM11',
      fuelSystem: 'CELECT Electronic Unit Injectors',
      firingOrder: '1 - 5 - 3 - 6 - 2 - 4',
      intakeValve: '0.36 mm (0.014 in)',
      exhaustValve: '0.69 mm (0.027 in)',
      engineBrake: '0.60 mm (0.024 in)',
      injectorMethod: 'Bottoming Out + Back off 2 turns (၂ ပတ် ပြန်လျော့နည်း)',
      injectorSettingDesc: 'နော်ဇယ်ချိန်ဝက်အူကို အဆုံးထိ ထောက်မိသည်အထိ လှည့်ပြီးနောက် ၂ ပတ် (2 Full Turns / 720°) အတိအကျ ပြန်လျော့ကာ Locknut ကြပ်ရပါသည်။',
      lockNutTorque: '60 N·m (45 ပေါင် / ft-lb)',
      timingMarks: ['A, B, C Pulley Timing Marks'],
    },
    isb: {
      name: 'Cummins 6BT / ISB 5.9 / ISB 6.7 (Common Rail)',
      fuelSystem: 'Bosch Common Rail / Rotary Inline Pump',
      firingOrder: '1 - 5 - 3 - 6 - 2 - 4',
      intakeValve: '0.25 mm (0.010 in)',
      exhaustValve: '0.51 mm (0.020 in)',
      engineBrake: 'N/A',
      injectorMethod: 'Common Rail အီလက်ထရွန်းနစ် နော်ဇယ်ဖြစ်၍ နော်ဇယ်ရော့ကာအာမ် ချိန်စရာမလိုပါ (ဗားကလီးရန့်သာ ချိန်ရသည်)',
      injectorSettingDesc: 'Common Rail နော်ဇယ်များတွင် စက်မှုရော့ကာအာမ် မပါဝင်သဖြင့် အင်တိတ်ဗား (0.25mm) နှင့် အိတ်ဇောဗား (0.51mm) ကိုသာ ချိန်ပေးရပါမည်။',
      lockNutTorque: '24 N·m (18 ပေါင် / ft-lb)',
      timingMarks: ['TDC Mark on Damper Pulley'],
    },
  };

  const curr = engineData[selectedEngine];

  return (
    <section id="cummins-section" className="py-8 sm:py-12 px-4 sm:px-6 bg-stone-950 border-b border-amber-500/20 text-stone-100">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Question Alert */}
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold shrink-0 text-xl shadow-lg">
              ❓
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-['Noto_Sans_Myanmar']">
                ကမ်းမင်း (Cummins) အင်ဂျင်ဆိုရင်ရော စကန်နီယာလိုပဲ ချိန်ရမှာလား?
              </h2>
              <p className="text-base sm:text-lg text-stone-200 leading-relaxed font-['Noto_Sans_Myanmar']">
                <strong>လုံးဝ မတူပါခင်ဗျာ။</strong> စကန်နီယာ (Scania) နှင့် ကမ်းမင်း (Cummins) အင်ဂျင်များသည် <strong>နော်ဇယ်ဖွဲ့စည်းပုံနှင့် ချိန်နည်းသဘောတရား လုံးဝကွဲပြား</strong> ပါသည်။
              </p>
            </div>
          </div>

          {/* Comparison Cards: Scania vs Cummins */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800">
              <div className="text-xs uppercase font-bold text-stone-400">Scania (စကန်နီယာ) နည်းလမ်း</div>
              <h4 className="text-lg font-bold text-amber-300 mt-1 font-['Noto_Sans_Myanmar']">
                အထူးဂိတ်တံ အမြင့်တိုင်းနည်း (Height Gauge Method)
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed font-['Noto_Sans_Myanmar']">
                Scania အထူးဂိတ်တံ (Tool 99414) ကိုသုံး၍ ဆလင်ဒါခေါင်းမျက်နှာပြင်မှ နော်ဇယ်ထိပ်အထိ အမြင့် <strong>66.9 mm</strong> ကို တိုက်ရိုက်တိုင်းတာချိန်ညှိပါသည်။
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/40">
              <div className="text-xs uppercase font-bold text-amber-400">Cummins (ကမ်းမင်း) နည်းလမ်း</div>
              <h4 className="text-lg font-bold text-amber-200 mt-1 font-['Noto_Sans_Myanmar']">
                အဆုံးထောက်၍ ပေါင်ချိန်နည်း သို့မဟုတ် ပြန်လျော့နည်း (Zero-Lash / Torque / Back-off)
              </h4>
              <p className="text-xs sm:text-sm text-stone-200 mt-2 leading-relaxed font-['Noto_Sans_Myanmar']">
                ကမ်းမင်းတွင် မော်ဒယ်အလိုက် <strong>အဆုံးထိထောက်ပြီး ၇၂ in-lb ကြပ်နည်း</strong> (ISX)၊ <strong>အဆုံးထိထောက်ပြီး ၂ ပတ် ပြန်လျော့နည်း</strong> (M11/ISM) သို့မဟုတ် <strong>Dial Indicator (OBC)</strong> ဖြင့် ချိန်ရပါသည်။
              </p>
            </div>
          </div>
        </div>

        {/* Engine Model Selector & Download Button */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
            <h3 className="text-xl font-bold text-stone-100 font-['Noto_Sans_Myanmar'] flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-400" />
              ကမ်းမင်း (Cummins) အင်ဂျင်မော်ဒယ်အလိုက် တိုက်ပစ်ချိန်နည်း လမ်းညွှန်
            </h3>
            
            <button
              id="save-cummins-image-btn"
              onClick={handleSaveCumminsCard}
              disabled={isSavingImage}
              className="px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 active:scale-95 cursor-pointer disabled:opacity-50 font-['Noto_Sans_Myanmar']"
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
                  <span>Cummins ချိန်နည်းဇယားကို ပုံသိမ်းမည် (PNG)</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-stone-900 p-1.5 rounded-2xl border border-stone-800">
            <button
              onClick={() => {
                setSelectedEngine('isx');
                if (soundEnabled) playChime(600, 0.4);
              }}
              className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedEngine === 'isx' ? 'bg-amber-500 text-stone-950 shadow-md' : 'text-stone-400 hover:text-white'
              }`}
            >
              Cummins ISX / ISX15
            </button>
            <button
              onClick={() => {
                setSelectedEngine('nt855');
                if (soundEnabled) playChime(600, 0.4);
              }}
              className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedEngine === 'nt855' ? 'bg-amber-500 text-stone-950 shadow-md' : 'text-stone-400 hover:text-white'
              }`}
            >
              NT855 / N14 (Big Cam)
            </button>
            <button
              onClick={() => {
                setSelectedEngine('m11');
                if (soundEnabled) playChime(600, 0.4);
              }}
              className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedEngine === 'm11' ? 'bg-amber-500 text-stone-950 shadow-md' : 'text-stone-400 hover:text-white'
              }`}
            >
              M11 / ISM / QSM11
            </button>
            <button
              onClick={() => {
                setSelectedEngine('isb');
                if (soundEnabled) playChime(600, 0.4);
              }}
              className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedEngine === 'isb' ? 'bg-amber-500 text-stone-950 shadow-md' : 'text-stone-400 hover:text-white'
              }`}
            >
              6BT / ISB (Common Rail)
            </button>
          </div>
        </div>

        {/* Selected Cummins Engine Details (Printable Card) */}
        <div id="cummins-printable-card" className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 font-bold">{curr.fuelSystem}</span>
              <h3 className="text-2xl font-bold text-amber-100 font-['Noto_Sans_Myanmar'] mt-1">{curr.name}</h3>
            </div>
            <div className="text-xs bg-stone-950 px-3 py-1.5 rounded-xl border border-stone-800 font-mono text-stone-300">
              Firing Order: {curr.firingOrder}
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
              <div className="text-xs text-amber-400 font-semibold mb-1 font-['Noto_Sans_Myanmar']">အင်တိတ်ဗား (Intake)</div>
              <div className="text-2xl font-black text-stone-100 font-mono">{curr.intakeValve}</div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
              <div className="text-xs text-amber-400 font-semibold mb-1 font-['Noto_Sans_Myanmar']">အိတ်ဇောဗား (Exhaust)</div>
              <div className="text-2xl font-black text-stone-100 font-mono">{curr.exhaustValve}</div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
              <div className="text-xs text-amber-400 font-semibold mb-1 font-['Noto_Sans_Myanmar']">ဂျိတ်ဘရိတ် (Jake Brake)</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">{curr.engineBrake}</div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
              <div className="text-xs text-amber-400 font-semibold mb-1 font-['Noto_Sans_Myanmar']">နော့နတ်လိမ်အား (Locknut)</div>
              <div className="text-2xl font-black text-amber-300 font-mono">{curr.lockNutTorque}</div>
            </div>
          </div>

          {/* Injector Method Explanation for selected engine */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 font-['Noto_Sans_Myanmar']">
            <h4 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              {curr.name} အတွက် နော်ဇယ်ချိန်နည်း သီးသန့်စည်းမျဉ်း:
            </h4>
            <p className="text-sm text-stone-200 leading-relaxed">
              {curr.injectorSettingDesc}
            </p>
          </div>

          {/* Step by Step Details for Popular Cummins ISX & N14 */}
          {selectedEngine === 'isx' && (
            <div className="space-y-3 font-['Noto_Sans_Myanmar'] text-sm text-stone-300">
              <h4 className="font-bold text-amber-200 text-base">🔧 Cummins ISX အင်ဂျင် နော်ဇယ်နှင့် ဗား ချိန်နည်း အဆင့်ဆင့်:</h4>
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <p>၁။ <strong>Pully Marks (A, B, C):</strong> ပူလီပေါ်ရှိ <strong>A</strong> အမှတ်ကို အင်ဂျင်အဖုံး အမှတ်အသားနှင့် တည့်အောင်ချိန်ပါ။ (ဆလင်ဒါ ၁ နှင့် ၆ အတွဲ)။</p>
                <p>၂။ <strong>ဆလင်ဒါ စစ်ဆေးခြင်း:</strong> နံပါတ် ၁ ဆလင်ဒါ ကွန်ပရက်ရှင် ဖြစ်နေပါက နံပါတ် ၁ အင်တိတ်/အိတ်ဇောဗားနှင့် နံပါတ် ၁ နော်ဇယ်ကို ချိန်ပါ။</p>
                <p>၃။ <strong>နော်ဇယ်ချိန်နည်း (ISX):</strong> ချိန်ဝက်အူကို အောက်ခြေအထိ လက်ဖြင့် အဆုံးထောက်လှည့်ပါ။ ပြီးလျှင် In-lb Torque Wrench ဖြင့် <strong>72 in-lb (8 N·m)</strong> ကြပ်၍ သတ်မှတ် ဒီဂရီ (သို့မဟုတ် လော့နတ် ၄၅ ပေါင်) ဖြင့် ကြပ်ပါ။</p>
                <p>၄။ <strong>ဗားကလီးရန့်:</strong> အင်တိတ်ဗား <strong>0.36 mm (0.014")</strong>၊ အိတ်ဇောဗား <strong>0.69 mm (0.027")</strong> ထည့်ချိန်ပါ။</p>
                <p>၅။ ထို့နောက် ပူလီကို <strong>B</strong> (ဆလင်ဒါ ၂ နှင့် ၅)၊ <strong>C</strong> (ဆလင်ဒါ ၃ နှင့် ၄) အမှတ်များသို့ ဆက်တိုက်လှည့်၍ ကျန်ဆလင်ဒါများကို ချိန်ပါ။</p>
              </div>
            </div>
          )}

          {selectedEngine === 'm11' && (
            <div className="space-y-3 font-['Noto_Sans_Myanmar'] text-sm text-stone-300">
              <h4 className="font-bold text-amber-200 text-base">🔧 Cummins M11 / ISM အင်ဂျင် နော်ဇယ် ၂ ပတ် ပြန်လျော့နည်း (2-Turn Method):</h4>
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <p>၁။ သက်ဆိုင်ရာ ဆလင်ဒါ အမှတ်တည့်ချိန်တွင် နော်ဇယ်ရော့ကာအာမ် ချိန်ဝက်အူကို <strong>အဆုံးထိ (Bottom Out)</strong> ရောက်သည်အထိ တင်းတင်းလှည့်ပါ။</p>
                <p>၂။ အောက်ခြေထိသွားပြီဖြစ်ပါက ချိန်ဝက်အူကို <strong>အတိအကျ ၂ ပတ်ပြည့် (2 Full Turns / 720°)</strong> ပြန်လျော့ (Back off) ပေးပါ။</p>
                <p>၃။ ထိုအနေအထားတွင် ဝက်အူမရွေ့စေဘဲ Locknut ကို <strong>60 N·m (၄၅ ပေါင်)</strong> တင်းအားဖြင့် ကြပ်ပေးပါ။</p>
              </div>
            </div>
          )}

          {selectedEngine === 'nt855' && (
            <div className="space-y-3 font-['Noto_Sans_Myanmar'] text-sm text-stone-300">
              <h4 className="font-bold text-amber-200 text-base">🔧 Cummins NT855 / N14 (Big Cam) နော်ဇယ်ချိန်နည်း (IBC / Torque Method):</h4>
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <p>၁။ ဖလိုင်းဝှီးပေါ်ရှိ <strong>1-6 VS, 2-5 VS, 3-4 VS</strong> အမှတ်များတွင် ချိန်ရပါသည်။</p>
                <p>၂။ <strong>IBC (Inner Base Circle) နည်းလမ်း:</strong> နော်ဇယ်ရော့ကာအာမ်ကို In-lb Torque Wrench ဖြင့် <strong>70 – 75 in-lb (၈ N·m ခန့်)</strong> ဖြင့် ဆွဲကြပ်ထောက်ပြီး Locknut ကို <strong>45 ပေါင်</strong> ဖြင့် ပြန်ကြပ်ပါသည်။</p>
                <p>၃။ (OBC နည်းလမ်းတွင် Dial Indicator တံဖြင့် Travel အကွာအဝေးကို အတိအကျ တိုင်းတာချိန်ညှိပါသည်)။</p>
              </div>
            </div>
          )}

        </div>

        {/* Major Takeaway Warning */}
        <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-800/40 text-stone-200 font-['Noto_Sans_Myanmar'] flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm space-y-1 leading-relaxed">
            <strong className="text-rose-300 block font-bold">ဝပ်ရှော့ဆရာများအတွက် အဓိက သတိပေးချက်:</strong>
            <p>• Scania (စကန်နီယာ) ၏ <strong>66.9 mm ဂိတ်တံ</strong> ကို Cummins (ကမ်းမင်း) အင်ဂျင်များတွင် <strong>လုံးဝ အသုံးပြု၍ မရပါ</strong>။</p>
            <p>• Cummins အင်ဂျင်များတွင် မိမိပြင်ဆင်နေသော အင်ဂျင်မော်ဒယ် (ISX လား၊ N14 လား၊ M11 လား၊ Common Rail လား) ကို အရင်စစ်ဆေးပြီး သက်ဆိုင်ရာ နည်းလမ်း (Torque / 2-Turn / Dial gauge) ဖြင့်သာ တိကျစွာ ချိန်ညှိရပါမည်။</p>
          </div>
        </div>

      </div>
    </section>
  );
};
