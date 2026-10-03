export type JdmCategory =
  | 'settings_menu'
  | 'maintenance_oil'
  | 'warnings_alerts'
  | 'screen_flow';

export interface JdmVocabularyItem {
  id: string;
  japanese: string;
  romaji: string;
  burmesePronunciation: string;
  meaningMy: string;
  english: string;
  category: JdmCategory;
  categoryLabelMy: string;
  actionGuide: string;
  badge: string;
}

export interface JdmScreenFlow {
  id: string;
  titleMy: string;
  titleEn: string;
  carModels: string;
  purpose: string;
  steps: {
    stepNum: number;
    japaneseText: string;
    englishText: string;
    burmesePronunciation: string;
    descriptionMy: string;
  }[];
  proTip: string;
}

export const JDM_VOCABULARY_DATA: JdmVocabularyItem[] = [
  // 1. SETTINGS & MENU (ဆက်တင် & ခလုတ်များ)
  {
    id: 'settei',
    japanese: '設定',
    romaji: 'Settei',
    burmesePronunciation: 'ဆက်သဲအိ',
    meaningMy: 'ဆက်တင်များ (Settings / Setup)',
    english: 'Settings / Setup',
    category: 'settings_menu',
    categoryLabelMy: 'ဆက်တင် & ခလုတ်များ',
    actionGuide: 'ဒိုင်ခွက် သို့မဟုတ် TV စခရင်တွင် Reset လုပ်ရန် အရင်ဆုံး ရှာဖွေနှိပ်ရမည့် ပင်မခလုတ် ဖြစ်သည်။',
    badge: 'အဓိက ခလုတ်'
  },
  {
    id: 'sharyou-settei',
    japanese: '車両設定',
    romaji: 'Sharyou Settei',
    burmesePronunciation: 'ရှာလျော ဆက်သဲအိ',
    meaningMy: 'ကားဆက်တင် (Vehicle Settings)',
    english: 'Vehicle Settings',
    category: 'settings_menu',
    categoryLabelMy: 'ဆက်တင် & ခလုတ်များ',
    actionGuide: 'တံခါးလော့ခ်၊ မီးအလင်းရောင်နှင့် ကားစနစ် Reset လုပ်ရန် ဤစာလုံးကို နှိပ်ပါ။',
    badge: 'ကားဆက်တင်'
  },
  {
    id: 'maintenance',
    japanese: 'メンテナンス',
    romaji: 'Mentenansu',
    burmesePronunciation: 'မန်တဲနန်းစု',
    meaningMy: 'ထိန်းသိမ်းစစ်ဆေးမှု (Maintenance)',
    english: 'Maintenance',
    category: 'settings_menu',
    categoryLabelMy: 'ဆက်တင် & ခလုတ်များ',
    actionGuide: 'အင်ဂျင်ဝိုင်၊ ဘရိတ်၊ တာယာစစ်ဆေးမှု ရက်စွဲ/ကီလို Reset ပြုလုပ်မည့် နေရာဖြစ်သည်။',
    badge: 'ထိန်းသိမ်းမှု'
  },
  {
    id: 'shokika',
    japanese: '初期化',
    romaji: 'Shokika',
    burmesePronunciation: 'ရှောခိခ',
    meaningMy: 'မူလသုည ပြန်သတ်မှတ်ခြင်း (Initialization / Reset)',
    english: 'Initialization / Factory Reset',
    category: 'settings_menu',
    categoryLabelMy: 'ဆက်တင် & ခလုတ်များ',
    actionGuide: 'ဆက်တင်များ သို့မဟုတ် မှတ်ဉာဏ်များကို Reset ပြန်လုပ်ရန် ဤစာလုံးကို နှိပ်ပါ။',
    badge: 'Reset ခလုတ်'
  },
  {
    id: 'risetto',
    japanese: 'リセット',
    romaji: 'Risetto',
    burmesePronunciation: 'ရီဆက်တို',
    meaningMy: 'ပြန်လည်သတ်မှတ်ခြင်း (Reset)',
    english: 'Reset',
    category: 'settings_menu',
    categoryLabelMy: 'ဆက်တင် & ခလုတ်များ',
    actionGuide: 'အင်ဂျင်ဝိုင်မီး သို့မဟုတ် ကီလိုကို သုညပြန်ချရန် ဤစာလုံးကို နှိပ်ပါ။',
    badge: 'Reset ခလုတ်'
  },
  {
    id: 'hai',
    japanese: 'はい',
    romaji: 'Hai',
    burmesePronunciation: 'ဟိုင်း',
    meaningMy: 'ဟုတ်ကဲ့ / သဘောတူပါသည် (Yes / OK)',
    english: 'Yes / Confirm',
    category: 'settings_menu',
    categoryLabelMy: 'ဆက်တင် & ခလုတ်များ',
    actionGuide: 'Reset လုပ်မှာ သေချာပါသလားဟု စခရင်က မေးလာပါက ဤ "はい" (Yes) ကို ရွေးချယ်နှိပ်ပါ။',
    badge: 'အတည်ပြုခြင်း'
  },
  {
    id: 'iie',
    japanese: 'いいえ',
    romaji: 'Iie',
    burmesePronunciation: 'အီအဲ',
    meaningMy: 'မဟုတ်ပါ / ပယ်ဖျက်မည် (No / Cancel)',
    english: 'No / Cancel',
    category: 'settings_menu',
    categoryLabelMy: 'ဆက်တင် & ခလုတ်များ',
    actionGuide: 'မလုပ်တော့ဘဲ ပြန်ထွက်လိုပါက ဤခလုတ်ကို နှိပ်ပါ။',
    badge: 'ပယ်ဖျက်ခြင်း'
  },
  {
    id: 'kanryou',
    japanese: '完了',
    romaji: 'Kanryou',
    burmesePronunciation: 'ခန်လျော',
    meaningMy: 'ပြီးစီးပါပြီ (Complete / Finished)',
    english: 'Complete / Done',
    category: 'settings_menu',
    categoryLabelMy: 'ဆက်တင် & ခလုတ်များ',
    actionGuide: 'Reset ပြုလုပ်ခြင်း အောင်မြင်စွာ ပြီးဆုံးသွားကြောင်း အသိပေးသည့် စာသားဖြစ်သည်။',
    badge: 'ပြီးဆုံးခြင်း'
  },

  // 2. MAINTENANCE & OIL (အင်ဂျင်ဝိုင် & ပစ္စည်းများ)
  {
    id: 'oil-koukan',
    japanese: 'オイル交換',
    romaji: 'Oiru Koukan',
    burmesePronunciation: 'အိုအိရု ခိုးခန်း',
    meaningMy: 'အင်ဂျင်ဝိုင် လဲလှယ်ခြင်း (Oil Change)',
    english: 'Engine Oil Replacement',
    category: 'maintenance_oil',
    categoryLabelMy: 'အင်ဂျင်ဝိုင် & စစ်ဆေးမှု',
    actionGuide: 'အင်ဂျင်ဝိုင် အသစ်လဲပြီးပါက ဤစာလုံးကို နှိပ်၍ Reset လုပ်ပေးရမည်။',
    badge: 'အင်ဂျင်ဝိုင်'
  },
  {
    id: 'oil-filter',
    japanese: 'オイルフィルター',
    romaji: 'Oiru Firutaa',
    burmesePronunciation: 'အိုအိရု ဖိရုတား',
    meaningMy: 'ဆီစစ်ဘူး (Oil Filter)',
    english: 'Oil Filter Replacement',
    category: 'maintenance_oil',
    categoryLabelMy: 'အင်ဂျင်ဝိုင် & စစ်ဆေးမှု',
    actionGuide: 'ဆီစစ်ဘူးလဲပြီးနောက် သက်တမ်းကီလို ပြန်သတ်မှတ်ရန် နှိပ်ပါ။',
    badge: 'ဆီစစ်ဘူး'
  },
  {
    id: 'tire-kuukiatsu',
    japanese: 'タイヤ空気圧',
    romaji: 'Taiya Kuukiatsu',
    burmesePronunciation: 'တာယာ ခူးခိအာဆု',
    meaningMy: 'တာယာလေပေါင် (Tire Air Pressure / TPMS)',
    english: 'Tire Air Pressure',
    category: 'maintenance_oil',
    categoryLabelMy: 'အင်ဂျင်ဝိုင် & စစ်ဆေးမှု',
    actionGuide: 'တာယာလေပေါင်မီးငြိမ်းရန် သို့မဟုတ် လေပေါင်ချိန်ညှိရန် ဤမီနူးသို့ ဝင်ပါ။',
    badge: 'တာယာလေပေါင်'
  },
  {
    id: 'brake-pad',
    japanese: 'ブレーキパッド',
    romaji: 'Bureeki Paddo',
    burmesePronunciation: 'ဘူရဲခိ ပတ်ဒို',
    meaningMy: 'ဘရိတ်ပြား (Brake Pads)',
    english: 'Brake Pads',
    category: 'maintenance_oil',
    categoryLabelMy: 'အင်ဂျင်ဝိုင် & စစ်ဆေးမှု',
    actionGuide: 'ဘရိတ်ပြားအသစ်လဲပြီးနောက် ကီလိုမှတ်တမ်း ပြန်သတ်မှတ်သည့် နေရာဖြစ်သည်။',
    badge: 'ဘရိတ်ပြား'
  },
  {
    id: 'teiki-tenken',
    japanese: '定期点検',
    romaji: 'Teiki Tenken',
    burmesePronunciation: 'သဲအိခိ သန်းခမ်း',
    meaningMy: 'ပုံမှန်ကာလ စစ်ဆေးမှု (Periodic Inspection)',
    english: 'Scheduled Periodic Inspection',
    category: 'maintenance_oil',
    categoryLabelMy: 'အင်ဂျင်ဝိုင် & စစ်ဆေးမှု',
    actionGuide: '၆ လ သို့မဟုတ် ၁ နှစ်ပြည့်တိုင်း ဒိုင်ခွက်တွင် ပေါ်လာသော စစ်ဆေးရန် သတိပေးချက် ဖြစ်သည်။',
    badge: 'ပုံမှန်စစ်ဆေးမှု'
  },

  // 3. WARNINGS & ALERTS (ဒိုင်ခွက် သတိပေးစာတန်းများ)
  {
    id: 'key-denchi',
    japanese: 'キー電池消耗',
    romaji: 'Kii Denchi Shoumour',
    burmesePronunciation: 'ခီး ဒန်းချိ ရှိုးမိုး',
    meaningMy: 'သော့ရီမုတ် ဓာတ်ခဲ အားကုန်နေသည်',
    english: 'Key Fob Battery Low',
    category: 'warnings_alerts',
    categoryLabelMy: 'ဒိုင်ခွက် သတိပေးချက်များ',
    actionGuide: 'ဤစာတန်းပေါ်ပါက စမတ်ကီးအတွင်းရှိ CR2032 ဓာတ်ခဲ အသစ် ချက်ချင်း လဲလှယ်ပေးပါ။',
    badge: 'သော့ဓာတ်ခဲ'
  },
  {
    id: 'handle-sayu',
    japanese: 'ハンドルを左右いっぱいに切ってください',
    romaji: 'Handoru wo Sayuu Ippai ni Kitte Kudasai',
    burmesePronunciation: 'ဟန်ဒိုရု ဝေါ့ ဆာယူး အစ်ပိုင်နိ ခစ်သဲ ခုဒါဆိုင်း',
    meaningMy: 'စတီယာရင်ကို ဘယ်/ညာ အဆုံးထိ လှည့်ပေးပါ',
    english: 'Please turn steering wheel fully left and right',
    category: 'warnings_alerts',
    categoryLabelMy: 'ဒိုင်ခွက် သတိပေးချက်များ',
    actionGuide: 'ဘက်ထရီဖြုတ်ပြီးချိန် နောက်ကင်မရာ လမ်းပြမျဉ်း ပြန်ညှိရန် စခရင်က တောင်းဆိုသော စာတန်းဖြစ်သည်။ စတီယာရင်ကို ဘယ်အဆုံး၊ ညာအဆုံး လှည့်ပေးလိုက်ပါ။',
    badge: 'ဘက်ကင်မရာ'
  },
  {
    id: 'han-doa',
    japanese: '半ドア',
    romaji: 'Han Doa',
    burmesePronunciation: 'ဟန် ဒိုအာ',
    meaningMy: 'တံခါး မလုံပါ / တံခါး ဟနေပါသည်',
    english: 'Door Ajar / Partially Open Door',
    category: 'warnings_alerts',
    categoryLabelMy: 'ဒိုင်ခွက် သတိပေးချက်များ',
    actionGuide: 'တံခါး ၄ ချပ် သို့မဟုတ် နောက်ဖုံး သေချာ မပိတ်ဘဲ ဟနေကြောင်း သတိပေးခြင်း ဖြစ်သည်။',
    badge: 'တံခါးဟနေသည်'
  },
  {
    id: 'koushou',
    japanese: '故障 / システム点検',
    romaji: 'Koushou / Shisutemu Tenken',
    burmesePronunciation: 'ခိုးရှိုး / ရှစ်စုသဲမု သန်းခမ်း',
    meaningMy: 'စနစ် ချို့ယွင်းနေပါသည် / စစ်ဆေးပါ',
    english: 'System Malfunction / Inspection Required',
    category: 'warnings_alerts',
    categoryLabelMy: 'ဒိုင်ခွက် သတိပေးချက်များ',
    actionGuide: 'OBD2 စကင်နာထိုး၍ DTC Error Code စစ်ဆေးရမည်။',
    badge: 'ချို့ယွင်းချက်'
  },
  {
    id: 'engine-oil-rekka',
    japanese: 'エンジンオイル劣化',
    romaji: 'Enjin Oiru Rekka',
    burmesePronunciation: 'အန်းဂျင်း အိုအိရု ရက်ခ',
    meaningMy: 'အင်ဂျင်ဝိုင် သက်တမ်းလွန် သို့မဟုတ် ပျက်စီးနေသည်',
    english: 'Engine Oil Degraded',
    category: 'warnings_alerts',
    categoryLabelMy: 'ဒိုင်ခွက် သတိပေးချက်များ',
    actionGuide: 'ဒီဇယ်ချိန်းကားများ (Mazda SkyActiv-D / Toyota) တွင် ဤစာတန်းပေါ်ပါက အင်ဂျင်ဝိုင်လဲပြီး Oil Chain Reset လုပ်ရမည်။',
    badge: 'အင်ဂျင်ဝိုင်ပျက်စီး'
  }
];

export const JDM_SCREEN_FLOWS: JdmScreenFlow[] = [
  {
    id: 'toyota-screen-oil-reset',
    titleMy: 'တိုယိုတာ (Crown / Alphard / Harrier) TV ပေါ်တွင် အင်ဂျင်ဝိုင် Reset လုပ်နည်း',
    titleEn: 'Toyota JDM Infotainment Oil Reset Navigation Path',
    carModels: 'Toyota Crown (GRS200/210), Alphard/Vellfire (20/30), Harrier (60), Mark X',
    purpose: 'စက်မသုံးဘဲ အလယ် TV မျက်နှာပြင်ပေါ်တွင် ဂျပန်စာ မီနူးများကို အဆင့်ဆင့် နှိပ်သွား၍ Reset လုပ်နည်း။',
    steps: [
      {
        stepNum: 1,
        japaneseText: '設定 / MENU',
        englishText: 'Settings / MENU Button',
        burmesePronunciation: 'ဆက်သဲအိ (သို့မဟုတ် တီဗွီဘေးရှိ MENU ခလုတ်)',
        descriptionMy: 'တီဗွီမျက်နှာပြင်ဘေးရှိ "MENU" ခလုတ်ကို နှိပ်ပါ သို့မဟုတ် စခရင်ပေါ်ရှိ "設定" (Settings) ကို နှိပ်ပါ။'
      },
      {
        stepNum: 2,
        japaneseText: 'メンテナンス',
        englishText: 'Maintenance',
        burmesePronunciation: 'မန်တဲနန်းစု',
        descriptionMy: 'ဂေါက်ပုံ သို့မဟုတ် ကားပုံဘေးရှိ "メンテナンス" (Maintenance) ကို နှိပ်ပါ။'
      },
      {
        stepNum: 3,
        japaneseText: 'エンジンオイル',
        englishText: 'Engine Oil',
        burmesePronunciation: 'အန်းဂျင်း အိုအိရု',
        descriptionMy: 'ဆီကရားပုံလေးနှင့်တွဲလျက်ရှိသော "エンジンオイル" (Engine Oil) ကို ရွေးချယ်ပါ။'
      },
      {
        stepNum: 4,
        japaneseText: 'リセット / 初期化',
        englishText: 'Reset / Initialize',
        burmesePronunciation: 'ရီဆက်တို (သို့မဟုတ်) ရှောခိခ',
        descriptionMy: 'မျက်နှာပြင်၏ ညာဘက်အောက်ခြေရှိ "リセット" (Reset) ခလုတ်လေးကို နှိပ်ပါ။'
      },
      {
        stepNum: 5,
        japaneseText: 'はい',
        englishText: 'Yes',
        burmesePronunciation: 'ဟိုင်း',
        descriptionMy: '"အချက်အလက်ကို ပြန်လည်သတ်မှတ်မည် သေချာပါသလား" ဟု မေးလာပါက ဘယ်ဘက်ရှိ "はい" (Yes) ကို နှိပ်ပါ။'
      },
      {
        stepNum: 6,
        japaneseText: '完了',
        englishText: 'Complete',
        burmesePronunciation: 'ခန်လျော',
        descriptionMy: '"完了" (ပြီးစီးပါပြီ) ဟု ပေါ်လာပါက အင်ဂျင်ဝိုင် ကီလိုမှတ်တမ်း သုညသို့ အောင်မြင်စွာ ပြန်ရောက်သွားပါပြီ။'
      }
    ],
    proTip: 'ဆီစစ်ဘူးပါ လဲထားပါက အထက်ပါနည်းအတိုင်း "オイルフィルター" (Oil Filter) နေရာသို့လည်း ဝင်ရောက်၍ ထပ်မံ Reset လုပ်ပေးပါ။'
  },
  {
    id: 'back-camera-guideline-setup',
    titleMy: 'တိုယိုတာ / လက်ဇက်စ် နောက်ကင်မရာ လမ်းပြမျဉ်း ဆက်တင်ချိန်နည်း',
    titleEn: 'Reverse Camera Steering Guideline Calibration Flow',
    carModels: 'Toyota & Lexus ကားများအားလုံး (JDM Navigation)',
    purpose: 'နောက်ဆုတ်ချိန် ကင်မရာမျဉ်း မကွေ့ဘဲ ဂျပန်စာတန်း ပေါ်နေပါက ချိန်ညှိနည်း။',
    steps: [
      {
        stepNum: 1,
        japaneseText: 'バックカメラ設定',
        englishText: 'Back Camera Settings',
        burmesePronunciation: 'ဘတ်ခု ခါမဲရာ ဆက်သဲအိ',
        descriptionMy: 'ဂီယာ R ထိုးထားစဉ် သို့မဟုတ် Settings ထဲရှိ ကင်မရာဆက်တင်သို့ ဝင်ပါ။'
      },
      {
        stepNum: 2,
        japaneseText: 'ガイドライン設定',
        englishText: 'Guideline Settings',
        burmesePronunciation: 'ဂိုင်ဒိုရိုင်း ဆက်သဲအိ',
        descriptionMy: 'လမ်းပြမျဉ်း ဆက်တင် "ガイドライン設定" ကို နှိပ်ပါ။'
      },
      {
        stepNum: 3,
        japaneseText: 'ハンドルを左右いっぱいに切ってください',
        englishText: 'Turn steering wheel fully left and right',
        burmesePronunciation: 'ဟန်ဒိုရု ဝေါ့ ဆာယူး အစ်ပိုင်နိ ခစ်သဲ ခုဒါဆိုင်း',
        descriptionMy: 'ဤစာတန်း ပေါ်လာသည်နှင့် စတီယာရင်ကို ဘယ်ဘက်အဆုံး ၂ စက္ကန့်၊ ညာဘက်အဆုံး ၂ စက္ကန့် လှည့်ပေးပါ။'
      },
      {
        stepNum: 4,
        japaneseText: '設定完了',
        englishText: 'Setting Complete',
        burmesePronunciation: 'ဆက်သဲအိ ခန်လျော',
        descriptionMy: '"設定完了" (ဆက်တင်ပြီးစီးပါပြီ) ဟု ပေါ်လာပြီး လမ်းပြမျဉ်းများ စတီယာရင်နှင့်အတူ လိုက်လံ ကွေ့ခေါက်ပါမည်။'
      }
    ],
    proTip: 'စတီယာရင် လှည့်ချိန်တွင် ကားကို စက်နှိုးထားရမည်ဖြစ်ပြီး ဂီယာကို P တွင် ထားရှိရပါမည်။'
  }
];
