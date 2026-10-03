import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GREETING_TEMPLATES } from '../data/phrases';
import { GreetingTemplate, Language } from '../types';
import { playChime } from '../utils/audio';
import { downloadElementAsImage } from '../utils/imageExporter';
import { Copy, Check, Sparkles, RefreshCw, Download, Image as ImageIcon, Loader2 } from 'lucide-react';

interface CardCreatorProps {
  language: Language;
  soundEnabled: boolean;
}

const THEMES = [
  { id: 'bagan-gold', name: 'ပုဂံ ရွှေရောင် (Bagan Gold)', gradient: 'from-amber-600 via-amber-700 to-stone-950', border: 'border-amber-500/40', accent: '#F59E0B' },
  { id: 'mandalay-ruby', name: 'မန္တလေး ပတ္တမြား (Ruby)', gradient: 'from-rose-700 via-red-800 to-stone-950', border: 'border-rose-500/40', accent: '#E11D48' },
  { id: 'inle-teal', name: 'အင်းလေး စိမ်းပြာ (Inle Teal)', gradient: 'from-teal-700 via-emerald-800 to-stone-950', border: 'border-teal-500/40', accent: '#14B8A6' },
  { id: 'sapphire-sky', name: 'နီလာ ပြာကြည် (Sapphire)', gradient: 'from-sky-700 via-blue-900 to-stone-950', border: 'border-sky-500/40', accent: '#0284C7' },
  { id: 'royal-purple', name: 'ရတနာ ခရမ်း (Royal Gem)', gradient: 'from-purple-800 via-indigo-950 to-stone-950', border: 'border-purple-500/40', accent: '#9333EA' },
];

export const CardCreator: React.FC<CardCreatorProps> = ({ language, soundEnabled }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<GreetingTemplate>(GREETING_TEMPLATES[0]);
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [customMessage, setCustomMessage] = useState(selectedTemplate.messageMm);
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [copied, setCopied] = useState(false);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [imageSaved, setImageSaved] = useState(false);

  const handleSelectTemplate = (tmpl: GreetingTemplate) => {
    setSelectedTemplate(tmpl);
    setCustomMessage(tmpl.messageMm);
    if (soundEnabled) {
      playChime(600, 1.2);
    }
  };

  const getFullGreetingText = () => {
    let text = '';
    if (recipient.trim()) {
      text += `သို့ - ${recipient.trim()}\n\n`;
    }
    text += `${selectedTemplate.titleMm}\n\n`;
    text += `${customMessage}\n\n`;
    if (sender.trim()) {
      text += `မေတ္တာဖြင့် -\n${sender.trim()}`;
    }
    return text;
  };

  const handleCopyCard = () => {
    navigator.clipboard.writeText(getFullGreetingText());
    setCopied(true);
    if (soundEnabled) {
      playChime(700, 1.5);
    }
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveCardImage = async () => {
    setIsSavingImage(true);
    const fileName = `mingalaba-card-${selectedTemplate.id}-${Date.now()}.png`;
    const success = await downloadElementAsImage('greeting-card-preview', fileName);
    setIsSavingImage(false);
    if (success) {
      setImageSaved(true);
      if (soundEnabled) playChime(880, 0.8);
      setTimeout(() => setImageSaved(false), 3000);
    }
  };

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 bg-stone-900/60 border-t border-b border-amber-500/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'my' ? 'မေတ္တာပို့လွှာ ဖန်တီးခန်း' : 'Greeting Card Studio'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-100 mb-2">
            {language === 'my' ? 'စိတ်ကြိုက် မင်္ဂလာနှုတ်ခွန်းဆက်လွှာ ဖန်တီးပါ' : 'Create Custom Blessing & Greeting Cards'}
          </h2>
          <p className="text-sm text-stone-400">
            {language === 'my'
              ? 'မိသားစု၊ မိတ်ဆွေ သူငယ်ချင်းများနှင့် လုပ်ဖော်ကိုင်ဖက်များထံ ပို့ဆောင်ရန် မေတ္တာလွှာများ ဖန်တီး၍ ပုံအဖြစ် သိမ်းဆည်းခြင်း (Save Image) သို့မဟုတ် ကူးယူမျှဝေနိုင်ပါသည်'
              : 'Craft customized Burmese greeting cards with heartfelt blessings to download as images or share.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Editor Form */}
          <div className="lg:col-span-5 space-y-5 bg-stone-900/80 p-5 sm:p-6 rounded-2xl border border-stone-800 shadow-xl">
            {/* Template Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                {language === 'my' ? '၁။ နှုတ်ခွန်းဆက် ပုံစံ ရွေးချယ်ရန်' : '1. Choose Template'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {GREETING_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    id={`template-btn-${tmpl.id}`}
                    onClick={() => handleSelectTemplate(tmpl)}
                    className={`p-2.5 text-left rounded-xl text-xs font-medium transition-all border cursor-pointer ${
                      selectedTemplate.id === tmpl.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-sm'
                        : 'bg-stone-800/50 border-stone-700/60 text-stone-300 hover:bg-stone-800 hover:border-stone-600'
                    }`}
                  >
                    <div className="font-semibold">{tmpl.titleMm}</div>
                    <div className="text-[10px] text-stone-400">{tmpl.titleEn}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient & Sender Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  {language === 'my' ? 'လက်ခံသူ (သို့)' : 'Recipient (To)'}
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder={language === 'my' ? 'ဥပမာ- ချစ်ရသော မိတ်ဆွေ' : 'e.g., Dear Friend'}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  {language === 'my' ? 'ပို့သူ (မေတ္တာဖြင့်)' : 'Sender (From)'}
                </label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder={language === 'my' ? 'ဥပမာ- မောင်မောင်' : 'e.g., Min Min'}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 focus:outline-none"
                />
              </div>
            </div>

            {/* Message Editor */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-stone-300">
                  {language === 'my' ? 'နှုတ်ခွန်းဆက် မေတ္တာစကား' : 'Blessing Message Content'}
                </label>
                <button
                  onClick={() => setCustomMessage(selectedTemplate.messageMm)}
                  className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  {language === 'my' ? 'မူရင်းစာသား' : 'Reset'}
                </button>
              </div>
              <textarea
                rows={4}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full p-3 text-xs sm:text-sm rounded-xl bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 focus:outline-none leading-relaxed font-['Noto_Sans_Myanmar']"
              />
            </div>

            {/* Theme / Palette selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                {language === 'my' ? '၂။ အရောင် အပြင်အဆင် ရွေးချယ်ရန်' : '2. Select Color Theme'}
              </label>
              <div className="flex flex-wrap gap-2">
                {THEMES.map((th) => (
                  <button
                    key={th.id}
                    id={`theme-btn-${th.id}`}
                    onClick={() => {
                      setSelectedTheme(th);
                      if (soundEnabled) playChime(550, 0.8);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 border transition-all cursor-pointer ${
                      selectedTheme.id === th.id
                        ? 'border-amber-400 bg-stone-800 text-white shadow-md'
                        : 'border-stone-700/80 bg-stone-900/60 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: th.accent }} />
                    <span className="text-[11px]">{th.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <motion.div
              id="greeting-card-preview"
              key={`${selectedTemplate.id}-${selectedTheme.id}`}
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className={`w-full max-w-lg rounded-3xl p-6 sm:p-9 bg-gradient-to-br ${selectedTheme.gradient} ${selectedTheme.border} border shadow-2xl text-stone-100 relative overflow-hidden flex flex-col justify-between min-h-[360px]`}
            >
              {/* Traditional decorative corner flourishes */}
              <div className="absolute top-4 left-4 text-xs text-amber-400/40 select-none font-serif">
                ✦ ❖ ✦
              </div>
              <div className="absolute top-4 right-4 text-xs text-amber-400/40 select-none font-serif">
                ✦ ❖ ✦
              </div>
              <div className="absolute bottom-4 left-4 text-xs text-amber-400/40 select-none font-serif">
                ✦ ❖ ✦
              </div>
              <div className="absolute bottom-4 right-4 text-xs text-amber-400/40 select-none font-serif">
                ✦ ❖ ✦
              </div>

              {/* Card Header */}
              <div className="text-center pt-2">
                {recipient.trim() && (
                  <div className="text-sm font-medium text-amber-200/90 mb-2 pb-1 border-b border-white/10 inline-block font-['Noto_Sans_Myanmar']">
                    သို့ — {recipient.trim()}
                  </div>
                )}
                <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1 font-['Noto_Sans_Myanmar']">
                  မင်္ဂလာအပေါင်းနှင့် ပြည့်စုံပါစေ
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-amber-100 drop-shadow-sm font-['Noto_Sans_Myanmar']">
                  {selectedTemplate.titleMm}
                </h3>
              </div>

              {/* Card Body Message */}
              <div className="my-6 text-center px-4 sm:px-6">
                <p className="text-base sm:text-lg leading-relaxed text-stone-100 font-normal drop-shadow font-['Noto_Sans_Myanmar']">
                  {customMessage || selectedTemplate.messageMm}
                </p>
                <p className="text-xs text-amber-200/60 italic mt-3 font-serif">
                  {selectedTemplate.messageEn}
                </p>
              </div>

              {/* Card Footer */}
              <div className="text-center pt-2 border-t border-white/10">
                {sender.trim() ? (
                  <div className="text-sm text-amber-200 font-['Noto_Sans_Myanmar']">
                    <span className="text-xs text-amber-400/80 block">မေတ္တာမွန်ဖြင့်</span>
                    <span className="font-semibold text-base">{sender.trim()}</span>
                  </div>
                ) : (
                  <div className="text-xs text-amber-400/60 font-serif">
                    Mingalaba Auspicious Greetings • မြန်မာ့မင်္ဂလာ
                  </div>
                )}
              </div>
            </motion.div>

            {/* Export & Copy action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              {/* Save as Image Button (PNG) */}
              <button
                id="save-card-image-btn"
                onClick={handleSaveCardImage}
                disabled={isSavingImage}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/25 flex items-center gap-2 active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {isSavingImage ? (
                  <>
                    <Loader2 className="w-4 h-4 text-stone-950 animate-spin" />
                    <span>{language === 'my' ? 'ပုံထုတ်ယူနေပါသည်...' : 'Generating Image...'}</span>
                  </>
                ) : imageSaved ? (
                  <>
                    <Check className="w-4 h-4 text-stone-950" />
                    <span>{language === 'my' ? 'ပုံသိမ်းဆည်းပြီးပါပြီ! (Saved)' : 'Image Downloaded!'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-stone-950" />
                    <span>{language === 'my' ? 'ပုံသိမ်းဆည်းမည် (Save Image / PNG)' : 'Save as Image (PNG)'}</span>
                  </>
                )}
              </button>

              {/* Copy Text Button */}
              <button
                id="copy-card-text-btn"
                onClick={handleCopyCard}
                className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-sm transition-all border border-stone-700 flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">{language === 'my' ? 'ကူးယူပြီးပါပြီ (Copied)' : 'Copied to Clipboard!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-300" />
                    <span>{language === 'my' ? 'စာသား ကူးယူမည်' : 'Copy Text'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

