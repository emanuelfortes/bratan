/**
 * Converte as fotos originais para WebP em public/img/.
 *
 * Os originais ficam em assets/originais/, fora de public/, para não irem
 * junto no deploy — só o WebP é servido. Rode de novo depois de acrescentar
 * ou trocar alguma foto lá:  node scripts/gerar-imagens.mjs
 *
 * Qualidade 80 nas fotos (o teto de 20% de perda pedido) e sem perda nas
 * logos, que têm traço fino e transparência e sujariam num lossy.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const raiz = process.cwd();
const origem = path.join(raiz, "assets", "originais");
const destino = path.join(raiz, "public", "img");

const QUALIDADE = 80;
const semPerda = (nome) => nome.startsWith("logo-");

if (!fs.existsSync(origem)) {
  console.error(`Nada em ${path.relative(raiz, origem)} — os originais moram lá.`);
  process.exit(1);
}

fs.mkdirSync(destino, { recursive: true });

const arquivos = fs
  .readdirSync(origem)
  .filter((f) => /\.(png|jpe?g)$/i.test(f))
  .sort();

let antes = 0;
let depois = 0;

for (const arquivo of arquivos) {
  const nome = arquivo.replace(/\.(png|jpe?g)$/i, "");
  const entrada = path.join(origem, arquivo);
  const saida = path.join(destino, `${nome}.webp`);

  await sharp(entrada)
    .webp(semPerda(nome) ? { lossless: true } : { quality: QUALIDADE })
    .toFile(saida);

  const de = fs.statSync(entrada).size;
  const para = fs.statSync(saida).size;
  antes += de;
  depois += para;

  const pct = (100 - (para / de) * 100).toFixed(0);
  console.log(
    `${nome.padEnd(18)} ${(de / 1024).toFixed(0).padStart(5)} KB → ` +
      `${(para / 1024).toFixed(0).padStart(5)} KB  (-${pct}%)` +
      (semPerda(nome) ? "  sem perda" : "")
  );
}

console.log(
  `\ntotal: ${(antes / 1024 / 1024).toFixed(2)} MB → ` +
    `${(depois / 1024 / 1024).toFixed(2)} MB  ` +
    `(-${(100 - (depois / antes) * 100).toFixed(0)}%)`
);
