"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  FaUserCircle,
  FaBriefcase,
  FaCheckCircle,
  FaLaptop,
  FaMapMarkerAlt,
  FaTag,
} from "react-icons/fa";

// Extend NextAuth session type
declare module "next-auth" {
  interface Session {
    user?: {
      studentId?: string;
    };
  }
}

export default function StudentDashboard() {
  const { data: session, status } = useSession();
  const [student, setStudent] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyingIds, setApplyingIds] = useState<string[]>([]);

  const studentId = session?.user?.studentId;

  // Fetch profile, jobs, and applications
  useEffect(() => {
    if (!studentId) return;

    async function fetchData() {
      try {
        const [profileRes, jobsRes, appsRes] = await Promise.all([
          fetch(`/api/student?type=profile&studentId=${studentId}`),
          fetch(`/api/student?type=jobs`),
          fetch(`/api/student?type=applications&studentId=${studentId}`),
        ]);

        const profile = await profileRes.json();
        const jobsData = await jobsRes.json();
        const appsData = await appsRes.json();

        setStudent(profile);
        setJobs(jobsData);
        setApplications(appsData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [studentId]);

  // Handle job application
  const handleApply = async (jobId: string) => {
    if (!studentId) {
      console.error("No studentId in session");
      return;
    }

    // Prevent double clicks
    if (applyingIds.includes(jobId)) return;

    try {
      setApplyingIds((prev) => [...prev, jobId]);

      const res = await fetch("/api/student/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, jobId }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Apply failed:", err);
        return;
      }

      const data = await res.json();

      // Refresh applications if applied or already applied
      if (data.success || data.message === "Already applied") {
        const appsRes = await fetch(
          `/api/student?type=applications&studentId=${studentId}`
        );
        if (appsRes.ok) {
          const appsData = await appsRes.json();
          setApplications(appsData);
        }
      }
    } catch (err) {
      console.error("Apply error:", err);
    } finally {
      setApplyingIds((prev) => prev.filter((id) => id !== jobId));
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-blue-800 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">
              Welcome, {student?.name || "Student"}
            </span>
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
            <p><strong>Name:</strong> {student?.name}</p>
            <p><strong>Department:</strong> {student?.department}</p>
            <p><strong>CGPA:</strong> {student?.cgpa}</p>
            <p><strong>Email:</strong> {student?.email}</p>
          </div>
        </div>

        {/* Jobs */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <FaBriefcase className="text-blue-500" />
            <span>Available Jobs</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length === 0 ? (
              <p className="text-gray-500">No jobs available right now.</p>
            ) : (
              jobs.map((job) => {
                const alreadyApplied = applications.some(
                  (app: any) => app.jobId === job.id || app.job?.id === job.id
                );
                const isApplying = applyingIds.includes(job.id);

                return (
                  <div
                    key={job.id}
                    className="border p-5 rounded-lg shadow-sm bg-gray-50 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <FaLaptop className="mr-2" /> {job.company?.name || "—"}
                      </p>
                      <p className="text-sm text-gray-600 mt-1 flex items-center">
                        <FaMapMarkerAlt className="mr-1" /> {job.location || "Remote"}
                      </p>
                      <p className="text-sm mt-1">
                        <FaTag className="inline text-gray-400 mr-1" />
                        Package: <strong>{job.package ?? "N/A"} LPA</strong>
                      </p>
                    </div>

                    <button
                      onClick={() => handleApply(job.id)}
                      disabled={alreadyApplied || isApplying || !studentId}
                      className={`mt-4 px-4 py-2 rounded-lg font-semibold text-sm transition ${
                        alreadyApplied || !studentId
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : isApplying
                          ? "bg-blue-400 text-white cursor-wait"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {isApplying
                        ? "Applying..."
                        : alreadyApplied
                        ? "Applied"
                        : "Apply Now"}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Applications */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <FaCheckCircle className="text-blue-500" />
            <span>My Applications</span>
          </h2>

          {applications.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              You haven’t applied to any jobs yet.
            </p>
          ) : (
            <div className="space-y-3">
              {applications.map((app: any) => (
                <div
                  key={app.id}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border hover:bg-blue-50 transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {app.job?.title || "Unknown Job"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {app.job?.company?.name || "Unknown Company"}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      app.status === "Applied"
                        ? "bg-yellow-100 text-yellow-700"
                        : app.status === "Selected"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-200 text-center py-4 text-gray-600 text-sm">
        © {new Date().getFullYear()} Placement Cell. All rights reserved.
      </footer>
    </div>
  );
}
