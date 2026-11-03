// Os cards da página inicial (o "hub"). A ordem deste array é a ordem que
// aparece na tela — basta trocar de lugar para mudar a prioridade.

export type HubLink = {
  href: string;
  etiqueta: string;
  titulo: string;
  descricao: string;
  imagem: string;
  /** Card em destaque: moldura dourada e etiqueta preenchida. Use em um só. */
  destaque?: boolean;
  /** Link para fora do site (abre em nova aba). */
  externo?: boolean;
};

export const hubLinks: HubLink[] = [
  {
    href: "/vaga",
    etiqueta: "Vaga aberta",
    titulo: "Trabalhe na barbearia",
    descricao:
      "Estamos contratando barbeiro. Veja o perfil que procuramos e fale com a gente pelo WhatsApp.",
    imagem: "/img/ramonhero4k.webp",
    destaque: true,
  },
  {
    href: "/curso",
    etiqueta: "Turmas reduzidas",
    titulo: "Curso de Barbeiro Iniciante",
    descricao:
      "16 aulas presenciais, prática em modelos reais, certificado de conclusão e suporte depois do curso.",
    imagem: "/img/ramon-2.webp",
  },
  {
    href: "/evento",
    etiqueta: "Evento de um dia",
    titulo: "Curso Prático de Aperfeiçoamento",
    descricao:
      "Dois cortes demonstrados pelo professor de manhã, a máquina na sua mão à tarde e certificado no fim do dia.",
    imagem: "/img/outros-cortes2.webp",
  },
];

export const perfil = {
  nome: "Ramon Silva",
  titulo: "Barbeiro",
  bio: "Barbearia, formação e eventos em Fortaleza. Escolha abaixo o que você procura.",
  foto: "/img/ramonhero4k.webp",
};
