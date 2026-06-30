"use client"

import { useEffect, useRef, useState } from "react"

export function Showreel() {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
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

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.currentTime = 0
            video.play().catch(() => {})
            setPlaying(true)
          } else {
            video.pause()
            setPlaying(false)
          }
        })
      },
      { threshold: 0.35 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <section className="showreel" style={{
      padding: "var(--section-pad) 0",
      background: "var(--color-dark)",
      overflow: "hidden",
    }}>
      <div className="container">
        <div className="showreel__layout" style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: "clamp(2rem, 5vw, 5rem)",
          alignItems: "center",
        }}>
          <div className="showreel__video-wrap" ref={sectionRef} data-reveal style={{
            position: "relative",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
            background: "#000",
          }}>
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="auto"
              webkit-playsinline="true"
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                display: "block",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={togglePlay}
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>
            {!playing && (
              <div onClick={togglePlay} style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                transition: "opacity 0.3s",
              }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))" }}>
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" fill="#fff" stroke="none" />
                </svg>
              </div>
            )}
          </div>

          <div className="showreel__content" data-reveal style={{
            color: "#fff",
          }}>
            <span className="section__kicker section__kicker--left" style={{
              display: "inline-block",
              textTransform: "uppercase",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: "#c8102e",
              marginBottom: "0.75rem",
            }}>
              See the Difference
            </span>
            <h2 className="showreel__title" style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              lineHeight: 1.08,
              color: "#fff",
              marginBottom: 20,
            }}>
              Precision. Every Shingle. Every Time.
            </h2>
            <p className="showreel__desc" style={{
              fontSize: "clamp(0.95rem, 1.2vw, 1.08rem)",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.75,
              marginBottom: 32,
              maxWidth: 440,
            }}>
              Watch how our crew transforms your roof from the ground up — with military precision
              and craftsmanship that speaks for itself.
            </p>
            <a href="/financing#inspection" className="btn btn--primary btn--large">
              Get Your Free Estimate
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
