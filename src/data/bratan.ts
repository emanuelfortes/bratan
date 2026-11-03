// Tudo o que aparece na página inicial do Bratan. A ordem do array `links`
// é a ordem na tela, igual ao Linktree dele (linktr.ee/bratanpitmonster).

export type IconeRede = "tiktok" | "telegram" | "youtube" | "facebook";

export type BratanLink = {
  href: string;
  etiqueta: string;
  titulo: string;
  descricao: string;
  imagem: string;
  /** Preço ou número que aparece ao lado da etiqueta (ex.: R$ 49,90). */
  extra?: string;
  /** Ícone da rede dentro da etiqueta (TikTok, Telegram, YouTube). */
  icone?: IconeRede;
  /** Texto do botão de ação dentro do card. */
  acao: string;
  /** Card em destaque: borda caramelo, aura e reflexo. Use em um só. */
  destaque?: boolean;
};

export const perfil = {
  nome: "Bratan",
  apelido: "Pit Monster",
  usuario: "@bratanpitmonster",
  bio: "Aqui você só encontra os produtos indicados pelo Bratan",
  foto: "/bratan/hero.webp",
};

export const links: BratanLink[] = [
  {
    href: "https://vt.tiktok.com/ZS9k9Aeqxx3NV-pBTh8/",
    etiqueta: "O que ele come",
    titulo: "Ração que o Bratan come!",
    acao: "Ver a ração",
    descricao: "A ração super premium que mantém o monstrão forte e saudável.",
    imagem: "/bratan/racao.webp",
    destaque: true,
  },
  {
    href: "https://www.sparkpaws.com/BRATAN",
    etiqueta: "Importados",
    titulo: "Roupas, acessórios e muito mais",
    acao: "Ver a loja",
    descricao: "Roupas, coleiras, guias e conjuntos tutor + pet da Spark Paws.",
    imagem: "/bratan/roupas-rosto.webp",
  },
  {
    href: "https://vt.tiktok.com/ZS9k9SwPYsr6Y-2FS4e",
    etiqueta: "Snack premium",
    extra: "R$ 49,90",
    titulo: "Moringa Dog",
    acao: "Comprar",
    descricao: "O petisco natural de moringa que o Bratan aprova.",
    imagem: "/bratan/moringa.webp",
  },
  {
    href: "https://www.buddynutrition.com.br/discount/BRATANBUDDY",
    etiqueta: "Com desconto",
    titulo: "Suplementos naturais",
    acao: "Pegar desconto",
    descricao: "Buddy Nutrition com o cupom BRATANBUDDY já aplicado.",
    imagem: "/bratan/suplementos.webp",
  },
  {
    href: "https://tapz.com.br/parceiro/bratanpitmonster/",
    etiqueta: "Personalizado",
    titulo: "Tapz · Tapete Pet",
    acao: "Criar o meu",
    descricao: "Tapete com a cara do seu pet, igual ao do Bratan.",
    imagem: "/bratan/tapz.webp",
  },
  {
    href: "https://www.tiktok.com/@bratan.pitmonster?_t=8k9j4nc4btp&_r=1",
    etiqueta: "TikTok",
    extra: "610,4K seguidores",
    titulo: "Bratan · Pitmonster",
    acao: "Seguir",
    descricao: "Os vídeos do dia a dia do monstrão.",
    imagem: "/bratan/tiktok.webp",
    icone: "tiktok",
  },
  {
    href: "https://t.me/+aI9MbVHRowk1MTk5",
    etiqueta: "Telegram",
    titulo: "Grupo de dicas",
    acao: "Entrar no grupo",
    descricao: "Dicas, novidades e promoções em primeira mão.",
    imagem: "/bratan/telegram-espelhada.webp",
    icone: "telegram",
  },
  {
    href: "https://youtube.com/@bratan.pitmonster?si=yhT4RO5OIrgaKsq8",
    etiqueta: "YouTube",
    titulo: "Canal no YouTube",
    acao: "Assistir",
    descricao: "Vídeos completos do Bratan.",
    imagem: "/bratan/youtube.webp",
    icone: "youtube",
  },
];

// Ícones de redes do rodapé (os mesmos do fim do Linktree)
export const redes: { nome: string; href: string; icone: IconeRede }[] = [
  { nome: "YouTube", href: "https://youtube.com/@bratanthepitmonster?si=T407tYcvFtZNq3Sw", icone: "youtube" },
  { nome: "Facebook", href: "https://www.facebook.com/profile.php?id=100085493499814&mibextid=LQQJ4d", icone: "facebook" },
  { nome: "TikTok", href: "https://tiktok.com/@bratan.pitmonster", icone: "tiktok" },
];
