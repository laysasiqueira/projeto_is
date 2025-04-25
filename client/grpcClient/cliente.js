const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const inquirer = require('inquirer');
const path = require('path');

// Carregar .proto
const protoPath = path.resolve(__dirname, '../../server/grpc/protos/school.proto');
const packageDef = protoLoader.loadSync(protoPath);
const grpcObject = grpc.loadPackageDefinition(packageDef);
const client = new grpcObject.school.SchoolService('localhost:50051', grpc.credentials.createInsecure());

// Menu principal
async function mainMenu() {
  const { action } = await inquirer.prompt([{
    type: 'list',
    name: 'action',
    message: 'O que deseja fazer?',
    choices: [
      '➕ Adicionar Aluno',
      '🔍 Buscar Aluno',
      '📋 Listar Alunos',
      '✏️ Atualizar Aluno',
      '❌ Remover Aluno',
      '🚪 Sair'
    ]
  }]);

  switch (action) {
    case '➕ Adicionar Aluno':
      await addStudents(); break;
    case '🔍 Buscar Aluno':
      await getStudent(); break;
    case '📋 Listar Alunos':
      await listStudents(); break;
    case '✏️ Atualizar Aluno':
      await updateStudent(); break;
    case '❌ Remover Aluno':
      await deleteStudent(); break;
    case '🚪 Sair':
      console.log('Até logo!');
      process.exit(0);
  }

  mainMenu();
}

// Funções CRUD
async function addStudents() {
  const call = client.AddStudents((err, res) => {
    if (err) return console.error('Erro ao adicionar:', err.message);
    console.log(`✅ Total de alunos adicionados: ${res.totalAdded}`);
  });

  let continueAdding = true;

  while (continueAdding) {
    const { id, name } = await inquirer.prompt([
      { name: 'id', message: 'ID do aluno:' },
      { name: 'name', message: 'Nome do aluno:' }
    ]);
    
    call.write({ id, name });

    const { addMore } = await inquirer.prompt([
      { type: 'confirm', name: 'addMore', message: 'Deseja adicionar outro?', default: false }
    ]);

    continueAdding = addMore;
  }

  call.end(); // Finaliza a stream
}


async function getStudent() {
  const { id } = await inquirer.prompt([{ name: 'id', message: 'ID do aluno:' }]);
  client.GetStudent({ id }, (err, res) => {
    if (err) return console.error('Erro:', err.message);
    console.log('Aluno encontrado:', res);
  });
}

function listStudents() {
  const call = client.ListStudents({});
  call.on('data', (s) => console.log(`• ${s.id}: ${s.name}`));
  call.on('end', () => console.log('--- Fim da lista ---'));
}

async function updateStudent() {
  const { id, name } = await inquirer.prompt([
    { name: 'id', message: 'ID do aluno a atualizar:' },
    { name: 'name', message: 'Novo nome do aluno:' }
  ]);

  client.UpdateStudent({ id, name }, (err, res) => {
    if (err) return console.error('Erro:', err.message);
    console.log('Aluno atualizado:', res);
  });
}

async function deleteStudent() {
  const { id } = await inquirer.prompt([{ name: 'id', message: 'ID do aluno a remover:' }]);

  client.DeleteStudent({ id }, (err, res) => {
    if (err) return console.error('Erro:', err.message);
    console.log('Remoção realizada:', res.success ? '✅ Sucesso' : '❌ Não encontrado');
  });
}

// Iniciar app
mainMenu();
