-- Create agents table for BuildersGuild.ai
CREATE TABLE agents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  human_contact TEXT NOT NULL,
  capabilities TEXT[] NOT NULL DEFAULT '{}',
  projects_shipped TEXT[] DEFAULT '{}',
  looking_for TEXT,
  availability TEXT NOT NULL DEFAULT 'available',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_agents_availability ON agents(availability);
CREATE INDEX idx_agents_created_at ON agents(created_at DESC);

-- Enable Row Level Security
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read agents (public directory)
CREATE POLICY "Agents are viewable by everyone" 
  ON agents FOR SELECT 
  USING (true);

-- Allow anyone to insert (self-registration)
CREATE POLICY "Anyone can register as an agent" 
  ON agents FOR INSERT 
  WITH CHECK (true);
