import { ComponentAssembly } from '../types/wiring';

export const MAJOR_ASSEMBLIES_DATA: ComponentAssembly[] = [
  {
    id: 'electronic-throttle-body',
    nameEn: 'Electronic Throttle Body (ETCS-i)',
    nameMy: 'အီလက်ထရောနစ် လေတံခါး (လိပ်ပြာဒလက်စနစ်)',
    subtitle: 'ကြိုးမဲ့ မော်တာမောင်း လေတံခါး & စလိုးထိန်းစနစ်',
    sensorsInstalled: ['Dual Throttle Position Sensor (TPS1 & TPS2)', 'Accelerator Pedal Position Sensor (APS)'],
    workingPrinciple: 'လီဗာကြိုး မပါတော့ဘဲ ယာဉ်မောင်းသူက လီဗာနင်းပြား (APS) ကို နင်းလိုက်သည့် အချက်ပြဗို့အားအရ ECU ကွန်ပျူတာက အတွင်းရှိ DC Drive Motor ကို PWM (Pulse Width Modulation) လျှပ်စစ်လှိုင်းဖြင့် အချိန်မရွေး လိပ်ပြာဒလက် အဖွင့်/အပိတ်ကို တိကျစွာ မောင်းနှင်ပေးသည်။ စလိုးအမြန်နှုန်း (Idle Control)၊ အဲကွန်းဖွင့်ချိန် စလိုးတင်ပေးခြင်း၊ Cruise Control အားလုံးကို ဤလေတံခါးတစ်ခုတည်းက စီမံသည်။',
    internalComponents: [
      'DC Throttle Drive Motor (+ / - PWM လိုင်း ၂ ပင်)',
      'Dual Hall Effect TPS Sensor (5V, Ground, VTA1, VTA2)',
      'လျှော့ချရေး ဂီယာသွားများ (Reduction Gear Train)',
      'စက်ပိုင်း အရေးပေါ် ပြန်ကန်စပရင် (Limp-Home Return Spring)'
    ],
    testingAndInspection: [
      {
        testName: 'မော်တာကွိုင် ခုခံအား အုမ်းတိုင်းခြင်း',
        procedure: 'မော်တာ ပင် ၂ ပင် (+ / -) ကြားတွင် မီတာဖြင့် တိုင်းပါ။',
        standardValue: '1.5Ω ~ 3.5Ω (အလွန်နိမ့်သော ခုခံအား ရှိရမည်)'
      },
      {
        testName: '၁၂ ဗို့ တိုက်ရိုက် မော်တာလည်/မလည် စမ်းသပ်ခြင်း',
        procedure: 'မော်တာ ပင် ၂ ပင်သို့ +12V နှင့် Ground ကို ခေတ္တ ထိပေးကြည့်ပါ။',
        standardValue: 'လိပ်ပြာဒလက်သည် အပြည့်ပွင့်သွားရမည်။ မီးကြိုးပြန်လှန်ပါက အပြည့်ပြန်ပိတ်ရမည်။'
      },
      {
        testName: 'TPS1 & TPS2 ဗို့အား စစ်ဆေးခြင်း',
        procedure: 'သော့ ON ထားပြီး လိပ်ပြာဒလက်ကို လက်ဖြင့် ဖြည်းဖြည်းချင်း ဖွင့်ကြည့်ပါ။',
        standardValue: 'VTA1: 0.5V ➔ 4.5V တက်ရမည် / VTA2: 2.2V ➔ 4.8V တက်ရမည်'
      }
    ],
    commonProblems: [
      {
        problem: 'ကားစလိုးမငြိမ်ခြင်း၊ ဂီယာထိုးလိုက်ပါက စက်သေသွားခြင်း',
        cause: 'လိပ်ပြာဒလက် အနားသတ်များတွင် အင်ဂျင်ဝိုင်ငွေ့နှင့် ကာဗွန်ဂျီးများ အထူကြီး ပိတ်ဆို့နေခြင်း။',
        fix: 'Throttle Cleaner Spray ဖြင့် သန့်စင်ပြီး Throttle Body Relearn ပြန်လည်ပြုလုပ်ပါ။'
      },
      {
        problem: 'လီဗာနင်းသော်လည်း စက်သံ လုံးဝမတက်ဘဲ စလိုးဖြင့်သာ ရွေ့နေခြင်း (Limp Mode)',
        cause: 'အတွင်းပိုင်း ပလတ်စတစ် ဂီယာသွားများ ကျိုးနေခြင်း သို့မဟုတ် TPS အချိုးလွဲနေခြင်း။',
        fix: 'ဂီယာသွားစစ်ဆေးပါ သို့မဟုတ် လေတံခါးတစ်လုံးလုံး အသစ်လဲလှယ်ပါ။'
      }
    ],
    wiringDiagramBrief: 'Motor (+): ECU Pin M+ / Motor (-): ECU Pin M- (Duty 0~100%) / TPS: 5V, GND, VTA1, VTA2',
    proTip: 'လေတံခါးကို ဖြုတ်ဆေးပြီးတိုင်း Battery အနှုတ်ကြိုးကို ၁၀ မိနစ်ခန့် ဖြုတ်ထားပြီးမှ စက်ပြန်နှိုး၍ အဲကွန်းပိတ်ကာ ၅ မိနစ်ခန့် စလိုးလည်စေပြီး Throttle Relearn ပြုလုပ်ပေးပါ။'
  },
  {
    id: 'vvti-vtec-system',
    nameEn: 'VVT-i / VTEC / Vanos Variable Valve Timing',
    nameMy: 'ဗွီဗွီတီအိုင် & ဗွီတက် ဘားချိန်စနစ်သစ်များ',
    subtitle: 'ကင်းရှပ်ထောင့် ပြောင်းလဲပေးသော ဟိုက်ဒရောလစ် စနစ်',
    sensorsInstalled: ['Camshaft Position Sensor (CMP)', 'Crankshaft Position Sensor (CKP)', 'Engine Oil Temp / Pressure Sensor'],
    workingPrinciple: 'အင်ဂျင်လည်နှုန်း နိမ့်ချိန်တွင် ဆီစားသက်သာစေရန်နှင့် အဆွဲအရုန်း ကောင်းစေရန် ဘားပွင့်ချိန်ကို လျှော့ချထားပြီး၊ အင်ဂျင်ပတ်နှုန်း မြင့်တက်လာချိန်တွင် ကင်းရှပ်၏ လှည့်ပတ်ဒီဂရီ (Advance / Retard) ကို အင်ဂျင်ဝိုင်ဖိအားဖြင့် ရှေ့သို့ တိုးပေးသည်။ ဤသို့ဖြင့် မြင်းကောင်ရေကို ၂၀% ခန့် တိုးတက်စေသည်။ ဤစနစ်ကို OCV (Oil Control Valve) ဟုခေါ်သော လျှပ်စစ်ဆိုလီနွိုက်ဖြင့် ECU က စီမံသည်။',
    internalComponents: [
      'OCV Solenoid Valve (လျှပ်စစ်ဆီထိန်းဗားလ်)',
      'VVT Cam Phaser Gear (ကင်းရှပ်ထိပ်ရှိ ဗိန်းဂီယာခွက်)',
      'VVT Filter Screen (ဆီဂျီးစစ် ဆန်ကာငယ်)',
      'Internal Lock Pin (စက်စနှိုးချိန် ကင်းရှပ်မလှုပ်စေသော လော့ပင်)'
    ],
    testingAndInspection: [
      {
        testName: 'OCV ကွိုင် ခုခံအား အုမ်းတိုင်းခြင်း',
        procedure: 'OCV ပင် ၂ ပင် ကြားတွင် မီတာဖြင့် တိုင်းပါ။',
        standardValue: '6.5Ω ~ 12.0Ω (20°C အေးချိန်တွင်)'
      },
      {
        testName: '၁၂ ဗို့ဖြင့် ပလန်ဂျာ ကစ်/မကစ် စစ်ဆေးခြင်း',
        procedure: 'OCV ကို ဖြုတ်ယူပြီး +12V နှင့် Ground တိုက်ရိုက် ထိပေးကြည့်ပါ။',
        standardValue: 'အတွင်းပိုင်း ပလန်ဂျာတံသည် "ဖျစ်ခနဲ" ချက်ချင်း ရှေ့သို့ ကန်ထွက်ရမည်။'
      },
      {
        testName: 'OCV ဆန်ကာဇကာ ပိတ်/မပိတ် စစ်ဆေးခြင်း',
        procedure: 'အင်ဂျင်ဘလောက်တုံးရှိ OCV အောက်က နတ်ခေါင်းကို ဖြုတ်ပြီး ဆန်ကာဇကာကို ထုတ်ကြည့်ပါ။',
        standardValue: 'ဆီဂျီးနှင့် သံမှုန့်များ ကင်းစင်နေရမည်။'
      }
    ],
    commonProblems: [
      {
        problem: 'မနက်ပိုင်း စက်နှိုးပြီးစတွင် ကင်းရှပ်ဘက်မှ "ခလောက် ခလောက်" ဟု စက္ကန့်အနည်းငယ် မြည်နေခြင်း',
        cause: 'Cam Phaser ဂီယာခွက်အတွင်းရှိ Lock Pin ချောင်နေခြင်း သို့မဟုတ် အင်ဂျင်ဝိုင် အရောက်နှေးခြင်း။',
        fix: 'အင်ဂျင်ဝိုင် အပြစ်အကျဲ စစ်ဆေးပါ သို့မဟုတ် Cam Phaser ဂီယာ အသစ်လဲလှယ်ပါ။'
      },
      {
        problem: 'Check Engine မီးလင်းပြီး ကားဆွဲအား မရှိဘဲ လေးလံနေခြင်း',
        cause: 'OCV Valve ပလန်ဂျာ ဂျမ်းဖြစ်နေခြင်း သို့မဟုတ် OCV ဆန်ကာ ဆီဂျီးပိတ်နေခြင်း။',
        fix: 'OCV နှင့် ဆန်ကာကို ဖြုတ်ဆေးပါ သို့မဟုတ် အသစ်လဲပါ။'
      }
    ],
    wiringDiagramBrief: 'OCV Pin 1: +12V (EFI Main Relay) / OCV Pin 2: ECU Duty Control Ground (OCV- / VV1)',
    proTip: 'VVT-i ကားများတွင် အင်ဂျင်ဝိုင် အချိန်မှန် မလဲလှယ်ပါက အင်ဂျင်ဝိုင်ဂျီး (Sludge) ကြောင့် VVT စနစ် ပျက်စီးတတ်ဆုံး ဖြစ်သည်။'
  },
  {
    id: 'egr-system',
    nameEn: 'EGR Valve & Cooler System',
    nameMy: 'အိပ်ဇောဓာတ်ငွေ့ ပြန်လည်လည်ပတ်စနစ် (အီးဂျီအာရ်)',
    subtitle: 'အပူချိန်လျှော့ချပြီး အဆိပ်ဓာတ်ငွေ့ ကာကွယ်သော စနစ်',
    sensorsInstalled: ['EGR Valve Position Sensor', 'EGR Temperature Sensor', 'MAP Sensor'],
    workingPrinciple: 'အင်ဂျင်မီးလောင်ပေါက်ကွဲခန်းအတွင်း အပူချိန် အလွန်မြင့်မားပါက (1370°C ကျော်) လေထုထဲရှိ နိုက်ထရိုဂျင်နှင့် အောက်ဆီဂျင်တို့ ပေါင်းစပ်ပြီး အလွန်အဆိပ်ပြင်းသော နိုက်ထရိုဂျင်အောက်ဆိုဒ် (NOx) ဓာတ်ငွေ့များ ထွက်ပေါ်လာသည်။ ထို့ကြောင့် အိပ်ဇောငွေ့ အနည်းငယ် (၅% မှ ၁၅%) ကို အအေးခံပြီး လေစုပ်ပြွန်ထဲသို့ ပြန်လည်ထည့်သွင်းပေးကာ ပေါက်ကွဲခန်း အပူချိန်ကို လျှော့ချပေးသည်။',
    internalComponents: [
      'Stepper Motor သို့မဟုတ် DC Motor (EGR Valve မောင်းနှင်ရန်)',
      'Stainless Steel Poppet Valve (အပူဒဏ်ခံ ဘားခေါင်း)',
      'EGR Position Sensor (ဘားအဖွင့်ပမာဏ တိုင်းဆန်ဆာ)',
      'EGR Cooler (ရေအေးခံ အင်ဂျင်ရေလိုင်းပါသော အအေးခံဘူး)'
    ],
    testingAndInspection: [
      {
        testName: 'EGR မော်တာ ခုခံအား အုမ်းတိုင်းခြင်း',
        procedure: 'EGR မော်တာ ပင်များကြားတွင် မီတာဖြင့် တိုင်းပါ။',
        standardValue: 'Stepper: 20Ω ~ 24Ω / DC Motor: 2Ω ~ 4Ω'
      },
      {
        testName: 'ဘားပိတ်မှု လေလုံမလုံ စစ်ဆေးခြင်း',
        procedure: 'EGR ကို ဖြုတ်ပြီး ဘားထိုင်ခုံထဲသို့ ဓာတ်ဆီ အနည်းငယ် ထည့်ကြည့်ပါ။',
        standardValue: 'ဓာတ်ဆီ အောက်သို့ လုံးဝ မစိမ့်ကျရပါ (ဘားအပြည့် ပိတ်နေရမည်)။'
      }
    ],
    commonProblems: [
      {
        problem: 'စလိုးတွင် အင်ဂျင်တုန်ခါပြီး မကြာခဏ စက်သေသွားခြင်း',
        cause: 'EGR ဘားခေါင်းတွင် ကာဗွန်ဂျီးများ ခဲနေသဖြင့် ဘားအပြည့် မပိတ်နိုင်ဘဲ အမြဲ ဟနေခြင်း။',
        fix: 'EGR ကို ဖြုတ်၍ ကာဗွန်ချွတ်ဆေးဖြင့် သန့်စင်ပါ။'
      },
      {
        problem: 'အင်ဂျင်ရေများ လျော့နည်းသွားပြီး အိတ်ဇောမှ မီးခိုးဖြူများ ထွက်ခြင်း',
        cause: 'EGR Cooler အတွင်းပိုင်း ပိုက်လိုင်းပေါက်ပြဲ၍ အင်ဂျင်ရေ အိပ်ဇောထဲ စိမ့်ဝင်ခြင်း။',
        fix: 'EGR Cooler အသစ်လဲလှယ်ပါ။'
      }
    ],
    wiringDiagramBrief: 'Motor: 12V Switched Power / ECU Pulse Ground / Sensor: 5V, Ground, EGR Signal (0.8V ➔ 4.2V)',
    proTip: 'ဒီဇယ် Common Rail ကားများတွင် EGR အလွန်ဂျီးပိတ်လေ့ရှိပြီး ကားဆွဲအားကျပါက EGR နှင့် Intake Manifold ကို ၅ သောင်းကီလိုမီတာတစ်ကြိမ် ဖြုတ်ဆေးသင့်သည်။'
  },
  {
    id: 'aircon-system',
    nameEn: 'A/C Compressor & Climate Control System',
    nameMy: 'အဲကွန်း ကွန်ပရက်ဆာနှင့် အအေးပေးစနစ်',
    subtitle: 'သံလိုက်ကလပ်၊ အီလက်ထရောနစ်ဗား & ဂတ်စ်ဖိအားစနစ်',
    sensorsInstalled: ['A/C Pressure Transducer', 'Evaporator Temperature Sensor', 'Ambient Outside Temp Sensor', 'Solar Sunload Sensor'],
    workingPrinciple: 'အဲကွန်းခလုတ် ဖွင့်လိုက်ပါက ECU သို့မဟုတ် A/C Amplifier က ဂတ်စ်ဖိအား (A/C Pressure) နှင့် အအေးကွိုင်အပူချိန် (Evaporator Temp) ကို စစ်ဆေးသည်။ အရာအားလုံး အဆင်ပြေပါက A/C Relay ကို ဖွင့်ပေးပြီး ကွန်ပရက်ဆာ သံလိုက်ကလပ် (Magnetic Clutch) ကို ကစ်ဆွဲစေသည် သို့မဟုတ် ခေတ်သစ် ကားများတွင် ECV (Electronic Control Valve) ကို PWM လှိုင်းဖြင့် လိုအပ်သလို အအေးထုတ်ပေးစေသည်။ တစ်ချိန်တည်းတွင် အင်ဂျင် စလိုးမကျစေရန် လေတံခါးကို အလိုအလျောက် စလိုးတင်ပေးသည် (A/C Idle-up)။',
    internalComponents: [
      'A/C Compressor (Piston သို့မဟုတ် Scroll အမျိုးအစား)',
      'Magnetic Clutch Coil (သံလိုက်ဆွဲကွိုင်) & Hub Plate',
      'ECV Solenoid (Clutchless ခေတ်သစ် အဆို့ရှင်)',
      'Condenser & Cooling Fan (အပူစွန့် ရေတိုင်ကီနှင့် ပန်ကာ)',
      'Thermal Expansion Valve (TXV - ဖိအားလျှော့ ဘားပေါက်ကျဉ်း)',
      'Evaporator Coil (အအေးကွိုင်)'
    ],
    testingAndInspection: [
      {
        testName: 'သံလိုက်ကလပ်ကွိုင် ခုခံအား စစ်ဆေးခြင်း',
        procedure: 'ကလပ်ကွိုင် ပင်နှင့် ဘော်ဒီကြား အုမ်းတိုင်းပါ။',
        standardValue: '3.0Ω ~ 4.5Ω (20°C တွင်)'
      },
      {
        testName: 'ကလပ်ကွာဟချက် (Air Gap) စစ်ဆေးခြင်း',
        procedure: 'ကလပ်ပြားနှင့် ပူလီကြား ဖီးလာဂေ့ (Feeler Gauge) ထိုးတိုင်းပါ။',
        standardValue: '0.35 mm ~ 0.65 mm (ချောင်လွန်းပါက အပူချိန်တက်ချိန် ကလပ်လွတ်တတ်သည်)'
      },
      {
        testName: 'ECV Solenoid Valve စစ်ဆေးခြင်း (ခေတ်သစ်)',
        procedure: 'ECV ပင် ၂ ပင် ကြားတွင် အုမ်းတိုင်းပါ။',
        standardValue: '10.5Ω ~ 13.5Ω'
      }
    ],
    commonProblems: [
      {
        problem: 'ကားရပ်ထားချိန် အဲကွန်းမအေးဘဲ ကားပြေးမှ အေးလာခြင်း',
        cause: 'Condenser ပန်ကာ မလည်ခြင်း သို့မဟုတ် Condenser ရေတိုင်ကီ ဖုန်ပိတ်နေခြင်း။',
        fix: 'ပန်ကာမော်တာ/ရီလေး စစ်ဆေးပါ၊ ရေတိုင်ကီကို ရေဆေးချပါ။'
      },
      {
        problem: 'အဲကွန်းစဖွင့်ချိန်တွင် အေးပြီး ၁၅ မိနစ်ခန့် မောင်းပြီးနောက် ကွန်ပရက်ဆာ ရပ်သွားခြင်း',
        cause: 'သံလိုက်ကလပ်ကွာဟချက် (Clutch Air Gap) အရမ်းကျယ်နေသဖြင့် ကွိုင်ပူလာချိန် သံလိုက်မဆွဲနိုင်တော့ခြင်း။',
        fix: 'ကလပ်ခေါင်းဖြုတ်၍ အတွင်းရှိ Shim ဝါရှာ အပါးတစ်ပြား ထုတ်ပေးပါ။'
      }
    ],
    wiringDiagramBrief: 'A/C Switch ➔ A/C Amp ➔ Engine ECU (Idle-up request) ➔ A/C Relay (Pin 87) ➔ Compressor Clutch (+12V)',
    proTip: 'ဂတ်စ်ဖိအား နိမ့်လွန်းပါက (Low Gas < 2.0 bar) ကွန်ပရက်ဆာ မလောင်စေရန် ECU က လုံးဝ မီးမဖွင့်ပေးပါ။'
  },
  {
    id: 'turbo-vgt-system',
    nameEn: 'Turbocharger & VGT Actuator System',
    nameMy: 'တာဘိုချာဂျာနှင့် တာဘိုဖိအားထိန်းစနစ်',
    subtitle: 'VGT လျှပ်စစ်ဒလက်ထောင့်ပြောင်း & Wastegate စနစ်',
    sensorsInstalled: ['Boost Pressure Sensor (MAP)', 'Exhaust Gas Temp Sensor (EGT)', 'VGT Position Sensor'],
    workingPrinciple: 'အင်ဂျင်မှ ထွက်လာသော အိပ်ဇောငွေ့အားဖြင့် တာဘိုင်ဒလက်ကို တစ်မိနစ်လျှင် အပတ်ရေ ၁ သိန်းမှ ၂ သိန်းအထိ လည်ပတ်စေပြီး လေစုပ်ဒလက်မှတစ်ဆင့် အင်ဂျင်ထဲသို့ လေသိပ်သည်းဆ မြင့်မားစွာ တွန်းသွင်းပေးသည်။ VGT (Variable Geometry Turbo) စနစ်တွင် အနိမ့်နှုန်း၌ ဒလက်ထောင့်ကျဉ်း၍ အမြန်လည်စေပြီး၊ အမြင့်နှုန်း၌ ဒလက်ထောင့်ဖွင့်၍ ဖိအားမလွန်ကဲအောင် လျှပ်စစ် Actuator ဖြင့် တိကျစွာ ထိန်းပေးသည်။',
    internalComponents: [
      'Turbine Wheel & Compressor Wheel (အိတ်ဇော & လေစုပ်ဒလက်များ)',
      'Center Bearing Housing (အင်ဂျင်ဝိုင်နှင့် ရေအအေးခံစနစ်ပါ ဘယ်ရင်)',
      'VGT Electronic Stepper Actuator (ဒလက်ထောင့်ရွှေ့ မော်တာ)',
      'Wastegate Solenoid Valve (ဖိအားပိုလျှံမှု စွန့်ဗားလ်)'
    ],
    testingAndInspection: [
      {
        testName: 'VGT Actuator မော်တာ စစ်ဆေးခြင်း',
        procedure: 'သော့ ON လိုက်ချိန်တွင် Actuator လက်တံသည် ကနဦး အစွန်း ၂ ဖက်သို့ ကစားလှုပ်ရှားမှု ရှိမရှိ စစ်ပါ။',
        standardValue: 'Sweep Test ချက်ချင်း ပြုလုပ်ပြီး မူလနေရာ ပြန်ထိုင်ရမည်။'
      },
      {
        testName: 'တာဘိုရိုး အတက်အကျ ကစားမှု (Shaft Play) စစ်ဆေးခြင်း',
        procedure: 'လေစုပ်ပိုက်ကို ဖြုတ်ပြီး လက်ညှိုးဖြင့် တာဘိုဝင်ရိုးကို အထက်/အောက်၊ အရှေ့/အနောက် လှုပ်ကြည့်ပါ။',
        standardValue: 'အထက်အောက် ကစားမှု အနည်းငယ်သာ ရှိရမည်၊ အရှေ့အနောက် (Axial Play) လုံးဝ မရှိရပါ။'
      }
    ],
    commonProblems: [
      {
        problem: 'ကားဆွဲအား လုံးဝမရှိဘဲ လိပ်ပြာမလိုက်ခြင်း (Underboost)',
        cause: 'VGT Actuator မော်တာ ဂီယာပလပ်စတစ်သွား ကျိုးနေခြင်း သို့မဟုတ် ဒလက်များ ကာဗွန်ဂျီးကပ်နေခြင်း။',
        fix: 'Actuator ပြုပြင်လဲလှယ်ပါ သို့မဟုတ် တာဘို ဖြုတ်ဆေးပါ။'
      },
      {
        problem: 'အိတ်ဇောမှ မီးခိုးပြာများ ထွက်ပြီး အင်ဂျင်ဝိုင် အလွန်လျော့နည်းသွားခြင်း',
        cause: 'တာဘိုဝင်ရိုး ဆီထိန်းအဝိုင်း (Turbo Oil Seal) ပေါက်ပြဲ၍ အင်ဂျင်ဝိုင်များ အိတ်ဇောထဲ စိမ့်ဝင်ခြင်း။',
        fix: 'တာဘို Core ပြန်လည်တည်ဆောက်ပါ သို့မဟုတ် တာဘို အသစ်လဲပါ။'
      }
    ],
    wiringDiagramBrief: 'Actuator: 12V Power, Ground, CAN High, CAN Low သို့မဟုတ် PWM Control Line',
    proTip: 'တာဘိုကားများကို ခရီးဝေး အရှိန်ပြင်းပြင်း မောင်းပြီးပြီးချင်း ချက်ချင်း စက်မသတ်ပါနှင့်။ တာဘို အအေးခံနိုင်ရန် စလိုး ၂ မိနစ်ခန့် နှိုးထားပြီးမှ စက်သတ်ပါ။'
  },
  {
    id: 'common-rail-system',
    nameEn: 'Common Rail High-Pressure Diesel Injection',
    nameMy: 'ကွန်မွန်းရေး အမြင့်ဖိအား ဒီဇယ်ဆီပေးစနစ်',
    subtitle: 'SCV Valve၊ ပင်မဆီပိုက်နှင့် အင်ဂျက်တာ ဆီဖြန်းစနစ်',
    sensorsInstalled: ['Fuel Rail Pressure Sensor (FRP)', 'Fuel Temperature Sensor', 'Crank / Cam Sensors'],
    workingPrinciple: 'စက်မှုဒီဇယ်ပန့်ကြီးသည် ဒီဇယ်ဆီကို 300 bar မှ 2,200 bar အထိ အလွန်မြင့်မားသော ဖိအားဖြင့် Common Rail ပင်မပိုက်ပြွန်ကြီးထဲသို့ တွန်းပို့ထားသည်။ ECU သည် ဆလင်ဒါတစ်ခုစီ၏ အင်ဂျက်တာ ဆိုလီနွိုက် သို့မဟုတ် ပီဇိုခရစ္စတယ်ကို မိုက်ခရိုစက္ကန့်အတွင်း အကြိမ်ကြိမ် ဖွင့်ပေးခြင်းဖြင့် စက်နှိုးသံ ငြိမ့်ညောင်းပြီး ဆီစားသက်သာစေသော ဆီဖြန်းစနစ် (Pilot, Main, Post Injection) ကို ဆောင်ရွက်သည်။',
    internalComponents: [
      'High Pressure Pump (ဖိအားမြှင့် ဒီဇယ်ပန့်)',
      'SCV / IMV Solenoid Valve (ဆီဝင်ဖိအား ထိန်းဗားလ်)',
      'Common Rail Pipe & Pressure Limiter Valve (အရေးပေါ် ဆီလျှံဗားလ်)',
      'Common Rail Injectors (Solenoid သို့မဟုတ် Piezo စနစ်များ)'
    ],
    testingAndInspection: [
      {
        testName: 'SCV Valve ခုခံအား အုမ်းတိုင်းခြင်း',
        procedure: 'SCV ပင် ၂ ပင် ကြားတွင် မီတာဖြင့် တိုင်းပါ။',
        standardValue: '1.8Ω ~ 3.5Ω (အေးချိန်တွင်)'
      },
      {
        testName: 'အင်ဂျက်တာ ဆီပြန်ပမာဏ (Back Leak Test) စစ်ဆေးခြင်း',
        procedure: 'စလင်ဒါတစ်လုံးစီ၏ အင်ဂျက်တာ ဆီပြန်ပိုက်ခေါင်းတွင် ဆေးထိုးပြွန်နှင့် ပိုက်တပ်၍ ၂ မိနစ် စက်နှိုးထားပါ။',
        standardValue: 'စလင်ဒါအားလုံး ဆီပြန်ပမာဏ ညီမျှရမည် (အလွန်များသော အင်ဂျက်တာသည် ပျက်နေပြီ)'
      }
    ],
    commonProblems: [
      {
        problem: 'လီဗာဆောင့်နင်းလိုက်ချိန်တွင် ရုတ်တရက် စက်သေသွားပြီး Check Engine မီးလင်းခြင်း',
        cause: 'အင်ဂျက်တာ ဆီပြန်များသဖြင့် သို့မဟုတ် SCV မလိုက်သဖြင့် Rail ဖိအား ထိုးကျသွားခြင်း။',
        fix: 'အင်ဂျက်တာ ပြုပြင်ပါ သို့မဟုတ် SCV Valve အသစ်လဲလှယ်ပါ။'
      },
      {
        problem: 'မနက်ပိုင်း အေးချိန်တွင် စက်နှိုးရ အလွန်ခက်ခဲခြင်း',
        cause: 'Common Rail ဖိအား 200 bar အထက်သို့ အမြန်မတက်နိုင်ခြင်း။',
        fix: 'ဒီဇယ်ဆီစစ်ဘူး လဲလှယ်ပါ၊ ဆီလိုင်း လေခိုမှု လေထုတ်ပေးပါ။'
      }
    ],
    wiringDiagramBrief: 'SCV: 12V Supply / ECU PWM Duty Ground / Injectors: High Voltage (50V~80V Peak) Driver Output',
    proTip: 'ကွန်မွန်းရေး စနစ်တွင် ရေနှင့် အမှိုက် လုံးဝ မခံပါ။ ဒီဇယ်ဆီစစ်ဘူး (Fuel Filter) ကို စစ်မှန်သော မူရင်းပစ္စည်းဖြင့်သာ အချိန်မှန် လဲလှယ်ပေးရပါမည်။'
  },
  {
    id: 'ignition-coil-system',
    nameEn: 'Ignition Coil System (COP)',
    nameMy: 'မီးကွိုင်စနစ် (ခေါင်းတပ်မီးကွိုင်)',
    subtitle: '၂ ကြိုး၊ ၃ ကြိုး၊ ၄ ကြိုး စနစ်များနှင့် IGT/IGF လိုင်းများ',
    sensorsInstalled: ['Crankshaft Position Sensor (CKP)', 'Camshaft Position Sensor (CMP)', 'Knock Sensor'],
    workingPrinciple: 'ဘက်ထရီမှ ၁၂ ဗို့ ဓာတ်အားကို မီးကွိုင်အတွင်းရှိ ပင်မကွိုင် (Primary Winding) နှင့် အရန်ကွိုင် (Secondary Winding) အချိုးဖြင့် ၂၅,၀၀၀ မှ ၄၀,၀၀၀ ဗို့အထိ မြင့်မားသော ဗို့အားအဖြစ် ပြောင်းလဲပေးသည်။ ကွန်ပျူတာ (ECU) မှ IGT အချက်ပြမီးစနက် လှိုင်း ရောက်လာချိန်တွင် မီးကွိုင်အတွင်းရှိ ပါဝါထရန်စစ္စတာက ဖွင့်ပေးပြီး ပလပ်ထိပ်တွင် မီးပွားကူးစေကာ ဆီနှင့်လေကို ပေါက်ကွဲစေသည်။',
    internalComponents: [
      'Primary Coil (နန်းကြိုးထူ အပတ်ရေ ၂၀၀ ခန့်)',
      'Secondary Coil (နန်းကြိုးနု အပတ်ရေ ၂၀,၀၀၀ ခန့်)',
      'Igniter Power Transistor (အတွင်းပါ လျှပ်စစ်ခလုတ်)',
      'Spark Plug Boot & High-voltage Resistor'
    ],
    testingAndInspection: [
      {
        testName: '၄ ကြိုး မီးကွိုင် ဝါယာခွဲခြား စစ်ဆေးခြင်း',
        procedure: 'ဆန်ဆာပလပ်တွင် သော့ ON ထားပြီး မီတာဖြင့် တိုင်းပါ။',
        standardValue: 'Pin 1: +12V Power / Pin 2: Ground (0V) / Pin 3: IGT (5V Pulse) / Pin 4: IGF (5V Feedback)'
      },
      {
        testName: 'စက်နှိုးစဉ် IGT Trigger စစ်ဆေးခြင်း',
        procedure: 'IGT ကြိုးကို LED Test Light သို့မဟုတ် Oscillo ဖြင့် ထောက်ကြည့်ပါ။',
        standardValue: 'စက်နှိုးစဉ် LED မီးသီး တဖျတ်ဖျတ် မီးလင်းရမည် (5V Pulse ရှိကြောင်း ပြသသည်)။'
      }
    ],
    commonProblems: [
      {
        problem: 'အင်ဂျင်စလင်ဒါ မီးလွတ်ခြင်း (Engine Misfire / ၃ လုံးဖြစ်ခြင်း)',
        cause: 'မီးကွိုင် ရာဘာစွပ် ပေါက်ပြဲ၍ မီးပွားများ အင်ဂျင်ခေါင်းဘော်ဒီသို့ ကူးထွက်ခြင်း။',
        fix: 'မီးကွိုင်ရာဘာခေါင်း လဲပါ သို့မဟုတ် မီးကွိုင် အသစ်လဲလှယ်ပါ။'
      },
      {
        problem: 'စက်နှိုးပြီး ၂ စက္ကန့်အတွင်း ချက်ချင်း ပြန်သေသွားခြင်း',
        cause: 'မီးကွိုင်မှ IGF (Ignition Feedback) အချက်ပြဗို့ ECU ဆီသို့ ပြန်မရောက်သဖြင့် ECU က ဆီဖြတ်ချခြင်း။',
        fix: 'IGF ဝါယာကြိုး ပြတ်တောက်မှု စစ်ဆေးပြုပြင်ပါ။'
      }
    ],
    wiringDiagramBrief: '+12V (Ignition Switch) ➔ Coil Primary ➔ Internal Transistor ➔ Ground (Triggered by ECU IGT)',
    proTip: 'မီးလွတ်နေသော စလင်ဒါကို ရှာလိုပါက စက်နှိုးထားစဉ် မီးကွိုင်ပလပ်ကို တစ်လုံးချင်းစီ ဆွဲဖြုတ်ကြည့်ပါ။ စက်သံ မပြောင်းလဲသော စလင်ဒါသည် မီးမကူးသော စလင်ဒါ ဖြစ်သည်။'
  },
  {
    id: 'central-door-lock-trunk-system',
    nameEn: 'Central Door Lock & Trunk Release System (BCM Controlled)',
    nameMy: 'တံခါး ၄ ပေါက် & နောက်ဖုံး ဗဟိုထိန်းချုပ် လော့ခ်စနစ် (BCM)',
    subtitle: 'ကြိုး ၂ ချောင်း မီးပြန်လှန် လော့ခ်မော်တာ & နောက်ဖုံး လုံခြုံရေး အလုပ်လုပ်ပုံ သဘောတရား',
    sensorsInstalled: ['Door Ajar Switch (တံခါးပိတ်/ဟ ဆန်ဆာ)', 'Door Lock Detection Switch (လော့ခ်ကျ/ပွင့် ဆန်ဆာ)', 'Smart Key Proximity LF Antenna (အနီးကပ် သော့လှိုင်းစနစ်)', 'Tailgate Microswitch'],
    workingPrinciple: 'ကားတံခါး လော့ခ်ကျ/ပွင့်ခြင်း၏ အခြေခံ သဘောတရားမှာ တံခါးအတွင်းရှိ DC Lock Motor သို့ ကြိုး ၂ ချောင်းမှတစ်ဆင့် ဝင်ရောက်သော လျှပ်စစ်အား BCM (Body Control Module) က ပိုလာရီတီ (Polarity) ပြောင်းပြန် လှန်ပေးခြင်း ဖြစ်သည်။ လော့ခ်ချချိန်တွင် ကြိုး A: +12V / ကြိုး B: 0V (၀.၅ စက္ကန့် ပေး၍ မော်တာ ရှေ့သို့လည်ကာ လော့ခ်ချသည်)။ ဖွင့်ချိန်တွင် BCM က ကြိုး A: 0V / ကြိုး B: +12V သို့ ပြောင်းပြန် လှန်ပေး၍ မော်တာ နောက်သို့လည်ကာ လော့ခ်ပွင့်စေသည်။ နောက်ဖုံးစနစ်တွင် ကားအမျိုးအစားအလိုက် တစ်ပြိုင်နက်ပွင့်ခြင်း၊ ခလုတ် ၂ ချက်နှိပ်မှပွင့်ခြင်း၊ သီးသန့်ခလုတ်ပါဝင်ခြင်းနှင့် ခလုတ်မပါဘဲ အပြင်လက်ကိုင်ရာဘာပြားနှိပ်မှ ပွင့်ခြင်းဟူ၍ ကွဲပြားသည်။',
    internalComponents: [
      'Bi-directional DC Lock Actuator (ကြိုး ၂ ချောင်း မီးပြန်လှန် မော်တာ)',
      'BCM (Body Control Module) လော့ခ်ကွန်ပျူတာ / Relays',
      'Door Lock Detection Switch (လော့ခ်ကျ/ပွင့် စစ်ဆေးခလုတ်)',
      'Tailgate Pop Release Solenoid / Electronic Latch',
      'Smart Key Proximity Oscillator & Outside Handle Touch Sensor'
    ],
    testingAndInspection: [
      {
        testName: 'လော့ခ်မော်တာ တိုက်ရိုက် ၁၂ ဗို့ စမ်းသပ်ခြင်း',
        procedure: 'တံခါးလော့ခ်မော်တာ ပင် ၂ ပင်သို့ +12V နှင့် Ground ကို ခေတ္တ ထိပေးပြီးနောက် မီးကြိုး ပြောင်းပြန် လှန်စမ်းပါ။',
        standardValue: 'ပထမတစ်ကြိမ်တွင် လော့ခ်ကျသွားရမည်ဖြစ်ပြီး၊ မီးကြိုးလှန်လိုက်ပါက လော့ခ်ပွင့်သွားရမည်။'
      },
      {
        testName: 'BCM မှ ထွက်သော ၀.၅ စက္ကန့် Pulse စစ်ဆေးခြင်း',
        procedure: 'သော့ရီမုတ် ခလုတ်နှိပ်စဉ် မော်တာပလပ်တွင် Test Light သို့မဟုတ် မီတာဖြင့် ထောက်ကြည့်ပါ။',
        standardValue: 'ခလုတ်နှိပ်လိုက်တိုင်း ၀.၅ စက္ကန့်ကြာ +12V မီးတစ်ချက် ဖြတ်ခနဲ လာရမည်။'
      }
    ],
    commonProblems: [
      {
        problem: 'တံခါးတစ်ပေါက်တည်း လော့ခ်မကျခြင်း သို့မဟုတ် မပွင့်ခြင်း',
        cause: 'ထိုတံခါးအတွင်းရှိ DC မော်တာလေး ကာဗွန်ကုန်ခြင်း သို့မဟုတ် ဝါယာကြိုး တံခါးကွေးနေရာတွင် ပြတ်တောက်ခြင်း။',
        fix: 'တံခါးအတွင်းကတ်ပြားဖြုတ်၍ Actuator မော်တာအသစ် လဲလှယ်ပါ။'
      },
      {
        problem: 'နောက်ဖုံးဖွင့်မရခြင်း သို့မဟုတ် ခလုတ်ရှာမတွေ့ခြင်း',
        cause: 'လုံခြုံရေးစနစ်အရ ဒရိုင်ဘာတံခါးတစ်ခုတည်း ပွင့်နေပြီး ယာဉ်မောင်းဦးစားပေးစနစ် (Two-Stage Unlock) ဖြစ်နေခြင်း သို့မဟုတ် အပြင်ခလုတ် ရာဘာပြား ပျက်စီးနေခြင်း။',
        fix: 'ရီမုတ်ကို ၂ ကြိမ် ဆက်တိုက်နှိပ်ပါ သို့မဟုတ် နောက်ဖုံး အပြင်ဘက် လက်ကိုင်အောက် ရာဘာခလုတ် စစ်ဆေးပါ။'
      }
    ],
    wiringDiagramBrief: 'BCM ➔ Lock Relay (+12V/GND) ➔ All Door Motors ➔ Unlock Relay (Polarity Reversal GND/+12V) ➔ Tailgate Actuator',
    proTips: 'တံခါးလော့ခ်ချမရဘဲ "တတီတီ" မြည်နေပါက တံခါး ၄ ပေါက်၊ အင်ဂျင်ဖုံး သို့မဟုတ် နောက်ဖုံး တစ်ခုခု ဟနေခြင်း သို့မဟုတ် ကားထဲတွင် စမတ်ကီးသော့ အပိုတစ်လုံး ကျန်နေခဲ့ခြင်းကြောင့် BCM က လော့ခ်ချခွင့် မပေးခြင်း ဖြစ်သည်။'
  }
];
