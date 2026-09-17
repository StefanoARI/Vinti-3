export interface CookieConsent {
  status: 'accepted' | 'rejected' | 'custom' | 'unset';
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export interface AppointmentRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  timeSlot: string;
  notes?: string;
  privacyAccepted: boolean;
  createdAt: string;
}

export type EventType =
  | 'page_view'
  | 'contact_form_submit'
  | 'whatsapp_click'
  | 'call_click'
  | 'social_click'
  | 'cookie_consent'
  | 'service_view';

export interface AnalyticsEvent {
  id: string;
  type: EventType;
  label: string;
  details?: Record<string, string | number | boolean>;
  timestamp: string;
}

export interface SalonService {
  id: string;
  name: string;
  keyword: string; // Target SEO keyword connection
  category: 'balayage' | 'bridal' | 'treatment' | 'cut';
  tagline: string;
  description: string;
  duration: string;
  priceFrom: number;
  image: string;
  highlights: string[];
  popular?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'balayage' | 'sposa' | 'trattamenti' | 'salone';
  image: string;
  description: string;
  tags: string[];
}
