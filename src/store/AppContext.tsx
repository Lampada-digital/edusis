import { createContext, useContext, useState, ReactNode } from "react";

export type Student = {
  id: number; name: string; enrollment: string; class: string; course: string;
  status: string; avgGrade: number; attendance: number; financial: string;
  avatar: string; email?: string; phone?: string; birthDate?: string;
  guardian?: string; guardianPhone?: string; address?: string;
};

export type Invoice = {
  id: number; studentId: number; studentName: string; description: string;
  amount: number; dueDate: string; paidDate?: string; status: "pending" | "paid" | "overdue" | "cancelled";
  paymentMethod?: string; installment?: number; totalInstallments?: number;
  discount?: number; interest?: number; fine?: number; category: string;
};

export type Expense = {
  id: number; description: string; amount: number; dueDate: string;
  paidDate?: string; status: "pending" | "paid" | "overdue";
  category: string; supplier?: string; costCenter?: string; paymentMethod?: string;
};

export type Contract = {
  id: number; studentId: number; studentName: string; course: string;
  monthlyValue: number; installments: number; startDate: string; endDate: string;
  status: "active" | "expired" | "cancelled"; discount?: number;
};

export type Discount = {
  id: number; studentId: number; studentName: string; type: "scholarship" | "discount" | "grant";
  percentage: number; reason: string; startDate: string; endDate?: string; status: "active" | "expired";
};

export type Transaction = {
  id: number; date: string; description: string; type: "income" | "expense";
  amount: number; category: string; method: string; reference?: string;
};

type AppState = {
  students: Student[];
  invoices: Invoice[];
  expenses: Expense[];
  contracts: Contract[];
  discounts: Discount[];
  transactions: Transaction[];
  addStudent: (s: Omit<Student, "id">) => void;
  updateStudent: (id: number, s: Partial<Student>) => void;
  addInvoice: (i: Omit<Invoice, "id">) => void;
  updateInvoice: (id: number, i: Partial<Invoice>) => void;
  payInvoice: (id: number, method: string) => void;
  addExpense: (e: Omit<Expense, "id">) => void;
  updateExpense: (id: number, e: Partial<Expense>) => void;
  payExpense: (id: number) => void;
  addContract: (c: Omit<Contract, "id">) => void;
  addDiscount: (d: Omit<Discount, "id">) => void;
  addTransaction: (t: Omit<Transaction, "id">) => void;
};

const AppContext = createContext<AppState | null>(null);

const initialStudents: Student[] = [
  { id: 1, name: "Ana Carolina Silva", enrollment: "EDU2026001", class: "9º Ano A", course: "Ensino Fundamental", status: "active", avgGrade: 8.5, attendance: 96, financial: "ok", avatar: "AC", email: "ana.silva@email.com", phone: "(11) 98765-1234", guardian: "Maria Silva", guardianPhone: "(11) 98765-1234" },
  { id: 2, name: "Bruno Santos Oliveira", enrollment: "EDU2026002", class: "1º Ano EM", course: "Ensino Médio", status: "active", avgGrade: 7.2, attendance: 88, financial: "overdue", avatar: "BS", email: "bruno@email.com", phone: "(11) 98765-2345", guardian: "Carlos Oliveira", guardianPhone: "(11) 98765-2345" },
  { id: 3, name: "Carla Mendes Ferreira", enrollment: "EDU2026003", class: "5º Ano B", course: "Ensino Fundamental", status: "active", avgGrade: 9.1, attendance: 98, financial: "ok", avatar: "CM", email: "carla@email.com", phone: "(11) 98765-3456", guardian: "Paulo Ferreira", guardianPhone: "(11) 98765-3456" },
  { id: 4, name: "Daniel Costa Ribeiro", enrollment: "EDU2026004", class: "3º Ano EM", course: "Ensino Médio", status: "active", avgGrade: 6.8, attendance: 72, financial: "overdue", avatar: "DC", email: "daniel@email.com", phone: "(11) 98765-4567", guardian: "Joana Ribeiro", guardianPhone: "(11) 98765-4567" },
  { id: 5, name: "Elena Rodrigues Lima", enrollment: "EDU2026005", class: "7º Ano A", course: "Ensino Fundamental", status: "active", avgGrade: 8.9, attendance: 95, financial: "ok", avatar: "ER", email: "elena@email.com", phone: "(11) 98765-5678", guardian: "Roberto Lima", guardianPhone: "(11) 98765-5678" },
  { id: 6, name: "Felipe Almeida Souza", enrollment: "EDU2026006", class: "2º Ano EM", course: "Ensino Médio", status: "active", avgGrade: 7.5, attendance: 91, financial: "ok", avatar: "FA", email: "felipe@email.com", phone: "(11) 98765-6789", guardian: "Marcos Souza", guardianPhone: "(11) 98765-6789" },
  { id: 7, name: "Gabriela Nunes Pereira", enrollment: "EDU2026007", class: "6º Ano A", course: "Ensino Fundamental", status: "active", avgGrade: 8.2, attendance: 93, financial: "ok", avatar: "GN", email: "gabriela@email.com", phone: "(11) 98765-7890", guardian: "Luciana Pereira", guardianPhone: "(11) 98765-7890" },
  { id: 8, name: "Henrique Barbosa Gomes", enrollment: "EDU2026008", class: "8º Ano B", course: "Ensino Fundamental", status: "active", avgGrade: 5.9, attendance: 68, financial: "overdue", avatar: "HB", email: "henrique@email.com", phone: "(11) 98765-8901", guardian: "Sandra Gomes", guardianPhone: "(11) 98765-8901" },
  { id: 9, name: "Isabela Martins Castro", enrollment: "EDU2026009", class: "1º Ano EM", course: "Ensino Médio", status: "active", avgGrade: 9.4, attendance: 99, financial: "ok", avatar: "IM", email: "isabela@email.com", phone: "(11) 98765-9012", guardian: "Fernanda Castro", guardianPhone: "(11) 98765-9012" },
  { id: 10, name: "João Pedro Cardoso", enrollment: "EDU2026010", class: "4º Ano A", course: "Ensino Fundamental", status: "active", avgGrade: 7.8, attendance: 90, financial: "ok", avatar: "JP", email: "joao@email.com", phone: "(11) 98765-0123", guardian: "Patrícia Cardoso", guardianPhone: "(11) 98765-0123" },
];

const initialInvoices: Invoice[] = [
  { id: 1, studentId: 1, studentName: "Ana Carolina Silva", description: "Mensalidade Junho/2026", amount: 1850, dueDate: "2026-06-10", paidDate: "2026-06-08", status: "paid", paymentMethod: "PIX", category: "Mensalidade" },
  { id: 2, studentId: 2, studentName: "Bruno Santos Oliveira", description: "Mensalidade Junho/2026", amount: 2100, dueDate: "2026-06-05", status: "overdue", category: "Mensalidade" },
  { id: 3, studentId: 3, studentName: "Carla Mendes Ferreira", description: "Mensalidade Junho/2026", amount: 1650, dueDate: "2026-06-10", paidDate: "2026-06-10", status: "paid", paymentMethod: "Boleto", category: "Mensalidade" },
  { id: 4, studentId: 4, studentName: "Daniel Costa Ribeiro", description: "Mensalidade Junho/2026", amount: 2100, dueDate: "2026-06-08", status: "overdue", category: "Mensalidade" },
  { id: 5, studentId: 5, studentName: "Elena Rodrigues Lima", description: "Mensalidade Junho/2026", amount: 1850, dueDate: "2026-06-15", status: "pending", category: "Mensalidade" },
  { id: 6, studentId: 6, studentName: "Felipe Almeida Souza", description: "Mensalidade Junho/2026", amount: 2100, dueDate: "2026-06-10", paidDate: "2026-06-09", status: "paid", paymentMethod: "Cartão", category: "Mensalidade" },
  { id: 7, studentId: 7, studentName: "Gabriela Nunes Pereira", description: "Mensalidade Junho/2026", amount: 1850, dueDate: "2026-06-12", status: "pending", category: "Mensalidade" },
  { id: 8, studentId: 8, studentName: "Henrique Barbosa Gomes", description: "Mensalidade Junho/2026", amount: 1850, dueDate: "2026-06-10", status: "overdue", category: "Mensalidade" },
  { id: 9, studentId: 9, studentName: "Isabela Martins Castro", description: "Material Didático 2026", amount: 850, dueDate: "2026-02-15", paidDate: "2026-02-14", status: "paid", paymentMethod: "PIX", category: "Material" },
  { id: 10, studentId: 10, studentName: "João Pedro Cardoso", description: "Mensalidade Junho/2026", amount: 1650, dueDate: "2026-06-20", status: "pending", category: "Mensalidade" },
  { id: 11, studentId: 2, studentName: "Bruno Santos Oliveira", description: "Mensalidade Maio/2026", amount: 2100, dueDate: "2026-05-10", paidDate: "2026-05-15", status: "paid", paymentMethod: "Boleto", category: "Mensalidade" },
  { id: 12, studentId: 4, studentName: "Daniel Costa Ribeiro", description: "Mensalidade Maio/2026", amount: 2100, dueDate: "2026-05-08", paidDate: "2026-05-20", status: "paid", paymentMethod: "PIX", interest: 42, fine: 21, category: "Mensalidade" },
];

const initialExpenses: Expense[] = [
  { id: 1, description: "Folha de Pagamento - Professores", amount: 145000, dueDate: "2026-06-05", paidDate: "2026-06-05", status: "paid", category: "Pessoal", supplier: "Interno", costCenter: "RH", paymentMethod: "Transferência" },
  { id: 2, description: "Folha de Pagamento - Administrativos", amount: 38000, dueDate: "2026-06-05", paidDate: "2026-06-05", status: "paid", category: "Pessoal", supplier: "Interno", costCenter: "RH", paymentMethod: "Transferência" },
  { id: 3, description: "Aluguel - Unidade Central", amount: 28000, dueDate: "2026-06-10", paidDate: "2026-06-09", status: "paid", category: "Infraestrutura", supplier: "Imobiliária XYZ", costCenter: "Administração", paymentMethod: "Boleto" },
  { id: 4, description: "Conta de Energia", amount: 8500, dueDate: "2026-06-15", status: "pending", category: "Utilidades", supplier: "CPFL Energia", costCenter: "Infraestrutura" },
  { id: 5, description: "Internet e Telefonia", amount: 4200, dueDate: "2026-06-20", status: "pending", category: "Utilidades", supplier: "Vivo Empresas", costCenter: "TI" },
  { id: 6, description: "Material de Limpeza", amount: 2800, dueDate: "2026-06-18", paidDate: "2026-06-17", status: "paid", category: "Material", supplier: "Clean Supply", costCenter: "Operacional", paymentMethod: "PIX" },
  { id: 7, description: "Manutenção de Equipamentos", amount: 5600, dueDate: "2026-06-22", status: "pending", category: "Manutenção", supplier: "Tech Service", costCenter: "TI" },
  { id: 8, description: "Merenda Escolar", amount: 12400, dueDate: "2026-06-25", status: "pending", category: "Alimentação", supplier: "Nutri School", costCenter: "Operacional" },
];

const initialContracts: Contract[] = [
  { id: 1, studentId: 1, studentName: "Ana Carolina Silva", course: "Ensino Fundamental - 9º Ano", monthlyValue: 1850, installments: 12, startDate: "2026-02-01", endDate: "2027-01-31", status: "active" },
  { id: 2, studentId: 2, studentName: "Bruno Santos Oliveira", course: "Ensino Médio - 1º Ano", monthlyValue: 2100, installments: 12, startDate: "2026-02-01", endDate: "2027-01-31", status: "active" },
  { id: 3, studentId: 3, studentName: "Carla Mendes Ferreira", course: "Ensino Fundamental - 5º Ano", monthlyValue: 1650, installments: 12, startDate: "2026-02-01", endDate: "2027-01-31", status: "active", discount: 10 },
  { id: 4, studentId: 4, studentName: "Daniel Costa Ribeiro", course: "Ensino Médio - 3º Ano", monthlyValue: 2100, installments: 12, startDate: "2026-02-01", endDate: "2027-01-31", status: "active" },
  { id: 5, studentId: 5, studentName: "Elena Rodrigues Lima", course: "Ensino Fundamental - 7º Ano", monthlyValue: 1850, installments: 12, startDate: "2026-02-01", endDate: "2027-01-31", status: "active" },
];

const initialDiscounts: Discount[] = [
  { id: 1, studentId: 3, studentName: "Carla Mendes Ferreira", type: "scholarship", percentage: 10, reason: "Bolsa mérito acadêmico", startDate: "2026-02-01", endDate: "2026-12-31", status: "active" },
  { id: 2, studentId: 9, studentName: "Isabela Martins Castro", type: "scholarship", percentage: 100, reason: "Bolsa integral - desempenho excepcional", startDate: "2026-02-01", endDate: "2026-12-31", status: "active" },
  { id: 3, studentId: 7, studentName: "Gabriela Nunes Pereira", type: "discount", percentage: 5, reason: "Desconto irmão", startDate: "2026-02-01", status: "active" },
];

const initialTransactions: Transaction[] = [
  { id: 1, date: "2026-06-01", description: "Recebimento mensalidades", type: "income", amount: 245000, category: "Mensalidades", method: "Diversos" },
  { id: 2, date: "2026-06-05", description: "Folha de pagamento", type: "expense", amount: 183000, category: "Pessoal", method: "Transferência" },
  { id: 3, date: "2026-06-08", description: "Material didático", type: "income", amount: 12500, category: "Materiais", method: "PIX" },
  { id: 4, date: "2026-06-09", description: "Aluguel unidade central", type: "expense", amount: 28000, category: "Infraestrutura", method: "Boleto" },
  { id: 5, date: "2026-06-10", description: "Mensalidades recebidas", type: "income", amount: 30000, category: "Mensalidades", method: "Diversos" },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [contracts, setContracts] = useState<Contract[]>(initialContracts);
  const [discounts, setDiscounts] = useState<Discount[]>(initialDiscounts);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addStudent = (s: Omit<Student, "id">) => {
    setStudents(prev => [...prev, { ...s, id: Math.max(0, ...prev.map(x => x.id)) + 1 }]);
  };
  const updateStudent = (id: number, s: Partial<Student>) => {
    setStudents(prev => prev.map(x => x.id === id ? { ...x, ...s } : x));
  };
  const addInvoice = (i: Omit<Invoice, "id">) => {
    setInvoices(prev => [...prev, { ...i, id: Math.max(0, ...prev.map(x => x.id)) + 1 }]);
  };
  const updateInvoice = (id: number, i: Partial<Invoice>) => {
    setInvoices(prev => prev.map(x => x.id === id ? { ...x, ...i } : x));
  };
  const payInvoice = (id: number, method: string) => {
    setInvoices(prev => prev.map(x => x.id === id ? { ...x, status: "paid" as const, paidDate: new Date().toISOString().split("T")[0], paymentMethod: method } : x));
  };
  const addExpense = (e: Omit<Expense, "id">) => {
    setExpenses(prev => [...prev, { ...e, id: Math.max(0, ...prev.map(x => x.id)) + 1 }]);
  };
  const updateExpense = (id: number, e: Partial<Expense>) => {
    setExpenses(prev => prev.map(x => x.id === id ? { ...x, ...e } : x));
  };
  const payExpense = (id: number) => {
    setExpenses(prev => prev.map(x => x.id === id ? { ...x, status: "paid" as const, paidDate: new Date().toISOString().split("T")[0] } : x));
  };
  const addContract = (c: Omit<Contract, "id">) => {
    setContracts(prev => [...prev, { ...c, id: Math.max(0, ...prev.map(x => x.id)) + 1 }]);
  };
  const addDiscount = (d: Omit<Discount, "id">) => {
    setDiscounts(prev => [...prev, { ...d, id: Math.max(0, ...prev.map(x => x.id)) + 1 }]);
  };
  const addTransaction = (t: Omit<Transaction, "id">) => {
    setTransactions(prev => [...prev, { ...t, id: Math.max(0, ...prev.map(x => x.id)) + 1 }]);
  };

  return (
    <AppContext.Provider value={{
      students, invoices, expenses, contracts, discounts, transactions,
      addStudent, updateStudent, addInvoice, updateInvoice, payInvoice,
      addExpense, updateExpense, payExpense, addContract, addDiscount, addTransaction,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
