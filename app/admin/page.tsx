"use client";
import React, { useState } from "react";
import { FaBuilding, FaBriefcase, FaUserCheck } from "react-icons/fa";

// Mock Data (replace with API/Prisma)
const companies = [
  { id: "c1", name: "Acme Corp", industry: "Software", location: "Bangalore" },
  { id: "c2", name: "TechSolutions", industry: "IT Services", location: "Hyderabad" },
  { id: "c3", name: "Innovate AI", industry: "Artificial Intelligence", location: "Pune" },
];

const jobs = [
  { id: "j1", title: "Frontend Developer", package: 6, companyId: "c1", status: "Open" },
  { id: "j2", title: "Data Analyst", package: 5, companyId: "c2", status: "Open" },
  { id: "j3", title: "Cloud Engineer", package: 8, companyId: "c3", status: "Open" },
];

const applications = [
  { id: "a1", studentName: "Rahul Sharma", jobTitle: "Frontend Developer", status: "Applied" },
  { id: "a2", studentName: "Anjali Gupta", jobTitle: "Data Analyst", status: "Shortlisted" },
  { id: "a3", studentName: "Priya Singh", jobTitle: "Cloud Engineer", status: "Rejected" },
];

export default function AdminDashboard() {
  const [companyForm, setCompanyForm] = useState({ name: "", industry: "", location: "" });
  const [jobForm, setJobForm] = useState({ title: "", package: "", companyId: "" });

  function addCompany() {
    if (!companyForm.name || !companyForm.industry) return alert("Enter company details");
    alert(`✅ Company Added: ${companyForm.name}`);
    setCompanyForm({ name: "", industry: "", location: "" });
  }

  function postJob() {
    if (!jobForm.title || !jobForm.package || !jobForm.companyId) return alert("Fill job details");
    alert(`✅ Job Posted: ${jobForm.title}`);
    setJobForm({ title: "", package: "", companyId: "" });
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Shortlisted":
        return "bg-amber-100 text-amber-800"; // Changed to amber for shortlisted
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Applied":
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Admin Dashboard</h1>
          <a href="/" className="text-base font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200">
            Logout
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <FaBuilding className="text-4xl text-blue-600" />
            <div>
              <p className="text-gray-500 text-sm">Total Companies</p>
              <p className="text-3xl font-bold text-gray-900">{companies.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <FaBriefcase className="text-4xl text-blue-600" />
            <div>
              <p className="text-gray-500 text-sm">Total Jobs Posted</p>
              <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <FaUserCheck className="text-4xl text-blue-600" />
            <div>
              <p className="text-gray-500 text-sm">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900">{applications.length}</p>
            </div>
          </div>
        </div>
        
        {/* Forms Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-xl p-7">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center gap-3">
              <FaBuilding className="text-blue-500" /> Add New Company
            </h2>
            <div className="space-y-4">
              <input
                value={companyForm.name}
                onChange={(e) => setCompanyForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Company Name"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                value={companyForm.industry}
                onChange={(e) => setCompanyForm((p) => ({ ...p, industry: e.target.value }))}
                placeholder="Industry (e.g., Software, Finance)"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                value={companyForm.location}
                onChange={(e) => setCompanyForm((p) => ({ ...p, location: e.target.value }))}
                placeholder="Location"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={addCompany}
                className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200 text-lg"
              >
                Add Company
              </button>
            </div>
          </div>

          {/* Post Job */}
          <div className="bg-white shadow-md rounded-xl p-7">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center gap-3">
              <FaBriefcase className="text-blue-500" /> Post New Job
            </h2>
            <div className="space-y-4">
              <input
                value={jobForm.title}
                onChange={(e) => setJobForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="Job Title"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                value={jobForm.package}
                onChange={(e) => setJobForm((p) => ({ ...p, package: e.target.value }))}
                placeholder="Package (LPA)"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <select
                value={jobForm.companyId}
                onChange={(e) => setJobForm((p) => ({ ...p, companyId: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              >
                <option value="">Select Company</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <button
                onClick={postJob}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg"
              >
                Post Job
              </button>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white shadow-md rounded-xl p-7">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center gap-3">
            <FaUserCheck className="text-blue-500" /> Recent Applications
          </h2>
          {applications.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No applications have been submitted yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((a) => (
                    <tr key={a.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {a.studentName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {a.jobTitle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(a.status)}`}
                        >
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}