import Sepultamento from "../models/Sepultamento.js";
import { aumentarOcupacao }
from "../services/sepultamentoService.js";



export async function listar(req,res){


const dados =
await Sepultamento.find()

.populate("falecidoId")

.populate("jazigoId")

.populate("responsavelId");



res.json(dados);


}




export async function criar(req,res){


try{


const existe =
await Sepultamento.findOne({

falecidoId:req.body.falecidoId,

status:"ativo"

});



if(existe){

return res.status(400)
.json({

mensagem:
"Falecido já possui sepultamento ativo"

});

}



const sepultamento =
await Sepultamento.create(
req.body
);



await aumentarOcupacao(
req.body.jazigoId
);



res.status(201)
.json(sepultamento);



}catch(error){

res.status(400)
.json({
erro:error.message
});

}


}