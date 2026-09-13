import { useState } from "react";
import { Search, Filter, Plus, Download, MoreVertical, Eye, Edit, FileText, Sparkles, ChevronDown } from "lucide-react";
import { students } from "../data/mockData";

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.enrollment.toLowerCase().includes(search.toLowerCase()) ||
    s.class.toLowerCase().includes(search.toLowerCase())
  );

  const student = selectedStudent ? students.find(s => s.id === selectedStudent) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alunos</h1>
          <p className="text-sm text-gray-500">2.847 alunos ativos • 156 novas matrículas este mês</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4" /> Exportar
          </button>
          <button className="flex items-center gap-2 px-3 py-2 gradient-primary text-white rounded-lg text-sm font-medium">
            <Plus className="w-4 h-4" /> Novo Aluno
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome, matrícula ou turma..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4" /> Filtros <ChevronDown className="w-3 h-3" />
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              Turma <ChevronDown className="w-3 h-3" />
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              Status <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Student Detail Drawer */}
      {student && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 animate-fadeIn">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-lg font-bold text-primary-700">{student.avatar}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{student.name}</h2>
                <p className="text-sm text-gray-500">{student.enrollment} • {student.class} • {student.course}</p>
              </div>
            </div>
            <button onClick={() => setSelectedStudent(null)} className="text-sm text-gray-400 hover:text-gray-600">✕ Fechar</button>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-1 mb-6 overflow-x-auto border-b border-gray-100 pb-2">
            {["Resumo", "Notas", "Frequência", "Financeiro", "Documentos", "Comunicação"].map((tab, i) => (
              <button key={i} className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${i === 0 ? "bg-primary-50 text-primary-700" : "text-gray-500 hover:text-gray-700"}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Média Geral</p>
              <p className="text-2xl font-bold text-gray-900">{student.avgGrade}</p>
              <p className="text-xs text-green-600 mt-1">Acima da média da turma</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Frequência</p>
              <p className="text-2xl font-bold text-gray-900">{student.attendance}%</p>
              <p className={`text-xs mt-1 ${student.attendance >= 90 ? "text-green-600" : student.attendance >= 75 ? "text-orange-600" : "text-red-600"}`}>
                {student.attendance >= 90 ? "Regular" : student.attendance >= 75 ? "Atenção" : "Crítico"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Situação Financeira</p>
              <p className={`text-2xl font-bold ${student.financial === "ok" ? "text-green-600" : "text-red-600"}`}>
                {student.financial === "ok" ? "OK" : "Pendente"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Análise IA</p>
              <button className="flex items-center gap-1 text-sm text-purple-600 font-medium hover:underline">
                <Sparkles className="w-3.5 h-3.5" /> Analisar aluno
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Aluno</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Matrícula</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Turma</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Média</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Frequência</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Financeiro</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-700">{s.avatar}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{s.enrollment}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{s.class}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className={`text-sm font-medium ${s.avgGrade >= 7 ? "text-green-600" : s.avgGrade >= 5 ? "text-orange-600" : "text-red-600"}`}>
                      {s.avgGrade}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${s.attendance >= 90 ? "bg-green-500" : s.attendance >= 75 ? "bg-orange-500" : "bg-red-500"}`} style={{ width: `${s.attendance}%` }} />
                      </div>
                      <span className="text-xs text-gray-600">{s.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.financial === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                      {s.financial === "ok" ? "Em dia" : "Pendente"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelectedStudent(s.id)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">Mostrando 1-10 de 2.847 alunos</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Anterior</button>
            <button className="px-3 py-1.5 text-xs rounded-lg bg-primary-50 text-primary-700 font-medium">1</button>
            <button className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">2</button>
            <button className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">3</button>
            <button className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Próximo</button>
          </div>
        </div>
      </div>
    </div>
  );
}
