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

export async function uploadRecording(
  file: File,
  title: string,
  courseId: string
) {
  const supabase = createClient()

  const filePath = `${Date.now()}-${file.name}`

  const { error: uploadError } = await supabase.storage
    .from('lecture-recordings')
    .upload(filePath, file)

  if (uploadError) {
    throw new Error(uploadError.message)
  }

  const { data: publicUrlData } = supabase.storage
    .from('lecture-recordings')
    .getPublicUrl(filePath)

  const { error: dbError } = await supabase.from('recordings').insert({
    title,
    course_id: courseId,
    file_url: publicUrlData.publicUrl,
  })

  if (dbError) {
    throw new Error(dbError.message)
  }
}