import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import Pagination from "./components/Pagination/Pagination";
import { useTodos } from "./hooks/useTodos";
import "./App.css";

function App() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { todos, text, setText, add, removeTodo, handleChange } = useTodos(
    page,
    limit,
  );

  return (
    <>
      <div className="container section">
        <h1>TODO LIST</h1>
        <div className="top-section">
          <TodoForm text={text} setText={setText} add={add} />
          <TodoList
            todos={todos}
            removeTodo={removeTodo}
            handleChange={handleChange}
          />
          <Pagination page={page} setPage={setPage} />
        </div>
      </div>
    </>
  );
}

export default App;
