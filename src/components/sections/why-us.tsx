"use client"

import { useEffect, useRef } from "react"

const values = [
  {
    number: "01",
    title: "10+ Years Experience",
    desc: "A decade of proven excellence in residential and commercial roofing across Austin.",
  },
  {
    number: "02",
    title: "Premium Materials",
    desc: "We use top-tier materials from GAF, Owens Corning, and CertainTeed with full manufacturer warranties.",
  },
  {
    number: "03",
    title: "On-Time, On-Budget",
    desc: "We respect your schedule and your budget — every project is completed on time with no surprises.",
  },
  {
    number: "04",
    title: "Fully Licensed & Insured",
    desc: "Our crew is fully licensed, insured, and committed to safety on every job site.",
  },
]

export function WhyUs() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = [leftRef.current, rightRef.current].filter(Boolean)
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )

    els.forEach((el) => observer.observe(el!))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="why-hugo" style={{
      padding: "var(--section-pad) 0",
      background: "var(--color-dark)",
      color: "var(--color-white)",
    }}>
      <div className="container">
        <div className="why-hugo__layout" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "start",
        }}>
          <div className="why-hugo__left" ref={leftRef} data-reveal style={{
            position: "sticky",
            top: "6rem",
          }}>
            <span className="section-kicker section-kicker--light">Why Peak</span>
            <h2 className="why-hugo__title" style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              margin: "0 0 1.5rem",
              color: "var(--color-white)",
            }}>
              Why Austin Homeowners Choose Peak Roofing
            </h2>
            <p style={{
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 2rem",
            }}>
              We believe in doing the job right the first time. Every roof we install or repair
              comes with our commitment to quality, safety, and customer satisfaction.
            </p>
            <div className="why-hugo__cert" style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 18px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
            }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 8,
                background: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#fff",
              }}>
                A+
              </div>
              <div>
                <div style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.6)",
                }}>
                  BBB Rating
                </div>
                <div style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#fff",
                }}>
                  Accredited Since 2020
                </div>
              </div>
            </div>
          </div>

          <div className="why-hugo__right" ref={rightRef} style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}>
            {values.map((v) => (
              <div
                key={v.number}
                className="value-card"
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  padding: "1.75rem",
                  borderRadius: "var(--card-radius)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "background var(--transition-base), border-color var(--transition-base)",
                }}
              >
                <div className="value-card__number" style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "var(--color-primary)",
                  lineHeight: 1,
                  flexShrink: 0,
                  minWidth: "2.5rem",
                }}>
                  {v.number}
                </div>
                <div>
                  <h3 className="value-card__title" style={{
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    margin: "0 0 0.4rem",
                    color: "var(--color-white)",
                  }}>
                    {v.title}
                  </h3>
                  <p className="value-card__desc" style={{
                    fontSize: "0.92rem",
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.6)",
                    margin: 0,
                  }}>
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
