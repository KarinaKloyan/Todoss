import { useEffect, useState } from "react";

const BaseURL = "https://jsonplaceholder.typicode.com/todos";

export const useTodos = (page, limit) => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`${BaseURL}?_limit=${limit}&_page=${page}`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err));
  }, [page, limit]);


  const add = () => {
    if (!text.trim()) return;
    fetch(BaseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: false, title: text }),
    })
      .then((res) => res.json())
       .then((newTodo) => {
        setTodos((prev) => [newTodo, ...prev]);
        setText("");
      })
      .catch((err) => console.log(err));
  };

  const removeTodo = (id) => {
    fetch(`${BaseURL}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (todo) => {
    fetch(`${BaseURL}/${todo.id}`, {
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

  return {
    todos, text, setText, add, removeTodo, handleChange
  }
}


