import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const gerarHash = async (senha) => {
  return await bcrypt.hash(senha, 10);
};

export const compararSenha = async (
  senha,
  hash
) => {
  return await bcrypt.compare(
    senha,
    hash
  );
};

export const gerarToken = (usuario) => {

  return jwt.sign(
    {
      id: usuario._id,
      cargo: usuario.cargo
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );

};