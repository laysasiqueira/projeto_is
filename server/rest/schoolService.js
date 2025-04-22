// services/usuarioService.js

import fsp from 'fs/promises';

  export async function listarAlunos() {
    let alunos = await fsp.readFile('./database/alunos.json')
    return JSON.parse(alunos);
  }
  
  export async function criarAluno(aluno) {
    const data = await fsp.readFile('./database/alunos.json')
    const novo = {
      Nome: aluno.Nome,
      Idade: aluno.Idade,
      Turma: aluno.Turma
    };
    let inf = JSON.parse(data)
    inf.push(novo);
    await fsp.writeFile('./database/alunos.json', JSON.stringify(inf, null, 2));
    return novo;
  }
  
  