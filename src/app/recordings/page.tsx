'use client'

import { useEffect, useMemo, useState } from 'react'
import { getRecordings } from '@/services/recordingService'

type Recording = {
  id: string
  course_id: string
  title: string | null
  file_url: string | null
  uploaded_by: string | null
  created_at: string
}

export default function RecordingsPage() {
  const [recordings, setRecordings] = useState<Recording[]>([])
  const [search, setSearch] = useState('')
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(
    null
  )

  async function loadRecordings() {
    const data = await getRecordings()
    setRecordings(data)
    if (data.length > 0) setSelectedRecording(data[0])
  }

  useEffect(() => {
    loadRecordings()
  }, [])

  const filteredRecordings = useMemo(() => {
    return recordings.filter((recording) =>
      `${recording.title ?? ''} ${recording.course_id ?? ''}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [recordings, search])

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
                  item === 'Recordings'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item}
              </div>
            ))}
          </nav>

          <div className="absolute bottom-6 left-4 right-4 rounded-2xl border border-slate-700 bg-slate-900 p-4">
            <p className="text-lg">🎥</p>
            <p className="mt-2 text-sm font-semibold">Lecture Library</p>
            <p className="text-xs text-slate-400">
              Review lectures anytime.
            </p>
          </div>
        </aside>

        <section className="min-h-screen flex-1 lg:ml-64">
          <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-6 shadow-sm">
            <div>
              <p className="text-sm text-slate-500">Learning Workspace</p>
              <h2 className="text-xl font-bold text-slate-900">
                Lecture Recordings
              </h2>
            </div>

            <input
              className="hidden w-96 rounded-2xl border bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 md:block"
              placeholder="Search recordings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="rounded-full bg-indigo-100 px-3 py-2 text-sm font-bold text-indigo-700">
              Ilona
            </div>
          </header>

          <div className="p-6 lg:p-10">
            <section className="mb-8 overflow-hidden rounded-3xl bg-linear-to-r from-indigo-700 via-purple-700 to-fuchsia-700 p-8 text-white shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-200">
                Smart Communication Portal
              </p>
              <h1 className="mt-3 text-4xl font-bold">Lecture Recordings</h1>
              <p className="mt-3 max-w-2xl text-indigo-100">
                Access uploaded lectures, review course content, and stream
                recordings directly from the browser.
              </p>
            </section>

            <section className="grid gap-8 xl:grid-cols-[1fr_420px]">
              <div className="rounded-3xl border bg-white p-6 shadow-lg">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Video Player
                  </h2>
                  <p className="text-sm text-slate-500">
                    Select a recording from the list to start watching.
                  </p>
                </div>

                {selectedRecording?.file_url ? (
                  <div className="overflow-hidden rounded-3xl bg-black shadow-xl">
                    <video
                      className="aspect-video w-full"
                      src={selectedRecording.file_url}
                      controls
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-center">
                    <div>
                      <p className="text-5xl">🎬</p>
                      <p className="mt-3 text-lg font-semibold text-slate-700">
                        No recording selected
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Uploaded lecture videos will play here.
                      </p>
                    </div>
                  </div>
                )}

                {selectedRecording && (
                  <div className="mt-6 rounded-3xl bg-slate-50 p-5">
                    <h3 className="text-xl font-bold text-slate-900">
                      {selectedRecording.title ?? 'Untitled recording'}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Course ID: {selectedRecording.course_id}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Uploaded:{' '}
                      {new Date(
                        selectedRecording.created_at
                      ).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>

              <div className="rounded-3xl border bg-white p-6 shadow-lg">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Recordings
                    </h2>
                    <p className="text-sm text-slate-500">
                      {filteredRecordings.length} recording(s) found
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredRecordings.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                      <p className="text-lg font-semibold text-slate-700">
                        No recordings found
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        Lecture recordings uploaded by teachers will appear here.
                      </p>
                    </div>
                  ) : (
                    filteredRecordings.map((recording, index) => (
                      <button
                        key={recording.id}
                        onClick={() => setSelectedRecording(recording)}
                        className={`flex w-full gap-4 rounded-3xl border p-4 text-left transition hover:-translate-y-1 hover:shadow-md ${
                          selectedRecording?.id === recording.id
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div
                          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl ${
                            index % 3 === 0
                              ? 'bg-purple-100'
                              : index % 3 === 1
                              ? 'bg-blue-100'
                              : 'bg-pink-100'
                          }`}
                        >
                          ▶️
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-base font-bold text-slate-900">
                            {recording.title ?? 'Untitled recording'}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500">
                            Course ID: {recording.course_id}
                          </p>
                          <p className="mt-2 text-xs text-slate-400">
                            Uploaded{' '}
                            {new Date(recording.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}