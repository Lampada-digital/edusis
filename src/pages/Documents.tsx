import { FolderOpen, FileText, Upload, Search, Plus, Download, Eye } from "lucide-react";

const documents = [
  { id: 1, name: "Regimento Escolar 2026", type: "PDF", size: "2.4 MB", date: "2026-01-15", category: "Legal" },
  { id: 2, name: "Proposta Pedagógica", type: "DOCX", size: "1.8 MB", date: "2026-02-20", category: "Pedagógico" },
  { id: 3, name: "Contrato de Matrícula - Template", type: "DOCX", size: "856 KB", date: "2026-03-01", category: "Contratos" },
  { id: 4, name: "Calendário Escolar 2026", type: "PDF", size: "1.2 MB", date: "2026-01-10", category: "Acadêmico" },
  { id: 5, name: "Plano de Curso - Ensino Médio", type: "PDF", size: "3.1 MB", date: "2026-02-05", category: "Pedagógico" },
  { id: 6, name: "Declaração de Matrícula - Modelo", type: "DOCX", size: "420 KB", date: "2026-04-12", category: "Secretaria" },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documentos</h1>
          <p className="text-sm text-gray-500">Gestão Eletrônica de Documentos (GED)</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-lg text-sm font-medium self-start">
          <Upload className="w-4 h-4" /> Upload
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar - Categories */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Categorias</h3>
          <div className="space-y-1">
            {["Todos", "Legal", "Pedagógico", "Contratos", "Acadêmico", "Secretaria", "Financeiro", "RH"].map((cat, i) => (
              <button key={i} className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm ${i === 0 ? "bg-primary-50 text-primary-700" : "text-gray-600 hover:bg-gray-50"}`}>
                <FolderOpen className="w-4 h-4" /> {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Documents List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Buscar documentos..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {documents.map(doc => (
                <div key={doc.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${doc.type === "PDF" ? "bg-red-50" : "bg-blue-50"}`}>
                      <FileText className={`w-5 h-5 ${doc.type === "PDF" ? "text-red-500" : "text-blue-500"}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.type} • {doc.size} • {doc.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{new Date(doc.date).toLocaleDateString("pt-BR")}</span>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><Eye className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><Download className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
