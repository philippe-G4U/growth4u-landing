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
  TrendingDown, Bot, Landmark, Globe, Trash2, Edit2, Link as LinkIcon, CheckCircle, Cookie,
  FileText, Scale, Eye, UserCheck, Database, Server, Shield, ExternalLink
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
    methodology: { title: "El motor de crecimiento adecuado.", subtitle: "Infraestructura escalable según la etapa de tu negocio.", stages: [ { step: "Etapa 1", title: "BUSCANDO PMF", tag: "0 → Tracción Real", desc: "Realizamos **iteración rápida**: testeo de canales, mensajes y análisis de competidores para encontrar tu posicionamiento. Una propuesta de valor que guía el desarrollo del producto.", icon: Search, guaranteeTitle: "OBJETIVO & GARANTÍA", guarantees: [ "Validación de **Propuesta de Valor** y posicionamiento único.", "Generación de los primeros **usuarios que pagan**." ] }, { step: "Etapa 2", title: "ESCALANDO", tag: "10K → 500K Users", desc: "Implementamos el **Trust Engine**: generamos confianza posicionando la marca en **medios de autoridad e influencers**. Un motor de crecimiento que prioriza clientes reales.", icon: TrendingUp, guaranteeTitle: "OBJETIVO & GARANTÍA", guarantees: [ "Tracción orgánica y reconocimiento de marca vía **Referral**.", "Conversión de **Clientes que pagan** y alto LTV." ] }, { step: "Etapa 3", title: "EXPANSIÓN", tag: "Nuevo Mercado / Producto", desc: "Plan de **Go-to-Market** para lanzar nuevos productos o iniciar operaciones en **España**. Identificamos nichos competitivos para asegurar tracción estratégica.", icon: Globe, guaranteeTitle: "OBJETIVO & GARANTÍA", guarantees: [ "Tracción inicial asegurada en **nichos de alta conversión**.", "Penetración rápida con **estrategia localizada**." ] } ] },
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

  // --- META PIXEL EVENT TRACKING ---
  const trackLead = (source) => {
    if (cookieConsent === 'accepted' && window.fbq) {
      window.fbq('track', 'Lead', { 
        content_name: 'Demo Booking',
        content_category: source 
      });
    }
  };

  const trackViewContent = (contentName, contentType) => {
    if (cookieConsent === 'accepted' && window.fbq) {
      window.fbq('track', 'ViewContent', { 
        content_name: contentName,
        content_type: contentType 
      });
    }
  };

  const trackContact = () => {
    if (cookieConsent === 'accepted' && window.fbq) {
      window.fbq('track', 'Contact');
    }
  };

  // --- META PIXEL INITIALIZATION (GDPR COMPLIANT) ---
  const initMetaPixel = () => {
    if (typeof window === 'undefined') return;
    if (window.fbq) return; // Already initialized
    
    // Meta Pixel base code
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    
    // Initialize with Growth4U Pixel ID
    window.fbq('init', '1330785362070217');
    window.fbq('track', 'PageView');
    
    console.log('[Growth4U] Meta Pixel initialized with user consent');
  };

  // Helper to track custom events (only if consent given)
  const trackEvent = (eventName, params = {}) => {
    if (cookieConsent === 'accepted' && window.fbq) {
      window.fbq('track', eventName, params);
    }
  };

  // --- COOKIE LOGIC ---
  useEffect(() => {
    const savedConsent = localStorage.getItem('growth4u_consent');
    if (savedConsent) {
        setCookieConsent(savedConsent);
        // If user already accepted in previous session, initialize pixel
        if (savedConsent === 'accepted') {
            initMetaPixel();
        }
    }
  }, []);

  // Track page views when view changes (SPA navigation)
  useEffect(() => {
    if (cookieConsent === 'accepted' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [view]);

  const handleAcceptCookies = () => {
    localStorage.setItem('growth4u_consent', 'accepted');
    setCookieConsent('accepted');
    // Initialize Meta Pixel immediately on acceptance
    initMetaPixel();
  };

  const handleRejectCookies = () => {
    localStorage.setItem('growth4u_consent', 'rejected');
    setCookieConsent('rejected');
    console.log('[Growth4U] Marketing cookies rejected - no tracking');
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
    // Track blog post view
    trackViewContent(post.title, 'blog_post');
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

  // --- COMPONENTE LEGAL VIEW (COMPLETO) ---
  const LegalView = ({ type }) => {
      const isPrivacy = type === 'privacy';
      const title = isPrivacy ? "Política de Privacidad" : "Política de Cookies";
      
      // Componente de sección reutilizable
      const Section = ({ number, title, children, icon: Icon }) => (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            {Icon && (
              <div className="bg-[#6351d5]/10 p-2.5 rounded-xl">
                <Icon className="w-5 h-5 text-[#6351d5]" />
              </div>
            )}
            <h3 className="text-xl md:text-2xl font-bold text-[#032149]">
              {number}. {title}
            </h3>
          </div>
          <div className="pl-0 md:pl-12">
            {children}
          </div>
        </div>
      );

      // Componente de lista con bullets personalizados
      const BulletList = ({ items, className = "" }) => (
        <ul className={`space-y-3 ${className}`}>
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#6351d5] mt-2.5 flex-shrink-0" />
              <span className="text-slate-600 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );

      // Componente de info box
      const InfoBox = ({ children, variant = "info" }) => {
        const styles = {
          info: "bg-blue-50 border-blue-200 text-blue-800",
          warning: "bg-amber-50 border-amber-200 text-amber-800",
          success: "bg-emerald-50 border-emerald-200 text-emerald-800"
        };
        return (
          <div className={`p-4 rounded-xl border ${styles[variant]} text-sm leading-relaxed`}>
            {children}
          </div>
        );
      };
      
      return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#45b6f7] selection:text-white">
            <Helmet>
                <title>{title} | Growth4U</title>
                <meta name="description" content={`Consulta nuestra ${title} para conocer cómo gestionamos tus datos en Growth4U.`} />
                <link rel="canonical" href={`https://growth4u.io/?page=${isPrivacy ? 'privacidad' : 'cookies'}`} />
                <link rel="icon" type="image/png" href="https://i.imgur.com/h5sWS3W.png?v=2" />
            </Helmet>

            {/* Navigation */}
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
                <div className="bg-white p-8 md:p-12 lg:p-16 rounded-3xl shadow-xl border border-slate-100">
                    
                    {/* Header */}
                    <div className="text-center mb-12 pb-8 border-b border-slate-100">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#6351d5]/10 rounded-2xl mb-6">
                            {isPrivacy ? <Shield className="w-8 h-8 text-[#6351d5]" /> : <Cookie className="w-8 h-8 text-[#6351d5]" />}
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#032149] mb-4">{title}</h1>
                        <p className="text-slate-500 text-sm">Última actualización: Enero 2025</p>
                    </div>
                    
                    {/* Content */}
                    <div className="text-slate-600 leading-relaxed">
                        
                        {isPrivacy ? (
                            <>
                                {/* --- RESUMEN EJECUTIVO --- */}
                                <div className="bg-gradient-to-br from-[#effcfd] to-[#f0f4ff] p-8 rounded-2xl mb-12 border border-[#0faec1]/20">
                                    <h3 className="text-[#032149] font-bold text-lg mb-6 flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-[#0faec1]"/> 
                                        Resumen Ejecutivo
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-white/80 p-4 rounded-xl">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Responsable</span>
                                            <p className="text-[#032149] font-semibold mt-1">Growth Systems Now, S.L. ("Growth4U")</p>
                                        </div>
                                        <div className="bg-white/80 p-4 rounded-xl">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Finalidad</span>
                                            <p className="text-[#032149] font-semibold mt-1">Gestión de consultas, servicios, marketing B2B y análisis</p>
                                        </div>
                                        <div className="bg-white/80 p-4 rounded-xl">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Legitimación</span>
                                            <p className="text-[#032149] font-semibold mt-1">Contrato, interés legítimo y consentimiento</p>
                                        </div>
                                        <div className="bg-white/80 p-4 rounded-xl">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Derechos</span>
                                            <p className="text-[#032149] font-semibold mt-1">Acceso, rectificación, supresión, entre otros</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 1.1 NORMATIVA */}
                                <Section number="1.1" title="Normativa aplicable" icon={Scale}>
                                    <p className="mb-4">Esta política se adapta a las siguientes normas:</p>
                                    <BulletList items={[
                                        <><strong className="text-[#032149]">Reglamento (UE) 2016/679</strong> del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD).</>,
                                        <><strong className="text-[#032149]">Ley Orgánica 3/2018</strong>, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).</>,
                                        <>Demás normativa española que resulte aplicable en materia de protección de datos y servicios de la sociedad de la información.</>
                                    ]} />
                                </Section>

                                {/* 1.2 RESPONSABLE */}
                                <Section number="1.2" title="Responsable del tratamiento" icon={Building2}>
                                    <p className="mb-4">El responsable del tratamiento de los datos personales es:</p>
                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Responsable</span>
                                                <p className="text-[#032149] font-semibold mt-1">Growth Systems Now, S.L. ("Growth4U")</p>
                                            </div>
                                            <div>
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">NIF/CIF</span>
                                                <p className="text-[#032149] font-semibold mt-1">ESB22671879</p>
                                            </div>
                                            <div className="md:col-span-2">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Domicilio postal</span>
                                                <p className="text-[#032149] font-semibold mt-1">Calle de Luchana, 28, 2º A, 28010, Madrid, España</p>
                                            </div>
                                            <div className="md:col-span-2">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contacto privacidad</span>
                                                <a href="mailto:privacidad@growth4u.io" className="text-[#6351d5] font-bold hover:underline block mt-1">privacidad@growth4u.io</a>
                                            </div>
                                        </div>
                                    </div>
                                    <InfoBox variant="info">
                                        Dada la naturaleza de nuestra actividad, Growth4U no está obligada al nombramiento de un Delegado de Protección de Datos. No obstante, para cualquier consulta puede dirigirse al correo electrónico indicado.
                                    </InfoBox>
                                </Section>

                                {/* 1.3 DATOS QUE TRATAMOS */}
                                <Section number="1.3" title="Datos que tratamos" icon={Database}>
                                    <p className="mb-4">Podemos tratar las siguientes categorías de datos personales, según el formulario o canal que utilices:</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <div className="flex items-center gap-2 mb-2">
                                                <UserCheck className="w-4 h-4 text-[#6351d5]" />
                                                <span className="font-bold text-[#032149]">Datos identificativos</span>
                                            </div>
                                            <p className="text-sm text-slate-600">Nombre, apellidos</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Mail className="w-4 h-4 text-[#6351d5]" />
                                                <span className="font-bold text-[#032149]">Datos de contacto</span>
                                            </div>
                                            <p className="text-sm text-slate-600">Correo electrónico, teléfono</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Briefcase className="w-4 h-4 text-[#6351d5]" />
                                                <span className="font-bold text-[#032149]">Datos profesionales</span>
                                            </div>
                                            <p className="text-sm text-slate-600">Empresa, cargo, sector</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <div className="flex items-center gap-2 mb-2">
                                                <BarChart3 className="w-4 h-4 text-[#6351d5]" />
                                                <span className="font-bold text-[#032149]">Datos de uso</span>
                                            </div>
                                            <p className="text-sm text-slate-600">Interacción con emails, web, formularios, campañas</p>
                                        </div>
                                    </div>
                                    <InfoBox variant="warning">
                                        <strong>Nota:</strong> No solicitamos ni tratamos de forma intencionada <strong>categorías especiales de datos</strong> (salud, ideología, religión, etc.). Si excepcionalmente fuera necesario, se te informaría de forma específica y se recabaría el consentimiento expreso correspondiente.
                                    </InfoBox>
                                </Section>

                                {/* 1.4 ORIGEN DE LOS DATOS */}
                                <Section number="1.4" title="Origen de los datos" icon={Globe}>
                                    <p className="mb-4">Los datos personales que tratamos pueden proceder de:</p>
                                    <BulletList items={[
                                        <>Formularios de contacto, descarga de recursos o solicitud de reunión en nuestros propios sitios web.</>,
                                        <><strong className="text-[#032149]">Formularios de Meta (Lead Ads):</strong> Recibimos datos personales (nombre, correo, etc.) que nos facilitas voluntariamente a través de formularios en Facebook o Instagram. Estos datos se integran en nuestro CRM para su gestión comercial.</>,
                                        <>Comunicaciones directas que mantienes con nosotros (email, teléfono, reuniones).</>,
                                        <>Plataformas y redes profesionales (por ejemplo, <strong className="text-[#032149]">LinkedIn</strong>) cuando te has puesto en contacto con nosotros, has mostrado interés en nuestros contenidos, o cuando tu perfil es público y se considera razonable para fines de marketing B2B, siempre respetando tus derechos y expectativas de privacidad.</>,
                                        <>Bases o listados B2B obtenidos de forma lícita a través de terceros que garantizan el cumplimiento del RGPD, respecto de los cuales te informaremos en la primera comunicación que te hagamos llegar.</>,
                                        <><strong className="text-[#032149]">Fuentes de acceso público:</strong> Recabamos información profesional de fuentes abiertas como registros mercantiles, perfiles públicos de redes sociales profesionales (LinkedIn) y sitios web corporativos, siempre bajo el amparo del interés legítimo B2B y para fines estrictamente profesionales.</>
                                    ]} />
                                    <p className="mt-4 text-sm italic text-slate-500">En cualquiera de los casos, te informaremos de esta política y de tus derechos en el primer momento razonable.</p>
                                </Section>

                                {/* 1.5 FINALIDADES DEL TRATAMIENTO */}
                                <Section number="1.5" title="Finalidades del tratamiento" icon={Target}>
                                    <p className="mb-4">Usamos tus datos para:</p>
                                    <BulletList items={[
                                        <><strong className="text-[#032149]">Gestión de consultas y reuniones:</strong> atender solicitudes de información, demos o reuniones que nos plantees.</>,
                                        <><strong className="text-[#032149]">Prestación de servicios:</strong> gestionar la relación contractual, la facturación y el soporte cuando seas cliente.</>,
                                        <><strong className="text-[#032149]">Comunicaciones comerciales B2B:</strong> enviarte comunicaciones relacionadas con nuestros servicios de growth, estrategia GTM, contenidos formativos y recursos que puedan ser de tu interés profesional.</>,
                                        <><strong className="text-[#032149]">Publicidad y Retargeting:</strong> Utilizamos el Píxel de Meta para medir la eficacia de nuestras campañas publicitarias y mostrar anuncios relevantes a personas que han interactuado con nuestros formularios o página web.</>,
                                        <><strong className="text-[#032149]">Mejora de servicios y analítica interna:</strong> realizar análisis agregados y estadísticos sobre el uso de nuestra web, materiales descargados y campañas, con el fin de mejorar nuestros contenidos y propuestas de valor.</>,
                                        <><strong className="text-[#032149]">Cumplimiento de obligaciones legales:</strong> atender obligaciones contables, fiscales y de prevención de blanqueo de capitales u otras que correspondan.</>,
                                        <><strong className="text-[#032149]">Elaboración de informes de mercado:</strong> Los análisis de mercado que realizamos para nuestros servicios se basan en datos agregados o de fuentes públicas profesionales. En ningún caso utilizamos datos personales de los clientes de nuestros clientes para estos fines, salvo que exista un encargo específico y un contrato de tratamiento de datos previo.</>
                                    ]} />
                                </Section>

                                {/* 1.6 BASES JURÍDICAS */}
                                <Section number="1.6" title="Bases jurídicas del tratamiento" icon={Scale}>
                                    <p className="mb-6">Tratamos tus datos sobre las siguientes bases jurídicas:</p>
                                    
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                            <div className="flex items-start gap-3">
                                                <div className="bg-[#6351d5] text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                                                <div>
                                                    <h4 className="font-bold text-[#032149] mb-2">Ejecución de un contrato o aplicación de medidas precontractuales <span className="text-slate-400 font-normal text-sm">(art. 6.1.b RGPD)</span></h4>
                                                    <p className="text-slate-600 text-sm">Cuando tramitamos tu solicitud de información, preparamos una propuesta o gestionamos la relación como cliente.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                            <div className="flex items-start gap-3">
                                                <div className="bg-[#6351d5] text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                                                <div>
                                                    <h4 className="font-bold text-[#032149] mb-2">Cumplimiento de obligaciones legales <span className="text-slate-400 font-normal text-sm">(art. 6.1.c RGPD)</span></h4>
                                                    <p className="text-slate-600 text-sm">Cuando tratamos datos para cumplir obligaciones contables, fiscales u otras impuestas por la normativa aplicable.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                            <div className="flex items-start gap-3">
                                                <div className="bg-[#6351d5] text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                                                <div>
                                                    <h4 className="font-bold text-[#032149] mb-2">Interés legítimo <span className="text-slate-400 font-normal text-sm">(art. 6.1.f RGPD)</span></h4>
                                                    <BulletList className="mt-3 text-sm" items={[
                                                        <>Para realizar acciones de <strong className="text-[#032149]">marketing B2B razonables</strong> dirigidas a contactos profesionales de empresas que puedan estar interesadas en nuestros servicios.</>,
                                                        <>Para mejorar nuestros servicios, procesos internos y seguridad de la información.</>
                                                    ]} />
                                                    <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                                                        <p className="text-sm text-blue-800">
                                                            <strong>Podrás oponerte en cualquier momento:</strong> mediante el enlace de baja incluido en cada comunicación comercial por email, o enviando un email a <a href="mailto:privacidad@growth4u.io" className="underline">privacidad@growth4u.io</a>.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                            <div className="flex items-start gap-3">
                                                <div className="bg-[#6351d5] text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                                                <div>
                                                    <h4 className="font-bold text-[#032149] mb-2">Consentimiento <span className="text-slate-400 font-normal text-sm">(art. 6.1.a RGPD)</span></h4>
                                                    <BulletList className="mt-3 text-sm" items={[
                                                        <>Para el uso de <strong className="text-[#032149]">ciertas cookies no técnicas</strong> y tecnologías similares, conforme se detalla en nuestra Política de Cookies.</>,
                                                        <>En aquellos supuestos en los que te lo pidamos de forma expresa para finalidades concretas.</>
                                                    ]} />
                                                    <p className="mt-4 text-sm text-slate-500 italic">Cuando la base jurídica sea el consentimiento, podrás retirarlo en cualquier momento sin que ello afecte a la licitud del tratamiento basado en el consentimiento previo.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Section>

                                {/* 1.7 SEGURIDAD */}
                                <Section number="1.7" title="Medidas de seguridad y confidencialidad" icon={Lock}>
                                    <p className="mb-4">Growth4U aplica medidas técnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado al riesgo, de acuerdo con el art. 32 RGPD, incluyendo, entre otras:</p>
                                    <BulletList items={[
                                        <>Control de accesos y gestión de permisos según rol.</>,
                                        <>Uso de proveedores con cifrado en tránsito y, cuando es posible, en reposo.</>,
                                        <>Políticas internas de contraseña y autenticación reforzada.</>,
                                        <>Copias de seguridad periódicas y procedimientos de restauración.</>,
                                        <>Procedimientos para la gestión de incidentes de seguridad y brechas de datos.</>
                                    ]} />
                                    <p className="mt-4">Todo el personal de Growth4U y los terceros que prestan servicios con acceso a datos personales están sujetos a <strong className="text-[#032149]">obligaciones de confidencialidad</strong> (contractuales y/o legales).</p>
                                </Section>

                                {/* 1.8 DESTINATARIOS */}
                                <Section number="1.8" title="Destinatarios y encargados del tratamiento" icon={Users}>
                                    <p className="mb-4">Podemos compartir tus datos con terceros únicamente cuando sea necesario para la correcta prestación de nuestros servicios o por obligación legal.</p>
                                    <p className="mb-4">En particular, podemos contar con proveedores que actúan como <strong className="text-[#032149]">encargados del tratamiento</strong>, tales como:</p>
                                    <BulletList className="mb-6" items={[
                                        <>Servicios de <strong className="text-[#032149]">envío de email</strong> y automatización de marketing.</>,
                                        <>Herramientas de <strong className="text-[#032149]">CRM</strong> y gestión de la relación con clientes.</>,
                                        <>Plataformas de <strong className="text-[#032149]">analítica web</strong> y medición de rendimiento.</>,
                                        <>Proveedores de <strong className="text-[#032149]">alojamiento, cloud y mantenimiento IT</strong>.</>,
                                        <>Otros proveedores de soporte administrativo, contable o jurídico.</>
                                    ]} />

                                    <h4 className="font-bold text-[#032149] mb-4">Plataformas principales:</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                        {[
                                            { name: "GoHighLevel", desc: "CRM, funnels y base de datos" },
                                            { name: "Instantly & MailScale", desc: "Automatización y envío de emails" },
                                            { name: "Ulinc", desc: "Gestión de outreach en LinkedIn" },
                                            { name: "Meta Platforms, Inc.", desc: "Publicidad y análisis" }
                                        ].map((platform, i) => (
                                            <div key={i} className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0"></div>
                                                <div>
                                                    <span className="font-bold text-[#032149] text-sm">{platform.name}</span>
                                                    <p className="text-xs text-slate-500">{platform.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <InfoBox variant="info">
                                        Con todos ellos se han firmado contratos de encargo de tratamiento conforme al <strong>art. 28 RGPD</strong>, que les obligan a tratar los datos únicamente siguiendo nuestras instrucciones, aplicar medidas de seguridad adecuadas y no utilizarlos para fines propios.
                                    </InfoBox>

                                    <p className="mt-4 text-sm">No cedemos tus datos a terceros para sus propias finalidades comerciales, salvo que contemos con tu consentimiento expreso o exista otra base jurídica válida.</p>
                                </Section>

                                {/* 1.9 TRANSFERENCIAS INTERNACIONALES */}
                                <Section number="1.9" title="Transferencias internacionales" icon={Globe}>
                                    <p className="mb-4">Algunos de nuestros proveedores pueden estar ubicados fuera del Espacio Económico Europeo (EEE) o prestar sus servicios desde países que no ofrecen un nivel de protección de datos equivalente al europeo.</p>
                                    <p className="mb-4">En esos casos:</p>
                                    <BulletList items={[
                                        <>Utilizaremos <strong className="text-[#032149]">Cláusulas Contractuales Tipo</strong> aprobadas por la Comisión Europea u otros mecanismos reconocidos por el RGPD.</>,
                                        <>Evaluaremos, cuando proceda, el nivel de protección del país de destino y, en su caso, aplicaremos <strong className="text-[#032149]">medidas adicionales</strong> para salvaguardar la confidencialidad y la seguridad de tus datos.</>
                                    ]} />
                                    <p className="mt-4 text-sm text-slate-500">Puedes solicitar información adicional sobre las transferencias internacionales y las garantías aplicadas escribiendo a <a href="mailto:privacidad@growth4u.io" className="text-[#6351d5] underline">privacidad@growth4u.io</a></p>
                                </Section>

                                {/* 1.10 PLAZOS DE CONSERVACIÓN */}
                                <Section number="1.10" title="Plazos de conservación" icon={Clock}>
                                    <p className="mb-4">Conservaremos tus datos:</p>
                                    <BulletList items={[
                                        <>Mientras exista una relación comercial o contractual activa contigo o con tu empresa.</>,
                                        <>Mientras sean necesarios para la finalidad para la que fueron recogidos.</>,
                                        <>Posteriormente, durante los plazos necesarios para cumplir obligaciones legales o para la <strong className="text-[#032149]">prescripción de responsabilidades</strong> (por ejemplo, en materia civil, fiscal o mercantil).</>
                                    ]} />
                                    <p className="mt-4">Una vez transcurridos dichos plazos, los datos se bloquearán o eliminarán de forma segura.</p>
                                </Section>

                                {/* 1.11 DERECHOS */}
                                <Section number="1.11" title="Derechos de los interesados" icon={UserCheck}>
                                    <p className="mb-6">Puedes ejercer en cualquier momento los siguientes derechos:</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                                        {[
                                            { name: "Acceso", desc: "Saber qué datos tuyos tratamos" },
                                            { name: "Rectificación", desc: "Solicitar la corrección de datos inexactos" },
                                            { name: "Supresión", desc: "Pedir la eliminación de tus datos" },
                                            { name: "Limitación", desc: "Limitar el tratamiento en ciertas circunstancias" },
                                            { name: "Portabilidad", desc: "Recibir tus datos en formato estructurado" },
                                            { name: "Oposición", desc: "Oponerte al tratamiento basado en interés legítimo" }
                                        ].map((right, i) => (
                                            <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <span className="font-bold text-[#032149]">{right.name}</span>
                                                    <p className="text-sm text-slate-600">{right.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-[#6351d5]/5 p-6 rounded-2xl border border-[#6351d5]/20 mb-6">
                                        <h4 className="font-bold text-[#032149] mb-4">Para ejercer tus derechos:</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <Mail className="w-5 h-5 text-[#6351d5]" />
                                                <div>
                                                    <span className="text-sm text-slate-500">Email:</span>
                                                    <a href="mailto:privacidad@growth4u.io" className="text-[#6351d5] font-bold ml-2 hover:underline">privacidad@growth4u.io</a>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-5 h-5 text-[#6351d5]" />
                                                <div>
                                                    <span className="text-sm text-slate-500">Asunto:</span>
                                                    <span className="text-[#032149] font-semibold ml-2">"Ejercicio de derechos protección de datos"</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="mb-4">La solicitud deberá incluir:</p>
                                    <BulletList className="mb-6" items={[
                                        <>Tu nombre y apellidos.</>,
                                        <>Indicación clara del derecho que deseas ejercer.</>,
                                        <>Una copia de tu documento identificativo (DNI/NIE/pasaporte) o medio equivalente que permita acreditar tu identidad, en caso de duda razonable sobre la misma.</>
                                    ]} />

                                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mb-6">
                                        <h5 className="font-bold text-[#032149] mb-2 flex items-center gap-2">
                                            <Clock className="w-4 h-4" /> Plazo de respuesta
                                        </h5>
                                        <p className="text-sm text-slate-600">Responderemos a tu solicitud en el plazo máximo de <strong>1 mes</strong>, prorrogable otros <strong>2 meses</strong> en caso de solicitudes especialmente complejas; en tal caso, te informaremos de la prórroga dentro del primer mes.</p>
                                    </div>

                                    <InfoBox variant="info">
                                        Si consideras que no hemos tratado tus datos de forma adecuada, puedes presentar una reclamación ante la autoridad de control competente: <strong>Agencia Española de Protección de Datos (AEPD)</strong> — <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="underline">www.aepd.es</a>
                                    </InfoBox>
                                </Section>

                            </>
                        ) : (
                            <>
                                {/* --- POLÍTICA DE COOKIES --- */}
                                
                                {/* 2.1 QUÉ SON LAS COOKIES */}
                                <Section number="2.1" title="¿Qué son las cookies?" icon={Cookie}>
                                    <p className="mb-4">Las cookies son pequeños archivos de texto que se descargan en tu dispositivo (ordenador, tablet, smartphone, etc.) cuando visitas determinadas páginas web. Permiten, entre otras cosas:</p>
                                    <BulletList items={[
                                        <>Que la web funcione correctamente.</>,
                                        <>Recordar tus preferencias de navegación.</>,
                                        <>Obtener información estadística anónima sobre el uso del sitio.</>,
                                        <>Mostrarte contenidos y anuncios más acordes con tus intereses.</>
                                    ]} />
                                </Section>

                                {/* 2.2 TIPOS DE COOKIES */}
                                <Section number="2.2" title="Tipos de cookies que utilizamos" icon={Layers}>
                                    <p className="mb-6">En la web de Growth4U podemos utilizar:</p>
                                    
                                    <div className="space-y-4 mb-8">
                                        <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                                <h4 className="font-bold text-emerald-800">Cookies técnicas o necesarias</h4>
                                            </div>
                                            <p className="text-sm text-emerald-700">Imprescindibles para que la web funcione (gestión de sesiones, seguridad, carga de página, recordar el consentimiento de cookies, etc.). <strong>No requieren tu consentimiento.</strong></p>
                                        </div>

                                        <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                                <h4 className="font-bold text-blue-800">Cookies de preferencias o personalización</h4>
                                            </div>
                                            <p className="text-sm text-blue-700">Permiten recordar elecciones como el idioma, la región u otras configuraciones para mejorar tu experiencia. Algunas pueden requerir consentimiento según la configuración concreta.</p>
                                        </div>

                                        <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                                                <h4 className="font-bold text-purple-800">Cookies de análisis o medición</h4>
                                            </div>
                                            <p className="text-sm text-purple-700 mb-2">Nos ayudan a entender cómo se usa la web (páginas más visitadas, tiempo de permanencia, fuentes de tráfico, etc.) para mejorarla.</p>
                                            <BulletList className="text-purple-700" items={[
                                                <>Siempre que sea posible, se configurarán con <strong>anonimización de IP</strong> u otras medidas de minimización.</>,
                                                <>Si no es posible evitar la identificación o el perfilado, se tratarán como cookies que <strong>requieren tu consentimiento previo</strong>.</>
                                            ]} />
                                        </div>

                                        <div className="bg-orange-50 p-5 rounded-xl border border-orange-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                                <h4 className="font-bold text-orange-800">Cookies de marketing o publicidad comportamental</h4>
                                            </div>
                                            <p className="text-sm text-orange-700">Permiten mostrarte anuncios en función de tus hábitos de navegación y crear perfiles comerciales. <strong>Solo se instalarán si prestas tu consentimiento expreso.</strong></p>
                                        </div>
                                    </div>

                                    {/* Tabla de cookies */}
                                    <h4 className="font-bold text-[#032149] mb-4 flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5" /> Tabla de cookies vigentes
                                    </h4>
                                    <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm mb-4">
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full text-sm text-left">
                                                <thead className="bg-slate-100 text-[#032149]">
                                                    <tr>
                                                        <th className="p-4 font-bold">Nombre</th>
                                                        <th className="p-4 font-bold">Proveedor</th>
                                                        <th className="p-4 font-bold">Finalidad</th>
                                                        <th className="p-4 font-bold">Duración</th>
                                                        <th className="p-4 font-bold">Categoría</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 bg-white">
                                                    <tr>
                                                        <td className="p-4 font-mono text-xs text-slate-600">msgsndr_session</td>
                                                        <td className="p-4 text-slate-600">GoHighLevel</td>
                                                        <td className="p-4 text-slate-600">Gestión de sesión del usuario en la web y formularios</td>
                                                        <td className="p-4 text-slate-600">Sesión</td>
                                                        <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold">Técnica</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-4 font-mono text-xs text-slate-600">__cf_bm</td>
                                                        <td className="p-4 text-slate-600">Cloudflare</td>
                                                        <td className="p-4 text-slate-600">Filtra tráfico para evitar ataques de bots (seguridad)</td>
                                                        <td className="p-4 text-slate-600">30 min</td>
                                                        <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold">Seguridad</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-4 font-mono text-xs text-slate-600">ghl_consent</td>
                                                        <td className="p-4 text-slate-600">GoHighLevel</td>
                                                        <td className="p-4 text-slate-600">Almacena tu elección sobre el uso de cookies</td>
                                                        <td className="p-4 text-slate-600">1 año</td>
                                                        <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold">Técnica</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-4 font-mono text-xs text-slate-600">_fbp</td>
                                                        <td className="p-4 text-slate-600">Meta</td>
                                                        <td className="p-4 text-slate-600">Publicidad y retargeting</td>
                                                        <td className="p-4 text-slate-600">3 meses</td>
                                                        <td className="p-4"><span className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-xs font-bold">Marketing</span></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Section>

                                {/* 2.3 GESTIÓN DEL CONSENTIMIENTO */}
                                <Section number="2.3" title="Gestión del consentimiento de cookies" icon={Settings}>
                                    <p className="mb-4">Al acceder por primera vez a la web, se mostrará un <strong className="text-[#032149]">banner de cookies</strong> que te permitirá:</p>
                                    <BulletList className="mb-6" items={[
                                        <>Aceptar todas las cookies opcionales.</>,
                                        <>Rechazar todas las cookies opcionales con una acción tan sencilla como aceptarlas.</>,
                                        <>Configurar tus preferencias por categoría (analítica, marketing, etc.).</>
                                    ]} />

                                    <InfoBox variant="success">
                                        <strong>Hasta que no aceptes o configures las cookies opcionales:</strong>
                                        <ul className="mt-2 space-y-1">
                                            <li>• No se activarán las cookies que no sean técnicas o necesarias.</li>
                                            <li>• Solo se utilizarán las cookies imprescindibles para el funcionamiento básico del sitio.</li>
                                        </ul>
                                    </InfoBox>

                                    <p className="mt-6 mb-4">En línea con la <strong className="text-[#032149]">Guía de Cookies de la AEPD</strong>, evitamos:</p>
                                    <BulletList items={[
                                        <>El <strong className="text-[#032149]">consentimiento forzado</strong> (no condicionamos el acceso a la web a aceptar cookies, salvo casos muy excepcionales debidamente justificados).</>,
                                        <>El uso de <strong className="text-[#032149]">casillas pre-marcadas</strong> o diseños que induzcan a aceptar sin una elección informada.</>
                                    ]} />
                                </Section>

                                {/* 2.4 CAMBIAR O RETIRAR CONSENTIMIENTO */}
                                <Section number="2.4" title="Cambiar o retirar el consentimiento" icon={RefreshCw}>
                                    <p className="mb-4">Puedes modificar tu configuración de cookies o retirar tu consentimiento en cualquier momento mediante:</p>
                                    <BulletList items={[
                                        <>El enlace "<strong className="text-[#032149]">Configurar cookies</strong>" o similar disponible en el pie de página de la web.</>,
                                        <>La limpieza de cookies desde la configuración de tu navegador.</>
                                    ]} />
                                    <p className="mt-4">Los cambios que realices se aplicarán de forma inmediata o en tu siguiente navegación por el sitio.</p>
                                </Section>

                                {/* 2.5 CÓMO DESACTIVAR COOKIES */}
                                <Section number="2.5" title="Cómo desactivar o eliminar cookies desde el navegador" icon={Smartphone}>
                                    <p className="mb-4">Además del panel de configuración de la web, puedes configurar tu navegador para:</p>
                                    <BulletList className="mb-6" items={[
                                        <>Bloquear o eliminar cookies ya instaladas.</>,
                                        <>Recibir avisos antes de que se almacenen nuevas cookies.</>
                                    ]} />
                                    
                                    <p className="mb-4">Los pasos concretos dependen del navegador que utilices. Aquí tienes enlaces a la ayuda de los navegadores más comunes:</p>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                                        {[
                                            { name: "Chrome", url: "https://support.google.com/chrome/answer/95647" },
                                            { name: "Firefox", url: "https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-" },
                                            { name: "Safari", url: "https://support.apple.com/es-es/guide/safari/sfri11471/mac" },
                                            { name: "Edge", url: "https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" }
                                        ].map((browser, i) => (
                                            <a 
                                                key={i}
                                                href={browser.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-[#6351d5] hover:bg-[#6351d5]/5 transition-all group"
                                            >
                                                <span className="font-semibold text-[#032149] group-hover:text-[#6351d5]">{browser.name}</span>
                                                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#6351d5]" />
                                            </a>
                                        ))}
                                    </div>

                                    <InfoBox variant="warning">
                                        <strong>Ten en cuenta:</strong> Si bloqueas todas las cookies, es posible que algunas funciones o servicios del sitio web no se muestren o no funcionen correctamente.
                                    </InfoBox>
                                </Section>

                            </>
                        )}
                    </div>

                    {/* Footer del documento legal */}
                    <div className="mt-16 pt-8 border-t border-slate-200">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-slate-500">
                                ¿Tienes dudas? Contacta con nosotros en <a href="mailto:privacidad@growth4u.io" className="text-[#6351d5] font-bold hover:underline">privacidad@growth4u.io</a>
                            </p>
                            <button 
                                onClick={handleGoHome}
                                className="inline-flex items-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg"
                            >
                                <ArrowLeft className="w-4 h-4" /> Volver a Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
  };

  // --- RENDERIZADO DE VISTAS ---
  const renderContent = () => {
    // VISTA ADMIN
    if (view === 'admin') {
        const handleCopySitemap = () => {
            const baseUrl = "https://growth4u.io";
            const today = new Date().toISOString().split('T')[0];
            let xml = `<url><loc>${baseUrl}/</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>
<url><loc>${baseUrl}/blog</loc><lastmod>${today}</lastmod><priority>0.8</priority></url>
<url><loc>${baseUrl}/?page=privacidad</loc><lastmod>${today}</lastmod><priority>0.5</priority></url>
<url><loc>${baseUrl}/?page=cookies</loc><lastmod>${today}</lastmod><priority>0.5</priority></url>\n`;
            posts.forEach(post => {
                const slug = createSlug(post.title);
                const date = post.updatedAt ? new Date(post.updatedAt.seconds * 1000).toISOString().split('T')[0] : today;
                xml += `<url><loc>${baseUrl}/blog?articulo=${slug}</loc><lastmod>${date}</lastmod><priority>0.7</priority></url>\n`;
            });
            navigator.clipboard.writeText(xml);
            alert("¡Sitemap copiado!");
        };

        return (
          <div className="min-h-screen bg-slate-50 text-[#032149] font-sans p-4 md:p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 h-fit sticky top-8">
                 <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">{editingPostId ? 'Editar Artículo' : 'Nuevo Artículo'}</h2>
                    <button onClick={() => setView('home')}><X className="w-6 h-6 hover:text-red-500" /></button>
                 </div>
                 <form onSubmit={handleSavePost} className="space-y-6">
                    <input required type="text" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} className="w-full p-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-[#6351d5]" placeholder="Título del artículo" />
                    <div className="grid grid-cols-2 gap-4">
                      <select value={newPost.category} onChange={e => setNewPost({...newPost, category: e.target.value})} className="w-full p-3 rounded-xl border border-slate-300 outline-none">
                        <option>Estrategia</option><option>Data & Analytics</option><option>Trust Engine</option>
                      </select>
                      <input type="text" value={newPost.readTime} onChange={e => setNewPost({...newPost, readTime: e.target.value})} className="w-full p-3 rounded-xl border border-slate-300 outline-none" placeholder="Ej: 5 min" />
                    </div>
                    <input required type="url" value={newPost.image} onChange={e => setNewPost({...newPost, image: e.target.value})} className="w-full p-3 rounded-xl border border-slate-300 outline-none" placeholder="URL de la imagen (debe terminar en .png o .jpg)" />
                    <textarea required value={newPost.excerpt} onChange={e => setNewPost({...newPost, excerpt: e.target.value})} className="w-full p-3 rounded-xl border border-slate-300 outline-none h-24 focus:ring-2 focus:ring-[#6351d5]" placeholder="Breve resumen (excerpt)..." />
                    <textarea required value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} className="w-full p-3 rounded-xl border border-slate-300 outline-none h-64 font-mono text-sm focus:ring-2 focus:ring-[#6351d5]" placeholder="Escribe aquí tu contenido usando Markdown..." />
                    <div className="flex gap-4">
                      <button type="submit" disabled={isSubmitting} className="flex-1 bg-[#6351d5] text-white font-bold py-4 rounded-xl hover:bg-[#4b3db1] transition-colors shadow-lg">
                        {isSubmitting ? 'Guardando...' : (editingPostId ? 'Actualizar Artículo' : 'Publicar Ahora')}
                      </button>
                      {editingPostId && (
                        <button type="button" onClick={cancelEdit} className="px-6 py-4 rounded-xl bg-slate-200 text-slate-700 font-bold hover:bg-slate-300">Cancelar</button>
                      )}
                    </div>
                 </form>
              </div>
              <div className="space-y-8">
                  <div className="bg-[#effcfd] rounded-3xl shadow-sm border border-[#0faec1]/30 p-6">
                      <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#0faec1]"><Globe className="w-5 h-5"/> Herramientas SEO</h2>
                      <button onClick={handleCopySitemap} className="w-full py-3 bg-white border border-[#0faec1] text-[#0faec1] font-bold rounded-xl hover:bg-[#0faec1] hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"><LinkIcon className="w-4 h-4"/> Copiar URLs para Sitemap XML</button>
                  </div>
                  <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 h-fit">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><LayoutDashboard className="w-5 h-5"/> Artículos ({posts.length})</h2>
                    <div className="space-y-4">
                      {posts.map(post => (
                        <div key={post.id} className={`p-4 rounded-xl border flex gap-4 items-start transition-all ${editingPostId === post.id ? 'border-[#6351d5] bg-blue-50' : 'border-slate-100 hover:border-slate-300'}`}>
                          <img src={post.image} alt="" className="w-16 h-16 rounded-lg object-cover bg-slate-200" />
                          <div className="flex-1">
                            <h4 className="font-bold text-sm text-[#032149] line-clamp-1">{post.title}</h4>
                            <div className="flex items-center gap-2 mt-3">
                              <button onClick={() => handleEditClick(post)} className="text-xs flex items-center gap-1 font-bold text-[#6351d5] hover:underline"><Edit2 className="w-3 h-3"/> Editar</button>
                              <button onClick={() => handleDeleteClick(post.id)} className="text-xs flex items-center gap-1 font-bold text-red-500 hover:underline"><Trash2 className="w-3 h-3"/> Borrar</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
              </div>
            </div>
          </div>
        );
    }

    // VISTA LEGALES (PRIVACIDAD Y COOKIES)
    if (view === 'privacy' || view === 'cookies') {
        return <LegalView type={view} />;
    }

    // VISTA POST INDIVIDUAL
    if (view === 'post' && selectedPost) {
        const articleSchema = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": selectedPost.title,
          "description": selectedPost.excerpt,
          "image": selectedPost.image,
          "datePublished": selectedPost.createdAt ? new Date(selectedPost.createdAt.seconds * 1000).toISOString() : new Date().toISOString(),
          "author": { "@type": "Person", "name": "Equipo Growth4U" },
          "publisher": { "@type": "Organization", "name": "Growth4U", "logo": { "@type": "ImageObject", "url": "https://i.imgur.com/imHxGWI.png" } }
        };

        return (
          <div className="min-h-screen bg-white text-[#032149] font-sans selection:bg-[#45b6f7] selection:text-white">
             <Helmet>
                <title>{selectedPost.title} | Blog Growth4U</title>
                <meta name="description" content={selectedPost.excerpt} />
                <link rel="canonical" href={`https://growth4u.io/blog?articulo=${createSlug(selectedPost.title)}`} />
                <link rel="icon" type="image/png" href="https://i.imgur.com/h5sWS3W.png?v=2" />
                <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
             </Helmet>

             <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
                   <div className="flex items-center gap-0 cursor-pointer" onClick={handleClosePost}>
                      <img src="https://i.imgur.com/imHxGWI.png" alt="Growth4U" className="h-6 w-auto" />
                   </div>
                   <div className="flex items-center gap-4">
                     <button onClick={copyLinkToClipboard} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${copiedLink ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                        {copiedLink ? <CheckCircle className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                        {copiedLink ? 'Enlace copiado' : 'Copiar enlace'}
                     </button>
                     <button onClick={handleClosePost} className="text-sm font-bold text-[#6351d5] flex items-center gap-2 hover:underline"><ArrowLeft className="w-4 h-4" /> Volver</button>
                   </div>
                </div>
             </nav>
             <article className="pt-32 pb-20 max-w-3xl mx-auto px-4">
                <span className="inline-block px-3 py-1 bg-[#6351d5]/10 text-[#6351d5] rounded-full text-xs font-bold uppercase tracking-wider mb-6">{selectedPost.category}</span>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#032149] leading-tight">{selectedPost.title}</h1>
                <div className="flex items-center gap-4 text-slate-500 text-sm mb-8 border-b border-slate-100 pb-8">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {selectedPost.readTime}</span>
                  <span>•</span>
                  <span>{selectedPost.createdAt ? new Date(selectedPost.createdAt.seconds * 1000).toLocaleDateString() : 'Fecha no disponible'}</span>
                </div>
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-auto object-cover rounded-3xl shadow-xl mb-12" />
                <div className="prose prose-lg prose-slate mx-auto text-[#032149]">
                  <p className="text-xl text-slate-600 font-medium mb-10 leading-relaxed italic border-l-4 border-[#6351d5] pl-6">{selectedPost.excerpt}</p>
                  <Markdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-[#032149]" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-3 text-[#032149]" {...props} />,
                      p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-slate-700" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-6 space-y-2 text-slate-700" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-6 space-y-2 text-slate-700" {...props} />,
                      li: ({node, ...props}) => <li className="pl-1" {...props} />,
                      strong: ({node, ...props}) => <strong className="text-[#032149] font-bold" {...props} />,
                      a: ({node, ...props}) => <a className="text-[#6351d5] underline hover:text-[#3f45fe] font-bold" {...props} />,
                      blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#6351d5] pl-4 italic my-4 text-slate-600 bg-slate-50 py-2 pr-2 rounded-r" {...props} />,
                      table: ({node, ...props}) => <div className="overflow-x-auto my-6"><table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg" {...props} /></div>,
                      thead: ({node, ...props}) => <thead className="bg-slate-50" {...props} />,
                      th: ({node, ...props}) => <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider" {...props} />,
                      td: ({node, ...props}) => <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 border-t border-slate-100" {...props} />,
                    }}
                  >
                    {selectedPost.content}
                  </Markdown>
                </div>
                <div className="mt-16 pt-10 border-t border-slate-200 text-center">
                   <h3 className="text-2xl font-bold mb-6">¿Quieres aplicar esto en tu Fintech?</h3>
                   <a href={bookingLink} target="_blank" rel="noopener noreferrer" onClick={() => trackLead('blog_post_cta')} className="inline-flex items-center justify-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all transform hover:scale-105">{t.nav.cta} <ArrowRight className="w-5 h-5"/></a>
                </div>
             </article>
          </div>
        );
    }

    // --- BLOG PAGE VIEW ---
    if (view === 'blog') {
      return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#45b6f7] selection:text-white">
          <Helmet>
            <title>Blog | Growth4U</title>
            <meta name="description" content="Insights y estrategias de Growth para Fintechs B2B y B2C." />
            <link rel="canonical" href="https://growth4u.io/blog" />
            <link rel="icon" type="image/png" href="https://i.imgur.com/h5sWS3W.png?v=2" />
          </Helmet>

          <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
            <nav className="nav-island w-full max-w-6xl">
              <div className="px-6 sm:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center gap-0 cursor-pointer group flex-shrink-0" onClick={handleGoHome}>
                    <img src="https://i.imgur.com/imHxGWI.png" alt="Growth4U Logo" className="h-5 md:h-6 w-auto object-contain transition-transform group-hover:scale-105" />
                  </div>
                  <div className="hidden md:flex items-center gap-6">
                    <button onClick={handleGoHome} className="hover:text-[#6351d5] transition-colors px-2 py-2 rounded-md text-sm font-medium text-[#032149]">Home</button>
                    <span className="text-[#6351d5] px-2 py-2 rounded-md text-sm font-bold">Blog</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <a href={bookingLink} target="_blank" rel="noopener noreferrer" onClick={() => trackLead('blog_nav')} className="bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-2 px-5 rounded-full text-sm transition-all duration-300 shadow-lg">{t.nav.cta}</a>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <section className="pt-40 pb-20 px-4">
             <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                   <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-[#6351d5] font-bold text-sm mb-4">INSIGHTS & ESTRATEGIA</span>
                   <h1 className="text-4xl md:text-6xl font-extrabold text-[#032149] mb-6">Blog Growth4U</h1>
                   <p className="text-xl text-slate-600 max-w-2xl mx-auto">Recursos estratégicos para escalar tu fintech sin depender de paid media.</p>
                </div>

                <div className="flex justify-end mb-8">
                    <button onClick={() => setView('admin')} className={`flex items-center gap-2 bg-slate-100 text-[#6351d5] px-4 py-2 rounded-full font-bold text-xs hover:bg-slate-200 transition-colors ${isAdminMode ? 'block' : 'hidden'}`}><Plus className="w-4 h-4"/> {t.blog.admin}</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayPosts.map((post, index) => (
                      <div key={index} onClick={() => handleViewPost(post)} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1">
                          <div className="relative aspect-video bg-slate-100 overflow-hidden">
                            <img src={post.image} alt={post.title} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#6351d5] uppercase tracking-wide border border-slate-200 shadow-sm">{post.category}</div>
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-3 text-[#032149] group-hover:text-[#6351d5] transition-colors line-clamp-2">{post.title}</h3>
                            <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                            <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-50">
                               <div className="flex items-center"><Clock className="w-4 h-4 mr-2" />{post.readTime}</div>
                               <span className="text-[#6351d5] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">Leer más <ArrowRight className="w-4 h-4"/></span>
                            </div>
                          </div>
                      </div>
                  ))}
                </div>
             </div>
          </section>

          <section id="contacto" className="bg-[#032149] py-20 text-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.footer.title}</h2>
              <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
                <a href={`mailto:${t.footer.ctaEmail}`} onClick={() => trackContact()} className="flex items-center justify-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg shadow-[#6351d5]/30 transition-all hover:scale-105"><Mail className="w-5 h-5" /> {t.footer.ctaEmail}</a>
                <a href={bookingLink} target="_blank" rel="noopener noreferrer" onClick={() => trackLead('footer')} className="flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white hover:bg-white/10 font-bold py-4 px-8 rounded-lg text-lg transition-all hover:scale-105 whitespace-nowrap"><Calendar className="w-5 h-5" /> {t.footer.ctaCall}</a>
              </div>
              <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
                  <p>{t.footer.rights}</p>
                  <div className="flex gap-4 mt-4 md:mt-0">
                      <button onClick={handleGoPrivacy} className="hover:text-white transition-colors">{t.footer.privacy}</button>
                      <button onClick={handleGoCookies} className="hover:text-white transition-colors">{t.footer.terms}</button>
                  </div>
              </div>
            </div>
          </section>
        </div>
      );
    }

    // HOME VIEW (DEFAULT)
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#45b6f7] selection:text-white overflow-x-hidden">
        <Helmet>
          <title>Growth4U | Growth Marketing Fintech B2B & B2C</title>
          <meta name="description" content="Especialistas en Growth Fintech. Te ayudamos a crear un motor de crecimiento que perdura en el tiempo y reduce tu CAC apoyándonos en el valor de la confianza." />
          <link rel="canonical" href="https://growth4u.io/" />
          <link rel="icon" type="image/png" href="https://i.imgur.com/h5sWS3W.png?v=2" />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Growth4U",
              "url": "https://growth4u.io",
              "logo": "https://i.imgur.com/imHxGWI.png",
              "sameAs": [
                "https://www.linkedin.com/company/growth4u/"
              ]
            })}
          </script>
        </Helmet>
        
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

        {/* COOKIE BANNER */}
        {cookieConsent === 'unknown' && (
            <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-slate-200 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] p-6 animate-in slide-in-from-bottom-5">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 justify-between">
                    <div className="flex items-start gap-4">
                        <div className="bg-[#6351d5]/10 p-3 rounded-full hidden md:block">
                            <Cookie className="w-6 h-6 text-[#6351d5]" />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#032149] mb-1">Valoramos tu privacidad</h4>
                            <p className="text-sm text-slate-600 max-w-2xl">
                                Utilizamos cookies propias y de terceros para analizar nuestros servicios y mostrarte publicidad relacionada con tus preferencias. Puedes aceptar todas las cookies o configurarlas. Más información en nuestra <button onClick={handleGoCookies} className="text-[#6351d5] underline font-bold">Política de Cookies</button>.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                         <button onClick={handleRejectCookies} className="flex-1 md:flex-none px-6 py-2.5 rounded-lg border border-slate-300 font-bold text-slate-600 hover:bg-slate-50 transition-colors text-sm">Rechazar</button>
                         <button onClick={handleAcceptCookies} className="flex-1 md:flex-none px-6 py-2.5 rounded-lg bg-[#6351d5] text-white font-bold hover:bg-[#3f45fe] transition-colors text-sm">Aceptar todas</button>
                    </div>
                </div>
            </div>
        )}

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
                    <button onClick={handleGoToBlogPage} className="hover:text-[#6351d5] transition-colors px-2 py-2 rounded-md text-sm font-medium text-[#032149]">{t.nav.blog}</button>
                  </div>
                  <button onClick={toggleLang} className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full text-xs font-bold text-[#032149] transition-colors border border-slate-200">
                      <Globe className="w-3 h-3" /> {lang === 'es' ? 'EN' : 'ES'}
                  </button>
                </div>
                
                <div className="hidden md:flex items-center gap-4">
                  <a href={bookingLink} target="_blank" rel="noopener noreferrer" onClick={() => trackLead('home_nav')} className="bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-2 px-5 rounded-full text-sm transition-all duration-300 shadow-lg shadow-[#6351d5]/20 hover:shadow-[#6351d5]/40 transform hover:-translate-y-0.5 whitespace-nowrap">{t.nav.cta}</a>
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
                  <button onClick={handleGoToBlogPage} className="text-[#032149] hover:text-[#6351d5] block w-full text-left px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-50">{t.nav.blog}</button>
                  <a href={bookingLink} target="_blank" rel="noopener noreferrer" onClick={() => { setIsMenuOpen(false); trackLead('mobile_menu'); }} className="text-white bg-[#6351d5] font-bold block px-3 py-3 rounded-xl text-base mt-4 text-center whitespace-nowrap">{t.nav.cta}</a>
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
              <a href={bookingLink} target="_blank" rel="noopener noreferrer" onClick={() => trackLead('hero_primary')} className="flex items-center justify-center gap-2 bg-[#6351d5] text-white hover:bg-[#3f45fe] font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-xl shadow-[#6351d5]/20">{t.hero.ctaPrimary} <ArrowRight className="w-5 h-5" /></a>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.methodology.stages.map((stage, i) => (
                <div key={i} className="relative group hover:-translate-y-2 transition-all duration-300">
                  <div className="bg-white rounded-3xl p-8 h-full flex flex-col shadow-lg border border-slate-100 hover:shadow-2xl hover:border-[#45b6f7]/30 transition-all">
                    <div className="mb-6">
                      <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{stage.step}</div>
                      <div className="flex items-center gap-3 mb-4">
                           <h3 className="text-2xl font-extrabold text-[#032149] uppercase">{stage.title}</h3>
                           {stage.icon && <stage.icon className="w-6 h-6 text-[#45b6f7]" />}
                      </div>
                      <span className="inline-block px-3 py-1 bg-[#0faec1]/10 text-[#0faec1] text-xs font-bold rounded-full border border-[#0faec1]/20">
                        {stage.tag}
                      </span>
                    </div>
                    <div className="text-slate-600 text-sm leading-relaxed mb-8">
                      {renderFormattedContent(stage.desc)}
                    </div>
                    <div className="mt-auto bg-[#effcfd] rounded-2xl p-6 border border-[#0faec1]/10">
                        <div className="flex items-center gap-2 mb-4">
                           <Target className="w-4 h-4 text-[#0faec1]" />
                           <span className="text-xs font-bold text-[#0faec1] uppercase tracking-wider">{stage.guaranteeTitle}</span>
                        </div>
                        <div className="space-y-1">
                           {renderFormattedContent(stage.guarantees)}
                        </div>
                    </div>
                  </div>
                </div>
              ))}
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
        <section id="blog-preview" className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#032149]">Últimos Insights</h2>
                  <button onClick={() => setView('admin')} className={`flex items-center gap-2 bg-slate-100 text-[#6351d5] px-4 py-2 rounded-full font-bold text-xs hover:bg-slate-200 transition-colors ${isAdminMode ? 'block' : 'hidden'}`}><Plus className="w-4 h-4"/> {t.blog.admin}</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {homePosts.length > 0 ? (
                      homePosts.map((post, index) => (
                          <div key={index} onClick={() => handleViewPost(post)} className="group cursor-pointer">
                              <div className="relative overflow-hidden rounded-xl mb-4 aspect-video bg-slate-100"><img src={post.image} alt={post.title} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"/><div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#6351d5] uppercase tracking-wide border border-slate-200 shadow-sm">{post.category}</div></div>
                              <h3 className="text-xl font-bold mb-2 text-[#032149] group-hover:text-[#6351d5] transition-colors line-clamp-2">{post.title}</h3>
                              <p className="text-slate-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                              <div className="flex items-center text-sm text-slate-500 font-medium"><Clock className="w-4 h-4 mr-2" />{post.readTime}</div>
                          </div>
                      ))
                  ) : (
                      <div className="col-span-3 text-center py-12 text-slate-500">
                          <p>{t.blog.empty}</p>
                      </div>
                  )}
              </div>
              <div className="mt-12 text-center">
                  <button onClick={handleGoToBlogPage} className="inline-flex items-center justify-center gap-2 border-2 border-[#6351d5] text-[#6351d5] hover:bg-[#6351d5] hover:text-white font-bold py-3 px-8 rounded-full transition-all duration-300">
                      {t.blog.cta} <ArrowRight className="w-5 h-5"/>
                  </button>
              </div>
          </div>
        </section>

        {/* Footer */}
        <section id="contacto" className="bg-[#032149] py-20 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.footer.title}</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
              <a href={`mailto:${t.footer.ctaEmail}`} onClick={() => trackContact()} className="flex items-center justify-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg shadow-[#6351d5]/30 transition-all hover:scale-105"><Mail className="w-5 h-5" /> {t.footer.ctaEmail}</a>
              <a href={bookingLink} target="_blank" rel="noopener noreferrer" onClick={() => trackLead('home_footer')} className="flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white hover:bg-white/10 font-bold py-4 px-8 rounded-lg text-lg transition-all hover:scale-105 whitespace-nowrap"><Calendar className="w-5 h-5" /> {t.footer.ctaCall}</a>
            </div>
            <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
                <p>{t.footer.rights}</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <button onClick={handleGoPrivacy} className="hover:text-white transition-colors">{t.footer.privacy}</button>
                    <button onClick={handleGoCookies} className="hover:text-white transition-colors">{t.footer.terms}</button>
                </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <HelmetProvider>
      {renderContent()}
    </HelmetProvider>
  );
}
