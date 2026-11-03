// Copy da página da vaga (/vaga). Espelha a arte "Estamos contratando barbeiro".

import { montarWhatsapp } from "./site";

export type IconeRequisito = "tesoura" | "equipe" | "aperto" | "relogio";

export const vaga = {
  chapeu: "Estamos",
  titulo: "Contratando",
  cargo: "Barbeiro",
  requisitos: [
    { icone: "tesoura" as IconeRequisito, texto: "Barbeiro experiente" },
    { icone: "equipe" as IconeRequisito, texto: "Trabalho em equipe" },
    { icone: "aperto" as IconeRequisito, texto: "Compromisso" },
    { icone: "relogio" as IconeRequisito, texto: "Pontualidade" },
  ],
  ctaTitulo: "Para mais informações",
  ctaTexto: "Entre em contato pelo nosso WhatsApp",
  ctaBotao: "Falar no WhatsApp",
};

export const vagaWhatsappLink = montarWhatsapp(
  "Olá, Ramon! Vi a vaga de barbeiro no site e quero me candidatar."
);
