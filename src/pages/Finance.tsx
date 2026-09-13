import { DollarSign, TrendingUp, TrendingDown, AlertTriangle, ArrowUpRight, Sparkles } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { financeData } from "../data/mockData";

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-sm text-gray-500">Visão geral financeira • Junho 2026</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 border border-purple-200 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
          <Sparkles className="w-4 h-4" /> Explicar com IA
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Receita Mensal", value: "R$ 275.000", change: "+5.2%", icon: DollarSign, color: "text-green-600 bg-green-50" },
          { label: "Inadimplência", value: "R$ 11.957", change: "-0.8%", icon: TrendingDown, color: "text-red-600 bg-red-50" },
          { label: "Previsão Mensal", value: "R$ 284.700", change: "+3.5%", icon: TrendingUp, color: "text-blue-600 bg-blue-50" },
          { label: "Ticket Médio", value: "R$ 1.850", change: "+2.1%", icon: ArrowUpRight, color: "text-purple-600 bg-purple-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-gray-500">{stat.label}</p>
              <span className="text-xs font-medium text-green-600">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Recebido vs Previsto</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={financeData}>
            <defs>
              <linearGradient id="colorRecebido" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString()}`} />
            <Area type="monotone" dataKey="recebido" stroke="#22c55e" strokeWidth={2} fill="url(#colorRecebido)" />
            <Area type="monotone" dataKey="previsto" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" fill="none" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Overdue Invoices */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-semibold text-gray-900">Mensalidades em Atraso</h3>
          </div>
          <span className="px-2 py-0.5 bg-red-50 text-red-700 text-xs font-medium rounded-full">23 pendências</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Aluno/Responsável</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Valor</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Vencimento</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Dias em atraso</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Ação</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Bruno Santos Oliveira", value: "R$ 1.850,00", due: "05/06/2026", days: 9 },
                { name: "Daniel Costa Ribeiro", value: "R$ 2.100,00", due: "08/06/2026", days: 6 },
                { name: "Henrique Barbosa Gomes", value: "R$ 1.650,00", due: "10/06/2026", days: 4 },
              ].map((inv, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{inv.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{inv.value}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{inv.due}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium ${inv.days > 7 ? "text-red-600" : "text-orange-600"}`}>{inv.days} dias</span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-primary-600 font-medium hover:underline">Cobrar</button>
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
