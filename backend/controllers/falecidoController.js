import Falecido from "../models/Falecido.js";

export const listar = async (req, res) => {

  const falecidos = await Falecido.find({
    ativo: true
  });

  res.json(falecidos);
};

export const buscarPorId = async (req, res) => {

  const falecido = await Falecido.findById(
    req.params.id
  );

  res.json(falecido);
};

export const criar = async (req, res) => {

  const falecido = await Falecido.create(
    req.body
  );

  res.status(201).json(falecido);
};

export const atualizar = async (req, res) => {

  const falecido = await Falecido.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(falecido);
};

export const arquivar = async (req, res) => {

  await Falecido.findByIdAndUpdate(
    req.params.id,
    { ativo: false }
  );

  res.json({
    mensagem: "Registro arquivado"
  });
};