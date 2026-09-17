import { GalleryItem, SalonService } from './types';

export const SALON_INFO = {
  name: 'Nicole Parrucchieri & Atelier',
  brandShort: 'Nicole Parrucchieri',
  claim: 'Specialisti in Balayage & Acconciature Sposa a Milano',
  address: 'Via Alessandro Manzoni 24, 20121 Milano (MI)',
  phone: '+39 02 89456712',
  phoneRaw: '+390289456712',
  whatsapp: '+39 340 1234567',
  whatsappRaw: '393401234567',
  email: 'info@nicoleparrucchieri.it',
  openingHours: [
    { days: 'Martedì – Venerdì', hours: '09:00 – 19:30' },
    { days: 'Sabato', hours: '08:30 – 19:00' },
    { days: 'Domenica e Lunedì', hours: 'Chiuso per riposo settimanale' },
  ],
  socials: {
    instagram: {
      name: 'Instagram',
      handle: '@nicoleparrucchieri.official',
      url: 'https://instagram.com/nicoleparrucchieri.official',
      followers: '18.4K',
      badge: 'Feed & Stories Giornalieri',
    },
    facebook: {
      name: 'Facebook',
      handle: 'Nicole Parrucchieri Milano',
      url: 'https://facebook.com/nicoleparrucchieri',
      followers: '12.1K',
      badge: 'Eventi & Recensioni',
    },
    tiktok: {
      name: 'TikTok',
      handle: '@nicolehairstylist',
      url: 'https://tiktok.com/@nicolehairstylist',
      followers: '45.2K',
      badge: 'Tutorial Balayage & Tips',
    },
    whatsapp: {
      name: 'WhatsApp',
      handle: '+39 340 1234567',
      url: 'https://wa.me/393401234567?text=Salve%20Nicole%20Parrucchieri,%20vorrei%20informazioni%20e%20prenotare%20un%20appuntamento.',
      followers: 'Chat Diretta',
      badge: 'Risposta rapida entro 15 min',
    },
    google: {
      name: 'Google My Business',
      handle: 'Nicole Parrucchieri Atelier',
      url: 'https://maps.google.com/?q=Via+Alessandro+Manzoni+24+Milano',
      followers: '4.9 ★★★★★ (184 Recensioni)',
      badge: 'Top Rated Milano Centro',
    },
  },
};

export const SALON_SERVICES: SalonService[] = [
  {
    id: 'balayage-couture',
    name: 'Balayage & Color Couture',
    keyword: 'Balayage Milano & Schiariture Su Misura',
    category: 'balayage',
    tagline: 'Schiariture naturali, sfumature luminose e zero stacco alla ricrescita',
    description:
      'La nostra firma esclusiva: tecnica French Balayage e AirTouch calibrata su misura per valorizzare l’incarnato del tuo viso. Gradazioni morbide che donano luce naturale, profondità multidimensionale e una durata eccellente fino a 5-6 mesi.',
    duration: '2h 30m – 3h 30m',
    priceFrom: 130,
    image: '/images/balayage.jpg',
    highlights: [
      'Diagnosi cromatica e armocromia personalizzata',
      'Protezione dei legami capillari con plex integrato',
      'Gloss lucidante con tonalizzazione a specchio inclusa',
      'Cura post-trattamento per luminosità duratura',
    ],
    popular: true,
  },
  {
    id: 'acconciature-sposa',
    name: 'Acconciature Sposa & Cerimonia',
    keyword: 'Acconciature Sposa Milano & Percorso Bridal',
    category: 'bridal',
    tagline: 'L’acconciatura perfetta per il giorno più emozionante della tua vita',
    description:
      'Un percorso bridal sartoriale dedicato alla futura sposa: consulenza stilistica, prove acconciatura illimitate fino alla scelta definitiva, armonizzazione con il velo e l’abito, e styling d’eccellenza a domicilio o in salone il giorno del matrimonio.',
    duration: 'Percorso Completo',
    priceFrom: 280,
    image: '/images/bridal-hair.jpg',
    highlights: [
      'Consulenza stilistica e moodboard bridal personalizzata',
      'Fino a 2 prove dettagliate con applicazione velo o accessori',
      'Trattamento spa preparatorio alla chioma pre-evento',
      'Servizio styling a domicilio il giorno delle nozze disponibile',
    ],
    popular: true,
  },
  {
    id: 'trattamenti-rigeneranti',
    name: 'Trattamenti Rigeneranti & Hair Spa',
    keyword: 'Trattamenti Cheratina e Ricostruzione Capelli',
    category: 'treatment',
    tagline: 'Ricostruzione profonda per capelli morbidi, setosi e visibilmente sani',
    description:
      'Rituali spa capillari formulati per riparare la fibra danneggiata da calore, colorazioni o stress chimico. Dalla cheratina disciplinante anti-crespo alla ricostruzione molecolare con peptidi bio-attivi.',
    duration: '1h – 1h 45m',
    priceFrom: 65,
    image: '/images/hair-treatment.jpg',
    highlights: [
      'Esame tricologico con microcamera del cuoio capelluto',
      'Ricostruzione a freddo ad ultrasuoni e infrarossi',
      'Cheratina organica disciplinante priva di formaldeide',
      'Massaggio distensivo al lavatesta con cromoterapia',
    ],
  },
  {
    id: 'taglio-piega-sartoriale',
    name: 'Taglio Sartoriale & Luxury Styling',
    keyword: 'Taglio Capelli Donna Sartoriale Milano',
    category: 'cut',
    tagline: 'Linee fluide e geometrie studiate per esaltare i lineamenti del viso',
    description:
      'Taglio personalizzato eseguito con tecnica a forbice asciutta o su capelli bagnati secondo il tipo di riccio o liscio naturale. Completato da piega couture con texture elastica e lucentezza estrema.',
    duration: '1h',
    priceFrom: 55,
    image: '/images/haircut-styling.jpg',
    highlights: [
      'Studio morfologico dei lineamenti e abitudini quotidiane',
      'Shampoo specifico e maschera personalizzata',
      'Asciugatura a onde morbide o liscio setoso',
      'Consigli di styling pratici per il mantenimento a casa',
    ],
  },
];

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'French Balayage Caramello & Miele',
    category: 'balayage',
    image: '/images/balayage.jpg',
    description: 'Schiariture calde su base castana naturale con sfumature morbide e lucentezza a specchio.',
    tags: ['Balayage', 'Caramello', 'Onde Morbide', 'Sfumature'],
  },
  {
    id: 'gal-2',
    title: 'Acconciatura Sposa Romantica con Chignon',
    category: 'sposa',
    image: '/images/bridal-hair.jpg',
    description: 'Chignon basso texturizzato con fermagli gioiello floreali e ciocche frontali che incorniciano il viso.',
    tags: ['Acconciature Sposa', 'Chignon', 'Accessori Perle', 'Wedding'],
  },
  {
    id: 'gal-3',
    title: 'Trattamento Gloss & Ricostruzione Molecolare',
    category: 'trattamenti',
    image: '/images/hair-treatment.jpg',
    description: 'Capelli nutriti in profondità, cuticole sigillate e straordinaria setosità al tatto.',
    tags: ['Trattamento Capelli', 'Ricostruzione', 'Hair Spa', 'Idratazione'],
  },
  {
    id: 'gal-4',
    title: 'Taglio Scalato Medio & Piega Dinamica',
    category: 'salone',
    image: '/images/haircut-styling.jpg',
    description: 'Layering leggero per donare volume naturale e movimento naturale senza appesantire le punte.',
    tags: ['Taglio Donna', 'Blowout', 'Volume', 'Styling'],
  },
  {
    id: 'gal-5',
    title: 'Atelier Nicole: L’Area Styling & Accoglienza',
    category: 'salone',
    image: '/images/salon-interior.jpg',
    description: 'Spazi luminosi, specchi ad arco di design e atmosfera riservata per il massimo relax delle nostre clienti.',
    tags: ['Salone Milano', 'Atelier Design', 'Relax', 'Esperienza'],
  },
  {
    id: 'gal-6',
    title: 'Hair Spa & Lavatesta con Cromoterapia',
    category: 'trattamenti',
    image: '/images/spa-wash.jpg',
    description: 'Poltrone reclinabili ergonomiche e massaggio shiatsu per rigenerare mente e capelli.',
    tags: ['Area Benessere', 'Massaggio Cuoio Capelluto', 'Relax', 'Lavatesta'],
  },
];

export const SALON_FAQS = [
  {
    question: 'Che differenza c’è tra il vostro Balayage e le mèches tradizionali?',
    answer:
      'Il Balayage di Nicole Parrucchieri viene eseguito a mano libera, sfumando gradualmente il colore dalla radice alle punte. A differenza delle meches con carta stagnola che creano stacchi netti e righe visibili, il Balayage garantisce un effetto luce degradé naturale. La ricrescita non è visibile e il risultato dura impeccabile per 4-6 mesi.',
  },
  {
    question: 'Come funziona il percorso per le Acconciature Sposa?',
    answer:
      'Il percorso sposa inizia con una prima consulenza per analizzare l’abito, gli accessori, il tema del matrimonio e la morfologia del tuo viso. Effettuiamo 1 o 2 prove accurate per testare la tenuta dell’acconciatura. Il giorno del matrimonio il nostro team può raggiungerti ovunque desideri a Milano e provincia per pettinare te, le tue damigelle e la mamma.',
  },
  {
    question: 'Quanto tempo prima devo prenotare per un Balayage o per la Sposa?',
    answer:
      'Per il Balayage consigliamo di prenotare con circa 7-10 giorni di anticipo (specialmente per il giovedì, venerdì e sabato). Per le spose, suggeriamo di contattarci da 3 a 6 mesi prima delle nozze per garantire la disponibilità della data nel nostro calendario.',
  },
  {
    question: 'I vostri prodotti rispettano la salute del capello?',
    answer:
      'Assolutamente sì. Utilizziamo esclusivamente formulazioni professionali certificate, arricchite con oli biologici spremuti a freddo, proteine vegetali e complessi plex rinforzanti che preservano l’integrità delle fibre capillari prima, durante e dopo ogni schiaritura.',
  },
];
