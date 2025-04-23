// controllers/usuarioController.js

import * as alunoService from './schoolService.js';

export async function getAlunos(req, res) {
  const lista = await alunoService.listarAlunos();
  res.json(lista);
}

export async function postAluno(req, res) {
  const novo =await alunoService.criarAluno(req.body);
  res.status(201).json({ mensagem: 'Usuário criado', aluno: novo });
}

export async function putAluno(req, res) {
  const put = await alunoService.putAluno(req.body);
  res.json(put);
}

export async function deleteAluno(req, res) {
  const del = await alunoService.deleteAluno(req.body);
  res.json(del);
}
