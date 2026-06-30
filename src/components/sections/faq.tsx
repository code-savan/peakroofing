"use client"

import { useEffect, useRef } from "react"

const faqs = [
  {
    q: "How long does a roof replacement take?",
    a: "Most residential roof replacements are completed in 1-2 days, depending on the size and complexity of your roof. We work efficiently to minimize disruption to your daily routine.",
  },
  {
    q: "Do you help with insurance claims?",
    a: "Absolutely. We work directly with your insurance company throughout the entire claims process. From the initial inspection to the final paperwork, we make sure you get the coverage you're entitled to.",
  },
  {
    q: "What roofing materials do you use?",
    a: "We use top-tier materials from manufacturers like GAF, Owens Corning, and CertainTeed. All our installations come with manufacturer warranties for your peace of mind.",
  },
  {
    q: "Do you offer free estimates?",
    a: "Yes! We provide free, no-obligation roof inspections and estimates. Our team will thoroughly assess your roof's condition and provide an honest, transparent quote.",
  },
  {
    q: "Do you offer financing options?",
    a: "Yes, we offer flexible financing options to help make your home improvement project affordable. Contact us to learn more about available plans.",
  },
]

export function FAQ() {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = listRef.current
    if (!el) return

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(".faq__trigger") as HTMLElement | null
      if (!target) return

      const item = target.closest(".faq__item") as HTMLElement | null
      if (!item) return

      const answer = item.querySelector(".faq__answer") as HTMLElement | null
      if (!answer) return

      const isOpen = item.classList.contains("is-open")

      el.querySelectorAll(".faq__item.is-open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("is-open")
          const openAnswer = openItem.querySelector(".faq__answer") as HTMLElement | null
          if (openAnswer) openAnswer.style.maxHeight = "0"
          const openTrigger = openItem.querySelector(".faq__trigger") as HTMLElement | null
          if (openTrigger) openTrigger.setAttribute("aria-expanded", "false")
        }
      })

      if (isOpen) {
        item.classList.remove("is-open")
        answer.style.maxHeight = "0"
        target.setAttribute("aria-expanded", "false")
      } else {
        item.classList.add("is-open")
        answer.style.maxHeight = answer.scrollHeight + "px"
        target.setAttribute("aria-expanded", "true")
      }
    }

    el.addEventListener("click", handleClick)
    return () => el.removeEventListener("click", handleClick)
  }, [])

  return (
    <section className="faq" style={{
      padding: "var(--section-pad) 0",
      background: "var(--color-gray-bg)",
    }}>
      <div className="container container--narrow">
        <div className="section-header">
          <span className="section-kicker">FAQ</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>

        <div className="faq__list" ref={listRef} style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="faq__item"
              style={{
                borderBottom: "1px solid var(--color-gray-100)",
                ...(i === 0 ? { borderTop: "1px solid var(--color-gray-100)" } : {}),
              }}
            >
              <button
                className="faq__trigger"
                aria-expanded="false"
                aria-controls={`faq-answer-${i}`}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  padding: "1.35rem 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                }}
              >
                <span className="faq__question" style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  lineHeight: 1.4,
                }}>
                  {faq.q}
                </span>
                <span className="faq__icon" aria-hidden="true" style={{
                  flexShrink: 0,
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-primary)",
                  transition: "transform var(--transition-base)",
                }}>
                  <svg className="faq__plus" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <svg className="faq__minus" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: "none" }}>
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <div className="faq__answer" id={`faq-answer-${i}`} role="region" style={{
                maxHeight: 0,
                overflow: "hidden",
                transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}>
                <div className="faq__answer-inner" style={{ paddingBottom: "1.5rem" }}>
                  <p style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    color: "var(--color-text-muted)",
                    margin: 0,
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
