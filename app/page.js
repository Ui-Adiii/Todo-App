"use client";
import { useContext, useState } from "react";
import { Check } from "lucide-react";
import { TodoContext } from "@/context/TodoContext";
import ShowTodo from "@/components/ShowTodo";
import NavBar from "@/components/NavBar";
import Card from "@/components/Card";
import AddTodo from "@/components/AddTodo";
import ProgressBar from "@/components/ProgressBar";
import TodoList from "@/components/TodoList";

export default function Home() {
  const { user, todos } = useContext(TodoContext);
  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <NavBar />
      {user ? (
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card
              totalCount={totalCount}
              completedCount={completedCount}
              text={"Total Tasks"}
            />
            <Card
              totalCount={totalCount}
              completedCount={completedCount}
              text={"Completed"}
            />
            <Card
              totalCount={totalCount}
              completedCount={completedCount}
              text={"Remaining"}
            />
          </div>
          <AddTodo />

          <ProgressBar
            completedCount={completedCount}
            totalCount={totalCount}
          />

          <TodoList todos={todos} />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center h-screen">
          <h1 className="text-2xl font-medium">Please log in to continue</h1>
        </div>
      )}
    </div>
  );
}
