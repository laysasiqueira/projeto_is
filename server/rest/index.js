// index.js

import express from 'express';
import { getAlunos, postAluno } from './schoolController.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/usuarios', getAlunos);
app.post('/usuarios', postAluno);
// app.put('/usuarios', putAluno);
// app.delete('/usuarios', deleteAluno);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
