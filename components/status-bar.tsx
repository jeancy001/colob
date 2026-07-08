'use client'

import { useEffect, useState } from 'react'

export function StatusBar() {
  const [time, setTime] = useState('9:41')

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: false,
        }),
      )
    update()
    const id = setInterval(update, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative z-30 flex h-11 shrink-0 items-center justify-between px-6 pt-1 text-foreground">
      <span className="font-display text-sm font-semibold tabular-nums">{time}</span>
      <div className="pointer-events-none absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-background" />
      <div className="flex items-center gap-1.5">
        {/* signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden="true">
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        {/* wifi */}
        <svg width="16" height="11" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
          <path d="M8 2.5c2.4 0 4.6.9 6.3 2.4l-1.4 1.6A7 7 0 008 4.7a7 7 0 00-4.9 1.8L1.7 4.9A9.4 9.4 0 018 2.5z" />
          <path d="M8 6.4c1.4 0 2.6.5 3.6 1.4l-1.5 1.7A2.7 2.7 0 008 8.6c-.8 0-1.5.3-2.1.9L4.4 7.8A5.4 5.4 0 018 6.4z" />
          <circle cx="8" cy="11" r="1.2" />
        </svg>
        {/* battery */}
        <div className="flex items-center gap-0.5">
          <div className="flex h-3 w-6 items-center rounded-[3px] border border-foreground/50 p-0.5">
            <div className="h-full w-[75%] rounded-[1px] bg-foreground" />
          </div>
          <div className="h-1.5 w-0.5 rounded-r-sm bg-foreground/50" />
        </div>
      </div>
    </div>
  )
}
