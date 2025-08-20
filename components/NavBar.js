import React, { useContext } from 'react'
import { Check, User, LogIn, UserPlus } from "lucide-react";
import Link from 'next/link';
import { TodoContext } from '@/context/TodoContext';

const NavBar = () => {
  const{user}  = useContext(TodoContext)
  return (
    <>
    <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Todo
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-full border border-green-200">
                  <User className="w-4 h-4 text-green-600" />
                  <span className="text-green-700 font-medium">Welcome, {user.name}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                    <UserPlus className="w-4 h-4" />
                    <Link href="/register">Sign Up</Link>
                  </button>
                  <button className="flex items-center space-x-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                    <LogIn className="w-4 h-4" />
                    <Link href="/login">Login</Link>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar