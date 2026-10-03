import React, { useState } from 'react';
import { usePWAInstall } from '../utils/usePWAInstall';
import { Smartphone, Check, QrCode } from 'lucide-react';
import { playChime } from '../utils/audio';
import { PhoneInstallModal } from './PhoneInstallModal';

interface PWAInstallButtonProps {
  soundEnabled?: boolean;
  variant?: 'header' | 'banner' | 'floating';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ soundEnabled, variant = 'header' }) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  const handleInstallClick = async () => {
    if (soundEnabled) playChime(580, 0.4);
    if (isInstallable) {
      const res = await install();
      if (!res) {
        setShowModal(true);
      } else {
        if (soundEnabled) playChime(880, 0.8);
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {isInstalled ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold font-['Noto_Sans_Myanmar']">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>ဆော့ဝဲအဖြစ် သွင်းထားပြီး (App Mode)</span>
          </div>
        ) : (
          <button
            id="install-pwa-app-btn"
            onClick={handleInstallClick}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer font-['Noto_Sans_Myanmar'] ${
              variant === 'banner' ? 'w-full sm:w-auto justify-center' : ''
            }`}
            title="ဖုန်းထဲသို့ ဆော့ဝဲအဖြစ် ထည့်သွင်းရန်"
          >
            <Smartphone className="w-4 h-4 text-stone-950" />
            <span>ဖုန်းထဲ ဆော့ဝဲအဖြစ် ထည့်မည် (Install App)</span>
          </button>
        )}
      </div>

      <PhoneInstallModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        soundEnabled={soundEnabled}
      />
    </>
  );
};
