import mongoose from "mongoose";


const JazigoSchema = new mongoose.Schema({


    numero:{
        type:String,
        required:true,
        unique:true
    },


    quadra:{
        type:String,
        required:true
    },


    capacidade:{
        type:Number,
        required:true
    },


    ocupacaoAtual:{
        type:Number,
        default:0
    },


    status:{
        type:String,
        enum:[
            "livre",
            "parcialmente_ocupado",
            "lotado"
        ],
        default:"livre"
    },


    responsavelIds:[

        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Responsavel"
        }

    ],


    ativo:{
        type:Boolean,
        default:true
    }


},
{
    timestamps:true
});


export default mongoose.model(
    "Jazigo",
    JazigoSchema
);