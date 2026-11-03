/**
 * Gera os cards de compartilhamento (Open Graph) em public/og/.
 *
 * As fotos do site são todas em retrato; o WhatsApp, o Facebook e o LinkedIn
 * querem 1200x630 deitado e cortam retrato de um jeito feio. Aqui cada foto é
 * recortada nesse formato mirando no rosto do Ramon, escurecida num gradiente
 * e, quando faz sentido, recebe a logo branca por cima.
 *
 * Rodar depois de trocar alguma foto:  node scripts/gerar-og.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const LARGURA = 1200;
const ALTURA = 630;
const PROPORCAO = LARGURA / ALTURA;

const raiz = process.cwd();
// Lê dos originais, não do WebP servido: o card já é uma segunda compressão.
const img = (nome) => path.join(raiz, "assets", "originais", nome);
const saida = path.join(raiz, "public", "og");

/**
 * foco:   onde está o rosto dele, em fração da largura e da altura da foto
 * logo:   sobrepor a logo branca. Fica false na ramon-1, que já traz a logo
 *         dourada na parede — duas marcas na mesma imagem brigam
 * sombra: opacidade do véu escuro na borda esquerda
 */
const cards = [
  { nome: "hub", foto: img("ramonhero4k.png"), foco: [0.59, 0.39], logo: true, sombra: 0.9 },
  { nome: "curso", foto: img("ramonhero4k.png"), foco: [0.59, 0.39], logo: true, sombra: 0.9 },
  { nome: "vaga", foto: img("ramon-1.jpg"), foco: [0.6, 0.42], logo: false, sombra: 0.4 },
  { nome: "evento", foto: img("ramonhero4k.png"), foco: [0.59, 0.39], logo: true, sombra: 0.9 },
];

const veu = (sombra) =>
  Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${LARGURA}" height="${ALTURA}">
  <defs>
    <linearGradient id="lado" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#030302" stop-opacity="${sombra}" />
      <stop offset="0.42" stop-color="#030302" stop-opacity="${sombra * 0.5}" />
      <stop offset="1" stop-color="#030302" stop-opacity="0.04" />
    </linearGradient>
    <linearGradient id="base" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#030302" stop-opacity="0.7" />
      <stop offset="0.5" stop-color="#030302" stop-opacity="0.12" />
      <stop offset="1" stop-color="#030302" stop-opacity="0.34" />
    </linearGradient>
  </defs>
  <rect width="${LARGURA}" height="${ALTURA}" fill="url(#lado)" />
  <rect width="${LARGURA}" height="${ALTURA}" fill="url(#base)" />
</svg>`);

/** Maior recorte 1200x630 possível, centrado no rosto e preso às bordas. */
function recorte(largura, altura, [fx, fy]) {
  let w = largura;
  let h = Math.round(w / PROPORCAO);
  if (h > altura) {
    h = altura;
    w = Math.round(h * PROPORCAO);
  }
  const left = Math.min(Math.max(Math.round(fx * largura - w / 2), 0), largura - w);
  const top = Math.min(Math.max(Math.round(fy * altura - h / 2), 0), altura - h);
  return { left, top, width: w, height: h };
}

const logo = await sharp(img("logo-white.png")).resize({ width: 430 }).png().toBuffer();
const logoAltura = (await sharp(logo).metadata()).height;

fs.mkdirSync(saida, { recursive: true });

for (const card of cards) {
  const meta = await sharp(card.foto).metadata();
  const area = recorte(meta.width, meta.height, card.foco);

  const arquivo = path.join(saida, `${card.nome}.jpg`);
  await sharp(card.foto)
    .extract(area)
    .resize(LARGURA, ALTURA)
    .composite([
      { input: veu(card.sombra), top: 0, left: 0 },
      ...(card.logo
        ? [{ input: logo, top: Math.round((ALTURA - logoAltura) / 2), left: 72 }]
        : []),
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(arquivo);

  const kb = (fs.statSync(arquivo).size / 1024).toFixed(0);
  console.log(
    `${card.nome}.jpg  ${LARGURA}x${ALTURA}  ${kb} KB  ` +
      `(recorte ${area.width}x${area.height} de ${meta.width}x${meta.height})`
  );
}
