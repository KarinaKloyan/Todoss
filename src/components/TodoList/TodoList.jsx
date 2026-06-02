import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css'


function TodoList({ todos, removeTodo, handleChange }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          removeTodo={removeTodo}
          handleChange={handleChange}
        />
      ))}
    </ul>
  );
}

export default TodoList;