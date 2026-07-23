import Falecido from "../models/Falecido.js";
import Jazigo from "../models/Jazigo.js";
import Responsavel from "../models/Responsavel.js";
import Sepultamento from "../models/Sepultamento.js";


export async function indicadores(){


return {

    falecidos:
    await Falecido.countDocuments({
        ativo:true
    }),


    jazigos:
    await Jazigo.countDocuments({
        ativo:true
    }),


    responsaveis:
    await Responsavel.countDocuments({
        ativo:true
    }),


    sepultamentos:
    await Sepultamento.countDocuments({
        status:"ativo"
    })

};


}