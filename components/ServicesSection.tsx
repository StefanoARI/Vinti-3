'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Clock, CheckCircle2, ChevronRight, HelpCircle, Heart, Flame } from 'lucide-react';
import { SALON_SERVICES, SALON_FAQS } from '../lib/data';
import { trackEvent } from '../lib/analytics';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleBookService = (serviceName: string) => {
    trackEvent('service_view', `Scelto servizio: ${serviceName}`);
    onSelectService(serviceName);
  };

  return (
    <section id="servizi" className="py-16 sm:py-24 bg-[#f6f2ec] border-t border-b border-[#e8ded0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebdccb] text-[#8c5d2b] text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>I Nostri Servizi Esclusivi</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1c1917] tracking-tight">
            Eccellenza in <span className="text-[#8c5d2b]">Balayage</span> & <span className="text-[#8c5d2b]">Acconciature Sposa</span>
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
            Ogni trattamento nel nostro atelier di Milano è un’esperienza sartoriale unica. Utilizziamo tecniche all’avanguardia e formulazioni bio-compatibili per esaltare la bellezza naturale di ogni chioma.
          </p>
        </div>

        {/* 2 Primary Core Services Cards (Featured) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {SALON_SERVICES.slice(0, 2).map((service, index) => (
            <div
              key={service.id}
              id={`service-featured-${service.id}`}
              className="relative bg-[#faf8f5] rounded-2xl overflow-hidden border-2 border-[#d9cfc1] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Highlight Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1c1917] text-[#d4a373] text-xs font-semibold uppercase tracking-wider shadow-sm">
                  {index === 0 ? <Flame className="w-3.5 h-3.5 text-amber-400" /> : <Heart className="w-3.5 h-3.5 text-rose-400" />}
                  <span>{index === 0 ? 'Top Balayage Milano' : 'Percorso Sposa Completo'}</span>
                </span>
              </div>

              {/* Service Visual */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={`${service.name} - ${service.keyword}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-medium text-amber-200 uppercase tracking-wider block">
                    {service.keyword}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    {service.name}
                  </h3>
                </div>
              </div>

              {/* Service Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 py-3 border-y border-[#e8ded0] text-xs sm:text-sm text-stone-600">
                    <div className="flex items-center gap-1.5 font-medium text-stone-800">
                      <Clock className="w-4 h-4 text-[#8c5d2b]" />
                      <span>{service.duration}</span>
                    </div>
                    <div>
                      <span className="text-stone-500">A partire da: </span>
                      <strong className="text-lg font-bold text-[#1c1917]">€{service.priceFrom}</strong>
                    </div>
                  </div>

                  {/* Highlights checklist */}
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
                      Incluso nel servizio:
                    </span>
                    <ul className="space-y-1.5">
                      {service.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Book Action */}
                <button
                  id={`btn-book-${service.id}`}
                  onClick={() => handleBookService(service.name)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#1c1917] text-white font-medium text-sm hover:bg-[#8c5d2b] transition-colors group"
                >
                  <span>Richiedi Disponibilità per {service.name}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Services (Trattamenti & Taglio) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {SALON_SERVICES.slice(2, 4).map((service) => (
            <div
              key={service.id}
              id={`service-secondary-${service.id}`}
              className="bg-[#faf8f5] rounded-xl p-6 border border-[#e8ded0] flex flex-col sm:flex-row gap-5 items-start"
            >
              <div className="relative w-full sm:w-36 h-44 rounded-lg overflow-hidden shrink-0 border border-stone-200">
                <Image
                  src={service.image}
                  alt={`${service.name} Nicole Parrucchieri`}
                  fill
                  sizes="180px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between h-full space-y-3">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#8c5d2b] font-semibold block">
                    {service.keyword}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#1c1917]">
                    {service.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                  <span className="text-xs text-stone-500">
                    Da <strong className="text-stone-900 font-bold text-sm">€{service.priceFrom}</strong> • {service.duration}
                  </span>
                  <button
                    onClick={() => handleBookService(service.name)}
                    className="text-xs font-semibold text-[#8c5d2b] hover:text-[#1c1917] underline underline-offset-2"
                  >
                    Prenota questo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SEO FAQ Accordion - Structured for Search Engine Crawlers & Users */}
        <div id="faq-seo-block" className="max-w-3xl mx-auto bg-[#faf8f5] rounded-2xl p-6 sm:p-8 border border-[#e8ded0]">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-[#8c5d2b]" />
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1c1917]">
              Domande Frequenti su Balayage e Acconciature Sposa
            </h3>
          </div>

          <div className="space-y-4">
            {SALON_FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="border border-[#e8ded0] rounded-xl overflow-hidden bg-white"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 text-sm sm:text-base font-medium text-stone-900 hover:bg-[#faf8f5] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="text-stone-400 text-lg font-mono shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-[#f0eae1] bg-[#fcfaf7]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
