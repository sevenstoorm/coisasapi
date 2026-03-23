// Importar a conexão com o banco de dados
const db = require("../config/config");

// ============================================================
// FUNÇÃO: listarTodos
// DESCRIÇÃO: Retorna todas as coisas do banco
// RETORNO: Promise que resolve com array de coisas
// ============================================================
function listarTodos() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM coisas", [], (erro, linhas) => {
      if (erro) {
        reject(erro);
      } else {
        resolve(linhas);
      }
    });
  });
}

// ============================================================
// FUNÇÃO: buscarPorId
// DESCRIÇÃO: Busca uma coisa específica pelo ID
// PARÂMETRO: id (número) - identificador da coisa
// RETORNO: Promise que resolve com a coisa ou undefined
// ============================================================
function buscarPorId(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM coisas WHERE ID = ?", [id], (erro, linha) => {
      if (erro) {
        reject(erro);
      } else {
        resolve(linha);
      }
    });
  });
}

// ============================================================
// FUNÇÃO: criar
// DESCRIÇÃO: Insere uma nova coisa no banco
// PARÂMETRO: dados (objeto) - contém NOME, VALOR, QUANTIACOISA, TIPOC
// RETORNO: Promise que resolve com a coisa criada (com ID)
// ============================================================
function criar(dados) {
  return new Promise((resolve, reject) => {
    const { NOME, TIPOC, VALOR, DTCOISA, QUANTIACOISA } = dados;

    db.run(
      "INSERT INTO coisas (NOME, TIPOC, VALOR, DTCOISA, QUANTIACOISA) VALUES (?, ?, ?, ?, ?)",
      [NOME, TIPOC, VALOR, DTCOISA, QUANTIACOISA],
      function (erro) {
        if (erro) {
          reject(erro);
        } else {
          // Recuperar a coisa recém-criada
          db.get(
            "SELECT * FROM coisas WHERE ID = ?",
            [this.lastID],
            (erro, linha) => {
              if (erro) {
                reject(erro);
              } else {
                resolve(linha);
              }
            }
          );
        }
      }
    );
  });
}

// ⚠️ NOTA IMPORTANTE SOBRE AUTOINCREMENT:
// Quando criamos a tabela, definimos o campo ID como AUTOINCREMENT.
// Isso significa que o BANCO DE DADOS é responsável por gerar o próximo ID.
//
// Por isso:
// ❌ NÃO fazemos: INSERT INTO coisas (ID, NOME, ...) VALUES (?, ?, ...)
// ✅ Fazemos: INSERT INTO coisas (NOME, VALOR, ...) VALUES (?, ?, ...)
//
// O SQLite adiciona o ID automaticamente e podemos recuperá-lo usando this.lastID

// ============================================================
// FUNÇÃO: atualizar
// DESCRIÇÃO: Atualiza todos os dados de uma coisa
// PARÂMETROS:
//   - id (número): identificador da coisa
//   - dados (objeto): novos dados
// RETORNO: Promise com coisa atualizada ou null
// ============================================================
function atualizar(id, dados) {
  return new Promise((resolve, reject) => {
    const { NOME, VALOR, QUANTIACOISA, TIPOC } = dados;

    db.run(
      "UPDATE coisas SET NOME = ?, VALOR = ?, QUANTIACOISA = ?, TIPOC = ? WHERE ID = ?",
      [NOME, VALOR, QUANTIACOISA, TIPOC, id],
      function (erro) {
        if (erro) {
          reject(erro);
        } else {
          if (this.changes > 0) {
            // Recuperar a coisa atualizada
            db.get(
              "SELECT * FROM coisas WHERE ID = ?",
              [id],
              (erro, linha) => {
                if (erro) {
                  reject(erro);
                } else {
                  resolve(linha);
                }
              }
            );
          } else {
            resolve(null); // Não encontrou a coisa
          }
        }
      }
    );
  });
}

// ============================================================
// FUNÇÃO: deletar
// DESCRIÇÃO: Remove uma coisa do banco
// PARÂMETRO: id (número) - identificador da coisa
// RETORNO: Promise com true (sucesso) ou false (não encontrado)
// ============================================================
function deletar(id) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM coisas WHERE ID = ?", [id], function (erro) {
      if (erro) {
        reject(erro);
      } else {
        resolve(this.changes > 0);
      }
    });
  });
}

// ============================================================
// FUNÇÃO: buscarPorCategoria
// DESCRIÇÃO: Filtra coisas por TIPOC (categoria)
// PARÂMETRO: categoria (string)
// RETORNO: Promise com array de coisas
// ============================================================
function buscarPorCategoria(categoria) {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM coisas WHERE TIPOC = ?",
      [categoria],
      (erro, linhas) => {
        if (erro) {
          reject(erro);
        } else {
          resolve(linhas);
        }
      }
    );
  });
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPorCategoria,
};