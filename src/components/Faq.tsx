import SectionTitle from "./SectionTitle";
import { faq } from "@/data/curso";

export default function Faq() {
  return (
    <section id="faq" className="bg-bg-soft py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionTitle eyebrow="Dúvidas frequentes" title="Antes de começar" />
        <div className="divide-y divide-line rounded-2xl border border-line bg-bg-card">
          {faq.map((f, i) => (
            <details key={f.pergunta} className="group px-6 py-5" data-reveal="fade-up" data-reveal-delay={i * 80}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-fg [&::-webkit-details-marker]:hidden">
                {f.pergunta}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-gold transition group-open:rotate-45 group-open:border-gold">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{f.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
