import React, { useRef, useEffect } from "react";

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
  range?: number;
}

export default function Magnetic({ children, strength = 0.25, range = 60 }: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < range) {
        // Translate child slightly towards cursor position
        const x = dx * strength;
        const y = dy * strength;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        el.style.transition = "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)";
      } else {
        // Smoothly snap back to center
        el.style.transform = "translate3d(0, 0, 0)";
        el.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
      }
    };

    const handleMouseLeave = () => {
      el.style.transform = "translate3d(0, 0, 0)";
      el.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
    };

    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, range]);

  return React.cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      ref.current = node;
      // Safely preserve any pre-existing ref attached to the child
      const { ref: originalRef } = children as any;
      if (typeof originalRef === "function") {
        originalRef(node);
      } else if (originalRef) {
        originalRef.current = node;
      }
    },
  });
}
