import { useState } from "react";
import { Search, Filter, Plus, Download, Eye, Edit, FileText, Sparkles, X, CheckCircle } from "lucide-react";
import { useApp } from "../store/AppContext";
import { Modal, FormField, Input, Select, Button } from "../components/Modal";

export default function StudentsPage() {
  const { students, addStudent, updateStudent } = useApp();
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form, setForm] = useState({ name: "", enrollment: "", class: "", course: "", email: "", phone: "", guardian: "", guardianPhone: "" });

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.enrollment.toLowerCase().includes(search.toLowerCase()) ||
    s.class.toLowerCase().includes(search.toLowerCase())
  );

  const student = selectedStudent ? students.find(s => s.id === selectedStudent) : null;

  const handleCreate = () => {
    if (!form.name || !form.class || !form.course) return;
    addStudent({
      name: form.name,
      enrollment: form.enrollment || `EDU${Date.now()}`,
      class: form.class,
      course: form.course,
      status: "active",
      avgGrade: 0,
      attendance: 100,
      financial: "ok",
      avatar: form.name.split(" ").map(n => n[0]).slice(0, 2).join(""),
      email: form.email,
      phone: form.phone,
      guardian: form.guardian,
      guardianPhone: form.guardianPhone,
    });
    setShowCreateModal(false);
    setForm({ name: "", enrollment: "", class: "", course: "", email: "", phone: "", guardian: "", guardianPhone: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alunos</h1>
          <p className="text-sm text-gray-500">{students.length} alunos ativos</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4" /> Exportar
          </button>
          <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 px-3 py-2 gradient-primary text-white rounded-lg text-sm font-medium">
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
              <Filter className="w-4 h-4" /> Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Student Detail */}
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
                {student.email && <p className="text-xs text-gray-400 mt-1">{student.email} • {student.phone}</p>}
              </div>
            </div>
            <button onClick={() => setSelectedStudent(null)} className="text-sm text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Média Geral</p>
              <p className="text-2xl font-bold text-gray-900">{student.avgGrade}</p>
              <p className="text-xs text-green-600 mt-1">Acima da média</p>
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
              <p className="text-xs text-gray-500 mb-1">Responsável</p>
              <p className="text-sm font-medium text-gray-900">{student.guardian || "—"}</p>
              <p className="text-xs text-gray-500">{student.guardianPhone || "—"}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100">
              <Sparkles className="w-3.5 h-3.5" /> Analisar com IA
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100">
              <FileText className="w-3.5 h-3.5" /> Documentos
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100">
              <Edit className="w-3.5 h-3.5" /> Editar
            </button>
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">Mostrando {filtered.length} de {students.length} alunos</p>
        </div>
      </div>

      {/* Create Modal */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Novo Aluno" size="lg">
        <div className="space-y-4">
          <FormField label="Nome Completo" required>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex: João da Silva" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Matrícula">
              <Input value={form.enrollment} onChange={(e) => setForm({ ...form, enrollment: e.target.value })} placeholder="Automático se vazio" />
            </FormField>
            <FormField label="Curso" required>
              <Select value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}>
                <option value="">Selecione</option>
                <option>Ensino Fundamental</option>
                <option>Ensino Médio</option>
                <option>Curso de Inglês</option>
                <option>Robótica</option>
              </Select>
            </FormField>
          </div>
          <FormField label="Turma" required>
            <Input value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })} placeholder="Ex: 9º Ano A" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="E-mail">
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </FormField>
            <FormField label="Telefone">
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(11) 99999-9999" />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Responsável">
              <Input value={form.guardian} onChange={(e) => setForm({ ...form, guardian: e.target.value })} />
            </FormField>
            <FormField label="Telefone do Responsável">
              <Input value={form.guardianPhone} onChange={(e) => setForm({ ...form, guardianPhone: e.target.value })} />
            </FormField>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Cancelar</Button>
            <Button onClick={handleCreate}>
              <CheckCircle className="w-4 h-4 inline mr-1" /> Criar Aluno
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
