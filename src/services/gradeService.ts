import { createClient } from '@/lib/supabase/client'

export async function getGrades() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('grades')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error loading grades:', error.message)
    return []
  }

  return data
}