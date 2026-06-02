import './TodoItem.css'

function TodoItem({ todo, removeTodo, handleChange }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleChange(todo)}
      />

      <span>{todo.title}</span>

      <button onClick={() => removeTodo(todo.id)}>
        X
      </button>
    </li>
  );
}

export default TodoItem;