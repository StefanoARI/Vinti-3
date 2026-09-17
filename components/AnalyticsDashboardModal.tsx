'use client';

import React, { useState, useEffect } from 'react';
import { X, BarChart3, TrendingUp, Users, MessageCircle, Phone, CalendarCheck, ShieldCheck, RefreshCw, Trash2, Download } from 'lucide-react';
import { AnalyticsEvent, CookieConsent } from '../lib/types';
import { getStoredEvents, clearAnalyticsData, resetToSeedAnalytics, getStoredCookieConsent } from '../lib/analytics';

interface AnalyticsDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AnalyticsDashboardModal({ isOpen, onClose }: AnalyticsDashboardModalProps) {
  const [, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'privacy'>('overview');

  useEffect(() => {
    const handleUpdate = () => {
      setRefreshKey((k) => k + 1);
    };
    window.addEventListener('nicole_analytics_updated', handleUpdate);
    return () => window.removeEventListener('nicole_analytics_updated', handleUpdate);
  }, []);

  if (!isOpen) return null;

  const events: AnalyticsEvent[] = getStoredEvents();

  // Compute key statistics
  const totalEvents = events.length;
  const pageViews = events.filter((e) => e.type === 'page_view').length;
  const whatsappClicks = events.filter((e) => e.type === 'whatsapp_click').length;
  const phoneCalls = events.filter((e) => e.type === 'call_click').length;
  const formSubmits = events.filter((e) => e.type === 'contact_form_submit').length;
  const cookieEvents = events.filter((e) => e.type === 'cookie_consent');

  // Conversion rate (Form submits + WhatsApp clicks + Calls) / Pageviews
  const totalConversions = whatsappClicks + phoneCalls + formSubmits;
  const conversionRate = pageViews > 0 ? ((totalConversions / pageViews) * 100).toFixed(1) : '0.0';

  // Cookie stats
  const acceptedCookies = cookieEvents.filter((e) => e.details?.status === 'accepted').length;
  const rejectedCookies = cookieEvents.filter((e) => e.details?.status === 'rejected').length;
  const customCookies = cookieEvents.filter((e) => e.details?.status === 'custom').length;
  const totalCookieDecisions = acceptedCookies + rejectedCookies + customCookies;
  const consentRate = totalCookieDecisions > 0 ? Math.round((acceptedCookies / totalCookieDecisions) * 100) : 100;

  // Services breakdown from form submissions & clicks
  const serviceCounts: Record<string, number> = {
    'Balayage & Color Couture': 0,
    'Acconciature Sposa & Cerimonia': 0,
    'Trattamenti Rigeneranti': 0,
    'Taglio & Piega': 0,
  };

  events.forEach((e) => {
    const s = String(e.details?.service || '');
    if (s.includes('Balayage')) serviceCounts['Balayage & Color Couture']++;
    else if (s.includes('Sposa')) serviceCounts['Acconciature Sposa & Cerimonia']++;
    else if (s.includes('Trattament')) serviceCounts['Trattamenti Rigeneranti']++;
    else if (s.includes('Taglio')) serviceCounts['Taglio & Piega']++;
  });

  // Social channels clicks
  const socialCounts: Record<string, number> = {
    Instagram: 0,
    WhatsApp: 0,
    TikTok: 0,
    Facebook: 0,
  };

  events.forEach((e) => {
    if (e.type === 'whatsapp_click') socialCounts.WhatsApp++;
    if (e.type === 'social_click') {
      const ch = String(e.details?.channel || '');
      if (ch.includes('Instagram')) socialCounts.Instagram++;
      else if (ch.includes('TikTok')) socialCounts.TikTok++;
      else if (ch.includes('Facebook')) socialCounts.Facebook++;
    }
  });

  const exportCSV = () => {
    if (events.length === 0) return;
    const rows = [
      ['ID', 'Data/Ora', 'Tipo Evento', 'Etichetta', 'Dettagli'],
      ...events.map((e) => [
        e.id,
        new Date(e.timestamp).toLocaleString('it-IT'),
        e.type,
        `"${e.label.replace(/"/g, '""')}"`,
        `"${JSON.stringify(e.details || {}).replace(/"/g, '""')}"`,
      ]),
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((r) => r.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nicole_salon_analytics_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      id="analytics-dashboard-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[92vh] bg-[#faf8f5] rounded-2xl border border-stone-300 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1c1917] text-[#d4a373] flex items-center justify-center shadow-sm">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                  Pannello Statistiche & Analytics
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Live
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Monitoraggio visite, prenotazioni Balayage/Sposa e conversioni in conformità al GDPR
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            aria-label="Chiudi statistiche"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs & Actions Bar */}
        <div className="px-6 py-3 bg-stone-100/80 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-white text-stone-900 shadow-sm border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Panoramica KPI
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === 'events'
                  ? 'bg-white text-stone-900 shadow-sm border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Registro Eventi ({events.length})
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === 'privacy'
                  ? 'bg-white text-stone-900 shadow-sm border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Consensi GDPR
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 font-medium transition-colors"
              title="Esporta in formato CSV"
            >
              <Download className="w-3.5 h-3.5 text-stone-500" />
              <span>Esporta CSV</span>
            </button>
            <button
              onClick={resetToSeedAnalytics}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 font-medium transition-colors"
              title="Reimposta dati di esempio"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#8c5d2b]" />
              <span>Ripristina Dati</span>
            </button>
            <button
              onClick={clearAnalyticsData}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-stone-300 hover:bg-rose-50 text-rose-600 font-medium transition-colors"
              title="Azzera statistiche correnti"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Azzera</span>
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Top KPI Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Visualizzazioni */}
                <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
                  <div className="flex items-center justify-between text-stone-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Visualizzazioni</span>
                    <Users className="w-4 h-4 text-[#8c5d2b]" />
                  </div>
                  <div className="text-2xl font-serif font-bold text-stone-900">
                    {pageViews}
                  </div>
                  <span className="text-[11px] text-stone-500">Sessioni Atelier caricate</span>
                </div>

                {/* WhatsApp Clic */}
                <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
                  <div className="flex items-center justify-between text-stone-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Chat WhatsApp</span>
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-serif font-bold text-emerald-700">
                    {whatsappClicks}
                  </div>
                  <span className="text-[11px] text-stone-500">Richieste dirette inviate</span>
                </div>

                {/* Chiamate */}
                <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
                  <div className="flex items-center justify-between text-stone-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Chiamate Telefoniche</span>
                    <Phone className="w-4 h-4 text-[#8c5d2b]" />
                  </div>
                  <div className="text-2xl font-serif font-bold text-stone-900">
                    {phoneCalls}
                  </div>
                  <span className="text-[11px] text-stone-500">Clic su recapito telefonico</span>
                </div>

                {/* Form Prenotazioni */}
                <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
                  <div className="flex items-center justify-between text-stone-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Form Inviati</span>
                    <CalendarCheck className="w-4 h-4 text-[#d4a373]" />
                  </div>
                  <div className="text-2xl font-serif font-bold text-[#8c5d2b]">
                    {formSubmits}
                  </div>
                  <span className="text-[11px] text-stone-500">Richieste appuntamento</span>
                </div>

              </div>

              {/* Conversion Highlight */}
              <div className="p-5 rounded-2xl bg-[#1c1917] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#d4a373] font-semibold block">
                    Tasso di Conversione Complessivo
                  </span>
                  <div className="text-3xl font-serif font-bold mt-1">
                    {conversionRate}%
                  </div>
                  <p className="text-xs text-stone-300 mt-1">
                    Percentuale di visitatori che ha avviato un contatto (Form, WhatsApp o Telefonata).
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-stone-400 block">Contatti Totali Generati:</span>
                    <strong className="text-xl font-bold text-[#d4a373]">{totalConversions}</strong>
                  </div>
                </div>
              </div>

              {/* Breakdowns 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Servizi di Punta Richiesti */}
                <div className="p-5 rounded-xl bg-white border border-stone-200">
                  <h4 className="font-serif font-bold text-stone-900 text-base mb-4">
                    Richieste per Servizio & Parole Chiave
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(serviceCounts).map(([name, count]) => {
                      const total = Object.values(serviceCounts).reduce((a, b) => a + b, 0) || 1;
                      const pct = Math.round((count / total) * 100);
                      return (
                        <div key={name}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium text-stone-800">{name}</span>
                            <span className="text-stone-500">{count} ({pct}%)</span>
                          </div>
                          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-[#8c5d2b] h-full rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Social Channels Clicks */}
                <div className="p-5 rounded-xl bg-white border border-stone-200">
                  <h4 className="font-serif font-bold text-stone-900 text-base mb-4">
                    Canali Social & Chat più Cliccati
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(socialCounts).map(([channel, count]) => {
                      const total = Object.values(socialCounts).reduce((a, b) => a + b, 0) || 1;
                      const pct = Math.round((count / total) * 100);
                      return (
                        <div key={channel}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium text-stone-800">{channel}</span>
                            <span className="text-stone-500">{count} ({pct}%)</span>
                          </div>
                          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                channel === 'WhatsApp' ? 'bg-emerald-600' : channel === 'Instagram' ? 'bg-rose-500' : 'bg-stone-700'
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Visualizzazione degli ultimi {events.length} eventi registrati</span>
                <span>Orario locale</span>
              </div>

              <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-100 max-h-[500px] overflow-y-auto">
                {events.length === 0 ? (
                  <div className="p-8 text-center text-xs text-stone-500">
                    Nessun evento registrato al momento.
                  </div>
                ) : (
                  events.map((evt) => (
                    <div key={evt.id} className="p-3.5 sm:p-4 flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                            evt.type === 'contact_form_submit'
                              ? 'bg-purple-500'
                              : evt.type === 'whatsapp_click'
                              ? 'bg-emerald-500'
                              : evt.type === 'call_click'
                              ? 'bg-amber-500'
                              : evt.type === 'cookie_consent'
                              ? 'bg-blue-500'
                              : 'bg-stone-400'
                          }`}
                        />
                        <div>
                          <div className="font-medium text-stone-900">{evt.label}</div>
                          <div className="text-[11px] text-stone-400">
                            {evt.type} • {evt.details ? JSON.stringify(evt.details) : 'nessun dettaglio'}
                          </div>
                        </div>
                      </div>

                      <div className="text-stone-400 text-[11px] whitespace-nowrap shrink-0">
                        {new Date(evt.timestamp).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        <span className="hidden sm:inline"> - {new Date(evt.timestamp).toLocaleDateString('it-IT')}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-white border border-stone-200 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-serif font-bold text-stone-900 text-base">
                    Statistiche di Conformità GDPR Cookie
                  </h4>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Tracciamento delle scelte espresse dagli utenti nel banner dei cookie in osservanza delle linee guida del Garante Privacy.
                </p>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                    <span className="text-[11px] text-emerald-800 font-semibold block">Accetta Tutti</span>
                    <strong className="text-xl font-bold text-emerald-900">{acceptedCookies}</strong>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-center">
                    <span className="text-[11px] text-amber-800 font-semibold block">Personalizzati</span>
                    <strong className="text-xl font-bold text-amber-900">{customCookies}</strong>
                  </div>
                  <div className="p-3 bg-stone-100 rounded-xl border border-stone-200 text-center">
                    <span className="text-[11px] text-stone-700 font-semibold block">Solo Necessari</span>
                    <strong className="text-xl font-bold text-stone-800">{rejectedCookies}</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs text-stone-600 block mb-1 font-medium">
                    Tasso di Accettazione Cookie: {consentRate}%
                  </span>
                  <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${consentRate}%` }} />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-stone-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[#1c1917] text-white text-xs font-medium hover:bg-[#8c5d2b] transition-colors"
          >
            Chiudi Pannello
          </button>
        </div>

      </div>
    </div>
  );
}
