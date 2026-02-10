import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  Bot,
  Quote,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase-client';

interface SEOMetric {
  id: string;
  date: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
}

interface GEOTest {
  id: string;
  date: string;
  platform: string;
  prompt: string;
  mentioned: boolean;
  sentiment: string;
}

interface ChecklistItem {
  id: string;
  completedAt: string;
  type: 'weekly' | 'monthly';
}

export default function DashboardPage() {
  const [seoMetrics, setSeoMetrics] = useState<SEOMetric[]>([]);
  const [geoTests, setGeoTests] = useState<GEOTest[]>([]);
  const [lastChecklist, setLastChecklist] = useState<ChecklistItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load latest SEO metrics
      const seoQuery = query(
        collection(db, 'seo_metrics'),
        orderBy('date', 'desc'),
        limit(7)
      );
      const seoSnapshot = await getDocs(seoQuery);
      const seoData = seoSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SEOMetric[];
      setSeoMetrics(seoData);

      // Load latest GEO tests
      const geoQuery = query(
        collection(db, 'geo_tests'),
        orderBy('date', 'desc'),
        limit(5)
      );
      const geoSnapshot = await getDocs(geoQuery);
      const geoData = geoSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GEOTest[];
      setGeoTests(geoData);

      // Load last checklist
      const checklistQuery = query(
        collection(db, 'checklists'),
        orderBy('completedAt', 'desc'),
        limit(1)
      );
      const checklistSnapshot = await getDocs(checklistQuery);
      if (!checklistSnapshot.empty) {
        setLastChecklist({
          id: checklistSnapshot.docs[0].id,
          ...checklistSnapshot.docs[0].data()
        } as ChecklistItem);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats from latest data
  const latestSEO = seoMetrics[0];
  const previousSEO = seoMetrics[1];

  const impressionChange = latestSEO && previousSEO
    ? ((latestSEO.impressions - previousSEO.impressions) / previousSEO.impressions * 100).toFixed(1)
    : null;

  const clickChange = latestSEO && previousSEO
    ? ((latestSEO.clicks - previousSEO.clicks) / previousSEO.clicks * 100).toFixed(1)
    : null;

  const geoMentionRate = geoTests.length > 0
    ? (geoTests.filter(t => t.mentioned).length / geoTests.length * 100).toFixed(0)
    : null;

  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    color
  }: {
    title: string;
    value: string | number;
    change?: string | null;
    icon: any;
    color: string;
  }) => (
    <div className="bg-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-slate-400 text-sm">{title}</span>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-white">{value}</span>
        {change !== null && change !== undefined && (
          <div className={`flex items-center gap-1 text-sm ${parseFloat(change) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {parseFloat(change) >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {change}%
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard SEO & GEO</h1>
        <p className="text-slate-400 mt-2">Resumen de métricas y estado de salud</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Impresiones (SEO)"
          value={latestSEO?.impressions?.toLocaleString() || '—'}
          change={impressionChange}
          icon={Eye}
          color="bg-blue-500"
        />
        <StatCard
          title="Clics Orgánicos"
          value={latestSEO?.clicks?.toLocaleString() || '—'}
          change={clickChange}
          icon={MousePointer}
          color="bg-green-500"
        />
        <StatCard
          title="Menciones GEO"
          value={geoMentionRate ? `${geoMentionRate}%` : '—'}
          icon={Bot}
          color="bg-purple-500"
        />
        <StatCard
          title="Posición Media"
          value={latestSEO?.position?.toFixed(1) || '—'}
          icon={TrendingUp}
          color="bg-orange-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Validation Status */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Estado de Validación</h2>

          <div className="space-y-3">
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-white">Google Search Console</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>

            <a
              href="https://www.bing.com/webmasters"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-white">Bing Webmaster Tools</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>

            <a
              href="https://validator.schema.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <span className="text-white">Schema Validator</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          <Link
            to="/admin/validation/"
            className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Ver Validación Completa <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Recent GEO Tests */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Últimas Pruebas GEO</h2>

          {geoTests.length > 0 ? (
            <div className="space-y-3">
              {geoTests.slice(0, 3).map((test) => (
                <div
                  key={test.id}
                  className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {test.mentioned ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                    <div>
                      <p className="text-white text-sm truncate max-w-[200px]">{test.prompt}</p>
                      <p className="text-slate-400 text-xs">{test.platform}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    test.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' :
                    test.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {test.sentiment}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No hay pruebas GEO registradas</p>
              <p className="text-sm">Empieza a trackear tus menciones en IA</p>
            </div>
          )}

          <Link
            to="/admin/geo/"
            className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-[#6351d5] hover:bg-[#5242b8] text-white rounded-lg transition-colors"
          >
            Nueva Prueba GEO <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Checklist Reminder */}
      <div className="bg-gradient-to-r from-[#6351d5] to-[#3f45fe] rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Checklist Semanal</h2>
            <p className="text-white/70 mt-1">
              {lastChecklist
                ? `Último completado: ${new Date(lastChecklist.completedAt).toLocaleDateString('es-ES')}`
                : 'No has completado ningún checklist aún'}
            </p>
          </div>
          <Link
            to="/admin/checklist/"
            className="px-6 py-3 bg-white text-[#6351d5] font-bold rounded-lg hover:bg-slate-100 transition-colors"
          >
            Ir al Checklist
          </Link>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Guía Rápida</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <h3 className="font-bold text-white mb-2">1. Validación Técnica</h3>
            <p className="text-slate-400 text-sm">Verifica Schema, robots.txt y estado de indexación semanalmente.</p>
          </div>
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <h3 className="font-bold text-white mb-2">2. Métricas SEO</h3>
            <p className="text-slate-400 text-sm">Registra impresiones y clics de GSC para ver tendencias.</p>
          </div>
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <h3 className="font-bold text-white mb-2">3. Pruebas GEO</h3>
            <p className="text-slate-400 text-sm">Pregunta a ChatGPT/Perplexity sobre tu marca y registra resultados.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
