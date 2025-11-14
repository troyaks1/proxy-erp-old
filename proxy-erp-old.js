export default {
  async fetch(request, env, ctx) {
    const ORIGINAL_HOST = 'erp.growatt.app';
    const DIRECT_ORIGIN = 'direct-erp.growatt.app'; 

    const url = new URL(request.url);

    // 1. Forçamos o uso de HTTP para evitar o erro de SSL no backend
    url.protocol = 'http:'; 

    // 2. Definimos o destino direto (IP)
    url.hostname = DIRECT_ORIGIN;

    // 3. Se necessário, ajuste a porta (padrão http é 80)
    url.port = '80';

    const newRequest = new Request(url.toString(), request);

    // Mantemos o Host original para o servidor saber qual site entregar
    newRequest.headers.set('Host', ORIGINAL_HOST);

    return fetch(newRequest);
  }
};