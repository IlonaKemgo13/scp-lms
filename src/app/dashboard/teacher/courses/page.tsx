"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function TeacherCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data } = await supabase
          .from("courses")
          .select("*")
          .eq("teacher_id", user.id);
        
        if (data) setCourses(data);
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading courses...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course: any) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="font-semibold text-lg">{course.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{course.description || "No description"}</p>
            <div className="mt-4 pt-3 border-t">
              <Link href={`/dashboard/teacher/courses/${course.id}`} className="text-blue-600 text-sm hover:underline">
                Manage Course →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
