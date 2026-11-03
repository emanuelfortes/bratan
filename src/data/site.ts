/**
 * Domínio do site, usado só no servidor para montar o metadataBase.
 *
 * As imagens de compartilhamento precisam de URL absoluta: o WhatsApp e o
 * Facebook buscam a imagem pelo servidor deles, então um domínio errado faz o
 * preview simplesmente não aparecer. Por isso o endereço vem da hospedagem em
 * vez de ficar chumbado aqui.
 *
 * Ordem: NEXT_PUBLIC_SITE_URL manda (use para o domínio próprio) → domínio de
 * produção da Vercel → URL do deploy atual (previews) → localhost.
 */
function descobrirSiteUrl() {
  const { NEXT_PUBLIC_SITE_URL, VERCEL_PROJECT_PRODUCTION_URL, VERCEL_URL } =
    process.env;

  if (NEXT_PUBLIC_SITE_URL) return NEXT_PUBLIC_SITE_URL;
  if (VERCEL_PROJECT_PRODUCTION_URL) return `https://${VERCEL_PROJECT_PRODUCTION_URL}`;
  if (VERCEL_URL) return `https://${VERCEL_URL}`;
  return "http://localhost:3000";
}

export const siteUrl = descobrirSiteUrl();
