export default {
  async fetch(request, env, ctx) {
    // Configuração
    const ORIGIN_HOST = 'erp.growatt.app'; // O domínio que o servidor JÁ aceita/espera

    // Clona a URL original (erp-old...)
    const url = new URL(request.url);

    // Altera o hostname da URL para o original para fins de roteamento
    url.hostname = ORIGIN_HOST;

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
}
