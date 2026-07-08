'use client'

import { motion } from 'motion/react'
import { MessageSquare, Search, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { AppHeader } from '@/components/app-header'
import { BrandAvatar } from '@/components/brand-avatar'
import { ConnectButton } from '@/components/connect-button'
import { EmptyState, VerifiedTick, formatCount } from '@/components/ui-bits'
import { businesses, conversations, getBusiness } from '@/lib/mock-data'

type Tab = 'messages' | 'requests' | 'suggested'

export default function NetworkPage() {
  const [tab, setTab] = useState<Tab>('messages')

  return (
    <div className="min-h-full pb-6">
      <AppHeader
        title="Network"
        subtitle="Your connections and conversations"
        right={
          <button
            aria-label="Search network"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-card active:scale-95"
          >
            <Search className="h-5 w-5" />
          </button>
        }
      />

      <div className="sticky top-[57px] z-10 flex gap-1 border-b border-border bg-background/85 px-3 backdrop-blur">
        {(
          [
            ['messages', 'Messages'],
            ['requests', 'Requests'],
            ['suggested', 'Suggested'],
          ] as [Tab, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`relative flex-1 py-3 text-sm font-semibold transition-colors ${
              tab === key ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {label}
            {tab === key ? (
              <motion.span
                layoutId="net-underline"
                className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-primary"
              />
            ) : null}
          </button>
        ))}
      </div>

      {tab === 'messages' ? <Messages /> : null}
      {tab === 'requests' ? <Requests /> : null}
      {tab === 'suggested' ? <Suggested /> : null}
    </div>
  )
}

function Messages() {
  return (
    <ul className="divide-y divide-border">
      {conversations.map((c) => {
        const b = getBusiness(c.businessId)
        if (!b) return null
        return (
          <li key={c.id}>
            <Link
              href={`/messages/${c.id}`}
              className="flex items-center gap-3 px-4 py-3.5 transition-colors active:bg-secondary/40"
            >
              <div className="relative">
                <BrandAvatar name={b.name} seed={b.id} className="h-12 w-12" />
                {c.online ? (
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-primary" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span className="truncate font-display text-sm font-semibold">{b.name}</span>
                  {b.verified ? <VerifiedTick className="h-3.5 w-3.5" /> : null}
                  <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">
                    {c.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p
                    className={`truncate text-[13px] ${
                      c.unread ? 'font-medium text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {c.lastMessage}
                  </p>
                  {c.unread ? (
                    <span className="ml-auto flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-primary-foreground">
                      {c.unread}
                    </span>
                  ) : null}
                </div>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

function Requests() {
  const requesters = businesses.slice(2, 5)
  return (
    <div className="px-4 py-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {requesters.length} pending requests
      </p>
      <div className="space-y-3">
        {requesters.map((b) => (
          <div
            key={b.id}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5"
          >
            <BrandAvatar name={b.name} seed={b.id} className="h-12 w-12" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className="truncate font-display text-sm font-semibold">{b.name}</span>
                {b.verified ? <VerifiedTick className="h-3.5 w-3.5" /> : null}
              </div>
              <p className="truncate text-xs text-muted-foreground">{b.industry}</p>
            </div>
            <ConnectButton name={b.name} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Suggested() {
  const suggestions = businesses.filter((b) => b.openToPartnership)
  if (suggestions.length === 0) {
    return (
      <EmptyState
        icon={<UserPlus className="h-7 w-7" />}
        title="No suggestions yet"
        description="Complete your profile to get better connection suggestions."
      />
    )
  }
  return (
    <div className="px-4 py-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Businesses open to partnership
      </p>
      <div className="space-y-3">
        {suggestions.map((b) => (
          <Link
            key={b.id}
            href={`/business/${b.id}`}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 active:bg-secondary/40"
          >
            <BrandAvatar name={b.name} seed={b.id} className="h-12 w-12" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className="truncate font-display text-sm font-semibold">{b.name}</span>
                {b.verified ? <VerifiedTick className="h-3.5 w-3.5" /> : null}
              </div>
              <p className="truncate text-xs text-muted-foreground">
                {formatCount(b.followers)} followers · {b.country}
              </p>
            </div>
            <ConnectButton name={b.name} />
          </Link>
        ))}
      </div>
    </div>
  )
}
