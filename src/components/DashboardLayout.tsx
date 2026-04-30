"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children, role }: { children: React.ReactNode; role: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navItems = {
    admin: [
      { name: "Dashboard", href: "/dashboard/admin", icon: "📊" },
      { name: "Users", href: "/dashboard/admin/users", icon: "👥" },
      { name: "Courses", href: "/dashboard/admin/courses", icon: "📚" },
      { name: "Announcements", href: "/dashboard/admin/announcements", icon: "📢" },
      { name: "Results", href: "/dashboard/admin/results", icon: "📄" },
      { name: "Settings", href: "/dashboard/admin/settings", icon: "⚙️" },
    ],
    teacher: [
      { name: "Dashboard", href: "/dashboard/teacher", icon: "📊" },
      { name: "Courses", href: "/dashboard/teacher/courses", icon: "📚" },
      { name: "Students", href: "/dashboard/teacher/students", icon: "👥" },
      { name: "Assignments", href: "/dashboard/teacher/assignments", icon: "✏️" },
      { name: "Messages", href: "/dashboard/teacher/messages", icon: "💬" },
      { name: "Calendar", href: "/dashboard/teacher/calendar", icon: "📅" },
      { name: "Grades", href: "/dashboard/teacher/grades", icon: "🎓" },
      { name: "Resources", href: "/dashboard/teacher/resources", icon: "📁" },
      { name: "Settings", href: "/dashboard/teacher/settings", icon: "⚙️" },
    ],
    student: [
      { name: "Dashboard", href: "/dashboard/student", icon: "📊" },
      { name: "My Courses", href: "/dashboard/student/courses", icon: "📚" },
      { name: "Assignments", href: "/dashboard/student/assignments", icon: "✏️" },
      { name: "Messages", href: "/dashboard/student/messages", icon: "💬" },
      { name: "Calendar", href: "/dashboard/student/calendar", icon: "📅" },
      { name: "Grades", href: "/dashboard/student/grades", icon: "🎓" },
      { name: "Resources", href: "/dashboard/student/resources", icon: "📁" },
    ],
    parent: [
      { name: "Dashboard", href: "/dashboard/parent", icon: "📊" },
      { name: "Child's Progress", href: "/dashboard/parent/progress", icon: "📈" },
      { name: "Messages", href: "/dashboard/parent/messages", icon: "💬" },
      { name: "Calendar", href: "/dashboard/parent/calendar", icon: "📅" },
      { name: "Resources", href: "/dashboard/parent/resources", icon: "📁" },
    ],
  };

  const items = navItems[role as keyof typeof navItems] || navItems.student;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-72" : "w-20"} bg-white border-r shadow-sm transition-all duration-300`}>
        <div className="p-5">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏫</span>
              {sidebarOpen && <span className="font-bold text-lg">SCP Portal</span>}
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-700">
              {sidebarOpen ? "◀" : "▶"}
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="space-y-1">
            {items.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
