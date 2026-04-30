"use client";

import { useState } from "react";
import Link from "next/link";

// Mock data - replace with Supabase queries later
const mockChildren = [
  { id: "1", name: "John Doe", grade: "10th Grade", studentId: "STU001" },
  { id: "2", name: "Jane Doe", grade: "8th Grade", studentId: "STU002" },
];

const mockAnnouncementsData = {
  "1": [
    {
      id: "a1",
      title: "Math Test Next Week",
      course: "Mathematics 101",
      teacher: "Prof. Smith",
      date: "2026-04-25",
      priority: "high",
      description: "Chapter 5-7 will be covered. Please review all homework problems.",
      attachments: ["study_guide.pdf"],
    },
    {
      id: "a2",
      title: "Science Fair",
      course: "Science 101",
      teacher: "Dr. Johnson",
      date: "2026-04-28",
      priority: "normal",
      description: "Submit projects by Friday. Presentations will be held in the auditorium.",
      attachments: [],
    },
    {
      id: "a3",
      title: "Parent-Teacher Conference",
      course: "All Courses",
      teacher: "Administration",
      date: "2026-05-05",
      priority: "high",
      description: "Schedule your appointment. Virtual meetings available.",
      attachments: ["schedule.pdf"],
    },
    {
      id: "a4",
      title: "English Essay Due",
      course: "English Literature",
      teacher: "Ms. Brown",
      date: "2026-04-30",
      priority: "normal",
      description: "Final draft of the literary analysis essay. Minimum 1000 words.",
      attachments: [],
    },
  ],
  "2": [
    {
      id: "a5",
      title: "Math Quiz",
      course: "Mathematics 101",
      teacher: "Prof. Smith",
      date: "2026-04-27",
      priority: "normal",
      description: "Quiz on fractions and decimals.",
      attachments: [],
    },
    {
      id: "a6",
      title: "Field Trip Permission",
      course: "Science 101",
      teacher: "Dr. Johnson",
      date: "2026-05-02",
      priority: "high",
      description: "Permission slips due by Friday. Trip to Science Museum.",
      attachments: ["permission_slip.pdf"],
    },
    {
      id: "a7",
      title: "Parent-Teacher Conference",
      course: "All Courses",
      teacher: "Administration",
      date: "2026-05-05",
      priority: "high",
      description: "Schedule your appointment. Virtual meetings available.",
      attachments: ["schedule.pdf"],
    },
  ],
};

// Helper to get priority styling
const getPriorityStyles = (priority: string) => {
  if (priority === "high") {
    return {
      badge: "bg-red-100 text-red-700",
      border: "border-l-4 border-red-500",
    };
  }
  return {
    badge: "bg-gray-100 text-gray-700",
    border: "border-l-4 border-gray-300",
  };
};

export default function ParentAnnouncementsPage() {
  const [selectedChildId, setSelectedChildId] = useState("1");
  const [filterCourse, setFilterCourse] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const children = mockChildren;
  const announcements = mockAnnouncementsData[selectedChildId as keyof typeof mockAnnouncementsData] || [];

  // Get unique courses for filter
  const courses = ["all", ...new Set(announcements.map((a) => a.course))];

  // Filter announcements
  const filteredAnnouncements = announcements.filter((announcement) => {
    if (filterCourse !== "all" && announcement.course !== filterCourse) return false;
    if (searchTerm && !announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !announcement.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/dashboard/parent" className="text-blue-600 hover:underline mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-500 mt-1">View course announcements and important updates</p>
        </div>

        {/* Child Selector */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-gray-600 font-medium">Select Child:</span>
            <div className="flex gap-3">
              {children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => {
                    setSelectedChildId(child.id);
                    setFilterCourse("all");
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedChildId === child.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {child.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <span className="text-gray-600 font-medium">Filter by Course:</span>
              {courses.map((course) => (
                <button
                  key={course}
                  onClick={() => setFilterCourse(course)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filterCourse === course
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {course === "all" ? "All Courses" : course}
                </button>
              ))}
            </div>
            <div>
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1 border rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="text-2xl font-bold text-blue-600">{announcements.length}</div>
            <div className="text-sm text-gray-500">Total Announcements</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="text-2xl font-bold text-orange-600">{announcements.filter(a => a.priority === "high").length}</div>
            <div className="text-sm text-gray-500">High Priority</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="text-2xl font-bold text-purple-600">{new Set(announcements.map(a => a.course)).size}</div>
            <div className="text-sm text-gray-500">Affected Courses</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="text-2xl font-bold text-green-600">{filteredAnnouncements.length}</div>
            <div className="text-sm text-gray-500">Showing</div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((announcement) => {
              const priorityStyles = getPriorityStyles(announcement.priority);
              return (
                <div
                  key={announcement.id}
                  className={`bg-white rounded-xl shadow-sm border overflow-hidden ${priorityStyles.border}`}
                >
                  <div className="p-6">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityStyles.badge}`}>
                            {announcement.priority === "high" ? "⚠️ High Priority" : "Normal"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                          <span>📚 {announcement.course}</span>
                          <span>👨‍🏫 {announcement.teacher}</span>
                          <span>📅 {announcement.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-3">{announcement.description}</p>
                    {announcement.attachments.length > 0 && (
                      <div className="mt-4 pt-3 border-t">
                        <div className="text-sm text-gray-500 mb-2">📎 Attachments:</div>
                        <div className="flex gap-2">
                          {announcement.attachments.map((file, idx) => (
                            <button
                              key={idx}
                              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                            >
                              📄 {file}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
              <p className="text-gray-500">No announcements found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
