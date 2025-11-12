const express = require('express');
const pool = require('../db');
const router = express.Router();

// Registrar movimentação
router.post('/', async (req, res) => {
    const { id_produto, tipo_movimentacao, quantidade, responsavel } = req.body;

    if (!id_produto || !tipo_movimentacao || !quantidade || !responsavel) {
        return res.status(400).json({ message: 'Dados inválidos' });
    }

    try {
        // Insere movimentação
        await pool.query(
            'INSERT INTO movimentacao_estoque (id_produto, tipo_movimentacao, quantidade, responsavel) VALUES (?, ?, ?, ?)',
            [id_produto, tipo_movimentacao, quantidade, responsavel]
        );

        // Calcula estoque atual
        const [estoqueRows] = await pool.query(
            `SELECT SUM(CASE WHEN tipo_movimentacao='Entrada' THEN quantidade ELSE -quantidade END) AS estoque_atual
             FROM movimentacao_estoque WHERE id_produto = ?`,
            [id_produto]
        );
        const estoqueAtual = estoqueRows[0].estoque_atual || 0;

        // Atualiza tabela produto com estoque atual
        await pool.query('UPDATE produto SET estoque_atual = ? WHERE id_produto = ?', [estoqueAtual, id_produto]);

        // Verifica alertas
        const [produtoRows] = await pool.query('SELECT estoque_minimo FROM produto WHERE id_produto = ?', [id_produto]);
        const estoqueMinimo = produtoRows[0].estoque_minimo;

        if (estoqueAtual <= estoqueMinimo) {
            await pool.query(
                'INSERT INTO historico_alerta (id_produto, mensagem) VALUES (?, ?)',
                [id_produto, 'Estoque baixo para o produto']
            );
        }

        if (estoqueAtual < 0) {
            await pool.query(
                'INSERT INTO historico_alerta (id_produto, mensagem) VALUES (?, ?)',
                [id_produto, 'Estoque NEGATIVO! Verifique movimentações']
            );
        }

        res.json({ message: 'Movimentação registrada com sucesso', estoqueAtual });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor', error });
    }
});

// Listar movimentações
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT m.*, p.nome FROM movimentacao_estoque m JOIN produto p ON m.id_produto = p.id_produto ORDER BY m.data_movimentacao DESC'
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar movimentações', error });
    }
});

module.exports = router;