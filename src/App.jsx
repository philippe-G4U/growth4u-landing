import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, ArrowRight, Megaphone, ShieldAlert, Users, ArrowDownRight, 
  CheckCircle2, Cpu, Check, Mail, Calendar, Menu, X, ChevronDown, ChevronUp, 
  ArrowUpRight, Clock, Target, Settings, BarChart3, Search, Zap, Layers, 
  Share2, MessageCircle, Gift, RefreshCw, Rocket, Briefcase, Smartphone, 
  Lock, LayoutDashboard, Users2, Plus, ArrowLeft, Save, Building2,
  TrendingDown, Bot, Landmark, Globe
} from 'lucide-react';

// Firebase Imports
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

// --- CONFIGURACIÓN DE FIREBASE (IMPORTANTE) ---
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Inicialización segura
let app, auth, db;
try {
  if (typeof __firebase_config !== 'undefined') {
     const internalConfig = JSON.parse(__firebase_config);
     app = initializeApp(internalConfig);
  } else {
     app = initializeApp(firebaseConfig); 
  }
  auth = getAuth(app);
  db = getFirestore(app);
} catch (e) {
  console.warn("Firebase no configurado correctamente. El blog usará modo solo lectura/demo.");
}

const appId = typeof __app_id !== 'undefined' ? __app_id : 'growth4u-public-app';

// --- TRADUCCIONES (Movidas fuera para estabilidad) ---
const translations = {
  es: {
    nav: {
      problem: "Problema",
      results: "Resultados",
      methodology: "Metodología",
      cases: "Casos",
      team: "Equipo",
      blog: "Blog",
      cta: "Agendar Llamada"
    },
    hero: {
      tag: "Especialistas en Growth Fintech B2B & B2C",
      title: "Tu fintech puede crecer más rápido, ",
      titleHighlight: "sin invertir más en marketing.",
      subtitle: "Te ayudamos a crear un motor de crecimiento que perdura en el tiempo y reduce tu CAC apoyándonos en el valor de la confianza.",
      ctaPrimary: "Empezar ahora",
      ctaSecondary: "Ver metodología",
      trust: "Empresas validadas por la confianza"
    },
    problem: {
      title: "El modelo tradicional está roto",
      subtitle: "En un mercado saturado, depender 100% de Paid Media es insostenible.",
      cards: [
        { title: "Alquiler de Atención", desc: "Si cortas el presupuesto de anuncios, las ventas mueren instantáneamente." },
        { title: "CAC Incontrolable", desc: "El coste por clic no para de subir. Sin activos propios, tu rentabilidad se erosiona." },
        { title: "Fricción de Confianza", desc: "El usuario Fintech es escéptico. Atraes tráfico, pero no conviertes por falta de autoridad." },
        { title: "Churn Silencioso", desc: "Captas registros, no clientes. El LTV nunca llega a cubrir el coste de adquisición." }
      ]
    },
    results: {
      title: "Resultados del Trust Engine",
      subtitle: "Crecimiento predecible y escalable.",
      cards: [
        { title: "Reducción del 70% en CAC", desc: "Sustituimos el gasto publicitario inflado por sistemas de confianza orgánica y viralidad estructurada." },
        { title: "Usuarios Activados", desc: "Dejamos atrás las vanity metrics. Atraemos clientes ideales (ICP) listos para usar y pagar." },
        { title: "Máquina 24/7", desc: "Implementamos automatización e IA para que la captación funcione sin depender de trabajo manual." },
        { title: "Activos que perduran", desc: "Construimos un motor de crecimiento que gana tracción con el tiempo, aumentando el LTV." }
      ]
    },
    methodology: {
      title: "Una metodología adaptada a tu momento",
      subtitle: "Selecciona tu etapa para ver cómo aplicamos el sistema.",
      initial: {
        title: "Fase Inicial",
        tag: "0 → PMF",
        desc: "Para fintechs que tienen producto y necesitan estructurar su crecimiento.",
        btnShow: "Ver Proceso de Fundamentos",
        btnHide: "Ocultar Proceso",
        items: [
          "Primera 500 clientes cualificados en 90-60 días con retorno ROI inmediato.",
          "Construcción de Trust Fortress (Blogs/Foros).",
          "Creación de producto y su customer journey.",
          "Implementación de herramientas de automatización y CRM."
        ],
        detailsTitle: "El Camino a la Tracción",
        detailsSubtitle: "Los pasos críticos para validar tu modelo y producto.",
        detailCards: [
          { title: "Competidores & Nichos", desc: "Análisis de mercado, competidores, nichos y nivel de dolor." },
          { title: "ICP & Mensaje", desc: "Definición de Ideal Customer Profile, canales, mensajes y keywords." },
          { title: "Activación", desc: "Definición de incentivos y puntos de activación clave." },
          { title: "Dashboard", desc: "Configuración de métricas clave para seguimiento de tracción." }
        ]
      },
      scale: {
        title: "Fase Escala",
        tag: "10k → 500k Users",
        desc: "Para fintechs con tracción que quieren escalar sin disparar costes.",
        btnShow: "Ver Motor de Crecimiento",
        btnHide: "Ocultar Sistema",
        items: [
          "Optimización de paid/ads: 3x de resultados.",
          "Estrategia comercial con 10-15 automatizaciones.",
          "Escalado de CAC de 40-60 días a 3-6 meses."
        ],
        flywheel: {
          tag: "Trust Engine",
          borrowed: { title: "Borrowed Flywheel", items: ["Influencers / UGC", "Trust Fortress"] },
          review: { title: "Review Flywheel", items: ["Reviews & Feedback", "NPS Loop"] },
          promise: { title: "Promise Flywheel", items: ["Landing Page Incentivo", "Activar Usuarios", "Member Get Member"] }
        }
      }
    },
    cases: {
      title: "Casos de Éxito",
      subtitle: "Resultados reales auditados.",
      list: [
        { company: "BNEXT", stat: "500K", label: "Usuarios activos", highlight: "conseguidos en 30 meses", summary: "De 0 a 500.000 usuarios en 30 meses, sin gastar millones en publicidad.", challenge: "Escalar la base de usuarios en un mercado competitivo sin depender exclusivamente de paid media masivo.", solution: "Construimos un sistema de crecimiento basado en confianza y viralidad." },
        { company: "BIT2ME", stat: "-70%", label: "Reducción de CAC", highlight: "implementando Trust Engine", summary: "Redujimos el CAC un 70% implementando el Trust Engine.", challenge: "Coste de adquisición disparado por saturación publicitaria y desconfianza en el sector cripto.", solution: "Optimizamos datos, segmentación y activación para duplicar el valor de cada cliente." },
        { company: "GOCARDLESS", stat: "10K €", label: "MRR alcanzado", highlight: "en 6 meses desde lanzamiento", summary: "Lanzamiento desde cero en España y Portugal alcanzando 10k MRR rápidamente.", challenge: "Entrada en nuevos mercados sin presencia de marca previa.", solution: "Estrategia enfocada en contenido, alianzas y ventas inteligentes." }
      ],
      btnRead: "Leer caso completo",
      btnHide: "Ver menos",
      challengeLabel: "Reto",
      solutionLabel: "Solución"
    },
    team: {
      title: "Lo importante es la confianza, conócenos",
      bioAlfonso: "Especialista en growth con más de diez años lanzando y escalando productos en fintech.",
      bioMartin: "Especialista en growth técnico con más de diez años creando sistemas de automatización y datos que escalan operaciones."
    },
    blog: {
      title: "Blog & Insights",
      subtitle: "Recursos estratégicos para escalar tu fintech.",
      cta: "Ver todos los artículos",
      readTime: "min lectura",
      admin: "Admin",
      defaults: [
        { id: 'd1', category: "Estrategia", title: "La muerte del Paid Media en Fintech", excerpt: "Por qué el modelo de alquiler de atención ya no es rentable en 2024 y cómo pivotar hacia activos propios.", content: "Contenido...", readTime: "5 min lectura", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
        { id: 'd2', category: "Data & Analytics", title: "Cómo calcular tu CAC real sin trampas", excerpt: "La guía definitiva para entender cuánto te cuesta realmente cada usuario activado, más allá del CPC.", content: "Contenido...", readTime: "7 min lectura", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
        { id: 'd3', category: "Trust Engine", title: "Confianza: La nueva moneda de cambio", excerpt: "Cómo construir activos de marca que reduzcan la fricción en la conversión y aumenten el LTV.", content: "Contenido...", readTime: "4 min lectura", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800" }
      ]
    },
    footer: {
      title: "Escala tu Fintech hoy.",
      ctaEmail: "clients@growth4u.io",
      ctaCall: "Agendar Llamada",
      rights: "© 2025 Growth4U. Todos los derechos reservados.",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio"
    }
  },
  en: {
    nav: {
      problem: "Problem",
      results: "Results",
      methodology: "Methodology",
      cases: "Cases",
      team: "Team",
      blog: "Blog",
      cta: "Book a Call"
    },
    hero: {
      tag: "Specialists in B2B & B2C Fintech Growth",
      title: "Your fintech can grow faster, ",
      titleHighlight: "without spending more on marketing.",
      subtitle: "We help you create a growth engine that lasts over time and reduces your CAC by leveraging the value of trust.",
      ctaPrimary: "Start now",
      ctaSecondary: "View methodology",
      trust: "Companies validated by trust"
    },
    problem: {
      title: "The traditional model is broken",
      subtitle: "In a saturated market, relying 100% on Paid Media is unsustainable.",
      cards: [
        { title: "Renting Attention", desc: "If you cut the ad budget, sales die instantly." },
        { title: "Uncontrollable CAC", desc: "Cost per click keeps rising. Without owned assets, your profitability erodes." },
        { title: "Trust Friction", desc: "The Fintech user is skeptical. You attract traffic, but don't convert due to lack of authority." },
        { title: "Silent Churn", desc: "You capture registrations, not clients. LTV never covers the acquisition cost." }
      ]
    },
    results: {
      title: "Trust Engine Results",
      subtitle: "Predictable and scalable growth.",
      cards: [
        { title: "70% Reduction in CAC", desc: "We replace inflated ad spend with organic trust systems and structured virality." },
        { title: "Activated Users", desc: "We leave vanity metrics behind. We attract ideal customers (ICP) ready to use and pay." },
        { title: "24/7 Machine", desc: "We implement automation and AI so that acquisition works without depending on manual labor." },
        { title: "Assets that last", desc: "We build a growth engine that gains traction over time, increasing LTV." }
      ]
    },
    methodology: {
      title: "A methodology adapted to your stage",
      subtitle: "Select your stage to see how we apply the system.",
      initial: {
        title: "Initial Phase",
        tag: "0 → PMF",
        desc: "For fintechs that have a product and need to structure their growth.",
        btnShow: "View Foundation Process",
        btnHide: "Hide Process",
        items: [
          "First 500 qualified clients in 90-60 days with immediate ROI return.",
          "Construction of Trust Fortress (Blogs/Forums).",
          "Product creation and its customer journey.",
          "Implementation of automation and CRM tools."
        ],
        detailsTitle: "The Road to Traction",
        detailsSubtitle: "Critical steps to validate your model and product.",
        detailCards: [
          { title: "Competitors & Niches", desc: "Market analysis, competitors, niches and pain level." },
          { title: "ICP & Messaging", desc: "Definition of Ideal Customer Profile, channels, messages and keywords." },
          { title: "Activation", desc: "Definition of incentives and key activation points." },
          { title: "Dashboard", desc: "Configuration of key metrics for traction tracking." }
        ]
      },
      scale: {
        title: "Scale Phase",
        tag: "10k → 500k Users",
        desc: "For fintechs with traction that want to scale without skyrocketing costs.",
        btnShow: "View Growth Engine",
        btnHide: "Hide System",
        items: [
          "Paid/ads optimization: 3x results.",
          "Commercial strategy with 10-15 automations.",
          "CAC scaling from 40-60 days to 3-6 months."
        ],
        flywheel: {
          tag: "Trust Engine",
          borrowed: { title: "Borrowed Flywheel", items: ["Influencers / UGC", "Trust Fortress"] },
          review: { title: "Review Flywheel", items: ["Reviews & Feedback", "NPS Loop"] },
          promise: { title: "Promise Flywheel", items: ["Landing Page Incentive", "Activate Users", "Member Get Member"] }
        }
      }
    },
    cases: {
      title: "Success Stories",
      subtitle: "Real audited results.",
      list: [
        { company: "BNEXT", stat: "500K", label: "Active users", highlight: "achieved in 30 months", summary: "From 0 to 500,000 users in 30 months, without spending millions on advertising.", challenge: "Scaling the user base in a competitive market without relying exclusively on massive paid media.", solution: "We built a growth system based on trust and virality." },
        { company: "BIT2ME", stat: "-70%", label: "CAC Reduction", highlight: "implementing Trust Engine", summary: "We reduced CAC by 70% implementing the Trust Engine.", challenge: "Acquisition cost skyrocketed due to ad saturation and mistrust in the crypto sector.", solution: "We optimized data, segmentation and activation to double the value of each client." },
        { company: "GOCARDLESS", stat: "10K €", label: "MRR reached", highlight: "in 6 months from launch", summary: "Launch from scratch in Spain and Portugal reaching 10k MRR quickly.", challenge: "Entry into new markets without previous brand presence.", solution: "Strategy focused on content, alliances and intelligent sales." }
      ],
      btnRead: "Read full case",
      btnHide: "Show less",
      challengeLabel: "Challenge",
      solutionLabel: "Solution"
    },
    team: {
      title: "Trust is what matters, get to know us",
      bioAlfonso: "Growth specialist with more than ten years launching and scaling fintech products.",
      bioMartin: "Technical growth specialist with more than ten years creating automation and data systems that scale operations."
    },
    blog: {
      title: "Blog & Insights",
      subtitle: "Strategic resources to scale your fintech.",
      cta: "View all articles",
      readTime: "min read",
      admin: "Admin",
      defaults: [
        { id: 'd1', category: "Estrategia", title: "The death of Paid Media in Fintech", excerpt: "Why the attention rental model is no longer profitable in 2024 and how to pivot to owned assets.", content: "Content...", readTime: "5 min read", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
        { id: 'd2', category: "Data & Analytics", title: "How to calculate your real CAC without traps", excerpt: "The definitive guide to understanding how much each activated user really costs you, beyond CPC.", content: "Content...", readTime: "7 min read", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
        { id: 'd3', category: "Trust Engine", title: "Trust: The new currency", excerpt: "How to build brand assets that reduce conversion friction and increase LTV.", content: "Content...", readTime: "4 min read", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800" }
      ]
    },
    footer: {
      title: "Scale your Fintech today.",
      ctaEmail: "clients@growth4u.io",
      ctaCall: "Book a Call",
      rights: "© 2025 Growth4U. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    }
  }
};

export default function App() {
  const [view, setView] = useState('home');
  const [lang, setLang] = useState('es'); 
  const t = translations[lang]; 
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCase, setExpandedCase] = useState(null);
  
  const [showFlywheel, setShowFlywheel] = useState(false); 
  const [showInitialPhase, setShowInitialPhase] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [user, setUser] = useState(null);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const [newPost, setNewPost] = useState({
    title: '',
    category: 'Estrategia',
    excerpt: '',
    content: '',
    image: '',
    readTime: '5 min'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const bookingLink = "https://now.growth4u.io/widget/bookings/growth4u_demo";

  // --- HOOKS ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') setIsAdminMode(true);
  }, []);

  useEffect(() => {
    if (!auth) return;
    signInAnonymously(auth).catch(console.error);
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!db) return;
    try {
      const q = query(collection(db, 'blog_posts'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return () => unsubscribe();
    } catch (e) {
      console.log("Blog offline mode");
    }
  }, [user]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!db) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'blog_posts'), { ...newPost, createdAt: serverTimestamp(), author: "Equipo Growth4U" });
      setNewPost({ title: '', category: 'Estrategia', excerpt: '', content: '', image: '', readTime: '5 min' });
      setView('home');
      setTimeout(() => document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setView('post');
    window.scrollTo(0, 0);
  };

  const toggleLang = () => setLang(prev => prev === 'es' ? 'en' : 'es');

  // Determine posts to display (Real from DB + Defaults for fallback/demo)
  // Logic: If DB has posts, use them. If not, use defaults from current language.
  const displayPosts = posts.length > 0 ? posts : t.blog.defaults;

  // --- RENDER VIEWS ---

  if (view === 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 text-[#032149] font-sans p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Agregar Nuevo Artículo</h2>
                <button onClick={() => setView('home')}><X className="w-6 h-6" /></button>
             </div>
             <form onSubmit={handleCreatePost} className="space-y-6">
                <input required type="text" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} className="w-full p-3 rounded-xl border border-slate-300 outline-none" placeholder="Título" />
                <div className="grid grid-cols-2 gap-4">
                  <select value={newPost.category} onChange={e => setNewPost({...newPost, category: e.target.value})} className="w-full p-3 rounded-xl border border-slate-300 outline-none">
                    <option>Estrategia</option><option>Data & Analytics</option><option>Trust Engine</option>
                  </select>
                  <input type="text" value={newPost.readTime} onChange={e => setNewPost({...newPost, readTime: e.target.value})} className="w-full p-3 rounded-xl border border-slate-300 outline-none" placeholder="Tiempo lectura" />
                </div>
                <input required type="url" value={newPost.image} onChange={e => setNewPost({...newPost, image: e.target.value})} className="w-full p-3 rounded-xl border border-slate-300 outline-none" placeholder="URL Imagen" />
                <textarea required value={newPost.excerpt} onChange={e => setNewPost({...newPost, excerpt: e.target.value})} className="w-full p-3 rounded-xl border border-slate-300 outline-none h-20" placeholder="Resumen..." />
                <textarea required value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} className="w-full p-3 rounded-xl border border-slate-300 outline-none h-40" placeholder="Contenido..." />
                <button type="submit" disabled={isSubmitting} className="w-full bg-[#6351d5] text-white font-bold py-4 rounded-xl">{isSubmitting ? '...' : 'Publicar'}</button>
             </form>
        </div>
      </div>
    );
  }

  if (view === 'post' && selectedPost) {
    return (
      <div className="min-h-screen bg-white text-[#032149] font-sans selection:bg-[#45b6f7] selection:text-white">
         <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
               <div className="flex items-center gap-0 cursor-pointer" onClick={() => setView('home')}>
                  <img src="https://i.imgur.com/imHxGWI.png" alt="Growth4U" className="h-6 w-auto" />
               </div>
               <button onClick={() => setView('home')} className="text-sm font-bold text-[#6351d5] flex items-center gap-2 hover:underline"><ArrowLeft className="w-4 h-4" /> Volver</button>
            </div>
         </nav>
         <article className="pt-32 pb-20 max-w-3xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 text-[#032149]">{selectedPost.title}</h1>
            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-64 md:h-96 object-cover rounded-3xl shadow-2xl mb-12" />
            <div className="prose prose-lg prose-slate mx-auto"><p>{selectedPost.excerpt}</p><p className="mt-4 whitespace-pre-wrap">{selectedPost.content}</p></div>
            <div className="mt-12 text-center">
               <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all">{t.nav.cta}</a>
            </div>
         </article>
      </div>
    );
  }

  // MAIN VIEW
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#45b6f7] selection:text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        :root { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; }
        .gradient-text { background: linear-gradient(to right, #0284c7, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .card-hover:hover { transform: translateY(-5px); box-shadow: 0 20px 40px -10px rgba(99, 81, 213, 0.15); }
        .nav-island { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.5); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); border-radius: 9999px; transition: all 0.3s ease; }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll 40s linear infinite; }
        .animate-scroll:hover { animation-play-state: paused; }
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>

      {/* Navigation */}
      <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
        <nav className="nav-island w-full max-w-6xl">
          <div className="px-6 sm:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-0 cursor-pointer group flex-shrink-0" onClick={() => window.scrollTo(0,0)}>
                <img src="https://i.imgur.com/imHxGWI.png" alt="Growth4U Logo" className="h-5 md:h-6 w-auto object-contain transition-transform group-hover:scale-105" />
              </div>
              <div className="hidden md:flex items-center gap-6">
                <div className="flex items-baseline space-x-6">
                  <a href="#problema" className="hover:text-[#6351d5] transition-colors px-2 py-2 rounded-md text-sm font-medium text-[#032149]">{t.nav.problem}</a>
                  <a href="#resultados" className="hover:text-[#6351d5] transition-colors px-2 py-2 rounded-md text-sm font-medium text-[#032149]">{t.nav.results}</a>
                  <a href="#etapas" className="hover:text-[#6351d5] transition-colors px-2 py-2 rounded-md text-sm font-medium text-[#032149]">{t.nav.methodology}</a>
                  <a href="#casos" className="hover:text-[#6351d5] transition-colors px-2 py-2 rounded-md text-sm font-medium text-[#032149]">{t.nav.cases}</a>
                  <a href="#team" className="hover:text-[#6351d5] transition-colors px-2 py-2 rounded-md text-sm font-medium text-[#032149]">{t.nav.team}</a>
                  <a href="#blog" className="hover:text-[#6351d5] transition-colors px-2 py-2 rounded-md text-sm font-medium text-[#032149]">{t.nav.blog}</a>
                </div>
                <button onClick={toggleLang} className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full text-xs font-bold text-[#032149] transition-colors border border-slate-200">
                    <Globe className="w-3 h-3" /> {lang === 'es' ? 'EN' : 'ES'}
                </button>
              </div>
              
              <div className="hidden md:flex items-center gap-4">
                <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-2 px-5 rounded-full text-sm transition-all duration-300 shadow-lg shadow-[#6351d5]/20 hover:shadow-[#6351d5]/40 transform hover:-translate-y-0.5">{t.nav.cta}</a>
              </div>
              <div className="md:hidden flex items-center gap-4">
                 <button onClick={toggleLang} className="text-[#032149] font-bold text-sm">{lang === 'es' ? 'EN' : 'ES'}</button>
                 <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#032149] hover:text-[#6351d5] focus:outline-none"><Menu className="h-6 w-6" /></button>
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <div className="absolute top-20 left-0 right-0 mx-4 bg-white rounded-2xl border border-slate-100 shadow-2xl overflow-hidden animate-in slide-in-from-top-2">
              <div className="px-4 pt-4 pb-6 space-y-2">
                <a href="#problema" onClick={() => setIsMenuOpen(false)} className="text-[#032149] hover:text-[#6351d5] block px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-50">{t.nav.problem}</a>
                <a href="#resultados" onClick={() => setIsMenuOpen(false)} className="text-[#032149] hover:text-[#6351d5] block px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-50">{t.nav.results}</a>
                <a href="#etapas" onClick={() => setIsMenuOpen(false)} className="text-[#032149] hover:text-[#6351d5] block px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-50">{t.nav.methodology}</a>
                <a href="#casos" onClick={() => setIsMenuOpen(false)} className="text-[#032149] hover:text-[#6351d5] block px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-50">{t.nav.cases}</a>
                <a href="#team" onClick={() => setIsMenuOpen(false)} className="text-[#032149] hover:text-[#6351d5] block px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-50">{t.nav.team}</a>
                <a href="#blog" onClick={() => setIsMenuOpen(false)} className="text-[#032149] hover:text-[#6351d5] block px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-50">{t.nav.blog}</a>
                <a href={bookingLink} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="text-white bg-[#6351d5] font-bold block px-3 py-3 rounded-xl text-base mt-4 text-center">{t.nav.cta}</a>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative pt-44 pb-20 lg:pt-60 lg:pb-32 overflow-hidden bg-white">
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#45b6f7]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-20 right-10 w-96 h-96 bg-[#6351d5]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-[#0faec1] animate-pulse"></span>
            <span className="text-sm text-[#1a3690] font-bold tracking-wide">{t.hero.tag}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-[#032149]">
            {t.hero.title} <br className="hidden md:block" />
            <span className="gradient-text">{t.hero.titleHighlight}</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed">{t.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#6351d5] text-white hover:bg-[#3f45fe] font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-xl shadow-[#6351d5]/20">{t.hero.ctaPrimary} <ArrowRight className="w-5 h-5" /></a>
            <a href="#etapas" className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 font-semibold py-4 px-8 rounded-full text-lg transition-all hover:shadow-md">{t.hero.ctaSecondary}</a>
          </div>
          <div className="mt-24 border-t border-slate-200 pt-10 overflow-hidden relative w-full max-w-6xl mx-auto">
            <p className="text-[#1a3690] text-sm font-bold uppercase tracking-wider mb-8">{t.hero.trust}</p>
            <div className="relative w-full overflow-hidden">
                <div className="flex animate-scroll whitespace-nowrap gap-16 items-center">
                    {['bnext','bit2me','GoCardless','Lydia','Criptan','capitalontap','multimarkts','NEXTCHANCE', 'bnext','bit2me','GoCardless','Lydia'].map((logo, i) => (
                       <span key={i} className="text-3xl font-bold font-sans text-slate-400 hover:text-[#6351d5] transition-colors cursor-default">{logo}</span>
                    ))}
                </div>
            </div>
            <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problema" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#032149]">{t.problem.title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t.problem.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.problem.cards.map((item, i) => {
               const Icon = [Megaphone, TrendingUp, ShieldAlert, Users][i];
               return (
                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 card-hover transition-all group shadow-sm hover:shadow-lg">
                    <div className="bg-[#3f45fe]/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#3f45fe]/20 transition-colors"><Icon className="text-[#3f45fe] w-7 h-7" /></div>
                    <h3 className="text-xl font-bold mb-3 text-[#032149]">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
            )})}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="resultados" className="py-24 bg-white relative border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#032149]">{t.results.title}</h2>
            <p className="text-slate-600 text-lg">{t.results.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {t.results.cards.map((card, i) => {
                 const Icons = [TrendingDown, Users2, Bot, Landmark];
                 const Icon = Icons[i];
                 const color = i % 3 === 0 ? '#6351d5' : '#3f45fe'; // Alternate colors
                 return (
                    <div key={i} className="bg-slate-50 p-8 rounded-3xl border-l-4 flex items-start gap-6 hover:shadow-lg transition-shadow" style={{borderColor: color}}>
                        <div className="bg-white p-3 rounded-xl shadow-sm"><Icon className="w-8 h-8" style={{color: color}}/></div>
                        <div>
                            <h3 className="text-xl font-bold text-[#032149] mb-2">{card.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{card.desc}</p>
                        </div>
                    </div>
                 )
             })}
          </div>
        </div>
      </section>

      {/* METHODOLOGY & STAGES */}
      <section id="etapas" className="py-24 relative bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#032149]">{t.methodology.title}</h2>
            <p className="text-slate-600 text-lg">{t.methodology.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* INITIAL PHASE */}
            <div className={`relative group transition-all duration-500 cursor-pointer ${showInitialPhase ? 'ring-2 ring-[#45b6f7]' : 'hover:-translate-y-1'}`} onClick={() => setShowInitialPhase(!showInitialPhase)}>
              <div className="relative bg-white p-8 rounded-3xl h-full flex flex-col shadow-xl border border-slate-100 hover:border-[#45b6f7] transition-colors">
                <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3"><div className="bg-[#45b6f7]/10 p-2 rounded-lg"><Target className="w-6 h-6 text-[#45b6f7]"/></div><h3 className="text-2xl font-bold text-[#032149] uppercase tracking-wider">{t.methodology.initial.title}</h3></div>
                  <span className="px-3 py-1 bg-[#45b6f7]/10 text-[#1a3690] text-xs font-bold rounded-full border border-[#45b6f7]/20">{t.methodology.initial.tag}</span>
                </div>
                <p className="text-slate-600 text-sm mb-6 font-medium">{t.methodology.initial.desc}</p>
                <div className="space-y-4 flex-grow mb-6">
                   {t.methodology.initial.items.map((item,i) => (
                      <div key={i} className="flex items-start gap-3"><div className="mt-1 bg-[#45b6f7]/10 p-1 rounded-full"><Check className="w-3 h-3 text-[#45b6f7]"/></div><span className="text-slate-600 text-sm">{item}</span></div>
                   ))}
                </div>
                <div className="mt-auto pt-6 border-t border-slate-100 flex justify-center">
                   <button className={`flex items-center gap-2 text-sm font-bold transition-all ${showInitialPhase ? 'text-[#45b6f7]' : 'text-slate-400 hover:text-[#45b6f7]'}`}>{showInitialPhase ? t.methodology.initial.btnHide : t.methodology.initial.btnShow} <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showInitialPhase ? 'rotate-180' : ''}`} /></button>
                </div>
              </div>
            </div>
            {/* SCALE PHASE */}
            <div className={`relative group transition-all duration-500 cursor-pointer ${showFlywheel ? 'ring-2 ring-[#6351d5]' : 'hover:-translate-y-1'}`} onClick={() => setShowFlywheel(!showFlywheel)}>
              <div className="relative bg-white p-8 rounded-3xl h-full flex flex-col shadow-xl border border-slate-100 hover:border-[#6351d5] transition-colors">
                <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3"><div className="bg-[#6351d5]/10 p-2 rounded-lg"><Rocket className="w-6 h-6 text-[#6351d5]"/></div><h3 className="text-2xl font-bold text-[#032149] uppercase tracking-wider">{t.methodology.scale.title}</h3></div>
                  <span className="px-3 py-1 bg-[#6351d5]/10 text-[#6351d5] text-xs font-bold rounded-full border border-[#6351d5]/20">{t.methodology.scale.tag}</span>
                </div>
                <p className="text-slate-600 text-sm mb-6 font-medium">{t.methodology.scale.desc}</p>
                <div className="space-y-4 flex-grow mb-6">
                   {t.methodology.scale.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3"><div className="mt-1 bg-[#6351d5]/10 p-1 rounded-full"><Check className="w-3 h-3 text-[#6351d5]"/></div><span className="text-slate-600 text-sm">{item}</span></div>
                   ))}
                </div>
                <div className="mt-auto pt-6 border-t border-slate-100 flex justify-center">
                   <button className={`flex items-center gap-2 text-sm font-bold transition-all ${showFlywheel ? 'text-[#6351d5]' : 'text-slate-400 hover:text-[#6351d5]'}`}>{showFlywheel ? t.methodology.scale.btnHide : t.methodology.scale.btnShow} <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFlywheel ? 'rotate-180' : ''}`} /></button>
                </div>
              </div>
            </div>
          </div>

          {/* EXPANDABLE: INITIAL PHASE DETAILS */}
          <div className={`transition-all duration-700 ease-in-out overflow-hidden mb-8 ${showInitialPhase ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
             <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#45b6f7]/20 shadow-inner relative">
                <div className="text-center mb-10"><h3 className="text-3xl font-bold text-[#032149]">{t.methodology.initial.detailsTitle}</h3><p className="text-slate-500 mt-2">{t.methodology.initial.detailsSubtitle}</p></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                   {t.methodology.initial.detailCards.map((c,i) => {
                      const Icon = [Users2, Target, Rocket, LayoutDashboard][i];
                      return (
                      <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-md">
                         <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-blue-500"/></div>
                         <h4 className="font-bold text-[#032149] mb-2">{c.title}</h4>
                         <p className="text-slate-500 text-xs">{c.desc}</p>
                      </div>
                   )})}
                </div>
             </div>
          </div>

          {/* EXPANDABLE: SCALE PHASE FLYWHEEL */}
          <div className={`transition-all duration-700 ease-in-out overflow-hidden ${showFlywheel ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`}>
             <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#6351d5]/20 shadow-inner relative">
                <div className="flex flex-col items-center justify-center mb-16 relative z-10">
                   <span className="bg-[#6351d5] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-8 inline-block shadow-lg shadow-[#6351d5]/30">{t.methodology.scale.flywheel.tag}</span>
                   <div className="bg-white p-2 rounded-full shadow-2xl border-4 border-white relative overflow-hidden max-w-2xl w-full">
                      <div className="absolute inset-0 bg-[#6351d5]/5 mix-blend-multiply pointer-events-none"></div>
                      <img src="https://i.imgur.com/HwLnSrQ.png" alt="Trust Flywheel System" className="w-full h-auto object-contain mix-blend-multiply"/>
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                   <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-[#45b6f7]/30 via-[#3f45fe]/30 to-[#0faec1]/30 z-0"></div>
                   <div className="bg-slate-50 p-6 rounded-2xl border-t-4 border-[#45b6f7] relative z-10 shadow-lg">
                      <div className="flex items-center gap-3 mb-4"><div className="bg-[#45b6f7]/10 p-2 rounded-lg"><Megaphone className="w-6 h-6 text-[#45b6f7]" /></div><h3 className="text-lg font-bold text-[#032149]">{t.methodology.scale.flywheel.borrowed.title}</h3></div>
                      <ul className="space-y-3">{t.methodology.scale.flywheel.borrowed.items.map((it,i)=><li key={i} className="text-slate-600 text-xs flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#45b6f7] rounded-full"></span> {it}</li>)}</ul>
                   </div>
                   <div className="bg-slate-50 p-6 rounded-2xl border-t-4 border-[#3f45fe] relative z-10 shadow-lg">
                      <div className="flex items-center gap-3 mb-4"><div className="bg-[#3f45fe]/10 p-2 rounded-lg"><RefreshCw className="w-6 h-6 text-[#3f45fe]" /></div><h3 className="text-lg font-bold text-[#032149]">{t.methodology.scale.flywheel.review.title}</h3></div>
                      <ul className="space-y-3">{t.methodology.scale.flywheel.review.items.map((it,i)=><li key={i} className="text-slate-600 text-xs flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#3f45fe] rounded-full"></span> {it}</li>)}</ul>
                   </div>
                   <div className="bg-slate-50 p-6 rounded-2xl border-t-4 border-[#0faec1] relative z-10 shadow-lg">
                      <div className="flex items-center gap-3 mb-4"><div className="bg-[#0faec1]/10 p-2 rounded-lg"><Gift className="w-6 h-6 text-[#0faec1]" /></div><h3 className="text-lg font-bold text-[#032149]">{t.methodology.scale.flywheel.promise.title}</h3></div>
                      <ul className="space-y-3">{t.methodology.scale.flywheel.promise.items.map((it,i)=><li key={i} className="text-slate-600 text-xs flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#0faec1] rounded-full"></span> {it}</li>)}</ul>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="casos" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#032149]">{t.cases.title}</h2><p className="text-slate-600">{t.cases.subtitle}</p></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.cases.list.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 relative group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-slate-100" onClick={() => setExpandedCase(expandedCase === i ? null : i)}>
                <div className="absolute -top-6 right-8 w-14 h-14 bg-white rounded-full flex items-center justify-center border-4 border-slate-100 group-hover:border-[#6351d5] transition-colors shadow-lg"><Users className="w-6 h-6 text-[#6351d5]"/></div>
                <div className="inline-block px-4 py-1.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-full mb-6 uppercase tracking-wider">{item.company}</div>
                <div className="mb-6"><div className="text-5xl font-extrabold text-[#6351d5] mb-2">{item.stat}</div><div className="text-slate-700 font-bold text-lg leading-tight">{item.label}</div></div>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedCase === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}><div className="bg-slate-50 p-4 rounded-xl mb-4"><p className="text-xs font-bold text-slate-400 uppercase mb-1">{t.cases.challengeLabel}</p><p className="text-slate-700 text-sm mb-3">{item.challenge}</p><p className="text-xs font-bold text-[#6351d5] uppercase mb-1">{t.cases.solutionLabel}</p><p className="text-slate-700 text-sm">{item.solution}</p></div></div>
                <button className="flex items-center text-[#032149] font-bold text-sm group-hover:text-[#6351d5] transition-colors mt-auto">{expandedCase === i ? t.cases.btnHide : t.cases.btnRead} <ChevronUp className="w-4 h-4 ml-1" /></button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-slate-50 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-[#032149]">{t.team.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <div className="flex flex-col items-center relative">
                    <div className="relative mb-6"><div className="absolute -top-3 -right-3 w-48 h-48 border-t-4 border-r-4 border-[#45b6f7] rounded-tr-3xl z-0"></div><div className="absolute -bottom-3 -left-3 w-48 h-48 border-b-4 border-l-4 border-[#1a3690] rounded-bl-3xl z-0"></div><img src="https://i.imgur.com/O3vyNQB.png" alt="Alfonso" className="w-48 h-48 object-cover rounded-xl shadow-2xl relative z-10 filter grayscale hover:grayscale-0 transition-all duration-500"/></div>
                    <h3 className="text-2xl font-bold text-[#032149] mb-2">Alfonso Sainz de Baranda</h3>
                    <div className="px-6 py-1.5 bg-[#45b6f7]/20 text-[#1a3690] rounded-full font-bold text-sm mb-4">Founder & CEO</div>
                    <p className="text-slate-600 leading-relaxed text-sm max-w-xs mx-auto">{t.team.bioAlfonso}</p>
                </div>
                <div className="flex flex-col items-center relative">
                    <div className="relative mb-6"><div className="absolute -top-3 -right-3 w-48 h-48 border-t-4 border-r-4 border-[#45b6f7] rounded-tr-3xl z-0"></div><div className="absolute -bottom-3 -left-3 w-48 h-48 border-b-4 border-l-4 border-[#1a3690] rounded-bl-3xl z-0"></div><img src="https://i.imgur.com/CvKj1sd.png" alt="Martin" className="w-48 h-48 object-cover rounded-xl shadow-2xl relative z-10 filter grayscale hover:grayscale-0 transition-all duration-500"/></div>
                    <h3 className="text-2xl font-bold text-[#032149] mb-2">Martin Fila</h3>
                    <div className="px-6 py-1.5 bg-[#45b6f7]/20 text-[#1a3690] rounded-full font-bold text-sm mb-4">Founder & COO</div>
                    <p className="text-slate-600 leading-relaxed text-sm max-w-xs mx-auto">{t.team.bioMartin}</p>
                </div>
            </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#032149]">{t.blog.title}</h2>
            <button onClick={() => setView('admin')} className={`flex items-center gap-2 bg-slate-100 text-[#6351d5] px-4 py-2 rounded-full font-bold text-xs hover:bg-slate-200 transition-colors ${isAdminMode ? 'block' : 'hidden'}`}><Plus className="w-4 h-4"/> {t.blog.admin}</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {displayPosts.map((post, index) => (
                    <div key={index} onClick={() => handleViewPost(post)} className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-xl mb-4 aspect-video bg-slate-100"><img src={post.image} alt={post.title} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"/><div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#6351d5] uppercase tracking-wide border border-slate-200 shadow-sm">{post.category}</div></div>
                        <h3 className="text-xl font-bold mb-2 text-[#032149] group-hover:text-[#6351d5] transition-colors line-clamp-2">{post.title}</h3>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center text-sm text-slate-500 font-medium"><Clock className="w-4 h-4 mr-2" />{post.readTime}</div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Footer */}
      <section id="contacto" className="bg-[#032149] py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.footer.title}</h2>
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <a href={`mailto:${t.footer.ctaEmail}`} className="flex items-center justify-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg shadow-[#6351d5]/30 transition-all hover:scale-105"><Mail className="w-5 h-5" /> {t.footer.ctaEmail}</a>
            <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white hover:bg-white/10 font-bold py-4 px-8 rounded-lg text-lg transition-all hover:scale-105"><Calendar className="w-5 h-5" /> {t.footer.ctaCall}</a>
          </div>
          <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm"><p>{t.footer.rights}</p></div>
        </div>
      </section>
    </div>
  );
}
