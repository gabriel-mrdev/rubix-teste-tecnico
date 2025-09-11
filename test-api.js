const http = require('http');

// Testar se a API está funcionando
function testAPI() {
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/health',
    method: 'GET',
  };

  const req = http.request(options, res => {
    console.log(`Status: ${res.statusCode}`);

    let data = '';
    res.on('data', chunk => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('Resposta da API:', data);
      if (res.statusCode === 200) {
        console.log('✅ Backend funcionando corretamente!');
      } else {
        console.log('❌ Backend com problemas');
      }
    });
  });

  req.on('error', error => {
    console.log('❌ Erro ao conectar com a API:', error.message);
    console.log('Certifique-se de que o backend está rodando na porta 3001');
  });

  req.end();
}

console.log('🧪 Testando API...');
testAPI();
