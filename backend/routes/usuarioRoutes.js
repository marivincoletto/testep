const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { login, senha } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM usuario WHERE login = ?', [login]);
        if (rows.length === 0) return res.status(401).json({ message: 'Usuário não encontrado' });
        const usuario = rows[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) return res.status(401).json({ message: 'Senha inválida' });
        req.session.usuario = { id: usuario.id_usuario, nome: usuario.nome, perfil: usuario.perfil };
        res.json({ message: 'Login realizado com sucesso', usuario: req.session.usuario });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
});

module.exports = router;
