import { createClient } from '@/lib/supabase/client'

export async function getAnnouncements() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error loading announcements:', error.message)
    return []
  }

  return data
}

export async function createAnnouncement(
  title: string,
  content: string,
  deadline: string | null
) {
  const supabase = createClient()

  const { error } = await supabase.from('announcements').insert({
    title,
    content,
    deadline,
    is_global: false,
  })

  if (error) {
    console.error('Error creating announcement:', error.message)
    throw new Error(error.message)
  }
}