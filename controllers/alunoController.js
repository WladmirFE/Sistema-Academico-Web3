const AlunoModel = require("../models/AlunoModel");

async function checkImage(url){
    const res = await fetch(url);
    const buff = await res.blob();
   
    return buff.type.startsWith('image/')

}

function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};

class AlunoController{
    static async getCadastrar(req, res){
        const matricula = req.params.matricula;
        let aluno = {};

        if(matricula != undefined){
            aluno = await AlunoModel.findOne({matricula});
        }

        res.render("aluno/cadastrar", {aluno});

    }

    static async getListar(req, res){
        const id = req.params.id;
            let alunoAtt = null
        
            const alunos = await AlunoModel.find();
        
            if(id!= undefined){
                alunos.forEach(function(al){
                    if(al.matricula == id){
                        alunoAtt = al;
                    }
                })
        
                if(alunoAtt != null){
                    res.render("aluno/detalhar", {aluno:alunoAtt});
                }
                else{
                    res.status(404).render("404");
                }
        
            }else{
                res.render("aluno/listar", {alunos});
            }
    }

    static async postAdicionar(req, res){
        if(req.body._id){ //Atualizar

            if(isValidURL(req.body.foto) == false){
                req.body.foto = null
            }else{
                if(checkImage(req.body.foto) == false){
                    req.body.foto = null
                }
            }

            await AlunoModel.findOneAndUpdate({_id: req.body._id}, {
                matricula: req.body.matricula,
                nome: req.body.nome,
                curso: req.body.curso,
                foto: req.body.foto,
            });

            res.redirect("/alunos");

        }else{ // Cadastrar
            if(isValidURL(req.body.foto) == false){
                req.body.foto = null
            }else{
                if(checkImage(req.body.foto) == false){
                    req.body.foto = null
                }
            }
        
            const newAluno = new AlunoModel({
                matricula: req.body.matricula,
                nome: req.body.nome,
                curso: req.body.curso,
                foto: req.body.foto,
                
            });
        
            await newAluno.save();
            res.redirect("/alunos");
        }
    }

    static async getRemover(req, res){
        const mat = req.params.matricula;
        await AlunoModel.deleteOne({matricula: mat});
        res.redirect("/alunos");
    }

}

module.exports = AlunoController;