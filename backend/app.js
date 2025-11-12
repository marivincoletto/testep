const express = require('express');
const session = require('express-session');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const movimentacaoRoutes = require('./routes/movimentacaoRoutes');
const alertaRoutes = require('./routes/alertaRoutes');

const app = express();
app.use(cors());

app.use(express.json());
app.use(session({
    secret: 'chave-secreta',
    resave: false,
    saveUninitialized: true
}));

app.use('/usuarios', usuarioRoutes);
app.use('/produtos', produtoRoutes);
app.use('/movimentacoes', movimentacaoRoutes);
app.use('/alertas', alertaRoutes);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
