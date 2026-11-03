import Image from "next/image";
import { whatsappLink } from "@/data/curso";

export default function Hero() {
  return (
    <section
      id="topo"
      className="grain relative flex min-h-svh items-start overflow-hidden pt-24 lg:items-center"
    >
      {/* Foto sangrando no topo — mobile/tablet */}
      <div className="absolute inset-x-0 top-0 h-[64svh] overflow-hidden lg:hidden">
        <div className="absolute inset-x-0 -top-[4%] h-[112%]">
          <Image
            src="/img/ramonhero4k.webp"
            alt="Ramon Silva cortando cabelo"
            fill
            priority
            className="object-cover object-[70%_50%]"
            sizes="(min-width: 1024px) 1px, 100vw"
          />
        </div>
        {/* Escurece o topo para o logo e o menu continuarem legíveis */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg/85 to-transparent" />
        {/* Funde a base da foto no fundo escuro, atrás do texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg from-18% via-bg/55 via-45% to-transparent to-85%" />
      </div>

      {/* Foto na metade direita — desktop */}
      <div className="absolute inset-y-0 right-0 hidden w-[56%] overflow-hidden lg:block">
        {/* Caixa maior que o painel: aproxima o enquadramento no Ramon */}
        <div className="absolute inset-x-0 -top-[22%] h-[142%]">
          <Image
            src="/img/ramonhero4k.webp"
            alt="Ramon Silva cortando cabelo"
            fill
            priority
            className="object-cover object-[62%_50%]"
            sizes="(min-width: 1024px) 60vw, 1px"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-bg from-0% via-bg/50 via-22% to-transparent to-62%" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-12 pt-[38svh] sm:px-8 sm:pb-16 lg:pt-0">
        <div className="lg:max-w-[48%]">
          <p
            className="text-center font-label text-xs uppercase tracking-[0.35em] text-gold sm:text-sm lg:text-left"
            data-reveal="fade-up"
          >
            Curso presencial · Turmas reduzidas
          </p>

          <h1 className="mt-4 text-center lg:mt-5 lg:text-left" data-reveal="fade-up" data-reveal-delay="100">
            <span className="block font-label text-3xl font-light uppercase tracking-[0.18em] text-fg sm:text-4xl md:text-5xl">
              Curso de Barbeiro
            </span>
            <span className="gold-text -mt-[0.18em] block pt-[0.18em] font-script text-6xl leading-[0.95] sm:text-8xl md:text-9xl">
              Iniciante
            </span>
          </h1>

          <p
            className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mt-6"
            data-reveal="fade-up"
            data-reveal-delay="200"
          >
            Do zero à cadeira: 16 aulas presenciais com Ramon Silva, teoria do maquinário e
            prática em modelos reais. Saia cortando, regulando sua própria máquina e com
            certificado na mão.
          </p>

          <div
            className="mt-8 flex flex-wrap gap-4 lg:mt-9"
            data-reveal="fade-up"
            data-reveal-delay="300"
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold px-6 py-4 font-label text-xs font-semibold uppercase tracking-[0.18em] text-bg shadow-[0_0_40px_-10px_var(--gold)] transition hover:bg-gold-light sm:w-auto sm:px-8 sm:text-sm sm:tracking-[0.2em]"
            >
              <WhatsIcon />
              Garantir minha vaga
            </a>
            <a
              href="#curso"
              className="inline-flex w-full items-center justify-center rounded-full border border-line px-6 py-4 font-label text-xs uppercase tracking-[0.18em] text-fg transition hover:border-gold hover:text-gold sm:w-auto sm:px-8 sm:text-sm sm:tracking-[0.2em]"
            >
              Conhecer o curso
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhatsIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}
