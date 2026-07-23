import Usuario from "../models/Usuario.js";
import {
    gerarHash,
    compararSenha,
    gerarToken
} from "../services/authService.js";



export async function registrar(req,res){

try{


const senha =
await gerarHash(req.body.senha);



const usuario =
await Usuario.create({

    nome:req.body.nome,
    email:req.body.email,
    senha,
    cargo:req.body.cargo

});



res.status(201).json(usuario);



}catch(error){

res.status(400).json({
    erro:error.message
});

}


}




export async function login(req,res){


const usuario =
await Usuario.findOne({
    email:req.body.email
});



if(!usuario){

return res.status(404).json({
    mensagem:"Usuário não encontrado"
});

}



const senhaValida =
await compararSenha(
    req.body.senha,
    usuario.senha
);



if(!senhaValida){

return res.status(401).json({
    mensagem:"Senha incorreta"
});

}



const token =
gerarToken(usuario);



res.json({
    usuario,
    token
});


}