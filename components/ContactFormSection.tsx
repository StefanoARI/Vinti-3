'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Calendar, MessageCircle, Send, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { SALON_INFO } from '../lib/data';
import { trackEvent } from '../lib/analytics';
import { AppointmentRequest } from '../lib/types';

interface ContactFormSectionProps {
  selectedServicePreload?: string;
  onOpenPrivacyModal: () => void;
}

export default function ContactFormSection({
  selectedServicePreload,
  onOpenPrivacyModal,
}: ContactFormSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: selectedServicePreload || 'Balayage & Color Couture',
    date: '',
    timeSlot: 'Pomeriggio (14:00 – 19:30)',
    notes: '',
    privacyAccepted: false,
  });

  const [prevPreload, setPrevPreload] = useState(selectedServicePreload);
  if (selectedServicePreload !== prevPreload) {
    setPrevPreload(selectedServicePreload);
    if (selectedServicePreload) {
      setFormData((prev) => ({ ...prev, service: selectedServicePreload }));
    }
  }

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.privacyAccepted) {
      setErrorMsg('È necessario accettare l’informativa sulla privacy (GDPR) per inviare la richiesta.');
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Inserisci il tuo nome e recapito telefonico.');
      return;
    }

    const newRequest: AppointmentRequest = {
      id: 'req_' + Date.now(),
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      service: formData.service,
      date: formData.date || 'Da concordare',
      timeSlot: formData.timeSlot,
      notes: formData.notes.trim(),
      privacyAccepted: true,
      createdAt: new Date().toISOString(),
    };

    // Save locally
    try {
      const raw = localStorage.getItem('nicole_salon_appointment_requests');
      const list: AppointmentRequest[] = raw ? JSON.parse(raw) : [];
      list.unshift(newRequest);
      localStorage.setItem('nicole_salon_appointment_requests', JSON.stringify(list));
    } catch {}

    // Track analytics event
    trackEvent('contact_form_submit', `Richiesta: ${formData.service}`, {
      service: formData.service,
      hasDate: !!formData.date,
    });

    setIsSubmitted(true);
  };

  const handleSendViaWhatsApp = () => {
    trackEvent('whatsapp_click', 'WhatsApp da Form Contatti');
    const msg = `Salve Nicole Parrucchieri! Vorrei prenotare un appuntamento per:\n- Servizio: ${formData.service}\n- Nome: ${formData.name || 'Cliente'}\n- Telefono: ${formData.phone || 'Non indicato'}\n- Data richiesta: ${formData.date || 'Prima data disponibile'}\n- Fascia oraria: ${formData.timeSlot}\n${formData.notes ? `- Note: ${formData.notes}` : ''}`;
    const url = `https://wa.me/${SALON_INFO.whatsappRaw}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contatti" className="py-16 sm:py-24 bg-[#faf8f5] border-t border-[#e8ded0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebdccb] text-[#8c5d2b] text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prenota la tua Esperienza</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1917]">
            Richiedi un Appuntamento o Consulenza
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Compila il modulo per fissare il tuo appuntamento per il Balayage, una prova acconciatura sposa o per richiedere informazioni. Rispondiamo in tempi brevissimi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Form Side (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 border border-[#e8ded0] shadow-sm">
            {isSubmitted ? (
              <div id="contact-success-state" className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900">
                  Richiesta Inviata con Successo!
                </h3>
                <p className="text-sm text-stone-600 max-w-md mx-auto">
                  Grazie <strong className="text-stone-900">{formData.name}</strong>. Abbiamo ricevuto la tua richiesta per <strong className="text-stone-900">{formData.service}</strong>. Il nostro team ti contatterà al numero indicato per confermare data e orario definitivi.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleSendViaWhatsApp}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Invia Conferma Rapida su WhatsApp</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        service: 'Balayage & Color Couture',
                        date: '',
                        timeSlot: 'Pomeriggio (14:00 – 19:30)',
                        notes: '',
                        privacyAccepted: false,
                      });
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50"
                  >
                    Nuova Richiesta
                  </button>
                </div>
              </div>
            ) : (
              <form id="salon-booking-form" onSubmit={handleSubmit} className="space-y-5">
                
                {/* Nome & Telefono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Nome e Cognome *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Es: Giulia Rossi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#8c5d2b] focus:border-transparent bg-[#faf8f5]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Telefono / Cellulare *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Es: +39 340 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#8c5d2b] focus:border-transparent bg-[#faf8f5]"
                    />
                  </div>
                </div>

                {/* Email & Servizio */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Indirizzo Email
                    </label>
                    <input
                      type="email"
                      placeholder="giulia.rossi@email.it"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#8c5d2b] focus:border-transparent bg-[#faf8f5]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Servizio Desiderato *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#8c5d2b] focus:border-transparent bg-[#faf8f5] font-medium text-stone-900"
                    >
                      <option value="Balayage & Color Couture">✨ Balayage & Color Couture (Top Servizio)</option>
                      <option value="Acconciature Sposa & Cerimonia">💍 Acconciature Sposa & Percorso Bridal</option>
                      <option value="Trattamenti Rigeneranti & Hair Spa">💆‍♀️ Trattamento Cheratina / Ricostruzione</option>
                      <option value="Taglio Sartoriale & Piega Luxury">✂️ Taglio Sartoriale Donna & Piega</option>
                      <option value="Consulenza Armocromia e Colore">🎨 Consulenza Colore Personalizzata</option>
                      <option value="Altro Servizio Salone">Altro / Informazioni Generali</option>
                    </select>
                  </div>
                </div>

                {/* Data e Fascia Oraria */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Data Preferita
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#8c5d2b] focus:border-transparent bg-[#faf8f5]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Fascia Oraria Preferita
                    </label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#8c5d2b] focus:border-transparent bg-[#faf8f5]"
                    >
                      <option value="Mattina (09:00 – 13:00)">Mattina (09:00 – 13:00)</option>
                      <option value="Primo Pomeriggio (14:00 – 16:30)">Primo Pomeriggio (14:00 – 16:30)</option>
                      <option value="Tardo Pomeriggio (16:30 – 19:30)">Tardo Pomeriggio (16:30 – 19:30)</option>
                      <option value="Orario Indifferente">Qualsiasi orario disponibile</option>
                    </select>
                  </div>
                </div>

                {/* Note / Descrizione capelli */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Note Aggiuntive (Lunghezza capelli, colore attuale, richieste speciali)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Es: Capelli lunghi castano scuro, vorrei schiariture calde tono miele senza decolorare le radici..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#8c5d2b] focus:border-transparent bg-[#faf8f5] resize-none"
                  />
                </div>

                {/* GDPR Privacy Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      required
                      id="form-privacy-consent-checkbox"
                      checked={formData.privacyAccepted}
                      onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded text-[#8c5d2b] focus:ring-[#8c5d2b] border-stone-300"
                    />
                    <span className="text-xs text-stone-600 leading-normal">
                      Ho letto e accetto l&apos;
                      <button
                        type="button"
                        onClick={onOpenPrivacyModal}
                        className="font-medium text-[#8c5d2b] underline hover:text-stone-900 mx-1"
                      >
                        Informativa Privacy Policy (GDPR)
                      </button>
                      e acconsento al trattamento dei dati personali per la gestione della richiesta di appuntamento. *
                    </span>
                  </label>
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Buttons: Submit & WhatsApp Option */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    id="submit-contact-form-btn"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#1c1917] text-white font-medium text-sm hover:bg-[#8c5d2b] transition-colors shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Invia Richiesta di Appuntamento</span>
                  </button>

                  <button
                    type="button"
                    id="submit-whatsapp-direct-btn"
                    onClick={handleSendViaWhatsApp}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Invia su WhatsApp</span>
                  </button>
                </div>

              </form>
            )}
          </div>

          {/* Info Side (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Salon Info Card */}
            <div className="bg-[#f4eee6] rounded-2xl p-6 sm:p-8 border border-[#e8ded0] space-y-6">
              <h3 className="font-serif font-bold text-xl text-[#1c1917]">
                Atelier Nicole Parrucchieri
              </h3>

              <div className="space-y-4 text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#8c5d2b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 font-semibold">Indirizzo:</strong>
                    <span>{SALON_INFO.address}</span>
                    <a
                      href="https://maps.google.com/?q=Via+Alessandro+Manzoni+24+Milano"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('social_click', 'Google Maps Link')}
                      className="block text-xs font-semibold text-[#8c5d2b] underline mt-0.5 hover:text-stone-900"
                    >
                      Apri su Google Maps & Indicazioni
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#8c5d2b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 font-semibold">Telefono Salone:</strong>
                    <a
                      href={`tel:${SALON_INFO.phoneRaw}`}
                      onClick={() => trackEvent('call_click', 'Chiamata da Info Contatti')}
                      className="hover:text-[#8c5d2b] font-medium"
                    >
                      {SALON_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 font-semibold">Assistenza WhatsApp:</strong>
                    <a
                      href={SALON_INFO.socials.whatsapp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('whatsapp_click', 'WhatsApp da Info Contatti')}
                      className="hover:text-emerald-700 font-medium text-emerald-700"
                    >
                      {SALON_INFO.whatsapp} (Risposta rapida)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#8c5d2b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 font-semibold">Email:</strong>
                    <a href={`mailto:${SALON_INFO.email}`} className="hover:text-[#8c5d2b]">
                      {SALON_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Orari di Apertura */}
              <div className="pt-4 border-t border-[#e2d5c3]">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-[#8c5d2b]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                    Orari di Ricevimento
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-stone-700">
                  {SALON_INFO.openingHours.map((oh, idx) => (
                    <div key={idx} className="flex justify-between py-1 border-b border-[#ebdccb] last:border-0">
                      <span className="font-medium text-stone-800">{oh.days}</span>
                      <span className="text-stone-600">{oh.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Metro & Parcheggio Note */}
            <div className="bg-[#faf8f5] rounded-xl p-4 border border-stone-200 text-xs text-stone-600">
              <strong className="text-stone-900 block mb-1">Come raggiungerci:</strong>
              Metropolitana M3 Montenapoleone (2 min a piedi) / M1 Duomo (5 min). Parcheggio convenzionato disponibile in Via Bigli.
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
