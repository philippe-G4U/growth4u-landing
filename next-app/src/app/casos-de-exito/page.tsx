import type { Metadata } from 'next';
import { getAllCaseStudies, createSlug, CaseStudy } from '@/lib/firebase';
import { caseStudiesData } from '@/lib/caseStudiesData';
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
  // Get cases from Firebase
  const firebaseCases = await getAllCaseStudies();

  // Get slugs of Firebase cases to avoid duplicates
  const firebaseSlugs = new Set(firebaseCases.map(c => c.slug));

  // Convert static cases to CaseStudy format (only those not in Firebase)
  const staticCases: CaseStudy[] = Object.entries(caseStudiesData)
    .filter(([slug]) => !firebaseSlugs.has(slug))
    .map(([slug, data]) => ({
      id: `static-${slug}`,
      slug,
      company: data.company,
      logo: '',
      stat: data.stat,
      statLabel: data.label,
      highlight: data.highlight,
      summary: data.summary,
      challenge: data.challenge,
      solution: data.solution,
      results: data.results || [],
      testimonial: data.testimonial || '',
      testimonialAuthor: data.testimonialAuthor || '',
      testimonialRole: data.testimonialRole || '',
      image: data.image || '',
      videoUrl: data.videoUrl || '',
      content: data.content || '',
      mediaUrl: data.mediaUrl || '',
      createdAt: null,
      updatedAt: null,
    }));

  // Combine Firebase and static cases
  const allCases = [...firebaseCases, ...staticCases];

  return <CasosPageClient caseStudies={allCases} />;
}
