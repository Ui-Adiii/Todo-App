"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [loading, setloading] = useState(false);
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const response = await axios.post("/api/user/login", form);
      if (response.data.success) {
        toast.success(response.data.message);
        setloading(false);
        router.push("/");
      } else {
        toast.error(response.data.message);
        setloading(false);
        router.push("/");
      }
    } catch (error) {
      toast.error(error.message);
      setloading(false);
      router.push("/");
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-400 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-1">Welcome back</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900/10"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900/10"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-black text-white py-2.5 font-medium hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Logging in ..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
