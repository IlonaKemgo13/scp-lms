import { createClient } from '@/lib/supabase/client'

export async function getRecordings() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('recordings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error loading recordings:', error.message)
    return []
  }

  return data
}