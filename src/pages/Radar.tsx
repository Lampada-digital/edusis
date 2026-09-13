import { AlertTriangle, TrendingDown, Eye, Sparkles, CheckCircle, AlertCircle } from "lucide-react";

const radarAlerts = [
  { id: 1, student: "Daniel Costa Ribeiro", class: "3º Ano EM", category: "Frequência", level: "critical", evidence: "72% — abaixo de 75% por 30 dias consecutivos", action: "Intervenção imediata" },
  { id: 2, student: "Henrique Barbosa Gomes", class: "8º Ano B", category: "Desempenho", level: "critical", evidence: "Nota 5.9 — 3 disciplinas abaixo da média", action: "Plano de recuperação" },
  { id: 3, student: "Bruno Santos Oliveira", class: "1º Ano EM", category: "Engajamento", level: "warning", evidence: "Queda de 1.2 pontos no último bimestre", action: "Acompanhamento" },
  { id: 4, student: "Felipe Almeida Souza", class: "2º Ano EM", category: "AVA", level: "warning", evidence: "Não acessa plataforma há 14 dias", action: "Verificar motivação" },
  { id: 5, student: "Ana Carolina Silva", class: "9º Ano A", category: "Evolução", level: "positive", evidence: "Melhoria de 1.5 pontos em 2 meses", action: "Reforço positivo" },
  { id: 6, student: "Isabela Martins Castro", class: "1º Ano EM", category: "Evolução", level: "positive", evidence: "Nota 9.4 — destaque em exatas", action: "Desafios avançados" },
];

export default function RadarPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">EDUGEST Radar</h1>
          <p className="text-sm text-gray-500">Alertas inteligentes baseados em dados reais</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 border border-purple-200 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
          <Sparkles className="w-4 h-4" /> Resumir com IA
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-sm font-semibold text-red-700">Crítico</span>
          </div>
          <p className="text-3xl font-bold text-red-700">2</p>
          <p className="text-xs text-red-600">Alunos em risco imediato</p>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-semibold text-orange-700">Atenção</span>
          </div>
          <p className="text-3xl font-bold text-orange-700">2</p>
          <p className="text-xs text-orange-600">Precisam acompanhamento</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-700">Positivo</span>
          </div>
          <p className="text-3xl font-bold text-green-700">2</p>
          <p className="text-xs text-green-600">Evolução significativa</p>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Alertas Ativos</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {radarAlerts.map(alert => (
            <div key={alert.id} className="flex items-start gap-4 p-4 hover:bg-gray-50/50">
              <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                alert.level === "critical" ? "bg-red-500" :
                alert.level === "warning" ? "bg-orange-500" : "bg-green-500"
              }`} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-gray-900">{alert.student}</p>
                  <span className="px-1.5 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded">{alert.class}</span>
                  <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${
                    alert.level === "critical" ? "bg-red-50 text-red-700" :
                    alert.level === "warning" ? "bg-orange-50 text-orange-700" : "bg-green-50 text-green-700"
                  }`}>{alert.category}</span>
                </div>
                <p className="text-xs text-gray-600 mb-1">{alert.evidence}</p>
                <p className="text-xs text-primary-600 font-medium">→ Ação sugerida: {alert.action}</p>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
