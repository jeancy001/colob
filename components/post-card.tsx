'use client'

import { Bookmark, Heart, MessageCircle, Share2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import type { Post } from '@/lib/types'
import { getBusiness } from '@/lib/mock-data'
import { BrandAvatar } from './brand-avatar'
import { useToast } from './toast'
import { VerifiedTick, formatCount } from './ui-bits'
import { cn } from '@/lib/utils'

export function PostCard({ post }: { post: Post }) {
  const business = getBusiness(post.businessId)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const toast = useToast()
  if (!business) return null

  return (
    <article className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <Link href={`/business/${business.id}`}>
          <BrandAvatar name={business.name} seed={business.id} className="h-11 w-11" />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <Link href={`/business/${business.id}`} className="truncate font-display text-sm font-semibold">
              {business.name}
            </Link>
            {business.verified ? <VerifiedTick /> : null}
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {business.industry} · {post.createdAt}
          </p>
        </div>
        {post.tag ? (
          <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-semibold text-accent">
            {post.tag}
          </span>
        ) : null}
      </div>

      <p className="mt-3 text-[14px] leading-relaxed text-card-foreground">{post.content}</p>

      <div className="mt-3 flex items-center gap-1 border-t border-border pt-3 text-muted-foreground">
        <button
          onClick={() => setLiked((l) => !l)}
          className={cn(
            'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors',
            liked ? 'text-primary' : 'hover:text-foreground',
          )}
        >
          <Heart className={cn('h-[18px] w-[18px]', liked && 'fill-primary')} />
          {formatCount(post.likes + (liked ? 1 : 0))}
        </button>
        <button className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors hover:text-foreground">
          <MessageCircle className="h-[18px] w-[18px]" />
          {formatCount(post.comments)}
        </button>
        <button
          onClick={() => toast('Post shared to your network')}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors hover:text-foreground"
        >
          <Share2 className="h-[18px] w-[18px]" />
        </button>
        <button
          onClick={() => {
            setSaved((s) => !s)
            toast(saved ? 'Removed from saved' : 'Saved to your bookmarks', saved ? 'info' : 'success')
          }}
          className={cn(
            'ml-auto rounded-lg px-2.5 py-1.5 transition-colors',
            saved ? 'text-accent' : 'hover:text-foreground',
          )}
        >
          <Bookmark className={cn('h-[18px] w-[18px]', saved && 'fill-accent')} />
        </button>
      </div>
    </article>
  )
}
