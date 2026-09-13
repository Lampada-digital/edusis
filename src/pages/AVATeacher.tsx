import { useState } from "react";
import {
  BookOpen, Calendar, FileText, Plus, Edit, Trash2, Download,
  CheckCircle, Clock, Users, Star, Printer, Eye, Save, X
} from "lucide-react";
import { useApp } from "../store/AppContext";
import { Modal, FormField, Input, Select, Button } from "../components/Modal";

type Lesson = {
  id: number;
  classId: number;
  date: string;
  content: string;
  homework?: string;
  observations?: string;
  attendance?: Record<number, "present" | "absent" | "justified">;
};

type Assessment = {
  id: number;
  classId: number;
  title: string;
  type: "prova" | "trabalho" | "atividade" | "projeto";
  date: string;
  maxGrade: number;
  weight: number;
  description?: string;
  questions?: { id: number; question: string; grade: number }[];
};

const classes = [
  { id: 1, name: "9º Ano A", subject: "Matemática", students: 32 },
  { id: 2, name: "1º Ano EM", subject: "Matemática", students: 35 },
  { id: 3, name: "5º Ano B", subject: "Matemática", students: 28 },
];

export default function AVATeacherPage() {
  const { students } = useApp();
  const [activeTab, setActiveTab] = useState<"diary" | "assessments" | "grades">("diary");
  const [selectedClass, setSelectedClass] = useState(1);
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: 1,
      classId: 1,
      date: "2026-06-10",
      content: "Equações do 2º grau - Fórmula de Bhaskara",
      homework: "Exercícios 1-10 página 45",
      observations: "Maioria da turma compreendeu o conceito",
    },
    {
      id: 2,
      classId: 1,
      date: "2026-06-08",
      content: "Introdução às equações quadráticas",
      homework: "Leitura capítulo 3",
    },
  ]);
  const [assessments, setAssessments] = useState<Assessment[]>([
    {
      id: 1,
      classId: 1,
      title: "Prova P1 - Equações",
      type: "prova",
      date: "2026-06-15",
      maxGrade: 10,
      weight: 3,
      description: "Prova covering equações do 1º e 2º grau",
    },
    {
      id: 2,
      classId: 1,
      title: "Trabalho em Grupo",
      type: "trabalho",
      date: "2026-06-20",
      maxGrade: 10,
      weight: 2,
    },
  ]);
  const [grades, setGrades] = useState<Record<string, number>>({});
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [lessonForm, setLessonForm] = useState({ date: "", content: "", homework: "", observations: "" });
  const [assessmentForm, setAssessmentForm] = useState({ title: "", type: "prova", date: "", maxGrade: "10", weight: "1", description: "" });

  const classLessons = lessons.filter(l => l.classId === selectedClass);
  const classAssessments = assessments.filter(a => a.classId === selectedClass);
  const classStudents = students.slice(0, classes.find(c => c.id === selectedClass)?.students || 10);

  const handleAddLesson = () => {
    if (!lessonForm.date || !lessonForm.content) return;
    setLessons(prev => [...prev, {
      id: Math.max(0, ...prev.map(l => l.id)) + 1,
      classId: selectedClass,
      date: lessonForm.date,
      content: lessonForm.content,
      homework: lessonForm.homework,
      observations: lessonForm.observations,
    }]);
    setShowLessonModal(false);
    setLessonForm({ date: "", content: "", homework: "", observations: "" });
  };

  const handleAddAssessment = () => {
    if (!assessmentForm.title || !assessmentForm.date) return;
    setAssessments(prev => [...prev, {
      id: Math.max(0, ...prev.map(a => a.id)) + 1,
      classId: selectedClass,
      title: assessmentForm.title,
      type: assessmentForm.type as any,
      date: assessmentForm.date,
      maxGrade: parseFloat(assessmentForm.maxGrade),
      weight: parseFloat(assessmentForm.weight),
      description: assessmentForm.description,
    }]);
    setShowAssessmentModal(false);
    setAssessmentForm({ title: "", type: "prova", date: "", maxGrade: "10", weight: "1", description: "" });
  };

  const handleGradeChange = (studentId: number, assessmentId: number, value: string) => {
    const key = `${studentId}-${assessmentId}`;
    setGrades(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const printAssessment = (assessment: Assessment) => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>${assessment.title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { text-align: center; margin-bottom: 10px; }
            .info { margin-bottom: 30px; }
            .info p { margin: 5px 0; }
            .student-info { border: 1px solid #000; padding: 15px; margin-bottom: 30px; }
            .question { margin-bottom: 20px; }
            .answer-space { border: 1px solid #ccc; min-height: 80px; margin-top: 10px; padding: 10px; }
          </style>
        </head>
        <body>
          <h1>${assessment.title}</h1>
          <div class="info">
            <p><strong>Disciplina:</strong> Matemática</p>
            <p><strong>Turma:</strong> ${classes.find(c => c.id === selectedClass)?.name}</p>
            <p><strong>Data:</strong> ${new Date(assessment.date).toLocaleDateString('pt-BR')}</p>
            <p><strong>Valor:</strong> ${assessment.maxGrade} pontos</p>
          </div>
          <div class="student-info">
            <p><strong>Nome:</strong> _______________________________________________</p>
            <p><strong>Matrícula:</strong> _______________ <strong>Data:</strong> ___/___/___</p>
          </div>
          ${assessment.description ? `<p><strong>Instruções:</strong> ${assessment.description}</p>` : ''}
          <div class="question">
            <p><strong>Questão 1:</strong> Resolva as equações do 2º grau:</p>
            <p>a) x² - 5x + 6 = 0</p>
            <div class="answer-space"></div>
          </div>
          <div class="question">
            <p><strong>Questão 2:</strong> Calcule o discriminante (Δ) e determine as raízes:</p>
            <p>x² - 4x + 4 = 0</p>
            <div class="answer-space"></div>
          </div>
          <div class="question">
            <p><strong>Questão 3:</strong> Um terreno retangular tem área de 60m². Sabendo que o comprimento é 7m maior que a largura, determine as dimensões do terreno.</p>
            <div class="answer-space"></div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AVA - Professor</h1>
          <p className="text-sm text-gray-500">Diário de classe, avaliações e gestão de aulas</p>
        </div>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(Number(e.target.value))}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
        >
          {classes.map(c => (
            <option key={c.id} value={c.id}>{c.name} - {c.subject}</option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-100 p-1.5">
        <div className="flex gap-1">
          {[
            { id: "diary", label: "Diário de Classe", icon: BookOpen },
            { id: "assessments", label: "Avaliações", icon: FileText },
            { id: "grades", label: "Lançamento de Notas", icon: Star },
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

      {/* Diário de Classe */}
      {activeTab === "diary" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => setShowLessonModal(true)} className="flex items-center gap-2 px-3 py-2 gradient-primary text-white rounded-lg text-sm font-medium">
              <Plus className="w-4 h-4" /> Nova Aula
            </button>
          </div>

          <div className="space-y-3">
            {classLessons.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(lesson => (
              <div key={lesson.id} className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date(lesson.date).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}
                      </p>
                      <p className="text-xs text-gray-500">{lesson.content}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {lesson.homework && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs font-medium text-blue-900 mb-1">📚 Tarefa de Casa:</p>
                    <p className="text-sm text-blue-700">{lesson.homework}</p>
                  </div>
                )}
                {lesson.observations && (
                  <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                    <p className="text-xs font-medium text-yellow-900 mb-1">💡 Observações:</p>
                    <p className="text-sm text-yellow-700">{lesson.observations}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <Modal isOpen={showLessonModal} onClose={() => setShowLessonModal(false)} title="Nova Aula" size="lg">
            <div className="space-y-4">
              <FormField label="Data" required>
                <Input type="date" value={lessonForm.date} onChange={(e) => setLessonForm({ ...lessonForm, date: e.target.value })} />
              </FormField>
              <FormField label="Conteúdo Ministrado" required>
                <textarea
                  value={lessonForm.content}
                  onChange={(e) => setLessonForm({ ...lessonForm, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500"
                  rows={4}
                  placeholder="Descreva o conteúdo da aula..."
                />
              </FormField>
              <FormField label="Tarefa de Casa">
                <Input value={lessonForm.homework} onChange={(e) => setLessonForm({ ...lessonForm, homework: e.target.value })} placeholder="Ex: Exercícios 1-10 página 45" />
              </FormField>
              <FormField label="Observações">
                <textarea
                  value={lessonForm.observations}
                  onChange={(e) => setLessonForm({ ...lessonForm, observations: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500"
                  rows={2}
                  placeholder="Observações sobre a aula..."
                />
              </FormField>
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <Button variant="secondary" onClick={() => setShowLessonModal(false)}>Cancelar</Button>
                <Button onClick={handleAddLesson}>Salvar Aula</Button>
              </div>
            </div>
          </Modal>
        </div>
      )}

      {/* Avaliações */}
      {activeTab === "assessments" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => setShowAssessmentModal(true)} className="flex items-center gap-2 px-3 py-2 gradient-primary text-white rounded-lg text-sm font-medium">
              <Plus className="w-4 h-4" /> Nova Avaliação
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {classAssessments.map(assessment => (
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
                      <span className="text-xs text-gray-500">Peso: {assessment.weight}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">{assessment.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(assessment.date).toLocaleDateString('pt-BR')} • Valor: {assessment.maxGrade} pontos
                    </p>
                  </div>
                </div>
                {assessment.description && (
                  <p className="text-xs text-gray-600 mb-3">{assessment.description}</p>
                )}
                <div className="flex gap-2">
                  <button onClick={() => printAssessment(assessment)} className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100">
                    <Printer className="w-3 h-3" /> Imprimir
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <Edit className="w-3 h-3" /> Editar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Modal isOpen={showAssessmentModal} onClose={() => setShowAssessmentModal(false)} title="Nova Avaliação" size="lg">
            <div className="space-y-4">
              <FormField label="Título" required>
                <Input value={assessmentForm.title} onChange={(e) => setAssessmentForm({ ...assessmentForm, title: e.target.value })} placeholder="Ex: Prova P1 - Equações" />
              </FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Tipo" required>
                  <Select value={assessmentForm.type} onChange={(e) => setAssessmentForm({ ...assessmentForm, type: e.target.value })}>
                    <option value="prova">Prova</option>
                    <option value="trabalho">Trabalho</option>
                    <option value="atividade">Atividade</option>
                    <option value="projeto">Projeto</option>
                  </Select>
                </FormField>
                <FormField label="Data" required>
                  <Input type="date" value={assessmentForm.date} onChange={(e) => setAssessmentForm({ ...assessmentForm, date: e.target.value })} />
                </FormField>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Valor Máximo" required>
                  <Input type="number" step="0.1" value={assessmentForm.maxGrade} onChange={(e) => setAssessmentForm({ ...assessmentForm, maxGrade: e.target.value })} />
                </FormField>
                <FormField label="Peso" required>
                  <Input type="number" step="0.1" value={assessmentForm.weight} onChange={(e) => setAssessmentForm({ ...assessmentForm, weight: e.target.value })} />
                </FormField>
              </div>
              <FormField label="Descrição">
                <textarea
                  value={assessmentForm.description}
                  onChange={(e) => setAssessmentForm({ ...assessmentForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                  placeholder="Instruções da avaliação..."
                />
              </FormField>
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <Button variant="secondary" onClick={() => setShowAssessmentModal(false)}>Cancelar</Button>
                <Button onClick={handleAddAssessment}>Criar Avaliação</Button>
              </div>
            </div>
          </Modal>
        </div>
      )}

      {/* Lançamento de Notas */}
      {activeTab === "grades" && (
        <div className="space-y-4">
          {classAssessments.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">Nenhuma avaliação criada ainda</p>
              <button onClick={() => setActiveTab("assessments")} className="mt-3 text-sm text-primary-600 font-medium hover:underline">
                Criar avaliação →
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 sticky left-0 bg-gray-50">Aluno</th>
                      {classAssessments.map(a => (
                        <th key={a.id} className="text-center px-4 py-3 text-xs font-semibold text-gray-500">
                          <div>{a.title}</div>
                          <div className="text-[10px] text-gray-400">/{a.maxGrade}</div>
                        </th>
                      ))}
                      <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Média</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classStudents.map(student => {
                      const studentGrades = classAssessments.map(a => grades[`${student.id}-${a.id}`] || 0);
                      const totalWeight = classAssessments.reduce((sum, a) => sum + a.weight, 0);
                      const weightedAvg = classAssessments.reduce((sum, a, i) => sum + (studentGrades[i] * a.weight), 0) / totalWeight;
                      
                      return (
                        <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 sticky left-0 bg-white">
                            {student.name}
                          </td>
                          {classAssessments.map(assessment => (
                            <td key={assessment.id} className="px-4 py-3 text-center">
                              <input
                                type="number"
                                step="0.1"
                                min="0"
                                max={assessment.maxGrade}
                                value={grades[`${student.id}-${assessment.id}`] || ""}
                                onChange={(e) => handleGradeChange(student.id, assessment.id, e.target.value)}
                                className="w-16 px-2 py-1 text-center text-sm border border-gray-200 rounded outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="—"
                              />
                            </td>
                          ))}
                          <td className="px-4 py-3 text-center">
                            <span className={`text-sm font-bold ${
                              weightedAvg >= 7 ? "text-green-600" : weightedAvg >= 5 ? "text-orange-600" : "text-red-600"
                            }`}>
                              {weightedAvg.toFixed(1)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-gray-100 flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-lg text-sm font-medium">
                  <Save className="w-4 h-4" /> Salvar Notas
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
