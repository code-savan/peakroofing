"use client"

export function TrustBar() {
  const items = [
    { icon: "check", label: "Free Inspections" },
    { icon: "shield", label: "Licensed & Insured" },
    { icon: "star", label: "50+ Years Combined Experience" },
    { icon: "dollar", label: "Financing Available" },
  ]

  function renderIcon(icon: string) {
    const props = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none" as const, stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
    switch (icon) {
      case "check": return <svg {...props}><polyline points="20 6 9 17 4 12" /></svg>
      case "shield": return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
      case "star": return <svg {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
      case "dollar": return <svg {...props}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
      default: return null
    }
  }

  return (
    <section className="trust-bar" style={{
      background: "var(--color-gray-bg)",
      borderBottom: "1px solid var(--color-gray-100)",
      padding: "0.9rem 0",
    }}>
      <div className="trust-bar__inner" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 1.5rem",
      }}>
        {items.map((item, i) => (
          <div key={i} className="trust-bar__item" style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.78rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-text-muted)",
            whiteSpace: "nowrap",
          }}>
            <span className="trust-bar__icon" style={{ flexShrink: 0, color: "var(--color-primary)", display: "flex" }}>
              {renderIcon(item.icon)}
            </span>
            <span className="trust-bar__label">{item.label}</span>
            {i < items.length - 1 && (
              <span className="trust-bar__divider" style={{
                width: 1,
                height: 20,
                background: "var(--color-gray-100)",
                flexShrink: 0,
                marginLeft: "0.5rem",
              }} />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
