'use client';

import React from 'react';
import { X, ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { SALON_INFO } from '../lib/data';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCookieSettings?: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose, onOpenCookieSettings }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div
      id="privacy-policy-modal"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full max-h-[85vh] bg-[#faf8f5] rounded-2xl border border-stone-300 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#ebdccb] text-[#8c5d2b] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                Informativa Privacy & Cookie Policy
              </h3>
              <p className="text-[11px] text-stone-500">
                Conforme al Regolamento Generale sulla Protezione dei Dati (GDPR - Reg. UE 2016/679)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            aria-label="Chiudi informativa"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable Legal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
          
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-amber-900 text-xs">
            <strong>Ultimo aggiornamento:</strong> Settembre 2026. La presente informativa descrive le modalità di trattamento dei dati personali degli utenti che consultano il sito web di <strong>{SALON_INFO.name}</strong> e ne utilizzano i servizi telematici (form contatti, cookie e canali social).
          </div>

          {/* 1. Titolare del Trattamento */}
          <section className="space-y-2">
            <h4 className="font-serif font-bold text-base text-stone-900 flex items-center gap-1.5">
              <span>1. Titolare del Trattamento dei Dati</span>
            </h4>
            <p>
              Il Titolare del trattamento è <strong>Nicole Parrucchieri & Atelier S.r.l.</strong>, con sede legale e operativa in {SALON_INFO.address}, P.IVA / C.F. 09283740961.
              <br />
              Email per l’esercizio dei diritti privacy: <a href={`mailto:${SALON_INFO.email}`} className="text-[#8c5d2b] underline">{SALON_INFO.email}</a> • Telefono: {SALON_INFO.phone}.
            </p>
          </section>

          {/* 2. Tipologie di Dati Raccolti */}
          <section className="space-y-2">
            <h4 className="font-serif font-bold text-base text-stone-900">
              2. Categorie di Dati Personali Trattati
            </h4>
            <p>Il nostro sito raccoglie dati personali identificativi tramite:</p>
            <ul className="list-disc pl-5 space-y-1 text-stone-600">
              <li>
                <strong>Dati forniti volontariamente dall’utente:</strong> Nome, cognome, numero di telefono cellulare, indirizzo email, servizio desiderato (es. Balayage, Acconciature Sposa) e note aggiuntive fornite nel modulo di contatto/prenotazione.
              </li>
              <li>
                <strong>Dati di navigazione e tecnici:</strong> Indirizzo IP (anonimizzato), orario della richiesta, parametri relativi al sistema operativo e al browser utilizzato, registrati esclusivamente per fini di sicurezza informatica.
              </li>
              <li>
                <strong>Dati statistici aggregati:</strong> Conteggio anonimo delle visualizzazioni e dei clic verso i canali WhatsApp/chiamate, previo espresso consenso dell’utente.
              </li>
            </ul>
          </section>

          {/* 3. Finalità e Basi Giuridiche */}
          <section className="space-y-2">
            <h4 className="font-serif font-bold text-base text-stone-900">
              3. Finalità del Trattamento e Base Giuridica
            </h4>
            <div className="space-y-2">
              <p>
                <strong>a) Gestione richieste di appuntamento e consulenze:</strong> I dati inseriti nel form sono trattati esclusivamente per ricontattare l’interessato e confermare la disponibilità per il servizio richiesto. Base giuridica: esecuzione di misure precontrattuali o contrattuali adottate su richiesta dell’interessato (Art. 6 par. 1 lett. b GDPR).
              </p>
              <p>
                <strong>b) Adempimenti di legge:</strong> Conservazione contabile e fiscale in caso di erogazione del servizio in salone. Base giuridica: obbligo legale (Art. 6 par. 1 lett. c GDPR).
              </p>
              <p>
                <strong>c) Analisi statistiche e miglioramento dell’esperienza utente:</strong> Statistiche anonimizzate per ottimizzare la navigazione da cellulari e desktop. Base giuridica: consenso facoltativo dell’interessato (Art. 6 par. 1 lett. a GDPR).
              </p>
            </div>
          </section>

          {/* 4. Modalità di Conservazione e Sicurezza */}
          <section className="space-y-2">
            <h4 className="font-serif font-bold text-base text-stone-900">
              4. Modalità di Conservazione e Misure di Sicurezza
            </h4>
            <p>
              I dati sono trattati con strumenti automatizzati e protocolli crittografici conformi allo stato dell’arte (HTTPS/TLS). I dati del form di prenotazione sono conservati per il tempo strettamente necessario a gestire l’appuntamento e comunque non oltre 12 mesi dalla ricezione, salvo instaurazione del rapporto continuativo di cliente in salone. I dati non vengono ceduti a terzi né diffusi.
            </p>
          </section>

          {/* 5. Diritti dell'Interessato (GDPR) */}
          <section className="space-y-2">
            <h4 className="font-serif font-bold text-base text-stone-900">
              5. Diritti dell’Interessato (Articoli 15–22 GDPR)
            </h4>
            <p>In qualsiasi momento, l’interessato ha il diritto di:</p>
            <ul className="list-disc pl-5 space-y-1 text-stone-600">
              <li>Ottenere la conferma dell’esistenza dei propri dati personali e la loro comunicazione in forma intelligibile (Diritto di accesso).</li>
              <li>Chiedere la rettifica, l’aggiornamento o l’integrazione dei dati inesatti.</li>
              <li>Chiedere la cancellazione dei dati («Diritto all’oblio») nei casi previsti dall’Art. 17 GDPR.</li>
              <li>Revocare in ogni momento il consenso prestato per i cookie o le statistiche.</li>
              <li>Proporre reclamo all’Autorità Garante per la Protezione dei Dati Personali (Piazza Venezia 11, 00187 Roma, <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-[#8c5d2b] underline">www.garanteprivacy.it</a>).</li>
            </ul>
            <p className="pt-1">
              Per esercitare i propri diritti è sufficiente inviare un’email a <a href={`mailto:${SALON_INFO.email}`} className="text-[#8c5d2b] underline">{SALON_INFO.email}</a>.
            </p>
          </section>

          {/* 6. Cookie Policy Dettagliata */}
          <section className="space-y-3 pt-2 border-t border-stone-200">
            <h4 className="font-serif font-bold text-base text-stone-900 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-[#8c5d2b]" />
              <span>6. Informativa Estesa sui Cookie (Cookie Policy)</span>
            </h4>
            <p>
              I cookie sono piccoli file di testo che i siti visitati inviano al terminale dell’utente, dove vengono memorizzati per essere poi ritrasmessi alla successiva visita.
            </p>

            <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-100 border-b border-stone-200 text-stone-800 font-semibold">
                    <th className="p-2.5">Tipologia Cookie</th>
                    <th className="p-2.5">Finalità</th>
                    <th className="p-2.5">Durata</th>
                    <th className="p-2.5">Consenso</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-600">
                  <tr>
                    <td className="p-2.5 font-medium text-stone-900">Cookie Tecnici / Necessari</td>
                    <td className="p-2.5">Memorizzazione delle preferenze di navigazione e del consenso cookie GDPR.</td>
                    <td className="p-2.5">Fino a 12 mesi</td>
                    <td className="p-2.5 font-semibold text-stone-800">Sempre Attivi (Nessun consenso richiesto per legge)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-stone-900">Cookie Analitici Anonimizzati</td>
                    <td className="p-2.5">Statistiche aggregate sulle visite e interazioni con i pulsanti WhatsApp e telefono.</td>
                    <td className="p-2.5">Sessione / 6 mesi</td>
                    <td className="p-2.5 text-[#8c5d2b] font-medium">Facoltativo (Richiede consenso utente)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-stone-900">Cookie di Marketing e Social</td>
                    <td className="p-2.5">Interazione con feed esterni e widget social (Instagram, TikTok, Facebook).</td>
                    <td className="p-2.5">Fino a 12 mesi</td>
                    <td className="p-2.5 text-[#8c5d2b] font-medium">Facoltativo (Richiede consenso utente)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-stone-500">
              Puoi modificare o revocare le tue preferenze sui cookie in qualsiasi momento cliccando sul link &quot;Gestione Consensi Cookie&quot; presente a piè di pagina.
            </p>
          </section>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenCookieSettings) onOpenCookieSettings();
            }}
            className="text-xs text-[#8c5d2b] font-semibold underline hover:text-stone-900"
          >
            Modifica Preferenze Cookie
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1c1917] text-white text-xs font-medium hover:bg-[#8c5d2b] transition-colors"
          >
            Ho Compreso e Chiudi
          </button>
        </div>

      </div>
    </div>
  );
}
