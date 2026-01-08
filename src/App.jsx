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
  TrendingDown, Bot, Landmark, Globe, Trash2, Edit2, Link as LinkIcon, CheckCircle
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

// FUNCIÓN PARA RENDERIZAR CONTENIDO SIMPLE (HOME)
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
    blog: { title: "Blog & Insights", subtitle: "Recursos estratégicos para escalar tu fintech.", cta: "Ver todos los artículos", readTime: "min lectura", admin: "Admin", empty: "Próximamente nuevos artículos...", defaults: [] },
    footer: { title: "Escala tu Fintech hoy.", ctaEmail: "accounts@growth4u.io", ctaCall: "Agendar Llamada", rights: "© 2025 Growth4U. Todos los derechos reservados.", privacy: "Política de Privacidad", terms: "Términos de Servicio" }
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
    footer: { title: "Scale your Fintech today.", ctaEmail: "accounts@growth4u.io", ctaCall: "Book a Call", rights: "© 2025 Growth4U. All rights reserved.", privacy: "Privacy Policy", terms: "Terms of Service" }
  }
};

export default function App() {
  const [view, setView] = useState('home');
  const [lang, setLang] = useState('es'); 
  const t = translations[lang]; 
   
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCase, setExpandedCase] = useState(null);
   
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

  // --- HOOKS ---
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
        
        // Router Logic inside Snapshot to ensure posts are loaded
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
    
    // Standardizing URL for posts
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

  const handleClosePost = () => {
    // If we came from blog page, go back to blog, else home
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
  
  // Logic to show only 6 posts on home, all on blog
  const displayPosts = posts.length > 0 ? posts : t.blog.defaults;
  const homePosts = displayPosts.slice(0, 6);

  // --- RENDERIZADO DE VISTAS ---
  const renderContent = () => {
    if (view === 'admin') {
        // --- FUNCIÓN GENERADORA DE SITEMAP (NUEVO) ---
        const handleCopySitemap = () => {
            const baseUrl = "https://growth4u.io";
            const today = new Date().toISOString().split('T')[0];
            
            let xml = `<url>
  <loc>${baseUrl}/</loc>
  <lastmod>${today}</lastmod>
  <priority>1.0</priority>
</url>
<url>
  <loc>${baseUrl}/blog</loc>
  <lastmod>${today}</lastmod>
  <priority>0.8</priority>
</url>

`;
            posts.forEach(post => {
                const slug = createSlug(post.title);
                const date = post.updatedAt 
                    ? new Date(post.updatedAt.seconds * 1000).toISOString().split('T')[0] 
                    : today;
                
                xml += `<url>
  <loc>${baseUrl}/blog?articulo=${slug}</loc>
  <lastmod>${date}</lastmod>
  <priority>0.7</priority>
</url>
`;
            });

            navigator.clipboard.writeText(xml);
            alert("¡Sitemap copiado! Ahora pégalo en tu archivo sitemap.xml");
        };

        return (
          <div className="min-h-screen bg-slate-50 text-[#032149] font-sans p-4 md:p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* COLUMNA IZQUIERDA: EDITOR */}
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 h-fit sticky top-8">
                 <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">{editingPostId ? 'Editar Artículo' : 'Nuevo Artículo'}</h2>
                    <button onClick={() => setView('home')}><X className="w-6 h-6 hover:text-red-500" /></button>
                 </div>
                 
                 <div className="bg-blue-50 p-4 rounded-xl mb-6 text-sm text-blue-800 border border-blue-200">
                   <strong>Guía de Formato (Markdown):</strong>
                   <ul className="list-disc ml-5 mt-2 space-y-1">
                     <li><code>## Título</code> para subtítulos.</li>
                     <li><code>**Negrita**</code> para énfasis.</li>
                     <li><code>- Lista</code> para viñetas.</li>
                   </ul>
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

              {/* COLUMNA DERECHA: LISTA Y HERRAMIENTAS SEO */}
              <div className="space-y-8">
                  {/* CAJA 1: SEO TOOLS (NUEVO) */}
                  <div className="bg-[#effcfd] rounded-3xl shadow-sm border border-[#0faec1]/30 p-6">
                      <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#0faec1]">
                          <Globe className="w-5 h-5"/> Herramientas SEO
                      </h2>
                      <p className="text-sm text-slate-600 mb-4">
                          Genera la lista de URLs de tus {posts.length} artículos para actualizar Google Search Console.
                      </p>
                      <button 
                          onClick={handleCopySitemap}
                          className="w-full py-3 bg-white border border-[#0faec1] text-[#0faec1] font-bold rounded-xl hover:bg-[#0faec1] hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
                      >
                          <LinkIcon className="w-4 h-4"/> Copiar URLs para Sitemap XML
                      </button>
                  </div>

                  {/* CAJA 2: LISTA DE ARTÍCULOS */}
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
                      {posts.length === 0 && <p className="text-center text-slate-400 py-10">No hay artículos aún.</p>}
                    </div>
                  </div>
              </div>

            </div>
          </div>
        );
    }

    if (view === 'post' && selectedPost) {
        const articleSchema = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": selectedPost.title,
          "description": selectedPost.excerpt,
          "image": selectedPost.image,
          "datePublished": selectedPost.createdAt ? new Date(selectedPost.createdAt.seconds * 1000).toISOString() : new Date().toISOString(),
          "author": { "@type": "Person", "name": "Equipo Growth4U" },
          "publisher": {
            "@type": "Organization",
            "name": "Growth4U",
            "logo": { "@type": "ImageObject", "url": "https://i.imgur.com/imHxGWI.png" }
          }
        };

        return (
          <div className="min-h-screen bg-white text-[#032149] font-sans selection:bg-[#45b6f7] selection:text-white">
             <Helmet>
                <title>{selectedPost.title} | Blog Growth4U</title>
                <meta name="description" content={selectedPost.excerpt} />
                {/* CANONICAL DINÁMICA CORRECTA */}
                <link rel="canonical" href={`https://growth4u.io/?articulo=${createSlug(selectedPost.title)}`} />
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
                   <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all transform hover:scale-105">{t.nav.cta} <ArrowRight className="w-5 h-5"/></a>
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
            {/* CANONICAL PARA BLOG */}
            <link rel="canonical" href="https://growth4u.io/blog" />
          </Helmet>

          {/* Nav Simplificado para Blog */}
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
                    <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-2 px-5 rounded-full text-sm transition-all duration-300 shadow-lg">{t.nav.cta}</a>
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
                  {/* MUESTRA TODOS LOS POSTS */}
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
                <a href={`mailto:${t.footer.ctaEmail}`} className="flex items-center justify-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg shadow-[#6351d5]/30 transition-all hover:scale-105"><Mail className="w-5 h-5" /> {t.footer.ctaEmail}</a>
                <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white hover:bg-white/10 font-bold py-4 px-8 rounded-lg text-lg transition-all hover:scale-105 whitespace-nowrap"><Calendar className="w-5 h-5" /> {t.footer.ctaCall}</a>
              </div>
              <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm"><p>{t.footer.rights}</p></div>
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
          {/* CANONICAL PARA HOME */}
          <link rel="canonical" href="https://growth4u.io/" />
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
                    {/* Botón Blog modificado para ir a la página dedicada */}
                    <button onClick={handleGoToBlogPage} className="hover:text-[#6351d5] transition-colors px-2 py-2 rounded-md text-sm font-medium text-[#032149]">{t.nav.blog}</button>
                  </div>
                  <button onClick={toggleLang} className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full text-xs font-bold text-[#032149] transition-colors border border-slate-200">
                      <Globe className="w-3 h-3" /> {lang === 'es' ? 'EN' : 'ES'}
                  </button>
                </div>
                
                <div className="hidden md:flex items-center gap-4">
                  <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-2 px-5 rounded-full text-sm transition-all duration-300 shadow-lg shadow-[#6351d5]/20 hover:shadow-[#6351d5]/40 transform hover:-translate-y-0.5 whitespace-nowrap">{t.nav.cta}</a>
                </div>
                <div className="md:hidden flex items-center gap-4">
                    <button onClick={toggleLang} className="text-[#032149] font-bold text-sm">{lang === 'es' ? 'EN' : 'ES'}</button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#032149] hover:text-[#6351d5] focus:outline-none"><Menu className="h-6 w-6" /></button>
                </div>
              </div>
            </div>