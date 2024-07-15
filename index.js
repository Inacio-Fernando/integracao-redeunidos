const express = require('express');
const sql = require('mssql');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        encrypt: false, // Desabilitar criptografia para SQL Server 2008
        enableArithAbort: true,
    }
};

const loadData = async () => {
    try {
        console.log('Carregando dados...');
        const result = await sql.query`SELECT * FROM vw_SiteMercado_21`;
        console.log(result.recordset);
    } catch (err) {
        console.error('Erro ao realizar a consulta:', err);
    }
}

// Conectar ao SQL Server
sql.connect(config, err => {
    if (err) {
        console.error('Erro ao conectar ao SQL Server:', err);
        return;
    }
    console.log('Conectado ao SQL Server');
    loadData();
    // Endpoint para realizar a consulta
    app.get('/', (req, res) => {
        res.send('API rodando');
    });
    app.get('/api/data', async (req, res) => {
        try {
            const result = await sql.query`SELECT count(*) as qnt FROM VW_UNVDIGITAL_PRODUTO`;
            res.json(result.recordset);
        } catch (err) {
            console.error('Erro ao realizar a consulta:', err);
            res.status(500).send('Erro ao realizar a consulta');
        }
    });

    // Iniciar o servidor
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
});
