// services/usuarioService.js

import fsp from 'fs/promises';
import { v4 as uuid } from 'uuid';

const caminhoFicheiro = './database/alunos.json';

export async function listarAlunos() {
  try {
    const alunos = await fsp.readFile(caminhoFicheiro, 'utf-8');
    return alunos.trim() ? JSON.parse(alunos) : [];
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    } else {
      console.error('Erro ao listar alunos:', err);
      throw err;
    }
  }
}

export async function criarAluno(aluno) {
  const alunos = await listarAlunos();

  const novoAluno = {
    id: aluno.id || uuid(),
    name: aluno.name || '',
    idade: aluno.idade || 0,
    turma: aluno.turma || ''
  };

  alunos.push(novoAluno);
  await fsp.writeFile(caminhoFicheiro, JSON.stringify(alunos, null, 2));
  return novoAluno;
}

export async function deleteAluno(load) {
  try {
    const alunos = await listarAlunos();
    const index = alunos.findIndex(aluno => aluno.id === load.id);
    if (index === -1) {
      return { sucesso: false, mensagem: 'Aluno não encontrado.' };
    }
    const removido = alunos.splice(index, 1)[0];
    await fsp.writeFile(caminhoFicheiro, JSON.stringify(alunos, null, 2));
    return { sucesso: true, mensagem: 'Aluno removido com sucesso.', aluno: removido };
  } catch (err) {
    console.error('Erro ao deletar aluno:', err);
    return { sucesso: false, mensagem: 'Erro interno ao tentar remover aluno.' };
  }
}

export async function putAluno(load) {
  try {
    const alunos = await listarAlunos();
    const index = alunos.findIndex(aluno => aluno.id === load.id);

    if (index === -1) {
      return { sucesso: false, mensagem: 'Aluno não encontrado.' };
    }

    alunos[index] = {
      ...alunos[index],
      name: load.name ?? alunos[index].name,
      idade: load.idade ?? alunos[index].idade,
      turma: load.turma ?? alunos[index].turma
    };

    await fsp.writeFile(caminhoFicheiro, JSON.stringify(alunos, null, 2));
    return { sucesso: true, mensagem: 'Aluno atualizado com sucesso.', aluno: alunos[index] };
  } catch (err) {
    console.error('Erro ao atualizar aluno:', err);
    return { sucesso: false, mensagem: 'Erro interno ao tentar atualizar aluno.' };
  }
}