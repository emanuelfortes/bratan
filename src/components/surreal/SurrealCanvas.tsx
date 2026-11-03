"use client";

import { useEffect, useRef } from "react";

/**
 * Fundo animado da home do Bratan, em duas camadas para a foto do topo poder ficar
 * entre elas:
 *  - "brilho": sol de caramelo líquido, luz do cursor e anéis de portal (atrás da foto)
 *  - "poeira": as faíscas subindo (na frente da foto)
 * "tudo" desenha as duas na mesma camada.
 */
export default function SurrealCanvas({
  intensity = 0.6,
  camada = "tudo",
  z = 0,
}: {
  intensity?: number;
  camada?: "tudo" | "brilho" | "poeira";
  z?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const temBrilho = camada !== "poeira";
    const temPoeira = camada !== "brilho";

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;

    const M = { x: -999, y: -999, px: 0, py: 0, sx: 0, sy: 0 };

    const resize = () => {
      w = innerWidth;
      h = innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const pm = (e: PointerEvent) => {
      M.x = e.clientX;
      M.y = e.clientY;
      M.px = e.clientX / w - 0.5;
      M.py = e.clientY / h - 0.5;
    };
    const pl = () => {
      M.x = -999;
      M.y = -999;
      M.px = 0;
      M.py = 0;
    };

    resize();
    addEventListener("resize", resize);
    addEventListener("pointermove", pm);
    document.addEventListener("pointerleave", pl);

    const mk = () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.3,
      vy: Math.random() * 0.25 + 0.05,
      vx: (Math.random() - 0.5) * 0.1,
      tw: Math.random() * 2 + 0.5,
      ph: Math.random() * 6,
    });
    const parts = temPoeira
      ? Array.from({ length: Math.round(160 * intensity) }, mk)
      : [];

    const blobs = [
      { rx: 0.28, ry: 60, sp: 0.00021, ph: 0, r: 0.55, c: "236,170,110" },
      { rx: 0.22, ry: 90, sp: 0.00017, ph: 2, r: 0.45, c: "245,200,150" },
      { rx: 0.35, ry: 50, sp: 0.00013, ph: 4, r: 0.6, c: "214,130,70" },
      { rx: 0.18, ry: 120, sp: 0.00025, ph: 1, r: 0.35, c: "255,236,210" },
    ];

    const loop = (t: number) => {
      const T = reduce ? 0 : t;
      M.sx += (M.px - M.sx) * 0.05;
      M.sy += (M.py - M.sy) * 0.05;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      if (temBrilho) {
        const base = Math.min(w, 700);

        // 1. Sol de ouro líquido
        for (const b of blobs) {
          const cx = w / 2 + Math.sin(T * b.sp + b.ph) * b.rx * base - M.sx * 60;
          const cy = h * 0.24 + Math.cos(T * b.sp * 1.3 + b.ph) * b.ry - M.sy * 40;
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.r * base);
          g.addColorStop(0, `rgba(${b.c},${0.22 * intensity + 0.06})`);
          g.addColorStop(1, `rgba(${b.c},0)`);
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, w, h);
        }

        // 2. Luz do cursor
        if (M.x > -900) {
          const lg = ctx.createRadialGradient(M.x, M.y, 0, M.x, M.y, 180);
          lg.addColorStop(0, `rgba(236,160,100,${0.12 * intensity + 0.04})`);
          lg.addColorStop(1, "rgba(236,160,100,0)");
          ctx.fillStyle = lg;
          ctx.fillRect(M.x - 180, M.y - 180, 360, 360);
        }

        // 3. Anéis de portal
        const hy = h * 0.82;
        const maxR = Math.max(w, 600) * 0.9;
        for (let i = 0; i < 5; i++) {
          const r = (T * 0.02 + (i * maxR) / 5) % maxR;
          ctx.beginPath();
          ctx.ellipse(w / 2, hy, r, r * 0.16, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(200,105,46,${(1 - r / maxR) * 0.35 * intensity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // 4. Poeira dourada
      for (const q of parts) {
        if (!reduce) {
          q.y -= (q.vy / h) * 1.6;
          q.x += q.vx / w + Math.sin(T * 0.0006 + q.ph) * 0.00012;
        }
        if (q.y < -0.02) {
          q.y = 1.02;
          q.x = Math.random();
        }
        if (M.x > -900) {
          const dx = q.x * w - M.x;
          const dy = q.y * h - M.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14400) {
            const f = (1 - Math.sqrt(d2) / 120) * 0.032;
            q.x += (dx / w) * f;
            q.y += (dy / h) * f;
          }
        }
        const a = (0.25 + 0.75 * Math.abs(Math.sin(T * 0.001 * q.tw + q.ph))) * 0.9;
        {
          ctx.beginPath();
          ctx.arc(q.x * w, q.y * h, q.r, 0, 6.283);
          ctx.fillStyle = `rgba(${200 + ((q.r * 20) | 0)},${105 + ((q.r * 20) | 0)},46,${a * 0.6})`;
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    // Não queima bateria com a aba em segundo plano
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", pm);
      document.removeEventListener("pointerleave", pl);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [intensity, camada]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: z,
      }}
    />
  );
}

