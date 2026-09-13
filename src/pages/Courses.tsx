import { BookOpen, Users, Clock, Award, Plus } from "lucide-react";
import { courses } from "../data/mockData";

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cursos</h1>
          <p className="text-sm text-gray-500">42 cursos ativos</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-lg text-sm font-medium self-start">
          <Plus className="w-4 h-4" /> Novo Curso
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                <Award className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{course.name}</h3>
                <p className="text-xs text-gray-500">{course.modality}</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4 text-gray-400" /> {course.students} alunos
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" /> {course.duration}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 text-xs font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100">Currículo</button>
              <button className="flex-1 py-2 text-xs font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100">Turmas</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
