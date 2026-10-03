import { Phrase, GreetingTemplate } from '../types';

export const PHRASES: Phrase[] = [
  {
    id: '1',
    burmese: 'မင်္ဂလာပါ',
    pronunciation: 'Min-ga-la-ba',
    english: 'Hello / Greetings (Auspicious blessing to you)',
    category: 'greetings',
    formal: false,
    notes: 'The universal polite greeting in Myanmar, wishing auspicious blessings.'
  },
  {
    id: '2',
    burmese: 'နေကောင်းလား',
    pronunciation: 'Nay kaung la?',
    english: 'How are you? (Are you doing well?)',
    category: 'greetings',
    formal: false,
    notes: 'Casual daily inquiry for health and wellbeing.'
  },
  {
    id: '3',
    burmese: 'နေကောင်းပါတယ်',
    pronunciation: 'Nay kaung ba de',
    english: 'I am doing well',
    category: 'greetings',
    formal: false
  },
  {
    id: '4',
    burmese: 'ကျေးဇူးတင်ပါတယ်',
    pronunciation: 'Cjay-zoo tin-ba-de',
    english: 'Thank you very much',
    category: 'polite',
    formal: true,
    notes: 'Standard polite thank you used across all situations.'
  },
  {
    id: '5',
    burmese: 'ရပါတယ်၊ ကိစ္စမရှိပါဘူး',
    pronunciation: 'Ya ba de, keik-sa ma-shi ba bu',
    english: "You're welcome / No problem",
    category: 'polite',
    formal: false
  },
  {
    id: '6',
    burmese: 'ခွင့်လွှတ်ပါ / တောင်းပန်ပါတယ်',
    pronunciation: 'Khwin-hlut-ba / Taung-pan-ba-de',
    english: 'Excuse me / I am sorry',
    category: 'polite',
    formal: true
  },
  {
    id: '7',
    burmese: 'မနက်ခင်း မင်္ဂလာပါ',
    pronunciation: 'Ma-net-khin Min-ga-la-ba',
    english: 'Good Morning',
    category: 'greetings',
    formal: false
  },
  {
    id: '8',
    burmese: 'ညချမ်း မင်္ဂလာပါ',
    pronunciation: 'Nya-chan Min-ga-la-ba',
    english: 'Good Evening',
    category: 'greetings',
    formal: false
  },
  {
    id: '9',
    burmese: 'ကောင်းသောနေ့လေး ဖြစ်ပါစေ',
    pronunciation: 'Kaung thaw nay lay phyit ba say',
    english: 'Have a wonderful day!',
    category: 'blessings',
    formal: true
  },
  {
    id: '10',
    burmese: 'ကိုယ်စိတ်နှစ်ဖြာ ကျန်းမာချမ်းသာပါစေ',
    pronunciation: 'Ko seik hna phya kyan-mar chan-thar ba say',
    english: 'May you be blessed with physical and mental health & prosperity',
    category: 'blessings',
    formal: true,
    notes: 'Traditional heartfelt Burmese blessing for loved ones and elders.'
  },
  {
    id: '11',
    burmese: 'ထမင်းစားပြီးပြီလား',
    pronunciation: 'Hta-min sar pee bee lar?',
    english: 'Have you eaten rice yet? (Warm cultural greeting)',
    category: 'daily',
    formal: false,
    notes: 'A traditional and friendly Burmese way of asking how someone is doing.'
  },
  {
    id: '12',
    burmese: 'အဆင်ပြေရဲ့လား',
    pronunciation: 'Ah-sin pyay ye lar?',
    english: 'Is everything going smoothly / alright?',
    category: 'daily',
    formal: false
  },
  {
    id: '13',
    burmese: 'နောက်မှ တွေ့ကြမယ်နော်',
    pronunciation: 'Nout hma tway gya me naw',
    english: 'See you later!',
    category: 'greetings',
    formal: false
  },
  {
    id: '14',
    burmese: 'စိတ်ချမ်းသာ ကိုယ်ကျန်းမာပါစေ',
    pronunciation: 'Seik chan-thar ko kyan-mar ba say',
    english: 'May you be peaceful in mind and healthy in body',
    category: 'blessings',
    formal: true
  },
  {
    id: '15',
    burmese: 'ကူညီပေးနိုင်မလား',
    pronunciation: 'Ku-nyi pay naing ma lar?',
    english: 'Could you please help me?',
    category: 'questions',
    formal: true
  },
  {
    id: '16',
    burmese: 'ဒါ ဘယ်လောက်လဲ',
    pronunciation: 'Da bal lout le?',
    english: 'How much is this?',
    category: 'questions',
    formal: false
  }
];

export const GREETING_TEMPLATES: GreetingTemplate[] = [
  {
    id: 'auspicious-metta',
    titleMm: 'မေတ္တာပို့ နှုတ်ခွန်းဆက်',
    titleEn: 'Auspicious Loving-Kindness',
    messageMm: 'စိတ်၏ချမ်းသာခြင်း၊ ကိုယ်၏ကျန်းမာခြင်းတို့နှင့် ပြည့်စုံပြီး လိုအင်ဆန္ဒများ တစ်လုံးတစ်ဝတည်း ပြည့်ဝပါစေကြောင်း မင်္ဂလာအပေါင်းနှင့် ဆုမွန်ကောင်းတောင်းအပ်ပါသည်။',
    messageEn: 'May you be blessed with peace of mind, vibrant physical health, and may all your heartfelt aspirations be fulfilled.',
    occasion: 'blessings',
    bgGradient: 'from-amber-600 via-amber-700 to-stone-900',
    accentColor: '#D97706'
  },
  {
    id: 'morning-sunshine',
    titleMm: 'မနက်ခင်း မင်္ဂလာဆုတောင်း',
    titleEn: 'Morning Blessing',
    messageMm: 'မင်္ဂလာရှိသော မနက်ခင်းလေးဖြစ်ပါစေ။ ယနေ့တစ်နေ့တာလုံး အေးချမ်းသာယာပြီး အလုပ်အကိုင် ကိစ္စအဝဝ အဆင်ပြေချောမွေ့ပါစေ။',
    messageEn: 'Wishing you an auspicious and bright morning. May your whole day be peaceful and every endeavor run smoothly.',
    occasion: 'morning',
    bgGradient: 'from-orange-500 via-amber-600 to-stone-900',
    accentColor: '#F97316'
  },
  {
    id: 'daily-encouragement',
    titleMm: 'အားပေး မေတ္တာလွှာ',
    titleEn: 'Warm Encouragement',
    messageMm: 'ဘဝခရီးလမ်းမှာ အောင်မြင်မှုများ၊ ပျော်ရွှင်မှုများနှင့် အပြုံးများ ဝေဆာနေပါစေကြောင်း လှိုက်လှဲစွာ ဆန္ဒပြုပါသည်။',
    messageEn: 'Wishing you abundant joy, smiles, and continuous success along life’s journey.',
    occasion: 'general',
    bgGradient: 'from-emerald-700 via-teal-800 to-stone-900',
    accentColor: '#059669'
  },
  {
    id: 'good-health',
    titleMm: 'ကျန်းမာရေး ဆုတောင်း',
    titleEn: 'Health & Longevity',
    messageMm: 'ရောဂါဘယ ကင်းဝေးပြီး သက်ရှည်ကျန်းမာ အေးချမ်းစွာ နေထိုင်နိုင်ပါစေ။',
    messageEn: 'May you be free from illnesses, and live a long, healthy, and serene life.',
    occasion: 'health',
    bgGradient: 'from-sky-700 via-indigo-900 to-stone-900',
    accentColor: '#0284C7'
  },
  {
    id: 'gratitude',
    titleMm: 'ကျေးဇူးတင်လွှာ',
    titleEn: 'Heartfelt Gratitude',
    messageMm: 'ကူညီစောင့်ရှောက်မှုနှင့် စေတနာမေတ္တာများအတွက် အထူးပင် ကျေးဇူးတင်ရှိပါသည်။',
    messageEn: 'Thank you deeply for your kind assistance, care, and warm benevolence.',
    occasion: 'gratitude',
    bgGradient: 'from-rose-700 via-pink-900 to-stone-900',
    accentColor: '#E11D48'
  }
];

export const PROVERBS = [
  {
    mm: 'စိတ်ကောင်းရှိက နေရာတကာ အဆင်ပြေသည်။',
    en: 'With a good heart, everything turns out fine wherever you go.',
    meaning: 'Purity of intention brings auspicious outcomes.'
  },
  {
    mm: 'ချစ်စကားချိုချို လူတိုင်းလို။',
    en: 'Gentle, loving words are welcomed by everyone.',
    meaning: 'Kind speech bridges all hearts.'
  },
  {
    mm: 'မေတ္တာသည် အောင်မြင်ခြင်း၏ အရင်းအမြစ်ဖြစ်သည်။',
    en: 'Loving-kindness is the true foundation of success.',
    meaning: 'Genuine goodwill conquers hostility and inspires peace.'
  },
  {
    mm: 'ကျန်းမာခြင်းသည် လာဘ်ကြီးတစ်ပါး။',
    en: 'Health is the greatest wealth (Arogyam Parama Labham).',
    meaning: 'Cherish good health as the highest blessing.'
  }
];
