import { useState } from "react";
import { Check, X, Clock, AlertTriangle, Save, Sparkles } from "lucide-react";
import { useApp } from "../store/AppContext";

const classes = [
  { id: 1, name: "9º Ano A", teacher: "Prof. Maria Fernanda", students: 32, room: "Sala 201", shift: "Matutino" },
  { id: 2, name: "1º Ano EM", teacher: "Prof. Ricardo Santos", students: 35, room: "Sala 301", shift: "Matutino" },
  { id: 3, name: "5º Ano B", teacher: "Profa. Juliana Almeida", students: 28, room: "Sala 105", shift: "Vespertino" },
  { id: 4, name: "3º Ano EM", teacher: "Prof. Carlos Eduardo", students: 38, room: "Sala 302", shift: "Matutino" },
  { id: 5, name: "7º Ano A", teacher: "Profa. Amanda Oliveira", students: 30, room: "Sala 202", shift: "Vespertino" },
];

type AttendanceStatus = "present" | "absent" | "justified";

export default function AttendancePage() {
  const { students } = useApp();
  const [selectedClass, setSelectedClass] = useState(1);
  const [attendance, setAttendance] = useState<Record<number, AttendanceStatus>>({});
  const [saved, setSaved] = useState(false);
  const [notes, setNotes] = useState<Record<number, string>>({});

  const cls = classes.find(c => c.id === selectedClass)!;
  const classStudents = students.slice(0, cls.students);

  const setStatus = (id: number, status: AttendanceStatus) => {
    setAttendance(prev => ({ ...prev, [id]: status }));
    setSaved(false);
  };

  const markAllPresent = () => {
    const all: Record<number, AttendanceStatus> = {};
    classStudents.forEach(s => { all[s.id] = "present"; });
    setAttendance(all);
    setSaved(false);
  };

  const saveAttendance = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const presentCount = Object.values(attendance).filter(s => s === "present").length;
  const absentCount = Object.values(attendance).filter(s => s === "absent").length;
  const justifiedCount = Object.values(attendance).filter(s => s === "justified").length;
  const pendingCount = classStudents.length - presentCount - absentCount - justifiedCount;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Frequência</h1>
          <p className="text-sm text-gray-500">Chamada digital • {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedClass}
            onChange={(e) => { setSelectedClass(Number(e.target.value)); setAttendance({}); setNotes({}); }}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
          >
            {classes.map(c => <option key={c.id} value={c.id}>{c.name} — {c.shift}</option>)}
          </select>
          <button onClick={saveAttendance} className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-lg text-sm font-medium">
            <Save className="w-4 h-4" /> Salvar
          </button>
        </div>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 animate-fadeIn">
          <Check className="w-5 h-5 text-green-600" />
          <p className="text-sm text-green-700 font-medium">Frequência salva com sucesso!</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <p className="text-2xl font-bold text-green-700">{presentCount}</p>
          <p className="text-xs text-green-600">Presentes</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
          <p className="text-2xl font-bold text-red-700">{absentCount}</p>
          <p className="text-xs text-red-600">Ausentes</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-2xl font-bold text-blue-700">{justifiedCount}</p>
          <p className="text-xs text-blue-600">Justificados</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <p className="text-2xl font-bold text-gray-700">{pendingCount}</p>
          <p className="text-xs text-gray-600">Pendentes</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
          <p className="text-2xl font-bold text-purple-700">
            {classStudents.length > 0 ? Math.round(((presentCount + justifiedCount) / classStudents.length) * 100) : 0}%
          </p>
          <p className="text-xs text-purple-600">% Presença</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <button onClick={markAllPresent} className="px-3 py-1.5 text-xs font-medium bg-green-50 text-green-700 rounded-lg hover:bg-green-100 border border-green-200">
          ✓ Marcar todos presentes
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 border border-purple-200">
          <Sparkles className="w-3 h-3" /> Análise IA
        </button>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{cls.name} — {cls.shift}</h3>
            <p className="text-xs text-gray-500">{cls.teacher} • {cls.room} • {cls.students} alunos</p>
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {classStudents.map((s) => {
            const status = attendance[s.id];
            return (
              <div key={s.id} className="px-4 py-3 hover:bg-gray-50/50">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary-700">{s.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.enrollment}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setStatus(s.id, "present")}
                      className={`p-2 rounded-lg transition-all ${status === "present" ? "bg-green-500 text-white shadow-sm" : "bg-gray-100 text-gray-400 hover:bg-green-50 hover:text-green-600"}`}
                      title="Presente"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setStatus(s.id, "absent")}
                      className={`p-2 rounded-lg transition-all ${status === "absent" ? "bg-red-500 text-white shadow-sm" : "bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-600"}`}
                      title="Ausente"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setStatus(s.id, "justified")}
                      className={`p-2 rounded-lg transition-all ${status === "justified" ? "bg-blue-500 text-white shadow-sm" : "bg-gray-100 text-gray-400 hover:bg-blue-50 hover:text-blue-600"}`}
                      title="Justificado"
                    >
                      <Clock className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {status === "absent" && (
                  <div className="mt-2 ml-11">
                    <input
                      type="text"
                      placeholder="Observação (opcional)"
                      value={notes[s.id] || ""}
                      onChange={(e) => setNotes(prev => ({ ...prev, [s.id]: e.target.value }))}
                      className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-primary-500"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
