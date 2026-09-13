import { useState } from "react";
import { Send, Sparkles, Bot, User, Brain, Zap, MessageSquare, Settings, History } from "lucide-react";
import { aiAgents } from "../data/mockData";

export default function AIPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Olá! Sou a EDUGEST AI. Posso ajudar com análise de alunos, turmas, financeiro, CRM e muito mais. O que você precisa?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: getAIResponse(input)
      }]);
    }, 800);
  };

  const getAIResponse = (query: string) => {
    if (query.toLowerCase().includes("aluno")) {
      return "📊 **Análise de Alunos**\n\nIdentifiquei 8 alunos que precisam de atenção:\n\n• **Daniel Costa** (3º EM) — Nota 6.8, frequência 72% → Risco de reprovação por falta\n• **Henrique Gomes** (8º B) — Nota 5.9, frequência 68% → Abaixo da média em 3 disciplinas\n• **Bruno Santos** (1º EM) — Queda de 1.2 pontos no último bimestre\n\n**DADO**: Frequência de Daniel está 22% abaixo do mínimo.\n**RECOMENDAÇÃO**: Agendar reunião com responsável e criar plano de recuperação.\n**INCERTEZA**: Média — baseado em padrão histórico similar.";
    }
    if (query.toLowerCase().includes("turma")) {
      return "📈 **Análise da Turma 9º Ano A**\n\n**Dados:**\n• 32 alunos • Média geral: 7.8 • Frequência: 94%\n• Distribuição: 75% acima da média, 15% em atenção, 10% críticos\n\n**Interpretação:**\nA turma apresenta desempenho acima da média institucional. No entanto, 3 alunos mostram tendência de queda consistente nas últimas 4 semanas.\n\n**Recomendação:**\n1. Reforço para os 3 alunos em risco\n2. Manter metodologia atual para o grupo majoritário\n3. Considerar atividades desafiadoras para os 5 alunos com nota > 9";
    }
    if (query.toLowerCase().includes("financ")) {
      return "💰 **Análise Financeira**\n\n**Receita:** R$ 275.000 (96.5% da previsão)\n**Inadimplência:** 4.2% (-0.8% vs mês anterior)\n**Fluxo de Caixa:** Positivo — R$ 85.000\n\n**Insights:**\n• A inadimplência reduziu pelo 3º mês consecutivo\n• Campanhas de negociação via WhatsApp tiveram 34% de efetividade\n• Previsão para próximo mês: R$ 284.700 (crescimento de 3.5%)\n\n**Recomendação:**\nManter estratégia de cobrança ativa e considerar desconto para pagamento antecipado da rematrícula.";
    }
    return "Entendi sua pergunta. Com base nos dados da instituição, posso ajudar com:\n\n• 📚 Análise acadêmica (alunos, turmas, desempenho)\n• 💰 Análise financeira (inadimplência, receita, projeções)\n• 🎯 Análise comercial (leads, conversão, pipeline)\n• 📋 Análise operacional (frequência, documentos, processos)\n\nO que gostaria de explorar?";
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">EDUGEST AI</h3>
            <p className="text-xs text-gray-500">Assistente inteligente • Contexto: Colégio EDUGEST</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-xl p-3 ${msg.role === "user" ? "bg-primary-600 text-white" : "bg-gray-50 border border-gray-100"}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <User className="w-3.5 h-3.5 text-primary-700" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Pergunte sobre alunos, turmas, financeiro..."
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={handleSend}
              className="p-2.5 gradient-primary text-white rounded-lg hover:opacity-90"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {["Analise os alunos em risco", "Como está o financeiro?", "Priorize leads do CRM"].map((suggestion, i) => (
              <button
                key={i}
                onClick={() => { setInput(suggestion); }}
                className="px-3 py-1 text-xs bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-100 whitespace-nowrap"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-80 space-y-4">
        {/* Agents */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-semibold text-gray-900">Agentes IA</h3>
          </div>
          <div className="space-y-2">
            {aiAgents.slice(0, 5).map(agent => (
              <div key={agent.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <div>
                    <p className="text-xs font-medium text-gray-900">{agent.name}</p>
                    <p className="text-[10px] text-gray-500">{agent.actions} ações</p>
                  </div>
                </div>
                <Zap className="w-3 h-3 text-yellow-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Settings className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900">Ferramentas</h3>
          </div>
          <div className="space-y-1">
            {["get_student", "get_class_performance", "generate_questions", "send_notification", "create_report"].map((tool, i) => (
              <div key={i} className="px-2 py-1.5 text-xs font-mono text-gray-600 bg-gray-50 rounded">
                {tool}
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-3">
            <History className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900">Histórico</h3>
          </div>
          <div className="space-y-2">
            {["Análise turma 9º A", "Relatório financeiro", "Priorizar leads"].map((item, i) => (
              <button key={i} className="flex items-center gap-2 w-full px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded-lg text-left">
                <MessageSquare className="w-3 h-3" /> {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
