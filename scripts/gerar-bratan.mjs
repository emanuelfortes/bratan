/**
 * Converte as fotos da pasta bratan/ para WebP em public/bratan/ e gera o
 * card de compartilhamento (Open Graph) em public/bratan/og.jpg.
 *
 * Rodar de novo depois de trocar alguma foto:  node scripts/gerar-bratan.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const raiz = process.cwd();
const origem = path.join(raiz, "bratan");
const destino = path.join(raiz, "public", "bratan");
fs.mkdirSync(destino, { recursive: true });

const src = (nome) => path.join(origem, nome);

// nome de saída → arquivo original + tamanho
const fotos = [
  { saida: "hero", arquivo: "734656209_18100179134589476_35043245666666691_n.jpg", largura: 1100 },
  { saida: "tiktok", arquivo: "686545035_18091659755589476_8496012763119923676_n.jpg", quadrado: 480 },
  // espelhada: o rosto dele fica do lado direito, onde a foto aparece no card
  { saida: "telegram-espelhada", arquivo: "642986342_18083131469589476_6732311836508739980_n.jpg", quadrado: 480, espelhar: true },
  { saida: "youtube", arquivo: "631977517_18081665171589476_3832736238465345944_n.jpg", quadrado: 480 },
  { saida: "racao", arquivo: "raçao-do-bratan.webp", quadrado: 480 },
  // foto em pé: o rosto fica no topo, então recorta deitado a partir de cima
  { saida: "roupas-rosto", arquivo: "roupas-e-acessorios.png", recorte: [600, 460, "top"] },
  { saida: "moringa", arquivo: "moringa-dog.webp", quadrado: 480 },
  { saida: "suplementos", arquivo: "suplementos-naturais.png", quadrado: 480 },
  { saida: "tapz", arquivo: "tapz.png", quadrado: 480 },
];

for (const f of fotos) {
  let img = sharp(src(f.arquivo)).rotate();
  if (f.espelhar) img = img.flop();
  if (f.recorte) {
    const [l, a, pos] = f.recorte;
    img = img.resize(l, a, { fit: "cover", position: pos });
  } else if (f.quadrado) {
    img = img.resize(f.quadrado, f.quadrado, { fit: "cover", position: "attention" });
  } else {
    img = img.resize({ width: f.largura });
  }
  const out = path.join(destino, `${f.saida}.webp`);
  await img.webp({ quality: 80 }).toFile(out);
  console.log(`${f.saida.padEnd(12)} ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
}

// ---------- Open Graph 1200x630 ----------
const L = 1200;
const A = 630;
const foto = await sharp(src(fotos[0].arquivo))
  .rotate()
  .resize(560, A, { fit: "cover", position: "attention" })
  .toBuffer();

const fundo = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${L}" height="${A}">
  <defs>
    <radialGradient id="g" cx="75%" cy="30%" r="80%">
      <stop offset="0" stop-color="#4a2a18"/>
      <stop offset="0.55" stop-color="#1e110b"/>
      <stop offset="1" stop-color="#0e0806"/>
    </radialGradient>
    <linearGradient id="v" x1="0" x2="1">
      <stop offset="0" stop-color="#0e0806" stop-opacity="1"/>
      <stop offset="0.35" stop-color="#0e0806" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
</svg>`);

const texto = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${L}" height="${A}">
  <defs>
    <linearGradient id="v" x1="0" x2="1">
      <stop offset="0" stop-color="#0e0806" stop-opacity="1"/>
      <stop offset="0.3" stop-color="#0e0806" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="640" width="560" height="${A}" fill="url(#v)"/>
  <text x="80" y="230" font-family="Arial Black, Impact, sans-serif" font-size="120" font-weight="900" fill="#f3c98b">BRATAN</text>
  <text x="84" y="300" font-family="Arial, sans-serif" font-size="34" letter-spacing="10" fill="#d98f4e">PIT MONSTER</text>
  <text x="84" y="400" font-family="Arial, sans-serif" font-size="30" fill="#f5e6d3">Os produtos indicados pelo Bratan</text>
  <text x="84" y="450" font-family="Arial, sans-serif" font-size="30" fill="#c9a78a">em um lugar só</text>
</svg>`);

await sharp(fundo)
  .composite([
    { input: foto, left: 640, top: 0 },
    { input: texto, left: 0, top: 0 },
  ])
  .jpeg({ quality: 82 })
  .toFile(path.join(destino, "og.jpg"));
console.log("og.jpg pronto");
