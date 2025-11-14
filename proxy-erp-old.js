export default {
  async fetch(request, env, ctx) {
    // 1. O domínio que o servidor Nginx/Traefik espera receber
    const ORIGINAL_HOST = 'erp.growatt.app';

    // 2. O domínio "técnico" que aponta direto pro IP (Nuvem Cinza)
    const DIRECT_ORIGIN = 'erp-old.growatt.app'; 

    const url = new URL(request.url);

    // Truque: Mantemos o caminho (/login, /api), mas trocamos o servidor de destino
    // para o endereço que resolve direto o IP (bypass Cloudflare Proxy)
    url.hostname = DIRECT_ORIGIN;

    // Cria a nova requisição
    const newRequest = new Request(url.toString(), request);

    // O MAIS IMPORTANTE: Forçamos o cabeçalho Host.
    // Assim, seu servidor recebe a conexão vinda do IP direto, 
    // mas acha que o usuário digitou "erp.growatt.app"
    newRequest.headers.set('Host', ORIGINAL_HOST);

    // Se o seu servidor usa HTTPS com verificação restrita de SNI,
    // pode ser necessário desativar a verificação SSL do Worker (opcional, tente sem primeiro)
    // mas geralmente o fetch padrão funciona se o certificado do servidor cobrir o domínio.

    return fetch(newRequest);
  }
};