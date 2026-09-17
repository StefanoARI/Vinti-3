'use client';

import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle, BarChart3, Shield, Cookie, Heart } from 'lucide-react';
import { SALON_INFO } from '../lib/data';
import { trackEvent } from '../lib/analytics';

interface FooterProps {
  onOpenPrivacyPolicy: () => void;
  onOpenCookieSettings: () => void;
  onOpenAnalytics: () => void;
}

export default function Footer({
  onOpenPrivacyPolicy,
  onOpenCookieSettings,
  onOpenAnalytics,
}: FooterProps) {
  return (
    <footer id="main-footer" className="bg-[#1c1917] text-stone-300 pt-16 pb-24 lg:pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-white tracking-wider">
                NICOLE
              </span>
              <span className="text-xs uppercase tracking-widest text-[#d4a373] font-medium border-l border-stone-600 pl-2">
                Atelier Milano
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              Atelier d’hairstyling nel centro di Milano specializzato in Balayage su misura, schiariture naturali effetto sole, acconciature per la sposa e percorsi di rigenerazione capillare.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                id="footer-ig-link"
                href={SALON_INFO.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('social_click', 'Instagram da Footer')}
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-[#8c5d2b] text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                id="footer-fb-link"
                href={SALON_INFO.socials.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('social_click', 'Facebook da Footer')}
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-[#1877F2] text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                id="footer-wa-link"
                href={SALON_INFO.socials.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', 'WhatsApp da Footer')}
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-emerald-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Servizi Chiave (SEO Focus) */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider text-[#d4a373]">
              I Nostri Servizi
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#servizi" className="hover:text-white transition-colors">
                  ✨ Balayage & Color Couture
                </a>
              </li>
              <li>
                <a href="#servizi" className="hover:text-white transition-colors">
                  💍 Acconciature Sposa & Cerimonia
                </a>
              </li>
              <li>
                <a href="#servizi" className="hover:text-white transition-colors">
                  💆‍♀️ Trattamenti Cheratina & Spa
                </a>
              </li>
              <li>
                <a href="#servizi" className="hover:text-white transition-colors">
                  ✂️ Taglio Sartoriale & Blowout
                </a>
              </li>
              <li>
                <a href="#galleria" className="hover:text-white transition-colors">
                  📸 Galleria Foto Lavori
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Orari & Info */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider text-[#d4a373]">
              Orari Apertura
            </h4>
            <div className="space-y-1.5 text-xs text-stone-400">
              <p>
                <strong className="text-stone-300 block">Mar – Ven:</strong> 09:00 – 19:30
              </p>
              <p>
                <strong className="text-stone-300 block">Sabato:</strong> 08:30 – 19:00
              </p>
              <p className="text-stone-500">Dom e Lun: Chiuso</p>
              <p className="pt-1 text-[11px] text-[#d4a373]">
                Riceviamo su appuntamento
              </p>
            </div>
          </div>

          {/* Col 5: Contatti Diretti */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider text-[#d4a373]">
              Contatti Salone
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d4a373] shrink-0 mt-0.5" />
                <span>{SALON_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d4a373] shrink-0" />
                <a
                  href={`tel:${SALON_INFO.phoneRaw}`}
                  onClick={() => trackEvent('call_click', 'Chiamata da Footer')}
                  className="hover:text-white font-medium"
                >
                  {SALON_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d4a373] shrink-0" />
                <a href={`mailto:${SALON_INFO.email}`} className="hover:text-white">
                  {SALON_INFO.email}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Legal & GDPR Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div suppressHydrationWarning>
            © {new Date().getFullYear()} Nicole Parrucchieri & Atelier S.r.l. • P.IVA 09283740961 • Tutti i diritti riservati.
          </div>

          {/* GDPR, Cookie & Analytics Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-stone-400">
            <button
              id="footer-privacy-btn"
              onClick={onOpenPrivacyPolicy}
              className="hover:text-white underline underline-offset-2 flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5 text-[#d4a373]" />
              <span>Privacy & Cookie Policy (GDPR)</span>
            </button>

            <span>•</span>

            <button
              id="footer-cookie-pref-btn"
              onClick={onOpenCookieSettings}
              className="hover:text-white underline underline-offset-2 flex items-center gap-1"
            >
              <Cookie className="w-3.5 h-3.5 text-[#d4a373]" />
              <span>Gestione Consensi Cookie</span>
            </button>

            <span>•</span>

            <button
              id="footer-analytics-btn"
              onClick={onOpenAnalytics}
              className="hover:text-[#d4a373] transition-colors flex items-center gap-1 text-stone-400"
              title="Visualizza statistiche interne del salone"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Statistiche & Analytics</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
