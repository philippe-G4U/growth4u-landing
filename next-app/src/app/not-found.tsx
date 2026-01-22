import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-[#6351d5]/10 rounded-full mb-8">
          <span className="text-6xl font-extrabold text-[#6351d5]">404</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#032149] mb-4">Página no encontrada</h1>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg"
          >
            <Home className="w-5 h-5" /> Ir al inicio
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 bg-white border border-slate-300 text-[#032149] hover:bg-slate-50 font-bold py-3 px-6 rounded-full transition-all"
          >
            <ArrowLeft className="w-5 h-5" /> Ver blog
          </Link>
        </div>
      </div>
    </div>
  );
}
