"use client";

import { useState } from "react";

export default function ResultsPage() {
  const [semester, setSemester] = useState("");
  const [domain, setDomain] = useState("");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Upload Final Results</h1>
      
      <div className="max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Semester</label>
          <select 
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select Semester</option>
            <option value="Spring 2026">Spring 2026</option>
            <option value="Fall 2025">Fall 2025</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Domain</label>
          <select 
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select Domain</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Economics">Economics</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">PDF File</label>
          <input type="file" accept=".pdf" className="w-full border rounded-lg px-3 py-2" />
        </div>

        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Upload Results
        </button>
      </div>
    </div>
  );
}
