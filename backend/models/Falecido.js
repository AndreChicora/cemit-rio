import mongoose from "mongoose";


const FalecidoSchema = new mongoose.Schema({


    nome:{
        type:String,
        required:true
    },


    documento:{
        type:String,
        required:true,
        unique:true
    },


    nomeMae:{
        type:String
    },


    naturalidade:{
        type:String
    },


    dataNascimento:{
        type:Date,
        required:true
    },


    dataFalecimento:{
        type:Date,
        required:true
    },


    causaObito:{
        type:String
    },


    observacoes:{
        type:String
    },


    ativo:{
        type:Boolean,
        default:true
    }


},
{
    timestamps:true
});


export default mongoose.model(
    "Falecido",
    FalecidoSchema
);