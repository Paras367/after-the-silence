'use client';

import { useState, useEffect, useRef } from 'react';

// Counter React state se chalta hai — direct DOM chhedna band.
export default function Stat({ target, suffix = "", label, source }: { target?: number; suffix?: string; label: string; source: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target === undefined || !ref.current) return;
    const el = ref.current;
    let raf = 0;
    const run = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setValue(target);
        return;
      }
      const start = performance.now();
      const dur = 1100;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { run(); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target]);

  return (
    <div className="stat" ref={ref}>
      <div className="num">{target === undefined ? "N/A" : value.toLocaleString('en-IN') + suffix}</div>
      <div className="lbl">{label}</div>
      <div className="src">{source}</div>
    </div>
  );
}
