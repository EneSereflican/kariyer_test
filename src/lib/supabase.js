import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Test sonucunu veritabanına kaydeder.
 * @returns {Promise<{error: object|null}>}
 */
export async function saveTestResult(record) {
  const { error } = await supabase.from('test_results').insert([record])
  return { error }
}
