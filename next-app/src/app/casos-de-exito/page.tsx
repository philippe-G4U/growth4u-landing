import type { Metadata } from 'next';
import { getAllCaseStudies } from '@/lib/firebase';
import CasosPageClient from './CasosPageClient';

export const metadata: Metadata = {
  title: 'Casos de Éxito | Growth4U',
  description: 'Descubre cómo hemos ayudado a fintechs como Bnext, Bit2Me y GoCardless a escalar su crecimiento con resultados medibles.',
  alternates: {
    canonical: '/casos-de-exito',
  },
  openGraph: {
    title: 'Casos de Éxito | Growth4U',
    description: 'Resultados reales de fintechs que han escalado con el Trust Engine.',
    type: 'website',
  },
};

export const revalidate = 3600;
export const dynamic = 'force-static';

export default async function CasosDeExitoPage() {
  const caseStudies = await getAllCaseStudies();
  return <CasosPageClient caseStudies={caseStudies} />;
}
