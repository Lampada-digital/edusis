import { useState } from "react";
import { Bell, Search, Menu, Sparkles, ChevronDown, LogOut } from "lucide-react";
import { notifications } from "../data/mockData";

const pageNames: Record<string, string> = {
  dashboard: "Dashboard",
  students: "Alunos",
  teachers: "Professores",
  classes: "Turmas",
  courses: "Cursos",
  grades: "Notas",
  attendance: "Frequência",
  calendar: "Calendário",
  enrollment: "Matrículas",
  finance: "Financeiro",
  crm: "CRM",
  documents: "Documentos",
  communication: "Comunicação",
  ava: "AVA / Learn",
  library: "Biblioteca",
  ai: "EDUGEST AI",
  radar: "Radar",
  command: "Command Center",
  reports: "Relatórios",
  settings: "Configurações",
};

interface TopBarProps {
  currentPage: string;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function TopBar({ currentPage, toggleSidebar }: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 lg:hidden">
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{pageNames[currentPage] || "Dashboard"}</h2>
          <p className="text-xs text-gray-500 hidden sm:block">Colégio EDUGEST • Unidade Central • 2026</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-3 py-2 w-64">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent text-sm text-gray-700 outline-none w-full placeholder:text-gray-400"
          />
          <kbd className="text-[10px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded">⌘K</kbd>
        </div>

        {/* AI Button */}
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">IA</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="p-2 rounded-lg hover:bg-gray-100 relative"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 animate-fadeIn">
              <div className="p-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Notificações</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className={`p-3 border-b border-gray-50 hover:bg-gray-50 ${!n.read ? "bg-primary-50/30" : ""}`}>
                    <div className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        n.type === "critical" ? "bg-red-500" :
                        n.type === "warning" ? "bg-orange-500" :
                        n.type === "success" ? "bg-green-500" : "bg-blue-500"
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{n.title}</p>
                        <p className="text-xs text-gray-500">{n.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100"
          >
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
              <span className="text-xs font-bold text-white">AD</span>
            </div>
            <ChevronDown className="w-3 h-3 text-gray-400 hidden sm:block" />
          </button>
          {showProfile && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50 animate-fadeIn">
              <div className="p-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">Administrador</p>
                <p className="text-xs text-gray-500">admin@edugest.com</p>
              </div>
              <div className="p-1">
                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  <span>Perfil</span>
                </button>
                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  <span>Configurações</span>
                </button>
                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                  <LogOut className="w-4 h-4" />
                  <span>Sair</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
