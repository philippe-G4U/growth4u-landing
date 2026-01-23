'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  Save,
  X,
  FileText,
  Image as ImageIcon,
  Clock,
  User,
  Tag,
  ExternalLink,
  Rocket,
  Loader2,
  CheckCircle
} from 'lucide-react';
import { getAllPosts, createPost, updatePost, deletePost, BlogPost, BlogPostInput, createSlug } from '@/lib/firebase';

const NETLIFY_BUILD_HOOK = 'https://api.netlify.com/build_hooks/69738cc3fc679a8f858929cd';

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);
  const [publishAfterSave, setPublishAfterSave] = useState(true);

  const [formData, setFormData] = useState<BlogPostInput>({
    title: '',
    category: 'Estrategia',
    excerpt: '',
    content: '',
    image: '',
    readTime: '5 min lectura',
    author: 'Equipo Growth4U'
  });

  const categories = [
    'Estrategia',
    'Growth',
    'Marketing',
    'Fintech',
    'SEO',
    'GEO',
    'Producto',
    'Ventas'
  ];

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    const allPosts = await getAllPosts();
    setPosts(allPosts);
    setLoading(false);
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      category: 'Estrategia',
      excerpt: '',
      content: '',
      image: '',
      readTime: '5 min lectura',
      author: 'Equipo Growth4U'
    });
    setShowEditor(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      readTime: post.readTime,
      author: post.author
    });
    setShowEditor(true);
  };

  const handleDeletePost = async (post: BlogPost) => {
    if (!confirm(`¿Eliminar "${post.title}"? Esta acción no se puede deshacer.`)) return;

    try {
      await deletePost(post.id);
      loadPosts();
      // Trigger deploy after delete
      if (publishAfterSave) {
        triggerDeploy();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error al eliminar el post');
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

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('El título es obligatorio');
      return;
    }

    setSaving(true);
    try {
      if (editingPost) {
        await updatePost(editingPost.id, formData);
      } else {
        await createPost(formData);
      }
      setShowEditor(false);
      loadPosts();

      // Trigger deploy after save if checkbox is checked
      if (publishAfterSave) {
        triggerDeploy();
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error al guardar el post');
    } finally {
      setSaving(false);
    }
  };

  const previewSlug = createSlug(formData.title);

  return (
    <div className="space-y-8">
      {/* Deploy Status */}
      {(deploying || deploySuccess) && (
        <div className={`rounded-xl p-4 flex items-center gap-3 ${
          deploySuccess ? 'bg-green-500/20 border border-green-500/30' : 'bg-blue-500/20 border border-blue-500/30'
        }`}>
          {deploying ? (
            <>
              <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
              <span className="text-blue-300">Publicando cambios en la web...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-300">Deploy iniciado. Los cambios estarán visibles en ~1 minuto.</span>
            </>
          )}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestión de Blog</h1>
          <p className="text-slate-400 mt-2">Crea, edita y elimina posts del blog</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={triggerDeploy}
            disabled={deploying}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white rounded-lg transition-colors"
            title="Publicar cambios manualmente"
          >
            <Rocket className="w-5 h-5" />
            Publicar
          </button>
          <button
            onClick={handleNewPost}
            className="flex items-center gap-2 px-4 py-2 bg-[#6351d5] hover:bg-[#5242b8] text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nuevo Post
          </button>
        </div>
      </div>

      {/* Auto-publish toggle */}
      <div className="bg-slate-800 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-white font-medium">Publicar automáticamente</p>
          <p className="text-slate-400 text-sm">Los cambios se publican automáticamente al guardar o eliminar un post</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={publishAfterSave}
            onChange={(e) => setPublishAfterSave(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6351d5]"></div>
        </label>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Total Posts</span>
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white mt-2">{posts.length}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Categorías</span>
            <Tag className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white mt-2">
            {new Set(posts.map(p => p.category)).size}
          </p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Último Post</span>
            <Clock className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-lg font-medium text-white mt-2 truncate">
            {posts[0]?.title || 'Sin posts'}
          </p>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-slate-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700">
          <h2 className="text-lg font-bold text-white">Posts Publicados</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400">Cargando...</div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <p className="text-slate-400">No hay posts publicados</p>
            <button
              onClick={handleNewPost}
              className="mt-4 px-4 py-2 bg-[#6351d5] hover:bg-[#5242b8] text-white rounded-lg transition-colors"
            >
              Crear primer post
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-700">
            {posts.map((post) => (
              <div key={post.id} className="p-4 hover:bg-slate-700/30 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                    {post.image ? (
                      <img src={post.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-slate-500" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white truncate">{post.title}</h3>
                    <p className="text-slate-400 text-sm mt-1 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span className="px-2 py-0.5 bg-slate-700 rounded">{post.category}</span>
                      <span>{post.readTime}</span>
                      <span>{post.createdAt?.toLocaleDateString('es-ES') || 'Sin fecha'}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://growth4u.io/blog/${post.slug}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-400 hover:text-white transition-colors"
                      title="Ver post"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleEditPost(post)}
                      className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post)}
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-black/70 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-slate-800 rounded-xl w-full max-w-4xl my-8">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
              <h2 className="text-xl font-bold text-white">
                {editingPost ? 'Editar Post' : 'Nuevo Post'}
              </h2>
              <button
                onClick={() => setShowEditor(false)}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Editor Form */}
            <form onSubmit={handleSavePost} className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6351d5]"
                  placeholder="Título del post"
                  required
                />
                {formData.title && (
                  <p className="text-slate-500 text-xs mt-1">
                    URL: /blog/{previewSlug}/
                  </p>
                )}
              </div>

              {/* Category & Read Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Categoría
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6351d5]"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Tiempo de lectura
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6351d5]"
                    placeholder="5 min lectura"
                  />
                </div>
              </div>

              {/* Author & Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Autor
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6351d5]"
                    placeholder="Equipo Growth4U"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    URL de imagen
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6351d5]"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Extracto (para preview y SEO)
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6351d5] h-24"
                  placeholder="Breve descripción del post..."
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Contenido (Markdown)
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6351d5] h-96 font-mono text-sm"
                  placeholder="# Título&#10;&#10;Tu contenido en Markdown..."
                />
                <p className="text-slate-500 text-xs mt-1">
                  Usa Markdown para formatear: # Títulos, **negrita**, *cursiva*, - listas, etc.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setShowEditor(false)}
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-[#6351d5] hover:bg-[#5242b8] disabled:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Guardando...' : 'Guardar Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-2">¿Cómo funciona?</h3>
        <p className="text-slate-400 text-sm">
          Con "Publicar automáticamente" activado, cada vez que guardes o elimines un post se iniciará un deploy en Netlify.
          Los cambios estarán visibles en <span className="text-white">~1-2 minutos</span>. El sitio usa generación estática (SSG) para máxima velocidad y SEO.
        </p>
        <p className="text-slate-500 text-xs mt-3">
          Si necesitas publicar manualmente, usa el botón "Publicar" en la cabecera o visita{' '}
          <a href="https://app.netlify.com" target="_blank" rel="noopener noreferrer" className="text-[#6351d5] hover:underline">
            Netlify
          </a>
        </p>
      </div>
    </div>
  );
}
