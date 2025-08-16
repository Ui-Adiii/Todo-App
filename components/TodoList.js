import { Check } from 'lucide-react'
import React from 'react'
import ShowTodo from './ShowTodo'

const TodoList = ({ todos }) => {
  return (
    <>
    <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <Check className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks yet</h3>
              <p className="text-gray-500">Add your first task above to get started!</p>
            </div>
          ) : (
            todos.map((todo, index) => (
              <ShowTodo key={todo._id} todo={todo}  index={index}/>
            ))
          )}
        </div>
    
    
    </>
  )
}

export default TodoList