import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, Sun, Moon, Sunrise, Sunset, Copy, Check, Heart, Send } from 'lucide-react';
import { getTimeBasedGreeting } from '../utils/burmeseDate';
import { playChime, speakText } from '../utils/audio';
import { Language } from '../types';

interface HeroGreetingProps {
  language: Language;
  soundEnabled: boolean;
}

export const HeroGreeting: React.FC<HeroGreetingProps> = ({ language, soundEnabled }) => {
  const timeGreeting = getTimeBasedGreeting();
  const [copied, setCopied] = useState(false);
  const [activeReply, setActiveReply] = useState<string | null>(null);
  const [guestName, setGuestName] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [heartsCount, setHeartsCount] = useState(108);

  const handlePlayChime = () => {
    if (soundEnabled) {
      playChime(528, 2.5);
    }
    speakText('မင်္ဂလာပါ');
  };

  const handleCopyGreeting = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReplyClick = (reply: string) => {
    setActiveReply(reply);
    if (soundEnabled) {
      playChime(660, 1.8);
    }
    speakText(reply);
  };

  const handleSendLove = () => {
    setHeartsCount(prev => prev + 1);
    if (soundEnabled) {
      playChime(784, 1.2);
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestName.trim()) {
      setSubmittedName(guestName.trim());
      if (soundEnabled) {
        playChime(587, 2.0);
      }
    }
  };

  const getTimeIcon = () => {
    switch (timeGreeting.iconType) {
      case 'morning':
        return <Sunrise className="w-5 h-5 text-amber-400" />;
      case 'day':
        return <Sun className="w-5 h-5 text-yellow-400" />;
      case 'evening':
        return <Sunset className="w-5 h-5 text-orange-400" />;
      case 'night':
        return <Moon className="w-5 h-5 text-indigo-300" />;
    }
  };

  return (
    <section className="relative py-8 sm:py-14 px-4 sm:px-6 overflow-hidden">
      {/* Subtle background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Time of day pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-800/90 border border-amber-500/30 text-amber-200 text-sm mb-6 shadow-inner"
        >
          {getTimeIcon()}
          <span className="font-medium">{timeGreeting.greetingMm}</span>
          <span className="text-stone-400 text-xs">({timeGreeting.greetingEn})</span>
        </motion.div>

        {/* Main Display Title */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative inline-block mb-6"
        >
          <div className="p-1 rounded-3xl bg-gradient-to-b from-amber-400/30 via-amber-600/10 to-transparent">
            <div className="px-6 py-6 sm:px-12 sm:py-10 rounded-[22px] bg-stone-900/95 border border-amber-500/30 shadow-2xl backdrop-blur-xl">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
                {language === 'my' ? 'ရိုးရာ မင်္ဂလာ နှုတ်ခွန်းဆက်' : 'Traditional Myanmar Greeting'}
              </span>

              <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 tracking-wide my-2 drop-shadow-sm font-['Noto_Sans_Myanmar']">
                {submittedName ? `${submittedName}၊ မင်္ဂလာပါ` : 'မင်္ဂလာပါ'}
              </h2>

              <p className="text-base sm:text-lg text-amber-300/80 font-serif italic mt-2">
                "Mingalaba — Wishing you auspicious blessings & prosperity"
              </p>

              {/* Action Buttons inside Card */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <button
                  id="play-sound-greeting-btn"
                  onClick={handlePlayChime}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm transition-all shadow-lg shadow-amber-500/25 flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-stone-950" />
                  <span>{language === 'my' ? 'ခေါင်းလောင်းသံ & အသံထွက်' : 'Chime & Pronunciation'}</span>
                </button>

                <button
                  id="copy-greeting-btn"
                  onClick={() => handleCopyGreeting(submittedName ? `${submittedName}၊ မင်္ဂလာပါ` : 'မင်္ဂလာပါ')}
                  className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-sm transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300">{language === 'my' ? 'ကူးယူပြီးပါပြီ' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-stone-400" />
                      <span>{language === 'my' ? 'စာသား ကူးယူရန်' : 'Copy Greeting'}</span>
                    </>
                  )}
                </button>

                <button
                  id="metta-heart-btn"
                  onClick={handleSendLove}
                  className="px-3.5 py-2.5 rounded-xl bg-rose-950/50 hover:bg-rose-900/50 text-rose-300 border border-rose-800/40 text-sm transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                  title="Send Metta (Loving Kindness)"
                >
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                  <span>{heartsCount}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Name Personalizer input */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md mx-auto mb-8"
        >
          <form onSubmit={handleNameSubmit} className="flex gap-2">
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder={language === 'my' ? 'သင်၏ အမည် ရိုက်ထည့်ပါ (ဥပမာ- ကိုမောင်မောင်)...' : 'Enter your name to personalize...'}
              className="flex-1 px-4 py-2.5 rounded-xl bg-stone-900/90 border border-stone-700 focus:border-amber-500 text-stone-100 text-sm placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-medium text-sm transition-all shadow flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{language === 'my' ? 'ထည့်မည်' : 'Set'}</span>
            </button>
          </form>
          {submittedName && (
            <button
              onClick={() => {
                setGuestName('');
                setSubmittedName('');
              }}
              className="text-xs text-stone-400 hover:text-amber-300 mt-2 underline cursor-pointer"
            >
              {language === 'my' ? 'မူလအတိုင်း ပြန်ထားရန်' : 'Reset to default greeting'}
            </button>
          )}
        </motion.div>

        {/* Quick Polite Replies */}
        <div className="pt-2">
          <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-3">
            {language === 'my' ? 'နှုတ်ဆက် ပြန်ကြားစကားများ (Quick Polite Responses)' : 'Polite Responses to Mingalaba'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { mm: 'မင်္ဂလာပါ ခင်ဗျာ', en: 'Mingalaba Khin-byar (Male)', desc: 'Respectful reply by gentlemen' },
              { mm: 'မင်္ဂလာပါ ရှင်', en: 'Mingalaba Shin (Female)', desc: 'Respectful reply by ladies' },
              { mm: 'နေကောင်းပါတယ် ခင်ဗျာ', en: 'I am doing well (Male)' },
              { mm: 'ကျေးဇူးတင်ပါတယ်', en: 'Thank you very much' },
              { mm: 'အဆင်ပြေပါတယ်', en: 'Everything is going well' },
            ].map((reply, idx) => (
              <button
                key={idx}
                id={`reply-btn-${idx}`}
                onClick={() => handleReplyClick(reply.mm)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all border cursor-pointer ${
                  activeReply === reply.mm
                    ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md shadow-amber-500/20 scale-105'
                    : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border-stone-700/80 hover:border-amber-500/40 hover:text-amber-200'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400/80" />
                  <span>{reply.mm}</span>
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence>
            {activeReply && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 inline-block px-3 py-1 rounded-lg"
              >
                {language === 'my' ? `နှုတ်ခွန်းဆက် ပြန်လည်ပြောကြားခြင်း: "${activeReply}"` : `You replied: "${activeReply}"`}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
