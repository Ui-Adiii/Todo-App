"use client";
import { useState } from "react";

const EditTodo = ({ todo, onClose, onSave }) => {
  const [text, setText] = useState(todo.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(text);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-lg font-semibold mb-3">Edit Todo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
          />
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded-md border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded-md bg-blue-600 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodo;
