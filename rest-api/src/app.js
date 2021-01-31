const express = require('express');
const config = require('./config');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

var db;

async function checkQuoteTable(db) {
    const [rows, fields] = await db.execute("SHOW TABLES LIKE '?'", ['quotes']);

    if(rows.length === 0) {
        await db.execute(
            `CREATE TABLE IF NOT EXISTS quotes (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            content VARCHAR(255) NOT NULL,
            author VARCHAR(30),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modifiedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`
        );
    }
}

async function checkDBstructure() {
    await checkQuoteTable(db);
}

function quoteEndpoints() {
    const app = express.Router();

    app.post('/', async function(req, res) {
        const body = req.body;

        const [rows, fields] = await db.execute(
            `
            INSERT INTO quotes (content, author) VALUES (?, ?);
            `,
            [body.content, body.author]
        );

        res.sendStatus(201);
    });

    app.get('/', async function(req, res) {
        const [rows, fields] = await db.execute(
            `
            SELECT * FROM quotes;
            `
        );

        res.send(rows);
    });

    app.get('/:quoteId', async function(req, res) {
        const quoteId = req.params.quoteId;

        const [rows, fields] = await db.execute(
            `
            SELECT * FROM quotes WHERE id = ?;
            `,
            [quoteId]
        );

        res.send(rows);
    });

    app.delete('/:quoteId', async function(req, res) {
        const quoteId = req.params.quoteId;

        const [rows, fields] = await db.execute(
            `
            DELETE FROM quotes WHERE id = ?;
            `,
            [quoteId]
        );

        res.sendStatus(200);
    });

    return app;
}

function initEndpoints(app) {
    app.get('/test', (req, res) => res.send('Hello World!'));

    app.use('/quote', quoteEndpoints());

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
}

async function startService() {
    const app = express();

    app.use(bodyParser.json())
    db = await mysql.createConnection({
        host: config.db_host,
        user: config.db_user,
        password: config.db_pass,
        database: config.db_database
    });

    db.connect();

    await checkDBstructure();

    initEndpoints(app);

    app.listen(config.port, () => {
        console.info(`Server listening on port ${config.port}`);
    });
}

startService();
