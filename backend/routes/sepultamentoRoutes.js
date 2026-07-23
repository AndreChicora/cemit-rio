import express from "express";

import {
listar,
criar,
atualizar,
arquivar
}
from "../controllers/jazigoController.js";


import 
autenticar

from "../middlewares/authMiddleware.js";


const router =
express.Router();



router.get("/",autenticar,listar);

router.post("/",autenticar,criar);

router.put("/:id",autenticar,atualizar);

router.delete("/:id",autenticar,arquivar);



export default router;