const express = require("express");
const routes = express.Router();

const alunoController = require("../controllers/alunoController");
const auth = require("../middlewares/usuarioAuth");

routes.get("/alunos/cadastrar/:matricula?", auth, alunoController.getCadastrar);
routes.get("/alunos/:id?", auth, alunoController.getListar);

routes.post("/alunos", auth, alunoController.postAdicionar);

routes.get("/alunos/remover/:matricula", auth, alunoController.getRemover);


module.exports = routes;