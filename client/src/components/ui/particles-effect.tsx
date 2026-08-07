import { useEffect, useRef } from "react";

interface ParticlesEffectProps {
  isActive: boolean;
  theme?: "gold" | "blue" | "green" | "mixed";
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

export default function ParticlesEffect({ isActive }: ParticlesEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; isInside: boolean }>({ x: 0, y: 0, isInside: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    // White and silver shades for a clean, premium look
    const getRandomColor = () => {
      const shades = [
        "255, 255, 255", // Pure White
        "240, 245, 255", // Bright Ice Blue/White
        "220, 225, 235", // Light Silver
      ];
      return shades[Math.floor(Math.random() * shades.length)];
    };

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect?.width || window.innerWidth;
      canvas.height = rect?.height || 500;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse coordinate over the parent hero container
    const parent = canvas.parentElement;
    const handleMouseMove = (e: MouseEvent) => {
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.isInside = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isInside = false;
    };

    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    // Initialize random particle vectors
    const createParticle = (x?: number, y?: number): Particle => {
      return {
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (isActive ? 2.0 : 1.0),
        vy: (Math.random() - 0.5) * (isActive ? 2.0 : 1.0),
        size: Math.random() * (isActive ? 4.5 : 2.5) + 1.5,
        color: getRandomColor(),
        alpha: Math.random() * 0.6 + 0.4,
        decay: Math.random() * 0.005 + 0.002,
      };
    };

    const getTargetCount = () => {
      const area = canvas.width * canvas.height;
      const density = isActive ? 7000 : 14000;
      const count = Math.floor(area / density);
      return Math.min(Math.max(count, isActive ? 60 : 30), isActive ? 150 : 80);
    };

    const targetCount = getTargetCount();
    for (let i = 0; i < targetCount; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentTargetCount = getTargetCount();
      if (particles.length < currentTargetCount && Math.random() < 0.3) {
        particles.push(createParticle());
      } else if (particles.length > currentTargetCount) {
        particles.pop();
      }

      // Emit extra trail particles if mouse is moving inside
      if (mouseRef.current.isInside && isActive && Math.random() < 0.4) {
        particles.push(createParticle(mouseRef.current.x, mouseRef.current.y));
      }

      // Draw connection lines between particles (network web)
      const connectDist = isActive ? 140 : 90;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectDist) {
            const alpha = (1 - dist / connectDist) * (isActive ? 0.35 : 0.18);
            ctx.strokeStyle = `rgba(${particles[i].color}, ${alpha})`;
            ctx.lineWidth = isActive ? 1.2 : 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw connection lines to mouse
      if (mouseRef.current.isInside) {
        const mouseConnectDist = isActive ? 180 : 120;
        for (let i = 0; i < particles.length; i++) {
          const dx = mouseRef.current.x - particles[i].x;
          const dy = mouseRef.current.y - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseConnectDist) {
            const alpha = (1 - dist / mouseConnectDist) * (isActive ? 0.45 : 0.25);
            ctx.strokeStyle = `rgba(${particles[i].color}, ${alpha})`;
            ctx.lineWidth = isActive ? 1.5 : 1.0;
            ctx.beginPath();
            ctx.moveTo(mouseRef.current.x, mouseRef.current.y);
            ctx.lineTo(particles[i].x, particles[i].y);
            ctx.stroke();
          }
        }
      }

      // Render updated positions and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap or bounce around bounds
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Magnet attraction vector adjustment
        if (mouseRef.current.isInside) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const forceDist = isActive ? 240 : 140;

          if (dist < forceDist) {
            const force = (forceDist - dist) / forceDist;
            const attraction = isActive ? 0.08 : 0.025;
            p.vx += (dx / dist) * force * attraction;
            p.vy += (dy / dist) * force * attraction;

            // Enforce max speed limits
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            const maxSpeed = isActive ? 4.0 : 2.0;
            if (speed > maxSpeed) {
              p.vx = (p.vx / speed) * maxSpeed;
              p.vy = (p.vy / speed) * maxSpeed;
            }
          }
        }

        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationId);
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-500"
      style={{ opacity: isActive ? 0.95 : 0.35 }}
    />
  );
}
