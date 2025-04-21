const alunos = [
    { id: 1, nome: "João", idade: 16 },
    { id: 2, nome: "Maria", idade: 17 },
  ];
  
  const aulas = [
    { id: 1, materia: "Matemática", alunos: [1] },
    { id: 2, materia: "Português", alunos: [1, 2] },
  ];
  
  module.exports = { alunos, aulas };
  