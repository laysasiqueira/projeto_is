const express = require('express');
const fs = require('fs');
const path = require('path');
const soap = require('strong-soap').soap;
const service = require('./service/handlers');

const app = express();
const port = 8000;

const wsdlPath = path.join(__dirname, 'wsdl/service.wsdl');
const wsdlXML = fs.readFileSync(wsdlPath, 'utf8');

const server = app.listen(port, () => {
  console.log(`✅ SOAP server rodando em http://localhost:${port}/schoolService?wsdl`);
});

soap.listen(server, '/schoolService', service, wsdlXML);
