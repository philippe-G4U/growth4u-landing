import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  TrendingUp, ArrowRight, Megaphone, ShieldAlert, Users, ArrowDownRight, 
  CheckCircle2, Cpu, Check, Mail, Calendar, Menu, X, ChevronDown, ChevronUp, 
  ArrowUpRight, Clock, Target, Settings, BarChart3, Search, Zap, Layers, 
  Share2, MessageCircle, Gift, RefreshCw, Rocket, Briefcase, Smartphone, 
  Lock, LayoutDashboard, Users2, Plus, ArrowLeft, Save, Building2,
  TrendingDown, Bot, Landmark, Globe, Trash2, Edit2, Link as LinkIcon, CheckCircle, Cookie
} from 'lucide-react';

// --- FIREBASE IMPORTS ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// --- CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyBGtatMbThV_pupfPk6ytO5omidlJrQLcw",
  authDomain: "landing-growth4u.firebaseapp.com",
  projectId: "landing-growth4u",
  storageBucket: "landing-growth4u.firebasestorage.app",
  messagingSenderId: "562728954202",
  appId: "1:562728954202:web:90cff4aa486f38b4b62b63",
  measurementId: "G-4YBYPVQDT6"
};

// --- INICIALIZACIÓN ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let analytics;
try { 
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app); 
  }
} catch (e) { 
  console.log("Analytics offline or environment not supported"); 
}

const appId = 'growth4u-public-app';

// --- UTILIDADES ---

const createSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

const renderFormattedContent = (content) => {
  if (!content) return null;
  if (Array.isArray(content)) {
    return content.map((line, i) => {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
            <div key={i} className="flex items-start gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#0faec1] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-700">
                    {parts.map((part, j) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={j} className="text-[#032149] font-bold">{part.slice(2, -2)}</strong>;
                        }
                        return part;
                    })}
                </p>
            </div>
        );
    });
  }
  return content.split('\n').map((line, index) => {
    if (line.trim().startsWith('##')) {
      return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-[#032149]">{line.replace('##', '').trim()}</h2>;
    }
    if (line.trim() === '') return <div key={index} className="h-4"></div>;
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <span key={index}>
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="text-[#032149] font-bold">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </span>
    );
  });
};

// --- TRADUCCIONES ---
const translations = {
  es: {
    nav: { problem: "Problema", results: "Resultados", methodology: "Servicios", cases: "Casos", team: "Equipo", blog: "Blog", cta: "Agendar Llamada" },
    hero: { tag: "Especialistas en Growth Fintech B2B & B2C", title: "Tu fintech puede crecer más rápido, ", titleHighlight: "sin invertir más en marketing.", subtitle: "Te ayudamos a crear un motor de crecimiento que perdura en el tiempo y reduce tu CAC apoyándonos en el valor de la confianza.", ctaPrimary: "Empezar ahora", ctaSecondary: "Ver servicios", trust: "Empresas validadas por la confianza" },
    problem: { title: "El modelo tradicional está roto", subtitle: "En un mercado saturado, depender 100% de Paid Media es insostenible.", cards: [ { title: "Alquiler de Atención", desc: "Si cortas el presupuesto de anuncios, las ventas mueren instantáneamente." }, { title: "CAC Incontrolable", desc: "El coste por clic no para de subir. Sin activos propios, tu rentabilidad se erosiona." }, { title: "Fricción de Confianza", desc: "El usuario Fintech es escéptico. Atraes tráfico, pero no conviertes por falta de autoridad." }, { title: "Churn Silencioso", desc: "Captas registros, no clientes. El LTV nunca llega a cubrir el coste de adquisición." } ] },
    results: { title: "Resultados del Trust Engine", subtitle: "Crecimiento predecible y escalable.", cards: [ { title: "Reducción del 70% en CAC", desc: "Sustituimos el gasto publicitario inflado por sistemas de confianza orgánica y viralidad estructurada." }, { title: "Usuarios Activados", desc: "Dejamos atrás las vanity metrics. Atraemos clientes ideales (ICP) listos para usar y pagar." }, { title: "Máquina 24/7", desc: "Implementamos automatización e IA para que la captación funcione sin depender de trabajo manual." }, { title: "Activos que perduran", desc: "Construimos un motor de crecimiento que gana tracción con el tiempo, aumentando el LTV." } ] },
    methodology: { title: "El motor de crecimiento adecuado.", subtitle: "Infraestructura escalable según la etapa de tu negocio.", stages: [ { step: "Etapa 1", title: "BUSCANDO PMF", tag: "0 → Tracción Real", desc: "Realizamos **iteración rápida**: testeo de canales, mensajes y análisis de competidores para encontrar tu posicionamiento. Una propuesta de valor que guía el desarrollo del producto.", icon: Search, guaranteeTitle: "OBJETIVO & GARANTÍA", guarantees: [ "Validación de **Propuesta de Valor** y posicionamiento único.", "Generación de los primeros **usuarios que pagan**." ] }, { step: "Etapa 2", title: "ESCALANDO", tag: "10K → 500K Users", desc: "Implementamos el **Trust Engine**: generamos confianza posicionando la marca en **medios de autoridad e influencers**. Un motor de crecimiento que prioriza clientes reales.", icon: TrendingUp, guaranteeTitle: "OBJETIVO & GARANTÍA", guarantees: [ "Tracción orgánica y reconocimiento de marca vía **Referral**.", "Conversión de **Clientes que pagan** y alto LTV." ] }, { step: "Stage 3", title: "EXPANSION", tag: "Nuevo Mercado / Producto", desc: "Plan de **Go-to-Market** para lanzar nuevos productos o iniciar operaciones en **España**. Identificamos nichos competitivos para asegurar tracción estratégica.", icon: Globe, guaranteeTitle: "OBJETIVO & GARANTÍA", guarantees: [ "Tracción inicial asegurada en **nichos de alta conversión**.", "Penetración rápida con **estrategia localizada**." ] } ] },
    cases: { title: "Casos de Éxito", subtitle: "Resultados reales auditados.", list: [ { company: "BNEXT", stat: "500K", label: "Usuarios activos", highlight: "conseguidos en 30 meses", summary: "De 0 a 500.000 usuarios en 30 meses, sin gastar millones en publicidad.", challenge: "Escalar la base de usuarios en un mercado competitivo sin depender exclusivamente de paid media masivo.", solution: "Construimos un sistema de crecimiento basado en confianza y viralidad." }, { company: "BIT2ME", stat: "-70%", label: "Reducción de CAC", highlight: "implementando Trust Engine", summary: "Redujimos el CAC un 70% implementando el Trust Engine.", challenge: "Acquisition cost skyrocketed due to ad saturation and mistrust in the crypto sector.", solution: "Optimizamos datos, segmentación y activación para duplicar el valor de cada cliente." }, { company: "GOCARDLESS", stat: "10K €", label: "MRR alcanzado", highlight: "en 6 meses desde lanzamiento", summary: "Lanzamiento desde cero en España y Portugal alcanzando 10k MRR rápidamente.", challenge: "Entrada en nuevos mercados sin presencia de marca previa.", solution: "Estrategia enfocada en contenido, alianzas y ventas inteligentes." } ], btnRead: "Leer caso completo", btnHide: "Ver menos", challengeLabel: "Reto", solutionLabel: "Solución" },
    team: { title: "Trust es lo importante, conócenos", bioAlfonso: "Especialista en growth con más de diez años lanzando y escalando productos en fintech.", bioMartin: "Especialista en growth técnico con más de diez años creando sistemas de automatización y datos que escalan operaciones." },
    blog: { title: "Blog & Insights", subtitle: "Strategic resources to scale your fintech.", cta: "Ver todos los artículos", readTime: "min lectura", admin: "Admin", empty: "Próximamente nuevos artículos...", defaults: [] },
    footer: { title: "Escala tu Fintech hoy.", ctaEmail: "accounts@growth4u.io", ctaCall: "Agendar Llamada", rights: "© 2025 Growth4U. Todos los derechos reservados.", privacy: "Política de Privacidad", terms: "Política de Cookies" }
  },
  en: {
    nav: { problem: "Problem", results: "Results", methodology: "Services", cases: "Cases", team: "Team", blog: "Blog", cta: "Book a Call" },
    hero: { tag: "Specialists in B2B & B2C Fintech Growth", title: "Your fintech can grow faster, ", titleHighlight: "without spending more on marketing.", subtitle: "We help you create a growth engine that lasts over time and reduces your CAC by leveraging the value of trust.", ctaPrimary: "Start now", ctaSecondary: "View services", trust: "Companies validated by trust" },
    problem: { title: "The traditional model is broken", subtitle: "In a saturated market, relying 100% on Paid Media is unsustainable.", cards: [ { title: "Renting Attention", desc: "If you cut the ad budget, sales die instantly." }, { title: "Uncontrollable CAC", desc: "Cost per click keeps rising. Without owned assets, your profitability erodes." }, { title: "Trust Friction", desc: "The Fintech user is skeptical. You attract traffic, but don't convert due to lack of authority." }, { title: "Silent Churn", desc: "You capture registrations, not clients. LTV never covers the acquisition cost." } ] },
    results: { title: "Trust Engine Results", subtitle: "Predictable and scalable growth.", cards: [ { title: "70% Reduction in CAC", desc: "We replace inflated ad spend with organic trust systems and structured virality." }, { title: "Activated Users", desc: "We leave vanity metrics behind. We attract ideal customers (ICP) ready to use and pay." }, { title: "24/7 Machine", desc: "We implement automation and AI so that acquisition works without depending on manual labor." }, { title: "Assets that last", desc: "We build a growth engine that gains traction over time, increasing LTV." } ] },
    methodology: { title: "The right growth engine.", subtitle: "Scalable infrastructure according to your business stage.", stages: [ { step: "Stage 1", title: "SEEKING PMF", tag: "0 → Real Traction", desc: "We perform **rapid iteration**: channel testing, messaging, and competitor analysis to find your positioning. A value proposition that guides product development.", icon: Search, guaranteeTitle: "OBJECTIVE & GUARANTEE", guarantees: [ "Validation of **Value Proposition** and unique positioning.", "Generation of the first **paying users**." ] }, { step: "Stage 2", title: "SCALING", tag: "10K → 500K Users", desc: "We implement the **Trust Engine**: building trust by positioning the brand in **authoritative media and influencers**. A growth engine that prioritizes real customers.", icon: TrendingUp, guaranteeTitle: "OBJECTIVE & GUARANTEE", guarantees: [ "Organic traction and brand recognition via **Referral**.", "Conversion of **Paying Clients** and high LTV." ] }, { step: "Stage 3", title: "EXPANSION", tag: "New Market / Product", desc: "**Go-to-Market** plan to launch new products or start operations in **Spain**. We identify competitive niches to ensure strategic traction.", icon: Globe, guaranteeTitle: "OBJECTIVE & GUARANTEE", guarantees: [ "Initial traction secured in **high-conversion niches**.", "Rapid penetration with **localized strategy**." ] } ] },
    cases: { title: "Success Stories", subtitle: "Real audited results.", list: [ { company: "BNEXT", stat: "500K", label: "Active users", highlight: "achieved in 30 months", summary: "From 0 to 500,000 users in 30 months, without spending millions on advertising.", challenge: "Scaling the user base in a competitive market without relying exclusively on massive paid media.", solution: "We built a growth system based on trust and virality." }, { company: "BIT2ME", stat: "-70%", label: "CAC Reduction", highlight: "implementing Trust Engine", summary: "We reduced CAC by 70% implementing the Trust Engine.", challenge: "Acquisition cost skyrocketed due to ad saturation and mistrust in the crypto sector.", solution: "We optimized data, segmentation and activation to double the value of each client." }, { company: "GOCARDLESS", stat: "10K €", label: "MRR reached", highlight: "in 6 months from launch", summary: "Launch from scratch in Spain and Portugal reaching 10k MRR quickly.", challenge: "Entry into new markets without previous brand presence.", solution: "Strategy focused on content, alliances and intelligent sales." } ], btnRead: "Read full case", btnHide: "Show less", challengeLabel: "Challenge", solutionLabel: "Solution" },
    team: { title: "Trust is what matters, get to know us", bioAlfonso: "Growth specialist with more than ten years launching and scaling fintech products.", bioMartin: "Technical growth specialist with more than ten years creating automation and data systems that scale operations." },
    blog: { title: "Blog & Insights", subtitle: "Strategic resources to scale your fintech.", cta: "View all articles", readTime: "min read", admin: "Admin", empty: "Coming soon...", defaults: [] },
    footer: { title: "Scale your Fintech today.", ctaEmail: "accounts@growth4u.io", ctaCall: "Book a Call", rights: "© 2025 Growth4U. All rights reserved.", privacy: "Privacy Policy", terms: "Cookie Policy" }
  }
};

export default function App() {
  const [view, setView] = useState('home');
  const [lang, setLang] = useState('es'); 
  const t = translations[lang]; 
    
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCase, setExpandedCase] = useState(null);
  
  // Estado para el banner de cookies
  const [cookieConsent, setCookieConsent] = useState('unknown'); // 'unknown', 'accepted', 'rejected'
    
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [user, setUser] = useState(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Estado para edición
  const [editingPostId, setEditingPostId] = useState(null);
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

  // --- COOKIE LOGIC ---
  useEffect(() => {
    const savedConsent = localStorage.getItem('growth4u_consent');
    if (savedConsent) {
        setCookieConsent(savedConsent);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('growth4u_consent', 'accepted');
    setCookieConsent('accepted');
  };

  const handleRejectCookies = () => {
    localStorage.setItem('growth4u_consent', 'rejected');
    setCookieConsent('rejected');
  };

  // --- HOOK: REDIRECCIÓN FORZADA (SEO FIX) & ROUTING LEGAL ---
  useEffect(() => {
    // Check for blog post
    if (window.location.pathname === '/' && window.location.search.includes('articulo=')) {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get('articulo');
      if (slug) {
        window.history.replaceState(null, '', `/blog?articulo=${slug}`);
        setView('post');
      }
    }
    
    // Check for Legal Pages via URL query (e.g., ?page=privacidad)
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    if (pageParam === 'privacidad') setView('privacy');
    if (pageParam === 'cookies') setView('cookies');

  }, []);

  // --- HOOKS EXISTENTES ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') setIsAdminMode(true);
      
    // Check for blog path on initial load
    if (window.location.pathname === '/blog') {
      setView('blog');
    }
  }, []);

  useEffect(() => {
    if (!auth) return;
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
           await signInWithCustomToken(auth, __initial_auth_token);
        } else {
           await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Error auth:", error);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user || !db) return;
    try {
      const q = query(
        collection(db, 'artifacts', appId, 'public', 'data', 'blog_posts'),
        orderBy('createdAt', 'desc')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const loadedPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(loadedPosts);
        
        const params = new URLSearchParams(window.location.search);
        const urlSlug = params.get('articulo');
        
        if (urlSlug && loadedPosts.length > 0) {
           const foundPost = loadedPosts.find(p => createSlug(p.title) === urlSlug);
           if (foundPost) {
             setSelectedPost(foundPost);
             setView('post');
           }
        } else if (window.location.pathname === '/blog') {
            setView('blog');
        }
      }, (error) => {
        if(error.code !== 'permission-denied') console.log("Error al cargar posts:", error);
      });
      return () => unsubscribe();
    } catch (e) {
      console.log("Error en conexión a DB", e);
    }
  }, [user]);

  // --- FUNCIONES CRUD ---
    
  const handleSavePost = async (e) => {
    e.preventDefault();
    if (!db || !user) { alert("Error: Conexión no disponible"); return; }
    setIsSubmitting(true);
    try {
      const collectionRef = collection(db, 'artifacts', appId, 'public', 'data', 'blog_posts');
      if (editingPostId) {
        const docRef = doc(collectionRef, editingPostId);
        await updateDoc(docRef, { ...newPost, updatedAt: serverTimestamp() });
        alert("¡Artículo actualizado!");
        setEditingPostId(null);
      } else {
        await addDoc(collectionRef, { ...newPost, createdAt: serverTimestamp(), author: "Equipo Growth4U" });
        alert("¡Artículo publicado!");
      }
      setNewPost({ title: '', category: 'Estrategia', excerpt: '', content: '', image: '', readTime: '5 min lectura' });
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (post) => {
    setNewPost({ title: post.title, category: post.category, excerpt: post.excerpt, content: post.content, image: post.image, readTime: post.readTime });
    setEditingPostId(post.id);
    window.scrollTo(0,0);
  };

  const handleDeleteClick = async (id) => {
    if(!window.confirm("¿Seguro que quieres borrar este artículo? No se puede deshacer.")) return;
    try {
      await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'blog_posts', id));
      alert("Artículo eliminado.");
      if (editingPostId === id) {
         setEditingPostId(null);
         setNewPost({ title: '', category: 'Estrategia', excerpt: '', content: '', image: '', readTime: '5 min lectura' });
      }
    } catch (error) {
      alert("Error eliminando: " + error.message);
    }
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setNewPost({ title: '', category: 'Estrategia', excerpt: '', content: '', image: '', readTime: '5 min lectura' });
  };

  // --- NAVIGATION HANDLERS ---
  const handleViewPost = (post) => {
    const slug = createSlug(post.title);
    const finalUrl = `${window.location.origin}${window.location.pathname === '/blog' ? '/blog' : ''}?articulo=${slug}`;
    window.history.pushState({ path: finalUrl }, '', `?articulo=${slug}`);
    setSelectedPost(post);
    setView('post');
    window.scrollTo(0, 0);
  };

  const handleGoToBlogPage = () => {
    window.history.pushState({}, '', '/blog');
    setView('blog');
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  const handleGoHome = () => {
    window.history.pushState({}, '', '/');
    setView('home');
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  const handleGoPrivacy = () => {
      window.history.pushState({}, '', '?page=privacidad');
      setView('privacy');
      window.scrollTo(0, 0);
  };

  const handleGoCookies = () => {
      window.history.pushState({}, '', '?page=cookies');
      setView('cookies');
      window.scrollTo(0, 0);
  };

  const handleClosePost = () => {
    const isBlogPath = window.location.pathname === '/blog';
    if(isBlogPath) {
        setView('blog');
        window.history.pushState({}, '', '/blog');
    } else {
        setView('home');
        window.history.pushState({}, '', '/');
    }
  };
    
  const copyLinkToClipboard = () => {
      if (!selectedPost) return;
      const slug = createSlug(selectedPost.title);
      const url = `${window.location.origin}?articulo=${slug}`;
      try {
        const dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = url;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } catch (e) {
         console.error("Clipboard fail", e);
      }
  };

  const toggleLang = () => setLang(prev => prev === 'es' ? 'en' : 'es');
   
  const displayPosts = posts.length > 0 ? posts : t.blog.defaults;
  const homePosts = displayPosts.slice(0, 6);

  // --- COMPONENTE LEGAL VIEW (LITERAL Y COMPLETO) ---
  const LegalView = ({ type }) => {
      const isPrivacy = type === 'privacy';
      const title = isPrivacy ? "Política de Privacidad" : "Política de Cookies";
      
      return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#45b6f7] selection:text-white">
            <Helmet>
                <title>{title} | Growth4U</title>
                <meta name="description" content={`Consulta nuestra ${title} para conocer cómo gestionamos tus datos en Growth4U.`} />
                <link rel="canonical" href={`https://growth4u.io/?page=${isPrivacy ? 'privacidad' : 'cookies'}`} />
                <link rel="icon" type="image/png" href="https://i.imgur.com/h5sWS3W.png?v=2" />
            </Helmet>

            <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
                   <div className="flex items-center gap-0 cursor-pointer" onClick={handleGoHome}>
                      <img src="https://i.imgur.com/imHxGWI.png" alt="Growth4U" className="h-6 w-auto" />
                   </div>
                   <button onClick={handleGoHome} className="text-sm font-bold text-[#6351d5] flex items-center gap-2 hover:underline">
                       <ArrowLeft className="w-4 h-4" /> Volver a Home
                   </button>
                </div>
            </nav>

            <div className="pt-32 pb-20 max-w-4xl mx-auto px-6">
                <div className="bg-white p-8 md:p-16 rounded-3xl shadow-xl border border-slate-100">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-10 text-[#032149] border-b pb-6">{title}</h1>
                    
                    {/* Contenedor de tipografía mejorado */}
                    <div className="text-slate-600 leading-relaxed text-lg space-y-6">
                        
                        {isPrivacy ? (
                            <>
                                {/* --- RESUMEN EJECUTIVO --- */}
                                <div className="bg-[#effcfd] p-8 rounded-2xl mb-10 border border-[#0faec1]/20 shadow-sm">
                                    <h3 className="text-[#0faec1] font-bold text-lg mb-4 uppercase tracking-wide flex items-center gap-2">
                                        <ShieldAlert className="w-5 h-5"/> Resumen Ejecutivo
                                    </h3>
                                    <ul className="space-y-3 text-sm md:text-base">
                                        <li className="flex gap-2"><span className="font-bold text-[#032149] min-w-[100px]">Responsable:</span> <span>Growth Systems Now, S.L. ("Growth4U")</span></li>
                                        <li className="flex gap-2"><span className="font-bold text-[#032149] min-w-[100px]">Finalidad:</span> <span>Gestión de consultas, prestación de servicios, comunicaciones comerciales B2B y análisis de mercado.</span></li>
                                        <li className="flex gap-2"><span className="font-bold text-[#032149] min-w-[100px]">Legitimación:</span> <span>Ejecución de contrato, interés legítimo (marketing B2B) y consentimiento del interesado.</span></li>
                                        <li className="flex gap-2"><span className="font-bold text-[#032149] min-w-[100px]">Destinatarios:</span> <span>Proveedores de servicios (encargados del tratamiento) y obligaciones legales. No se ceden datos a terceros para fines comerciales ajenos.</span></li>
                                        <li className="flex gap-2"><span className="font-bold text-[#032149] min-w-[100px]">Derechos:</span> <span>Acceso, rectificación, supresión, oposición, portabilidad y limitación del tratamiento.</span></li>
                                        <li className="flex gap-2"><span className="font-bold text-[#032149] min-w-[100px]">Info. Adicional:</span> <span>Puedes consultar la información detallada en los apartados siguientes.</span></li>
                                    </ul>
                                </div>

                                {/* 1.1 NORMATIVA */}
                                <div>
                                    <h3 className="text-2xl font-bold text-[#032149] mt-10 mb-4">1.1. Normativa aplicable</h3>
                                    <p className="mb-4">Esta política se adapta a las siguientes normas:</p>
                                    <ul className="list-disc pl-6 space-y-2 marker:text-[#6351d5]">
                                        <li>Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD).</li>
                                        <li>Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).</li>
                                        <li>Demás normativa española que resulte aplicable en materia de protección de datos y servicios de la sociedad de la información.</li>
                                    </ul>
                                </div>

                                {/* 1.2 RESPONSABLE */}
                                <div>
                                    <h3 className="text-2xl font-bold text-[#032149] mt-10 mb-4">1.2. Responsable del tratamiento</h3>
                                    <p className="mb-4">El responsable del tratamiento de los datos personales es:</p>
                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                        <ul className="space-y-3">
                                            <li className="flex flex-col md:flex-row md:gap-2"><strong className="text-[#032149] w-40">Responsable:</strong> <span>Growth Systems Now, S.L. ("Growth4U")</span></li>
                                            <li className="flex flex-col md:flex-row md:gap-2"><strong className="text-[#032149] w-40">NIF/CIF:</strong> <span>ESB22671879</span></li>
                                            <li className="flex flex-col md:flex-row md:gap-2"><strong className="text-[#032149] w-40">Domicilio postal:</strong> <span>Calle de Luchana, 28, 2º A, 28010, Madrid, España</span></li>
                                            <li className="flex flex-col md:flex-row md:gap-2"><strong className="text-[#032149] w-40">Contacto privacidad:</strong> <a href="mailto:privacidad@growth4u.io" className="text-[#6351d5] font-bold hover:underline">privacidad@growth4u.io</a></li>
                                        </ul>
                                    </div>
                                    <p className="mt-4 text-sm text-slate-500 italic">Dada la naturaleza de nuestra actividad, Growth4U no está obligada al nombramiento de un Delegado de Protección de Datos. No obstante, para cualquier consulta puede dirigirse al correo electrónico indicado arriba.</p>
                                </div>

                                {/* 1.3 DATOS QUE TRATAMOS */}
                                <div>
                                    <h3 className="text-2xl font-bold text-[#032149] mt-10 mb-4">1.3. Datos que tratamos</h3>
                                    <p className="mb-4">Podemos tratar las siguientes categorías de datos personales, según el formulario o canal que utilices:</p>
                                    <ul className="list-disc pl-6 space-y-3 marker:text-[#6351d5]">
                                        <li><strong className="text-[#032149]">Datos identificativos:</strong> nombre, apellidos.</li>
                                        <li><strong className="text-[#032149]">Datos de contacto:</strong> correo electrónico, teléfono.</li>
                                        <li><strong className="text-[#032149]">Datos profesionales:</strong> empresa, cargo, sector.</li>
                                        <li><strong className="text-[#032149]">Datos de uso y navegación:</strong> interacción con nuestros emails, página web o materiales descargados, respuestas a formularios, apertura y clics en newsletters o campañas.</li>
                                    </ul>
                                    <p className="mt-4 bg-yellow-50 p-4 rounded-lg text-sm border-l-4 border-yellow-400">
                                        No solicitamos ni tratamos de forma intencionada categorías especiales de datos (salud, ideología, religión, etc.). Si excepcionalmente fuera necesario, se te informaría de forma específica y se recabaría el consentimiento expreso correspondiente.
                                    </p>
                                </div>

                                {/* 1.4 ORIGEN */}
                                <div>
                                    <h3 className="text-2xl font-bold text-[#032149] mt-10 mb-4">1.4. Origen de los datos</h3>
                                    <p className="mb-4">Los datos personales que tratamos pueden proceder de:</p>
                                    <ul className="list-disc pl-6 space-y-3 marker:text-[#6351d5]">
                                        <li>Formularios de contacto, descarga de recursos o solicitud de reunión en nuestros propios sitios web.</li>
                                        <li><strong className="text-[#032149]">Formularios de Meta (Lead Ads):</strong> Recibimos datos personales (nombre, correo, etc.) que nos facilitas voluntariamente a través de formularios en Facebook o Instagram. Estos datos se integran en nuestro CRM para su gestión comercial.</li>
                                        <li>Comunicaciones directas que mantienes con nosotros (email, teléfono, reuniones).</li>
                                        <li>Plataformas y redes profesionales (por ejemplo, LinkedIn) cuando te has puesto en contacto con nosotros, has mostrado interés en nuestros contenidos, o cuando tu perfil es público y se considera razonable para fines de marketing B2B, siempre respetando tus derechos y expectativas de privacidad.</li>
                                        <li>Bases o listados B2B obtenidos de forma lícita a través de terceros que garantizan el cumplimiento del RGPD, respecto de los cuales te informaremos en la primera comunicación que te hagamos llegar.</li>
                                        <li>Fuentes de acceso público: Recabamos información profesional de fuentes abiertas como registros mercantiles, perfiles públicos de redes sociales profesionales (LinkedIn) y sitios web corporativos, siempre bajo el amparo del interés legítimo B2B y para fines estrictamente profesionales</li>
                                    </ul>
                                    <p className="mt-4">En cualquiera de los casos, te informaremos de esta política y de tus derechos en el primer momento razonable.</p>
                                </div>

                                {/* 1.5 FINALIDADES */}
                                <div>
                                    <h3 className="text-2xl font-bold text-[#032149] mt-10 mb-4">1.5. Finalidades del tratamiento</h3>
                                    <p className="mb-4">Usamos tus datos para:</p>
                                    <ul className="list-disc pl-6 space-y-3 marker:text-[#6351d5]">
                                        <li><strong className="text-[#032149]">Gestión de consultas y reuniones:</strong> atender solicitudes de información, demos o reuniones que nos plantees.</li>
                                        <li><strong className="text-[#032149]">Prestación de servicios:</strong> gestionar la relación contractual, la facturación y el soporte cuando seas cliente.</li>
                                        <li><strong className="text-[#032149]">Comunicaciones comerciales B2B:</strong> enviarte comunicaciones relacionadas con nuestros servicios de growth, estrategia GTM, contenidos formativos y recursos que puedan ser de tu interés profesional.</li>
                                        <li><strong className="text-[#032149]">Publicidad y Retargeting:</strong> Utilizamos el Píxel de Meta para medir la eficacia de nuestras campañas publicitarias y mostrar anuncios relevantes a personas que han interactuado con nuestros formularios o página web</li>
                                        <li><strong className="text-[#032149]">Mejora de servicios y analítica interna:</strong> realizar análisis agregados y estadísticos sobre el uso de nuestra web, materiales descargados y campañas, con el fin de mejorar nuestros contenidos y propuestas de valor.</li>
                                        <li><strong className="text-[#032149]">Cumplimiento de obligaciones legales:</strong> atender obligaciones contables, fiscales y de prevención de blanqueo de capitales u otras que correspondan.</li>
                                        <li><strong className="text-[#032149]">Elaboración de informes de mercado:</strong> Los análisis de mercado que realizamos para nuestros servicios se basan en datos agregados o de fuentes públicas profesionales. En ningún caso utilizamos datos personales de los clientes de nuestros clientes para estos fines, salvo que exista un encargo específico y un contrato de tratamiento de datos previo</li>
                                    </ul>
                                </div>

                                {/* 1.6 BASES JURÍDICAS */}
                                <div>
                                    <h3 className="text-2xl font-bold text-[#032149] mt-10 mb-4">1.6. Bases jurídicas del tratamiento</h3>
                                    <p className="mb-4">Tratamos tus datos sobre las siguientes bases jurídicas:</p>
                                    <ul className="space-y-4">
                                        <li className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                            <strong className="block text-[#6351d5] mb-2">Ejecución de un contrato o aplicación de medidas precontractuales (art. 6.1.b RGPD):</strong>
                                            <span className="text-sm">Cuando tramitamos tu solicitud de información, preparamos una propuesta o gestionamos la relación como cliente.</span>
                                        </li>
                                        <li className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                            <strong className="block text-[#6351d5] mb-2">Cumplimiento de obligaciones legales (art. 6.1.c RGPD):</strong>
                                            <span className="text-sm">Cuando tratamos datos para cumplir obligaciones contables, fiscales u otras impuestas por la normativa aplicable.</span>
                                        </li>
                                        <li className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                            <strong className="block text-[#6351d5] mb-2">Interés legítimo (art. 6.1.f RGPD):</strong>
                                            <div className="text-sm mt-2">
                                                Para realizar acciones de marketing B2B razonables dirigidas a contactos profesionales de empresas que puedan estar interesadas en nuestros servicios, siempre que:
                                                <ul className="list-disc pl-5 mt-1 mb-2">
                                                    <li>Se haya valorado el equilibrio entre nuestro interés y tus derechos y libertades.</li>
                                                    <li>Se trate de comunicaciones relacionadas con tu rol profesional.</li>
                                                </ul>
                                                Para mejorar nuestros servicios, procesos internos y seguridad de la información.<br/><br/>
                                                <strong>En todo caso, podrás oponerte en cualquier momento a este tratamiento:</strong>
                                                <ul className="list-disc pl-5 mt-1">
                                                    <li>Mediante el enlace de baja incluido en cada comunicación comercial por email.</li>
                                                    <li>O enviando un email a <a href="mailto:privacidad@growth4u.io" className="text-[#6351d5]">privacidad@growth4u.io</a>, indicando que no deseas recibir más comunicaciones.</li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                            <strong className="block text-[#6351d5] mb-2">Consentimiento (art. 6.1.a RGPD):</strong>
                                            <div className="text-sm">
                                                Para el uso de ciertas cookies no técnicas y tecnologías similares, conforme se detalla en nuestra Política de Cookies.
                                                En aquellos supuestos en los que te lo pidamos de forma expresa para finalidades concretas.<br/>
                                                Cuando la base jurídica sea el consentimiento, podrás retirarlo en cualquier momento sin que ello afecte a la licitud del tratamiento basado en el consentimiento previo.
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                {/* 1.7 SEGURIDAD */}
                                <div>
                                    <h3 className="text-2xl font-bold text-[#032149] mt-10 mb-4">1.7. Medidas de seguridad y confidencialidad</h3>
                                    <p className="mb-4">Growth4U aplica medidas técnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado al riesgo, de acuerdo con el art. 32 RGPD, incluyendo, entre otras:</p>
                                    <ul className="list-disc pl-6 space-y-2 marker:text-[#6351d5]">
                                        <li>Control de accesos y gestión de permisos según rol.</li>
                                        <li>Uso de proveedores con cifrado en tránsito y, cuando es posible, en reposo.</li>
                                        <li>Políticas internas de contraseña y autenticación reforzada.</li>
                                        <li>Copias de seguridad periódicas y procedimientos de restauración.</li>
                                        <li>Procedimientos para la gestión de incidentes de seguridad y brechas de datos.</li>
                                    </ul>
                                    <p className="mt-4">Todo el personal de Growth4U y los terceros que prestan servicios con acceso a datos personales están sujetos a obligaciones de confidencialidad (contractuales y/o legales).</p>
                                </div>

                                {/* 1.8 DESTINATARIOS */}
                                <div>
                                    <h3 className="text-2xl font-bold text-[#032149] mt-10 mb-4">1.8. Destinatarios y encargados del tratamiento</h3>
                                    <p className="mb-4">Podemos compartir tus datos con terceros únicamente cuando sea necesario para la correcta prestación de nuestros servicios o por obligación legal.</p>
                                    <p className="mb-4">En particular, podemos contar con proveedores que actúan como encargados del tratamiento, tales como:</p>
                                    <ul className="list-disc pl-6 space-y-2 marker:text-[#6351d5] mb-6">
                                        <li>Servicios de envío de email y automatización de marketing.</li>
                                        <li>Herramientas de CRM y gestión de la relación con clientes.</li>
                                        <li>Plataformas de analítica web y medición de rendimiento.</li>
                                        <li>Proveedores de alojamiento, cloud y mantenimiento IT.</li>
                                        <li>Otros proveedores de soporte administrativo, contable o jurídico.</li>
                                    </ul>
                                    <p className="mb-4 font-bold">Plataformas:</p>
                                    <ul className="list-disc pl-6 space-y-2 marker:text-[#6351d5] mb-6">
                                        <li><strong>GoHighLevel:</strong> Gestión de CRM, funnels y base de datos.</li>
                                        <li><strong>Instantly & MailScale:</strong> Automatización y envío de correos electrónicos.</li>
                                        <li><strong>Ulinc:</strong> Gestión de outreach en LinkedIn.</li>
                                        <li><strong>Meta Platforms, Inc.:</strong> Proveedor de servicios de publicidad y análisis.</li>
                                    </ul>
                                    <p>Con todos ellos se han firmado contratos de encargo de tratamiento conforme al art. 28 RGPD, que les obligan a tratar los datos únicamente siguiendo nuestras instrucciones, aplicar medidas de seguridad adecuadas y no utilizarlos para fines propios.</p>
                                    <p className="mt-2">No cedemos tus datos a terceros para sus propias finalidades comerciales, salvo que contemos con tu consentimiento expreso o exista otra base jurídica válida.</p>
                                </div>

                                {/* 1.9 TRANSFERENCIAS */}
                                <div>
                                    <h3 className="text-2xl font-bold text-[#032149] mt-10 mb-4">1.9. Transferencias internacionales</h3>
                                    <p className="mb-4">Algunos de nuestros proveedores pueden estar ubicados fuera del Espacio Económico Europeo (EEE) o prestar sus servicios desde países que no ofrecen un nivel de protección de datos equivalente al europeo.</p>
                                    <p className="mb-4">En esos casos:</p>
                                    <ul className="list-disc pl-6 space-y-2 marker:text-[#6351d5] mb-4">
                                        <li>Utilizaremos Cláusulas Contractuales Tipo aprobadas por la Comisión Europea u otros mecanismos reconocidos por el RGPD.</li>
                                        <li>Evaluaremos, cuando proceda, el nivel de protección del país de destino y, en su caso, aplicaremos medidas adicionales para salvaguardar la confidencialidad y la seguridad de tus datos.</li>
                                    </ul>
                                    <p>Puedes solicitar información adicional sobre las transferencias internacionales y las garantías aplicadas escribiendo a <a href="mailto:privacidad@growth4u.io" className="text-[#6351d5]">privacidad@growth4u.io</a></p>
                                </div>

                                {/* 1.10 PLAZOS */}
                                <div>
                                    <h3 className="text-2xl font-bold text-[#032149] mt-10 mb-4">1.10. Plazos de conservación</h3>
                                    <p className="mb-4">Conservaremos tus datos:</p>
                                    <ul className="list-disc pl-6 space-y-2 marker:text-[#6351d5] mb-4">
                                        <li>Mientras exista una relación comercial o contractual activa contigo o con tu empresa.</li>
                                        <li>Mientras sean necesarios para la finalidad para la que fueron recogidos.</li>
                                        <li>Posteriormente, durante los plazos necesarios para cumplir obligaciones legales o para la prescripción de responsabilidades (por ejemplo, en materia civil, fiscal o mercantil).</li>
                                    </ul>
                                    <p>Una vez transcurridos dichos plazos, los datos se bloquearán o eliminarán de forma segura.</p>
                                </div>

                                {/* 1.11 DERECHOS */}
                                <div>
                                    <h3 className="text-2xl font-bold text-[#032149] mt-10 mb-4">1.11. Derechos de los interesados</h3>
                                    <p className="mb-4">Puedes ejercer en cualquier momento los siguientes derechos:</p>
                                    <ul className="list-disc pl-6 space-y-2 marker:text-[#6351d5] mb-6">
                                        <li><strong>Acceso:</strong> saber qué datos tuyos tratamos.</li>
                                        <li><strong>Rectificación:</strong> solicitar la corrección de datos inexactos o incompletos.</li>
                                        <li><strong>Supresión:</strong> pedir la eliminación de tus datos cuando, entre otros motivos, ya no sean necesarios para los fines para los que fueron recogidos.</li>
                                        <li><strong>Limitación del tratamiento:</strong> solicitar que limitemos el tratamiento de tus datos en determinadas circunstancias.</li>
                                        <li><strong>Portabilidad:</strong> recibir tus datos en un formato estructurado, de uso común y lectura mecánica, y transmitirlos a otro responsable cuando el tratamiento se base en el consentimiento o en un contrato y se efectúe por medios automatizados.</li>
                                        <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos basado en el interés legítimo, incluida la oposición a recibir comunicaciones comerciales.</li>
                                        <li>No ser objeto de decisiones individuales automatizadas, incluida la elaboración de perfiles, cuando proceda.</li>
                                    </ul>
                                    <p className="mb-4">Para ejercer tus derechos, puedes enviar una solicitud a:</p>
                                    <blockquote className="not-italic border-l-4 border-[#6351d5] pl-6 py-4 bg-slate-50 rounded-r-xl mb-6">
                                        <p className="mb-1"><strong className="text-[#032149]">Email:</strong> <a href="mailto:privacy@growth4u.com" className="text-[#6351d5] hover:underline">privacy@growth4u.com</a></p>
                                        <p><strong className="text-[#032149]">Asunto:</strong> “Ejercicio de derechos protección de datos”</p>
                                    </blockquote>
                                    <p className="mb-2">La solicitud deberá incluir:</p>
                                    <ul className="list-disc pl-6 space-y-2 marker:text-[#6351d5] mb-4">
                                        <li>Tu nombre y apellidos.</li>
                                        <li>Indicación clara del derecho que deseas ejercer.</li>
                                        <li>Una copia de tu documento identificativo (DNI/NIE/pasaporte) o medio equivalente que permita acreditar tu identidad, en caso de duda razonable sobre la misma.</li>
                                    </ul>
                                    <p className="mb-2 font-bold">Plazo de respuesta:</p>
                                    <p className="mb-4">Responderemos a tu solicitud en el plazo máximo de 1 mes, prorrogable otros 2 meses en caso de solicitudes especialmente complejas; en tal caso, te informaremos de la prórroga dentro del primer mes.</p>
                                    <p className="mb-2">Si consideras que no hemos tratado tus datos de forma adecuada, puedes presentar una reclamación ante la autoridad de control competente:</p>
                                    <ul className="list-disc pl-6 space-y-2 marker:text-[#6351d5]">
                                        <li><strong>Agencia Española de Protección de Datos (AEPD)</strong> <br/> Web: <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-[#6351d5]">https://www.aepd.es</a></li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* --- CONTENIDO POLÍTICA DE COOKIES --- */}
                                <div>
                                    <h3 className="text-2xl font-bold text-[#032149] mt-0 mb-4">2.1. ¿Qué son las cookies?</h3>
                                    <p className="mb-4">Las cookies son pequeños archivos de texto que se descargan en tu dispositivo (ordenador, tablet, smartphone, etc.) cuando visitas determinadas páginas web. Permiten, entre otras cosas:</p>
                                    <ul className="list-disc pl-6 space-y-2 marker:text-[#6351d5] mb-4">
                                        <li>Que la web funcione correctamente.</li>
                                        <li>Recordar tus preferencias de navegación.</li>
                                        <li>Obtener información estadística anónima sobre el uso del sitio.</li>
                                        <li>Mostrarte contenidos y anuncios más acordes con tus intereses.</li>
                                    </ul>

                                    <h3 className="text-2xl font-bold text-[#032149] mt-10 mb-4">2.2. Tipos de cookies que utilizamos</h3>
                                    <p className="mb-4">En la web de Growth4U podemos utilizar:</p>
                                    <ul className="space-y-4 mb-6">
                                        <li className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                            <strong className="block text-[#6351d5] mb-2">Cookies técnicas o necesarias</strong>
                                            <span className="text-sm">Imprescindibles para que la web funcione (gestión de sesiones, seguridad, carga de página, recordar el consentimiento de cookies, etc.). No requieren tu consentimiento.</span>
                                        </li>
                                        <li className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                            <strong className="block text-[#6351d5] mb-2">Cookies de preferencias o personalización</strong>
                                            <span className="text-sm">Permiten recordar elecciones como el idioma, la región u otras configuraciones para mejorar tu experiencia. Algunas pueden requerir consentimiento según la configuración concreta.</span>
                                        </li>
                                        <li className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                            <strong className="block text-[#6351d5] mb-2">Cookies de análisis o medición</strong>
                                            <span className="text-sm">
                                                Nos ayudan a entender cómo se usa la web (páginas más visitadas, tiempo de permanencia, fuentes de tráfico, etc.) para mejorarla.<br/>
                                                Siempre que sea posible, se configurarán con anonimización de IP u otras medidas de minimización.<br/>
                                                Si no es posible evitar la identificación o el perfilado, se tratarán como cookies que requieren tu consentimiento previo.
                                            </span>
                                        </li>
                                        <li className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                            <strong className="block text-[#6351d5] mb-2">Cookies de marketing o publicidad comportamental</strong>
                                            <span className="text-sm">Permiten mostrarte anuncios en función de tus hábitos de navegación y crear perfiles comerciales. Solo se instalarán si prestas tu consentimiento expreso.</span>
                                        </li>
                                    </ul>

                                    <h4 className="text-xl font-bold text-[#032149] mt-10 mb-6">Tabla de cookies</h4>
                                    <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm">
                                        <table className="min-w-full text-sm text-left">
                                            <thead className="bg-slate-100 text-[#032149]">
                                                <tr>
                                                    <th className="p-4 font-bold">Nombre</th>
                                                    <th className="p-4 font-bold hidden sm:table-cell">Proveedor</th>
                                                    <th className="p-4 font-bold">Finalidad</th>
                                                    <th className="p-4 font-bold hidden sm:table-cell">Duración</th>
                                                    <th className="p-4 font-bold">Tipo</th>
                                                    <th className="p-4 font-bold">Categoría</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 bg-white">
                                                <tr>
                                                    <td className="p-4 font-mono text-xs text-slate-500">msgsndr_session</td>
                                                    <td className="p-4 hidden sm:table-cell">GoHighLevel</td>
                                                    <td className="p-4">Cookie técnica necesaria para gestionar la sesión del usuario en la web y formularios.</td>
                                                    <td className="p-4 hidden sm:table-cell">Sesión</td>
                                                    <td className="p-4">Propia</td>
                                                    <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Técnica (Necesaria)</span></td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4 font-mono text-xs text-slate-500">__cf_bm</td>
                                                    <td className="p-4 hidden sm:table-cell">Cloudflare</td>
                                                    <td className="p-4">Filtra el tráfico para evitar ataques de bots y garantizar la seguridad del sitio.</td>
                                                    <td className="p-4 hidden sm:table-cell">30 min</td>
                                                    <td className="p-4">Tercero</td>
                                                    <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Seguridad (Necesaria)</span></td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4 font-mono text-xs text-slate-500">ghl_consent</td>
                                                    <td className="p-4 hidden sm:table-cell">GoHighLevel</td>
                                                    <td className="p-4">Almacena tu elección sobre el uso de cookies en este sitio.</td>
                                                    <td className="p-4 hidden sm:table-cell">1 año</td>
                                                    <td className="p-4">Propia</td>
                                                    <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Técnica (Necesaria)</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <h3 className="text-2xl font-bold text-[#032149] mt-10 mb-4">2.3. Gestión del consentimiento de cookies</h3>
                                    <p className="mb-4">Al acceder por primera vez a la web, se mostrará un banner de cookies que te permitirá:</p>
                                    <ul className="list-disc pl-6 space-y-2 marker:text-[#6351d5] mb-4">
                                        <li>Aceptar todas las cookies opcionales.</li>
                                        <li>Rechazar todas las cookies opcionales con una acción tan sencilla como aceptarlas.</li>
                                        <li>Configurar tus preferencias por categoría (analítica, marketing, etc.).</li>
                                    </ul>
                                    <p className="mb-4">Hasta que no aceptes o configures las cookies opcionales:</p>
                                    <ul className="list-disc pl-6 space-y-2 marker:text-[#6351d5] mb-4">
                                        <li>No se activarán las cookies que no sean técnicas o necesarias.</li>
                                        <li>Solo se utilizarán las cookies imprescindibles para el funcionamiento básico del sitio.</li>
                                    </ul>
                                    <p className="mb-4">En línea con la Guía de Cookies de la AEPD, evitamos:</p>
                                    <ul className="list-disc pl-6 space-y-2 marker:text-[#6351d5] mb-4">
                                        <li>El consentimiento forzado (no condicionamos el acceso a la web a aceptar cookies, salvo casos muy excepcionales debidamente justificados).</li>
                                        <li>El uso de casillas pre‑marcadas o diseños que induzcan a aceptar sin una elección informada.</li>
                                    </ul>

                                    <h3 className="text-2xl font-bold text-[#032149] mt-10 mb-4">2.4. Cambiar o retirar el consentimiento</h3>
                                    <p className="mb-4">Puedes modificar tu configuración de cookies o retirar tu consentimiento en cualquier momento mediante:</p>
                                    <ul className="list-disc pl-6 space-y-2 marker:text-[#6351d5] mb-4">
                                        <li>El enlace “Configurar cookies” o similar disponible en el pie de página de la web.</li>
                                        <li>La limpieza de cookies desde la configuración de tu navegador.</li>
                                    </ul>
                                    <p>Los cambios que realices se aplicarán de forma inmediata o en tu siguiente navegación por el sitio.</p>
                                    
                                    <h3 className="text-2xl font-bold text-[#032149] mt-10 mb-4">2.5. Cómo desactivar o eliminar cookies desde el navegador</h3>
                                    <p className="mb-4">Además del panel de configuración de la web, puedes configurar tu navegador para:</p>
                                    <ul className="list-disc pl-6 space-y-2 marker:text-[#6351d5] mb-4">
                                        <li>Bloquear o eliminar cookies ya instaladas.</li>
                                        <li>Recibir avisos antes de que se almacenen nuevas cookies.</li>
                                    </ul>
                                    <p className="mb-4">Los pasos concretos dependen del navegador que utilices (Chrome, Firefox, Safari, Edge, etc.). Consulta la sección de ayuda de tu navegador para más detalles.</p>
                                    <p className="mb-4">Ten en cuenta que, si bloqueas todas las cookies, es posible que algunas funciones o servicios del sitio web no se muestren o no funcionen correctamente.</p>
                                    <p className="mt-8 bg-slate-50 p-4 border rounded-lg text-sm text-slate-500 italic">
                                        Antes de publicar este texto en la web, revisa con tu asesor legal:<br/>
                                        - Bases jurídicas concretas de las herramientas que usáis (CRM, analítica, email marketing, etc.).<br/>
                                        - Diseño funcional del banner de cookies y del panel de configuración.<br/>
                                        - Que la tabla de cookies se corresponda exactamente con la implementación técnica real.
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
      );
  };

  return (
    <HelmetProvider>
      {renderContent()}
    </HelmetProvider>
  );
}