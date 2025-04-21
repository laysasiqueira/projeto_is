const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, 'protos/school.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

const proto = grpc.loadPackageDefinition(packageDefinition);
const client = new proto.school.SchoolService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// 1️⃣ Testar GetStudent (unário)
function getStudent() {
  client.GetStudent({ id: '1' }, (err, response) => {
    if (err) return console.error('Erro:', err.message);
    console.log('Aluno encontrado:', response);
  });
}

// 2️⃣ Testar ListStudents (server streaming)
function listStudents() {
  const call = client.ListStudents({});
  call.on('data', (student) => {
    console.log('Aluno:', student);
  });
  call.on('end', () => {
    console.log('Fim da lista de alunos.');
  });
}

// 3️⃣ Testar AddStudents (client streaming)
function addStudents() {
  const call = client.AddStudents((err, response) => {
    if (err) return console.error('Erro:', err.message);
    console.log('Total de alunos adicionados:', response.totalAdded);
  });

  call.write({ id: '3', name: 'Carol' });
  call.write({ id: '4', name: 'Daniel' });
  call.end();
}

// 4️⃣ Testar Chat (bidirecional streaming)
function chat() {
  const call = client.Chat();

  call.on('data', (msg) => {
    console.log(`🔁 Resposta do servidor: ${msg.content}`);
  });

  call.on('end', () => {
    console.log('Chat encerrado.');
  });

  call.write({ from: 'Cliente', content: 'Oi, servidor!' });
  setTimeout(() => call.write({ from: 'Cliente', content: 'Como vai?' }), 1000);
  setTimeout(() => call.end(), 2000);
}

// 👇 Escolha o que quer testar:
getStudent();
// listStudents();
// addStudents();
// chat();
