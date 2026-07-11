'use client'

import { motion } from 'motion/react'
import { Paperclip, Send } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useRef, useState } from 'react'
import { AppHeader } from '@/components/app-header'
import { BrandAvatar } from '@/components/brand-avatar'
import { VerifiedTick } from '@/components/ui-bits'
import { conversations, getBusiness, messagesByConversation } from '@/lib/mock-data'
import type { Message } from '@/lib/types'

export default function ChatPage() {
  const params = useParams<{ id: string }>()
  const conversation = conversations.find((c) => c.id === params.id)
  const business = conversation ? getBusiness(conversation.businessId) : undefined

  const [messages, setMessages] = useState<Message[]>(
    () => messagesByConversation[params.id] ?? [],
  )
  const [draft, setDraft] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  function send() {
    const text = draft.trim()
    if (!text) return
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages((m) => [...m, { id: `m-${Date.now()}`, fromMe: true, text, time: now }])
    setDraft('')
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: `r-${Date.now()}`,
          fromMe: false,
          text: 'Thanks for the note — let me loop in my team and get back to you shortly.',
          time: now,
        },
      ])
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
    }, 1400)
  }

  if (!business) {
    return <AppHeader title="Conversation" back />
  }

  return (
    <div className="flex min-h-full flex-col">
      <AppHeader
        back
        title={business.name}
        subtitle={conversation?.online ? 'Active now' : 'Offline'}
        right={
          <BrandAvatar name={business.name} seed={business.id} className="h-9 w-9 text-xs" />
        }
      />

      <div className="flex-1 space-y-3 px-4 py-4">
        <div className="mx-auto w-fit rounded-full bg-secondary px-3 py-1 text-[11px] text-muted-foreground">
          You connected with {business.name}
        </div>
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.fromMe ? 'justify-end' : 'items-end gap-2'}`}
          >
            {!m.fromMe ? (
              <BrandAvatar
                name={business.name}
                seed={business.id}
                className="h-7 w-7 text-[10px]"
              />
            ) : null}
            <div
              className={`max-w-[76%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                m.fromMe
                  ? 'rounded-br-md bg-primary text-primary-foreground'
                  : 'rounded-bl-md bg-card text-card-foreground'
              }`}
            >
              {m.text}
              <span
                className={`mt-1 block text-[10px] ${
                  m.fromMe ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}
              >
                {m.time}
              </span>
            </div>
          </motion.div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="sticky bottom-0 flex items-center gap-2 border-t border-border bg-background/90 px-3 py-2.5 backdrop-blur">
        <button
          aria-label="Attach"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground"
        >
          <Paperclip className="h-5 w-5" />
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) send()
          }}
          placeholder="Write a message…"
          className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
        />
        <button
          onClick={send}
          disabled={!draft.trim()}
          aria-label="Send"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40 active:scale-95"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
