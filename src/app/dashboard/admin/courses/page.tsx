"use client";

import { useState } from "react";

interface Course {
  id: string;
  name: string;
  code: string;
  domain: string;
  teacher: string;
  credits: number;
  status: "active" | "archived";
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "Mathematics 101", code: "MATH101", domain: "Science", teacher: "Prof. Smith", credits: 3, status: "active" },
    { id: "2", name: "Computer Science", code: "CS101", domain: "Technology", teacher: "Dr. Johnson", credits: 4, status: "active" },
    { id: "3", name: "Economics", code: "ECON101", domain: "Business", teacher: "Prof. Brown", credits: 3, status: "active" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    domain: "",
    teacher: "",
    credits: 3,
  });

  const handleSave = () => {
    if (editingCourse) {
      setCourses(courses.map(c => c.id === editingCourse.id ? { ...c, ...formData } : c));
    } else {
      setCourses([...courses, { ...formData, id: Date.now().toString(), status: "active" }]);
    }
    setShowModal(false);
    setEditingCourse(null);
    setFormData({ name: "", code: "", domain: "", teacher: "", credits: 3 });
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      name: course.name,
      code: course.code,
      domain: course.domain,
      teacher: course.teacher,
      credits: course.credits,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, status: c.status === "active" ? "archived" : "active" } : c));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Course Management</h1>
          <p className="text-gray-500">Create, edit, and manage courses</p>
        </div>
        <button
          onClick={() => {
            setEditingCourse(null);
            setFormData({ name: "", code: "", domain: "", teacher: "", credits: 3 });
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          + Add New Course
        </button>
      </div>

      {/* Courses Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">Course Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Code</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Domain</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Teacher</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Credits</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{course.name}</td>
                <td className="px-4 py-3">{course.code}</td>
                <td className="px-4 py-3">{course.domain}</td>
                <td className="px-4 py-3">{course.teacher}</td>
                <td className="px-4 py-3">{course.credits}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${course.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                    {course.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleEdit(course)} className="text-blue-600 hover:underline mr-3">Edit</button>
                  <button onClick={() => handleToggleStatus(course.id)} className="text-yellow-600 hover:underline mr-3">
                    {course.status === "active" ? "Archive" : "Activate"}
                  </button>
                  <button onClick={() => handleDelete(course.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editingCourse ? "Edit Course" : "Add New Course"}</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Course Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border rounded px-3 py-2" />
              <input type="text" placeholder="Course Code" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} className="w-full border rounded px-3 py-2" />
              <input type="text" placeholder="Domain" value={formData.domain} onChange={(e) => setFormData({ ...formData, domain: e.target.value })} className="w-full border rounded px-3 py-2" />
              <input type="text" placeholder="Teacher" value={formData.teacher} onChange={(e) => setFormData({ ...formData, teacher: e.target.value })} className="w-full border rounded px-3 py-2" />
              <input type="number" placeholder="Credits" value={formData.credits} onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) })} className="w-full border rounded px-3 py-2" />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
