'use client';

import React from 'react';
import Image from 'next/image';
import { Instagram, Facebook, MessageCircle, Star, ExternalLink, Sparkles, Video, Share2 } from 'lucide-react';
import { SALON_INFO } from '../lib/data';
import { trackEvent } from '../lib/analytics';

export default function SocialLinksSection() {
  const handleSocialClick = (platform: string) => {
    trackEvent('social_click', `Clic link social: ${platform}`, { platform });
  };

  return (
    <section id="social" className="py-16 sm:py-20 bg-[#f4eee6] border-t border-[#e8ded0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebdccb] text-[#8c5d2b] text-xs uppercase tracking-widest font-semibold mb-3">
            <Share2 className="w-3.5 h-3.5" />
            <span>Seguici & Ispirati</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1917]">
            Entra nella Nostra Community Social
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Guarda i reel delle trasformazioni Balayage dal vivo, i video tutorial e i backstage delle acconciature sposa sui nostri canali ufficiali.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Instagram Card */}
          <a
            id="social-card-instagram"
            href={SALON_INFO.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('Instagram')}
            className="group relative bg-[#faf8f5] rounded-2xl p-6 border border-[#e2d5c3] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md">
                  <Instagram className="w-6 h-6" />
                </div>
                <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-colors" />
              </div>

              <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider block">
                {SALON_INFO.socials.instagram.badge}
              </span>
              <h3 className="text-lg font-serif font-bold text-stone-900 mt-0.5">
                Instagram Feed
              </h3>
              <p className="text-xs text-stone-500 mt-1 font-mono">
                {SALON_INFO.socials.instagram.handle}
              </p>
              <p className="text-xs text-stone-600 mt-3">
                Foto quotidiane dei Balayage realizzati, reel sui colori di tendenza e storie dal vivo.
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">{SALON_INFO.socials.instagram.followers} Followers</span>
              <span className="text-xs font-semibold text-[#8c5d2b] group-hover:underline">Segui su IG →</span>
            </div>
          </a>

          {/* TikTok Card */}
          <a
            id="social-card-tiktok"
            href={SALON_INFO.socials.tiktok.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('TikTok')}
            className="group relative bg-[#faf8f5] rounded-2xl p-6 border border-[#e2d5c3] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center shadow-md">
                  <Video className="w-6 h-6 text-cyan-300" />
                </div>
                <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-colors" />
              </div>

              <span className="text-[11px] font-semibold text-stone-900 uppercase tracking-wider block">
                {SALON_INFO.socials.tiktok.badge}
              </span>
              <h3 className="text-lg font-serif font-bold text-stone-900 mt-0.5">
                TikTok Trends
              </h3>
              <p className="text-xs text-stone-500 mt-1 font-mono">
                {SALON_INFO.socials.tiktok.handle}
              </p>
              <p className="text-xs text-stone-600 mt-3">
                Video prima & dopo delle clienti, consigli su come mantenere i capelli sani a casa.
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">{SALON_INFO.socials.tiktok.followers} Community</span>
              <span className="text-xs font-semibold text-[#8c5d2b] group-hover:underline">Guarda Video →</span>
            </div>
          </a>

          {/* Facebook Card */}
          <a
            id="social-card-facebook"
            href={SALON_INFO.socials.facebook.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('Facebook')}
            className="group relative bg-[#faf8f5] rounded-2xl p-6 border border-[#e2d5c3] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#1877F2] text-white flex items-center justify-center shadow-md">
                  <Facebook className="w-6 h-6" />
                </div>
                <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-colors" />
              </div>

              <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">
                {SALON_INFO.socials.facebook.badge}
              </span>
              <h3 className="text-lg font-serif font-bold text-stone-900 mt-0.5">
                Facebook Ufficiale
              </h3>
              <p className="text-xs text-stone-500 mt-1 font-mono">
                {SALON_INFO.socials.facebook.handle}
              </p>
              <p className="text-xs text-stone-600 mt-3">
                Eventi esclusivi bridal, recensioni delle nostre spose e aggiornamenti dell’atelier.
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">{SALON_INFO.socials.facebook.followers} Fan</span>
              <span className="text-xs font-semibold text-[#8c5d2b] group-hover:underline">Visita Pagina →</span>
            </div>
          </a>

          {/* WhatsApp Direct */}
          <a
            id="social-card-whatsapp"
            href={SALON_INFO.socials.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('WhatsApp')}
            className="group relative bg-[#faf8f5] rounded-2xl p-6 border-2 border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-colors" />
              </div>

              <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
                {SALON_INFO.socials.whatsapp.badge}
              </span>
              <h3 className="text-lg font-serif font-bold text-stone-900 mt-0.5">
                Chat WhatsApp
              </h3>
              <p className="text-xs text-stone-500 mt-1 font-mono">
                {SALON_INFO.socials.whatsapp.handle}
              </p>
              <p className="text-xs text-stone-600 mt-3">
                Scrivici direttamente per un preventivo rapido, foto di ispirazione o un appuntamento.
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-emerald-200 flex items-center justify-between text-emerald-800">
              <span className="text-xs font-bold">Assistenza 1-to-1</span>
              <span className="text-xs font-semibold group-hover:underline">Avvia Chat →</span>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}
