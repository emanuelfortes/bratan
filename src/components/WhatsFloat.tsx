"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "@/data/curso";
import { WhatsIcon } from "./Hero";

const PRIMEIRA_APARICAO = 4000; // espera antes do primeiro balão
const INTERVALO = 10000; // reaparece a cada 10s
const DURACAO_ABERTO = 2000; // fica 2s aberto

export default function WhatsFloat() {
  const [balaoAberto, setBalaoAberto] = useState(false);

  useEffect(() => {
    let esconder: ReturnType<typeof setTimeout>;
    let ciclo: ReturnType<typeof setInterval>;

    const abrir = () => {
      setBalaoAberto(true);
      esconder = setTimeout(() => setBalaoAberto(false), DURACAO_ABERTO);
    };

    const primeira = setTimeout(() => {
      abrir();
      ciclo = setInterval(abrir, INTERVALO);
    }, PRIMEIRA_APARICAO);

    return () => {
      clearTimeout(primeira);
      clearTimeout(esconder);
      clearInterval(ciclo);
    };
  }, []);

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_35px_-8px_rgba(37,211,102,0.85)] transition duration-300 hover:scale-110 hover:bg-[#1fb855]"
    >
      {/* Anel pulsando */}
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 motion-reduce:animate-none" />
      <WhatsIcon className="relative h-7 w-7" />

      {/* Balão chamando pro curso */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute right-full top-1/2 mr-3 w-max max-w-[190px] -translate-y-1/2 rounded-2xl border border-gold/30 bg-bg-card px-4 py-3 text-left text-xs leading-snug text-fg shadow-xl shadow-black/60 transition-all duration-300 ${
          balaoAberto ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
        }`}
      >
        Bora garantir sua vaga no curso?
        {/* Rabinho apontando para o botão */}
        <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-b border-r border-gold/30 bg-bg-card" />
      </span>
    </a>
  );
}
