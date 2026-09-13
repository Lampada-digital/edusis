import { useState } from "react";
import { ChevronDown, Edit, Sparkles } from "lucide-react";
import { students, classes } from "../data/mockData";

export default function GradesPage() {
  const [selectedClass, setSelectedClass] = useState(classes[0].id);
  const cls = classes.find(c => c.id === selectedClass);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notas</h1>
          <p className="text-sm text-gray-500">Lançamento e acompanhamento de notas</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(Number(e.target.value))}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
          >
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button className="flex items-center gap-2 px-3 py-2 gradient-primary text-white rounded-lg text-sm font-medium">
            <Sparkles className="w-4 h-4" /> Analisar com IA
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{cls?.name}</h3>
            <p className="text-xs text-gray-500">{cls?.teacher} • {cls?.shift}</p>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded-full">1ª Unidade</span>
            <button className="flex items-center gap-1 px-2 py-1 text-xs border border-gray-200 rounded-lg text-gray-600">
              Unidade <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Aluno</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Prova 1</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Prova 2</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Trabalho</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Participação</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Média</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Situação</th>
              </tr>
            </thead>
            <tbody>
              {students.slice(0, 8).map((s, i) => {
                const p1 = (6 + Math.random() * 4).toFixed(1);
                const p2 = (5.5 + Math.random() * 4.5).toFixed(1);
                const t = (6 + Math.random() * 4).toFixed(1);
                const part = (7 + Math.random() * 3).toFixed(1);
                const avg = ((parseFloat(p1) * 0.3 + parseFloat(p2) * 0.3 + parseFloat(t) * 0.25 + parseFloat(part) * 0.15)).toFixed(1);
                return (
                  <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{s.name}</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-700">{p1}</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-700">{p2}</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-700">{t}</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-700">{part}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-sm font-bold ${parseFloat(avg) >= 7 ? "text-green-600" : parseFloat(avg) >= 5 ? "text-orange-600" : "text-red-600"}`}>
                        {avg}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${parseFloat(avg) >= 7 ? "bg-green-50 text-green-700" : parseFloat(avg) >= 5 ? "bg-orange-50 text-orange-700" : "bg-red-50 text-red-700"}`}>
                        {parseFloat(avg) >= 7 ? "Aprovado" : parseFloat(avg) >= 5 ? "Recuperação" : "Reprovado"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
