import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { WhatsIcon } from "@/components/Hero";
import { contato } from "@/data/site";
import { vaga, vagaWhatsappLink, type IconeRequisito } from "@/data/vaga";

export const metadata: Metadata = {
  title: "Vaga para Barbeiro",
  description:
    "A Ramon Silva Barbearia está contratando barbeiro em Fortaleza. Barbeiro experiente, trabalho em equipe, compromisso e pontualidade. Candidate-se pelo WhatsApp.",
  alternates: { canonical: "/vaga" },
  openGraph: {
    title: "Estamos contratando barbeiro",
    description:
      "Vaga aberta na Ramon Silva Barbearia. Candidate-se pelo WhatsApp.",
    url: "/vaga",
    images: [{ url: "/og/vaga.jpg", width: 1200, height: 630, alt: "Vaga aberta para barbeiro na Ramon Silva Barbearia" }],
  },
};

export default function VagaPage() {
  return (
    <main className="grain relative flex min-h-svh flex-col overflow-hidden bg-bg">
      <Reveal />

      {/* Foto sangrando por trás de tudo — mobile e tablet */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/img/ramonhero4k.webp"
          alt="Ramon Silva cortando cabelo na barbearia"
          fill
          priority
          className="object-cover object-[68%_25%]"
          sizes="(min-width: 1024px) 1px, 100vw"
        />
        {/* Escurece o suficiente para o texto ficar legível por cima */}
        <div className="absolute inset-0 bg-bg/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/45 via-35% to-bg" />
      </div>

      {/* Foto na metade direita — desktop */}
      <div className="absolute inset-y-0 right-0 hidden w-[52%] overflow-hidden lg:block">
        <div className="absolute inset-x-0 -top-[18%] h-[136%]">
          <Image
            src="/img/ramonhero4k.webp"
            alt="Ramon Silva cortando cabelo na barbearia"
            fill
            priority
            className="object-cover object-[62%_50%]"
            sizes="(min-width: 1024px) 55vw, 1px"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-bg from-0% via-bg/55 via-24% to-transparent to-65%" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Topo: logo + voltar */}
      <header
        className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8"
        data-reveal="fade-down"
      >
        <Link href="/" aria-label="Ramon Silva Barbearia — voltar ao início">
          <Image
            src="/img/logo-white.webp"
            alt="Ramon Silva Barbearia"
            width={1851}
            height={626}
            className="h-11 w-auto sm:h-14"
            priority
          />
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-line/80 bg-bg/60 px-4 py-2 font-label text-[11px] uppercase tracking-[0.2em] text-muted backdrop-blur-sm transition hover:border-gold hover:text-gold sm:text-xs"
        >
          <ArrowLeftIcon />
          Voltar
        </Link>
      </header>

      {/* Conteúdo — uma seção só */}
      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 py-10 sm:px-8 sm:py-14">
        <div className="w-full lg:max-w-[46%]">
          <p
            className="flex items-center gap-3 font-label text-lg uppercase tracking-[0.22em] text-fg/90 sm:text-2xl"
            data-reveal="fade-up"
          >
            <span className="h-px w-6 bg-gold sm:w-8" aria-hidden="true" />
            {vaga.chapeu}
          </p>

          <h1
            className="mt-1 text-5xl font-bold uppercase leading-[0.92] tracking-[-0.02em] text-fg sm:text-7xl lg:text-[5.5rem]"
            data-reveal="fade-up"
            data-reveal-delay="100"
          >
            {vaga.titulo}
          </h1>

          {/* Placa metálica, como o bloco "BARBEIRO" da arte */}
          <p
            data-reveal="zoom-in"
            data-reveal-delay="200"
            className="mt-4 inline-block rounded-lg bg-gradient-to-br from-[#e9ddc1] via-[#cdbb92] to-[#9e8d69] px-5 py-2 text-3xl font-bold uppercase tracking-[0.02em] text-[#101010] shadow-[0_10px_40px_-12px_rgba(212,175,55,0.5)] sm:px-7 sm:py-2.5 sm:text-5xl">
            {vaga.cargo}
          </p>

          <ul className="mt-9 space-y-4 sm:mt-12 sm:space-y-5">
            {vaga.requisitos.map((r, i) => (
              <li
                key={r.texto}
                className="flex items-center gap-4"
                data-reveal="fade-up"
                data-reveal-delay={250 + i * 90}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-bg/40 text-gold backdrop-blur-sm sm:h-12 sm:w-12">
                  <RequisitoIcon nome={r.icone} />
                </span>
                <span className="font-label text-sm uppercase tracking-[0.18em] text-fg sm:text-base sm:tracking-[0.2em]">
                  {r.texto}
                </span>
              </li>
            ))}
          </ul>

          <div
            className="mt-10 border-t border-line/70 pt-7 sm:mt-14"
            data-reveal="fade-up"
            data-reveal-delay="150"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-fg text-bg sm:h-12 sm:w-12">
                <WhatsIcon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-label text-sm uppercase tracking-[0.2em] text-fg sm:text-base">
                  {vaga.ctaTitulo}
                </p>
                <p className="mt-0.5 text-xs text-muted sm:text-sm">{vaga.ctaTexto}</p>
              </div>
            </div>

            <a
              href={vagaWhatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 font-label text-xs font-semibold uppercase tracking-[0.2em] text-bg shadow-[0_0_40px_-10px_var(--gold)] transition hover:bg-gold-light sm:w-auto sm:text-sm"
            >
              <WhatsIcon />
              {vaga.ctaBotao}
            </a>

            <p className="mt-5 font-label text-[11px] uppercase tracking-[0.25em] text-muted">
              {contato.cidade}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function RequisitoIcon({ nome }: { nome: IconeRequisito }) {
  const comum = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
    "aria-hidden": true,
  };

  if (nome === "tesoura") {
    return (
      <svg {...comum}>
        <circle cx="6" cy="6" r="2.4" />
        <circle cx="6" cy="18" r="2.4" />
        <path d="M20 4 8.1 16.4M20 20 8.1 7.6" />
      </svg>
    );
  }

  if (nome === "equipe") {
    return (
      <svg {...comum}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 19c0-3 2.7-4.8 6-4.8s6 1.8 6 4.8" />
        <path d="M16.5 7.3a3 3 0 0 1 0 5.4M18 14.6c2 .7 3.3 2.2 3.3 4.4" />
      </svg>
    );
  }

  if (nome === "aperto") {
    return (
      <svg {...comum}>
        <path d="M11 7.5 8.6 9.9a1.8 1.8 0 0 0 2.5 2.5l1.3-1.2 3.3 3.2a1.7 1.7 0 0 1-2.4 2.4" />
        <path d="M13.3 16.8a1.7 1.7 0 0 1-2.4 2.4l-.7-.7" />
        <path d="m11 7.5 2-1.3 4.4 1.6L21 7.3M3 7.3l3.6.5L9 6.2" />
        <path d="M17.4 7.8v6.6M6.6 7.8v6.6" />
      </svg>
    );
  }

  return (
    <svg {...comum}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.2V12l3.1 1.9" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}
