const soap = require('soap');

const url = 'http://localhost:8000/escola?wsdl';

soap.createClient(url, {}, function (err, client) {
  if (err) return console.error('Erro ao criar cliente SOAP:', err);

  const matriculaArgs = {
    alunoId: 1,
    nome: 'João da Silva',
    aulaId: 101
  };

  client.matricularAluno(matriculaArgs, function (err, result) {
    if (err) return console.error('Erro ao matricular aluno:', err);
    console.log('✅ Matrícula feita:', result);

    client.listarAlunosPorAula({ aulaId: 101 }, function (err, result) {
      if (err) return console.error('Erro ao listar alunos:', err);
      console.log('📋 Alunos na aula 101:', JSON.stringify(result, null, 2));
    });
  });
});
