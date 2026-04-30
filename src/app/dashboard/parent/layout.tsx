export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto p-4">
      <nav className="mb-4 flex gap-4 border-b pb-2">
        <a href="/dashboard/parent" className="hover:underline">Dashboard</a>
        <a href="/dashboard/parent/grades" className="hover:underline">Grades</a>
        <a href="/dashboard/parent/announcements" className="hover:underline">Announcements</a>
      </nav>
      {children}
    </div>
  );
}
