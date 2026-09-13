import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { calendarEvents } from "../data/mockData";

export default function CalendarPage() {
  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const dates = Array.from({ length: 30 }, (_, i) => i + 1);
  const startDay = 0; // Sunday

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendário Escolar</h1>
          <p className="text-sm text-gray-500">Junho 2026 • Ano Letivo</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-sm font-medium text-gray-900 px-3">Junho 2026</span>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"><ChevronRight className="w-4 h-4" /></button>
          <button className="flex items-center gap-2 px-3 py-2 gradient-primary text-white rounded-lg text-sm font-medium ml-2">
            <Plus className="w-4 h-4" /> Evento
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 p-4">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {days.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-gray-500 py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-20" />
            ))}
            {dates.map(date => {
              const event = calendarEvents.find(e => parseInt(e.date.split("-")[2]) === date);
              return (
                <div key={date} className={`h-20 p-1 rounded-lg border ${event ? "border-primary-200 bg-primary-50/50" : "border-gray-100 hover:bg-gray-50"} cursor-pointer transition-colors`}>
                  <span className={`text-xs font-medium ${date === 14 ? "w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center" : "text-gray-700"}`}>
                    {date}
                  </span>
                  {event && (
                    <div className={`mt-1 px-1 py-0.5 rounded text-[9px] font-medium truncate ${
                      event.color === "red" ? "bg-red-100 text-red-700" :
                      event.color === "green" ? "bg-green-100 text-green-700" :
                      event.color === "orange" ? "bg-orange-100 text-orange-700" :
                      event.color === "gray" ? "bg-gray-100 text-gray-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {event.title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Próximos Eventos</h3>
          <div className="space-y-3">
            {calendarEvents.map(event => (
              <div key={event.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  event.color === "red" ? "bg-red-500" :
                  event.color === "green" ? "bg-green-500" :
                  event.color === "orange" ? "bg-orange-500" :
                  event.color === "gray" ? "bg-gray-400" : "bg-blue-500"
                }`} />
                <div>
                  <p className="text-xs font-medium text-gray-900">{event.title}</p>
                  <p className="text-[10px] text-gray-500">{new Date(event.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
