const Todo = ({title, completed, onDelete, onToggle}) => {
  return (
    <div className={`todo-item ${completed ? "completed" : ""}`}>
          <input type="checkbox" className="todo-checkbox" checked={completed} onChange={onToggle}/>
          <span className={`todo-text ${completed ? "completed" : ""}`} > {title}</span>
          <button className="delete-btn" onClick={onDelete}>Удалить</button>
    </div>
  );
};
export default Todo;