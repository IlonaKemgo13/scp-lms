"use client";

import { useState } from "react";

export default function AdminResultsPage() {
  const [results, setResults] = useState<{ id: string; semester: string; domain: string; fileName: string; uploadedAt: string }[]>([]);
  const [semester, setSemester] = useState("");
  const [domain, setDomain] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (!semester || !domain || !file) return alert("Please fill all fields");
    setResults([...results, { id: Date.now().toString(), semester, domain, fileName: file.name, uploadedAt: new Date().toISOString().split("T")[0] }]);
    setSemester(""); setDomain(""); setFile(null);
    alert("Results uploaded successfully!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Final Results Upload</h1>
      <p className="text-gray-500 mb-6">Upload end-of-semester results as PDF files</p>
      <div className="bg-white border rounded-lg p-6 mb-8">
        <div className="space-y-4">
          <select value={semester} onChange={(e) => setSemester(e.target.value)} className="w-full border rounded px-3 py-2">
            <option value="">Select Semester</option><option>Spring 2026</option><option>Fall 2025</option><option>Summer 2025</option>
          </select>
          <select value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full border rounded px-3 py-2">
            <option value="">Select Domain</option><option>Computer Science</option><option>Economics</option><option>Mechanical Engineering</option><option>Electrical Engineering</option>
          </select>
          <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full border rounded px-3 py-2" />
          <button onClick={handleUpload} className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Upload Results</button>
        </div>
      </div>
      {results.length > 0 && (
        <div><h2 className="font-semibold mb-3">Previous Uploads</h2><div className="space-y-2">{results.map(r => <div key={r.id} className="border rounded p-3 flex justify-between"><span>{r.semester} - {r.domain}</span><span className="text-gray-500">{r.fileName}</span></div>)}</div></div>
      )}
    </div>
  );
}
