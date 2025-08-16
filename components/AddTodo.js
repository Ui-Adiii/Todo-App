"use client";
import { TodoContext } from "@/context/TodoContext";
import axios from "axios";
import { Plus } from "lucide-react";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

const AddTodo = () => {
  const { user ,setTodos} = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = async () => {
    if (!newTodo || newTodo.trim() === "") return;
    try {
      const response = await axios.post("/api/task/add", { text: newTodo,userId: user._id});
      setNewTodo("");
      if(response.data.success){
        setTodos((prev) => [...prev, response.data.todo]);
      }
      else{
        toast.error("Failed to add todo");
      }
    } catch (error) {
      toast.error("Failed to add todo");
    }
  };

  return (
    <div className="mb-8">
      <div className="flex space-x-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 shadow-sm transition-all duration-200"
          />
        </div>
        <button 
        onClick={handleAddTodo}
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 transform hover:scale-105">
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Task</span>
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
