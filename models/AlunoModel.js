const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const alunoSchema = Schema({
    matricula: String,
    nome: String,
    curso: String,
    foto: String,
    
});

module.exports = mongoose.model("Aluno", alunoSchema);