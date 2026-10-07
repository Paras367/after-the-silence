export default function HeroVisual() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 620" role="img" aria-label="Illustration of a public record document with three questions: what happened, what changed, what remains">
      <defs>
        <radialGradient id="glow"><stop offset="0" stopColor="#a51d29" stopOpacity=".55" /><stop offset="1" stopColor="#a51d29" stopOpacity="0" /></radialGradient>
        <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f1eee6" /><stop offset="1" stopColor="#c8c2b7" /></linearGradient>
      </defs>
      <rect width="460" height="620" fill="#0f0d0c" />
      <ellipse cx="230" cy="310" rx="220" ry="280" fill="url(#glow)" />
      <g transform="rotate(4 230 310)">
        <rect x="55" y="50" width="350" height="520" rx="4" fill="url(#paper)" />
        <path d="M345 50H405V110Z" fill="#aaa59f" />
        <text x="82" y="100" fill="#252525" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold">THE RECORD</text>
        <text x="82" y="120" fill="#666" fontFamily="Arial, sans-serif" fontSize="9" letterSpacing="2">PUBLIC INTEREST ARCHIVE</text>
        <line x1="82" y1="140" x2="378" y2="140" stroke="#333" strokeOpacity=".3" />
        <text x="82" y="185" fill="#333" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold">WHAT HAPPENED?</text>
        <rect x="82" y="202" width="240" height="6" rx="3" fill="#555" opacity=".5" />
        <rect x="82" y="218" width="280" height="6" rx="3" fill="#555" opacity=".3" />
        <text x="82" y="285" fill="#333" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold">WHAT CHANGED?</text>
        <rect x="82" y="302" width="270" height="6" rx="3" fill="#555" opacity=".4" />
        <rect x="82" y="318" width="210" height="6" rx="3" fill="#555" opacity=".3" />
        <text x="82" y="385" fill="#8d171f" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold">WHAT REMAINS?</text>
        <rect x="82" y="402" width="260" height="6" rx="3" fill="#8d171f" opacity=".4" />
        <rect x="82" y="418" width="180" height="6" rx="3" fill="#8d171f" opacity=".3" />
        <line x1="82" y1="500" x2="378" y2="500" stroke="#333" strokeOpacity=".25" />
        <text x="82" y="530" fill="#555" fontFamily="Arial, sans-serif" fontSize="10" letterSpacing="2">EVIDENCE · SOURCES · TIMELINE</text>
      </g>
    </svg>
  );
}
