import { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "./context/Context";
import { toast } from "react-toastify";

function App() {
  const { todos, setTodos, backendURL } = useContext(AppContext);
  const [text, setText] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [deleteloading, setdeleteLoading] = useState(false);

  const addTodo = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    try {
      const { data } = await axios.post(backendURL + "/api/todos/add", {
        text,
      });
      if (data.success) {
        setTodos([data.newTodo,...todos]);
        setText("");
      } else {
        toast.error(data.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    } finally {
      setAddLoading(false);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const { data } = await axios.put(backendURL + `/api/todos/update/${id}`, {
        completed: !completed,
      });
      if (data.success) {
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, completed: !completed } : todo
          )
        );
      } else {
        toast.error(data.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  const deleteTodo = async (id) => {
    setdeleteLoading(true);
    try {
      const { data } = await axios.delete(
        backendURL + `/api/todos/delete/${id}`
      );
      if (data.success) {
        setTodos(todos.filter((todo) => todo._id !== id));
      } else {
        toast.error(data.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    } finally {
      setdeleteLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-16">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>
        <div className="flex space-x-2">
          <form onSubmit={addTodo} className="flex items-center gap-2">
            <input
              required
              className="flex-1 p-2 h-10 rounded-md outline-none border-2 focus:shadow-lg border-blue-500"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="New task..."
            />
            <button className="relative bg-blue-500 cursor-pointer text-white w-24 h-10 flex items-center justify-center rounded-md hover:bg-blue-600">
              {addLoading ? (
                "Adding..."
              ) : (
                "Add"
              )}
            </button>
          </form>
        </div>
        <ul className="my-4 space-y-2 overflow-auto max-h-96">
          {todos.map(({ _id, text, completed }) => (
            <li
              key={_id}
              className={`flex justify-between items-center p-2 border-2 border-black rounded-md shadow-2xs ${
                completed ? "line-through text-gray-500" : ""
              }`}
            >
              <span>{text}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleTodo(_id, completed)}
                  className={`px-2 py-1 rounded-md cursor-pointer ${
                    completed ? "bg-green-500 text-white" : "bg-gray-300"
                  }`}
                >
                  {completed ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => deleteTodo(_id)}
                  className="bg-red-500 text-white px-2 py-1 cursor-pointer rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
