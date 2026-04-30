"use client";

import { useState } from "react";

export default function AdminEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([
    { id: "1", student: "John Doe", course: "Mathematics 101", enrolledAt: "2026-04-01", status: "active" },
    { id: "2", student: "Jane Smith", course: "Computer Science", enrolledAt: "2026-04-02", status: "active" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ student: "", course: "" });

  const handleEnroll = () => {
    setEnrollments([...enrollments, { id: Date.now().toString(), ...formData, enrolledAt: new Date().toISOString().split("T")[0], status: "active" }]);
    setShowModal(false); setFormData({ student: "", course: "" });
  };

  return (
    <div className="p-6"><div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold">Student Enrollments</h1><button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-500 text-white rounded">+ Enroll Student</button></div>
    <div className="border rounded-lg overflow-hidden"><table className="w-full"><thead className="bg-gray-50"><tr><th className="px-4 py-3">Student</th><th className="px-4 py-3">Course</th><th className="px-4 py-3">Enrolled Date</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr></thead>
    <tbody>{enrollments.map(e => <tr key={e.id}><td className="px-4 py-3">{e.student}</td><td className="px-4 py-3">{e.course}</td><td className="px-4 py-3">{e.enrolledAt}</td><td className="px-4 py-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">{e.status}</span></td><td className="px-4 py-3"><button className="text-red-600">Remove</button></td></tr>)}</tbody></table></div>
    {showModal && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"><div className="bg-white rounded p-6 w-96"><h2 className="text-xl font-bold mb-4">Enroll Student</h2><input type="text" placeholder="Student Name" className="w-full border rounded px-3 py-2 mb-3" onChange={(e) => setFormData({ ...formData, student: e.target.value })} /><input type="text" placeholder="Course Name" className="w-full border rounded px-3 py-2 mb-4" onChange={(e) => setFormData({ ...formData, course: e.target.value })} /><div className="flex justify-end gap-3"><button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button><button onClick={handleEnroll} className="px-4 py-2 bg-blue-500 text-white rounded">Enroll</button></div></div></div>)}</div>);
}
