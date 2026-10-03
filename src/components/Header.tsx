import React from 'react';
import { Volume2, VolumeX, Globe, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-stone-900/85 border-b border-amber-500/20 text-stone-100 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/30 text-stone-950 font-bold text-lg">
            မ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-lg sm:text-xl tracking-tight text-amber-200">
                မင်္ဂလာပါ <span className="text-stone-400 text-sm sm:text-base font-normal">Mingalaba</span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Workshop & Greetings
              </span>
            </div>
            <p className="text-xs text-stone-400 hidden sm:block">
              {language === 'my' ? 'နတ်လိမ့်အား၊ တိုက်ပစ်ချိန်နည်းနှင့် နှုတ်ခွန်းဆက်ဆုတောင်းလွှာ' : 'Burmese Bolt Torque Specs & Greetings'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* PWA Install Button in Header */}
          <div className="hidden sm:block">
            <PWAInstallButton soundEnabled={soundEnabled} />
          </div>

          {/* Sound Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={onToggleSound}
            className="p-2 rounded-lg bg-stone-800/80 hover:bg-stone-750 text-stone-300 hover:text-amber-300 border border-stone-700/60 transition-colors flex items-center gap-1.5 text-xs"
            title={soundEnabled ? 'Mute Chime Sound' : 'Enable Chime Sound'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span className="hidden md:inline text-xs">{language === 'my' ? 'အသံဖွင့်' : 'Chime On'}</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-stone-500" />
                <span className="hidden md:inline text-xs text-stone-500">{language === 'my' ? 'အသံပိတ်' : 'Muted'}</span>
              </>
            )}
          </button>

          {/* Language Toggle */}
          <button
            id="language-toggle-btn"
            onClick={onToggleLanguage}
            className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition-all flex items-center gap-1.5 text-xs font-medium"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'my' ? 'English' : 'မြန်မာ'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
