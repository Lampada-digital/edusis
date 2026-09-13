import { TrendingUp, TrendingDown, AlertTriangle, Target, Lightbulb, Activity, Users, DollarSign, BookOpen } from "lucide-react";

export default function CommandPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Command Center</h1>
          <p className="text-sm text-gray-500">Painel executivo — Visão 360° da instituição</p>
        </div>
      </div>

      {/* Health Score */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Saúde da Instituição</h2>
            <p className="text-sm text-white/60">Atualizado em tempo real</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-green-400">87<span className="text-lg text-white/60">/100</span></p>
            <p className="text-xs text-white/60">Score geral</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Acadêmico", score: 82, color: "bg-blue-400" },
            { label: "Financeiro", score: 91, color: "bg-green-400" },
            { label: "Operacional", score: 88, color: "bg-purple-400" },
            { label: "Comercial", score: 79, color: "bg-orange-400" },
          ].map((area, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-xs text-white/60 mb-1">{area.label}</p>
              <p className="text-xl font-bold">{area.score}</p>
              <div className="w-full h-1.5 bg-white/10 rounded-full mt-2">
                <div className={`h-full rounded-full ${area.color}`} style={{ width: `${area.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Opportunities */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <h3 className="text-sm font-semibold text-gray-900">Oportunidades</h3>
          </div>
          <div className="space-y-3">
            {[
              { title: "Campanha de rematrícula pode atingir 95% da meta", impact: "Alto", detail: "Faltam 45 alunos para meta de 300" },
              { title: "Curso de Robótica com demanda reprimida", impact: "Médio", detail: "23 alunos em lista de espera" },
              { title: "AVA pode aumentar retenção em 12%", impact: "Alto", detail: "Baseado em dados de engajamento" },
            ].map((opp, i) => (
              <div key={i} className="p-3 rounded-lg bg-green-50 border border-green-100">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">{opp.title}</p>
                  <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded font-medium">{opp.impact}</span>
                </div>
                <p className="text-xs text-gray-600">{opp.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Problems */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="text-sm font-semibold text-gray-900">Problemas</h3>
          </div>
          <div className="space-y-3">
            {[
              { title: "Evasão no 3º Ano EM acima do esperado", severity: "Crítico", detail: "5 alunos com risco de abandono" },
              { title: "Inadimplência concentrada em 12 famílias", severity: "Alto", detail: "R$ 11.957 em atraso" },
              { title: "Queda de engajamento no AVA", severity: "Médio", detail: "-15% de acessos na última semana" },
            ].map((prob, i) => (
              <div key={i} className="p-3 rounded-lg bg-red-50 border border-red-100">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">{prob.title}</p>
                  <span className="text-[10px] px-1.5 py-0.5 bg-red-100 text-red-700 rounded font-medium">{prob.severity}</span>
                </div>
                <p className="text-xs text-gray-600">{prob.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trends */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-blue-500" />
          <h3 className="text-sm font-semibold text-gray-900">Tendências (últimos 30 dias)</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Matrículas", value: "+23%", icon: Users, trend: "up" },
            { label: "Receita", value: "+5.2%", icon: DollarSign, trend: "up" },
            { label: "Frequência", value: "+1.2%", icon: BookOpen, trend: "up" },
            { label: "Evasão", value: "-0.5%", icon: TrendingDown, trend: "down" },
          ].map((trend, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${trend.trend === "up" ? "bg-green-100" : "bg-red-100"}`}>
                <trend.icon className={`w-4 h-4 ${trend.trend === "up" ? "text-green-600" : "text-red-600"}`} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{trend.label}</p>
                <p className={`text-lg font-bold ${trend.trend === "up" ? "text-green-600" : "text-red-600"}`}>{trend.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-purple-600" />
          <h3 className="text-sm font-semibold text-gray-900">Recomendações da IA</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            "Agendar reuniões com os 5 responsáveis de alunos em risco de evasão esta semana",
            "Enviar campanha de negociação para os 12 inadimplentes via WhatsApp",
            "Criar atividade de engajamento no AVA para reverter queda de acessos",
            "Ampliar oferta do curso de Robótica — demanda comprovada",
          ].map((rec, i) => (
            <div key={i} className="flex items-start gap-2 p-3 bg-white/70 rounded-lg">
              <span className="text-purple-600 font-bold text-sm">{i + 1}.</span>
              <p className="text-xs text-gray-700">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
