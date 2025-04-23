const { alunos } = require('../data/db');

module.exports = {
  SchoolService: {
    SchoolPort: {
      CreateAluno(args, callback) {
        const aluno = args.aluno;

        // ⚠️ Proteção básica
        if (!aluno || typeof aluno !== 'object') {
          return callback(null, {
            output: {
              result: "Erro: aluno inválido ou ausente."
            }
          });
        }

        alunos.push(aluno);

        // ✅ Retorno que o WSDL com "output" espera
        callback(null, {
          output: {
            result: `Aluno ${aluno.nome} criado com sucesso.`
          }
        });
      }
    }
  }
};
