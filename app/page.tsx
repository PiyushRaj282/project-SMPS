"use client";
import React, { useState } from "react";

export default function LandingPage() {
  const [role, setRole] = useState<"student" | "admin">("student");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // Demo credentials
    const DEMO_ADMIN = { id: "admin123", password: "password123" };
    const DEMO_STUDENT = { id: "stu001", password: "student123" };

    if (role === "admin") {
      if (id === DEMO_ADMIN.id && password === DEMO_ADMIN.password) {
        alert("✅ Admin Login Successful");
        window.location.href = "/admin/dashboard";
      } else {
        setError("❌ Invalid Admin ID or Password");
      }
    } else {
      if (id === DEMO_STUDENT.id && password === DEMO_STUDENT.password) {
        alert("✅ Student Login Successful");
        window.location.href = "/student/dashboard";
      } else {
        setError("❌ Invalid Student ID or Password");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Placement Cell</h1>
          <nav className="flex items-center gap-6 text-gray-600 font-medium">
            <a href="#about" className="hover:text-blue-600 transition-colors duration-200">About</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors duration-200">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content (Title and Description) */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Student Placement <br className="hidden md:block"/> Management System
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
              A centralized platform to manage students, companies, and campus placement records efficiently.
            </p>
          </div>

          {/* Right Content (Login Card) */}
          <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Welcome Back
            </h3>
            
            {/* Role Switch */}
            <div className="flex justify-center gap-2 mb-6 p-1 bg-gray-100 rounded-full">
              <button
                onClick={() => { setRole("student"); setError(""); }}
                className={`flex-1 px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${
                  role === "student" ? "bg-blue-600 text-white shadow" : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Student
              </button>
              <button
                onClick={() => { setRole("admin"); setError(""); }}
                className={`flex-1 px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${
                  role === "admin" ? "bg-blue-600 text-white shadow" : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Admin
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                  {role === "admin" ? "Admin ID" : "Student ID"}
                </label>
                <input
                  id="id"
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder={`Enter ${role} ID`}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 font-bold text-lg"
              >
                Login as {role === "admin" ? "Admin" : "Student"}
              </button>
            </form>
            
            {/* Sign-up Option */}
            {role === "student" && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a href="/signup" className="font-semibold text-blue-600 hover:text-blue-700">
                    Sign up
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} College Placement Cell. All rights reserved.
      </footer>
    </div>
  );
}