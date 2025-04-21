//nst soap = require('strong-soap').soap;
//const libxmljs = require('libxmljs2');


//const xsdDoc = libxmljs.parseXmlString(xsd);
const soap = require('soap');

// import soap from 'soap';
const fsp = require('fs/promises');
const libxmljs = require('libxmljs2');

async function main() {
  console.log('🚀 Iniciando cliente SOAP...');

  const url = 'http://localhost:8000/escola?wsdl';

  soap.createClient(url, {}, function(err, client) {
    if (err) {
      console.error('❌ Erro ao criar cliente SOAP:', err);
      return;
    }

    console.log('✅ Cliente criado com sucesso.');

    const matriculaArgs = {
      alunoId: 1,
      nome: 'João Silva',
      aulaId: 102
    };

    client.EscolaService.EscolaPort.matricularAluno(matriculaArgs, function(err, result) {
      if (err) return console.error('❌ Erro ao matricular aluno:', err);
      console.log('🎉 Resposta da matrícula:', result);

      client.EscolaService.EscolaPort.listarAlunosPorAula({ aulaId: 101 }, function(err, result) {
        if (err) return console.error('❌ Erro ao listar alunos:', err);
        console.log('📋 Alunos na aula 101:', JSON.stringify(result, null, 2));
      });
    });
  });
}

main();
