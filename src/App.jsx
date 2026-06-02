import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import Pagination from "./components/Pagination/Pagination";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/?_limit=${limit}&_page=${page}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err));
  }, [page]);
  const add = () => {
    if (!text.trim()) return;
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: false, title: text }),
    })
      .then((res) => res.json())
      .then((res) => {
        setTodos((prev) => [res, ...prev]);
        setText("");
      })
      .catch((err) => console.log(err));
  };

  const removeTodo = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (todo) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !todo.completed }),
    })
      .then((res) => res.json())
      .then((updatedTodo) => {
        setTodos((prev) =>
          prev.map((item) =>
            item.id === todo.id
              ? { ...item, completed: updatedTodo.completed }
              : item,
          ),
        );
      })
      .catch((err) => console.log(err));
  };
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
          <Pagination page={page} setPage={setPage}/>
        </div>
      </div>
    </>
  );
}

export default App;
