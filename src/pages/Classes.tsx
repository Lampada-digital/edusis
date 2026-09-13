import { Users, BarChart3, Clock, MapPin, Sparkles } from "lucide-react";
import { classes } from "../data/mockData";

export default function ClassesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Turmas</h1>
          <p className="text-sm text-gray-500">128 turmas ativas • Ano letivo 2026</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-lg text-sm font-medium self-start">
          + Nova Turma
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">{cls.name}</h3>
              <span className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">{cls.shift}</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">{cls.teacher}</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">{cls.students} alunos</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">{cls.room}</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">Média: {cls.avgGrade}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">{cls.attendance}% freq.</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 text-xs font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100">
                Ver Detalhes
              </button>
              <button className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100">
                <Sparkles className="w-3 h-3" /> Analisar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
