import {
  Boxes,
  Handshake,
  Layers,
  Plug,
  TrendingUp,
  Truck,
  type LucideIcon,
} from 'lucide-react'
import type { CollaborationArea, CollaborationType } from '@/lib/types'

const typeIcons: Record<CollaborationType, LucideIcon> = {
  'Joint Project': Handshake,
  'Supply Chain': Boxes,
  Distribution: Truck,
  'Technology Integration': Plug,
  'Market Expansion': TrendingUp,
  'Shared Services': Layers,
}

export function CollaborationList({
  items,
  compact = false,
}: {
  items: CollaborationArea[]
  compact?: boolean
}) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => {
        const Icon = typeIcons[item.type]
        return (
          <li
            key={item.type + item.detail}
            className="flex items-start gap-3 rounded-2xl border border-border bg-background/40 p-3"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold leading-tight">{item.type}</p>
              {!compact ? (
                <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground">
                  {item.detail}
                </p>
              ) : null}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
