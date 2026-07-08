import { BadgeCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { BusinessTier } from '@/lib/types'

export function VerifiedTick({ className }: { className?: string }) {
  return <BadgeCheck className={cn('h-4 w-4 text-primary', className)} aria-label="Verified" />
}

const tierStyles: Record<BusinessTier, string> = {
  'Small Business': 'bg-secondary text-secondary-foreground',
  'Growing Startup': 'bg-primary/15 text-primary',
  'Large Enterprise': 'bg-accent/15 text-accent',
  Institution: 'bg-[oklch(0.66_0.14_240)]/15 text-[oklch(0.72_0.14_240)]',
}

export function TierBadge({ tier, className }: { tier: BusinessTier; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
        tierStyles[tier],
        className,
      )}
    >
      {tier}
    </span>
  )
}

export function Chip({
  children,
  active,
  className,
  ...props
}: {
  children: ReactNode
  active?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card text-muted-foreground hover:text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function SectionTitle({
  title,
  action,
}: {
  title: string
  action?: ReactNode
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="font-display text-lg font-semibold tracking-tight">{title}</h2>
      {action}
    </div>
  )
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-secondary text-muted-foreground">
        {icon}
      </div>
      <h3 className="font-display text-base font-semibold">{title}</h3>
      <p className="mt-1.5 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}

export function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return `${n}`
}
