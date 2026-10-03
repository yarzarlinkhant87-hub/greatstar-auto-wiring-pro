export type DtcSystem = 'P' | 'C' | 'B' | 'U';

export type DtcFaultType = 
  | 'circuit_high'       // Open Circuit / 5V pullup / ကြိုးပြတ်
  | 'circuit_low'        // Short to Ground / 0V / ကိုယ်ထည်ရှော့
  | 'range_performance' // Irrational data / စံချိန်ကျော်လွန်
  | 'mechanical_misfire' // Misfire / mechanical / catalytic
  | 'network_lost';      // Communication break / CAN-bus

export interface DtcItem {
  id: string;
  code: string;
  system: DtcSystem;
  systemLabelMy: string;
  faultType: DtcFaultType;
  faultTypeLabelMy: string;
  nameEn: string;
  nameMy: string;
  meaningMy: string;
  wireCause: string;
  voltageCheck: string;
  proDiagnosticTip: string;
  symptoms: string[];
  commonCars: string;
  severity: 'critical' | 'warning' | 'info';
}

export const DTC_MASTER_DATA: DtcItem[] = [
  // --- ENGINE COOLANT TEMP (ECT) ---
  {
    id: 'dtc-p0117',
    code: 'P0117',
    system: 'P',
    systemLabelMy: 'အင်ဂျင်/ဂီယာ (Powertrain)',
    faultType: 'circuit_low',
    faultTypeLabelMy: '⚡ Circuit Low (Short to Ground / ကိုယ်ထည်ရှော့)',
    nameEn: 'Engine Coolant Temperature Circuit Low Input',
    nameMy: 'အင်ဂျင်ရေဆန်ဆာ ဗို့အားနိမ့်ကျခြင်း (ကိုယ်ထည်ရှော့ကျ)',
    meaningMy: 'ECT အင်ဂျင်ရေဆန်ဆာ Signal လိုင်းသည် ဗို့အား 0.15V အောက် (0V နီးပါး) သို့ ထိုးကျသွားကြောင်း ECU က သတင်းပို့ခြင်း ဖြစ်သည်။',
    wireCause: 'ဆန်ဆာ Signal ဝါယာကြိုးသည် ကားကိုယ်ထည် သံဘောင်နှင့် ပွတ်တိုက်ပြီး Ground Short ကျနေခြင်း သို့မဟုတ် ဆန်ဆာအတွင်းပိုင်း ကွိုင်ရှော့ဖြစ်ခြင်း။',
    voltageCheck: 'Backprobing ထိုးတိုင်းပါက Signal ကြိုးတွင် 0V ပြနေမည်။ ပလပ်ဖြုတ်လိုက်ပါက ECU ဘက်မှ 5V Reference မီး ပြန်တက်လာရမည်။',
    proDiagnosticTip: 'ဆန်ဆာပလပ်ကို လက်ဖြင့် ဖြုတ်လိုက်ပါ! အကယ်၍ စကင်နာတွင် P0118 (Circuit High) သို့ ပြောင်းသွားပါက ဝါယာကြိုးကောင်းသည်၊ ဆန်ဆာအတွင်းပိုင်း ရှော့ဖြစ်၍ ဆန်ဆာလဲရမည်။ ပလပ်ဖြုတ်ထားသော်လည်း P0117 အတိုင်း ဆက်ပြနေပါက ဝါယာကြိုးခွေ လမ်းခုလတ်တွင် ကိုယ်ထည်နှင့် ပွတ်ရှော့ကျနေခြင်း ဖြစ်သည်။',
    symptoms: ['အင်ဂျင်အေးနေချိန် စက်နှိုးရခက်ခြင်း', 'ရေတိုင်ကီ ပန်ကာ မရပ်မနား တောက်လျှောက် အပြင်းလည်နေခြင်း', 'ဆီစား အလွန်များခြင်း (ဆီထူ)'],
    commonCars: 'Toyota, Honda, Nissan, Mazda, Mitsubishi',
    severity: 'warning'
  },
  {
    id: 'dtc-p0118',
    code: 'P0118',
    system: 'P',
    systemLabelMy: 'အင်ဂျင်/ဂီယာ (Powertrain)',
    faultType: 'circuit_high',
    faultTypeLabelMy: '⚡ Circuit High (Open Circuit / ကြိုးပြတ် / ပလပ်ကျွတ်)',
    nameEn: 'Engine Coolant Temperature Circuit High Input',
    nameMy: 'အင်ဂျင်ရေဆန်ဆာ ဗို့အားမြင့်တက်ခြင်း (ကြိုးပြတ် / ပလပ်ကျွတ်)',
    meaningMy: 'ECT ဆန်ဆာ ပတ်လမ်း ပြတ်တောက်နေသဖြင့် ECU အတွင်းရှိ 5V Pull-up မီးသည် အပြည့်ဖြစ်နေပြီး စကင်နာတွင် ရေအပူချိန် "-40°C" ဟု အလွန်အေးနေသယောင် ပြနေခြင်း ဖြစ်သည်။',
    wireCause: 'ဆန်ဆာပလပ် ခေါင်းကျွတ်နေခြင်း၊ ဝါယာကြိုး ပြတ်တောက်ခြင်း (Open) သို့မဟုတ် ဆန်ဆာအတွင်းပိုင်း Thermistor လိုင်းပြတ်သွားခြင်း။',
    voltageCheck: 'ဆန်ဆာပလပ်ခေါင်းတွင် 5.0V Reference မီး ရှိ/မရှိ စစ်ပါ။ အကယ်၍ 5V ရှိပြီး ဆန်ဆာထိုးလိုက်သော်လည်း 5V မှ မဆင်းပါက ဆန်ဆာ လဲရမည်။',
    proDiagnosticTip: 'ဆန်ဆာပလပ်ရှိ Signal ပင်နှင့် Ground ပင်ကို ဂျမ်ပါဝါယာကြိုးတိုလေးဖြင့် ခေတ္တ ထိကပ် (Short) ပေးကြည့်ပါ! စကင်နာတွင် P0117 (Circuit Low) သို့ ပြောင်းသွားပါက ECU နှင့် ဝါယာကြိုး ၁၀၀% ကောင်းသည်၊ ဆန်ဆာသာ ပျက်နေခြင်း ဖြစ်သည်။',
    symptoms: ['စကင်နာတွင် ရေအပူချိန် -40°C ဟု ပြနေခြင်း', 'အင်ဂျင်ရေဆူသည့်တိုင်အောင် ပန်ကာ လုံးဝ မလည်တော့ခြင်း', 'အိပ်ဇောမှ မီးခိုးမည်းများ ထွက်ခြင်း'],
    commonCars: 'Toyota, Lexus, Honda, Nissan, Subaru',
    severity: 'critical'
  },
  {
    id: 'dtc-p0116',
    code: 'P0116',
    system: 'P',
    systemLabelMy: 'အင်ဂျင်/ဂီယာ (Powertrain)',
    faultType: 'range_performance',
    faultTypeLabelMy: '⚙️ Range / Performance (စံချိန်မမှန် / ဆန်ဆာလွဲမှား)',
    nameEn: 'Engine Coolant Temperature Circuit Range/Performance',
    nameMy: 'အင်ဂျင်ရေဆန်ဆာ စံချိန်မမှန်ခြင်း (တန်ဖိုးလွဲမှား)',
    meaningMy: 'ဆန်ဆာလည်းမသေ၊ ကြိုးလည်းမပြတ်သော်လည်း အင်ဂျင်လည်ပတ်နေသည့် အချိန်နှင့် ရေအပူချိန်တက်နှုန်း မကိုက်ညီဘဲ ကွန်ပျူတာက သံသယဖြစ်ဖွယ် တွေ့ရှိခြင်း ဖြစ်သည်။',
    wireCause: 'ဝါယာကြိုးချို့ယွင်းချက် မဟုတ်ဘဲ သာမိုစတက် (Thermostat) ရေအပူထိန်းဗား ပွင့်လျက် ဂျမ်းဖြစ်နေခြင်း သို့မဟုတ် ဆန်ဆာ တုံ့ပြန်မှု နှေးကွေးခြင်း။',
    voltageCheck: 'အင်ဂျင်အေးချိန်တွင် ၂.၅ ဗို့ခန့်ရှိပြီး စက်နှိုးထားစဉ် အပူချိန်တက်လာသည်နှင့် ဗို့အား တဖြည်းဖြည်းချင်း ၀.၅ ဗို့အထိ ဆင်းမဆင်း Multimeter ဖြင့် စောင့်ကြည့်ပါ။',
    proDiagnosticTip: 'စက်နှိုးပြီး ၁၅ မိနစ်ကြာ မောင်းသော်လည်း ဒိုင်ခွက် အပူချိန်လက်တံ အောက်ဆုံးတွင်သာ ငြိမ်နေပါက သာမိုစတက် (Thermostat) ပွင့်လျက်သား ဖြစ်နေ၍ အသစ်လဲပေးရမည်။',
    symptoms: ['အဝေးပြေး မောင်းနှင်ချိန် ဒိုင်ခွက် အပူချိန် ပြန်ကျသွားခြင်း', 'ကားအဲကွန်း ဟီတာ မနွေးတော့ခြင်း', 'ဆီစားများခြင်း'],
    commonCars: 'Toyota, Honda Civic/CR-V, Nissan X-Trail',
    severity: 'warning'
  },

  // --- MASS AIR FLOW (MAF) ---
  {
    id: 'dtc-p0102',
    code: 'P0102',
    system: 'P',
    systemLabelMy: 'အင်ဂျင်/ဂီယာ (Powertrain)',
    faultType: 'circuit_low',
    faultTypeLabelMy: '⚡ Circuit Low (Short to Ground / ဗို့အားနိမ့်)',
    nameEn: 'Mass or Volume Air Flow Circuit Low Input',
    nameMy: 'လေဆန်ဆာ (MAF) ဗို့အားနိမ့်ကျခြင်း',
    meaningMy: 'MAF လေဆန်ဆာမှ ထွက်သော လေထုထည် အချက်ပြဗို့အားသည် သတ်မှတ်ထားသော စံချိန်အောက် လျော့နည်းနေခြင်း (0.5V အောက် ထိုးကျနေခြင်း) ဖြစ်သည်။',
    wireCause: 'Signal ဝါယာကြိုး ကိုယ်ထည်နှင့် ပွတ်တိုက်ရှော့ကျခြင်း သို့မဟုတ် MAF ဆန်ဆာ ပလက်တီနမ်ဝါယာကြိုး ပြတ်တောက်သွားခြင်း။',
    voltageCheck: 'MAF ပလပ်တွင် +12V ပါဝါ၊ ကွန်ပျူတာ Ground၊ 5V VREF အားလုံး စုံ/မစုံ စစ်ပါ။ Signal ကြိုးသည် စလိုးတွင် 1.0V~1.4V ရှိရမည်။',
    proDiagnosticTip: 'ဆန်ဆာပလပ်တွင် ၁၂ ဗို့ မိန်းပါဝါ ရောက်/မရောက် အရင်စစ်ပါ! (EFI ဖျူးစ်လောင်ပါက ၁၂ ဗို့ ပျောက်ပြီး P0102 တက်တတ်သည်)။',
    symptoms: ['လီဗာနင်းပါက စက်တုံ့ဆိုင်းပြီး ထိုးရပ်သွားခြင်း', 'အင်ဂျင် မီးခိုးမည်း ထွက်ခြင်း', 'စက်မောင်းအား အလွန်ကျဆင်းခြင်း'],
    commonCars: 'Toyota Corolla/Vios, Nissan Teana/Tiida, Mazda 3',
    severity: 'critical'
  },
  {
    id: 'dtc-p0103',
    code: 'P0103',
    system: 'P',
    systemLabelMy: 'အင်ဂျင်/ဂီယာ (Powertrain)',
    faultType: 'circuit_high',
    faultTypeLabelMy: '⚡ Circuit High (Open Circuit / ကြိုးပြတ်)',
    nameEn: 'Mass or Volume Air Flow Circuit High Input',
    nameMy: 'လေဆန်ဆာ (MAF) ဗို့အားမြင့်တက်ခြင်း (ကြိုးပြတ် / ပလပ်ကျွတ်)',
    meaningMy: 'MAF ဆန်ဆာ Signal ဗို့အားသည် အမြင့်ဆုံး 4.9V ကျော်အထိ ထိုးတက်နေခြင်း ဖြစ်သည်။',
    wireCause: 'MAF ဆန်ဆာ၏ Sensor Ground ကြိုး ပြတ်တောက်နေခြင်း (Ground ပြတ်ပါက Signal သည် 5V သို့ ထိုးတက်သွားသည်) သို့မဟုတ် ပလပ်ကျွတ်နေခြင်း။',
    voltageCheck: 'MAF ပလပ်ရှိ Ground ပင်ကို ကားကိုယ်ထည်နှင့် အုမ်း (Ohms) တိုင်းပါက < 0.2Ω သာ ရှိရမည်။ Ground ပြတ်နေပါက အသစ်ဆက်ပေးပါ။',
    proDiagnosticTip: 'MAF Sensor Ground သည် ကွန်ပျူတာ ECU ပင်မှ လာသော E2 Ground ဖြစ်သည်။ ECU ပင် E2 တွင် ကြိုးပြတ်မပြတ် Continuity စစ်ဆေးပါ။',
    symptoms: ['အင်ဂျင် Limp Mode ဝင်သွားပြီး 2,500 RPM ထက် ကျော်နင်းမရတော့ခြင်း', 'ချက်အင်ဂျင်မီး လင်းခြင်း'],
    commonCars: 'Toyota, Subaru, Ford Ranger, Nissan',
    severity: 'critical'
  },

  // --- FUEL TRIM / LEAN & RICH ---
  {
    id: 'dtc-p0171',
    code: 'P0171',
    system: 'P',
    systemLabelMy: 'အင်ဂျင်/ဂီယာ (Powertrain)',
    faultType: 'range_performance',
    faultTypeLabelMy: '⚙️ Range / Performance (ဆီပါးခြင်း / System Lean)',
    nameEn: 'System Too Lean (Bank 1)',
    nameMy: 'ဆီပါးလွန်းခြင်း (ဆီနည်းပြီး လေအလွန်များနေခြင်း)',
    meaningMy: 'ဆလင်ဒါထဲသို့ ဓာတ်ဆီထက် လေအလွန်အကျွံ များဝင်နေသဖြင့် ECU က ဆီပိုဖြန်းရန် Long Term Fuel Trim (LTFT) ကို +20% ကျော်အထိ အဆုံးစွန် ဖြန်းပေးနေရခြင်း ဖြစ်သည်။',
    wireCause: 'ဝါယာကြိုး ပြဿနာထက် Intake Manifold ပိုက်လိုင်းပေါက်၍ လေခိုးဝင်ခြင်း (Vacuum Leak)၊ MAF ဆန်ဆာ ဖုန်ဂျီးပိတ်ခြင်း သို့မဟုတ် ဆီပန့် (Fuel Pump) ဖိအား အားနည်းခြင်း။',
    voltageCheck: 'O2 Sensor အချက်ပြသည် 0.1V တွင် အမြဲ ငြိမ်နေမည် (ဆီပါးနေကြောင်း ပြခြင်း)။ Brake Cleaner စပရေးကို လေပိုက်အဆစ်များသို့ ဖြန်းကြည့်ပါက အင်ဂျင်လည်နှုန်း တက်လာပါက ထိုနေရာမှ လေခိုးဝင်နေခြင်း ဖြစ်သည်။',
    proDiagnosticTip: 'PCV Valve ပိုက်ခွေ၊ ဘရိတ်ဘူစတာ လေပိုက်ခွေနှင့် လေတံခါး ရာဘာဂတ်စကစ်များ ပေါက်ပြဲနေခြင်း ရှိ/မရှိ မီးခိုးစက် (Smoke Machine) သို့မဟုတ် စပရေးဖြန်း၍ စစ်ဆေးပါ။ MAF Cleaner ဖြင့် လေဆန်ဆာကို သန့်စင်ဆေးကြောပေးပါ။',
    symptoms: ['အင်ဂျင်စလိုးတုန်ခါခြင်း', 'လီဗာနင်းပါက မီးပွင့်သံ သို့မဟုတ် တုံ့ဆိုင်းခြင်း', 'မနက်ခင်း စက်နှိုးရခက်ခြင်း'],
    commonCars: 'Toyota Camry/Alphard, Honda Fit/Civic, Nissan, Suzuki Swift',
    severity: 'warning'
  },
  {
    id: 'dtc-p0172',
    code: 'P0172',
    system: 'P',
    systemLabelMy: 'အင်ဂျင်/ဂီယာ (Powertrain)',
    faultType: 'range_performance',
    faultTypeLabelMy: '⚙️ Range / Performance (ဆီထူခြင်း / System Rich)',
    nameEn: 'System Too Rich (Bank 1)',
    nameMy: 'ဆီထူလွန်းခြင်း (ဆီအလွန်များပြီး လေနည်းနေခြင်း)',
    meaningMy: 'ဆလင်ဒါထဲသို့ ဓာတ်ဆီအလွန်အကျွံ ရောက်ရှိနေသဖြင့် ကွန်ပျူတာက ဆီဖြန်းနှုန်းကို အနုတ် (-20% ကျော်) သို့ အတင်း လျှော့ချနေရခြင်း ဖြစ်သည်။',
    wireCause: 'အင်ဂျက်တာ ဆီယိုစိမ့်ပိတ်မရခြင်း (Leaking Injector)၊ ဆီဖိအားထိန်း Regulator ပျက်ခြင်း သို့မဟုတ် ရေဆန်ဆာ ECT က -40°C မှားဖတ်၍ ဆီအဆမတန် ဖြန်းခိုင်းနေခြင်း။',
    voltageCheck: 'O2 Sensor အချက်ပြသည် 0.9V အထက်တွင် အမြဲ ကပ်နေမည်။ ECT ရေဆန်ဆာ တန်ဖိုး မှန်/မမှန် စကင်နာတွင် စစ်ပါ။',
    proDiagnosticTip: 'ပလပ်ခေါင်းများကို ဖြုတ်ကြည့်ပါက မီးသွေးခဲကဲ့သို့ မည်းနက်နေပါမည်။ ဆီဖိအား Regulator ၏ လေပိုက်ခေါင်းကို ဖြုတ်ကြည့်၍ အတွင်းထဲတွင် ဓာတ်ဆီစိုနေပါက Regulator ဒိုင်ယာဖရမ် ပေါက်နေပြီ ဖြစ်သည်။',
    symptoms: ['အိပ်ဇောမှ ဓာတ်ဆီစိမ်းနံ့ပြင်းပြင်း ထွက်ခြင်း', 'မီးခိုးမည်း အလုံးလိုက် ထွက်ခြင်း', 'ဆီစား အလွန်ကြမ်းခြင်း'],
    commonCars: 'Toyota, Honda, Nissan, Hyundai',
    severity: 'warning'
  },

  // --- MISFIRE & IGNITION ---
  {
    id: 'dtc-p0300',
    code: 'P0300',
    system: 'P',
    systemLabelMy: 'အင်ဂျင်/ဂီယာ (Powertrain)',
    faultType: 'mechanical_misfire',
    faultTypeLabelMy: '💥 Misfire (ဆလင်ဒါ အစုံ မီးလွတ်ခြင်း)',
    nameEn: 'Random or Multiple Cylinder Misfire Detected',
    nameMy: 'ဆလင်ဒါအစုံ မီးလွတ်ခြင်း (အင်ဂျင်တုန်ဆင်းခြင်း)',
    meaningMy: 'ဆလင်ဒါ ၁ ခုတည်း မဟုတ်ဘဲ ဆလင်ဒါ ၂ ခုနှင့်အထက် ပြိုင်တူ မီးလွတ် (Misfire) ဖြစ်နေကြောင်း Crankshaft Speed မှတ်တမ်းအရ ကွန်ပျူတာက သိရှိခြင်း ဖြစ်သည်။',
    wireCause: 'မီးကွိုင် မိန်းပါဝါ ၁၂ ဗို့ လိုင်းချို့ယွင်းခြင်း၊ ပလပ်ကြိုးများ မီးလွတ်ခြင်း၊ ဆီဖိအား အလွန်ကျဆင်းခြင်း သို့မဟုတ် တိုင်မင်ချိန်း ကျော်သွားခြင်း။',
    voltageCheck: 'မီးကွိုင် +B တိုင်တွင် ၁၂ ဗို့ အပြည့် ရောက်/မရောက် စစ်ပါ။',
    proDiagnosticTip: 'P0300 ပေါ်ပါက တစ်လုံးချင်း စစ်မနေဘဲ အားလုံးနှင့် သက်ဆိုင်သော "ဆီဖိအား (Fuel Pressure)"၊ "လေခိုးဝင်ခြင်း (Vacuum Leak)" နှင့် "EGR Valve ပွင့်လျက် ဂျမ်းဖြစ်နေခြင်း" ကို အရင် ဦးစားပေး စစ်ရမည်။',
    symptoms: ['ဒိုင်ခွက် ချက်အင်ဂျင်မီး တဖျတ်ဖျတ် ခတ်နေခြင်း (Flashing Check Engine)', 'ကားတစ်ခုလုံး အလွန်ဆိုးရွားစွာ တုန်ခါခြင်း', 'မောင်းမရတော့ခြင်း'],
    commonCars: 'ကားအားလုံး (Toyota, Honda, Nissan, Ford, etc.)',
    severity: 'critical'
  },
  {
    id: 'dtc-p0301',
    code: 'P0301',
    system: 'P',
    systemLabelMy: 'အင်ဂျင်/ဂီယာ (Powertrain)',
    faultType: 'mechanical_misfire',
    faultTypeLabelMy: '💥 Misfire (ဆလင်ဒါ နံပါတ် ၁ မီးလွတ်ခြင်း)',
    nameEn: 'Cylinder 1 Misfire Detected',
    nameMy: 'ဆလင်ဒါ နံပါတ် (၁) မီးလွတ်ခြင်း',
    meaningMy: 'ဆလင်ဒါ နံပါတ် ၁ တွင် ပလပ်မီးမကူးခြင်း သို့မဟုတ် ဆီမဖြန်းနိုင်သဖြင့် ပေါက်ကွဲအား ပျောက်ဆုံးနေခြင်း ဖြစ်သည်။',
    wireCause: 'နံပါတ် ၁ မီးကွိုင် (Ignition Coil) ပျက်ခြင်း၊ ပလပ်ခေါင်း သက်တမ်းကုန်ခြင်း သို့မဟုတ် နံပါတ် ၁ အင်ဂျက်တာ ပိတ်ဆို့ခြင်း။',
    voltageCheck: 'နံပါတ် ၁ မီးကွိုင်၏ IGT (Ignition Trigger) ပင်တွင် စက်နှိုးစဉ် 5V Pulse အချက်ပြ လာ/မလာ စစ်ပါ။',
    proDiagnosticTip: '【 မီးကွိုင် လဲလှယ်စမ်းသပ်နည်း (Swap Test) 】: နံပါတ် ၁ မီးကွိုင်ကို နံပါတ် ၂ သို့ ရွှေ့တပ်ပါ! အကယ်၍ အယ်တာကုဒ်သည် P0302 သို့ ပြောင်းသွားပါက မီးကွိုင်ပျက်နေခြင်း သေချာပါပြီ။ မပြောင်းဘဲ P0301 အတိုင်း ဆက်နေပါက ပလပ် သို့မဟုတ် အင်ဂျက်တာ ဖြစ်သည်။',
    symptoms: ['စလိုးတွင် အင်ဂျင်တစ်ချက်တစ်ချက် ဆတ်ခနဲ တုန်ဆင်းသွားခြင်း', 'ကားအရှိန်ဆွဲတင်ရာတွင် တုံ့ဆိုင်းခြင်း'],
    commonCars: 'ကားအားလုံး (P0302 = Cyl 2, P0303 = Cyl 3, P0304 = Cyl 4)',
    severity: 'critical'
  },

  // --- CRANKSHAFT & CAMSHAFT (NO START CODES) ---
  {
    id: 'dtc-p0335',
    code: 'P0335',
    system: 'P',
    systemLabelMy: 'အင်ဂျင်/ဂီယာ (Powertrain)',
    faultType: 'circuit_low',
    faultTypeLabelMy: '⚡ Circuit Malfunction / Low (စက်နှိုးမရခြင်း)',
    nameEn: 'Crankshaft Position Sensor A Circuit Malfunction',
    nameMy: 'ခရိုင်းဆန်ဆာ (CKP) ပတ်လမ်း ချို့ယွင်းခြင်း (စက်နှိုးမရ)',
    meaningMy: 'အင်ဂျင်လည်ပတ်နေကြောင်း အသိပေးသည့် အဓိက ခရိုင်းဆန်ဆာမှ Pulse အချက်ပြလုံးဝ မရရှိသဖြင့် ကွန်ပျူတာက ဆီဖြန်းခြင်းနှင့် မီးလွှတ်ခြင်းကို လုံးဝ ရပ်တန့်ထားခြင်း ဖြစ်သည်။',
    wireCause: 'CKP ဆန်ဆာ ဝါယာကြိုး ပြတ်တောက်ခြင်း (ကြွက်ကိုက်ခြင်း)၊ ဆန်ဆာပလပ် ချေးတက်ခြင်း သို့မဟုတ် ဆန်ဆာအတွင်းပိုင်း သံလိုက်ကွိုင် ပျက်ခြင်း။',
    voltageCheck: 'Hall Effect အမျိုးအစားဖြစ်ပါက 12V သို့မဟုတ် 5V ပါဝါ၊ ဂရောင်းနှင့် စက်နှိုးချိန် 0V/5V Square Wave အချက်ပြ လာ/မလာ စစ်ပါ။ Magnetic အမျိုးအစားဖြစ်ပါက Resistance 800Ω~1,500Ω ရှိရမည်။',
    proDiagnosticTip: 'ကားတစ်စီး စက်ဆွဲနှိုးသော်လည်း လုံးဝ စက်မနှိုးပါက (No Spark & No Injector Pulse) ခရိုင်းဆန်ဆာ CKP ကို အရင်ဆုံး စစ်ဆေးပါ! စကင်နာ Live Data တွင် Engine RPM သည် စက်ဆွဲနှိုးစဉ် 150~250 RPM တက်/မတက် ကြည့်ပါ။ RPM 0 ဖြစ်နေပါက CKP ပျက်နေခြင်း ဖြစ်သည်။',
    symptoms: ['မော်တာ ဆွဲလည်သော်လည်း အင်ဂျင် လုံးဝ စက်နှိုးမရခြင်း (Crank No Start)', 'ကားမောင်းနေစဉ် ရုတ်တရက် စက်သေသွားခြင်း'],
    commonCars: 'Toyota Hilux/Revo, Nissan, Honda, Hyundai, Kia',
    severity: 'critical'
  },
  {
    id: 'dtc-p0016',
    code: 'P0016',
    system: 'P',
    systemLabelMy: 'အင်ဂျင်/ဂီယာ (Powertrain)',
    faultType: 'range_performance',
    faultTypeLabelMy: '⚙️ Correlation (တိုင်မင်ချိန်း ကျော်ခြင်း / လွဲမှားခြင်း)',
    nameEn: 'Crankshaft Position - Camshaft Position Correlation (Bank 1 Sensor A)',
    nameMy: 'ခရိုင်းနှင့် ကမ်ဆန်ဆာ တိုင်မင် အံမကိုက်ခြင်း (တိုင်မင်ကျော်ခြင်း)',
    meaningMy: 'ခရိုင်းရှပ် (အောက်ဘက်) နှင့် ကမ်ရှပ် (အထက်ဘက်) တို့၏ အလှည့်ဒီဂရီ အချိန်ကိုက် တိုက်ဆိုင်မှု လွဲမှားနေကြောင်း ကွန်ပျူတာက တွေ့ရှိခြင်း ဖြစ်သည်။',
    wireCause: 'တိုင်မင်ချိန်းကြိုး အလွန်လျော့တွဲလာခြင်း (Timing Chain Stretched)၊ ချိန်းသွား ၁ သွား ကျော်သွားခြင်း သို့မဟုတ် VVT-i OCV ဆာဗာဗား အဝေးတွင် ဂျမ်းဖြစ်နေခြင်း။',
    voltageCheck: 'ဆန်ဆာ ၂ ခုစလုံး၏ Signal လိုင်းများကို Oscilloscope ဖြင့် ထိုးကြည့်ပါက Waveform သွားများ ဘေးသို့ လွဲချော်နေသည်ကို တွေ့ရမည်။',
    proDiagnosticTip: 'ဆန်ဆာ မလဲခင် အင်ဂျင်ဝိုင် အဆင့်နှင့် အင်ဂျင်ဝိုင်သန့်/မသန့် အရင်စစ်ပါ! အင်ဂျင်ဝိုင်မဲညစ်နေပါက VVT-i OCV ဆာဗာ ဂျမ်းဖြစ်ပြီး ဤကုဒ် တက်တတ်သည်။ ဝိုင်လဲပြီးပါက တိုင်မင်ချိန်း လျော့/မလျော့ စစ်ဆေးပါ။',
    symptoms: ['အင်ဂျင် စက်နှိုးရ အလွန်ကြာခြင်း', 'အရှိန်တက်အား လုံးဝမရှိခြင်း', 'အင်ဂျင် အသံကြမ်းခြင်း'],
    commonCars: 'Toyota 1NZ/2NZ/2AZ, Hyundai/Kia Gamma engine, Chevrolet Cruze',
    severity: 'critical'
  },

  // --- CATALYTIC CONVERTER ---
  {
    id: 'dtc-p0420',
    code: 'P0420',
    system: 'P',
    systemLabelMy: 'အင်ဂျင်/ဂီယာ (Powertrain)',
    faultType: 'range_performance',
    faultTypeLabelMy: '⚙️ Efficiency (ကာတလစ်ဆီ သန့်စင်မှု ကျဆင်းခြင်း)',
    nameEn: 'Catalyst System Efficiency Below Threshold (Bank 1)',
    nameMy: 'ကာတလစ်ဆီ မီးခိုးအိုး သန့်စင်နိုင်စွမ်း ကျဆင်းခြင်း',
    meaningMy: 'မီးခိုးအိုးအရှေ့ရှိ O2 Sensor (Sensor 1) နှင့် အနောက်ရှိ O2 Sensor (Sensor 2) တို့၏ အချက်ပြလှိုင်းသည် ပုံစံတူနီးပါး လှုပ်ရှားနေသဖြင့် မီးခိုးအိုးက အဆိပ်ငွေ့ မစစ်နိုင်တော့ကြောင်း သတင်းပို့ခြင်း ဖြစ်သည်။',
    wireCause: 'ကာတလစ်ဆီ မီးခိုးအိုးအတွင်းရှိ ပလက်တီနမ် အုံများ သက်တမ်းကုန်/ပျက်စီးခြင်း၊ အနောက်ဘက် O2 Sensor ပျက်ခြင်း သို့မဟုတ် အိပ်ဇောပိုက်လိုင်း လေလုံပေါက်ပြဲခြင်း။',
    voltageCheck: 'အင်ဂျင်ပူချိန်တွင် Sensor 2 (အနောက်အောက်ဆီဂျင်ဆန်ဆာ) သည် 0.5V~0.7V တွင် ငြိမ်နေရမည်။ အကယ်၍ Sensor 1 ကဲ့သို့ 0.1V~0.9V အတက်အကျ ပြင်းထန်နေပါက မီးခိုးအိုး မသန့်တော့ပါ။',
    proDiagnosticTip: 'အိပ်ဇောပိုက်လိုင်း မီးခိုးအိုးအရှေ့ဘက်တွင် လေပေါက် (Exhaust Leak) ရှိ/မရှိ အရင်စစ်ပါ! လေပေါက်နေပါက မီးခိုးအိုး မပျက်ဘဲနှင့် P0420 တက်တတ်သည်။',
    symptoms: ['ချက်အင်ဂျင်မီး လင်းနေခြင်းမှလွဲ၍ ကားမောင်းရသည်မှာ သိသိသာသာ ချို့ယွင်းချက် မပြခြင်း', 'အိပ်ဇောမှ ဥပုပ်နံ့ ထွက်ခြင်း'],
    commonCars: 'Toyota Prius/Wish/Alphard, Honda Fit/Insight, Nissan',
    severity: 'warning'
  },

  // --- CHASSIS (C CODES - ABS & EPS) ---
  {
    id: 'dtc-c0200',
    code: 'C0200',
    system: 'C',
    systemLabelMy: 'အောက်ပိုင်း/ဘရိတ် (Chassis)',
    faultType: 'circuit_high',
    faultTypeLabelMy: '⚡ Circuit Open / Signal Failure (ABS မီးလင်း)',
    nameEn: 'Right Front Wheel Speed Sensor Circuit',
    nameMy: 'ရှေ့ညာဘက် ABS ဘီးလည်နှုန်းဆန်ဆာ ပတ်လမ်း ချို့ယွင်းခြင်း',
    meaningMy: 'ရှေ့ညာဘက်ဘီးရှိ ABS Speed Sensor မှ ဘီးလည်နှုန်း အချက်ပြ မရရှိသဖြင့် ABS စနစ် ပိတ်သွားခြင်း ဖြစ်သည်။',
    wireCause: 'ဘီးငြောင့်ဘေးရှိ ABS ဝါယာကြိုး ပြတ်တောက်ခြင်း (ဘီးအလှည့်တွင် ပွတ်ဆွဲမိခြင်း)၊ ပလပ်ကျွတ်ခြင်း သို့မဟုတ် Hub Bearing သံလိုက်သွား ပျက်စီးခြင်း။',
    voltageCheck: 'Active Sensor (2-wire) ဖြစ်ပါက သော့ ON ချိန်တွင် ပလပ်၌ 12V ရောက်/မရောက် စစ်ပါ။',
    proDiagnosticTip: 'ကားအောက်ဆင်းပြီး ရှေ့ညာဘီးငြောင့်သို့ ဆင်းသော ဝါယာကြိုးခွေကို လက်ဖြင့် ဆွဲဆန့်ကြည့်ပါ! အပြင်ခွံမပြတ်သော်လည်း အတွင်းကြေးနီကြိုး ပြတ်နေတတ်သည်။',
    symptoms: ['ဒိုင်ခွက်တွင် ((ABS)) မီးဝါ နှင့် ((!)) မီးနီ ပြိုင်တူလင်းခြင်း', 'ဘရိတ်နင်းပါက ABS အလုပ်မလုပ်တော့ခြင်း'],
    commonCars: 'Toyota, Lexus, Honda, Nissan',
    severity: 'warning'
  },

  // --- BODY (B CODES - AIRBAG & BODY) ---
  {
    id: 'dtc-b1801',
    code: 'B1801',
    system: 'B',
    systemLabelMy: 'ကိုယ်ထည်/လေအိတ် (Body)',
    faultType: 'circuit_high',
    faultTypeLabelMy: '⚡ Circuit Open (လေအိတ်ခွေကြိုးပြတ်)',
    nameEn: 'Open in Drivers Airbag Squib Circuit',
    nameMy: 'ဒရိုင်ဘာ လေအိတ်ခွေကြိုး ပြတ်တောက်ခြင်း (Clockspring Open)',
    meaningMy: 'စတီယာရင်တိုင်အတွင်းရှိ ဒရိုင်ဘာ လေအိတ် မီးကူးစနစ် ပတ်လမ်း ပြတ်တောက်နေကြောင်း Airbag ECU က သိရှိခြင်း ဖြစ်သည်။',
    wireCause: 'စတီယာရင် လှည့်ရာတွင် လိုက်ပါလည်ပတ်ရသော စတီယာရင်ခွေကြိုး (Spiral Cable / Clockspring) အတွင်းရှိ ဖဲကြိုးလိုင်း ပြတ်သွားခြင်း။',
    voltageCheck: 'သတိပြုရန်: လေအိတ်ဝါယာကြိုးများကို Multimeter Ohm ဖြင့် တိုက်ရိုက် မတိုင်းရပါ! (မီတာလျှပ်စစ်ကြောင့် လေအိတ် ပေါက်ကွဲနိုင်သည်)။',
    proDiagnosticTip: 'စတီယာရင်ပေါ်ရှိ ဟွန်း (Horn) တီးမရခြင်း သို့မဟုတ် Volume ခလုတ်များပါ ပြိုင်တူ မရတော့ပါက စတီယာရင်ခွေကြိုး (Clockspring) ၁၀၀% ပြတ်နေပြီ ဖြစ်၍ အသစ်လဲပေးရမည်။',
    symptoms: ['ဒိုင်ခွက်တွင် လေအိတ်မီးနီ (Airbag / SRS) အမြဲလင်းနေခြင်း', 'ဟွန်းတီးမရတော့ခြင်း'],
    commonCars: 'Toyota Vios/Corolla/Hilux, Nissan, Honda',
    severity: 'critical'
  },

  // --- NETWORK (U CODES - CAN-BUS COMMUNICATION) ---
  {
    id: 'dtc-u0100',
    code: 'U0100',
    system: 'U',
    systemLabelMy: 'ဆက်သွယ်ရေးလိုင်း (Network)',
    faultType: 'network_lost',
    faultTypeLabelMy: '🌐 Network Lost Communication (CAN လိုင်းပြတ်)',
    nameEn: 'Lost Communication with ECM/PCM "A"',
    nameMy: 'အင်ဂျင်ကွန်ပျူတာ (ECM) နှင့် CAN-Bus အဆက်အသွယ်ပြတ်ခြင်း',
    meaningMy: 'အခြားသော ကွန်ပျူတာများ (ABS, Transmission, Meter Cluster, BCM) သည် အဓိက အင်ဂျင်ကွန်ပျူတာ (ECM) ဆီမှ CAN-Bus ဒေတာများ လုံးဝ မရရှိတော့ဘဲ လိုင်းပြတ်သွားခြင်း ဖြစ်သည်။',
    wireCause: 'အင်ဂျင် ECU ၏ EFI Main Relay သို့မဟုတ် IGN ဖျူးစ် လောင်သွားခြင်း၊ ECU ဂရောင်းကြိုး ချေးတက်ခြင်း သို့မဟုတ် CAN-High / CAN-Low ဝါယာလိုင်း ပြတ်တောက်ခြင်း။',
    voltageCheck: 'OBD2 ပေါက်တွင် Pin 6 (CAN-H) တွင် 2.6V~3.0V၊ Pin 14 (CAN-L) တွင် 2.0V~2.4V ရှိ/မရှိ စစ်ပါ။ ဘက်ထရီဖြုတ်ပြီး Pin 6 နှင့် 14 ကြား Resistance တိုင်းပါက 60Ω ရှိရမည်။',
    proDiagnosticTip: 'U0100 ပေါ်ပြီး စက်နှိုးမရပါက ECU ပျက်သည်ဟု ချက်ချင်း မဆုံးဖြတ်ပါနှင့်! ၉၀% မှာ "EFI မိန်းဖျူးစ်/ရီလေး လောင်ခြင်း" သို့မဟုတ် "အင်ဂျင်ဘလောက်ပေါ်က မိန်းဂရောင်းကြိုး မမိခြင်း" ကြောင့် ECU ပါဝါသေနေခြင်း ဖြစ်သည်။',
    symptoms: ['ဒိုင်ခွက်တွင် မီးများ အားလုံး စုံလင်းပြီး စက်နှိုးမရခြင်း', 'စကင်နာထိုးပါက အင်ဂျင် ECU ထဲသို့ ဝင်မရဘဲ "Communication Error" ပြခြင်း'],
    commonCars: 'Toyota, Honda, Mazda, Ford Ranger, Chevrolet',
    severity: 'critical'
  },
  {
    id: 'dtc-u0121',
    code: 'U0121',
    system: 'U',
    systemLabelMy: 'ဆက်သွယ်ရေးလိုင်း (Network)',
    faultType: 'network_lost',
    faultTypeLabelMy: '🌐 Network Lost Communication (ABS လိုင်းပြတ်)',
    nameEn: 'Lost Communication with Anti-Lock Brake System (ABS) Control Module',
    nameMy: 'ABS ဘရိတ်ကွန်ပျူတာနှင့် CAN-Bus အဆက်အသွယ်ပြတ်ခြင်း',
    meaningMy: 'အင်ဂျင် ECU သည် ABS မော်ဂျူးထံမှ ကားအမြန်နှုန်း (Vehicle Speed) အချက်အလက်များ မရရှိတော့ခြင်း ဖြစ်သည်။',
    wireCause: 'ABS ကွန်ပျူတာ၏ ABS Main Fuse (30A/40A) လောင်ခြင်း၊ ABS ပလပ်ခေါင်းထဲ ရေဝင်ချေးတက်ခြင်း သို့မဟုတ် CAN လိုင်းပြတ်ခြင်း။',
    voltageCheck: 'ABS Module ပလပ်ခေါင်းတွင် +12V မိန်းပါဝါလိုင်း ၂ လိုင်း၊ ဂရောင်းလိုင်း ၂ လိုင်း အပြည့် ရောက်/မရောက် စစ်ပါ။',
    proDiagnosticTip: 'ဒိုင်ခွက်တွင် ကီလိုမိုင်တံ (Speedometer) မတက်တော့ဘဲ U0121 ပေါ်နေပါက ABS မော်ဂျူး၏ 40A ဖျူးစ်ကို အရင်ဆုံး စစ်ဆေးပါ။',
    symptoms: ['ဒိုင်ခွက် ကီလိုလက်တံ သေနေခြင်း', 'ABS နှင့် Handbrake မီးနီ ပြိုင်တူလင်းနေခြင်း'],
    commonCars: 'Toyota, Honda, Nissan, Ford',
    severity: 'warning'
  }
];
