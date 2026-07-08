'use client'

import {
  BarChart3,
  Bell,
  ChevronRight,
  CircleHelp,
  Handshake,
  Lightbulb,
  LogOut,
  MapPin,
  Pencil,
  Settings,
  Shield,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BrandAvatar } from '@/components/brand-avatar'
import { TierBadge, VerifiedTick, formatCount } from '@/components/ui-bits'
import { useToast } from '@/components/toast'
import { currentBusiness } from '@/lib/mock-data'

const shortcuts = [
  { href: '/dashboard', label: 'Business Dashboard', icon: BarChart3, hint: 'Analytics & leads' },
  { href: '/ideas', label: 'Ideas Hub', icon: Lightbulb, hint: 'Collaborations' },
]

const settings = [
  { label: 'Partnership preferences', icon: Handshake },
  { label: 'Notifications', icon: Bell },
  { label: 'Verification & trust', icon: Shield },
  { label: 'Account settings', icon: Settings },
  { label: 'Help & support', icon: CircleHelp },
]

export default function ProfilePage() {
  const b = currentBusiness
  const router = useRouter()
  const toast = useToast()

  return (
    <div className="min-h-full pb-8">
      <div className="relative h-28 bg-gradient-to-br from-primary/30 via-primary/10 to-accent/15">
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/60 backdrop-blur active:scale-95"
        >
          <Bell className="h-5 w-5" />
        </Link>
      </div>

      <div className="px-4">
        <div className="-mt-10 flex items-end justify-between">
          <BrandAvatar
            name={b.name}
            seed={b.id}
            className="h-20 w-20 rounded-3xl border-4 border-background text-2xl"
          />
          <button
            onClick={() => toast('Edit profile coming soon', 'info')}
            className="mb-1 flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-[13px] font-semibold active:scale-95"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          <h1 className="font-display text-xl font-bold">{b.name}</h1>
          {b.verified ? <VerifiedTick className="h-5 w-5" /> : null}
        </div>
        <p className="text-sm text-muted-foreground">{b.industry}</p>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" /> {b.city}, {b.country}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <TierBadge tier={b.tier} />
          {b.openToPartnership ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
              <Handshake className="h-3 w-3" /> Open to partnership
            </span>
          ) : null}
        </div>

        <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{b.tagline}</p>

        <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-card p-3 text-center">
          <div>
            <p className="font-display text-lg font-bold">{formatCount(b.followers)}</p>
            <p className="text-[11px] text-muted-foreground">Followers</p>
          </div>
          <div className="border-x border-border">
            <p className="font-display text-lg font-bold">{formatCount(b.connections)}</p>
            <p className="text-[11px] text-muted-foreground">Connections</p>
          </div>
          <div>
            <p className="font-display text-lg font-bold">{b.founded}</p>
            <p className="text-[11px] text-muted-foreground">Founded</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {shortcuts.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-2xl border border-border bg-card p-4 active:bg-secondary/40"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <s.icon className="h-4.5 w-4.5" />
              </span>
              <p className="mt-2.5 font-display text-sm font-semibold">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.hint}</p>
            </Link>
          ))}
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card">
          {settings.map((s, i) => (
            <button
              key={s.label}
              onClick={() => toast(`${s.label} coming soon`, 'info')}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-secondary/40 ${
                i !== settings.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <s.icon className="h-5 w-5 text-muted-foreground" />
              <span className="flex-1 text-sm font-medium">{s.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            toast('Signed out', 'info')
            setTimeout(() => router.push('/'), 600)
          }}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 py-3.5 text-sm font-semibold text-destructive active:scale-[0.99]"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>

        <p className="mt-6 text-center text-xs text-muted-foreground">COLOB · v1.0 · Made for Africa</p>
      </div>
    </div>
  )
}
