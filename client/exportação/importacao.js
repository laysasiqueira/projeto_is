const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

// Caminhos para os arquivos exportados
const filePaths = [
  path.resolve(__dirname, '../../server/graphql/data/students.json'),
  path.resolve(__dirname, '../../server/graphql/data/lessons.json'),
  path.resolve(__dirname, '../../server/grpc/data/students.json'),
  path.resolve(__dirname, '../../server/rest/database/alunos.json')
];
// --- IMPORTAR JSON ---
function importarJson(filePath) {
  const rawData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(rawData);
  console.log('Dados importados do JSON:');
  console.log(data);
  return data;
}

// --- IMPORTAR XML ---
async function importarXml(filePath) {
  const rawXml = fs.readFileSync(filePath, 'utf8');
  const parser = new xml2js.Parser();

  try {
    const result = await parser.parseStringPromise(rawXml);
    console.log('Dados importados do XML:');
    console.log(result.dados.item);
    return result.dados.item;
  } catch (err) {
    console.error('Erro ao processar XML:', err);
  }
}

// Executar a importação
(async () => {
  const dadosJson = importarJson(jsonPath);
  const dadosXml = await importarXml(xmlPath);

  // Aqui você pode comparar, validar, salvar no banco de dados, etc.
})();
