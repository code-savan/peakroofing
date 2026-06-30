"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { RoofLogo } from "@/components/roof-logo"

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  const navLinks = [
    { label: "SERVICES", href: "#services" },
    { label: "WHY US", href: "#why-us" },
    { label: "GALLERY", href: "#gallery" },
    { label: "CONTACT", href: "#contact" },
  ]

  return (
    <header
      id="site-header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? "0.75rem 0" : "1.25rem 0",
        background: scrolled ? "rgba(0,0,0,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {/* Left — Logo */}
        <a href="#hero" style={{ textDecoration: "none", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ position: "relative", width: 42, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="42" height="34" viewBox="0 0 42 34" fill="none" style={{ position: "absolute", top: 0, left: 0 }}>
                <path
                  d="M21 2 C28 1.5, 36 4.5, 39 10 C41 15, 40.5 21, 38 26 C35.5 31, 29.5 33, 22 33.5 C14.5 34, 8 31.5, 4.5 27 C1.5 22.5, 1.5 17, 3 12.5 C5 7, 11 2.5, 21 2"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1.3"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="90 6"
                />
              </svg>
              <RoofLogo color="#fff" edgeColor="#fff" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0 }}>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}>PEAK</span>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                lineHeight: 1,
                marginTop: 2,
              }}>ROOFING</span>
            </div>
          </div>
        </a>

        {/* Center — Nav Links */}
        <nav className="header__nav-desktop" style={{
          display: "flex",
          alignItems: "center",
          gap: "2.5rem",
        }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                transition: "color 0.2s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#fff" }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right — Socials + CTA */}
        <div className="header__cta-desktop" style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexShrink: 0 }}>
          <div className="header__socials-desktop" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <a href="#" aria-label="Facebook" style={{ color: "rgba(255,255,255,0.7)", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            <a href="#" aria-label="Instagram" style={{ color: "rgba(255,255,255,0.7)", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
          </div>
          <a
            href="#contact"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#000",
              textDecoration: "none",
              padding: "0.65rem 1.5rem",
              background: "#fff",
              borderRadius: 4,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = "#c8102e"
              el.style.color = "#fff"
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = "#fff"
              el.style.color = "#000"
            }}
          >
            FREE INSPECTION
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="header__burger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        aria-hidden={!open}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: "100vh",
          background: "#000",
          zIndex: 60,
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem 2rem",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Mobile nav top bar with logo + close */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <a href="#hero" onClick={() => setOpen(false)} style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div style={{ position: "relative", width: 36, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="36" height="28" viewBox="0 0 42 34" fill="none" style={{ position: "absolute", top: 0, left: 0 }}>
                  <path d="M21 2 C28 1.5, 36 4.5, 39 10 C41 15, 40.5 21, 38 26 C35.5 31, 29.5 33, 22 33.5 C14.5 34, 8 31.5, 4.5 27 C1.5 22.5, 1.5 17, 3 12.5 C5 7, 11 2.5, 21 2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeDasharray="90 6" />
                </svg>
                <RoofLogo color="#fff" edgeColor="#fff" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0 }}>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "#fff", letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1 }}>PEAK</span>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.65rem", fontWeight: 500, color: "rgba(255,255,255,0.6)", letterSpacing: "0.25em", textTransform: "uppercase", lineHeight: 1, marginTop: 2 }}>ROOFING</span>
              </div>
            </div>
          </a>
          <button onClick={() => setOpen(false)} aria-label="Close menu" style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
            <X size={28} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "3rem", flex: 1, justifyContent: "center", alignItems: "center" }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                color: "#fff",
                fontSize: "1.75rem",
                fontWeight: 700,
                textDecoration: "none",
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textAlign: "center",
                transition: "opacity 0.2s",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#fff",
              textDecoration: "none",
              padding: "0.85rem 2.5rem",
              background: "#0d0d0d",
              border: "1.5px solid rgba(255,255,255,0.25)",
              borderRadius: 4,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              width: "100%",
              maxWidth: 280,
              textAlign: "center",
            }}
          >
            FREE INSPECTION
          </a>
          <a href="tel:+15125551234" style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", textDecoration: "none" }}>
            (512) 555-1234
          </a>
          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
            <a href="#" aria-label="Facebook" style={{ color: "rgba(255,255,255,0.5)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            <a href="#" aria-label="Instagram" style={{ color: "rgba(255,255,255,0.5)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
