import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";

interface Todo {
  id: number;
  title: string;
  description: string;
  due: string;
  completed: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

function WorkingWithArrays() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const API = `${API_BASE}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  const [todos, setTodos] = useState<Todo[]>([]);
  const fetchTodos = useCallback(async () => {
    const response = await axios.get(API);
    setTodos(response.data);
  }, [API]);
  const postTodo = async () => {
    const response = await axios.post(API, todo);
    setTodos([...todos, response.data]);
  };
  const removeTodo = async (todo: { id: number }) => {
    const response = await axios.get(`${API}/${todo.id}/delete`);
    setTodos(response.data);
  };
  const createTodo = async () => {
    const response = await axios.get(`${API}/create`);
    setTodos(response.data);
  };
  const fetchTodoById = async (id: number) => {
    const response = await axios.get(`${API}/${id}`);
    setTodo(response.data);
  };
  const updateTitle = async () => {
    const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
    setTodos(response.data);
  };
  const deleteTodo = async (todo: Todo) => {
    try {
      await axios.delete(`${API}/${todo.id}`);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError && error.response) {
        setErrorMessage(error.response.data.message);
      }
    }
  };
  const updateTodo = async () => {
    try {
      await axios.put(`${API}/${todo.id}`, todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError && error.response) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div>
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <h4>Retrieving an Item from an Array by ID</h4>
      <input
        type="number"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: parseInt(e.target.value) })}
      />
      <a className="btn btn-primary" href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>
      <h3>Filtering Array Items</h3>
      <a className="btn btn-primary" href={`${API}?completed=true`}>
        Get Completed Todos
      </a>
      <h3>Creating new Items in an Array</h3>
      <a className="btn btn-primary" href={`${API}/create`}>
        Create Todo
      </a>
      <h3>Deleting from an Array</h3>
      <input
        type="number"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: parseInt(e.target.value) })}
      />
      <a className="btn btn-primary" href={`${API}/${todo.id}/delete`}>
        Delete Todo with ID = {todo.id}
      </a>
      <br></br>
      <h3>Updating an Item in an Array</h3>
      <input
        type="number"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: parseInt(e.target.value) })}
      />
      <br></br>
      <input
        type="text"
        value={todo.title}
        onChange={(e) =>
          setTodo({
            ...todo,
            title: e.target.value,
          })
        }
      />
      <br />
      <a
        className="btn btn-primary"
        href={`${API}/${todo.id}/title/${todo.title}`}
      >
        Update Title to {todo.title}
      </a>
      <br />
      <h3>Updating Description of an item in an Array</h3>
      <input
        type="number"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: parseInt(e.target.value) })}
      />
      <br />
      <input
        type="text"
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <br />
      <a
        className="btn btn-primary"
        href={`${API}/${todo.id}/description/${todo.description}`}
      >
        Update Description
      </a>
      <h3>Updating Completed Status of an item in an Array</h3>
      <input
        type="number"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: parseInt(e.target.value) })}
      />
      <br />
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
      />{" "}
      Completed
      <br />
      <a
        className="btn btn-primary"
        href={`${API}/${todo.id}/completed/${todo.completed}`}
      >
        Update Completed to {todo.completed === true ? "true" : "false"}
      </a>
      <br />
      <br />
      <input value={todo.id} readOnly />
      <br />
      <input
        type="text"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <br />
      <textarea
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <br />
      <input
        value={todo.due}
        type="date"
        onChange={(e) =>
          setTodo({
            ...todo,
            due: e.target.value,
          })
        }
      />
      <br />
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) =>
            setTodo({
              ...todo,
              completed: e.target.checked,
            })
          }
        />
        Completed
      </label>
      <br />
      <button className="btn btn-warning mb-2" onClick={postTodo}>
        Post Todo
      </button>
      <br />
      <button className="btn btn-success mb-2" onClick={updateTodo}>
        Update Todo
      </button>
      <br />
      <button className="btn btn-primary mb-2" onClick={createTodo}>
        Create Todo
      </button>
      <br />
      <button className="btn btn-success" onClick={updateTitle}>
        Update Title
      </button>
      <br />
      <br />
      {errorMessage && (
        <div className="alert alert-danger mb-2 mt-2">{errorMessage}</div>
      )}
      <br />
      <ul className="list-group">
        {todos.map((todo) => (
          <li className="mb-1" key={todo.id}>
            <input checked={todo.completed} type="checkbox" readOnly />
            {todo.title}
            <p>{todo.description}</p>
            <p>{todo.due}</p>
            <button
              className="btn btn-danger ms-2"
              onClick={() => removeTodo(todo)}
            >
              Remove
            </button>
            <button
              className="btn btn-warning ms-2"
              onClick={() => fetchTodoById(todo.id)}
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo)}
              className="btn btn-danger float-end ms-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default WorkingWithArrays;