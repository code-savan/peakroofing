"use client"

import { useEffect, useRef } from "react"

const images = [
  { label: "Roof Replacement", file: "job1.jpg" },
  { label: "New Construction", file: "job2.jpg" },
  { label: "Gutter Installation", file: "job3.jpg" },
  { label: "Storm Damage Repair", file: "job4.jpg" },
  { label: "Siding Project", file: "job5.jpg" },
  { label: "Commercial Roofing", file: "job6.jpg" },
]

export function Gallery() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-visible")
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="gallery" className="gallery" style={{
      padding: "var(--section-pad) 0",
      background: "var(--color-white)",
    }}>
      <div className="container">
        <div className="section-header">
          <span className="section-kicker">Our Work</span>
          <h2 className="section-title">Recent Projects</h2>
        </div>

        <div className="gallery__grid" ref={gridRef} data-reveal style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}>
          {images.map((img, i) => (
            <div
              key={i}
              className="gallery__item"
              data-stagger={String(Math.min(i, 5))}
              style={{
                position: "relative",
                borderRadius: "var(--card-radius)",
                overflow: "hidden",
                aspectRatio: "4 / 3",
                cursor: "pointer",
              }}
            >
              <img
                src={`/${img.file}`}
                alt={img.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s ease",
                  display: "block",
                }}
              />
              <div className="gallery__overlay" style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "opacity var(--transition-base)",
              }}>
                <span className="gallery__overlay-text" style={{
                  color: "var(--color-white)",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  border: "2px solid rgba(255,255,255,0.6)",
                  padding: "0.6rem 1.2rem",
                  borderRadius: 4,
                }}>
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
