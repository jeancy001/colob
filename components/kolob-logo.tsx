import { cn } from '@/lib/utils'

export function KolobMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-[30%] bg-primary text-primary-foreground',
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-[62%] w-[62%]" fill="none">
        {/* Two interlocking rings — connection & collaboration */}
        <circle cx="9" cy="12" r="4.4" stroke="currentColor" strokeWidth="2.1" />
        <circle cx="15" cy="12" r="4.4" stroke="currentColor" strokeWidth="2.1" />
      </svg>
    </span>
  )
}

export function KolobWordmark({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <KolobMark className="h-8 w-8" />
      <span className="font-display text-xl font-bold tracking-tight text-foreground">KOLOB</span>
    </div>
  )
}
