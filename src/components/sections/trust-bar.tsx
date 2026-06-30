"use client"

import React from "react"

export function TrustBar() {
  const items = [
    { icon: "check", label: "Free Inspections" },
    { icon: "shield", label: "Licensed & Insured" },
    { icon: "star", label: "50+ Years Combined Experience" },
    { icon: "dollar", label: "Financing Available" },
  ]

  return (
    <section className="trust-bar" style={{
      background: "var(--color-gray-bg)",
      borderBottom: "1px solid var(--color-gray-100)",
      padding: "1.1rem 0",
      overflowX: "auto",
    }}>
      <div className="trust-bar__inner" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 1.5rem",
        whiteSpace: "nowrap",
      }}>
        {items.map((item, i) => (
          <React.Fragment key={i}>
            <div className="trust-bar__item" style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-text-muted)",
            }}>
              <span className="trust-bar__icon" style={{ flexShrink: 0, color: "var(--color-primary)", display: "flex" }}>
                {item.icon === "check" && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {item.icon === "shield" && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                )}
                {item.icon === "star" && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                )}
                {item.icon === "dollar" && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                )}
              </span>
              {item.label}
            </div>
            {i < items.length - 1 && (
              <div className="trust-bar__divider" style={{
                width: 1,
                height: 24,
                background: "var(--color-gray-100)",
                flexShrink: 0,
              }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}
