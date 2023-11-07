const express = require('express');
const LivroService = require('../services/AutoresService');
const router = express.Router();

// Rotas da API de livros
router.get('/', async (req, res) => {
    try {
        const autores = await AutoresService.listarAutores();
        res.json(autores);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar Autores." });
    }
});

router.post('/', async (req, res) => {
    try {
        const id = await AutoresService.adicionarAutores(req.body);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ message: "Erro ao adicionar Autor." });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await AutoresService.atualizarAutores(req.params.id, req.body);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar autor." });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await AutoresService.deletarAutores(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar autor." });
    }
});

module.exports = router;
