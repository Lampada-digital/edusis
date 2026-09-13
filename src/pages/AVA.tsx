import { useState } from "react";
import { Play, BookOpen, CheckCircle, Clock, ChevronRight, MonitorPlay, Award, Users, Sparkles, Plus } from "lucide-react";

const avaCourses = [
  { id: 1, title: "Matemática Fundamental", modules: 12, completed: 8, progress: 67, instructor: "Prof. Maria Fernanda" },
  { id: 2, title: "Redação ENEM", modules: 8, completed: 3, progress: 38, instructor: "Prof. Ricardo Santos" },
  { id: 3, title: "Ciências da Natureza", modules: 10, completed: 10, progress: 100, instructor: "Profa. Juliana Almeida" },
  { id: 4, title: "Inglês Intermediário", modules: 15, completed: 5, progress: 33, instructor: "Profa. Amanda Oliveira" },
];

const lessons = [
  { id: 1, title: "Introdução às Equações", duration: "15 min", type: "video", completed: true },
  { id: 2, title: "Equações do 1º Grau", duration: "20 min", type: "video", completed: true },
  { id: 3, title: "Exercícios Práticos", duration: "30 min", type: "quiz", completed: true },
  { id: 4, title: "Sistemas de Equações", duration: "25 min", type: "video", completed: false },
  { id: 5, title: "Atividade: Resolver Problemas", duration: "45 min", type: "activity", completed: false },
  { id: 6, title: "Avaliação do Módulo", duration: "60 min", type: "exam", completed: false },
];

export default function AVAPage() {
  const [view, setView] = useState<"courses" | "player">("courses");

  if (view === "player") {
    return (
      <div className="space-y-6">
        <button onClick={() => setView("courses")} className="text-sm text-primary-600 hover:underline">← Voltar aos cursos</button>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl aspect-video flex items-center justify-center mb-4">
              <div className="text-center">
                <Play className="w-12 h-12 text-white/80 mx-auto mb-2" />
                <p className="text-white/60 text-sm">Sistemas de Equações — Aula 4</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Sistemas de Equações</h2>
              <p className="text-sm text-gray-500 mb-4">Módulo 2 • Aula 4 de 6</p>
              <div className="prose prose-sm">
                <p className="text-gray-700">Nesta aula, vamos aprender a resolver sistemas de equações lineares com duas incógnitas. Utilizaremos os métodos de substituição e adição.</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-lg text-sm font-medium">
                  <Sparkles className="w-4 h-4" /> Perguntar ao Tutor IA
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Conteúdo do Curso</h3>
            <div className="space-y-2">
              {lessons.map(lesson => (
                <div key={lesson.id} className={`flex items-center gap-3 p-2 rounded-lg ${!lesson.completed ? "bg-primary-50 border border-primary-100" : "hover:bg-gray-50"}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${lesson.completed ? "bg-green-100" : "bg-gray-100"}`}>
                    {lesson.completed ? <CheckCircle className="w-3.5 h-3.5 text-green-600" /> : <Play className="w-3 h-3 text-gray-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">{lesson.title}</p>
                    <p className="text-[10px] text-gray-500">{lesson.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AVA — EDUGEST Learn</h1>
          <p className="text-sm text-gray-500">Ambiente Virtual de Aprendizagem</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-lg text-sm font-medium self-start">
          <Plus className="w-4 h-4" /> Novo Curso
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Cursos Ativos", value: "42", icon: BookOpen, color: "bg-blue-50 text-blue-600" },
          { label: "Alunos Inscritos", value: "1.847", icon: Users, color: "bg-purple-50 text-purple-600" },
          { label: "Certificados Emitidos", value: "324", icon: Award, color: "bg-green-50 text-green-600" },
          { label: "Taxa de Conclusão", value: "78%", icon: CheckCircle, color: "bg-orange-50 text-orange-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center mb-2`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {avaCourses.map(course => (
          <div key={course.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-32 bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
              <MonitorPlay className="w-10 h-10 text-white/80" />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{course.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{course.instructor}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>{course.completed}/{course.modules} módulos</span>
                <span className="font-medium text-primary-600">{course.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-primary-500 rounded-full transition-all" style={{ width: `${course.progress}%` }} />
              </div>
              <button onClick={() => setView("player")} className="w-full py-2 text-xs font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 flex items-center justify-center gap-1">
                {course.progress === 100 ? "Revisar" : "Continuar"} <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


