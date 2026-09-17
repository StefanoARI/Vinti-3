'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import GallerySection from '../components/GallerySection';
import AboutAtelierSection from '../components/AboutAtelierSection';
import SocialLinksSection from '../components/SocialLinksSection';
import ContactFormSection from '../components/ContactFormSection';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';
import AnalyticsDashboardModal from '../components/AnalyticsDashboardModal';
import MobileStickyBar from '../components/MobileStickyBar';
import { initAnalytics, trackEvent } from '../lib/analytics';

export default function HomePage() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('Balayage & Color Couture');

  useEffect(() => {
    // Initialize analytics baseline & track page view
    initAnalytics();
    trackEvent('page_view', 'Visualizzazione Home Atelier', {
      device: typeof window !== 'undefined' && window.innerWidth < 768 ? 'Mobile' : 'Desktop',
    });
  }, []);

  const handleSelectServiceAndScroll = (serviceName: string) => {
    setSelectedService(serviceName);
    const formEl = document.getElementById('contatti');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = () => {
    const formEl = document.getElementById('contatti');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#1c1917] selection:bg-[#d4a373] selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        onOpenAnalytics={() => setShowAnalyticsModal(true)}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Section with SEO Branding & Highlights */}
        <Hero
          onSelectService={handleSelectServiceAndScroll}
          onOpenBooking={handleOpenBooking}
        />

        {/* 2 Core Services (Balayage & Acconciature Sposa) + Complementary + FAQ */}
        <ServicesSection onSelectService={handleSelectServiceAndScroll} />

        {/* Real Photo Gallery with Lightbox & Custom Upload */}
        <GallerySection />

        {/* Atelier Story, Organic Formulations & Salon Spaces */}
        <AboutAtelierSection />

        {/* Social Network Hub (Instagram, Facebook, TikTok, WhatsApp) */}
        <SocialLinksSection />

        {/* Contact & Booking Form with GDPR & Direct WhatsApp Option */}
        <ContactFormSection
          selectedServicePreload={selectedService}
          onOpenPrivacyModal={() => setShowPrivacyModal(true)}
        />
      </main>

      {/* Footer with Legal, GDPR, and Salon Info */}
      <Footer
        onOpenPrivacyPolicy={() => setShowPrivacyModal(true)}
        onOpenCookieSettings={() => setShowCookieSettings(true)}
        onOpenAnalytics={() => setShowAnalyticsModal(true)}
      />

      {/* GDPR Cookie Banner & Preferences Modal */}
      <CookieBanner
        onOpenPrivacyPolicy={() => setShowPrivacyModal(true)}
        forceOpenSettings={showCookieSettings}
        onCloseForceSettings={() => setShowCookieSettings(false)}
      />

      {/* Full GDPR Privacy & Cookie Policy Modal */}
      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        onOpenCookieSettings={() => setShowCookieSettings(true)}
      />

      {/* Internal Salon Statistics & Analytics Dashboard */}
      <AnalyticsDashboardModal
        isOpen={showAnalyticsModal}
        onClose={() => setShowAnalyticsModal(false)}
      />

      {/* Mobile Sticky Quick Action Bar (Chiama / WhatsApp / Prenota) */}
      <MobileStickyBar onOpenBooking={handleOpenBooking} />

    </div>
  );
}
