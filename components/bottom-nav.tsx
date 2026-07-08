'use client'

import { Compass, Home, MessageSquare, Sparkles, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

const tabs = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/discover', label: 'Discover', icon: Compass },
  { href: '/network', label: 'Network', icon: MessageSquare },
  { href: '/profile', label: 'Profile', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <nav className="relative z-20 shrink-0 border-t border-border bg-card/90 backdrop-blur">
      {/* Center AI Match action */}
      <Link
        href="/ai-match"
        aria-label="AI Match"
        className="absolute -top-6 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-card transition-transform active:scale-95"
      >
        <Sparkles className="h-6 w-6" />
      </Link>

      <ul className="flex items-stretch justify-between px-3 pb-1 pt-2">
        {tabs.slice(0, 2).map((t) => (
          <NavItem key={t.href} {...t} active={isActive(t.href)} />
        ))}
        <li className="w-14" aria-hidden="true" />
        {tabs.slice(2).map((t) => (
          <NavItem key={t.href} {...t} active={isActive(t.href)} />
        ))}
      </ul>
    </nav>
  )
}

function NavItem({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string
  label: string
  icon: typeof Home
  active: boolean
}) {
  return (
    <li className="flex-1">
      <Link
        href={href}
        className={cn(
          'relative flex flex-col items-center gap-1 py-1 text-[10px] font-medium transition-colors',
          active ? 'text-primary' : 'text-muted-foreground',
        )}
      >
        <Icon className="h-[22px] w-[22px]" strokeWidth={active ? 2.4 : 1.8} />
        {label}
        {active ? (
          <motion.span
            layoutId="tab-dot"
            className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-primary"
          />
        ) : null}
      </Link>
    </li>
  )
}
