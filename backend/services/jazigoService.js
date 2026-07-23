export const atualizarStatusJazigo = (ocupacaoAtual, capacidade) => {
  if (ocupacaoAtual === 0) {
    return "livre";
  }

  if (ocupacaoAtual >= capacidade) {
    return "lotado";
  }

  return "parcialmente_ocupado";
};