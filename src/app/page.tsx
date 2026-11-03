import type { Metadata } from "next";
import SurrealHub from "@/components/surreal/SurrealHub";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "Bratan Pit Monster",
    description: "Aqui você só encontra os produtos indicados pelo Bratan",
    url: "/",
    images: [{ url: "/bratan/og.jpg", width: 1200, height: 630, alt: "Bratan Pit Monster" }],
  },
};

export default function HubPage() {
  return <SurrealHub />;
}
