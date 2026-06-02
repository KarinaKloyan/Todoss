import "./TodoForm.css";

function TodoForm({ text, setText, add }) {
  return (
    <div className="addtodo">
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={add}>+</button>
    </div>
  );
}

export default TodoForm
