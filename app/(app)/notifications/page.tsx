'use client'

import { motion } from 'motion/react'
import { BellOff, Heart, MessageSquare, Sparkles, UserPlus, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { AppHeader } from '@/components/app-header'
import { BrandAvatar } from '@/components/brand-avatar'
import { EmptyState } from '@/components/ui-bits'
import { useToast } from '@/components/toast'
import { getBusiness, notifications as seed } from '@/lib/mock-data'
import type { Notification } from '@/lib/types'
import { cn } from '@/lib/utils'

const typeIcon: Record<Notification['type'], LucideIcon> = {
  connection: UserPlus,
  message: MessageSquare,
  like: Heart,
  match: Sparkles,
  system: Sparkles,
}

export default function NotificationsPage() {
  const [items, setItems] = useState(seed)
  const toast = useToast()
  const hasUnread = items.some((n) => n.unread)

  return (
    <div className="pb-6">
      <AppHeader
        title="Notifications"
        back
        right={
          hasUnread ? (
            <button
              onClick={() => {
                setItems((prev) => prev.map((n) => ({ ...n, unread: false })))
                toast('All notifications marked as read', 'info')
              }}
              className="text-xs font-semibold text-primary"
            >
              Mark all read
            </button>
          ) : undefined
        }
      />

      {items.length === 0 ? (
        <EmptyState
          icon={<BellOff className="h-7 w-7" />}
          title="You're all caught up"
          description="New connection requests, matches and messages will appear here."
        />
      ) : (
        <ul className="flex flex-col">
          {items.map((n, i) => {
            const Icon = typeIcon[n.type]
            const business = n.businessId ? getBusiness(n.businessId) : undefined
            return (
              <motion.li
                key={n.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  href={n.type === 'message' ? '/network' : n.businessId ? `/business/${n.businessId}` : '/notifications'}
                  onClick={() =>
                    setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))
                  }
                  className={cn(
                    'flex items-start gap-3 border-b border-border px-4 py-3.5 transition-colors active:bg-secondary/50',
                    n.unread && 'bg-primary/5',
                  )}
                >
                  <div className="relative">
                    {business ? (
                      <BrandAvatar name={business.name} seed={business.id} className="h-11 w-11" />
                    ) : (
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary">
                        <Icon className="h-5 w-5 text-primary" />
                      </span>
                    )}
                    <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background">
                      <Icon className="h-3 w-3" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{n.title}</p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">{n.body}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{n.time} ago</p>
                  </div>
                  {n.unread ? <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" /> : null}
                </Link>
              </motion.li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
