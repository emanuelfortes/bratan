// Toda a copy da landing do curso fica aqui. Edite este arquivo para trocar os
// textos sem mexer nos componentes. Contato e redes ficam em src/data/site.ts.

import { contato, montarWhatsapp } from "./site";

export { contato };

export const whatsappLink = montarWhatsapp(contato.whatsappMensagem);

export const numeros = [
  { valor: "16", rotulo: "aulas presenciais" },
  { valor: "2", rotulo: "aulas por semana" },
  { valor: "2–4h", rotulo: "de duração por aula" },
  { valor: "100%", rotulo: "prática em modelos reais" },
];

export const modalidades = [
  {
    titulo: "Aula Teórica",
    resumo:
      "Entender como funciona o mecanismo do maquinário — máquinas e tesouras — e aprender a fazer as regulagens necessárias para não depender de terceiros. Inclui aula assistida de corte de cabelo.",
    topicos: [
      "Mecanismo de máquinas e tesouras",
      "Regulagem completa do maquinário",
      "Aula assistida de corte de cabelo",
      "A profissão de barbeiro por dentro",
    ],
  },
  {
    titulo: "Aula Prática",
    resumo:
      "Praticar tanto a regulagem do maquinário quanto colocar em prática as técnicas de corte de cabelo em modelos reais, com acompanhamento direto do professor.",
    topicos: [
      "Regulagem na mão do aluno",
      "Técnicas de corte em modelos reais",
      "Corte social e degradê",
      "Correção em tempo real",
    ],
  },
];

export const cronograma = [
  {
    etapa: "Aula 1",
    tipo: "Teórica",
    titulo: "Apresentação e maquinário",
    descricao:
      "Apresentação do professor e dos alunos com um coffee break para conhecer a turma. Apresentação dos maquinários, valores e qualidades. Explicação do que é um corte social, o que é um degradê, e como os diversos tipos de cabelo e formatos de crânio mudam o resultado dependendo da técnica usada — com slides e fotos.",
  },
  {
    etapa: "Aula 2",
    tipo: "Teórica",
    titulo: "Demonstração em modelos",
    descricao:
      "O professor apresenta modelos e explica na prática tudo o que foi visto na teoria, para o aluno enxergar a técnica acontecendo antes de pegar na máquina.",
  },
  {
    etapa: "Aulas 3 a 15",
    tipo: "Teoria + Prática",
    titulo: "Mão na máquina",
    descricao:
      "As demais aulas mesclam teoria e prática, com a maioria sendo prática: regulagem do maquinário e técnicas de corte em modelos reais até chegar ao final do curso.",
  },
  {
    etapa: "Aula 16",
    tipo: "Encerramento",
    titulo: "Entrega dos certificados",
    descricao:
      "Última aula com a entrega do certificado de conclusão. Depois do curso, o aluno continua com suporte técnico do professor.",
  },
];

export const beneficios = [
  {
    titulo: "Certificado de conclusão",
    descricao: "Ao finalizar as 16 aulas, o aluno recebe o certificado de conclusão do curso.",
  },
  {
    titulo: "Suporte técnico após o curso",
    descricao: "Terminou o curso e ficou com dúvida? O suporte continua depois da formatura.",
  },
  {
    titulo: "Horário flexível",
    descricao: "2 aulas por semana, combinadas de acordo com a disponibilidade do aluno e do professor.",
  },
  {
    titulo: "Independência com o maquinário",
    descricao: "Aprenda a regular suas próprias máquinas e tesouras e nunca mais dependa de terceiros.",
  },
];

export const videos = [
  { src: "/video/corte-1.mp4", poster: "/img/poster-1.webp", titulo: "Pompadour moderno" },
  { src: "/video/corte-2.mp4", poster: "/img/poster-2.webp", titulo: "Low Fade Buzz Cut" },
  { src: "/video/corte-3.mp4", poster: "/img/poster-3.webp", titulo: "Low Drop Fade" },
];

export const faq = [
  {
    pergunta: "Preciso ter experiência para fazer o curso?",
    resposta:
      "Não. O curso é para iniciantes: as duas primeiras aulas são teóricas justamente para você entender o maquinário e a profissão antes de começar a cortar.",
  },
  {
    pergunta: "Quanto tempo dura o curso?",
    resposta:
      "São 16 aulas presenciais, 2 por semana, cada uma com duração média de 2 a 4 horas. Em torno de 2 meses, dependendo dos horários combinados.",
  },
  {
    pergunta: "Vou praticar em pessoas de verdade?",
    resposta:
      "Sim. As aulas práticas são feitas em modelos reais, com o professor acompanhando e corrigindo em tempo real.",
  },
  {
    pergunta: "Recebo certificado?",
    resposta:
      "Sim. Na última aula é entregue o certificado de conclusão, e você ainda conta com suporte técnico após o curso.",
  },
];
