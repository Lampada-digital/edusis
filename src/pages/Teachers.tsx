import { Star, Users, BookOpen, Sparkles, Search, Plus } from "lucide-react";
import { teachers } from "../data/mockData";

export default function TeachersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Professores</h1>
          <p className="text-sm text-gray-500">186 professores ativos • 6 unidades</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Buscar professor..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 gradient-primary text-white rounded-lg text-sm font-medium">
            <Plus className="w-4 h-4" /> Novo Professor
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{teacher.avatar}</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{teacher.name}</h3>
                  <p className="text-xs text-gray-500">{teacher.subject}</p>
                </div>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{teacher.classes}</p>
                <p className="text-[10px] text-gray-500">Turmas</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{teacher.students}</p>
                <p className="text-[10px] text-gray-500">Alunos</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-0.5">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <p className="text-lg font-bold text-gray-900">{teacher.rating}</p>
                </div>
                <p className="text-[10px] text-gray-500">Avaliação</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 text-xs font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100">
                Ver Perfil
              </button>
              <button className="flex-1 py-2 text-xs font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100">
                Diário
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
