const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DisciplinaSchema = Schema({
    id: String,
    nome: String,
    cargaHoraria: Number,
    professor: String,

});

module.exports = mongoose.model("Disciplina", DisciplinaSchema);