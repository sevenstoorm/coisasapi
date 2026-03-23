// Importar as funções do Model
const coisasModel = require("../models/coisasModels");

// ============================================================
// FUNÇÃO: listarTodos (ASSÍNCRONA)
// ROTA: GET /coisas
// DESCRIÇÃO: Lista todas as coisas do banco de dados
// ============================================================
// A palavra 'async' antes da função permite usar 'await' dentro dela
async function listarTodos(req, res) {
  try {
    // 'await' pausa a execução até a Promise do Model resolver
    // É como "esperar" o banco de dados responder
    const coisas = await coisasModel.listarTodos();

    // Depois que os dados chegam, enviar a resposta
    res.status(200).json(coisas);
  } catch (erro) {
    // Se der qualquer erro, cai aqui
    res.status(500).json({
      mensagem: "Erro ao listar coisas",
      erro: erro.message,
    });
  }
}

// ============================================================
// FUNÇÃO: buscarPorId (ASSÍNCRONA)
// ROTA: GET /coisas/:id
// ============================================================
async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);

    // Validar o ID antes de consultar o banco
    if (isNaN(id)) {
      return res.status(400).json({
        mensagem: "ID inválido",
      });
    }

    // Aguardar a busca no banco
    const coisa = await coisasModel.buscarPorId(id);

    if (coisa) {
      res.status(200).json(coisa);
    } else {
      res.status(404).json({
        mensagem: `Coisa ${id} não encontrada`,
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar coisa",
      erro: erro.message,
    });
  }
}

// ============================================================
// FUNÇÃO: criar (ASSÍNCRONA)
// ROTA: POST /coisas
// ============================================================
async function criar(req, res) {
  try {
    const { NOME, TIPOC, VALOR, DTCOISA, QUANTIACOISA } = req.body;

    // Validações ANTES de tentar inserir no banco
    if (!NOME || !TIPOC || !VALOR || !DTCOISA || !QUANTIACOISA) {
      return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios",
      });
    }

    if (parseFloat(VALOR) <= 0) {
      return res.status(400).json({
        mensagem: "O VALOR deve ser maior que zero",
      });
    }

    if (parseInt(QUANTIACOISA) < 0) {
      return res.status(400).json({
        mensagem: "A QUANTIACOISA não pode ser negativa",
      });
    }

    // Aguardar a inserção no banco
    const novaCoisa = await coisasModel.criar({
      NOME,
      TIPOC,
      VALOR,
      DTCOISA,
      QUANTIACOISA
    });

    // Retornar a coisa criada com status 201
    res.status(201).json(novaCoisa);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao criar coisa",
      erro: erro.message,
    });
  }
}

// ============================================================
// FUNÇÃO: atualizar (ASSÍNCRONA)
// ROTA: PUT /coisas/:id
// ============================================================
async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { NOME, TIPOC, VALOR, DTCOISA, QUANTIACOISA } = req.body;

    // Validações
    if (isNaN(id)) {
      return res.status(400).json({
        mensagem: "ID inválido",
      });
    }

    if (!NOME || !TIPOC || !VALOR || !DTCOISA || !QUANTIACOISA) {
      return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios",
      });
    }

    // Aguardar a atualização no banco
    const coisaAtualizada = await coisasModel.atualizar(id, {
      NOME,
      TIPOC,
      VALOR,
      DTCOISA,
      QUANTIACOISA
    });

    if (coisaAtualizada) {
      res.status(200).json(coisaAtualizada);
    } else {
      res.status(404).json({
        mensagem: `Coisa ${id} não encontrada`,
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao atualizar coisa",
      erro: erro.message,
    });
  }
}

// ============================================================
// FUNÇÃO: deletar (ASSÍNCRONA)
// ROTA: DELETE /coisas/:id
// ============================================================
async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        mensagem: "ID inválido",
      });
    }

    // Aguardar a deleção no banco
    const deletada = await coisasModel.deletar(id);

    if (deletada) {
      res.status(200).json({
        mensagem: `Coisa ${id} removida com sucesso`,
      });
    } else {
      res.status(404).json({
        mensagem: `Coisa ${id} não encontrada`,
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao deletar coisa",
      erro: erro.message,
    });
  }
}

// ============================================================
// FUNÇÃO: buscarPorCategoria (ASSÍNCRONA)
// ROTA: GET /coisas/categoria/:categoria
// ============================================================
async function buscarPorCategoria(req, res) {
  try {
    const { categoria } = req.params;

    // Aguardar a busca no banco
    const coisas = await coisasModel.buscarPorCategoria(categoria);

    res.status(200).json(coisas);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar coisas por categoria",
      erro: erro.message,
    });
  }
}

// ============================================================
// EXPORTAR TODAS AS FUNÇÕES
// ============================================================
module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPorCategoria,
};