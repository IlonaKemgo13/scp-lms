import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const [
      { count: totalUsers },
      { count: totalStudents },
      { count: totalTeachers },
      { count: totalCourses },
    ] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "student"),
      supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "teacher"),
      supabase.from("courses").select("*", { count: "exact", head: true }),
    ]);

    return NextResponse.json({
      totalUsers: totalUsers || 0,
      totalStudents: totalStudents || 0,
      totalTeachers: totalTeachers || 0,
      totalCourses: totalCourses || 0,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
