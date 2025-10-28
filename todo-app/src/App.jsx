import { useEffect, useState } from "react";
import Todo from "./commponents/todo.jsx";
import "./App.css";


function App() {
  const [todoName, setTodoName] = useState("");
  const [filter, setFilter] = useState("all");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const addTodo = (e) => {
    e.preventDefault();
    if (!todoName.trim()) return;
    const newTodo = {
      id: crypto.randomUUID(),
      title: todoName,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
    setTodoName("");
  };
  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };
  const filteredTodos = todos.filter((a) => {
    if (filter === "active") return !a.completed;
    if (filter === "completed") return a.completed;
    return true;
  });
  const filters = [
    { key: "all", label: "Все" },
    { key: "active", label: "Активные" },
    { key: "completed", label: "Завершенные" },
  ];
  return (
    <div className="container">
      <div className="header">
        <h1>Todo App</h1>
        <p>Управляйте своими задачами</p>
      </div>
      <div className="add-todo">
        <form onSubmit={addTodo}>
          <input
            type="text"
            className="todo-input"
            placeholder="Введите задачу..."
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)} />
          <button className="add-btn">Добавить</button>
        </form>
      </div>
      <div className="filters">
        {filters.map((e) => (
          <button
            key={e.key}
            onClick={() => setFilter(e.key)}
            className={`filter-btn ${filter === e.key ? "active" : ""}`} > {e.label}
          </button>
        ))}
      </div>
      <div className="todo-list">
        {filteredTodos.map((item) => (
          <Todo key={item.id} title={item.title} completed={item.completed} onDelete={() => removeTodo(item.id)} onToggle={() => toggleTodo(item.id)} />
        ))}
      </div>
      <div className="stats">
        Всего: {todos.length} | Активные:{" "} {todos.filter((a) => !a.completed).length} | Завершенные:{" "} {todos.filter((a) => a.completed).length}
      </div>
    </div>
  );
}
export default App;