import { PinoutCrossReference, RelayPinStandard } from '../types/wiring';

export const RELAY_STANDARDS: RelayPinStandard[] = [
  {
    pinNumber: '30',
    standardName: 'Battery Power (+12V Constant Feed)',
    burmeseName: 'ဘက်ထရီ တိုက်ရိုက်အပေါင်းလိုင်း',
    function: 'ဘက်ထရီဖျူးစ်မှတစ်ဆင့် လာသော ပင်မ ၁၂ ဗို့ ဓာတ်အားအဝင်လိုင်း (High Current Supply)',
    connectionFrom: 'Battery (+) -> Main Fuse (15A~30A)',
    connectionTo: 'Relay Common Contact (ပင်မအဆက်)',
    testMethod: 'Digital Multimeter DC Volts: ဘက်ထရီအနှုတ်နှင့် ပင် ၃၀ ကြား တိုင်းပါက သော့ပိတ်ထားလည်း 12.6V ပေါ်ရမည်။',
    normalStatus: 'အမြဲတမ်း +12V ရှိရမည် (သော့ပိတ်/ဖွင့် မဆိုင်)'
  },
  {
    pinNumber: '87',
    standardName: 'Relay Output (Normally Open - NO)',
    burmeseName: 'ရီလေး ပွင့်ချိန် ထွက်သွားသော ပါဝါလိုင်း',
    function: 'ရီလေး ကစ်ပွင့်ချိန်တွင် ပင် ၃၀ မှ ဓာတ်အားကို ECU, အင်ဂျက်တာ၊ မီးကွိုင် သို့မဟုတ် ဆီပန့်ဆီသို့ ဆက်လက်ပေးပို့သောလိုင်း',
    connectionFrom: 'Relay Switch Contact (Internal)',
    connectionTo: 'ECU (+B), Injectors, Ignition Coils, Fuel Pump (+)',
    testMethod: 'သော့ဖွင့်ချိန် (သို့မဟုတ် ရီလေးကစ်ချိန်) တွင် 12V ထွက်ရမည်။ ရီလေးပိတ်ချိန် 0V ဖြစ်ရမည်။',
    normalStatus: 'သော့ဖွင့်မှ +12V ထွက်မည်'
  },
  {
    pinNumber: '87a',
    standardName: 'Normally Closed (NC - 5-Pin Relays only)',
    burmeseName: 'ရီလေး ပိတ်ထားချိန် ချိတ်ဆက်နေသောလိုင်း (၅ ပင်ရီလေးသီးသန့်)',
    function: 'ရီလေး ကွိုင်မဆွဲသေးမီ အချိန်တွင် ပင် ၃၀ နှင့် တိုက်ရိုက် ထိစပ်နေသော အဆက် (မီးကြီး/မီးနိမ့်၊ ဟွန်းစနစ်များတွင် သုံးသည်)',
    connectionFrom: 'Relay Closed Contact (Rest state)',
    connectionTo: 'Alternative Load / DRL system',
    testMethod: 'ရီလေး မကစ်မီ 12V ထွက်နေပြီး ရီလေးကစ်လိုက်သည်နှင့် 0V သို့ ပြတ်သွားရမည်။',
    normalStatus: 'ရီလေးနားချိန် 12V ထွက် / ကစ်ချိန် 0V'
  },
  {
    pinNumber: '86',
    standardName: 'Relay Coil Positive (+12V Trigger Feed)',
    burmeseName: 'ရီလေးကွိုင် အပေါင်းဆွဲမီးလိုင်း',
    function: 'ရီလေး အတွင်းရှိ သံလိုက်ကွိုင်ကို လှုံ့ဆော်ရန် ကားသော့ (IGN Switch) မှ လာသော +12V ပါဝါ',
    connectionFrom: 'Ignition Switch (IGN/ACC) or EFI Fuse',
    connectionTo: 'Internal Coil winding (+)',
    testMethod: 'သော့ ON ထားချိန်တွင် 12V တက်ရမည် (ကွိုင်အုမ်းမှာ ၇၀ ~ ၉၀ Ω ရှိရမည်)။',
    normalStatus: 'သော့ ON ချိန် +12V ရှိရမည်'
  },
  {
    pinNumber: '85',
    standardName: 'Relay Coil Ground / Control Line (-)',
    burmeseName: 'ရီလေးကွိုင် အနှုတ်ဂရောင်း ထိန်းချုပ်လိုင်း',
    function: 'ရီလေးကွိုင်ကို မြေစိုက်ရန် ECU ကွန်ပျူတာမှ အနှုတ်ခတ်ပေးသောလိုင်း (သို့မဟုတ် ဘော်ဒီဂရောင်း)',
    connectionFrom: 'ECU Control Pin (M-REL / FC) or Body Ground',
    connectionTo: 'Internal Coil winding (-)',
    testMethod: 'ECU က အလုပ်လုပ်ခိုင်းချိန်တွင် အနှုတ် (0V) သို့ ကျဆင်းသွားရမည် (Voltage drop < 0.2V)။',
    normalStatus: 'ECU ထိန်းချုပ်ချိန် အနှုတ်ဂရောင်း ဖြစ်မည်'
  }
];

export const BRAND_PINOUT_MATRIX: PinoutCrossReference[] = [
  {
    functionNameMy: 'ဆန်ဆာ 5.0V ရည်ညွှန်းအပေါင်းလိုင်း',
    functionNameEn: '5.0V Sensor Reference Voltage (Vref)',
    descriptionMy: 'ECU အတွင်းရှိ ဗို့ထိန်းစနစ်မှ ဆန်ဆာများ (TPS, MAP, FRP, APP) ဆီသို့ သန့်စင်ထုတ်ပေးသော တည်ငြိမ် +5.0V လိုင်း',
    voltageSignal: '+5.0V DC (±0.1V တိကျရမည်)',
    toyota: 'VC / VCC',
    honda: 'VCC1 / VCC2',
    nissan: 'AVDD / VREF',
    hyundaiKia: '5V_REF / VREF1',
    ford: 'VREF',
    benzBosch: '5V_OUT / VCC_S'
  },
  {
    functionNameMy: 'ဆန်ဆာ သီးသန့် အနှုတ်ဂရောင်းလိုင်း',
    functionNameEn: 'Clean Sensor Ground (Isolated SGND)',
    descriptionMy: 'ဆန်ဆာများ၏ မူရင်းအနှုတ်လိုင်း (ဘော်ဒီဂရောင်းနှင့် မရောရ၊ ECU အတွင်းဆီသို့ တိုက်ရိုက်ပြန်ဝင်ရသည်)',
    voltageSignal: '0.00V ~ 0.05V (0.1V ထက်မကျော်ရ)',
    toyota: 'E2 / SGND',
    honda: 'SG1 / SG2',
    nissan: 'AGND / SG',
    hyundaiKia: 'SENSOR_GND',
    ford: 'SIG_RTN',
    benzBosch: 'S_GND / Pin 31_S'
  },
  {
    functionNameMy: 'အင်ဂျင်ကွန်ပျူတာ ပင်မပါဝါအဝင်',
    functionNameEn: 'Switched Main Power Feed',
    descriptionMy: 'Main EFI Relay ပွင့်ပြီးနောက် ECU ၏ မိုက်ခရိုပရိုဆက်ဆာ လည်ပတ်ရန် ရောက်လာသော +12V',
    voltageSignal: '+12V ~ +14.4V (Battery Charging Voltage)',
    toyota: '+B / +B1',
    honda: 'IGP / IG1',
    nissan: 'IGN / VB',
    hyundaiKia: 'MAIN_PWR / +B',
    ford: 'VPWR',
    benzBosch: 'Terminal 15 (Kl. 15)'
  },
  {
    functionNameMy: 'ဘက်ထရီ အမြဲတိုက်ရိုက်ပါဝါ',
    functionNameEn: 'Constant Battery Memory Feed',
    descriptionMy: 'သော့ပိတ်ထားသော်လည်း ECU ၏ မှတ်ဉာဏ် (RAM) နှင့် Error DTC များ မပျောက်စေရန် အမြဲကျွေးထားသောလိုင်း',
    voltageSignal: '+12.6V Constant DC',
    toyota: 'BATT',
    honda: 'VBAT / BACKUP',
    nissan: 'BAT / BATT',
    hyundaiKia: 'BATT (+)',
    ford: 'KAPWR',
    benzBosch: 'Terminal 30 (Kl. 30)'
  },
  {
    functionNameMy: 'သော့ဖွင့်ချက် အချက်ပြလိုင်း',
    functionNameEn: 'Ignition Switch State Signal',
    descriptionMy: 'ယာဉ်မောင်းသူက သော့ကို ON သို့ လှည့်လိုက်ကြောင်း ECU က ချက်ချင်း သိရှိစေသောလိုင်း',
    voltageSignal: '0V (OFF) ➔ 12V (ON)',
    toyota: 'IGSW',
    honda: 'IG_SW',
    nissan: 'IGN_SW',
    hyundaiKia: 'IGN_SIG',
    ford: 'IGN',
    benzBosch: 'Kl. 15_SW'
  },
  {
    functionNameMy: 'ECU ၏ ပါဝါဂရောင်းလိုင်းများ',
    functionNameEn: 'ECU Power Ground (Chassis Ground)',
    descriptionMy: 'မီးကွိုင်နှင့် အင်ဂျက်တာများ၏ အင်အားကြီး ဓာတ်အားများ စီးဆင်းရန် အင်ဂျင်ဘလောက်တုံးသို့ ကြပ်ထားသော ဂရောင်း',
    voltageSignal: '0V (< 0.05V Drop)',
    toyota: 'E01 / E02 / EC',
    honda: 'PG1 / PG2',
    nissan: 'GND / BODY',
    hyundaiKia: 'POWER_GND',
    ford: 'PWR_GND',
    benzBosch: 'Terminal 31 (Kl. 31)'
  },
  {
    functionNameMy: 'ရေအပူချိန်ဆန်ဆာ အချက်ပြလိုင်း',
    functionNameEn: 'Engine Coolant Temp Signal (ECT)',
    descriptionMy: 'အင်ဂျင်ရေအေးချိန် ဗို့မြင့်ပြီး အင်ဂျင်ပူလာပါက ဗို့နိမ့်ကျသွားသော NTC အချက်ပြဗို့',
    voltageSignal: 'အေးချိန် 3.5V ~ 4.2V ➔ ပူချိန် (85°C) 0.5V ~ 0.8V',
    toyota: 'THW',
    honda: 'ECT',
    nissan: 'TW / WATER_T',
    hyundaiKia: 'ECT_SIG',
    ford: 'ECT / CHT',
    benzBosch: 'T_WATER'
  },
  {
    functionNameMy: 'ဝင်လေအပူချိန်ဆန်ဆာ အချက်ပြလိုင်း',
    functionNameEn: 'Intake Air Temp Signal (IAT)',
    descriptionMy: 'အင်ဂျင်ထဲသို့ ဝင်ရောက်သော လေထု၏ အပူချိန် အချက်ပြဗို့',
    voltageSignal: 'အေးချိန် 3.2V ➔ ပူချိန် 1.2V',
    toyota: 'THA',
    honda: 'IAT',
    nissan: 'TA / AIR_T',
    hyundaiKia: 'IAT_SIG',
    ford: 'IAT / ACT',
    benzBosch: 'T_AIR'
  },
  {
    functionNameMy: 'လီဗာအဖွင့်ပမာဏ အချက်ပြလိုင်း',
    functionNameEn: 'Throttle Position Signal (TPS)',
    descriptionMy: 'လီဗာနင်းပြား သို့မဟုတ် လိပ်ပြာဒလက် အဖွင့်ဒီဂရီ အချက်ပြဗို့',
    voltageSignal: 'စလိုး 0.5V ~ 0.8V ➔ အပြည့် 4.2V ~ 4.6V',
    toyota: 'VTA / VTA1',
    honda: 'TPS / THROT',
    nissan: 'TVO / TPS',
    hyundaiKia: 'TPS1 / TPS2',
    ford: 'TP',
    benzBosch: 'DKG / TPS_OUT'
  },
  {
    functionNameMy: 'လေပြွန်ဖိအားဆန်ဆာ အချက်ပြလိုင်း',
    functionNameEn: 'Manifold Absolute Pressure (MAP)',
    descriptionMy: 'အင်ဂျင်လေပြွန် လေဟာနယ်နှင့် တာဘိုဖိအား အချက်ပြဗို့',
    voltageSignal: 'စလိုး 1.0V ~ 1.5V ➔ လီဗာဆောင့် 4.0V ~ 4.5V',
    toyota: 'PIM',
    honda: 'MAP',
    nissan: 'MAP',
    hyundaiKia: 'MAP_SIG',
    ford: 'MAP',
    benzBosch: 'P_LAD / MAP'
  },
  {
    functionNameMy: 'လေစီးဆင်းမှုဆန်ဆာ အချက်ပြလိုင်း',
    functionNameEn: 'Mass Air Flow Signal (MAF)',
    descriptionMy: 'ဝင်ရောက်လာသော လေထုထည် အလေးချိန် အချက်ပြဗို့',
    voltageSignal: 'စလိုး 1.2V ~ 1.6V ➔ လီဗာဆောင့် 3.8V ~ 4.5V',
    toyota: 'VG',
    honda: 'MAF',
    nissan: 'MAS / MAF',
    hyundaiKia: 'MAF_SIG',
    ford: 'MAF',
    benzBosch: 'HFM'
  },
  {
    functionNameMy: 'ကရိုင်းဆန်ဆာ အချက်ပြလိုင်း',
    functionNameEn: 'Crankshaft Position Signal (CKP)',
    descriptionMy: 'အင်ဂျင်ကရိုင်းရှပ် လည်ပတ်နှုန်းနှင့် အနေအထား အချက်ပြလှိုင်း (စက်နှိုးမီးပွား & ဆီဖြန်းတိုင်မင်)',
    voltageSignal: 'Magnetic: AC 1V~10V / Hall: 0V - 5V Square Wave',
    toyota: 'NE+ / NE-',
    honda: 'CKP-P / CKP-M',
    nissan: 'POS / CKP',
    hyundaiKia: 'CKP (+) / (-)',
    ford: 'PIP / CRK',
    benzBosch: 'B_KW / CRK'
  },
  {
    functionNameMy: 'ကင်းဆန်ဆာ အချက်ပြလိုင်း',
    functionNameEn: 'Camshaft Position Signal (CMP)',
    descriptionMy: 'စလင်ဒါနံပါတ် ၁ TDC ဖိသိပ်အဆင့်နှင့် အင်ဂျက်တာ ဆီဖြန်းစဉ် ရှာဖွေရေး အချက်ပြလှိုင်း',
    voltageSignal: '0V - 5V Digital Square Wave Pulse',
    toyota: 'G+ / G- / G2',
    honda: 'CMP-P / CMP-M',
    nissan: 'PHASE / CMP',
    hyundaiKia: 'CMP (+) / (-)',
    ford: 'CMP',
    benzBosch: 'B_NW / CAM'
  },
  {
    functionNameMy: 'အောက်ဆီဂျင်ဆန်ဆာ အချက်ပြလိုင်း',
    functionNameEn: 'Oxygen Sensor Signal (O2 / Lambda)',
    descriptionMy: 'အိပ်ဇောငွေ့ထဲမှ အောက်ဆီဂျင် ပမာဏ (ဆီထူ/ဆီပါး အခြေအနေ)',
    voltageSignal: 'ဆီပါး (Lean) 0.1V ~ 0.2V ➔ ဆီထူ (Rich) 0.8V ~ 0.9V',
    toyota: 'OX1A / OX1B',
    honda: 'O2S / PO2S',
    nissan: 'O2S / O2',
    hyundaiKia: 'O2_SIG',
    ford: 'HEGO',
    benzBosch: 'L_SONDE'
  },
  {
    functionNameMy: 'မီးခေါက်ဆန်ဆာ အချက်ပြလိုင်း',
    functionNameEn: 'Knock Sensor Signal (KNK)',
    descriptionMy: 'အင်ဂျင်အတွင်း မီးလောင်ပေါက်ကွဲသံ (ခေါက်သံ) ကို ဖမ်းယူသော Piezo AC လိုင်း',
    voltageSignal: '0V AC ပုံမှန် ➔ ခေါက်သံထွက်ချိန် 0.5V ~ 2V AC Spikes',
    toyota: 'KNK1 / KNK2',
    honda: 'KS / KNOCK',
    nissan: 'KNCK / KS',
    hyundaiKia: 'KNOCK_SIG',
    ford: 'KNK',
    benzBosch: 'K_SENSOR'
  },
  {
    functionNameMy: 'မီးကွိုင် မီးစနက်အချက်ပြလိုင်း (Trigger)',
    functionNameEn: 'Ignition Timing Trigger (IGT)',
    descriptionMy: 'မီးကွိုင်အတွင်းရှိ ပါဝါထရန်စစ္စတာကို ဖွင့်ပေးပြီး ပလပ်ထိပ်တွင် မီးပွားကူးစေသော 5V လှိုင်း',
    voltageSignal: '5V Pulse (Dwell Time 2 ~ 4 ms)',
    toyota: 'IGT (1,2,3,4)',
    honda: 'IGPLS (1~4)',
    nissan: 'IB (1,2,3,4)',
    hyundaiKia: 'IGN_COIL (1~4)',
    ford: 'SPOUT / COIL',
    benzBosch: 'ZYL (1~4)'
  },
  {
    functionNameMy: 'မီးကွိုင် အကြောင်းပြန်လိုင်း (Feedback)',
    functionNameEn: 'Ignition Confirmation Feedback (IGF)',
    descriptionMy: 'မီးကွိုင်သည် မီးပွားအမှန်တကယ် ပေါက်ကွဲပြီးကြောင်း ECU ကွန်ပျူတာဆီသို့ ပြန်လည်အကြောင်းကြားသောလိုင်း',
    voltageSignal: '5V Feedback Pulse (IGF ပျောက်ပါက ECU က ဆီဖြတ်ချသည်)',
    toyota: 'IGF',
    honda: 'IG_FB',
    nissan: 'TACHO_FB',
    hyundaiKia: 'MISFIRE_CHK',
    ford: 'IDM',
    benzBosch: 'Z_DIAG'
  },
  {
    functionNameMy: 'အင်ဂျက်တာ မောင်းနှင်လိုင်း',
    functionNameEn: 'Fuel Injector Drive Ground Pulse',
    descriptionMy: 'အင်ဂျက်တာ၏ ဆီဖြန်းအပ်ကို ပွင့်စေရန် ECU က အနှုတ်ခတ်ပေးသောလိုင်း',
    voltageSignal: '+12V အမြဲစောင့် ➔ ဆီဖြန်းချိန် 0V မြေစိုက် ➔ ပိတ်ချိန် 60V Back EMF Spike',
    toyota: '#10, #20, #30, #40',
    honda: 'INJ (1,2,3,4)',
    nissan: 'INJ (1~4)',
    hyundaiKia: 'INJECTOR (1~4)',
    ford: 'INJ (1~4)',
    benzBosch: 'EV (1~4)'
  }
];
