import React, { useState } from 'react';
import { PHRASES } from '../data/phrases';
import { Language, Phrase } from '../types';
import { playChime, speakText } from '../utils/audio';
import { Search, Volume2, Copy, Check, BookOpen } from 'lucide-react';

interface PhraseBookProps {
  language: Language;
  soundEnabled: boolean;
}

export const PhraseBook: React.FC<PhraseBookProps> = ({ language, soundEnabled }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', mm: 'အားလုံး', en: 'All' },
    { id: 'greetings', mm: 'နှုတ်ဆက်စကား', en: 'Greetings' },
    { id: 'polite', mm: 'ယဉ်ကျေးစကား', en: 'Polite' },
    { id: 'blessings', mm: 'မေတ္တာနှင့်ဆုတောင်း', en: 'Blessings' },
    { id: 'daily', mm: 'နေ့စဉ်သုံး', en: 'Daily Life' },
    { id: 'questions', mm: 'အမေးစကား', en: 'Questions' },
  ];

  const filteredPhrases = PHRASES.filter((phrase) => {
    const matchesCategory = activeCategory === 'all' || phrase.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      phrase.burmese.includes(q) ||
      phrase.pronunciation.toLowerCase().includes(q) ||
      phrase.english.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleSpeak = (phrase: Phrase) => {
    if (soundEnabled) {
      playChime(620, 1.0);
    }
    speakText(phrase.burmese);
  };

  const handleCopy = (phrase: Phrase) => {
    navigator.clipboard.writeText(`${phrase.burmese} (${phrase.pronunciation}) - ${phrase.english}`);
    setCopiedId(phrase.id);
    if (soundEnabled) {
      playChime(750, 0.8);
    }
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              {language === 'my' ? 'မြန်မာစကားပြော လမ်းညွှန်' : 'Burmese Phrasebook'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-100">
              {language === 'my' ? 'အသုံးများသော မြန်မာစကားပြောနှင့် အဓိပ္ပာယ်များ' : 'Essential Burmese Greetings & Expressions'}
            </h2>
            <p className="text-sm text-stone-400 mt-1">
              {language === 'my'
                ? 'အသံထွက်များ၊ အဓိပ္ပာယ်ဖွင့်ဆိုချက်များနှင့် နေ့စဉ်သုံး ယဉ်ကျေးစကားများ'
                : 'Listen to authentic pronunciations, explore translations, and learn daily polite etiquette.'}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'my' ? 'ရှာဖွေရန် (မြန်မာ / English / Pronunciation)...' : 'Search phrases or pronunciation...'}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-stone-900 border border-stone-700 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`phrase-category-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md font-semibold'
                  : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:border-stone-700 hover:text-white'
              }`}
            >
              {language === 'my' ? cat.mm : cat.en}
            </button>
          ))}
        </div>

        {/* Phrase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPhrases.map((phrase) => (
            <div
              key={phrase.id}
              className="p-5 rounded-2xl bg-stone-900/85 border border-stone-800 hover:border-amber-500/40 transition-all hover:shadow-lg hover:shadow-amber-500/5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xl font-bold text-amber-200 tracking-wide font-['Noto_Sans_Myanmar']">
                    {phrase.burmese}
                  </span>
                  {phrase.formal && (
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                      {language === 'my' ? 'ယဉ်ကျေး' : 'Polite'}
                    </span>
                  )}
                </div>

                <div className="text-xs font-mono text-amber-400/90 mb-2">
                  🗣️ {phrase.pronunciation}
                </div>

                <p className="text-sm text-stone-300 leading-relaxed mb-3">
                  {phrase.english}
                </p>

                {phrase.notes && (
                  <p className="text-xs text-stone-400 bg-stone-950/60 p-2 rounded-lg border border-stone-800/80 mb-3 italic">
                    💡 {phrase.notes}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-800/80 mt-auto">
                <button
                  id={`speak-phrase-btn-${phrase.id}`}
                  onClick={() => handleSpeak(phrase)}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-200 hover:text-amber-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'my' ? 'နားထောင်ရန်' : 'Listen'}</span>
                </button>

                <button
                  id={`copy-phrase-btn-${phrase.id}`}
                  onClick={() => handleCopy(phrase)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors cursor-pointer"
                  title="Copy Phrase"
                >
                  {copiedId === phrase.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPhrases.length === 0 && (
          <div className="text-center py-12 text-stone-400">
            <p className="text-sm">
              {language === 'my' ? 'ရှာဖွေမှုနှင့် ကိုက်ညီသော စကားစု မတွေ့ရှိပါ' : 'No matching phrases found.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
