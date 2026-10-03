export type LightSeverity = 'red' | 'yellow' | 'green' | 'blue';

export type DashboardLightCategory =
  | 'engine'
  | 'brake'
  | 'electrical'
  | 'safety'
  | 'lighting'
  | 'chassis_4wd';

export interface DashboardLightItem {
  id: string;
  symbolKey: string;
  nameMy: string;
  nameEn: string;
  category: DashboardLightCategory;
  categoryLabelMy: string;
  severity: LightSeverity;
  severityLabelMy: string;
  canDrive: 'လုံးဝ ဆက်မမောင်းရ (Stop Immediately)' | 'သတိထား မောင်းနိုင် (Drive with caution to shop)' | 'ပုံမှန် မောင်းနိုင် (Normal operation)';
  causes: string[];
  diagnosticCheck: string;
  symptoms: string;
  manufacturerNotes?: string;
}

export const DASHBOARD_LIGHTS_DATA: DashboardLightItem[] = [
  // ================= 1. ENGINE & POWERTRAIN (၁၄ မျိုး) =================
  {
    id: 'oil-pressure-red',
    symbolKey: 'oil-pressure',
    nameMy: 'အင်ဂျင်ဝိုင်ဖိအား မီးနီ (ဆီကရားနီ)',
    nameEn: 'Engine Oil Pressure Warning',
    category: 'engine',
    categoryLabelMy: 'အင်ဂျင် & ဆီပေးစနစ်',
    severity: 'red',
    severityLabelMy: '🔴 အနီရောင် (စက်ချက်ချင်းရပ်ရန်)',
    canDrive: 'လုံးဝ ဆက်မမောင်းရ (Stop Immediately)',
    causes: [
      'အင်ဂျင်ဝိုင် လျော့နည်းလွန်းခြင်း သို့မဟုတ် ခန်းခြောက်သွားခြင်း',
      'အင်ဂျင်ဝိုင်ပန့် (Oil Pump) ဂျမ်းဖြစ်ခြင်း သို့မဟုတ် ဒလက်ကျိုးခြင်း',
      'ဆီစစ်ဘူး (Oil Filter) ပိတ်ဆို့နေခြင်း သို့မဟုတ် Relief Valve ပွင့်နေခြင်း',
      'မိန်းဘယ်ရင်/ကွန်ရော့ဘယ်ရင်များ အလွန်ပွန်းစား၍ ဆီဖိအား ထိုးကျသွားခြင်း'
    ],
    diagnosticCheck: 'အင်ဂျင်ဝိုင်တိုင်းတံဖြင့် ဆီအဆင့် စစ်ဆေးပါ။ ဆီအပြည့်ရှိပါက ဆီပေါင်ခလုတ်ဖြုတ်၍ Mechanical Oil Pressure Gauge နာရီထိုးပါ။ စလိုးတွင် အနည်းဆုံး 15~25 PSI မရှိပါက အင်ဂျင်ဝိုင်ပန့် စစ်ဆေးရမည်။',
    symptoms: 'အင်ဂျင်အတွင်းမှ "တက်တက်" ဟု ဘယ်ရင်ရိုက်သံများ ထွက်ပေါ်လာပြီး စက္ကန့်ပိုင်းအတွင်း အင်ဂျင် ဂျမ်းဖြစ်ကာ ကွဲထွက်သွားနိုင်သည်။',
    manufacturerNotes: 'တိုယိုတာ၊ ဟွန်ဒါနှင့် ဥရောပကားတိုင်းတွင် ဤမီးနီလင်းပါက စက္ကန့် ၃၀ အတွင်း စက်သတ်ရမည်။'
  },
  {
    id: 'oil-level-low',
    symbolKey: 'oil-level-low',
    nameMy: 'အင်ဂျင်ဝိုင်အဆင့် နိမ့်ကျ မီးဝါ (ဆီကရားနှင့် လှိုင်းတွန့်)',
    nameEn: 'Engine Oil Level Low Warning',
    category: 'engine',
    categoryLabelMy: 'အင်ဂျင် & ဆီပေးစနစ်',
    severity: 'yellow',
    severityLabelMy: '🟡 အဝါရောင် (အမြန်ဆုံး စစ်ဆေးရန်)',
    canDrive: 'သတိထား မောင်းနိုင် (Drive with caution to shop)',
    causes: [
      'အင်ဂျင်ဝိုင် လျော့နည်းနေပြီး တိုင်းတံ၏ အောက်မှတ် (MIN) အောက်သို့ ရောက်ရှိနေခြင်း',
      'အင်ဂျင်ဝိုင်ဖလားအောက်ခြေရှိ Oil Level Sensor ချို့ယွင်းခြင်း'
    ],
    diagnosticCheck: 'အင်ဂျင်အေးချိန်တွင် တိုင်းတံဆွဲစစ်ပြီး သတ်မှတ်အင်ဂျင်ဝိုင် ၁ လီတာခန့် ဖြည့်စွက်ပေးပါ။ မီးငြိမ်းသွားပါမည်။',
    symptoms: 'ဆီဆက်မထည့်ပါက မကြာမီ ဆီကရားနီ (ဆီပေါင်ကျမီး) လင်းလာမည်။'
  },
  {
    id: 'coolant-temp-red',
    symbolKey: 'coolant-temp-red',
    nameMy: 'အင်ဂျင်ရေဆူ အပူလွန်ကဲ မီးနီ (သာမိုမီတာရေနွေးနီ)',
    nameEn: 'Engine Coolant High Temperature Warning',
    category: 'engine',
    categoryLabelMy: 'အင်ဂျင် & ဆီပေးစနစ်',
    severity: 'red',
    severityLabelMy: '🔴 အနီရောင် (စက်ချက်ချင်းရပ်ရန်)',
    canDrive: 'လုံးဝ ဆက်မမောင်းရ (Stop Immediately)',
    causes: [
      'ရေတိုင်ကီ ရေယိုစိမ့်၍ ရေခန်းခြောက်သွားခြင်း',
      'ရေတိုင်ကီပန်ကာ (Radiator Fan Motor / Relay) မလည်တော့ခြင်း',
      'ရေအပူထိန်းဗား (Thermostat) ပိတ်၍ ဂျမ်းဖြစ်နေသဖြင့် ရေမလည်ပတ်နိုင်ခြင်း',
      'ရေပန့် (Water Pump) ဒလက်ကျိုးခြင်း သို့မဟုတ် ဆလင်ဒါခေါင်းဂတ်စကတ် ပေါက်ပြဲခြင်း'
    ],
    diagnosticCheck: 'ကားကို လမ်းဘေးချပြီး စက်ချက်ချင်းသတ်ပါ။ ရေတိုင်ကီအဖုံးကို အပူချိန်မကျမချင်း လုံးဝ မဖွင့်ရပါ။ ပန်ကာလည်မလည်နှင့် ရေပိုက်များ တောင့်တင်းနေသလား စစ်ဆေးပါ။',
    symptoms: 'အင်ဂျင်ခန်းထဲမှ ရေနွေးငွေ့များ ပန်းထွက်ခြင်း၊ ဆီချေးနံ့နံခြင်း၊ ဆလင်ဒါခေါင်း ကွေးညွတ်သွားနိုင်ခြင်း။'
  },
  {
    id: 'coolant-cold-blue',
    symbolKey: 'coolant-cold-blue',
    nameMy: 'အင်ဂျင်ရေအေး မီးပြာ (Cold Coolant)',
    nameEn: 'Low Coolant Temperature Indicator',
    category: 'engine',
    categoryLabelMy: 'အင်ဂျင် & ဆီပေးစနစ်',
    severity: 'blue',
    severityLabelMy: '🔵 အပြာရောင် (အသိပေးချက်)',
    canDrive: 'ပုံမှန် မောင်းနိုင် (Normal operation)',
    causes: [
      'မနက်ပိုင်း စက်စနှိုးချိန်တွင် အင်ဂျင်ရေ အပူချိန်သည် 55°C အောက် အေးနေသေးကြောင်း ပြသခြင်း'
    ],
    diagnosticCheck: 'အင်ဂျင် အပူချိန် 60°C ကျော်တက်လာပါက ဤမီးပြာ အလိုအလျောက် ငြိမ်းသွားမည်။ မီးပြာလင်းနေစဉ် အင်ဂျင်ကို အလွန်အကျွံ လီဗာဆောင့်နင်းခြင်း မပြုသင့်ပါ။',
    symptoms: 'အင်ဂျင်ပူလာသော်လည်း မီးပြာ အမြဲလင်းနေပါက Thermostat ပွင့်လျက် ဂျမ်းဖြစ်နေခြင်း ဖြစ်သည်။'
  },
  {
    id: 'check-engine-yellow',
    symbolKey: 'check-engine',
    nameMy: 'ချက်အင်ဂျင်မီးဝါ (Check Engine / MIL)',
    nameEn: 'Check Engine / Malfunction Indicator Lamp',
    category: 'engine',
    categoryLabelMy: 'အင်ဂျင် & ဆီပေးစနစ်',
    severity: 'yellow',
    severityLabelMy: '🟡 အဝါရောင် (အမြန်ဆုံး စစ်ဆေးရန်)',
    canDrive: 'သတိထား မောင်းနိုင် (Drive with caution to shop)',
    causes: [
      'ဆန်ဆာတစ်ခုခု (O2, MAF, MAP, CKP, CMP, Knock) အချက်ပြလိုင်း ချို့ယွင်းခြင်း',
      'မီးကွိုင်မီးလွတ်ခြင်း (Engine Misfire) သို့မဟုတ် ကာတလစ်ဆီမီးခိုးအိုး ပိတ်ခြင်း',
      'EVAP ဆီငွေ့စနစ် ယိုစိမ့်ခြင်း သို့မဟုတ် ဆီတိုင်ကီအဖုံး မလုံခြင်း'
    ],
    diagnosticCheck: 'OBD2 စကင်နာ ထိုးပြီး DTC ကုဒ် (ဥပမာ P0300, P0171, P0420) ဖတ်ရှုပါ။ မီးငြိမ်နေပါက မောင်းနိုင်သော်လည်း၊ မီးတဖျတ်ဖျတ် ခတ်နေပါက ကာတလစ်ဆီ ပျက်စီးနိုင်သဖြင့် စက်ရပ်ရမည်။',
    symptoms: 'ကားဆွဲအား ကျဆင်းခြင်း၊ ဆီစားများခြင်း၊ စလိုးမငြိမ်ဘဲ တုန်ခါခြင်း။'
  },
  {
    id: 'etc-throttle-light',
    symbolKey: 'etc',
    nameMy: 'လျှပ်စစ်လေတံခါး မီးဝါ (ETC / Electronic Throttle Control)',
    nameEn: 'Electronic Throttle Control (ETC) Light',
    category: 'engine',
    categoryLabelMy: 'အင်ဂျင် & ဆီပေးစနစ်',
    severity: 'yellow',
    severityLabelMy: '🟡 အဝါရောင် (အမြန်ဆုံး စစ်ဆေးရန်)',
    canDrive: 'သတိထား မောင်းနိုင် (Drive with caution to shop)',
    causes: [
      'အီလက်ထရောနစ် လေတံခါး မော်တာ (Electronic Throttle Body) ဂျမ်းဖြစ်ခြင်း',
      'လီဗာခြေနင်းပြားဆန်ဆာ (APP Sensor) သို့မဟုတ် TPS ဆန်ဆာ ဗို့အားလွဲမှားခြင်း'
    ],
    diagnosticCheck: 'Throttle Body ကာဗွန်ဂျီး ဆေးကြောပြီး Throttle Re-learn Calibration ပြန်လုပ်ပါ။ APP ခြေနင်းဆန်ဆာ ၅ ဗို့ မီးလိုင်းများ စစ်ပါ။',
    symptoms: 'လီဗာနင်းသော်လည်း ကားမပြေးဘဲ အရှိန် 20 km/h ဖြင့်သာ သွားနိုင်သော Limp Mode (လိပ်မုဒ်) ဖြစ်သွားသည်။'
  },
  {
    id: 'glow-plug-light',
    symbolKey: 'glow-plug',
    nameMy: 'ဒီဇယ်မီးတိုင် မီးဝါ (Glow Plug - စပရင်ကွေး)',
    nameEn: 'Diesel Glow Plug Indicator',
    category: 'engine',
    categoryLabelMy: 'အင်ဂျင် & ဆီပေးစနစ်',
    severity: 'yellow',
    severityLabelMy: '🟡 အဝါရောင် (အမြန်ဆုံး စစ်ဆေးရန်)',
    canDrive: 'ပုံမှန် မောင်းနိုင် (Normal operation)',
    causes: [
      'မနက်စောစော စက်စနှိုးချိန်တွင် မီးတိုင်ချောင်းငယ်များ (Glow Plugs) ပူနွေးနေဆဲဖြစ်ကြောင်း ပြသခြင်း',
      'မီးသီးတဖျတ်ဖျတ် လင်းနေပါက မီးတိုင်ကွိုင်ပြတ်နေခြင်း သို့မဟုတ် Glow Plug Relay ချို့ယွင်းနေခြင်း'
    ],
    diagnosticCheck: 'သော့ ON ထားစဉ် ဤမီးသီး ငြိမ်းသွားမှသာ စက်နှိုးရမည်။ မီးမငြိမ်းပါက မီးတိုင်ချောင်းတစ်ခုချင်းစီ၏ အုမ်း (Resistance 0.6~1.5Ω) တိုင်းစစ်ပါ။',
    symptoms: 'မီးတိုင်ပျက်နေပါက ဆောင်းတွင်း မနက်ပိုင်းတွင် စက်နှိုးရ အလွန်ခက်ခဲပြီး မီးခိုးဖြူများ ထွက်မည်။'
  },
  {
    id: 'dpf-soot-yellow',
    symbolKey: 'dpf',
    nameMy: 'ဒီဇယ်မီးခိုးအိုး မီးဝါ (DPF Filter)',
    nameEn: 'Diesel Particulate Filter (DPF) Warning',
    category: 'engine',
    categoryLabelMy: 'အင်ဂျင် & ဆီပေးစနစ်',
    severity: 'yellow',
    severityLabelMy: '🟡 အဝါရောင် (အမြန်ဆုံး စစ်ဆေးရန်)',
    canDrive: 'သတိထား မောင်းနိုင် (Drive with caution to shop)',
    causes: [
      'မြို့တွင်း အမြန်နှုန်းနိမ့်နိမ့်ဖြင့်သာ ခဏခဏ မောင်းသဖြင့် DPF အိုး အလိုအလျောက် ဂျီးမချွတ်နိုင်ခြင်း',
      'ဒီဇယ်မီးခိုးအိုး ဖိအားကွာဟချက်ဆန်ဆာ (Differential Pressure Sensor) ပျက်စီးခြင်း'
    ],
    diagnosticCheck: 'မီးဝါလင်းလာပါက ကားကို အဝေးပြေးလမ်းမပေါ်တွင် အင်ဂျင်လည်နှုန်း 2,000~2,500 RPM ဖြင့် မိနစ် ၂၀ ခန့် အဆက်မပြတ် မောင်းပေးပါ (Regeneration အလိုအလျောက် ဂျီးချွတ်မည်)။',
    symptoms: 'ဂရုမစိုက်ဘဲ ဆက်ထားပါက မီးနီပြောင်းပြီး ကားဆွဲအား လုံးဝ ကျဆင်းကာ Limp Mode ဖြစ်သွားမည်။'
  },
  {
    id: 'water-in-fuel-light',
    symbolKey: 'water-in-fuel',
    nameMy: 'ဆီရေစစ်ဘူး မီးဝါ (ဒီဇယ်ဆီထဲ ရေပါခြင်း)',
    nameEn: 'Water in Fuel Filter Warning',
    category: 'engine',
    categoryLabelMy: 'အင်ဂျင် & ဆီပေးစနစ်',
    severity: 'yellow',
    severityLabelMy: '🟡 အဝါရောင် (အမြန်ဆုံး စစ်ဆေးရန်)',
    canDrive: 'သတိထား မောင်းနိုင် (Drive with caution to shop)',
    causes: [
      'ဒီဇယ်ဆီထဲတွင် ရေငွေ့နှင့် ရေစက်များ ပါလာပြီး ဆီစစ်ဘူးအောက်ခြေ ရေဖမ်းခွက်ထဲ ပြည့်လျှံလာခြင်း',
      'ဆီစစ်ဘူးအောက်ခြေ ရေဖမ်းဆန်ဆာ (Water Level Switch) က သတင်းပို့ခြင်း'
    ],
    diagnosticCheck: 'အင်ဂျင်ခန်းရှိ ဒီဇယ်ဆီစစ်ဘူး အောက်ခြေ ပလတ်စတစ် ပတ်လက်ခေါင်းကို လှည့်ဖွင့်ပြီး အောက်သို့ ရေများ ကုန်စင်အောင် ဖောက်ချပေးပါ။ ထို့နောက် ဆီပန့်ဘောလုံးကို ညှစ်၍ လေထုတ်ပါ။',
    symptoms: 'ရေမဖောက်ဘဲ ဆက်မောင်းပါက Common Rail ဆီပန့်ကြီးနှင့် အင်ဂျက်တာများ သံချေးတက်ကာ တစ်စီးလုံး ပျက်စီးမည်။'
  },
  {
    id: 'low-fuel-light',
    symbolKey: 'low-fuel',
    nameMy: 'ဆီကုန်တော့မည် သတိပေးမီးဝါ (Low Fuel Pump)',
    nameEn: 'Low Fuel Indicator Light',
    category: 'engine',
    categoryLabelMy: 'အင်ဂျင် & ဆီပေးစနစ်',
    severity: 'yellow',
    severityLabelMy: '🟡 အဝါရောင် (အမြန်ဆုံး စစ်ဆေးရန်)',
    canDrive: 'သတိထား မောင်းနိုင် (Drive with caution to shop)',
    causes: [
      'ဆီတိုင်ကီထဲတွင် ဆီလက်ကျန် ၅ လီတာမှ ၈ လီတာခန့်သာ ကျန်ရှိတော့ခြင်း'
    ],
    diagnosticCheck: 'အနီးဆုံး ဓာတ်ဆီဆိုင်သို့ ချက်ချင်း သွားရောက်ပြီး ဆီဖြည့်ပါ။ ဆီခန်းသည်အထိ မောင်းပါက ဆီပန့်မော်တာ အပူလွန်ကဲ၍ လောင်ကျွမ်းတတ်သည်။',
    symptoms: 'ဆီကုန်သွားပါက လမ်းခုလတ်တွင် စက်သေသွားမည်။'
  },
  {
    id: 'auto-start-stop-light',
    symbolKey: 'auto-start-stop',
    nameMy: 'အော်တို စက်သေစနစ် မီးဝါ (Auto Start-Stop A-OFF)',
    nameEn: 'Auto Start-Stop System Status Light',
    category: 'engine',
    categoryLabelMy: 'အင်ဂျင် & ဆီပေးစနစ်',
    severity: 'yellow',
    severityLabelMy: '🟡 အဝါရောင် (အမြန်ဆုံး စစ်ဆေးရန်)',
    canDrive: 'ပုံမှန် မောင်းနိုင် (Normal operation)',
    causes: [
      'ယာဉ်မောင်းသူက A-OFF ခလုတ်နှိပ်၍ စက်သေစနစ်ကို ပိတ်ထားခြင်း',
      'ကားဘက်ထရီအားနည်းနေခြင်း သို့မဟုတ် အဲကွန်းအအေး မပြည့်သေး၍ စနစ်က အလိုအလျောက် ပိတ်ထားခြင်း'
    ],
    diagnosticCheck: 'ဘက်ထရီအား (SOC) 75% ကျော်ရှိမရှိ စစ်ဆေးပါ။ ပုံမှန် မောင်းနှင်နိုင်သည်။',
    symptoms: 'မီးပွိုင့်တွင် ရပ်သော်လည်း စက်အလိုအလျောက် မသေတော့ပါ။'
  },

  // ================= 2. BRAKE & STABILITY (၁၀ မျိုး) =================
  {
    id: 'handbrake-red',
    symbolKey: 'handbrake',
    nameMy: 'လက်ဘရိတ် / ပါကင်ဘရိတ် မီးနီ ((P))',
    nameEn: 'Parking Brake Indicator Light',
    category: 'brake',
    categoryLabelMy: 'ဘရိတ် & လျှောချော်မှုထိန်း',
    severity: 'red',
    severityLabelMy: '🔴 အနီရောင် (စက်ချက်ချင်းရပ်ရန်)',
    canDrive: 'လုံးဝ ဆက်မမောင်းရ (Stop Immediately)',
    causes: [
      'လက်ဘရိတ် (Handbrake) မလွှတ်ဘဲ မောင်းနှင်နေခြင်း',
      'လက်ဘရိတ်ခလုတ်ကြိုး (Handbrake Switch) ချောင်နေခြင်း သို့မဟုတ် ဂရောင်းရှော့ကျနေခြင်း'
    ],
    diagnosticCheck: 'လက်ဘရိတ်ကို အောက်သို့ အဆုံးချပါ။ EPB လျှပ်စစ်လက်ဘရိတ်ဖြစ်ပါက ခလုတ်ကို အောက်သို့ ဖိချပါ။ မီးငြိမ်းရပါမည်။',
    symptoms: 'လက်ဘရိတ်မိလျက် မောင်းပါက နောက်ဘရိတ်ပြားများ မီးလောင်မည်းနက်ပြီး မီးခိုးများ ထွက်လာမည်။'
  },
  {
    id: 'brake-system-red',
    symbolKey: 'brake-system',
    nameMy: 'ဘရိတ်စနစ် ချို့ယွင်း မီးနီ ((!))',
    nameEn: 'Brake System Hydraulic Warning Light',
    category: 'brake',
    categoryLabelMy: 'ဘရိတ် & လျှောချော်မှုထိန်း',
    severity: 'red',
    severityLabelMy: '🔴 အနီရောင် (စက်ချက်ချင်းရပ်ရန်)',
    canDrive: 'လုံးဝ ဆက်မမောင်းရ (Stop Immediately)',
    causes: [
      'ဘရိတ်ဆီဘူးအတွင်း ဘရိတ်ဆီ အလွန်လျော့နည်းသွားခြင်း (ဘရိတ်ပိုက်ပေါက်ခြင်း သို့မဟုတ် ကာလီပါဆီယိုခြင်း)',
      'ဘရိတ်ဖိအားမြှင့်ပန့် (Brake Booster Vacuum) လေဟာနယ် မရှိတော့ခြင်း'
    ],
    diagnosticCheck: 'လက်ဘရိတ်လွှတ်ထားသော်လည်း ဤမီးနီ လင်းနေပါက ဘရိတ်ဆီဘူးကို အရင်ဖွင့်ကြည့်ပါ။ ဆီမရှိပါက ဘီး ၄ ဘီး ကာလီပါများနှင့် ရော်ဘာဘရိတ်ပိုက်များ ဆီယိုစိမ့်မှု စစ်ဆေးပါ။',
    symptoms: 'ဘရိတ်နင်းလိုက်ပါက ခြေထောက်အောက်တွင် ဘရိတ်နစ်ကျသွားခြင်း သို့မဟုတ် ဘရိတ်လုံးဝ မမိတော့ဘဲ တိုက်မိနိုင်ခြင်း။'
  },
  {
    id: 'abs-warning-yellow',
    symbolKey: 'abs',
    nameMy: 'အေဘီအက်စ် ဘရိတ်မီးဝါ ((ABS))',
    nameEn: 'Anti-lock Braking System (ABS) Warning',
    category: 'brake',
    categoryLabelMy: 'ဘရိတ် & လျှောချော်မှုထိန်း',
    severity: 'yellow',
    severityLabelMy: '🟡 အဝါရောင် (အမြန်ဆုံး စစ်ဆေးရန်)',
    canDrive: 'သတိထား မောင်းနိုင် (Drive with caution to shop)',
    causes: [
      'ဘီး ၄ ဘီးရှိ Wheel Speed Sensor ဝါယာကြိုး ပြတ်ခြင်း သို့မဟုတ် သံလိုက်ဘယ်ရင် ပျက်ခြင်း',
      'ABS Pump Motor သို့မဟုတ် ABS Relay ချို့ယွင်းခြင်း'
    ],
    diagnosticCheck: 'စကင်နာတွင် ABS Module ထဲ ဝင်ပြီး Wheel Speed Live Data ၄ ဘီးစလုံး လည်နှုန်းတူမတူ စစ်ဆေးပါ။ ဆန်ဆာကြိုး ပြတ်/ရှော့ စစ်ပါ။',
    symptoms: 'သာမန်ဘရိတ် မိသော်လည်း အရေးပေါ်ဘရိတ်နင်းချိန် ဘီးလော့ခ်ဖြစ်ပြီး ကားချော်ထွက်သွားနိုင်သည်။'
  },
  {
    id: 'brake-pad-wear-yellow',
    symbolKey: 'brake-pad-wear',
    nameMy: 'ဘရိတ်ပြားပါး မီးဝါ (Brake Pad Wear)',
    nameEn: 'Brake Pad Wear Warning Light',
    category: 'brake',
    categoryLabelMy: 'ဘရိတ် & လျှောချော်မှုထိန်း',
    severity: 'yellow',
    severityLabelMy: '🟡 အဝါရောင် (အမြန်ဆုံး စစ်ဆေးရန်)',
    canDrive: 'သတိထား မောင်းနိုင် (Drive with caution to shop)',
    causes: [
      'ရှေ့ သို့မဟုတ် နောက် ဘရိတ်ပြားများ အလွန်ပါးသွားပြီး အာရုံခံဝါယာကြိုး (Wear Sensor) နှင့် ဒစ်ပြား ထိတွေ့သွားခြင်း'
    ],
    diagnosticCheck: 'ဘီးဖြုတ်၍ ဘရိတ်ပြား အထူ စစ်ဆေးပါ။ 3mm အောက် ရောက်နေပါက ဘရိတ်ပြားအသစ်နှင့် ဝါယာဆန်ဆာ လဲလှယ်ပါ။',
    symptoms: 'ဘရိတ်နင်းချိန်တွင် သံချင်းပွတ်တိုက်သံ "ဂျီဂျီ" ဟု မြည်လာမည်။'
  },
  {
    id: 'traction-slip-yellow',
    symbolKey: 'traction-slip',
    nameMy: 'ကားလျှောချော်မှု မီးဝါ (Slip / VSC / ESP)',
    nameEn: 'Traction Slip / ESP Active Indicator',
    category: 'brake',
    categoryLabelMy: 'ဘရိတ် & လျှောချော်မှုထိန်း',
    severity: 'yellow',
    severityLabelMy: '🟡 အဝါရောင် (အမြန်ဆုံး စစ်ဆေးရန်)',
    canDrive: 'သတိထား မောင်းနိုင် (Drive with caution to shop)',
    causes: [
      'ဘီးချော်ထွက်နေချိန်တွင် စနစ်က အလုပ်လုပ်ပြီး မီးလင်းပြခြင်း (ပုံမှန်အခြေအနေ)',
      'ABS Wheel Speed Sensor သို့မဟုတ် Steering Angle Sensor (SAS) ချို့ယွင်းခြင်း'
    ],
    diagnosticCheck: 'မိုးရွာချိန် သို့မဟုတ် ရွှံ့လမ်းတွင် မောင်းစဉ် ခဏလင်းပြီး ပြန်ငြိမ်းပါက ပုံမှန်ဖြစ်သည်။ အမြဲလင်းနေပါက စတီယာရင်ထောင့်ဆန်ဆာနှင့် ABS စစ်ဆေးရမည်။',
    symptoms: 'အကွေ့များတွင် ဘရိတ်များ အလိုအလျောက် တဖျစ်ဖျစ် ဖမ်းပြီး ကားအရှိန် ကျသွားတတ်သည်။'
  },

  // ================= 3. ELECTRICAL & KEY (၈ မျိုး) =================
  {
    id: 'battery-charge-red',
    symbolKey: 'battery',
    nameMy: 'ဘက်ထရီအားသွင်း မီးနီ',
    nameEn: 'Battery Charging System Warning Light',
    category: 'electrical',
    categoryLabelMy: 'လျှပ်စစ် & ဘက်ထရီစနစ်',
    severity: 'red',
    severityLabelMy: '🔴 အနီရောင် (စက်ချက်ချင်းရပ်ရန်)',
    canDrive: 'လုံးဝ ဆက်မမောင်းရ (Stop Immediately)',
    causes: [
      'ဒိုင်နမိုကြိုး (Fan Belt / Serpentine Belt) လျော့နေခြင်း သို့မဟုတ် ပြတ်ထွက်သွားခြင်း',
      'ဒိုင်နမို ကာဗွန်တုံး (Brushes) ကုန်သွားခြင်း သို့မဟုတ် IC Regulator လောင်ကျွမ်းခြင်း',
      'ဘက်ထရီခေါင်း ချေးတက်နေခြင်း သို့မဟုတ် အားသွင်းပင်မဖျူးစ် (ALT 100A) ပြတ်နေခြင်း'
    ],
    diagnosticCheck: 'စက်နှိုးထားစဉ် ဘက်ထရီခေါင်းတွင် ဒစ်ဂျစ်တယ်မီတာဖြင့် ဗို့တိုင်းပါ။ 13.8V မှ 14.4V အတွင်း မရှိဘဲ 12.4V အောက်သို့ တဖြည်းဖြည်း ကျဆင်းနေပါက ဒိုင်နမို အားလုံးဝမသွင်းတော့ပါ။',
    symptoms: 'မီးကြီးများ မှိန်သွားခြင်း၊ ဒိုင်ခွက်မီးများ ပိတ်ကျသွားခြင်း၊ စတီယာရင် လေးလံလာပြီး မိနစ်ပိုင်းအတွင်း စက်သေသွားခြင်း။'
  },
  {
    id: 'smart-key-yellow',
    symbolKey: 'smart-key',
    nameMy: 'စမတ်ကီး သော့မီးဝါ (Keyless / Immobilizer)',
    nameEn: 'Smart Key / Immobilizer Warning Light',
    category: 'electrical',
    categoryLabelMy: 'လျှပ်စစ် & ဘက်ထရီစနစ်',
    severity: 'yellow',
    severityLabelMy: '🟡 အဝါရောင် (အမြန်ဆုံး စစ်ဆေးရန်)',
    canDrive: 'သတိထား မောင်းနိုင် (Drive with caution to shop)',
    causes: [
      'စမတ်ကီး ရီမုတ်ဘက်ထရီ (CR2032) အားကုန်လုနီးပါး ဖြစ်နေခြင်း',
      'သော့ရီမုတ်ကို ကားကွန်ပျူတာက ရှာမတွေ့တော့ခြင်း (Signal Jammer သို့မဟုတ် အကွာအဝေး ဝေးခြင်း)',
      'ကားစတီယာရင်လော့ခ် (Electronic Steering Lock) မပြေလည်ခြင်း'
    ],
    diagnosticCheck: 'ရီမုတ်ဘက်ထရီ အသစ်လဲပါ။ သော့ရီမုတ်ခေါင်းဖြင့် စက်နှိုးခလုတ် (Push Start Button) ကို တိုက်ရိုက် ထိကပ်၍ နှိုးကြည့်ပါ။',
    symptoms: 'စက်သတ်လိုက်ပါက သော့မမှတ်မိတော့ဘဲ နောက်တစ်ကြိမ် စက်လုံးဝ နှိုးမရတော့ခြင်း။'
  },
  {
    id: 'master-warning-yellow',
    symbolKey: 'master-warning',
    nameMy: 'ပင်မ သတိပေး တြိဂံမီးဝါ (Master Warning Triangle ⚠️)',
    nameEn: 'Master Warning Light (Triangle !)',
    category: 'electrical',
    categoryLabelMy: 'လျှပ်စစ် & ဘက်ထရီစနစ်',
    severity: 'yellow',
    severityLabelMy: '🟡 အဝါရောင် (အမြန်ဆုံး စစ်ဆေးရန်)',
    canDrive: 'သတိထား မောင်းနိုင် (Drive with caution to shop)',
    causes: [
      'စနစ်တစ်ခုခု ချို့ယွင်းနေကြောင်း အသိပေးသည့် အထွေထွေ ပင်မသတိပေးမီး',
      'တံခါးတစ်ချပ်ချပ် ဟနေခြင်း၊ မှန်ဆေးရေ ကုန်နေခြင်း သို့မဟုတ် သော့ဘက်ထရီ အားနည်းခြင်း'
    ],
    diagnosticCheck: 'ဒိုင်ခွက် အလယ်စခရင် (Multi-Information Display) ပေါ်တွင် ပေါ်လာသော စာသားကို ဖတ်ရှုပါ။',
    symptoms: 'အသေးစားမှ အလတ်စား ချို့ယွင်းချက်များအားလုံးတွင် ဤတြိဂံမီးဝါ ပူးတွဲလင်းတတ်သည်။'
  },

  // ================= 4. SAFETY & RESTRAINTS (၁၀ မျိုး) =================
  {
    id: 'airbag-srs-red',
    symbolKey: 'airbag',
    nameMy: 'လေအိတ် အသက်ကယ် မီးနီ (Airbag / SRS)',
    nameEn: 'Supplemental Restraint System (SRS) Airbag Warning',
    category: 'safety',
    categoryLabelMy: 'ဘေးကင်းလုံခြုံရေး & လေအိတ်',
    severity: 'red',
    severityLabelMy: '🔴 အနီရောင် (စက်ချက်ချင်းရပ်ရန်)',
    canDrive: 'သတိထား မောင်းနိုင် (Drive with caution to shop)',
    causes: [
      'စတီယာရင် ကလော့စပရင် (Clockspring) ဝါယာကြိုး ပြတ်တောက်ခြင်း',
      'ထိုင်ခုံအောက်ရှိ ခါးပတ်လော့ခ် (Seatbelt Pretensioner) ပလပ်ချောင်နေခြင်း',
      'ရှေ့ဘမ်ဘာ သို့မဟုတ် ဘေးတံခါးရှိ Impact Sensor ချို့ယွင်းခြင်း'
    ],
    diagnosticCheck: 'OBD2 စကင်နာထိုး၍ SRS DTC Error Code ဖတ်ပါ။ စတီယာရင် လှည့်လိုက်ချိန် ဟွန်းပါ မမြည်ပါက Clockspring ကြိုးပြတ်နေခြင်း ဖြစ်သည်။',
    symptoms: 'ကားမောင်း၍ ရသော်လည်း မတော်တဆ တိုက်မိပါက လေအိတ်လုံးဝ မပွင့်တော့ဘဲ ယာဉ်မောင်းသူ အသက်အန္တရာယ် စိုးရိမ်ရသည်။'
  },
  {
    id: 'seatbelt-red',
    symbolKey: 'seatbelt',
    nameMy: 'ထိုင်ခုံခါးပတ် သတိပေး မီးနီ (Seatbelt Reminder)',
    nameEn: 'Seatbelt Reminder Warning Light',
    category: 'safety',
    categoryLabelMy: 'ဘေးကင်းလုံခြုံရေး & လေအိတ်',
    severity: 'red',
    severityLabelMy: '🔴 အနီရောင် (စက်ချက်ချင်းရပ်ရန်)',
    canDrive: 'လုံးဝ ဆက်မမောင်းရ (Stop Immediately)',
    causes: [
      'ယာဉ်မောင်းသူ သို့မဟုတ် ဘေးလူ ထိုင်ခုံခါးပတ် မပတ်ထားခြင်း',
      'ဘေးထိုင်ခုံပေါ်တွင် အလေးချိန်ရှိသော အထုပ်ကြီးများ တင်ထားသဖြင့် လူထိုင်သည်ဟု အာရုံခံမိခြင်း'
    ],
    diagnosticCheck: 'ခါးပတ်ကို ကလစ်မြည်အောင် သေချာ ထိုးသွင်းပါ။ မီးမငြိမ်းပါက ခါးပတ်လော့ခ် အတွင်းရှိ မိုက်ခရိုခလုတ် ချို့ယွင်းခြင်း ဖြစ်သည်။',
    symptoms: 'ခါးပတ်မပတ်မချင်း ကားထဲတွင် တတီတီ အသံ အဆက်မပြတ် မြည်နေမည်။'
  },

  // ================= 5. LIGHTING & LAMPS (၈ မျိုး) =================
  {
    id: 'high-beam-blue',
    symbolKey: 'high-beam',
    nameMy: 'မီးကြီး မီးမြင့် မီးပြာ (High Beam)',
    nameEn: 'High Beam Headlamp Indicator',
    category: 'lighting',
    categoryLabelMy: 'မီးကြီး & အလင်းရောင်စနစ်',
    severity: 'blue',
    severityLabelMy: '🔵 အပြာရောင် (အသိပေးချက်)',
    canDrive: 'ပုံမှန် မောင်းနိုင် (Normal operation)',
    causes: [
      'ရှေ့မီးကြီးကို မီးမြင့် (High Beam) ထိုးထားကြောင်း သို့မဟုတ် Flash မီးကလစ် ထိုးလိုက်ကြောင်း ယာဉ်မောင်းသူအား အသိပေးခြင်း'
    ],
    diagnosticCheck: 'မျက်နှာချင်းဆိုင် ကားလာပါက မျက်စိမစူးစေရန် မီးနိမ့် (Low Beam) သို့ ပြန်လည် ချပေးရမည်။',
    symptoms: 'မီးနိမ့်ထားသော်လည်း ဤမီးပြာ အမြဲလင်းနေပါက မီးခလုတ်ချောင်း (Stalk Switch) အတွင်းပိုင်း ရှော့ကျနေခြင်း ဖြစ်သည်။'
  },
  {
    id: 'fog-light-front-green',
    symbolKey: 'fog-light-front',
    nameMy: 'မီးခိုးခွဲမီး မီးစိမ်း (Front Fog Light)',
    nameEn: 'Front Fog Lamps Active Indicator',
    category: 'lighting',
    categoryLabelMy: 'မီးကြီး & အလင်းရောင်စနစ်',
    severity: 'green',
    severityLabelMy: '🟢 အစိမ်းရောင် (ပုံမှန် အသိပေးချက်)',
    canDrive: 'ပုံမှန် မောင်းနိုင် (Normal operation)',
    causes: [
      'ရှေ့ဘမ်ဘာအောက်ခြေရှိ မီးခိုးခွဲမီးလုံးများ လင်းနေကြောင်း ပြသခြင်း'
    ],
    diagnosticCheck: 'မိုးရွာချိန် သို့မဟုတ် မြူခိုးထူထပ်ချိန်တွင် အသုံးပြုပါ။ ပုံမှန်အခြေအနေ ဖြစ်သည်။',
    symptoms: 'မီးသီးလောင်ပါက ဤမီးစိမ်း လင်းသော်လည်း ရှေ့မီးသီး မလင်းတော့ပါ။'
  },

  // ================= 6. 4WD, STEERING & BODY (၁၀ မျိုး) =================
  {
    id: 'tpms-yellow',
    symbolKey: 'tpms',
    nameMy: 'တာယာလေပေါင် မီးဝါ (TPMS / (!))',
    nameEn: 'Tire Pressure Monitoring System (TPMS) Warning',
    category: 'chassis_4wd',
    categoryLabelMy: '4WD & စတီယာရင် & ကိုယ်ထည်',
    severity: 'yellow',
    severityLabelMy: '🟡 အဝါရောင် (အမြန်ဆုံး စစ်ဆေးရန်)',
    canDrive: 'သတိထား မောင်းနိုင် (Drive with caution to shop)',
    causes: [
      'တာယာတစ်ဘီးဘီးတွင် လေပေါင် စံချိန်ထက် ၂၅% ကျော် လျော့နည်းသွားခြင်း',
      'တာယာသံစူးခြင်း သို့မဟုတ် လေစုပ်ခေါင်း ရော်ဘာသေ၍ လေယိုစိမ့်ခြင်း',
      'တာယာအတွင်းရှိ TPMS Wireless Sensor ဘက်ထရီ သက်တမ်းကုန်သွားခြင်း'
    ],
    diagnosticCheck: 'ဒစ်ဂျစ်တယ် လေပေါင်ချိန်စက်ဖြင့် ၄ ဘီးစလုံး (ကားတံခါးဘေးကပ်ပြားပါ စံချိန်အတိုင်း 32~35 PSI) ထိုးပြီး TPMS Reset ခလုတ် ၃ စက္ကန့် ဖိနှိပ်ပါ။',
    symptoms: 'လေပေါင်လျော့နေသော ဘီးဘက်သို့ ကားစွဲသွားခြင်း၊ တာယာအပူလွန်ကဲ၍ ကွဲထွက်နိုင်ခြင်း။'
  },
  {
    id: 'eps-steering-red',
    symbolKey: 'eps',
    nameMy: 'ပါဝါစတီယာရင် မီးနီ (EPS / P/S)',
    nameEn: 'Electric Power Steering (EPS) Warning',
    category: 'chassis_4wd',
    categoryLabelMy: '4WD & စတီယာရင် & ကိုယ်ထည်',
    severity: 'red',
    severityLabelMy: '🔴 အနီရောင် (စက်ချက်ချင်းရပ်ရန်)',
    canDrive: 'သတိထား မောင်းနိုင် (Drive with caution to shop)',
    causes: [
      'စတီယာရင် ပါဝါမော်တာ အပူလွန်ကဲ၍ အလိုအလျောက် ဖြတ်တောက်သွားခြင်း',
      'EPS ပင်မဖျူးစ် (50A / 60A Maxi Fuse) ပြတ်တောက်သွားခြင်း',
      'စတီယာရင် တိုင်ပေါ်ရှိ Torque Sensor (လှည့်အားဆန်ဆာ) ချို့ယွင်းခြင်း'
    ],
    diagnosticCheck: 'EPS ဖျူးစ်နှင့် ဂရောင်းလိုင်းများ စစ်ဆေးပါ။ စတီယာရင် မော်တာပလပ်တွင် ပါဝါရောက်မရောက် စစ်ပါ။',
    symptoms: 'စတီယာရင်သည် ကျောက်တုံးကြီးကဲ့သို့ အလွန်လေးလံသွားပြီး ကွေ့ရန် အားကုန်သုံးရသည်။'
  },
  {
    id: 'door-ajar-red',
    symbolKey: 'door-ajar',
    nameMy: 'တံခါးဟနေသည့် မီးနီ (Door Ajar)',
    nameEn: 'Door Ajar Warning Light',
    category: 'chassis_4wd',
    categoryLabelMy: '4WD & စတီယာရင် & ကိုယ်ထည်',
    severity: 'red',
    severityLabelMy: '🔴 အနီရောင် (စက်ချက်ချင်းရပ်ရန်)',
    canDrive: 'လုံးဝ ဆက်မမောင်းရ (Stop Immediately)',
    causes: [
      'ကားတံခါး ၄ ချပ်အနက် တံခါးတစ်ချပ်ချပ် လုံခြုံစွာ မပိတ်ဘဲ ဟနေခြင်း',
      'တံခါးဘောင်ရှိ တံခါးခလုတ် (Door Courtesy Switch) ပျက်စီးခြင်း'
    ],
    diagnosticCheck: 'တံခါး ၄ ချပ်စလုံးနှင့် နောက်ဖုံးကို ပြန်လည် လုံခြုံစွာ ပိတ်ပါ။',
    symptoms: 'ကားမောင်းစဉ် တံခါးပွင့်ထွက်သွားနိုင်ပြီး လူပြုတ်ကျနိုင်သည့် အသက်အန္တရာယ် ရှိသည်။'
  },
  {
    id: 'four-wd-lock-light',
    symbolKey: '4wd',
    nameMy: 'လေးဘီးယက် ချိတ်ဆက်မီး (4WD / 4x4 Lock)',
    nameEn: '4-Wheel Drive / 4x4 Lock Indicator',
    category: 'chassis_4wd',
    categoryLabelMy: '4WD & စတီယာရင် & ကိုယ်ထည်',
    severity: 'green',
    severityLabelMy: '🟢 အစိမ်းရောင် (ပုံမှန် အသိပေးချက်)',
    canDrive: 'ပုံမှန် မောင်းနိုင် (Normal operation)',
    causes: [
      'လေးဘီးယက် 4WD စနစ်ကို ချိတ်ဆက်ထားကြောင်း ပြသခြင်း'
    ],
    diagnosticCheck: 'ကတ္တရာလမ်းခြောက်တွင် မောင်းပါက 2WD သို့ ပြန်လည်ဖြုတ်ထားပါ။ ရွှံ့လမ်း/ကျောက်စရစ်လမ်းတွင်သာ 4WD သုံးပါ။',
    symptoms: 'ကတ္တရာလမ်းခြောက်တွင် 4WD ဆက်တိုက်သုံးပါက ဂီယာဘောက်နှင့် Transfer Case ပျက်စီးနိုင်သည်။'
  }
];
