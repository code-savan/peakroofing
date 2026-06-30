"use client"

import { useEffect, useRef, useState, useCallback } from "react"

const services = [
  {
    title: "Roofing",
    desc: "From complete replacements to storm damage repairs, our roofing team delivers durable, beautiful results using top-tier materials from GAF and Owens Corning.",
    image: "/job1.jpg",
    href: "/services/roofing",
  },
  {
    title: "Gutters",
    desc: "Seamless gutter installation, repair, and gutter guard systems that protect your foundation and keep water flowing where it should.",
    image: "/job6.jpg",
    href: "/services/gutters",
  },
  {
    title: "Siding",
    desc: "Premium siding installation and replacement that transforms your home's exterior with lasting durability and serious curb appeal.",
    image: "/job2.jpg",
    href: "/services/siding",
  },
]

export function Services() {
  const [active, setActive] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startAuto = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % services.length)
    }, 5000)
  }, [])

  const stopAuto = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    startAuto()
    return () => stopAuto()
  }, [startAuto, stopAuto])

  function goTo(idx: number) {
    stopAuto()
    setActive(idx)
    startAuto()
  }

  return (
    <section className="services" style={{
      padding: "0",
      background: "#0d0d0d",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Full-width sliding image container */}
      <div
        onMouseEnter={stopAuto}
        onMouseLeave={startAuto}
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Slideshow images */}
        {services.map((s, idx) => (
          <div
            key={s.title}
            style={{
              position: "absolute",
              inset: 0,
              opacity: active === idx ? 1 : 0,
              transition: "opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              zIndex: active === idx ? 1 : 0,
            }}
          >
            <img
              src={s.image}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ))}

        {/* Dark overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "linear-gradient(180deg, rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.5) 50%, rgba(13,13,13,0.85) 100%)",
        }} />

        {/* Arrows */}
        <button
          onClick={() => goTo((active - 1 + services.length) % services.length)}
          style={{
            position: "absolute",
            left: 24,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 4,
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.25)",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(6px)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)" }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.3)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() => goTo((active + 1) % services.length)}
          style={{
            position: "absolute",
            right: 24,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 4,
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.25)",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(6px)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)" }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.3)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Content wrapper */}
        <div className="container" style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          padding: "clamp(4rem, 8vw, 7rem) 1.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          {/* Heading with white bg */}
          <div style={{
            alignSelf: "flex-start",
            background: "#fff",
            borderRadius: 8,
            padding: "12px 24px",
            marginBottom: "2rem",
          }}>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#c8102e",
              marginBottom: 2,
            }}>
              Services
            </div>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 800,
              color: "#0d0d0d",
              margin: 0,
              lineHeight: 1.1,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}>
              Expert Craftsmanship for Your Home
            </h2>
          </div>

          {/* Animated service info */}
          <div style={{
            position: "relative",
            minHeight: 180,
          }}>
            {services.map((s, idx) => (
              <a
                key={s.title}
                href={s.href}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  opacity: active === idx ? 1 : 0,
                  transform: active === idx ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  pointerEvents: active === idx ? "auto" : "none",
                  textDecoration: "none",
                  color: "#fff",
                  maxWidth: 600,
                }}
              >
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.8)",
                  marginBottom: 14,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                  {s.title}
                </div>
                <p style={{
                  fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.7)",
                  margin: 0,
                  textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                }}>
                  {s.desc}
                </p>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 16,
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#fff",
                  opacity: 0.8,
                }}>
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* Dots */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: "2rem",
          }}>
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                style={{
                  width: active === idx ? 32 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: "none",
                  background: active === idx ? "#fff" : "rgba(255,255,255,0.25)",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  padding: 0,
                }}
              />
            ))}
            <span style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.35)",
              marginLeft: 4,
              fontFamily: "'Barlow Condensed', sans-serif",
              letterSpacing: "0.06em",
            }}>
              {String(active + 1).padStart(2, "0")}/{String(services.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
