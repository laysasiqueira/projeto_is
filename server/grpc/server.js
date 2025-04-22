const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const schoolServices = require('./services/schoolServices');

//const inquirer = require('inquirer');



const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, 'protos/school.proto'), // ou 'school.proto' se você renomear
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

const proto = grpc.loadPackageDefinition(packageDefinition);
console.log('PROTO:', proto); // <- Adicione isso para debug

const server = new grpc.Server();

server.addService(proto.school.SchoolService.service, schoolServices);

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('✅ Servidor rodando na porta 50051');
  server.start();
});

const { addStudent } = require('./data/dataHandler');
addStudent({ id: '123', name: 'Test Student' });
