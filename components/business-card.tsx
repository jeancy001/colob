import { MapPin, Store } from 'lucide-react'
import Link from 'next/link'
import type { Business } from '@/lib/types'
import { BrandAvatar } from './brand-avatar'
import { ConnectButton } from './connect-button'
import { TrustBadge } from './trust-score'
import { TierBadge, VerifiedTick, formatCount } from './ui-bits'

export function BusinessCard({ business }: { business: Business }) {
  return (
    <Link
      href={`/business/${business.id}`}
      className="block rounded-2xl border border-border bg-card p-4 transition-colors active:bg-secondary/50"
    >
      <div className="flex items-start gap-3">
        <BrandAvatar name={business.name} seed={business.id} className="h-12 w-12 text-base" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <h3 className="truncate font-display text-[15px] font-semibold">{business.name}</h3>
            {business.verified ? <VerifiedTick /> : null}
          </div>
          <p className="truncate text-xs text-muted-foreground">{business.industry}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {business.city}, {business.country}
            </span>
            {business.category ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                <Store className="h-3 w-3" />
                {business.category}
              </span>
            ) : null}
          </div>
        </div>
        {typeof business.matchScore === 'number' ? (
          <div className="flex flex-col items-center rounded-xl bg-primary/10 px-2.5 py-1.5">
            <span className="font-display text-sm font-bold text-primary">
              {business.matchScore}%
            </span>
            <span className="text-[9px] font-medium uppercase tracking-wide text-primary/80">
              match
            </span>
          </div>
        ) : null}
      </div>

      <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
        {business.tagline}
      </p>

      {business.trust ? (
        <div className="mt-3">
          <TrustBadge score={business.trust.score} />
        </div>
      ) : null}

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TierBadge tier={business.tier} />
          <span className="text-xs text-muted-foreground">
            {formatCount(business.followers)} followers
          </span>
        </div>
        <ConnectButton name={business.name} />
      </div>
    </Link>
  )
}
