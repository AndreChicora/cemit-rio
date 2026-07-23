export function errorMiddleware(error, req, res, next) {

    console.error("Erro:", error);



    const status =
        error.status || 500;



    res.status(status).json({

        sucesso:false,

        mensagem:
        error.message ||
        "Erro interno do servidor"

    });

}