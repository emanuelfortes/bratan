import Image from "next/image";
import { whatsappLink } from "@/data/curso";
import { WhatsIcon } from "./Hero";

export default function Professor() {
  return (
    <section id="professor" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-md" data-reveal="fade-right">
          <div className="absolute -inset-3 rounded-3xl border border-gold/30" />
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="/img/ramonperfil.webp"
              alt="Ramon Silva na barbearia"
              width={1122}
              height={1402}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1024px) 28rem, 100vw"
            />
          </div>
        </div>

        <div data-reveal="fade-left">
          <p className="font-label text-xs uppercase tracking-[0.35em] text-gold">Seu professor</p>
          <h2 className="mt-3 font-script text-6xl leading-[1.05] text-fg sm:text-7xl md:text-8xl">
            Ramon Silva
          </h2>
          <div className="gold-line mt-5 w-32" />
          <p className="mt-6 leading-relaxed text-muted sm:text-lg">
            Barbeiro à frente da Ramon Silva Barbearia, Ramon leva pra sala de aula o que faz
            todos os dias na cadeira: corte social, degradê, acabamento e, principalmente, o
            domínio do maquinário. A ideia do curso é simples: formar barbeiros que não
            dependem de ninguém pra regular a própria máquina e que saem cortando de verdade.
          </p>
          <p className="mt-4 leading-relaxed text-muted sm:text-lg">
            Turmas pequenas, aulas presenciais, prática em modelos reais e acompanhamento
            direto, do primeiro dia até depois da entrega do certificado.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Aulas presenciais e individuais",
              "Acompanhamento em tempo real",
              "Prática em modelos reais",
              "Suporte técnico pós-curso",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-sm text-fg/90">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {t}
              </li>
            ))}
          </ul>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-gold px-8 py-4 font-label text-sm uppercase tracking-[0.2em] text-gold transition hover:bg-gold hover:text-bg"
          >
            <WhatsIcon />
            Falar com o Ramon
          </a>
        </div>
      </div>
    </section>
  );
}
