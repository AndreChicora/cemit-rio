import Jazigo from "../models/Jazigo.js";
import { atualizarStatusJazigo }
from "../services/jazigoService.js";




export async function listar(req,res){

const jazigos =
await Jazigo.find({
ativo:true
})
.populate("responsavelIds");


res.json(jazigos);

}




export async function criar(req,res){


const jazigo =
await Jazigo.create({

numero:req.body.numero,

quadra:req.body.quadra,

capacidade:req.body.capacidade,

responsavelIds:req.body.responsavelIds

});


res.status(201)
.json(jazigo);


}




export async function atualizar(req,res){


const jazigo =
await Jazigo.findById(
req.params.id
);



jazigo.set(req.body);



jazigo.status =
atualizarStatusJazigo(

jazigo.ocupacaoAtual,

jazigo.capacidade

);



await jazigo.save();



res.json(jazigo);


}




export async function arquivar(req,res){


await Jazigo.findByIdAndUpdate(

req.params.id,

{
ativo:false
}

);


res.json({
mensagem:"Jazigo arquivado"
});


}