export const BURMESE_DAYS = [
  { my: 'တနင်္ဂနွေ', en: 'Sunday', planet: 'တနင်္ဂနွေ (ဂဠုန်)' },
  { my: 'တနင်္လာ', en: 'Monday', planet: 'တနင်္လာ (ကျား)' },
  { my: 'အင်္ဂါ', en: 'Tuesday', planet: 'အင်္ဂါ (ခြင်္သေ့)' },
  { my: 'ဗုဒ္ဓဟူး', en: 'Wednesday', planet: 'ဗုဒ္ဓဟူး (ဆင်)' },
  { my: 'ကြာသပတေး', en: 'Thursday', planet: 'ကြာသပတေး (ကြွက်)' },
  { my: 'သောကြာ', en: 'Friday', planet: 'သောကြာ (ပူး)' },
  { my: 'စနေ', en: 'Saturday', planet: 'စနေ (နဂါး)' },
];

export const BURMESE_MONTHS = [
  'တန်ခူး', 'ကဆုန်', 'နယုန်', 'ဝါဆို',
  'ဝါခေါင်', 'တော်သလင်း', 'သီတင်းကျွတ်', 'တန်ဆောင်မုန်း',
  'နတ်တော်', 'ပြာသို', 'တပို့တွဲ', 'တပေါင်း'
];

export const BURMESE_NUMERALS = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'];

export function toBurmeseDigits(num: number | string): string {
  return num
    .toString()
    .split('')
    .map(digit => {
      const parsed = parseInt(digit, 10);
      return !isNaN(parsed) && parsed >= 0 && parsed <= 9 ? BURMESE_NUMERALS[parsed] : digit;
    })
    .join('');
}

export function getTimeBasedGreeting(): {
  greetingMm: string;
  greetingEn: string;
  iconType: 'morning' | 'day' | 'evening' | 'night';
  descriptionMm: string;
} {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      greetingMm: 'မနက်ခင်း မင်္ဂလာပါ',
      greetingEn: 'Good Morning',
      iconType: 'morning',
      descriptionMm: 'လန်းဆန်းတက်ကြွသော နေ့သစ်လေး ဖြစ်ပါစေ'
    };
  } else if (hour >= 12 && hour < 16) {
    return {
      greetingMm: 'နေ့လယ်ခင်း မင်္ဂလာပါ',
      greetingEn: 'Good Afternoon',
      iconType: 'day',
      descriptionMm: 'လုပ်ငန်းဆောင်တာများ အဆင်ပြေချောမွေ့ပါစေ'
    };
  } else if (hour >= 16 && hour < 20) {
    return {
      greetingMm: 'ညနေခင်း မင်္ဂလာပါ',
      greetingEn: 'Good Evening',
      iconType: 'evening',
      descriptionMm: 'အေးချမ်းသာယာသော ညနေခင်းလေး ဖြစ်ပါစေ'
    };
  } else {
    return {
      greetingMm: 'ညချမ်း မင်္ဂလာပါ',
      greetingEn: 'Good Night / Peaceful Evening',
      iconType: 'night',
      descriptionMm: 'စိတ်၏ချမ်းသာခြင်း ကိုယ်၏ကျန်းမာခြင်းနှင့် ပြည့်စုံပါစေ'
    };
  }
}

export function getFormattedDateInfo() {
  const now = new Date();
  const dayIndex = now.getDay();
  const dayName = BURMESE_DAYS[dayIndex];
  
  const formattedEn = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const burmeseDateStr = `${dayName.my}နေ့၊ ${toBurmeseDigits(now.getDate())} ရက်`;
  
  return {
    dayMm: dayName.my,
    dayEn: dayName.en,
    planetMm: dayName.planet,
    burmeseDateStr,
    formattedEn,
    yearMm: toBurmeseDigits(now.getFullYear())
  };
}
