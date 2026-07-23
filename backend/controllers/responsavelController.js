import Responsavel from "../models/Responsavel.js";



export async function listar(req,res){

const dados =
await Responsavel.find({
ativo:true
});


res.json(dados);

}




export async function criar(req,res){


const responsavel =
await Responsavel.create(
req.body
);


res.status(201)
.json(responsavel);


}




export async function atualizar(req,res){


const responsavel =
await Responsavel.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);


res.json(responsavel);


}




export async function arquivar(req,res){


await Responsavel.findByIdAndUpdate(

req.params.id,

{
ativo:false
}

);


res.json({
mensagem:"Responsável arquivado"
});


}