const http = require('http');
const soap = require('strong-soap').soap;
const fs = require('fs');
const libxmljs = require('libxmljs2');



const wsdl = fs.readFileSync('escola.wsdl', 'utf8');
const xsd = fs.readFileSync('escola.xsd', 'utf8');
const xsdDoc = libxmljs.parseXmlString(xsd);
//const xsdDoc = libxmljs.parseXml(xsd);

const banco = {
  aulas: {
    101: {
      disciplina: 'Matemática',
      alunos: []
    },
    102: {
      disciplina: 'História',
      alunos: []
    }
  }
};

const validarXML = (xml) => {
  const doc = libxmljs.parseXml(xml);
  return doc.validate(xsdDoc) ? null : doc.validationErrors;
};

//const validarXML = (_) => null;
const service = {
  EscolaService: {
    EscolaPort: {
      matricularAluno(args) {
        const { alunoId, nome, aulaId } = args;

        const xml = `
          <MatricularAlunoRequest xmlns="http://www.exemplo.com/escola">
            <alunoId>${alunoId}</alunoId>
            <nome>${nome}</nome>
            <aulaId>${aulaId}</aulaId>
          </MatricularAlunoRequest>`;

        const erros = validarXML(xml);
        if (erros) throw new Error('Dados inválidos: ' + erros[0].message);

        const aula = banco.aulas[aulaId];
        if (!aula) throw new Error('Aula não encontrada.');

        aula.alunos.push({ alunoId, nome });

        //return { mensagem: `Aluno ${nome} matriculado com sucesso na aula ${aula.disciplina}.` };
        // return {
        //   MatricularAlunoResponse: {
        //     mensagem: `Aluno ${nome} matriculado com sucesso na aula ${aula.disciplina}.`
        //   }
        // };
        return {
          MatricularAlunoResponse: {
            mensagem: `Aluno ${nome} matriculado com sucesso na aula ${aula.disciplina}.`
          }
        };
        
        
      },

      listarAlunosPorAula(args) {
        const { aulaId } = args;
        const aula = banco.aulas[aulaId];

        if (!aula) throw new Error('Aula não encontrada.');

        return { alunos: aula.alunos };
      }
    }
  }
};

  const server = http.createServer();
  server.listen(8000, () => {
    soap.listen(server, '/escola', service, wsdl);
    console.log('Servidor SOAP disponível em http://localhost:8000/escola?wsdl');
  });
