const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require('path');

const app = express();

const urlStatic = path.resolve(__dirname, '../public/');
const port = process.env.PORT || 3000;

let server = http.createServer(app);

app.use(express.static(urlStatic));

module.exports.ios = socket(server);
require('./sockets/socket');

server.listen(port, (err) => {
    if (err) return console.error(err);
    console.log(`Esta corriendo en el puerto ${port} `);
});