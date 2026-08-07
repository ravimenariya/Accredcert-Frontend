import React, { useEffect, useRef } from "react";

type WindmillProps = {
  degrees?: number;
  size?: number; // px
  corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

function clamp(v: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, v));
}

export default function Windmill({ degrees = 900, size = 160, corner = "top-right" }: WindmillProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let rafId: number | null = null;

    function update() {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const progress = total > 0 ? clamp(window.scrollY / total, 0, 1) : 0;
      const rotation = progress * degrees;
      svg.style.transform = `rotate(${rotation}deg)`;
      rafId = null;
    }

    function onScroll() {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [degrees]);

  // position classes
  const posClass: Record<string, string> = {
    "top-left": "top-6 left-6",
    "top-right": "top-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-right": "bottom-6 right-6",
  };

  return (
    <div className={`fixed z-50 ${posClass[corner]} pointer-events-none`} style={{ width: size, height: size }}>
      <svg
        id="pin-windmill-svg"
        ref={svgRef}
        width={size}
        height={size}
        viewBox="0 0 200 200"
        style={{ transition: "transform 0.08s linear", display: "block" }}
      >
        <defs>
          <linearGradient id="bladeGrad" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#3dd3ff" />
            <stop offset="55%" stopColor="#7ad3ff" />
            <stop offset="100%" stopColor="#f2b8f0" />
          </linearGradient>
          <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#000" floodOpacity="0.18" />
          </filter>
        </defs>

        <g transform="translate(100,100)" filter="url(#soft)">
          {/* center hub */}
          <circle r="10" fill="#0f1724" />

          {/* four petals similar to attached image */}
          <g>
            <path d="M0 0 C40 -40 80 -40 80 0 C80 40 40 40 0 0 Z" transform="rotate(45) translate(12,0)" fill="url(#bladeGrad)" rx="12" />
            <path d="M0 0 C40 -40 80 -40 80 0 C80 40 40 40 0 0 Z" transform="rotate(135) translate(12,0)" fill="url(#bladeGrad)" />
            <path d="M0 0 C40 -40 80 -40 80 0 C80 40 40 40 0 0 Z" transform="rotate(-45) translate(12,0)" fill="url(#bladeGrad)" />
            <path d="M0 0 C40 -40 80 -40 80 0 C80 40 40 40 0 0 Z" transform="rotate(-135) translate(12,0)" fill="url(#bladeGrad)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

