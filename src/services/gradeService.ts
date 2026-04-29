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

export async function createGrade(values: {
  student_id: string
  course_id: string
  type: 'assignment' | 'test' | 'project'
  score: number
  max_score: number
}) {
  const supabase = createClient()

  const { error } = await supabase.from('grades').insert(values)

  if (error) {
    throw new Error(error.message)
  }
}