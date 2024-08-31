import PropTypes from "prop-types";

export default function Todo(props) {
  const { todo, setTodos } = props;

  // update status of todos
  const updateTodo = async (todoId, todoStatus) => {
    const result = await fetch(`api/v1/todos/${todoId}`, {
      method: "PUT",
      body: JSON.stringify({ status: todoStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await result.json();
    if (json.acknowledged) {
      setTodos((currentTodos) => {
        return currentTodos.map((currentTodo) => {
          if (currentTodo._id === todoId) {
            return { ...currentTodo, status: !currentTodo.status };
          }
          return currentTodo;
        });
      });
    }
  };

  const deleteTodo = async (todoId) => {
    const result = await fetch(`/api/v1/todos/${todoId}`, {
      method: "DELETE",
    });

    const json = await result.json();
    if (json.acknowledged) {
      setTodos((currentTodos) => {
        return currentTodos.filter((currentTodo) => currentTodo._id !== todoId);
      });
    }
  };
  return (
    <div className="todo">
      <p>{todo.todo}</p>
      <div className="mutations">
        <button
          className="todo__status"
          onClick={() => updateTodo(todo._id, todo.status)}
        >
          {todo.status ? "☑" : "☐"}
        </button>
        <button className="todo__delete" onClick={() => deleteTodo(todo._id)}>
          🗑️
        </button>
      </div>
    </div>
  );
}

// PropTypes validation
Todo.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    todo: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
  }).isRequired,
  setTodos: PropTypes.func.isRequired,
};
