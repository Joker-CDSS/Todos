import { useEffect, useState } from "react";
import "./App.css";
import Todo from "./Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");

  // use effect to get all todos
  useEffect(() => {
    async function getTodos() {
      const result = await fetch("/api/v1/todos");
      const todos = await result.json();

      setTodos(todos);
    }
    getTodos();
  }, []);

  // post new todos
  const createNewTodo = async (event) => {
    event.preventDefault();
    if (content.length > 3) {
      const result = await fetch("/api/v1/todos", {
        method: "POST",
        body: JSON.stringify({ todo: content }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const newTodo = await result.json();

      setContent("");
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }
  };

  return (
    <main className="container">
      <h1 className="title">Awesome Todos</h1>
      <form className="form" onSubmit={createNewTodo}>
        <input
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Enter a new todo"
          className="form__input"
          required
        />
        <button className="form__button" type="submit">
          Create Todo
        </button>
      </form>
      <div className="todos">
        {todos.length > 0 &&
          todos.map((todo) => (
            <Todo key={todo._id} todo={todo} setTodos={setTodos} />
          ))}
      </div>
    </main>
  );
}

export default App;
