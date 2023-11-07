const pool = require('../config/database');

async function listarAutores() {
    const [results] = await pool.query('SELECT * FROM Autores');
    return results;
}

async function adicionarAutores(autor) {
    const { nome, biografia, datadeNascimento } = autor;
    const [results] = await pool.query('INSERT INTO Autores (nome, biografia, datadeNascimento) VALUES (?, ?, ?)', [nome, biografia, datadeNascimento]);
    return results.insertId;
}

async function atualizarAutores(id, livro) {
    const { titulo, autor, dataPublicacao } = livro;
    await pool.query('UPDATE autores SET nome = ?, biografia = ?, datadeNascimento = ? WHERE id = ?', [nome, biografia, datadeNascimento, id]);
}

async function deletarAutores(id) {
    await pool.query('DELETE FROM Autores WHERE id = ?', [id]);
}

module.exports = {
    listarAutores,
    adicionarAutores,
    atualizarAutores,
    deletarAutores
};