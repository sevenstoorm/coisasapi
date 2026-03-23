// Importar o Express para criar o router
const express = require("express");
const router = express.Router();

// Importar as funções do Controller
const coisasControllers = require("../controllers/coisascontrollers");

// ============================================================
// DEFINIÇÃO DAS ROTAS
// Cada rota chama uma função específica do Controller
// ============================================================

// IMPORTANTE: rotas mais específicas devem vir ANTES das genéricas!
// '/categoria/:cat' deve vir antes de '/:id'

// GET /coisas - Listar todas as coisas
router.get("/", coisasControllers.listarTodos);

// GET /coisas/categoria/:categoria - Buscar por categoria
router.get("/categoria/:categoria", coisasControllers.buscarPorCategoria);

// GET /coisas/:id - Buscar coisa específica por ID
router.get("/:id", coisasControllers.buscarPorId);

// POST /coisas - Criar nova coisa
router.post("/", coisasControllers.criar);

// PUT /coisas/:id - Atualizar coisa completo
router.put("/:id", coisasControllers.atualizar);

// DELETE /coisas/:id - Deletar coisa
router.delete("/:id", coisasControllers.deletar);

// ============================================================
// EXPORTAR O ROUTER
// ============================================================
module.exports = router;
