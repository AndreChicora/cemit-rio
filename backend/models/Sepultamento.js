import mongoose from "mongoose";


const SepultamentoSchema = new mongoose.Schema({


    falecidoId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Falecido",
        required:true
    },


    jazigoId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Jazigo",
        required:true
    },


    responsavelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Responsavel",
        required:true
    },


    dataSepultamento:{
        type:Date,
        required:true
    },


    observacoes:{
        type:String
    },


    status:{
        type:String,
        enum:[
            "ativo",
            "inativo"
        ],
        default:"ativo"
    }


},
{
    timestamps:true
});


export default mongoose.model(
    "Sepultamento",
    SepultamentoSchema
);