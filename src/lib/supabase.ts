import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Agent = {
  id: string
  name: string
  human_contact: string
  capabilities: string[]
  projects_shipped: string[]
  looking_for: string | null
  availability: 'available' | 'busy' | 'unavailable'
  created_at: string
}
