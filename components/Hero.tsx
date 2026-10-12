'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Star, Calendar, MessageCircle, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { SALON_INFO } from '../lib/data';
import { trackEvent } from '../lib/analytics';

interface HeroProps {
  onSelectService: (serviceName: string) => void;
  onOpenBooking: () => void;
}

export default function Hero({ onSelectService, onOpenBooking }: HeroProps) {
  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', 'WhatsApp da Hero Banner');
  };

  return (
    <section id="hero-section" className="relative pt-24 sm:pt-28 pb-12 sm:pb-20 overflow-hidden bg-[#faf8f5]">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4a373]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#b07d48]/10 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Semantic SEO Copy & Primary Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-[#f0eae1] border border-[#d9cfc1] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-stone-800 mx-auto lg:mx-0">
              <span className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </span>
              <span className="text-stone-700">Valutazione 4.9/5 • Oltre 180 Recensioni a Milano</span>
            </div>

            {/* Main H1 Title optimized for business name & key services */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-serif font-bold tracking-tight text-[#1c1917] leading-[1.15]">
              <span className="block text-[#8c5d2b] font-serif font-normal text-2xl sm:text-3xl mb-1">
                Nicole Parrucchieri & Atelier
              </span>
              Specialisti in{' '}
              <span className="underline decoration-[#d4a373] decoration-wavy decoration-1 underline-offset-4">
                Balayage
              </span>{' '}
              e{' '}
              <span className="text-[#8c5d2b]">
                Acconciature Sposa
              </span>
            </h1>

            {/* Subheading describing the experience and service keywords */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Nel cuore di Milano, l’atelier dove ogni chioma diventa un’opera d’arte sartoriale. Creiamo schiariture naturali effetto sole con il nostro esclusivo{' '}
              <strong className="text-stone-900 font-semibold">Balayage Color Couture</strong> e firmiamo le più emozionanti{' '}
              <strong className="text-stone-900 font-semibold">Acconciature Sposa</strong> per il tuo giorno indimenticabile.
            </p>

            {/* Key feature pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 max-w-xl mx-auto lg:mx-0 text-xs sm:text-sm text-stone-700">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#f4eee6] border border-[#e8ded0]">
                <Sparkles className="w-4 h-4 text-[#b07d48] shrink-0" />
                <span>French Balayage & AirTouch</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#f4eee6] border border-[#e8ded0]">
                <HeartHandshake className="w-4 h-4 text-[#b07d48] shrink-0" />
                <span>Percorso Bridal & Prove</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#f4eee6] border border-[#e8ded0] col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-[#b07d48] shrink-0" />
                <span>Trattamenti Bio Plex</span>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                id="hero-book-btn"
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1c1917] text-white font-medium text-base hover:bg-[#342e2a] transition-all shadow-md hover:shadow-lg group"
              >
                <Calendar className="w-4 h-4 text-[#d4a373]" />
                <span>Prenota la tua Consulenza</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                id="hero-whatsapp-btn"
                href={SALON_INFO.socials.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-medium text-base hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Scrivici su WhatsApp</span>
              </a>
            </div>

            {/* Fast telephone contact reassurance */}
            <div className="text-xs text-stone-500 pt-1">
              Preferisci chiamare?{' '}
              <a
                href={`tel:${SALON_INFO.phoneRaw}`}
                onClick={() => trackEvent('call_click', 'Chiamata da Hero')}
                className="font-semibold text-stone-800 underline hover:text-[#8c5d2b]"
              >
                {SALON_INFO.phone}
              </a>{' '}
              • Riceviamo su appuntamento dal Martedì al Sabato
            </div>
          </div>

          {/* Right Column: Visual Composite with Real Uploaded Images */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md sm:max-w-lg lg:max-w-none">
              
              {/* Main Balayage Hero Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#e7dfd5] bg-white group">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="https://www.nicolevinti.it/uploads/image/homepage-banner.jpg"
                    alt="Nicole Parrucchieri Milano - Balayage Caramello e Schiariture Naturali"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <span className="inline-block px-2.5 py-1 rounded bg-[#b07d48] text-white text-xs uppercase tracking-wider font-semibold mb-1">
                    Specialità N.1
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                    Balayage & Color Couture
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-200 mt-1 line-clamp-2">
                    Sfumature multidimensionali senza stacco alla radice, luminose e durature.
                  </p>
                  <button
                    id="hero-card-balayage-cta"
                    onClick={() => onSelectService('Balayage & Color Couture')}
                    className="mt-3 text-xs font-semibold text-[#f5ecd8] hover:text-white flex items-center gap-1 underline underline-offset-2"
                  >
                    <span>Dettagli e Tariffe Balayage</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Floating Floating Bridal Card (Top Right / Bottom Left) */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-[#faf8f5]/95 backdrop-blur-md p-3.5 sm:p-4 rounded-xl shadow-xl border border-[#e2d5c3] max-w-[210px] sm:max-w-[240px] transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-stone-200">
                    <Image
                      src="https://www.nicolevinti.it/uploads/image/wedding-img1.jpg"
                      alt="Acconciatura Sposa Chignon Nicole Parrucchieri"
                      fill
                      sizes="48px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8c5d2b] font-bold block">
                      Specialità N.2
                    </span>
                    <h3 className="text-xs sm:text-sm font-semibold text-stone-900 leading-snug">
                      Acconciature Sposa
                    </h3>
                    <span className="text-[11px] text-stone-500 block">Prove & Wedding Day</span>
                  </div>
                </div>
              </div>

              {/* Atelier Experience Badge */}
              <div
                id="hero-atelier-milano-badge"
                className="absolute top-10 sm:top-14 right-3 sm:-right-3 z-20 bg-[#1c1917]/95 backdrop-blur-sm text-white p-3 rounded-xl shadow-xl border border-stone-700/80 text-center transition-transform hover:-translate-y-0.5"
              >
                <span className="text-xs font-serif uppercase tracking-widest text-[#d4a373] block">
                  Atelier Milano
                </span>
                <span className="text-lg font-bold">12+ Anni</span>
                <span className="text-[10px] text-stone-300 block">di Passione & Stile</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
