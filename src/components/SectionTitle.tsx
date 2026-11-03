type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionTitle({ eyebrow, title, subtitle, align = "center" }: Props) {
  const center = align === "center";
  return (
    <div className={`mb-12 max-w-3xl ${center ? "mx-auto text-center" : ""}`} data-reveal="fade-up">
      <p className="font-label text-xs uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
      <h2 className="mt-3 font-script text-5xl leading-[1.1] text-fg sm:text-6xl md:text-7xl">
        {title}
      </h2>
      <div className={`gold-line mt-5 w-32 ${center ? "mx-auto" : ""}`} />
      {subtitle && <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>}
    </div>
  );
}
