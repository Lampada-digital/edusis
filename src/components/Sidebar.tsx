import { useState } from "react";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, Award,
  ClipboardList, CalendarCheck, Calendar, FileText, DollarSign,
  Target, FolderOpen, MessageSquare, MonitorPlay, Library,
  Brain, Radar, Shield, BarChart3, Settings, ChevronDown,
  ChevronRight, Sparkles, X, Menu
} from "lucide-react";
import { sidebarMenu } from "../data/mockData";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Award,
  ClipboardList,
  CalendarCheck,
  Calendar,
  FileText,
  DollarSign,
  Target,
  FolderOpen,
  MessageSquare,
  MonitorPlay,
  Library,
  Brain,
  Radar,
  Shield,
  BarChart3,
  Settings,
};

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ currentPage, setCurrentPage, isOpen, setIsOpen }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["Principal", "Acadêmico", "Gestão", "Inteligência"]);

  const sections = [...new Set(sidebarMenu.map(item => item.section))];

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
          isOpen ? "w-64" : "w-0 lg:w-16"
        } overflow-hidden`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100 flex-shrink-0">
          {isOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 tracking-tight">EDUGEST</h1>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 lg:block hidden"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 lg:hidden"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {sections.map(section => (
            <div key={section} className="mb-2">
              {isOpen && (
                <button
                  onClick={() => toggleSection(section)}
                  className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600"
                >
                  {section}
                  {expandedSections.includes(section) ? (
                    <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronRight className="w-3 h-3" />
                  )}
                </button>
              )}
              {(expandedSections.includes(section) || !isOpen) && (
                <div className="space-y-0.5">
                  {sidebarMenu
                    .filter(item => item.section === section)
                    .map(item => {
                      const Icon = iconMap[item.icon] || LayoutDashboard;
                      const isActive = currentPage === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setCurrentPage(item.id);
                            if (window.innerWidth < 1024) setIsOpen(false);
                          }}
                          className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            isActive
                              ? "bg-primary-50 text-primary-700 border border-primary-100"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          } ${!isOpen ? "justify-center" : ""}`}
                          title={!isOpen ? item.label : undefined}
                        >
                          <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-primary-600" : ""}`} />
                          {isOpen && <span>{item.label}</span>}
                          {isOpen && item.id === "ai" && (
                            <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
                              AI
                            </span>
                          )}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        {isOpen && (
          <div className="border-t border-gray-100 p-3">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-xs font-bold text-primary-700">AD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
                <p className="text-xs text-gray-500 truncate">admin@edugest.com</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
