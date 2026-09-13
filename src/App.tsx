import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import DashboardPage from "./pages/Dashboard";
import StudentsPage from "./pages/Students";
import TeachersPage from "./pages/Teachers";
import ClassesPage from "./pages/Classes";
import CoursesPage from "./pages/Courses";
import GradesPage from "./pages/Grades";
import AttendancePage from "./pages/Attendance";
import CalendarPage from "./pages/Calendar";
import EnrollmentPage from "./pages/Enrollment";
import FinancePage from "./pages/Finance";
import CRMPage from "./pages/CRM";
import DocumentsPage from "./pages/Documents";
import CommunicationPage from "./pages/Communication";
import AVAPage from "./pages/AVA";
import LibraryPage from "./pages/Library";
import AIPage from "./pages/AI";
import RadarPage from "./pages/Radar";
import CommandPage from "./pages/Command";
import ReportsPage from "./pages/Reports";
import SettingsPage from "./pages/Settings";
import LandingPage from "./pages/Landing";

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  if (!isLoggedIn) {
    return <LandingPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard": return <DashboardPage />;
      case "students": return <StudentsPage />;
      case "teachers": return <TeachersPage />;
      case "classes": return <ClassesPage />;
      case "courses": return <CoursesPage />;
      case "grades": return <GradesPage />;
      case "attendance": return <AttendancePage />;
      case "calendar": return <CalendarPage />;
      case "enrollment": return <EnrollmentPage />;
      case "finance": return <FinancePage />;
      case "crm": return <CRMPage />;
      case "documents": return <DocumentsPage />;
      case "communication": return <CommunicationPage />;
      case "ava": return <AVAPage />;
      case "library": return <LibraryPage />;
      case "ai": return <AIPage />;
      case "radar": return <RadarPage />;
      case "command": return <CommandPage />;
      case "reports": return <ReportsPage />;
      case "settings": return <SettingsPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          currentPage={currentPage}
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
