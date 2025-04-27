//exportação

const fs = require('fs');
const path = require('path');
const { Builder } = require('xml2js');

// Caminhos absolutos dos arquivos
const filePaths = [
  path.resolve(__dirname, '../../server/graphql/data/students.json'),
  path.resolve(__dirname, '../../server/graphql/data/lessons.json'),
  path.resolve(__dirname, '../../server/rest/database/alunos.json'),
  path.resolve(__dirname, '../../server/grpc/data/students.json')
];

// Função para ler JSON de um arquivo
function readJson(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
}

// Combinar os dados de todos os arquivos
let dadosCombinados = [];

filePaths.forEach((filePath) => {
  const data = readJson(filePath);
  if (Array.isArray(data)) {
    dadosCombinados = dadosCombinados.concat(data);
  } else {
    dadosCombinados.push(data);
  }
});

// Escrever dados combinados em JSON
fs.writeFileSync(
  path.resolve(__dirname, 'dados_combinados.json'),
  JSON.stringify(dadosCombinados, null, 2),
  'utf8'
);

// Preparar dados para XML
const xmlBuilder = new Builder();
const xml = xmlBuilder.buildObject({ dados: { item: dadosCombinados } });

fs.writeFileSync(
  path.resolve(__dirname, 'dados_combinados.xml'),
  xml,
  'utf8'
);

console.log('Exportação para JSON e XML concluída!');
