const UsuarioModel = require("../models/UsuarioModel");
const bcryptjs = require("bcryptjs");

class UsuarioController{
    static async getCadastrar(req, res){

        const email = req.params.email;
        let usuario = {};
        
        if(email != undefined){
            usuario = await UsuarioModel.findOne({email});
        }
        
        const status = req.query.e;
        res.render("usuario/cadastrar", {status, usuario});
    }

    static getLogin(req, res){
        const status = req.query.e;
        res.render("usuario/login", {status});

    }

    static async postLogin(req, res){
        const email = req.body.email;
        const senha = req.body.senha;

        const usuario = await UsuarioModel.findOne({email});
        
        if(usuario == null){
            res.redirect("/usuarios/login?e=1");
        }else{

            const hash = usuario.senha;
            const confirm = bcryptjs.compareSync(senha, hash);

            if(confirm == true){
                req.session.usuario = req.body.email;
                res.redirect("/");
            }else{
                res.redirect("/usuarios/login?e=1");
            }

            
        }

    }

    static async getListar(req, res){
         const id = req.params.id;
            let usuarioAtt = null
        
            const usuarios = await UsuarioModel.find();
        
            if(id!= undefined){
                usuarios.forEach(function(usus){
                    if(usus.email == id){
                        usuarioAtt = usus;
                    }
                })
        
                if(usuarioAtt != null){
                    res.render("usuario/detalhar", {usuario:usuarioAtt});
                }
                else{
                    res.status(404).render("404");
                }
        
            }else{
                res.render("usuario/listar", {usuarios});
            }
    }

    static async postAdicionar(req, res){

        if(req.body._id){ //Atualizar
        
            const salt = bcryptjs.genSaltSync();
            const hash = bcryptjs.hashSync(req.body.senha, salt);

            await UsuarioModel.findOneAndUpdate({_id: req.body._id}, {
                nome: req.body.nome,
                email: req.body.email,
                senha: hash,
            });
            res.redirect("/usuarios");
        
        }else{ // Cadastrar

            const salt = bcryptjs.genSaltSync();
            const hash = bcryptjs.hashSync(req.body.senha, salt);

            const usuario = await UsuarioModel.findOne({email:req.body.email});
            if(usuario != null){
                res.redirect("/usuarios/cadastrar?e=1");
            }else{
                const newUsuario = new UsuarioModel({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: hash,
                
                });
            
                await newUsuario.save();
                res.redirect("/usuarios");
            }

        }

    }

    static async getRemover(req, res){
        const email = req.params.email;
        await UsuarioModel.deleteOne({email: email});
        res.redirect("/usuarios");
    }

    static logout(req, res){
        req.session.usuario = null;
        res.redirect("/usuarios/login");
    }

}

module.exports = UsuarioController;