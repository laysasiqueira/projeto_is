// services/usuarioService.js

import fsp from 'fs/promises';
import { v4 as uuid } from 'uuid';

  export async function listarAlunos() {
    let alunos = await fsp.readFile('./database/alunos.json')
    return JSON.parse(alunos);
  }
  
  export async function criarAluno(aluno) {
    let inf = [];
    try {
      const data = await fsp.readFile('./database/alunos.json', 'utf-8');
      inf = data.trim() ? JSON.parse(data) : [];
    } catch (err) {
      // Se o arquivo não existir ou houver erro de parsing, começa com array vazio
      if (err.code !== 'ENOENT') {
        console.error('Erro ao ler o ficheiro de alunos:', err);
        throw err;
      }
    }
  
    const novo = {
      id: uuid(),
      Nome: aluno.Nome,
      Idade: aluno.Idade,
      Turma: aluno.Turma
    };
    
    inf.push(novo);
    await fsp.writeFile('./database/alunos.json', JSON.stringify(inf, null, 2));
    return novo;
  }

  export async function deleteAluno(load) {
    try {
      const data = await fsp.readFile('./database/alunos.json', 'utf-8');
      const alunos = JSON.parse(data);
      const index = alunos.findIndex(aluno => aluno.id === load.id);
      if (index === -1) {
        return { sucesso: false, mensagem: 'Aluno não encontrado.' };
      }
      const removido = alunos.splice(index, 1)[0];
      await fsp.writeFile('./database/alunos.json', JSON.stringify(alunos, null, 2));
      return { sucesso: true, mensagem: 'Aluno removido com sucesso.', aluno: removido };
    } catch (err) {
      console.error('Erro ao deletar aluno:', err);
      return { sucesso: false, mensagem: 'Erro interno ao tentar remover aluno.' };
    }
  }


  export async function putAluno(load) {
    try {
      const data = await fsp.readFile('./database/alunos.json', 'utf-8');
      const alunos = JSON.parse(data);
      const index = alunos.findIndex(aluno => aluno.id === load.id);
  
      if (index === -1) {
        return { sucesso: false, mensagem: 'Aluno não encontrado.' };
      }
  
      // Atualiza os campos desejados
      alunos[index].Nome = load.Nome ?? alunos[index].Nome;
      alunos[index].Idade = load.Idade ?? alunos[index].Idade;
      alunos[index].Turma = load.Turma ?? alunos[index].Turma;
  
      await fsp.writeFile('./database/alunos.json', JSON.stringify(alunos, null, 2));
      return { sucesso: true, mensagem: 'Aluno atualizado com sucesso.', aluno: alunos[index] };
    } catch (err) {
      console.error('Erro ao atualizar aluno:', err);
      return { sucesso: false, mensagem: 'Erro interno ao tentar atualizar aluno.' };
    }
  }
  
  