const express = require('express');
const app = express();
const server = require("http").Server(app);
const io = new Server(server);
const fs = require('fs');
const { Socket } = require('socket.io');
var users = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('Nuevo usuario', (nuevoUsuario) => {
        try {
            users.push(nuevoUsuario);
            
            io.broadcast.emit('usuarioConectado', users);
            console.log("hola")

            socket.on('disconect', () => {
                const usuarioDesconectado = users.findIndex(user => user.id === socket.id);

                if (usuarioDesconectado) {
                    users.splice(users.indexOf(usuarioDesconectado, 1));
                    io.broadcast.emit('usuarioDesconectado', socket.id);
                }
            });

        } catch (error) {
            console.error("Error ", error);
        }
    });
    socket.emit("username");
});

server.listen(3000, () => {
    console.log('listening on http://localhost:3000');
});