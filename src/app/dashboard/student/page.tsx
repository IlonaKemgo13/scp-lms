export default function StudentDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="border rounded-lg p-4 shadow">
          <h2 className="font-semibold">My Grades</h2>
          <p className="text-gray-500">View your grades</p>
        </div>
        <div className="border rounded-lg p-4 shadow">
          <h2 className="font-semibold">Recordings</h2>
          <p className="text-gray-500">Watch lecture recordings</p>
        </div>
        <div className="border rounded-lg p-4 shadow">
          <h2 className="font-semibold">Announcements</h2>
          <p className="text-gray-500">Latest updates</p>
        </div>
      </div>
    </div>
  );
}
