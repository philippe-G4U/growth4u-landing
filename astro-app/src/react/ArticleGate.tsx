import { useState, useEffect } from 'react';
import { marked } from 'marked';
import { saveArticleLead, getArticleById } from '../lib/firebase-client';

interface Props {
  excerpt: string;
  articleSlug: string;
  articleTitle: string;
  articleId: string;
}

export default function ArticleGate({ excerpt, articleSlug, articleTitle, articleId }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', email: '', tag: '' });
  const [error, setError] = useState('');

  const storageKey = `article_unlocked_${articleSlug}`;

  // Check localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(storageKey)) {
      fetchContent();
    }
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const result = await getArticleById(articleId);
      if (result) {
        setContent(result.content);
        setUnlocked(true);
      }
    } catch (err) {
      console.error('Error fetching content:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.email.trim()) {
      setError('Nombre y email son obligatorios');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await saveArticleLead({
        nombre: formData.nombre.trim(),
        email: formData.email.trim(),
        tag: formData.tag.trim(),
        articleSlug,
        articleTitle,
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, '1');
      }
      await fetchContent();
      setShowForm(false);
    } catch (err) {
      console.error('Error saving lead:', err);
      setError('Hubo un problema. Por favor, inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const excerptHtml = marked.parse(excerpt || '', { gfm: true }) as string;

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="inline-flex items-center gap-3 text-slate-500">
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Cargando artículo completo...</span>
        </div>
      </div>
    );
  }

  if (unlocked && content) {
    const contentHtml = marked.parse(content, { gfm: true }) as string;
    return (
      <div>
        <div className="mb-6 flex items-center gap-2 text-green-600 text-sm font-medium">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          ¡Gracias! Aquí tienes el artículo completo.
        </div>
        <div className="prose prose-lg prose-slate mx-auto text-[#032149]">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Excerpt with gradient fade */}
      <div className="relative">
        <div className="prose prose-lg prose-slate mx-auto text-[#032149]">
          <div dangerouslySetInnerHTML={{ __html: excerptHtml }} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
      </div>

      {/* Gate CTA */}
      {!showForm ? (
        <div className="mt-8 text-center">
          <div className="inline-flex flex-col items-center gap-4 bg-[#6351d5]/5 border border-[#6351d5]/15 rounded-2xl px-8 py-8 max-w-md mx-auto">
            <div className="w-12 h-12 bg-[#6351d5]/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[#6351d5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-bold text-[#032149] text-lg mb-1">Accede al artículo completo</p>
              <p className="text-slate-500 text-sm">Déjanos tus datos y te enviamos acceso inmediato.</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-[#6351d5] hover:bg-[#5242b8] text-white font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105"
            >
              Leer más →
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-8 max-w-md mx-auto">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-[#032149] mb-2">Accede al artículo completo</h3>
            <p className="text-slate-500 text-sm mb-6">Completa tus datos para continuar leyendo.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tu nombre *</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="María García"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6351d5] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tu email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="maria@tuempresa.com"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6351d5] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">¿Sobre qué temática buscabas?</label>
                <input
                  type="text"
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  placeholder="Ej: reducir CAC, GEO para empresas tech..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6351d5] focus:border-transparent"
                />
              </div>

              {/* Hidden — article info */}
              <input type="hidden" value={articleTitle} />

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 bg-[#6351d5] hover:bg-[#5242b8] disabled:bg-slate-300 text-white font-bold rounded-xl transition-all"
                >
                  {submitting ? 'Enviando...' : 'Acceder ahora'}
                </button>
              </div>

              <p className="text-slate-400 text-xs text-center">Sin spam. Puedes darte de baja cuando quieras.</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
