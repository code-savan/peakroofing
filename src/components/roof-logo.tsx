export function RoofLogo({ color = "#fff", edgeColor }: { color?: string; edgeColor?: string }) {
  const edge = edgeColor || color
  return (
    <svg width="48" height="36" viewBox="0 0 96 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left small roof section */}
      <path d="M4 58 L16 32 L28 58" fill={color} opacity="0.9" />
      <path d="M16 32 L28 58 L28 62 L16 36 Z" fill={color} opacity="0.7" />
      <path d="M4 58 L16 32 L28 58" stroke={edge} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      {/* Left window */}
      <rect x="12" y="46" width="8" height="8" rx="1" fill="rgba(0,0,0,0.2)" />
      <line x1="16" y1="46" x2="16" y2="54" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <line x1="12" y1="50" x2="20" y2="50" stroke={color} strokeWidth="0.8" opacity="0.5" />
      {/* Left diagonal stripes */}
      <line x1="18" y1="36" x2="22" y2="44" stroke={edge} strokeWidth="1.2" opacity="0.35" />
      <line x1="21" y1="36" x2="25" y2="44" stroke={edge} strokeWidth="1.2" opacity="0.25" />

      {/* Center main roof peak */}
      <path d="M28 58 L48 12 L68 58" fill={color} />
      <path d="M48 12 L68 58 L68 62 L48 16 Z" fill={color} opacity="0.75" />
      <path d="M48 12 L28 58 L28 62 L48 16 Z" fill={color} opacity="0.85" />
      <path d="M28 58 L48 12 L68 58" stroke={edge} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      {/* Center window */}
      <rect x="41" y="38" width="14" height="14" rx="1.5" fill="rgba(0,0,0,0.2)" />
      <line x1="48" y1="38" x2="48" y2="52" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="41" y1="45" x2="55" y2="45" stroke={color} strokeWidth="1" opacity="0.5" />

      {/* Right small roof section */}
      <path d="M68 58 L80 32 L92 58" fill={color} opacity="0.9" />
      <path d="M80 32 L68 58 L68 62 L80 36 Z" fill={color} opacity="0.7" />
      <path d="M68 58 L80 32 L92 58" stroke={edge} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      {/* Right window */}
      <rect x="76" y="46" width="8" height="8" rx="1" fill="rgba(0,0,0,0.2)" />
      <line x1="80" y1="46" x2="80" y2="54" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <line x1="76" y1="50" x2="84" y2="50" stroke={color} strokeWidth="0.8" opacity="0.5" />
      {/* Right diagonal stripes */}
      <line x1="74" y1="36" x2="70" y2="44" stroke={edge} strokeWidth="1.2" opacity="0.35" />
      <line x1="71" y1="36" x2="67" y2="44" stroke={edge} strokeWidth="1.2" opacity="0.25" />

      {/* Base line */}
      <line x1="2" y1="60" x2="94" y2="60" stroke={edge} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}
