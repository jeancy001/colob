'use client'

import { Check, Clock, Plus } from 'lucide-react'
import { useState } from 'react'
import { useToast } from './toast'
import { cn } from '@/lib/utils'

export function ConnectButton({
  name,
  className,
  full,
}: {
  name: string
  className?: string
  full?: boolean
}) {
  const [state, setState] = useState<'idle' | 'pending'>('idle')
  const toast = useToast()

  function toggle(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (state === 'idle') {
      setState('pending')
      toast(`Connection request sent to ${name}`)
    } else {
      setState('idle')
      toast('Connection request withdrawn', 'info')
    }
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-xl text-[13px] font-semibold transition-colors active:scale-95',
        full ? 'w-full py-3' : 'px-3.5 py-2',
        state === 'pending'
          ? 'bg-secondary text-secondary-foreground'
          : 'bg-primary text-primary-foreground',
        className,
      )}
    >
      {state === 'pending' ? (
        <>
          <Clock className="h-4 w-4" /> Pending
        </>
      ) : (
        <>
          <Plus className="h-4 w-4" /> Connect
        </>
      )}
    </button>
  )
}

export function FollowButton({ name }: { name: string }) {
  const [following, setFollowing] = useState(false)
  const toast = useToast()
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setFollowing((f) => !f)
        toast(following ? `Unfollowed ${name}` : `Following ${name}`, following ? 'info' : 'success')
      }}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 text-[13px] font-semibold transition-colors active:scale-95',
        following
          ? 'border border-border bg-transparent text-foreground'
          : 'border border-border bg-card text-foreground',
      )}
    >
      {following ? <Check className="h-4 w-4 text-primary" /> : null}
      {following ? 'Following' : 'Follow'}
    </button>
  )
}
