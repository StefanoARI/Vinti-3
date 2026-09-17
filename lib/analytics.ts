import { AnalyticsEvent, CookieConsent, EventType } from './types';

const STORAGE_KEY_EVENTS = 'nicole_salon_analytics_events';
const STORAGE_KEY_CONSENT = 'nicole_salon_cookie_consent';
const STORAGE_KEY_REQUESTS = 'nicole_salon_appointment_requests';

// Initialize with baseline realistic historical stats if empty
export function initAnalytics(): void {
  if (typeof window === 'undefined') return;

  const existing = localStorage.getItem(STORAGE_KEY_EVENTS);
  if (!existing) {
    const seedEvents: AnalyticsEvent[] = generateSeedEvents();
    localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(seedEvents));
  }
}

export function trackEvent(type: EventType, label: string, details?: Record<string, string | number | boolean>): void {
  if (typeof window === 'undefined') return;

  // Check consent for analytics if strictly required
  const consent = getStoredCookieConsent();
  if (consent.status !== 'unset' && !consent.analytics && type !== 'cookie_consent') {
    // Analytics rejected by user
    return;
  }

  const newEvent: AnalyticsEvent = {
    id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    type,
    label,
    details,
    timestamp: new Date().toISOString(),
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY_EVENTS);
    const list: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
    list.unshift(newEvent); // newest first
    // keep up to 400 events
    if (list.length > 400) list.length = 400;
    localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(list));

    // Dispatch custom event for real-time reactivity in UI
    window.dispatchEvent(new CustomEvent('nicole_analytics_updated', { detail: newEvent }));
  } catch (err) {
    console.warn('Could not store analytics event', err);
  }
}

export function getStoredEvents(): AnalyticsEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EVENTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearAnalyticsData(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify([]));
  window.dispatchEvent(new CustomEvent('nicole_analytics_updated'));
}

export function resetToSeedAnalytics(): void {
  if (typeof window === 'undefined') return;
  const seed = generateSeedEvents();
  localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(seed));
  window.dispatchEvent(new CustomEvent('nicole_analytics_updated'));
}

export function getStoredCookieConsent(): CookieConsent {
  if (typeof window === 'undefined') {
    return { status: 'unset', necessary: true, analytics: false, marketing: false, timestamp: '' };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONSENT);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { status: 'unset', necessary: true, analytics: false, marketing: false, timestamp: '' };
}

export function saveCookieConsent(consent: CookieConsent): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_CONSENT, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent('nicole_cookie_consent_updated', { detail: consent }));
  
  // Track this event
  trackEvent('cookie_consent', `Consenso Cookie: ${consent.status}`, {
    status: consent.status,
    analytics: consent.analytics,
    marketing: consent.marketing,
  });
}

function generateSeedEvents(): AnalyticsEvent[] {
  const events: AnalyticsEvent[] = [];
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;
  const oneDay = 24 * oneHour;

  // Generate 7 days of simulated natural salon traffic
  for (let i = 0; i < 48; i++) {
    const timeOffset = Math.floor(Math.random() * (7 * oneDay));
    const timestamp = new Date(now - timeOffset).toISOString();
    events.push({
      id: 'seed_pv_' + i,
      type: 'page_view',
      label: 'Visualizzazione Home Atelier',
      details: { referrer: i % 3 === 0 ? 'Instagram' : i % 2 === 0 ? 'Google' : 'Diretto' },
      timestamp,
    });
  }

  // Clicks on WhatsApp (16 clicks)
  for (let i = 0; i < 16; i++) {
    const timeOffset = Math.floor(Math.random() * (7 * oneDay));
    events.push({
      id: 'seed_wa_' + i,
      type: 'whatsapp_click',
      label: 'Clic Richiesta WhatsApp',
      details: { service: i % 2 === 0 ? 'Balayage & Color Couture' : 'Acconciature Sposa' },
      timestamp: new Date(now - timeOffset).toISOString(),
    });
  }

  // Clicks on Phone (12 calls)
  for (let i = 0; i < 12; i++) {
    const timeOffset = Math.floor(Math.random() * (7 * oneDay));
    events.push({
      id: 'seed_call_' + i,
      type: 'call_click',
      label: 'Chiamata Telefonica Diretta',
      details: { source: 'Header / Mobile Bar' },
      timestamp: new Date(now - timeOffset).toISOString(),
    });
  }

  // Form Submits (11 appointments)
  const services = ['Balayage & Color Couture', 'Acconciature Sposa & Cerimonia', 'Trattamenti Cheratina e Ricostruzione', 'Taglio & Piega Sartoriale'];
  for (let i = 0; i < 11; i++) {
    const timeOffset = Math.floor(Math.random() * (7 * oneDay));
    events.push({
      id: 'seed_form_' + i,
      type: 'contact_form_submit',
      label: 'Prenotazione Ricevuta dal Form',
      details: { service: services[i % services.length] },
      timestamp: new Date(now - timeOffset).toISOString(),
    });
  }

  // Social Clicks (22 clicks)
  const socials = ['Instagram', 'Facebook', 'TikTok', 'Google Maps'];
  for (let i = 0; i < 22; i++) {
    const timeOffset = Math.floor(Math.random() * (7 * oneDay));
    events.push({
      id: 'seed_soc_' + i,
      type: 'social_click',
      label: `Visita Pagina ${socials[i % socials.length]}`,
      details: { channel: socials[i % socials.length] },
      timestamp: new Date(now - timeOffset).toISOString(),
    });
  }

  // Cookie Consents (32 consents)
  for (let i = 0; i < 32; i++) {
    const timeOffset = Math.floor(Math.random() * (7 * oneDay));
    const status = i % 10 === 0 ? 'rejected' : i % 5 === 0 ? 'custom' : 'accepted';
    events.push({
      id: 'seed_ck_' + i,
      type: 'cookie_consent',
      label: `Consenso Cookie: ${status}`,
      details: { status },
      timestamp: new Date(now - timeOffset).toISOString(),
    });
  }

  // Sort newest first
  return events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
