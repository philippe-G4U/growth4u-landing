import { TrendingUp, Search, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Stage {
  step: string;
  title: string;
  tag: string;
  desc: string;
  icon: LucideIcon;
  guaranteeTitle: string;
  guarantees: string[];
}

export interface CaseStudy {
  company: string;
  stat: string;
  label: string;
  highlight: string;
  summary: string;
  challenge: string;
  solution: string;
  image?: string;
  videoUrl?: string;
  results?: string[];
  content?: string;
  testimonial?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  mediaUrl?: string;
}

export interface TranslationSet {
  nav: {
    problem: string;
    results: string;
    methodology: string;
    cases: string;
    team: string;
    blog: string;
    cta: string;
  };
  hero: {
    tag: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: string;
  };
  problem: {
    title: string;
    subtitle: string;
    cards: { title: string; desc: string }[];
  };
  results: {
    title: string;
    subtitle: string;
    cards: { title: string; desc: string }[];
  };
  methodology: {
    title: string;
    subtitle: string;
    stages: Stage[];
  };
  cases: {
    title: string;
    subtitle: string;
    list: CaseStudy[];
    btnRead: string;
    btnHide: string;
    challengeLabel: string;
    solutionLabel: string;
  };
  team: {
    title: string;
    bioAlfonso: string;
    bioMartin: string;
  };
  blog: {
    title: string;
    subtitle: string;
    cta: string;
    readTime: string;
    admin: string;
    empty: string;
  };
  footer: {
    title: string;
    ctaEmail: string;
    ctaCall: string;
    rights: string;
    privacy: string;
    terms: string;
  };
}

export const translations: { es: TranslationSet; en: TranslationSet } = {
  es: {
    nav: { problem: 'Problema', results: 'Resultados', methodology: 'Servicios', cases: 'Casos de Éxito', team: 'Equipo', blog: 'Blog', cta: 'Agendar Llamada' },
    hero: { tag: 'Especialistas en Growth Fintech B2B & B2C', title: 'Tu fintech puede crecer más rápido, ', titleHighlight: 'sin invertir más en marketing.', subtitle: 'Te ayudamos a crear un motor de crecimiento que perdura en el tiempo y reduce tu CAC apoyándonos en el valor de la confianza.', ctaPrimary: 'Empezar ahora', ctaSecondary: 'Ver servicios', trust: 'Empresas validadas por la confianza' },
    problem: { title: 'El modelo tradicional está roto', subtitle: 'En un mercado saturado, depender 100% de Paid Media es insostenible.', cards: [ { title: 'Alquiler de Atención', desc: 'Si cortas el presupuesto de anuncios, las ventas mueren instantáneamente.' }, { title: 'CAC Incontrolable', desc: 'El coste por clic no para de subir. Sin activos propios, tu rentabilidad se erosiona.' }, { title: 'Fricción de Confianza', desc: 'El usuario Fintech es escéptico. Atraes tráfico, pero no conviertes por falta de autoridad.' }, { title: 'Churn Silencioso', desc: 'Captas registros, no clientes. El LTV nunca llega a cubrir el coste de adquisición.' } ] },
    results: { title: 'Resultados del Trust Engine', subtitle: 'Crecimiento predecible y escalable.', cards: [ { title: 'Reducción del 70% en CAC', desc: 'Sustituimos el gasto publicitario inflado por sistemas de confianza orgánica y viralidad estructurada.' }, { title: 'Usuarios Activados', desc: 'Dejamos atrás las vanity metrics. Atraemos clientes ideales (ICP) listos para usar y pagar.' }, { title: 'Máquina 24/7', desc: 'Implementamos automatización e IA para que la captación funcione sin depender de trabajo manual.' }, { title: 'Activos que perduran', desc: 'Construimos un motor de crecimiento que gana tracción con el tiempo, aumentando el LTV.' } ] },
    methodology: {
      title: 'El motor de crecimiento adecuado.',
      subtitle: 'Infraestructura escalable según la etapa de tu negocio.',
      stages: [
        { step: 'Etapa 1', title: 'BUSCANDO PMF', tag: '0 → Tracción Real', desc: 'Realizamos **iteración rápida**: testeo de canales, mensajes y análisis de competidores para encontrar tu posicionamiento. Una propuesta de valor que guía el desarrollo del producto.', icon: Search, guaranteeTitle: 'OBJETIVO & GARANTÍA', guarantees: [ 'Validación de **Propuesta de Valor** y posicionamiento único.', 'Generación de los primeros **usuarios que pagan**.' ] },
        { step: 'Etapa 2', title: 'ESCALANDO', tag: '10K → 500K Users', desc: 'Implementamos el **Trust Engine**: generamos confianza posicionando la marca en **medios de autoridad e influencers**. Un motor de crecimiento que prioriza clientes reales.', icon: TrendingUp, guaranteeTitle: 'OBJETIVO & GARANTÍA', guarantees: [ 'Tracción orgánica y reconocimiento de marca vía **Referral**.', 'Conversión de **Clientes que pagan** y alto LTV.' ] },
        { step: 'Etapa 3', title: 'EXPANSIÓN', tag: 'Nuevo Mercado / Producto', desc: 'Plan de **Go-to-Market** para lanzar nuevos productos o iniciar operaciones en **España**. Identificamos nichos competitivos para asegurar tracción estratégica.', icon: Globe, guaranteeTitle: 'OBJETIVO & GARANTÍA', guarantees: [ 'Tracción inicial asegurada en **nichos de alta conversión**.', 'Penetración rápida con **estrategia localizada**.' ] }
      ]
    },
    cases: { title: 'Casos de Éxito', subtitle: 'Resultados reales auditados.', list: [ { company: 'BNEXT', stat: '500K', label: 'Usuarios activos', highlight: 'conseguidos en 30 meses', summary: 'De 0 a 500.000 usuarios en 30 meses, sin gastar millones en publicidad.', challenge: 'Escalar la base de usuarios en un mercado competitivo sin depender exclusivamente de paid media masivo.', solution: 'Construimos un sistema de crecimiento basado en confianza y viralidad.' }, { company: 'BIT2ME', stat: '-70%', label: 'Reducción de CAC', highlight: 'implementando Trust Engine', summary: 'Redujimos el CAC un 70% implementando el Trust Engine.', challenge: 'Acquisition cost skyrocketed due to ad saturation and mistrust in the crypto sector.', solution: 'Optimizamos datos, segmentación y activación para duplicar el valor de cada cliente.' }, { company: 'GOCARDLESS', stat: '10K €', label: 'MRR alcanzado', highlight: 'en 6 meses desde lanzamiento', summary: 'Lanzamiento desde cero en España y Portugal alcanzando 10k MRR rápidamente.', challenge: 'Entrada en nuevos mercados sin presencia de marca previa.', solution: 'Estrategia enfocada en contenido, alianzas y ventas inteligentes.' } ], btnRead: 'Leer caso completo', btnHide: 'Ver menos', challengeLabel: 'Reto', solutionLabel: 'Solución' },
    team: { title: 'Trust es lo importante, conócenos', bioAlfonso: 'Especialista en growth con más de diez años lanzando y escalando productos en fintech.', bioMartin: 'Especialista en growth técnico con más de diez años creando sistemas de automatización y datos que escalan operaciones.' },
    blog: { title: 'Blog & Insights', subtitle: 'Strategic resources to scale your fintech.', cta: 'Ver todos los artículos', readTime: 'min lectura', admin: 'Admin', empty: 'Próximamente nuevos artículos...' },
    footer: { title: 'Escala tu Fintech hoy.', ctaEmail: 'accounts@growth4u.io', ctaCall: 'Agendar Llamada', rights: '© 2025 Growth4U. Todos los derechos reservados.', privacy: 'Política de Privacidad', terms: 'Política de Cookies' }
  },
  en: {
    nav: { problem: 'Problem', results: 'Results', methodology: 'Services', cases: 'Success Stories', team: 'Team', blog: 'Blog', cta: 'Book a Call' },
    hero: { tag: 'Specialists in B2B & B2C Fintech Growth', title: 'Your fintech can grow faster, ', titleHighlight: 'without spending more on marketing.', subtitle: 'We help you create a growth engine that lasts over time and reduces your CAC by leveraging the value of trust.', ctaPrimary: 'Start now', ctaSecondary: 'View services', trust: 'Companies validated by trust' },
    problem: { title: 'The traditional model is broken', subtitle: 'In a saturated market, relying 100% on Paid Media is unsustainable.', cards: [ { title: 'Renting Attention', desc: 'If you cut the ad budget, sales die instantly.' }, { title: 'Uncontrollable CAC', desc: 'Cost per click keeps rising. Without owned assets, your profitability erodes.' }, { title: 'Trust Friction', desc: 'The Fintech user is skeptical. You attract traffic, but don\'t convert due to lack of authority.' }, { title: 'Silent Churn', desc: 'You capture registrations, not clients. LTV never covers the acquisition cost.' } ] },
    results: { title: 'Trust Engine Results', subtitle: 'Predictable and scalable growth.', cards: [ { title: '70% Reduction in CAC', desc: 'We replace inflated ad spend with organic trust systems and structured virality.' }, { title: 'Activated Users', desc: 'We leave vanity metrics behind. We attract ideal customers (ICP) ready to use and pay.' }, { title: '24/7 Machine', desc: 'We implement automation and AI so that acquisition works without depending on manual labor.' }, { title: 'Assets that last', desc: 'We build a growth engine that gains traction over time, increasing LTV.' } ] },
    methodology: {
      title: 'The right growth engine.',
      subtitle: 'Scalable infrastructure according to your business stage.',
      stages: [
        { step: 'Stage 1', title: 'SEEKING PMF', tag: '0 → Real Traction', desc: 'We perform **rapid iteration**: channel testing, messaging, and competitor analysis to find your positioning. A value proposition that guides product development.', icon: Search, guaranteeTitle: 'OBJECTIVE & GUARANTEE', guarantees: [ 'Validation of **Value Proposition** and unique positioning.', 'Generation of the first **paying users**.' ] },
        { step: 'Stage 2', title: 'SCALING', tag: '10K → 500K Users', desc: 'We implement the **Trust Engine**: building trust by positioning the brand in **authoritative media and influencers**. A growth engine that prioritizes real customers.', icon: TrendingUp, guaranteeTitle: 'OBJECTIVE & GUARANTEE', guarantees: [ 'Organic traction and brand recognition via **Referral**.', 'Conversion of **Paying Clients** and high LTV.' ] },
        { step: 'Stage 3', title: 'EXPANSION', tag: 'New Market / Product', desc: '**Go-to-Market** plan to launch new products or start operations in **Spain**. We identify competitive niches to ensure strategic traction.', icon: Globe, guaranteeTitle: 'OBJECTIVE & GUARANTEE', guarantees: [ 'Initial traction secured in **high-conversion niches**.', 'Rapid penetration with **localized strategy**.' ] }
      ]
    },
    cases: { title: 'Success Stories', subtitle: 'Real audited results.', list: [ { company: 'BNEXT', stat: '500K', label: 'Active users', highlight: 'achieved in 30 months', summary: 'From 0 to 500,000 users in 30 months, without spending millions on advertising.', challenge: 'Scaling the user base in a competitive market without relying exclusively on massive paid media.', solution: 'We built a growth system based on trust and virality.' }, { company: 'BIT2ME', stat: '-70%', label: 'CAC Reduction', highlight: 'implementing Trust Engine', summary: 'We reduced CAC by 70% implementing the Trust Engine.', challenge: 'Acquisition cost skyrocketed due to ad saturation and mistrust in the crypto sector.', solution: 'We optimized data, segmentation and activation to double the value of each client.' }, { company: 'GOCARDLESS', stat: '10K €', label: 'MRR reached', highlight: 'in 6 months from launch', summary: 'Launch from scratch in Spain and Portugal reaching 10k MRR quickly.', challenge: 'Entry into new markets without previous brand presence.', solution: 'Strategy focused on content, alliances and intelligent sales.' } ], btnRead: 'Read full case', btnHide: 'Show less', challengeLabel: 'Challenge', solutionLabel: 'Solution' },
    team: { title: 'Trust is what matters, get to know us', bioAlfonso: 'Growth specialist with more than ten years launching and scaling fintech products.', bioMartin: 'Technical growth specialist with more than ten years creating automation and data systems that scale operations.' },
    blog: { title: 'Blog & Insights', subtitle: 'Strategic resources to scale your fintech.', cta: 'View all articles', readTime: 'min read', admin: 'Admin', empty: 'Coming soon...' },
    footer: { title: 'Scale your Fintech today.', ctaEmail: 'accounts@growth4u.io', ctaCall: 'Book a Call', rights: '© 2025 Growth4U. All rights reserved.', privacy: 'Privacy Policy', terms: 'Cookie Policy' }
  }
};

export const BOOKING_LINK = 'https://now.growth4u.io/widget/bookings/growth4u_demo';
