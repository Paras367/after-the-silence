'use client';

import { useEffect, useState, useCallback } from 'react';

export default function BackToTop() {
  const [showTop, setShowTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    setShowTop(scrollTop > 700);
    setScrollProgress(Math.min(progress, 100));
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG circle calculations
  const size = 56;
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  if (!showTop) return null;

  return (
    <>
      <style>{CSS}</style>
      <button 
        className="archive-back-to-top" 
        aria-label="Back to top of archive"
        title="Return to archive index"
        onClick={scrollToTop}
      >
        <svg 
          className="progress-ring" 
          width={size} 
          height={size}
          aria-hidden="true"
        >
          {/* Background circle */}
          <circle
            className="progress-ring-bg"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            className="progress-ring-fill"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <span className="back-top-icon" aria-hidden="true">↑</span>
        <span className="back-top-tooltip">Return to top</span>
      </button>
    </>
  );
}

const CSS = `
.archive-back-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 60;
  width: 56px;
  height: 56px;
  background: var(--ink-soft, #1c1917);
  border: 1px solid var(--rule, #3c3733);
  color: var(--paper, #ece5d8);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono, monospace);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: archive-fade-in 0.4s ease-out;
  padding: 0;
  overflow: visible;
}

.archive-root.light .archive-back-to-top {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
  color: var(--ink-soft, #1c1917);
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.archive-back-to-top:hover {
  background: var(--crimson, #8f2f2c);
  border-color: var(--crimson, #8f2f2c);
  color: #fff;
  transform: translateY(-2px);
}

.archive-root.light .archive-back-to-top:hover {
  background: var(--crimson, #8f2f2c);
  color: #fff;
  box-shadow: 0 6px 24px rgba(143, 47, 44, 0.25);
}

.archive-back-to-top:focus-visible {
  outline: 2px solid var(--gold, #a9873f);
  outline-offset: 3px;
}

.progress-ring {
  position: absolute;
  top: -1px;
  left: -1px;
  pointer-events: none;
}

.progress-ring-bg {
  stroke: var(--rule, #3c3733);
  opacity: 0.3;
}

.archive-root.light .progress-ring-bg {
  stroke: var(--lp-rule, #d3cabb);
}

.progress-ring-fill {
  stroke: var(--gold, #a9873f);
  transition: stroke-dashoffset 0.15s ease-out;
}

.archive-back-to-top:hover .progress-ring-fill {
  stroke: #fff;
}

.back-top-icon {
  font-size: 1.2rem;
  line-height: 1;
  font-weight: 600;
  position: relative;
  z-index: 2;
  transition: transform 0.2s;
}

.archive-back-to-top:hover .back-top-icon {
  transform: translateY(-2px);
}

.back-top-tooltip {
  position: absolute;
  right: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--paper, #ece5d8);
  background: var(--ink, #131110);
  border: 1px solid var(--rule, #3c3733);
  padding: 6px 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s, transform 0.2s;
}

.archive-root.light .back-top-tooltip {
  background: var(--ink-soft, #1c1917);
  color: var(--paper, #ece5d8);
  border-color: var(--rule, #3c3733);
}

.archive-back-to-top:hover .back-top-tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(-4px);
}

@keyframes archive-fade-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .archive-back-to-top {
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
  }
  .back-top-tooltip {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .archive-back-to-top {
    animation: none;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
  }
  .progress-ring-fill {
    transition: none;
  }
  .back-top-icon,
  .back-top-tooltip {
    transition: none;
  }
}
`;