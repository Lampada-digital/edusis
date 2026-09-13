import { useState } from "react";
import {
  BookOpen, Calendar, FileText, CheckCircle, Clock, Play,
  Download, Eye, Star, MessageSquare, Award, TrendingUp
} from "lucide-react";
import { useApp } from "../store/AppContext";

// Dados simulados que viriam do AVA do professor
const studentClasses = [
  { id: 1, name: "9º Ano A", subject: "Matemática", teacher: "Prof. Maria Fernanda" },
];

const lessons = [
  {
    id: 1,
    classId: 1,
    date: "2026-06-10",
    content: "Equações do 2º grau - Fórmula de Bhaskara",
    homework: "Exercícios 1-10 página 45",
    observations: "Maioria da turma compreendeu o conceito",
    materials: ["Slides - Bhaskara.pdf", "Vídeo - Resolução de Equações.mp4"],
  },
  {
    id: 2,
    classId: 1,
    date: "2026-06-08",
    content: "Introdução às equações quadráticas",
    homework: "Leitura capítulo 3",
    materials: ["Capítulo 3 - Equações.pdf"],
  },
  {
    id: 3,
    classId: 1,
    date: "2026-06-05",
    content: "Revisão - Equações do 1º grau",
    homework: null,
    materials: ["Resumo - Equações 1º grau.pdf"],
  },
];

const assessments = [
  {
    id: 1,
    classId: 1,
    title: "Prova P1 - Equações",
    type: "prova",
    date: "2026-06-15",
    maxGrade: 10,
    weight: 3,
    description: "Prova covering equações do 1º e 2º grau",
    status: "upcoming",
  },
  {
    id: 2,
    classId: 1,
    title: "Trabalho em Grupo",
    type: "trabalho",
    date: "2026-06-20",
    maxGrade: 10,
    weight: 2,
    description: "Trabalho sobre aplicações de equações no cotidiano",
    status: "upcoming",
  },
  {
    id: 3,
    classId: 1,
    title: "Atividade - Lista de Exercícios",
    type: "atividade",
    date: "2026-06-03",
    maxGrade: 10,
    weight: 1,
    status: "completed",
  },
];

const grades: Record<number, number> = {
  3: 8.5, // Atividade completada
};

const homeworkSubmissions = [
  { lessonId: 1, submitted: true, date: "2026-06-11", grade: null },
  { lessonId: 2, submitted: true, date: "2026-06-09", grade: 9.0 },
];

export default function AVAStudentPage() {
  const { students } = useApp();
  const [activeTab, setActiveTab] = useState<"overview" | "lessons" | "assessments" | "grades">("overview");
  const [selectedLesson, setSelectedLesson] = useState<typeof lessons[0] | null>(null);

  // Simulando o aluno logado (primeiro aluno da lista)
  const currentStudent = students[0];
  const myLessons = lessons.filter(l => l.classId === 1);
  const myAssessments = assessments.filter(a => a.classId === 1);

  // Calcular média
  const completedAssessments = myAssessments.filter(a => a.status === "completed");
  const totalWeight = completedAssessments.reduce((sum, a) => sum + a.weight, 0);
  const weightedAvg = completedAssessments.reduce((sum, a) => sum + ((grades[a.id] || 0) * a.weight), 0) / (totalWeight || 1);

  const upcomingAssessments = myAssessments.filter(a => a.status === "upcoming");
  const pendingHomework = myLessons.filter(l => l.homework && !homeworkSubmissions.find(h => h.lessonId === l.id && h.submitted));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Olá, {currentStudent?.name.split(' ')[0]}! 👋</h1>
            <p className="text-sm text-white/80">{studentClasses[0].name} • {studentClasses[0].subject}</p>
            <p className="text-xs text-white/60 mt-1">Professor: {studentClasses[0].teacher}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{weightedAvg.toFixed(1)}</p>
            <p className="text-xs text-white/80">Média Atual</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-primary-600" />
            <span className="text-xs text-gray-500">Aulas</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{myLessons.length}</p>
          <p className="text-xs text-gray-500">ministradas</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-orange-600" />
            <span className="text-xs text-gray-500">Avaliações</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{upcomingAssessments.length}</p>
          <p className="text-xs text-gray-500">próximas</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-xs text-gray-500">Tarefas</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{pendingHomework.length}</p>
          <p className="text-xs text-gray-500">pendentes</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-600" />
            <span className="text-xs text-gray-500">Frequência</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">96%</p>
          <p className="text-xs text-gray-500">de presença</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-100 p-1.5">
        <div className="flex gap-1">
          {[
            { id: "overview", label: "Visão Geral", icon: TrendingUp },
            { id: "lessons", label: "Aulas", icon: BookOpen },
            { id: "assessments", label: "Avaliações", icon: FileText },
            { id: "grades", label: "Notas", icon: Star },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id ? "bg-primary-50 text-primary-700" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Visão Geral */}
      {activeTab === "overview" && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Próximas Avaliações */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-600" />
              Próximas Avaliações
            </h3>
            <div className="space-y-3">
              {upcomingAssessments.slice(0, 3).map(assessment => (
                <div key={assessment.id} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{assessment.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(assessment.date).toLocaleDateString('pt-BR')} • Valor: {assessment.maxGrade} pontos
                    </p>
                  </div>
                </div>
              ))}
              {upcomingAssessments.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">Nenhuma avaliação próxima</p>
              )}
            </div>
          </div>

          {/* Tarefas Pendentes */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Tarefas Pendentes
            </h3>
            <div className="space-y-3">
              {pendingHomework.slice(0, 3).map(lesson => (
                <div key={lesson.id} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{lesson.homework}</p>
                    <p className="text-xs text-gray-500">
                      Aula: {new Date(lesson.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
              {pendingHomework.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">Todas as tarefas em dia! 🎉</p>
              )}
            </div>
          </div>

          {/* Últimas Aulas */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary-600" />
              Últimas Aulas
            </h3>
            <div className="space-y-3">
              {myLessons.slice(0, 3).map(lesson => (
                <div key={lesson.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer" onClick={() => { setSelectedLesson(lesson); setActiveTab("lessons"); }}>
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{lesson.content}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(lesson.date).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}
                    </p>
                    {lesson.materials && (
                      <p className="text-xs text-primary-600 mt-1">{lesson.materials.length} material(is) disponível(is)</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Aulas */}
      {activeTab === "lessons" && (
        <div className="space-y-4">
          {selectedLesson ? (
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <button onClick={() => setSelectedLesson(null)} className="text-sm text-primary-600 hover:underline mb-4">
                ← Voltar para a lista
              </button>
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">
                  {new Date(selectedLesson.date).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
                <h2 className="text-xl font-bold text-gray-900">{selectedLesson.content}</h2>
              </div>

              {selectedLesson.observations && (
                <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
                  <p className="text-xs font-medium text-yellow-900 mb-1">💡 Observações do Professor:</p>
                  <p className="text-sm text-yellow-700">{selectedLesson.observations}</p>
                </div>
              )}

              {selectedLesson.homework && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-xs font-medium text-blue-900 mb-1">📚 Tarefa de Casa:</p>
                  <p className="text-sm text-blue-700 mb-3">{selectedLesson.homework}</p>
                  {homeworkSubmissions.find(h => h.lessonId === selectedLesson.id)?.submitted ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs font-medium">Tarefa enviada</span>
                    </div>
                  ) : (
                    <button className="px-3 py-1.5 text-xs font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
                      Enviar Tarefa
                    </button>
                  )}
                </div>
              )}

              {selectedLesson.materials && selectedLesson.materials.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">📎 Materiais da Aula</h3>
                  <div className="space-y-2">
                    {selectedLesson.materials.map((material, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">{material}</span>
                        </div>
                        <button className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {myLessons.map(lesson => (
                <div
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">
                        {new Date(lesson.date).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}
                      </p>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">{lesson.content}</h3>
                      {lesson.homework && (
                        <div className="flex items-center gap-2 text-xs text-blue-600">
                          <FileText className="w-3 h-3" />
                          <span>Tarefa: {lesson.homework}</span>
                        </div>
                      )}
                      {lesson.materials && lesson.materials.length > 0 && (
                        <div className="flex items-center gap-2 text-xs text-primary-600 mt-1">
                          <Download className="w-3 h-3" />
                          <span>{lesson.materials.length} material(is)</span>
                        </div>
                      )}
                    </div>
                    <Eye className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Avaliações */}
      {activeTab === "assessments" && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {myAssessments.map(assessment => (
              <div key={assessment.id} className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        assessment.type === "prova" ? "bg-red-50 text-red-700" :
                        assessment.type === "trabalho" ? "bg-blue-50 text-blue-700" :
                        assessment.type === "atividade" ? "bg-green-50 text-green-700" :
                        "bg-purple-50 text-purple-700"
                      }`}>
                        {assessment.type}
                      </span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        assessment.status === "completed" ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"
                      }`}>
                        {assessment.status === "completed" ? "Realizada" : "Agendada"}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">{assessment.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(assessment.date).toLocaleDateString('pt-BR')} • Valor: {assessment.maxGrade} pontos • Peso: {assessment.weight}
                    </p>
                  </div>
                </div>
                {assessment.description && (
                  <p className="text-xs text-gray-600 mb-3">{assessment.description}</p>
                )}
                {assessment.status === "completed" && grades[assessment.id] !== undefined && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-green-900 font-medium mb-1">Sua Nota:</p>
                    <p className="text-2xl font-bold text-green-700">{grades[assessment.id]}</p>
                  </div>
                )}
                {assessment.status === "upcoming" && (
                  <button className="mt-3 w-full py-2 text-xs font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100">
                    Ver Detalhes
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notas */}
      {activeTab === "grades" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Resumo de Notas</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <p className="text-3xl font-bold text-primary-700">{weightedAvg.toFixed(1)}</p>
                <p className="text-xs text-primary-600 mt-1">Média Ponderada</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-3xl font-bold text-green-700">{completedAssessments.length}</p>
                <p className="text-xs text-green-600 mt-1">Avaliações Realizadas</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-3xl font-bold text-orange-700">{upcomingAssessments.length}</p>
                <p className="text-xs text-orange-600 mt-1">Próximas Avaliações</p>
              </div>
            </div>

            <div className="space-y-3">
              {myAssessments.map(assessment => (
                <div key={assessment.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      assessment.status === "completed" ? "bg-green-50" : "bg-orange-50"
                    }`}>
                      {assessment.status === "completed" ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-orange-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{assessment.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(assessment.date).toLocaleDateString('pt-BR')} • Peso: {assessment.weight}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {assessment.status === "completed" && grades[assessment.id] !== undefined ? (
                      <div>
                        <p className={`text-lg font-bold ${
                          grades[assessment.id] >= 7 ? "text-green-600" : grades[assessment.id] >= 5 ? "text-orange-600" : "text-red-600"
                        }`}>
                          {grades[assessment.id]}
                        </p>
                        <p className="text-xs text-gray-500">/{assessment.maxGrade}</p>
                      </div>
                    ) : assessment.status === "completed" ? (
                      <span className="text-xs text-gray-400">Aguardando nota</span>
                    ) : (
                      <span className="text-xs text-orange-600 font-medium">Agendada</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
