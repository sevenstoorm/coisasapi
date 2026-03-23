const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Definir o caminho do banco de dados
const caminhoDb = path.join(__dirname, "../config/coisas.db");

// Criar conexão com o banco
const db = new sqlite3.Database(caminhoDb, (erro) => {
  if (erro) {
    console.error("Erro ao conectar ao banco de dados:", erro.message);
  } else {
    console.log("✅ Conectado ao banco de dados SQLite!");
  }
});

// Criar a tabela de coisas se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS coisas (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME VARCHAR(100) NOT NULL,
    TIPOC VARCHAR(50) NOT NULL,
    VALOR DECIMAL(10, 2) NOT NULL,
    DTCOISA DATETIME DEFAULT CURRENT_TIMESTAMP,
    QUANTIACOISA INTEGER NOT NULL
  )
`);

module.exports = db;