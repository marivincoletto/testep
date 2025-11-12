const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT a.*, p.nome FROM historico_alerta a JOIN produto p ON a.id_produto = p.id_produto');
    res.json(rows);
});

module.exports = router;
