'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Download, ExternalLink, Users, TrendingUp, Search, Filter } from 'lucide-react';

const APP_ID = 'growth4u-public-app';

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  leadMagnet: string;
  createdAt: { seconds: number } | null;
}

const LEAD_MAGNET_LABELS: Record<string, string> = {
  'cac-sostenible': 'CAC Sostenible',
  'meseta-de-crecimiento': 'Meseta de Crecimiento',
  'sistema-de-growth': 'Sistema de Growth',
  'david-vs-goliat': 'David vs Goliat',
  'kit-de-liberacion': 'Kit de Liberación',
  'dashboard-attribution': 'Dashboard Attribution',
};

const LEAD_MAGNET_COLORS: Record<string, string> = {
  'cac-sostenible': 'bg-purple-500/20 text-purple-300',
  'meseta-de-crecimiento': 'bg-blue-500/20 text-blue-300',
  'sistema-de-growth': 'bg-green-500/20 text-green-300',
  'david-vs-goliat': 'bg-orange-500/20 text-orange-300',
  'kit-de-liberacion': 'bg-pink-500/20 text-pink-300',
  'dashboard-attribution': 'bg-cyan-500/20 text-cyan-300',
};

function getLeadMagnetKey(leadMagnet: string): string {
  // Handle compound values like "kit-de-liberacion|phone:...|bottleneck:..."
  const base = leadMagnet.split('|')[0];
  return base;
}

function getLeadMagnetLabel(leadMagnet: string): string {
  const key = getLeadMagnetKey(leadMagnet);
  return LEAD_MAGNET_LABELS[key] || key;
}

function getLeadMagnetColor(leadMagnet: string): string {
  const key = getLeadMagnetKey(leadMagnet);
  return LEAD_MAGNET_COLORS[key] || 'bg-slate-500/20 text-slate-300';
}

function formatDate(ts: { seconds: number } | null): string {
  if (!ts) return '—';
  return new Date(ts.seconds * 1000).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
}

function getExtraInfo(leadMagnet: string): string {
  const parts = leadMagnet.split('|');
  if (parts.length <= 1) return '';
  return parts.slice(1).join(' · ');
}

export default function LeadMagnetsAdmin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterLM, setFilterLM] = useState('all');

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const leadsRef = collection(db, 'artifacts', APP_ID, 'public', 'data', 'leads');
      const q = query(leadsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];
      setLeads(data);
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = leads.filter(lead => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.email?.toLowerCase().includes(search.toLowerCase()) ||
      lead.company?.toLowerCase().includes(search.toLowerCase());
    const matchesLM = filterLM === 'all' || getLeadMagnetKey(lead.leadMagnet) === filterLM;
    return matchesSearch && matchesLM;
  });

  // Stats per lead magnet
  const stats = Object.entries(LEAD_MAGNET_LABELS).map(([key, label]) => ({
    key,
    label,
    count: leads.filter(l => getLeadMagnetKey(l.leadMagnet) === key).length,
    color: LEAD_MAGNET_COLORS[key],
  }));

  const exportCSV = () => {
    const rows = [
      ['Fecha', 'Nombre', 'Email', 'Empresa', 'Lead Magnet', 'Info extra'],
      ...filtered.map(l => [
        formatDate(l.createdAt),
        l.name,
        l.email,
        l.company,
        getLeadMagnetLabel(l.leadMagnet),
        getExtraInfo(l.leadMagnet),
      ])
    ];
    const csv = rows.map(r => r.map(c => `"${(c || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Lead Magnets</h1>
          <p className="text-slate-400 mt-1">{leads.length} leads en total</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#6351d5] hover:bg-[#5242b8] text-white rounded-lg transition-colors text-sm font-medium"
        >
          <Download className="w-4 h-4" /> Exportar CSV
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map(s => (
          <button
            key={s.key}
            onClick={() => setFilterLM(filterLM === s.key ? 'all' : s.key)}
            className={`p-4 rounded-xl text-left transition-all border-2 ${
              filterLM === s.key
                ? 'border-[#6351d5] bg-[#6351d5]/10'
                : 'border-transparent bg-slate-800 hover:bg-slate-700'
            }`}
          >
            <p className="text-2xl font-bold text-white">{s.count}</p>
            <p className="text-xs text-slate-400 mt-1 leading-tight">{s.label}</p>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, email o empresa..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#6351d5]"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={filterLM}
            onChange={e => setFilterLM(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#6351d5] appearance-none"
          >
            <option value="all">Todos los lead magnets</option>
            {Object.entries(LEAD_MAGNET_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-400">
            <div className="animate-spin w-6 h-6 border-2 border-[#6351d5] border-t-transparent rounded-full mr-3" />
            Cargando leads...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <Users className="w-12 h-12 mb-3 opacity-30" />
            <p>{leads.length === 0 ? 'Aún no hay leads registrados' : 'No hay resultados para esta búsqueda'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wide">Fecha</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wide">Nombre</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wide">Email</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wide">Empresa</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wide">Lead Magnet</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wide">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filtered.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap">{formatDate(lead.createdAt)}</td>
                    <td className="px-6 py-4 text-sm text-white font-medium">{lead.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      <a href={`mailto:${lead.email}`} className="hover:text-[#45b6f7] transition-colors">{lead.email}</a>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{lead.company}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getLeadMagnetColor(lead.leadMagnet)}`}>
                        {getLeadMagnetLabel(lead.leadMagnet)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 max-w-[200px] truncate">
                      {getExtraInfo(lead.leadMagnet) || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Links to lead magnets */}
      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">URLs de Lead Magnets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(LEAD_MAGNET_LABELS).map(([key, label]) => (
            <a
              key={key}
              href={`/recursos/${key}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors group"
            >
              <span className="text-sm text-slate-300 group-hover:text-white">{label}</span>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-slate-300 flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
