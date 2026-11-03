import Image from "next/image";
import { contato, whatsappLink } from "@/data/curso";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 py-12 sm:px-8 md:flex-row md:justify-between">
        <Image
          src="/img/logo-white.webp"
          alt="Ramon Silva Barbeiro"
          width={1851}
          height={626}
          className="h-12 w-auto opacity-90"
        />
        <nav className="flex flex-wrap items-center justify-center gap-6">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-xs uppercase tracking-[0.25em] text-muted transition hover:text-gold"
          >
            WhatsApp
          </a>
          <a
            href={contato.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-xs uppercase tracking-[0.25em] text-muted transition hover:text-gold"
          >
            Instagram
          </a>
          <span className="font-label text-xs uppercase tracking-[0.25em] text-muted">
            {contato.cidade}
          </span>
        </nav>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} Ramon Silva Barbeiro · Todos os direitos reservados
      </div>
    </footer>
  );
}
