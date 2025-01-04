const express = require("express");
const routes = express.Router();

const usuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/usuarioAuth");

routes.get("/usuarios/logout", auth, usuarioController.logout);

routes.get("/usuarios/login", usuarioController.getLogin);
routes.post("/usuarios/login", usuarioController.postLogin);

routes.get("/usuarios/cadastrar/:email?", usuarioController.getCadastrar);
routes.get("/usuarios/:id?", auth, usuarioController.getListar);

routes.post("/usuarios", usuarioController.postAdicionar);

routes.get("/usuarios/remover/:email", auth, usuarioController.getRemover);


module.exports = routes;