const express = require("express");

const db = require("../data/dbConfig.js");

const accountRouter = require('../accounts/router');

const server = express();



server.use(express.json());
server.use('/api/accounts', accountRouter)

server.get('/', (req, res) => {
    res.status(200).json({ API: 'This is the API Database'})
})


module.exports = server;
