"use client";

import { useState } from "react";
import Link from "next/link";

// Mock data - replace with Supabase queries later
const mockChildren = [
  { id: "1", name: "John Doe", grade: "10th Grade", studentId: "STU001" },
  { id: "2", name: "Jane Doe", grade: "8th Grade", studentId: "STU002" },
];

const mockGradesData = {
  "1": {
    summary: {
      overallAverage: 85.5,
      totalCredits: 28,
      gpa: 3.2,
      rank: "15/120",
    },
    courses: [
      {
        id: "c1",
        name: "Mathematics 101",
        teacher: "Prof. Smith",
        grade: "B+",
        percentage: 85,
        credits: 4,
        assignments: [
          { name: "Quiz 1", score: 85, max: 100, weight: 10, date: "2026-04-15" },
          { name: "Homework 1", score: 90, max: 100, weight: 15, date: "2026-04-10" },
          { name: "Midterm Exam", score: 78, max: 100, weight: 30, date: "2026-04-20" },
          { name: "Final Exam", score: 88, max: 100, weight: 45, date: "2026-05-15" },
        ],
      },
      {
        id: "c2",
        name: "Science 101",
        teacher: "Dr. Johnson",
        grade: "A-",
        percentage: 90,
        credits: 4,
        assignments: [
          { name: "Lab Report 1", score: 92, max: 100, weight: 20, date: "2026-04-18" },
          { name: "Quiz 2", score: 88, max: 100, weight: 15, date: "2026-04-22" },
          { name: "Project", score: 95, max: 100, weight: 35, date: "2026-04-28" },
          { name: "Final Exam", score: 85, max: 100, weight: 30, date: "2026-05-15" },
        ],
      },
      {
        id: "c3",
        name: "English Literature",
        teacher: "Ms. Brown",
        grade: "A",
        percentage: 95,
        credits: 3,
        assignments: [
          { name: "Essay 1", score: 95, max: 100, weight: 25, date: "2026-04-22" },
          { name: "Presentation", score: 92, max: 100, weight: 25, date: "2026-04-25" },
          { name: "Final Essay", score: 96, max: 100, weight: 50, date: "2026-05-15" },
        ],
      },
    ],
  },
  "2": {
    summary: {
      overallAverage: 88.2,
      totalCredits: 24,
      gpa: 3.5,
      rank: "5/118",
    },
    courses: [
      {
        id: "c4",
        name: "Mathematics 101",
        teacher: "Prof. Smith",
        grade: "A-",
        percentage: 90,
        credits: 4,
        assignments: [
          { name: "Quiz 1", score: 90, max: 100, weight: 10, date: "2026-04-15" },
          { name: "Homework 1", score: 95, max: 100, weight: 15, date: "2026-04-10" },
          { name: "Midterm Exam", score: 82, max: 100, weight: 30, date: "2026-04-20" },
          { name: "Final Exam", score: 92, max: 100, weight: 45, date: "2026-05-15" },
        ],
      },
      {
        id: "c5",
        name: "Science 101",
        teacher: "Dr. Johnson",
        grade: "B+",
        percentage: 85,
        credits: 4,
        assignments: [
          { name: "Lab Report 1", score: 85, max: 100, weight: 20, date: "2026-04-18" },
          { name: "Quiz 2", score: 80, max: 100, weight: 15, date: "2026-04-22" },
          { name: "Project", score: 88, max: 100, weight: 35, date: "2026-04-28" },
          { name: "Final Exam", score: 86, max: 100, weight: 30, date: "2026-05-15" },
        ],
      },
    ],
  },
};

// Helper to get grade color
const getGradeColor = (grade: string) => {
  if (grade.startsWith("A")) return "text-green-600 bg-green-100";
  if (grade.startsWith("B")) return "text-blue-600 bg-blue-100";
  if (grade.startsWith("C")) return "text-yellow-600 bg-yellow-100";
  if (grade.startsWith("D")) return "text-orange-600 bg-orange-100";
  return "text-red-600 bg-red-100";
};

// Helper to get percentage color
const getPercentageColor = (percentage: number) => {
  if (percentage >= 90) return "text-green-600";
  if (percentage >= 80) return "text-blue-600";
  if (percentage >= 70) return "text-yellow-600";
  if (percentage >= 60) return "text-orange-600";
  return "text-red-600";
};

export default function ParentGradesPage() {
  const [selectedChildId, setSelectedChildId] = useState("1");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const children = mockChildren;
  const gradesData = mockGradesData[selectedChildId as keyof typeof mockGradesData];
  const selectedCourse = gradesData?.courses.find(c => c.id === selectedCourseId);

  if (!gradesData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">No grade data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/dashboard/parent" className="text-blue-600 hover:underline mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Grades & Progress</h1>
          <p className="text-gray-500 mt-1">View detailed grade information for your child</p>
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
                    setSelectedCourseId(null);
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

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="text-sm text-gray-500 mb-1">Overall Average</div>
            <div className={`text-2xl font-bold ${getPercentageColor(gradesData.summary.overallAverage)}`}>
              {gradesData.summary.overallAverage}%
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="text-sm text-gray-500 mb-1">GPA</div>
            <div className="text-2xl font-bold text-purple-600">{gradesData.summary.gpa}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="text-sm text-gray-500 mb-1">Total Credits</div>
            <div className="text-2xl font-bold text-blue-600">{gradesData.summary.totalCredits}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="text-sm text-gray-500 mb-1">Class Rank</div>
            <div className="text-2xl font-bold text-green-600">{gradesData.summary.rank}</div>
          </div>
        </div>

        {/* Two-column layout: Course list + Details */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Course List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="font-semibold text-gray-900 mb-3">Courses</h2>
            {gradesData.courses.map((course) => (
              <button
                key={course.id}
                onClick={() => setSelectedCourseId(course.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedCourseId === course.id
                    ? "bg-blue-50 border-blue-300 shadow-sm"
                    : "bg-white border-gray-200 hover:shadow-sm hover:border-gray-300"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{course.name}</h3>
                    <p className="text-xs text-gray-500">{course.teacher}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(course.grade)}`}>
                    {course.grade}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Average</span>
                    <span className={getPercentageColor(course.percentage)}>{course.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 rounded-full h-1.5"
                      style={{ width: `${course.percentage}%` }}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Course Details */}
          <div className="lg:col-span-2">
            {selectedCourse ? (
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedCourse.name}</h2>
                      <p className="text-sm text-gray-500">Teacher: {selectedCourse.teacher}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getPercentageColor(selectedCourse.percentage)}`}>
                        {selectedCourse.percentage}%
                      </div>
                      <div className={`px-2 py-1 rounded text-sm font-medium ${getGradeColor(selectedCourse.grade)}`}>
                        Grade: {selectedCourse.grade}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assignments Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contribution</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {selectedCourse.assignments.map((assignment, idx) => {
                        const contribution = (assignment.score / assignment.max) * assignment.weight;
                        return (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-6 py-3 font-medium text-gray-900">{assignment.name}</td>
                            <td className="px-6 py-3">
                              <span className="font-medium">{assignment.score}</span>/{assignment.max}
                            </td>
                            <td className="px-6 py-3 text-gray-500">{assignment.weight}%</td>
                            <td className="px-6 py-3 text-gray-500">{assignment.date}</td>
                            <td className="px-6 py-3">
                              <span className="text-green-600 font-medium">{contribution.toFixed(1)}%</span>
                             </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={4} className="px-6 py-3 text-right font-medium">Final Grade:</td>
                        <td className="px-6 py-3 font-bold text-blue-600">{selectedCourse.percentage}%</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
                <p className="text-gray-500">Select a course to view detailed grade information</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
