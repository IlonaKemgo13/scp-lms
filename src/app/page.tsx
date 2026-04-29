'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function Home() {
  useEffect(() => {
    const testConnection = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.auth.getSession()

      console.log('Supabase session:', data)
      console.log('Supabase error:', error)
    }

    testConnection()
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Supabase Connected ✅</h1>
    </main>
  )
}