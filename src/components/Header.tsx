"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { whatsappLink } from "@/data/curso";

const links = [
  { href: "#curso", label: "O curso" },
  { href: "#cronograma", label: "Cronograma" },
  { href: "#videos", label: "Vídeos" },
  { href: "#professor", label: "Professor" },
  { href: "#faq", label: "Dúvidas" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/95 backdrop-blur-md"
          : "bg-transparent"
      } ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Ramon Silva Barbeiro — voltar ao início">
          <Image
            src="/img/logo-white.webp"
            alt="Ramon Silva Barbeiro"
            width={1851}
            height={626}
            className="h-9 w-auto sm:h-11"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-label text-[13px] uppercase tracking-[0.2em] text-fg transition hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold px-5 py-2 font-label text-[13px] font-semibold uppercase tracking-[0.2em] text-bg transition hover:bg-gold-light"
          >
            Quero me inscrever
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          <span className={`h-px w-6 bg-fg transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-fg transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-fg transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-bg/95 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 font-label text-sm uppercase tracking-[0.2em] text-fg"
              >
                {l.label}
              </a>
            ))}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 rounded-full bg-gold py-3 text-center font-label text-sm uppercase tracking-[0.2em] text-bg"
            >
              Quero me inscrever
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
