'use client'

import { motion } from 'motion/react'
import {
  ArrowUpRight,
  Eye,
  Handshake,
  Sparkles,
  TrendingUp,
  UserPlus,
  Users,
} from 'lucide-react'
import { AppHeader } from '@/components/app-header'
import { SectionTitle } from '@/components/ui-bits'
import { currentBusiness, visibilityData } from '@/lib/mock-data'

const stats = [
  { label: 'Profile views', value: '4,281', delta: '+18%', icon: Eye },
  { label: 'New connections', value: '312', delta: '+9%', icon: UserPlus },
  { label: 'Partnership leads', value: '27', delta: '+31%', icon: Handshake },
  { label: 'Match score avg', value: '87%', delta: '+4%', icon: Sparkles },
]

const leads = [
  { name: 'Kola Fintech', stage: 'Call scheduled', score: 96 },
  { name: 'Accra Foods Group', stage: 'In discussion', score: 84 },
  { name: 'Baobab Ventures', stage: 'Intro sent', score: 88 },
]

export default function DashboardPage() {
  const max = Math.max(...visibilityData.map((d) => d.value))

  return (
    <div className="min-h-full pb-8">
      <AppHeader back title="Business Dashboard" subtitle={currentBusiness.name} />

      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <s.icon className="h-4 w-4" />
                </span>
                <span className="flex items-center gap-0.5 text-[11px] font-semibold text-primary">
                  <ArrowUpRight className="h-3 w-3" />
                  {s.delta}
                </span>
              </div>
              <p className="mt-3 font-display text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-sm font-semibold">Profile visibility</h2>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">
              <TrendingUp className="h-3.5 w-3.5" /> Trending up
            </span>
          </div>
          <div className="mt-5 flex h-36 items-end justify-between gap-2">
            {visibilityData.map((d, i) => (
              <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.value / max) * 100}%` }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 200, damping: 24 }}
                  className={`w-full rounded-t-md ${
                    d.value === max ? 'bg-primary' : 'bg-primary/35'
                  }`}
                />
                <span className="text-[10px] text-muted-foreground">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <SectionTitle title="Active partnership leads" />
          <div className="space-y-2.5">
            {leads.map((l) => (
              <div
                key={l.name}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                  <Users className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-semibold">{l.name}</p>
                  <p className="text-xs text-muted-foreground">{l.stage}</p>
                </div>
                <div className="flex flex-col items-center rounded-xl bg-primary/10 px-2.5 py-1">
                  <span className="font-display text-sm font-bold text-primary">{l.score}%</span>
                  <span className="text-[9px] uppercase tracking-wide text-primary/80">match</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
