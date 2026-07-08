'use client'

import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ColobMark } from './colob-logo'
import { cn } from '@/lib/utils'

const slides = [
  {
    image: '/onboarding/connect.png',
    title: 'Connect beyond borders',
    body: 'Discover and connect with verified businesses, institutions and investors across Africa and global markets.',
  },
  {
    image: '/onboarding/ai.png',
    title: 'AI-powered matchmaking',
    body: 'Our intelligence engine surfaces the right partners, suppliers and investors for your goals — automatically.',
  },
  {
    image: '/onboarding/grow.png',
    title: 'Grow with the ecosystem',
    body: 'Showcase your business, request partnerships and unlock cross-border opportunities that scale you faster.',
  },
]

export function Onboarding() {
  const [index, setIndex] = useState(0)
  const last = index === slides.length - 1
  const slide = slides[index]

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-between px-5 pb-2 pt-3">
        <div className="flex items-center gap-2">
          <ColobMark className="h-7 w-7" />
          <span className="font-display text-lg font-bold tracking-tight">COLOB</span>
        </div>
        <Link href="/signin" className="text-sm font-medium text-muted-foreground">
          Skip
        </Link>
      </div>

      <div className="relative mx-5 mt-2 flex-1 overflow-hidden rounded-[2rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image || '/placeholder.svg'}
              alt=""
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-6 pb-6 pt-5">
        <div className="mb-5 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all',
                i === index ? 'w-7 bg-primary' : 'w-1.5 bg-muted',
              )}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <h1 className="text-balance font-display text-[26px] font-bold leading-tight tracking-tight">
              {slide.title}
            </h1>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
              {slide.body}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6">
          {last ? (
            <Link
              href="/signin"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-display text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <button
              onClick={() => setIndex((i) => i + 1)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-display text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          )}
          <Link
            href="/home"
            className="mt-3 block text-center text-sm text-muted-foreground"
          >
            Explore the demo without signing in
          </Link>
        </div>
      </div>
    </div>
  )
}
