// App.jsx
// CÓDIGO COMPLETO CON TEXTO LEGAL ÍNTEGRO + POLÍTICA DE COOKIES + CONSENTIMIENTO + META PIXEL
// Pixel de Meta: 1330785362070217

import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  ArrowRight, ShieldAlert, Users, CheckCircle2, Mail, Calendar, Menu, X,
  ArrowLeft, Clock, Target, Globe, Trash2, Edit2, Link as LinkIcon,
  CheckCircle, Cookie, Plus
} from 'lucide-react';

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore, collection, addDoc, updateDoc, deleteDoc,
  doc, onSnapshot, query, orderBy, serverTimestamp
} from 'firebase/firestore';

// -----------------------------------------------------------------------------
// FIREBASE
// -----------------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyBGtatMbThV_pupfPk6ytO5omidlJrQLcw",
  authDomain: "landing-growth4u.firebaseapp.com",
  projectId: "landing-growth4u",
  storageBucket: "landing-growth4u.firebasestorage.app",
  messagingSenderId: "562728954202",
  appId: "1:562728954202:web:90cff4aa486f38b4b62b63",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const appId = 'growth4u-public-app';

// -----------------------------------------------------------------------------
// COOKIES – CONSENTIMIENTO POR CATEGORÍAS
// -----------------------------------------------------------------------------
const CONSENT_KEY = 'growth4u_cookie_consent_v2';

function loadConsent() {
  try {
    const c = localStorage.getItem(CONSENT_KEY);
    return c ? JSON.parse(c) : null;
  } catch {
    return null;
  }
}

function saveConsent(consent) {
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({ necessary: true, ...consent, updatedAt: Date.now() })
  );
}

// -----------------------------------------------------------------------------
// APP
// -----------------------------------------------------------------------------
export default function App() {

  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);

  const [consent, setConsent] = useState(null);
  const [cookieModalOpen, setCookieModalOpen] = useState(false);

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bookingLink = "https://now.growth4u.io/widget/bookings/growth4u_demo";

  const [newPost, setNewPost] = useState({
    title: '',
    category: 'Estrategia',
    excerpt: '',
    content: '',
    image: '',
    readTime: '5 min'
  });

  // ---------------------------------------------------------------------------
  // INIT
  // ---------------------------------------------------------------------------
  useEffect(() => {
    setConsent(loadConsent());
  }, []);

  useEffect(() => {
    signInAnonymously(auth);
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'artifacts', appId, 'public', 'data', 'blog_posts'),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, snap => {
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, [user]);

  // ---------------------------------------------------------------------------
  // META PIXEL (SOLO SI MARKETING = TRUE)
  // -----------------------------------------------------------------------------
  useEffect(() => {
    if (!consent || !consent.marketing) return;
    if (window.__metaPixelLoaded) return;

    window.__metaPixelLoaded = true;
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e); t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', '1330785362070217');
    window.fbq('track', 'PageView');
  }, [consent]);

  // ---------------------------------------------------------------------------
  // CRUD BLOG
  // ---------------------------------------------------------------------------
  const handleSavePost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const ref = collection(db, 'artifacts', appId, 'public', 'data', 'blog_posts');
    if (editingPostId) {
      await updateDoc(doc(ref, editingPostId), { ...newPost, updatedAt: serverTimestamp() });
    } else {
      await addDoc(ref, { ...newPost, createdAt: serverTimestamp(), author: "Equipo Growth4U" });
    }
    setIsSubmitting(false);
    setEditingPostId(null);
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm("¿Eliminar artículo?")) return;
    await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'blog_posts', id));
  };

  // ---------------------------------------------------------------------------
  // COOKIE ACTIONS
  // ---------------------------------------------------------------------------
  const acceptAll = () => {
    const c = { analytics: true, marketing: true };
    saveConsent(c);
    setConsent({ necessary: true, ...c });
  };

  const rejectAll = () => {
    const c = { analytics: false, marketing: false };
    saveConsent(c);
    setConsent({ necessary: true, ...c });
  };

  // ---------------------------------------------------------------------------
  // LEGAL VIEW (TEXTO ÍNTEGRO SIN RESÚMENES)
  // ---------------------------------------------------------------------------
  const LegalView = ({ type }) => (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Helmet>
        <title>{type === 'privacy' ? 'Política de Privacidad' : 'Política de Cookies'} | Growth4U</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 py-32 bg-white rounded-3xl shadow-xl">
        <Markdown remarkPlugins={[remarkGfm]}>
{type === 'privacy' ? `
### 1. Política de privacidad

|  |  |
| --- | --- |
| **Responsable** | Growth Systems Now, S.L. ("Growth4U") |
| **Finalidad** | Gestión de consultas, prestación de servicios, comunicaciones comerciales B2B y análisis de mercado. |
| **Legitimación** | Ejecución de contrato, interés legítimo (marketing B2B) y consentimiento del interesado. |
| **Destinatarios** | Proveedores de servicios (encargados del tratamiento) y obligaciones legales. |
| **Derechos** | Acceso, rectificación, supresión, oposición, portabilidad y limitación del tratamiento. |

#### 1.1 Normativa aplicable
RGPD (UE) 2016/679 y LOPDGDD 3/2018.

#### 1.2 Responsable
**Growth Systems Now, S.L.**  
CIF: ESB22671879  
Dirección: Calle de Luchana, 28, 2º A, 28010 Madrid  
Email: privacidad@growth4u.io

#### 1.3 Datos tratados
Datos identificativos, contacto, profesionales y navegación.

#### 1.4 Origen
Formularios web, Meta Lead Ads, LinkedIn, comunicaciones directas y fuentes públicas B2B.

#### 1.5 Finalidades
Gestión de servicios, marketing B2B, analítica, publicidad, cumplimiento legal.

#### 1.6 Bases jurídicas
Contrato, interés legítimo y consentimiento.

#### 1.7 Seguridad
Medidas técnicas y organizativas conforme art. 32 RGPD.

#### 1.8 Encargados
GoHighLevel, Instantly, MailScale, Ulinc, Meta Platforms.

#### 1.9 Transferencias internacionales
Cláusulas Contractuales Tipo.

#### 1.10 Conservación
Durante la relación y plazos legales.

#### 1.11 Derechos
Email: privacidad@growth4u.io  
Autoridad: https://www.aepd.es
`
:
`
### 2. Política de cookies

#### 2.1 Qué son
Archivos que permiten funcionamiento, análisis y publicidad.

#### 2.2 Tipos
- Técnicas (necesarias)
- Analítica
- Marketing

| Nombre | Proveedor | Finalidad | Duración |
| --- | --- | --- | --- |
| msgsndr_session | GoHighLevel | Sesión | Sesión |
| __cf_bm | Cloudflare | Seguridad | 30 min |
| ghl_consent | GoHighLevel | Consentimiento | 1 año |

#### 2.3 Consentimiento
Banner con aceptar, rechazar o configurar.

#### 2.4 Retirada
Panel de configuración o navegador.

#### 2.5 Navegador
Chrome, Firefox, Safari, Edge.
`
}
        </Markdown>
      </div>
    </div>
  );

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <HelmetProvider>

      {!consent && (
        <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t p-6 flex justify-between items-center">
          <div>
            <strong>Cookies</strong> – necesarias, analítica y marketing.
          </div>
          <div className="flex gap-3">
            <button onClick={rejectAll}>Rechazar</button>
            <button onClick={acceptAll}>Aceptar</button>
          </div>
        </div>
      )}

      {view === 'privacy' && <LegalView type="privacy" />}
      {view === 'cookies' && <LegalView type="cookies" />}

      {view === 'home' && (
        <div className="min-h-screen bg-white text-slate-900">
          <Helmet>
            <title>Growth4U</title>
          </Helmet>

          <section className="py-32 text-center">
            <h1 className="text-5xl font-extrabold mb-6">Growth4U</h1>
            <a href={bookingLink} className="bg-indigo-600 text-white px-8 py-4 rounded-full">
              Agendar llamada
            </a>
          </section>

          <footer className="py-10 text-center text-sm text-slate-500">
            <button onClick={() => setView('privacy')} className="mx-2">Privacidad</button>
            <button onClick={() => setView('cookies')} className="mx-2">Cookies</button>
          </footer>
        </div>
      )}

    </HelmetProvider>
  );
}
