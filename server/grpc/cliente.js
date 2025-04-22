const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const packageDef = protoLoader.loadSync(
  path.resolve(__dirname, '../server/grpc/protos/school.proto'), // ajuste o caminho conforme seu projeto
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

const proto = grpc.loadPackageDefinition(packageDef).school;

const client = new proto.SchoolService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// 🔍 Exemplo de chamada unária
client.GetStudent({ id: '1' }, (err, res) => {
  if (err) {
    console.error('Erro:', err.message);
  } else {
    console.log('Aluno retornado:', res);
  }
});
