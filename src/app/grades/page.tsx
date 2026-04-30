'use client'

import { useEffect, useMemo, useState } from 'react'
import { getGrades } from '@/services/gradeService'

type Grade = {
  id: string
  student_id: string
  course_id: string
  type: 'assignment' | 'test' | 'project'
  score: number
  max_score: number
  created_at: string
}

export default function GradesPage() {
  const [grades, setGrades] = useState<Grade[]>([])
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  async function loadGrades() {
    const data = await getGrades()
    setGrades(data)
  }

  useEffect(() => {
    loadGrades()
  }, [])

  const filteredGrades = grades.filter((grade) => {
    const matchesType = typeFilter === 'all' || grade.type === typeFilter
    const matchesSearch = `${grade.type} ${grade.course_id}`
      .toLowerCase()
      .includes(search.toLowerCase())

    return matchesType && matchesSearch
  })

  const average = useMemo(() => {
    if (grades.length === 0) return 0

    const totalPercentage = grades.reduce((sum, grade) => {
      return sum + (Number(grade.score) / Number(grade.max_score)) * 100
    }, 0)

    return Math.round(totalPercentage / grades.length)
  }, [grades])

  const totalGrades = grades.length
  const highestScore =
    grades.length > 0
      ? Math.max(
          ...grades.map((grade) =>
            Math.round((Number(grade.score) / Number(grade.max_score)) * 100)
          )
        )
      : 0

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

          <div className="absolute bottom-6 left-4 right-4 rounded-2xl border border-slate-700 bg-slate-900 p-4">
            <p className="text-lg">📊</p>
            <p className="mt-2 text-sm font-semibold">Grade Overview</p>
            <p className="text-xs text-slate-400">
              Track student performance and academic progress.
            </p>
          </div>
        </aside>

        <section className="min-h-screen flex-1 lg:ml-64">
          <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-6 shadow-sm">
            <div>
              <p className="text-sm text-slate-500">Academic Workspace</p>
              <h2 className="text-xl font-bold text-slate-900">Grades</h2>
            </div>

            <input
              className="hidden w-96 rounded-2xl border bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 md:block"
              placeholder="Search grades by type or course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="rounded-full bg-indigo-100 px-3 py-2 text-sm font-bold text-indigo-700">
              Ilona
            </div>
          </header>

          <div className="p-6 lg:p-10">
            <section className="mb-8 overflow-hidden rounded-3xl bg-linear-to-r from-slate-950 via-indigo-900 to-violet-800 p-8 text-white shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-200">
                Smart Communication Portal
              </p>
              <h1 className="mt-3 text-4xl font-bold">Grade Display</h1>
              <p className="mt-3 max-w-2xl text-indigo-100">
                View assessment scores, track averages, and monitor academic
                performance across assignments, tests, and projects.
              </p>
            </section>

            <section className="mb-8 grid gap-5 md:grid-cols-3">
              <div className="rounded-3xl border bg-white p-6 shadow-md">
                <p className="text-sm font-medium text-slate-500">
                  Course Average
                </p>
                <h3 className="mt-2 text-4xl font-bold text-slate-900">
                  {average}%
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Calculated across all recorded grades.
                </p>
              </div>

              <div className="rounded-3xl border bg-white p-6 shadow-md">
                <p className="text-sm font-medium text-slate-500">
                  Total Assessments
                </p>
                <h3 className="mt-2 text-4xl font-bold text-slate-900">
                  {totalGrades}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Assignments, tests, and projects.
                </p>
              </div>

              <div className="rounded-3xl border bg-white p-6 shadow-md">
                <p className="text-sm font-medium text-slate-500">
                  Highest Score
                </p>
                <h3 className="mt-2 text-4xl font-bold text-slate-900">
                  {highestScore}%
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Best assessment performance.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border bg-white p-6 shadow-lg">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Recent Grades
                  </h2>
                  <p className="text-sm text-slate-500">
                    {filteredGrades.length} grade(s) found
                  </p>
                </div>

                <select
                  className="rounded-2xl border bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">All types</option>
                  <option value="assignment">Assignments</option>
                  <option value="test">Tests</option>
                  <option value="project">Projects</option>
                </select>
              </div>

              {filteredGrades.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                  <p className="text-lg font-semibold text-slate-700">
                    No grades found
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Grades entered by teachers will appear here.
                  </p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="px-5 py-4 font-semibold">Type</th>
                        <th className="px-5 py-4 font-semibold">Course ID</th>
                        <th className="px-5 py-4 font-semibold">Score</th>
                        <th className="px-5 py-4 font-semibold">Percentage</th>
                        <th className="px-5 py-4 font-semibold">Date</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y">
                      {filteredGrades.map((grade) => {
                        const percentage = Math.round(
                          (Number(grade.score) / Number(grade.max_score)) * 100
                        )

                        return (
                          <tr key={grade.id} className="hover:bg-slate-50">
                            <td className="px-5 py-4">
                              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold capitalize text-indigo-700">
                                {grade.type}
                              </span>
                            </td>

                            <td className="px-5 py-4 text-slate-600">
                              {grade.course_id}
                            </td>

                            <td className="px-5 py-4 font-semibold text-slate-900">
                              {grade.score}/{grade.max_score}
                            </td>

                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-200">
                                  <div
                                    className="h-full rounded-full bg-indigo-600"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                <span className="font-semibold text-slate-700">
                                  {percentage}%
                                </span>
                              </div>
                            </td>

                            <td className="px-5 py-4 text-slate-500">
                              {new Date(grade.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}