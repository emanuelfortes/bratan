"use client";

import { useEffect } from "react";

/**
 * Entrada suave dos blocos conforme eles aparecem na tela.
 *
 * Lê `data-reveal` (fade-up, fade-down, fade-right, fade-left, zoom-in) e
 * `data-reveal-delay` (ms) direto no markup — os estilos ficam em globals.css.
 *
 * Usa IntersectionObserver em vez de medir a posição dos elementos no
 * carregamento: era isso que fazia a animação não disparar quando as fontes e
 * as fotos assentavam o layout depois e deixavam as medidas desatualizadas.
 */
export default function Reveal() {
  useEffect(() => {
    const alvos = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (!alvos.length) return;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      alvos.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const obs = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          const el = entrada.target as HTMLElement;
          const atraso = Number(el.dataset.revealDelay ?? 0);
          if (atraso > 0) el.style.transitionDelay = `${atraso}ms`;
          el.classList.add("is-in");
          obs.unobserve(el);
        }
      },
      // o bloco precisa entrar um pouco na tela antes de animar
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 }
    );

    alvos.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Sem JS os blocos ficariam invisíveis; aqui eles simplesmente aparecem.
  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: "<style>[data-reveal]{opacity:1;transform:none}</style>",
      }}
    />
  );
}
