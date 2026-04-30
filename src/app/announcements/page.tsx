'use client'

import { useEffect, useState } from 'react'
import {
  getAnnouncements,
  createAnnouncement,
} from '@/services/announcementService'

type Announcement = {
  id: string
  title: string
  content: string
  deadline: string | null
  created_at: string
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [deadline, setDeadline] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  async function loadData() {
    const data = await getAnnouncements()
    setAnnouncements(data)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      await createAnnouncement(title, content, deadline || null)

      setTitle('')
      setContent('')
      setDeadline('')
      await loadData()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const filteredAnnouncements = announcements.filter((announcement) =>
    `${announcement.title} ${announcement.content}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

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
                  item === 'Announcements'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item}
              </div>
            ))}
          </nav>

          <div className="absolute bottom-6 left-4 right-4 rounded-2xl border border-slate-700 bg-slate-900 p-4">
            <p className="text-lg">🎉</p>
            <p className="mt-2 text-sm font-semibold">Welcome back!</p>
            <p className="text-xs text-slate-400">
              Manage your course updates today.
            </p>
          </div>
        </aside>

        <section className="min-h-screen flex-1 lg:ml-64">
          <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-6 shadow-sm">
            <div>
              <p className="text-sm text-slate-500">Teacher Workspace</p>
              <h2 className="text-xl font-bold text-slate-900">
                Announcements
              </h2>
            </div>

            <input
              className="hidden w-96 rounded-2xl border bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 md:block"
              placeholder="Search announcements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex items-center gap-3">
              <div className="rounded-full bg-indigo-100 px-3 py-2 text-sm font-bold text-indigo-700">
                Ilona
              </div>
            </div>
          </header>

          <div className="p-6 lg:p-10">
            <section className="mb-8 overflow-hidden rounded-3xl bg-linear-to-r from-indigo-700 via-violet-700 to-purple-700 p-8 text-white shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-200">
                Smart Communication Portal
              </p>
              <h1 className="mt-3 text-4xl font-bold">Course Announcements</h1>
              <p className="mt-3 max-w-2xl text-indigo-100">
                Share important course updates, assignment reminders, deadlines,
                and academic notices with students and parents.
              </p>
            </section>

            <div className="grid gap-8 xl:grid-cols-[430px_1fr]">
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border bg-white p-6 shadow-lg"
              >
                <div className="mb-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">
                    ✏️
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Create Announcement
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Publish updates for your students and parents.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Title
                    </label>
                    <input
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      placeholder="e.g. Assignment 1 deadline"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Message
                    </label>
                    <textarea
                      className="min-h-36 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      placeholder="Write the announcement details..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Deadline
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                  </div>

                  <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-700">
                    Tip: Add a deadline to highlight time-sensitive
                    announcements.
                  </div>

                  <button
                    disabled={loading}
                    className="w-full rounded-2xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 disabled:opacity-60"
                  >
                    {loading ? 'Publishing...' : 'Publish Announcement'}
                  </button>
                </div>
              </form>

              <section className="rounded-3xl border bg-white p-6 shadow-lg">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Recent Announcements
                    </h2>
                    <p className="text-sm text-slate-500">
                      {filteredAnnouncements.length} announcement(s) found
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                    All
                  </span>
                </div>

                <div className="space-y-4">
                  {filteredAnnouncements.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                      <p className="text-lg font-semibold text-slate-700">
                        No announcements found
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        Try another search or create a new announcement.
                      </p>
                    </div>
                  ) : (
                    filteredAnnouncements.map((announcement, index) => (
                      <article
                        key={announcement.id}
                        className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                      >
                        <div
                          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl ${
                            index % 4 === 0
                              ? 'bg-yellow-100'
                              : index % 4 === 1
                              ? 'bg-green-100'
                              : index % 4 === 2
                              ? 'bg-blue-100'
                              : 'bg-pink-100'
                          }`}
                        >
                          📢
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="text-lg font-bold text-slate-900">
                              {announcement.title}
                            </h3>

                            {announcement.deadline && (
                              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                                Deadline
                              </span>
                            )}
                          </div>

                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {announcement.content}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
                            <span>
                              Posted{' '}
                              {new Date(
                                announcement.created_at
                              ).toLocaleDateString()}
                            </span>

                            {announcement.deadline && (
                              <span className="font-medium text-red-500">
                                Due: {announcement.deadline}
                              </span>
                            )}
                          </div>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}