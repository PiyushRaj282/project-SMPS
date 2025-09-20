"use client";
import React, { useState } from "react";
import { FaUserCircle, FaBriefcase, FaCheckCircle, FaLaptop, FaMapMarkerAlt, FaTag } from "react-icons/fa";

// Mock Data (for demo)
const student = {
  id: "stu001",
  name: "Rahul Sharma",
  department: "CSE",
  cgpa: 8.6,
  email: "rahul@example.com",
};

const companies = [
  { id: "c1", name: "Acme Corp", location: "Bangalore", industry: "Software" },
  { id: "c2", name: "TechSolutions", location: "Hyderabad", industry: "IT Services" },
  { id: "c3", name: "Global Innovate", location: "Pune", industry: "Consulting" },
];

const jobs = [
  { id: "j1", title: "Frontend Developer", package: 6, companyId: "c1" },
  { id: "j2", title: "Data Analyst", package: 5, companyId: "c2" },
  { id: "j3", title: "Product Manager", package: 8, companyId: "c3" },
];

export default function StudentDashboard() {
  const [applications, setApplications] = useState<
    { id: string; jobId: string; status: string }[]
  >([]);

  function applyToJob(jobId: string) {
    if (applications.some((a) => a.jobId === jobId)) return;
    setApplications((prev) => [
      ...prev,
      { id: `a${Date.now()}`, jobId, status: "Applied" },
    ]);
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-blue-800 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Welcome, {student.name}</span>
            <FaUserCircle className="text-xl" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Profile */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <FaUserCircle className="text-blue-500" />
            <span>My Profile</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-700">
            <p className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">Name</span>
              <span className="mt-1 font-semibold">{student.name}</span>
            </p>
            <p className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">Department</span>
              <span className="mt-1 font-semibold">{student.department}</span>
            </p>
            <p className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">CGPA</span>
              <span className="mt-1 font-semibold">{student.cgpa}</span>
            </p>
            <p className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">Email</span>
              <span className="mt-1 font-semibold">{student.email}</span>
            </p>
          </div>
        </div>

        {/* Jobs */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <FaBriefcase className="text-blue-500" />
            <span>Available Jobs</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => {
              const company = companies.find((c) => c.id === job.companyId);
              return (
                <div key={job.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
                    <p className="text-sm text-gray-600 flex items-center space-x-1 mt-1">
                      <FaLaptop className="text-xs" />
                      <span>{company?.name}</span>
                    </p>
                    <div className="mt-3 text-sm text-gray-700 space-y-2">
                      <p className="flex items-center space-x-2">
                        <FaTag className="text-gray-400" />
                        <span>Package: <span className="font-semibold">{job.package} LPA</span></span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-gray-400" />
                        <span>Location: <span className="font-semibold">{company?.location}</span></span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => applyToJob(job.id)}
                    className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    disabled={applications.some(a => a.jobId === job.id)}
                  >
                    {applications.some(a => a.jobId === job.id) ? "Applied" : "Apply Now"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Applications */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <FaCheckCircle className="text-blue-500" />
            <span>My Applications</span>
          </h2>
          {applications.length === 0 ? (
            <p className="text-gray-500 text-center py-4">You have not applied to any jobs yet.</p>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => {
                const job = jobs.find((j) => j.id === app.jobId);
                return (
                  <div
                    key={app.id}
                    className="bg-gray-50 p-4 rounded-lg flex justify-between items-center border border-gray-200"
                  >
                    <p className="font-semibold text-gray-800">{job?.title}</p>
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-700">
                      {app.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-200 text-center py-4 text-gray-600 text-sm">
        © {new Date().getFullYear()} Placement Cell. All rights reserved.
      </footer>
    </div>
  );
}