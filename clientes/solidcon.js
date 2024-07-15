const sql = require('mssql');
const sqlMysql = require('mysql');

const config = {
    user: "universo digital",
    password: "universo!@#",
    server: "187.63.79.22",
    database: "Solidcon",
    port: 5000,
    options: {
        encrypt: false,
        enableArithAbort: true,
    }
};

const configMysql = {
    host: "",
    user: "",
    password: "",
    database: ""
};

async function getData() {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT count(*) as quantidade FROM vw_SiteMercado_21`;
        return result.recordset;
    } catch (err) {
        console.error('Erro ao realizar a consulta:', err);
        throw err;
    }
}

async function getDataMysql() {
    try {
        const connection = sqlMysql.createConnection(configMysql);
        connection.connect();
        connection.query('SELECT * FROM usuarios', (err, rows) => {
            if (err) throw err;
            console.log('Data received from Db:');
            console.log(rows);
        });
        connection.end();
    } catch (err) {
        console.error('Erro ao realizar a consulta:', err);
        throw err;
    }
}

async function getTest() {
    return { message: 'Teste de retorno' };
}

module.exports = {
    getDataMysql,
    getData,
    getTest
};
