'use client'

import { motion } from 'motion/react'
import { ArrowLeft, Building2, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { KolobMark } from './kolob-logo'
import { cn } from '@/lib/utils'

const tiers = ['Small Business', 'Growing Startup', 'Large Enterprise', 'Institution'] as const

export function AuthScreen({ mode }: { mode: 'signin' | 'signup' }) {
  const router = useRouter()
  const isSignup = mode === 'signup'
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tier, setTier] = useState<(typeof tiers)[number]>('Growing Startup')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => router.push('/home'), 1300)
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto no-scrollbar px-6 pb-8">
      <Link
        href="/"
        className="mt-3 flex h-10 w-10 items-center justify-center rounded-full bg-card text-foreground"
        aria-label="Back"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6"
      >
        <KolobMark className="h-12 w-12" />
        <h1 className="mt-5 font-display text-[26px] font-bold leading-tight tracking-tight">
          {isSignup ? 'Create your business account' : 'Welcome back'}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {isSignup
            ? 'Join the ecosystem connecting businesses across Africa.'
            : 'Sign in to continue growing your network.'}
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
        {isSignup ? (
          <Field
            icon={<Building2 className="h-4.5 w-4.5" />}
            label="Company name"
            type="text"
            placeholder="e.g. Sahara Logistics Co."
          />
        ) : null}

        <Field
          icon={<Mail className="h-4.5 w-4.5" />}
          label="Work email"
          type="email"
          placeholder="you@company.com"
        />

        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-muted-foreground">
            Password
          </label>
          <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-card px-3.5 focus-within:border-primary">
            <Lock className="h-4.5 w-4.5 text-muted-foreground" />
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="••••••••"
              defaultValue="demo1234"
              className="flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="text-muted-foreground"
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>

        {isSignup ? (
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-muted-foreground">
              Business category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {tiers.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTier(t)}
                  className={cn(
                    'rounded-xl border px-3 py-2.5 text-[13px] font-medium transition-colors',
                    tier === t
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-card text-muted-foreground',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button type="button" className="self-end text-[13px] font-medium text-primary">
            Forgot password?
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-display text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.98] disabled:opacity-80"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {isSignup ? 'Creating account…' : 'Signing in…'}
            </>
          ) : isSignup ? (
            'Create account'
          ) : (
            'Sign in'
          )}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or continue with
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <SocialButton label="Google" />
        <SocialButton label="LinkedIn" />
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {isSignup ? 'Already have an account? ' : 'New to KOLOB? '}
        <Link
          href={isSignup ? '/signin' : '/signup'}
          className="font-semibold text-primary"
        >
          {isSignup ? 'Sign in' : 'Create account'}
        </Link>
      </p>
    </div>
  )
}

function Field({
  icon,
  label,
  type,
  placeholder,
}: {
  icon: React.ReactNode
  label: string
  type: string
  placeholder: string
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-muted-foreground">{label}</label>
      <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-card px-3.5 focus-within:border-primary">
        <span className="text-muted-foreground">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          className="flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
    </div>
  )
}

function SocialButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3.5 text-sm font-medium transition-colors hover:border-primary/50"
    >
      {label}
    </button>
  )
}
