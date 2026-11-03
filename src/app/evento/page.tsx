import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { WhatsIcon } from "@/components/Hero";
import { contato } from "@/data/site";
import { evento, eventoWhatsappLink } from "@/data/evento";

export const metadata: Metadata = {
  title: "Curso Prático de Aperfeiçoamento",
  description:
    "Evento de um dia com Ramon Silva: dois cortes demonstrados pelo professor pela manhã, prática dos alunos à tarde e certificado de conclusão no fim do dia.",
  alternates: { canonical: "/evento" },
  openGraph: {
    title: "Curso Prático de Aperfeiçoamento — evento de um dia",
    description:
      "Demonstração de técnicas pela manhã, prática em modelos à tarde e certificado no fim do dia.",
    url: "/evento",
    images: [{ url: "/og/evento.jpg", width: 1200, height: 630, alt: "Curso pratico de aperfeicoamento com Ramon Silva" }],
  },
};

export default function EventoPage() {
  return (
    <main className="grain relative overflow-hidden bg-bg">
      <Reveal />

      {/* Topo: logo + voltar */}
      <header
        className="absolute inset-x-0 top-0 z-30 mx-auto flex w-full max-w-7xl items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8"
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

      {/* Abertura */}
      <section className="relative flex min-h-svh items-end overflow-hidden pt-28 lg:items-center">
        {/* Foto sangrando no topo — mobile e tablet */}
        <div className="absolute inset-x-0 top-0 h-[58svh] overflow-hidden lg:hidden">
          <Image
            src="/img/ramonhero4k.webp"
            alt="Ramon Silva cortando cabelo na barbearia"
            fill
            priority
            className="object-cover object-[70%_50%]"
            sizes="(min-width: 1024px) 1px, 100vw"
          />
          {/* Escurece o topo para o logo e o botão continuarem legíveis */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg/85 to-transparent" />
          {/* Funde a base da foto no fundo escuro, atrás do texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg from-16% via-bg/55 via-45% to-transparent to-88%" />
        </div>

        {/* Foto na metade direita — desktop */}
        <div className="absolute inset-y-0 right-0 hidden w-[52%] overflow-hidden lg:block">
          <Image
            src="/img/ramonhero4k.webp"
            alt="Ramon Silva cortando cabelo na barbearia"
            fill
            priority
            className="object-cover object-[62%_50%]"
            sizes="(min-width: 1024px) 55vw, 1px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg from-0% via-bg/55 via-24% to-transparent to-68%" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-[34svh] sm:px-8 sm:pb-20 lg:pt-0">
          <div className="lg:max-w-[46%]">
            <p
              className="flex items-center gap-3 font-label text-xs uppercase tracking-[0.3em] text-gold sm:text-sm"
              data-reveal="fade-up"
            >
              <span className="h-px w-6 bg-gold sm:w-8" aria-hidden="true" />
              {evento.chapeu}
            </p>

            <h1 className="mt-4" data-reveal="fade-up" data-reveal-delay="100">
              <span className="block font-label text-3xl font-light uppercase tracking-[0.18em] text-fg sm:text-4xl md:text-5xl">
                {evento.titulo}
              </span>
              <span className="gold-text -mt-[0.08em] block pt-[0.18em] font-script text-5xl leading-[0.95] sm:text-7xl md:text-8xl">
                {evento.destaque}
              </span>
            </h1>

            <p
              className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
              data-reveal="fade-up"
              data-reveal-delay="200"
            >
              {evento.resumo}
            </p>

            <a
              href={eventoWhatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal="fade-up"
              data-reveal-delay="300"
              className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 font-label text-xs font-semibold uppercase tracking-[0.2em] text-bg shadow-[0_0_40px_-10px_var(--gold)] transition hover:bg-gold-light sm:w-auto sm:text-sm"
            >
              <WhatsIcon />
              {evento.ctaBotao}
            </a>
          </div>
        </div>
      </section>

      {/* Números do dia */}
      <section className="relative border-y border-line bg-bg-soft">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-line sm:grid-cols-4">
          {evento.numeros.map((n, i) => (
            <div
              key={n.rotulo}
              className="flex flex-col items-center gap-1 bg-bg-soft px-4 py-8 text-center sm:py-10"
              data-reveal="fade-up"
              data-reveal-delay={i * 90}
            >
              <span className="gold-text text-3xl font-semibold sm:text-4xl">
                {n.valor}
              </span>
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-muted sm:text-xs">
                {n.rotulo}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Programação do dia */}
      <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-2xl" data-reveal="fade-up">
          <p className="font-label text-xs uppercase tracking-[0.3em] text-gold">
            Como funciona o dia
          </p>
          <h2 className="mt-3 font-label text-2xl font-light uppercase tracking-[0.12em] text-fg sm:text-4xl">
            Da demonstração à sua mão
          </h2>
        </div>

        <ol className="mt-10 space-y-5 sm:mt-14 sm:space-y-6">
          {evento.programacao.map((item, i) => (
            <li
              key={item.titulo}
              className="rounded-2xl border border-line bg-bg-card p-5 transition hover:border-gold/50 sm:p-7"
              data-reveal="fade-up"
              data-reveal-delay={(i % 3) * 80}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-gold px-3 py-1 font-label text-[10px] uppercase tracking-[0.2em] text-bg">
                  {item.periodo}
                </span>
                <span className="rounded-full border border-gold/35 px-3 py-1 font-label text-[10px] uppercase tracking-[0.18em] text-gold">
                  {item.horario}
                </span>
              </div>

              <h3 className="mt-4 font-label text-lg uppercase tracking-[0.1em] text-fg sm:text-xl">
                {item.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                {item.descricao}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Bônus + fotos dos cortes */}
      <section className="relative border-t border-line bg-bg-soft">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div data-reveal="fade-right">
            <span className="inline-block rounded-full border border-gold/40 px-3 py-1 font-label text-[10px] uppercase tracking-[0.2em] text-gold">
              {evento.bonus.etiqueta}
            </span>
            <h2 className="mt-4 font-label text-2xl font-light uppercase tracking-[0.12em] text-fg sm:text-4xl">
              {evento.bonus.titulo}
            </h2>

            <ul className="mt-7 space-y-4">
              {evento.bonus.itens.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
                    <CheckIcon />
                  </span>
                  <span className="text-sm leading-relaxed text-fg sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4" data-reveal="fade-left">
            {evento.galeria.map((foto) => (
              <div
                key={foto.src}
                className="relative aspect-4/5 overflow-hidden rounded-2xl border border-line"
              >
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 22vw, 45vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chamada final */}
      <section className="relative border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 sm:py-24">
          <h2
            className="font-label text-2xl font-light uppercase tracking-[0.12em] text-fg sm:text-4xl"
            data-reveal="fade-up"
          >
            {evento.ctaTitulo}
          </h2>
          <p
            className="mx-auto mt-4 max-w-md text-sm text-muted sm:text-base"
            data-reveal="fade-up"
            data-reveal-delay="100"
          >
            {evento.ctaTexto}
          </p>

          <a
            href={eventoWhatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal="fade-up"
            data-reveal-delay="200"
            className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 font-label text-xs font-semibold uppercase tracking-[0.2em] text-bg shadow-[0_0_40px_-10px_var(--gold)] transition hover:bg-gold-light sm:w-auto sm:text-sm"
          >
            <WhatsIcon />
            {evento.ctaBotao}
          </a>

          <div className="gold-line mx-auto mt-12 w-24" />
          <p className="mt-6 font-label text-[11px] uppercase tracking-[0.25em] text-muted">
            {contato.cidade}
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.2em] text-muted transition hover:text-gold"
          >
            <ArrowLeftIcon />
            Voltar ao início
          </Link>
        </div>
      </section>
    </main>
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

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
      aria-hidden="true"
    >
      <path d="m5 12 5 5L19 7" />
    </svg>
  );
}
