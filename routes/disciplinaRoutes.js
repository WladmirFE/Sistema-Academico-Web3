const express = require("express");
const routes = express.Router();

const disciplinaController = require("../controllers/disciplinaController");
const auth = require("../middlewares/usuarioAuth");

routes.get("/disciplinas/cadastrar/:id?", auth, disciplinaController.getCadastrar);
routes.get("/disciplinas/:id?", auth, disciplinaController.getListar);

routes.post("/disciplinas", auth, disciplinaController.postAdicionar);

routes.get("/disciplinas/remover/:id", auth, disciplinaController.getRemover);


module.exports = routes;