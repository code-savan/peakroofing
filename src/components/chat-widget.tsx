'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
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

const teaserMessages = [
  "Need a roof estimate? We reply fast!",
  "Free inspections available today!",
  "Roof leak? We're here to help!",
  "Ask us about financing options!",
  "Get a free quote in seconds!",
]

function detectContactForm(text: string): boolean {
  const lower = text.toLowerCase()
  const hasName = lower.includes('name')
  const hasPhone = lower.includes('phone') || lower.includes('number') || lower.includes('digits')
  return hasName && hasPhone
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [badgeMessage, setBadgeMessage] = useState<string | null>(null)
  const [badgeVisible, setBadgeVisible] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hi! I'm Peak's AI assistant. Ask me anything about roofing, gutters, or siding." }
  ])
  const [showFaq, setShowFaq] = useState(true)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [contactFormName, setContactFormName] = useState('')
  const [contactFormPhone, setContactFormPhone] = useState('')
  const [sendingContact, setSendingContact] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const badgeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const badgeCycleRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const teaserIndexRef = useRef(0)

  // Track last message index that had a contact form shown
  const [contactFormShownForIndex, setContactFormShownForIndex] = useState<number | null>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  // Looping badge teaser messages
  useEffect(() => {
    function showNextTeaser() {
      setBadgeMessage(teaserMessages[teaserIndexRef.current % teaserMessages.length])
      setBadgeVisible(true)
      teaserIndexRef.current++

      if (badgeTimerRef.current) clearTimeout(badgeTimerRef.current)
      badgeTimerRef.current = setTimeout(() => {
        setBadgeVisible(false)
        badgeTimerRef.current = setTimeout(() => {
          showNextTeaser()
        }, 3000)
      }, 4000)
    }

    const initialDelay = setTimeout(() => {
      showNextTeaser()
    }, 2000)

    return () => {
      clearTimeout(initialDelay)
      if (badgeTimerRef.current) clearTimeout(badgeTimerRef.current)
      if (badgeCycleRef.current) clearInterval(badgeCycleRef.current)
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Check the last bot message for contact form trigger
  useEffect(() => {
    if (messages.length > 0) {
      const last = messages[messages.length - 1]
      if (last.role === 'bot' && detectContactForm(last.text)) {
        const msgIndex = messages.length - 1
        setContactFormShownForIndex(msgIndex)
      }
    }
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

  async function handleContactSubmit() {
    if (!contactFormName.trim() || !contactFormPhone.trim() || sendingContact) return
    setSendingContact(true)
    const payload = `Name: ${contactFormName.trim()}\nPhone: ${contactFormPhone.trim()}`
    setMessages(prev => [...prev, { role: 'user', text: payload }])
    setContactFormName('')
    setContactFormPhone('')
    setContactFormShownForIndex(null)
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: payload })
      })
      const data = await res.json()
      setMessages(prev => [...prev, {
        role: 'bot',
        text: data.response || 'Thanks! A team member will reach out shortly.'
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: "Thanks! We'll contact you soon at the number provided."
      }])
    }
    setSendingContact(false)
  }

  return (
    <>
      <style>{`
        @keyframes badgeFadeIn {
          from { opacity: 0; transform: translateX(16px) scale(0.9); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes badgeFadeOut {
          from { opacity: 1; transform: translateX(0) scale(1); }
          to { opacity: 0; transform: translateX(16px) scale(0.9); }
        }
      `}</style>

      {/* Floating Teaser Badge */}
      {badgeMessage && !open && (
        <div
          style={{
            position: 'fixed',
            bottom: 88,
            right: 24,
            zIndex: 50,
            background: '#fff',
            color: '#0d0d0d',
            padding: '10px 18px',
            borderRadius: 12,
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "'Barlow Condensed', sans-serif",
            letterSpacing: '0.02em',
            animation: badgeVisible ? 'badgeFadeIn 0.4s cubic-bezier(0.16,1,0.3,1)' : 'badgeFadeOut 0.3s ease forwards',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            border: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ position: 'absolute', bottom: -6, right: 20, width: 12, height: 12, background: '#fff', transform: 'rotate(45deg)', borderRadius: 2, borderRight: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }} />
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            {badgeMessage}
          </span>
        </div>
      )}

      {/* Chat Button - perfect circle */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle chat"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 50,
          width: 58,
          height: 58,
          borderRadius: '50%',
          backgroundColor: open ? '#0d0d0d' : '#c8102e',
          color: '#fff',
          boxShadow: open
            ? '0 6px 24px rgba(0,0,0,0.3)'
            : '0 6px 24px rgba(200,16,46,0.4), 0 0 0 3px rgba(200,16,46,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: open ? '2px solid rgba(255,255,255,0.2)' : '2px solid rgba(255,255,255,0.3)',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.08)'
          e.currentTarget.style.boxShadow = open
            ? '0 8px 32px rgba(0,0,0,0.35)'
            : '0 8px 32px rgba(200,16,46,0.5), 0 0 0 4px rgba(200,16,46,0.25)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = open
            ? '0 6px 24px rgba(0,0,0,0.3)'
            : '0 6px 24px rgba(200,16,46,0.4), 0 0 0 3px rgba(200,16,46,0.2)'
        }}
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
              <div key={i}>
                <div
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

                {/* Contact Form Below Bot Message */}
                {msg.role === 'bot' && contactFormShownForIndex === i && (
                  <div
                    style={{
                      marginTop: 10,
                      background: '#fff',
                      borderRadius: 14,
                      padding: 14,
                      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                      border: '1px solid rgba(0,0,0,0.06)',
                      maxWidth: '85%',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <input
                        type="text"
                        value={contactFormName}
                        onChange={e => setContactFormName(e.target.value)}
                        placeholder="Your name"
                        style={{
                          fontSize: 13,
                          padding: '10px 12px',
                          border: '1px solid rgba(0,0,0,0.12)',
                          borderRadius: 10,
                          background: '#f8f8fa',
                          color: '#1a1a1a',
                          outline: 'none',
                          fontFamily: 'inherit',
                          width: '100%',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s, background 0.2s',
                        }}
                        onFocus={e => { e.target.style.borderColor = '#c8102e'; e.target.style.background = '#fff' }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.12)'; e.target.style.background = '#f8f8fa' }}
                      />
                      <input
                        type="tel"
                        value={contactFormPhone}
                        onChange={e => setContactFormPhone(e.target.value)}
                        placeholder="Phone number"
                        style={{
                          fontSize: 13,
                          padding: '10px 12px',
                          border: '1px solid rgba(0,0,0,0.12)',
                          borderRadius: 10,
                          background: '#f8f8fa',
                          color: '#1a1a1a',
                          outline: 'none',
                          fontFamily: 'inherit',
                          width: '100%',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s, background 0.2s',
                        }}
                        onFocus={e => { e.target.style.borderColor = '#c8102e'; e.target.style.background = '#fff' }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.12)'; e.target.style.background = '#f8f8fa' }}
                      />
                      <button
                        onClick={handleContactSubmit}
                        disabled={!contactFormName.trim() || !contactFormPhone.trim() || sendingContact}
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          fontFamily: "'Barlow Condensed', sans-serif",
                          letterSpacing: '0.08em',
                          padding: '10px 0',
                          background: !contactFormName.trim() || !contactFormPhone.trim() || sendingContact ? '#e5e7eb' : '#c8102e',
                          color: !contactFormName.trim() || !contactFormPhone.trim() || sendingContact ? '#9ca3af' : '#fff',
                          border: 'none',
                          borderRadius: 10,
                          cursor: !contactFormName.trim() || !contactFormPhone.trim() || sendingContact ? 'not-allowed' : 'pointer',
                          width: '100%',
                          textTransform: 'uppercase',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { if (contactFormName.trim() && contactFormPhone.trim() && !sendingContact) e.currentTarget.style.background = '#a00d24' }}
                        onMouseLeave={e => { if (contactFormName.trim() && contactFormPhone.trim() && !sendingContact) e.currentTarget.style.background = '#c8102e' }}
                      >
                        {sendingContact ? 'Sending...' : 'Send'}
                      </button>
                    </div>
                  </div>
                )}
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
