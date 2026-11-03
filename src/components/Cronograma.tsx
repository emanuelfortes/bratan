import SectionTitle from "./SectionTitle";
import { cronograma } from "@/data/curso";

export default function Cronograma() {
  return (
    <section id="cronograma" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Cronograma"
          title="Da primeira aula ao certificado"
          subtitle="O caminho é o mesmo para todo mundo: entender antes de cortar, cortar muito, e sair pronto pra trabalhar."
        />

        <ol className="relative mx-auto max-w-4xl">
          {/* linha vertical */}
          <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-gold via-line to-transparent sm:left-1/2" />

          {cronograma.map((c, i) => {
            const left = i % 2 === 0;
            return (
              <li
                key={c.etapa}
                className={`relative mb-12 pl-14 sm:w-1/2 sm:pl-0 ${
                  left ? "sm:pr-14 sm:text-right" : "sm:ml-auto sm:pl-14"
                }`}
                data-reveal={left ? "fade-right" : "fade-left"}
              >
                {/* marcador */}
                <span
                  className={`absolute top-1 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-gold bg-bg font-script text-xl text-gold left-5 ${
                    left ? "sm:left-auto sm:right-0 sm:translate-x-1/2" : "sm:left-0 sm:-translate-x-1/2"
                  }`}
                >
                  {i + 1}
                </span>

                <p className="font-label text-xs uppercase tracking-[0.3em] text-gold">
                  {c.etapa} · {c.tipo}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-fg sm:text-2xl">{c.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{c.descricao}</p>
              </li>
            );
          })}
        </ol>

        <div
          className="mx-auto mt-6 max-w-3xl rounded-2xl border border-gold/30 bg-gold/5 p-6 text-center sm:p-8"
          data-reveal="zoom-in"
        >
          <p className="font-label text-xs uppercase tracking-[0.3em] text-gold">O que você vai aprender</p>
          <p className="mt-3 text-fg">
            O que é um <strong className="text-gold-light">corte social</strong>, o que é um{" "}
            <strong className="text-gold-light">degradê</strong>, e como os diferentes tipos de
            cabelo e formatos de crânio mudam o resultado dependendo da técnica que você escolhe.
          </p>
        </div>
      </div>
    </section>
  );
}
