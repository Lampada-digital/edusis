import { MessageSquare, Mail, Send, Users, Bell, Plus } from "lucide-react";

export default function CommunicationPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Comunicação</h1>
          <p className="text-sm text-gray-500">Central multicanal de comunicação</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-lg text-sm font-medium self-start">
          <Plus className="w-4 h-4" /> Nova Mensagem
        </button>
      </div>

      {/* Channels */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { icon: Bell, label: "Push", count: "1.2k enviados", color: "bg-blue-50 text-blue-600" },
          { icon: Mail, label: "E-mail", count: "856 enviados", color: "bg-purple-50 text-purple-600" },
          { icon: MessageSquare, label: "SMS", count: "432 enviados", color: "bg-green-50 text-green-600" },
          { icon: Send, label: "WhatsApp", count: "678 enviados", color: "bg-emerald-50 text-emerald-600" },
          { icon: Users, label: "In-App", count: "2.1k lidas", color: "bg-orange-50 text-orange-600" },
        ].map((ch, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <div className={`w-10 h-10 rounded-lg ${ch.color} flex items-center justify-center mx-auto mb-2`}>
              <ch.icon className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-gray-900">{ch.label}</p>
            <p className="text-xs text-gray-500">{ch.count}</p>
          </div>
        ))}
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Comunicações Recentes</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { title: "Aviso: Reunião de Pais", channel: "E-mail + Push", sent: "Há 2h", recipients: 847, status: "Entregue" },
            { title: "Lembrete: Mensalidade Junho", channel: "WhatsApp + SMS", sent: "Há 5h", recipients: 156, status: "Entregue" },
            { title: "Convite: Festa Junina", channel: "E-mail", sent: "Há 1 dia", recipients: 2847, status: "Entregue" },
            { title: "Nota: Conselho de Classe", channel: "Push", sent: "Há 2 dias", recipients: 186, status: "Entregue" },
            { title: "Campanha: Rematrícula 2027", channel: "E-mail + WhatsApp", sent: "Há 3 dias", recipients: 1200, status: "Parcial" },
          ].map((msg, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{msg.title}</p>
                  <p className="text-xs text-gray-500">{msg.channel} • {msg.recipients} destinatários</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{msg.sent}</p>
                <span className={`text-xs font-medium ${msg.status === "Entregue" ? "text-green-600" : "text-orange-600"}`}>{msg.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
