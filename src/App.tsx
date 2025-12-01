import { useEffect, useState } from "react"
import { addToto, deleteTodo, fetchTodos, toggleTodo } from "./services/todoService";
import type { Todo } from "./types/todo";

function App() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  // 초기 로딩
  useEffect(() => {
    (
      async () => {
        setLoading(true);
        try {
          const data = await fetchTodos();
          setTodos(data);
        } catch(e) {
          console.error(e);
          alert("Todo를 가져오는 중 오류가 발생했습니다.");
        } finally {
          setLoading(false);
        }
      }
    )(); // 즉시 실행 함수 IIFE (Immediately Invoked Function Expression)
  }, []);

  // 완료 체크 토글
  const handleToggle = async (id: string, completed: boolean) => {
    try {
      await toggleTodo(id, completed);
      setTodos((prev) => prev.map(
        (todo) => todo.id === id ? { ...todo, completed} : todo
      ));

    } catch (e) {
      console.error(e);
      alert("업데이트 중 오류가 발생했습니다.");
    }
  }

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
      const data = await fetchTodos();
      setTodos(data);
      //console.log(data);

    } catch (e) {
      console.error(e);
      alert("추가 중 오류가 발생했습니다.");
    } finally{
      setAdding(false);
    }
  }

  // 삭제
  const handleDelete = async (id: string) => {
    if(!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (e) {
      console.error(e);
      alert("삭제 중 오류가 발생했습니다.");
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
        {/* 로딩표시 */}
        {loading && (
          <p className="text-center text-slate-500">불러오는 중...</p>
        )}
        {/* Todo 목록 */}
        {!loading && todos.length === 0 && (
          <p className="text-center text-slate-400">할 일이 없습니다.</p>
        )}
        <ul className="space-y-2 max-h-[400px] overflow-y-auto">
          {todos.map((todo) => (
            <li 
              key={todo.id}
            className="flex items-center justify-between bg-slate-50 border
            border-slate-200 rounded-xl px-3 py-2">
            <label className="flex items-center gap-2 flex-1">
              <input type="checkbox" 
                checked={todo.completed}
                onChange={(e) => handleToggle(todo.id, e.target.checked)}
              className="w-4 h-4" />
              <span 
              
              className={`text-sm ${
                todo.completed ? 'line-through text-slate-400' : 'text-slate-700'
              }`}>{todo.title}</span>
            </label>
            <button 
            onClick={() => { handleDelete(todo.id) }} 
            className="text-xs text-red-500 hover:text-red-600 px-2 py-1 transition">삭제</button>
          </li>
          ))}

        </ul>
      </div>
    </main>
  )
}

export default App
