"use client"

const testimonials = [
  {
    quote: "Peak Roofing replaced our entire roof after a storm. They were professional, fast, and the quality is outstanding. Highly recommend!",
    name: "Sarah M.",
    role: "Oakwood Heights",
  },
  {
    quote: "Had a leak that three other companies couldn't fix. Peak found the issue immediately and had it repaired the same day. True pros.",
    name: "James R.",
    role: "Maple Ridge",
  },
  {
    quote: "From the free estimate to the final walkthrough, everything was seamless. Our new roof looks amazing and the crew was incredibly tidy.",
    name: "Linda K.",
    role: "Cedar Park",
  },
  {
    quote: "They installed new gutters and gutter guards for us. The difference in water management is night and day. Great work!",
    name: "Michael T.",
    role: "Worthington",
  },
  {
    quote: "Peak Roofing did an excellent job on our siding replacement. The transformation is incredible. Fair pricing and great communication.",
    name: "Patricia L.",
    role: "Dublin",
  },
  {
    quote: "After getting multiple quotes, Peak offered the best value. They finished ahead of schedule and left the property spotless.",
    name: "Robert H.",
    role: "Upper Arlington",
  },
  {
    quote: "Peak Roofing replaced our entire roof after a storm. They were professional, fast, and the quality is outstanding. Highly recommend!",
    name: "Sarah M.",
    role: "Oakwood Heights",
  },
  {
    quote: "Had a leak that three other companies couldn't fix. Peak found the issue immediately and had it repaired the same day. True pros.",
    name: "James R.",
    role: "Maple Ridge",
  },
  {
    quote: "From the free estimate to the final walkthrough, everything was seamless. Our new roof looks amazing and the crew was incredibly tidy.",
    name: "Linda K.",
    role: "Cedar Park",
  },
  {
    quote: "They installed new gutters and gutter guards for us. The difference in water management is night and day. Great work!",
    name: "Michael T.",
    role: "Worthington",
  },
]

export function Testimonials() {
  return (
    <section className="testimonials" style={{
      padding: "var(--section-pad) 0",
      background: "var(--color-white)",
      overflow: "hidden",
    }}>
      <div className="container">
        <div className="section-header">
          <span className="section-kicker">Testimonials</span>
          <h2 className="section-title">Hear from Our Homeowners</h2>
        </div>

        <div className="testimonials__carousel" style={{
          overflow: "hidden",
          width: "100%",
          maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}>
          <div className="testimonials__track" style={{
            display: "flex",
            gap: "1.5rem",
            width: "max-content",
            animation: "testimonial-scroll 60s linear infinite",
          }}>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="testimonial-card"
                style={{
                  flex: "0 0 340px",
                  background: "var(--color-white)",
                  border: "1px solid var(--color-gray-100)",
                  borderRadius: "var(--card-radius)",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  transition: "box-shadow var(--transition-base)",
                }}
              >
                <div className="testimonial-card__stars" style={{ display: "flex", gap: 2 }}>
                  {Array.from({ length: 5 }).map((_, si) => (
                    <svg key={si} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="testimonial-card__quote" style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  color: "var(--color-text)",
                  margin: 0,
                  flex: 1,
                  fontStyle: "italic",
                }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="testimonial-card__author" style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.15rem",
                  borderTop: "1px solid var(--color-gray-100)",
                  paddingTop: "1rem",
                }}>
                  <span className="testimonial-card__name" style={{
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: "var(--color-text)",
                  }}>
                    {t.name}
                  </span>
                  <span className="testimonial-card__role" style={{
                    fontSize: "0.8rem",
                    color: "var(--color-text-muted)",
                  }}>
                    {t.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonials__cta" style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2.5rem",
        }}>
          <a href="#" className="btn--google">
            <svg className="google-icon" width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
            </svg>
            Read All Google Reviews
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes testimonial-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .testimonials__track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
