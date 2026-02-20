import { useState, useEffect } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  FileText,
  Rocket,
  Loader2,
  CheckCircle,
  Upload,
  Link,
  Users,
} from 'lucide-react';
import {
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getAllArticleLeads,
  createSlug,
} from '../../../lib/firebase-client';
import type { ArticleInput } from '../../../lib/firebase-client';

const NETLIFY_BUILD_HOOK = 'https://api.netlify.com/build_hooks/69738cc3fc679a8f858929cd';
const CLOUDINARY_CLOUD_NAME = 'dsc0jsbkz';
const CLOUDINARY_UPLOAD_PRESET = 'blog_uploads';

type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
  author: string;
  published: boolean;
  createdAt: Date | null;
};

export default function ArticulosAdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [saving, setSaving] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);
  const [publishAfterSave, setPublishAfterSave] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [showLeads, setShowLeads] = useState<string | null>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);

  const [formData, setFormData] = useState<ArticleInput>({
    title: '',
    category: 'Estrategia',
    excerpt: '',
    content: '',
    image: '',
    readTime: '5 min lectura',
    author: 'Equipo Growth4U',
    published: true,
  });

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    const all = await getAllArticles();
    setArticles(all as Article[]);
    setLoading(false);
  };

  const handleNew = () => {
    setEditingArticle(null);
    setFormData({ title: '', category: 'Estrategia', excerpt: '', content: '', image: '', readTime: '5 min lectura', author: 'Equipo Growth4U', published: true });
    setShowUrlInput(false);
    setShowEditor(true);
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      category: article.category,
      excerpt: article.excerpt,
      content: article.content,
      image: article.image,
      readTime: article.readTime,
      author: article.author,
      published: article.published,
    });
    setShowUrlInput(false);
    setShowEditor(true);
  };

  const handleDelete = async (article: Article) => {
    if (!confirm(`¿Eliminar el artículo "${article.title}"? Esta acción no se puede deshacer.`)) return;
    try {
      await deleteArticle(article.id);
      loadArticles();
      if (publishAfterSave) triggerDeploy();
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Error al eliminar el artículo');
    }
  };

  const triggerDeploy = async () => {
    setDeploying(true);
    setDeploySuccess(false);
    try {
      await fetch(NETLIFY_BUILD_HOOK, { method: 'POST' });
      setDeploySuccess(true);
      setTimeout(() => setDeploySuccess(false), 5000);
    } catch (error) {
      console.error('Error triggering deploy:', error);
    } finally {
      setDeploying(false);
    }
  };

  const uploadImageToCloudinary = async (file: File) => {
    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: fd });
      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      setFormData(prev => ({ ...prev, image: data.secure_url }));
    } catch (error) {
      alert('Error al subir la imagen');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) { alert('El título es obligatorio'); return; }
    setSaving(true);
    try {
      if (editingArticle) {
        await updateArticle(editingArticle.id, formData);
      } else {
        await createArticle(formData);
      }
      setShowEditor(false);
      loadArticles();
      if (publishAfterSave && formData.published) triggerDeploy();
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Error al guardar el artículo');
    } finally {
      setSaving(false);
    }
  };

  const handleShowLeads = async (slug: string) => {
    setShowLeads(slug);
    setLoadingLeads(true);
    const all = await getAllArticleLeads();
    setLeads(all.filter((l: any) => l.articleSlug === slug));
    setLoadingLeads(false);
  };

  const previewSlug = createSlug(formData.title);

  return (
    <div className="space-y-8">
      {/* Deploy Status */}
      {(deploying || deploySuccess) && (
        <div className={`rounded-xl p-4 flex items-center gap-3 ${deploySuccess ? 'bg-green-500/20 border border-green-500/30' : 'bg-blue-500/20 border border-blue-500/30'}`}>
          {deploying ? (
            <><Loader2 className="w-5 h-5 text-blue-400 animate-spin" /><span className="text-blue-300">Publicando cambios en la web...</span></>
          ) : (
            <><CheckCircle className="w-5 h-5 text-green-400" /><span className="text-green-300">Deploy iniciado. Los cambios estarán visibles en ~1 minuto.</span></>
          )}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Artículos</h1>
          <p className="text-slate-400 mt-2">Contenido premium con gate de leads</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={triggerDeploy} disabled={deploying} className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white rounded-lg transition-colors">
            <Rocket className="w-5 h-5" />Publicar
          </button>
          <button onClick={handleNew} className="flex items-center gap-2 px-4 py-2 bg-[#6351d5] hover:bg-[#5242b8] text-white rounded-lg transition-colors">
            <Plus className="w-5 h-5" />Nuevo Artículo
          </button>
        </div>
      </div>

      {/* Auto-publish toggle */}
      <div className="bg-slate-800 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-white font-medium">Publicar automáticamente</p>
          <p className="text-slate-400 text-sm">Los cambios se publican al guardar artículos publicados</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={publishAfterSave} onChange={(e) => setPublishAfterSave(e.target.checked)} className="sr-only peer" />
          <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6351d5]"></div>
        </label>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Total Artículos</span>
            <FileText className="w-5 h-5 text-[#6351d5]" />
          </div>
          <p className="text-3xl font-bold text-white mt-2">{articles.length}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Publicados</span>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white mt-2">{articles.filter(a => a.published).length}</p>
        </div>
      </div>

      {/* Article List */}
      <div className="bg-slate-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700">
          <h2 className="text-lg font-bold text-white">Artículos</h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-slate-400">Cargando...</div>
        ) : articles.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <p className="text-slate-400">No hay artículos todavía</p>
            <button onClick={handleNew} className="mt-4 px-4 py-2 bg-[#6351d5] hover:bg-[#5242b8] text-white rounded-lg transition-colors">
              Crear primer artículo
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-700">
            {articles.map((article) => (
              <div key={article.id} className="p-4 hover:bg-slate-700/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                    {article.image ? (
                      <img src={article.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#6351d5] to-[#3f45fe]">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white truncate">{article.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${article.published ? 'bg-green-500/20 text-green-400' : 'bg-slate-600 text-slate-400'}`}>
                        {article.published ? 'Publicado' : 'Borrador'}
                      </span>
                    </div>
                    <p className="text-xs text-[#6351d5] font-medium mb-1">{article.category}</p>
                    <p className="text-slate-400 text-sm line-clamp-1">{article.excerpt}</p>
                    <p className="text-slate-500 text-xs mt-1">/articulos/{article.slug}/</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleShowLeads(article.slug)} className="p-2 text-slate-400 hover:text-yellow-400 transition-colors" title="Ver leads">
                      <Users className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleEdit(article)} className="p-2 text-slate-400 hover:text-blue-400 transition-colors" title="Editar">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(article)} className="p-2 text-slate-400 hover:text-red-400 transition-colors" title="Eliminar">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Leads Modal */}
      {showLeads && (
        <div className="fixed inset-0 bg-black/70 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-slate-800 rounded-xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-yellow-400" />
                Leads — {showLeads}
              </h2>
              <button onClick={() => setShowLeads(null)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {loadingLeads ? (
                <div className="text-center text-slate-400 py-8"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>
              ) : leads.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No hay leads para este artículo todavía</p>
              ) : (
                <div className="space-y-3">
                  <p className="text-slate-400 text-sm">{leads.length} lead{leads.length !== 1 ? 's' : ''}</p>
                  {leads.map((lead) => (
                    <div key={lead.id} className="bg-slate-700 rounded-lg p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-white font-medium">{lead.nombre}</p>
                          <p className="text-slate-300 text-sm">{lead.email}</p>
                          {lead.tag && <p className="text-slate-400 text-sm mt-1">🔍 "{lead.tag}"</p>}
                        </div>
                        <span className="text-slate-500 text-xs whitespace-nowrap">
                          {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString('es-ES') : '—'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-black/70 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-slate-800 rounded-xl w-full max-w-4xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
              <h2 className="text-xl font-bold text-white">{editingArticle ? 'Editar Artículo' : 'Nuevo Artículo'}</h2>
              <button onClick={() => setShowEditor(false)} className="p-2 text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Title & Category */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Título *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6351d5]"
                    placeholder="Título del artículo"
                    required
                  />
                  {formData.title && <p className="text-slate-500 text-xs mt-1">/articulos/{previewSlug}/</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Categoría</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6351d5]"
                  >
                    <option value="GEO">GEO</option>
                    <option value="Estrategia">Estrategia</option>
                    <option value="Growth">Growth</option>
                    <option value="Producto">Producto</option>
                  </select>
                </div>
              </div>

              {/* Excerpt — preview visible */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Preview (excerpt) <span className="text-slate-500 font-normal">— visible sin gate</span>
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6351d5] h-28"
                  placeholder="Las primeras líneas del artículo que serán visibles antes del gate..."
                />
              </div>

              {/* Content — gated */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Contenido completo <span className="text-slate-500 font-normal">— visible solo tras rellenar el formulario (Markdown)</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6351d5] h-56 font-mono text-sm"
                  placeholder="## Introducción&#10;&#10;Contenido en Markdown..."
                />
              </div>

              {/* Meta */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Tiempo de lectura</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6351d5]"
                    placeholder="5 min lectura"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Autor</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6351d5]"
                    placeholder="Equipo Growth4U"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Imagen destacada</label>
                {formData.image ? (
                  <div className="relative">
                    <img src={formData.image} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-slate-600" />
                    <button type="button" onClick={() => setFormData({ ...formData, image: '' })} className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f?.type.startsWith('image/')) uploadImageToCloudinary(f); }} className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-slate-500 transition-colors">
                    {uploadingImage ? (
                      <div className="flex flex-col items-center gap-2"><Loader2 className="w-8 h-8 text-[#6351d5] animate-spin" /><span className="text-slate-400">Subiendo imagen...</span></div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                        <p className="text-slate-400 text-sm mb-2">Arrastra una imagen aquí o</p>
                        <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg cursor-pointer transition-colors">
                          <Upload className="w-4 h-4" />Seleccionar archivo
                          <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImageToCloudinary(f); }} className="hidden" />
                        </label>
                        <button type="button" onClick={() => setShowUrlInput(!showUrlInput)} className="flex items-center gap-1 mx-auto mt-3 text-slate-500 hover:text-slate-400 text-xs">
                          <Link className="w-3 h-3" />{showUrlInput ? 'Ocultar URL' : 'O pegar URL'}
                        </button>
                        {showUrlInput && (
                          <input type="url" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full mt-3 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6351d5]" placeholder="https://..." />
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Published toggle */}
              <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-4">
                <div>
                  <p className="text-white font-medium">Publicado</p>
                  <p className="text-slate-400 text-sm">El artículo será visible en /articulos/</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6351d5]"></div>
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-700">
                <button type="button" onClick={() => setShowEditor(false)} className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-[#6351d5] hover:bg-[#5242b8] disabled:bg-slate-600 text-white rounded-lg transition-colors">
                  <Save className="w-4 h-4" />
                  {saving ? 'Guardando...' : 'Guardar Artículo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
