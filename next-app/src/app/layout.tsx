import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Growth4U | Growth Marketing Fintech B2B & B2C',
    template: '%s | Growth4U',
  },
  description:
    'Especialistas en Growth Fintech. Te ayudamos a crear un motor de crecimiento que perdura en el tiempo y reduce tu CAC apoyándonos en el valor de la confianza.',
  metadataBase: new URL('https://growth4u.io'),
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://growth4u.io',
    siteName: 'Growth4U',
    title: 'Growth4U | Growth Marketing Fintech B2B & B2C',
    description:
      'Especialistas en Growth Fintech. Te ayudamos a crear un motor de crecimiento que perdura en el tiempo y reduce tu CAC apoyándonos en el valor de la confianza.',
    images: [
      {
        url: 'https://i.imgur.com/imHxGWI.png',
        width: 1200,
        height: 630,
        alt: 'Growth4U',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Growth4U | Growth Marketing Fintech B2B & B2C',
    description:
      'Especialistas en Growth Fintech. Te ayudamos a crear un motor de crecimiento que perdura en el tiempo y reduce tu CAC.',
    images: ['https://i.imgur.com/imHxGWI.png'],
  },
  icons: {
    icon: 'https://i.imgur.com/h5sWS3W.png',
  },
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4YBYPVQDT6" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4YBYPVQDT6');
            `,
          }}
        />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Growth4U',
              url: 'https://growth4u.io',
              logo: 'https://i.imgur.com/imHxGWI.png',
              sameAs: ['https://www.linkedin.com/company/growth4u/'],
            }),
          }}
        />
        {/* Trustpilot Invitation SDK */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,r,n){w.TrustpilotObject=n;w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)};a=d.createElement(s);a.async=1;a.src=r;a.type='text/java'+s;f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(a,f)})(window,document,'script','https://invitejs.trustpilot.com/tp.min.js','tp');tp('register','txZ8DOmwsM3AEPQc');`,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
