import { Bell, Search, Sparkles, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { BrandAvatar } from '@/components/brand-avatar'
import { PostCard } from '@/components/post-card'
import { SectionTitle } from '@/components/ui-bits'
import { currentBusiness, marketInsights, posts } from '@/lib/mock-data'

export default function HomePage() {
  return (
    <div className="pb-8">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur">
        <Link href="/profile">
          <BrandAvatar name={currentBusiness.name} seed="me" className="h-10 w-10" />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground">Welcome back</p>
          <p className="truncate font-display text-[15px] font-semibold">{currentBusiness.name}</p>
        </div>
        <Link
          href="/discover"
          aria-label="Search"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-card active:scale-95"
        >
          <Search className="h-5 w-5" />
        </Link>
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full bg-card active:scale-95"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-card" />
        </Link>
      </header>

      <div className="px-4 pt-4">
        {/* AI Match highlight */}
        <Link
          href="/ai-match"
          className="relative flex items-center gap-3 overflow-hidden rounded-2xl border border-primary/30 bg-primary/10 p-4"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-semibold">3 new AI matches for you</p>
            <p className="truncate text-xs text-muted-foreground">
              Based on your goals and industry
            </p>
          </div>
          <span className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
            View
          </span>
        </Link>

        {/* Composer */}
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
          <BrandAvatar name={currentBusiness.name} seed="me" className="h-9 w-9 text-xs" />
          <span className="flex-1 text-sm text-muted-foreground">Share an update…</span>
          <span className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold">Post</span>
        </div>

        {/* Market insights */}
        <div className="mt-6">
          <SectionTitle
            title="Market insights"
            action={
              <Link href="/discover" className="text-xs font-medium text-primary">
                See all
              </Link>
            }
          />
          <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
            {marketInsights.map((mi) => (
              <div
                key={mi.id}
                className="w-64 shrink-0 rounded-2xl border border-border bg-card p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <TrendingUp className="h-4 w-4" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {mi.region}
                  </span>
                </div>
                <p className="mt-2.5 text-pretty font-display text-sm font-semibold leading-snug">
                  {mi.title}
                </p>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {mi.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Feed */}
        <div className="mt-6">
          <SectionTitle title="Your feed" />
          <div className="flex flex-col gap-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
