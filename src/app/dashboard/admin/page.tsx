"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats({
          totalUsers: data.totalUsers || 0,
          totalStudents: data.totalStudents || 0,
          totalTeachers: data.totalTeachers || 0,
          totalCourses: data.totalCourses || 0,
        });
      } catch (err) {
        console.error("Failed to load stats", err);
      }
    }
    loadStats();
  }, []);

  const features = [
    { title: "User Management", href: "/dashboard/admin/users", icon: "👥", color: "bg-blue-100", description: "Add, edit, and manage user accounts" },
    { title: "Course Management", href: "/dashboard/admin/courses", icon: "📚", color: "bg-green-100", description: "Create and manage courses" },
    { title: "Global Announcements", href: "/dashboard/admin/announcements", icon: "📢", color: "bg-orange-100", description: "Post institution-wide announcements" },
    { title: "Enrollments", href: "/dashboard/admin/enrollments", icon: "📝", color: "bg-purple-100", description: "Manage student enrollments" },
    { title: "Final Results", href: "/dashboard/admin/results", icon: "📄", color: "bg-red-100", description: "Upload final results PDFs" },
    { title: "Settings", href: "/dashboard/admin/settings", icon: "⚙️", color: "bg-gray-100", description: "Platform configuration" },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage platform settings, users, courses, and content</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
          <div className="text-sm text-gray-500">Total Users</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="text-2xl font-bold text-green-600">{stats.totalStudents}</div>
          <div className="text-sm text-gray-500">Students</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="text-2xl font-bold text-purple-600">{stats.totalTeachers}</div>
          <div className="text-sm text-gray-500">Teachers</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="text-2xl font-bold text-orange-600">{stats.totalCourses}</div>
          <div className="text-sm text-gray-500">Courses</div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/dashboard/admin/users" className="text-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
            <div className="text-xl mb-1">👥</div>
            <div className="text-sm font-medium">Manage Users</div>
          </Link>
          <Link href="/dashboard/admin/courses" className="text-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition">
            <div className="text-xl mb-1">📚</div>
            <div className="text-sm font-medium">Manage Courses</div>
          </Link>
          <Link href="/dashboard/admin/announcements" className="text-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition">
            <div className="text-xl mb-1">📢</div>
            <div className="text-sm font-medium">Post Announcement</div>
          </Link>
          <Link href="/dashboard/admin/results" className="text-center p-3 bg-red-50 rounded-lg hover:bg-red-100 transition">
            <div className="text-xl mb-1">📄</div>
            <div className="text-sm font-medium">Upload Results</div>
          </Link>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">Management</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <Link key={f.title} href={f.href} className="block p-5 bg-white border rounded-xl hover:shadow-md transition">
            <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center text-2xl mb-3`}>{f.icon}</div>
            <h3 className="font-semibold text-gray-900">{f.title}</h3>
            <p className="text-gray-500 text-sm mt-1">{f.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
