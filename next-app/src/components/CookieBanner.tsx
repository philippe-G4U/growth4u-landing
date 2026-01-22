'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState<'unknown' | 'accepted' | 'rejected'>('unknown');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem('growth4u_consent');
    if (savedConsent === 'accepted' || savedConsent === 'rejected') {
      setCookieConsent(savedConsent);
    }
    setIsLoaded(true);
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('growth4u_consent', 'accepted');
    setCookieConsent('accepted');

    // Initialize Meta Pixel on acceptance
    if (typeof window !== 'undefined' && !window.fbq) {
      (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      (window as any).fbq('init', '1330785362070217');
      (window as any).fbq('track', 'PageView');
    }
  };

  const handleRejectCookies = () => {
    localStorage.setItem('growth4u_consent', 'rejected');
    setCookieConsent('rejected');
  };

  if (!isLoaded || cookieConsent !== 'unknown') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-slate-200 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] p-6 animate-in slide-in-from-bottom-5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="flex items-start gap-4">
          <div className="bg-[#6351d5]/10 p-3 rounded-full hidden md:block">
            <Cookie className="w-6 h-6 text-[#6351d5]" />
          </div>
          <div>
            <h4 className="font-bold text-[#032149] mb-1">Valoramos tu privacidad</h4>
            <p className="text-sm text-slate-600 max-w-2xl">
              Utilizamos cookies propias y de terceros para analizar nuestros servicios y mostrarte publicidad relacionada con tus
              preferencias. Puedes aceptar todas las cookies o configurarlas. Más información en nuestra{' '}
              <Link href="/cookies" className="text-[#6351d5] underline font-bold">
                Política de Cookies
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={handleRejectCookies}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-lg border border-slate-300 font-bold text-slate-600 hover:bg-slate-50 transition-colors text-sm"
          >
            Rechazar
          </button>
          <button
            onClick={handleAcceptCookies}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-lg bg-[#6351d5] text-white font-bold hover:bg-[#3f45fe] transition-colors text-sm"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}
