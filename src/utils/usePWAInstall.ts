import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;

      // Detect standalone mode (already installed / opened as app)
      let isStandalone = false;
      if (window.matchMedia) {
        isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      }
      if (!isStandalone && window.navigator) {
        isStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      }
      setIsInstalled(isStandalone);

      // Detect iOS devices
      if (window.navigator && window.navigator.userAgent) {
        const userAgent = window.navigator.userAgent.toLowerCase();
        setIsIOS(/iphone|ipad|ipod/.test(userAgent));
      }

      const handleBeforeInstallPrompt = (e: Event) => {
        try {
          e.preventDefault();
          setDeferredPrompt(e as BeforeInstallPromptEvent);
        } catch {
          // Ignore
        }
      };

      const handleAppInstalled = () => {
        setIsInstalled(true);
        setDeferredPrompt(null);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', handleAppInstalled);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
      };
    } catch {
      // Safe fallback
    }
  }, []);

  const install = async () => {
    if (!deferredPrompt) return false;
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        return true;
      }
    } catch {
      return false;
    }
    return false;
  };

  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    isIOS,
    install,
  };
}
