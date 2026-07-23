import mongoose from "mongoose";


const ResponsavelSchema = new mongoose.Schema({


    nome:{
        type:String,
        required:true
    },


    cpf:{
        type:String,
        required:true,
        unique:true
    },


    telefone:{
        type:String,
        required:true
    },


    email:{
        type:String
    },


    endereco:{
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
    "Responsavel",
    ResponsavelSchema
);