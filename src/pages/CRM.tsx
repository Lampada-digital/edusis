import { useState } from "react";
import { Search, Plus, Phone, Mail, Sparkles, MoreHorizontal } from "lucide-react";
import { leads } from "../data/mockData";

const stages = ["Novo Lead", "Qualificação", "Visita Agendada", "Proposta", "Negociação", "Fechado"];

export default function CRMPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CRM Educacional</h1>
          <p className="text-sm text-gray-500">342 leads ativos • Taxa de conversão: 23%</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-purple-200 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
            <Sparkles className="w-4 h-4" /> Priorizar Leads
          </button>
          <button className="flex items-center gap-2 px-3 py-2 gradient-primary text-white rounded-lg text-sm font-medium">
            <Plus className="w-4 h-4" /> Novo Lead
          </button>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {stages.map((stage, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-100 p-3 text-center">
            <p className="text-lg font-bold text-gray-900">{[89, 56, 34, 22, 18, 123][i]}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{stage}</p>
          </div>
        ))}
      </div>

      {/* Kanban View */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.slice(0, 4).map((stage, stageIdx) => (
          <div key={stage} className="min-w-[280px] flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">{stage}</h3>
              <span className="text-xs text-gray-400">{leads.filter((_, i) => i % 4 === stageIdx).length}</span>
            </div>
            <div className="space-y-2">
              {leads.filter((_, i) => i % 4 === stageIdx).map(lead => (
                <div key={lead.id} className="bg-white rounded-lg border border-gray-100 p-3 hover:shadow-sm transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                      <p className="text-xs text-gray-500">{lead.email}</p>
                    </div>
                    <button className="p-1 rounded hover:bg-gray-100"><MoreHorizontal className="w-3.5 h-3.5 text-gray-400" /></button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{lead.source}</span>
                    <span className="text-xs font-semibold text-green-600">R$ {lead.value.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-50">
                    <button className="p-1 rounded hover:bg-blue-50 text-blue-500"><Phone className="w-3 h-3" /></button>
                    <button className="p-1 rounded hover:bg-blue-50 text-blue-500"><Mail className="w-3 h-3" /></button>
                    <span className="text-[10px] text-gray-400 ml-auto">{lead.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
