import React, { useState } from 'react';
import { Wrench, Truck, Cpu, Smartphone, Sparkles, Sliders, Zap } from 'lucide-react';
import { playChime } from '../utils/audio';
import { PhoneInstallModal } from './PhoneInstallModal';
import { usePWAInstall } from '../utils/usePWAInstall';

interface MobileBottomNavProps {
  soundEnabled: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ soundEnabled }) => {
  const [showModal, setShowModal] = useState(false);
  const { isInstalled } = usePWAInstall();

  const scrollToSection = (sectionId: string) => {
    if (soundEnabled) playChime(550, 0.25);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-lg border-t border-amber-500/30 px-2 py-2 flex items-center justify-around shadow-2xl font-['Noto_Sans_Myanmar'] sm:hidden">
        
        {/* Sensor Tester Button */}
        <button
          onClick={() => scrollToSection('sensor-tester-section')}
          className="flex flex-col items-center gap-1 text-stone-300 hover:text-amber-400 active:scale-95 transition cursor-pointer px-1 py-1"
        >
          <div className="p-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Zap className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">ဆန်ဆာစမ်း</span>
        </button>

        {/* Bolt Torque Button */}
        <button
          onClick={() => scrollToSection('bolt-torque-section')}
          className="flex flex-col items-center gap-1 text-stone-300 hover:text-amber-400 active:scale-95 transition cursor-pointer px-2 py-1"
        >
          <div className="p-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Wrench className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">နတ်ကြပ်အား</span>
        </button>

        {/* Cummins Button */}
        <button
          onClick={() => scrollToSection('cummins-section')}
          className="flex flex-col items-center gap-1 text-stone-300 hover:text-amber-400 active:scale-95 transition cursor-pointer px-2 py-1"
        >
          <div className="p-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Truck className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">Cummins</span>
        </button>

        {/* Scania Button */}
        <button
          onClick={() => scrollToSection('scania-section')}
          className="flex flex-col items-center gap-1 text-stone-300 hover:text-amber-400 active:scale-95 transition cursor-pointer px-2 py-1"
        >
          <div className="p-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Cpu className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">Scania</span>
        </button>

        {/* EFI Engine Section Button */}
        <button
          onClick={() => scrollToSection('efi-section')}
          className="flex flex-col items-center gap-1 text-stone-300 hover:text-amber-400 active:scale-95 transition cursor-pointer px-2 py-1"
        >
          <div className="p-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Zap className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">EFI စနစ်</span>
        </button>

        {/* Install Mobile App Button */}
        <button
          id="mobile-nav-install-btn"
          onClick={() => {
            if (soundEnabled) playChime(680, 0.4);
            setShowModal(true);
          }}
          className="flex flex-col items-center gap-1 text-amber-300 hover:text-amber-200 active:scale-95 transition cursor-pointer px-2 py-1"
        >
          <div className="p-1.5 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-stone-950 font-black shadow-md shadow-amber-500/30 animate-pulse">
            <Smartphone className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-black text-amber-400">
            {isInstalled ? 'App အဖွင့်' : 'ဖုန်းထဲသွင်းရန်'}
          </span>
        </button>
      </div>

      <PhoneInstallModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        soundEnabled={soundEnabled}
      />
    </>
  );
};
