"use client";

import { useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import { videos } from "@/data/curso";

export default function Videos() {
  return (
    <section id="videos" className="bg-bg-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Portfólio"
          title="O padrão da casa"
          subtitle="Cortes reais feitos pelo Ramon na barbearia. É o acabamento que ele entrega na cadeira todo dia — e a mesma régua que ele usa pra ensinar."
        />
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {videos.map((v, i) => (
            <VideoCard key={v.src} {...v} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ src, poster, titulo, delay }: (typeof videos)[number] & { delay: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      el.play();
    } else {
      el.pause();
    }
  };

  return (
    <figure
      className="group relative overflow-hidden rounded-2xl border border-line bg-bg-card"
      data-reveal="fade-up"
      data-reveal-delay={delay}
    >
      <div className="relative aspect-[9/16]">
        <video
          ref={ref}
          src={src}
          poster={poster}
          playsInline
          loop
          muted
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onClick={toggle}
          className="h-full w-full cursor-pointer object-cover"
        />
        {!playing && (
          <button
            onClick={toggle}
            aria-label={`Reproduzir: ${titulo}`}
            className="absolute inset-0 flex items-center justify-center bg-bg/30 transition group-hover:bg-bg/10"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-bg/70 text-gold backdrop-blur transition group-hover:scale-110 group-hover:bg-gold group-hover:text-bg">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor" aria-hidden="true">
                <path d="M7 5v14l12-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="flex min-h-16 items-center justify-between gap-3 px-5 py-4">
        <span className="font-label text-[11px] uppercase tracking-[0.14em] text-fg">{titulo}</span>
        <span className="shrink-0 whitespace-nowrap font-script text-xl text-gold">Ramon Silva</span>
      </figcaption>
    </figure>
  );
}
