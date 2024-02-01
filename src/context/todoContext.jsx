import { createContext, useContext } from "react";
import axios from "axios";
export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {

  // ======= Register User
  const addUser = async(params) => {
  try {
    const response = await axios.post("http://localhost:4000/users/register" , params);
    return response.data;
  } catch (error) {
    return error
  }
  }

  // ======= Login User
  const loginUser = async(params) => {
    try {
      const response = await axios.post("http://localhost:4000/users/login" , params);
      return response.data;
    } catch (error) {
      return error
    }
    }

    // Add Todo
    const addTodo = async(params) => {
      try {
        const response = await axios.post(`http://localhost:4000/todos/addTodo/${params.id}` , params.AddTodo);
        return response.data;
      } catch (error) {
        return error
      }
      }

       // Update Todo
       const updateTodo = async (params) => {
        try {
          const response = await axios.put(
            `http://localhost:4000/todos/updateTodos/${params.updateId}`,
            params.update,
            { headers: { 'Content-Type': 'application/json' } }
          );
          return response.data;
        } catch (error) {
          return error;
        }
     };
     
// All todos 
    const getAllTodos = async(id) => {

      try {
          const response = await axios.get(`http://localhost:4000/todos/todos/${id}`);
          return response.data;
      } catch (error) {
          return error
      }
  }

  // Delete Todo
  const deleteTodo = async(id) => {

    try {
        const response = await axios.delete(`http://localhost:4000/todos/deleteTodos/${id}`);
        return response.data;
    } catch (error) {
        return error
    }
}
  
    return (
        <TodoContext.Provider value={{addUser , loginUser , addTodo , getAllTodos ,deleteTodo , updateTodo }}>
            {children}
        </TodoContext.Provider>
    )
}


export const useTodoApi = () => {
    return useContext(TodoContext);
}