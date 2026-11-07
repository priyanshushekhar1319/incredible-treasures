"use client";

import React, { useEffect, useRef } from "react";

interface Props {
  active: boolean;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
  gravity: number;
  flicker: boolean;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  speed: number;
  color: string;
  trail: Array<{ x: number; y: number; alpha: number }>;
}

const FESTIVE_PALETTES = [
  ["#FFD700", "#FFA500", "#FF4500", "#FFF8DC", "#FFEC8B"], // Royal 24K Gold & Saffron
  ["#FF1493", "#FF69B4", "#FFD700", "#00FFFF", "#FFFFFF"], // Festive Celebration Neon Spark
  ["#00FF7F", "#32CD32", "#FFD700", "#FFA07A", "#FFFFFF"], // Emerald & Golden Embers
  ["#E60000", "#FF4500", "#FFD700", "#FFF0F5", "#FF8C00"], // Diwali Patakha Crimson & Gold
];

export const CelebrationCrackersEffect: React.FC<Props> = ({ active, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width && entry.contentRect.height) {
          width = canvas.width = entry.contentRect.width;
          height = canvas.height = entry.contentRect.height;
        }
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];

    const spawnExplosion = (x: number, y: number, colorSet?: string[]) => {
      const palette = colorSet || FESTIVE_PALETTES[Math.floor(Math.random() * FESTIVE_PALETTES.length)];
      const count = 45 + Math.floor(Math.random() * 35);

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const velocity = 2.5 + Math.random() * 6.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          alpha: 1,
          color: palette[Math.floor(Math.random() * palette.length)],
          size: 2 + Math.random() * 2.5,
          decay: 0.012 + Math.random() * 0.018,
          gravity: 0.09,
          flicker: Math.random() > 0.4,
        });
      }

      // Sparkler micro-burst (Phooljhadi sparkle effect)
      for (let j = 0; j < 25; j++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 2.2;
        particles.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          alpha: 1,
          color: "#FFFFFF",
          size: 1 + Math.random() * 1.5,
          decay: 0.02 + Math.random() * 0.03,
          gravity: 0.04,
          flicker: true,
        });
      }
    };

    const launchRocket = (startX?: number) => {
      const x = startX !== undefined ? startX : width * 0.15 + Math.random() * (width * 0.7);
      const targetY = height * 0.15 + Math.random() * (height * 0.45);
      rockets.push({
        x,
        y: height + 10,
        targetY,
        speed: 7 + Math.random() * 4,
        color: "#FFE57F",
        trail: [],
      });
    };

    // Initial celebratory bursts
    setTimeout(() => {
      spawnExplosion(width * 0.3, height * 0.35);
      spawnExplosion(width * 0.7, height * 0.28);
    }, 200);

    let lastLaunch = Date.now();

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Random rocket launches
      const now = Date.now();
      if (now - lastLaunch > 900 + Math.random() * 1200 && rockets.length < 4) {
        launchRocket();
        lastLaunch = now;
      }

      // Update & draw rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y, alpha: 1 });
        if (r.trail.length > 8) r.trail.shift();

        // Draw trail
        for (let t = 0; t < r.trail.length; t++) {
          const pt = r.trail[t];
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 215, 0, ${(t / r.trail.length) * 0.8})`;
          ctx.fill();
        }

        r.y -= r.speed;

        // Draw rocket head
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowColor = "#FFD700";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Explode upon reaching target altitude
        if (r.y <= r.targetY) {
          spawnExplosion(r.x, r.y);
          rockets.splice(i, 1);
        }
      }

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.985;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const currentAlpha = p.flicker && Math.random() > 0.4 ? p.alpha * 0.4 : p.alpha;
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, currentAlpha);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    // Interactive cracker burst on click/tap
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      spawnExplosion(clickX, clickY);
    };

    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("click", handleCanvasClick);
      ctx.clearRect(0, 0, width, height);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none z-15 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-auto cursor-pointer"
        title="Festive Diwali Firecrackers & Celebratory Sparklers FX"
      />
      {/* Decorative Golden Sparkle Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/30" />
    </div>
  );
};

