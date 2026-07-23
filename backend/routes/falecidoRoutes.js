import express from "express";

import {
  listar,
  buscarPorId,
  criar,
  atualizar,
  arquivar
} from "../controllers/falecidoController.js";

import  autenticar  from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", autenticar, listar);

router.get("/:id", autenticar, buscarPorId);

router.post("/", autenticar, criar);

router.put("/:id", autenticar, atualizar);

router.delete("/:id", autenticar, arquivar);

export default router;