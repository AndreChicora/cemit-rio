import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import back from "./config/db.js"

import  conectarBanco  from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import falecidoRoutes from "./routes/falecidoRoutes.js";
import responsavelRoutes from "./routes/responsavelRoutes.js";
import jazigoRoutes from "./routes/jazigoRoutes.js";
import sepultamentoRoutes from "./routes/sepultamentoRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

import {
    errorMiddleware
}
from "./middlewares/errorMiddleware.js";

conectarBanco();

app.use("/auth", authRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/falecidos", falecidoRoutes);
app.use("/responsaveis", responsavelRoutes);
app.use("/jazigos", jazigoRoutes);
app.use("/sepultamentos", sepultamentoRoutes);
app.use(errorMiddleware);

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor iniciado");

});