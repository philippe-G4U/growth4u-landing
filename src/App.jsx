import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, ArrowRight, Megaphone, ShieldAlert, Users, ArrowDownRight, 
  CheckCircle2, Cpu, Check, Mail, Calendar, Menu, X, ChevronDown, ChevronUp, 
  ArrowUpRight, Clock, Target, Settings, BarChart3, Search, Zap, Layers, 
  Share2, MessageCircle, Gift, RefreshCw, Rocket, Briefcase, Smartphone, 
  Lock, LayoutDashboard, Users2, Plus, ArrowLeft, Save, Building2,
  TrendingDown, Bot, Landmark
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

export default function App() {
  const [view, setView] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCase, setExpandedCase] = useState(null);
  
  // Estados independientes para cada fase
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
    readTime: '5 min lectura'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const bookingLink = "https://now.growth4u.io/widget/bookings/growth4u_demo";

  // --- DETECTAR MODO ADMIN ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdminMode(true);
    }
  }, []);

  // --- AUTHENTICATION ---
  useEffect(() => {
    if (!auth) return;
    const initAuth = async () => {
      try {
        await signInAnonymously(auth);
      } catch (error) {
        console.error("Error auth:", error);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // --- DATA FETCHING ---
  useEffect(() => {
    if (!db) return;
    try {
      const q = query(
        collection(db, 'blog_posts'),
        orderBy('createdAt', 'desc')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedPosts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(fetchedPosts);
      }, (error) => {
        console.log("Usando posts por defecto");
      });
      return () => unsubscribe();
    } catch (e) {
      console.log("Modo offline para el blog");
    }
  }, [user]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!db) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'blog_posts'), {
        ...newPost,
        createdAt: serverTimestamp(),
        author: "Equipo Growth4U"
      });
      setNewPost({ title: '', category: 'Estrategia', excerpt: '', content: '', image: '', readTime: '5 min' });
      setView('home');
      setTimeout(() => document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setView('post');
    window.scrollTo(0, 0);
  };

  const teamMembers = [
    {
      name: "Alfonso Sainz de Baranda",
      role: "Founder & CEO",
      bio: "Especialista en growth con más de diez años lanzando y escalando productos en fintech.",
      image: "https://i.imgur.com/O3vyNQB.png" 
    },
    {
      name: "Martin Fila",
      role: "Founder & COO",
      bio: "Especialista en growth técnico con más de diez años creando sistemas de automatización y datos que escalan operaciones.",
      image: "https://i.imgur.com/CvKj1sd.png" 
    }
  ];

  const caseStudies = [
    {
      id: 1,
      company: "BNEXT",
      stat: "500K",
      label: "Usuarios activos",
      highlight: "conseguidos en 30 meses",
      summary: "De 0 a 500.000 usuarios en 30 meses, sin gastar millones en publicidad.",
      challenge: "Escalar la base de usuarios en un mercado competitivo sin depender exclusivamente de paid media masivo.",
      solution: "Construimos un sistema de crecimiento basado en confianza y viralidad que transformó a cada usuario en embajador.",
      icon: <Users className="w-6 h-6 text-[#6351d5]" />
    },
    {
      id: 2,
      company: "BIT2ME",
      stat: "-70%",
      label: "Reducción de CAC",
      highlight: "implementando Trust Engine",
      summary: "Redujimos el CAC un 70% implementando el Trust Engine.",
      challenge: "Coste de adquisición disparado por saturación publicitaria y desconfianza en el sector cripto.",
      solution: "Optimizamos datos, segmentación y activación para duplicar el valor de cada cliente y escalar de forma rentable.",
      icon: <BarChart3 className="w-6 h-6 text-[#6351d5]" />
    },
    {
      id: 3,
      company: "GOCARDLESS",
      stat: "10K €",
      label: "MRR alcanzado",
      highlight: "en 6 meses desde lanzamiento",
      summary: "Lanzamiento desde cero en España y Portugal alcanzando 10k MRR rápidamente.",
      challenge: "Entrada en nuevos mercados sin presencia de marca previa.",
      solution: "Estrategia enfocada en contenido, alianzas y ventas inteligentes para generar tracción inmediata.",
      icon: <TrendingUp className="w-6 h-6 text-[#6351d5]" />
    }
  ];

  const defaultPosts = [
    { id: 'd1', category: "Estrategia", title: "La muerte del Paid Media en Fintech", excerpt: "Por qué el modelo de alquiler de atención ya no es rentable en 2024 y cómo pivotar hacia activos propios.", content: "Contenido...", readTime: "5 min lectura", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
    { id: 'd2', category: "Data & Analytics", title: "Cómo calcular tu CAC real sin trampas", excerpt: "La guía definitiva para entender cuánto te cuesta realmente cada usuario activado, más allá del CPC.", content: "Contenido...", readTime: "7 min lectura", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
    { id: 'd3', category: "Trust Engine", title: "Confianza: La nueva moneda de cambio", excerpt: "Cómo construir activos de marca que reduzcan la fricción en la conversión y aumenten el LTV.", content: "Contenido...", readTime: "4 min lectura", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800" }
  ];

  const displayPosts = posts.length > 0 ? posts : defaultPosts;

  // --- RENDER VIEWS ---

  // 1. ADMIN VIEW
  if (view === 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 text-[#032149] font-sans p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Agregar Nuevo Artículo</h2>
            <button onClick={() => setView('home')} className="text-slate-400 hover:text-[#6351d5]">
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleCreatePost} className="space-y-6">
            <input required type="text" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} className="w-full p-3 rounded-xl border border-slate-300 outline-none" placeholder="Título" />
            <button type="submit" disabled={isSubmitting} className="w-full bg-[#6351d5] text-white font-bold py-4 rounded-xl">{isSubmitting ? 'Publicando...' : 'Publicar Artículo'}</button>
          </form>
        </div>
      </div>
    );
  }

  // 2. SINGLE POST VIEW
  if (view === 'post' && selectedPost) {
    return (
      <div className="min-h-screen bg-white text-[#032149] font-sans selection:bg-[#45b6f7] selection:text-white">
         <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
               <div className="flex items-center gap-0 cursor-pointer" onClick={() => setView('home')}>
                  <img src="https://i.imgur.com/imHxGWI.png" alt="Growth4U" className="h-6 w-auto" />
               </div>
               <button onClick={() => setView('home')} className="text-sm font-bold text-[#6351d5] flex items-center gap-2 hover:underline"><ArrowLeft className="w-4 h-4" /> Volver al inicio</button>
            </div>
         </nav>
         <article className="pt-32 pb-20 max-w-3xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 text-[#032149]">{selectedPost.title}</h1>
            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-64 md:h-96 object-cover rounded-3xl shadow-2xl mb-12" />
            <div className="prose prose-lg prose-slate mx-auto"><p>{selectedPost.excerpt}</p></div>
            <div className="mt-20 pt-10 border-t border-slate-200 text-center">
               <h3 className="text-2xl font-bold mb-4">¿Te interesa aplicar esto en tu Fintech?</h3>
               <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all">
                  Agendar Llamada <ArrowRight className="w-5 h-5" />
               </a>
            </div>
         </article>
      </div>
    );
  }

  // 3. MAIN LANDING PAGE VIEW
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
              <div className="hidden md:block">
                <div className="flex items-baseline space-x-8">
                  <a href="#problema" className="hover:text-[#6351d5] transition-colors px-3 py-2 rounded-md text-sm font-medium text-[#032149]">Problema</a>
                  <a href="#resultados" className="hover:text-[#6351d5] transition-colors px-3 py-2 rounded-md text-sm font-medium text-[#032149]">Resultados</a>
                  <a href="#etapas" className="hover:text-[#6351d5] transition-colors px-3 py-2 rounded-md text-sm font-medium text-[#032149]">Metodología</a>
                  <a href="#casos" className="hover:text-[#6351d5] transition-colors px-3 py-2 rounded-md text-sm font-medium text-[#032149]">Casos</a>
                  <a href="#team" className="hover:text-[#6351d5] transition-colors px-3 py-2 rounded-md text-sm font-medium text-[#032149]">Equipo</a>
                  <a href="#blog" className="hover:text-[#6351d5] transition-colors px-3 py-2 rounded-md text-sm font-medium text-[#032149]">Blog</a>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-2 px-5 rounded-full text-sm transition-all duration-300 shadow-lg shadow-[#6351d5]/20 hover:shadow-[#6351d5]/40 transform hover:-translate-y-0.5">Agendar Llamada</a>
              </div>
              <div className="md:hidden flex items-center">
                <button onClick={toggleMenu} className="text-[#032149] hover:text-[#6351d5] focus:outline-none"><Menu className="h-6 w-6" /></button>
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <div className="absolute top-20 left-0 right-0 mx-4 bg-white rounded-2xl border border-slate-100 shadow-2xl overflow-hidden animate-in slide-in-from-top-2">
              <div className="px-4 pt-4 pb-6 space-y-2">
                <a href="#problema" onClick={() => setIsMenuOpen(false)} className="text-[#032149] hover:text-[#6351d5] block px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-50">Problema</a>
                <a href="#resultados" onClick={() => setIsMenuOpen(false)} className="text-[#032149] hover:text-[#6351d5] block px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-50">Resultados</a>
                <a href="#etapas" onClick={() => setIsMenuOpen(false)} className="text-[#032149] hover:text-[#6351d5] block px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-50">Metodología</a>
                <a href="#casos" onClick={() => setIsMenuOpen(false)} className="text-[#032149] hover:text-[#6351d5] block px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-50">Casos</a>
                <a href="#team" onClick={() => setIsMenuOpen(false)} className="text-[#032149] hover:text-[#6351d5] block px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-50">Equipo</a>
                <a href="#blog" onClick={() => setIsMenuOpen(false)} className="text-[#032149] hover:text-[#6351d5] block px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-50">Blog</a>
                <a href={bookingLink} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="text-white bg-[#6351d5] font-bold block px-3 py-3 rounded-xl text-base mt-4 text-center">Agendar Llamada</a>
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
            <span className="text-sm text-[#1a3690] font-bold tracking-wide">Especialistas en Growth Fintech B2B & B2C</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-[#032149]">
            Tu fintech puede crecer más rápido, <br className="hidden md:block" />
            <span className="gradient-text">sin invertir más en marketing.</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed">
            Te ayudamos a crear un motor de crecimiento que perdura en el tiempo y reduce tu CAC apoyándonos en el valor de la confianza.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#6351d5] text-white hover:bg-[#3f45fe] font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-xl shadow-[#6351d5]/20">Empezar ahora <ArrowRight className="w-5 h-5" /></a>
            <a href="#etapas" className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 font-semibold py-4 px-8 rounded-full text-lg transition-all hover:shadow-md">Ver metodología</a>
          </div>
          <div className="mt-24 border-t border-slate-200 pt-10 overflow-hidden relative w-full max-w-6xl mx-auto">
            <p className="text-[#1a3690] text-sm font-bold uppercase tracking-wider mb-8">Empresas validadas por la confianza</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#032149]">El modelo tradicional está roto</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">En un mercado saturado, depender 100% de Paid Media es insostenible.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{title: "Alquiler de Atención", desc: "Si cortas el presupuesto de anuncios, las ventas mueren instantáneamente.", icon: Megaphone}, {title: "CAC Incontrolable", desc: "El coste por clic no para de subir. Sin activos propios, tu rentabilidad se erosiona.", icon: TrendingUp}, {title: "Fricción de Confianza", desc: "El usuario Fintech es escéptico. Atraes tráfico, pero no conviertes por falta de autoridad.", icon: ShieldAlert}, {title: "Churn Silencioso", desc: "Captas registros, no clientes. El LTV nunca llega a cubrir el coste de adquisición.", icon: Users}].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 card-hover transition-all group shadow-sm hover:shadow-lg">
                    <div className="bg-[#3f45fe]/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#3f45fe]/20 transition-colors"><item.icon className="text-[#3f45fe] w-7 h-7" /></div>
                    <h3 className="text-xl font-bold mb-3 text-[#032149]">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: RESULTADOS DEL TRUST ENGINE */}
      <section id="resultados" className="py-24 bg-white relative border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#032149]">Resultados del Trust Engine</h2>
            <p className="text-slate-600 text-lg">Crecimiento predecible y escalable.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-50 p-8 rounded-3xl border-l-4 border-[#6351d5] flex items-start gap-6 hover:shadow-lg transition-shadow">
               <div className="bg-white p-3 rounded-xl shadow-sm"><TrendingDown className="w-8 h-8 text-[#6351d5]"/></div>
               <div>
                  <h3 className="text-xl font-bold text-[#032149] mb-2">Reducción del 70% en CAC</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Sustituimos el gasto publicitario inflado por sistemas de confianza orgánica y viralidad estructurada.</p>
               </div>
            </div>
            {/* Card 2 */}
            <div className="bg-slate-50 p-8 rounded-3xl border-l-4 border-[#3f45fe] flex items-start gap-6 hover:shadow-lg transition-shadow">
               <div className="bg-white p-3 rounded-xl shadow-sm"><Users2 className="w-8 h-8 text-[#3f45fe]"/></div>
               <div>
                  <h3 className="text-xl font-bold text-[#032149] mb-2">Usuarios Activados</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Dejamos atrás las vanity metrics. Atraemos clientes ideales (ICP) listos para usar y pagar.</p>
               </div>
            </div>
            {/* Card 3 */}
            <div className="bg-slate-50 p-8 rounded-3xl border-l-4 border-[#3f45fe] flex items-start gap-6 hover:shadow-lg transition-shadow">
               <div className="bg-white p-3 rounded-xl shadow-sm"><Bot className="w-8 h-8 text-[#3f45fe]"/></div>
               <div>
                  <h3 className="text-xl font-bold text-[#032149] mb-2">Máquina 24/7</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Implementamos automatización e IA para que la captación funcione sin depender de trabajo manual.</p>
               </div>
            </div>
            {/* Card 4 */}
            <div className="bg-slate-50 p-8 rounded-3xl border-l-4 border-[#6351d5] flex items-start gap-6 hover:shadow-lg transition-shadow">
               <div className="bg-white p-3 rounded-xl shadow-sm"><Landmark className="w-8 h-8 text-[#6351d5]"/></div>
               <div>
                  <h3 className="text-xl font-bold text-[#032149] mb-2">Activos que perduran</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Construimos un motor de crecimiento que gana tracción con el tiempo, aumentando el LTV.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* METHODOLOGY & STAGES */}
      <section id="etapas" className="py-24 relative bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#032149]">Una metodología adaptada a tu momento</h2>
            <p className="text-slate-600 text-lg">Selecciona tu etapa para ver cómo aplicamos el sistema.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* FASE INICIAL */}
            <div className={`relative group transition-all duration-500 cursor-pointer ${showInitialPhase ? 'ring-2 ring-[#45b6f7]' : 'hover:-translate-y-1'}`} onClick={() => setShowInitialPhase(!showInitialPhase)}>
              <div className="relative bg-white p-8 rounded-3xl h-full flex flex-col shadow-xl border border-slate-100 hover:border-[#45b6f7] transition-colors">
                <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3"><div className="bg-[#45b6f7]/10 p-2 rounded-lg"><Target className="w-6 h-6 text-[#45b6f7]"/></div><h3 className="text-2xl font-bold text-[#032149] uppercase tracking-wider">Fase Inicial</h3></div>
                  <span className="px-3 py-1 bg-[#45b6f7]/10 text-[#1a3690] text-xs font-bold rounded-full border border-[#45b6f7]/20">0 → PMF</span>
                </div>
                <p className="text-slate-600 text-sm mb-6 font-medium">Para fintechs que tienen producto y necesitan estructurar su crecimiento.</p>
                <div className="space-y-4 flex-grow mb-6">
                  <div className="flex items-start gap-3"><div className="mt-1 bg-[#45b6f7]/10 p-1 rounded-full"><Check className="w-3 h-3 text-[#45b6f7]"/></div><span className="text-slate-600 text-sm"><strong>Primera 500 clientes cualificados</strong> en 90-60 días con retorno ROI inmediato.</span></div>
                  <div className="flex items-start gap-3"><div className="mt-1 bg-[#45b6f7]/10 p-1 rounded-full"><Lock className="w-3 h-3 text-[#45b6f7]"/></div><span className="text-slate-600 text-sm">Construcción de <strong>Trust Fortress</strong> (Blogs/Foros).</span></div>
                  <div className="flex items-start gap-3"><div className="mt-1 bg-[#45b6f7]/10 p-1 rounded-full"><Check className="w-3 h-3 text-[#45b6f7]"/></div><span className="text-slate-600 text-sm">Creación de producto y su <strong>customer journey</strong>.</span></div>
                  <div className="flex items-start gap-3"><div className="mt-1 bg-[#45b6f7]/10 p-1 rounded-full"><Check className="w-3 h-3 text-[#45b6f7]"/></div><span className="text-slate-600 text-sm">Implementación de herramientas de <strong>automatización y CRM</strong>.</span></div>
                </div>
                <div className="mt-auto pt-6 border-t border-slate-100 flex justify-center">
                   <button className={`flex items-center gap-2 text-sm font-bold transition-all ${showInitialPhase ? 'text-[#45b6f7]' : 'text-slate-400 hover:text-[#45b6f7]'}`}>{showInitialPhase ? 'Ocultar Proceso' : 'Ver Proceso de Fundamentos'} <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showInitialPhase ? 'rotate-180' : ''}`} /></button>
                </div>
              </div>
            </div>
            {/* FASE ESCALA */}
            <div className={`relative group transition-all duration-500 cursor-pointer ${showFlywheel ? 'ring-2 ring-[#6351d5]' : 'hover:-translate-y-1'}`} onClick={() => setShowFlywheel(!showFlywheel)}>
              <div className="relative bg-white p-8 rounded-3xl h-full flex flex-col shadow-xl border border-slate-100 hover:border-[#6351d5] transition-colors">
                <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3"><div className="bg-[#6351d5]/10 p-2 rounded-lg"><Rocket className="w-6 h-6 text-[#6351d5]"/></div><h3 className="text-2xl font-bold text-[#032149] uppercase tracking-wider">Fase Escala</h3></div>
                  <span className="px-3 py-1 bg-[#6351d5]/10 text-[#6351d5] text-xs font-bold rounded-full border border-[#6351d5]/20">10k → 500k Users</span>
                </div>
                <p className="text-slate-600 text-sm mb-6 font-medium">Para fintechs con tracción que quieren escalar sin disparar costes.</p>
                <div className="space-y-4 flex-grow mb-6">
                  <div className="flex items-start gap-3"><div className="mt-1 bg-[#6351d5]/10 p-1 rounded-full"><Check className="w-3 h-3 text-[#6351d5]"/></div><span className="text-slate-600 text-sm">Optimización de <strong>paid/ads: 3x de resultados</strong>.</span></div>
                  <div className="flex items-start gap-3"><div className="mt-1 bg-[#6351d5]/10 p-1 rounded-full"><Check className="w-3 h-3 text-[#6351d5]"/></div><span className="text-slate-600 text-sm">Estrategia comercial con <strong>10-15 automatizaciones</strong>.</span></div>
                  <div className="flex items-start gap-3"><div className="mt-1 bg-[#6351d5]/10 p-1 rounded-full"><Check className="w-3 h-3 text-[#6351d5]"/></div><span className="text-slate-600 text-sm">Escalado de CAC de 40-60 días a 3-6 meses.</span></div>
                </div>
                <div className="mt-auto pt-6 border-t border-slate-100 flex justify-center">
                   <button className={`flex items-center gap-2 text-sm font-bold transition-all ${showFlywheel ? 'text-[#6351d5]' : 'text-slate-400 hover:text-[#6351d5]'}`}>{showFlywheel ? 'Ocultar Sistema' : 'Ver Motor de Crecimiento'} <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFlywheel ? 'rotate-180' : ''}`} /></button>
                </div>
              </div>
            </div>
          </div>

          {/* EXPANDABLE: INITIAL PHASE DETAILS */}
          <div className={`transition-all duration-700 ease-in-out overflow-hidden mb-8 ${showInitialPhase ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
             <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#45b6f7]/20 shadow-inner relative">
                <div className="text-center mb-10"><h3 className="text-3xl font-bold text-[#032149]">El Camino a la Tracción</h3><p className="text-slate-500 mt-2">Los pasos críticos para validar tu modelo y producto.</p></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                   {[{title: "Competidores & Nichos", icon: Users2, desc: "Análisis de mercado, competidores, nichos y nivel de dolor."}, {title: "ICP & Mensaje", icon: Target, desc: "Definición de Ideal Customer Profile, canales y keywords."}, {title: "Activación", icon: Rocket, desc: "Definición de incentivos y puntos de activación clave."}, {title: "Dashboard", icon: LayoutDashboard, desc: "Configuración de métricas clave para seguimiento."}].map((c,i) => (
                      <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-md">
                         <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4"><c.icon className="w-5 h-5 text-blue-500"/></div>
                         <h4 className="font-bold text-[#032149] mb-2">{c.title}</h4>
                         <p className="text-slate-500 text-xs">{c.desc}</p>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* EXPANDABLE: SCALE PHASE FLYWHEEL */}
          <div className={`transition-all duration-700 ease-in-out overflow-hidden ${showFlywheel ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`}>
             <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#6351d5]/20 shadow-inner relative">
                <div className="flex flex-col items-center justify-center mb-16 relative z-10">
                   <span className="bg-[#6351d5] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-8 inline-block shadow-lg shadow-[#6351d5]/30">Trust Engine</span>
                   <div className="bg-white p-2 rounded-full shadow-2xl border-4 border-white relative overflow-hidden max-w-2xl w-full">
                      <div className="absolute inset-0 bg-[#6351d5]/5 mix-blend-multiply pointer-events-none"></div>
                      <img src="https://i.imgur.com/HwLnSrQ.png" alt="Trust Flywheel System" className="w-full h-auto object-contain mix-blend-multiply"/>
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                   <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-[#45b6f7]/30 via-[#3f45fe]/30 to-[#0faec1]/30 z-0"></div>
                   <div className="bg-slate-50 p-6 rounded-2xl border-t-4 border-[#45b6f7] relative z-10 shadow-lg">
                      <div className="flex items-center gap-3 mb-4"><div className="bg-[#45b6f7]/10 p-2 rounded-lg"><Megaphone className="w-6 h-6 text-[#45b6f7]" /></div><h3 className="text-lg font-bold text-[#032149]">Borrowed Flywheel</h3></div>
                      <ul className="space-y-3"><li className="text-slate-600 text-xs flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#45b6f7] rounded-full"></span> Influencers / UGC</li><li className="text-slate-600 text-xs flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#45b6f7] rounded-full"></span> <strong>Trust Fortress</strong></li></ul>
                   </div>
                   <div className="bg-slate-50 p-6 rounded-2xl border-t-4 border-[#3f45fe] relative z-10 shadow-lg">
                      <div className="flex items-center gap-3 mb-4"><div className="bg-[#3f45fe]/10 p-2 rounded-lg"><RefreshCw className="w-6 h-6 text-[#3f45fe]" /></div><h3 className="text-lg font-bold text-[#032149]">Review Flywheel</h3></div>
                      <ul className="space-y-3"><li className="text-slate-600 text-xs flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#3f45fe] rounded-full"></span> Reviews & Feedback</li><li className="text-slate-600 text-xs flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#3f45fe] rounded-full"></span> <strong>NPS Loop</strong></li></ul>
                   </div>
                   <div className="bg-slate-50 p-6 rounded-2xl border-t-4 border-[#0faec1] relative z-10 shadow-lg">
                      <div className="flex items-center gap-3 mb-4"><div className="bg-[#0faec1]/10 p-2 rounded-lg"><Gift className="w-6 h-6 text-[#0faec1]" /></div><h3 className="text-lg font-bold text-[#032149]">Promise Flywheel</h3></div>
                      <ul className="space-y-3"><li className="text-slate-600 text-xs flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#0faec1] rounded-full"></span> Landing Page Incentivo</li><li className="text-slate-600 text-xs flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#0faec1] rounded-full"></span> <strong>Member Get Member</strong></li></ul>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="casos" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#032149]">Casos de Éxito</h2><p className="text-slate-600">Resultados reales auditados.</p></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-8 relative group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-slate-100" onClick={() => setExpandedCase(expandedCase === item.id ? null : item.id)}>
                <div className="absolute -top-6 right-8 w-14 h-14 bg-white rounded-full flex items-center justify-center border-4 border-slate-100 group-hover:border-[#6351d5] transition-colors shadow-lg">{item.icon}</div>
                <div className="inline-block px-4 py-1.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-full mb-6 uppercase tracking-wider">{item.company}</div>
                <div className="mb-6"><div className="text-5xl font-extrabold text-[#6351d5] mb-2">{item.stat}</div><div className="text-slate-700 font-bold text-lg leading-tight">{item.label}</div></div>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedCase === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}><div className="bg-slate-50 p-4 rounded-xl mb-4"><p className="text-xs font-bold text-slate-400 uppercase mb-1">Reto</p><p className="text-slate-700 text-sm mb-3">{item.challenge}</p><p className="text-xs font-bold text-[#6351d5] uppercase mb-1">Solución</p><p className="text-slate-700 text-sm">{item.solution}</p></div></div>
                <button className="flex items-center text-[#032149] font-bold text-sm group-hover:text-[#6351d5] transition-colors mt-auto">{expandedCase === item.id ? 'Ver menos' : 'Leer caso completo'} <ChevronUp className="w-4 h-4 ml-1" /></button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-slate-50 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-[#032149]">Lo importante es la <span className="text-[#6351d5]">confianza</span>, conócenos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                {teamMembers.map((member, index) => (
                    <div key={index} className="flex flex-col items-center relative">
                        <div className="relative mb-6"><div className="absolute -top-3 -right-3 w-48 h-48 border-t-4 border-r-4 border-[#45b6f7] rounded-tr-3xl z-0"></div><div className="absolute -bottom-3 -left-3 w-48 h-48 border-b-4 border-l-4 border-[#1a3690] rounded-bl-3xl z-0"></div><img src={member.image} alt={member.name} className="w-48 h-48 object-cover rounded-xl shadow-2xl relative z-10 filter grayscale hover:grayscale-0 transition-all duration-500"/></div>
                        <h3 className="text-2xl font-bold text-[#032149] mb-2">{member.name}</h3>
                        <div className="px-6 py-1.5 bg-[#45b6f7]/20 text-[#1a3690] rounded-full font-bold text-sm mb-4">{member.role}</div>
                        <p className="text-slate-600 leading-relaxed text-sm max-w-xs mx-auto">{member.bio}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#032149]">Blog & Insights</h2>
            <button onClick={() => setView('admin')} className={`flex items-center gap-2 bg-slate-100 text-[#6351d5] px-4 py-2 rounded-full font-bold text-xs hover:bg-slate-200 transition-colors ${isAdminMode ? 'block' : 'hidden'}`}><Plus className="w-4 h-4"/> Admin</button>
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
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Escala tu Fintech hoy.</h2>
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <a href="mailto:clients@growth4u.io" className="flex items-center justify-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg shadow-[#6351d5]/30 transition-all hover:scale-105"><Mail className="w-5 h-5" /> clients@growth4u.io</a>
            <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white hover:bg-white/10 font-bold py-4 px-8 rounded-lg text-lg transition-all hover:scale-105"><Calendar className="w-5 h-5" /> Agendar Llamada</a>
          </div>
          <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm"><p>&copy; 2025 Growth4U. All rights reserved.</p></div>
        </div>
      </section>
    </div>
  );
}
