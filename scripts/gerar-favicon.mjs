/**
 * Gera os ícones do site a partir da foto de frente do Bratan:
 *   src/app/favicon.ico   (16, 32 e 48 px, para abas e navegadores antigos)
 *   src/app/icon.png      (256 px, redondo com fundo transparente)
 *   src/app/apple-icon.png (180 px, quadrado com fundo creme, para iPhone)
 *
 * O Next lê esses arquivos de src/app/ sozinho e põe as tags <link> no <head>.
 * Rodar de novo depois de trocar a foto:  node scripts/gerar-favicon.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const raiz = process.cwd();
const foto = path.join(raiz, "bratan", "734656209_18100179134589476_35043245666666691_n.jpg");
const app = path.join(raiz, "src", "app");

// Quadrado em volta do rosto (das orelhas até o queixo) na foto original 2268×3024
const ROSTO = { left: 440, top: 10, width: 1420, height: 1420 };

const CARAMELO = "#c8692e";
const CREME = "#f6eee4";

/** Rosto recortado em círculo com aro caramelo, fundo transparente. */
async function redondo(tam) {
  const aro = Math.max(1, Math.round(tam * 0.045));
  const dentro = tam - aro * 2;

  const rosto = await sharp(foto)
    .rotate()
    .extract(ROSTO)
    .resize(dentro, dentro)
    .modulate({ saturation: 1.08 })
    .sharpen(tam <= 64 ? { sigma: 0.6 } : undefined)
    .composite([
      {
        input: Buffer.from(
          `<svg width="${dentro}" height="${dentro}"><circle cx="${dentro / 2}" cy="${dentro / 2}" r="${dentro / 2}"/></svg>`
        ),
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

  return sharp({
    create: { width: tam, height: tam, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      {
        input: Buffer.from(
          `<svg width="${tam}" height="${tam}"><circle cx="${tam / 2}" cy="${tam / 2}" r="${tam / 2}" fill="${CARAMELO}"/></svg>`
        ),
      },
      { input: rosto, left: aro, top: aro },
    ])
    .png()
    .toBuffer();
}

/** Monta um .ico com PNGs dentro (aceito por todos os navegadores atuais). */
function montarIco(pngs) {
  const cab = Buffer.alloc(6 + pngs.length * 16);
  cab.writeUInt16LE(0, 0);
  cab.writeUInt16LE(1, 2);
  cab.writeUInt16LE(pngs.length, 4);
  let offset = cab.length;
  pngs.forEach(({ tam, buf }, i) => {
    const e = 6 + i * 16;
    cab.writeUInt8(tam >= 256 ? 0 : tam, e);
    cab.writeUInt8(tam >= 256 ? 0 : tam, e + 1);
    cab.writeUInt8(0, e + 2);
    cab.writeUInt8(0, e + 3);
    cab.writeUInt16LE(1, e + 4);
    cab.writeUInt16LE(32, e + 6);
    cab.writeUInt32LE(buf.length, e + 8);
    cab.writeUInt32LE(offset, e + 12);
    offset += buf.length;
  });
  return Buffer.concat([cab, ...pngs.map((p) => p.buf)]);
}

const icoTams = [16, 32, 48];
const ico = montarIco(await Promise.all(icoTams.map(async (tam) => ({ tam, buf: await redondo(tam) }))));
fs.writeFileSync(path.join(app, "favicon.ico"), ico);

fs.writeFileSync(path.join(app, "icon.png"), await redondo(256));

// iPhone não aceita transparência: círculo sobre fundo creme
const apple = await sharp({
  create: { width: 180, height: 180, channels: 4, background: CREME },
})
  .composite([{ input: await redondo(156), left: 12, top: 12 }])
  .png()
  .toBuffer();
fs.writeFileSync(path.join(app, "apple-icon.png"), apple);

console.log("favicon.ico, icon.png e apple-icon.png prontos em src/app/");
