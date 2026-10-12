'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Phone, MessageCircle, Clock, Menu, X, BarChart3, Sparkles } from 'lucide-react';
import { SALON_INFO } from '../lib/data';
import { trackEvent } from '../lib/analytics';
import { useIsClient } from '../hooks/use-is-client';

interface NavbarProps {
  onOpenAnalytics: () => void;
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenAnalytics, onOpenBooking }: NavbarProps) {
  const isClient = useIsClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Real-time opening status calculated safely
  const isOpenNow = isClient ? (() => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    if (day === 0 || day === 1) return false;
    if (day === 6) return hours >= 8 && hours < 19;
    return hours >= 9 && hours < 19;
  })() : true;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCallClick = () => {
    trackEvent('call_click', 'Chiamata da Header');
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', 'WhatsApp da Header');
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#faf8f5]/95 backdrop-blur-md shadow-sm border-b border-[#e7dfd5]'
          : 'bg-[#faf8f5]/80 backdrop-blur-sm border-b border-[#e7dfd5]/60'
      }`}
    >
      {/* Top info bar */}
      <div id="top-announcement-bar" className="bg-[#1c1917] text-[#f5f2eb] text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span suppressHydrationWarning className="flex items-center gap-1.5 text-[#d4a373]">
              <span
                suppressHydrationWarning
                className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}
              />
              <span suppressHydrationWarning className="font-medium text-stone-200">
                {isOpenNow ? 'Salone Aperto Oggi fino alle 19:30' : 'Apertura Martedì ore 09:00'}
              </span>
            </span>
            <span className="text-stone-400">|</span>
            <span className="text-stone-300">Milano Centro • Via Manzoni 24</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              id="topbar-phone-link"
              href={`tel:${SALON_INFO.phoneRaw}`}
              onClick={handleCallClick}
              className="hover:text-[#d4a373] transition-colors flex items-center gap-1 text-stone-300"
            >
              <Phone className="w-3 h-3 text-[#d4a373]" />
              <span>{SALON_INFO.phone}</span>
            </a>

            <button
              id="topbar-analytics-btn"
              onClick={onOpenAnalytics}
              className="inline-flex items-center gap-1 text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 px-2.5 py-0.5 rounded-full transition-colors border border-stone-700"
              title="Apri Statistiche del Salone"
            >
              <BarChart3 className="w-3 h-3 text-[#d4a373]" />
              <span>Dati & Analytics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <a
            id="brand-logo-link"
            href="#"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative h-10 sm:h-12 w-36 sm:w-48">
              <Image
                src="https://www.nicolevinti.it/images/logo.png"
                alt="Nicole Parrucchieri & Atelier Milano"
                fill
                sizes="190px"
                className="object-contain object-left"
                priority
                referrerPolicy="no-referrer"
              />
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav id="desktop-navigation" className="hidden lg:flex items-center gap-7 text-[14px] font-medium text-[#292524]">
            <button
              id="nav-link-balayage"
              onClick={() => scrollToSection('servizi')}
              className="hover:text-[#b07d48] transition-colors flex items-center gap-1"
            >
              <span>Balayage & Servizi</span>
            </button>
            <button
              id="nav-link-sposa"
              onClick={() => scrollToSection('servizi')}
              className="hover:text-[#b07d48] transition-colors flex items-center gap-1.5 text-[#b07d48]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Acconciature Sposa</span>
            </button>
            <button
              id="nav-link-gallery"
              onClick={() => scrollToSection('galleria')}
              className="hover:text-[#b07d48] transition-colors"
            >
              Galleria Lavori
            </button>
            <button
              id="nav-link-about"
              onClick={() => scrollToSection('chi-siamo')}
              className="hover:text-[#b07d48] transition-colors"
            >
              L&apos;Atelier
            </button>
            <button
              id="nav-link-social"
              onClick={() => scrollToSection('social')}
              className="hover:text-[#b07d48] transition-colors"
            >
              Social & News
            </button>
            <button
              id="nav-link-contatti"
              onClick={() => scrollToSection('contatti')}
              className="hover:text-[#b07d48] transition-colors"
            >
              Contatti
            </button>
          </nav>

          {/* Action CTAs Desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              id="header-whatsapp-cta"
              href={SALON_INFO.socials.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <button
              id="header-book-cta"
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center text-xs sm:text-sm font-medium px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-[#1c1917] text-white hover:bg-[#322c28] transition-all shadow-sm"
            >
              Prenota Salone
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-analytics-icon-btn"
              onClick={onOpenAnalytics}
              className="p-2 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              aria-label="Statistiche del Salone"
            >
              <BarChart3 className="w-5 h-5 text-[#b07d48]" />
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-stone-700 hover:text-stone-900 hover:bg-stone-100 focus:outline-none"
              aria-label="Menu di navigazione"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-dropdown-menu" className="lg:hidden bg-[#faf8f5] border-b border-[#e7dfd5] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-[#e7dfd5] text-xs text-stone-600">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#b07d48]" />
              <span>{isOpenNow ? 'Aperto oggi fino alle 19:30' : 'Chiuso oggi'}</span>
            </span>
            <span className="font-semibold text-stone-800">{SALON_INFO.phone}</span>
          </div>

          <div className="flex flex-col space-y-2.5 text-base font-medium text-stone-800">
            <button
              id="m-nav-balayage"
              onClick={() => scrollToSection('servizi')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-100 transition-colors"
            >
              ✨ Balayage & Color Couture
            </button>
            <button
              id="m-nav-sposa"
              onClick={() => scrollToSection('servizi')}
              className="text-left py-2 px-3 rounded-lg bg-[#b07d48]/10 text-[#8c5d2b] font-semibold transition-colors"
            >
              💍 Acconciature Sposa & Cerimonia
            </button>
            <button
              id="m-nav-gallery"
              onClick={() => scrollToSection('galleria')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-100 transition-colors"
            >
              📸 Galleria Foto Lavori
            </button>
            <button
              id="m-nav-about"
              onClick={() => scrollToSection('chi-siamo')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-100 transition-colors"
            >
              🏛️ L&apos;Atelier & Filosofia
            </button>
            <button
              id="m-nav-social"
              onClick={() => scrollToSection('social')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-100 transition-colors"
            >
              📱 Pagine Social & Instagram
            </button>
            <button
              id="m-nav-contatti"
              onClick={() => scrollToSection('contatti')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-100 transition-colors"
            >
              📍 Dove Siamo & Orari
            </button>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-2">
            <a
              id="m-nav-whatsapp"
              href={SALON_INFO.socials.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <button
              id="m-nav-prenota"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#1c1917] text-white text-sm font-medium"
            >
              <span>Prenota Subito</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
