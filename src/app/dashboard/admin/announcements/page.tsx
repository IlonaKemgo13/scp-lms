"use client";

import { useState } from "react";

interface Announcement {
  id: string;
  title: string;
  message: string;
  priority: "normal" | "urgent";
  audience: "all" | "students" | "teachers" | "parents";
  createdAt: string;
}

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: "1", title: "School Holiday", message: "School will be closed on May 1st", priority: "urgent", audience: "all", createdAt: "2026-04-28" },
    { id: "2", title: "Exam Schedule", message: "Final exams start next week", priority: "normal", audience: "students", createdAt: "2026-04-25" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", message: "", priority: "normal" as const, audience: "all" as const });

  const handlePost = () => {
    setAnnouncements([{ ...formData, id: Date.now().toString(), createdAt: new Date().toISOString().split("T")[0] }, ...announcements]);
    setShowModal(false);
    setFormData({ title: "", message: "", priority: "normal", audience: "all" });
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this announcement?")) setAnnouncements(announcements.filter(a => a.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div><h1 className="text-2xl font-bold">Global Announcements</h1><p className="text-gray-500">Post institution-wide announcements</p></div>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">+ New Announcement</button>
      </div>
      <div className="space-y-4">
        {announcements.map((ann) => (
          <div key={ann.id} className={`border rounded-lg p-4 ${ann.priority === "urgent" ? "border-red-300 bg-red-50" : ""}`}>
            <div className="flex justify-between items-start">
              <div><h3 className="font-semibold">{ann.title}</h3><p className="text-sm text-gray-500">Audience: {ann.audience} | Posted: {ann.createdAt}</p></div>
              <button onClick={() => handleDelete(ann.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
            <p className="mt-2">{ann.message}</p>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">New Announcement</h2>
            <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full border rounded px-3 py-2 mb-3" />
            <textarea placeholder="Message" rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full border rounded px-3 py-2 mb-3" />
            <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })} className="w-full border rounded px-3 py-2 mb-3">
              <option value="normal">Normal</option><option value="urgent">Urgent</option>
            </select>
            <select value={formData.audience} onChange={(e) => setFormData({ ...formData, audience: e.target.value as any })} className="w-full border rounded px-3 py-2 mb-4">
              <option value="all">All Users</option><option value="students">Students Only</option><option value="teachers">Teachers Only</option><option value="parents">Parents Only</option>
            </select>
            <div className="flex justify-end gap-3"><button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button><button onClick={handlePost} className="px-4 py-2 bg-blue-500 text-white rounded">Post</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
