"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties, type PointerEvent } from "react";
import SurrealCanvas from "./SurrealCanvas";
import { links, perfil, redes, type IconeRede } from "@/data/bratan";

const PASSO = 90; // ms entre os itens da entrada
const DURACAO = 900; // ms de cada item
const easeOutCubic = (p: number) => 1 - (1 - p) ** 3;

/** Grupos da entrada do topo: 2 nome+bio+@. Cards entram ao aparecer na tela. */
const atraso = (grupo: number) => ({ "--d": `${grupo * PASSO}ms` } as CSSProperties);

/** Estado de animação de cada card, guardado fora do React (muda a cada frame). */
type EstadoCard = {
  x: number; // rotação atual (tilt)
  y: number;
  alvoX: number;
  alvoY: number;
  inicio: number; // quando a entrada começou (NaN = ainda não apareceu)
};

const novoEstado = (): EstadoCard => ({ x: 0, y: 0, alvoX: 0, alvoY: 0, inicio: NaN });

export default function SurrealHub() {
  const nome = useRef<HTMLHeadingElement>(null);
  const cards = useRef<(HTMLAnchorElement | null)[]>([]);
  const estados = useRef<EstadoCard[]>([]);
  const podeHover = useRef(false);

  // Criado sob demanda: se a lista de links mudar (ou o hot reload preservar
  // um array antigo e menor), nenhum card fica sem estado.
  const estadoDe = (i: number) => (estados.current[i] ??= novoEstado());

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    podeHover.current = matchMedia("(hover: hover)").matches;

    const montagem = performance.now();
    let ultimaEntrada = 0;
    let raf = 0;
    let focado = -1;

    // --- Entrada: cada card anima quando entra na tela, em sequência ---
    const io = new IntersectionObserver(
      (entradas) => {
        const agora = performance.now();
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          const i = cards.current.indexOf(e.target as HTMLAnchorElement);
          if (i < 0) continue;
          const st = estadoDe(i);
          if (!Number.isNaN(st.inicio)) continue;
          // espera o topo (nome) entrar e escalona os cards que aparecem juntos
          st.inicio = Math.max(agora, montagem + 3 * PASSO, ultimaEntrada + PASSO);
          ultimaEntrada = st.inicio;
          io.unobserve(e.target);
        }
      },
      { threshold: 0.12 }
    );
    cards.current.forEach((el) => el && io.observe(el));

    const loop = () => {
      const agora = performance.now();
      const s = reduce ? 0 : agora / 1000;
      const vh = innerHeight;

      // --- Nome: brilho percorrendo o gradiente ---
      if (nome.current) {
        nome.current.style.backgroundPosition = `${((s * 12) % 100) * 1.5}% 0`;
      }

      let maisPerto = -1;
      let menorDist = Infinity;

      for (let i = 0; i < cards.current.length; i++) {
        const el = cards.current[i];
        if (!el) continue;
        const st = estadoDe(i);

        // No touch não há hover: o scroll faz o papel do mouse.
        // A posição do card na tela inclina o card e move a foto (parallax).
        if (!podeHover.current) {
          const r = el.getBoundingClientRect();
          const centro = r.top + r.height / 2;
          const rel = Math.max(-1, Math.min(1, (centro - vh / 2) / (vh / 2)));
          if (!reduce) {
            st.alvoX = rel * -7;
            el.style.setProperty("--my", String(rel * 0.6));
          }
          const dist = Math.abs(centro - vh * 0.5);
          if (dist < menorDist && r.bottom > 0 && r.top < vh) {
            menorDist = dist;
            maisPerto = i;
          }
        }

        st.x += (st.alvoX - st.x) * 0.1;
        st.y += (st.alvoY - st.y) * 0.1;

        const p = reduce
          ? 1
          : Number.isNaN(st.inicio)
            ? 0
            : Math.min(1, Math.max(0, (agora - st.inicio) / DURACAO));
        const e = easeOutCubic(p);

        const flutua = Math.sin(s * 0.9 + i * 1.4) * 3 * e;
        const y = (1 - e) * 40 + flutua;
        const rx = (1 - e) * 22 + st.x;

        el.style.opacity = String(e);
        el.style.filter = e < 1 ? `blur(${(1 - e) * 8}px)` : "";
        el.style.transform = `translateY(${y}px) rotateX(${rx}deg) rotateY(${st.y}deg)`;

        // aura pulsando só no card em destaque
        if (links[i]?.destaque && !reduce) {
          const pulso = Math.sin(s * 1.6);
          el.style.boxShadow = `0 22px 44px -22px rgba(42,24,16,.7), 0 0 ${
            46 + pulso * 18
          }px -10px rgba(200,105,46,${0.45 + pulso * 0.15})`;
        }
      }

      // celular: o card no meio da tela "acende" como se estivesse no hover
      if (!podeHover.current && maisPerto !== focado) {
        if (focado >= 0) cards.current[focado]?.classList.remove("is-focus");
        if (maisPerto >= 0) cards.current[maisPerto]?.classList.add("is-focus");
        focado = maisPerto;
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

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
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const moverPonteiro = (i: number, ev: PointerEvent<HTMLAnchorElement>) => {
    if (!podeHover.current) return;
    const r = ev.currentTarget.getBoundingClientRect();
    const px = (ev.clientX - r.left) / r.width;
    const py = (ev.clientY - r.top) / r.height;
    const st = estadoDe(i);
    st.alvoX = (py - 0.5) * -10;
    st.alvoY = (px - 0.5) * 12;
    const css = ev.currentTarget.style;
    css.setProperty("--spx", `${px * 100}%`);
    css.setProperty("--spy", `${py * 100}%`);
    css.setProperty("--mx", String(px - 0.5));
    css.setProperty("--my", String(py - 0.5));
  };

  const sairPonteiro = (i: number, ev: PointerEvent<HTMLAnchorElement>) => {
    if (!podeHover.current) return;
    const st = estadoDe(i);
    st.alvoX = 0;
    st.alvoY = 0;
    ev.currentTarget.style.setProperty("--mx", "0");
    ev.currentTarget.style.setProperty("--my", "0");
  };

  // Onda que se espalha a partir do ponto tocado
  const ondinha = (ev: PointerEvent<HTMLAnchorElement>) => {
    const card = ev.currentTarget;
    const r = card.getBoundingClientRect();
    const onda = document.createElement("span");
    onda.className = "surreal-ripple";
    onda.style.left = `${ev.clientX - r.left}px`;
    onda.style.top = `${ev.clientY - r.top}px`;
    card.appendChild(onda);
    onda.addEventListener("animationend", () => onda.remove());
  };

  return (
    <div className="surreal">
      {/* Os cards entram animados a partir de opacity 0; sem JS, mostra tudo */}
      <noscript
        dangerouslySetInnerHTML={{
          __html:
            "<style>.surreal-card{opacity:1!important;filter:none!important}.surreal-enter{opacity:1!important;animation:none!important}</style>",
        }}
      />
      <div className="surreal-backdrop" aria-hidden="true" />
      <div className="surreal-hero" aria-hidden="true">
        <Image src={perfil.foto} alt="" fill priority sizes="(max-width: 520px) 100vw, 460px" />
      </div>
      {/* brilho atrás da foto */}
      <SurrealCanvas intensity={0.35} camada="brilho" z={0} />
      {/* faíscas por cima da foto */}
      <SurrealCanvas intensity={0.32} camada="poeira" z={1} />
      <div className="surreal-fade" aria-hidden="true" />

      <main className="surreal-main">
        {/* Espaço da foto que sangra no topo */}
        <div className="surreal-hero-spacer" aria-hidden="true" />

        {/* Nome e bio */}
        <div className="surreal-enter flex flex-col items-center" style={atraso(2)}>
          <p className="surreal-label">{perfil.apelido}</p>
          <h1 className="surreal-name" ref={nome}>
            {perfil.nome}
          </h1>
          <p className="surreal-desc">{perfil.bio}</p>
        </div>

        {/* @ do perfil, abaixo da bio (no topo ficava em cima da cabeça do Bratan) */}
        <div className="surreal-top surreal-enter" style={atraso(2)}>
          <span className="surreal-handle">
            <PataIcon />
            {perfil.usuario}
          </span>
        </div>

        {/* Cards */}
        <nav className="surreal-cards" aria-label="Links do Bratan">
          {links.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => {
                cards.current[i] = el;
              }}
              className={`surreal-card ${
                item.destaque ? "surreal-card--hero" : "surreal-card--normal"
              }`}
              style={{ opacity: 0 }}
              onPointerMove={(ev) => moverPonteiro(i, ev)}
              onPointerLeave={(ev) => sairPonteiro(i, ev)}
              onPointerDown={ondinha}
            >
              {/* Foto grande à direita, dissolvendo no card */}
              <span className="surreal-card-photo" aria-hidden="true">
                <Image src={item.imagem} alt="" fill sizes="(max-width: 480px) 60vw, 280px" />
              </span>
              <span className="surreal-card-veil" aria-hidden="true" />
              <span className="surreal-spot" aria-hidden="true" />
              <span
                className={`surreal-glint ${item.destaque ? "surreal-glint--loop" : ""}`}
                aria-hidden="true"
              />
              <span className="surreal-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="surreal-card-body">
                <span className="surreal-card-meta">
                  <span
                    className={`surreal-badge ${
                      item.destaque ? "surreal-badge--hero" : "surreal-badge--normal"
                    }`}
                  >
                    {item.icone && <RedeIcon rede={item.icone} size={11} />}
                    {item.etiqueta}
                  </span>
                  {item.extra && <span className="surreal-extra">{item.extra}</span>}
                </span>
                <span className="surreal-card-title block">{item.titulo}</span>
                <span className="surreal-card-desc block">{item.descricao}</span>
                <span
                  className={`surreal-cta ${
                    item.destaque ? "surreal-cta--hero" : "surreal-cta--normal"
                  }`}
                >
                  {item.acao}
                  <span className="surreal-cta-arrow" aria-hidden="true">
                    <SetaIcon />
                  </span>
                </span>
              </span>
            </a>
          ))}
        </nav>

        {/* Rodapé */}
        <div className="surreal-enter flex flex-col items-center w-full" style={atraso(4)}>
          <div className="surreal-divider" aria-hidden="true" />

          <div className="surreal-socials">
            {redes.map((r) => (
              <a
                key={r.nome}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="surreal-pill"
                aria-label={`${r.nome} do Bratan`}
              >
                <RedeIcon rede={r.icone} size={16} />
                <span className="surreal-pill-text">{r.nome}</span>
              </a>
            ))}
          </div>

          <p className="surreal-signature">
            <PataIcon /> aprovado pelo Bratan
          </p>
          <p className="surreal-copy">© {new Date().getFullYear()} Bratan Pit Monster</p>
          <a
            href="https://fortesdev.com/"
            target="_blank"
            rel="noopener"
            className="surreal-credit"
          >
            Desenvolvido por <strong>Fortesdev</strong>
          </a>
        </div>
      </main>
    </div>
  );
}

function SetaIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={14}
      height={14}
      aria-hidden="true"
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function PataIcon() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor" aria-hidden="true">
      <ellipse cx="6" cy="9" rx="2.1" ry="2.7" />
      <ellipse cx="10" cy="5.3" rx="2.1" ry="2.7" />
      <ellipse cx="14.4" cy="5.3" rx="2.1" ry="2.7" />
      <ellipse cx="18.3" cy="9" rx="2.1" ry="2.7" />
      <path d="M12.2 11.2c-2.6 0-6.2 4.1-6.2 6.6 0 1.7 1.4 2.6 3 2.6 1.3 0 2.1-.6 3.2-.6s1.9.6 3.2.6c1.6 0 3-.9 3-2.6 0-2.5-3.6-6.6-6.2-6.6z" />
    </svg>
  );
}

function RedeIcon({ rede, size }: { rede: IconeRede; size: number }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true as const };
  switch (rede) {
    case "tiktok":
      return (
        <svg {...p} fill="currentColor">
          <path d="M16.6 3c.3 2.3 1.6 3.9 3.9 4.1v2.6c-1.4.1-2.6-.3-3.9-1.1v5.9c0 3.6-2.6 6.1-6 6.1-3.3 0-5.9-2.5-5.9-5.8 0-3.6 3-6.1 6.7-5.7v2.8c-1.8-.4-3.6.7-3.6 2.8 0 1.6 1.2 2.9 2.8 2.9 1.8 0 3-1.2 3-3.4V3h3z" />
        </svg>
      );
    case "telegram":
      return (
        <svg {...p} fill="currentColor">
          <path d="M21.4 4.2 2.9 11.3c-1.3.5-1.2 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.4.8.8.8.4 0 .6-.2.9-.4l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.3-1.5zM8.6 14l9.5-6c.4-.3.8-.1.5.2l-7.9 7.1-.3 3.3L8.6 14z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...p} fill="currentColor">
          <path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.7 4.7 12 4.7 12 4.7s-6.7 0-8.5.5a2.8 2.8 0 0 0-2 2C1 9 1 12 1 12s0 3 .5 4.8a2.8 2.8 0 0 0 2 2c1.8.5 8.5.5 8.5.5s6.7 0 8.5-.5a2.8 2.8 0 0 0 2-2c.5-1.8.5-4.8.5-4.8s0-3-.5-4.8zM9.8 15.1V8.9l5.6 3.1-5.6 3.1z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...p} fill="currentColor">
          <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8V22h3.4z" />
        </svg>
      );
  }
}
