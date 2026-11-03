// Copy da página do evento (/evento) — o curso prático de um dia.
// Data, local e valores ficam no WhatsApp enquanto não forem definidos.

import { montarWhatsapp } from "./site";

export const evento = {
  chapeu: "Evento de um dia",
  titulo: "Curso Prático",
  destaque: "Aperfeiçoamento",
  resumo:
    "Um dia inteiro de aperfeiçoamento prático. De manhã o professor executa e destrincha cada técnica em modelos escolhidos conforme a necessidade da turma. À tarde a máquina passa para a mão do aluno. No fim do dia, certificado entregue.",

  numeros: [
    { valor: "1", rotulo: "dia inteiro" },
    { valor: "2", rotulo: "cortes demonstrados" },
    { valor: "1h30", rotulo: "por demonstração" },
    { valor: "100%", rotulo: "prática em modelos" },
  ],

  programacao: [
    {
      periodo: "Manhã",
      horario: "Abertura",
      titulo: "Coffee break e apresentação dos modelos",
      descricao:
        "O dia começa com um coffee break e a apresentação dos modelos, escolhidos conforme a necessidade dos alunos da turma.",
    },
    {
      periodo: "Manhã",
      horario: "2 cortes · 1h30 cada",
      titulo: "Demonstração de técnicas pelo professor",
      descricao:
        "São dois cortes de cabelo, cada um executado em uma média de 1h30. O professor mostra o detalhe por trás de cada técnica — é a hora de o aluno ficar atento a cada detalhe e absorver o máximo de informação do trabalho executado.",
    },
    {
      periodo: "Intervalo",
      horario: "12:00 às 13:00",
      titulo: "Pausa para o almoço",
      descricao:
        "Retorno às 13:00 para dar início à parte prática dos alunos.",
    },
    {
      periodo: "Tarde",
      horario: "A partir das 13:30",
      titulo: "A máquina na mão do aluno",
      descricao:
        "Os alunos aplicam as técnicas passadas pelo professor, aperfeiçoando tanto a parte inferior quanto o topo do cabelo, para progredir no dia a dia com seus clientes e modelos.",
    },
    {
      periodo: "Encerramento",
      horario: "Fim da prática",
      titulo: "Entrega do certificado",
      descricao:
        "Assim que os alunos finalizam a parte prática, é entregue o certificado de conclusão do aperfeiçoamento prático.",
    },
  ],

  bonus: {
    etiqueta: "Bônus",
    titulo: "Os alunos ainda ganham de brinde",
    itens: [
      "Dicas de como finalizar o cabelo",
      "Dicas de como tirar boas fotos para divulgação",
    ],
  },

  galeria: [
    { src: "/img/outros-cortes2.webp", alt: "Side part com degradê na navalha" },
    { src: "/img/outros-cortes.webp", alt: "Taper baixo finalizado na nuca" },
  ],

  ctaTitulo: "Quer garantir sua vaga?",
  ctaTexto: "Data, local e valores pelo WhatsApp",
  ctaBotao: "Falar no WhatsApp",
};

export const eventoWhatsappLink = montarWhatsapp(
  "Olá, Ramon! Quero saber mais sobre o curso prático de aperfeiçoamento de um dia."
);
