import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nicole Parrucchieri Milano | Specialisti in Balayage & Acconciature Sposa',
  description: 'Salone di bellezza esclusivo Nicole Parrucchieri a Milano. Esperti in Balayage sartoriale, Acconciature Sposa d’autore e trattamenti rigeneranti per capelli sani e luminosi.',
  keywords: [
    'Nicole Parrucchieri',
    'Balayage Milano',
    'Acconciature Sposa Milano',
    'Parrucchiere Milano Centro',
    'Schiariture Capelli Naturali',
    'Trattamenti Cheratina Capelli',
    'Taglio Capelli Donna Sartoriale',
    'Colorazione Capelli Degradé',
    'Hair Spa e Ricostruzione Capelli'
  ],
  authors: [{ name: 'Nicole Parrucchieri & Atelier' }],
  creator: 'Nicole Parrucchieri',
  publisher: 'Nicole Parrucchieri & Atelier',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Nicole Parrucchieri | Balayage Sartoriale & Acconciature Sposa Milano',
    description: 'Vivi l’esperienza di un salone di bellezza d’eccellenza. Balayage sfumato, acconciature sposa su misura e trattamenti spa per capelli.',
    url: 'https://nicoleparrucchieri.it',
    siteName: 'Nicole Parrucchieri & Atelier',
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: '/images/salon-interior.jpg',
        width: 1200,
        height: 630,
        alt: 'Salone Nicole Parrucchieri e Atelier Milano',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nicole Parrucchieri | Balayage & Acconciature Sposa Milano',
    description: 'Atelier di bellezza per capelli: Balayage luminoso, Acconciature sposa e cura rigenerante.',
    images: ['/images/salon-interior.jpg'],
  },
  alternates: {
    canonical: 'https://nicoleparrucchieri.it',
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['HairSalon', 'LocalBusiness', 'HealthAndBeautyBusiness'],
      '@id': 'https://nicoleparrucchieri.it/#salon',
      'name': 'Nicole Parrucchieri & Atelier',
      'alternateName': 'Nicole Parrucchieri Milano - Balayage & Acconciature Sposa',
      'description': 'Salone esclusivo di hairstyling a Milano specializzato in Balayage naturale, schiariture couture, acconciature per spose e trattamenti di ricostruzione molecolare.',
      'url': 'https://nicoleparrucchieri.it',
      'telephone': '+390289456712',
      'priceRange': '€€-€€€',
      'image': [
        'https://nicoleparrucchieri.it/images/salon-interior.jpg',
        'https://nicoleparrucchieri.it/images/balayage.jpg',
        'https://nicoleparrucchieri.it/images/bridal-hair.jpg'
      ],
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Via Alessandro Manzoni 24',
        'addressLocality': 'Milano',
        'postalCode': '20121',
        'addressRegion': 'MI',
        'addressCountry': 'IT'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 45.4705,
        'longitude': 9.1913
      },
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          'opens': '09:00',
          'closes': '19:30'
        },
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': 'Saturday',
          'opens': '08:30',
          'closes': '19:00'
        }
      ],
      'sameAs': [
        'https://www.instagram.com/nicoleparrucchieri.official',
        'https://www.facebook.com/nicoleparrucchieri',
        'https://www.tiktok.com/@nicolehairstylist'
      ],
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'reviewCount': '184',
        'bestRating': '5',
        'worstRating': '1'
      },
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Servizi Esclusivi Nicole Parrucchieri',
        'itemListElement': [
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Balayage & Color Couture',
              'description': 'Schiariture naturali personalizzate su misura con tecnica French Balayage, AirTouch e gloss tonalizzante ad alta luminosità.'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Acconciature Sposa & Cerimonia',
              'description': 'Percorso bridal esclusivo con consulenza d’immagine, prova acconciatura, styling per il giorno del matrimonio e cura della chioma.'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Trattamenti Capelli & Ricostruzione',
              'description': 'Terapia spa di idratazione profonda, cheratina lisciante e ricostruzione molecolare per capelli sfibrati.'
            }
          }
        ]
      }
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Che differenza c’è tra Balayage e meches tradizionali?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Il Balayage è una tecnica di schiaritura a mano libera che crea una sfumatura naturale e graduale senza stacchi netti alla radice, garantendo una ricrescita morbida che dura fino a 4-6 mesi senza obbligo di ritocco immediato.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Quando è consigliabile prenotare la prova per l’acconciatura sposa?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Consigliamo di fissare la prima consulenza e prova acconciatura sposa circa 3-5 mesi prima della data delle nozze, così da pianificare eventuali trattamenti preparatori e perfezionare lo stile insieme al velo e all’abito.'
          }
        }
      ]
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="min-h-screen bg-[#faf8f5] text-[#1c1917] antialiased selection:bg-[#d4a373] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
