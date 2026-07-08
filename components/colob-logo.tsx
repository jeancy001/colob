import { cn } from '@/lib/utils'

export function ColobMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-[30%] bg-primary text-primary-foreground',
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-[60%] w-[60%]" fill="none">
        <circle cx="8" cy="12" r="4.2" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="12" r="4.2" stroke="currentColor" strokeWidth="2" />
      </svg>
    </span>
  )
}

export function ColobWordmark({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <ColobMark className="h-8 w-8" />
      <span className="font-display text-xl font-bold tracking-tight text-foreground">
        COLOB
      </span>
    </div>
  )
}
