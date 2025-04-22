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

export function putAluno(req, res) {
  

}

export function deleteAluno(req, res) {
  

}
