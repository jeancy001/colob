'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function AppHeader({
  title,
  subtitle,
  back,
  right,
  className,
}: {
  title: string
  subtitle?: string
  back?: boolean
  right?: ReactNode
  className?: string
}) {
  const router = useRouter()
  return (
    <header
      className={cn(
        'sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur',
        className,
      )}
    >
      {back ? (
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-card text-foreground active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      ) : null}
      <div className="min-w-0 flex-1">
        <h1 className="truncate font-display text-lg font-bold tracking-tight">{title}</h1>
        {subtitle ? <p className="truncate text-xs text-muted-foreground">{subtitle}</p> : null}
      </div>
      {right}
    </header>
  )
}
