'use client'

import { useEffect, useState } from 'react'
import { createGrade, getCourses, getStudents } from '@/services/gradeService'

type Student = {
  id: string
  student_number: string | null
  role: string
}

type Course = {
  id: string
  name: string
  course_code: string | null
}

export default function ManageGradesPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<Course[]>([])

  const [studentId, setStudentId] = useState('')
  const [courseId, setCourseId] = useState('')
  const [type, setType] = useState<'assignment' | 'test' | 'project'>(
    'assignment'
  )
  const [score, setScore] = useState('')
  const [maxScore, setMaxScore] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function loadOptions() {
    const studentsData = await getStudents()
    const coursesData = await getCourses()

    setStudents(studentsData)
    setCourses(coursesData)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      await createGrade({
        student_id: studentId,
        course_id: courseId,
        type,
        score: Number(score),
        max_score: Number(maxScore),
      })

      setStudentId('')
      setCourseId('')
      setType('assignment')
      setScore('')
      setMaxScore('')
      setMessage('Grade saved successfully.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to save grade.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOptions()
  }, [])

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex">
        <aside className="fixed left-0 top-0 hidden h-screen w-64 bg-slate-950 text-white lg:block">
          <div className="p-6">
            <h1 className="text-xl font-bold">SCP Portal</h1>
            <p className="text-sm text-slate-400">Smart Communication</p>
          </div>

          <nav className="mt-6 space-y-2 px-4">
            {[
              'Dashboard',
              'Announcements',
              'Courses',
              'Students',
              'Assignments',
              'Messages',
              'Calendar',
              'Grades',
              'Recordings',
              'Resources',
              'Settings',
            ].map((item) => (
              <div
                key={item}
                className={`rounded-xl px-4 py-3 text-sm font-medium ${
                  item === 'Grades'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item}
              </div>
            ))}
          </nav>
        </aside>

        <section className="min-h-screen flex-1 lg:ml-64">
          <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-6 shadow-sm">
            <div>
              <p className="text-sm text-slate-500">Teacher Workspace</p>
              <h2 className="text-xl font-bold text-slate-900">
                Manage Grades
              </h2>
            </div>

            <a
              href="/grades"
              className="rounded-2xl bg-indigo-100 px-4 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-200"
            >
              View Grades
            </a>
          </header>

          <div className="p-6 lg:p-10">
            <section className="mb-8 rounded-3xl bg-linear-to-r from-slate-950 via-indigo-900 to-violet-800 p-8 text-white shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-200">
                Smart Communication Portal
              </p>
              <h1 className="mt-3 text-4xl font-bold">Grade Management</h1>
              <p className="mt-3 max-w-2xl text-indigo-100">
                Select a student and course using their school identifiers.
                The system stores the correct database IDs automatically.
              </p>
            </section>

            <section className="grid gap-8 xl:grid-cols-[520px_1fr]">
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border bg-white p-6 shadow-lg"
              >
                <div className="mb-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">
                    📊
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Add Student Grade
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Select the student and course, then enter the assessment
                    score.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Student
                    </label>
                    <select
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      required
                    >
                      <option value="">Select student</option>
                      {students.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.student_number ?? 'No student number'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Course
                    </label>
                    <select
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      value={courseId}
                      onChange={(e) => setCourseId(e.target.value)}
                      required
                    >
                      <option value="">Select course</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.course_code ?? 'No code'} - {course.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Assessment Type
                    </label>
                    <select
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      value={type}
                      onChange={(e) =>
                        setType(
                          e.target.value as 'assignment' | 'test' | 'project'
                        )
                      }
                    >
                      <option value="assignment">Assignment</option>
                      <option value="test">Test</option>
                      <option value="project">Project</option>
                    </select>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Score
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                        placeholder="e.g. 16"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Max Score
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                        placeholder="e.g. 20"
                        value={maxScore}
                        onChange={(e) => setMaxScore(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {message && (
                    <p className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
                      {message}
                    </p>
                  )}

                  <button
                    disabled={loading}
                    className="w-full rounded-2xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 disabled:opacity-60"
                  >
                    {loading ? 'Saving...' : 'Save Grade'}
                  </button>
                </div>
              </form>

              <div className="rounded-3xl border bg-white p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-900">
                  Why dropdowns?
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl bg-indigo-50 p-4">
                    <p className="font-semibold text-indigo-800">
                      Students use school IDs
                    </p>
                    <p className="mt-1 text-sm text-indigo-700">
                      Example: 22M013. The database still stores the hidden UUID.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-violet-50 p-4">
                    <p className="font-semibold text-violet-800">
                      Courses use course codes
                    </p>
                    <p className="mt-1 text-sm text-violet-700">
                      Example: CSC101. The system still saves the real course
                      UUID.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-emerald-50 p-4">
                    <p className="font-semibold text-emerald-800">
                      Fewer errors
                    </p>
                    <p className="mt-1 text-sm text-emerald-700">
                      Teachers no longer need to type technical database IDs.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}