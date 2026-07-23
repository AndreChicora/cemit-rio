import Jazigo from "../models/Jazigo.js";


export async function aumentarOcupacao(jazigoId){


    const jazigo =
    await Jazigo.findById(jazigoId);



    if(
        jazigo.ocupacaoAtual >= jazigo.capacidade
    ){

        throw new Error(
            "Jazigo lotado"
        );

    }



    jazigo.ocupacaoAtual++;



    if(
        jazigo.ocupacaoAtual === jazigo.capacidade
    ){

        jazigo.status="lotado";

    }

    else{

        jazigo.status=
        "parcialmente_ocupado";

    }



    await jazigo.save();


    return jazigo;

}