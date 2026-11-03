import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Curso from "@/components/Curso";
import Cronograma from "@/components/Cronograma";
import Videos from "@/components/Videos";
import Professor from "@/components/Professor";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import WhatsFloat from "@/components/WhatsFloat";

export const metadata: Metadata = {
  title: "Curso de Barbeiro Iniciante",
  description:
    "Curso presencial de barbeiro iniciante com Ramon Silva: 16 aulas, teoria e prática em modelos reais, certificado de conclusão e suporte técnico após o curso.",
  alternates: { canonical: "/curso" },
  openGraph: {
    title: "Curso de Barbeiro Iniciante",
    description:
      "16 aulas presenciais, 2 por semana, teoria e prática com modelos reais. Certificado + suporte técnico.",
    url: "/curso",
    images: [{ url: "/og/curso.jpg", width: 1200, height: 630, alt: "Curso de Barbeiro Iniciante com Ramon Silva" }],
    locale: "pt_BR",
    type: "website",
  },
};

export default function CursoPage() {
  return (
    <main>
      <Reveal />
      <Header />
      <Hero />
      <Curso />
      <Cronograma />
      <Videos />
      <Professor />
      <Faq />
      <Cta />
      <Footer />
      <WhatsFloat />
    </main>
  );
}
