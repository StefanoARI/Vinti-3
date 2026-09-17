'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Settings, Check, X, ShieldAlert, Cookie } from 'lucide-react';
import { CookieConsent } from '../lib/types';
import { getStoredCookieConsent, saveCookieConsent } from '../lib/analytics';
import { useIsClient } from '../hooks/use-is-client';

interface CookieBannerProps {
  onOpenPrivacyPolicy: () => void;
  forceOpenSettings?: boolean;
  onCloseForceSettings?: () => void;
}

export default function CookieBanner({
  onOpenPrivacyPolicy,
  forceOpenSettings = false,
  onCloseForceSettings,
}: CookieBannerProps) {
  const isClient = useIsClient();
  const [consent, setConsent] = useState<CookieConsent>(() => {
    if (typeof window === 'undefined') {
      return { status: 'unset', necessary: true, analytics: false, marketing: false, timestamp: '' };
    }
    return getStoredCookieConsent();
  });

  const [showInternalModal, setShowInternalModal] = useState(false);

  // Preference switches state inside modal
  const [prefAnalytics, setPrefAnalytics] = useState(() => {
    if (typeof window === 'undefined') return true;
    return getStoredCookieConsent().analytics;
  });
  const [prefMarketing, setPrefMarketing] = useState(() => {
    if (typeof window === 'undefined') return false;
    return getStoredCookieConsent().marketing;
  });

  useEffect(() => {
    const handleConsentUpdate = (e: CustomEvent<CookieConsent>) => {
      if (e.detail) {
        setConsent(e.detail);
        setPrefAnalytics(e.detail.analytics);
        setPrefMarketing(e.detail.marketing);
      }
    };

    window.addEventListener('nicole_cookie_consent_updated', handleConsentUpdate as EventListener);
    return () => window.removeEventListener('nicole_cookie_consent_updated', handleConsentUpdate as EventListener);
  }, []);

  if (!isClient) {
    return null;
  }

  const showPreferencesModal = showInternalModal || forceOpenSettings;

  const handleCloseModal = () => {
    setShowInternalModal(false);
    if (onCloseForceSettings) onCloseForceSettings();
  };

  const handleAcceptAll = () => {
    const updated: CookieConsent = {
      status: 'accepted',
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    saveCookieConsent(updated);
    setConsent(updated);
    handleCloseModal();
  };

  const handleRejectNonEssential = () => {
    const updated: CookieConsent = {
      status: 'rejected',
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    saveCookieConsent(updated);
    setConsent(updated);
    handleCloseModal();
  };

  const handleSaveCustom = () => {
    const updated: CookieConsent = {
      status: 'custom',
      necessary: true,
      analytics: prefAnalytics,
      marketing: prefMarketing,
      timestamp: new Date().toISOString(),
    };
    saveCookieConsent(updated);
    setConsent(updated);
    handleCloseModal();
  };

  // Only show banner if status is unset and modal is not already open
  const showBanner = consent.status === 'unset' && !showPreferencesModal;

  return (
    <>
      {/* Floating GDPR Cookie Banner */}
      {showBanner && (
        <aside
          id="cookie-consent-banner"
          aria-label="Consenso Cookie GDPR"
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-[#1c1917]/95 backdrop-blur-md text-white border-t border-stone-700 shadow-2xl animate-in fade-in slide-in-from-bottom duration-300"
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            
            {/* Banner Text */}
            <div className="space-y-1.5 max-w-4xl text-xs sm:text-sm text-stone-300">
              <div className="flex items-center gap-2">
                <Cookie className="w-5 h-5 text-[#d4a373] shrink-0" />
                <strong className="text-white font-serif text-sm sm:text-base">
                  Informativa Cookie & Conformità GDPR
                </strong>
              </div>
              <p className="leading-relaxed">
                Utilizziamo cookie tecnici necessari per il corretto funzionamento del sito e cookie analitici anonimi per comprendere come interagisci con i nostri servizi di hairstyling e Balayage. Rispettiamo la tua privacy secondo il Regolamento UE 2016/679 (GDPR). Cliccando su &quot;Accetta Tutti&quot; acconsenti all&apos;uso di tutte le tipologie di cookie.
              </p>
              <div>
                <button
                  type="button"
                  id="cookie-banner-privacy-link"
                  onClick={onOpenPrivacyPolicy}
                  className="text-xs font-semibold text-[#d4a373] underline hover:text-white transition-colors"
                >
                  Leggi l’Informativa Privacy e Cookie Policy Completa →
                </button>
              </div>
            </div>

            {/* Banner Buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto shrink-0">
              <button
                type="button"
                id="btn-cookie-customize"
                onClick={() => setShowInternalModal(true)}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-stone-600 bg-stone-800 text-stone-200 text-xs font-medium hover:bg-stone-700 transition-colors"
              >
                Personalizza
              </button>

              <button
                type="button"
                id="btn-cookie-reject"
                onClick={handleRejectNonEssential}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-stone-600 bg-transparent text-stone-200 text-xs font-medium hover:bg-stone-800 transition-colors"
              >
                Rifiuta Non Necessari
              </button>

              <button
                type="button"
                id="btn-cookie-accept-all"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#d4a373] text-[#1c1917] text-xs font-semibold hover:bg-[#e0b78c] transition-colors shadow-md"
              >
                Accetta Tutti
              </button>
            </div>

          </div>
        </aside>
      )}

      {/* Preferences Customization Modal */}
      {showPreferencesModal && (
        <div
          id="cookie-preferences-modal"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-xl w-full bg-[#faf8f5] rounded-2xl p-6 sm:p-8 border border-stone-300 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#8c5d2b]" />
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  Centro Preferenze Privacy & Cookie
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600 my-4 leading-relaxed">
              In questa sezione puoi esprimere o revocare granularmente il tuo consenso per ciascuna categoria di cookie secondo il GDPR. I cookie tecnici non possono essere disattivati in quanto essenziali all&apos;erogazione del servizio.
            </p>

            {/* Switches */}
            <div className="space-y-4 my-6">
              
              {/* Necessari (Locked) */}
              <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-stone-900">
                      Cookie Tecnici & Necessari
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-stone-300 text-stone-700">
                      Sempre Attivi
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Indispensabili per consentire la navigazione sicura, l&apos;accesso ai servizi e la registrazione delle tue preferenze privacy.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="w-5 h-5 rounded text-[#8c5d2b] opacity-70 cursor-not-allowed mt-1"
                />
              </div>

              {/* Analitici */}
              <div className="p-4 rounded-xl bg-white border border-stone-200 flex items-start justify-between gap-4 shadow-sm">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-stone-900">
                      Cookie Statistici & Analitici
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Anonimi
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Ci aiutano a misurare il numero di visite, le pagine più consultate e le interazioni con i pulsanti WhatsApp senza identificare personalmente l&apos;utente.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    checked={prefAnalytics}
                    onChange={(e) => setPrefAnalytics(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8c5d2b]" />
                </label>
              </div>

              {/* Marketing */}
              <div className="p-4 rounded-xl bg-white border border-stone-200 flex items-start justify-between gap-4 shadow-sm">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-stone-900">
                      Cookie di Profilazione & Social
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Consentono di mostrare feed multimediali integrati (Instagram e TikTok) e annunci personalizzati sui canali del salone.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    checked={prefMarketing}
                    onChange={(e) => setPrefMarketing(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8c5d2b]" />
                </label>
              </div>

            </div>

            {/* Action Buttons in Modal */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={onOpenPrivacyPolicy}
                className="text-xs text-[#8c5d2b] underline hover:text-stone-900"
              >
                Informativa Privacy Estesa
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs hover:bg-stone-100"
                >
                  Rifiuta Tutti
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-[#1c1917] text-white text-xs font-medium hover:bg-[#8c5d2b] transition-colors"
                >
                  Salva Preferenze
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
