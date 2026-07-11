import { CheckCircle2, Clock, PackageCheck, ShieldCheck, Star, TriangleAlert } from 'lucide-react'
import type { TrustProfile } from '@/lib/types'
import { cn } from '@/lib/utils'
import { formatCount } from './ui-bits'

function rating(score: number) {
  if (score >= 90) return { label: 'Highly Trusted', tone: 'text-primary' }
  if (score >= 80) return { label: 'Trusted', tone: 'text-accent' }
  return { label: 'Building Trust', tone: 'text-muted-foreground' }
}

export function TrustBadge({ score, className }: { score: number; className?: string }) {
  const r = rating(score)
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-lg bg-primary/10 px-2 py-1 text-primary',
        className,
      )}
    >
      <ShieldCheck className="h-3.5 w-3.5" />
      <span className="font-display text-xs font-bold">{score}</span>
      <span className="text-[10px] font-semibold uppercase tracking-wide">trust</span>
    </span>
  )
}

export function TrustPanel({ trust }: { trust: TrustProfile }) {
  const r = rating(trust.score)
  const metrics = [
    { icon: CheckCircle2, label: 'On-time delivery', value: `${trust.onTimeDelivery}%` },
    { icon: PackageCheck, label: 'Order accuracy', value: `${trust.orderAccuracy}%` },
    { icon: Clock, label: 'Response time', value: trust.responseTime },
    { icon: TriangleAlert, label: 'Dispute rate', value: `${trust.disputeRate}%` },
  ]

  return (
    <div className="rounded-2xl border border-primary/25 bg-primary/[0.06] p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <span className="font-display text-lg font-bold leading-none">{trust.score}</span>
          <span className="text-[8px] font-semibold uppercase tracking-wide">/ 100</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className={cn('font-display text-sm font-bold', r.tone)}>{r.label}</span>
          </div>
          <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
            KOLOB Trust Score based on verified performance over {trust.trackRecord}.
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5"
          >
            <m.icon className="h-4 w-4 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="font-display text-sm font-bold leading-none">{m.value}</p>
              <p className="mt-0.5 truncate text-[10px] text-muted-foreground">{m.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl bg-secondary/60 px-3 py-2 text-xs">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <PackageCheck className="h-3.5 w-3.5" /> {formatCount(trust.completedOrders)} orders
        </span>
        <span className="flex items-center gap-1.5 font-semibold">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" /> {formatCount(trust.reviews)}{' '}
          reviews
        </span>
      </div>
    </div>
  )
}
