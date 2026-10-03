import { SensorDetail } from '../types/wiring';

export const ALL_SENSORS_DATA: SensorDetail[] = [
  // ================= 1. ENGINE TIMING & SYNC =================
  {
    id: 'ckp-sensor',
    nameEn: 'Crankshaft Position Sensor',
    nameMy: 'ကရိုင်းဆန်ဆာ (အင်ဂျင်လည်နှုန်း & အနေအထားဆန်ဆာ)',
    acronym: 'CKP',
    category: 'timing',
    categoryNameMy: 'အင်ဂျင်လည်ပတ်မှု & တိုင်မင်',
    type: '၂ ကြိုး Magnetic Inductive (ခေတ်ဟောင်း) / ၃ ကြိုး Hall Effect (ခေတ်သစ်)',
    workingPrinciple: 'ကရိုင်းရှပ် ဖလိုက်ဝှီး သို့မဟုတ် ကရိုင်းပူလီပေါ်ရှိ သွားစိတ်များ (ဥပမာ 36-2 သို့မဟုတ် 60-2 သွား) ဖြတ်သန်းသွားချိန်တွင် သံလိုက်စက်ကွင်း ပြောင်းလဲမှုကို အချက်ပြလှိုင်းအဖြစ် ထုတ်ပေးသည်။ ECU သည် ဤအချက်ပြလှိုင်းဖြင့် အင်ဂျင်လည်နှုန်း (RPM) နှင့် ပစ္စတင် အထက်သေမှတ် (TDC) ကို သိရှိပြီး မီးပွားကူးချိန်နှင့် ဆီဖြန်းချိန်ကို တိကျစွာ ဆုံးဖြတ်သည်။',
    internalStructure: 'သံလိုက်အူတိုင် (Permanent Magnet) နှင့် ဝါယာကွိုင်ပတ် (Pickup Coil) သို့မဟုတ် Hall IC ချစ်ပ်ပြားနှင့် တပ်ဆင်ထားသော အမြဲတမ်း သံလိုက်တုံး။',
    pinoutSummary: [
      { pin: 'Pin 1', signalType: 'Signal (+) or Power 5V/12V', standardValue: 'Magnetic: AC 1V~10V / Hall: 5V/12V Power', description: 'သံလိုက်ကွိုင် အပေါင်း သို့မဟုတ် Hall ပါဝါအဝင်' },
      { pin: 'Pin 2', signalType: 'Signal (-) or Ground', standardValue: 'Ground (0V)', description: 'သံလိုက်ကွိုင် အနှုတ် သို့မဟုတ် Hall အနှုတ်' },
      { pin: 'Pin 3 (Hall သီးသန့်)', signalType: 'Square Wave Signal Out', standardValue: '0V - 5V Digital Pulse', description: 'ECU ဆီသို့ သွားသော ဒစ်ဂျစ်တယ် လေးထောင့်လှိုင်း' }
    ],
    specifications: {
      operatingVoltage: 'Magnetic: 0.5V - 15V AC / Hall: 5.0V or 12.0V DC',
      resistance: 'Magnetic Type: 800Ω ~ 1,400Ω (အေးချိန်) / 1,000Ω ~ 1,800Ω (ပူချိန်)'
    },
    testingSteps: [
      { step: 1, title: 'သံလိုက်ကွိုင် အုမ်းတိုင်းခြင်း (Magnetic)', description: 'မီတာကို 2kΩ တွင် ထားပြီး ပင် ၁ နှင့် ၂ ကြား ထောက်ပါ။ 800Ω ~ 1,200Ω အတွင်း ရှိရမည်။ Infinity (OL) ဖြစ်ပါက ကွိုင်ပြတ်နေပြီ။', tool: 'multimeter_ohm' },
      { step: 2, title: 'စက်နှိုးမော်တာလှည့်စဉ် AC ဗို့တိုင်းခြင်း', description: 'မီတာကို AC Volts တွင် ထားပြီး စက်နှိုး (Cranking) ကြည့်ပါ။ အနည်းဆုံး 0.8V ~ 2.0V AC ထွက်ရမည်။ ဗို့မထွက်ပါက ဆန်ဆာသေနေသည်။', tool: 'multimeter_v' },
      { step: 3, title: 'Hall ဆန်ဆာ ပါဝါ & ဂရောင်းစစ်ဆေးခြင်း', description: 'သော့ ON ထားစဉ် 5V သို့မဟုတ် 12V မီးရောက်မရောက်နှင့် 0V ဂရောင်းကျမကျ စစ်ပါ။', tool: 'multimeter_v' }
    ],
    symptomsOfFailure: [
      'စက်လုံးဝ နှိုးမရခြင်း (Cranking ဖြစ်သော်လည်း မီးလုံးဝ မကူး၊ ဆီလုံးဝ မဖြန်းခြင်း)',
      'အင်ဂျင်ပူလာပါက ရုတ်တရက် စက်သေသွားပြီး အေးသွားမှ ပြန်နှိုးရခြင်း (Heat breakdown)',
      'ဒိုင်ခွက်ပေါ်တွင် RPM တံ လုံးဝ မတက်ခြင်း',
      'Check Engine မီးလင်းပြီး DTC P0335 / P0339 တက်ခြင်း'
    ],
    diagnosticTips: 'အင်ဂျင်ပူချိန်တွင် စက်သေတတ်သော ကားများတွင် ဆန်ဆာကို ဆံပင်လေမှုတ်စက်ဖြင့် အပူပေးပြီး အုမ်းတန်ဖိုး စစ်ဆေးပါက အတွင်းပိုင်း ဝါယာပြတ်တောက်မှုကို ချက်ချင်း တွေ့ရှိနိုင်သည်။'
  },
  {
    id: 'cmp-sensor',
    nameEn: 'Camshaft Position Sensor',
    nameMy: 'ကင်းဆန်ဆာ (ကင်းရှပ် အနေအထားဆန်ဆာ)',
    acronym: 'CMP',
    category: 'timing',
    categoryNameMy: 'အင်ဂျင်လည်ပတ်မှု & တိုင်မင်',
    type: 'Hall Effect (၃ ကြိုး) သို့မဟုတ် Magnetoresistive (MRE)',
    workingPrinciple: 'ကင်းရှပ်ထိပ်ရှိ မာ့ခ် သို့မဟုတ် တံဆိပ်သွားများကို ဖမ်းယူပြီး စလင်ဒါနံပါတ် ၁ သည် Compression Stroke (ဖိသိပ်အဆင့်) ရောက်နေသလား Exhaust Stroke (အိတ်ဇောအဆင့်) ရောက်နေသလားကို ခွဲခြားပေးသည်။ ဤအချက်ပြမှုဖြင့် အင်ဂျက်တာများကို တစ်လုံးစီ အလှည့်ကျ ဆီဖြန်းစေသည် (Sequential Fuel Injection)။',
    internalStructure: 'Hall Element IC Microchip၊ သံလိုက်ပြားနှင့် ပလပ်စတစ် အကာအကွယ်ဘူး။',
    pinoutSummary: [
      { pin: 'Pin 1 (VCC)', signalType: 'Reference Power', standardValue: '5.0V or 12.0V DC', description: 'ECU မှ လာသော ပါဝါ' },
      { pin: 'Pin 2 (GND)', signalType: 'Sensor Ground', standardValue: '0.0V DC', description: 'သန့်စင်ပြီး အနှုတ်လိုင်း' },
      { pin: 'Pin 3 (OUT)', signalType: 'Square Wave Signal', standardValue: '0V ➔ 5V Digital Wave', description: 'ကင်းသွားဖြတ်ချိန် ဗို့ခုန်လှိုင်း' }
    ],
    specifications: {
      operatingVoltage: '5.0V DC or 12.0V DC',
      signalOutput: 'Low: 0.1V ~ 0.3V / High: 4.8V ~ 5.0V'
    },
    testingSteps: [
      { step: 1, title: 'ပါဝါနှင့် ဂရောင်းလိုင်း စစ်ဆေးခြင်း', description: 'ဆန်ဆာပလပ်ကို ဖြုတ်ပြီး သော့ ON ထားပါ။ ပင် ၁ တွင် 5V (သို့မဟုတ် 12V) ရောက်မရောက်၊ ပင် ၂ တွင် ဂရောင်း မိမမိ မီတာဖြင့် တိုင်းပါ။', tool: 'multimeter_v' },
      { step: 2, title: 'Signal အထွက် ဗို့အား စစ်ဆေးခြင်း', description: 'ပလပ်ပြန်တပ်ပြီး ပင် ၃ (Signal) ကို Back-probe ထိုးပါ။ စက်နှိုးစဉ် မီတာတွင် 2.0V ~ 2.5V DC ပျမ်းမျှ ပြသရမည် (သို့မဟုတ် Oscillo ဖြင့် လေးထောင့်လှိုင်း ကြည့်ပါ)။', tool: 'multimeter_v' }
    ],
    symptomsOfFailure: [
      'စက်နှိုးရန် အချိန်ကြာမြင့်ခြင်း (Long Cranking time)',
      'ကားအဆွဲအရုန်း မရှိခြင်း၊ ပါဝါကျဆင်းခြင်း (Limp Home Mode)',
      'VVT-i / VTEC စနစ်များ အလုပ်မလုပ်တော့ခြင်း',
      'DTC P0340 / P0341 တက်ခြင်း'
    ],
    diagnosticTips: 'Timing Belt သို့မဟုတ် Timing Chain လျော့နေပါက CKP နှင့် CMP အချက်ပြလှိုင်း မကိုက်ညီဘဲ P0016 / P0017 (Correlation Error) တက်တတ်သည်။'
  },
  {
    id: 'knock-sensor',
    nameEn: 'Knock Sensor',
    nameMy: 'မီးခေါက်ဆန်ဆာ (ခေါက်သံဖမ်းဆန်ဆာ)',
    acronym: 'KNK / KS',
    category: 'timing',
    categoryNameMy: 'အင်ဂျင်လည်ပတ်မှု & တိုင်မင်',
    type: 'Piezoelectric Ceramic (၁ ကြိုး သို့မဟုတ် ၂ ကြိုး)',
    workingPrinciple: 'အောက်တိန်းနိမ့်သော ဓာတ်ဆီသုံးခြင်း သို့မဟုတ် မီးစောလွန်းခြင်းကြောင့် အင်ဂျင်ဆလင်ဒါအတွင်း ပုံမှန်မဟုတ်ဘဲ မီးလောင်ပေါက်ကွဲသံ (Knocking / Pinging - ၅ မှ ၈ kHz ကြိမ်နှုန်း) ဖြစ်ပေါ်လာပါက ပီဇိုကျောက်ပြား တုန်ခါသွားပြီး ဗို့အားအသေးစား (AC Spike) ထုတ်ပေးသည်။ ECU သည် ထိုအသံကို သိသည်နှင့် မီးခေါက်သံ ရပ်တန့်သွားစေရန် မီးရင့်ချိန်ကို ချက်ချင်း နောက်ဆုတ်ပေးသည် (Retard Timing)။',
    internalStructure: 'Piezoelectric Ceramic Element၊ အလေးတုံး (Seismic Mass)၊ ခံစပရင်နှင့် သတ္တုဘောင်ခွံ။',
    pinoutSummary: [
      { pin: 'Pin 1', signalType: 'Knock AC Signal (+)', standardValue: '0V AC Rest, 0.5V~2V AC when knocked', description: 'ECU ဆီသို့ သွားသော အချက်ပြလိုင်း' },
      { pin: 'Pin 2 (ရှိပါက)', signalType: 'Shield Ground or Signal (-)', standardValue: '0V Ground', description: 'လျှပ်စစ်ဆူညံသံ ကာကွယ်သော Shield လိုင်း' }
    ],
    specifications: {
      resistance: 'Non-resonant type: 500kΩ ~ 600kΩ / Resonant: Infinity (Open Circuit)',
      signalOutput: '0.1V ~ 2.5V AC Spikes'
    },
    testingSteps: [
      { step: 1, title: 'အတွင်းပိုင်း ခုခံအား အုမ်းတိုင်းခြင်း', description: 'ဆန်ဆာပင်နှင့် ဘော်ဒီကြား တိုင်းပါ။ တိုယိုတာ မော်ဒယ်အများစုတွင် 500kΩ ~ 600kΩ ခန့် ပြရမည်။ လုံးဝ 0Ω ဖြစ်ပါက အတွင်းပိုင်း ရှော့ကျနေပြီ။', tool: 'multimeter_ohm' },
      { step: 2, title: 'ခေါက်စမ်းသပ်မှု (Tap Test)', description: 'မီတာကို AC mV တွင် ထားပြီး အင်ဂျင်ဘလောက်တုံးပေါ်တွင် ဆန်ဆာနားကို စပန်နာဖြင့် ဖြည်းညှင်းစွာ ခေါက်ကြည့်ပါ။ မီတာတွင် ဗို့အားခုန်တက်ရမည်။', tool: 'multimeter_v' }
    ],
    symptomsOfFailure: [
      'ကုန်းတက်ချိန် သို့မဟုတ် ဝန်အပြည့်တင်ချိန် အင်ဂျင်အတွင်းမှ "တက်တက်" ဟု မီးခေါက်သံ အဆက်မပြတ် မြည်နေခြင်း',
      'ဆီစားများပြီး ကားဆွဲအား အလွန်လေးလံနေခြင်း',
      'DTC P0325 / P0328 တက်ခြင်း'
    ],
    diagnosticTips: 'Knock Sensor တပ်ဆင်ရာတွင် သတ်မှတ်နတ်ဆွဲပေါင် (20 ~ 25 N·m) အတိအကျ ကြပ်ရပါမည်။ ပေါင်လျော့လျှင် ခေါက်သံမဖမ်းနိုင်သလို ပေါင်အရမ်းကြပ်လျှင် ကျောက်ပြားကွဲတတ်သည်။'
  },

  // ================= 2. AIR & FUEL SENSORS =================
  {
    id: 'maf-sensor',
    nameEn: 'Mass Air Flow Sensor',
    nameMy: 'လေစီးဆင်းမှုဆန်ဆာ (လေမီတာ)',
    acronym: 'MAF',
    category: 'air_fuel',
    categoryNameMy: 'လေဝင်ပေါက် & ဆီရောစပ်မှု',
    type: 'Hot-Wire (နန်းကြိုးပူ) / Hot-Film (ဖလင်ပြားပူ) / Digital Frequency',
    workingPrinciple: 'လေဝင်ပိုက်အတွင်းရှိ ပလက်တီနမ် နန်းကြိုးပူကို အပူချိန် ကိန်းသေ (ဥပမာ ပတ်ဝန်းကျင်ထက် 100°C ပိုပူအောင်) လျှပ်စစ်ကျွေးထားသည်။ အင်ဂျင်ထဲသို့ လေဖြတ်သန်းစီးဆင်းသွားချိန်တွင် နန်းကြိုး အေးသွားသဖြင့် မူလအပူချိန် ပြန်ရစေရန် လျှပ်စစ်စီးကြောင်း ပိုမိုကျွေးရသည်။ ဤလျှပ်စီးပမာဏကို ဗို့အား (1.0V ~ 4.5V) သို့မဟုတ် Digital Frequency အဖြစ် ပြောင်းလဲပြီး ECU ဆီ ပို့သည်။',
    internalStructure: 'Platinum Hot-Wire, Intake Air Temp (IAT) Thermistor, Bridge Circuit, Amplifier Board.',
    pinoutSummary: [
      { pin: 'Pin 1', signalType: 'IAT Signal (Temp)', standardValue: '0.5V ~ 3.5V', description: 'ဝင်လေအပူချိန် အချက်ပြ' },
      { pin: 'Pin 2', signalType: 'IAT Ground', standardValue: '0V', description: 'အပူချိန်ဆန်ဆာ အနှုတ်' },
      { pin: 'Pin 3', signalType: '12V Battery Power', standardValue: '+12V DC (Ignition ON)', description: 'နန်းကြိုးပူ အပူပေး ၁၂ ဗို့ပါဝါ' },
      { pin: 'Pin 4', signalType: 'MAF Clean Ground', standardValue: '0V DC', description: 'လေမီတာ သီးသန့်အနှုတ်' },
      { pin: 'Pin 5', signalType: 'MAF Voltage Output', standardValue: 'စလိုး: 1.2V ~ 1.5V / လီဗာဆောင့်: 3.5V ~ 4.5V', description: 'လေထုထည် အချက်ပြဗို့' }
    ],
    specifications: {
      operatingVoltage: '12V Battery Supply + 5V Sensor Logic',
      signalOutput: 'Engine Idle: 1.2V ~ 1.6V (2.0 ~ 3.5 g/sec) / Full Throttle: 3.8V ~ 4.5V'
    },
    testingSteps: [
      { step: 1, title: '+12V နှင့် Ground စစ်ဆေးခြင်း', description: 'သော့ ON ထားပြီး ပင် ၃ တွင် 12V ရောက်မရောက်၊ ပင် ၄ တွင် ဂရောင်းသန့်ရှင်းမှု (Voltage drop < 0.05V) စစ်ပါ။', tool: 'multimeter_v' },
      { step: 2, title: 'စလိုးနှင့် လီဗာဆောင့်ချိန် ဗို့အားတိုင်းခြင်း', description: 'စက်နှိုးပြီး စလိုးတွင် 1.2V ~ 1.5V ရှိရမည်။ လီဗာဆောင့်နင်းလိုက်ချိန်တွင် ဗို့အား ချက်ချင်း 3.5V အထက်သို့ ချောမွေ့စွာ တက်ရမည် (တွန့်ဆုတ်နေပါက နန်းကြိုးဂျီးပိတ်နေပြီ)။', tool: 'multimeter_v' }
    ],
    symptomsOfFailure: [
      'အိတ်ဇောမှ မီးခိုးမည်းများ လိပ်ထွက်ခြင်း (Black smoke)၊ ဆီစား အလွန်များခြင်း',
      'လီဗာနင်းလိုက်ချိန် ကားရှေ့သို့ မတက်ဘဲ အောက်စိုက်ငိုက်သွားခြင်း (Hesitation / Bogging down)',
      'စလိုးမငြိမ်ဘဲ အင်ဂျင်တုန်ခြင်း၊ စက်သေခြင်း',
      'DTC P0100, P0101, P0102, P0171 (System Too Lean)'
    ],
    diagnosticTips: 'နန်းကြိုးပူပေါ်တွင် ဖုန်နှင့် ဆီဂျီးများ ကပ်နေပါက MAF Cleaner Spray သီးသန့်ဖြင့်သာ ဖျန်းဆေးရပါမည်။ ကာဘရိုက်တာ ဖျန်းဆေး သို့မဟုတ် လက်ဖြင့် ထိတွေ့ခြင်း လုံးဝ မပြုလုပ်ရပါ။'
  },
  {
    id: 'map-sensor',
    nameEn: 'Manifold Absolute Pressure Sensor',
    nameMy: 'လေပြွန်ဖိအားဆန်ဆာ (မက်ဆန်ဆာ)',
    acronym: 'MAP',
    category: 'air_fuel',
    categoryNameMy: 'လေဝင်ပေါက် & ဆီရောစပ်မှု',
    type: 'Piezoresistive Silicon Diaphragm (၃ ကြိုး)',
    workingPrinciple: 'အင်ဂျင်လေစုပ်ပြွန် (Intake Manifold) အတွင်းရှိ လေဟာနယ် (Vacuum) သို့မဟုတ် တာဘိုဖိအား (Boost Pressure) ကို တိုင်းတာသည်။ ပစ္စတင်စုပ်ယူမှုကြောင့် လေဟာနယ် အားကောင်းချိန်တွင် ဗို့အားနိမ့်ကျနေပြီး၊ လီဗာအပြည့်နင်းချိန်တွင် လေဟာနယ်ပျောက်သွားသဖြင့် ဗို့အား အမြင့်ဆုံး (4.5V) သို့ တက်သွားကာ အင်ဂျင်ဝန်အား (Engine Load) ကို တွက်ပေးသည်။',
    internalStructure: 'ဆီလီကွန် ဒိုင်ယာဖရမ်ပြား၊ ဖုန်စုပ်လေဟာနယ် အခန်းငယ် (Reference Vacuum Chamber)၊ အသံချဲ့ဘုတ်ပြား။',
    pinoutSummary: [
      { pin: 'Pin 1 (VC / VCC)', signalType: '5V Reference Power', standardValue: '5.0V DC (±0.1V)', description: 'ECU မှ လာသော 5V' },
      { pin: 'Pin 2 (E2 / SGND)', signalType: 'Sensor Ground', standardValue: '0.0V DC', description: 'သီးသန့် အနှုတ်လိုင်း' },
      { pin: 'Pin 3 (PIM / SIG)', signalType: 'MAP Signal Voltage', standardValue: 'သော့ ON စက်မနှိုးမီ: 3.8V~4.5V / စလိုး: 1.0V~1.5V / လီဗာဆောင့်: 4.2V', description: 'လေပြွန်ဖိအား အချက်ပြဗို့' }
    ],
    specifications: {
      operatingVoltage: '5.0V DC',
      signalOutput: 'High Vacuum (Idle): 1.0V ~ 1.5V / Atmospheric (Key ON): 4.0V ~ 4.5V'
    },
    testingSteps: [
      { step: 1, title: '5V နှင့် Ground စစ်ဆေးခြင်း', description: 'ဆန်ဆာပလပ်ကို ဖြုတ်ပြီး သော့ ON ထားပါ။ ပင် ၁ တွင် 5.0V တိကျစွာ ရောက်မရောက်နှင့် ပင် ၂ တွင် ဂရောင်းရှိမရှိ စစ်ပါ။', tool: 'multimeter_v' },
      { step: 2, title: 'စက်မနှိုးမီ လေထုဖိအား ဗို့တိုင်းခြင်း', description: 'သော့ ON ပြီး စက်မနှိုးသေးမီ Signal ပင်ကို တိုင်းပါ။ ဒေသလေထုဖိအားအရ 3.8V ~ 4.5V ခန့် ပြရမည်။', tool: 'multimeter_v' },
      { step: 3, title: 'စက်နှိုးပြီး စလိုးဖိအား တိုင်းခြင်း', description: 'စက်နှိုးလိုက်သည်နှင့် လေဟာနယ်ဖြစ်ပေါ်သဖြင့် ဗို့အားသည် 1.0V ~ 1.5V သို့ ချက်ချင်း ထိုးကျသွားရမည်။', tool: 'multimeter_v' }
    ],
    symptomsOfFailure: [
      'စက်နှိုးနှိုးချင်း ပြန်သေသွားခြင်း၊ အင်ဂျင်အရမ်းတုန်လှုပ်ခြင်း',
      'မီးခိုးမည်းထွက်ခြင်း၊ ဆီစားဆိုးရွားစွာ များပြားလာခြင်း',
      'တာဘိုကားများတွင် Boost မတက်ခြင်း သို့မဟုတ် Limp Mode ဖြစ်ခြင်း',
      'DTC P0105, P0106, P0107, P0108 တက်ခြင်း'
    ],
    diagnosticTips: 'MAP ဆန်ဆာဆီသို့ ဆက်ထားသော လေဟာနယ် ရော်ဘာပိုက်ငယ် (Vacuum Hose) ပေါက်ပြဲနေပါက MAP ဆန်ဆာကောင်းနေသော်လည်း ဗို့အား 4.5V သို့ အမြဲတက်နေပြီး အင်ဂျင် ဆီအလွန်စားတတ်သည်။'
  },
  {
    id: 'tps-sensor',
    nameEn: 'Throttle Position Sensor',
    nameMy: 'လီဗာအဖွင့်ဆန်ဆာ (လိပ်ပြာဒလက်ဆန်ဆာ)',
    acronym: 'TPS',
    category: 'air_fuel',
    categoryNameMy: 'လေဝင်ပေါက် & ဆီရောစပ်မှု',
    type: 'Potentiometer (၃ ကြိုး ခေတ်ဟောင်း) / Dual Hall Effect (၆ ကြိုး ခေတ်သစ် ETCS-i)',
    workingPrinciple: 'ယာဉ်မောင်းသူက လီဗာနင်းသည့်အခါ လေတံခါးလိပ်ပြာဒလက် မည်မျှပွင့်သွားသည်ကို တိုင်းတာသည်။ ပိတ်ထားချိန် (စလိုး) တွင် 0.5V ခန့်ရှိပြီး၊ အပြည့်နင်းလိုက်ပါက 4.5V သို့ တဖြည်းဖြည်း ချောမွေ့စွာ မြင့်တက်သွားသည်။ ခေတ်သစ်ကားများတွင် လုံခြုံရေးအတွက် Sensor 1 (Main) နှင့် Sensor 2 (Sub) ဆန်ဆာ ၂ ခု ပူးတွဲပါဝင်သည်။',
    internalStructure: 'ကာဗွန်ခုခံအားလမ်းကြောင်း (Resistor Track)၊ ထိတွေ့လက်တံ (Contact Wiper) နှင့် ပြန်တွန်းစပရင်။',
    pinoutSummary: [
      { pin: 'Pin 1 (VC)', signalType: 'Reference Power', standardValue: '5.0V DC', description: 'ECU 5V ပါဝါ' },
      { pin: 'Pin 2 (E2)', signalType: 'Sensor Ground', standardValue: '0.0V DC', description: 'သီးသန့် အနှုတ်' },
      { pin: 'Pin 3 (VTA1)', signalType: 'Main Signal', standardValue: 'ပိတ်ချိန်: 0.5V ~ 0.8V / ဖွင့်ချိန်: 4.2V ~ 4.6V', description: 'ပင်မ လီဗာဗို့အား' },
      { pin: 'Pin 4 (VTA2 - ခေတ်သစ်)', signalType: 'Sub Signal', standardValue: 'ပိတ်ချိန်: 2.1V ~ 2.5V / ဖွင့်ချိန်: 4.6V ~ 4.9V', description: 'အရန် စစ်ဆေးရေးဗို့အား' }
    ],
    specifications: {
      operatingVoltage: '5.0V DC',
      resistance: 'VC နှင့် E2 ကြား: 2.5kΩ ~ 5.0kΩ / VTA နှင့် E2 ကြား: 0.5kΩ မှ 4.5kΩ သို့ ပြောင်းလဲခြင်း'
    },
    testingSteps: [
      { step: 1, title: '5V နှင့် Ground စစ်ဆေးခြင်း', description: 'VC ပင်တွင် 5.0V နှင့် E2 ပင်တွင် 0V ကျမကျ တိုင်းပါ။', tool: 'multimeter_v' },
      { step: 2, title: 'လီဗာ ဖြည်းဖြည်းချင်း ဖွင့်၍ ဗို့အား စစ်ဆေးခြင်း', description: 'သော့ ON ထားပြီး လိပ်ပြာဒလက်ကို လက်ဖြင့် ဖြည်းဖြည်းချင်း လှည့်ဖွင့်ပါ။ 0.5V မှ 4.5V သို့ တစ်စက္ကန့်ချင်း ချောမွေ့စွာ တက်ရမည်။ ကြားထဲတွင် ဗို့အား ရုတ်တရက် 0V သို့ ပြုတ်ကျပါက ကာဗွန်လမ်းကြောင်း ပွန်းနေပြီ။', tool: 'multimeter_v' }
    ],
    symptomsOfFailure: [
      'လီဗာနင်းသော်လည်း ကားမလိုက်ခြင်း၊ ဂီယာပြောင်းချိန် ဆောင့်ခြင်း (Shift shock)',
      'စလိုးအင်ဂျင်ပတ်နှုန်း မြင့်နေခြင်း သို့မဟုတ် အတက်အကျ ဖြစ်နေခြင်း (Surging)',
      'Electronic Throttle ကားများတွင် လီဗာလုံးဝ အလုပ်မလုပ်တော့ဘဲ စလိုးတစ်ခုတည်းသာ သွားခြင်း',
      'DTC P0120, P0121, P0122, P2135 တက်ခြင်း'
    ],
    diagnosticTips: 'TPS အသစ်လဲလှယ်ပြီးချိန်တွင် Throttle Relearn / Adaptation ပြန်လည်ပြုလုပ်ပေးရမည်။'
  },
  {
    id: 'app-sensor',
    nameEn: 'Accelerator Pedal Position Sensor',
    nameMy: 'ခြေနင်းလီဗာနင်းပြားဆန်ဆာ',
    acronym: 'APP / APS',
    category: 'air_fuel',
    categoryNameMy: 'လေဝင်ပေါက် & ဆီရောစပ်မှု',
    type: 'Dual Potentiometer သို့မဟုတ် Dual Hall Sensor (၆ ကြိုး)',
    workingPrinciple: 'ကားအတွင်းခန်း ခြေနင်းလီဗာပြားပေါ်တွင် တပ်ဆင်ထားပြီး ယာဉ်မောင်းသူ ခြေထောက်ဖြင့် ဖိနင်းသည့် အကွာအဝေးကို တိုင်းတာသည်။ အကယ်၍ ဆန်ဆာတစ်ခု ပျက်စီးသွားပါက ကားမထိန်းနိုင်ဘဲ အရှိန်ပြေးမသွားစေရန် လုံခြုံရေးအတွက် Sensor 1 နှင့် Sensor 2 ဟူ၍ ဆန်ဆာ ၂ မျိုး သီးခြားစီ ပါဝါ၊ ဂရောင်း၊ အချက်ပြလိုင်းများဖြင့် ဖွဲ့စည်းထားသည်။',
    internalStructure: 'သံလိုက်စက်ကွင်းသုံး Hall IC ချစ်ပ် ၂ ခု၊ ပြန်ကန်စပရင် ၂ ထပ်၊ ရေစိုခံ ပလပ်ခေါင်း။',
    pinoutSummary: [
      { pin: 'Pin 1, 2', signalType: 'VCC1 (5V) & GND1', standardValue: '5.0V & 0V', description: 'ဆန်ဆာ ၁ ပါဝါနှင့် ဂရောင်း' },
      { pin: 'Pin 3', signalType: 'APP Signal 1', standardValue: 'လွှတ်ထားချိန်: 0.8V ➔ အပြည့်နင်း: 4.2V', description: 'ဆန်ဆာ ၁ အချက်ပြဗို့' },
      { pin: 'Pin 4, 5', signalType: 'VCC2 (5V) & GND2', standardValue: '5.0V & 0V', description: 'ဆန်ဆာ ၂ ပါဝါနှင့် ဂရောင်း' },
      { pin: 'Pin 6', signalType: 'APP Signal 2', standardValue: 'လွှတ်ထားချိန်: 0.4V ➔ အပြည့်နင်း: 2.1V (တစ်ဝက်)', description: 'ဆန်ဆာ ၂ အချက်ပြဗို့ (Correlation check)' }
    ],
    specifications: {
      operatingVoltage: '5.0V DC x 2 Channels',
      signalOutput: 'Channel 1: 0.8V ~ 4.2V / Channel 2: 0.4V ~ 2.1V (အတိအကျ အချိုးကျရမည်)'
    },
    testingSteps: [
      { step: 1, title: 'သီးခြား 5V လိုင်း ၂ လိုင်း စစ်ဆေးခြင်း', description: 'ပင် ၁ နှင့် ပင် ၄ တွင် 5.0V စီ သီးခြား ရောက်မရောက် စစ်ပါ။ တစ်လိုင်းရှော့ကျပါက ၂ လိုင်းစလုံး ချို့ယွင်းတတ်သည်။', tool: 'multimeter_v' },
      { step: 2, title: 'နင်းပြားဖိချစဉ် Correlation ဗို့အား စစ်ဆေးခြင်း', description: 'လီဗာကို ဖြည်းဖြည်းချင်း နင်းချပါ။ Channel 1 တက်သလောက် Channel 2 သည် ကွက်တိ တစ်ဝက်နှုန်းဖြင့် လိုက်တက်ရမည်။ အချိုးလွဲပါက ECU က လီဗာဖြတ်ချမည်။', tool: 'multimeter_v' }
    ],
    symptomsOfFailure: [
      'လီဗာနင်းသော်လည်း စက်သံလုံးဝ မတက်ဘဲ စလိုး (1,200 RPM) ခန့်ဖြင့်သာ ကားရွေ့နေခြင်း (Fail-Safe Mode)',
      'Check Engine မီးလင်းပြီး ကားမောင်းရ အလွန်လေးလံနေခြင်း',
      'DTC P2120, P2122, P2127, P2138 (APP Sensor Correlation)'
    ],
    diagnosticTips: 'ကားအတွင်းခန်း ကြမ်းခင်းဖျာ (Foot mat) သည် ခြေနင်းပြားအောက် ခံနေပါက လီဗာ 100% မရောက်နိုင်ဘဲ Error တက်တတ်သဖြင့် ကြမ်းခင်းဖျာကို အရင်ဆုံး စစ်ဆေးပါ။'
  },
  {
    id: 'iat-sensor',
    nameEn: 'Intake Air Temperature Sensor',
    nameMy: 'ဝင်လေအပူချိန်ဆန်ဆာ',
    acronym: 'IAT',
    category: 'air_fuel',
    categoryNameMy: 'လေဝင်ပေါက် & ဆီရောစပ်မှု',
    type: 'NTC Thermistor (Negative Temperature Coefficient - ၂ ကြိုး)',
    workingPrinciple: 'အင်ဂျင်ထဲသို့ ဝင်ရောက်လာသော လေ၏ အပူချိန်ကို တိုင်းတာသည်။ လေအေးသည် သိပ်သည်းဆများပြီး အောက်ဆီဂျင် ပိုပါသောကြောင့် ဆီပိုကျွေးရပြီး၊ လေပူချိန်တွင် သိပ်သည်းဆနည်းသဖြင့် ဆီလျှော့ကျွေးရသည်။ အပူချိန်မြင့်လာပါက ဆန်ဆာအတွင်းပိုင်း ခုခံအား (Resistance) နိမ့်ကျသွားပြီး ဗို့အားပါ လိုက်လံကျဆင်းသွားသည်။',
    internalStructure: 'Semi-conductor Metal Oxide Bead (NTC သာမစ်စတာတုံး)၊ ကြေးဝါ အကာအကွယ်အိမ်။',
    pinoutSummary: [
      { pin: 'Pin 1 (THA / SIG)', signalType: '5V Pull-up Signal', standardValue: '20°C: 2.5V ~ 3.0V / 60°C: 1.0V ~ 1.5V', description: 'ECU မှ 5V ဆွဲတင်ထားသော အချက်ပြလိုင်း' },
      { pin: 'Pin 2 (E2 / GND)', signalType: 'Sensor Ground', standardValue: '0.0V DC', description: 'သန့်စင်ပြီး အနှုတ်လိုင်း' }
    ],
    specifications: {
      operatingVoltage: '5.0V DC Pull-up',
      resistance: '20°C တွင်: 2.0kΩ ~ 3.0kΩ / 40°C တွင်: 1.0kΩ ~ 1.5kΩ / 80°C တွင်: 250Ω ~ 400Ω'
    },
    testingSteps: [
      { step: 1, title: 'အပူချိန်အလိုက် အုမ်းတိုင်းခြင်း', description: 'ဆန်ဆာကို ဖြုတ်ပြီး 20kΩ မီတာဖြင့် တိုင်းပါ။ ဆံပင်လေမှုတ်စက်ဖြင့် အပူပေးကြည့်ပါက အုမ်းတန်ဖိုး အဆက်မပြတ် ကျဆင်းသွားရမည်။', tool: 'multimeter_ohm' },
      { step: 2, title: 'ပလပ်ပေါက် 5V စစ်ဆေးခြင်း', description: 'ပလပ်ဖြုတ်ထားစဉ် ပင် ၁ တွင် 5.0V မီးရောက်မရောက် စစ်ပါ။ 5V မရှိပါက ECU သို့မဟုတ် ဝါယာကြိုး ပြတ်နေပြီ။', tool: 'multimeter_v' }
    ],
    symptomsOfFailure: [
      'မနက်ပိုင်း အေးချိန်တွင် စက်နှိုးရ အလွန်ခက်ခဲခြင်း',
      'ရာသီဥတု ပူပြင်းချိန်တွင် ဆီစားများပြီး အင်ဂျင်အဆွဲအရုန်း ထိုင်းမှိုင်းခြင်း',
      'DTC P0110, P0112, P0113 တက်ခြင်း'
    ],
    diagnosticTips: 'ခေတ်သစ်ကားအများစုတွင် IAT ဆန်ဆာသည် MAF လေမီတာအတွင်း၌ တစ်ပါတည်း ပေါင်းစပ်တပ်ဆင်ထားသည်။'
  },

  // ================= 3. FLUIDS & TEMPERATURE =================
  {
    id: 'ect-sensor',
    nameEn: 'Engine Coolant Temperature Sensor',
    nameMy: 'အင်ဂျင်ရေအပူချိန်ဆန်ဆာ',
    acronym: 'ECT',
    category: 'fluids_temp',
    categoryNameMy: 'အရည်ဖိအား & အပူချိန်',
    type: 'NTC Thermistor (၂ ကြိုး ECU သုံး / ၃ ကြိုး ဒိုင်ခွက်ပူးတွဲသုံး)',
    workingPrinciple: 'အင်ဂျင်ရေလည်ပတ်မှု အပူချိန်ကို တိုင်းတာပြီး အင်ဂျင်နိုးချိန် ဆီပိုကျွေးခြင်း (Cold Start Enrichment)၊ စလိုးအမြန်တင်ခြင်း (Fast Idle)၊ ရေတိုင်ကီပန်ကာ အဖွင့်/အပိတ် ထိန်းချုပ်ခြင်း၊ ဂီယာ အမြင့်ဆုံးဂီယာ (Overdrive) ပေးမပြေးခြင်းတို့ကို ဆုံးဖြတ်သည်။ အင်ဂျင်အေးချိန် (20°C) တွင် 3.5V ~ 4.0V ရှိပြီး၊ ပုံမှန်အပူချိန် (85°C ~ 90°C) ရောက်ပါက 0.5V ~ 0.8V သို့ ကျဆင်းသွားသည်။',
    internalStructure: 'NTC Ceramic Thermistor Bead၊ အပူကူးသန်းမှု ကောင်းသော ကြေးဝါဘူးခွံ။',
    pinoutSummary: [
      { pin: 'Pin 1 (THW / Signal)', signalType: 'ECT Signal', standardValue: 'အေးချိန်: 3.5V ~ 4.0V / ပူချိန် (85°C): 0.5V ~ 0.8V', description: 'ရေအပူချိန် အချက်ပြဗို့' },
      { pin: 'Pin 2 (E2 / Ground)', signalType: 'Sensor Ground', standardValue: '0.0V DC', description: 'သီးသန့် အနှုတ်' }
    ],
    specifications: {
      operatingVoltage: '5.0V DC Pull-up Reference',
      resistance: '0°C: 5.0kΩ ~ 6.5kΩ / 20°C: 2.2kΩ ~ 2.8kΩ / 80°C: 280Ω ~ 350Ω'
    },
    testingSteps: [
      { step: 1, title: 'ရေနွေးပူထဲထည့်၍ အုမ်းစစ်ဆေးခြင်း', description: 'ဆန်ဆာကို ရေနွေးခွက်ထဲ နှစ်ပြီး မီတာဖြင့် တိုင်းပါ။ ရေပူလာသည်နှင့် အုမ်းတန်ဖိုး 2,500Ω မှ 300Ω သို့ ကျဆင်းသွားရမည်။', tool: 'multimeter_ohm' },
      { step: 2, title: 'ပလပ်ဖြုတ်ကြည့်၍ ပန်ကာလည်ခြင်း စစ်ဆေးခြင်း', description: 'စက်နှိုးထားစဉ် ECT ပလပ်ကို ဆွဲဖြုတ်လိုက်ပါက ECU သည် အန္တရာယ်ကာကွယ်ရန် ရေတိုင်ကီပန်ကာကို အမြင့်ဆုံး အမြန်နှုန်းဖြင့် အလိုအလျောက် လည်ပတ်စေရမည် (Failsafe operation)။', tool: 'multimeter_v' }
    ],
    symptomsOfFailure: [
      'ရေတိုင်ကီပန်ကာ အမြဲတမ်း တဝီဝီလည်နေခြင်း သို့မဟုတ် အင်ဂျင်ဆူသော်လည်း ပန်ကာ လုံးဝမလည်ခြင်း',
      'မနက်ပိုင်း အေးချိန်တွင် စက်နှိုးပြီးပြီးချင်း ပြန်သေသွားခြင်း',
      'အင်ဂျင်ပူနေသော်လည်း စလိုးအမြန်နှုန်း (High Idle 1,500 RPM) ကျမသွားခြင်း',
      'DTC P0115, P0117, P0118 တက်ခြင်း'
    ],
    diagnosticTips: 'ECT ဆန်ဆာချို့ယွင်းပါက အင်ဂျင်သည် အမြဲတမ်း အေးနေသည်ဟု ထင်ပြီး ဆီအဆမတန် ကျွေးနေသဖြင့် ဆီစား ၂ ဆ ဖြစ်သွားတတ်သည်။'
  },
  {
    id: 'frp-sensor',
    nameEn: 'Fuel Rail Pressure Sensor',
    nameMy: 'ကွန်မွန်းရေး ဆီဖိအားဆန်ဆာ',
    acronym: 'FRP',
    category: 'fluids_temp',
    categoryNameMy: 'အရည်ဖိအား & အပူချိန်',
    type: 'Piezoresistive Diaphragm Strain Gauge (၃ ကြိုး အမြင့်ဖိအားခံ)',
    workingPrinciple: 'Common Rail Diesel (300 မှ 2,200 bar အထိ) သို့မဟုတ် GDI Gasoline Direct Injection (40 မှ 200 bar) ဆီပိုက်လိုင်းအတွင်းရှိ အလွန်မြင့်မားသော ဆီဖိအားကို မိုက်ခရိုစက္ကန့်အတွင်း စောင့်ကြည့်တိုင်းတာသည်။ ဤအချက်ပြမှုအရ ECU သည် ဆီပန့်ရှိ SCV/IMV Valve ကို ထိန်းချုပ်ပြီး ဖိအားအတိုးအလျှော့ ပြုလုပ်သည်။',
    internalStructure: 'သံမဏိစတီးပြားပေါ်တွင် ပေါင်းစပ်ထားသော Piezo Strain Gauge ပတ်လမ်း၊ အကာအကွယ် အခွံမာ။',
    pinoutSummary: [
      { pin: 'Pin 1 (VC)', signalType: '5V Power Feed', standardValue: '5.0V DC (±0.05V)', description: 'ECU တည်ငြိမ် 5V' },
      { pin: 'Pin 2 (E2)', signalType: 'Sensor Ground', standardValue: '0.0V DC', description: 'သန့်စင်ပြီး ဂရောင်း' },
      { pin: 'Pin 3 (Signal)', signalType: 'Pressure Output Voltage', standardValue: 'စလိုး (300 bar): 1.0V ~ 1.3V / ဝန်ပြည့် (1,800 bar): 4.0V ~ 4.5V', description: 'ဆီဖိအား အချက်ပြဗို့' }
    ],
    specifications: {
      operatingVoltage: '5.0V DC',
      signalOutput: '0.5V (0 bar) ➔ 1.0V (Idle 25~35 MPa) ➔ 4.5V (Max Rail Pressure 180~200 MPa)'
    },
    testingSteps: [
      { step: 1, title: '5.0V ရည်ညွှန်းဗို့ တိကျမှုစစ်ဆေးခြင်း', description: 'ပင် ၁ နှင့် ၂ ကြား တိုင်းပါ။ 4.95V ~ 5.05V အတွင်း တိကျစွာ ရှိရမည်။ 5V ကျနေပါက ဆီဖိအား မှားဖတ်မည်။', tool: 'multimeter_v' },
      { step: 2, title: 'စက်နှိုး (Cranking) စဉ် အနိမ့်ဆုံးဗို့ တိုင်းခြင်း', description: 'ဒီဇယ်ကား စက်နှိုးနိုင်ရန် Common Rail ဖိအား အနည်းဆုံး 200 ~ 250 bar (ဗို့အား 0.8V ~ 1.0V) ရောက်မှသာ ECU က အင်ဂျက်တာကို ဖွင့်ပေးမည်။ 0.7V အောက်ဖြစ်နေပါက စက်လုံးဝ နှိုးမရပါ။', tool: 'multimeter_v' }
    ],
    symptomsOfFailure: [
      'စက်နှိုးမရခြင်း (Cranking သာဖြစ်ပြီး ဆီမလိုက်ခြင်း)',
      'လီဗာဆောင့်နင်းချိန် ရုတ်တရက် စက်သေသွားခြင်း (Common Rail Pressure Limiter ပွင့်ထွက်ခြင်း)',
      'ဒီဇယ်ဆီခေါက်သံ (Diesel Knock) အလွန်ကျယ်လောင်စွာ ထွက်ပေါ်ခြင်း',
      'DTC P0190, P0191, P0192, P0193 တက်ခြင်း'
    ],
    diagnosticTips: 'ဆီစစ်ဘူး (Fuel Filter) ပိတ်နေပါက လီဗာဆောင့်ချိန် ဆီမလောက်ဘဲ FRP ဖိအား ထိုးကျသွားပြီး အင်ဂျင် စက်သေတတ်သည်။'
  },
  {
    id: 'oil-press-sensor',
    nameEn: 'Engine Oil Pressure Sensor & Switch',
    nameMy: 'အင်ဂျင်ဝိုင်ဖိအားဆန်ဆာ & ခလုတ်',
    acronym: 'OPS',
    category: 'fluids_temp',
    categoryNameMy: 'အရည်ဖိအား & အပူချိန်',
    type: 'Diaphragm Switch (၁ ကြိုး) သို့မဟုတ် Transducer (၃ ကြိုး)',
    workingPrinciple: 'အင်ဂျင်ဝိုင်ပန့်မှ ထွက်လာသော အင်ဂျင်ဝိုင် ဖိအား (Oil Pressure) ကို တိုင်းတာသည်။ ပုံမှန် စက်မနှိုးမီ ဖိအားမရှိချိန်တွင် အနှုတ်မြေစိုက်နေသဖြင့် ဒိုင်ခွက်ပေါ်တွင် အင်ဂျင်ဝိုင်မီးနီ လင်းနေပြီး၊ စက်နှိုးလိုက်၍ ဆီဖိအား 0.3 ~ 0.5 bar ကျော်တက်လာသည်နှင့် ခလုတ်ပွင့်သွားကာ မီးနီ ပြန်ငြိမ်းသွားသည်။ ၃ ကြိုးဆန်ဆာသည် အင်ဂျင်ဝိုင်ဖိအား PSI ကို အတိအကျပြသည်။',
    internalStructure: 'Diaphragm Spring Contact (ခလုတ်) သို့မဟုတ် Ceramic Pressure Cell။',
    pinoutSummary: [
      { pin: 'Pin 1', signalType: 'Switch Ground or Signal', standardValue: 'စက်ပိတ်ချိန်: 0V Ground (မီးလင်း) / စက်နှိုးချိန်: Open (မီးငြိမ်း)', description: 'ဒိုင်ခွက်မီးနီ ထိန်းချုပ်လိုင်း' }
    ],
    specifications: {
      operatingVoltage: '12V Indicator Switch or 5V Transducer',
      threshold: '0.3 ~ 0.5 kgf/cm² (4 ~ 7 PSI) တွင် မီးသီးခလုတ် ဖွင့်/ပိတ် ပြုလုပ်သည်'
    },
    testingSteps: [
      { step: 1, title: 'အင်ဂျင်ရပ်တန့်ချိန်တွင် အုမ်းတိုင်းခြင်း', description: 'ဆန်ဆာပင်နှင့် ဘော်ဒီကြား တိုင်းပါ။ 0Ω (ဂရောင်းထိနေရမည်)။ စက်နှိုးလိုက်ပါက Infinity (ပြတ်တောက်သွားရမည်)။', tool: 'multimeter_ohm' },
      { step: 2, title: 'ဆီပေါင်နာရီ (Mechanical Gauge) ထိုးစစ်ဆေးခြင်း', description: 'အင်ဂျင်ဝိုင်မီးနီ လင်းနေပါက ဆန်ဆာချွတ်ပြီး ဆီပေါင်နာရီ အစစ်ထိုးပါ။ စလိုးတွင် အနည်းဆုံး 15 ~ 25 PSI၊ လီဗာတွင် 45 ~ 65 PSI ရှိရမည်။', tool: 'multimeter_v' }
    ],
    symptomsOfFailure: [
      'စက်နှိုးထားသော်လည်း အင်ဂျင်ဝိုင်မီးနီ အမြဲလင်းနေခြင်း သို့မဟုတ် လုံးဝမလင်းခြင်း',
      'အင်ဂျင်ဝိုင်ပေါင်ကျသဖြင့် မိန်းဘယ်ရင်/ကွန်ရော့ဘယ်ရင်များ ချောဆီမရဘဲ အင်ဂျင်ဂျမ်းဖြစ်ခြင်း (Seized Engine)',
      'DTC P0520, P0521, P0522 တက်ခြင်း'
    ],
    diagnosticTips: 'အင်ဂျင်ဝိုင်မီးနီ လင်းလာပါက စက်ချက်ချင်းရပ်ပါ။ ဆန်ဆာချွတ်ယွင်းခြင်း မဟုတ်ဘဲ အင်ဂျင်ဝိုင်ပန့်ပျက်ခြင်း သို့မဟုတ် ဘယ်ရင်ပွန်းနေခြင်း ဖြစ်နိုင်သောကြောင့် ဖြစ်သည်။'
  },

  // ================= 4. EXHAUST & EMISSIONS =================
  {
    id: 'o2-sensor',
    nameEn: 'Oxygen Sensor (Narrowband Lambda)',
    nameMy: 'အောက်ဆီဂျင်ဆန်ဆာ (မီးခိုးဆန်ဆာ)',
    acronym: 'O2S',
    category: 'exhaust',
    categoryNameMy: 'အိပ်ဇော & ဓာတ်ငွေ့သန့်စင်မှု',
    type: 'Zirconia Solid Electrolyte (၁၊ ၂၊ ၃ သို့မဟုတ် ၄ ကြိုး)',
    workingPrinciple: 'အိပ်ဇောငွေ့ထဲရှိ အောက်ဆီဂျင် ပမာဏနှင့် ပြင်ပလေထုထဲရှိ အောက်ဆီဂျင် ပမာဏ ကွာခြားချက်ကို အခြေခံပြီး 0.1V မှ 0.9V အထိ လျှပ်စစ်ဓာတ်အား ထုတ်ပေးသည်။ ဆီပါးနေပါက (Lean) 0.1V ~ 0.2V ထုတ်ပြီး၊ ဆီထူနေပါက (Rich) 0.8V ~ 0.9V ထုတ်ပေးသည်။ အလုပ်လုပ်နိုင်ရန် အပူချိန် အနည်းဆုံး 300°C လိုအပ်သဖြင့် အတွင်းတွင် ဟီတာကွိုင် (Heater) ပါရှိသည်။',
    internalStructure: 'Zirconium Dioxide Thimble Tube၊ Platinum Electrodes (ပလက်တီနမ်ပြား)၊ Ceramic Heater Rod။',
    pinoutSummary: [
      { pin: 'Black / Black (Pins 1, 2)', signalType: 'Heater +12V & Ground', standardValue: 'Resistance: 10Ω ~ 16Ω', description: 'အပူပေး ဟီတာကွိုင် ၂ ပင်' },
      { pin: 'Blue / White (Pin 3)', signalType: 'O2 Signal (+)', standardValue: '0.1V (Lean) ➔ 0.9V (Rich) အဆက်မပြတ် လှိုင်းထနေရမည်', description: 'မီးခိုး အချက်ပြဗို့' },
      { pin: 'Grey (Pin 4)', signalType: 'Sensor Ground (-)', standardValue: '0.0V DC', description: 'သီးသန့် ဂရောင်း' }
    ],
    specifications: {
      operatingVoltage: 'Signal: 0.1V ~ 0.9V DC / Heater: 12V Battery Power',
      resistance: 'Heater Resistance: 10Ω ~ 16Ω (အေးချိန်)'
    },
    testingSteps: [
      { step: 1, title: 'ဟီတာကွိုင် အုမ်းတိုင်းခြင်း', description: 'အရောင်တူ ကြိုး ၂ ပင် (အများအားဖြင့် အနက် ၂ ပင်) ကြား တိုင်းပါ။ 10Ω ~ 16Ω ရှိရမည်။ Infinity ပြပါက ဟီတာပြတ်နေပြီ။', tool: 'multimeter_ohm' },
      { step: 2, title: 'စက်နွေးပြီးချိန် Signal လှိုင်းတက်/ကျ တိုင်းခြင်း', description: 'အင်ဂျင် ပုံမှန်နွေးပြီးချိန် Signal ကြိုးကို တိုင်းပါ။ တစ်စက္ကန့်လျှင် ၂ ကြိမ်မှ ၃ ကြိမ်ခန့် 0.1V နှင့် 0.9V ကြား အဆက်မပြတ် လှိုင်းထ ခုန်နေရမည် (Rich/Lean Switching)။', tool: 'multimeter_v' }
    ],
    symptomsOfFailure: [
      'ဆီစား အဆမတန် များပြားလာခြင်း (Fuel consumption increases by 20~30%)',
      'အိပ်ဇောမှ ဆီစိမ်းနံ့ နံခြင်း၊ ကာတလစ်ဆီ ပိတ်ခြင်း (Catalytic Converter damage)',
      'စလိုးမငြိမ်ဘဲ မီးခိုးငွေ့ မသန့်ရှင်းခြင်း',
      'DTC P0130, P0133 (Slow Response), P0135 (Heater Circuit), P0420 (Catalyst Efficiency)'
    ],
    diagnosticTips: 'ဆန်ဆာထိပ်ဝတွင် ဆီဂျီးအမည်းများ အလွန်အမင်း ကပ်နေပါက တုံ့ပြန်မှု နှေးကွေးပြီး အင်ဂျင် ဆီစားများစေသည်။'
  },
  {
    id: 'af-sensor',
    nameEn: 'Air-Fuel Ratio Sensor (Wideband O2)',
    nameMy: 'အကျယ်အဝန်း လေဆီအချိုးဆန်ဆာ (ဝိုက်ဘန်းဆန်ဆာ)',
    acronym: 'A/F Sensor',
    category: 'exhaust',
    categoryNameMy: 'အိပ်ဇော & ဓာတ်ငွေ့သန့်စင်မှု',
    type: 'Planar Wideband Limiting Current Sensor (၄ သို့မဟုတ် ၅ ကြိုး)',
    workingPrinciple: 'ခေတ်ဟောင်း O2 Sensor ကဲ့သို့ ဆီထူ/ဆီပါး ၂ မျိုးတည်း မဟုတ်ဘဲ၊ လေနှင့်ဆီ အချိုး (AFR 10:1 မှ 20:1 အထိ) မည်မျှအတိအကျ ရောစပ်နေသည်ကို တိုင်းတာပေးသည်။ ဗို့အားဖြင့် တိုင်းတာခြင်း မဟုတ်ဘဲ အောက်ဆီဂျင် ပန့်ဆဲလ် (Nernst Cell & Pump Cell) အတွင်း စီးဆင်းသော အလွန်သေးငယ်သည့် မီလီအမ်ပီယာ (Milliampere mA) စီးကြောင်းဖြင့် တိုင်းတာသည်။',
    internalStructure: 'Nernst Concentration Cell, Oxygen Pumping Cell, Diffusion Gap, Fast-heating Ceramic Element.',
    pinoutSummary: [
      { pin: 'Pin 1, 2', signalType: 'A/F Heater (+ / -)', standardValue: '1.5Ω ~ 4.0Ω (Low Resistance Fast Heater)', description: 'အမြန်အပူပေး ဟီတာကွိုင်' },
      { pin: 'Pin 3 (A1+)', signalType: 'Reference Voltage', standardValue: '3.3V DC (Toyota/Denso)', description: 'ECU မှ ထိန်းထားသော အခြေခံဗို့' },
      { pin: 'Pin 4 (A1-)', signalType: 'Pump Current Line', standardValue: '3.0V DC (Baseline)', description: 'ဆီထူ/ဆီပါးအရ mA လျှပ်စီးကြောင်း ပြောင်းလဲစီးဆင်းသောလိုင်း' }
    ],
    specifications: {
      operatingVoltage: 'Heater: Duty-cycle controlled 12V / Signal: Differential Current (mA)',
      resistance: 'Heater: 1.5Ω ~ 4.0Ω (Heater resistance is much lower than standard O2)'
    },
    testingSteps: [
      { step: 1, title: 'ဟီတာကွိုင် ခုခံအား စစ်ဆေးခြင်း', description: 'ဟီတာ ၂ ပင်ကြား တိုင်းပါ။ 1.5Ω ~ 3.5Ω အလွန်နိမ့်သော အုမ်းတန်ဖိုး ရှိရမည်။', tool: 'multimeter_ohm' },
      { step: 2, title: 'ECU Data Stream စစ်ဆေးခြင်း', description: 'Wideband ဆန်ဆာသည် မီတာရိုးရိုးဖြင့် တိုင်းရန် ခက်ခဲသဖြင့် OBD2 Scanner Data တွင် A/F Voltage (3.3V တည်ငြိမ်မှု) နှင့် Equivalence Ratio (Lambda = 1.0) ကို စစ်ဆေးပါ။', tool: 'multimeter_v' }
    ],
    symptomsOfFailure: [
      'အင်ဂျင် မီးခိုးအလွန်မည်းခြင်း၊ အင်ဂျင်မီးလင်းခြင်း',
      'ဆီစားနှုန်း အဆမတန် မြင့်တက်လာခြင်း',
      'DTC P2195 (Signal Stuck Lean), P2196 (Signal Stuck Rich), P0031 (Heater Control Circuit Low)'
    ],
    diagnosticTips: 'A/F Sensor နေရာတွင် သာမန် O2 Sensor အဟောင်းကို အစားထိုး တပ်ဆင်၍ လုံးဝ မရပါ။ စနစ်ချင်း လုံးဝ မတူညီပါ။'
  },
  {
    id: 'dpf-diff-sensor',
    nameEn: 'DPF Differential Pressure Sensor',
    nameMy: 'ဒီဇယ်မီးခိုးအိုး ဖိအားကွာဟချက်ဆန်ဆာ',
    acronym: 'DPS / Delta-P',
    category: 'exhaust',
    categoryNameMy: 'အိပ်ဇော & ဓာတ်ငွေ့သန့်စင်မှု',
    type: 'Differential Pressure Piezo Transducer (၃ ကြိုး + လေပိုက် ၂ လိုင်း)',
    workingPrinciple: 'ဒီဇယ်ကားကြီးများ၏ DPF (Diesel Particulate Filter) မီးခိုးအိုး မဝင်မီ ဖိအား (Upstream) နှင့် မီးခိုးအိုး အထွက်ဖိအား (Downstream) ကြား ကွာဟချက်ကို တိုင်းတာသည်။ မီးခိုးအိုးထဲတွင် မီးခိုးဂျီးနှင့် ချိုးများ (Soot & Ash) ပိတ်ဆို့လာပါက အဝင်ဖိအား အလွန်မြင့်တက်လာသဖြင့် ဖိအားကွာဟချက် ဗို့အား မြင့်တက်သွားပြီး ECU က အလိုအလျောက် အပူပေး ဂျီးချွတ်ခြင်း (DPF Regeneration) စတင်စေသည်။',
    internalStructure: 'High-temp Silicon Pressure Sensor Core၊ သတ္တု အဝင်/အထွက် ပိုက်လိုင်း ၂ ခု။',
    pinoutSummary: [
      { pin: 'Pin 1 (5V)', signalType: 'Reference Supply', standardValue: '5.0V DC', description: 'ECU 5V' },
      { pin: 'Pin 2 (Ground)', signalType: 'Sensor Ground', standardValue: '0.0V DC', description: 'သန့်စင်ပြီး အနှုတ်' },
      { pin: 'Pin 3 (Signal)', signalType: 'Differential Signal', standardValue: 'မပိတ်မီ (Clean): 0.5V ~ 0.8V / ဂျီးပိတ်ချိန်: 2.5V ~ 4.0V', description: 'ဖိအားကွာဟချက် အချက်ပြဗို့' }
    ],
    specifications: {
      operatingVoltage: '5.0V DC',
      signalOutput: '0.5V (0 kPa Delta) ➔ 4.5V (Max Differential Pressure)'
    },
    testingSteps: [
      { step: 1, title: 'လေပိုက် ၂ လိုင်း ပေါက်ပြဲမှု စစ်ဆေးခြင်း', description: 'မီးခိုးအိုးမှ ဆန်ဆာဆီသို့ ဆက်ထားသော သံပိုက်နှင့် ရော်ဘာပိုက်များ အပူလောင်ပေါက်ပြဲနေခြင်း၊ ဂျီးပိတ်နေခြင်း ရှိမရှိ စစ်ပါ။', tool: 'multimeter_v' },
      { step: 2, title: 'စလိုးနှင့် လီဗာဆောင့်ချိန် ဗို့အား စစ်ဆေးခြင်း', description: 'စလိုးတွင် 0.5V ~ 0.8V ရှိပြီး၊ လီဗာဆောင့်ချိန်တွင် 1.5V ~ 2.0V အထိသာ တက်ရမည်။ စလိုးတင် 2.5V အထက် ဖြစ်နေပါက DPF မီးခိုးအိုး အလွန်ပိတ်နေပြီ။', tool: 'multimeter_v' }
    ],
    symptomsOfFailure: [
      'ဒိုင်ခွက်ပေါ်တွင် DPF မီးနီ/မီးဝါ လင်းလာခြင်း၊ ကားဆွဲအား လုံးဝ ကျသွားခြင်း (Limp Mode)',
      'အလိုအလျောက် Regeneration စနစ် အလုပ်မလုပ်တော့ခြင်း',
      'DTC P2452, P2453, P2454, P2463 (DPF Soot Accumulation)'
    ],
    diagnosticTips: 'ဆန်ဆာလဲလှယ်ပြီးပါက သို့မဟုတ် DPF ဂျီးချွတ်ပြီးပါက Scanner ဖြင့် DPF Sensor Reset / Adaptation ပြုလုပ်ပေးရပါမည်။'
  },

  // ================= 5. TRANSMISSION & DRIVETRAIN =================
  {
    id: 'iss-sensor',
    nameEn: 'Transmission Input Shaft Speed Sensor',
    nameMy: 'ဂီယာအဝင် လည်ပတ်နှုန်းဆန်ဆာ (တာဘိုင်လည်နှုန်းဆန်ဆာ)',
    acronym: 'ISS / Turbine Speed (NT)',
    category: 'transmission',
    categoryNameMy: 'ဂီယာ & မောင်းနှင်မှုစနစ်',
    type: 'Hall Effect သို့မဟုတ် Magnetic Inductive (၂ သို့မဟုတ် ၃ ကြိုး)',
    workingPrinciple: 'အော်တိုဂီယာဘောက်စ်အတွင်း တော်ခွန်ဗာတာ (Torque Converter) ၏ တာဘိုင်ဒလက်မှ ဂီယာအဝင်ဝင်ရိုးသို့ ပို့ပေးသော အမှန်တကယ် လည်ပတ်နှုန်းကို တိုင်းတာသည်။ အင်ဂျင်လည်နှုန်း (RPM) နှင့် တာဘိုင်လည်နှုန်းကို နှိုင်းယှဉ်ပြီး တော်ခွန်ဗာတာ ဆလစ်ဖြစ်မှု (Torque Converter Slip) နှင့် လော့အပ်ကလပ် (Lock-up Clutch) အခြေအနေကို ဂီယာကွန်ပျူတာ (TCM) က တွက်ချက်သည်။',
    internalStructure: 'သံလိုက်အူတိုင်၊ ဝါယာကွိုင်နှင့် အပူဒဏ်/ဆီဒဏ်ခံ အကာအကွယ်ခွံ။',
    pinoutSummary: [
      { pin: 'Pin 1', signalType: 'Signal (+)', standardValue: 'AC Frequency or 5V Pulse', description: 'လည်နှုန်း အချက်ပြလိုင်း' },
      { pin: 'Pin 2', signalType: 'Ground (-)', standardValue: '0V Ground', description: 'အနှုတ်လိုင်း' }
    ],
    specifications: {
      operatingVoltage: 'Passive: AC output / Active: 5V or 12V',
      resistance: 'Passive Magnetic: 400Ω ~ 800Ω'
    },
    testingSteps: [
      { step: 1, title: 'အတွင်းပိုင်း ခုခံအား အုမ်းတိုင်းခြင်း', description: 'ဆန်ဆာပင် ၂ ခုကြား တိုင်းပါ။ 400Ω ~ 800Ω ဝန်းကျင် ရှိရမည်။', tool: 'multimeter_ohm' },
      { step: 2, title: 'ဂီယာမောင်းနှင်စဉ် လည်နှုန်းစစ်ဆေးခြင်း', description: 'ကားမောင်းနေစဉ် Scanner တွင် Turbine Speed နှင့် Engine RPM တူညီစွာ လိုက်တက်မတက် စစ်ဆေးပါ။', tool: 'multimeter_v' }
    ],
    symptomsOfFailure: [
      'ဂီယာပြောင်းချိန် အလွန်ကြမ်းတမ်းစွာ ဆောင့်ခြင်း (Harsh shifting)',
      'ဂီယာ ၃ သို့မဟုတ် ၄ မတက်ဘဲ ဂီယာလွတ်နေခြင်း (Limp Mode / Safe Mode)',
      'DTC P0715, P0716, P0717 တက်ခြင်း'
    ],
    diagnosticTips: 'ဆန်ဆာထိပ်ဝတွင် ဂီယာဝိုင်ထဲမှ သံမှုန့်သံစများ ကပ်နေပါက သံလိုက်စက်ကွင်း ကွယ်သွားပြီး လည်နှုန်း မဖတ်နိုင် ဖြစ်တတ်သည်။'
  },
  {
    id: 'oss-sensor',
    nameEn: 'Transmission Output Shaft Speed Sensor / VSS',
    nameMy: 'ဂီယာအထွက် လည်ပတ်နှုန်းဆန်ဆာ (ကားအမြန်နှုန်းဆန်ဆာ)',
    acronym: 'OSS / VSS (SP2)',
    category: 'transmission',
    categoryNameMy: 'ဂီယာ & မောင်းနှင်မှုစနစ်',
    type: 'Hall Effect သို့မဟုတ် Magnetic Inductive',
    workingPrinciple: 'ဂီယာဘောက်စ်၏ အထွက်ဝင်ရိုး (Output Shaft) လည်ပတ်နှုန်းကို တိုင်းတာပြီး ကားအမြန်နှုန်း (Vehicle Speed - km/h သို့မဟုတ် mph) ကို ဒိုင်ခွက်ပေါ်တွင် ပြသစေသလို ဂီယာဘယ်အချိန် ပြောင်းရမည် (Shift Scheduling) ကို ဆုံးဖြတ်ပေးသည်။ Input Speed နှင့် Output Speed ကို နှိုင်းယှဉ်၍ ဂီယာဆလစ်ဖြစ်နေသလားကို စစ်ဆေးသည်။',
    internalStructure: 'သံလိုက်အူတိုင်၊ Hall ချစ်ပ် သို့မဟုတ် ကွိုင်ပတ်လမ်း။',
    pinoutSummary: [
      { pin: 'Pin 1', signalType: 'Power Feed', standardValue: '12V or 5V (Active)', description: 'ပါဝါလိုင်း' },
      { pin: 'Pin 2', signalType: 'Speed Signal Pulse', standardValue: '4 pulses per revolution (Wave)', description: 'အမြန်နှုန်း အချက်ပြဗို့' },
      { pin: 'Pin 3', signalType: 'Ground', standardValue: '0V', description: 'အနှုတ်' }
    ],
    specifications: {
      operatingVoltage: '12V or 5V Supply',
      signalOutput: '0V to 5V Digital Square Wave (Speed proportional)'
    },
    testingSteps: [
      { step: 1, title: 'ဘီးလှည့်၍ ဗို့အားခုန်ခြင်း စစ်ဆေးခြင်း', description: 'ဂျိုက်ထောက်ပြီး ဘီးကို လက်ဖြင့် လှည့်ကြည့်ပါ။ Signal ကြိုးတွင် 0V နှင့် 5V အကူးအပြောင်း ဒစ်ဂျစ်တယ် လှိုင်းထရမည်။', tool: 'multimeter_v' },
      { step: 2, title: 'ဒိုင်ခွက် ကီလိုတံ စစ်ဆေးခြင်း', description: 'ကားမောင်းချိန် ဒိုင်ခွက်ကီလိုတံ ငြိမ်နေပါက သို့မဟုတ် လှုပ်ခါနေပါက OSS ဆန်ဆာ ချို့ယွင်းနေပြီ။', tool: 'multimeter_v' }
    ],
    symptomsOfFailure: [
      'ဒိုင်ခွက်ပေါ်တွင် မိုင်တံ/ကီလိုတံ (Speedometer) လုံးဝ မတက်တော့ခြင်း',
      'ဂီယာ အမြင့်သို့ မတက်ဘဲ ဂီယာ ၁ သို့မဟုတ် ၂ တွင်သာ အမြဲတန်း ကျန်နေခြင်း',
      'Cruise Control စနစ် အလုပ်မလုပ်တော့ခြင်း',
      'DTC P0720, P0721, P0722, P0500 တက်ခြင်း'
    ],
    diagnosticTips: 'ခေတ်သစ် ကားများတွင် အမြန်နှုန်းကို ဂီယာဆန်ဆာအစား ABS Wheel Speed Sensor ၄ ဘီးမှ ပျမ်းမျှယူ၍ ဒိုင်ခွက်သို့ CAN Bus ဖြင့် ပို့လေ့ရှိသည်။'
  },
  {
    id: 'tft-sensor',
    nameEn: 'Transmission Fluid Temperature Sensor',
    nameMy: 'ဂီယာဝိုင် အပူချိန်ဆန်ဆာ',
    acronym: 'TFT',
    category: 'transmission',
    categoryNameMy: 'ဂီယာ & မောင်းနှင်မှုစနစ်',
    type: 'NTC Thermistor (၂ ကြိုး)',
    workingPrinciple: 'အော်တိုဂီယာဘောက်စ် ဗားဘော်ဒီ (Valve Body) အတွင်းရှိ ဂီယာဝိုင်၏ အပူချိန်ကို တိုင်းတာသည်။ ဂီယာဝိုင် အေးနေချိန်တွင် ဂီယာပြောင်းမှု မချောမွေ့သဖြင့် အပူပေးရန် ဂီယာဆိုင်းငံ့ထားပြီး၊ ဂီယာဝိုင် အလွန်ပူလာပါက (120°C ကျော်) ဂီယာလော့အပ်ကလပ်ကို ချိတ်ဆက်ပေးကာ အပူလျှော့ချပေးသည်။',
    internalStructure: 'NTC Thermistor ပုတီးစေ့ငယ်၊ ဆီခံဝါယာကြိုး ပလပ်ခေါင်း။',
    pinoutSummary: [
      { pin: 'Pin 1', signalType: 'TFT Signal (+)', standardValue: '20°C: 3.0V ~ 3.5V / 80°C: 1.0V ~ 1.5V', description: 'ဂီယာဝိုင်အပူချိန် အချက်ပြ' },
      { pin: 'Pin 2', signalType: 'Ground (-)', standardValue: '0.0V DC', description: 'အနှုတ်' }
    ],
    specifications: {
      operatingVoltage: '5.0V Pull-up',
      resistance: '20°C: 2.0kΩ ~ 3.5kΩ / 100°C: 200Ω ~ 350Ω'
    },
    testingSteps: [
      { step: 1, title: 'အပူချိန်အလိုက် ခုခံအား တိုင်းခြင်း', description: 'ဆန်ဆာပလပ်တွင် အုမ်းတိုင်းပါ။ ဂီယာဝိုင် ပူလာသည်နှင့် အုမ်းတန်ဖိုး ကျဆင်းသွားရမည်။', tool: 'multimeter_ohm' }
    ],
    symptomsOfFailure: [
      'ဂီယာလော့အပ် (Lock-up) မဝင်တော့ခြင်း၊ ဂီယာအပူလွန်ကဲ၍ A/T Oil Temp မီးနီ လင်းလာခြင်း',
      'မနက်ပိုင်း စက်နှိုးပြီးစတွင် ဂီယာပြောင်းရ အလွန်လေးလံနေခြင်း',
      'DTC P0710, P0711, P0712, P0713 တက်ခြင်း'
    ],
    diagnosticTips: 'TFT ဆန်ဆာ ချို့ယွင်းပါက ဂီယာဝိုင် မည်မျှပူသည်ကို မသိသဖြင့် ဂီယာကလပ်ပြားများ လောင်ကျွမ်းပျက်စီးတတ်သည်။'
  },

  // ================= 6. CHASSIS & BRAKING =================
  {
    id: 'wss-sensor',
    nameEn: 'ABS Wheel Speed Sensor',
    nameMy: 'ဘီးလည်နှုန်းဆန်ဆာ (အေဘီအက်စ်ဆန်ဆာ)',
    acronym: 'WSS / ABS',
    category: 'chassis_safety',
    categoryNameMy: 'ဘရိတ် & ဘေးကင်းရေးစနစ်',
    type: 'Passive (၂ ကြိုး သံလိုက်ကွိုင်) / Active (၂ ကြိုး Magnetoresistive 7mA/14mA)',
    workingPrinciple: 'ဘီး ၄ ဘီးစလုံး၏ အမှန်တကယ် လည်ပတ်နှုန်းကို တိုင်းတာသည်။ ဘရိတ်ဖမ်းချိန် ဘီးတစ်ဘီးဘီး ရပ်တန့် (Lock-up) ဖြစ်သွားပါက ကားစလစ်မဖြစ်စေရန် ABS Modulator မှတစ်ဆင့် ဘရိတ်ဖိအားကို ခွဲခြမ်းစက္ကန့်အတွင်း လွှတ်လိုက်/ဖမ်းလိုက် ပြုလုပ်ပေးသည်။ Traction Control (TRC) နှင့် Stability Control (VSC/ESP) စနစ်များအတွက်လည်း အဓိက အချက်ပြမှု ဖြစ်သည်။',
    internalStructure: 'သံလိုက်အူတိုင် (Passive) သို့မဟုတ် Hall / MR Element ချစ်ပ်ပြား (Active - သံလိုက်ဘယ်ရင်ပြား Tone Ring ကို ဖတ်သည်)။',
    pinoutSummary: [
      { pin: 'Pin 1 (Power / Signal)', signalType: 'Supply & Current Signal', standardValue: 'Active: 12V Supply, 7mA (Low) / 14mA (High)', description: 'ပါဝါနှင့် လျှပ်စီးကြောင်း အချက်ပြ' },
      { pin: 'Pin 2 (Ground / Return)', signalType: 'Signal Return / Ground', standardValue: '0.0V DC', description: 'အနှုတ်လိုင်း' }
    ],
    specifications: {
      operatingVoltage: 'Passive: 0.5V ~ 5V AC / Active: 12V DC Supply',
      resistance: 'Passive Type: 1,000Ω ~ 1,600Ω (Active Type ကို အုမ်းတိုင်း၍ မရပါ - Diode စနစ်ဖြင့်သာ တိုင်းရသည်)'
    },
    testingSteps: [
      { step: 1, title: 'Passive အမျိုးအစား အုမ်းတိုင်းခြင်း', description: 'ဆန်ဆာပလပ်တွင် 2kΩ မီတာဖြင့် တိုင်းပါ။ 1,000Ω ~ 1,500Ω ရှိရမည်။ Infinity ပြပါက ကွိုင်ပြတ်နေပြီ။', tool: 'multimeter_ohm' },
      { step: 2, title: 'Active အမျိုးအစား ပါဝါ စစ်ဆေးခြင်း', description: 'သော့ ON ထားပြီး ပလပ်တွင် 11V ~ 12V မီးရောက်မရောက် စစ်ပါ။', tool: 'multimeter_v' },
      { step: 3, title: 'ဘီးလှည့်၍ လျှပ်စီးကြောင်း (mA) သို့မဟုတ် ဗို့ခုန်ခြင်း တိုင်းခြင်း', description: 'ဘီးကို လက်ဖြင့် ဖြည်းဖြည်းချင်း လှည့်စဉ် 0.7V နှင့် 1.4V အကူးအပြောင်း လှိုင်းထမထ စစ်ဆေးပါ။', tool: 'multimeter_v' }
    ],
    symptomsOfFailure: [
      'ဒိုင်ခွက်ပေါ်တွင် ABS မီးဝါ နှင့် လျှောချော်ပုံစံ မီးသီးများ အမြဲလင်းနေခြင်း',
      'ဘရိတ်သာမန်နင်းသော်လည်း ခြေထောက်အောက်တွင် "တုန်တုန် တုန်တုန်" ဟု ဘရိတ်ဆောင့်ကန်ခြင်း',
      'DTC C0200, C0205, C0210, C0215 (Wheel Speed Sensor Circuit)'
    ],
    diagnosticTips: 'Active Sensor အမျိုးအစား တပ်ဆင်ထားသော ကားများတွင် ဘီးဘယ်ရင် (Wheel Bearing) လဲလှယ်သည့်အခါ သံလိုက်အခြမ်း (Magnetic Encoder Side) ကို ဆန်ဆာဘက်သို့ မျက်နှာမူ၍ မှန်ကန်စွာ တပ်ဆင်ရပါမည်။ မှားတပ်ပါက အမြန်နှုန်း လုံးဝ မဖတ်နိုင်ပါ။'
  },
  {
    id: 'sas-sensor',
    nameEn: 'Steering Angle Sensor',
    nameMy: 'စတီယာရင် ကွေ့ထောင့်ဒီဂရီဆန်ဆာ',
    acronym: 'SAS',
    category: 'chassis_safety',
    categoryNameMy: 'ဘရိတ် & ဘေးကင်းရေးစနစ်',
    type: 'Optical Multi-turn / Magnetoresistive CAN Bus (Clockspring အနောက်တွင် တပ်ဆင်သည်)',
    workingPrinciple: 'စတီယာရင်ခွေကို ဘယ်ဘက်/ညာဘက် မည်မျှဒီဂရီ ကွေ့ထားသလဲ (Angle) နှင့် မည်မျှအမြန်နှုန်းဖြင့် လှည့်လိုက်သလဲ (Steering Rate) ကို တိုင်းတာသည်။ ကား ချော်ထွက်ခြင်း၊ လွင့်ထွက်ခြင်း မဖြစ်စေရန် Electronic Stability Control (ESP/VSC) က ဘီးတစ်ဘီးချင်းစီကို အလိုအလျောက် ဘရိတ်ဖမ်းထိန်းသိမ်းပေးရန် ဤဆန်ဆာကို အသုံးပြုသည်။',
    internalStructure: 'LED အလင်းနှင့် Phototransistor ချစ်ပ်များ သို့မဟုတ် သံလိုက်ဂီယာသွားစနစ်၊ Microprocessor ပတ်လမ်း။',
    pinoutSummary: [
      { pin: 'Pin 1 (BATT)', signalType: 'Constant 12V', standardValue: '12.6V DC', description: 'အမြဲပါဝါ (စတီယာရင် အလယ်မှတ် မှတ်သားရန်)' },
      { pin: 'Pin 2 (IGN)', signalType: 'Switched 12V', standardValue: '12V (Key ON)', description: 'သော့ပါဝါ' },
      { pin: 'Pin 3 (GND)', signalType: 'Ground', standardValue: '0V', description: 'အနှုတ်' },
      { pin: 'Pin 4, 5 (CAN)', signalType: 'CAN High & CAN Low', standardValue: '2.5V Baseline', description: 'ကွန်ရက် အချက်ပြလိုင်းများ' }
    ],
    specifications: {
      operatingVoltage: '12V DC Supply',
      signalOutput: 'Steering Center: 0.0° (Left: -540° to Right: +540°)'
    },
    testingSteps: [
      { step: 1, title: 'ဘက်ထရီ အမြဲပါဝါနှင့် ဂရောင်း စစ်ဆေးခြင်း', description: 'BATT ပင်တွင် အမြဲ 12V ရှိမရှိ စစ်ပါ။ ဘက်ထရီဖြုတ်ထားပါက စတီယာရင် အလယ်မှတ် (Zero Point) ပျက်သွားတတ်သည်။', tool: 'multimeter_v' },
      { step: 2, title: 'Zero Point Calibration စစ်ဆေးခြင်း', description: 'ဘီးတည့်တည့် ထားချိန်တွင် Scanner တွင် 0.0° ပြသရမည်။ ဒီဂရီလွဲနေပါက Steering Angle Calibration ပြန်လည်ချိန်ညှိပေးရမည်။', tool: 'multimeter_v' }
    ],
    symptomsOfFailure: [
      'စတီယာရင် တည့်တည့်မောင်းနေသော်လည်း VSC / ESP မီး လင်းနေခြင်း',
      'အကွေ့တွင် ဘရိတ်များ အလိုအလျောက် ညှပ်ဖမ်းပြီး စက်သံထိုးကျသွားခြင်း',
      'DTC C1231, C1290 (Steering Angle Sensor Zero Point)'
    ],
    diagnosticTips: 'ကားအောက်ပိုင်း ဘောလ်ဂျွိုင်း၊ တိုင်ရော့အန်း လဲလှယ်ပြီး ဝှီးအလိုင်းမင်း (Wheel Alignment) ချိန်ပြီးတိုင်း SAS Zero Point Calibration မဖြစ်မနေ ပြန်လည်ပြုလုပ်ရပါမည်။'
  },
  {
    id: 'yaw-sensor',
    nameEn: 'Yaw Rate & Lateral G-Sensor',
    nameMy: 'ကားလွင့်/စောင်း ဖမ်းဆန်ဆာ',
    acronym: 'YAW / G-Sensor',
    category: 'chassis_safety',
    categoryNameMy: 'ဘရိတ် & ဘေးကင်းရေးစနစ်',
    type: 'MEMS Micro-electromechanical Gyroscope & Accelerometer',
    workingPrinciple: 'ကား၏ အလယ်ဗဟို (Center Console အောက်) တွင် တပ်ဆင်ထားပြီး၊ ကားတစ်စီးလုံး အလျားလိုက် ကွေ့ပတ်သည့်နှုန်း (Yaw Rate) နှင့် ဘေးသို့ စောင်းထွက်လွင့်ထွက်သည့် အရှိန်အား (Lateral G-Force) ကို တိုင်းတာသည်။ ယာဉ်မောင်းသူ လှည့်လိုသော စတီယာရင်ထောင့်နှင့် ကားအမှန်တကယ် ကွေ့သည့်လမ်းကြောင်း မတူညီပါက ကားလွင့်ထွက်တော့မည်ကို သိရှိပြီး ESP စနစ်ကို ချက်ချင်း အလုပ်လုပ်စေသည်။',
    internalStructure: 'Micro Silicon Tuning Fork (ဆီလီကွန် တုန်ခါချောင်း)၊ Capacitive Detection Circuit၊ CAN Interface။',
    pinoutSummary: [
      { pin: 'Pins', signalType: 'Power, Ground, CAN H/L', standardValue: '12V Power, 0V Ground, CAN 2.5V', description: 'CAN Bus ဖြင့် အချက်ပြပို့သော စနစ်' }
    ],
    specifications: {
      operatingVoltage: '12V Switched Power',
      signalOutput: 'Rest state: 0.0 deg/sec / 0.0 G'
    },
    testingSteps: [
      { step: 1, title: 'Scanner Data တွင် Zero Level စစ်ဆေးခြင်း', description: 'ကားကို ညီညာသော မြေပြင်ပေါ်တွင် ရပ်ထားစဉ် Yaw Rate သည် 0.0 deg/s ဖြစ်ရမည်။', tool: 'multimeter_v' }
    ],
    symptomsOfFailure: [
      'သာမန် ကွေ့ရုံဖြင့် ကားစလစ်ဖြစ်သည်ဟု ထင်ပြီး ESP မီးလင်းကာ ဘရိတ်တဖျစ်ဖျစ် အလိုအလျောက် ဖမ်းနေခြင်း',
      'DTC C1234, C1244 (Yaw Rate Sensor Malfunction)'
    ],
    diagnosticTips: 'ဤဆန်ဆာကို ဖြုတ်တပ်သည့်အခါ မြှားခေါင်းညွှန်ရာ (Arrow Direction) အတိုင်း ကားရှေ့သို့ တည့်တည့် မျက်နှာမူ၍ မူလဘောင်တွင် တိကျစွာ ပြန်လည်တပ်ဆင်ရပါမည်။'
  },

  // ================= 7. BODY, AC & COMFORT =================
  {
    id: 'ac-press-sensor',
    nameEn: 'A/C Pressure Transducer',
    nameMy: 'အဲကွန်း ဂတ်စ်ဖိအားဆန်ဆာ',
    acronym: 'A/C Pressure',
    category: 'body_ac',
    categoryNameMy: 'အဲကွန်း & ကိုယ်ထည်စနစ်',
    type: 'Piezoresistive Transducer (၃ ကြိုး)',
    workingPrinciple: 'အဲကွန်းပိုက်လိုင်းအတွင်းရှိ ဂတ်စ်ဖိအား (Refrigerant Pressure) ကို တိုင်းတာသည်။ ဂတ်စ်မရှိဘဲ လျော့နည်းနေပါက (ဖိအားနိမ့်လွန်းပါက 0.5V အောက်) ကွန်ပရက်ဆာ မလောင်စေရန် ဖြတ်ချပေးသလို၊ ပန်ကာမလည်၍ ဂတ်စ်ဖိအား အလွန်အမင်း တက်လာပါကလည်း (ဖိအားမြင့်လွန်းပါက 4.5V အထက်) ပိုက်လိုင်းမပေါက်ကွဲစေရန် ကွန်ပရက်ဆာကို ဖြတ်ချပေးသည်။ ပုံမှန်ဖိအားတွင် အဲကွန်းပန်ကာ အနှေး/အမြန်ကို ထိန်းချုပ်သည်။',
    internalStructure: 'Ceramic Diaphragm Cell၊ အသံချဲ့ပတ်လမ်း၊ ကြေးဝါပိုက်ခေါင်း။',
    pinoutSummary: [
      { pin: 'Pin 1 (5V)', signalType: '5V Reference Power', standardValue: '5.0V DC', description: 'ECU 5V' },
      { pin: 'Pin 2 (Ground)', signalType: 'Sensor Ground', standardValue: '0.0V DC', description: 'အနှုတ်' },
      { pin: 'Pin 3 (Signal)', signalType: 'Pressure Output Voltage', standardValue: 'အဲကွန်းပိတ်ချိန်: 1.2V ~ 1.5V (6 ~ 8 bar) / အဲကွန်းဖွင့်ချိန်: 1.5V ~ 2.2V (12 ~ 16 bar)', description: 'ဂတ်စ်ဖိအား အချက်ပြဗို့' }
    ],
    specifications: {
      operatingVoltage: '5.0V DC',
      signalOutput: '0.5V (Low Gas Cut-off) ➔ 1.5V~2.2V (Normal Operation) ➔ 4.5V (High Pressure Cut-off)'
    },
    testingSteps: [
      { step: 1, title: '5V နှင့် Ground စစ်ဆေးခြင်း', description: 'ပလပ်တွင် 5.0V နှင့် 0V ဂရောင်း မိမမိ တိုင်းပါ။', tool: 'multimeter_v' },
      { step: 2, title: 'အဲကွန်းဖွင့်စဉ် Signal ဗို့အား စစ်ဆေးခြင်း', description: 'အဲကွန်းဖွင့်လိုက်ပါက ကွန်ပရက်ဆာလည်ပြီး ဖိအားတက်လာသည်နှင့် Signal ဗို့အားသည် 1.2V မှ 1.8V ~ 2.2V သို့ တက်သွားရမည်။', tool: 'multimeter_v' }
    ],
    symptomsOfFailure: [
      'အဲကွန်းခလုတ် ဖွင့်သော်လည်း ကွန်ပရက်ဆာ လုံးဝ ကစ်မဆွဲခြင်း (Compressor won\'t engage)',
      'အဲကွန်းပန်ကာ အမြဲတမ်း အမြင့်ဆုံးလည်နေခြင်း သို့မဟုတ် လုံးဝ မလည်ခြင်း',
      'DTC B1422, P0530, P0532, P0533 တက်ခြင်း'
    ],
    diagnosticTips: 'ဆန်ဆာပျက်နေပါက ဂတ်စ်အပြည့်ရှိသော်လည်း ဂတ်စ်မရှိဟု မှားယွင်းသတင်းပို့သဖြင့် ကွန်ပရက်ဆာ ပိတ်ထားတတ်သည်။'
  },
  {
    id: 'ac-evap-sensor',
    nameEn: 'A/C Evaporator Temperature Sensor',
    nameMy: 'အဲကွန်း အအေးကွိုင် အပူချိန်ဆန်ဆာ',
    acronym: 'Evap Temp',
    category: 'body_ac',
    categoryNameMy: 'အဲကွန်း & ကိုယ်ထည်စနစ်',
    type: 'NTC Thermistor (၂ ကြိုး)',
    workingPrinciple: 'ကားအတွင်းခန်း ဒက်ရှ်ဘုတ်အောက်ရှိ အအေးကွိုင် (Evaporator) ၏ အလူမီနီယမ် အပူစွန့်ဒလက်များကြားတွင် ထိုးစိုက်ထားသည်။ အအေးကွိုင် အပူချိန်သည် 0°C သို့ ရောက်ရှိသွားပါက အအေးကွိုင်ပေါ်တွင် ရေခဲရိုက်ပြီး လေပိတ်မသွားစေရန် (Freezing Protection) ကွန်ပရက်ဆာကို ခေတ္တ ဖြတ်ချပေးသည်။ အပူချိန် 2°C ~ 3°C ပြန်တက်လာမှ ကွန်ပရက်ဆာ ပြန်လည်မောင်းနှင်စေသည်။',
    internalStructure: 'NTC Thermistor၊ အစိုဓာတ်ခံ ရေစိုခံ ပလပ်စတစ်ချောင်း။',
    pinoutSummary: [
      { pin: 'Pin 1', signalType: 'Signal (+)', standardValue: '0°C: 3.8V ~ 4.2V / 25°C: 2.0V ~ 2.5V', description: 'အအေးကွိုင် အချက်ပြဗို့' },
      { pin: 'Pin 2', signalType: 'Ground (-)', standardValue: '0.0V DC', description: 'အနှုတ်' }
    ],
    specifications: {
      operatingVoltage: '5.0V Pull-up',
      resistance: '0°C: 4.5kΩ ~ 5.5kΩ / 25°C: 1.5kΩ ~ 2.0kΩ'
    },
    testingSteps: [
      { step: 1, title: 'ရေခဲကပ်၍ အုမ်းတိုင်းခြင်း', description: 'ဆန်ဆာထိပ်ဝကို ရေခဲတုံးဖြင့် ထိတွေ့ကြည့်ပါက အုမ်းတန်ဖိုး 5,000Ω ဝန်းကျင်သို့ တက်သွားရမည်။', tool: 'multimeter_ohm' }
    ],
    symptomsOfFailure: [
      'အဲကွန်းစဖွင့်ချင်း အလွန်အေးပြီး ၁၅ မိနစ်ခန့် မောင်းပြီးနောက် လေထွက်ပေါက်မှ လေလုံးဝ မထွက်တော့ခြင်း (ရေခဲပိတ်ခြင်း)',
      'ကွန်ပရက်ဆာ ခဏခဏ ဖြတ်တောက်နေခြင်း',
      'DTC B1413 (Evaporator Sensor Circuit)'
    ],
    diagnosticTips: 'ကားမောင်းရင်း လေမထွက်တော့ဘဲ အဲကွန်းပိတ်ထားပြီး ၁၀ မိနစ်ခန့်အကြာတွင် ကားအောက်မှ ရေများစွာ ကျလာပြီး လေပြန်ထွက်လာပါက Evaporator Sensor ပျက်၍ ရေခဲရိုက်နေခြင်း ဖြစ်သည်။'
  }
];
