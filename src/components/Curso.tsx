import SectionTitle from "./SectionTitle";
import { modalidades, beneficios } from "@/data/curso";

export default function Curso() {
  return (
    <section id="curso" className="relative bg-bg-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Como funciona"
          title="Teoria e prática, lado a lado"
          subtitle="São 16 aulas presenciais, 2 por semana, de 2 a 4 horas cada. As duas primeiras são teóricas para você entender o maquinário e a profissão. Daí em diante, a maior parte do tempo é com a máquina na mão."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {modalidades.map((m, i) => (
            <article
              key={m.titulo}
              className="group relative overflow-hidden rounded-2xl border border-line bg-bg-card p-8 transition hover:border-gold/60 sm:p-10"
              data-reveal="fade-up"
              data-reveal-delay={i * 150}
            >
              <span className="absolute -right-4 -top-6 font-script text-[9rem] leading-none text-fg/[0.04] transition group-hover:text-gold/10">
                {i + 1}
              </span>
              <p className="font-label text-xs uppercase tracking-[0.3em] text-gold">
                Modalidade {i + 1}
              </p>
              <h3 className="mt-2 font-script text-5xl text-fg">{m.titulo}</h3>
              <p className="mt-5 leading-relaxed text-muted">{m.resumo}</p>
              <ul className="mt-6 space-y-3">
                {m.topicos.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-fg/90">
                    <Check />
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {beneficios.map((b, i) => (
            <div
              key={b.titulo}
              className="rounded-2xl border border-line p-7"
              data-reveal="fade-up"
              data-reveal-delay={i * 100}
            >
              <div className="mb-5 h-10 w-10 rounded-full border border-gold/50 p-2.5 text-gold">
                <Icons index={i} />
              </div>
              <h4 className="font-semibold text-fg">{b.titulo}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-gold" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" />
      <path d="m6 10 3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Icons({ index }: { index: number }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (index) {
    case 0: // certificado
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M4 5h16v11H4z" /><path d="M8 20l4-2 4 2v-4H8z" /><path d="M8 9h8M8 12h5" />
        </svg>
      );
    case 1: // suporte
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M4 13a8 8 0 0 1 16 0" /><path d="M4 13v4a2 2 0 0 0 2 2h1v-6H4zM20 13v4a2 2 0 0 1-2 2h-1v-6h3z" /><path d="M12 21h4" />
        </svg>
      );
    case 2: // relógio
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
        </svg>
      );
    default: // máquina
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M9 3h6v5H9z" /><path d="M8 8h8l1 12H7z" /><path d="M9 3l-1 2M15 3l1 2M10 13h4" />
        </svg>
      );
  }
}
