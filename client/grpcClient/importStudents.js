const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const readline = require('readline');

// Configurar gRPC
const protoPath = path.resolve(__dirname, '../../server/grpc/protos/school.proto');
const packageDef = protoLoader.loadSync(protoPath);
const grpcObject = grpc.loadPackageDefinition(packageDef);
const client = new grpcObject.school.SchoolService('localhost:50051', grpc.credentials.createInsecure());

// Função para ler ficheiro JSON
function readJsonFile(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

// Função para ler ficheiro XML
async function readXmlFile(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  const parser = new xml2js.Parser({ explicitArray: false });
  const result = await parser.parseStringPromise(data);
  return result;
}

// Função principal de importação
async function importStudents(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  let students = [];

  if (ext === '.json') {
    students = readJsonFile(filePath);
  } else if (ext === '.xml') {
    const parsed = await readXmlFile(filePath);
    students = parsed.students.student;
    if (!Array.isArray(students)) {
      students = [students];
    }
  } else {
    console.error('Formato de ficheiro não suportado. Use .json ou .xml');
    return;
  }

  const call = client.AddStudents((err, res) => {
    if (err) return console.error('Erro ao adicionar alunos:', err.message);
    console.log(`✅ Total de alunos adicionados: ${res.totalAdded}`);
  });

  for (const student of students) {
    call.write({
      id: student.id,
      name: student.name
    });
    console.log(`Aluno enviado: ${student.id} - ${student.name}`);
  }

  call.end();
}

// Interface para pedir caminho do ficheiro
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Caminho para o ficheiro (.json ou .xml): ', (filePath) => {
  importStudents(filePath).then(() => rl.close());
});
