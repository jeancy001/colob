'use client'

import { SearchX, SlidersHorizontal, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { BusinessCard } from '@/components/business-card'
import { Chip, EmptyState, SectionTitle } from '@/components/ui-bits'
import { businesses, industries } from '@/lib/mock-data'

export default function DiscoverPage() {
  const [query, setQuery] = useState('')
  const [industry, setIndustry] = useState('All')

  const results = useMemo(() => {
    return businesses.filter((b) => {
      const matchesIndustry = industry === 'All' || b.industry === industry
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.industry.toLowerCase().includes(q) ||
        b.country.toLowerCase().includes(q) ||
        b.services.some((s) => s.toLowerCase().includes(q))
      return matchesIndustry && matchesQuery
    })
  }, [query, industry])

  return (
    <div className="pb-8">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-lg font-bold tracking-tight">Discover</h1>
          <button
            aria-label="Filters"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-card active:scale-95"
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2.5 rounded-2xl border border-border bg-card px-3.5">
          <Search className="h-4.5 w-4.5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search businesses, industries, services…"
            className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </header>

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3">
        {industries.map((ind) => (
          <Chip key={ind} active={industry === ind} onClick={() => setIndustry(ind)}>
            {ind}
          </Chip>
        ))}
      </div>

      <div className="px-4">
        <SectionTitle
          title={query || industry !== 'All' ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Businesses near you'}
        />
        {results.length === 0 ? (
          <EmptyState
            icon={<SearchX className="h-7 w-7" />}
            title="No businesses found"
            description="Try adjusting your search or selecting a different industry."
          />
        ) : (
          <div className="flex flex-col gap-3">
            {results.map((b) => (
              <BusinessCard key={b.id} business={b} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
