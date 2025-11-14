export default {
  async fetch(request, env, ctx) {
    // Configuração
    const ORIGIN_HOST = 'erp.growatt.app'; // O domínio que o servidor espera no Host header
    const PROXY_HOST = 'erp-old.growatt.app'; // O domínio que deve ser interceptado
    const BACKEND_IP = '212.28.186.248'; // O IP do servidor real
    const BACKEND_PORT = '8080'; // Porta do ERPNext frontend

    // Clona a URL original
    const url = new URL(request.url);

    // Se não for o domínio correto, apenas retorna a requisição original
    if (url.hostname !== PROXY_HOST) {
      return fetch(request);
    }

    // Força HTTP e aponta para o IP:porta do backend
    url.protocol = 'http:';
    url.hostname = BACKEND_IP;
    url.port = BACKEND_PORT;

    // Cria novos headers baseados na requisição original
    const headers = new Headers(request.headers);
    
    // REESCREVE o cabeçalho Host.
    // O servidor vai achar que o usuário acessou "erp.growatt.app"
    headers.set('Host', ORIGIN_HOST);

    // Cria uma nova requisição com os headers modificados
    const newRequest = new Request(url.toString(), {
      method: request.method,
      headers: headers,
      body: request.body
    });

    // Envia a requisição para o servidor original e devolve a resposta para o usuário
    return fetch(newRequest);
  }
};