// ✅ IMPORTAÇÕES — SOMENTE UMA VEZ CADA
import express from 'express'
import { criarUsuario, listarUsuarios, buscarPorId, atualizarUsuario, arquivarUsuario } from '../controllers/usuarioController.js'
import autenticar from '../middlewares/authMiddleware.js'
import apenasAdmin from '../middlewares/adminMiddleware.js'

// ✅ CRIA O ROUTER — NÃO REPETE NENHUM NOME
const router = express.Router()

// ✅ ROTAS
router.post('/', autenticar, apenasAdmin, criarUsuario)
router.get('/', autenticar, apenasAdmin, listarUsuarios)
router.get('/:id', autenticar, apenasAdmin, buscarPorId)
router.put('/:id', autenticar, apenasAdmin, atualizarUsuario)
router.delete('/:id', autenticar, apenasAdmin, arquivarUsuario)

// ✅ EXPORTA
export default router
