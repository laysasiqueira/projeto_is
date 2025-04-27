import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { Parser } from 'xml2js';
import readline from 'readline';

const parser = new Parser({ explicitArray: false });

// Função para ler JSON
function readJsonFile(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

// Função para ler XML
async function readXmlFile(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  const result = await parser.parseStringPromise(data);
  let students = result.students.student;

  if (!Array.isArray(students)) {
    students = [students];
  }

  // Corrigir se os campos vierem como objetos
  const cleanStudents = students.map(student => ({
    id: typeof student.id === 'object' ? student.id._ : student.id,
    name: typeof student.Nome === 'object' ? student.name._ : student.name,
    idade: typeof student.idade === 'object' ? parseInt(student.idade._) : parseInt(student.idade),
    turma: typeof student.turma === 'object' ? student.turma._ : student.turma
  }));

  return cleanStudents;
}

// Função principal para importar alunos
async function importStudents(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  let students = [];

  if (ext === '.json') {
    students = readJsonFile(filePath);
  } else if (ext === '.xml') {
    students = await readXmlFile(filePath);
  } else {
    console.error('Formato de ficheiro não suportado. Use .json ou .xml');
    return;
  }

  for (const student of students) {
    try {
      await axios.post('http://localhost:3000/usuarios', {
        id: student.id,
        name: student.name,
        idade: student.idade,
        turma: student.turma
      });
      console.log(`✅ Aluno enviado: ID: ${student.id} - Nome: ${student.name} - Idade: ${student.idade} - Turma: ${student.turma}`);
    } catch (error) {
      console.error('❌ Erro ao enviar aluno:', error.response?.data || error.message);
    }
  }
}

// Interface de linha de comandos
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Caminho para o ficheiro (.json ou .xml): ', (filePath) => {
  importStudents(filePath).then(() => rl.close());
});
