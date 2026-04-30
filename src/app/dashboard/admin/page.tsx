export default function AdminDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Courses</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Teachers</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>

      {/* Admin Navigation Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <a href="/dashboard/admin/users" className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
          <h2 className="font-semibold text-lg mb-2">👥 User Management</h2>
          <p className="text-gray-500 text-sm">Create, edit, and manage user accounts</p>
        </a>
        <a href="/dashboard/admin/courses" className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
          <h2 className="font-semibold text-lg mb-2">📚 Course Management</h2>
          <p className="text-gray-500 text-sm">Create and manage courses</p>
        </a>
        <a href="/dashboard/admin/enrollments" className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
          <h2 className="font-semibold text-lg mb-2">📝 Enrollments</h2>
          <p className="text-gray-500 text-sm">Manage student enrollments</p>
        </a>
        <a href="/dashboard/admin/announcements" className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
          <h2 className="font-semibold text-lg mb-2">📢 Global Announcements</h2>
          <p className="text-gray-500 text-sm">Post institution-wide announcements</p>
        </a>
        <a href="/dashboard/admin/results" className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
          <h2 className="font-semibold text-lg mb-2">📄 Final Results</h2>
          <p className="text-gray-500 text-sm">Upload final results PDFs</p>
        </a>
        <a href="/dashboard/admin/settings" className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
          <h2 className="font-semibold text-lg mb-2">⚙️ Settings</h2>
          <p className="text-gray-500 text-sm">Platform configuration</p>
        </a>
      </div>
    </div>
  );
}
