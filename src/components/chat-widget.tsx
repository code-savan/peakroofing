'use client'
import { useState, useRef, useEffect } from 'react'
import { RoofLogo } from '@/components/roof-logo'

const WEBHOOK_URL = 'https://n8n.hermes-codesavan.xyz/webhook/chat-demo'

type Message = {
  role: 'bot' | 'user'
  text: string
}

const faqQuestions = [
  "What services do you offer?",
  "How do I get a quote?",
  "What areas do you serve?",
  "Do you offer financing?",
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hi! I'm Peak's AI assistant. Ask me anything about roofing, gutters, or siding." }
  ])
  const [showFaq, setShowFaq] = useState(true)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    const show = setTimeout(() => setShowBadge(true), 2000)
    const hide = setTimeout(() => setShowBadge(false), 8000)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend(text: string) {
    if (!text || loading) return
    setShowFaq(false)
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text }])
    setLoading(true)
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })
      const data = await res.json()
      setMessages(prev => [...prev, {
        role: 'bot',
        text: data.response || 'Something went wrong. Please try again.'
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: 'Connection issue. Please call us directly.'
      }])
    }
    setLoading(false)
  }

  return (
    <>
      <style>{`
        @keyframes badgeFadeIn {
          from { opacity: 0; transform: translateX(16px) scale(0.9); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>

      {/* Floating Badge */}
      {showBadge && !open && (
        <div
          style={{
            position: 'fixed',
            bottom: 88,
            right: 24,
            zIndex: 50,
            background: '#fff',
            color: '#0d0d0d',
            padding: '8px 16px',
            borderRadius: 12,
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "'Barlow Condensed', sans-serif",
            letterSpacing: '0.02em',
            animation: 'badgeFadeIn 0.5s cubic-bezier(0.16,1,0.3,1)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <div style={{ position: 'absolute', bottom: -6, right: 20, width: 12, height: 12, background: '#fff', transform: 'rotate(45deg)', borderRadius: 2 }} />
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            &ldquo;We reply in seconds&rdquo;
          </span>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 50,
          width: 56,
          height: 56,
          borderRadius: 16,
          backgroundColor: open ? '#0d0d0d' : '#0d0d0d',
          color: '#fff',
          boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.25)' }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat Box */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 92,
            right: 24,
            zIndex: 50,
            width: 360,
            maxWidth: 'calc(100vw - 48px)',
            height: 520,
            maxHeight: 'calc(100vh - 140px)',
            backgroundColor: '#fff',
            borderRadius: 20,
            boxShadow: '0 20px 60px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'chatFadeIn 0.3s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <style>{`
            @keyframes chatFadeIn {
              from { opacity: 0; transform: translateY(16px) scale(0.96); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
            .chat-scroll::-webkit-scrollbar { width: 4px; }
            .chat-scroll::-webkit-scrollbar-track { background: transparent; }
            .chat-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
            @keyframes pulse-dot {
              0%, 80%, 100% { transform: scale(0); }
              40% { transform: scale(1); }
            }
          `}</style>

          {/* Header */}
          <div style={{
            background: '#0d0d0d',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexShrink: 0,
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <RoofLogo color="#fff" edgeColor="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.03em' }}>
                Peak Roofing
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                Cole J.
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                borderRadius: 8,
                width: 28,
                height: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.5)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="chat-scroll" style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 16px 8px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            background: '#f8f8fa',
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  maxWidth: '85%',
                  padding: '10px 16px',
                  borderRadius: msg.role === 'bot' ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: msg.role === 'bot' ? '#1a1a1a' : '#fff',
                  background: msg.role === 'bot' ? '#fff' : '#0d0d0d',
                  boxShadow: msg.role === 'bot' ? '0 1px 4px rgba(0,0,0,0.04)' : '0 2px 8px rgba(0,0,0,0.15)',
                  alignSelf: msg.role === 'bot' ? 'flex-start' : 'flex-end',
                  animation: 'chatFadeIn 0.25s cubic-bezier(0.16,1,0.3,1)',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div style={{
                alignSelf: 'flex-start',
                background: '#fff',
                borderRadius: '14px 14px 14px 4px',
                padding: '14px 18px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                display: 'flex',
                gap: 5,
                alignItems: 'center',
              }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#9ca3af',
                    display: 'inline-block',
                    animation: 'pulse-dot 1.4s ease-in-out infinite',
                    animationDelay: `${i * 0.16}s`,
                  }} />
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* FAQ Suggestions */}
          {showFaq && messages.length === 1 && (
            <div style={{
              padding: '8px 16px 12px',
              background: '#f8f8fa',
              borderTop: '1px solid rgba(0,0,0,0.04)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
              flexShrink: 0,
            }}>
              {faqQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  style={{
                    background: '#fff',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 20,
                    padding: '6px 14px',
                    fontSize: 12,
                    color: '#4b5563',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#0d0d0d'; e.currentTarget.style.color = '#0d0d0d'; e.currentTarget.style.background = '#f3f3f3' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; e.currentTarget.style.color = '#4b5563'; e.currentTarget.style.background = '#fff' }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '10px 16px 14px',
            borderTop: '1px solid rgba(0,0,0,0.06)',
            background: '#fff',
            display: 'flex',
            gap: 8,
            flexShrink: 0,
          }}>
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              background: '#f3f4f6',
              borderRadius: 12,
              padding: '0 14px',
              border: '1.5px solid transparent',
              transition: 'border-color 0.2s',
            }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend(input)}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: 13,
                  color: '#1a1a1a',
                  padding: '10px 0',
                  fontFamily: 'inherit',
                }}
                onFocus={e => { e.currentTarget.parentElement!.style.borderColor = '#0d0d0d'; e.currentTarget.parentElement!.style.background = '#fff' }}
                onBlur={e => { e.currentTarget.parentElement!.style.borderColor = 'transparent'; e.currentTarget.parentElement!.style.background = '#f3f4f6' }}
              />
            </div>
            <button
              onClick={() => handleSend(input)}
              disabled={loading || !input.trim()}
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: loading || !input.trim() ? '#e5e7eb' : '#0d0d0d',
                color: loading || !input.trim() ? '#9ca3af' : '#fff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={e => { if (!loading && input.trim()) e.currentTarget.style.background = '#2a2a2a' }}
              onMouseLeave={e => { if (!loading && input.trim()) e.currentTarget.style.background = '#0d0d0d' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
