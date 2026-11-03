import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteUrl } from "@/data/site";
import "./globals.css";

// Script decorativo
const greatVibes = localFont({
  src: "../fonts/great-vibes-latin-400-normal.woff2",
  variable: "--font-script",
  weight: "400",
  display: "swap",
});

// Parágrafos
const poppins = localFont({
  src: [
    { path: "../fonts/poppins-latin-300-normal.woff2", weight: "300" },
    { path: "../fonts/poppins-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/poppins-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/poppins-latin-600-normal.woff2", weight: "600" },
    { path: "../fonts/poppins-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

// Rótulos em caixa alta
const josefin = localFont({
  src: [
    { path: "../fonts/josefin-sans-latin-300-normal.woff2", weight: "300" },
    { path: "../fonts/josefin-sans-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/josefin-sans-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-label",
  display: "swap",
});

// ---- Fontes do Bratan ----
// Nome: condensada e pesada, com a presença de um pit monster
const anton = localFont({
  src: "../fonts/anton-latin-400-normal.woff2",
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

// Textos, títulos dos cards e rótulos: geométrica, redondinha e amigável
const outfit = localFont({
  src: [
    { path: "../fonts/outfit-latin-300-normal.woff2", weight: "300" },
    { path: "../fonts/outfit-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/outfit-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/outfit-latin-600-normal.woff2", weight: "600" },
    { path: "../fonts/outfit-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-outfit",
  display: "swap",
});

// Detalhes manuscritos: preço, assinatura do rodapé
const caveat = localFont({
  src: "../fonts/caveat-latin-700-normal.woff2",
  variable: "--font-hand",
  weight: "700",
  display: "swap",
});

// Metadados padrão do site inteiro. Cada página sobrescreve o que for dela.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bratan Pit Monster | Os produtos indicados pelo Bratan",
    template: "%s | Bratan Pit Monster",
  },
  description:
    "Aqui você só encontra os produtos indicados pelo Bratan: ração, roupas, snacks, suplementos, tapete personalizado e as redes do monstrão.",
  twitter: { card: "summary_large_image" },
  openGraph: {
    siteName: "Bratan Pit Monster",
    images: [{ url: "/bratan/og.jpg", width: 1200, height: 630, alt: "Bratan Pit Monster" }],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${greatVibes.variable} ${poppins.variable} ${josefin.variable} ${anton.variable} ${outfit.variable} ${caveat.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
