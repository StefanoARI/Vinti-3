'use client';

import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { SALON_INFO } from '../lib/data';
import { trackEvent } from '../lib/analytics';

interface MobileStickyBarProps {
  onOpenBooking: () => void;
}

export default function MobileStickyBar({ onOpenBooking }: MobileStickyBarProps) {
  const handleCall = () => {
    trackEvent('call_click', 'Chiamata da Barra Mobile');
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', 'WhatsApp da Barra Mobile');
  };

  return (
    <div
      id="mobile-bottom-quick-bar"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#faf8f5]/95 backdrop-blur-md border-t border-[#e2d5c3] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 py-2.5"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.625rem)' }}
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        
        {/* Chiama Subito */}
        <a
          id="mobile-bar-call-btn"
          href={`tel:${SALON_INFO.phoneRaw}`}
          onClick={handleCall}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 px-2 rounded-xl bg-white border border-[#e2d5c3] text-[#1c1917] hover:bg-stone-50 active:scale-95 transition-all text-center"
        >
          <Phone className="w-4 h-4 text-[#8c5d2b] mb-0.5" />
          <span className="text-[11px] font-semibold leading-tight">Chiama</span>
        </a>

        {/* WhatsApp Diretto */}
        <a
          id="mobile-bar-whatsapp-btn"
          href={SALON_INFO.socials.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 px-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 transition-all text-center shadow-sm"
        >
          <MessageCircle className="w-4 h-4 text-white mb-0.5" />
          <span className="text-[11px] font-semibold leading-tight">WhatsApp</span>
        </a>

        {/* Prenota Salone */}
        <button
          id="mobile-bar-book-btn"
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 px-2 rounded-xl bg-[#1c1917] text-white hover:bg-[#342e2a] active:scale-95 transition-all text-center shadow-sm"
        >
          <Calendar className="w-4 h-4 text-[#d4a373] mb-0.5" />
          <span className="text-[11px] font-semibold leading-tight">Prenota</span>
        </button>

      </div>
    </div>
  );
}
