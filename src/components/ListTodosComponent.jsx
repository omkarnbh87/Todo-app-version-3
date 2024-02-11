import { useEffect, useState } from "react";
import { DeleteTodoApi, RetrieveAllTodosApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ListTodosComponent() {
  const [todos, setTodos] = useState([]);

  const [message, setMessage] = useState();

  const authContext = useAuth();

  const username = authContext.username;

  const navigate = useNavigate();
  function RefreshTodos() {
    RetrieveAllTodosApi(username)
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("cleanup"));
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => RefreshTodos(), []);

  function deleteTodo(id) {
    console.log("clicked " + id);
    DeleteTodoApi(username, id)
      .then(() => {
        setMessage(`Delete todo with id ${id} successfull`);
        RefreshTodos();
      })
      .catch((error) => console.log(error));
  }
  function updateTodo(id) {
    console.log("clicked " + id);
    navigate(`/todos/${id}`);
  }
  function addNewTodo() {
    navigate(`/todos/-1`);
  }
  return (
    <div className="container">
      <h1>Things Want To Do!</h1>

      {message && <div className="alert alert-warning">{message}</div>}
      <div className="Table">
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>IsDone? </th>
              <th>TargetDate</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate.toString()}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    DELETE
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => updateTodo(todo.id)}
                  >
                    UPDATE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn btn-success m-5" onClick={addNewTodo}>
        Add New Todo
      </div>
    </div>
  );
}
