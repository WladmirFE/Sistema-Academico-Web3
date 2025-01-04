const DisciplinaModel = require("../models/DisciplinaModel");

class DisciplinaController{
    static async getCadastrar(req, res){

        const id = req.params.id;
        let disciplina = {};
        
        if(id != undefined){
            disciplina = await DisciplinaModel.findOne({id});
        }
        
        res.render("disciplina/cadastrar", {disciplina});
    }

    static async getListar(req, res){
         const id = req.params.id;
            let disciplinaAtt = null
        
            const disciplinas = await DisciplinaModel.find();
        
            if(id!= undefined){
                disciplinas.forEach(function(dis){
                    if(dis.id == id){
                        disciplinaAtt = dis;
                    }
                })
        
                if(disciplinaAtt != null){
                    res.render("disciplina/detalhar", {disciplina:disciplinaAtt});
                }
                else{
                    res.status(404).render("404");
                }
        
            }else{
                res.render("disciplina/listar", {disciplinas});
            }
    }

    static async postAdicionar(req, res){

        if(req.body._id){ //Atualizar
        
            await DisciplinaModel.findOneAndUpdate({_id: req.body._id}, {
                id: req.body.id,
                nome: req.body.nome,
                cargaHoraria: req.body.cargaHoraria,
                professor: req.body.professor,
            });
        
            res.redirect("/disciplinas");
        
        }else{ // Cadastrar
            const newDisciplina = new DisciplinaModel({
                id: req.body.id,
                nome: req.body.nome,
                cargaHoraria: req.body.cargaHoraria,
                professor: req.body.professor,
            
            });
        
            await newDisciplina.save();
            res.redirect("/disciplinas");
        }

    }

    static async getRemover(req, res){
        const id = req.params.id;
        await DisciplinaModel.deleteOne({id: id});
        res.redirect("/disciplinas");
    }

}

module.exports = DisciplinaController;