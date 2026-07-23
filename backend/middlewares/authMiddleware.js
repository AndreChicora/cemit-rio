import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";


export default async function autenticar(req,res,next){


    try{


        const token =
        req.headers.authorization;


        if(!token){

            return res.status(401).json({

                mensagem:
                "Token não informado"

            });

        }



        const tokenLimpo =
        token.split(" ")[1];



        const decoded =
        jwt.verify(

            tokenLimpo,

            process.env.JWT_SECRET

        );



        const usuario =
        await Usuario.findById(
            decoded.id
        );



        if(!usuario){

            return res.status(401).json({

                mensagem:
                "Usuário não encontrado"

            });

        }



        if(!usuario.ativo){


            return res.status(403).json({

                mensagem:
                "Usuário desativado"

            });

        }



        req.usuario = usuario;



        next();



    }catch(error){



        return res.status(401).json({

            mensagem:
            "Token inválido ou expirado"

        });


    }

}