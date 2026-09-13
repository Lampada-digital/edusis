import { useState } from "react";
import { Search, Plus, Phone, Mail, Sparkles, MoreHorizontal, CheckCircle, ArrowRight, X } from "lucide-react";
import { Modal, FormField, Input, Select, Button } from "../components/Modal";

type Lead = {
  id: number; name: string; email: string; phone: string; source: string;
  stage: string; value: number; date: string; notes?: string;
};

const stages = ["Novo Lead", "Qualificação", "Visita Agendada", "Proposta", "Negociação", "Fechado"];

const initialLeads: Lead[] = [
  { id: 1, name: "Patrícia Mendes", email: "patricia@email.com", phone: "(11) 99999-1234", source: "Website", stage: "Qualificação", value: 2500, date: "2026-06-10" },
  { id: 2, name: "Roberto Silva", email: "roberto@email.com", phone: "(11) 98888-5678", source: "Indicação", stage: "Proposta", value: 3200, date: "2026-06-08" },
  { id: 3, name: "Camila Torres", email: "camila@email.com", phone: "(11) 97777-9012", source: "Instagram", stage: "Negociação", value: 4100, date: "2026-06-05" },
  { id: 4, name: "Fernando Dias", email: "fernando@email.com", phone: "(11) 96666-3456", source: "Google Ads", stage: "Novo Lead", value: 1800, date: "2026-06-12" },
  { id: 5, name: "Luciana Ramos", email: "luciana@email.com", phone: "(11) 95555-7890", source: "Evento", stage: "Visita Agendada", value: 5500, date: "2026-06-03" },
  { id: 6, name: "Marcos Oliveira", email: "marcos@email.com", phone: "(11) 94444-1122", source: "Website", stage: "Novo Lead", value: 2200, date: "2026-06-13" },
  { id: 7, name: "Juliana Costa", email: "juliana@email.com", phone: "(11) 93333-3344", source: "Indicação", stage: "Qualificação", value: 3800, date: "2026-06-09" },
  { id: 8, name: "André Santos", email: "andre@email.com", phone: "(11) 92222-5566", source: "Facebook", stage: "Fechado", value: 4500, date: "2026-05-28" },
  { id: 9, name: "Beatriz Lima", email: "beatriz@email.com", phone: "(11) 91111-7788", source: "Website", stage: "Proposta", value: 2800, date: "2026-06-07" },
  { id: 10, name: "Ricardo Alves", email: "ricardo@email.com", phone: "(11) 90000-9900", source: "Google Ads", stage: "Negociação", value: 3600, date: "2026-06-04" },
];

export default function CRMPage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [showModal, setShowModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", source: "Website", stage: "Novo Lead", value: "" });
  const [search, setSearch] = useState("");

  const filtered = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase())
  );

  const moveLead = (leadId: number, newStage: string) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: newStage } : l));
  };

  const handleCreate = () => {
    if (!form.name || !form.email) return;
    setLeads(prev => [...prev, {
      id: Math.max(0, ...prev.map(l => l.id)) + 1,
      name: form.name,
      email: form.email,
      phone: form.phone,
      source: form.source,
      stage: form.stage,
      value: parseFloat(form.value) || 0,
      date: new Date().toISOString().split("T")[0],
    }]);
    setShowModal(false);
    setForm({ name: "", email: "", phone: "", source: "Website", stage: "Novo Lead", value: "" });
  };

  const totalPipeline = leads.filter(l => l.stage !== "Fechado").reduce((s, l) => s + l.value, 0);
  const closedValue = leads.filter(l => l.stage === "Fechado").reduce((s, l) => s + l.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CRM Educacional</h1>
          <p className="text-sm text-gray-500">{leads.length} leads • Pipeline: R$ {totalPipeline.toLocaleString("pt-BR")} • Convertido: R$ {closedValue.toLocaleString("pt-BR")}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-purple-200 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
            <Sparkles className="w-4 h-4" /> Priorizar com IA
          </button>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-3 py-2 gradient-primary text-white rounded-lg text-sm font-medium">
            <Plus className="w-4 h-4" /> Novo Lead
          </button>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {stages.map((stage, i) => {
          const count = leads.filter(l => l.stage === stage).length;
          const value = leads.filter(l => l.stage === stage).reduce((s, l) => s + l.value, 0);
          return (
            <div key={i} className="bg-white rounded-lg border border-gray-100 p-3 text-center">
              <p className="text-lg font-bold text-gray-900">{count}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{stage}</p>
              <p className="text-xs font-medium text-primary-600 mt-1">R$ {value.toLocaleString()}</p>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar lead..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Kanban View */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage, stageIdx) => {
          const stageLeads = filtered.filter(l => l.stage === stage);
          return (
            <div key={stage} className="min-w-[280px] flex-1">
              <div className="flex items-center justify-between mb-3 sticky top-0 bg-gray-50 py-2 z-10">
                <h3 className="text-sm font-semibold text-gray-700">{stage}</h3>
                <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full font-medium">{stageLeads.length}</span>
              </div>
              <div className="space-y-2">
                {stageLeads.map(lead => (
                  <div key={lead.id} className="bg-white rounded-lg border border-gray-100 p-3 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedLead(lead)}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{lead.name}</p>
                        <p className="text-xs text-gray-500 truncate">{lead.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">{lead.source}</span>
                      <span className="text-xs font-semibold text-green-600">R$ {lead.value.toLocaleString()}</span>
                    </div>
                    {/* Move buttons */}
                    <div className="flex gap-1 mt-2 pt-2 border-t border-gray-50">
                      {stageIdx > 0 && (
                        <button
                          onClick={(e) => { e.stopPropagation(); moveLead(lead.id, stages[stageIdx - 1]); }}
                          className="flex-1 py-1 text-[10px] font-medium text-gray-600 bg-gray-50 rounded hover:bg-gray-100"
                        >
                          ← Voltar
                        </button>
                      )}
                      {stageIdx < stages.length - 1 && (
                        <button
                          onClick={(e) => { e.stopPropagation(); moveLead(lead.id, stages[stageIdx + 1]); }}
                          className="flex-1 py-1 text-[10px] font-medium text-primary-700 bg-primary-50 rounded hover:bg-primary-100"
                        >
                          Avançar →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Lead Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Novo Lead" size="lg">
        <div className="space-y-4">
          <FormField label="Nome" required>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome completo" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="E-mail" required>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </FormField>
            <FormField label="Telefone">
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Origem">
              <Select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}>
                <option>Website</option>
                <option>Indicação</option>
                <option>Instagram</option>
                <option>Facebook</option>
                <option>Google Ads</option>
                <option>Evento</option>
                <option>Outro</option>
              </Select>
            </FormField>
            <FormField label="Valor Estimado (R$)">
              <Input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
            </FormField>
          </div>
          <FormField label="Etapa Inicial">
            <Select value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })}>
              {stages.map(s => <option key={s}>{s}</option>)}
            </Select>
          </FormField>
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button onClick={handleCreate}>Criar Lead</Button>
          </div>
        </div>
      </Modal>

      {/* Lead Detail Modal */}
      <Modal isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} title="Detalhes do Lead">
        {selectedLead && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedLead.name}</h3>
                <p className="text-sm text-gray-500">{selectedLead.email}</p>
              </div>
              <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">{selectedLead.stage}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Telefone</p>
                <p className="text-sm font-medium text-gray-900">{selectedLead.phone}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Valor</p>
                <p className="text-sm font-medium text-gray-900">R$ {selectedLead.value.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Origem</p>
                <p className="text-sm font-medium text-gray-900">{selectedLead.source}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Data de Entrada</p>
                <p className="text-sm font-medium text-gray-900">{new Date(selectedLead.date).toLocaleDateString("pt-BR")}</p>
              </div>
            </div>
            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <button className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100">
                <Phone className="w-3 h-3" /> Ligar
              </button>
              <button className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100">
                <Mail className="w-3 h-3" /> E-mail
              </button>
              {stages.indexOf(selectedLead.stage) < stages.length - 1 && (
                <button
                  onClick={() => { moveLead(selectedLead.id, stages[stages.indexOf(selectedLead.stage) + 1]); setSelectedLead(null); }}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 ml-auto"
                >
                  Avançar etapa <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
