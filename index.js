const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true}));

require('dotenv/config');

const session = require("express-session");
app.use(session({
    secret: 'ifpe',
    saveUninitialized: false,
    resave: false
}));

app.set('view engine', 'ejs');
app.use(express.static('public'));

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const alunoRoutes = require("./routes/alunoRoutes");
app.use(alunoRoutes);

const disciplinaRoutes = require("./routes/disciplinaRoutes");
app.use(disciplinaRoutes);

const usuarioRoutes = require("./routes/usuarioRoutes");
app.use(usuarioRoutes);

app.get("/", function(req, res){
    res.render("index");
});

app.use(function(req, res) {
    res.status(404).render("404");
});

app.listen(process.env.PORT, function(){
    console.log("Bom todo");
})