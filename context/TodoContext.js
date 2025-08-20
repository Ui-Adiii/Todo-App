"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/user/me");
      if(response.data.success){
        setUser(response.data?.user);
      }
      else{
        setUser(null);
      }
    } catch (error) {
      toast.error("Failed to fetch user");
      setUser(null);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchTodos = async () => {    
     if(!user) return;
      try {
        const response = await axios.post("/api/task/todos",{userId:user._id})
        if(response.data.success){
          setTodos(response.data.todos.todos);
        }
        else{
          setTodos([]);
        }
      } catch (error) {
        toast.error("Failed to fetch todos");
        setTodos([]);
      }
    }
  useEffect(() => {
    fetchTodos();
  }, [user])
  
  

  return (
    <TodoContext.Provider
      value={{ todos, fetchUser,user,setTodos,fetchTodos}}
    >
      {children}
    </TodoContext.Provider>
  );
}
