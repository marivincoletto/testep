const express = require('express');
const pool = require('../db');
const router = express.Router();

// Listar todos os produtos
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM produto');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar produtos', error });
    }
});

// Criar produto
router.post('/', async (req, res) => {
    const { nome, descricao, categoria, marca, modelo, estoque_minimo, estoque_atual, preco } = req.body;
    try {
        await pool.query(
            'INSERT INTO produto (nome, descricao, categoria, marca, modelo, estoque_minimo, estoque_atual, preco) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nome, descricao, categoria, marca, modelo, estoque_minimo, estoque_atual || 0, preco]
        );
        res.json({ message: 'Produto criado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar produto', error });
    }
});

// Atualizar produto
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, categoria, marca, modelo, estoque_minimo, estoque_atual, preco } = req.body;
    try {
        await pool.query(
            'UPDATE produto SET nome=?, descricao=?, categoria=?, marca=?, modelo=?, estoque_minimo=?, estoque_atual=?, preco=? WHERE id_produto=?',
            [nome, descricao, categoria, marca, modelo, estoque_minimo, estoque_atual, preco, id]
        );
        res.json({ message: 'Produto atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar produto', error });
    }
});

// Excluir produto
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM produto WHERE id_produto=?', [id]);
        res.json({ message: 'Produto excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir produto', error });
    }
});

module.exports = router;