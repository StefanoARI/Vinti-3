'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Award, Heart, Leaf, ShieldCheck, Check } from 'lucide-react';
import { SALON_INFO } from '../lib/data';

export default function AboutAtelierSection() {
  return (
    <section id="chi-siamo" className="py-16 sm:py-24 bg-[#faf8f5] border-t border-[#e8ded0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Visual Composite with Atelier Interior Images */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-[#e8ded0]">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="https://www.nicolevinti.it/uploads/image/concept-2_1.jpg"
                  alt="Interno Nicole Parrucchieri & Atelier Milano"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-xl overflow-hidden shadow-md border border-[#e8ded0] aspect-[4/3]">
                <Image
                  src="https://www.nicolevinti.it/uploads/image/concept-4_1.jpg"
                  alt="Area Lavatesta Spa Nicole Parrucchieri"
                  fill
                  sizes="300px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                  <span className="text-[11px] font-semibold text-white">Area Relax Hair Spa</span>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden shadow-md border border-[#e8ded0] aspect-[4/3]">
                <Image
                  src="https://www.nicolevinti.it/uploads/image/concept-5_1.jpg"
                  alt="Styling e Taglio Sartoriale"
                  fill
                  sizes="300px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                  <span className="text-[11px] font-semibold text-white">Postazione Styling</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copy and Salon Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebdccb] text-[#8c5d2b] text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>La Nostra Filosofia</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1917] leading-tight">
              Un’Oasi di Benessere per i Tuoi Capelli nel Cuore di Milano
            </h2>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Fondata dalla passione per l’armonia visiva e la salute della fibra capillare, <strong>Nicole Parrucchieri & Atelier</strong> nasce come punto di riferimento milanese per chi cerca un risultato autentico, sofisticato e mai banale.
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Il nostro team unisce la padronanza delle più evolute tecniche internazionali di colorazione (French Balayage, AirTouch e degradé) alla cura minuziosa dell’immagine per eventi nuziali, dove ogni acconciatura è pensata per resistere e splendere fino a notte fonda.
            </p>

            {/* Guarantees list */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-stone-900">
                    Formulazioni Bio & Cruelty-Free
                  </h3>
                  <p className="text-xs text-stone-500">
                    Utilizziamo solo colorazioni senza ammoniaca, arricchite con estratti botanici e principi attivi protettivi.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-stone-900">
                    Consulenza Morfologica ed Armocromia
                  </h3>
                  <p className="text-xs text-stone-500">
                    Prima di toccare i tuoi capelli, ascoltiamo i tuoi desideri e studiamo le tonalità calde o fredde più adatte al tuo incarnato.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-stone-900">
                    Trasparenza Totale sui Prezzi
                  </h3>
                  <p className="text-xs text-stone-500">
                    Preventivo chiaro e concordato preventivamente, senza sorprese al momento del conto.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-6">
              <div>
                <span className="block text-2xl font-serif font-bold text-[#1c1917]">100%</span>
                <span className="text-xs text-stone-500">Soddisfazione Clienti</span>
              </div>
              <div className="h-8 w-px bg-stone-300" />
              <div>
                <span className="block text-2xl font-serif font-bold text-[#1c1917]">180+</span>
                <span className="text-xs text-stone-500">Spose Accompagnate</span>
              </div>
              <div className="h-8 w-px bg-stone-300" />
              <div>
                <span className="block text-2xl font-serif font-bold text-[#1c1917]">1.200+</span>
                <span className="text-xs text-stone-500">Balayage Realizzati</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
