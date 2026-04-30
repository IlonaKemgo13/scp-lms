"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ParentDashboardPage() {
  const router = useRouter();
  const [parent, setParent] = useState<any>(null);
  const [children, setChildren] = useState<any[]>([]);
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [grades, setGrades] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchParentData();
  }, []);

  const fetchParentData = async () => {
    const supabase = createClient();
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push("/auth/login");
      return;
    }
    
    // Get parent profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    
    if (profile?.role !== "parent") {
      router.push(`/dashboard/${profile?.role}`);
      return;
    }
    
    setParent(profile);
    
    // Get linked children
    const { data: links } = await supabase
      .from("parent_links")
      .select("student_id")
      .eq("parent_id", user.id);
    
    if (links && links.length > 0) {
      const studentIds = links.map(l => l.student_id);
      const { data: students } = await supabase
        .from("profiles")
        .select("*")
        .in("id", studentIds);
      
      if (students) {
        setChildren(students);
        setSelectedChild(students[0]);
      }
    }
    
    setLoading(false);
  };

  // Fetch grades when child is selected
  useEffect(() => {
    if (!selectedChild) return;
    
    const fetchGrades = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("grades")
        .select("*")
        .eq("student_id", selectedChild.id);
      
      if (data) setGrades(data);
    };
    
    const fetchAnnouncements = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (data) setAnnouncements(data);
    };
    
    fetchGrades();
    fetchAnnouncements();
  }, [selectedChild]);

  if (loading) {
    return <div className="p-6 text-center">Loading dashboard...</div>;
  }

  if (children.length === 0) {
    return (
      <div className="p-6 text-center">
        <p>No children linked to your account. Please contact administrator.</p>
        <button onClick={() => router.push("/auth/login")} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
          <p className="text-gray-500">Welcome, {parent?.full_name || parent?.email}</p>
        </div>

        {/* Child Selector */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-medium text-gray-700">Select Child:</span>
            <div className="flex gap-3">
              {children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => setSelectedChild(child)}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedChild?.id === child.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {child.full_name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {selectedChild && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-sm border p-4">
                <div className="text-2xl font-bold text-blue-600">{grades.length}</div>
                <div className="text-sm text-gray-500">Total Grades</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-4">
                <div className="text-2xl font-bold text-green-600">
                  {grades.length > 0 
                    ? Math.round(grades.reduce((sum, g) => sum + (g.score / g.max_score * 100), 0) / grades.length)
                    : 0}%
                </div>
                <div className="text-sm text-gray-500">Average Score</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-4">
                <div className="text-2xl font-bold text-orange-600">{announcements.length}</div>
                <div className="text-sm text-gray-500">Announcements</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-4">
                <div className="text-2xl font-bold text-purple-600">{selectedChild.role || "Student"}</div>
                <div className="text-sm text-gray-500">Status</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b mb-6">
              <div className="flex gap-6">
                {["overview", "grades", "announcements"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 px-1 capitalize transition ${
                      activeTab === tab
                        ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Recent Grades */}
                <div className="bg-white rounded-xl shadow-sm border">
                  <div className="px-6 py-4 border-b bg-gray-50">
                    <h2 className="font-semibold">Recent Grades</h2>
                  </div>
                  <div className="divide-y">
                    {grades.slice(0, 5).map((grade) => (
                      <div key={grade.id} className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{grade.assignment_name}</p>
                            <p className="text-sm text-gray-500">{grade.course_id}</p>
                          </div>
                          <div className="text-xl font-bold text-blue-600">
                            {grade.score}/{grade.max_score}
                          </div>
                        </div>
                      </div>
                    ))}
                    {grades.length === 0 && (
                      <div className="p-6 text-center text-gray-500">No grades available</div>
                    )}
                  </div>
                  {grades.length > 0 && (
                    <div className="px-6 py-3 border-t bg-gray-50">
                      <button onClick={() => setActiveTab("grades")} className="text-blue-600 text-sm">
                        View all grades →
                      </button>
                    </div>
                  )}
                </div>

                {/* Recent Announcements */}
                <div className="bg-white rounded-xl shadow-sm border">
                  <div className="px-6 py-4 border-b bg-gray-50">
                    <h2 className="font-semibold">Recent Announcements</h2>
                  </div>
                  <div className="divide-y">
                    {announcements.slice(0, 5).map((ann) => (
                      <div key={ann.id} className="p-4">
                        <h3 className="font-medium">{ann.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{ann.content}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(ann.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                    {announcements.length === 0 && (
                      <div className="p-6 text-center text-gray-500">No announcements yet</div>
                    )}
                  </div>
                  {announcements.length > 0 && (
                    <div className="px-6 py-3 border-t bg-gray-50">
                      <button onClick={() => setActiveTab("announcements")} className="text-blue-600 text-sm">
                        View all announcements →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Grades Tab */}
            {activeTab === "grades" && (
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium">Assignment</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Score</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {grades.map((grade) => (
                      <tr key={grade.id} className="hover:bg-gray-50">
                        <td className="px-6 py-3">{grade.assignment_name}</td>
                        <td className="px-6 py-3">
                          <span className="font-medium">{grade.score}</span>/{grade.max_score}
                        </td>
                        <td className="px-6 py-3 text-gray-500">
                          {new Date(grade.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {grades.length === 0 && (
                  <div className="p-6 text-center text-gray-500">No grades available</div>
                )}
              </div>
            )}

            {/* Announcements Tab */}
            {activeTab === "announcements" && (
              <div className="space-y-4">
                {announcements.map((ann) => (
                  <div key={ann.id} className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="font-semibold text-lg">{ann.title}</h3>
                    <p className="text-gray-600 mt-2">{ann.content}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-400">
                        Posted: {new Date(ann.created_at).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-gray-400">Course ID: {ann.course_id?.slice(0, 8)}</span>
                    </div>
                  </div>
                ))}
                {announcements.length === 0 && (
                  <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-500">
                    No announcements available
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
