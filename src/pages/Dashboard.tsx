import { motion } from "framer-motion";
import {
  Users, UserPlus, DollarSign, CheckCircle, TrendingUp, Target,
  AlertTriangle, Clock, Sparkles, ArrowUpRight, ArrowDownRight,
  BookOpen, Calendar, Bell
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { dashboardStats, revenueData, enrollmentData, performanceData, alerts } from "../data/mockData";
import { useApp } from "../store/AppContext";

const iconMap: Record<string, React.ElementType> = {
  users: Users, "user-plus": UserPlus, "dollar-sign": DollarSign,
  "check-circle": CheckCircle, "trending-up": TrendingUp, target: Target,
};

const COLORS = ["#4f46e5", "#7c3aed", "#2563eb", "#0891b2", "#16a34a", "#ca8a04", "#dc2626"];

export default function DashboardPage() {
  const { students, invoices } = useApp();
  const activeStudents = students.length;
  const overdueInvoices = invoices.filter(i => i.status === "overdue").length;
  const totalRevenue = invoices.filter(i => i.status === "paid").reduce((sum, i) => sum + i.amount, 0);

  const liveStats = [
    { label: "Alunos Ativos", value: activeStudents.toLocaleString("pt-BR"), change: "+12%", trend: "up", icon: "users" },
    { label: "Novas Matrículas", value: "156", change: "+23%", trend: "up", icon: "user-plus" },
    { label: "Inadimplência", value: `${overdueInvoices} faturas`, change: "-0.8%", trend: "down", icon: "dollar-sign" },
    { label: "Frequência Média", value: "94.7%", change: "+1.2%", trend: "up", icon: "check-circle" },
    { label: "Receita Mês", value: `R$ ${(totalRevenue / 1000).toFixed(0)}k`, change: "+5.2%", trend: "up", icon: "trending-up" },
    { label: "Leads Ativos", value: "342", change: "+18%", trend: "up", icon: "target" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bom dia, Administrador 👋</h1>
          <p className="text-sm text-gray-500">Veja o que merece sua atenção hoje na sua instituição.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Calendar className="w-4 h-4" /> Junho 2026
          </button>
          <button className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-lg text-sm font-medium hover:opacity-90">
            <Sparkles className="w-4 h-4" /> Analisar com IA
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {liveStats.map((stat, i) => {
          const Icon = iconMap[stat.icon] || Users;
          const isPositive = stat.trend === "up";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary-600" />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
                  {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Receita vs Despesas</h3>
              <p className="text-xs text-gray-500">Últimos 6 meses</p>
            </div>
            <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full font-medium">+12% crescimento</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString()}`} />
              <Area type="monotone" dataKey="receita" stroke="#4f46e5" strokeWidth={2} fill="url(#colorReceita)" />
              <Area type="monotone" dataKey="despesas" stroke="#f97316" strokeWidth={2} fill="url(#colorDespesas)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Distribution */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Distribuição de Desempenho</h3>
              <p className="text-xs text-gray-500">Média geral: 7.8</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="range" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {performanceData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Enrollment + Alerts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Enrollment Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Matrículas & Rematrículas</h3>
              <p className="text-xs text-gray-500">Evolução mensal</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-primary-500" /> Matrículas</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-500" /> Rematrículas</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="matriculas" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="rematriculas" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Alertas</h3>
            <Bell className="w-4 h-4 text-gray-400" />
          </div>
          <div className="space-y-3">
            {alerts.map(alert => (
              <div key={alert.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  alert.type === "critical" ? "bg-red-500" :
                  alert.type === "warning" ? "bg-orange-500" : "bg-blue-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700 leading-relaxed">{alert.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions + AI Insights */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: UserPlus, label: "Nova Matrícula", color: "bg-blue-50 text-blue-600" },
              { icon: BookOpen, label: "Criar Atividade", color: "bg-purple-50 text-purple-600" },
              { icon: DollarSign, label: "Emitir Boleto", color: "bg-green-50 text-green-600" },
              { icon: Users, label: "Chamada Digital", color: "bg-orange-50 text-orange-600" },
              { icon: Calendar, label: "Agendar Evento", color: "bg-cyan-50 text-cyan-600" },
              { icon: Bell, label: "Enviar Aviso", color: "bg-rose-50 text-rose-600" },
            ].map((action, i) => (
              <button key={i} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all text-left">
                <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="text-sm font-semibold text-gray-900">Insights da IA</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white/70 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-xs font-medium text-gray-700">Atenção — Evasão</span>
              </div>
              <p className="text-xs text-gray-600">3 alunos do 3º Ano EM apresentam queda de frequência consistente. Recomenda-se intervenção pedagógica imediata.</p>
            </div>
            <div className="bg-white/70 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                <span className="text-xs font-medium text-gray-700">Oportunidade — CRM</span>
              </div>
              <p className="text-xs text-gray-600">12 leads estão na fase "Proposta" há mais de 7 dias. Sugiro follow-up prioritário para evitar perda.</p>
            </div>
            <div className="bg-white/70 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-xs font-medium text-gray-700">Financeiro</span>
              </div>
              <p className="text-xs text-gray-600">A inadimplência reduziu 0.8% este mês. Campanhas de negociação estão surtindo efeito positivo.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pie Chart - Module Usage */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Uso dos Módulos</h3>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie
                data={[
                  { name: "AVA", value: 35 },
                  { name: "Financeiro", value: 20 },
                  { name: "Acadêmico", value: 25 },
                  { name: "CRM", value: 10 },
                  { name: "Outros", value: 10 },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {[...Array(5)].map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 flex-1">
            {[
              { name: "AVA / Learn", value: "35%", color: "bg-primary-500" },
              { name: "Financeiro", value: "20%", color: "bg-purple-500" },
              { name: "Acadêmico", value: "25%", color: "bg-blue-500" },
              { name: "CRM", value: "10%", color: "bg-cyan-500" },
              { name: "Outros", value: "10%", color: "bg-green-500" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-xs text-gray-600">{item.name}</span>
                <span className="text-xs font-medium text-gray-900 ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Próximos Eventos</h3>
          <button className="text-xs text-primary-600 font-medium hover:underline">Ver calendário completo</button>
        </div>
        <div className="space-y-2">
          {[
            { date: "15 Jun", title: "Reunião Pedagógica", type: "meeting" },
            { date: "16 Jun", title: "Prova de Matemática - 9º Ano", type: "exam" },
            { date: "20 Jun", title: "Festa Junina", type: "event" },
            { date: "22 Jun", title: "Conselho de Classe", type: "meeting" },
            { date: "25 Jun", title: "Início Rematrícula", type: "deadline" },
          ].map((event, i) => (
            <div key={i} className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50">
              <div className="text-center min-w-[40px]">
                <p className="text-xs font-bold text-primary-600">{event.date.split(" ")[0]}</p>
                <p className="text-[10px] text-gray-400">{event.date.split(" ")[1]}</p>
              </div>
              <div className={`w-1.5 h-8 rounded-full ${
                event.type === "exam" ? "bg-red-400" :
                event.type === "event" ? "bg-green-400" :
                event.type === "deadline" ? "bg-orange-400" : "bg-blue-400"
              }`} />
              <span className="text-sm text-gray-700">{event.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
