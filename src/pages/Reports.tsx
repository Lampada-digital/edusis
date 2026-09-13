import { useState } from "react";
import { BarChart3, Download, FileText, Filter, Plus, Table } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const reports = [
  { id: 1, name: "Boletim Escolar", category: "Acadêmico", format: "PDF", lastGenerated: "2026-06-10" },
  { id: 2, name: "Relatório de Frequência", category: "Acadêmico", format: "Excel", lastGenerated: "2026-06-12" },
  { id: 3, name: "DRE Financeiro", category: "Financeiro", format: "PDF", lastGenerated: "2026-06-01" },
  { id: 4, name: "Inadimplência Detalhada", category: "Financeiro", format: "Excel", lastGenerated: "2026-06-13" },
  { id: 5, name: "Desempenho por Turma", category: "Pedagógico", format: "PDF", lastGenerated: "2026-06-08" },
  { id: 6, name: "Conversão CRM", category: "Comercial", format: "PDF", lastGenerated: "2026-06-11" },
];

const chartData = [
  { month: "Jan", alunos: 2650, aprovados: 2480 },
  { month: "Fev", alunos: 2680, aprovados: 2510 },
  { month: "Mar", alunos: 2720, aprovados: 2560 },
  { month: "Abr", alunos: 2750, aprovados: 2590 },
  { month: "Mai", alunos: 2800, aprovados: 2650 },
  { month: "Jun", alunos: 2847, aprovados: 2700 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios & BI</h1>
          <p className="text-sm text-gray-500">Report builder e dashboards analíticos</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-lg text-sm font-medium self-start">
          <Plus className="w-4 h-4" /> Novo Relatório
        </button>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Evolução de Alunos</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="alunos" stroke="#4f46e5" strokeWidth={2} dot={{ fill: "#4f46e5" }} />
              <Line type="monotone" dataKey="aprovados" stroke="#22c55e" strokeWidth={2} dot={{ fill: "#22c55e" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Relatórios Gerados</h3>
          <div className="space-y-2">
            {reports.map(report => (
              <div key={report.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${report.format === "PDF" ? "bg-red-50" : "bg-green-50"}`}>
                    <FileText className={`w-4 h-4 ${report.format === "PDF" ? "text-red-500" : "text-green-500"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{report.name}</p>
                    <p className="text-[10px] text-gray-500">{report.category} • {report.format}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400">{report.lastGenerated}</span>
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Types */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Acadêmico", icon: BarChart3, count: "12 dashboards" },
          { label: "Pedagógico", icon: Table, count: "8 dashboards" },
          { label: "Financeiro", icon: BarChart3, count: "10 dashboards" },
          { label: "Comercial", icon: BarChart3, count: "6 dashboards" },
        ].map((dash, i) => (
          <button key={i} className="bg-white rounded-xl border border-gray-100 p-4 text-center hover:shadow-md transition-shadow">
            <dash.icon className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">{dash.label}</p>
            <p className="text-xs text-gray-500">{dash.count}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
