"use client"

import { useState } from "react"

export function CTAContact() {
  const [formState, setFormState] = useState<"form" | "sending" | "success" | "error">("form")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState("sending")

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })

      if (response.ok) {
        setFormState("success")
      } else {
        throw new Error("Form submission failed")
      }
    } catch {
      setFormState("error")
    }
  }

  return (
    <section className="cta-contact" id="contact" style={{
      padding: "var(--section-pad) 0",
      background: "var(--color-dark)",
      color: "var(--color-white)",
    }}>
      <div className="container">
        <div className="cta-contact__layout" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "start",
        }}>
          <div className="cta-contact__text">
            <span className="section-kicker section-kicker--light">Get Started</span>
            <h2 className="cta-contact__title" style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              margin: "0 0 1.25rem",
              color: "var(--color-white)",
            }}>
              Ready to Protect Your Home?
            </h2>
            <p className="cta-contact__desc" style={{
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.65)",
              margin: "0 0 2rem",
              maxWidth: 420,
            }}>
              Whether you need a full roof replacement, storm damage repair, or just a free inspection,
              the Peak Roofing team is ready to help. Get a no-obligation quote today.
            </p>
            <a href="tel:+15125551234" className="cta-contact__phone" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--color-white)",
              textDecoration: "none",
              transition: "color var(--transition-base)",
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              (512) 555-1234
            </a>
          </div>

          <div className="cta-contact__form" style={{
            background: "var(--color-white)",
            borderRadius: "var(--card-radius)",
            padding: "2rem",
          }}>
            {formState === "form" || formState === "sending" ? (
              <form
                className="contact-form"
                action="https://formspree.io/f/your-form-id"
                method="POST"
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <input type="hidden" name="_subject" value="New Peak Roofing Website Lead" />
                <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label className="form-label" htmlFor="name" style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#161a1e",
                  }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Your full name"
                    required
                    autoComplete="name"
                    style={{
                      fontSize: 16,
                      padding: "12px 14px",
                      border: "1px solid rgba(0,0,0,0.15)",
                      borderRadius: 6,
                      background: "#fffffff2",
                      color: "#161a1e",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label className="form-label" htmlFor="email" style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#161a1e",
                  }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                    style={{
                      fontSize: 16,
                      padding: "12px 14px",
                      border: "1px solid rgba(0,0,0,0.15)",
                      borderRadius: 6,
                      background: "#fffffff2",
                      color: "#161a1e",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label className="form-label" htmlFor="phone" style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#161a1e",
                  }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder="(512) 555-1234"
                    autoComplete="tel"
                    style={{
                      fontSize: 16,
                      padding: "12px 14px",
                      border: "1px solid rgba(0,0,0,0.15)",
                      borderRadius: 6,
                      background: "#fffffff2",
                      color: "#161a1e",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label className="form-label" htmlFor="service" style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#161a1e",
                  }}>
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    defaultValue=""
                    className="form-select"
                    style={{
                      fontSize: 16,
                      padding: "12px 14px",
                      border: "1px solid rgba(0,0,0,0.15)",
                      borderRadius: 6,
                      background: "#fffffff2",
                      color: "#161a1e",
                      width: "100%",
                      boxSizing: "border-box",
                      appearance: "none",
                      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: 38,
                      cursor: "pointer",
                    }}
                  >
                    <option value="" disabled>Select a service...</option>
                    <option value="Roofing">Roofing</option>
                    <option value="Gutters">Gutters</option>
                    <option value="Siding">Siding</option>
                    <option value="Multiple Services">Multiple Services</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label className="form-label" htmlFor="message" style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#161a1e",
                  }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-input"
                    rows={4}
                    placeholder="Tell us about your project..."
                    style={{
                      fontSize: 16,
                      padding: "12px 14px",
                      border: "1px solid rgba(0,0,0,0.15)",
                      borderRadius: 6,
                      background: "#fffffff2",
                      color: "#161a1e",
                      width: "100%",
                      boxSizing: "border-box",
                      resize: "vertical",
                      minHeight: 100,
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="contact-form__submit"
                  disabled={formState === "sending"}
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    padding: "14px 28px",
                    background: "var(--color-primary)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    cursor: formState === "sending" ? "not-allowed" : "pointer",
                    width: "100%",
                    letterSpacing: "0.01em",
                    fontFamily: "inherit",
                    opacity: formState === "sending" ? 0.7 : 1,
                  }}
                >
                  {formState === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            ) : formState === "success" ? (
              <div className="contact-form__success" style={{
                textAlign: "center",
                padding: "2rem",
              }}>
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#c8102e" strokeWidth="2" style={{ margin: "0 auto 1rem", display: "block" }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p style={{ fontSize: "1rem", color: "#1a1a1a", margin: 0 }}>
                  Thank you for reaching out! A member of the Peak Roofing team will be in touch shortly.
                </p>
              </div>
            ) : (
              <div className="contact-form__error" style={{
                textAlign: "center",
                padding: "2rem",
              }}>
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#c8102e" strokeWidth="2" style={{ margin: "0 auto 1rem", display: "block" }}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <p style={{ fontSize: "1rem", color: "#1a1a1a", margin: "0 0 1rem" }}>
                  Something went wrong. Please try again or call us directly at (512) 555-1234.
                </p>
                <button
                  type="button"
                  onClick={() => setFormState("form")}
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    padding: "10px 24px",
                    background: "var(--color-primary)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
