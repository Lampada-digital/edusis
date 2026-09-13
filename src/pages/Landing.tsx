import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Users, BookOpen, Brain, Shield, BarChart3,
  GraduationCap, Calendar, DollarSign, Target, MessageSquare,
  MonitorPlay, CheckCircle2, ArrowRight, Star, Zap, Globe
} from "lucide-react";

interface LandingProps {
  onLogin: () => void;
}

export default function LandingPage({ onLogin }: LandingProps) {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Entrar na EDUGEST</h1>
            <p className="text-sm text-gray-500 mt-1">Gestão inteligente para uma educação melhor</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                defaultValue="admin@edugest.com"
                className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                defaultValue="edugest2026"
                className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
            <button
              onClick={onLogin}
              className="w-full py-2.5 gradient-primary text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Entrar <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            Demo: Colégio EDUGEST — Clique em Entrar para acessar
          </p>
        </div>
        <button
          onClick={() => setShowLogin(false)}
          className="w-full mt-4 text-center text-sm text-white/70 hover:text-white transition-colors"
        >
          ← Voltar ao site
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <header className="gradient-hero text-white">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">EDUGEST</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#features" className="hover:text-white transition-colors">Recursos</a>
            <a href="#modules" className="hover:text-white transition-colors">Módulos</a>
            <a href="#ai" className="hover:text-white transition-colors">Inteligência Artificial</a>
            <a href="#pricing" className="hover:text-white transition-colors">Planos</a>
          </div>
          <button
            onClick={() => setShowLogin(true)}
            className="px-4 py-2 bg-white text-primary-700 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            Acessar Plataforma
          </button>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm text-white/90 mb-6">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              Sistema Operacional Inteligente para Instituições de Ensino
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Gestão inteligente para uma{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                educação melhor
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl">
              Una gestão escolar, AVA, CRM, financeiro, IA e muito mais em uma única plataforma.
              Transforme dados em decisões e potencialize a aprendizagem.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowLogin(true)}
                className="px-6 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-white/90 transition-colors flex items-center gap-2"
              >
                Começar agora <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 border border-white/30 rounded-lg font-semibold text-white hover:bg-white/10 transition-colors">
                Agendar demonstração
              </button>
            </div>
            <div className="flex items-center gap-6 mt-10 text-sm text-white/60">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400" /> 14 dias grátis</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400" /> Sem cartão de crédito</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400" /> Suporte dedicado</div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "500+", label: "Instituições" },
              { value: "150k+", label: "Alunos" },
              { value: "12k+", label: "Professores" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Features */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tudo que sua instituição precisa
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Uma plataforma completa que une gestão, educação e inteligência artificial
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Users, title: "Gestão de Alunos", desc: "Perfil completo, histórico, notas, frequência, competências e muito mais.", color: "bg-blue-50 text-blue-600" },
            { icon: GraduationCap, title: "AVA / LMS", desc: "Cursos online, trilhas, certificados, player premium e tutor IA.", color: "bg-purple-50 text-purple-600" },
            { icon: Brain, title: "Inteligência Artificial", desc: "Agentes especializados, tutor, copiloto, RAG e análise preditiva.", color: "bg-pink-50 text-pink-600" },
            { icon: DollarSign, title: "Financeiro Completo", desc: "Mensalidades, cobranças, inadimplência, fluxo de caixa e relatórios.", color: "bg-green-50 text-green-600" },
            { icon: Target, title: "CRM Educacional", desc: "Captação, pipeline, campanhas, leads e conversão de matrículas.", color: "bg-orange-50 text-orange-600" },
            { icon: BarChart3, title: "BI & Dashboards", desc: "Indicadores em tempo real, dashboards personalizáveis e relatórios.", color: "bg-cyan-50 text-cyan-600" },
            { icon: Calendar, title: "Calendário & Agenda", desc: "Eventos, horários, grade automática e gestão de conflitos.", color: "bg-indigo-50 text-indigo-600" },
            { icon: MessageSquare, title: "Comunicação", desc: "Notificações, e-mail, SMS, WhatsApp e central multicanal.", color: "bg-rose-50 text-rose-600" },
            { icon: Shield, title: "Segurança & LGPD", desc: "RBAC, multi-tenant, auditoria, criptografia e conformidade.", color: "bg-slate-50 text-slate-600" },
            { icon: MonitorPlay, title: "Portal do Aluno", desc: "Experiência personalizada com aulas, notas, atividades e tutor IA.", color: "bg-violet-50 text-violet-600" },
            { icon: BookOpen, title: "Gestão Pedagógica", desc: "Planos de ensino, intervenções, reuniões e acompanhamento.", color: "bg-emerald-50 text-emerald-600" },
            { icon: Globe, title: "White Label", desc: "Personalização completa com logo, cores, domínio e identidade.", color: "bg-amber-50 text-amber-600" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all group"
            >
              <div className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Section */}
      <section id="ai" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-medium mb-4">
                <Brain className="w-4 h-4" /> Inteligência Artificial
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                IA que trabalha com você, não por você
              </h2>
              <p className="text-lg text-gray-500 mb-6">
                Agentes especializados entendem o contexto da sua instituição e ajudam em cada decisão.
              </p>
              <div className="space-y-3">
                {[
                  "Tutor IA personalizado para cada aluno",
                  "Copiloto para professores — planos, atividades, avaliações",
                  "Análise preditiva de evasão e desempenho",
                  "Agentes para financeiro, CRM, secretaria e mais",
                  "Base de conhecimento com RAG e busca semântica",
                  "Automações inteligentes com workflows visuais",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-900">EDUGEST AI</span>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Você</p>
                  <p className="text-sm text-gray-700">Quais alunos precisam de atenção na turma 9º Ano A?</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                  <p className="text-xs text-purple-400 mb-1">EDUGEST AI</p>
                  <p className="text-sm text-gray-700">
                    Encontrei 3 alunos que precisam de atenção:<br />
                    <strong>• Daniel Costa</strong> — Nota 5.9, frequência 68%<br />
                    <strong>• Henrique Gomes</strong> — Nota 5.9, frequência 68%<br />
                    <strong>• Bruno Santos</strong> — Frequência 88%, queda recente<br />
                    <span className="text-purple-600 text-xs mt-2 block">→ Deseja criar um plano de intervenção?</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Planos para cada necessidade</h2>
          <p className="text-lg text-gray-500">Comece grátis, escale quando precisar</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { name: "Starter", price: "R$ 497", students: "Até 200 alunos", features: ["Gestão escolar", "Financeiro básico", "Comunicação", "Suporte e-mail"], highlight: false },
            { name: "Professional", price: "R$ 997", students: "Até 1.000 alunos", features: ["Tudo do Starter", "AVA/LMS completo", "CRM", "IA básica", "BI & Dashboards", "Suporte prioritário"], highlight: true },
            { name: "Enterprise", price: "Sob consulta", students: "Ilimitado", features: ["Tudo do Professional", "IA avançada", "White label", "API completa", "Agentes IA", "Suporte dedicado"], highlight: false },
          ].map((plan, i) => (
            <div key={i} className={`rounded-2xl p-6 ${plan.highlight ? "gradient-primary text-white shadow-xl scale-105" : "bg-white border border-gray-200"}`}>
              <h3 className={`text-lg font-bold ${plan.highlight ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
              <p className={`text-3xl font-bold mt-2 ${plan.highlight ? "text-white" : "text-gray-900"}`}>{plan.price}<span className={`text-sm font-normal ${plan.highlight ? "text-white/70" : "text-gray-500"}`}>/mês</span></p>
              <p className={`text-sm mt-1 ${plan.highlight ? "text-white/70" : "text-gray-500"}`}>{plan.students}</p>
              <ul className="mt-6 space-y-2">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-white/80" : "text-green-500"}`} />
                    <span className={plan.highlight ? "text-white/90" : "text-gray-600"}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowLogin(true)}
                className={`w-full mt-6 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  plan.highlight
                    ? "bg-white text-primary-700 hover:bg-white/90"
                    : "bg-primary-50 text-primary-700 hover:bg-primary-100"
                }`}
              >
                Começar agora
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">O que dizem nossos clientes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Maria Silva", role: "Diretora — Colégio São Paulo", text: "A EDUGEST transformou completamente nossa gestão. Agora temos visibilidade total da instituição." },
              { name: "Carlos Mendes", role: "Coordenador — Instituto Futuro", text: "O módulo de IA é incrível. O copiloto do professor economiza horas de trabalho toda semana." },
              { name: "Ana Costa", role: "Mantenedora — Rede Educacional AC", text: "O financeiro e CRM integrados nos deram um controle que nunca tivemos. Recomendo fortemente." },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-gray-600 mb-4">"{t.text}"</p>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">EDUGEST</span>
            </div>
            <p className="text-sm text-gray-400">© 2026 EDUGEST. Gestão inteligente para uma educação melhor.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
