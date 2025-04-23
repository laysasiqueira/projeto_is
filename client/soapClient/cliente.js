const soap = require('strong-soap').soap;
const url = 'http://localhost:8000/schoolService?wsdl';

soap.createClient(url, {}, (err, client) => {
  if (err) {
    console.error('Erro ao criar cliente:', err);
    return;
  }

  console.log('✅ Cliente SOAP criado.');

  console.log('--- Métodos disponíveis ---');
  console.dir(client.describe(), { depth: null });

  const aluno = { id: 1, nome: 'Maria Teste', idade: 21 };

  client.SchoolService.SchoolPort.CreateAluno({ aluno }, (err, res) => {
    if (err) return console.error('❌ Erro CreateAluno:', err.body || err);
    console.log('📘 Resposta do servidor:', res.output?.result);
  });
});
