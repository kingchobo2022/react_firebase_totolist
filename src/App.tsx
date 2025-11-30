import { useState } from "react"
import { addToto } from "./services/todoService";

function App() {

  const [newTitle, setNewTitle] = useState("");
  const [adding, setAdding] = useState(false);

  // Todo 추가
  const handleAddTodo = async(e: React.FormEvent) => {
    e.preventDefault();
    //console.log(newTitle);
    const title = newTitle.trim();
    if (!title) return;
    setAdding(true);
    try {
      addToto(title);
      setNewTitle("");
    } catch (e) {
      console.error(e);
      alert("추가 중 오류가 발생했습니다.");
    } finally{
      setAdding(false);
    }

  }

  return (
    <main className="min-h-screen flex bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-slate-800">Firebase Todo List</h1>
        <form className="flex gap-2 mb-4" onSubmit={handleAddTodo}>
          <input type="text" 

          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="할 일을 입력하세요." />
          <button 
          disabled={adding}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium 
          disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-700 transition">
            {adding ? '추가 중...' : '추가'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default App
