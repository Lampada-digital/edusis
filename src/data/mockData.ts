export const institution = {
  name: "Colégio EDUGEST",
  slogan: "Gestão inteligente para uma educação melhor.",
  units: ["Unidade Central", "Unidade Norte", "Unidade Sul"],
  year: 2026,
  students: 2847,
  teachers: 186,
  employees: 94,
  courses: 42,
  classes: 128,
  mrr: 284700,
  leads: 342,
};

export const dashboardStats = [
  { label: "Alunos Ativos", value: "2.847", change: "+12%", trend: "up", icon: "users" },
  { label: "Novas Matrículas", value: "156", change: "+23%", trend: "up", icon: "user-plus" },
  { label: "Inadimplência", value: "4.2%", change: "-0.8%", trend: "down", icon: "dollar-sign" },
  { label: "Frequência Média", value: "94.7%", change: "+1.2%", trend: "up", icon: "check-circle" },
  { label: "Desempenho Médio", value: "7.8", change: "+0.3", trend: "up", icon: "trending-up" },
  { label: "Leads Ativos", value: "342", change: "+18%", trend: "up", icon: "target" },
];

export const revenueData = [
  { month: "Jan", receita: 245000, despesas: 180000 },
  { month: "Fev", receita: 258000, despesas: 175000 },
  { month: "Mar", receita: 272000, despesas: 182000 },
  { month: "Abr", receita: 265000, despesas: 178000 },
  { month: "Mai", receita: 280000, despesas: 185000 },
  { month: "Jun", receita: 284700, despesas: 190000 },
];

export const enrollmentData = [
  { month: "Jan", matriculas: 45, rematriculas: 120 },
  { month: "Fev", matriculas: 38, rematriculas: 95 },
  { month: "Mar", matriculas: 52, rematriculas: 80 },
  { month: "Abr", matriculas: 28, rematriculas: 45 },
  { month: "Mai", matriculas: 35, rematriculas: 30 },
  { month: "Jun", matriculas: 156, rematriculas: 20 },
];

export const performanceData = [
  { range: "0-4", count: 23 },
  { range: "4-5", count: 67 },
  { range: "5-6", count: 189 },
  { range: "6-7", count: 456 },
  { range: "7-8", count: 892 },
  { range: "8-9", count: 734 },
  { range: "9-10", count: 486 },
];

export const alerts = [
  { id: 1, type: "critical", title: "3 alunos com frequência abaixo de 50%", time: "Há 2h" },
  { id: 2, type: "warning", title: "12 mensalidades vencem amanhã", time: "Há 3h" },
  { id: 3, type: "info", title: "Nova matrícula pendente de aprovação", time: "Há 4h" },
  { id: 4, type: "warning", title: "Professor João solicitou alteração de horário", time: "Há 5h" },
  { id: 5, type: "info", title: "Campanha de rematrícula atingiu 78% da meta", time: "Há 6h" },
];

export const students = [
  { id: 1, name: "Ana Carolina Silva", enrollment: "EDU2026001", class: "9º Ano A", course: "Ensino Fundamental", status: "active", avgGrade: 8.5, attendance: 96, financial: "ok", avatar: "AC" },
  { id: 2, name: "Bruno Santos Oliveira", enrollment: "EDU2026002", class: "1º Ano EM", course: "Ensino Médio", status: "active", avgGrade: 7.2, attendance: 88, financial: "overdue", avatar: "BS" },
  { id: 3, name: "Carla Mendes Ferreira", enrollment: "EDU2026003", class: "5º Ano B", course: "Ensino Fundamental", status: "active", avgGrade: 9.1, attendance: 98, financial: "ok", avatar: "CM" },
  { id: 4, name: "Daniel Costa Ribeiro", enrollment: "EDU2026004", class: "3º Ano EM", course: "Ensino Médio", status: "active", avgGrade: 6.8, attendance: 72, financial: "overdue", avatar: "DC" },
  { id: 5, name: "Elena Rodrigues Lima", enrollment: "EDU2026005", class: "7º Ano A", course: "Ensino Fundamental", status: "active", avgGrade: 8.9, attendance: 95, financial: "ok", avatar: "ER" },
  { id: 6, name: "Felipe Almeida Souza", enrollment: "EDU2026006", class: "2º Ano EM", course: "Ensino Médio", status: "active", avgGrade: 7.5, attendance: 91, financial: "ok", avatar: "FA" },
  { id: 7, name: "Gabriela Nunes Pereira", enrollment: "EDU2026007", class: "6º Ano A", course: "Ensino Fundamental", status: "active", avgGrade: 8.2, attendance: 93, financial: "ok", avatar: "GN" },
  { id: 8, name: "Henrique Barbosa Gomes", enrollment: "EDU2026008", class: "8º Ano B", course: "Ensino Fundamental", status: "active", avgGrade: 5.9, attendance: 68, financial: "overdue", avatar: "HB" },
  { id: 9, name: "Isabela Martins Castro", enrollment: "EDU2026009", class: "1º Ano EM", course: "Ensino Médio", status: "active", avgGrade: 9.4, attendance: 99, financial: "ok", avatar: "IM" },
  { id: 10, name: "João Pedro Cardoso", enrollment: "EDU2026010", class: "4º Ano A", course: "Ensino Fundamental", status: "active", avgGrade: 7.8, attendance: 90, financial: "ok", avatar: "JP" },
];

export const teachers = [
  { id: 1, name: "Prof. Maria Fernanda Costa", subject: "Matemática", classes: 6, students: 180, rating: 4.8, avatar: "MF" },
  { id: 2, name: "Prof. Ricardo Santos", subject: "Português", classes: 5, students: 150, rating: 4.6, avatar: "RS" },
  { id: 3, name: "Profa. Juliana Almeida", subject: "Ciências", classes: 4, students: 120, rating: 4.9, avatar: "JA" },
  { id: 4, name: "Prof. Carlos Eduardo", subject: "História", classes: 5, students: 150, rating: 4.5, avatar: "CE" },
  { id: 5, name: "Profa. Amanda Oliveira", subject: "Inglês", classes: 6, students: 180, rating: 4.7, avatar: "AO" },
  { id: 6, name: "Prof. Lucas Ferreira", subject: "Física", classes: 3, students: 90, rating: 4.4, avatar: "LF" },
];

export const classes = [
  { id: 1, name: "9º Ano A", teacher: "Prof. Maria Fernanda", students: 32, avgGrade: 7.8, attendance: 94, room: "Sala 201", shift: "Matutino" },
  { id: 2, name: "1º Ano EM", teacher: "Prof. Ricardo Santos", students: 35, avgGrade: 7.2, attendance: 91, room: "Sala 301", shift: "Matutino" },
  { id: 3, name: "5º Ano B", teacher: "Profa. Juliana Almeida", students: 28, avgGrade: 8.4, attendance: 96, room: "Sala 105", shift: "Vespertino" },
  { id: 4, name: "3º Ano EM", teacher: "Prof. Carlos Eduardo", students: 38, avgGrade: 7.0, attendance: 88, room: "Sala 302", shift: "Matutino" },
  { id: 5, name: "7º Ano A", teacher: "Profa. Amanda Oliveira", students: 30, avgGrade: 8.1, attendance: 93, room: "Sala 202", shift: "Vespertino" },
];

export const leads = [
  { id: 1, name: "Patrícia Mendes", email: "patricia@email.com", phone: "(11) 99999-1234", source: "Website", stage: "Qualificação", value: 2500, date: "2026-06-10" },
  { id: 2, name: "Roberto Silva", email: "roberto@email.com", phone: "(11) 98888-5678", source: "Indicação", stage: "Proposta", value: 3200, date: "2026-06-08" },
  { id: 3, name: "Camila Torres", email: "camila@email.com", phone: "(11) 97777-9012", source: "Instagram", stage: "Negociação", value: 4100, date: "2026-06-05" },
  { id: 4, name: "Fernando Dias", email: "fernando@email.com", phone: "(11) 96666-3456", source: "Google Ads", stage: "Novo Lead", value: 1800, date: "2026-06-12" },
  { id: 5, name: "Luciana Ramos", email: "luciana@email.com", phone: "(11) 95555-7890", source: "Evento", stage: "Visita Agendada", value: 5500, date: "2026-06-03" },
];

export const financeData = [
  { month: "Jan", recebido: 230000, previsto: 245000 },
  { month: "Fev", recebido: 248000, previsto: 258000 },
  { month: "Mar", recebido: 260000, previsto: 272000 },
  { month: "Abr", recebido: 255000, previsto: 265000 },
  { month: "Mai", recebido: 270000, previsto: 280000 },
  { month: "Jun", recebido: 275000, previsto: 284700 },
];

export const courses = [
  { id: 1, name: "Ensino Fundamental II", modality: "Presencial", students: 1200, duration: "4 anos", status: "active" },
  { id: 2, name: "Ensino Médio", modality: "Presencial", students: 980, duration: "3 anos", status: "active" },
  { id: 3, name: "Curso de Inglês", modality: "Híbrido", students: 320, duration: "2 anos", status: "active" },
  { id: 4, name: "Robótica e Programação", modality: "Presencial", students: 180, duration: "1 ano", status: "active" },
  { id: 5, name: "Preparatório ENEM", modality: "Online", students: 167, duration: "1 ano", status: "active" },
];

export const calendarEvents = [
  { id: 1, title: "Reunião Pedagógica", date: "2026-06-15", type: "meeting", color: "blue" },
  { id: 2, title: "Prova de Matemática - 9º Ano", date: "2026-06-16", type: "exam", color: "red" },
  { id: 3, title: "Festa Junina", date: "2026-06-20", type: "event", color: "green" },
  { id: 4, title: "Conselho de Classe", date: "2026-06-22", type: "meeting", color: "blue" },
  { id: 5, title: "Início Rematrícula", date: "2026-06-25", type: "deadline", color: "orange" },
  { id: 6, title: "Feriado - São João", date: "2026-06-24", type: "holiday", color: "gray" },
];

export const aiAgents = [
  { id: 1, name: "Academic Agent", description: "Análise acadêmica e desempenho", status: "active", actions: 1247 },
  { id: 2, name: "Tutor Agent", description: "Tutoria personalizada para alunos", status: "active", actions: 3891 },
  { id: 3, name: "Finance Agent", description: "Análise financeira e inadimplência", status: "active", actions: 456 },
  { id: 4, name: "Commercial Agent", description: "CRM e captação de alunos", status: "active", actions: 789 },
  { id: 5, name: "Support Agent", description: "Suporte e atendimento", status: "active", actions: 2134 },
  { id: 6, name: "Content Agent", description: "Geração de conteúdo educacional", status: "active", actions: 567 },
];

export const notifications = [
  { id: 1, title: "Nova matrícula aprovada", message: "Ana Carolina Silva - 9º Ano A", time: "Há 5 min", read: false, type: "success" },
  { id: 2, title: "Mensalidade vencida", message: "Bruno Santos - R$ 1.850,00", time: "Há 15 min", read: false, type: "warning" },
  { id: 3, title: "Atividade AVA concluída", message: "Módulo 3 - Ciências - 5º Ano B", time: "Há 30 min", read: true, type: "info" },
  { id: 4, title: "Alerta de frequência", message: "Daniel Costa - 72% de presença", time: "Há 1h", read: false, type: "critical" },
  { id: 5, title: "Documento assinado", message: "Contrato de matrícula - Fernanda Lima", time: "Há 2h", read: true, type: "success" },
];

export const sidebarMenu = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", section: "Principal" },
  { id: "students", label: "Alunos", icon: "Users", section: "Principal" },
  { id: "teachers", label: "Professores", icon: "GraduationCap", section: "Principal" },
  { id: "classes", label: "Turmas", icon: "BookOpen", section: "Principal" },
  { id: "courses", label: "Cursos", icon: "Award", section: "Acadêmico" },
  { id: "grades", label: "Notas", icon: "ClipboardList", section: "Acadêmico" },
  { id: "attendance", label: "Frequência", icon: "CalendarCheck", section: "Acadêmico" },
  { id: "calendar", label: "Calendário", icon: "Calendar", section: "Acadêmico" },
  { id: "enrollment", label: "Matrículas", icon: "FileText", section: "Gestão" },
  { id: "finance", label: "Financeiro", icon: "DollarSign", section: "Gestão" },
  { id: "crm", label: "CRM", icon: "Target", section: "Gestão" },
  { id: "documents", label: "Documentos", icon: "FolderOpen", section: "Gestão" },
  { id: "communication", label: "Comunicação", icon: "MessageSquare", section: "Gestão" },
  { id: "ava", label: "AVA / Learn", icon: "MonitorPlay", section: "Educação" },
  { id: "ava-teacher", label: "AVA Professor", icon: "BookOpen", section: "Educação" },
  { id: "ava-student", label: "AVA Aluno", icon: "GraduationCap", section: "Educação" },
  { id: "library", label: "Biblioteca", icon: "Library", section: "Educação" },
  { id: "ai", label: "EDUGEST AI", icon: "Brain", section: "Inteligência" },
  { id: "radar", label: "Radar", icon: "Radar", section: "Inteligência" },
  { id: "command", label: "Command Center", icon: "Shield", section: "Inteligência" },
  { id: "reports", label: "Relatórios", icon: "BarChart3", section: "Analytics" },
  { id: "settings", label: "Configurações", icon: "Settings", section: "Sistema" },
];
