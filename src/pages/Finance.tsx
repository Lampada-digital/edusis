import { useState, useMemo } from "react";
import {
  DollarSign, TrendingUp, TrendingDown, AlertTriangle, ArrowUpRight,
  Sparkles, Plus, Search, Download, Filter, CreditCard, FileText,
  CheckCircle, Clock, XCircle, Send, Receipt, Users, PieChart as PieIcon,
  Calendar, Banknote, Wallet, BarChart3, Eye, Edit, Trash2, MoreVertical
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";
import { useApp } from "../store/AppContext";
import { Modal, FormField, Input, Select, Button } from "../components/Modal";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "receivable", label: "Contas a Receber", icon: ArrowUpRight },
  { id: "payable", label: "Contas a Pagar", icon: TrendingDown },
  { id: "billing", label: "Cobranças", icon: Send },
  { id: "cashflow", label: "Fluxo de Caixa", icon: Wallet },
  { id: "contracts", label: "Contratos", icon: FileText },
  { id: "discounts", label: "Descontos/Bolsas", icon: Users },
  { id: "receipts", label: "Recibos", icon: Receipt },
];

const COLORS = ["#4f46e5", "#22c55e", "#f97316", "#ef4444", "#8b5cf6", "#06b6d4"];

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("pt-BR");
};

const daysOverdue = (dueDate: string) => {
  const due = new Date(dueDate + "T00:00:00");
  const now = new Date();
  return Math.max(0, Math.floor((now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24)));
};

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const {
    invoices, expenses, contracts, discounts, students,
    addInvoice, updateInvoice, payInvoice, addExpense, payExpense,
    addContract, addDiscount
  } = useApp();

  // Financial calculations
  const financialData = useMemo(() => {
    const paid = invoices.filter(i => i.status === "paid").reduce((sum, i) => sum + i.amount, 0);
    const pending = invoices.filter(i => i.status === "pending").reduce((sum, i) => sum + i.amount, 0);
    const overdue = invoices.filter(i => i.status === "overdue").reduce((sum, i) => sum + i.amount, 0);
    const expensesPaid = expenses.filter(e => e.status === "paid").reduce((sum, e) => sum + e.amount, 0);
    const expensesPending = expenses.filter(e => e.status === "pending").reduce((sum, e) => sum + e.amount, 0);
    const totalRevenue = paid + pending + overdue;
    const balance = paid - expensesPaid;
    const defaultRate = totalRevenue > 0 ? (overdue / totalRevenue) * 100 : 0;
    return { paid, pending, overdue, expensesPaid, expensesPending, totalRevenue, balance, defaultRate };
  }, [invoices, expenses]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-sm text-gray-500">Gestão financeira completa • Junho 2026</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 border border-purple-200 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium self-start">
          <Sparkles className="w-4 h-4" /> Análise com IA
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-100 p-1.5 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "dashboard" && <FinanceDashboard data={financialData} invoices={invoices} expenses={expenses} />}
      {activeTab === "receivable" && <ReceivablesView invoices={invoices} addInvoice={addInvoice} payInvoice={payInvoice} students={students} />}
      {activeTab === "payable" && <PayablesView expenses={expenses} addExpense={addExpense} payExpense={payExpense} />}
      {activeTab === "billing" && <BillingView invoices={invoices} students={students} />}
      {activeTab === "cashflow" && <CashFlowView data={financialData} />}
      {activeTab === "contracts" && <ContractsView contracts={contracts} addContract={addContract} students={students} />}
      {activeTab === "discounts" && <DiscountsView discounts={discounts} addDiscount={addDiscount} students={students} />}
      {activeTab === "receipts" && <ReceiptsView invoices={invoices} />}
    </div>
  );
}

/* ============ DASHBOARD ============ */
function FinanceDashboard({ data, invoices, expenses }: any) {
  const monthlyData = [
    { month: "Jan", receita: 230000, despesa: 180000 },
    { month: "Fev", receita: 248000, despesa: 175000 },
    { month: "Mar", receita: 260000, despesa: 182000 },
    { month: "Abr", receita: 255000, despesa: 178000 },
    { month: "Mai", receita: 270000, despesa: 185000 },
    { month: "Jun", receita: data.paid + data.pending + data.overdue, despesa: data.expensesPaid + data.expensesPending },
  ];

  const categoryData = useMemo(() => {
    const cats: Record<string, number> = {};
    invoices.forEach((i: any) => { cats[i.category] = (cats[i.category] || 0) + i.amount; });
    return Object.entries(cats).map(([name, value]) => ({ name, value }));
  }, [invoices]);

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Receita Recebida" value={formatCurrency(data.paid)} change="+5.2%" icon={DollarSign} color="bg-green-50 text-green-600" positive />
        <KPICard title="A Receber" value={formatCurrency(data.pending)} change={`${invoices.filter((i: any) => i.status === "pending").length} faturas`} icon={Clock} color="bg-blue-50 text-blue-600" />
        <KPICard title="Inadimplência" value={formatCurrency(data.overdue)} change={`${data.defaultRate.toFixed(1)}%`} icon={AlertTriangle} color="bg-red-50 text-red-600" />
        <KPICard title="Saldo do Caixa" value={formatCurrency(data.balance)} change={data.balance >= 0 ? "Positivo" : "Negativo"} icon={Wallet} color="bg-purple-50 text-purple-600" positive={data.balance >= 0} />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Receita vs Despesa (6 meses)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Area type="monotone" dataKey="receita" stroke="#22c55e" strokeWidth={2} fill="url(#colorReceita)" name="Receita" />
              <Area type="monotone" dataKey="despesa" stroke="#ef4444" strokeWidth={2} fill="none" strokeDasharray="4 4" name="Despesa" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Receita por Categoria</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={75} paddingAngle={3} dataKey="value">
                  {categoryData.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {categoryData.map((item: any, i: number) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Últimos Recebimentos</h3>
          </div>
          <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
            {invoices.filter((i: any) => i.status === "paid").slice(0, 5).map((inv: any) => (
              <div key={inv.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{inv.studentName}</p>
                  <p className="text-xs text-gray-500">{inv.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">{formatCurrency(inv.amount)}</p>
                  <p className="text-xs text-gray-400">{inv.paymentMethod}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Próximos Vencimentos</h3>
          </div>
          <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
            {invoices.filter((i: any) => i.status === "pending" || i.status === "overdue").slice(0, 5).map((inv: any) => (
              <div key={inv.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{inv.studentName}</p>
                  <p className="text-xs text-gray-500">Vence: {formatDate(inv.dueDate)}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${inv.status === "overdue" ? "text-red-600" : "text-orange-600"}`}>{formatCurrency(inv.amount)}</p>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${inv.status === "overdue" ? "bg-red-50 text-red-700" : "bg-orange-50 text-orange-700"}`}>
                    {inv.status === "overdue" ? "Atrasado" : "Pendente"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, change, icon: Icon, color, positive }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center mb-3`}>
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-xl font-bold text-gray-900">{value}</p>
      <div className="flex items-center justify-between mt-1">
        <p className="text-xs text-gray-500">{title}</p>
        <span className={`text-xs font-medium ${positive ? "text-green-600" : positive === false ? "text-red-600" : "text-gray-600"}`}>{change}</span>
      </div>
    </div>
  );
}

/* ============ CONTAS A RECEBER ============ */
function ReceivablesView({ invoices, addInvoice, payInvoice, students }: any) {
  const [showModal, setShowModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ studentId: "", description: "", amount: "", dueDate: "", category: "Mensalidade", installments: "1" });

  const filtered = invoices.filter((i: any) => {
    if (filter !== "all" && i.status !== filter) return false;
    if (search && !i.studentName.toLowerCase().includes(search.toLowerCase()) && !i.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleCreate = () => {
    const student = students.find((s: any) => s.id === parseInt(form.studentId));
    if (!student || !form.amount || !form.dueDate) return;
    addInvoice({
      studentId: student.id,
      studentName: student.name,
      description: form.description || `Mensalidade`,
      amount: parseFloat(form.amount),
      dueDate: form.dueDate,
      status: "pending",
      category: form.category,
    });
    setShowModal(false);
    setForm({ studentId: "", description: "", amount: "", dueDate: "", category: "Mensalidade", installments: "1" });
  };

  const handlePay = (method: string) => {
    if (showPayModal) {
      payInvoice(showPayModal, method);
      setShowPayModal(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex gap-2 flex-wrap">
          {[
            { id: "all", label: "Todas" },
            { id: "pending", label: "Pendentes" },
            { id: "overdue", label: "Atrasadas" },
            { id: "paid", label: "Pagas" },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${filter === f.id ? "bg-primary-50 text-primary-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-56 outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-3 py-2 gradient-primary text-white rounded-lg text-sm font-medium">
            <Plus className="w-4 h-4" /> Nova Fatura
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Aluno</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Descrição</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Vencimento</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Valor</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv: any) => (
                <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{inv.studentName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{inv.description}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{formatDate(inv.dueDate)}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatCurrency(inv.amount)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      inv.status === "paid" ? "bg-green-50 text-green-700" :
                      inv.status === "overdue" ? "bg-red-50 text-red-700" :
                      "bg-orange-50 text-orange-700"
                    }`}>
                      {inv.status === "paid" ? <CheckCircle className="w-3 h-3" /> : inv.status === "overdue" ? <XCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {inv.status === "paid" ? "Pago" : inv.status === "overdue" ? `${daysOverdue(inv.dueDate)}d atraso` : "Pendente"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {inv.status !== "paid" ? (
                      <button onClick={() => setShowPayModal(inv.id)} className="text-xs text-primary-600 font-medium hover:underline">
                        Registrar Pagamento
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">{inv.paymentMethod}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nova Fatura" size="lg">
        <div className="space-y-4">
          <FormField label="Aluno" required>
            <Select value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })}>
              <option value="">Selecione um aluno</option>
              {students.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </Select>
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Descrição" required>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Ex: Mensalidade Junho/2026" />
            </FormField>
            <FormField label="Categoria">
              <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option>Mensalidade</option>
                <option>Material</option>
                <option>Matrícula</option>
                <option>Atividade Extra</option>
                <option>Transporte</option>
                <option>Outros</option>
              </Select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Valor (R$)" required>
              <Input type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0,00" />
            </FormField>
            <FormField label="Vencimento" required>
              <Input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
            </FormField>
          </div>
          <FormField label="Parcelas">
            <Select value={form.installments} onChange={(e) => setForm({ ...form, installments: e.target.value })}>
              <option value="1">À vista (1x)</option>
              <option value="2">2x</option>
              <option value="3">3x</option>
              <option value="6">6x</option>
              <option value="12">12x</option>
            </Select>
          </FormField>
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button onClick={handleCreate}>Criar Fatura</Button>
          </div>
        </div>
      </Modal>

      {/* Pay Invoice Modal */}
      <Modal isOpen={showPayModal !== null} onClose={() => setShowPayModal(null)} title="Registrar Pagamento">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Selecione o método de pagamento:</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { method: "PIX", icon: "⚡", color: "bg-green-50 border-green-200 text-green-700" },
              { method: "Boleto", icon: "📄", color: "bg-blue-50 border-blue-200 text-blue-700" },
              { method: "Cartão Crédito", icon: "💳", color: "bg-purple-50 border-purple-200 text-purple-700" },
              { method: "Cartão Débito", icon: "💳", color: "bg-orange-50 border-orange-200 text-orange-700" },
              { method: "Dinheiro", icon: "💵", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
              { method: "Transferência", icon: "🏦", color: "bg-cyan-50 border-cyan-200 text-cyan-700" },
            ].map(pm => (
              <button key={pm.method} onClick={() => handlePay(pm.method)} className={`p-4 rounded-lg border-2 ${pm.color} hover:opacity-80 transition-opacity text-left`}>
                <div className="text-2xl mb-1">{pm.icon}</div>
                <p className="text-sm font-medium">{pm.method}</p>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

/* ============ CONTAS A PAGAR ============ */
function PayablesView({ expenses, addExpense, payExpense }: any) {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ description: "", amount: "", dueDate: "", category: "Pessoal", supplier: "", costCenter: "" });

  const filtered = expenses.filter((e: any) => filter === "all" || e.status === filter);
  const totalPending = filtered.filter((e: any) => e.status === "pending").reduce((sum: number, e: any) => sum + e.amount, 0);
  const totalPaid = filtered.filter((e: any) => e.status === "paid").reduce((sum: number, e: any) => sum + e.amount, 0);

  const handleCreate = () => {
    if (!form.description || !form.amount || !form.dueDate) return;
    addExpense({
      description: form.description,
      amount: parseFloat(form.amount),
      dueDate: form.dueDate,
      status: "pending",
      category: form.category,
      supplier: form.supplier,
      costCenter: form.costCenter,
    });
    setShowModal(false);
    setForm({ description: "", amount: "", dueDate: "", category: "Pessoal", supplier: "", costCenter: "" });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Total a Pagar" value={formatCurrency(totalPending)} icon={Clock} color="bg-orange-50 text-orange-600" />
        <KPICard title="Total Pago" value={formatCurrency(totalPaid)} icon={CheckCircle} color="bg-green-50 text-green-600" />
        <KPICard title="Vencidas" value={formatCurrency(expenses.filter((e: any) => e.status === "overdue").reduce((s: number, e: any) => s + e.amount, 0))} icon={AlertTriangle} color="bg-red-50 text-red-600" />
        <KPICard title="Qtd. Pendentes" value={String(expenses.filter((e: any) => e.status === "pending").length)} icon={FileText} color="bg-blue-50 text-blue-600" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex gap-2 flex-wrap">
          {[
            { id: "all", label: "Todas" },
            { id: "pending", label: "Pendentes" },
            { id: "paid", label: "Pagas" },
            { id: "overdue", label: "Atrasadas" },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${filter === f.id ? "bg-primary-50 text-primary-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {f.label}
            </button>
          ))}
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-3 py-2 gradient-primary text-white rounded-lg text-sm font-medium">
          <Plus className="w-4 h-4" /> Nova Despesa
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Descrição</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Fornecedor</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Categoria</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Vencimento</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Valor</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((exp: any) => (
                <tr key={exp.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{exp.description}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{exp.supplier || "—"}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">{exp.category}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-600">{formatDate(exp.dueDate)}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatCurrency(exp.amount)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      exp.status === "paid" ? "bg-green-50 text-green-700" :
                      exp.status === "overdue" ? "bg-red-50 text-red-700" :
                      "bg-orange-50 text-orange-700"
                    }`}>
                      {exp.status === "paid" ? "Pago" : exp.status === "overdue" ? "Atrasado" : "Pendente"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {exp.status !== "paid" ? (
                      <button onClick={() => payExpense(exp.id)} className="text-xs text-primary-600 font-medium hover:underline">
                        Pagar
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">{exp.paymentMethod || "—"}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nova Despesa" size="lg">
        <div className="space-y-4">
          <FormField label="Descrição" required>
            <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Ex: Conta de energia" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Valor (R$)" required>
              <Input type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            </FormField>
            <FormField label="Vencimento" required>
              <Input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Categoria">
              <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option>Pessoal</option>
                <option>Infraestrutura</option>
                <option>Utilidades</option>
                <option>Material</option>
                <option>Manutenção</option>
                <option>Alimentação</option>
                <option>Marketing</option>
                <option>Tecnologia</option>
                <option>Outros</option>
              </Select>
            </FormField>
            <FormField label="Fornecedor">
              <Input value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} placeholder="Nome do fornecedor" />
            </FormField>
          </div>
          <FormField label="Centro de Custo">
            <Input value={form.costCenter} onChange={(e) => setForm({ ...form, costCenter: e.target.value })} placeholder="Ex: RH, TI, Operacional" />
          </FormField>
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button onClick={handleCreate}>Criar Despesa</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

/* ============ COBRANÇAS ============ */
function BillingView({ invoices, students }: any) {
  const overdue = invoices.filter((i: any) => i.status === "overdue");
  const [selected, setSelected] = useState<number[]>([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const sendBilling = () => {
    setSending(true);
    setTimeout(() => {
      setSent(selected);
      setSending(false);
      setSelected([]);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Inadimplentes" value={String(overdue.length)} icon={AlertTriangle} color="bg-red-50 text-red-600" />
        <KPICard title="Valor Total" value={formatCurrency(overdue.reduce((s: number, i: any) => s + i.amount, 0))} icon={DollarSign} color="bg-orange-50 text-orange-600" />
        <KPICard title="Média Atraso" value={`${overdue.length > 0 ? (overdue.reduce((s: number, i: any) => s + daysOverdue(i.dueDate), 0) / overdue.length).toFixed(0) : 0} dias`} icon={Clock} color="bg-yellow-50 text-yellow-600" />
        <KPICard title="Taxa Inadimpl." value={`${invoices.length > 0 ? ((overdue.length / invoices.length) * 100).toFixed(1) : 0}%`} icon={TrendingDown} color="bg-purple-50 text-purple-600" />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold text-gray-900">Cobranças em Aberto</h3>
            {selected.length > 0 && (
              <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full font-medium">{selected.length} selecionados</span>
            )}
          </div>
          <button
            onClick={sendBilling}
            disabled={selected.length === 0 || sending}
            className="flex items-center gap-2 px-3 py-1.5 gradient-primary text-white rounded-lg text-xs font-medium disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            {sending ? "Enviando..." : "Enviar Cobrança"}
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {overdue.map((inv: any) => (
            <div key={inv.id} className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50/50">
              <input type="checkbox" checked={selected.includes(inv.id)} onChange={() => toggleSelect(inv.id)} className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{inv.studentName}</p>
                <p className="text-xs text-gray-500">{inv.description} • Venceu em {formatDate(inv.dueDate)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-red-600">{formatCurrency(inv.amount)}</p>
                <p className="text-xs text-gray-400">{daysOverdue(inv.dueDate)} dias em atraso</p>
              </div>
              {sent.includes(inv.id) && (
                <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Enviado
                </span>
              )}
            </div>
          ))}
          {overdue.length === 0 && (
            <div className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Nenhuma cobrança em aberto! 🎉</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============ FLUXO DE CAIXA ============ */
function CashFlowView({ data }: any) {
  const cashflowData = [
    { day: "01/06", entradas: 45000, saidas: 12000, saldo: 33000 },
    { day: "05/06", entradas: 180000, saidas: 183000, saldo: 30000 },
    { day: "10/06", entradas: 30000, saidas: 28000, saldo: 32000 },
    { day: "15/06", entradas: 20000, saidas: 8500, saldo: 43500 },
    { day: "20/06", entradas: 15000, saidas: 4200, saldo: 54300 },
    { day: "25/06", entradas: 8000, saidas: 12400, saldo: 49900 },
    { day: "30/06", entradas: 12000, saidas: 5600, saldo: 56300 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Saldo Atual" value={formatCurrency(data.balance)} icon={Wallet} color="bg-primary-50 text-primary-600" positive={data.balance >= 0} />
        <KPICard title="Entradas do Mês" value={formatCurrency(data.paid)} icon={TrendingUp} color="bg-green-50 text-green-600" />
        <KPICard title="Saídas do Mês" value={formatCurrency(data.expensesPaid)} icon={TrendingDown} color="bg-red-50 text-red-600" />
        <KPICard title="Projeção Mensal" value={formatCurrency(data.paid + data.pending)} icon={BarChart3} color="bg-purple-50 text-purple-600" />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Fluxo de Caixa — Junho 2026</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cashflowData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="entradas" fill="#22c55e" name="Entradas" radius={[4, 4, 0, 0]} />
            <Bar dataKey="saidas" fill="#ef4444" name="Saídas" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Evolução do Saldo</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={cashflowData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Line type="monotone" dataKey="saldo" stroke="#4f46e5" strokeWidth={2.5} dot={{ fill: "#4f46e5" }} name="Saldo" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ============ CONTRATOS ============ */
function ContractsView({ contracts, addContract, students }: any) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ studentId: "", course: "", monthlyValue: "", installments: "12", startDate: "", endDate: "", discount: "" });

  const handleCreate = () => {
    const student = students.find((s: any) => s.id === parseInt(form.studentId));
    if (!student || !form.monthlyValue || !form.startDate || !form.endDate) return;
    addContract({
      studentId: student.id,
      studentName: student.name,
      course: form.course,
      monthlyValue: parseFloat(form.monthlyValue),
      installments: parseInt(form.installments),
      startDate: form.startDate,
      endDate: form.endDate,
      status: "active",
      discount: form.discount ? parseFloat(form.discount) : undefined,
    });
    setShowModal(false);
    setForm({ studentId: "", course: "", monthlyValue: "", installments: "12", startDate: "", endDate: "", discount: "" });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{contracts.length} contratos ativos</h3>
          <p className="text-xs text-gray-500">Valor mensal total: {formatCurrency(contracts.reduce((s: number, c: any) => s + c.monthlyValue, 0))}</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-3 py-2 gradient-primary text-white rounded-lg text-sm font-medium">
          <Plus className="w-4 h-4" /> Novo Contrato
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Aluno</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Curso</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Valor Mensal</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Parcelas</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Vigência</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Desconto</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((c: any) => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{c.studentName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{c.course}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatCurrency(c.monthlyValue)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{c.installments}x</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{formatDate(c.startDate)} a {formatDate(c.endDate)}</td>
                  <td className="px-4 py-3">
                    {c.discount ? <span className="text-xs font-medium text-green-600">{c.discount}%</span> : <span className="text-xs text-gray-400">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 text-xs bg-green-50 text-green-700 rounded-full font-medium">Ativo</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Novo Contrato" size="lg">
        <div className="space-y-4">
          <FormField label="Aluno" required>
            <Select value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })}>
              <option value="">Selecione um aluno</option>
              {students.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </Select>
          </FormField>
          <FormField label="Curso" required>
            <Input value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} placeholder="Ex: Ensino Fundamental - 9º Ano" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Valor Mensal (R$)" required>
              <Input type="number" step="0.01" value={form.monthlyValue} onChange={(e) => setForm({ ...form, monthlyValue: e.target.value })} />
            </FormField>
            <FormField label="Parcelas">
              <Select value={form.installments} onChange={(e) => setForm({ ...form, installments: e.target.value })}>
                <option value="12">12x (Anual)</option>
                <option value="10">10x</option>
                <option value="6">6x (Semestral)</option>
                <option value="24">24x</option>
              </Select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Início" required>
              <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            </FormField>
            <FormField label="Término" required>
              <Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            </FormField>
          </div>
          <FormField label="Desconto (%)">
            <Input type="number" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} placeholder="0" />
          </FormField>
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button onClick={handleCreate}>Criar Contrato</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

/* ============ DESCONTOS/BOLSAS ============ */
function DiscountsView({ discounts, addDiscount, students }: any) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ studentId: "", type: "scholarship", percentage: "", reason: "", startDate: "", endDate: "" });

  const handleCreate = () => {
    const student = students.find((s: any) => s.id === parseInt(form.studentId));
    if (!student || !form.percentage || !form.reason || !form.startDate) return;
    addDiscount({
      studentId: student.id,
      studentName: student.name,
      type: form.type,
      percentage: parseFloat(form.percentage),
      reason: form.reason,
      startDate: form.startDate,
      endDate: form.endDate || undefined,
      status: "active",
    });
    setShowModal(false);
    setForm({ studentId: "", type: "scholarship", percentage: "", reason: "", startDate: "", endDate: "" });
  };

  const typeLabels: Record<string, string> = { scholarship: "Bolsa", discount: "Desconto", grant: "Auxílio" };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <KPICard title="Bolsas Ativas" value={String(discounts.filter((d: any) => d.type === "scholarship").length)} icon={Users} color="bg-purple-50 text-purple-600" />
        <KPICard title="Descontos" value={String(discounts.filter((d: any) => d.type === "discount").length)} icon={Banknote} color="bg-blue-50 text-blue-600" />
        <KPICard title="Impacto Mensal" value={formatCurrency(discounts.reduce((s: number, d: any) => s + (d.percentage / 100) * 1850, 0))} icon={TrendingDown} color="bg-green-50 text-green-600" />
      </div>

      <div className="flex justify-end">
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-3 py-2 gradient-primary text-white rounded-lg text-sm font-medium">
          <Plus className="w-4 h-4" /> Novo Desconto/Bolsa
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Aluno</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Tipo</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Percentual</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Motivo</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Vigência</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((d: any) => (
                <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{d.studentName}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                      d.type === "scholarship" ? "bg-purple-50 text-purple-700" :
                      d.type === "discount" ? "bg-blue-50 text-blue-700" :
                      "bg-green-50 text-green-700"
                    }`}>{typeLabels[d.type]}</span>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{d.percentage}%</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{d.reason}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">
                    {formatDate(d.startDate)} {d.endDate ? `a ${formatDate(d.endDate)}` : "— indeterminado"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 text-xs bg-green-50 text-green-700 rounded-full font-medium">Ativo</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Novo Desconto/Bolsa" size="lg">
        <div className="space-y-4">
          <FormField label="Aluno" required>
            <Select value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })}>
              <option value="">Selecione um aluno</option>
              {students.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </Select>
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Tipo" required>
              <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="scholarship">Bolsa</option>
                <option value="discount">Desconto</option>
                <option value="grant">Auxílio</option>
              </Select>
            </FormField>
            <FormField label="Percentual (%)" required>
              <Input type="number" min="0" max="100" value={form.percentage} onChange={(e) => setForm({ ...form, percentage: e.target.value })} placeholder="Ex: 10" />
            </FormField>
          </div>
          <FormField label="Motivo" required>
            <Input value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} placeholder="Ex: Bolsa mérito acadêmico" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Início" required>
              <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            </FormField>
            <FormField label="Término (opcional)">
              <Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            </FormField>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button onClick={handleCreate}>Criar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

/* ============ RECIBOS ============ */
function ReceiptsView({ invoices }: any) {
  const paid = invoices.filter((i: any) => i.status === "paid");
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Recibos Emitidos" value={String(paid.length)} icon={Receipt} color="bg-green-50 text-green-600" />
        <KPICard title="Valor Total" value={formatCurrency(paid.reduce((s: number, i: any) => s + i.amount, 0))} icon={DollarSign} color="bg-primary-50 text-primary-600" />
        <KPICard title="Este Mês" value={String(paid.filter((i: any) => i.paidDate?.startsWith("2026-06")).length)} icon={Calendar} color="bg-blue-50 text-blue-600" />
        <KPICard title="Via PIX" value={String(paid.filter((i: any) => i.paymentMethod === "PIX").length)} icon={CreditCard} color="bg-purple-50 text-purple-600" />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Recibos de Pagamento</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {paid.map((inv: any) => (
            <div key={inv.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{inv.studentName}</p>
                  <p className="text-xs text-gray-500">{inv.description} • Pago em {inv.paidDate ? formatDate(inv.paidDate) : "—"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{formatCurrency(inv.amount)}</p>
                  <p className="text-xs text-gray-500">{inv.paymentMethod}</p>
                </div>
                <button onClick={() => setSelectedReceipt(inv)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedReceipt && (
        <Modal isOpen={!!selectedReceipt} onClose={() => setSelectedReceipt(null)} title="Recibo de Pagamento" size="md">
          <div className="space-y-4">
            <div className="text-center border-b border-gray-100 pb-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-2">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Colégio EDUGEST</h3>
              <p className="text-xs text-gray-500">CNPJ: 12.345.678/0001-90</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Recibo nº:</span>
                <span className="text-sm font-medium text-gray-900">REC-{String(selectedReceipt.id).padStart(6, "0")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Data Pagamento:</span>
                <span className="text-sm font-medium text-gray-900">{selectedReceipt.paidDate ? formatDate(selectedReceipt.paidDate) : "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Recebi de:</span>
                <span className="text-sm font-medium text-gray-900">{selectedReceipt.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Referente a:</span>
                <span className="text-sm font-medium text-gray-900">{selectedReceipt.description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Forma de Pagamento:</span>
                <span className="text-sm font-medium text-gray-900">{selectedReceipt.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span className="text-sm font-semibold text-gray-900">Valor:</span>
                <span className="text-lg font-bold text-green-600">{formatCurrency(selectedReceipt.amount)}</span>
              </div>
            </div>
            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <Button variant="secondary" className="flex-1" onClick={() => window.print()}>
                <Download className="w-4 h-4 inline mr-1" /> Imprimir
              </Button>
              <Button className="flex-1" onClick={() => setSelectedReceipt(null)}>Fechar</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
