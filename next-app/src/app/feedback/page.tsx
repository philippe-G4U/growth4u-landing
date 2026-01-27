'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  MessageSquare,
  Target,
  Users,
  Lightbulb,
  BarChart3,
  Handshake,
  Star,
  Send,
  CheckCircle,
  Loader2,
  ExternalLink,
} from 'lucide-react';

interface FormData {
  // Sobre el reto inicial
  mainChallenge: string;
  howIdentifiedProblem: string;
  // Sobre la colaboración
  teamIntegration: string;
  proposedSolutions: string;
  technicalExecution: string;
  // Sobre la solución implementada
  quizFlowHighlights: string;
  iterativeApproach: string;
  // Sobre los resultados
  conversionComparison: string;
  autonomousImprovement: string;
  scalingConfidence: string;
  // Sobre la experiencia
  wouldRecommend: string;
  standoutAspects: string;
  // Pregunta abierta
  additionalComments: string;
  // Datos del cliente
  companyName: string;
  contactName: string;
  contactEmail: string;
}

const initialFormData: FormData = {
  mainChallenge: '',
  howIdentifiedProblem: '',
  teamIntegration: '',
  proposedSolutions: '',
  technicalExecution: '',
  quizFlowHighlights: '',
  iterativeApproach: '',
  conversionComparison: '',
  autonomousImprovement: '',
  scalingConfidence: '',
  wouldRecommend: '',
  standoutAspects: '',
  additionalComments: '',
  companyName: '',
  contactName: '',
  contactEmail: '',
};

// URL del webhook - Configura aquí tu webhook de Make/Zapier para Notion
const WEBHOOK_URL = process.env.NEXT_PUBLIC_FEEDBACK_WEBHOOK_URL || '';

const TRUSTPILOT_URL = 'https://www.trustpilot.com/evaluate/growth4u.io';

function SectionHeader({ icon: Icon, title, subtitle }: { icon: React.ComponentType<{ className?: string }>; title: string; subtitle?: string }) {
  return (
    <div className="mb-6 pb-4 border-b border-slate-200">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-[#6351d5]/10 p-2 rounded-xl">
          <Icon className="w-5 h-5 text-[#6351d5]" />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-[#032149]">{title}</h3>
      </div>
      {subtitle && <p className="text-slate-500 text-sm ml-11">{subtitle}</p>}
    </div>
  );
}

function QuestionField({ label, name, value, onChange, placeholder, required = false }: {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (name: keyof FormData, value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="mb-6">
      <label className="block text-[#032149] font-semibold mb-2 text-sm">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={3}
        className="w-full p-4 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-[#6351d5] focus:border-transparent transition-all resize-none text-slate-700 placeholder-slate-400"
      />
    </div>
  );
}

function InputField({ label, name, value, onChange, placeholder, type = 'text', required = false }: {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (name: keyof FormData, value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="mb-4">
      <label className="block text-[#032149] font-semibold mb-2 text-sm">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full p-4 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-[#6351d5] focus:border-transparent transition-all text-slate-700 placeholder-slate-400"
      />
    </div>
  );
}

export default function FeedbackPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (WEBHOOK_URL) {
        const response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            submittedAt: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error('Error al enviar el formulario');
        }
      } else {
        // Si no hay webhook configurado, solo logueamos
        console.log('Feedback submitted:', formData);
      }

      setIsSubmitted(true);
    } catch (err) {
      setError('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
      console.error('Error submitting feedback:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#45b6f7] selection:text-white">
        <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-0 cursor-pointer">
              <img src="https://i.imgur.com/imHxGWI.png" alt="Growth4U" className="h-6 w-auto" />
            </Link>
            <Link href="/" className="text-sm font-bold text-[#6351d5] flex items-center gap-2 hover:underline">
              <ArrowLeft className="w-4 h-4" /> Volver a Home
            </Link>
          </div>
        </nav>

        <div className="pt-32 pb-20 max-w-2xl mx-auto px-6">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#032149] mb-4">
              ¡Gracias por tu feedback!
            </h1>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Tu opinión es muy valiosa para nosotros y nos ayuda a seguir mejorando.
              Apreciamos enormemente el tiempo que has dedicado a completar este formulario.
            </p>

            <div className="bg-gradient-to-br from-[#effcfd] to-[#f0f4ff] p-8 rounded-2xl border border-[#0faec1]/20 mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
              </div>
              <h2 className="text-lg font-bold text-[#032149] mb-3">
                ¿Te gustaría compartir tu experiencia en Trustpilot?
              </h2>
              <p className="text-slate-600 text-sm mb-6">
                Tu reseña ayuda a otras empresas a conocer nuestro trabajo y a nosotros a seguir creciendo.
              </p>
              <a
                href={TRUSTPILOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#00b67a] hover:bg-[#009567] text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg"
              >
                <Star className="w-5 h-5" />
                Dejar reseña en Trustpilot
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#6351d5] font-bold hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Volver a la página principal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#45b6f7] selection:text-white">
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-0 cursor-pointer">
            <img src="https://i.imgur.com/imHxGWI.png" alt="Growth4U" className="h-6 w-auto" />
          </Link>
          <Link href="/" className="text-sm font-bold text-[#6351d5] flex items-center gap-2 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Volver a Home
          </Link>
        </div>
      </nav>

      <div className="pt-32 pb-20 max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 md:p-12 lg:p-16 rounded-3xl shadow-xl border border-slate-100">
          {/* Header */}
          <div className="text-center mb-12 pb-8 border-b border-slate-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#6351d5]/10 rounded-2xl mb-6">
              <MessageSquare className="w-8 h-8 text-[#6351d5]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#032149] mb-4">
              Formulario de Feedback
            </h1>
            <p className="text-slate-600 max-w-xl mx-auto leading-relaxed">
              Gracias por tomarte unos minutos para responder. Tu feedback nos ayudará a documentar
              nuestra colaboración y compartir aprendizajes con otros equipos.
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Datos del cliente */}
            <div className="bg-slate-50 p-6 rounded-2xl">
              <SectionHeader icon={Users} title="Información de contacto" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Nombre de la empresa"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Ej: Acme Corp"
                  required
                />
                <InputField
                  label="Tu nombre"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="Ej: María García"
                  required
                />
              </div>
              <InputField
                label="Email de contacto"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="Ej: maria@acme.com"
                type="email"
                required
              />
            </div>

            {/* Sobre el reto inicial */}
            <div>
              <SectionHeader
                icon={Target}
                title="Sobre el reto inicial"
                subtitle="Cuéntanos sobre la situación antes de trabajar juntos"
              />
              <QuestionField
                label="1. ¿Cuál era el principal reto de negocio que teníais antes de trabajar con Growth4U?"
                name="mainChallenge"
                value={formData.mainChallenge}
                onChange={handleChange}
                placeholder="Describe el principal desafío que enfrentaba tu empresa..."
                required
              />
              <QuestionField
                label="2. ¿Cómo os ayudó Growth4U a identificar y entender el problema real?"
                name="howIdentifiedProblem"
                value={formData.howIdentifiedProblem}
                onChange={handleChange}
                placeholder="Cuéntanos cómo fue el proceso de diagnóstico..."
              />
            </div>

            {/* Sobre la colaboración */}
            <div>
              <SectionHeader
                icon={Handshake}
                title="Sobre la colaboración y el enfoque"
                subtitle="Tu experiencia trabajando con nuestro equipo"
              />
              <QuestionField
                label="3. ¿Cómo describirías la forma en que el equipo de Growth4U se integró con vosotros para entender el negocio en profundidad?"
                name="teamIntegration"
                value={formData.teamIntegration}
                onChange={handleChange}
                placeholder="Describe cómo fue la integración del equipo..."
              />
              <QuestionField
                label="4. ¿Qué soluciones propuso Growth4U y qué te pareció el enfoque?"
                name="proposedSolutions"
                value={formData.proposedSolutions}
                onChange={handleChange}
                placeholder="Cuéntanos sobre las propuestas y tu opinión..."
              />
              <QuestionField
                label="5. ¿Cómo valorarías la ejecución técnica del proyecto por parte de Growth4U?"
                name="technicalExecution"
                value={formData.technicalExecution}
                onChange={handleChange}
                placeholder="Comparte tu valoración sobre la implementación técnica..."
              />
            </div>

            {/* Sobre la solución */}
            <div>
              <SectionHeader
                icon={Lightbulb}
                title="Sobre la solución implementada"
                subtitle="Los resultados del trabajo realizado"
              />
              <QuestionField
                label="6. ¿Qué aspectos del quiz y el nuevo flujo de conversión destacarías?"
                name="quizFlowHighlights"
                value={formData.quizFlowHighlights}
                onChange={handleChange}
                placeholder="¿Qué elementos te parecieron más efectivos?"
              />
              <QuestionField
                label="7. ¿Cómo valorarías el enfoque de crear un sistema que se pueda iterar y mejorar con el tiempo, en lugar de una acción puntual?"
                name="iterativeApproach"
                value={formData.iterativeApproach}
                onChange={handleChange}
                placeholder="Tu opinión sobre el enfoque iterativo..."
              />
            </div>

            {/* Sobre los resultados */}
            <div>
              <SectionHeader
                icon={BarChart3}
                title="Sobre los resultados"
                subtitle="El impacto en tu negocio"
              />
              <QuestionField
                label="8. ¿Cómo compararías la conversión de visitas a Free Trial antes vs después del proyecto?"
                name="conversionComparison"
                value={formData.conversionComparison}
                onChange={handleChange}
                placeholder="Puedes hablar en términos de 'mejor/peor', 'x veces más', o porcentajes de mejora, sin necesidad de compartir números absolutos..."
              />
              <QuestionField
                label="9. ¿Consideráis que el sistema implementado os permite seguir mejorando la conversión de forma autónoma?"
                name="autonomousImprovement"
                value={formData.autonomousImprovement}
                onChange={handleChange}
                placeholder="¿Tenéis las herramientas para seguir optimizando?"
              />
              <QuestionField
                label="10. ¿El nuevo flujo os ha dado más confianza para escalar las campañas de adquisición?"
                name="scalingConfidence"
                value={formData.scalingConfidence}
                onChange={handleChange}
                placeholder="Cuéntanos si os sentís más preparados para escalar..."
              />
            </div>

            {/* Sobre la experiencia */}
            <div>
              <SectionHeader
                icon={Star}
                title="Sobre la experiencia de trabajo"
                subtitle="Tu valoración general"
              />
              <QuestionField
                label="11. ¿Recomendarías trabajar con Growth4U? ¿Por qué?"
                name="wouldRecommend"
                value={formData.wouldRecommend}
                onChange={handleChange}
                placeholder="Tu recomendación y razones..."
                required
              />
              <QuestionField
                label="12. ¿Hay algo que destacarías especialmente de nuestra forma de trabajar?"
                name="standoutAspects"
                value={formData.standoutAspects}
                onChange={handleChange}
                placeholder="¿Qué aspectos te gustaron más?"
              />
            </div>

            {/* Pregunta abierta */}
            <div>
              <SectionHeader
                icon={MessageSquare}
                title="Pregunta abierta (opcional)"
                subtitle="Espacio libre para comentarios adicionales"
              />
              <QuestionField
                label="13. ¿Hay algo más que quieras añadir sobre el proyecto o los resultados?"
                name="additionalComments"
                value={formData.additionalComments}
                onChange={handleChange}
                placeholder="Cualquier comentario adicional es bienvenido..."
              />
            </div>

            {/* Submit button */}
            <div className="pt-6 border-t border-slate-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] disabled:bg-slate-400 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Feedback
                  </>
                )}
              </button>
              <p className="text-xs text-slate-500 mt-4">
                Al enviar este formulario, aceptas que tus respuestas puedan ser utilizadas para mejorar nuestros servicios
                y potencialmente compartidas como caso de estudio (previa aprobación).
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
