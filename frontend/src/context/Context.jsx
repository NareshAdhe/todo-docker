import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/api/todos/get`);
        if (data.success) {
          setTodos(data.todos.reverse());
          console.log("success");
        } else {
          toast.error(data.message, { autoClose: 2000 });
          console.error("error");
        }
      } catch (error) {
        toast.error(error.message, { autoClose: 2000 });
        console.error("error 2");
      }
    };

    fetchTodos();
  }, [backendURL]);

  return (
    <AppContext.Provider value={{ todos, setTodos, backendURL }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
