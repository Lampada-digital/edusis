import { Check, X, Clock, AlertTriangle, Search } from "lucide-react";
import { students, classes } from "../data/mockData";
import { useState } from "react";

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState(classes[0].id);
  const [attendance, setAttendance] = useState<Record<number, boolean>>({});
  const cls = classes.find(c => c.id === selectedClass);

  const toggleAttendance = (id: number) => {
    setAttendance(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Frequência</h1>
          <p className="text-sm text-gray-500">Chamada digital • {new Date().toLocaleDateString("pt-BR")}</p>
        </div>
        <select
          value={selectedClass}
          onChange={(e) => { setSelectedClass(Number(e.target.value)); setAttendance({}); }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
        >
          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <p className="text-2xl font-bold text-green-700">{Object.values(attendance).filter(Boolean).length || cls?.students}</p>
          <p className="text-xs text-green-600">Presentes</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
          <p className="text-2xl font-bold text-red-700">{Object.values(attendance).filter(v => v === false).length || 0}</p>
          <p className="text-xs text-red-600">Ausentes</p>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
          <p className="text-2xl font-bold text-orange-700">0</p>
          <p className="text-xs text-orange-600">Justificados</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{cls?.name} — {cls?.shift}</h3>
          <button className="px-4 py-2 gradient-primary text-white rounded-lg text-sm font-medium">
            Salvar Chamada
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {students.slice(0, cls?.students || 10).map((s) => {
            const isPresent = attendance[s.id] !== false;
            return (
              <div key={s.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-700">{s.avatar}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{s.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAttendance(prev => ({ ...prev, [s.id]: true }))}
                    className={`p-2 rounded-lg transition-colors ${attendance[s.id] !== false ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setAttendance(prev => ({ ...prev, [s.id]: false }))}
                    className={`p-2 rounded-lg transition-colors ${attendance[s.id] === false ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-400"}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
