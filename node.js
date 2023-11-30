const express = require('express');
const app = express();
const server = require("http").Server(app);
const io = require('socket.io')(server);
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
            
            socket.broadcast.emit('usuarioConectado', users);   
            for (let i = 0; i < users.length; i++) {
                console.log("hola", users[i]);
            }

            socket.on('disconnect', () => {
                const usuarioDesconectadoIndex = users.findIndex(user => user.id === socket.id);

                if (usuarioDesconectadoIndex !== -1) {
                    const usuarioDesconectado = users.splice(usuarioDesconectadoIndex, 1)[0];
                    io.emit('usuarioDesconectado', usuarioDesconectado);
                    console.log("adios");
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
