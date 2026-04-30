"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TeacherDashboardPage() {
  const router = useRouter();
  const [teacher, setTeacher] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }
      
      // Get teacher profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      setTeacher(profile);
      
      // Get courses taught by this teacher
      const { data: teacherCourses } = await supabase
        .from("courses")
        .select("*")
        .eq("teacher_id", user.id);
      
      if (teacherCourses) setCourses(teacherCourses);
      
      // Get all students (for demo)
      const { data: allStudents } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "student");
      
      if (allStudents) setStudents(allStudents);
      
      // Get announcements
      const { data: allAnnouncements } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (allAnnouncements) setAnnouncements(allAnnouncements);
      
      setLoading(false);
    };
    
    fetchData();
  }, [router]);

  const stats = [
    { title: "My Courses", value: courses.length, icon: "??", color: "bg-blue-100", textColor: "text-blue-600" },
    { title: "Total Students", value: students.length, icon: "??", color: "bg-green-100", textColor: "text-green-600" },
    { title: "Announcements", value: announcements.length, icon: "??", color: "bg-orange-100", textColor: "text-orange-600" },
    { title: "Pending Tasks", value: "5", icon: "?", color: "bg-purple-100", textColor: "text-purple-600" },
  ];

  const quickActions = [
    { title: "Manage Courses", href: "/dashboard/teacher/courses", icon: "??", color: "bg-blue-50" },
    { title: "Post Announcement", href: "/dashboard/teacher/announcements/new", icon: "??", color: "bg-green-50" },
    { title: "Manage Grades", href: "/dashboard/teacher/grades", icon: "??", color: "bg-yellow-50" },
    { title: "Upload Recording", href: "/dashboard/teacher/recordings", icon: "??", color: "bg-red-50" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, {teacher?.full_name || teacher?.email}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-2xl mb-3`}>
                {stat.icon}
              </div>
              <div className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.title}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className={`${action.color} rounded-xl p-4 text-center hover:shadow-md transition`}
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <div className="text-sm font-medium text-gray-700">{action.title}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex gap-8">
            {["overview", "courses", "students", "announcements"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 capitalize font-medium transition ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* My Courses */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
                <h2 className="font-semibold text-gray-900">My Courses</h2>
                <Link href="/dashboard/teacher/courses" className="text-sm text-blue-600 hover:underline">
                  View All ?
                </Link>
              </div>
              <div className="divide-y">
                {courses.slice(0, 3).map((course) => (
                  <div key={course.id} className="p-4">
                    <h3 className="font-medium text-gray-900">{course.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{course.description || "No description"}</p>
                  </div>
                ))}
                {courses.length === 0 && (
                  <div className="p-6 text-center text-gray-500">No courses assigned yet</div>
                )}
              </div>
            </div>

            {/* Recent Announcements */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
                <h2 className="font-semibold text-gray-900">Recent Announcements</h2>
                <Link href="/dashboard/teacher/announcements" className="text-sm text-blue-600 hover:underline">
                  View All ?
                </Link>
              </div>
              <div className="divide-y">
                {announcements.slice(0, 3).map((ann) => (
                  <div key={ann.id} className="p-4">
                    <h3 className="font-medium text-gray-900">{ann.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{ann.description}</p>
                  </div>
                ))}
                {announcements.length === 0 && (
                  <div className="p-6 text-center text-gray-500">No announcements yet</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg text-gray-900">{course.name}</h3>
                  <span className="text-2xl">??</span>
                </div>
                <p className="text-gray-500 text-sm mb-4">{course.description || "No description"}</p>
                <Link href={`/dashboard/teacher/courses/${course.id}`} className="text-blue-600 text-sm hover:underline">
                  Manage Course ?
                </Link>
              </div>
            ))}
            {courses.length === 0 && (
              <div className="col-span-full bg-white rounded-xl shadow-sm border p-12 text-center text-gray-500">
                No courses assigned yet
              </div>
            )}
          </div>
        )}

        {/* Students Tab */}
        {activeTab === "students" && (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-900">{student.full_name || student.email}</td>
                    <td className="px-6 py-3 text-gray-500">{student.email}</td>
                    <td className="px-6 py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Active</span>
                    </td>
                    <td className="px-6 py-3">
                      <Link href={`/dashboard/teacher/students/${student.id}`} className="text-blue-600 text-sm hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {students.length === 0 && (
              <div className="p-12 text-center text-gray-500">No students found</div>
            )}
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === "announcements" && (
          <div className="space-y-4">
            <Link
              href="/dashboard/teacher/announcements/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
            >
              + Post New Announcement
            </Link>
            {announcements.map((ann) => (
              <div key={ann.id} className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{ann.title}</h3>
                    <p className="text-sm text-gray-500">{new Date(ann.created_at).toLocaleDateString()}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">?</button>
                </div>
                <p className="text-gray-600 mt-2">{ann.description}</p>
              </div>
            ))}
            {announcements.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-500">
                No announcements yet. Click "Post New Announcement" to create one.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
