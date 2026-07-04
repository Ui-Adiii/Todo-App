"use client"
import React, { useContext, useState } from 'react'
import { Check, User, LogIn, UserPlus,LogOut } from "lucide-react";
import Link from 'next/link';
import { TodoContext } from '@/context/TodoContext';
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
const NavBar = ({ user }) => {
    const [loading, setloading] = useState(false);
  
    const router = useRouter();
  const handleLogout = async (e) => {
    e.preventDefault();
    
      setloading(true);
      try {
        const response = await axios.get("/api/user/logout");
        if (response.data.success) {
          toast.success(response.data.message);
          setloading(false);
          router.push("/login")
        } else {
          toast.error(response.data.message);
          setloading(false);
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message);
        setloading(false);
      }
    };
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
              {user !== null && (
                <>
                  <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-full border border-green-200">
                    <User className="w-4 h-4 text-green-600" />
                    <span className="text-green-700 font-medium">
                      Welcome, {user.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              )}
              {user === null && (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/register"
                    className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white  hover:bg-green-700 rounded-lg transition-all duration-200"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </Link>
                  <Link
                    href="/login"
                    className="flex items-center space-x-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar