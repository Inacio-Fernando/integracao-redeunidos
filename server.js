const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    res.json({ message: 'API Rodando' });
});

app.get('/api/:cliente/:func', async (req, res) => {
    const cliente = req.params.cliente;
    const func = req.params.func;

    try {
        const clienteModule = require(path.join(__dirname, 'clientes', cliente, 'index.js'));
        if (typeof clienteModule[func] !== 'function') {
            return res.status(400).send(`Function ${func} not found in module ${cliente}`);
        }
        const result = await clienteModule[func]();
        res.json(result);
    } catch (err) {
        console.error(`Erro ao carregar o módulo para ${cliente}:`, err);
        res.status(500).send(`Erro ao carregar o módulo para ${cliente}`);
    }
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${port}`);
});
