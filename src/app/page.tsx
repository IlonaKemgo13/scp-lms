"use client";

import Link from "next/link";

export default function HomePage() {
  const dashboards = [
    {
      title: "Admin Dashboard",
      description: "Full control over users, courses, and system settings",
      href: "/dashboard/admin",
      icon: "👑",
      bgColor: "from-red-500 to-red-600",
      stats: [
        { label: "User Management", value: "Full Access" },
        { label: "Course Control", value: "Create/Delete" },
        { label: "System Settings", value: "Complete" },
      ],
    },
    {
      title: "Teacher Dashboard",
      description: "Manage courses, grades, and communicate with students",
      href: "/dashboard/teacher",
      icon: "👩‍🏫",
      bgColor: "from-green-500 to-green-600",
      stats: [
        { label: "Active Courses", value: "3" },
        { label: "Total Students", value: "45" },
        { label: "Pending Tasks", value: "5" },
      ],
    },
    {
      title: "Student Dashboard",
      description: "Track grades, access recordings, and stay updated",
      href: "/dashboard/student",
      icon: "🎓",
      bgColor: "from-blue-500 to-blue-600",
      stats: [
        { label: "Enrolled Courses", value: "4" },
        { label: "Current GPA", value: "3.8" },
        { label: "Upcoming Tasks", value: "2" },
      ],
    },
    {
      title: "Parent Dashboard",
      description: "Monitor your child's academic progress in real-time",
      href: "/dashboard/parent",
      icon: "👪",
      bgColor: "from-purple-500 to-purple-600",
      stats: [
        { label: "Children Linked", value: "2" },
        { label: "Recent Grades", value: "Updated" },
        { label: "Announcements", value: "3 New" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 mb-6">
            🎓 Smart Communication Portal
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            School Communication
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              & Learning Management System
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Centralize academic communication, manage courses, track grades, and deliver lectures in one unified platform.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Link
              href="/auth/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Get Started →
            </Link>
            <Link
              href="#dashboards"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              View Dashboards
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard Cards Section */}
      <div id="dashboards" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Workspace
            </h2>
            <p className="text-xl text-gray-600">
              Select your role to access personalized features and information
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {dashboards.map((dashboard) => (
              <Link
                key={dashboard.title}
                href={dashboard.href}
                className="group bg-white rounded-2xl shadow-lg border hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden"
              >
                {/* Colored Header */}
                <div className={`bg-gradient-to-r ${dashboard.bgColor} p-6`}>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <span className="text-4xl">{dashboard.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{dashboard.title}</h3>
                      <p className="text-white/90 text-sm mt-1">{dashboard.description}</p>
                    </div>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4">
                    {dashboard.stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Action Button */}
                  <div className="mt-6 pt-4 border-t text-center">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:text-blue-700">
                      Access Dashboard
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for effective academic management
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Role-Based Access</h3>
              <p className="text-gray-500 text-sm">Tailored dashboards for each role</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Course Management</h3>
              <p className="text-gray-500 text-sm">Create and manage courses easily</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Grade Tracking</h3>
              <p className="text-gray-500 text-sm">Real-time grade updates</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎥</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lecture Recordings</h3>
              <p className="text-gray-500 text-sm">Video upload and streaming</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-8 mb-6">
            <span className="text-gray-400 text-sm">About</span>
            <span className="text-gray-400 text-sm">Features</span>
            <span className="text-gray-400 text-sm">Contact</span>
            <span className="text-gray-400 text-sm">Support</span>
          </div>
          <p className="text-gray-400 text-sm">© 2026 School Communication Portal & LMS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
