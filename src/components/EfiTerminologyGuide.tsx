import React, { useState } from 'react';
import { 
  Download, 
  Camera, 
  Check, 
  Loader2, 
  BookOpen, 
  Volume2, 
  Cpu, 
  Gauge, 
  Flame, 
  Zap, 
  Search, 
  Layers, 
  Sparkles,
  Share2
} from 'lucide-react';
import { playChime } from '../utils/audio';
import { downloadElementAsImage } from '../utils/imageExporter';

interface EfiTerminologyGuideProps {
  soundEnabled: boolean;
}

interface TermItem {
  id: string;
  category: 'basics' | 'components' | 'sensors' | 'fuel_ignition' | 'engine_states' | 'tools';
  categoryLabel: string;
  en: string;
  fullForm?: string;
  pronunciation: string;
  meaning: string;
  details?: string;
}

const TERMINOLOGY_DATA: TermItem[] = [
  // 1. Basics
  {
    id: 'efi',
    category: 'basics',
    categoryLabel: 'စနစ်အခြေခံ',
    en: 'EFI',
    fullForm: 'Electronic Fuel Injection',
    pronunciation: 'အီး - အက်ဖ် - အိုင် (အီလက်ထရွန်းနစ် ဖျူးလ် အင်ဂျက်ရှင်း)',
    meaning: 'အီလက်ထရွန်းနစ်သုံး ဓာတ်ဆီဖျန်းစနစ်',
    details: 'ကာဘရိုက်တာခေတ်ကလို မဟုတ်ဘဲ ကွန်ပျူတာ (ECU) က လေဝင်နှုန်းကို တွက်ချက်ကာ အင်ဂျက်တာဖြင့် ဆေးထိုးအပ်သဖွယ် အချိန်ကိုက် မှုတ်ဖျန်းပေးသည့် စနစ်ဖြစ်သည်။'
  },
  {
    id: '4stroke',
    category: 'basics',
    categoryLabel: 'စနစ်အခြေခံ',
    en: '4-Stroke',
    fullForm: 'Four Stroke Cycle',
    pronunciation: 'ဖိုး စထရုတ်ခ် (စုပ်၊ ဖိ၊ ပေါက်၊ ထုတ်)',
    meaning: 'အင်ဂျင်လည်ပတ်မှု အဆင့် ၄ ဆင့် စက်ဝန်း',
    details: 'အင်ဂျင်တစ်လုံးတွင် စုပ်ယူခြင်း (Intake)၊ ဖိသိပ်ခြင်း (Compression)၊ မီးလောင်ပေါက်ကွဲခြင်း (Power)၊ မီးခိုးထုတ်ခြင်း (Exhaust) ဟူ၍ အဆင့် ၄ ဆင့်ဖြင့် လည်ပတ်သည်။'
  },
  {
    id: 'carburetor',
    category: 'basics',
    categoryLabel: 'စနစ်အခြေခံ',
    en: 'Carburetor',
    pronunciation: 'ကာဘရိုက်တာ (သို့) ကာဗြူရေတာ',
    meaning: 'ဆီနှင့်လေကို စက်မှုနည်းဖြင့် ရောစပ်ပေးသောခွက်',
    details: 'ပစ္စတင်အောက်ဆင်းသည့် လေစုပ်အား (Vacuum) ဖြင့် ဂျက်ခေါင်းမှ ဆီကို ဆွဲငင်စုပ်ယူသည့် ရှေးရိုးစနစ်ဖြစ်သည်။'
  },
  {
    id: 'vacuum',
    category: 'basics',
    categoryLabel: 'စနစ်အခြေခံ',
    en: 'Vacuum',
    pronunciation: 'ဗက်ခွမ်း (သို့) ဗားကျူမ်း',
    meaning: 'လေစုပ်အား / လေဟာနယ်ဖိအား',
    details: 'အင်ဂျင်ပစ္စတင် အောက်ဆင်းချိန်တွင် အင်တိတ်မနီဖိုးအတွင်း လေထုဖိအားထက် နည်းသွားသည့် လေစုပ်အား ဖြစ်သည်။'
  },

  // 2. Main 3 Parts
  {
    id: 'sensors',
    category: 'components',
    categoryLabel: 'အဓိက အစိတ်အပိုင်းကြီးများ',
    en: 'Sensors',
    pronunciation: 'ဆန်ဆာများ',
    meaning: 'အင်ဂျင်အခြေအနေကို စောင့်ကြည့်တိုင်းတာသော အာရုံခံခလုတ်များ',
    details: 'လူ့ခန္ဓာကိုယ်၏ မျက်စိ၊ နှာခေါင်း၊ အရေပြားကဲ့သို့ လေဝင်နှုန်း၊ အပူချိန်၊ အင်ဂျင်လည်နှုန်းတို့ကို တိုင်းတာပြီး ECU သို့ သတင်းပို့သည်။'
  },
  {
    id: 'ecu',
    category: 'components',
    categoryLabel: 'အဓိက အစိတ်အပိုင်းကြီးများ',
    en: 'ECU / ECM',
    fullForm: 'Electronic Control Unit / Engine Control Module',
    pronunciation: 'အီး - စီ - ယူ / အီး - စီ - အမ်',
    meaning: 'အင်ဂျင်ထိန်းချုပ်သော ကွန်ပျူတာဘောက် (ဦးနှောက်)',
    details: 'ဆန်ဆာများမှ ရရှိသော အချက်အလက်များကို မိုက်ခရိုစက္ကန့်အတွင်း တွက်ချက်ကာ ဆီဘယ်လောက်ဖျန်းရမည်၊ မီးဘယ်အချိန်ကူးရမည်ကို အမိန့်ပေးသည်။'
  },
  {
    id: 'actuators',
    category: 'components',
    categoryLabel: 'အဓိက အစိတ်အပိုင်းကြီးများ',
    en: 'Actuators',
    pronunciation: 'အက်ခ်ျ-ချူ-အေတာများ',
    meaning: 'ECU အမိန့်အတိုင်း လက်တွေ့ အလုပ်လုပ်ပေးသောအဖွဲ့',
    details: 'လူ့ခန္ဓာကိုယ်၏ လက်နှင့်ခြေထောက်ကဲ့သို့ အင်ဂျက်တာ (ဆီဖျန်းခြင်း)၊ မီးကွိုင် (မီးပွင့်ခြင်း)၊ ဆီဘုံဘိုင်မော်တာ စသည်တို့ ပါဝင်သည်။'
  },

  // 3. Sensors
  {
    id: 'maf',
    category: 'sensors',
    categoryLabel: 'ဆန်ဆာများ (Sensors)',
    en: 'MAF Sensor',
    fullForm: 'Mass Air Flow Sensor',
    pronunciation: 'မက်ဖ် ဆန်ဆာ (မတ်စ် အဲယား ဖလိုး)',
    meaning: 'အင်ဂျင်ထဲ ဝင်သွားသော လေအလေးချိန်ကို တိုင်းသည့်ဆန်ဆာ',
    details: 'လေစစ်အိုးအထွက်တွင် တပ်ဆင်ထားပြီး လေထုထည်ကို ဂရမ် (grams/sec) ဖြင့် တိကျစွာတိုင်းတာသည်။'
  },
  {
    id: 'map',
    category: 'sensors',
    categoryLabel: 'ဆန်ဆာများ (Sensors)',
    en: 'MAP Sensor',
    fullForm: 'Manifold Absolute Pressure Sensor',
    pronunciation: 'မတ်ပ် ဆန်ဆာ (မန်းနီဖိုး အက်ဘ်ဆိုလု ဖရက်ရှာ)',
    meaning: 'အင်တိတ်မနီဖိုးအတွင်း လေစုပ်ဖိအားကို တိုင်းသည့်ဆန်ဆာ',
    details: 'အင်ဂျင်ဝန်ထုပ်ဝန်ပိုး (Engine Load) မည်မျှရှိသည်ကို လေစုပ်ဖိအားဖြင့် သိရှိစေသည်။'
  },
  {
    id: 'ckp',
    category: 'sensors',
    categoryLabel: 'ဆန်ဆာများ (Sensors)',
    en: 'CKP Sensor',
    fullForm: 'Crankshaft Position Sensor',
    pronunciation: 'စီ - ကေ - ပီ ဆန်ဆာ (ခရန့်ရှပ် ပိုဇစ်ရှင်း)',
    meaning: 'ကရိုင်းရှပ်လည်နှုန်း (RPM) နှင့် ပစ္စတင်အမှတ် တိုင်းသည့်ဆန်ဆာ (အရေးကြီးဆုံး)',
    details: 'ပျက်စီးပါက အင်ဂျင်လုံးဝ စက်နှိုးမရပါ (No Spark & No Injection)။ ကရိုင်းလည်မှသာ မီးပေးပြီး ဆီဖျန်းစေသည်။'
  },
  {
    id: 'cmp',
    category: 'sensors',
    categoryLabel: 'ဆန်ဆာများ (Sensors)',
    en: 'CMP Sensor',
    fullForm: 'Camshaft Position Sensor',
    pronunciation: 'စီ - အမ် - ပီ ဆန်ဆာ (ကမ်းရှပ် ပိုဇစ်ရှင်း)',
    meaning: 'ကင်ရှပ်နှင့် ဗားပွင့်ချိန် တိုင်းသည့်ဆန်ဆာ',
    details: 'နံပါတ် (၁) ဆလင်ဒါသည် စုပ်ယူချိန်လော၊ မီးလောင်ပေါက်ကွဲချိန်လောကို ခွဲခြားသိစေပြီး ဆီဖျန်းအစဉ်လိုက် အချိန်ကိုက်စေသည်။'
  },
  {
    id: 'tps',
    category: 'sensors',
    categoryLabel: 'ဆန်ဆာများ (Sensors)',
    en: 'TPS',
    fullForm: 'Throttle Position Sensor',
    pronunciation: 'တီ - ပီ - အက်စ် (သရော့တယ် ပိုဇစ်ရှင်း)',
    meaning: 'လိပ်ပြာတံခါး ဘယ်လောက်ပွင့်သလဲ (လီဗာနင်းအား) တိုင်းသည့်ဆန်ဆာ',
    details: 'လီဗာကို ဖြည်းဖြည်းနင်းသလား၊ အပြင်းဆောင့်နင်းသလားကို ဗို့အားပြောင်းလဲမှုဖြင့် ECU သို့ အချက်ပြသည်။'
  },
  {
    id: 'ect',
    category: 'sensors',
    categoryLabel: 'ဆန်ဆာများ (Sensors)',
    en: 'ECT Sensor',
    fullForm: 'Engine Coolant Temperature Sensor',
    pronunciation: 'အီး - စီ - တီ ဆန်ဆာ (အင်ဂျင် ကူးလန့် တမ်ပရာချာ)',
    meaning: 'အင်ဂျင်ရေ အပူ/အအေး တိုင်းသည့်ဆန်ဆာ',
    details: 'မနက်ခင်းအင်ဂျင်အေးနေချိန်တွင် ဆီပိုဖျန်းစေရန် (အော်တိုချုတ်ဆွဲရန်) နှင့် ပန်ကာလည်ရန် အမိန့်ပေးသည်။'
  },
  {
    id: 'o2',
    category: 'sensors',
    categoryLabel: 'ဆန်ဆာများ (Sensors)',
    en: 'O2 Sensor',
    fullForm: 'Oxygen Sensor',
    pronunciation: 'အို - တူး ဆန်ဆာ (အောက်စီဂျင် ဆန်ဆာ)',
    meaning: 'အိတ်ဇောမီးခိုးငွေ့ထဲက အောက်ဆီဂျင် တိုင်းသည့်ဆန်ဆာ',
    details: 'ဆီထူနေသလား (Rich)၊ ဆီပါးနေသလား (Lean) စစ်ဆေးကာ ECU မှ ဆီအဖွင့်အပိတ်ကို အလိုအလျောက် ပြန်ထိန်းပေးသည်။'
  },
  {
    id: 'knock',
    category: 'sensors',
    categoryLabel: 'ဆန်ဆာများ (Sensors)',
    en: 'Knock Sensor (KS)',
    fullForm: 'Knock / Detonation Sensor',
    pronunciation: 'နော့ခ် ဆန်ဆာ (ခေါက်သံတိုင်းဆန်ဆာ)',
    meaning: 'အင်ဂျင်မီးလောင်ပေါက်ကွဲသံ ကြမ်းတမ်းခြင်း (Knocking) ကို နားထောင်သည့်ဆန်ဆာ',
    details: 'အင်ဂျင်ဘလောက်ဘေးတွင် တပ်ဆင်ထားပြီး မီးလောင်သံကြမ်းခြင်း၊ ပင်သံထွက်ခြင်း ကြားပါက ECU အား မီးချိန် (Ignition Timing) အချိန်ကိုက် ချက်ချင်းပြန်ရုတ်/လျှော့ပေးစေကာ ပစ္စတင်နှင့် ပလပ်ကျိုးခြင်းမှ ကာကွယ်ပေးသည်။'
  },
  {
    id: 'iat',
    category: 'sensors',
    categoryLabel: 'ဆန်ဆာများ (Sensors)',
    en: 'IAT Sensor',
    fullForm: 'Intake Air Temperature Sensor',
    pronunciation: 'အိုင် - အေ - တီ ဆန်ဆာ (အင်တိတ် အဲယား တမ်ပရာချာ)',
    meaning: 'အင်ဂျင်ထဲ ဝင်လာသော လေ၏ အပူချိန်ကို တိုင်းသည့်ဆန်ဆာ',
    details: 'လေအေးလျှင် သိပ်သည်းဆများပြီး အောက်ဆီဂျင်ပိုပါသဖြင့် ဆီပိုဖျန်းရပြီး၊ လေပူလျှင် လေပွသဖြင့် ဆီလျှော့ဖျန်းပေးရသည်။ (မကြာခဏ MAF Sensor ထဲတွင် တစ်ပါတည်း တွဲပါတတ်သည်)။'
  },
  {
    id: 'app',
    category: 'sensors',
    categoryLabel: 'ဆန်ဆာများ (Sensors)',
    en: 'APP Sensor',
    fullForm: 'Accelerator Pedal Position Sensor',
    pronunciation: 'အေ - ပီ - ပီ ဆန်ဆာ (အက်ခ်ဆယ်လာရေတာ ပက်ဒယ်)',
    meaning: 'လီဗာခြေနင်းခုံ နင်းထားသည့် အတိမ်အနက်ကို တိုင်းသည့်ဆန်ဆာ',
    details: 'လီဗာကြိုးမပါတော့သော ခေတ်ပေါ် Drive-by-Wire ကားများတွင် ခြေနင်းခုံ၌ တပ်ဆင်ထားပြီး ယာဉ်မောင်း၏ အမိန့်ကို လျှပ်စစ်ဗို့အားဖြင့် ECU သို့ ပို့ကာ လိပ်ပြာတံခါးကို မော်တာဖြင့် လှမ်းဖွင့်စေသည်။'
  },
  {
    id: 'af_sensor',
    category: 'sensors',
    categoryLabel: 'ဆန်ဆာများ (Sensors)',
    en: 'A/F Sensor',
    fullForm: 'Air-Fuel Ratio Sensor (Wideband O2)',
    pronunciation: 'အေ - အက်ဖ် ဆန်ဆာ (အဲယား ဖျူးလ် ရေးရှိုး)',
    meaning: 'လေနှင့်ဆီ အချိုးအစားကို အလွန်တိကျစွာ တိုင်းသည့် ခေတ်ပေါ်ဆန်ဆာ',
    details: 'ရိုးရိုး O2 sensor ထက် အဆပေါင်းများစွာ ပိုမိုတိကျပြီး အိတ်ဇောမီးခိုးအတွင်းရှိ လေနှင့်ဆီအချိုး (ဥပမာ - 14.7:1) အတိအကျကို ဂဏန်းဖြင့် ချက်ချင်းဖတ်ယူပေးနိုင်သည်။'
  },
  {
    id: 'vss',
    category: 'sensors',
    categoryLabel: 'ဆန်ဆာများ (Sensors)',
    en: 'VSS',
    fullForm: 'Vehicle Speed Sensor',
    pronunciation: 'ဗွီ - အက်စ် - အက်စ် (ဗီဟီကယ် စပီးဒ်)',
    meaning: 'ကားတစ်နာရီ မည်မျှအမြန်နှုန်းဖြင့် ပြေးနေသည်ကို တိုင်းသည့်ဆန်ဆာ',
    details: 'ဂီယာဘောက်အထွက်တွင် တပ်ဆင်ထားပြီး ဒိုင်ခွက်ပေါ်၌ ကားမိုင်နှုန်းပြသရန်နှင့် အော်တိုဂီယာ အဆိုင်းချိန်းချိန်ကို ECU သို့ ပို့ပေးသည်။'
  },
  {
    id: 'ftp',
    category: 'sensors',
    categoryLabel: 'ဆန်ဆာများ (Sensors)',
    en: 'FTP Sensor',
    fullForm: 'Fuel Tank Pressure Sensor',
    pronunciation: 'အက်ဖ် - တီ - ပီ ဆန်ဆာ (ဖျူးလ် တန့်ခ် ဖရက်ရှာ)',
    meaning: 'ဓာတ်ဆီတိုင်ကီအတွင်း ဓာတ်ငွေ့ဖိအားကို တိုင်းသည့်ဆန်ဆာ',
    details: 'ဆီတိုင်ကီထဲက ဓာတ်ဆီငွေ့များ လေထုထဲ မလွင့်စင်ဘဲ စက်ထဲပြန်စုပ်ထည့်သည့် EVAP စနစ်တွင် ဆီယို/ငွေ့ယိုစိမ့်မှု ရှိမရှိ စစ်ဆေးပေးသည်။'
  },
  {
    id: 'fps',
    category: 'sensors',
    categoryLabel: 'ဆန်ဆာများ (Sensors)',
    en: 'Fuel Pressure Sensor (FPS)',
    fullForm: 'Fuel Rail Pressure Sensor',
    pronunciation: 'ဖျူးလ် ဖရက်ရှာ ဆန်ဆာ',
    meaning: 'ဆီပိုက်လိုင်းအတွင်း ဓာတ်ဆီဖိအား မည်မျှရှိသည်ကို တိုင်းသည့်ဆန်ဆာ',
    details: 'ခေတ်ပေါ် ဓာတ်ဆီတိုက်ရိုက်ဖျန်းစနစ် (GDI / Direct Injection) သုံး အင်ဂျင်များတွင် ဆီဖိအား ပုံမှန်ရှိမရှိ ECU သို့ သတင်းပို့ပေးသည်။'
  },
  {
    id: 'oil_pressure',
    category: 'sensors',
    categoryLabel: 'ဆန်ဆာများ (Sensors)',
    en: 'Oil Pressure Sensor',
    fullForm: 'Engine Oil Pressure Sensor / Switch',
    pronunciation: 'အွိုင်လ် ဖရက်ရှာ ဆန်ဆာ',
    meaning: 'အင်ဂျင်အတွင်း ချောဆီအင်ဂျင်ဝိုင်ဖိအား တိုင်းသည့်ဆန်ဆာ',
    details: 'အင်ဂျင်ဝိုင်ဖိအား ရုတ်တရက် ကျဆင်းသွားပါက ဒိုင်ခွက်ပေါ်တွင် ရေနံဆီမီးခွက်ပုံ မီးနီလေးလင်းစေပြီး အင်ဂျင်ကျပ်ကာ ပျက်စီးမသွားစေရန် ချက်ချင်းသတိပေးသည်။'
  },
  {
    id: 'egr_sensor',
    category: 'sensors',
    categoryLabel: 'ဆန်ဆာများ (Sensors)',
    en: 'EGR Sensor',
    fullForm: 'Exhaust Gas Recirculation Sensor',
    pronunciation: 'အီး - ဂျီ - အာရ် ဆန်ဆာ',
    meaning: 'အိတ်ဇောဓာတ်ငွေ့ အင်ဂျင်ထဲ ပြန်သွင်းသည့်ဗား အနေအထားတိုင်းဆန်ဆာ',
    details: 'အင်ဂျင်မီးလောင်ပေါက်ကွဲခန်း အပူချိန်ကို လျှော့ချပေးပြီး အဆိပ်ငွေ့ (NOx) ထွက်ရှိမှု နည်းစေရန် EGR ဗား အဖွင့်အပိတ်ကို စောင့်ကြည့်သည်။'
  },

  // 4. Fuel & Ignition
  {
    id: 'fuel_pump',
    category: 'fuel_ignition',
    categoryLabel: 'ဆီလိုင်းနှင့် မီးလိုင်း',
    en: 'Fuel Pump',
    pronunciation: 'ဖျူးလ် ပန့်ပ်',
    meaning: 'ဓာတ်ဆီတိုင်ကီထဲက ဆီဘုံဘိုင်မော်တာ',
    details: 'ဆီတိုင်ကီအတွင်း တပ်ဆင်ထားပြီး 40 မှ 60 PSI ခန့်ရှိသော ဖိအားဖြင့် ဆီလိုင်းသို့ အဆက်မပြတ် တွန်းပို့ပေးသည်။'
  },
  {
    id: 'fuel_filter',
    category: 'fuel_ignition',
    categoryLabel: 'ဆီလိုင်းနှင့် မီးလိုင်း',
    en: 'Fuel Filter',
    pronunciation: 'ဖျူးလ် ဖီလ်တာ',
    meaning: 'ဓာတ်ဆီစစ်',
    details: 'အင်ဂျက်တာ အပ်ပေါက်လေးများ မပိတ်စေရန် ဆီထဲပါသော သဲ၊ ဖုန်နှင့် အညစ်အကြေးများကို စစ်ထုတ်ပေးသည်။'
  },
  {
    id: 'fuel_rail',
    category: 'fuel_ignition',
    categoryLabel: 'ဆီလိုင်းနှင့် မီးလိုင်း',
    en: 'Fuel Rail',
    pronunciation: 'ဖျူးလ် ရေးလ်',
    meaning: 'အင်ဂျက်တာများ တပ်ဆင်ထားသည့် ဆီတန်းပိုက်လိုင်းကြီး',
    details: 'အင်ဂျက်တာတိုင်းသို့ တူညီသော ဖိအားဖြင့် ဓာတ်ဆီအမြဲအဆင်သင့် ဖြန့်ဝေပေးထားသော သံမဏိပိုက်ဖြစ်သည်။'
  },
  {
    id: 'injector',
    category: 'fuel_ignition',
    categoryLabel: 'ဆီလိုင်းနှင့် မီးလိုင်း',
    en: 'Injector',
    pronunciation: 'အင်ဂျက်တာ',
    meaning: 'ဆီကို ဆေးထိုးအပ်လို အမှုန်အမွှား မှုတ်ဖျန်းပေးသောခေါင်း',
    details: 'လျှပ်စစ်သံလိုက်ကွိုင်ပါဝင်ပြီး ECU က အနှုတ်လိုင်းပေးလိုက်သည်နှင့် အပ်ပွင့်သွားကာ ဆီကို မီးလောင်ခန်းရှေ့သို့ ဖျန်းပေးသည်။'
  },
  {
    id: 'solenoid',
    category: 'fuel_ignition',
    categoryLabel: 'ဆီလိုင်းနှင့် မီးလိုင်း',
    en: 'Solenoid',
    pronunciation: 'ဆိုလီနွိုက်',
    meaning: 'လျှပ်စစ်သံလိုက်ကွိုင် (အဖွင့်/အပိတ် ခလုတ်)',
    details: 'လျှပ်စစ်စီးဝင်ပါက သံလိုက်ဖြစ်လာပြီး အဆို့ရှင် သို့မဟုတ် မောင်းတံကို ဆွဲဖွင့်ပေးသည့် ပစ္စည်းဖြစ်သည်။'
  },
  {
    id: 'throttle_body',
    category: 'fuel_ignition',
    categoryLabel: 'ဆီလိုင်းနှင့် မီးလိုင်း',
    en: 'Throttle Body',
    pronunciation: 'သရော့တယ် ဘော်ဒီ',
    meaning: 'လိပ်ပြာအဖုံး ပါဝင်သော လေဝင်ပေါက်ဘောက်',
    details: 'လီဗာကြိုး သို့မဟုတ် အီလက်ထရွန်းနစ်မော်တာဖြင့် လိပ်ပြာတံခါးကို အဖွင့်အပိတ်လုပ်ကာ လေဝင်နှုန်းကို ထိန်းချုပ်သည်။'
  },
  {
    id: 'ignition_coil',
    category: 'fuel_ignition',
    categoryLabel: 'ဆီလိုင်းနှင့် မီးလိုင်း',
    en: 'Ignition Coil',
    pronunciation: 'အစ်ဂ်နီရှင်း ကွိုင်',
    meaning: 'ပလပ်ခေါင်းအတွက် မီးအားသောင်းချီ မြှင့်ပေးသော မီးကွိုင်',
    details: 'ကားဘက်ထရီ 12 Volts အားကို ဗို့အား ၂၀,၀၀၀ မှ ၄၀,၀၀၀ အထိ အဆမတန် မြှင့်တင်ပေးပြီး ပလပ်ကို မီးပွင့်စေသည်။'
  },
  {
    id: 'ground',
    category: 'fuel_ignition',
    categoryLabel: 'ဆီလိုင်းနှင့် မီးလိုင်း',
    en: 'Ground / Earth',
    pronunciation: 'ဂရောင်း (သို့) ဂဒေါင်း',
    meaning: 'အနှုတ်လိုင်း (Body Earth / အမတ်လိုင်း)',
    details: 'ကားဘော်ဒီသံထည်နှင့် တိုက်ရိုက်ဆက်သွယ်ထားသော အနှုတ်ကြိုးလိုင်းဖြစ်သည်။ ECU သည် အင်ဂျက်တာနှင့် ကွိုင်များကို ဤအနှုတ်လိုင်းဖြင့် ဖြတ်တောက်ထိန်းချုပ်သည်။'
  },

  // 5. Engine & States
  {
    id: 'flywheel',
    category: 'engine_states',
    categoryLabel: 'စက်ပိုင်းနှင့် အခြေအနေများ',
    en: 'Flywheel',
    pronunciation: 'ဖလိုင်းဝီးလ်',
    meaning: 'အင်ဂျင်နောက်ဘက်က ဒလက်ဝိုင်းကြီး',
    details: 'အင်ဂျင်လည်အား အဟုန်ကို ထိန်းညှိပေးပြီး စတာတာမော်တာနှင့် ကလပ်ပန်းကန် ချိတ်ဆက်ရာနေရာ ဖြစ်သည်။'
  },
  {
    id: 'crank_pulley',
    category: 'engine_states',
    categoryLabel: 'စက်ပိုင်းနှင့် အခြေအနေများ',
    en: 'Crank Pulley',
    pronunciation: 'ခရန့် ပူလီ',
    meaning: 'အင်ဂျင်ရှေ့ဘက် ဘတ်ကြိုးပတ်သော ဒလက်ဘီး',
    details: 'ဒိုင်နမို၊ ရေဘုံဘိုင်နှင့် အဲယားကွန်းကွန်ပရက်ဆာတို့ကို ဘတ်ကြိုးဖြင့် လည်ပတ်စေသော ကရိုင်းရှပ်ထိပ် ပူလီဖြစ်သည်။'
  },
  {
    id: 'tdc',
    category: 'engine_states',
    categoryLabel: 'စက်ပိုင်းနှင့် အခြေအနေများ',
    en: 'TDC',
    fullForm: 'Top Dead Center',
    pronunciation: 'တီ - ဒီ - စီ (တော့ပ် ဒက်ဒ် စင်တာ)',
    meaning: 'ပစ္စတင် အထက်ဆုံးသို့ ရောက်ရှိသောအမှတ် (အထက်သေမှတ်)',
    details: 'ဆလင်ဒါအတွင်း ပစ္စတင် အမြင့်ဆုံး အဆုံးသို့ ရောက်သည့်အမှတ်ဖြစ်ပြီး မီးချိန်နှင့် တိုင်မင်ချိန်ရာတွင် အခြေခံအမှတ်အသား ဖြစ်သည်။'
  },
  {
    id: 'rpm',
    category: 'engine_states',
    categoryLabel: 'စက်ပိုင်းနှင့် အခြေအနေများ',
    en: 'RPM',
    fullForm: 'Revolutions Per Minute',
    pronunciation: 'အာရ် - ပီ - အမ်',
    meaning: 'အင်ဂျင် တစ်မိနစ်အတွင်း လည်ပတ်သည့် အပတ်ရေ',
    details: 'သာမန်စက်နိုးထားချိန် (Idling) တွင် 700 - 800 RPM ခန့်ရှိပြီး လီဗာနင်းလျှင် 2,000 - 4,000 RPM စသည်ဖြင့် မြင့်တက်သည်။'
  },
  {
    id: 'cold_start',
    category: 'engine_states',
    categoryLabel: 'စက်ပိုင်းနှင့် အခြေအနေများ',
    en: 'Cold Start',
    pronunciation: 'ကိုးလ်ဒ် စတားတ်',
    meaning: 'မနက်ခင်း အင်ဂျင် အေးနေချိန် စက်စနှိုးခြင်း',
    details: 'အင်ဂျင်အေးနေချိန်တွင် ဆီငွေ့ပျံမှုနည်းသဖြင့် ECU သည် အင်ဂျက်တာကို ဆီပိုဖျန်းစေပြီး အင်ဂျင်ပူချိန်ရောက်သည်အထိ RPM အနည်းငယ် တင်ထားပေးသည်။'
  },
  {
    id: 'rich_lean',
    category: 'engine_states',
    categoryLabel: 'စက်ပိုင်းနှင့် အခြေအနေများ',
    en: 'Rich & Lean',
    pronunciation: 'ရစ်ချ် (ဆီထူ) & လင်း (ဆီပါး)',
    meaning: 'ဆီများလွန်းခြင်း နှင့် ဆီနည်းလွန်းခြင်း',
    details: 'Rich ဆိုလျှင် ဆီများပြီး မီးခိုးမည်းထွက်ကာ ဆီစားများသည်။ Lean ဆိုလျှင် လေများပြီး ဆီနည်းသဖြင့် အင်ဂျင်ဆွဲအားမရှိ၊ အပူလွန်ကဲတတ်သည်။'
  },
  {
    id: 'closed_loop',
    category: 'engine_states',
    categoryLabel: 'စက်ပိုင်းနှင့် အခြေအနေများ',
    en: 'Closed Loop',
    pronunciation: 'ကလိုစ်ဒ် လူပ်ပ်',
    meaning: 'အာရုံခံဆန်ဆာများဖြင့် အလိုအလျောက် အချိန်ပြည့် ပြန်ထိန်းနေသောစနစ်',
    details: 'O2 Sensor အပူချိန်ပြည့်ပြီးနောက် အိတ်ဇောမီးခိုးကို စစ်ဆေးကာ ECU က ဆီအနည်းအများကို စက္ကန့်ပိုင်းအတွင်း အလိုအလျောက် ချိန်ညှိနေသော အဆင့်ဖြစ်သည်။'
  },

  // 6. Tools & Diagnostics
  {
    id: 'multimeter',
    category: 'tools',
    categoryLabel: 'စစ်ဆေးရေး ကိရိယာများ',
    en: 'Digital Multimeter',
    pronunciation: 'ဒစ်ဂျစ်တယ် မာလ်တီမီတာ',
    meaning: 'ဗို့အား (V)၊ အုန်းမ် (Ω)၊ အမ်ပီယာ တိုင်းသော ဒစ်ဂျစ်တယ်မီတာ',
    details: 'ဆန်ဆာများ၏ 5V Reference လိုင်း၊ အင်ဂျက်တာအုန်းမ်တန်ဖိုး၊ ဝါယာကြိုးပြတ်/မပြတ် စစ်ဆေးရာတွင် မရှိမဖြစ် သုံးရသည်။'
  },
  {
    id: 'obd2',
    category: 'tools',
    categoryLabel: 'စစ်ဆေးရေး ကိရိယာများ',
    en: 'OBD2 Scanner',
    fullForm: 'On-Board Diagnostics 2',
    pronunciation: 'အို - ဘီ - ဒီ တူး စကင်နာ',
    meaning: 'ကားကွန်ပျူတာ ချို့ယွင်းချက် ရှာဖွေစစ်ဆေးသောစက်',
    details: 'ကား၏ စတီယာရင်အောက်ရှိ ၁၆ ပင် ပေါက်တွင် ထိုးစိုက်ပြီး မည်သည့်ဆန်ဆာ ပျက်နေသည်ကို ကွန်ပျူတာဖြင့် ဖတ်ရှုစစ်ဆေးသည်။'
  },
  {
    id: 'dtc_code',
    category: 'tools',
    categoryLabel: 'စစ်ဆေးရေး ကိရိယာများ',
    en: 'DTC Code',
    fullForm: 'Diagnostic Trouble Code',
    pronunciation: 'ဒီ - တီ - စီ ကုဒ် (ဥပမာ - P0100, P0300)',
    meaning: 'ချို့ယွင်းချက် ဖော်ပြသော အချက်ပြကုဒ်နံပါတ်',
    details: 'ဥပမာ - P0100 (MAF Sensor ချို့ယွင်းချက်)၊ P0300 (မီးလောင်ပေါက်ကွဲမှု ချို့ယွင်းချက်) ဟူ၍ အင်ဂျင်ပြဿနာကို တိကျစွာ ညွှန်ပြသည်။'
  },
  {
    id: 'check_engine',
    category: 'tools',
    categoryLabel: 'စစ်ဆေးရေး ကိရိယာများ',
    en: 'Check Engine Light',
    pronunciation: 'ချက်ခ် အင်ဂျင် လိုက်တ်',
    meaning: 'ဒိုင်ခွက်ပေါ်တွင် လင်းလာသော အင်ဂျင်ပုံစံ မီးဝါလေး',
    details: 'EFI စနစ်အတွင်း ဆန်ဆာ သို့မဟုတ် ဆီ/မီးလိုင်းတွင် ပုံမှန်မဟုတ်သော ချို့ယွင်းချက်တစ်ခုခု ပေါ်ပေါက်လာပါက ယာဉ်မောင်းအား သတိပေးသည့် မီးဝါလေး ဖြစ်သည်။'
  }
];

export const EfiTerminologyGuide: React.FC<EfiTerminologyGuideProps> = ({ soundEnabled }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'အားလုံး (All)' },
    { id: 'basics', label: 'စနစ်အခြေခံ' },
    { id: 'components', label: 'အစိတ်အပိုင်းကြီးများ' },
    { id: 'sensors', label: 'ဆန်ဆာများ (Sensors)' },
    { id: 'fuel_ignition', label: 'ဆီလိုင်း / မီးလိုင်း' },
    { id: 'engine_states', label: 'စက်ပိုင်းနှင့် အခြေအနေ' },
    { id: 'tools', label: 'စစ်ဆေးရေး ကိရိယာများ' },
  ];

  const filteredItems = TERMINOLOGY_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pronunciation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.fullForm && item.fullForm.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleDownloadImage = async () => {
    if (soundEnabled) playChime(650, 0.3);
    setIsExporting(true);
    setDownloadSuccess(false);

    try {
      const success = await downloadElementAsImage(
        'efi-terminology-capture-card',
        `EFI-Engine-Terminology-Guide-${new Date().toISOString().slice(0, 10)}`
      );

      if (success) {
        setDownloadSuccess(true);
        if (soundEnabled) playChime(850, 0.4);
        setTimeout(() => setDownloadSuccess(false), 4000);
      }
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section 
      id="efi-section" 
      className="max-w-6xl mx-auto px-3 sm:px-6 py-6 font-['Noto_Sans_Myanmar'] space-y-5"
    >
      {/* Top Banner & Title Bar */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-stone-800 pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>EFI Engine Master Reference • အသံထွက်နှင့် အဓိပ္ပာယ်များ</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-100">
              EFI အင်ဂျင် အခေါ်အဝေါ်နှင့် အသံထွက် ဓာတ်ပုံကတ်ပြား
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              ဝပ်ရှော့သုံး စံစနစ် အင်္ဂလိပ်စာလုံးများ၊ မြန်မာလို အသံထွက်ဖတ်နည်းများနှင့် လက်တွေ့အဓိပ္ပာယ်များကို 
              <strong> ဓာတ်ပုံအဖြစ် ဖုန်းထဲသို့ တိုက်ရိုက်ဒေါင်းလုဒ်ဆွဲ၍ သိမ်းဆည်းထားနိုင်ပါသည်</strong>။
            </p>
          </div>

          {/* Download Photo Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto shrink-0">
            <button
              id="save-efi-photo-btn"
              onClick={handleDownloadImage}
              disabled={isExporting}
              className={`px-5 py-3.5 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 ${
                downloadSuccess
                  ? 'bg-emerald-500 text-stone-950 shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 hover:brightness-110 shadow-amber-500/30 animate-pulse hover:animate-none'
              }`}
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                  <span>ပုံထုတ်လုပ်နေပါသည်...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-stone-950" />
                  <span>ဖုန်းထဲသို့ ဓာတ်ပုံသိမ်းပြီးပါပြီ ✓</span>
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 text-stone-950" />
                  <span>📸 ဓာတ်ပုံအဖြစ် ဖုန်းထဲသိမ်းရန် (Save Photo)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filter Tabs & Search Box */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-1">
          {/* Categories Pill Scroller */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCategory(c.id);
                  if (soundEnabled) playChime(500, 0.15);
                }}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                    : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-stone-100'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="စာလုံး သို့မဟုတ် အသံထွက် ရှာရန်..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* CAPTURE CONTAINER (Targeted by html-to-image for high-res photo download) */}
      {/* ========================================================================= */}
      <div
        id="efi-terminology-capture-card"
        className="bg-stone-950 border-2 border-stone-800 rounded-3xl p-5 sm:p-8 space-y-6 shadow-2xl text-stone-100"
      >
        {/* Visual Poster Header on the captured image */}
        <div className="border-b-2 border-amber-500/40 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-stone-950 text-[10px] font-black tracking-wider uppercase font-mono">
                WORKSHOP CHEAT SHEET
              </span>
              <span className="text-xs text-amber-400 font-bold font-mono">
                EFI TERMINOLOGY & PRONUNCIATION
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-stone-100">
              EFI အင်ဂျင် အခေါ်အဝေါ်၊ အသံထွက်နှင့် လုပ်ဆောင်ချက် စုံလင်ဇယား
            </h3>
            <p className="text-xs text-stone-400">
              စုစုပေါင်း စာလုံး ({TERMINOLOGY_DATA.length}) လုံး • ဝပ်ရှော့စံစနစ် အသံထွက်နှင့် အင်ဂျင်နီယာရှင်းလင်းချက်များ
            </p>
          </div>

          <div className="hidden sm:flex flex-col items-end text-right text-[11px] text-stone-400 font-mono">
            <span className="text-amber-300 font-bold">Mingalaba Workshop Guide</span>
            <span>https://ai.studio/build</span>
          </div>
        </div>

        {/* Terminology Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition space-y-2 relative group"
            >
              {/* Category & Counter Badge */}
              <div className="flex items-center justify-between gap-2 border-b border-stone-800/80 pb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-800 text-amber-300 border border-stone-700">
                  {item.categoryLabel}
                </span>
                <span className="text-[10px] font-mono font-bold text-stone-400">
                  #{index + 1}
                </span>
              </div>

              {/* Main English Name & Full Form */}
              <div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-lg sm:text-xl font-black text-amber-400 font-mono tracking-wide">
                    {item.en}
                  </span>
                  {item.fullForm && (
                    <span className="text-xs text-stone-400 font-mono italic">
                      ({item.fullForm})
                    </span>
                  )}
                </div>
              </div>

              {/* Pronunciation Badge (Highlight) */}
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2">
                <Volume2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    အသံထွက် ဖတ်နည်း:
                  </span>
                  <span className="text-sm font-black text-amber-200">
                    {item.pronunciation}
                  </span>
                </div>
              </div>

              {/* Meaning & Function in Burmese */}
              <div className="pt-1 space-y-1 text-xs">
                <div className="font-bold text-stone-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                  <span>{item.meaning}</span>
                </div>
                {item.details && (
                  <p className="text-stone-400 pl-3 leading-relaxed text-[11px]">
                    {item.details}
                  </p>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Footer info within photo capture */}
        <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 text-center text-xs text-stone-400 space-y-1">
          <p className="text-stone-300 font-bold">
            💡 မှတ်သားရန် - အင်ဂျင်ပိုင်းပြုပြင်ရာတွင် အင်္ဂလိပ်စကားလုံးနှင့် အသံထွက်ကို တိကျစွာသိထားပါက OBD2 စကင်နာများ၊ စက်ရုံထုတ် မန်နျူရယ်စာအုပ်များ ဖတ်ရှုရာတွင် များစွာလွယ်ကူစေပါသည်။
          </p>
          <p className="text-[10px] text-stone-400">
            သိမ်းဆည်းရက်စွဲ: {new Date().toLocaleDateString('my-MM', { year: 'numeric', month: 'long', day: 'numeric' })} • Mingalaba Engine Tools
          </p>
        </div>

      </div>

      {/* Bottom Floating Prompt to save if scrolled */}
      <div className="text-center pt-2">
        <button
          onClick={handleDownloadImage}
          disabled={isExporting}
          className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 underline cursor-pointer p-2"
        >
          <Download className="w-3.5 h-3.5" />
          <span>အထက်ပါ စာရင်းဇယားတစ်ခုလုံးကို ဓာတ်ပုံ (PNG) အဖြစ် သိမ်းယူရန် ဤနေရာကို နှိပ်ပါ</span>
        </button>
      </div>

    </section>
  );
};
