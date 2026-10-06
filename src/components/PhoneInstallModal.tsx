import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Smartphone, DownloadCloud, Share2, Copy, Check, QrCode, Sparkles, X, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import { usePWAInstall } from '../utils/usePWAInstall';
import { playChime } from '../utils/audio';

interface PhoneInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled?: boolean;
}

export const PhoneInstallModal: React.FC<PhoneInstallModalProps> = ({
  isOpen,
  onClose,
  soundEnabled,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'android' | 'ios' | 'qr'>('android');
  const [appUrl, setAppUrl] = useState<string>('');

  useEffect(() => {
    // Current live URL
    const url = typeof window !== 'undefined' ? window.location.href : '';
    setAppUrl(url);

    if (url) {
      QRCode.toDataURL(url, {
        width: 260,
        margin: 2,
        color: {
          dark: '#0c0a09',
          light: '#fbbf24',
        },
      })
        .then((dataUrl) => setQrDataUrl(dataUrl))
        .catch((err) => console.error('QR code generation error:', err));
    }

    if (isIOS) {
      setActiveTab('ios');
    }
  }, [isIOS]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    if (appUrl) {
      navigator.clipboard.writeText(appUrl);
      setCopied(true);
      if (soundEnabled) playChime(800, 0.5);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeInstall = async () => {
    if (soundEnabled) playChime(600, 0.4);
    if (isInstallable) {
      const res = await install();
      if (res) {
        if (soundEnabled) playChime(900, 0.8);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-stone-900 border-2 border-amber-500/40 p-5 sm:p-6 shadow-2xl text-stone-100 space-y-5 font-['Noto_Sans_Myanmar'] max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500 text-stone-950 font-bold shadow-md">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-100 flex items-center gap-1.5 flex-wrap">
                <span>ဖုန်းထဲသို့ App အဖြစ် ထည့်သွင်းနည်း</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/50 flex items-center gap-1 font-mono">
                  <span>❄️</span>
                  <span>Wiring & A/C Edition</span>
                </span>
              </h3>
              <p className="text-xs text-amber-400">
                ဖုန်းစခရင်တွင် "Wiring & A/C ❄️" အိုင်ကွန်အဖြစ် ရောက်ရှိပြီး အင်တာနက်မလိုဘဲ အပြည့်အဝ သုံးနိုင်ပါသည်
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Direct Install Button (If supported by browser) */}
        {isInstallable && !isInstalled && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/30 to-amber-500/20 border border-amber-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <div className="text-sm font-bold text-amber-300 flex items-center justify-center sm:justify-start gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>ဖုန်းထဲသို့ တိုက်ရိုက် သွင်းနိုင်ပါသည်</span>
              </div>
              <p className="text-xs text-stone-300">ခလုတ်ကို နှိပ်ပြီး "Install" ကို အတည်ပြုပေးပါ</p>
            </div>
            <button
              onClick={handleNativeInstall}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/30 transition-all active:scale-95 cursor-pointer shrink-0"
            >
              ချက်ချင်းထည့်မည် (Install Now)
            </button>
          </div>
        )}

        {/* Tab Navigation (Android / iPhone / QR Code) */}
        <div className="flex items-center justify-center gap-1 bg-stone-950 p-1.5 rounded-2xl border border-stone-800 text-xs font-bold">
          <button
            onClick={() => {
              setActiveTab('android');
              if (soundEnabled) playChime(600, 0.2);
            }}
            className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'android'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <DownloadCloud className="w-3.5 h-3.5" />
            <span>Android (Chrome)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('ios');
              if (soundEnabled) playChime(600, 0.2);
            }}
            className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'ios'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>iPhone (Safari)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('qr');
              if (soundEnabled) playChime(600, 0.2);
            }}
            className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'qr'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QR Scan (ဖုန်းဖြင့်ဖတ်ရန်)</span>
          </button>
        </div>

        {/* TAB CONTENT: ANDROID CHROME INSTRUCTIONS */}
        {activeTab === 'android' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3 text-xs sm:text-sm">
              <div className="font-bold text-amber-400 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-mono">1</span>
                <span>Chrome Browser တွင် ဖွင့်ပါ</span>
              </div>
              <p className="text-stone-300 pl-8">
                Chrome ဘရောက်ဆာ၏ ညာဘက်အပေါ်ထောင့်ရှိ <strong>အစက် ၃ စက် (⋮)</strong> မီနူးကို နှိပ်ပါ။
              </p>

              <div className="font-bold text-amber-400 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-mono">2</span>
                <span>"Install app" သို့မဟုတ် "Add to Home screen" ကို နှိပ်ပါ</span>
              </div>
              <p className="text-stone-300 pl-8">
                မီနူးထဲမှ <strong>"Install app" (သို့မဟုတ်) "ပင်မစာမျက်နှာသို့ ထည့်မည်"</strong> ကို ရွေးချယ်ပါ။
              </p>

              <div className="font-bold text-amber-400 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-mono">3</span>
                <span>Install ကို အတည်ပြုပါ</span>
              </div>
              <p className="text-stone-300 pl-8">
                ခေတ္တစောင့်ပြီးနောက် သင့်ဖုန်း Home Screen ပေါ်တွင် <strong>"Wiring & A/C ❄️" (GreatStar) အိုင်ကွန်လေး</strong> ရောက်ရှိသွားပါမည်။
              </p>

              {/* Version distinction / update tip */}
              <div className="mt-3 p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-cyan-300">
                  <span>❄️</span>
                  <span>အဟောင်းနှင့် အသစ် ခွဲခြားနည်း & Update ပြုလုပ်နည်း:</span>
                </div>
                <p className="text-[11px] leading-relaxed text-stone-300">
                  ဖုန်းစခရင်ပေါ်တွင် <strong>"Wiring & A/C ❄️"</strong> လို့ ပေါ်နေပါက အသစ်ဆုံး Version ဖြစ်ပါသည်။ အသစ်ထည့်ထားသော အဲကွန်းစနစ်များ မပေါ်သေးပါက ဖုန်းထဲရှိ အဟောင်း (GreatStar Auto-Wiring) ကို အရင် Uninstall (ဖျက်) ပြီးမှ Chrome မှတဆင့် ပြန်လည် Install ပြုလုပ်ပေးပါ ခင်ဗျာ။
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: IPHONE SAFARI INSTRUCTIONS */}
        {activeTab === 'ios' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3 text-xs sm:text-sm">
              <div className="font-bold text-amber-400 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-mono">1</span>
                <span>Safari Browser ၏ Share ခလုတ်ကို နှိပ်ပါ</span>
              </div>
              <p className="text-stone-300 pl-8">
                iPhone ၏ Safari မျက်နှာပြင် အောက်ခြေအလယ်ရှိ <strong>မျှဝေရန် (Share ⎋)</strong> အိုင်ကွန်ကို နှိပ်ပါ။
              </p>

              <div className="font-bold text-amber-400 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-mono">2</span>
                <span>"Add to Home Screen" ကို ရွေးပါ</span>
              </div>
              <p className="text-stone-300 pl-8">
                ပေါ်လာသော မီနူးကို အောက်သို့ အနည်းငယ်ဆွဲချပြီး <strong>"Add to Home Screen (ပင်မမျက်နှာပြင်သို့ ထည့်ရန် ⊞)"</strong> ကို နှိပ်ပါ။
              </p>

              <div className="font-bold text-amber-400 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-mono">3</span>
                <span>ညာဘက်အပေါ်ရှိ "Add" ကို နှိပ်ပါ</span>
              </div>
              <p className="text-stone-300 pl-8">
                သင့် iPhone စခရင်ပေါ်တွင် သီးသန့်ဆော့ဝဲအဖြစ် ဖွင့်၍ အင်တာနက်မလိုဘဲ အရှင် အသုံးပြုနိုင်ပါပြီ။
              </p>
            </div>
          </div>
        )}

        {/* TAB CONTENT: QR CODE SCAN */}
        {activeTab === 'qr' && (
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col items-center justify-center space-y-3 animate-in fade-in duration-150 text-center">
            <div className="p-3 bg-amber-400 rounded-2xl shadow-xl">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="App QR Code"
                  className="w-48 h-48 rounded-xl object-contain"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-stone-900 text-xs">
                  QR Code ထုတ်ယူနေပါသည်...
                </div>
              )}
            </div>
            <p className="text-xs text-stone-300 max-w-xs">
              သင့်ဖုန်း ကင်မရာ (သို့မဟုတ် QR Scanner) ဖြင့် ဤ QR Code ကို ဖတ်လိုက်ပါက သင့်ဖုန်းထဲတွင် တိုက်ရိုက် ပွင့်လာပါမည်။
            </p>
          </div>
        )}

        {/* Copy App Link Box */}
        <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>သင့်ဖုန်းသို့ တိုက်ရိုက်ပို့ရန် လင့်ခ် (Direct URL):</span>
            {copied && <span className="text-emerald-400 font-bold">ကူးယူပြီးပါပြီ!</span>}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={appUrl}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs font-mono text-stone-300 focus:outline-none select-all"
            />
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shrink-0 transition active:scale-95 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'လင့်ခ်ကူးမည်'}</span>
            </button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-stone-300 space-y-1.5">
          <div className="text-amber-300 font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>ဖုန်းထဲသွင်းထားပါက ရရှိမည့် အကျိုးကျေးဇူးများ:</span>
          </div>
          <ul className="space-y-1 text-stone-300 pl-4 list-disc">
            <li><strong>အင်တာနက်လုံးဝမရှိသည့် ဝပ်ရှော့/လမ်းခရီးတွင်</strong> ချက်ချင်း ဖွင့်ကြည့်နိုင်ခြင်း။</li>
            <li><strong>၈ မီလီ မှ ၃၂ မီလီအထိ</strong> ဂွဆိုက်အားလုံးကို ဖုန်းထဲတွင် စိတ်ကြိုက် နှိပ်ရွှေ့ကာ ပေါင်တန်ဖိုး အရှင် တွက်နိုင်ခြင်း။</li>
            <li><strong>Cummins နှင့် Scania အင်ဂျင်ချိန်နည်းများ</strong> အားလုံးကို အပြည့်အစုံ ကြည့်ရှုနိုင်ခြင်း။</li>
          </ul>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-sm transition cursor-pointer"
        >
          ပိတ်မည် (Done)
        </button>

      </div>
    </div>
  );
};
