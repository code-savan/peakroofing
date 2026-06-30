"use client"

export function Hero() {
  return (
    <section id="hero" className="hero" style={{
      position: "relative",
      height: "var(--hero-height)",
      minHeight: 600,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-start",
      overflow: "hidden",
      background: "#000",
    }}>
      <div className="hero__media" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          webkit-playsinline="true"
          x5-video-player-type="h5-page"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            minWidth: "100%",
            minHeight: "100%",
            width: "auto",
            height: "auto",
            transform: "translate(-50%, -50%)",
            objectFit: "cover",
          }}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="hero__overlay" style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.75) 80%, rgba(0,0,0,0.9) 100%)",
      }} />

      <div className="hero__content" style={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
        padding: "0 1.5rem 5rem",
        maxWidth: 700,
        marginLeft: "calc((100vw - 1200px) / 2)",
      }}>
        <div className="hero__logo" style={{
          animation: "fadeInScale 1.2s cubic-bezier(0.16,1,0.3,1) both",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginBottom: "1rem",
        }}>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 700,
            lineHeight: 0.9,
            color: "#fff",
            margin: 0,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}>
            PEAK
          </h1>
          <div style={{
            fontSize: "clamp(1rem, 2.5vw, 2rem)",
            fontWeight: 500,
            letterSpacing: "0.5em",
            color: "#fff",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            fontFamily: "'Barlow Condensed', sans-serif",
            textTransform: "uppercase",
            marginTop: "5px",
          }}>
            ROOFING
          </div>
        </div>

        <p style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.7)",
          margin: "0 0 1.5rem",
          maxWidth: 420,
        }}>
          Premium roofing, gutters, and siding solutions for Austin homeowners. Quality craftsmanship you can trust.
        </p>

        <div style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}>
          <a
            href="#contact"
            className="hero__cta-ghost"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(0.7rem, 1vw, 0.85rem)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#fff",
              padding: "14px 32px",
              border: "1.5px solid rgba(255,255,255,0.4)",
              borderRadius: 4,
              background: "transparent",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              textDecoration: "none",
              animation: "fadeInUp 1s ease-out 0.5s both",
            }}
          >
            GET A FREE INSPECTION
          </a>
          <a
            href="tel:+15125551234"
            className="hero__cta-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(0.7rem, 1vw, 0.85rem)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#000",
              padding: "14px 32px",
              border: "1.5px solid #fff",
              borderRadius: 4,
              background: "#fff",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              textDecoration: "none",
              animation: "fadeInUp 1s ease-out 0.6s both",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              <path d="M14.5 2c.5 2.5 2 4.5 4 6.5" strokeLinecap="round" />
            </svg>
            (512) 555-1234
          </a>
        </div>
      </div>

      <div className="hero__scroll-indicator" style={{
        position: "absolute",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        color: "rgba(255,255,255,0.5)",
      }}>
        <span style={{
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.25em",
          fontWeight: 500,
          fontFamily: "'Barlow Condensed', sans-serif",
        }}>
          SCROLL
        </span>
        <svg className="hero__scroll-arrow" width="20" height="30" viewBox="0 0 20 30" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ animation: "bounceDown 2s ease-in-out infinite" }}>
          <rect x="1" y="1" width="18" height="28" rx="9" />
          <circle cx="10" cy="9" r="2" fill="currentColor" opacity="0.6">
            <animate attributeName="cy" values="8;16;8" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .hero__cta-ghost:hover {
          background: rgba(255,255,255,0.1) !important;
          border-color: rgba(255,255,255,0.7) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3) !important;
          text-decoration: none !important;
        }
        .hero__cta-primary:hover {
          background: rgba(255,255,255,0.9) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 32px rgba(255,255,255,0.2) !important;
          text-decoration: none !important;
        }
      `}</style>
    </section>
  )
}
