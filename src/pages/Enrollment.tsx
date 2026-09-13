import { FileText, CheckCircle, Clock, AlertCircle, Plus, Search } from "lucide-react";

const enrollments = [
  { id: 1, student: "Ana Carolina Silva", course: "9º Ano A", status: "completed", date: "2026-06-10" },
  { id: 2, student: "Bruno Santos Oliveira", course: "1º Ano EM", status: "pending", date: "2026-06-12" },
  { id: 3, student: "Carla Mendes Ferreira", course: "5º Ano B", status: "completed", date: "2026-06-08" },
  { id: 4, student: "Daniel Costa Ribeiro", course: "3º Ano EM", status: "documents", date: "2026-06-11" },
  { id: 5, student: "Fernanda Lima Souza", course: "7º Ano A", status: "contract", date: "2026-06-13" },
  { id: 6, student: "Gabriel Torres Neto", course: "2º Ano EM", status: "pending", date: "2026-06-14" },
];

export default function EnrollmentPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Matrículas</h1>
          <p className="text-sm text-gray-500">156 matrículas este mês • 12 pendentes</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-lg text-sm font-medium self-start">
          <Plus className="w-4 h-4" /> Nova Matrícula
        </button>
      </div>

      {/* Pipeline */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Funil de Matrículas</h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[
            { label: "Interesse", count: 89, color: "bg-blue-100 text-blue-700" },
            { label: "Inscrição", count: 56, color: "bg-indigo-100 text-indigo-700" },
            { label: "Documentos", count: 34, color: "bg-purple-100 text-purple-700" },
            { label: "Contrato", count: 22, color: "bg-pink-100 text-pink-700" },
            { label: "Pagamento", count: 18, color: "bg-orange-100 text-orange-700" },
            { label: "Concluída", count: 156, color: "bg-green-100 text-green-700" },
          ].map((stage, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`px-4 py-2 rounded-lg text-center min-w-[100px] ${stage.color}`}>
                <p className="text-lg font-bold">{stage.count}</p>
                <p className="text-[10px] font-medium">{stage.label}</p>
              </div>
              {i < 5 && <span className="text-gray-300">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Buscar matrícula..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Aluno</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Curso/Turma</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Data</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map(e => (
                <tr key={e.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{e.student}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{e.course}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{new Date(e.date).toLocaleDateString("pt-BR")}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      e.status === "completed" ? "bg-green-50 text-green-700" :
                      e.status === "pending" ? "bg-yellow-50 text-yellow-700" :
                      e.status === "documents" ? "bg-blue-50 text-blue-700" :
                      "bg-purple-50 text-purple-700"
                    }`}>
                      {e.status === "completed" ? <CheckCircle className="w-3 h-3" /> :
                       e.status === "pending" ? <Clock className="w-3 h-3" /> :
                       e.status === "documents" ? <FileText className="w-3 h-3" /> :
                       <AlertCircle className="w-3 h-3" />}
                      {e.status === "completed" ? "Concluída" : e.status === "pending" ? "Pendente" : e.status === "documents" ? "Documentos" : "Contrato"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-primary-600 font-medium hover:underline">Ver detalhes</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
