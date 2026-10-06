// ============================================================================
// ★ GREATSTAR.Z.N.W ★ AUTOMOTIVE AIR CONDITIONING (CAR A/C) MASTER DATA
// ကားအဲကွန်း စနစ် အလုံးစုံ လမ်းညွှန် — Compressor, Manifold Gauge, Sensors & ECU Control
// ============================================================================

export interface AcGaugeScenario {
  id: string;
  titleMy: string;
  titleEn: string;
  lowPressurePsi: number;
  highPressurePsi: number;
  lowNormalRange: string;
  highNormalRange: string;
  coolingStatus: 'အေးစက်သည်' | 'မအေးပါ' | 'နည်းနည်းသာအေး' | 'ရေခဲလိုက်သည်' | 'အပူထွက်သည်';
  severity: 'normal' | 'warning' | 'danger' | 'critical';
  symptomSummary: string;
  causes: string[];
  diagnosisSteps: string[];
  repairSolution: string;
  mechanicNote: string;
}

export interface CompressorTestStep {
  id: string;
  testNameMy: string;
  testNameEn: string;
  type: 'gauge' | 'electrical' | 'mechanical' | 'chemical';
  procedure: string[];
  expectedGood: string;
  faultSign: string;
  causeAnalysis: string;
  proTip: string;
}

export interface AcSensorData {
  id: string;
  nameMy: string;
  nameEn: string;
  wiringCount: number;
  location: string;
  operatingPrinciple: string;
  normalValues: string;
  failureSymptoms: string[];
  testingProcedure: string[];
  ecuSignalLogic: string;
}

export interface AcGasComparison {
  refrigerant: string;
  commonUsage: string;
  boilingPoint: string;
  operatingPressureLow: string;
  operatingPressureHigh: string;
  oilCompatibility: string;
  canUseInCar: boolean;
  whyCarOrHome: string;
  safetyHazard: string;
}

export interface AmbientPressureChartItem {
  ambientTempC: number;
  ambientTempF: number;
  lowSidePsiRange: string;
  highSidePsiRange: string;
  recommendedVentTempC: string;
  weatherMyanmar: string;
}

export interface CarAcOilData {
  oilType: string;
  viscosity: string;
  compatibleRefrigerant: string;
  application: string;
  hybirdEvSafe: boolean;
  warningNote: string;
}

export interface RefrigerationCycleStep {
  stepNumber: number;
  id: string;
  componentNameMy: string;
  componentNameEn: string;
  location: string;
  inputState: string;
  outputState: string;
  pressureRange: string;
  tempRange: string;
  side: 'high_side' | 'low_side';
  stateType: 'vapor' | 'liquid' | 'mixture';
  whatHappens: string;
  thermodynamicPrinciple: string;
  teachingAnalogy: string;
  touchCheck: string;
}

// ----------------------------------------------------------------------------
// ၀။ အဲကွန်း သံသရာလည်ပတ်ပုံ မဟာသင်တန်းခန်းမ (REFRIGERATION CYCLE MASTERCLASS)
// ----------------------------------------------------------------------------
export const REFRIGERATION_CYCLE_STEPS: RefrigerationCycleStep[] = [
  {
    stepNumber: 1,
    id: 'step_compressor',
    componentNameMy: '၁။ Compressor (ဖိသိပ်စက် - စနစ်၏ နှလုံးသား)',
    componentNameEn: 'Compressor (Compression: Low Vapor -> High Superheated Vapor)',
    location: 'အင်ဂျင်ဘေးတွင် တပ်ဆင်ထားပြီး ဘယ်လ်ကြိုး (Fan Belt) ဖြင့် လည်ပတ်သည်။',
    inputState: 'အနိမ့်ဖိအား အငွေ့ (Low-Pressure Cold Vapor ~0°C, ~30 PSI)',
    outputState: 'အလွန်မြင့်မားသော ဖိအားနှင့် အပူရှိသည့် အငွေ့ (High-Pressure Superheated Vapor ~80°C, ~200 PSI)',
    pressureRange: '30 PSI မှ 200 PSI သို့ ရုတ်တရက် ဖိသိပ်မြှင့်တင်သည်',
    tempRange: '0°C မှ 75°C~90°C အထိ အပူချိန် အဆမတန် မြင့်တက်သွားသည်',
    side: 'high_side',
    stateType: 'vapor',
    whatHappens: 'ကွန်ပရက်ဆာ၏ Piston/Swash-plate များက ကွိုင်အေးမှ ပြန်လာသော အအေးဓာတ်ငွေ့များကို အားပြင်းစွာ ဖိသိပ်ညှပ်ထုတ်လိုက်သည်။ မော်လီကျူးများ အချင်းချင်း ပူးကပ်သွားသဖြင့် ဖိအားရော အပူချိန်ပါ အလွန်မြင့်တက်သွားသော ဓာတ်ငွေ့ပူကြီးအဖြစ် Discharge ပိုက်သေးဆီသို့ မှုတ်ထုတ်သည်။',
    thermodynamicPrinciple: 'Boyle & Charles Law: ဓာတ်ငွေ့ထုထည်ကို အတင်းဖိကျုံ့လိုက်ပါက ဖိအားနှင့် အပူချိန်သည် တစ်ပြိုင်နက်တည်း ထိုးတက်သွားသည်။',
    teachingAnalogy: 'စက်ဘီးလေထိုးတံကို လက်ဖြင့် အမြန်ဖိထိုးကြည့်ပါက လေထိုးတံ အောက်ခြေသည် အလွန် ပူလာသည်ကို သတိပြုမိပါလိမ့်မည်။ လေကို ဖိသိပ်လိုက်လျှင် အပူထွက်လာသော သဘောတရား အတိအကျပင် ဖြစ်သည်။',
    touchCheck: 'စက်နှိုးပြီး အဲကွန်းဖွင့်ချိန်တွင် ကွန်ပရက်ဆာမှ Condenser သို့ သွားသော ပိုက်လိုင်းသည် လက်ဖြင့် ကြာကြာ မကိုင်နိုင်လောက်အောင် ပူနေရမည် (Hot High-Pressure Line)။'
  },
  {
    stepNumber: 2,
    id: 'step_condenser',
    componentNameMy: '၂။ Condenser (အပူစွန့်ထုတ် ငွေ့ရည်ဖွဲ့ကွိုင်)',
    componentNameEn: 'Condenser (Condensation: High Vapor -> High Liquid)',
    location: 'ကားရှေ့ အအေးခံ ရေတိုင်ကီ (Radiator) ရှေ့ဆုံးတွင် တပ်ဆင်ထားသည်။',
    inputState: 'အလွန်ပူသော အမြင့်ဖိအား ဓာတ်ငွေ့ (High-Pressure Hot Vapor ~80°C, ~200 PSI)',
    outputState: 'နွေးနွေးဖိအားမြင့် အရည်စစ်စစ် (High-Pressure Warm Liquid ~45°C~55°C, ~190 PSI)',
    pressureRange: '180 PSI မှ 210 PSI (ဖိအား အမြင့်အတိုင်း ဆက်ရှိနေဆဲ)',
    tempRange: '80°C မှ 45°C~55°C သို့ အပူချိန် အေးမြသွားသည်',
    side: 'high_side',
    stateType: 'liquid',
    whatHappens: 'ကွန်ပရက်ဆာမှ မှုတ်ထုတ်လိုက်သော ဓာတ်ငွေ့ပူများသည် Condenser ကွိုင်အကွက်များကြား ဖြတ်သန်းချိန်တွင် ရှေ့လေတိုက်ခတ်မှုနှင့် Condenser Fan ပန်ကာတို့က ၎င်းအပူများကို ပြင်ပလေထုထဲသို့ မှုတ်ထုတ်စွန့်ပစ်လိုက်သည်။ အပူစွန့်ထုတ်လိုက်ရသောအခါ ဓာတ်ငွေ့သည် "ငွေ့ရည်ဖွဲ့" (Condense) ပြီး "ဖိအားမြင့် အရည်စစ်စစ်" အဖြစ် အသွင်ပြောင်းသွားသည်။',
    thermodynamicPrinciple: 'Latent Heat of Condensation: ဓာတ်ငွေ့မှ အရည်အဖြစ် အဆင့်ပြောင်းလဲချိန်တွင် အောင်းပူများကို ပြင်ပသို့ စွန့်ထုတ်ရသည်။',
    teachingAnalogy: 'ရေနွေးဆူပြီး အငွေ့ပျံနေသော အိုးအဖုံးကို အပေါ်မှ လေအေးတိုက်ပေးလိုက်ပါက အဖုံးအောက်တွင် ရေစက်ရေပေါက်များ စုပြုံကျလာသကဲ့သို့ ဓာတ်ငွေ့ပူသည် အပူစွန့်လိုက်သည်နှင့် အရည်ဖြစ်သွားခြင်း ဖြစ်သည်။',
    touchCheck: 'Condenser ၏ အပေါ်အဝင်ပိုက်သည် အရမ်းပူနေပြီး၊ အောက်အထွက်ပိုက်သည် နွေးနွေးလောက်သာ ဖြစ်နေရမည် (အပူစွန့်ထုတ်မှု အောင်မြင်သော လက္ခဏာ)။'
  },
  {
    stepNumber: 3,
    id: 'step_expansion',
    componentNameMy: '၃။ Expansion Valve / TXV (ဖိအားချ အဆို့ရှင် - အအေးပေါက်ကွဲရာ ဗဟိုချက်)',
    componentNameEn: 'Expansion Valve (Expansion: High Liquid -> Low Freezing Mist)',
    location: 'ဒက်ရှ်ဘုတ်အောက် ကွိုင်အေး (Evaporator) ၏ အဝင်ပေါက်ဝတွင် တပ်ဆင်ထားသည်။',
    inputState: 'ဖိအားမြင့် အရည် (High-Pressure Liquid ~190 PSI, ~45°C)',
    outputState: 'ဖိအားနိမ့် အေးခဲနေသော အရည်မှုန်/အငွေ့နှင်း (Low-Pressure Atomized Cold Mixture ~30 PSI, -2°C~2°C)',
    pressureRange: '190 PSI မှ 30 PSI သို့ ဒုံးပျံလို ထိုးချလိုက်သည်',
    tempRange: '45°C မှ -2°C ~ 2°C သို့ ချက်ချင်း အေးခဲသွားသည်',
    side: 'low_side',
    stateType: 'mixture',
    whatHappens: 'ပိုက်သေးလေးထဲမှ တွန်းလာသော ဖိအားမြင့် အရည်များကို အလွန်သေးငယ်သော အပေါက်ကျဉ်း (Tiny Orifice) မှတစ်ဆင့် ကွိုင်အေး အခန်းကျယ်ထဲသို့ ဖျန်းထုတ် (Spray) လိုက်သည်။ ဖိအား ရုတ်တရက် သုညနီးပါး ထိုးကျသွားသောအခါ ဂတ်စ်သည် ရုတ်တရက် အပူချိန် အေးခဲသွားပြီး ရေခဲမှတ်နီးပါး အေးစက်သော နှင်းမှုန်အငွေ့ပျံအရည် (Cold Atomized Spray) အဖြစ် ကွိုင်အေးထဲသို့ ပြန့်ကျဲရောက်ရှိသွားသည်။',
    thermodynamicPrinciple: 'Joule-Thomson Effect: ဖိအားမြင့် အရည်/ဓာတ်ငွေ့ကို အပေါက်ကျဉ်းမှတစ်ဆင့် ဖိအားနိမ့်နေရာသို့ ရုတ်တရက် ပန်းထွက်စေပါက အပူချိန် အဆမတန် ထိုးကျအေးခဲသွားသည်။',
    teachingAnalogy: 'အမွှေးနံ့သာ စပရေးဘူး သို့မဟုတ် ခြင်ဆေးဘူးကို နှိပ်ပြီး ခလုတ်ဝနားကို စမ်းကြည့်ပါက အလွန် အေးခဲနေသည်ကို တွေ့ရပါမည်။ ဘူးထဲက ဖိအားများသည့်အရည် အပြင်က ဖိအားနည်းသည့်ဆီ ပန်းထွက်ချိန်တွင် အေးသွားသော သဘောတရား ဖြစ်သည်။',
    touchCheck: 'Expansion Valve ၏ အဝင်ပိုက်သည် နွေးနေပြီး၊ Valve ကို ကျော်လွန်သွားသည်နှင့် အထွက်ပိုက်သည် ချက်ချင်း အေးစက်ခဲသွားပြီး ချွေးပြန်နေရမည်။'
  },
  {
    stepNumber: 4,
    id: 'step_evaporator',
    componentNameMy: '၄။ Evaporator (ကွိုင်အေး - ကားအတွင်းခန်း အပူစုပ်ကွိုင်)',
    componentNameEn: 'Evaporator (Evaporation: Low Cold Liquid -> Low Cool Vapor)',
    location: 'ကားအတွင်းခန်း ဒက်ရှ်ဘုတ်ခုံကြီး အောက်ခြေအတွင်းပိုင်းတွင် တပ်ဆင်ထားသည်။',
    inputState: 'ဖိအားနိမ့် ရေခဲမှတ်နီးပါး အရည်မှုန် (Cold Low-Pressure Liquid ~30 PSI, ~0°C)',
    outputState: 'အပူစုပ်ယူပြီးသော အနိမ့်ဖိအား ဓာတ်ငွေ့ (Low-Pressure Cool Vapor ~30 PSI, ~4°C)',
    pressureRange: '25 PSI မှ 35 PSI (အနိမ့်ဖိအား Low Side အတိုင်း ထိန်းထားသည်)',
    tempRange: '0°C မှ 4°C ဝန်းကျင် (ကားထဲက အပူကို စုပ်ယူလိုက်သည်)',
    side: 'low_side',
    stateType: 'vapor',
    whatHappens: 'ကွိုင်အေး အကွက်များကြားသို့ Blower Fan (လေမှုတ်ပန်ကာ) က ကားအတွင်းခန်းထဲရှိ ပူနွေးသောလေ (25°C~35°C) ကို မှုတ်သွင်းဖြတ်သန်းစေသည်။ ထိုအခါ ကွိုင်အေးထဲရှိ အေးခဲနေသော ဂတ်စ်အရည်မှုန်များသည် လေထုထဲမှ အပူကို "စုပ်ယူ" ပြီး ဆူပွက်ကာ (Boil) အငွေ့ (Vapor) အဖြစ် လုံးဝ ပြန်ပြောင်းသွားသည်။ အပူစုပ်ယူခံလိုက်ရသော လေသည် ၄°C မှ ၈°C အတွင်း အေးစက်သွားပြီး ဒက်ရှ်ဘုတ် လေထွက်ပေါက်မှတစ်ဆင့် ခရီးသည်များဆီသို့ အေးမြစွာ ထွက်လာသည်။',
    thermodynamicPrinciple: 'Latent Heat of Vaporization: အရည်မှ ဓာတ်ငွေ့အဖြစ် ဆူပွက်ပြောင်းလဲရန် ပတ်ဝန်းကျင်မှ အပူကို အတင်းစုပ်ယူရသည်။',
    teachingAnalogy: 'လက်ဖမိုးပေါ်သို့ အယ်လ်ကိုဟော သို့မဟုတ် စပရေး အနည်းငယ် ဆွတ်လိုက်ပါက အရည် အငွေ့ပျံသွားချိန်တွင် လက်ဖမိုးလေး စိမ့်ခနဲ အေးသွားသကဲ့သို့ ဂတ်စ်က အငွေ့ပျံရင်း ကားထဲက အပူကို ယူဆောင်သွားခြင်း ဖြစ်သည်။',
    touchCheck: 'ကွိုင်အေးမှ ထွက်လာသော ပိုက်မည်းကြီး (Suction Line) သည် အင်ဂျင်ခန်းထဲတွင် ရေငွေ့ချွေးများ တစီစီ ပြန်နေပြီး လက်ဖြင့်ကိုင်ပါက ရေခဲရေပုလင်း ကိုင်ထားသကဲ့သို့ အလွန် အေးစက်နေရမည်။'
  }
];


// ----------------------------------------------------------------------------
// ၁။ ပေါင်ဂိတ်ဖတ်နည်း & ရောဂါရှာဖွေမှု ဇယား (MANIFOLD GAUGE DIAGNOSTICS)
// ----------------------------------------------------------------------------
export const AC_GAUGE_SCENARIOS: AcGaugeScenario[] = [
  {
    id: 'normal_operation',
    titleMy: '၁။ စနစ်ပုံမှန် ကောင်းမွန်စွာ အလုပ်လုပ်နေခြင်း (Normal System)',
    titleEn: 'Normal Operating Pressures (R134a)',
    lowPressurePsi: 30,
    highPressurePsi: 210,
    lowNormalRange: '25 ~ 35 PSI',
    highNormalRange: '175 ~ 230 PSI (ပြင်ပအပူချိန်ပေါ်မူတည်)',
    coolingStatus: 'အေးစက်သည်',
    severity: 'normal',
    symptomSummary: 'လေထွက်ပေါက်မှ ၄°C မှ ၈°C အတွင်း အလွန်အေးစက်သော လေထွက်ပြီး ကွန်ပရက်ဆာနှင့် ပန်ကာများ ပုံမှန် လည်ပတ်နေသည်။',
    causes: ['စနစ်အတွင်း ဂတ်စ်ပမာဏ တိကျစွာ ပြည့်မီခြင်း', 'ကွန်ပရက်ဆာ ဖိအားကောင်းမွန်ခြင်း', 'Condenser အပူစွန့်ထုတ်မှု ကောင်းမွန်ခြင်း'],
    diagnosisSteps: [
      'Low Side (အပြာပိုက်) အနိမ့်ဖိအားသည် 25 - 35 PSI ဝန်းကျင်တွင် တည်ငြိမ်နေမည်။',
      'High Side (အနီပိုက်) အမြင့်ဖိအားသည် 175 - 230 PSI ဝန်းကျင်တွင် ရှိမည်။',
      'Low Side ပိုက်မည်းကြီး (Suction Line) သည် ချွေးပြန်အေးစက်နေပြီး High Side ပိုက်သေး (Liquid Line) သည် နွေးနွေး/ပူပူ ဖြစ်နေရမည်။'
    ],
    repairSolution: 'ဘာမှ ပြင်ဆင်ရန် မလိုပါ။ လေစစ် (Cabin Air Filter) သန့်ရှင်းမှုသာ စစ်ဆေးပေးပါ။',
    mechanicNote: 'အင်ဂျင်ကို 1500 RPM တွင်ထားပြီး အဲကွန်းကို အအေးဆုံး (MAX A/C)၊ လေအား အလယ်အလတ်တွင် ထား၍ တိုင်းတာရပါမည်။'
  },
  {
    id: 'bad_compressor',
    titleMy: '၂။ Compressor အားမရှိခြင်း / ပျက်စီးနေခြင်း (Weak or Bad Compressor)',
    titleEn: 'Worn Compressor / Internal Valve Leak',
    lowPressurePsi: 65,
    highPressurePsi: 110,
    lowNormalRange: '25 ~ 35 PSI (အခု 50 ~ 75 အထိ မြင့်တက်နေ)',
    highNormalRange: '175 ~ 230 PSI (အခု 90 ~ 130 သာရှိပြီး မတက်နိုင်)',
    coolingStatus: 'မအေးပါ',
    severity: 'critical',
    symptomSummary: 'အဲကွန်း လုံးဝမအေးပါ။ ကွန်ပရက်ဆာ ကလပ် ကပ်လည်နေသော်လည်း ဖိအား ကွာခြားချက် မရှိဘဲ ပေါင်ဂိတ်နှစ်ဖက် နီးကပ်နေသည်။',
    causes: [
      'Compressor အတွင်းရှိ Piston Ring များ ပွန်းပဲ့အားလျော့သွားခြင်း',
      'Reed Valve (ဖိအားထိန်း အဆို့ရှင်ပြား) ကျိုးပဲ့ခြင်း သို့မဟုတ် အထိုင်မလုံဘဲ မီးပြန်ကန်ခြင်း',
      'ကလပ်မပါသော ကွန်ပရက်ဆာဖြစ်ပါက Control Solenoid Valve မပွင့်ခြင်း သို့မဟုတ် ပျက်စီးခြင်း'
    ],
    diagnosisSteps: [
      'အင်ဂျင် လီဗာကို 2000 RPM အထိ တင်နင်းကြည့်ပါ — ပုံမှန် ကွန်ပရက်ဆာဆိုလျှင် Low Side ဖိအား ၂၅ ဘက်သို့ ချက်ချင်း ကျဆင်းသွားရမည်။',
      'အကယ်၍ လီဗာနင်းသော်လည်း Low Side ဖိအား မကျဆင်းဘဲ ၅၀ မှ ၆၅ PSI တွင် တန့်နေပါက ကွန်ပရက်ဆာ၏ စုပ်အား (Suction) လုံးဝ မရှိတော့ကြောင်း သေချာသည်။',
      'High Side ဖိအားသည်လည်း ၁၀၀ မှ ၁၂၀ PSI ထက် ပိုမတက်နိုင်ဘဲ မှုတ်အား (Discharge) မရှိတော့ပါ။'
    ],
    repairSolution: 'Compressor အသစ် လဲလှယ်ရပါမည်။ ကွန်ပရက်ဆာ အဟောင်းထဲမှ ဆီကို ဖောက်ထုတ်ကြည့်ပါ — အမည်းရောင် သို့မဟုတ် သံမှုန့်များ ပါလာပါက Condenser, Expansion Valve နှင့် ပိုက်လိုင်းတစ်ခုလုံးကို Flush လုပ်၍ ဆေးကြောရပါမည်။',
    mechanicNote: 'ဝပ်ရှော့သမားများ အများဆုံး အလွဲဖြစ်တတ်သည့် ပြဿနာဖြစ်သည် — ဂတ်စ်မရှိဟု ထင်ပြီး ဂတ်စ်ထပ်ဖြည့်ပါက Low Side ပိုတက်လာပြီး လုံးဝ မအေးတော့ဘဲ ကွန်ပရက်ဆာ ပိုဆိုးသွားတတ်သည်။'
  },
  {
    id: 'undercharged_leak',
    titleMy: '၃။ ဂတ်စ်မရှိခြင်း / လျော့နည်းယိုစိမ့်နေခြင်း (Low Gas / Leakage)',
    titleEn: 'Low Refrigerant Charge / System Leak',
    lowPressurePsi: 10,
    highPressurePsi: 80,
    lowNormalRange: '25 ~ 35 PSI (အခု 5 ~ 15 PSI သာရှိ)',
    highNormalRange: '175 ~ 230 PSI (အခု 60 ~ 100 PSI သာရှိ)',
    coolingStatus: 'နည်းနည်းသာအေး',
    severity: 'warning',
    symptomSummary: 'အဲကွန်းက သိပ်မအေးဘဲ မနက်ခင်းနှင့် ညနေခင်းလောက်သာ အေးပြီး နေ့လယ် နေပူထဲတွင် လုံးဝ မအေးတော့ပါ။',
    causes: [
      'O-ring ကွင်းများ အိုဟောင်း မာကျောပြီး ယိုစိမ့်ခြင်း',
      'Condenser အကွက်တွင် ကျောက်ခဲမှန်၍ အပေါက်သေးသေးလေး ဖြစ်နေခြင်း',
      'Evaporator (ကွိုင်အေး) ဆွေးမြည့်၍ ဓာတ်ငွေ့ စိမ့်ထွက်ခြင်း',
      'Compressor Shaft Seal (လည်တံဆီဖရိန်) မှ ယိုစိမ့်ခြင်း'
    ],
    diagnosisSteps: [
      'Low Side ရော High Side ရော နှစ်ဖက်စလုံး ပုံမှန်ထက် များစွာ နိမ့်ကျနေမည်။',
      'ကွန်ပရက်ဆာ ကလပ်သည် မကြာခဏ ကပ်လိုက် ပြုတ်လိုက် (Short Cycling) ခဏခဏ ဖြစ်နေတတ်သည် (Pressure switch က ဖိအားမလုံလောက်၍ ဖြတ်ချခြင်း)။',
      'Sight Glass (ဂတ်စ်ကြည့်မှန်ပြတင်းပေါက်) ရှိပါက အမြှုပ်များ တစီစီ ထနေသည်ကို တွေ့ရမည်။'
    ],
    repairSolution: 'ယိုစိမ့်သည့်နေရာကို UV မီး သို့မဟုတ် ဆပ်ပြာမြှုပ်ဖြင့် ရှာဖွေ ပြင်ဆင်ပါ။ Vacuum မိနစ် ၃၀ ပြည့်အောင် ဆွဲပြီးမှ ဂတ်စ်နှင့် ဆီ အသစ် ပြန်ဖြည့်ပါ။',
    mechanicNote: 'ယိုစိမ့်မှု မရှာဘဲ ဂတ်စ်ချည်း ထပ်ထပ်ဖြည့်ပါက ရက်အနည်းငယ်အတွင်း ပြန်ပျောက်သွားမည်ဖြစ်ပြီး ပိုက်လိုင်းထဲ ဆီပါ လိုက်ထွက်သွားသဖြင့် ကွန်ပရက်ဆာ ကပ်သွားနိုင်သည်။'
  },
  {
    id: 'overcharged',
    titleMy: '၄။ ဂတ်စ် အထည့်လွန်နေခြင်း (Overcharged System)',
    titleEn: 'Too Much Refrigerant / High Head Pressure',
    lowPressurePsi: 50,
    highPressurePsi: 310,
    lowNormalRange: '25 ~ 35 PSI (အခု 45 ~ 55 PSI အထိ တက်နေ)',
    highNormalRange: '175 ~ 230 PSI (အခု 280 ~ 350 PSI အထိ အရမ်းမြင့်နေ)',
    coolingStatus: 'နည်းနည်းသာအေး',
    severity: 'danger',
    symptomSummary: 'အင်ဂျင် ဝန်အရမ်းလေးပြီး အသံကြမ်းလာသည်။ အဲကွန်းဖွင့်လိုက်ပါက ကားစလိုး ကျသွားပြီး မအေးတော့ပါ။',
    causes: [
      'ဂရမ်ချိန်ခွင် မသုံးဘဲ ပေါင်ဂိတ်ကြည့်ကာ မျက်မှန်းဖြင့် ဂတ်စ် အလွန်အကျွံ ဖြည့်သွင်းမိခြင်း',
      'Condenser မျက်နှာပြင်တွင် အရည်အဖြစ် ပြောင်းလဲရန် နေရာမကျန်တော့ဘဲ ဓာတ်ငွေ့ဖိအား တက်လာခြင်း'
    ],
    diagnosisSteps: [
      'Low Side ရော High Side ရော နှစ်ဖက်စလုံး ပုံမှန်ထက် အလွန် မြင့်တက်နေမည်။',
      'High Side ဖိအား 300 PSI ကျော်သွားပါက Pressure Sensor က အန္တရာယ်မှ ကာကွယ်ရန် ကွန်ပရက်ဆာကို ချက်ချင်း ဖြတ်ချမည်။',
      'ကွန်ပရက်ဆာသည် အလွန် ပူပြင်းလာမည်။'
    ],
    repairSolution: 'ဂတ်စ်ပြန်ထုတ်စက် (Recovery Machine) ဖြင့် ဂတ်စ်ကို စံချိန်မီ ဂရမ်ပမာဏ ရောက်သည်အထိ ပြန်လည် လျှော့ချပါ။',
    mechanicNote: 'ဂတ်စ်များများထည့်လေ ပိုအေးလေဟု ထင်မှတ်ခြင်းသည် လုံးဝ အမှားကြီးဖြစ်သည်! ဂတ်စ်များပါက အပူစွန့်ထုတ်မှု မလုပ်နိုင်တော့ဘဲ ပိုက်ပေါက်ခြင်း၊ ကွန်ပရက်ဆာ ပျက်ခြင်း ဖြစ်စေသည်။'
  },
  {
    id: 'txv_blocked',
    titleMy: '၅။ Expansion Valve (TXV) ပိတ်နေခြင်း / ရေခဲပိတ်ခြင်း',
    titleEn: 'Expansion Valve Stuck Closed / Moisture Freeze',
    lowPressurePsi: 2,
    highPressurePsi: 150,
    lowNormalRange: '25 ~ 35 PSI (အခု 0 သို့မဟုတ် အနှုတ် Vacuum သို့ ကျနေ)',
    highNormalRange: '175 ~ 230 PSI (ပုံမှန် သို့မဟုတ် အနည်းငယ်နိမ့်)',
    coolingStatus: 'မအေးပါ',
    severity: 'danger',
    symptomSummary: 'အဲကွန်း လုံးဝမအေးပါ။ Expansion Valve သို့မဟုတ် ပိုက်လိုင်း အဆက်နေရာများတွင် နှင်းဖြူ ရေခဲများ ကပ်နေသည်ကို တွေ့ရမည်။',
    causes: [
      'စနစ်အတွင်း အစိုဓာတ် (Moisture) ပါဝင်ပြီး Expansion Valve အပေါက်သေးလေးတွင် ရေခဲခဲ၍ ပိတ်သွားခြင်း',
      'ကွန်ပရက်ဆာမှ သံမှုန့်နှင့် အညစ်အကြေးများ Valve ဇကာထဲတွင် ပိတ်ဆို့ခြင်း',
      'Expansion Valve ၏ Sensing Bulb ဓာတ်ငွေ့ ပေါက်ထွက်ပြီး အဆို့ရှင် လုံးဝ မပွင့်တော့ခြင်း'
    ],
    diagnosisSteps: [
      'Low Side ဖိအားသည် သုည (0 PSI) အောက်သို့ ကျဆင်းပြီး Vacuum (အနှုတ်ဖိအား) ဘက်သို့ပင် ရောက်သွားမည်။',
      'High Side ဖိအားသည် ပုံမှန်ထက် နည်းနည်းနိမ့် သို့မဟုတ် ပုံမှန်ဖြစ်နေမည်။',
      'အဲကွန်းခဏပိတ်ထားပြီး ပြန်ဖွင့်ပါက ပြန်အေးလာပြီး ၅ မိနစ်ခန့်ကြာလျှင် ပြန်မအေးတော့ပါက (ရေခဲ အရည်ပျော်ပြီး ပြန်ခဲခြင်းဖြစ်သဖြင့် အစိုဓာတ်ခိုနေကြောင်း သေချာသည်)။'
    ],
    repairSolution: 'Expansion Valve အသစ်လဲပါ။ Receiver Drier (သို့မဟုတ် Condenser ထဲရှိ Filter ပိုးအိမ်) ကို မဖြစ်မနေ အသစ်လဲရပါမည်။ Vacuum ကို အနည်းဆုံး ၄၅ မိနစ် စုပ်ထုတ်၍ အစိုဓာတ် အကုန်ခန်းခြောက်စေရမည်။',
    mechanicNote: 'ပိုက်လိုင်းပြင်ဆင်ပြီးတိုင်း လေမစုပ်ဘဲ (Vacuum မချဘဲ) ဂတ်စ်ထည့်လျှင် စနစ်ထဲရှိ လေထုစိုထိုင်းဆကြောင့် ဤပြဿနာ ၁၀၀% ဖြစ်ပွားသည်။'
  },
  {
    id: 'condenser_fan_dead',
    titleMy: '၆။ Condenser ပန်ကာမလည်ခြင်း / အကွက်ပိတ်ခြင်း (Condenser Overheating)',
    titleEn: 'Condenser Fan Failure / Blocked Airflow',
    lowPressurePsi: 45,
    highPressurePsi: 360,
    lowNormalRange: '25 ~ 35 PSI (အခု 40 ~ 55 PSI သို့ တက်နေ)',
    highNormalRange: '175 ~ 230 PSI (အခု 330 ~ 380 PSI အလွန် အန္တရာယ်ကြီးမား)',
    coolingStatus: 'အပူထွက်သည်',
    severity: 'danger',
    symptomSummary: 'ကားရပ်ထားချိန်တွင် အဲကွန်း မအေးဘဲ လေပူထွက်လာပြီး ကားလမ်းမပေါ် အရှိန်ဖြင့် မောင်းသွားပါက ချက်ချင်း ပြန်အေးလာသည်။',
    causes: [
      'Condenser ရှေ့ရှိ အအေးပေး ပန်ကာ (Condenser Fan Motor) မလည်ခြင်း သို့မဟုတ် အလှည့်နှေးခြင်း',
      'Condenser အကွက်ကြားတွင် ရွှံ့၊ ဖုန်၊ အမှိုက်၊ သစ်ရွက်များ ပိတ်ဆို့နေခြင်း',
      'ပန်ကာ Relay သို့မဟုတ် Fuse ပြတ်နေခြင်း'
    ],
    diagnosisSteps: [
      'ကားရပ်ထားပြီး အဲကွန်းဖွင့်ချိန်တွင် High Side ဖိအားသည် ဒုံးပျံလို 350 PSI ကျော်သို့ အရှိန်အဟုန်ဖြင့် တက်သွားမည်။',
      'ကားရှေ့ Condenser အကွက်ကို ရေပိုက်ဖြင့် ရေထိုးဖျန်းပေးကြည့်ပါ — High Side ဖိအားသည် ချက်ချင်း ၂၀၀ PSI သို့ ထိုးကျသွားပြီး ကားထဲတွင် ပြန်အေးလာပါက Condenser အပူမထွက်နိုင်ခြင်း သေချာသည်။'
    ],
    repairSolution: 'ပန်ကာမော်တာ၊ ပန်ကာ Relay နှင့် ဝါယာကြိုးများ စစ်ဆေးပြင်ဆင်ပါ။ Condenser အကွက်ကို ရေဖိအားသုံး၍ သန့်ရှင်းရေး ပြုလုပ်ပေးပါ။',
    mechanicNote: 'အထူးသဖြင့် ယာဉ်ကြောပိတ်ဆို့ချိန်တွင် ကွန်ပရက်ဆာ ပေါက်ကွဲထွက်တတ်သည့် အဓိက လက်သည်ဖြစ်သည်။'
  },
  {
    id: 'air_in_system',
    titleMy: '၇။ စနစ်အတွင်း လေနှင့် မအေးနိုင်သော ဓာတ်ငွေ့များ ခိုအောင်းနေခြင်း',
    titleEn: 'Air / Non-Condensable Gases in System',
    lowPressurePsi: 40,
    highPressurePsi: 260,
    lowNormalRange: '25 ~ 35 PSI',
    highNormalRange: '175 ~ 230 PSI',
    coolingStatus: 'နည်းနည်းသာအေး',
    severity: 'warning',
    symptomSummary: 'ဂတ်စ်အပြည့်ရှိသော်လည်း အအေးပေါက်ကွဲမှု မရှိဘဲ ပေါင်ဂိတ်လက်တံ တုန်ခါနေသည်။',
    causes: [
      'ဂတ်စ်မထည့်မီ လေစုပ်ထုတ်ခြင်း (Vacuum) မလုပ်ဘဲ ဂတ်စ်ဖြည့်သွင်းမိခြင်း',
      'အအေးလိုင်းထဲသို့ လေထုဝင်ရောက်သွားခြင်း (လေသည် အရည်အဖြစ် မပြောင်းလဲနိုင်ပါ)'
    ],
    diagnosisSteps: [
      'High Side ပေါင်ဂိတ်လက်တံသည် ငြိမ်မနေဘဲ အထက်အောက် တဖျပ်ဖျပ် တုန်ခါနေမည် (Needle Flutters)။',
      'Low Side ရော High Side ရော ပုံမှန်ထက် အနည်းငယ် မြင့်နေမည်။'
    ],
    repairSolution: 'စနစ်ထဲမှ ဂတ်စ်များကို အကုန်ထုတ်ပစ်ပါ။ Vacuum Pump ဖြင့် အနုတ် ၃၀ inHg အထိ အနည်းဆုံး မိနစ် ၃၀ ပြည့်အောင် လေစုပ်ထုတ်ပြီးမှ ဂတ်စ်အသစ် ပြန်ထည့်ပါ။',
    mechanicNote: 'ဂိတ်ကြိုးများ တပ်ဆင်ရာတွင် ပိုက်ထဲရှိ လေကို ဂတ်စ်ဖြင့် အနည်းငယ် မှုတ်ထုတ် (Purge) ပေးရန် မမေ့ပါနှင့်။'
  }
];

// ----------------------------------------------------------------------------
// ၂။ COMPRESSOR ပျက်/မကောင်း စစ်ဆေးနည်း (COMPRESSOR HEALTH & FAULT TESTING)
// ----------------------------------------------------------------------------
export const COMPRESSOR_TEST_STEPS: CompressorTestStep[] = [
  {
    id: 'gauge_rev_test',
    testNameMy: '၁။ ပေါင်ဂိတ်ကြည့်၍ အင်ဂျင်လီဗာတင် စစ်ဆေးနည်း (Dynamic Rev Test)',
    testNameEn: 'Dynamic RPM Compression Delta Test',
    type: 'gauge',
    procedure: [
      'ပေါင်ဂိတ်ကို Low Side (အပြာ) နှင့် High Side (အနီ) တွင် သေချာစွာ တပ်ဆင်ပါ။',
      'အင်ဂျင်ကို နှိုးပြီး အဲကွန်းကို အအေးဆုံးထားပါ။ စလိုး (Idle 800 RPM) တွင် ဖိအားကို မှတ်ထားပါ။',
      'အင်ဂျင်လီဗာကို 2000 RPM သို့ တင်နင်းလိုက်ပြီး ပေါင်ဂိတ်နှစ်ဖက်ကို စောင့်ကြည့်ပါ။'
    ],
    expectedGood: 'လီဗာနင်းလိုက်သည်နှင့် Low Side ဖိအားသည် ၃၅ မှ ၂၅ PSI ဘက်သို့ ချက်ချင်း ကျဆင်းသွားပြီး၊ High Side ဖိအားသည် ၁၈၀ မှ ၂၂၀ PSI ဘက်သို့ အားကောင်းစွာ မြင့်တက်လာရမည်။',
    faultSign: 'လီဗာနင်းသော်လည်း Low Side ဖိအားသည် ၅၀ ~ ၆၅ PSI တွင် တန့်နေပြီး မကျဆင်းခြင်း၊ High Side ဖိအားလည်း ၁၂၀ PSI ထက် မတက်နိုင်ခြင်း။',
    causeAnalysis: 'ကွန်ပရက်ဆာ၏ Piston/Vane များ ချောင်နေခြင်း သို့မဟုတ် Reed Valve ဖိအားထိန်းပြားများ ပွင့်လျက်သား မလုံတော့ခြင်း ဖြစ်သည်။',
    proTip: 'ဤနည်းသည် ကွန်ပရက်ဆာ မဖြုတ်ဘဲ အကောင်း/အဆိုးကို ၁ မိနစ်အတွင်း တိကျစွာ ခွဲခြားနိုင်သည့် အကောင်းဆုံးနည်း ဖြစ်သည်။'
  },
  {
    id: 'hand_turn_test',
    testNameMy: '၂။ လက်ဖြင့် လှည့်၍ စုပ်အား/မှုတ်အား စစ်ဆေးနည်း (Bench Hand-Turn Test)',
    testNameEn: 'Manual Shaft Rotation & Port Suction Test',
    type: 'mechanical',
    procedure: [
      'ကွန်ပရက်ဆာကို ကားပေါ်မှ ဖြုတ်ချပြီး စားပွဲပေါ်တင်ပါ။',
      'Suction Port (အပေါက်ကြီး - အဝင်) နှင့် Discharge Port (အပေါက်သေး - အထွက်) တို့ကို သန့်ရှင်းအောင် သုတ်ပါ။',
      'လက်မဖြင့် Suction Port အပေါက်ကြီးကို ပိတ်ထားပြီး၊ ကျန်လက်တစ်ဖက်ဖြင့် ကွန်ပရက်ဆာ လည်တံ (Shaft / Center Nut) ကို နာရီလက်တံအတိုင်း လှည့်ပေးပါ။'
    ],
    expectedGood: 'လက်မကို အတွင်းသို့ အားပြင်းစွာ စုပ်ယူထားသည့် ခံစားချက် (Strong Vacuum) ရရှိရမည်ဖြစ်ပြီး လက်မကို ခွာလိုက်ပါက "ဗျစ်" ခနဲ လေစုပ်သံ ကျယ်လောင်စွာ ကြားရမည်။ ထို့နောက် Discharge အပေါက်ကို လက်မဖြင့် ဖိထားပြီး လှည့်ပါက လက်မကို တွန်းကန်ထွက်သည်အထိ ဖိအားကောင်းရမည်။',
    faultSign: 'လှည့်နေသော်လည်း လက်မကို လုံးဝ စုပ်ယူခြင်း မရှိဘဲ ပေါ့ရွှတ်ရွှတ် ဖြစ်နေခြင်း သို့မဟုတ် ရှပ်တံ လှည့်မရဘဲ တစ်ဆို့နေခြင်း။',
    causeAnalysis: 'ပစ္စတင်ကြေမွနေခြင်း၊ ဆီခန်းပြီး အတွင်းကလစ်များ ကျိုးနေခြင်း သို့မဟုတ် ရှပ်တံ ကပ် (Seized) သွားခြင်း။',
    proTip: 'လက်နဲ့ လှည့်ရုံနဲ့တောင် စုပ်အားမရှိလျှင် ကားပေါ်ပြန်မတင်ပါနှင့်၊ အချည်းနှီး ဖြစ်ပါလိမ့်မည်။'
  },
  {
    id: 'oil_color_test',
    testNameMy: '၃။ ကွန်ပရက်ဆာဆီ အရောင်ဖြင့် အထဲပျက်စီးမှု စစ်ဆေးခြင်း (Oil Inspection / Black Death)',
    testNameEn: 'Oil Color & Contamination Analysis ("Black Death")',
    type: 'chemical',
    procedure: [
      'ကွန်ပရက်ဆာ အထွက်ပေါက်မှ ကွန်ပရက်ဆာဆီ အနည်းငယ်ကို အဖြူရောင် ခွက် သို့မဟုတ် တစ်ရှူးဖြူပေါ်သို့ သွန်ချကြည့်ပါ။'
    ],
    expectedGood: 'ဆီအရောင်သည် ကြည်လင်နေရမည် (Clear / Light Yellow or Green fluorescent UV dye)။ သံမှုန့်အနည်အနှစ် လုံးဝ မပါရပါ။',
    faultSign: 'ဆီအရောင်သည် မည်းနက်နေခြင်း (Jet Black)၊ မီးခိုးရောင် သတ္တုရောင် တောက်နေခြင်း (Silver Metallic Flakes) သို့မဟုတ် သံမှုန့်ကြိတ်ဖတ်များ ပါလာခြင်း။',
    causeAnalysis: 'အထဲတွင် ပစ္စတင်နှင့် ဆလင်ဒါနံရံများ အချင်းချင်း ပွတ်တိုက်ကြိတ်ခွဲမိပြီး ဖြစ်ပေါ်လာသော "Black Death" ရောဂါဆိုးကြီး ဖြစ်သည်။',
    proTip: 'ဆီမည်းနေပါက ကွန်ပရက်ဆာ အသစ်လဲရုံဖြင့် မပြီးပါ! Condenser (အပူပေးကွိုင်) အသစ်လဲရမည်၊ Expansion Valve အသစ်လဲရမည်၊ ပိုက်လိုင်းတစ်ခုလုံးကို A/C Flush ဆေးရည်ဖြင့် အနည်များ ပြောင်စင်အောင် ဆေးကြောရမည်။ မဟုတ်ပါက ကွန်ပရက်ဆာအသစ်သည် ၁ ပတ်အတွင်း ပြန်ပျက်ပါလိမ့်မည်!'
  },
  {
    id: 'electronic_control_valve',
    testNameMy: '၄။ ကလပ်မပါသော ကွန်ပရက်ဆာ စစ်ဆေးနည်း (Electronic Control Valve - ECV Test)',
    testNameEn: 'Clutchless Variable Swash-Plate Compressor Valve Test',
    type: 'electrical',
    procedure: [
      'ခေတ်ပေါ်ကားများ (Toyota Vios, Camry, Alphard, European Cars) တွင် ကွန်ပရက်ဆာ ရှေ့တွင် ကလပ်ပြား မပါဘဲ အမြဲတမ်း ပူလီ လည်နေသည်။',
      'ကွန်ပရက်ဆာ အနောက်ဘက်ရှိ 2-Pin Control Solenoid Valve ပလပ်ကို ဖြုတ်ပါ။',
      'မီတာကို Resistance (Ohm) တိုင်းပါ။'
    ],
    expectedGood: 'Solenoid Valve ၏ Resistance သည် 10 Ohm မှ 14 Ohm ဝန်းကျင် ရှိရမည်။ ကားစက်နှိုးပြီး အဲကွန်းဖွင့်ချိန်တွင် ပလပ်ခေါင်း၌ 12V PWM Duty Signal ရောက်ရှိရမည်။',
    faultSign: 'Ohm တိုင်းရာတွင် ပြတ်နေခြင်း (Open Loop / 0 Ohm) သို့မဟုတ် မီးရောက်သော်လည်း Valve အထဲ သဲနုန်းပိတ်ပြီး ရွေ့လျားမရတော့ခြင်း။',
    causeAnalysis: 'Control Valve ပျက်နေပါက ကွန်ပရက်ဆာ အကောင်းဖြစ်သော်လည်း Swash-Plate စောင်းမသွားနိုင်သဖြင့် ပစ္စတင်များ အလုပ်မလုပ်နိုင်ပါ။',
    proTip: 'ဤကားများတွင် ကွန်ပရက်ဆာ တစ်လုံးလုံး အသစ်မလဲမီ Control Valve (ဆာလင်နွိုက်ဘား) လေးကိုသာ သီးသန့် ဖြုတ်လဲကြည့်ပါက ကုန်ကျစရိတ် အဆမတန် သက်သာစေပါသည်။'
  },
  {
    id: 'clutch_coil_test',
    testNameMy: '၅။ ကလပ်မီးကွိုင် စစ်ဆေးနည်း (Magnetic Clutch Field Coil Test)',
    testNameEn: 'Clutch Coil Resistance & Air Gap Inspection',
    type: 'electrical',
    procedure: [
      'အဲကွန်းဖွင့်သော်လည်း ကွန်ပရက်ဆာ ကလပ် မကပ်ပါက ကလပ်ကြိုး ပလပ်ကို ဖြုတ်ပါ။',
      'မီတာဖြင့် ကလပ်ကြိုး (Field Coil) ၏ Resistance ကို တိုင်းပါ။',
      'ကလပ်ပြားနှင့် ပူလီကြားရှိ ကွာဟချက် (Air Gap) ကို Feeler Gauge ဖြင့် တိုင်းပါ။'
    ],
    expectedGood: 'Coil Resistance သည် 3.2 Ohm မှ 4.5 Ohm အတွင်း ရှိရမည်။ Air Gap သည် 0.35 mm မှ 0.65 mm အတွင်း ရှိရမည်။',
    faultSign: 'Resistance သည် Infinity (ပြတ်နေခြင်း) သို့မဟုတ် 1 Ohm အောက် (အတွင်းရှော့ခ်ဖြစ်၍ ဖျူးခဏခဏ ပြတ်ခြင်း)။ Air Gap သည် 0.8 mm ကျော် အလွန်ဟနေပါက မီးရောက်သော်လည်း သံလိုက်ဆွဲအား မမီတော့ဘဲ မကပ်နိုင်ပါ။',
    causeAnalysis: 'Thermal Fuse (အပူခံဖျူး) ပြတ်သွားခြင်း သို့မဟုတ် ကလပ်ပြား ပါးသွားခြင်း။',
    proTip: 'Air Gap အရမ်းဟနေပါက ရှပ်တံပေါ်ရှိ Shim (ဝါရှာပြားလေး) ကို တစ်ပြား လျှော့ထုတ်ပေးလိုက်ရုံဖြင့် ကလပ် ပြန်ကပ်သွားပါမည်။'
  }
];

// ----------------------------------------------------------------------------
// ၃။ ဂတ်စ်ချိန်တွယ် ဖြည့်နည်း & ပေါင်/ဂရမ် တွက်ချက်မှု (CHARGING & WEIGHTS)
// ----------------------------------------------------------------------------
export const AMBIENT_PRESSURE_CHART: AmbientPressureChartItem[] = [
  {
    ambientTempC: 20,
    ambientTempF: 68,
    lowSidePsiRange: '20 ~ 25 PSI',
    highSidePsiRange: '130 ~ 155 PSI',
    recommendedVentTempC: '3°C ~ 6°C',
    weatherMyanmar: 'ဆောင်းတွင်း / မနက်စောစော အေးမြသောအချိန်'
  },
  {
    ambientTempC: 25,
    ambientTempF: 77,
    lowSidePsiRange: '25 ~ 30 PSI',
    highSidePsiRange: '150 ~ 180 PSI',
    recommendedVentTempC: '4°C ~ 7°C',
    weatherMyanmar: 'သာယာသော နေ့ခင်းအချိန် / မိုးရာသီ'
  },
  {
    ambientTempC: 30,
    ambientTempF: 86,
    lowSidePsiRange: '28 ~ 35 PSI',
    highSidePsiRange: '180 ~ 210 PSI',
    recommendedVentTempC: '5°C ~ 8°C',
    weatherMyanmar: 'နွေဦးကာလ / ပုံမှန် နေ့ခင်းဘက်'
  },
  {
    ambientTempC: 35,
    ambientTempF: 95,
    lowSidePsiRange: '30 ~ 38 PSI',
    highSidePsiRange: '210 ~ 240 PSI',
    recommendedVentTempC: '6°C ~ 9°C',
    weatherMyanmar: 'မြန်မာပြည် ဧပြီ/မေ နေပူပြင်းသော နေ့ခင်း'
  },
  {
    ambientTempC: 40,
    ambientTempF: 104,
    lowSidePsiRange: '35 ~ 45 PSI',
    highSidePsiRange: '240 ~ 275 PSI',
    recommendedVentTempC: '7°C ~ 11°C',
    weatherMyanmar: 'အလွန်ပူပြင်းသော နွေရာသီ နေ့လယ် ၁၂ နာရီ'
  },
  {
    ambientTempC: 45,
    ambientTempF: 113,
    lowSidePsiRange: '40 ~ 50 PSI',
    highSidePsiRange: '270 ~ 310 PSI',
    recommendedVentTempC: '9°C ~ 13°C',
    weatherMyanmar: 'အညာဒေသ (မကွေး၊ ချောက်၊ မန္တလေး) အပူလှိုင်း'
  }
];

export const VEHICLE_GRAM_ESTIMATES = [
  { vehicleType: 'အိမ်စီးကား သေး (Sub-Compact / Hatchback: Fit, Vitz, Swift, Belta)', avgGrams: '380g ~ 450g', avgOunces: '13 ~ 16 oz' },
  { vehicleType: 'ဆီဒင် အလတ်စား (Sedan: Corolla, Civic, Premio, Allion, Axio)', avgGrams: '450g ~ 550g', avgOunces: '16 ~ 19 oz' },
  { vehicleType: 'ဆလွန်းကြီး & SUV အလတ် (Camry, Accord, CR-V, RAV4, Harrier)', avgGrams: '550g ~ 650g', avgOunces: '19 ~ 23 oz' },
  { vehicleType: 'ကားကြီး / ကားရှည် (Land Cruiser, Prado, Pajero, Fortuner)', avgGrams: '650g ~ 750g', avgOunces: '23 ~ 26 oz' },
  { vehicleType: 'အဲကွန်း ၂ လုံးတွဲ ဗင်ကား (Alphard, Vellfire, HiAce Dual A/C)', avgGrams: '750g ~ 950g', avgOunces: '26 ~ 33 oz' }
];

// ----------------------------------------------------------------------------
// ၄။ အဲကွန်း ဆန်ဆာများ & ECU အချက်ပြ ထိန်းချုပ်မှု (A/C SENSORS & ECU LOGIC)
// ----------------------------------------------------------------------------
export const AC_SENSORS_DIRECTORY: AcSensorData[] = [
  {
    id: 'evap_temp_sensor',
    nameMy: 'Evaporator Temperature Sensor (ကွိုင်အေး အပူချိန် ဆန်ဆာ - Thermistor)',
    nameEn: 'Evaporator Temperature Thermistor (Anti-Ice Sensor)',
    wiringCount: 2,
    location: 'ဒက်ရှ်ဘုတ်အောက် ကွိုင်အေး (Evaporator Core) ၏ အအေးတက်ပြားများ ကြားတွင် ထိုးစိုက်ထားသည်။',
    operatingPrinciple: 'NTC Thermistor အမျိုးအစားဖြစ်ပြီး အအေးပိုလာလေ Resistance (Ohm) ပိုများလာကာ ဗို့အား အချက်ပြ ပြောင်းလဲသည်။',
    normalValues: '0°C တွင် 4.5 kΩ ~ 5.5 kΩ ၊ 25°C တွင် 1.5 kΩ ~ 2.2 kΩ ဝန်းကျင် ရှိသည်။',
    failureSymptoms: [
      'အဲကွန်း စဖွင့်ချင်း မိနစ် ၂၀ ခန့် အလွန်အေးပြီး နောက်ပိုင်းတွင် လေလုံးဝ မထွက်တော့ခြင်း (ကွိုင်အေး ရေခဲပိတ်သွားခြင်း)။',
      'ကွန်ပရက်ဆာ လုံးဝ မကပ်တော့ခြင်း သို့မဟုတ် ကွန်ပရက်ဆာ လုံးဝ မနားဘဲ ဆက်တိုက် လည်နေခြင်း။'
    ],
    testingProcedure: [
      'ဆန်ဆာပလပ်ကို ဖြုတ်ပြီး မီတာ Ohm တိုင်းပါ။ ရေခဲရေထဲ ထည့်စိမ်ပါက Ohm တန်ဖိုး တဖြည်းဖြည်း တက်လာရမည်။',
      'ရေနွေးထဲ ထည့်ပါက Ohm တန်ဖိုး ချက်ချင်း ကျဆင်းသွားရမည်။'
    ],
    ecuSignalLogic: 'ကွိုင်အေး အပူချိန်သည် 2°C ~ 3°C အောက် ကျဆင်းသွားပါက ရေခဲမခဲစေရန် ECU / A/C Amplifier သည် ကွန်ပရက်ဆာကို မီးဖြတ်ပေးသည်။ 4°C ~ 5°C ပြန်တက်လာမှ ကွန်ပရက်ဆာကို ပြန်ကပ်စေသည်။'
  },
  {
    id: 'ac_pressure_sensor',
    nameMy: 'A/C Pressure Sensor (ဂတ်စ်ဖိအား ဆန်ဆာ - 3-Wire 5V Trinary Type)',
    nameEn: 'A/C Refrigerant Pressure Transducer',
    wiringCount: 3,
    location: 'High Side ပိုက်လိုင်းပေါ်တွင် သို့မဟုတ် Condenser အထွက် Receiver Drier အနီးတွင် တပ်ဆင်ထားသည်။',
    operatingPrinciple: 'Piezo-resistive ဒိုင်ယာဖရမ်ဖြင့် ဖိအားကို တိုက်ရိုက်တိုင်းပြီး 0.5V မှ 4.5V Analogue Signal အဖြစ် ECU သို့ ပို့ပေးသည်။',
    normalValues: 'Pin 1: 5V Reference, Pin 2: Ground, Pin 3: Signal (ပုံမှန်ဖိအား 200 PSI တွင် 1.4V ~ 1.8V ဝန်းကျင်)။',
    failureSymptoms: [
      'ဂတ်စ်အပြည့်ရှိသော်လည်း ကွန်ပရက်ဆာ လုံးဝ မကပ်ခြင်း။',
      'Condenser Fan ပန်ကာသည် စက်နှိုးသည်နှင့် အမြင့်ဆုံး အရှိန် (High Speed) ဖြင့် အမြဲတမ်း အော်လည်နေခြင်း။',
      'DTC အယ်တာကုဒ် B1422, P0532, P0533 ပေါ်နေခြင်း။'
    ],
    testingProcedure: [
      'Pin 1 တွင် 5V ရောက်/မရောက် စစ်ဆေးပါ။',
      'Pin 2 တွင် Ground မိ/မမိ စစ်ဆေးပါ။',
      'Signal ကြိုးတွင် ဖိအားအလိုက် ဗို့အား ပြောင်းလဲမှု ရှိ/မရှိ စစ်ဆေးပါ။ (ဂတ်စ်မရှိပါက 0.5V အောက်၊ ဖိအားများပါက 3.5V ကျော်)'
    ],
    ecuSignalLogic: 'ဖိအား 30 PSI အောက် နိမ့်ပါက (ဂတ်စ်မရှိ၍) ကွန်ပရက်ဆာကို မီးမပေးပါ။ ဖိအား 450 PSI ကျော်ပါက (ပိုက်ပေါက်မည်စိုး၍) အရေးပေါ် မီးဖြတ်ချသည်။ ဖိအား 220 PSI ကျော်ပါက အအေးခံပန်ကာကို High Speed သို့ အလိုအလျောက် တင်ပေးသည်။'
  },
  {
    id: 'ambient_temp_sensor',
    nameMy: 'Ambient Air Temperature Sensor (ပြင်ပလေထု အပူချိန် ဆန်ဆာ)',
    nameEn: 'Ambient Outside Air Temperature Sensor',
    wiringCount: 2,
    location: 'ကားရှေ့ ဘန်ဘာ အတွင်းဘက်၊ ရှေ့မီးကင် (Front Grille) သို့မဟုတ် Condenser ရှေ့တွင် တပ်ဆင်ထားသည်။',
    operatingPrinciple: 'ပြင်ပလေထု၏ အပူချိန်ကို တိုင်းတာပြီး ဒိုင်ခွက်ပေါ်တွင် ပြင်ပအပူချိန် ဖော်ပြပေးသည့်အပြင် အော်တိုအဲကွန်း ကွန်ပျူတာဆီသို့ သတင်းပို့သည်။',
    normalValues: '25°C တွင် 2 kΩ ဝန်းကျင် ရှိသည်။',
    failureSymptoms: [
      'ဒိုင်ခွက်ပေါ်တွင် ပြင်ပအပူချိန် -40°C (အနှုတ် ၄၀) ဟု ပြနေခြင်း (ကြိုးပြတ်နေခြင်း)။',
      'အပြင်မှာ အရမ်းပူနေသော်လည်း အော်တိုအဲကွန်းက အပြင်မှာ အေးနေသည်ဟု ထင်ပြီး အပူလေ (Heater) မှုတ်ထုတ်နေခြင်း။'
    ],
    testingProcedure: [
      'ရှေ့ဘန်ဘာ တိုက်မိဖူးသော ကားများတွင် ဝါယာကြိုး ပဲ့ပြတ်နေတတ်သည်။ မီတာဖြင့် Ohm တိုင်းပါ။'
    ],
    ecuSignalLogic: 'ပြင်ပအပူချိန် အရမ်းအေးနေပါက (ဥပမာ 0°C အောက်) ECU သည် အဲကွန်း ကွန်ပရက်ဆာကို ကပ်ခွင့်မပြုဘဲ ကာကွယ်ပေးသည်။'
  },
  {
    id: 'sunload_sensor',
    nameMy: 'Sunload Sensor (နေရောင်ခြည် အာရုံခံ ဆန်ဆာ - Photodiode)',
    nameEn: 'Sunload Sensor (Solar Radiation Sensor)',
    wiringCount: 2,
    location: 'ကားအတွင်းခန်း ဒက်ရှ်ဘုတ်ခုံပေါ် (လေကာမှန်ကြီး အောက်ခြေထောင့်) တွင် မှန်ဘီလူး အမည်းစက်လေး အဖြစ် တွေ့ရသည်။',
    operatingPrinciple: 'Photodiode အမျိုးအစားဖြစ်ပြီး နေရောင်ခြည် ကျရောက်မှု ပြင်းအားအလိုက် Microamp လျှပ်စီးကြောင်း ထုတ်ပေးသည်။',
    normalValues: 'မှောင်နေချိန်တွင် လျှပ်စီး မရှိ၊ နေရောင်ပြင်းချိန်တွင် လျှပ်စီး မြင့်တက်လာသည်။',
    failureSymptoms: [
      'အော်တိုအဲကွန်းစနစ်တွင် နေပူထဲ မောင်းနေသော်လည်း လေအား မတက်လာခြင်း။',
      'Diagnostic Scanner တွင် Sunload Sensor Circuit Code (B1424) တက်နေခြင်း (အရိပ်ထဲတွင် စစ်ဆေးပါက ဤကုဒ် ပေါ်တတ်သည်၊ ဓာတ်မီးဖြင့် ထိုးပြမှ ပျောက်သည်)။'
    ],
    testingProcedure: [
      'ဆန်ဆာပေါ်သို့ ဖုန်းဓာတ်မီးဖြင့် အလင်းရောင် ထိုးပြပြီး စကန်ဖတ်စက် Live Data တွင် တန်ဖိုး တက်လာ/မတက်လာ စစ်ဆေးပါ။'
    ],
    ecuSignalLogic: 'နေရောင်ပြင်းထန်စွာ ကျရောက်နေချိန်တွင် ကားအတွင်းခန်း ပိုပူလာမည်ကို ကြိုတင်သိရှိပြီး အဲကွန်းလေအားကို အလိုအလျောက် မြှင့်တင်ပေးသည်။'
  }
];

// ----------------------------------------------------------------------------
// ၅။ ဂတ်စ် အမျိုးအစားများနှင့် ဆီ (REFRIGERANTS & COMPRESSOR OILS)
// ----------------------------------------------------------------------------
export const REFRIGERANT_COMPARISONS: AcGasComparison[] = [
  {
    refrigerant: 'R134a (Tetrafluoroethane)',
    commonUsage: '၁၉၉၄ မှ ၂၀၂၀ အထိ ထုတ်လုပ်သော မော်တော်ကား အားလုံးနီးပါးတွင် အဓိက အသုံးပြုသည်။',
    boilingPoint: '-26.3°C (-15.3°F)',
    operatingPressureLow: '25 ~ 35 PSI',
    operatingPressureHigh: '175 ~ 230 PSI',
    oilCompatibility: 'PAG Oil (PAG 46, PAG 100) သို့မဟုတ် POE Oil သာ သုံးရမည်။',
    canUseInCar: true,
    whyCarOrHome: 'ကား၏ တုန်ခါမှုဒဏ်၊ အင်ဂျင်ခန်း အပူချိန်မြင့်မားမှု (80°C+) ဒဏ်ကို အထူးခံနိုင်ပြီး မီးမလောင်နိုင်ပါ။ အိုဇုန်းလွှာကို မထိခိုက်ပါ။',
    safetyHazard: 'အဆိပ်အတောက်မရှိသော်လည်း ဖိအားပြင်းသဖြင့် မျက်စိထဲ မဝင်စေရန် သတိပြုရမည်။'
  },
  {
    refrigerant: 'R1234yf (HFO-1234yf)',
    commonUsage: '၂၀၁၇ နောက်ပိုင်း ဥရောပ၊ အမေရိကန်နှင့် ဂျပန်ကားသစ်များ (Eco-Friendly cars) တွင် အစားထိုး အသုံးပြုလာသည်။',
    boilingPoint: '-29.4°C (-20.9°F)',
    operatingPressureLow: '25 ~ 35 PSI',
    operatingPressureHigh: '160 ~ 220 PSI',
    oilCompatibility: 'PAG Oil (ND-Oil 12 / PAG 46 yf)',
    canUseInCar: true,
    whyCarOrHome: 'ကမ္ဘာကြီး ပူနွေးမှုကို လုံးဝ မဖြစ်စေသော ဂတ်စ်အသစ် ဖြစ်သည်။ R134a နှင့် ပေါင်ဂိတ်ခေါင်း မတူညီအောင် သီးသန့်ပြုလုပ်ထားသည်။',
    safetyHazard: 'အနည်းငယ် မီးလောင်လွယ်သော (Mildly Flammable A2L) ဂတ်စ်ဖြစ်သဖြင့် မီးပွားမရှိအောင် သတိထားရမည်။'
  },
  {
    refrigerant: 'R22 (Freon 22 - အိမ်သုံး)',
    commonUsage: 'ရှေးဟောင်း အိမ်သုံး Split အဲကွန်းများတွင် အဓိက သုံးခဲ့သည်။',
    boilingPoint: '-40.8°C',
    operatingPressureLow: '60 ~ 75 PSI',
    operatingPressureHigh: '220 ~ 275 PSI',
    oilCompatibility: 'Mineral Oil (တွင်းထွက်ဆီ) သာ သုံးသည်။',
    canUseInCar: false,
    whyCarOrHome: 'ကားတွင် လုံးဝ မသုံးရပါ! ပေါင်ဖိအား မတူညီခြင်း၊ ကားအဲကွန်း ရော်ဘာပိုက်များကို အချိန်တိုအတွင်း စားပစ်ပြီး ပေါက်ထွက်စေသည်။',
    safetyHazard: 'ကားထဲ ထည့်မိပါက အပူလွန်ကဲပြီး ပိုက်လိုင်းများ ပေါက်ကွဲတတ်သည်။'
  },
  {
    refrigerant: 'R410A (အိမ်သုံး အင်ဗာတာ)',
    commonUsage: 'ခေတ်ပေါ် အိမ်သုံး Inverter အဲကွန်းများတွင် သုံးသည်။',
    boilingPoint: '-51.4°C',
    operatingPressureLow: '110 ~ 130 PSI',
    operatingPressureHigh: '380 ~ 450 PSI',
    oilCompatibility: 'POE Synthetic Oil',
    canUseInCar: false,
    whyCarOrHome: 'ဖိအား အလွန်အမင်း မြင့်မားလွန်းသည် (High Side 450 PSI အထိ ရောက်သည်)။ ကားအဲကွန်း ပိုက်များနှင့် ကွိုင်များသည် ဤဖိအားကို မခံနိုင်ဘဲ ပေါက်ကွဲထွက်သွားမည်!',
    safetyHazard: 'ကားထဲ ထည့်ပါက ပေါက်ကွဲမှု အန္တရာယ် အလွန်ကြီးမားသည်။'
  },
  {
    refrigerant: 'R32 (ခေတ်သစ် အိမ်သုံး)',
    commonUsage: 'နောက်ဆုံးပေါ် အိမ်သုံး စွမ်းအင်ချွေတာရေး အဲကွန်းများ။',
    boilingPoint: '-51.7°C',
    operatingPressureLow: '115 ~ 140 PSI',
    operatingPressureHigh: '390 ~ 470 PSI',
    oilCompatibility: 'POE Oil',
    canUseInCar: false,
    whyCarOrHome: 'ဖိအား အရမ်းများသည့်အပြင် မီးလောင်လွယ်သည်။ ကားအင်ဂျင်ခန်းလို မီးပွားရှိသော နေရာတွင် အလွန် အန္တရာယ်ကြီးသည်။',
    safetyHazard: 'မီးလောင်ပေါက်ကွဲနိုင်ခြေ မြင့်မားသည်။'
  }
];

export const COMPRESSOR_OILS: CarAcOilData[] = [
  {
    oilType: 'PAG 46 (ND-Oil 8)',
    viscosity: 'ISO 46 (ဆီကျဲ)',
    compatibleRefrigerant: 'R134a',
    application: 'Toyota, Honda, Nissan, Mazda အစရှိသည့် ဂျပန်နှင့် ကိုရီးယား ကားသစ်များ၏ ကွန်ပရက်ဆာ အားလုံးနီးပါး။',
    hybirdEvSafe: false,
    warningNote: 'ရိုးရိုးကားများအတွက်သာ ဖြစ်သည်။ Hybrid/EV ကားတွင် လုံးဝ မသုံးရပါ (လျှပ်စစ်စီးကူးနိုင်သောကြောင့် အင်ဗာတာ ပျက်စီးမည်)။'
  },
  {
    oilType: 'PAG 100',
    viscosity: 'ISO 100 (ဆီပျစ်)',
    compatibleRefrigerant: 'R134a',
    application: 'Ford, GM, Chevrolet နှင့် ဥရောပကား အချို့၊ ရှေးဟောင်းကားကြီးများ၏ ကွန်ပရက်ဆာများ။',
    hybirdEvSafe: false,
    warningNote: 'ဆီပျစ်သဖြင့် ဆီကျဲသတ်မှတ်ထားသော ကားတွင် ထည့်ပါက ကွန်ပရက်ဆာ လည်ရ လေးလံပြီး စလိုးကျမည်။'
  },
  {
    oilType: 'POE Oil (ND-Oil 11 / Polyolester)',
    viscosity: 'Dielectric Non-Conductive (လျှပ်စစ်မကူးသော အထူးဆီ)',
    compatibleRefrigerant: 'R134a / R1234yf',
    application: 'Prius, Aqua, Insight, Camry Hybrid နှင့် လျှပ်စစ်ကား (EV) များ၏ High-Voltage Electric Compressor များ။',
    hybirdEvSafe: true,
    warningNote: '🚨 အထူးသတိပြုရန်: Hybrid ကားတွင် PAG ဆီ ၁ စက်မျှပင် မဝင်ရပါ! PAG ဆီပါသွားပါက 200V~650V လျှပ်စစ်ဓာတ်လိုက်မှု ဖြစ်ပေါ်ပြီး ကား ECU က Insulation Error (P0AA6) ပေးကာ စက်မနှိုးတော့ဘဲ အင်ဗာတာ ပျက်စီးသွားမည်!'
  }
];

// ----------------------------------------------------------------------------
// ၇။ အဲကွန်း ဝေါဟာရနှင့် အစိတ်အပိုင်း အဘိဓာန် (CAR A/C TERMINOLOGY GLOSSARY)
// တပည့်များ/ကလေးများ လေ့လာသင်ယူနိုင်ရန် အင်္ဂလိပ်စကားလုံး + အသံထွက် + မြန်မာပြန်
// ----------------------------------------------------------------------------
export interface AcTerminologyItem {
  id: string;
  termEn: string;
  pronunciationMy: string;
  termMy: string;
  workshopSlangMy: string;
  category: 'core_parts' | 'valves_pipes' | 'electrical_sensors' | 'tools_service' | 'doors_motors';
  categoryLabelMy: string;
  functionMy: string;
}

export const AC_TERMINOLOGY_GLOSSARY: AcTerminologyItem[] = [
  {
    id: 'compressor',
    termEn: 'Compressor',
    pronunciationMy: 'ကွန်ပရက်ဆာ',
    termMy: 'ဖိသိပ်စက် / ဓာတ်ငွေ့ဖိအားပေးစက်',
    workshopSlangMy: 'အဲကွန်းဘန့် / ကွန်ပရက်ဆာ',
    category: 'core_parts',
    categoryLabelMy: 'အဓိက အစိတ်အပိုင်းကြီးများ',
    functionMy: 'အအေးဓာတ်ငွေ့ကို စုပ်ယူပြီး အလွန်မြင့်မားသော ဖိအား (200 PSI) အဖြစ် ညှပ်ထုတ်ပေးသော စနစ်၏ နှလုံးသား ဖြစ်သည်။'
  },
  {
    id: 'condenser',
    termEn: 'Condenser',
    pronunciationMy: 'ကွန်ဒန်ဆာ',
    termMy: 'အပူစွန့်ထုတ်ကွိုင် / ငွေ့ရည်ဖွဲ့ကွိုင်',
    workshopSlangMy: 'အပူကွိုင် / ရှေ့ကွိုင်',
    category: 'core_parts',
    categoryLabelMy: 'အဓိက အစိတ်အပိုင်းကြီးများ',
    functionMy: 'ရှေ့ရေတိုင်ကီနားတွင် ရှိပြီး ကွန်ပရက်ဆာမှ ထွက်လာသော ဓာတ်ငွေ့ပူများ၏ အပူကို ပြင်ပလေထုထဲ စွန့်ထုတ်ကာ ဓာတ်ငွေ့မှ အရည်အဖြစ် ပြောင်းလဲပေးသည်။'
  },
  {
    id: 'evaporator',
    termEn: 'Evaporator',
    pronunciationMy: 'အီဗာပိုရေတာ',
    termMy: 'အပူစုပ်ယူ အငွေ့ပျံကွိုင်',
    workshopSlangMy: 'ကွိုင်အေး / အအေးကွိုင်',
    category: 'core_parts',
    categoryLabelMy: 'အဓိက အစိတ်အပိုင်းကြီးများ',
    functionMy: 'ဒက်ရှ်ဘုတ်အောက်တွင် ရှိပြီး ကားအတွင်းခန်းထဲက အပူကို စုပ်ယူ၍ လေအေး (4°C~8°C) ထုတ်ပေးကာ အတွင်းရှိ ဂတ်စ်ကို အရည်မှ အငွေ့အဖြစ် ပြောင်းလဲစေသည်။'
  },
  {
    id: 'expansion_valve',
    termEn: 'Expansion Valve (TXV)',
    pronunciationMy: 'အိတ်စပန်းရှင်း ဘား',
    termMy: 'အပူချိန်ထိန်း ဖိအားချ အဆို့ရှင်',
    workshopSlangMy: 'အိတ်စပန်းရှင်းဘား / အအေးဖြန်းဘား',
    category: 'valves_pipes',
    categoryLabelMy: 'ဘားနှင့် ပိုက်လိုင်းများ',
    functionMy: 'ဖိအားမြင့် အရည်ကို အပေါက်ကျဉ်းမှတစ်ဆင့် ကွိုင်အေးထဲသို့ မှုတ်ထုတ်ဖြန်းပေးပြီး ဖိအားကို 190 မှ 30 PSI သို့ ရုတ်တရက်ချကာ ရေခဲမှတ်နီးပါး အေးစေသည်။'
  },
  {
    id: 'receiver_drier',
    termEn: 'Receiver Drier',
    pronunciationMy: 'ရီဆီးဗား ဒရိုင်ယာ',
    termMy: 'အညစ်အကြေးစစ်ဗူးနှင့် အစိုဓာတ်စုပ်ဗူး',
    workshopSlangMy: 'ဒရိုင်ယာဗူး / ဂတ်စ်ဇကာဗူး',
    category: 'core_parts',
    categoryLabelMy: 'အဓိက အစိတ်အပိုင်းကြီးများ',
    functionMy: 'Condenser အထွက်တွင် တပ်ဆင်ထားပြီး ဂတ်စ်အရည်ထဲရှိ အစိုဓာတ် (ရေငွေ့) နှင့် အညစ်အကြေး သံမှုန့်များကို ဇကာဖြင့် စစ်ထုတ်သိုလှောင်ပေးသည်။'
  },
  {
    id: 'accumulator',
    termEn: 'Accumulator',
    pronunciationMy: 'အကျူမြူလေတာ',
    termMy: 'အရည်ခိုအောင်းမှု တားဆီးဗူး',
    workshopSlangMy: 'အရည်စစ်ဗူးကြီး (Orifice စနစ်သုံးကားများ)',
    category: 'core_parts',
    categoryLabelMy: 'အဓိက အစိတ်အပိုင်းကြီးများ',
    functionMy: 'Orifice tube စနစ်သုံးကားများ (Ford, GM) တွင် ကွိုင်အေးအထွက်၌ တပ်ဆင်ပြီး ကွန်ပရက်ဆာထဲသို့ အရည်မဝင်စေရန် အငွေ့သာ ခွဲထုတ်ပေးသည်။'
  },
  {
    id: 'magnetic_clutch',
    termEn: 'Magnetic Clutch',
    pronunciationMy: 'မဂ္ဂနက်တစ် ကလပ်',
    termMy: 'လျှပ်စစ်သံလိုက် ကလပ်ပြားနှင့် ကွိုင်',
    workshopSlangMy: 'အဲကွန်းကလပ် / မီးကွိုင်',
    category: 'electrical_sensors',
    categoryLabelMy: 'လျှပ်စစ်နှင့် ဆန်ဆာများ',
    functionMy: '12V မီးရောက်လာပါက သံလိုက်ဓာတ်ဖြစ်ပေါ်ပြီး ပူလီနှင့် ကွန်ပရက်ဆာ ရှပ်တံကို တွဲဖက်လည်ပတ်စေကာ မီးဖြတ်ပါက လွတ်သွားစေသည်။'
  },
  {
    id: 'blower_motor',
    termEn: 'Blower Motor',
    pronunciationMy: 'ဘလိုဝါ မော်တာ',
    termMy: 'ကားအတွင်းခန်း လေမှုတ်ပန်ကာ',
    workshopSlangMy: 'ဘလိုဝါ / အတွင်းပန်ကာ',
    category: 'doors_motors',
    categoryLabelMy: 'မော်တာနှင့် လေတံခါးများ',
    functionMy: 'ကွိုင်အေးကြားမှ အေးစက်သော လေများကို ကားအတွင်းခန်း လေထွက်ပေါက်များဆီသို့ အရှိန်အဆင့်ဆင့်ဖြင့် မှုတ်ထုတ်ပေးသည်။'
  },
  {
    id: 'condenser_fan',
    termEn: 'Condenser Fan',
    pronunciationMy: 'ကွန်ဒန်ဆာ ဖန်',
    termMy: 'ကွိုင်အပူ အအေးပေးပန်ကာ',
    workshopSlangMy: 'ရှေ့ပန်ကာ / အဲကွန်းပန်ကာ',
    category: 'doors_motors',
    categoryLabelMy: 'မော်တာနှင့် လေတံခါးများ',
    functionMy: 'ကားရပ်ထားချိန်နှင့် ယာဉ်ကြောပိတ်ဆို့ချိန်တွင် Condenser မှ အပူများကို လေဆွဲမှုတ်ထုတ်ပေး၍ ဖိအားမတက်အောင် ကာကွယ်ပေးသည်။'
  },
  {
    id: 'refrigerant',
    termEn: 'Refrigerant',
    pronunciationMy: 'ရီဖရစ်ဂျရန့်',
    termMy: 'အအေးပေး ဓာတ်ငွေ့ရည်',
    workshopSlangMy: 'အဲကွန်းဂတ်စ် (R134a, R1234yf)',
    category: 'core_parts',
    categoryLabelMy: 'အဓိက အစိတ်အပိုင်းကြီးများ',
    functionMy: 'အပူကို စုပ်ယူပြီး အငွေ့ပျံခြင်း၊ အပူစွန့်ထုတ်ပြီး အရည်ဖွဲ့ခြင်းတို့ဖြင့် အပူချိန်ကို သယ်ယူပို့ဆောင်ပေးသော အထူးဓာတ်ငွေ့ ဖြစ်သည်။'
  },
  {
    id: 'compressor_oil',
    termEn: 'Compressor Oil',
    pronunciationMy: 'ကွန်ပရက်ဆာ အွိုင်လ်',
    termMy: 'ကွန်ပရက်ဆာ ချောဆီ',
    workshopSlangMy: 'ကွန်ပရက်ဆာဆီ (PAG 46, PAG 100, POE)',
    category: 'core_parts',
    categoryLabelMy: 'အဓိက အစိတ်အပိုင်းကြီးများ',
    functionMy: 'ကွန်ပရက်ဆာ အတွင်းရှိ ပစ္စတင်၊ ဆလင်ဒါနံရံနှင့် ဘောစေ့များကို ပွန်းပဲ့မသွားအောင် ချောမွေ့စေပြီး အလုံပိတ်ပေးသည်။'
  },
  {
    id: 'manifold_gauge',
    termEn: 'Manifold Gauge',
    pronunciationMy: 'မန်နီဖိုး ဂိတ်',
    termMy: 'ဖိအားတိုင်း ဂိတ်စုံခုံ',
    workshopSlangMy: 'ပေါင်ဂိတ် / အဲကွန်းဂိတ်စုံ',
    category: 'tools_service',
    categoryLabelMy: 'ကိရိယာနှင့် ဝန်ဆောင်မှု',
    functionMy: 'စနစ်အတွင်းရှိ Low Side (အနိမ့်ဖိအား) နှင့် High Side (အမြင့်ဖိအား) တို့ကို တစ်ပြိုင်နက် တိုင်းတာစစ်ဆေးကာ ဂတ်စ်ဖြည့်သွင်းသည့် ကိရိယာ ဖြစ်သည်။'
  },
  {
    id: 'vacuum_pump',
    termEn: 'Vacuum Pump',
    pronunciationMy: 'ဗက်ခမ်း ပန့်',
    termMy: 'လေဟာနယ် စုပ်ထုတ်စက်',
    workshopSlangMy: 'ဗက်ခမ်းဆွဲစက် / လေစုပ်စက်',
    category: 'tools_service',
    categoryLabelMy: 'ကိရိယာနှင့် ဝန်ဆောင်မှု',
    functionMy: 'ဂတ်စ်မထည့်မီ ပိုက်လိုင်းထဲရှိ လေထုနှင့် အစိုဓာတ် (ရေငွေ့) များကို အနှုတ် 30 inHg အထိ ကုန်စင်အောင် စုပ်ထုတ်ပေးသော စက် ဖြစ်သည်။'
  },
  {
    id: 'high_side_line',
    termEn: 'Discharge / High Side Line',
    pronunciationMy: 'ဒစ်ချာ့ချ် / ဟိုက်ဆိုက် လိုင်း',
    termMy: 'အမြင့်ဖိအား ထွက်ပေါက်ပိုက်လိုင်း',
    workshopSlangMy: 'ပိုက်သေး / ပိုက်ပူ (High Side)',
    category: 'valves_pipes',
    categoryLabelMy: 'ဘားနှင့် ပိုက်လိုင်းများ',
    functionMy: 'ကွန်ပရက်ဆာမှ Condenser သို့ သွားသော ပိုက်ဖြစ်ပြီး ဖိအားအရမ်းများ (200 PSI) ကာ အလွန်ပူပြင်းသည်။'
  },
  {
    id: 'low_side_line',
    termEn: 'Suction / Low Side Line',
    pronunciationMy: 'ဆက်ရှင် / လိုးဆိုက် လိုင်း',
    termMy: 'အနိမ့်ဖိအား စုပ်သွင်းပိုက်လိုင်း',
    workshopSlangMy: 'ပိုက်မည်းကြီး / ပိုက်အေး (Low Side)',
    category: 'valves_pipes',
    categoryLabelMy: 'ဘားနှင့် ပိုက်လိုင်းများ',
    functionMy: 'ကွိုင်အေးမှ ကွန်ပရက်ဆာသို့ ပြန်လာသော ပိုက်ကြီးဖြစ်ပြီး ဖိအားနည်း (30 PSI) ကာ ရေခဲရေပုလင်းလို အလွန် အေးစက်ချွေးပြန်နေသည်။'
  },
  {
    id: 'evap_thermistor',
    termEn: 'Evaporator Thermistor',
    pronunciationMy: 'သာမစ်စတာ',
    termMy: 'ကွိုင်အေး အပူချိန် အာရုံခံဆန်ဆာ',
    workshopSlangMy: 'ကွိုင်အေးဆန်ဆာ / အအေးထိန်းဆန်ဆာ',
    category: 'electrical_sensors',
    categoryLabelMy: 'လျှပ်စစ်နှင့် ဆန်ဆာများ',
    functionMy: 'ကွိုင်အေးတွင် ရေခဲမကပ်စေရန် 2°C~3°C သို့ ရောက်ပါက ECU/Amplifier သို့ အချက်ပြပြီး ကွန်ပရက်ဆာကို ခေတ္တ မီးဖြတ်ပေးသည်။'
  },
  {
    id: 'pressure_sensor',
    termEn: 'A/C Pressure Sensor',
    pronunciationMy: 'ပရက်ရှာ ဆန်ဆာ',
    termMy: 'ဂတ်စ်ဖိအား အာရုံခံ ဆန်ဆာ',
    workshopSlangMy: 'ပရက်ရှာဆွစ်ချ် (3-Wire 5V)',
    category: 'electrical_sensors',
    categoryLabelMy: 'လျှပ်စစ်နှင့် ဆန်ဆာများ',
    functionMy: 'ဂတ်စ်ဖိအားကို 0.5V~4.5V အဖြစ် ECU သို့ ပို့ပေးပြီး၊ ဖိအားနည်းလွန်းပါက သို့မဟုတ် များလွန်းပါက အန္တရာယ်မှ ကာကွယ်ရန် မီးဖြတ်ချသည်။'
  },
  {
    id: 'blend_door',
    termEn: 'Blend Door Actuator',
    pronunciationMy: 'ဘလန်းဒိုး အက်ချူအေတာ',
    termMy: 'အပူ/အအေး ရောစပ်ထိန်းချုပ် ဆာဗိုမော်တာ',
    workshopSlangMy: 'ဘလန်းဒိုးမော်တာ',
    category: 'doors_motors',
    categoryLabelMy: 'မော်တာနှင့် လေတံခါးများ',
    functionMy: 'ဒက်ရှ်ဘုတ်ထဲတွင် လေပူနှင့် လေအေးကို အချိုးကျ ရောစပ်ပေးသည့် တံခါးပြားလေးကို မော်တာဖြင့် ဖွင့်ပိတ်ပေးသည်။ (ဒါပျက်ရင် တစ်ဖက်ပူ တစ်ဖက်အေး ဖြစ်သည်)'
  },
  {
    id: 'mode_door',
    termEn: 'Mode Door Actuator',
    pronunciationMy: 'မုဒ်ဒိုး အက်ချူအေတာ',
    termMy: 'လေလမ်းကြောင်း ရွေးချယ်မော်တာ',
    workshopSlangMy: 'လေလမ်းကြောင်းမော်တာ (မျက်နှာ/ခြေထောက်/မှန်)',
    category: 'doors_motors',
    categoryLabelMy: 'မော်တာနှင့် လေတံခါးများ',
    functionMy: 'လေထွက်ပေါက်ကို မျက်နှာတည့်တည့်၊ ခြေထောက် သို့မဟုတ် ရှေ့လေကာမှန်ဘက်သို့ လမ်းကြောင်း ပြောင်းလဲပေးသည်။'
  },
  {
    id: 'recirc_door',
    termEn: 'Recirculation Door',
    pronunciationMy: 'ရီဆာကူလေးရှင်း ဒိုး',
    termMy: 'လေလှည့်/ပြင်ပလေဝင် ထိန်းတံခါး',
    workshopSlangMy: 'အတွင်းလေ/အပြင်လေ လဲတံခါး',
    category: 'doors_motors',
    categoryLabelMy: 'မော်တာနှင့် လေတံခါးများ',
    functionMy: 'ကားအတွင်းလေကိုသာ ပြန်လှည့်သုံးမလား သို့မဟုတ် ပြင်ပမှ လေလတ်ဆတ်သွင်းမလား ရွေးချယ်ပေးသည်။'
  },
  {
    id: 'o_ring',
    termEn: 'O-Ring',
    pronunciationMy: 'အိုရင်း',
    termMy: 'ရော်ဘာ အလုံပိတ်ကွင်း',
    workshopSlangMy: 'အဲကွန်း အိုကွင်း (အစိမ်း/အနက်/ခရမ်း)',
    category: 'valves_pipes',
    categoryLabelMy: 'ဘားနှင့် ပိုက်လိုင်းများ',
    functionMy: 'အလူမီနီယမ် ပိုက်အဆက်များကြားတွင် ဂတ်စ်နှင့် ဆီများ မစိမ့်ထွက်စေရန် သေသပ်စွာ အလုံပိတ်ပေးသော အထူးရော်ဘာကွင်း ဖြစ်သည်။'
  },
  {
    id: 'schrader_valve',
    termEn: 'Schrader Valve',
    pronunciationMy: 'ရှရိတ်ဒါ ဘား',
    termMy: 'စပရိန် အဆို့ရှင် နို့သီးဘား',
    workshopSlangMy: 'ဂိတ်ထိုး နို့သီးခေါင်း / စာဗစ်ဘား',
    category: 'valves_pipes',
    categoryLabelMy: 'ဘားနှင့် ပိုက်လိုင်းများ',
    functionMy: 'ပေါင်ဂိတ်ကြိုး တပ်ဆင်ရန် Service Port အပေါက်ဝတွင် ရှိသော ဘားဖြစ်ပြီး ပေါင်ဂိတ်ဖြုတ်လိုက်ပါက ဂတ်စ်မထွက်အောင် အလိုအလျောက် ပိတ်ပေးသည်။'
  },
  {
    id: 'sight_glass',
    termEn: 'Sight Glass',
    pronunciationMy: 'ဆိုက်ဂလပ်စ်',
    termMy: 'ဂတ်စ်ကြည့် မှန်ပြတင်းပေါက်',
    workshopSlangMy: 'ဂတ်စ်ကြည့် မျက်လုံး',
    category: 'valves_pipes',
    categoryLabelMy: 'ဘားနှင့် ပိုက်လိုင်းများ',
    functionMy: 'ပိုက်လိုင်းပေါ်ရှိ မှန်ဘီလူးလေးဖြစ်ပြီး အတွင်း၌ ဂတ်စ်ပြည့်/မပြည့်၊ အမြှုပ်ထ/မထကို မျက်စိဖြင့် ကြည့်ရှုစစ်ဆေးနိုင်သည်။'
  },
  {
    id: 'flushing',
    termEn: 'A/C Flushing',
    pronunciationMy: 'အေစီ ဖလပ်ရှင်း',
    termMy: 'စနစ်ဆေးကြော သန့်စင်ခြင်း',
    workshopSlangMy: 'ဖလပ်ဆေးရည်ဖြင့် ပိုက်ဆေးခြင်း',
    category: 'tools_service',
    categoryLabelMy: 'ကိရိယာနှင့် ဝန်ဆောင်မှု',
    functionMy: 'ကွန်ပရက်ဆာ ပျက်စီးပြီးနောက် ပိုက်လိုင်းထဲတွင် ကျန်ရှိနေသော သံမှုန့်နှင့် ဆီမည်းများကို အထူးဆေးရည်ဖြင့် ဖိအားသုံး ဆေးကြောထုတ်ပစ်ခြင်း ဖြစ်သည်။'
  },
  {
    id: 'leak_detector',
    termEn: 'Leak Detector (UV / Sniffer)',
    pronunciationMy: 'လစ်ခ် ဒီတက်တာ',
    termMy: 'ယိုစိမ့်မှု ရှာဖွေစစ်ဆေးစက်',
    workshopSlangMy: 'ဂတ်စ်ယိုရှာ UV မီး / စနိုက်ဖာ',
    category: 'tools_service',
    categoryLabelMy: 'ကိရိယာနှင့် ဝန်ဆောင်မှု',
    functionMy: 'ဂတ်စ်ယိုစိမ့်သည့် နေရာကို UV မီးရောင်ဖြင့် စိမ်းဝါရောင် အစက်အပြောက် ရှာဖွေခြင်း သို့မဟုတ် အာရုံခံစက်ဖြင့် ရှာဖွေခြင်း ဖြစ်သည်။'
  }
];

// ----------------------------------------------------------------------------
// ၈။ အဲကွန်း ဝါယာရိန်း မီးလိုင်းလိုက်နည်း & RELAY/ဆန်ဆာ စစ်ဆေးပြုပြင်နည်း
// "အသားဟင်း ဘယ်ကရတယ် သိရုံမက အမဲပါ ဖြတ်တတ်စေမည့်" လက်တွေ့ ဝါယာလိုက်နည်း မာစတာ
// ----------------------------------------------------------------------------
export interface AcCircuitPinDetail {
  pinLabel: string;
  pinRoleMy: string;
  expectedReading: string;
  testLightResult: string;
  failureSign: string;
}

export interface AcWiringCircuitGuide {
  id: string;
  titleMy: string;
  titleEn: string;
  circuitCategory: 'clutch_relay' | 'pressure_sensor' | 'thermistor' | 'blower_resistor' | 'clutchless_valve' | 'master_switch';
  symptomMy: string;
  toolsNeeded: string[];
  pins: AcCircuitPinDetail[];
  stepByStepTracing: string[];
  quickBypassTest: string;
  commonFailurePoint: string;
  proButcherTip: string;
}

export const AC_WIRING_CIRCUITS: AcWiringCircuitGuide[] = [
  {
    id: 'circuit_clutch_relay',
    titleMy: '၁။ Compressor Clutch Relay ၄ ချောင်း မီးလိုက်နည်း (ကလပ်မကပ်သော ရောဂါ)',
    titleEn: '4-Pin Magnetic Clutch Relay Circuit Tracing',
    circuitCategory: 'clutch_relay',
    symptomMy: 'A/C ခလုတ်ဖွင့်သော်လည်း ကွန်ပရက်ဆာ ကလပ် "ဒေါက်" ခနဲ မကပ်ဘဲ မအေးတော့ခြင်း။',
    toolsNeeded: ['12V စမ်းသပ်မီးသီး (Test Light)', 'Digital Multimeter', 'Jump ဝါယာကြိုးတို (Paperclip or Fused Wire)'],
    pins: [
      {
        pinLabel: 'Pin 30 (Power Supply)',
        pinRoleMy: 'ဘက်ထရီတိုက်ရိုက် အမြဲတမ်းပါဝါ (BATT+ via 10A/15A A/C Fuse)',
        expectedReading: '12V DC အမြဲရှိရမည်',
        testLightResult: 'စမ်းသပ်မီး အမြဲတောက်ရမည် (သော့ပိတ်ထားလည်း လင်းရမည်)',
        failureSign: 'မီးမလင်းပါက A/C 10A/15A Fuse ပြတ်နေခြင်း သို့မဟုတ် ဖျူးခုံအောက် ကြိုးပြတ်နေခြင်း'
      },
      {
        pinLabel: 'Pin 87 (Relay Output)',
        pinRoleMy: 'ကွန်ပရက်ဆာ ကလပ် မီးကွိုင်ဆီသို့ သွားသော မီးလိုင်း (Load Out)',
        expectedReading: 'Relay ကပ်ချိန်တွင် 12V ရောက်မည်၊ လွတ်ချိန်တွင် 0V',
        testLightResult: '30 နှင့် 87 ခွထိုးပါက ကလပ် ချက်ချင်း ဒေါက်ခနဲ ကပ်ရမည်',
        failureSign: 'Jump ထိုးသော်လည်း မကပ်ပါက ကွန်ပရက်ဆာ ပလပ်ခေါင်းကြိုးပြတ် သို့မဟုတ် ကလပ်မီးကွိုင်လောင်နေခြင်း'
      },
      {
        pinLabel: 'Pin 86 (Coil IG Power)',
        pinRoleMy: 'သော့ဖွင့်ပါဝါ (Ignition Power / Key ON 12V)',
        expectedReading: 'သော့ ON ဖွင့်ချိန်တွင် 12V ရောက်ရမည်',
        testLightResult: 'သော့ဖွင့်လျှင် စမ်းသပ်မီး လင်းရမည်',
        failureSign: 'မီးမရောက်ပါက HTR/IG Fuse သို့မဟုတ် Ignition Switch ပျက်နေခြင်း'
      },
      {
        pinLabel: 'Pin 85 (ECU Ground Trigger)',
        pinRoleMy: 'Engine ECU မှ ကလပ်ကပ်ရန် ချပေးသော Ground Signal (A/C Cut Driver)',
        expectedReading: 'A/C ဖွင့်ချိန်တွင် 0V (Ground မိမည်)၊ ပိတ်ချိန်တွင် 12V',
        testLightResult: 'Test Light ကလစ်ကို 12V အပေါင်းတွင် ညှပ်ပြီး Pin 85 ထိုးပါက A/C ဖွင့်ချိန် မီးလင်းရမည်',
        failureSign: 'A/C ဖွင့်သော်လည်း Ground မကျပါက ECU က မီးဖြတ်ထားခြင်း (ဂတ်စ်မရှိခြင်း၊ ရေဆူနေခြင်း သို့မဟုတ် ECU ကွန်ပျူတာ ပျက်ခြင်း)'
      }
    ],
    stepByStepTracing: [
      'အဆင့် ၁ (ဖျူးစစ်): ဖျူးခုံကို ဖွင့်ပြီး A/C (10A သို့မဟုတ် 15A) Fuse ကို စမ်းသပ်မီးဖြင့် ခေါင်းနှစ်ဖက်စလုံး ထိုးစစ်ပါ။',
      'အဆင့် ၂ (Relay ခွထိုး): Relay ကို ဖြုတ်လိုက်ပြီး အပေါက် Pin 30 နှင့် Pin 87 ကို ဝါယာကြိုးတိုဖြင့် Jump ခွထိုးကြည့်ပါ — ကလပ် "ဒေါက်" ခနဲ ကပ်သွားပါက (Relay မှ ကွန်ပရက်ဆာအထိ ဝါယာနှင့် မီးကွိုင် ကောင်းမွန်ကြောင်း ၁၀၀% သေချာသည်)။',
      'အဆင့် ၃ (IG မီးစစ်): သော့ဖွင့်ပြီး Pin 86 တွင် 12V မီးရောက်/မရောက် စမ်းသပ်မီးဖြင့် ထိုးစစ်ပါ။',
      'အဆင့် ၄ (ECU Signal စစ်): ကားစက်နှိုးပြီး A/C ခလုတ်ဖွင့်ကာ Pin 85 ကို စစ်ပါ — ECU က Ground ချပေးခြင်း ရှိ/မရှိ စစ်ဆေးပါ။'
    ],
    quickBypassTest: 'Relay အပေါက် Pin 30 နှင့် Pin 87 ကို Jump ခွထိုးလိုက်ပါ — ကလပ် ချက်ချင်း ကပ်ပြီး အဲကွန်းအေးသွားပါက ကွန်ပရက်ဆာ၊ ဂတ်စ်နှင့် ပိုက်လိုင်း အကုန်ကောင်းပြီး Relay မကောင်းခြင်း သို့မဟုတ် ECU Trigger မီးလိုင်းပျက်နေခြင်း ဖြစ်သည်။',
    commonFailurePoint: 'Relay အတွင်းပိုင်း Contact အမှတ် မီးလောင်စားသွားခြင်း သို့မဟုတ် Pin 85 ECU Ground မချပေးနိုင်ခြင်း။',
    proButcherTip: '🥩 ဆရာ့စကားတော်: "ဟေ့ကောင်... Relay ဖြုတ်၊ ၃၀ နဲ့ ၈၇ ကို Jump ခွထိုး၊ အမဲအရင်ဖြတ်စမ်း!" — ခွထိုးလိုက်တာနဲ့ ကလပ် ဒေါက်ခနဲ ကပ်သွားရင် ကွန်ပရက်ဆာနဲ့ မီးကွိုင် ကောင်းနေပြီ၊ ၁၀ စက္ကန့်အတွင်း အမဲဖြတ် အဖြေပေါ်သည်!'
  },
  {
    id: 'circuit_pressure_sensor',
    titleMy: '၂။ A/C Pressure Sensor ၃ ကြိုး မီးလိုင်း လိုက်နည်း (ဖိအားဆန်ဆာ စစ်နည်း)',
    titleEn: '3-Wire A/C Pressure Transducer Voltage Tracing',
    circuitCategory: 'pressure_sensor',
    symptomMy: 'ဂတ်စ်အပြည့် ရှိနေသော်လည်း ကွန်ပရက်ဆာ မကပ်ခြင်း သို့မဟုတ် Condenser ပန်ကာ စက်နှိုးသည်နှင့် High Speed အော်လည်နေခြင်း။',
    toolsNeeded: ['Digital Multimeter (DC Volts)', 'Needle Probe (အပ်ထိုးတံ)', '1.5V ဓာတ်ခဲ သို့မဟုတ် 2.2 kΩ Resistor'],
    pins: [
      {
        pinLabel: 'Pin 1 (VC / 5V Reference)',
        pinRoleMy: 'ECU မှ ပေးပို့သော တည်ငြိမ် 5 ဗို့ ပါဝါလိုင်း',
        expectedReading: '4.8V ~ 5.1V DC တိကျစွာ ရှိရမည်',
        testLightResult: 'စမ်းသပ်မီး မထိုးရပါ! (ECU ရှော့ခ်ဖြစ်မည်) မီတာဖြင့်သာ တိုင်းရမည်',
        failureSign: '0V ဖြစ်နေပါက ဝါယာပြတ်နေခြင်း သို့မဟုတ် ECU အတွင်းပိုင်း 5V Regulator ပျက်နေခြင်း'
      },
      {
        pinLabel: 'Pin 2 (E2 / Sensor Ground)',
        pinRoleMy: 'ECU သီးသန့် အာရုံခံ ဂရောင်းလိုင်း (Sensor Ground)',
        expectedReading: 'Ground မိနေရမည် (Resistance < 1.0 Ohm)',
        testLightResult: 'မီတာ Ohm ဖြင့် အင်ဂျင်ဘော်ဒီနှင့် တိုင်းပါက 0.2 Ohm ရှိရမည်',
        failureSign: 'ဂရောင်းမမိပါက ဆန်ဆာသည် ဗို့အား အလွန်အမင်း မြင့်တက်ပြပြီး ECU က ပန်ကာကို အော်လည်စေမည်'
      },
      {
        pinLabel: 'Pin 3 (PRE / Signal Output)',
        pinRoleMy: 'ဂတ်စ်ဖိအားအလိုက် ECU ဆီသို့ ပြန်ပို့ပေးသော ဗို့အား အချက်ပြလိုင်း',
        expectedReading: 'ပုံမှန်ရပ်ထားချိန် (100 PSI) တွင် 1.2V ~ 1.5V ၊ အဲကွန်းလည်ချိန် (200 PSI) တွင် 1.6V ~ 2.0V',
        testLightResult: 'မီတာ DCV ထားပြီး အပ်ထိုးတံဖြင့် နောက်ကျောမှ ထိုးတိုင်းရမည်',
        failureSign: '0.4V အောက် (ဂတ်စ်မရှိဟု ထင်၍ ဖြတ်မည်) သို့မဟုတ် 4.6V ကျော် (ပိုက်ပေါက်မည်စိုး၍ ဖြတ်မည်)'
      }
    ],
    stepByStepTracing: [
      'အဆင့် ၁: ပလပ်ကို ဖြုတ်ပြီး သော့ ON ထားကာ Pin 1 တွင် 5.0V ရောက်/မရောက် တိုင်းပါ။',
      'အဆင့် ၂: Pin 2 နှင့် ဘက်ထရီ အနှုတ်ငုတ်ကြား Continuity (Ohm) တိုင်းပါ — 0.5 Ohm အောက် ရောက်ရမည်။',
      'အဆင့် ၃: ပလပ်ပြန်တပ်ပြီး အပ်ထိုးတံ (Back-probe) ဖြင့် Pin 3 Signal ကြိုးကို တိုင်းပါ — ကားအင်ဂျင်သေထားစဉ် 1.2V ဝန်းကျင် ရှိရမည်။',
      'အဆင့် ၄: အကယ်၍ 5V နှင့် Ground မှန်ကန်သော်လည်း Signal ကြိုးတွင် 0V သို့မဟုတ် 4.9V ထွက်နေပါက A/C Pressure Sensor ပျက်စီးနေပြီ ဖြစ်သည်။'
    ],
    quickBypassTest: 'Sensor ပျက်မပျက် စမ်းသပ်ရန် Signal ကြိုး Pin 3 ထဲသို့ 1.5V ဓာတ်ခဲလေးဖြင့် 1.5V ထိုးကျွေးကြည့်ပါ — ကွန်ပရက်ဆာ ဒေါက်ခနဲ ချက်ချင်း ကပ်သွားပါက ဆန်ဆာ အသေအချာ ပျက်နေခြင်း ဖြစ်သည်။',
    commonFailurePoint: 'ရှေ့ Condenser အနီးရှိ ပလပ်ခေါင်းအတွင်း ရေဝင် သံချေးတက်ကာ 5V ကြိုးနှင့် Signal ကြိုး ပူးရှော့ခ်ဖြစ်ခြင်း။',
    proButcherTip: 'ပန်ကာ အသေအော်လည်နေပြီး အဲကွန်းမကပ်ပါက Scanner ထိုးစရာမလိုဘဲ Pressure Sensor 3 ကြိုးကို အရင်ပြေးတိုင်းပါ!'
  },
  {
    id: 'circuit_evap_thermistor',
    titleMy: '၃။ Evaporator Thermistor (ကွိုင်အေးဆန်ဆာ) ဝါယာလိုင်း စစ်ဆေးနည်း',
    titleEn: 'Evaporator Temperature Sensor Resistance & Circuit Test',
    circuitCategory: 'thermistor',
    symptomMy: 'အဲကွန်း စဖွင့်ချင်း အလွန်အေးပြီး ၁၅ မိနစ်ခန့် မောင်းပြီးပါက လေလုံးဝ မထွက်တော့ခြင်း (ရေခဲပိတ်) သို့မဟုတ် ကွန်ပရက်ဆာ လုံးဝ မကပ်တော့ခြင်း။',
    toolsNeeded: ['Digital Multimeter (Resistance / Ohm)', '2.2 kΩ Resistor (စမ်းသပ်ရန်)'],
    pins: [
      {
        pinLabel: 'Pin 1 (Sensor In / 5V Pull-up)',
        pinRoleMy: 'A/C Amplifier သို့မဟုတ် ECU မှ 5V Pull-up ဗို့အားလိုင်း',
        expectedReading: 'ပလပ်ဖြုတ်ထားစဉ် 5V ရောက်မည်၊ ပလပ်တပ်ထားစဉ် 2.5V ဝန်းကျင်',
        testLightResult: 'မီတာဖြင့်သာ တိုင်းရမည်',
        failureSign: '0V ဖြစ်နေပါက A/C Amplifier ကွန်ပျူတာနှင့် ကြိုးပြတ်နေခြင်း'
      },
      {
        pinLabel: 'Pin 2 (Sensor Ground E2)',
        pinRoleMy: 'အာရုံခံ ဂရောင်းလိုင်း',
        expectedReading: 'Ground 0 Ohm',
        testLightResult: 'Continuity စစ်ပါက တီခနဲ အသံမြည်ရမည်',
        failureSign: 'Ground မမိပါက ဆန်ဆာ တန်ဖိုး မဖတ်နိုင်တော့ပါ'
      }
    ],
    stepByStepTracing: [
      'အဆင့် ၁: ဒက်ရှ်ဘုတ်အောက်ရှိ ကွိုင်အေးဆန်ဆာ ၂ ကြိုး ပလပ်ကို ဖြုတ်ပါ။',
      'အဆင့် ၂: မီတာကို Ohm (20kΩ) တွင်ထားပြီး ဆန်ဆာငုတ် ၂ ချောင်းကို တိုင်းပါ — အခန်းအပူချိန် 25°C တွင် 1.8 kΩ ~ 2.2 kΩ ရှိရမည်။',
      'အဆင့် ၃: ဆန်ဆာသည် အပူချိန် အေးလာပါက Ohm တက်လာရမည် (ဥပမာ ရေခဲရေထဲ ထည့်ပါက 5 kΩ အထိ တက်ရမည်)။',
      'အဆင့် ၄: အကယ်၍ Ohm တိုင်းရာတွင် 0 Ohm (ရှော့ခ်) သို့မဟုတ် Infinite (ပြတ်နေခြင်း) ဖြစ်ပါက ဆန်ဆာ ပျက်နေပြီ ဖြစ်သည်။'
    ],
    quickBypassTest: 'ကားထဲတွင် ကွိုင်အေးဆန်ဆာ ပျက်မပျက် စမ်းသပ်လိုပါက ပလပ်ခေါင်းထဲသို့ 2.2 kΩ Resistor လေး ထိုးတပ်ပေးလိုက်ပါ (ဒါဆိုရင် ECU က အပူချိန် 25°C ဟု ထင်သွားပြီး ကွန်ပရက်ဆာကို ချက်ချင်း ကပ်ပေးပါလိမ့်မည်)။',
    commonFailurePoint: 'ဆန်ဆာဝါယာကြိုး ကြွက်ကိုက်ခြင်း သို့မဟုတ် ကွိုင်အေး ရေငွေ့ကြောင့် ဆန်ဆာ ထိပ်ဖူး သံချေးဆွေးမြည့်ခြင်း။',
    proButcherTip: 'ရေခဲခဏခဏပိတ်ပြီး လေမထွက်တော့ပါက ဂတ်စ်မစစ်ပါနှင့်၊ ဤကွိုင်အေးဆန်ဆာ ထိပ်ဖူး ကွိုင်ပြားကြားက ပြုတ်ကျနေခြင်း သို့မဟုတ် ဆန်ဆာ မဖြတ်တော့ခြင်း ဖြစ်သည်။'
  },
  {
    id: 'circuit_blower_resistor',
    titleMy: '၄။ Blower Motor Resistor & Fan Switch လိုင်းလိုက်နည်း (ပန်ကာလေအား မလည်သော ရောဂါ)',
    titleEn: 'HVAC Blower Motor & Resistor Circuit Tracing',
    circuitCategory: 'blower_resistor',
    symptomMy: 'လေအား Speed 1, 2, 3 တွင် လုံးဝမလည်ဘဲ အမြင့်ဆုံး Speed 4 တစ်ခုတည်းတွင်သာ လည်ခြင်း သို့မဟုတ် လုံးဝ မလည်ခြင်း။',
    toolsNeeded: ['12V Test Light', 'Multimeter'],
    pins: [
      {
        pinLabel: 'Blower Motor + (Power)',
        pinRoleMy: '40A HTR Fuse နှင့် Blower Relay မှ လာသော အမြဲတမ်း မီးကြီး',
        expectedReading: 'သော့ ON ဖွင့်ချိန်တွင် 12V အပြည့်ရှိရမည်',
        testLightResult: 'စမ်းသပ်မီး အားပြင်းစွာ လင်းရမည်',
        failureSign: 'မီးမလင်းပါက Blower Relay သို့မဟုတ် 40A Fuse ပြတ်နေခြင်း'
      },
      {
        pinLabel: 'Blower Motor - (Ground Control)',
        pinRoleMy: 'Resistor နှင့် Switch မှတစ်ဆင့် Ground ချပေးသောလိုင်း',
        expectedReading: 'Speed 1 တွင် 4V~5V, Speed 4 တွင် 12V Ground အပြည့်ကျမည်',
        testLightResult: 'Speed အလိုက် မီးလင်းအား ပြောင်းလဲရမည်',
        failureSign: 'Ground လုံးဝ မကျပါက Switch သို့မဟုတ် Resistor ပျက်ခြင်း'
      }
    ],
    stepByStepTracing: [
      'အဆင့် ၁: လေအား Speed 1, 2, 3 မလည်ဘဲ Speed 4 သာ လည်ပါက ၁၀၀% သေချာသည် — Blower Resistor (အပူခံ ရီစစ်စတာကွက်) ထဲရှိ Thermal Fuse ပြတ်သွားခြင်း ဖြစ်သည်။',
      'အဆင့် ၂: Blower မော်တာ လုံးဝ မလည်ပါက မော်တာ ပလပ်ကို ဖြုတ်ပြီး စမ်းသပ်မီး ထိုးပါ — 12V ရောက်ပါက မော်တာ ကာဗွန်ဘရက်ရှ် (Carbon Brush) ကုန်နေခြင်း ဖြစ်သည်။',
      'အဆင့် ၃: 12V မရောက်ပါက ဖျူးခုံရှိ 40A Blower Fuse နှင့် Blower Relay ခြေထောက် 30/87 ကို လိုက်စစ်ပါ။'
    ],
    quickBypassTest: 'Blower Motor အနှုတ်ငုတ်ကို ကားဘော်ဒီ Ground သို့ တိုက်ရိုက် ဝါယာဖြင့် ချကြည့်ပါ — မော်တာ အမြင့်ဆုံး လည်သွားပါက မော်တာကောင်းပြီး Resistor/Switch မီးလိုင်း ပျက်နေခြင်း ဖြစ်သည်။',
    commonFailurePoint: 'လေစစ် (Cabin Filter) ပိတ်ဆို့သဖြင့် လေမထွက်နိုင်ဘဲ အပူလွန်ကဲကာ Blower Resistor အပူခံဖျူး ပြတ်ကျသွားခြင်း။',
    proButcherTip: 'Resistor အသစ်မလဲမီ Cabin Air Filter လေစစ်ကို အရင် သန့်ရှင်းရေးလုပ်ပါ၊ မဟုတ်ပါက Resistor အသစ်သည် ၃ ရက်အတွင်း ပြန်လောင်ပါလိမ့်မည်။'
  },
  {
    id: 'circuit_clutchless_valve',
    titleMy: '၅။ Clutchless Electronic Control Valve (ECV) မီးလိုင်း စစ်ဆေးနည်း',
    titleEn: 'Clutchless Variable Compressor PWM Solenoid Tracing',
    circuitCategory: 'clutchless_valve',
    symptomMy: 'ခေတ်ပေါ်ကားများ (Vios, Camry, Alphard, European Cars) တွင် ကလပ်မပါဘဲ ပူလီအမြဲလည်နေသော်လည်း အဲကွန်း လုံးဝမအေးခြင်း။',
    toolsNeeded: ['Multimeter (Hz / Duty %)', '12V 21W Test Bulb (မီးသီးအသေး)', 'Oscilloscope (ရှိပါက)'],
    pins: [
      {
        pinLabel: 'Pin 1 (12V Power Supply)',
        pinRoleMy: 'IG Power မှ လာသော 12V ပါဝါ',
        expectedReading: '12V DC',
        testLightResult: 'စမ်းသပ်မီး လင်းရမည်',
        failureSign: 'မီးမရောက်ပါက Fuse ပြတ်နေခြင်း'
      },
      {
        pinLabel: 'Pin 2 (ECU PWM Duty Control)',
        pinRoleMy: 'A/C Amplifier မှ ပေးပို့သော PWM 400Hz Duty Cycle (0% မှ 100%)',
        expectedReading: 'မအေးချိန် 0% Duty, အအေးဆုံးဖွင့်ချိန် 70% ~ 100% Duty Cycle',
        testLightResult: '12V 21W မီးသီး ချိတ်ပါက အဲကွန်း အအေးဆုံးထားချိန် မီးသီး အလင်းအား အပြည့်လင်းရမည်',
        failureSign: 'မီးလုံးဝ မလင်းပါက ECU က Control Signal မလွှတ်ပေးခြင်း'
      }
    ],
    stepByStepTracing: [
      'အဆင့် ၁: ကွန်ပရက်ဆာ နောက်ကျောရှိ ၂ ကြိုး Solenoid Valve ပလပ်ကို ဖြုတ်ပါ။',
      'အဆင့် ၂: Valve ၏ Resistance ကို Ohm တိုင်းပါ — 10.5 Ohm မှ 13.5 Ohm အတွင်း ရှိရမည်။ (Open Loop ပြတ်နေပါက Valve လဲရမည်)။',
      'အဆင့် ၃: ပလပ်ခေါင်းတွင် 12V 21W မီးသီးလေး ချိတ်ပြီး စက်နှိုးကာ အဲကွန်းဖွင့်ပါ — မီးသီး လင်းလာပါက ဝါယာရိန်းနှင့် ECU ၁၀၀% ကောင်းမွန်ပြီး Valve အထဲ စက်ပိုင်းဆိုင်ရာ ပိတ်ဆို့နေခြင်း ဖြစ်သည်။'
    ],
    quickBypassTest: '12V ဘက်ထရီမှ တိုက်ရိုက် မီးနှင့် Ground ကို Control Valve ငုတ် ၂ ချောင်းသို့ ၂ စက္ကန့်ခန့် ထိစမ်းကြည့်ပါ — "တခလစ်" ခနဲ Valve ပွင့်သံ ကြားရမည်။ အသံမကြားရပါက Valve ကပ်နေပြီ ဖြစ်သည်။',
    commonFailurePoint: 'ဆာလင်နွိုက်ဘား အပ်ချောင်းလေးတွင် သံမှုန့်နှင့် အညစ်အကြေး ကပ်ညပ်ပြီး မရွေ့လျားနိုင်တော့ခြင်း။',
    proButcherTip: 'ကွန်ပရက်ဆာ တစ်လုံးလုံး အသစ်မလဲပါနှင့်! ဤ ၂ ကြိုး Control Valve လေးကိုသာ Snap-ring ဖြုတ်၍ သီးသန့် အသစ်လဲပေးလိုက်ရုံဖြင့် အလွန်သက်သာစွာ ပြီးစီးပါသည်။'
  }
];


