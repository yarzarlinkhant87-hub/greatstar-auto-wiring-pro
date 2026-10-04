import { SensorDetail } from '../types/wiring';

export const ACTUATORS_AND_CONTROLS_DATA: SensorDetail[] = [
  // 1. PETROL EFI INJECTOR
  {
    id: 'petrol-efi-injector',
    nameEn: 'Multi-Point Port EFI Fuel Injector',
    nameMy: 'ဓာတ်ဆီ အင်ဂျက်တာ (အီလက်ထရောနစ် ဆီဖြန်းနော်ဇယ်)',
    acronym: 'INJ (EFI)',
    category: 'fuel_injectors',
    categoryNameMy: 'ဆီဖြန်း & အင်ဂျက်တာ',
    type: 'Solenoid Coil / 2-Pin Pulse Width Modulated (PWM)',
    systemRoleMy: 'ဆလင်ဒါတစ်ခုချင်းစီ၏ Intake Port သို့ မီးလောင်ကျွမ်းရန် လိုအပ်သော ဓာတ်ဆီကို အချိန်ကိုက် မြူမှုန်သဖွယ် ဖြန်းပေးခြင်း။',
    internalStructure: 'ကြေးနီလျှပ်စစ်ကွိုင် (Copper Solenoid Coil)၊ သံမဏိပလန်ဂျာတံ (Plunger Core)၊ ဆီပြန်တွန်းစပရင် (Return Spring)၊ နော်ဇယ် အပေါက်ငယ်များ (Multi-hole Orifice 4~12 holes) နှင့် ဆီစစ်ဆန်ကာငယ် (Micro Filter Basket)။',
    socketPinsCount: 2,
    socketViewDiagram: [
      { pinNumber: 1, label: '+B (12V Power)', wireColor: 'Black-Red (အနက်-အနီ)', destination: 'EFI Relay / Main 15A Fuse', voltage: '12.0V ~ 14.2V DC', descriptionMy: 'သော့ဖွင့်လျှင် အမြဲရောက်နေသော ၁၂ ဗို့ပါဝါ' },
      { pinNumber: 2, label: '#10, #20, #30 (ECU Pulse)', wireColor: 'Yellow / Green (အဝါ/အစိမ်း)', destination: 'ECU Output Driver Pins (#10, #20)', voltage: '0V (Ground Pulse) ~ 12V Rest', descriptionMy: 'ECU က မြေခ (Ground) ခတ်ပေးသည့် ဆီဖြန်းချိန် အချက်ပြကြိုး' }
    ],
    workingPrinciple: 'အင်ဂျက်တာသို့ ၁၂ ဗို့ မီးအမြဲ ရောက်ရှိနေပြီး၊ ဆီဖြန်းရမည့် အချိန်တိတိကျကျတွင် ECU အတွင်းရှိ Driver Transistor က မြေခ (Ground Pulse) ခတ်ပေးသည်။ ထိုအခါ လျှပ်စစ်ကွိုင် သံလိုက်ဖြစ်ပြီး ပလန်ဂျာတံလေး နောက်ဆုတ်သွားကာ ၃ ဘား ဖိအားရှိသော ဓာတ်ဆီများကို မိုက်ခရိုစက္ကန့်အတွင်း ပန်းဖြန်းပေးသည်။',
    pinoutSummary: [
      { pin: 'Pin 1 (+B)', signalType: '12V Power Supply', standardValue: '12.0V ~ 14.4V DC', description: 'EFI Relay မှ လာသော အမြဲတမ်း ၁၂ ဗို့' },
      { pin: 'Pin 2 (#10~#40)', signalType: 'ECU Ground Trigger', standardValue: '0V Pulse (1.8ms ~ 3.5ms Idle)', description: 'ECU Transistor မှ မြေခဆွဲချသည့် အချက်ပြလိုင်း', ecuTerminal: '#10, #20, #30, #40' }
    ],
    wireColorGuide: 'Pin 1: အနက်ရောင်/အနီရောင် (12V Power) | Pin 2: သီးသန့်အရောင်များ (ဥပမာ အဝါ၊ အပြာ၊ အစိမ်း)',
    specifications: {
      operatingVoltage: '12.0V ~ 14.5V DC',
      resistance: 'High Impedance: 11.5Ω ~ 15.5Ω (အေးချိန် 20°C) / Low Impedance: 2.0Ω ~ 3.5Ω',
      pressureRange: '2.8 bar ~ 3.5 bar (40 ~ 51 psi) Petrol Fuel Rail',
      liveDataIdle: 'Pulse Width: 1.8 ms ~ 2.8 ms (750 RPM)',
      liveDataLoad: 'WOT / 3000 RPM: 8.5 ms ~ 15.0 ms (Full Acceleration)',
      waveformType: 'Inductive Kickback Waveform (0V Ground ➔ 60V~80V Flyback Peak)'
    },
    testingSteps: [
      { step: 1, title: 'အတွင်းပိုင်း ကွိုင်ခုခံအား အုမ်းတိုင်းခြင်း', description: 'အင်ဂျက်တာ ပင် ၂ ပင် ကြား မီတာဖြင့် တိုင်းပါ။ 11.5Ω မှ 14.5Ω အတွင်း ရှိရမည်။ Infinity (OL) ပြပါက ကွိုင်ပြတ်နေပြီ။', tool: 'multimeter_ohm' },
      { step: 2, title: '၁၂ ဗို့ ပါဝါရောက်မရောက် စစ်ဆေးခြင်း', description: 'သော့ ON ထားပြီး ပင် ၁ ကို မီတာအနီထောက်၊ အနက်ကို အင်ဂျင်ဘော်ဒီ ထောက်ပါ။ 12V အပြည့် ရှိရမည်။', tool: 'multimeter_v' },
      { step: 3, title: 'Noid Light သို့မဟုတ် Oscillo ဖြင့် ECU ခတ်ချက် စစ်ဆေးခြင်း', description: 'စက်နှိုး (Cranking) ကြည့်ပါ။ Noid Light မီးမှိတ်တုတ်မှိတ်တုတ် ဖြစ်ရမည်။ အကယ်၍ မီးမမှိတ်ပါက ECU Driver သို့မဟုတ် ဝါယာပြတ်နေသည်။', tool: 'test_light' }
    ],
    teachingMasterclass: {
      triggerMechanism: 'လျှပ်စစ်သံလိုက်ညှို့ယူမှု (Electromagnetic Solenoid Attraction): ကြေးနီကွိုင်ထဲ လျှပ်စီးဖြတ်သွားချိန် သံလိုက်ဓာတ် ဖြစ်ပေါ်ပြီး အတွင်းရှိ သံမဏိပလန်ဂျာတံလေးကို အပေါ်သို့ ဆွဲတင်လိုက်ခြင်း။',
      physicsPrinciple: 'ဖာရာဒေး၏ လျှပ်စစ်သံလိုက် ညှို့ယူမှုနိယာမ (Faraday Induction): ဆီဖိအား ၃ ဘားကို ပုံသေထားပြီး အပေါက်ဖွင့်ထားသည့် ကြာချိန် (Pulse Width in milliseconds) ဖြင့် ဆီပမာဏ အနည်းအများကို ထိန်းချုပ်သည်။',
      electronicsControl: 'ECU အတွင်းရှိ Low-Side NPN / N-Channel MOSFET Power Transistor က Gate သို့ Microcontroller မှ 5V Signal ပို့လိုက်သည့်အခါ Drain-Source လမ်းပွင့်ပြီး အင်ဂျက်တာ အနှုတ်ကြိုးကို Ground သို့ ချက်ချင်း မြေခချိတ်ဆက်ပေးသည်။',
      analogyForStudents: 'ရေပိုက်ခေါင်းကို ရေဖိအား ပုံသေဖွင့်ထားပြီး ခလုတ်ကို လက်ဖြင့် ၁ စက္ကန့် ဖွင့်လိုက်ရင် ရေနည်းနည်းထွက်မည်၊ ၃ စက္ကန့် ဖွင့်လိုက်ရင် ရေများများထွက်မည်။ ECU သည် အင်ဂျက်တာကို လက်ခလုတ်အစား ထရန်စစ်စတာဖြင့် စက္ကန့်၏ ထောင်ဂဏန်းပုံ (ms) ဖြင့် ဖွင့်ပိတ်ပေးခြင်း ဖြစ်သည်။'
    },
    symptomsOfFailure: [
      'စလင်ဒါ မီးမကူး/ဆီမလိုက်ဘဲ ကားတစ်ခြမ်းသေ တုန်ခါနေခြင်း (Cylinder Misfire)',
      'အင်ဂျက်တာ ဆီယိုစိမ့်ပိတ်မရပါက (Leaking Injector) ဆီစားအလွန်များပြီး အိတ်ဇော မီးခိုးမည်းထွက်ခြင်း',
      'အင်ဂျင်ပူလာပါက ကွိုင်ခုခံအား ပြတ်တောက်သွားပြီး စက်နှိုးရခက်ခြင်း',
      'DTC P0300, P0301 (Cylinder 1 Misfire), P0171 (Lean) သို့မဟုတ် P0172 (Rich)'
    ],
    diagnosticTips: 'အင်ဂျက်တာ ပိတ်မရဘဲ ဆီယိုနေပါက ကားမောင်းပြီး ရပ်ထားချိန် ဖိအားကျသွားသဖြင့် နောက်တစ်ကြိမ် ပြန်နှိုးလျှင် ဆီနင် (Flooding) ပြီး ချက်ချင်း စက်နှိုးမရတတ်ပါ။'
  },

  // 2. DIESEL COMMON RAIL INJECTOR
  {
    id: 'crdi-diesel-injector',
    nameEn: 'Common Rail Diesel Injector (Solenoid / Piezo)',
    nameMy: 'ဒီဇယ် ကွန်မွန်းရေးလ် အင်ဂျက်တာ (ဘုံလိုင်းဖိအားမြင့် နော်ဇယ်)',
    acronym: 'CRDi INJ',
    category: 'fuel_injectors',
    categoryNameMy: 'ဆီဖြန်း & အင်ဂျက်တာ',
    type: 'High-Speed Solenoid (Bosch/Denso) သို့မဟုတ် Piezoelectric Crystal Stack',
    systemRoleMy: 'ဖိအား ၂၀၀၀ ဘားအထိ ရှိသော ဒီဇယ်ဆီများကို တစ်စက္ကန့်အတွင်း အကြိမ်ကြိမ် (Pilot, Pre, Main, Post Injection) ခွဲ၍ အမှုန်အမွှားအဖြစ် ဖြန်းပေးခြင်း။',
    internalStructure: 'Piezo Crystal ပြားပေါင်းရာချီဆင့်ထားသော အူတိုင် (သို့မဟုတ် လျှပ်စစ်ဆိုလီနွိုက်)၊ ဟိုက်ဒရောလစ် ထိန်းချုပ်ခန်း (Control Chamber & Valve)၊ ပလန်ဂျာတံနှင့် နော်ဇယ်အပ်ချောင်း (Needle Valve)၊ ဆီအပြန်လိုင်း (Fuel Back-Leak Spill Port)။',
    socketPinsCount: 2,
    socketViewDiagram: [
      { pinNumber: 1, label: 'INJ (+) High Voltage', wireColor: 'Red / Violet (အနီ/ခရမ်း)', destination: 'EDU / ECU Booster Capacitor (80V~100V)', voltage: 'Peak 80V ~ 100V DC (Boosted)', descriptionMy: 'ဘူစတာ ကာပါစီတာမှ မြှင့်တင်ထားသော ဗို့မြင့်ကြိုး' },
      { pinNumber: 2, label: 'INJ (-) Low-side Driver', wireColor: 'White / Brown (အဖြူ/အညို)', destination: 'EDU / ECU Transistor Ground Gate', voltage: '0V Switched Pulse', descriptionMy: 'အဖွင့်အပိတ် ပြုလုပ်ပေးသည့် အနှုတ်လိုင်း' }
    ],
    workingPrinciple: 'ဒီဇယ်ဆီဖိအား ၂၀၀၀ ဘားသည် အင်ဂျက်တာ ခေါင်းပိုင်းနှင့် အောက်ခြေတွင် ညီမျှစွာ ဖိထားသည်။ ECU/EDU မှ 80V ဗို့မြင့်လှိုင်း ချက်ချင်း ကျွေးလိုက်သည့်အခါ အတွင်းရှိ Piezo ကျောက်ပြား ကျုံ့ဆန့်သွားပြီး ခေါင်းပိုင်းမှ ဆီအနည်းငယ်ကို Back-leak လိုင်းသို့ ဖွင့်ထုတ်လိုက်သည်။ ထိုအခါ အောက်ခြေဖိအားက အပ်ချောင်းကို အပေါ်သို့ တွန်းတင်လိုက်သဖြင့် ဆီများ မီးလောင်ခန်းအတွင်းသို့ အရှိန်ပြင်းစွာ ပန်းဖြန်းသွားသည်။',
    pinoutSummary: [
      { pin: 'Pin 1 (High Side)', signalType: 'Boosted High Voltage Pulse', standardValue: '70V ~ 100V Peak', description: 'EDU မှ ပေးပို့သော မြင့်မားသော မောင်းနှင်ဗို့အား', ecuTerminal: 'INJ1+ / IQA' },
      { pin: 'Pin 2 (Low Side)', signalType: 'Switched Ground Return', standardValue: '0V Switched Return', description: 'ECU ကွပ်ကဲသည့် အနှုတ်လိုင်း', ecuTerminal: 'INJ1- / COM1' }
    ],
    wireColorGuide: 'အလွန်ထူထဲသော အပူခံဝါယာကြိုးများဖြင့် သွယ်တန်းထားသည်။',
    specifications: {
      operatingVoltage: '70V ~ 100V DC High-Voltage Pulse (From EDU Capacitor)',
      resistance: 'Solenoid Type: 0.3Ω ~ 0.8Ω (အလွန်နိမ့်) / Piezo Type: 150kΩ ~ 250kΩ (Capacitance 2.5µF~3.5µF)',
      pressureRange: '300 bar (Idle) ➔ 1,600 bar ~ 2,200 bar (Full Load)',
      liveDataIdle: 'Main Injection Time: 0.4 ms ~ 0.8 ms / Pilot: 0.15 ms',
      liveDataLoad: 'Full Load: 1.5 ms ~ 2.5 ms',
      waveformType: 'Capacitive Discharge Peak & Hold (100V Spike ➔ 20A Current Hold)'
    },
    testingSteps: [
      { step: 1, title: 'အတွင်းပိုင်း ကွိုင်/ပီဇို အုမ်းနှင့် ဘော်ဒီရှော့ စစ်ဆေးခြင်း', description: 'အင်ဂျက်တာ ပင် ၂ ပင် ကြား တိုင်းပါ (Solenoid: 0.5Ω / Piezo: 200kΩ)။ ထို့နောက် ပင်တစ်ခုချင်းစီနှင့် အင်ဂျင်ဘော်ဒီကြား တိုင်းပါ (Infinity OL ရှိရမည်၊ ဘော်ဒီရှော့ကျပါက စက်လုံးဝ နှိုးမရ)။', tool: 'multimeter_ohm' },
      { step: 2, title: 'ဆီအပြန်လိုင်း ဆီယိုစိမ့်မှု စစ်ဆေးခြင်း (Back-Leak Test)', description: 'အင်ဂျက်တာ နောက်ကျော ဆီပြန်ပိုက်များကို ဖယ်ပြီး ဆေးထိုးပြွန်ခွက်များ တပ်ပါ။ စက် ၁ မိနစ် နှိုးကြည့်ပါ။ ဆီပြန်ပမာဏ အလွန်များနေသော အင်ဂျက်တာသည် အဆို့ရှင် ပျက်စီးနေပြီ ဖြစ်သည်။', tool: 'scan_tool' }
    ],
    teachingMasterclass: {
      triggerMechanism: 'ပီဇို အီလက်ထရစ် ကျုံ့ဆန့်မှု သို့မဟုတ် ဖိအားမညီမျှမှု နိယာမ (Hydraulic Servo Principle): ပီဇိုကျောက်ပြားကို ဗို့အားပေးလိုက်ပါက အလျားဆန့်ထွက်ပြီး ဟိုက်ဒရောလစ် အဆို့ရှင်ကို တွန်းဖွင့်ခြင်း။',
      physicsPrinciple: 'ဖိအားမျှခြေ ပျက်ယွင်းမှု: အင်ဂျက်တာ အပ်ချောင်းကို မော်တာဖြင့် ဆွဲတင်ခြင်းမဟုတ်ဘဲ၊ အပေါ်ထိန်းချုပ်ခန်းမှ ဆီဖိအားကို ဖွင့်ထုတ်လိုက်ခြင်းဖြင့် အောက်ခြေရှိ ၂၀၀၀ ဘား ဖိအားက အပ်ချောင်းကို ဟိုက်ဒရောလစ်နည်းဖြင့် အလိုအလျောက် အပေါ်သို့ ပင့်တင်ပေးခြင်း ဖြစ်သည်။',
      electronicsControl: 'ဒီဇယ် ကွန်မွန်းရေးလ်တွင် ၁၂ ဗို့ဖြင့် မဖွင့်နိုင်ပါ။ EDU (Electronic Driving Unit) သို့မဟုတ် ECU အတွင်းရှိ DC-DC Booster Circuit က ၁၂ ဗို့မှ ၈၀ ဗို့သို့ မြှင့်တင်ပြီး ကြီးမားသော ကာပါစီတာ (Storage Capacitor) ထဲ သိုလှောင်ထားကာ IGBT Transistor ဖြင့် လျှပ်စီး ၂၀ အမ်ပီယာကျော် အားပြင်းစွာ ခတ်ထုတ်ပေးသည်။',
      analogyForStudents: 'အလွန်လေးလံသော ရေကာတာ တံခါးကြီးကို လူအင်အားဖြင့် ဆွဲမတင်နိုင်သော်လည်း၊ အပေါ်ဘက်ရှိ ရေထိန်းဘား အပေါက်ငယ်လေးကို ဖွင့်လိုက်ပါက ရေဖိအားကိုယ်တိုင်က တံခါးကြီးကို အပေါ်သို့ ပင့်တင်ပေးလိုက်သကဲ့သို့ ဖြစ်သည်။'
    },
    symptomsOfFailure: [
      'စက်နှိုးရန် အလွန်ကြာမြင့်ခြင်း သို့မဟုတ် စက်လုံးဝ နှိုးမရခြင်း (ဆီပြန်လိုင်း ပေါက်ကျနေသဖြင့် ဖိအားမတက်ခြင်း)',
      'အရှိန်ဆွဲတင်ချိန် အင်ဂျင်ထစ်အငေါ့ဖြစ်ပြီး မီးခိုးဖြူ/မီးခိုးမည်း ထွက်ခြင်း',
      'ဆလင်ဒါတစ်ခု ဆီဖျန်းမှု မညီမျှပါက အင်ဂျင်ခေါက်သံ (Diesel Knock) ဆူညံစွာ မြည်ခြင်း',
      'DTC P0087 (Fuel Rail Pressure Too Low), P0201~P0204 (Injector Circuit Open)'
    ],
    diagnosticTips: 'Common Rail အင်ဂျက်တာ အသစ်လဲပါက အင်ဂျက်တာခေါင်းပေါ်ရှိ ၃၀ လုံးပါ QR Code / Compensation Code ကို Scanner ထိုးပြီး ECU သို့ မဖြစ်မနေ Code ရိုက်ထည့် (Injector Coding) ပေးရပါမည်။'
  },

  // 3. DIRECT IGNITION COIL (COP 4-PIN)
  {
    id: 'cop-ignition-coil',
    nameEn: 'Direct Ignition Coil (COP with Built-in Igniter)',
    nameMy: 'မီးပလပ်ကွိုင် (ထရန်စစ်စတာ အိုင်ဂနိုက်တာပါ မီးကွိုင်)',
    acronym: 'IG COIL (COP)',
    category: 'timing',
    categoryNameMy: 'အင်ဂျင်လည်ပတ်မှု & တိုင်မင်',
    type: 'Inductive Step-Up Transformer with Built-in IGBT Igniter (4-Pin)',
    systemRoleMy: 'ဘက်ထရီ ၁၂ ဗို့ကို ဗို့အား ၃ သောင်းကျော် (35,000V) သို့ ခုန်တင်ပေးပြီး မီးပလပ်ထိပ်တွင် မီးပွားပွင့်စေခြင်း။',
    internalStructure: 'ပင်မကွိုင်ပတ် (Primary Winding 100~200 turns)၊ ဒုတိယကွိုင်ပတ် (Secondary Winding 15,000~25,000 turns)၊ သံလိုက်အူတိုင် (Iron Core)၊ အတွင်းတပ်ဆင် IGBT Power Transistor နှင့် အကာအကွယ် ဒိုင်အုတ်များ။',
    socketPinsCount: 4,
    socketViewDiagram: [
      { pinNumber: 1, label: '+B (12V Power)', wireColor: 'Black-White (အနက်-အဖြူ)', destination: 'Ignition Switch / INJ 15A Fuse', voltage: '12.0V ~ 14.2V DC', descriptionMy: 'သော့ဖွင့်ချိန် အမြဲရောက်နေသော ၁၂ ဗို့ပါဝါ' },
      { pinNumber: 2, label: 'IGT (Ignition Trigger)', wireColor: 'Blue / Orange (အပြာ/လိမ္မော်)', destination: 'ECU Pin IGT1, IGT2, IGT3, IGT4', voltage: '0V ➔ 5V Digital Pulse', descriptionMy: 'ECU က မီးလောင်ပေါက်ကွဲရန် ခလုတ်ဖွင့်ပေးသည့် 5V လှိုင်း' },
      { pinNumber: 3, label: 'IGF (Ignition Feedback)', wireColor: 'Yellow-Black (အဝါ-အနက်)', destination: 'ECU Pin IGF (All coils tied together)', voltage: '5V Pull-up (Dips to 0V when fired)', descriptionMy: 'မီးပွား အောင်မြင်စွာ ပွင့်သွားကြောင်း ECU သို့ သတင်းပြန်ပို့သည့်လိုင်း' },
      { pinNumber: 4, label: 'GND (Igniter Ground)', wireColor: 'Brown / Black (အညို/အနက်)', destination: 'Cylinder Head Ground Bolt', voltage: '0.0V DC Clean Ground', descriptionMy: 'အင်ဂျင်ခေါင်းသို့ ချိတ်ထားသော အနှုတ်မြေခလိုင်း' }
    ],
    workingPrinciple: 'သော့ဖွင့်ထားစဉ် ၁၂ ဗို့ မီးကွိုင်ထဲ အသင့်ရောက်နေသည်။ မီးပွင့်ရမည့်အချိန်တွင် ECU က IGT ကြိုးမှတစ်ဆင့် 5V လျှပ်စစ်ပို့ပြီး အတွင်းရှိ IGBT ထရန်စစ်စတာကို ဖွင့်လိုက်ရာ ပင်မကွိုင်ထဲ လျှပ်စီးဖြတ်သွားပြီး သံလိုက်ဓာတ် စုဆောင်းသည်။ မီးကူးရမည့် စက္ကန့်ပိုင်းတွင် ECU က 5V ကို ချက်ချင်း ဖြတ်ချလိုက်ရာ သံလိုက်စက်ကွင်း ပြိုကျသွားပြီး ဒုတိယကွိုင်ထဲတွင် ဗို့ ၃ သောင်းကျော် ခုန်ထွက်ကာ မီးပလပ်ထိပ်တွင် မီးပွင့်ထွက်သွားသည်။ ထိုအခါ IGF ကြိုးက ECU သို့ "မီးပွင့်ပြီးပြီ" ဟု အချက်ပြသည်။',
    pinoutSummary: [
      { pin: 'Pin 1 (+B)', signalType: 'Battery Supply', standardValue: '12.0V ~ 14.4V DC', description: 'သော့ဖွင့်ချိန် ၁၂ ဗို့ အပြည့်ရောက်ရမည်' },
      { pin: 'Pin 2 (IGT)', signalType: 'ECU Trigger Pulse', standardValue: '0V to 5V (2.5ms ~ 3.5ms Dwell)', description: 'မီးကွိုင် အားသွင်းရန် ECU က ခတ်ပေးသော 5V လှိုင်း', ecuTerminal: 'IGT1, IGT2, IGT3, IGT4' },
      { pin: 'Pin 3 (IGF)', signalType: 'Spark Feedback', standardValue: '5.0V with brief 0V dips', description: 'မီးပွားထွက်ကြောင်း ECU ပြန်သိစေသည့် အချက်ပြလိုင်း', ecuTerminal: 'IGF' },
      { pin: 'Pin 4 (GND)', signalType: 'Chassis/Engine Ground', standardValue: '0.0V DC (Drop < 0.05V)', description: 'အင်ဂျင်ခေါင်းဘော်ဒီ မြေခ' }
    ],
    wireColorGuide: 'Toyota: Pin 1 (Black-White 12V), Pin 2 (Color IGT), Pin 3 (Yellow-Black IGF), Pin 4 (Brown GND)',
    specifications: {
      operatingVoltage: '12.0V ~ 14.5V DC',
      resistance: 'Primary Coil: 0.6Ω ~ 0.9Ω / Secondary Coil: 8.5kΩ ~ 14.5kΩ (Igniter ပါပါက ဒိုင်အုတ်ခံသဖြင့် မီတာဖြင့် တိုင်းမရပါ)',
      signalOutput: 'Spark Output Voltage: 25,000V ~ 35,000V AC',
      liveDataIdle: 'Dwell Time: 2.2 ms ~ 2.8 ms (750 RPM)',
      liveDataLoad: 'Dwell Time: 3.2 ms ~ 4.0 ms (Full Load)',
      waveformType: 'Primary Dwell 0-5V pulse + Secondary Spark Line (1.2ms ~ 1.8ms burn time)'
    },
    testingSteps: [
      { step: 1, title: 'Pin 1 (12V) နှင့် Pin 4 (Ground) စစ်ဆေးခြင်း', description: 'သော့ ON ထားပြီး ပင် ၁ တွင် 12V ရှိရမည်၊ ပင် ၄ နှင့် ဘော်ဒီကြား 0V (Good Ground) ရှိရမည်။', tool: 'multimeter_v' },
      { step: 2, title: 'Pin 2 (IGT 5V) စစ်ဆေးခြင်း', description: 'စက်နှိုးမော်တာဆွဲစဉ် IGT ပင်ကို LED Test Light သို့မဟုတ် Oscillo ဖြင့် စစ်ပါ။ LED မီး မှိတ်တုတ်မှိတ်တုတ် ဖြစ်ရမည်။', tool: 'test_light' },
      { step: 3, title: 'Pin 3 (IGF Feedback) စစ်ဆေးခြင်း', description: 'စက်နိုးနေစဉ် IGF တွင် 5V အပြည့် ရှိရမည်။ အကယ်၍ IGF ပြတ်နေပါက ECU က မီးမပွင့်ဘူးထင်ပြီး အင်ဂျက်တာ ဆီဖြန်းမှုကို ချက်ချင်း ဖြတ်ချကာ စက်သေသွားစေသည်။', tool: 'multimeter_v' }
    ],
    teachingMasterclass: {
      triggerMechanism: 'သံလိုက်စက်ကွင်း ရုတ်တရက် ပြိုကျစေခြင်း (Sudden Magnetic Collapse): ထရန်စစ်စတာဖြင့် ပင်မကွိုင် လျှပ်စီးကို ရုတ်တရက် ဖြတ်ချလိုက်ခြင်းကြောင့် သံလိုက်စက်ကွင်း ပြိုကျပြီး ဒုတိယကွိုင်ထဲသို့ ဗို့အား သောင်းချီ ညှို့ယူဖြစ်ပေါ်စေခြင်း။',
      physicsPrinciple: 'အပြန်အလှန် ညှို့ယူမှုနိယာမ (Mutual Induction) & Lenz နိယာမ: ကွိုင်အပတ်ရေ အနည်းငယ် (၁၀၀ ပတ်) ရှိသော နေရာမှ အပတ်ရေ သောင်းချီ (၂ သောင်းပတ်) ရှိသော ကွိုင်ထဲသို့ သံလိုက်မျဉ်းများ ရုတ်ခြည်း ဖြတ်သွားသဖြင့် အလွန်မြင့်မားသော ဗို့အားခုန်ထွက်သည်။',
      electronicsControl: 'မီးကွိုင်ထိပ်ဘူးလေးထဲတွင် IGBT (Insulated Gate Bipolar Transistor) အစွမ်းထက် ထရန်စစ်စတာ ချစ်ပ်ပြား ထည့်သွင်းထားသည်။ ၎င်းသည် ECU မှ လာသော နုနယ်သည့် 5V Microprocessor signal ဖြင့် ကြီးမားသည့် 12V 10A လျှပ်စီးကို အဖွင့်အပိတ် လုပ်ပေးနိုင်စွမ်းရှိသည်။',
      analogyForStudents: 'လေးကြိုးကို အားကုန် တင်းတင်းဆွဲထားပြီး (သံလိုက်စွမ်းအင် သိုလှောင်ထားခြင်း)၊ လက်ခလုတ်ကို ရုတ်တရက် ဖြုတ်ချလိုက်သည့်အခါ (IGBT ပိတ်လိုက်ခြင်း) မြှားသည် အရှိန်ပြင်းစွာဖြင့် အဝေးကြီးသို့ ပျံထွက်သွားသကဲ့သို့ (ဗို့အား ၃ သောင်းကျော် မီးပွင့်ထွက်ခြင်း) ဖြစ်သည်။'
    },
    symptomsOfFailure: [
      'စလင်ဒါတစ်လုံး မီးမကူးဘဲ အင်ဂျင်တုန်ခါပြီး အဆွဲအရုန်း လုံးဝမရှိခြင်း (Single Cylinder Misfire)',
      'ဂီယာထိုးပြီး လီဗာနင်းလိုက်ချိန် ကားရှေ့သို့ မတက်ဘဲ တုန်ရီခတ်သွားခြင်း',
      'IGF ကြိုးပြတ်ပါက စက်စနိုးပြီး ၂ စက္ကန့်အကြာတွင် အင်ဂျင်အလိုအလျောက် ပြန်သေသွားခြင်း',
      'DTC P0301~P0304 (Misfire), P0351~P0354 (Ignition Coil Primary/Secondary Circuit Malfunction)'
    ],
    diagnosticTips: 'မီးကွိုင် ခေါင်းထဲမှ အပူဒဏ်ကြောင့် ထရန်စစ်စတာ ကွဲထွက်တတ်သည်။ စက်အေးချိန်တွင် ကောင်းသော်လည်း ၁၀ မိနစ်ခန့် မောင်းပြီး အင်ဂျင်ပူလာမှ စက်တုန်လာပါက မီးကွိုင် အပူဒဏ်ကြောင့် သေခြင်း (Thermal breakdown) ဖြစ်သည်။'
  },

  // 4. DIESEL SUCTION CONTROL VALVE (SCV)
  {
    id: 'diesel-scv-valve',
    nameEn: 'Suction Control Valve / Inlet Metering Valve (SCV / IMV)',
    nameMy: 'ဒီဇယ် ဆီပန့် ဆီထိန်းဘား (SCV ဘား)',
    acronym: 'SCV / IMV',
    category: 'fuel_injectors',
    categoryNameMy: 'ဆီဖြန်း & အင်ဂျက်တာ',
    type: 'Linear Solenoid / PWM Duty Cycle Controlled (Normally Open or Normally Closed)',
    systemRoleMy: 'Common Rail Supply Pump အတွင်းသို့ ဆီတိုင်ဂီမှ ဒီဇယ်ဆီ မည်မျှဝင်ရောက်ရမည်ကို အတိအကျ ထိန်းချုပ်ပေးခြင်းဖြင့် ရေးတန်းဖိအားကို စီမံခြင်း။',
    internalStructure: 'လျှပ်စစ်သံလိုက်ကွိုင် (Solenoid Coil)၊ ဆီဝင်ပေါက် လျှောတံပလန်ဂျာ (Sliding Spool Valve)၊ ပြန်ကန်စပရင်နှင့် အထိုင် O-Ring ရာဘာကွင်းများ။',
    socketPinsCount: 2,
    socketViewDiagram: [
      { pinNumber: 1, label: 'SCV (+) 12V Power', wireColor: 'Black-Red (အနက်-အနီ)', destination: 'Main Relay / Fuel Control Relay', voltage: '12.0V ~ 14.2V DC', descriptionMy: 'သော့ဖွင့်ချိန် အမြဲရောက်နေသော ၁၂ ဗို့ပါဝါ' },
      { pinNumber: 2, label: 'SCV (-) PWM Drive', wireColor: 'Green-Yellow (အစိမ်း-အဝါ)', destination: 'ECU Pin PCV / SCV Driver', voltage: 'Duty Cycle Pulse (0V~12V Switched)', descriptionMy: 'ECU က % ဖြင့် လှိုင်းခတ် ထိန်းချုပ်သည့် အနှုတ်လိုင်း' }
    ],
    workingPrinciple: 'ဒီဇယ်ပန့်ထဲသို့ ဆီများ လိုအပ်သည်ထက် ပိုမဝင်စေရန် SCV ဘားက ဆီဝင်ပေါက် အပေါက်အရွယ်အစားကို ကန့်သတ်ပေးသည်။ ECU သည် Rail Pressure Sensor ထံမှ ဖိအားအချက်အလက်ကို ကြည့်ပြီး၊ ဖိအားတိုးချင်ပါက SCV ပလန်ဂျာကို ပိုဖွင့်ပေးပြီး၊ ဖိအားလျှော့ချင်ပါက ပလန်ဂျာကို ပိတ်ပေးသည်။ ဤသို့ဖြင့် ပန့်သည် လိုအပ်သော ဆီပမာဏကိုသာ ဖိသိပ်ရသဖြင့် အင်ဂျင်ဝန် မလေးဘဲ ဆီစား သက်သာစေသည်။',
    pinoutSummary: [
      { pin: 'Pin 1 (+B)', signalType: '12V Power', standardValue: '12.0V ~ 14.4V DC', description: 'သော့ဖွင့်ချိန် ၁၂ ဗို့ ရောက်ရမည်' },
      { pin: 'Pin 2 (PWM-)', signalType: 'ECU Duty Control', standardValue: 'PWM Frequency ~ 1 kHz (Duty 25% ~ 65%)', description: 'ECU Transistor မှ မြေခလှိုင်းခတ်သည့် ကြိုး', ecuTerminal: 'SCV / PCV' }
    ],
    wireColorGuide: 'Denso HP2: Red Connector (SCV1) & Green Connector (SCV2) | HP3/HP4: Single 2-Pin Black Connector',
    specifications: {
      operatingVoltage: '12.0V DC (PWM Controlled)',
      resistance: 'Short Body SCV: 1.5Ω ~ 2.3Ω (20°C) / Long Body SCV: 6.8Ω ~ 11.5Ω',
      pressureRange: 'Rail Pressure Controlled: 300 bar (Idle) ➔ 1,800 bar (Load)',
      liveDataIdle: 'Target vs Actual Fuel Pressure: ±5 bar ကွာဟချက်မရှိ ငြိမ်ရမည်',
      liveDataLoad: 'Duty Cycle: 35% ~ 55% under acceleration',
      waveformType: 'Pulse Width Modulated (PWM) 12V Square Wave'
    },
    testingSteps: [
      { step: 1, title: 'SCV ကွိုင် အုမ်းတိုင်းခြင်း', description: 'ပလပ်ဖြုတ်ပြီး ပင် ၂ ပင် ကြား တိုင်းပါ။ တံတိုအမျိုးအစားဖြစ်ပါက 1.8Ω ~ 2.2Ω ရှိရမည်။ တံရှည်ဖြစ်ပါက 7Ω ~ 10Ω ရှိရမည်။', tool: 'multimeter_ohm' },
      { step: 2, title: 'Scanner ထိုး၍ Common Rail Target vs Actual Pressure စစ်ဆေးခြင်း', description: 'စက်နိုးထားပြီး စလိုးတွင် Target Pressure (သတ်မှတ်ဖိအား ၃၂၀ ဘား) နှင့် Actual Pressure (လက်တွေ့ဖိအား) ထပ်တူကျမကျ စစ်ပါ။ အကယ်၍ လက်တွေ့ဖိအား ခုန်ပေါက်နေပါက SCV ပလန်ဂျာ ဂျမ်းဖြစ်နေပြီ။', tool: 'scan_tool' }
    ],
    teachingMasterclass: {
      triggerMechanism: 'လျှပ်စစ်သံလိုက် ဆီစီးဆင်းပေါက် ကန့်သတ်မှု (Electromagnetic Orifice Throttling): ကွိုင်ထဲသို့ လျှပ်စီး ပိုမိုကျွေးလေ သံလိုက်စွမ်းအားဖြင့် ပလန်ဂျာတံက ဆီဝင်ပေါက်ကို ပိုမို ဖွင့်ပေး/ပိတ်ပေးလေ ဖြစ်ပေါ်ခြင်း။',
      physicsPrinciple: 'အရည်ဖိအား ထိန်းချုပ်မှု သဘောတရား: ပန့်အဝင်တွင် ဆီပမာဏကို ကြိုတင်ကန့်သတ်လိုက်ခြင်း (Inlet Metering) ကြောင့် ပန့်ထဲတွင် ဆီများ ပိုလျှံပြီး အပူတက်ခြင်းနှင့် အင်ဂျင်မြင်းကောင်ရေ ဆုံးရှုံးမှုကို ကာကွယ်ပေးသည်။',
      electronicsControl: 'ECU အတွင်းရှိ High-Current MOSFET Transistor က တစ်စက္ကန့်လျှင် အကြိမ် ၁ ထောင် (1 kHz) နှုန်းဖြင့် 12V လျှပ်စီးကို အဖွင့်အပိတ် (Duty Cycle %) ပြုလုပ်ပေးပြီး ပလန်ဂျာတံကို အလိုရှိသော အကွာအဝေးတွင် မလှုပ်မယှက် ရပ်တန့်ထိန်းထားပေးသည်။',
      analogyForStudents: 'ရေပိုက်ထိပ်မှာ လက်ဖြင့် ဖိပိတ်တာမဟုတ်ဘဲ၊ ရေစတင်ဝင်ရောက်မည့် မူလ ရေပိုက်ခေါင်းကို လိုသလောက်သာ ဖွင့်ထားပေးလိုက်သကဲ့သို့ ဖြစ်သည်။'
    },
    symptomsOfFailure: [
      'စလိုးတွင် အင်ဂျင်တုန်ပြီး ရုတ်တရက် စက်သေသွားခြင်း (Surging at Idle)',
      'ကုန်းတက်ချိန် သို့မဟုတ် လီဗာနင်းချိန် ကားဆွဲအား လုံးဝမရှိဘဲ စက်သေသွားခြင်း (Check Engine မီးလင်း)',
      'မနက်အေးချိန်တွင် စက်နှိုးရ အလွန်ခက်ခဲခြင်း',
      'DTC P0088 (Rail Pressure Too High), P0089 (Suction Control Valve Performance), P1229'
    ],
    diagnosticTips: 'SCV ဘားအတွင်းပိုင်း ပလန်ဂျာတွင် ဒီဇယ်ဆီဂျီး သို့မဟုတ် သံမှုန်များ ကပ်ငြိပါက ဂျမ်းဖြစ်တတ်သည်။ စက်သေတတ်သော ကားများတွင် SCV ဘားကို ဖြုတ်၍ သန့်စင်ပေးခြင်း သို့မဟုတ် အသစ်လဲခြင်းဖြင့် ချက်ချင်း ပျောက်ကင်းနိုင်သည်။'
  },

  // 5. IN-TANK FUEL PUMP & FUEL PUMP CONTROL MODULE (FPCM)
  {
    id: 'in-tank-fuel-pump',
    nameEn: 'In-Tank Electric Fuel Pump & Control Module (FPCM)',
    nameMy: 'တိုင်ဂီတွင်း ဆီပန့်မော်တာ & ဆီပန့်ကွန်ပျူတာ (FPCM)',
    acronym: 'FUEL PUMP / FPCM',
    category: 'fuel_injectors',
    categoryNameMy: 'ဆီဖြန်း & အင်ဂျက်တာ',
    type: 'DC Electric Impeller Motor / Relay Controlled or PWM Fuel Pump ECU',
    systemRoleMy: 'ဆီတိုင်ဂီထဲမှ ဆီများကို အင်ဂျင်ဆီတန်း (Fuel Rail) ဆီသို့ သတ်မှတ်ဖိအားဖြင့် မပြတ်တမ်း တွန်းတင်ပေးခြင်း။',
    internalStructure: 'DC မော်တာအူတိုင် (Armature & Commutator)၊ ကာဗွန်ဘရပ်ရှ် (Carbon Brushes)၊ ဒလက်ဘီး (Turbine Impeller)၊ ဆီပြန်မကျစေသော Check Valve နှင့် ဖိအားထိန်းဘား (Pressure Regulator)။',
    socketPinsCount: 4,
    socketViewDiagram: [
      { pinNumber: 1, label: 'Pump Power (+12V)', wireColor: 'Black-Red (အနက်-အနီ)', destination: 'Circuit Opening Relay / FPCM Pin FP+', voltage: '12.0V DC (or 8V~12V PWM)', descriptionMy: 'ဆီပန့်မော်တာ လည်ပတ်ရန် ၁၂ ဗို့ပါဝါ' },
      { pinNumber: 2, label: 'Pump Ground (GND)', wireColor: 'White-Black (အဖြူ-အနက်)', destination: 'Chassis Ground / FPCM Pin FP-', voltage: '0.0V DC Clean Ground', descriptionMy: 'ဆီပန့်မော်တာ အနှုတ်မြေခလိုင်း' },
      { pinNumber: 3, label: 'Fuel Level Sender (+)', wireColor: 'Yellow-Blue (အဝါ-အပြာ)', destination: 'Instrument Cluster Fuel Gauge', voltage: '0.5V ~ 10.0V Analog', descriptionMy: 'ဒိုင်ခွက်သို့ ဆီပမာဏ ပြသပေးသည့် အချက်ပြလိုင်း' },
      { pinNumber: 4, label: 'Sender Ground (E)', wireColor: 'Brown (အညို)', destination: 'Sensor Ground', voltage: '0.0V DC', descriptionMy: 'ဆီလက်တံ အနှုတ်လိုင်း' }
    ],
    workingPrinciple: 'သော့ဖွင့်လိုက်သည်နှင့် (သို့မဟုတ် စက်နှိုးမော်တာဆွဲသည်နှင့်) ECU က EFI Relay / Circuit Opening Relay ကို ဖွင့်ပြီး ဆီပန့်မော်တာကို စတင်လည်စေသည်။ မော်တာဒလက်ဘီးက ဆီများကို တိုင်ဂီထဲမှ စုပ်ယူပြီး ၃.၅ ဘား ဖိအားဖြင့် အင်ဂျင်ဆီလိုင်းထဲသို့ တွန်းပို့ပေးသည်။ ခေတ်သစ်ကားများတွင် FPCM (Fuel Pump Control Module) က ကားအမြန်နှုန်းနှင့် ဝန်အားအလိုက် မော်တာဗို့အားကို ၈ ဗို့၊ ၁၀ ဗို့၊ ၁၂ ဗို့ စသဖြင့် PWM ဖြင့် လိုသလောက်သာ ချိန်ညှိမောင်းနှင်သည်။',
    pinoutSummary: [
      { pin: 'Pin 1 (FP+)', signalType: 'Motor Power Supply', standardValue: '12.0V DC (Full speed) or 8.5V (Idle speed)', description: 'ဆီပန့်မော်တာ လျှပ်စစ်ပါဝါ' },
      { pin: 'Pin 2 (FP-)', signalType: 'Motor Ground', standardValue: '0.0V DC', description: 'ဆီပန့် မော်တာ အနှုတ်' },
      { pin: 'Pin 3 (Sender)', signalType: 'Variable Resistance', standardValue: 'Full: 3Ω ~ 10Ω / Empty: 110Ω ~ 125Ω', description: 'ဆီလက်တံ အုမ်းတန်ဖိုး' }
    ],
    wireColorGuide: 'မော်တာကြိုး ၂ ပင်သည် အခြားကြိုးများထက် သိသိသာသာ ပိုမိုထူထဲသည်။',
    specifications: {
      operatingVoltage: '12.0V ~ 14.5V DC (Traditional) or 8V~14V PWM (FPCM)',
      resistance: 'Pump Motor Resistance: 0.8Ω ~ 3.0Ω (Good Armature)',
      pressureRange: '3.0 bar ~ 4.2 bar (43.5 psi ~ 61 psi) Petrol EFI Line',
      liveDataIdle: 'Pump Current: 3.5 A ~ 5.5 A (Good condition) / Over 8A means pump clogged',
      waveformType: 'DC Ripple Waveform (Composed of commutator segment pulses)'
    },
    testingSteps: [
      { step: 1, title: 'ဆီပန့်သို့ ၁၂ ဗို့ ရောက်မရောက် စစ်ဆေးခြင်း', description: 'သော့ဖွင့်စဉ် (သို့မဟုတ် Cranking ဆွဲစဉ်) ပင် ၁ တွင် 12V ရောက်မရောက် စစ်ပါ။ အကယ်၍ 12V မရောက်ပါက EFI Main Relay သို့မဟုတ် Circuit Opening Relay ကို စစ်ဆေးပါ။', tool: 'multimeter_v' },
      { step: 2, title: 'ဆီဖိအား ဂိတ်ထိုး တိုင်းတာခြင်း (Fuel Pressure Gauge)', description: 'အင်ဂျင်ဆီပိုက်တွင် ဖိအားဂိတ်ထိုးပြီး စက်နှိုးပါ။ ၃.၀ မှ ၃.၈ ဘား (၄၅ မှ ၅၅ psi) အပြည့် ရှိရမည်။ စက်သတ်ပြီးနောက် အနည်းဆုံး နာရီဝက်ကြာသည်အထိ ဖိအား ၂.၅ ဘားအထက်တွင် ထိန်းထားနိုင်ရမည်။', tool: 'scan_tool' }
    ],
    teachingMasterclass: {
      triggerMechanism: 'လျှပ်စစ်သံလိုက်ရဟတ် လှည့်ပတ်မှု (DC Motor Armature Rotation): ကာဗွန်ဘရပ်ရှ်မှတစ်ဆင့် လျှပ်စစ်စီးဝင်ပြီး အမြဲတမ်းသံလိုက်ကြားရှိ ရဟတ်ကို မြန်နှုန်းမြင့် လှည့်ပတ်စေခြင်း။',
      physicsPrinciple: 'ဗဟိုခွာအား ရေစုပ်နိယာမ (Centrifugal Impeller Principle): ဒလက်ဘီး အလွန်မြန်စွာ လည်ပတ်ခြင်းကြောင့် ဆီများကို အပြင်ဘက်သို့ လွှင့်ထုတ်ကာ စုပ်အားနှင့် တွန်းအားကို တစ်ပြိုင်နက် ဖြစ်ပေါ်စေသည်။',
      electronicsControl: 'ခေတ်ဟောင်းကားများတွင် Relay က ၁၂ ဗို့ တိုက်ရိုက် မောင်းနှင်သော်လည်း၊ ခေတ်သစ်ကားများတွင် FPCM (Fuel Pump ECU) အတွင်းရှိ Power MOSFET က PWM Duty Cycle ဖြင့် မော်တာ အမြန်နှုန်းကို အဆင့် ၃ ဆင့် (Low, Mid, High) ထိန်းချုပ်ပေးသည်။',
      analogyForStudents: 'အိမ်သုံး ရေတင်မော်တာကဲ့သို့ ဖြစ်သည်။ ရေတိုင်ဂီထဲရှိ ရေကို အပေါ်ထပ်ရှိ အင်ဂျင်ဆီသို့ ဖိအားပြည့်ပြည့်ဖြင့် အရောက်ပို့ပေးသော ပင်မ ရေစုပ်စက် ဖြစ်သည်။'
    },
    symptomsOfFailure: [
      'စက်နှိုးမော်တာ ကောင်းစွာလည်သော်လည်း စက်လုံးဝ နှိုးမရခြင်း (ဆီမရောက်ခြင်း)',
      'ကားမောင်းနေစဉ် အရှိန်တင်လိုက်ပါက အင်ဂျင်ထစ်အငေါ့ဖြစ်ပြီး လီဗာနင်းမတက်ခြင်း (ဖိအားကျဆင်းမှု)',
      'ဆီပန့် Check Valve ပျက်စီးပါက စက်သတ်ပြီး ပြန်နှိုးလျှင် အချိန်အကြာကြီး Cranking ဆွဲရခြင်း',
      'ဆီတိုင်ဂီဘက်မှ "ဝီ..." ဟူသော အလွန်ကျယ်လောင်သည့် ညည်းသံ မြည်လာခြင်း'
    ],
    diagnosticTips: 'ဆီတိုင်ဂီထဲတွင် ဆီအမြဲတမ်း အနည်းဆုံး ၄ ပုံ ၁ ပုံ ထားရှိ မောင်းနှင်သင့်သည်။ ဆီပန့်မော်တာသည် ဒီဇယ်/ဓာတ်ဆီထဲတွင် နစ်မြုပ်နေပြီး ဆီကိုယ်တိုင်က မော်တာကို အအေးပေးနေရသဖြင့် ဆီခန်းမောင်းပါက မော်တာ အပူလောင်ကျွမ်း ပျက်စီးလွယ်သည်။'
  },

  // 6. ELECTRONIC THROTTLE BODY (ETCS-i MOTOR & DUAL TPS)
  {
    id: 'etcs-i-throttle-motor',
    nameEn: 'Electronic Throttle Body (ETCS-i Drive Motor & Dual TPS)',
    nameMy: 'အီလက်ထရောနစ် လေတံခါး (မော်တာ & Dual TPS စနစ်)',
    acronym: 'ETCS-i / TAC',
    category: 'throttle_pedal',
    categoryNameMy: 'လေတံခါး & လီဗာ',
    type: 'Reversible DC Servo Motor + Dual Hall Effect / Potentiometer TPS (6-Pin)',
    systemRoleMy: 'ယာဉ်မောင်းသူ၏ လီဗာနင်းအားအလိုက် လိပ်ပြာဒလက် အဖွင့်/အပိတ်၊ စလိုးထိန်းချုပ်မှုနှင့် Traction Control များကို လျှပ်စစ်မော်တာဖြင့် တိကျစွာ မောင်းနှင်ခြင်း။',
    internalStructure: 'ပြောင်းပြန်လှည့်နိုင်သော DC Servo Drive Motor၊ လျှော့ချရေး ဂီယာသွားများ (Reduction Gears)၊ လိပ်ပြာဒလက် ပြန်ကန်စပရင် (Return Spring)၊ Dual TPS Sensors (Hall IC သို့မဟုတ် ကာဗွန်ပြား)။',
    socketPinsCount: 6,
    socketViewDiagram: [
      { pinNumber: 1, label: 'M+ (Motor Positive)', wireColor: 'Red-White (အနီ-အဖြူ)', destination: 'ECU Pin M+ (H-Bridge Driver)', voltage: 'Duty Cycle PWM (0V~12V)', descriptionMy: 'လေတံခါး ဖွင့်ရန် မော်တာ အပေါင်းလိုင်း' },
      { pinNumber: 2, label: 'M- (Motor Negative)', wireColor: 'Green-White (အစိမ်း-အဖြူ)', destination: 'ECU Pin M- (H-Bridge Driver)', voltage: 'Duty Cycle PWM (0V~12V)', descriptionMy: 'လေတံခါး ပိတ်ရန် မော်တာ အနှုတ်လိုင်း' },
      { pinNumber: 3, label: 'VTA1 (Main TPS Signal)', wireColor: 'Blue-Yellow (အပြာ-အဝါ)', destination: 'ECU Pin VTA1', voltage: '0.6V (Closed) ➔ 4.2V (Open)', descriptionMy: 'ပင်မ လေတံခါး ဖွင့်ဟမှု အချက်ပြဗို့' },
      { pinNumber: 4, label: 'VTA2 (Sub TPS Signal)', wireColor: 'Yellow-Green (အဝါ-အစိမ်း)', destination: 'ECU Pin VTA2', voltage: '2.2V (Closed) ➔ 4.8V (Open)', descriptionMy: 'အရန် စစ်ဆေးရေး အချက်ပြဗို့ (လုံခြုံရေး)' },
      { pinNumber: 5, label: 'VC (5V Reference)', wireColor: 'Red-Blue (အနီ-အပြာ)', destination: 'ECU Pin VC (Sensor Power)', voltage: '5.0V DC Constant', descriptionMy: 'ECU မှ ပေးသော ကိန်းသေ ၅ ဗို့ပါဝါ' },
      { pinNumber: 6, label: 'E2 (Sensor Ground)', wireColor: 'Brown (အညို)', destination: 'ECU Pin E2 (Clean Ground)', voltage: '0.0V DC Clean Ground', descriptionMy: 'ဆန်ဆာ သီးသန့် အနှုတ်လိုင်း' }
    ],
    workingPrinciple: 'လီဗာကြိုး မပါတော့ဘဲ ယာဉ်မောင်းက လီဗာနင်းလိုက်သည့်အခါ ECU က H-Bridge မော်တာဒရိုင်ဘာဖြင့် M+ နှင့် M- ကြိုးများသို့ PWM ဗို့အားပေးကာ လေတံခါးကို လိုအပ်သော ဒီဂရီအထိ ဖွင့်ပေးသည်။ လေတံခါး အမှန်တကယ် ပွင့်/မပွင့်ကို အတွင်းရှိ VTA1 နှင့် VTA2 ဆန်ဆာ ၂ ခုက ECU သို့ အမြဲတမ်း ပြန်လည်သတင်းပို့သည်။ အကယ်၍ ဆန်ဆာ ၂ ခု တန်ဖိုး မကိုက်ညီပါက ကားက လီဗာရူးမထွက်သွားစေရန် ECU က စပရင်ဖြင့် အလိုအလျောက် ပိတ်ချပြီး Limp Mode သို့ ကူးပြောင်းပေးသည်။',
    pinoutSummary: [
      { pin: 'Pin 1 (M+)', signalType: 'Motor Forward Drive', standardValue: 'PWM 0V~12V (Duty 15%~85%)', description: 'မော်တာရှေ့လည် အပေါင်း' },
      { pin: 'Pin 2 (M-)', signalType: 'Motor Reverse Drive', standardValue: 'PWM 0V~12V', description: 'မော်တာနောက်ပြန်လည် အနှုတ်' },
      { pin: 'Pin 3 (VTA1)', signalType: 'Throttle Position 1', standardValue: 'Idle: 0.6V ~ 0.9V / WOT: 3.8V ~ 4.5V', description: 'ပင်မ TPS အချက်ပြဗို့', ecuTerminal: 'VTA1' },
      { pin: 'Pin 4 (VTA2)', signalType: 'Throttle Position 2', standardValue: 'Idle: 2.1V ~ 2.5V / WOT: 4.5V ~ 4.9V', description: 'အရန် TPS အချက်ပြဗို့', ecuTerminal: 'VTA2' },
      { pin: 'Pin 5 (VC)', signalType: '5V Power Supply', standardValue: '5.0V DC', description: 'ဆန်ဆာ ၅ ဗို့ပါဝါ', ecuTerminal: 'VC' },
      { pin: 'Pin 6 (E2)', signalType: 'Sensor Ground', standardValue: '0.0V DC', description: 'ဆန်ဆာ အနှုတ်', ecuTerminal: 'E2' }
    ],
    wireColorGuide: 'Pin 1, 2 (မော်တာကြိုး ၂ ပင်သည် အနည်းငယ် ပိုထူသည်) | Pin 3, 4, 5, 6 (ဆန်ဆာကြိုး ၄ ပင်)',
    specifications: {
      operatingVoltage: 'Motor: 12V PWM / Sensor: 5.0V DC',
      resistance: 'Motor Coil Resistance: 1.5Ω ~ 3.5Ω (Pin 1 to Pin 2)',
      liveDataIdle: 'Throttle Opening Angle: 12% ~ 16% (750 RPM Idle)',
      liveDataLoad: 'WOT: 82% ~ 88% (Full Acceleration)',
      waveformType: 'PWM Duty Cycle for Motor + Linear DC 0.5V~4.5V for TPS'
    },
    testingSteps: [
      { step: 1, title: 'မော်တာကွိုင် အုမ်းတိုင်းခြင်း (Pin 1 နှင့် Pin 2)', description: 'ပလပ်ဖြုတ်ပြီး ပင် ၁ နှင့် ၂ ကြား မီတာဖြင့် တိုင်းပါ။ 1.5Ω မှ 3.5Ω အတွင်း ရှိရမည်။ 0Ω (Short) သို့မဟုတ် OL (Open) ဖြစ်ပါက မော်တာ ပျက်စီးနေပြီ။', tool: 'multimeter_ohm' },
      { step: 2, title: 'TPS ၅ ဗို့နှင့် ဂရောင်း စစ်ဆေးခြင်း', description: 'သော့ ON ထားပြီး ပင် ၅ တွင် 5.0V နှင့် ပင် ၆ တွင် 0.0V ရှိမရှိ စစ်ပါ။', tool: 'multimeter_v' },
      { step: 3, title: 'VTA1 နှင့် VTA2 ဗို့အား စစ်ဆေးခြင်း', description: 'သော့ ON ထားပြီး လိပ်ပြာဒလက်ကို ဖြည်းညှင်းစွာ ဖွင့်ကြည့်ပါ (သို့မဟုတ် လီဗာနင်းကြည့်ပါ)။ VTA1 သည် 0.7V မှ 4.2V သို့ ချောမောစွာ တက်သွားရမည်။', tool: 'multimeter_v' }
    ],
    teachingMasterclass: {
      triggerMechanism: 'H-Bridge လျှပ်စစ်သံလိုက် ဝင်ရိုးစွန်း ပြောင်းလဲမောင်းနှင်မှု: မော်တာကြိုး ၂ ချောင်းကို အပေါင်း/အနှုတ် အလှည့်အပြောင်း လျှပ်စစ်ကျွေးခြင်းဖြင့် မော်တာကို ရှေ့သို့ လှည့်ဖွင့်နိုင်သလို နောက်သို့ လှည့်ပိတ်နိုင်ခြင်း။',
      physicsPrinciple: 'Dual Redundancy (အရန် နှစ်ထပ် အာရုံခံနိယာမ): သံလိုက်အာရုံခံ Hall Effect IC ၂ ခုကို မျက်နှာချင်းဆိုင် တပ်ဆင်ထားပြီး၊ တစ်ခုက ဗို့အားတက်ချိန်တွင် အခြားတစ်ခုက ဗို့အားအချိုးကျ လိုက်တက်ကာ အချက်အလက် တိုက်ဆိုင်စစ်ဆေးသည်။',
      electronicsControl: 'ECU အတွင်းရှိ H-Bridge Driver IC (MOSFET Transistor ၄ လုံးပါဝင်သော အထူးပတ်လမ်း) က လိပ်ပြာဒလက်ကို အလိုရှိသော ထောင့်ဒီဂရီသို့ လိုအပ်သလို အဖွင့်အပိတ် မောင်းနှင်ထိန်းချုပ်ပေးသည်။',
      analogyForStudents: 'လေတံခါးသည် အင်ဂျင်၏ နှာခေါင်းပေါက် ဖြစ်သည်။ ယာဉ်မောင်းက လီဗာနင်းလိုက်သည်နှင့် ကွန်ပျူတာက နှာခေါင်းပေါက်ကို လျှပ်စစ်မော်တာဖြင့် ချဲ့ပေးပြီး အင်ဂျင်ထဲသို့ လေအပြည့် ဝင်စေခြင်း ဖြစ်သည်။'
    },
    symptomsOfFailure: [
      'စလိုးမငြိမ်ခြင်း၊ အဲကွန်းဖွင့်ချိန် စက်သေသွားခြင်း',
      'လီဗာနင်းသော်လည်း စက်သံလုံးဝ မတက်ဘဲ စလိုးဖြင့်သာ ရွေ့နေခြင်း (Limp-Home Mode / Fail-Safe)',
      'Check Engine မီးလင်းပြီး DTC P2111 (Throttle Actuator Stuck Open), P2112 (Stuck Closed), P2135 (TPS Voltage Correlation)'
    ],
    diagnosticTips: 'လိပ်ပြာဒလက် အနားသတ်များတွင် ကာဗွန်ဂျီးများ အထူကြီး ပိတ်ဆို့နေပါက လေတံခါး မပိတ်နိုင်ဘဲ စလိုးတက်နေတတ်သည်။ သန့်စင်ပြီးပါက Throttle Body Relearn ပြန်လည် လုပ်ဆောင်ပေးရပါမည်။'
  },

  // 7. VARIABLE VALVE TIMING OIL CONTROL VALVE (VVT-i / VTEC OCV)
  {
    id: 'vvti-ocv-valve',
    nameEn: 'VVT-i / VTEC Oil Control Valve (OCV)',
    nameMy: 'ဗွီဗွီတီအိုင် အင်ဂျင်ဝိုင် ထိန်းချုပ်ဘား (OCV ဘား)',
    acronym: 'VVT OCV',
    category: 'turbo_vvt',
    categoryNameMy: 'တာဘို & ဘားချိန်',
    type: 'Hydraulic Spool Solenoid Valve / PWM Controlled (2-Pin)',
    systemRoleMy: 'ကင်းရှပ်ထိပ်ရှိ VVT Cam Phaser ဂီယာခွက်ထဲသို့ အင်ဂျင်ဝိုင်ဖိအား စီးဝင်သည့် လမ်းကြောင်းကို ထိန်းချုပ်ပေးခြင်းဖြင့် ဘားပွင့်ချိန် (Timing) ကို ရှေ့တိုး/နောက်ဆုတ် ပြုလုပ်ပေးခြင်း။',
    internalStructure: 'လျှပ်စစ်သံလိုက်ကွိုင် (Solenoid Coil)၊ ဆီလမ်းကြောင်း လျှောတံ (Hydraulic Spool Shaft)၊ ပြန်ကန်စပရင်၊ အထိုင် အလွိုင်းဘော်ဒီနှင့် ဝိုင်ဂျီးစစ် ဆန်ကာကွက် (VVT Filter Screen)။',
    socketPinsCount: 2,
    socketViewDiagram: [
      { pinNumber: 1, label: 'OCV (+) 12V Power', wireColor: 'Black-Red (အနက်-အနီ)', destination: 'EFI Relay / IGN 15A Fuse', voltage: '12.0V ~ 14.2V DC', descriptionMy: 'သော့ဖွင့်ချိန် အမြဲရောက်နေသော ၁၂ ဗို့ပါဝါ' },
      { pinNumber: 2, label: 'OCV (-) ECU PWM Duty', wireColor: 'Blue-Black (အပြာ-အနက်)', destination: 'ECU Pin OC1+ / OCV Driver', voltage: 'Duty Cycle PWM (0V~12V Switched)', descriptionMy: 'ECU က % ဖြင့် ခတ်ပေးသည့် အနှုတ်လိုင်း' }
    ],
    workingPrinciple: 'အင်ဂျင်လည်နှုန်း နိမ့်ချိန်တွင် OCV ဘားသည် ပိတ်ထားပြီး ကင်းရှပ်သည် မူလအနေအထားတွင် ရှိနေသည်။ အင်ဂျင်ပတ်နှုန်း မြင့်တက်လာချိန်တွင် ECU က OCV အနှုတ်ကြိုးကို PWM Duty Cycle (ဥပမာ 40% မှ 70%) ဖြင့် ခတ်ပေးလိုက်ရာ အတွင်းရှိ လျှောတံက အင်ဂျင်ဝိုင် လမ်းကြောင်းကို ဖွင့်ပေးသည်။ ထိုအခါ အင်ဂျင်ဝိုင်ဖိအားက ကင်းရှပ်ကို ရှေ့သို့ ၂၀ ဒီဂရီခန့် လှည့်ပေးသဖြင့် အင်ဂျင်အဆွဲအရုန်း သိသိသာသာ တက်လာသည်။',
    pinoutSummary: [
      { pin: 'Pin 1 (+B)', signalType: 'Battery Supply', standardValue: '12.0V ~ 14.4V DC', description: '၁၂ ဗို့ ပါဝါအဝင်' },
      { pin: 'Pin 2 (PWM-)', signalType: 'ECU Duty Control', standardValue: 'PWM 250 Hz ~ 1 kHz (Duty 0% ~ 100%)', description: 'ECU ကွပ်ကဲသည့် အနှုတ်လိုင်း', ecuTerminal: 'OC1+, VV1' }
    ],
    wireColorGuide: 'Pin 1 (12V Power) | Pin 2 (ECU Signal Wire)',
    specifications: {
      operatingVoltage: '12.0V DC (PWM Controlled)',
      resistance: '6.5Ω ~ 12.0Ω (20°C အေးချိန်) / 9.0Ω ~ 15.0Ω (ပူချိန်)',
      liveDataIdle: 'VVT Advance Angle: 0° ~ 3° (Idle 750 RPM)',
      liveDataLoad: 'VVT Advance Angle: 15° ~ 35° (2500~4000 RPM Full Acceleration)',
      waveformType: 'PWM Duty Cycle 12V Square Wave'
    },
    testingSteps: [
      { step: 1, title: 'OCV ကွိုင် အုမ်းတိုင်းခြင်း', description: 'ပလပ်ဖြုတ်ပြီး ပင် ၂ ပင် ကြား မီတာဖြင့် တိုင်းပါ။ 6.8Ω မှ 11.5Ω အတွင်း ရှိရမည်။', tool: 'multimeter_ohm' },
      { step: 2, title: '၁၂ ဗို့ဖြင့် ဘားပွင့်/မပွင့် စမ်းသပ်ခြင်း', description: 'OCV ကို အင်ဂျင်ပေါ်မှ ဖြုတ်ယူပြီး ပင် ၂ ပင်သို့ +12V နှင့် Ground တိုက်ရိုက် ထိပေးကြည့်ပါ။ အတွင်းရှိ လျှောတံသည် "ကလစ်" ဟူသောအသံဖြင့် ချောမောစွာ ရွေ့လျားရမည်။', tool: 'test_light' }
    ],
    teachingMasterclass: {
      triggerMechanism: 'လျှပ်စစ်သံလိုက် ဟိုက်ဒရောလစ် လမ်းကြောင်းပြောင်းလဲမှု: သံလိုက်ကွိုင်က လျှောတံကို တွန်းထုတ်လိုက်သည့်အခါ အင်ဂျင်ဝိုင်ဖိအား စီးဆင်းရာ အပေါက် (Port A / Port B) ပြောင်းလဲသွားခြင်း။',
      physicsPrinciple: 'ဟိုက်ဒရောလစ် ဖိအား စွမ်းအင် ပြောင်းလဲမှု: အင်ဂျင်ဝိုင် ပန့်မှ ထွက်လာသော ဆီဖိအားကို အသုံးပြု၍ ကင်းရှပ်၏ လည်ပတ်ထောင့် (Cam Phase Angle) ကို အင်ဂျင်လည်နေစဉ်မှာပင် ရှေ့တိုး/နောက်ဆုတ် စက်ပိုင်းဆိုင်ရာ လှည့်ပေးသည်။',
      electronicsControl: 'ECU အတွင်းရှိ High-Current Low-Side Driver Transistor က Duty Cycle % ကို တိုးမြှင့်ပေးခြင်းဖြင့် လျှောတံ၏ ဖွင့်ဟမှု အကျယ်အဝန်းကို အတိအကျ ထိန်းထားပေးသည်။',
      analogyForStudents: 'ရေပိုက်လမ်းခွဲတွင် ဘားကို ညာဘက်လှည့်လိုက်ရင် ညာဘက်ပိုက်ထဲ ရေစီးသွားပြီး ဘယ်ဘက်လှည့်လိုက်ရင် ဘယ်ဘက်ပိုက်ထဲ ရေစီးသွားသလို အင်ဂျင်ဝိုင် လမ်းကြောင်းကို လျှပ်စစ်ဖြင့် ပြောင်းပေးခြင်း ဖြစ်သည်။'
    },
    symptomsOfFailure: [
      'အင်ဂျင်ဆွဲအား ကျဆင်းပြီး ဆီစား အလွန်များခြင်း',
      'စလိုးတွင် အင်ဂျင်တုန်ပြီး တခါတရံ စက်သေသွားခြင်း',
      'Check Engine မီးလင်းပြီး DTC P0011 (Camshaft Position Advanced), P0012 (Retarded), P0016 (Timing Correlation)'
    ],
    diagnosticTips: 'အင်ဂျင်ဝိုင် အချိန်မှန် မလဲလှယ်ပါက အင်ဂျင်ဝိုင်ဂျီးများကြောင့် OCV အောက်ခြေရှိ VVT Filter ဆန်ကာ ပိတ်ဆို့ပြီး ဆီဖိအား မရောက်သဖြင့် VVT အလုပ်မလုပ်တော့ခြင်း အဖြစ်များဆုံး ဖြစ်သည်။'
  },

  // 8. TURBO VNT ACTUATOR & STEPPER MOTOR
  {
    id: 'turbo-vnt-actuator',
    nameEn: 'Turbocharger Variable Nozzle Actuator (VNT / VGT Stepper)',
    nameMy: 'တာဘို အဖွင့်/အပိတ် မော်တာ (VNT စတက်ပါ အက်ချူအိတ်တာ)',
    acronym: 'VNT ACTUATOR',
    category: 'turbo_vvt',
    categoryNameMy: 'တာဘို & ဘားချိန်',
    type: 'Bi-directional Stepper Motor + Position Feedback Sensor (4-Pin / 5-Pin)',
    systemRoleMy: 'အိတ်ဇောတာဘို အတွင်းရှိ လေဒလက်ပြားများ (Vanes) ၏ ထောင့်ချိုးကို ပြောင်းလဲပေးခြင်းဖြင့် အင်ဂျင်လည်နှုန်း နိမ့်ချိန်နှင့် မြင့်ချိန် နှစ်မျိုးစလုံးတွင် တာဘိုဖိအား (Boost Pressure) အမြန်ဆုံး တက်စေခြင်း။',
    internalStructure: 'Brushless DC Stepper Motor၊ ဝေါင်းဂီယာ (Worm Gear Drive)၊ လက်တံချိတ်ဆက်မှု (Connecting Linkage Arm)၊ တည်နေရာအာရုံခံ Hall Effect Sensor IC၊ အတွင်းပိုင်း မော်တာကွန်ပျူတာ ပရိုဆက်ဆာ ဘုတ်ပြား။',
    socketPinsCount: 5,
    socketViewDiagram: [
      { pinNumber: 1, label: 'Power (+12V)', wireColor: 'Black-Red (အနက်-အနီ)', destination: 'Main 20A Turbo Fuse', voltage: '12.0V ~ 14.2V DC', descriptionMy: 'မော်တာ မောင်းနှင်ရန် အမြဲတမ်း ၁၂ ဗို့ပါဝါ' },
      { pinNumber: 2, label: 'Ground (GND)', wireColor: 'Brown / Black (အညို/အနက်)', destination: 'Engine Block Ground', voltage: '0.0V DC', descriptionMy: 'မော်တာ အနှုတ်လိုင်း' },
      { pinNumber: 3, label: 'CAN-H / PWM Control', wireColor: 'White-Blue (အဖြူ-အပြာ)', destination: 'ECU Turbo Control Line', voltage: 'CAN Bus or 5V PWM Signal', descriptionMy: 'ECU မှ တာဘိုဖွင့်ရန် အမိန့်ပေးသည့်လိုင်း' },
      { pinNumber: 4, label: 'CAN-L / Feedback', wireColor: 'White (အဖြူ)', destination: 'ECU Position Feedback', voltage: 'Position Return Signal', descriptionMy: 'တာဘိုလက်တံ အမှန်တကယ် ပွင့်/မပွင့် ECU သို့ ပြန်ပို့သည့်လိုင်း' },
      { pinNumber: 5, label: 'Sensor Power (5V)', wireColor: 'Red (အနီ)', destination: 'Sensor 5V Supply', voltage: '5.0V DC', descriptionMy: 'အတွင်းပိုင်း ဆန်ဆာ ၅ ဗို့' }
    ],
    workingPrinciple: 'စက်အနှေးလည်ချိန် (Idle) တွင် အိတ်ဇောလေ အားနည်းသဖြင့် တာဘိုဒလက်ပြားများကို ကျဉ်းမြောင်းအောင် စတက်ပါမော်တာက ပိတ်ပေးထားသည်။ ထိုအခါ လေစီးဆင်းနှုန်း မြန်လာပြီး တာဘိုဒလက်ကို ချက်ချင်း လည်စေသည်။ အင်ဂျင်အရှိန်ပြင်းလာချိန်တွင် တာဘိုဖိအား လွန်ကဲပြီး ပေါက်ကွဲမသွားစေရန် ဒလက်ပြားများကို ပြန်ဖွင့်ပေးသည်။ တာဘိုလက်တံ မည်မျှပွင့်နေသည်ကို အတွင်းရှိ Position Sensor က ECU သို့ အမြဲတမ်း ပြန်လည် အစီရင်ခံသည်။',
    pinoutSummary: [
      { pin: 'Pin 1 (12V)', signalType: 'Motor Battery Power', standardValue: '12.0V ~ 14.4V DC', description: '၁၂ ဗို့ ပါဝါအဝင်' },
      { pin: 'Pin 2 (GND)', signalType: 'Chassis Ground', standardValue: '0.0V DC', description: 'အနှုတ်မြေခလိုင်း' },
      { pin: 'Pin 3 (PWM/CAN)', signalType: 'Command Input', standardValue: 'PWM Duty or CAN Bus', description: 'ECU အမိန့်ပေးလိုင်း', ecuTerminal: 'TRB+, VNTV' },
      { pin: 'Pin 4 (Feedback)', signalType: 'Position Feedback', standardValue: '0.5V (Closed) ➔ 4.5V (Open)', description: 'တည်နေရာ အချက်ပြဗို့', ecuTerminal: 'TRB-, VNTP' }
    ],
    wireColorGuide: 'အပူဒဏ်ခံနိုင်သော ဖိုက်ဘာအနားကွပ် ဝါယာကြိုးများဖြင့် ဖွဲ့စည်းထားသည်။',
    specifications: {
      operatingVoltage: '12.0V DC Power Supply',
      pressureRange: 'Turbo Boost Pressure: 0.8 bar ~ 2.2 bar (11.6 psi ~ 31.9 psi Boost)',
      liveDataIdle: 'VNT Vane Position: 80% ~ 90% (Vanes Closed to spool up fast)',
      liveDataLoad: 'VNT Vane Position: 30% ~ 50% (Vanes Open under high boost)',
      waveformType: 'CAN Bus Digital Data or PWM 250 Hz'
    },
    testingSteps: [
      { step: 1, title: 'သော့ဖွင့်ချိန် တာဘိုလက်တံ အလိုအလျောက် သွား/မသွား စစ်ဆေးခြင်း', description: 'သော့ ON လိုက်သည်နှင့် တာဘိုမော်တာသည် လှုပ်ရှားစစ်ဆေးမှု (Self-Test sweep) ပြုလုပ်ပြီး လက်တံ အစုန်အဆန် ရွေ့လျားရမည်။ မလှုပ်ပါက ပါဝါပြတ် သို့မဟုတ် မော်တာ ဂျမ်းဖြစ်နေသည်။', tool: 'test_light' },
      { step: 2, title: 'Scanner Active Test ဖြင့် တာဘိုမော်တာ စမ်းသပ်ခြင်း', description: 'Scanner ဖြင့် VNT Actuator Active Test တွင် 0% မှ 100% သို့ မောင်းကြည့်ပါ။ လက်တံ ချောမောစွာ လိုက်ပါရွေ့လျားရမည်။', tool: 'scan_tool' }
    ],
    teachingMasterclass: {
      triggerMechanism: 'ဂီယာသွားဖြင့် တာဘိုဒလက် ထောင့်ချိုးပြောင်းလဲမှု: စတက်ပါမော်တာ၏ လှည့်ပတ်အားကို ဝေါင်းဂီယာဖြင့် ပြောင်းလဲကာ တာဘိုအိမ်အတွင်းရှိ ဒလက်ပြား ဒါဇင်ပေါင်းများစွာကို တစ်ပြိုင်နက် ကွေးညွတ်ပွင့်စေခြင်း။',
      physicsPrinciple: 'ဗင်ကျူရီနိယာမ (Venturi Effect): အပေါက်ကျဉ်းသွားပါက ဓာတ်ငွေ့စီးဆင်းနှုန်း မြန်လာသည်။ အိတ်ဇောဓာတ်ငွေ့ ပမာဏ နည်းပါးချိန်တွင် လေလမ်းကြောင်းကို ကျဉ်းပေးလိုက်ခြင်းဖြင့် ဂျက်လေယာဉ် အင်ဂျင်ကဲ့သို့ တာဘိုဒလက်ကို အရှိန်ပြင်းစွာ လည်စေသည်။',
      electronicsControl: 'အက်ချူအိတ်တာ ခေါင်းထဲတွင် Microcontroller ချစ်ပ်ပြားနှင့် MOSFET H-Bridge Driver တပ်ဆင်ထားပြီး ECU ထံမှ Digital အချက်ပြမှုအရ မော်တာကို ၁ ဒီဂရီ၏ ၁၀ ပုံ ၁ ပုံတိတိအထိ တိကျစွာ ရပ်တန့်ထိန်းကျောင်းပေးသည်။',
      analogyForStudents: 'ရေပိုက်ထိပ်ကို လက်မဖြင့် ဖိညှစ်လိုက်ပါက ရေစီးကြောင်း အဝေးကြီးသို့ အရှိန်ပြင်းစွာ ပန်းထွက်သွားသလို၊ တာဘိုအပေါက်ကို ကျဉ်းပေးလိုက်ခြင်းဖြင့် အိတ်ဇောလေ အားနည်းချိန်မှာပင် တာဘိုကို အရှိန်ပြင်းစွာ လည်စေခြင်း ဖြစ်သည်။'
    },
    symptomsOfFailure: [
      'အရှိန်တင်ချိန် ကားဆွဲအား လုံးဝမရှိဘဲ လေးလံနေခြင်း (Turbo Lag အလွန်ဆိုးခြင်း)',
      'အိတ်ဇောမှ မီးခိုးမည်းများ လိပ်ထွက်ခြင်း',
      'Check Engine မီးလင်းပြီး DTC P0045 (Turbo Boost Control Circuit Open), P0046, P1251'
    ],
    diagnosticTips: 'မကြာခဏ တာဘိုအိမ်တွင်း ကာဗွန်ဂျီးများ အထူကြီး ပိတ်ဆို့ပြီး ဒလက်ပြားများ ဂျမ်းဖြစ်ကာ မော်တာအတွင်းရှိ ပလတ်စတစ် ဂီယာသွားများ ပဲ့ကျိုးတတ်သည်။'
  }
];
