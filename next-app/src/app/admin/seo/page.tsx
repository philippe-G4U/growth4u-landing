'use client';

import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Plus,
  Trash2,
  Eye,
  MousePointer,
  Target,
  Percent,
  Calendar,
  Save
} from 'lucide-react';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface SEOMetric {
  id: string;
  date: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
  source: string;
  notes?: string;
}

export default function SEOMetricsPage() {
  const [metrics, setMetrics] = useState<SEOMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMetric, setNewMetric] = useState({
    date: new Date().toISOString().split('T')[0],
    impressions: '',
    clicks: '',
    position: '',
    source: 'Google Search Console',
    notes: ''
  });

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const metricsQuery = query(
        collection(db, 'seo_metrics'),
        orderBy('date', 'desc')
      );
      const snapshot = await getDocs(metricsQuery);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SEOMetric[];
      setMetrics(data);
    } catch (error) {
      console.error('Error loading metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMetric = async (e: React.FormEvent) => {
    e.preventDefault();

    const impressions = parseInt(newMetric.impressions);
    const clicks = parseInt(newMetric.clicks);
    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;

    try {
      await addDoc(collection(db, 'seo_metrics'), {
        date: newMetric.date,
        impressions,
        clicks,
        ctr: parseFloat(ctr.toFixed(2)),
        position: parseFloat(newMetric.position),
        source: newMetric.source,
        notes: newMetric.notes,
        createdAt: new Date().toISOString()
      });

      setNewMetric({
        date: new Date().toISOString().split('T')[0],
        impressions: '',
        clicks: '',
        position: '',
        source: 'Google Search Console',
        notes: ''
      });
      setShowAddForm(false);
      loadMetrics();
    } catch (error) {
      console.error('Error adding metric:', error);
      alert('Error al guardar la métrica');
    }
  };

  const handleDeleteMetric = async (id: string) => {
    if (!confirm('¿Eliminar esta métrica?')) return;

    try {
      await deleteDoc(doc(db, 'seo_metrics', id));
      loadMetrics();
    } catch (error) {
      console.error('Error deleting metric:', error);
    }
  };

  // Calculate trends
  const getChange = (current: number, previous: number) => {
    if (!previous) return null;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const latestMetric = metrics[0];
  const previousMetric = metrics[1];

  // Simple chart data (last 7 entries)
  const chartData = metrics.slice(0, 7).reverse();
  const maxImpressions = Math.max(...chartData.map(m => m.impressions), 1);
  const maxClicks = Math.max(...chartData.map(m => m.clicks), 1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Métricas SEO</h1>
          <p className="text-slate-400 mt-2">Trackea impresiones, clics y posición desde Google Search Console</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#6351d5] hover:bg-[#5242b8] text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Añadir Métrica
        </button>
      </div>

      {/* Quick Stats */}
      {latestMetric && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Impresiones</span>
              <Eye className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-white">{latestMetric.impressions.toLocaleString()}</span>
              {previousMetric && (
                <span className={`text-sm flex items-center gap-1 ${
                  latestMetric.impressions >= previousMetric.impressions ? 'text-green-400' : 'text-red-400'
                }`}>
                  {latestMetric.impressions >= previousMetric.impressions ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {getChange(latestMetric.impressions, previousMetric.impressions)}%
                </span>
              )}
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Clics</span>
              <MousePointer className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-white">{latestMetric.clicks.toLocaleString()}</span>
              {previousMetric && (
                <span className={`text-sm flex items-center gap-1 ${
                  latestMetric.clicks >= previousMetric.clicks ? 'text-green-400' : 'text-red-400'
                }`}>
                  {latestMetric.clicks >= previousMetric.clicks ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {getChange(latestMetric.clicks, previousMetric.clicks)}%
                </span>
              )}
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">CTR</span>
              <Percent className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-white">{latestMetric.ctr.toFixed(2)}%</span>
              {previousMetric && (
                <span className={`text-sm flex items-center gap-1 ${
                  latestMetric.ctr >= previousMetric.ctr ? 'text-green-400' : 'text-red-400'
                }`}>
                  {latestMetric.ctr >= previousMetric.ctr ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {getChange(latestMetric.ctr, previousMetric.ctr)}%
                </span>
              )}
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Posición Media</span>
              <Target className="w-5 h-5 text-orange-400" />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-white">{latestMetric.position.toFixed(1)}</span>
              {previousMetric && (
                <span className={`text-sm flex items-center gap-1 ${
                  latestMetric.position <= previousMetric.position ? 'text-green-400' : 'text-red-400'
                }`}>
                  {latestMetric.position <= previousMetric.position ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {Math.abs(latestMetric.position - previousMetric.position).toFixed(1)} pos
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Simple Chart */}
      {chartData.length > 1 && (
        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Tendencia (Últimos 7 registros)</h2>
          <div className="h-48 flex items-end gap-2">
            {chartData.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex gap-1 items-end h-32">
                  <div
                    className="flex-1 bg-blue-500/50 rounded-t"
                    style={{ height: `${(m.impressions / maxImpressions) * 100}%` }}
                    title={`Impresiones: ${m.impressions}`}
                  />
                  <div
                    className="flex-1 bg-green-500/50 rounded-t"
                    style={{ height: `${(m.clicks / maxClicks) * 100}%` }}
                    title={`Clics: ${m.clicks}`}
                  />
                </div>
                <span className="text-xs text-slate-400">
                  {new Date(m.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500/50 rounded" />
              <span className="text-sm text-slate-400">Impresiones</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500/50 rounded" />
              <span className="text-sm text-slate-400">Clics</span>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Table */}
      <div className="bg-slate-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700">
          <h2 className="text-lg font-bold text-white">Historial de Métricas</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400">Cargando...</div>
        ) : metrics.length === 0 ? (
          <div className="p-8 text-center">
            <Eye className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <p className="text-slate-400">No hay métricas registradas</p>
            <p className="text-slate-500 text-sm mt-1">Añade datos de Google Search Console para empezar</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Impresiones</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Clics</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">CTR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Posición</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Notas</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {metrics.map((metric) => (
                <tr key={metric.id} className="hover:bg-slate-700/30">
                  <td className="px-6 py-4 text-white">
                    {new Date(metric.date).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-6 py-4 text-slate-300">{metric.impressions.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-300">{metric.clicks.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-300">{metric.ctr.toFixed(2)}%</td>
                  <td className="px-6 py-4 text-slate-300">{metric.position.toFixed(1)}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm max-w-[200px] truncate">{metric.notes || '—'}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDeleteMetric(metric.id)}
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Metric Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Añadir Métrica SEO</h2>

            <form onSubmit={handleAddMetric} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Fecha</label>
                <input
                  type="date"
                  value={newMetric.date}
                  onChange={(e) => setNewMetric({ ...newMetric, date: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6351d5]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Impresiones</label>
                  <input
                    type="number"
                    value={newMetric.impressions}
                    onChange={(e) => setNewMetric({ ...newMetric, impressions: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6351d5]"
                    placeholder="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Clics</label>
                  <input
                    type="number"
                    value={newMetric.clicks}
                    onChange={(e) => setNewMetric({ ...newMetric, clicks: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6351d5]"
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Posición Media</label>
                <input
                  type="number"
                  step="0.1"
                  value={newMetric.position}
                  onChange={(e) => setNewMetric({ ...newMetric, position: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6351d5]"
                  placeholder="1.0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Notas (opcional)</label>
                <input
                  type="text"
                  value={newMetric.notes}
                  onChange={(e) => setNewMetric({ ...newMetric, notes: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#6351d5]"
                  placeholder="Ej: Publicado nuevo artículo"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#6351d5] hover:bg-[#5242b8] text-white rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-3">¿Cómo obtener estos datos?</h3>
        <ol className="space-y-2 text-slate-400 text-sm">
          <li>1. Ve a <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-[#6351d5] hover:underline">Google Search Console</a></li>
          <li>2. Selecciona tu propiedad (growth4u.io)</li>
          <li>3. Ve a "Rendimiento" → "Resultados de búsqueda"</li>
          <li>4. Copia los totales de Impresiones, Clics, CTR y Posición media</li>
          <li>5. Registra los datos aquí semanalmente para ver tendencias</li>
        </ol>
      </div>
    </div>
  );
}
