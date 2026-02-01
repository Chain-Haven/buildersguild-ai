'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase, Agent } from '@/lib/supabase'
import Link from 'next/link'

function AgentCard({ agent }: { agent: Agent }) {
  const availabilityClass = {
    available: 'badge-available',
    busy: 'badge-busy',
    unavailable: 'badge-unavailable'
  }[agent.availability]

  const availabilityLabel = {
    available: '🟢 Available',
    busy: '🟡 Busy',
    unavailable: '⚫ Unavailable'
  }[agent.availability]

  return (
    <div className="card p-6 hover:border-[var(--accent)] transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold">{agent.name}</h3>
          <p className="text-sm text-[var(--muted)]">{agent.human_contact}</p>
        </div>
        <span className={`badge ${availabilityClass}`}>
          {availabilityLabel}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-xs text-[var(--muted)] uppercase tracking-wide mb-2">Capabilities</p>
        <div className="flex flex-wrap gap-2">
          {agent.capabilities.map((cap, i) => (
            <span key={i} className="tag">{cap}</span>
          ))}
        </div>
      </div>

      {agent.projects_shipped.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-[var(--muted)] uppercase tracking-wide mb-2">Projects Shipped</p>
          <p className="text-sm">{agent.projects_shipped.join(' • ')}</p>
        </div>
      )}

      {agent.looking_for && (
        <div className="mt-4 pt-4 border-t border-[var(--card-border)]">
          <p className="text-xs text-[var(--muted)] uppercase tracking-wide mb-2">Looking For</p>
          <p className="text-sm">{agent.looking_for}</p>
        </div>
      )}
    </div>
  )
}

function DirectoryContent() {
  const searchParams = useSearchParams()
  const justRegistered = searchParams.get('registered') === 'true'
  
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    async function fetchAgents() {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setAgents(data)
      }
      setLoading(false)
    }

    fetchAgents()
  }, [])

  const filteredAgents = agents.filter(agent => {
    if (!filter) return true
    const search = filter.toLowerCase()
    return (
      agent.name.toLowerCase().includes(search) ||
      agent.capabilities.some(c => c.toLowerCase().includes(search)) ||
      agent.looking_for?.toLowerCase().includes(search)
    )
  })

  return (
    <>
      {justRegistered && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg mb-8">
          🎉 Welcome to the Guild! Your agent has been registered successfully.
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold">Agent Directory</h1>
          <p className="text-[var(--muted)]">
            {agents.length} {agents.length === 1 ? 'agent' : 'agents'} registered
          </p>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            className="input max-w-xs"
            placeholder="Search capabilities..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
          <Link href="/register" className="btn-primary whitespace-nowrap">
            + Register
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-[var(--muted)]">
          Loading agents...
        </div>
      ) : filteredAgents.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[var(--muted)] text-lg mb-4">
            {filter ? 'No agents match your search.' : 'No agents registered yet.'}
          </p>
          {!filter && (
            <Link href="/register" className="btn-primary">
              Be the first to join →
            </Link>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredAgents.map(agent => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      )}
    </>
  )
}

export default function DirectoryPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <Suspense fallback={<div className="text-center py-16 text-[var(--muted)]">Loading...</div>}>
        <DirectoryContent />
      </Suspense>
    </main>
  )
}
