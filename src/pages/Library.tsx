import { BookOpen, Search, PlusIcon, Clock, AlertTriangle } from "lucide-react";

const books = [
  { id: 1, title: "Dom Casmurro", author: "Machado de Assis", category: "Literatura", available: 3, total: 5, isbn: "978-85-359" },
  { id: 2, title: "Fundamentos de Matemática", author: "Elon Lages", category: "Didático", available: 0, total: 4, isbn: "978-85-834" },
  { id: 3, title: "Sapiens", author: "Yuval Harari", category: "Ciências Humanas", available: 2, total: 3, isbn: "978-85-254" },
  { id: 4, title: "O Cortiço", author: "Aluísio Azevedo", category: "Literatura", available: 4, total: 4, isbn: "978-85-440" },
  { id: 5, title: "Física Básica Vol. 1", author: "Helou/Norton", category: "Didático", available: 1, total: 6, isbn: "978-85-357" },
];

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Biblioteca</h1>
          <p className="text-sm text-gray-500">3.247 títulos • 128 empréstimos ativos</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-lg text-sm font-medium self-start">
          <PlusIcon className="w-4 h-4" /> Novo Título
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Títulos", value: "3.247", icon: BookOpen, color: "bg-blue-50 text-blue-600" },
          { label: "Empréstimos Ativos", value: "128", icon: Clock, color: "bg-purple-50 text-purple-600" },
          { label: "Reservas", value: "23", icon: AlertTriangle, color: "bg-orange-50 text-orange-600" },
          { label: "Atrasados", value: "7", icon: AlertTriangle, color: "bg-red-50 text-red-600" },
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

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Buscar por título, autor ou ISBN..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Título</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">Autor</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 hidden lg:table-cell">Categoria</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Disponível</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">ISBN</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-10 bg-primary-100 rounded flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-primary-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{book.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{book.author}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">{book.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium ${book.available > 0 ? "text-green-600" : "text-red-600"}`}>
                      {book.available}/{book.total}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell font-mono">{book.isbn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


