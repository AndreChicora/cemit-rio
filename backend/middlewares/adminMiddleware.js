const apenasAdmin = (req, res, next) => {
  if (!req.usuario || req.usuario.role !== 'admin') {
    return res.status(403).json({ mensagem: 'Acesso negado: apenas administradores' })
  }
  next()
}

export default apenasAdmin
