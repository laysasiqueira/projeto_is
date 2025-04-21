const express = require("express");
const Ajv = require("ajv");
const jsonpath = require("jsonpath");
const alunoSchema = require("./schemas/alunoSchema.json");
const aulaSchema = require("./schemas/aulaSchema.json");
const { alunos, aulas } = require("./data");
const cors = require("cors");


const app = express();
const ajv = new Ajv();
app.use(express.json());
app.use(cors());

// Compila os schemas
const validateAluno = ajv.compile(alunoSchema);
const validateAula = ajv.compile(aulaSchema);

// ROTAS DE ALUNOS
app.get("/alunos", (req, res) => {
  res.json(alunos);
});

app.post("/alunos", (req, res) => {
  const valid = validateAluno(req.body);
  if (!valid) return res.status(400).json({ erros: validateAluno.errors });
  alunos.push(req.body);
  res.status(201).json(req.body);
});
app.delete("/alunos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = alunos.findIndex(a => a.id === id);
  if (index === -1) return res.status(404).json({ erro: "Aluno não encontrado" });
  alunos.splice(index, 1);
  res.status(204).end();
});
// ROTAS DE AULAS
app.get("/aulas", (req, res) => {
  res.json(aulas);
});

app.post("/aulas", (req, res) => {
  const valid = validateAula(req.body);
  if (!valid) return res.status(400).json({ erros: validateAula.errors });
  aulas.push(req.body);
  res.status(201).json(req.body);
});

// CONSULTAS COM JSONPath
app.get("/buscar", (req, res) => {
  const { tipo, path } = req.query;
  let dados;
  if (tipo === "aluno") dados = alunos;
  else if (tipo === "aula") dados = aulas;
  else return res.status(400).json({ erro: "Tipo inválido (aluno ou aula)" });

  try {
    const resultado = jsonpath.query(dados, path);
    res.json(resultado);
  } catch (err) {
    res.status(400).json({ erro: "JSONPath inválido" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

