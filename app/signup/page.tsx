"use client";
import React, { useState } from "react";

export default function StudentSignup() {
  const [formData, setFormData] = useState({
    name: "",
    regNumber: "",
    email: "",
    cgpa: "",
    department: "",
    password: "", // New password field
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Simple validation
    if (!formData.name || !formData.regNumber || !formData.email || !formData.cgpa || !formData.department || !formData.password) {
      setError("Please fill out all fields.");
      return;
    }
    
    // CGPA validation (e.g., must be a number between 0 and 10)
    const cgpaValue = parseFloat(formData.cgpa);
    if (isNaN(cgpaValue) || cgpaValue < 0 || cgpaValue > 10) {
      setError("CGPA must be a number between 0 and 10.");
      return;
    }

    // You might add password validation here (e.g., min length, complexity)
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Mock API call
    console.log("Student signup data:", formData);
    setSuccess("✅ Sign-up successful!");
    // You would typically send this data to a backend API here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar (reused from LandingPage) */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Placement Cell</h1>
          <nav className="flex items-center gap-6 text-gray-600 font-medium">
            <a href="/" className="hover:text-blue-600 transition-colors duration-200">Login</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Student Sign Up
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Create your account to get started.
          </p>
          
          <form onSubmit={handleSignup} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Registration Number */}
            <div>
              <label htmlFor="regNumber" className="block text-sm font-medium text-gray-700">Registration Number</label>
              <input
                type="text"
                id="regNumber"
                name="regNumber"
                value={formData.regNumber}
                onChange={handleChange}
                placeholder="e.g., 23BDS0000"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Department */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">Select Department</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
                <option value="IT">IT</option>
              </select>
            </div>

            {/* CGPA */}
            <div>
              <label htmlFor="cgpa" className="block text-sm font-medium text-gray-700">CGPA</label>
              <input
                type="number"
                id="cgpa"
                name="cgpa"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa}
                onChange={handleChange}
                placeholder="e.g., 8.5"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 font-bold text-lg"
            >
              Sign Up
            </button>
          </form>
        </div>
      </main>

      {/* Footer (reused from LandingPage) */}
      <footer className="bg-white border-t border-gray-100 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} College Placement Cell. All rights reserved.
      </footer>
    </div>
  );
}