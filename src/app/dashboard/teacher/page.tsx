"use client";
import DashboardLayout from "@/components/DashboardLayout";

export default function TeacherDashboardPage() {
  const announcements = [
    {
      id: 1,
      title: "Capstone Project",
      message: "do your project",
      posted: "4/29/2026",
      due: "2026-05-09",
    },
    {
      id: 2,
      title: "Agile Development",
      message: "Do Your Assignment",
      posted: "4/29/2026",
      due: "2026-05-06",
    },
  ];

  return (
    <DashboardLayout role="teacher">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Workspace</h1>
          <p className="text-gray-500">Welcome back! Manage your course updates</p>
        </div>

        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome back! 👋</h2>
          <p className="text-blue-100">Manage your course updates and announcements</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Announcements Section - 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Announcements</h2>
                  <p className="text-sm text-gray-500">Share important course updates, assignment reminders, deadlines, and academic notices</p>
                </div>
                <div className="text-sm text-gray-400">{announcements.length} announcement(s) found</div>
              </div>

              {/* Create Announcement Card */}
              <div className="border rounded-lg p-4 mb-6 bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-3">Create Announcement</h3>
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                />
                <textarea
                  placeholder="Write the announcement details..."
                  rows={3}
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                />
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Publish Announcement
                  </button>
                </div>
              </div>

              {/* Announcements List */}
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                      <div className="text-right text-sm">
                        <div className="text-gray-500">Posted {announcement.posted}</div>
                        <div className="text-orange-600 text-xs">Due: {announcement.due}</div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{announcement.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Search Card */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Search announcements...</h3>
              <input
                type="text"
                placeholder="Search..."
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Courses</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Students</span>
                  <span className="font-semibold">45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pending Tasks</span>
                  <span className="font-semibold text-orange-600">5</span>
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Upcoming Deadlines</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium">Capstone Project</div>
                  <div className="text-gray-400 text-xs">Due: May 9, 2026</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Agile Assignment</div>
                  <div className="text-gray-400 text-xs">Due: May 6, 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
