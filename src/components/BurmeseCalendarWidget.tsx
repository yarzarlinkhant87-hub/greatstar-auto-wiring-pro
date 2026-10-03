import React, { useState } from 'react';
import { getFormattedDateInfo } from '../utils/burmeseDate';
import { PROVERBS } from '../data/phrases';
import { Language } from '../types';
import { playChime } from '../utils/audio';
import { Calendar, Compass, Quote, RefreshCw } from 'lucide-react';

interface BurmeseCalendarWidgetProps {
  language: Language;
  soundEnabled: boolean;
}

export const BurmeseCalendarWidget: React.FC<BurmeseCalendarWidgetProps> = ({ language, soundEnabled }) => {
  const dateInfo = getFormattedDateInfo();
  const [proverbIndex, setProverbIndex] = useState(0);

  const currentProverb = PROVERBS[proverbIndex % PROVERBS.length];

  const handleNextProverb = () => {
    setProverbIndex((prev) => (prev + 1) % PROVERBS.length);
    if (soundEnabled) {
      playChime(640, 1.0);
    }
  };

  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today's Day & Auspicious Sign Card */}
        <div className="p-6 rounded-2xl bg-stone-900/80 border border-amber-500/20 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
            <Calendar className="w-4 h-4" />
            <span>{language === 'my' ? 'ယနေ့ ရက်စွဲနှင့် နေ့နံ' : "Today's Day & Myanmar Sign"}</span>
          </div>

          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-bold text-amber-100 font-['Noto_Sans_Myanmar'] mb-1">
              {dateInfo.burmeseDateStr}
            </div>
            <div className="text-xs sm:text-sm text-stone-400 font-sans mb-4">
              {dateInfo.formattedEn}
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>{language === 'my' ? `မြန်မာ့နေ့နံ ဂြိုဟ် - ${dateInfo.planetMm}` : `Day Sign: ${dateInfo.planetMm}`}</span>
            </div>
          </div>

          <p className="text-xs text-stone-400 mt-4 pt-3 border-t border-stone-800">
            {language === 'my'
              ? 'နေ့စဉ် မင်္ဂလာတရားတော်များနှင့်အညီ စိတ်ချမ်းသာ ကိုယ်ကျန်းမာရှိကြပါစေ။'
              : 'May your day be filled with auspicious mindfulness and peaceful blessings.'}
          </p>
        </div>

        {/* Daily Myanmar Proverb Card */}
        <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/30 transition-all shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Quote className="w-4 h-4" />
              <span>{language === 'my' ? 'နေ့စဉ် မြန်မာ့စကားပုံနှင့် သင်ခန်းစာ' : 'Burmese Proverb & Wisdom'}</span>
            </div>
            <button
              id="next-proverb-btn"
              onClick={handleNextProverb}
              className="p-1.5 rounded-lg text-stone-400 hover:text-amber-300 hover:bg-stone-800 transition-colors flex items-center gap-1 text-xs cursor-pointer"
              title="Next Proverb"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="text-[11px]">{language === 'my' ? 'နောက်တစ်ခု' : 'Next'}</span>
            </button>
          </div>

          <div className="my-2">
            <h4 className="text-lg sm:text-xl font-bold text-amber-200 mb-2 font-['Noto_Sans_Myanmar'] leading-snug">
              "{currentProverb.mm}"
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 italic mb-2 font-serif">
              "{currentProverb.en}"
            </p>
            <div className="text-xs text-amber-400/80 bg-amber-500/5 p-2.5 rounded-xl border border-amber-500/15">
              <span className="font-semibold">{language === 'my' ? 'ဆိုလိုရင်း - ' : 'Meaning: '}</span>
              {currentProverb.meaning}
            </div>
          </div>

          <div className="text-[11px] text-stone-400 pt-3 border-t border-stone-800 mt-2">
            {language === 'my' ? 'ရှေးလူကြီးများ၏ အဖိုးတန် ဆုံးမစကားများ' : 'Traditional Myanmar wisdom and proverbs'}
          </div>
        </div>
      </div>
    </section>
  );
};
