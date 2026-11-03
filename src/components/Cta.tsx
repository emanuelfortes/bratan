import Image from "next/image";
import { whatsappLink } from "@/data/curso";
import { WhatsIcon } from "./Hero";

export default function Cta() {
  return (
    <section id="inscricao" className="grain relative overflow-hidden py-28 sm:py-36">
      <div className="absolute inset-0">
        <Image
          src="/img/poster-1.webp"
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/70 to-bg" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8" data-reveal="zoom-in">
        <p className="font-label text-xs uppercase tracking-[0.35em] text-gold">Vagas limitadas</p>
        <h2 className="mt-4 font-script text-6xl leading-[1.05] sm:text-7xl md:text-8xl">
          <span className="text-fg">Sua cadeira</span>{" "}
          <span className="gold-text">te espera</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-muted sm:text-lg">
          Chama no WhatsApp, combina os horários com o Ramon e começa a próxima turma com a
          máquina regulada na sua mão.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-10 py-5 font-label text-sm font-semibold uppercase tracking-[0.2em] text-bg shadow-[0_0_60px_-10px_var(--gold)] transition hover:bg-gold-light"
        >
          <WhatsIcon />
          Quero me inscrever
        </a>
        <p className="mt-5 text-xs text-muted">
          Certificado de conclusão + suporte técnico após o curso.
        </p>
      </div>
    </section>
  );
}
