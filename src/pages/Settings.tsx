import { useState } from "react";
import { Building2, Users, Shield, Bell, Palette, Database, Brain, Globe, Key, FileCheck } from "lucide-react";

const sections = [
  { id: "institution", label: "Instituição", icon: Building2 },
  { id: "users", label: "Usuários & Permissões", icon: Users },
  { id: "academic", label: "Acadêmico", icon: FileCheck },
  { id: "communication", label: "Comunicação", icon: Bell },
  { id: "ai", label: "Inteligência Artificial", icon: Brain },
  { id: "security", label: "Segurança", icon: Shield },
  { id: "lgpd", label: "LGPD", icon: Key },
  { id: "appearance", label: "Aparência", icon: Palette },
  { id: "integrations", label: "Integrações", icon: Globe },
  { id: "backup", label: "Backup & Dados", icon: Database },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("institution");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-sm text-gray-500">Gerencie todas as configurações da plataforma</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-xl border border-gray-100 p-3">
          <div className="space-y-1">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                  activeSection === section.id
                    ? "bg-primary-50 text-primary-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <section.icon className="w-4 h-4" />
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 p-6">
          {activeSection === "institution" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Dados da Instituição</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nome</label>
                  <input type="text" defaultValue="Colégio EDUGEST" className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">CNPJ</label>
                  <input type="text" defaultValue="12.345.678/0001-90" className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">E-mail</label>
                  <input type="email" defaultValue="contato@colegioedugest.com" className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Telefone</label>
                  <input type="text" defaultValue="(11) 3456-7890" className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Endereço</label>
                  <input type="text" defaultValue="Av. Paulista, 1000 — São Paulo, SP" className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
              </div>
              <button className="px-4 py-2 gradient-primary text-white rounded-lg text-sm font-medium">Salvar Alterações</button>
            </div>
          )}

          {activeSection === "users" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Usuários & Permissões</h2>
              <div className="space-y-3">
                {[
                  { role: "Administrador", users: 3, permissions: "Acesso total" },
                  { role: "Coordenador Pedagógico", users: 8, permissions: "Acadêmico + Pedagógico" },
                  { role: "Professor", users: 186, permissions: "Diário + Notas + Frequência" },
                  { role: "Secretaria", users: 12, permissions: "Matrículas + Documentos" },
                  { role: "Financeiro", users: 5, permissions: "Financeiro + Cobranças" },
                  { role: "Responsável", users: 2100, permissions: "Portal família" },
                  { role: "Aluno", users: 2847, permissions: "Portal aluno + AVA" },
                ].map((role, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{role.role}</p>
                      <p className="text-xs text-gray-500">{role.permissions}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{role.users} usuários</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "ai" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Inteligência Artificial</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900">Modelo padrão</p>
                    <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm">
                      <option>GPT-4o</option>
                      <option>Claude 3.5</option>
                      <option>Gemini Pro</option>
                    </select>
                  </div>
                  <p className="text-xs text-gray-500">Modelo utilizado para chat, análises e agentes</p>
                </div>
                <div className="p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900">RAG — Base de Conhecimento</p>
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">Ativo</span>
                  </div>
                  <p className="text-xs text-gray-500">1.247 documentos indexados • 12.456 chunks</p>
                </div>
                <div className="p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900">Consumo mensal</p>
                    <span className="text-sm font-medium text-gray-700">45.000 / 100.000 tokens</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: "45%" }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "appearance" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Aparência & White Label</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Logo da Instituição</label>
                  <div className="mt-2 p-4 border-2 border-dashed border-gray-200 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Arraste ou clique para upload</p>
                    <p className="text-xs text-gray-400">PNG, SVG — máx 2MB</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Cor Principal</label>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-10 h-10 rounded-lg bg-primary-600 border-2 border-primary-700" />
                    <input type="text" defaultValue="#4F46E5" className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-mono" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Domínio Personalizado</label>
                  <input type="text" defaultValue="gestao.colegioedugest.com" className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
              </div>
              <button className="px-4 py-2 gradient-primary text-white rounded-lg text-sm font-medium">Salvar Alterações</button>
            </div>
          )}

          {activeSection !== "institution" && activeSection !== "users" && activeSection !== "ai" && activeSection !== "appearance" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">{sections.find(s => s.id === activeSection)?.label}</h2>
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  {(() => { const Icon = sections.find(s => s.id === activeSection)?.icon || Shield; return <Icon className="w-8 h-8 text-gray-400" />; })()}
                </div>
                <p className="text-sm text-gray-500">Configurações de {sections.find(s => s.id === activeSection)?.label}</p>
                <p className="text-xs text-gray-400 mt-1">Em desenvolvimento — disponível na versão completa</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
