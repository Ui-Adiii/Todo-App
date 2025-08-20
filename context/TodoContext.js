"use client";

import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [todosLoading, setTodosLoading] = useState(false);
  const fetchUser = async () => {
    try {
      setAuthLoading(true);
      const response = await axios.get("/api/user/me");
      if (response.data.success) {
        setUser(response.data?.user);
        setAuthLoading(false);
      } else {
        setUser(null);
        setAuthLoading(false);
      }
    } catch (error) {
      toast.error("Failed to fetch user");
      setUser(null);
      setAuthLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchTodos = useCallback(async () => {
    if (!user) return;
    try {
      setTodosLoading(true);
      const response = await axios.post("/api/task/todos", {
        userId: user._id,
      });
      if (response.data.success) {
        setTodos(response.data.todos.todos);
        setTodosLoading(false);
      } else {
        setTodos([]);
        setTodosLoading(false);
      }
    } catch (error) {
      toast.error("Failed to fetch todos");
      setTodos([]);
      setTodosLoading(false);
    }
  }, [user]);
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <TodoContext.Provider
      value={{ todos, fetchUser, authLoading, todosLoading, user, setTodos, fetchTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
}
