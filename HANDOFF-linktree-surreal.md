# Handoff — Linktree Surreal (Ramon Silva Barbeiro)

Objetivo: transformar a página atual de links (Next.js, `localhost:3000`) na versão "surreal" aprovada no protótipo. **Manter as mesmas fontes, textos e estrutura** (logo → avatar → nome → descrição → 3 cards → redes → rodapé). Só muda o visual e o movimento.

> Para o Claude Code: implemente em componentes client (`"use client"`), sem libs novas (só React + Canvas 2D + CSS). Respeite `prefers-reduced-motion`. Mobile first, coluna central `max-width: 460px`.

---

## 1. Fontes (manter)
- **Great Vibes** — logo "RamonSilva", nome "Ramon Silva", numerais decorativos dos cards.
- **Josefin Sans** (400/600/700) — rótulos em caixa alta, títulos dos cards, badges, botões.
- **Poppins** (300/400/500) — textos corridos.

Use `next/font/google` se o projeto já usa; senão o link do Google Fonts.

## 2. Cores
| Token | Valor |
|---|---|
| bg topo | `#1d170c` |
| bg meio | `#0b0907` |
| bg base | `#050404` |
| ouro | `#d9b24a` |
| ouro claro | `#f5d77a` |
| ouro creme | `#fff3c4` |
| ouro escuro | `#7a5a14` / `#c9a03a` |
| texto forte | `#f6f0e0` |
| texto corpo | `#bdb4a0` / `#c9c0ab` |
| texto fraco | `#a79f8c` / `#7d7566` |

Fundo da página: `radial-gradient(120% 70% at 50% 0%, #1d170c 0%, #0b0907 45%, #050404 100%)`.
Gradiente dourado (texto do nome): `linear-gradient(100deg,#7a5a14 0%,#d9b24a 20%,#fff3c4 35%,#c9a03a 50%,#7a5a14 65%,#f5d77a 82%,#7a5a14 100%)`, `background-size: 250% 100%`, `background-clip: text`.

## 3. Estrutura
```
<Page>
  <SurrealCanvas/>                 // canvas fixed, full viewport, z-0, pointer-events none
  <div fade-bottom/>               // fixed bottom 40vh, gradient to top rgba(5,4,4,.95) → transparent
  <main max-w-460 mx-auto px-20 pt-48 pb-40 flex-col items-center z-1>
    Logo            (Great Vibes 46px ouro + "BARBEIRO" Josefin 10px tracking 4px)
    AvatarPortal    (250×250, ver §4)
    "BARBEIRO"      (Josefin 12px, tracking 6px, ouro)
    <h1> Ramon Silva (Great Vibes 68px, gradiente dourado animado, drop-shadow ouro)
    <p> descrição    (Poppins 300 15px/1.65, #c9c0ab, max-w 360, centro)
    Cards (gap 18px, mt 40px, perspective 1000px)
      Card destaque  "VAGA ABERTA" / TRABALHE NA BARBEARIA
      Card           "TURMAS REDUZIDAS" / CURSO DE BARBEIRO INICIANTE
      Card           "EM BREVE" / PRÓXIMO EVENTO
    Divisor (110×1px, gradiente transparente→ouro→transparente, mt 52)
    Botões pill WHATSAPP | INSTAGRAM (podem manter os ícones atuais)
    "FORTALEZA · CE" (Josefin 11px tracking 5px)
    © 2026 Ramon Silva Barbearia (12.5px #7d7566)
  </main>
```

## 4. AvatarPortal (250×250, centralizado)
Camadas (de trás pra frente):
1. **Anel de texto girando** — SVG 250×250, `<textPath>` num círculo r=112, texto `BARBEIRO · FORTALEZA · RAMON SILVA · BARBEARIA · FORMAÇÃO ·`, Josefin 600 10.5px, fill `#d9b24a`, `textLength="700" lengthAdjust="spacing"`. Rotação: `8deg/s`.
2. **Órbita** — div `inset:22px`, `border:1px dashed rgba(217,178,74,.28)`, 3 pontinhos dourados com glow (8px, 5px, 4px). Rotação `-22deg/s` + `scaleY(.92)`.
3. **Halo** — div 196×196 redondo, `conic-gradient(from 0deg,transparent,rgba(245,215,122,.55),transparent 30%,transparent 50%,rgba(255,243,196,.45),transparent 80%)`, `filter: blur(14px)`, rotação `30deg/s`.
4. **Foto** — moldura 156×156, `padding:3px`, `conic-gradient(from 200deg,#7a5a14,#f5d77a,#fff3c4,#c9a03a,#7a5a14)`, `box-shadow: 0 0 60px 6px rgba(232,190,80,.35), 0 20px 60px -10px rgba(0,0,0,.9)`. Imagem 150×150 `object-fit:cover`, redonda.

**Levitação:** o bloco inteiro faz `translateY(sin(t*1.1)*8px)` + parallax do mouse (`x*14px`, `y*10px`, suavizado).
**Sombra embaixo:** elipse 120×14, `radial-gradient(closest-side, rgba(232,190,80,.35), transparent)`, `margin-top:-8px`; escala = `1 - lev/40` (encolhe quando o avatar sobe).

## 5. Cards
Base (todos):
- `border-radius:22px; padding:24px 22px; overflow:hidden; backdrop-filter: blur(14px)`
- layout: flex, texto à esquerda (flex 1) + botão seta 44×44 à direita
- numeral decorativo "01/02/03" Great Vibes 160px, `position:absolute; right:-4px; bottom:-46px`, cor `rgba(232,196,90,.06–.08)`
- badge: Josefin 600 11px tracking 2.5px, pill
- título: Josefin 600 20px tracking 3px `#f6f0e0`
- descrição: Poppins 300 14.5px/1.65 `#bdb4a0`

Normal:
- `background: linear-gradient(160deg, rgba(34,30,24,.66), rgba(12,11,9,.8))`
- `border: 1px solid rgba(232,196,90,.18)`
- badge outline `1px solid rgba(217,178,74,.55)`, texto `#d9b24a`
- seta: círculo outline `rgba(217,178,74,.35)`, "→" `#d9b24a`

Destaque (VAGA ABERTA):
- `background: linear-gradient(160deg, rgba(52,42,20,.72), rgba(14,12,9,.82))`
- `border: 1px solid rgba(232,196,90,.6)`
- badge preenchido `linear-gradient(100deg,#c9a03a,#f5d77a)` texto `#1a1409`
- seta preenchida `linear-gradient(135deg,#f5d77a,#c9a03a)` + `box-shadow 0 0 24px rgba(245,215,122,.6)`
- **aura pulsando:** `box-shadow: 0 0 (50 + sin(t*1.6)*20)px -12px rgba(232,190,80, .45 + sin(t*1.6)*.15)`
- **reflexo (glint):** faixa 90px `linear-gradient(90deg,transparent,rgba(255,243,196,.22),transparent)`, `skewX(-18deg)`, atravessa o card a cada 5s (1.4s de travessia)

Interações (todos):
- **Flutuação:** `translateY(sin(t*.9 + i*1.4) * 4px)`
- **Tilt 3D no hover:** `rotateX((py-.5)*-10deg) rotateY((px-.5)*12deg)`, lerp 0.1 por frame, volta a 0 no leave
- **Spotlight:** camada absoluta com `radial-gradient(280px circle at {px}% {py}%, rgba(255,220,130,.2), transparent 60%)` seguindo o mouse
- **Seta:** `translateX(4px) scale(1.08)` no hover, `transition .35s cubic-bezier(.2,.8,.2,1)`

## 6. Entrada (on mount)
Sequência com delay de 120ms entre grupos, 900ms cada, easing `easeOutCubic`:
0 logo → 1 avatar → 2 nome+descrição → 3,4,5 cards → 6 rodapé.
Cada item: `opacity 0→1`, `translateY 18px→0`, `blur 8px→0`. Cards: `translateY 30px→0` e `rotateX 18deg→0`.

## 7. Canvas de fundo (SurrealCanvas)
Canvas `position:fixed; inset:0`, DPR até 2, redimensiona no resize. Um único `requestAnimationFrame`. `globalCompositeOperation='lighter'` para tudo:

1. **Sol de ouro líquido:** 4 blobs de radial-gradient movendo em Lissajous ao redor de `(w/2, h*.24)`, com parallax do mouse (`-mx*60`, `-my*40`).
2. **Luz do cursor:** radial 180px `rgba(255,220,140,.12*int+.04)` no ponteiro.
3. **Anéis de portal:** 5 elipses concêntricas em `(w/2, h*.82)`, raio crescendo `t*.02 % maxR`, `ry = r*.16`, alpha `(1-r/maxR)*.28*int`.
4. **Poeira dourada:** `160*intensidade` partículas subindo, piscando `|sin|`, repelidas pelo cursor num raio de 120px.

```ts
// components/SurrealCanvas.tsx
"use client";
import { useEffect, useRef } from "react";

export default function SurrealCanvas({ intensity = 0.6 }: { intensity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, ctx = c.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0;
    const M = { x: -999, y: -999, px: 0, py: 0, sx: 0, sy: 0 };
    const resize = () => { w = innerWidth; h = innerHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const pm = (e: PointerEvent) => { M.x = e.clientX; M.y = e.clientY; M.px = e.clientX / w - .5; M.py = e.clientY / h - .5; };
    const pl = () => { M.x = M.y = -999; M.px = M.py = 0; };
    resize(); addEventListener("resize", resize); addEventListener("pointermove", pm); document.addEventListener("pointerleave", pl);

    const mk = () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + .3, vy: Math.random() * .25 + .05, vx: (Math.random() - .5) * .1, tw: Math.random() * 2 + .5, ph: Math.random() * 6 });
    const parts = Array.from({ length: Math.round(160 * intensity) }, mk);
    const blobs = [
      { rx: .28, ry: 60, sp: .00021, ph: 0, r: .55, c: "232,180,70" },
      { rx: .22, ry: 90, sp: .00017, ph: 2, r: .45, c: "255,215,130" },
      { rx: .35, ry: 50, sp: .00013, ph: 4, r: .6, c: "150,95,30" },
      { rx: .18, ry: 120, sp: .00025, ph: 1, r: .35, c: "255,240,200" },
    ];

    const loop = (t: number) => {
      const T = reduce ? 0 : t;
      M.sx += (M.px - M.sx) * .05; M.sy += (M.py - M.sy) * .05;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const base = Math.min(w, 700);
      for (const b of blobs) {
        const cx = w / 2 + Math.sin(T * b.sp + b.ph) * b.rx * base - M.sx * 60;
        const cy = h * .24 + Math.cos(T * b.sp * 1.3 + b.ph) * b.ry - M.sy * 40;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.r * base);
        g.addColorStop(0, `rgba(${b.c},${.2 * intensity + .05})`); g.addColorStop(1, `rgba(${b.c},0)`);
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      }
      if (M.x > -900) {
        const lg = ctx.createRadialGradient(M.x, M.y, 0, M.x, M.y, 180);
        lg.addColorStop(0, `rgba(255,220,140,${.12 * intensity + .04})`); lg.addColorStop(1, "rgba(255,220,140,0)");
        ctx.fillStyle = lg; ctx.fillRect(M.x - 180, M.y - 180, 360, 360);
      }
      const hy = h * .82, maxR = Math.max(w, 600) * .9;
      for (let i = 0; i < 5; i++) {
        const r = (T * .02 + i * maxR / 5) % maxR;
        ctx.beginPath(); ctx.ellipse(w / 2, hy, r, r * .16, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(232,196,90,${(1 - r / maxR) * .28 * intensity})`; ctx.lineWidth = 1; ctx.stroke();
      }
      for (const q of parts) {
        if (!reduce) { q.y -= q.vy / h * 1.6; q.x += q.vx / w + Math.sin(T * .0006 + q.ph) * .00012; }
        if (q.y < -.02) { q.y = 1.02; q.x = Math.random(); }
        if (M.x > -900) {
          const dx = q.x * w - M.x, dy = q.y * h - M.y, d2 = dx * dx + dy * dy;
          if (d2 < 14400) { const f = (1 - Math.sqrt(d2) / 120) * .032; q.x += dx / w * f; q.y += dy / h * f; }
        }
        const a = (.25 + .75 * Math.abs(Math.sin(T * .001 * q.tw + q.ph))) * .9;
        ctx.beginPath(); ctx.arc(q.x * w, q.y * h, q.r, 0, 6.283);
        ctx.fillStyle = `rgba(255,${210 + ((q.r * 20) | 0)},140,${a})`; ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); removeEventListener("pointermove", pm); document.removeEventListener("pointerleave", pl); };
  }, [intensity]);
  return <canvas ref={ref} aria-hidden style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 0 }} />;
}
```

## 8. Loop de UI (avatar, nome, cards)
Fazer num hook `useRaf` ou num componente client, **alterando `style` direto por ref** (sem setState a cada frame):
- anel: `rotate(s*8deg)` · órbita: `rotate(-s*22deg) scaleY(.92)` · halo: `rotate(s*30deg)`
- avatar: `translate(mx*14px, sin(s*1.1)*8 + my*10px)` · sombra: `scale(1 - lev/40)`, `opacity` idem
- nome: `backgroundPosition: ((s*12)%100*1.5)% 0` (brilho percorrendo o texto)
- cards: flutuação + tilt + entrada combinados num único `transform`
- `s = performance.now()/1000`; com `prefers-reduced-motion`, fixar `s = 0` e pular a entrada.

## 9. Acessibilidade / performance
- Cards são `<a>` com o destino real; foco visível (`outline: 2px solid #f5d77a; outline-offset: 3px`).
- Canvas `aria-hidden`; decorações `pointer-events:none`.
- Em telas touch não há hover: tilt/spotlight simplesmente não disparam, está ok.
- Um único rAF para UI; o canvas tem o seu. Pausar os dois em `document.hidden`.

## 10. Checklist de aceite
- [ ] Mesmas fontes e textos da página atual
- [ ] Canvas com sol líquido, anéis e poeira reagindo ao cursor
- [ ] Avatar levitando com anel de texto, órbita e halo girando
- [ ] Nome com brilho dourado em movimento
- [ ] Card destaque com aura pulsando e glint a cada 5s
- [ ] Tilt 3D + spotlight + seta animada no hover
- [ ] Entrada escalonada suave
- [ ] `prefers-reduced-motion` desliga o movimento
- [ ] Sem scroll horizontal em 360px de largura
