"use client";
import React, { useContext, useState } from "react";
import { Edit3, Trash2, Check } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { TodoContext } from "@/context/TodoContext";
import EditTodo from "./EditTodo";

const ShowTodo = ({ todo, index }) => {
  const { fetchTodos } = useContext(TodoContext);
  const [open, setOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/task/delete/${id}`);
      if (response.data.success) {
        toast.success("Todo deleted successfully");
        fetchTodos();
      } else {
        toast.error("Failed to delete todo");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleToggleComplete = async () => {
    try {
      const response = await axios.patch(`/api/task/edit/${todo._id}`, {
        completed: !todo.completed,
      });
      if (response.data.success) {
        toast.success("Todo updated successfully");
        fetchTodos();
      } else {
        toast.error("Failed to update todo");
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <div
        className={`group bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 animate-in slide-in-from-bottom-2 ${
          todo.completed ? "opacity-75" : ""
        }`}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <button
            onClick={handleToggleComplete}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                todo.completed
                  ? "bg-green-500 border-green-500 text-white"
                  : "border-gray-300 hover:border-green-400"
              }`}
            >
              {todo.completed && <Check className="w-3 h-3" />}
            </button>
            <span
              className={`flex-1 transition-all duration-200 ${
                todo.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {todo.text}
            </span>
          </div>

          <div className="flex items-center space-x-2 ">
            <button
              onClick={() => setOpen(true)}
              className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleDelete(todo._id)}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <EditTodo
          todo={todo}
          onClose={() => setOpen(false)}
          onSave={async (updatedText) => {
            try {
              const response = await axios.patch(`/api/task/edit/${todo._id}`, {
                text: updatedText,
              });
              if (response.data.success) {
                toast.success("Todo updated successfully");
                fetchTodos();
                setOpen(false);
              } else {
                toast.error("Failed to update todo");
              }
            } catch (error) {
              toast.error(error.message);
            }
          }}
        />
      )}
    </>
  );
};

export default ShowTodo;
