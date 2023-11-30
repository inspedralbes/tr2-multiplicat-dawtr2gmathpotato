const express = require('express');
const app = express();
const server = require("http").Server(app);
const io = require('socket.io')(server);
const fs = require('fs');
const { Socket } = require('socket.io');
var usersConectados = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('Nuevo usuario', (nuevoUsuario) => {
        console.log("User connected.");
        console.log(socket.id);
        
        try {
            usersConectados.push(nuevoUsuario);
            
            socket.broadcast.emit('usuarioConectado', usersConectados);   
            for (let i = 0; i < usersConectados.length; i++) {
                console.log("hola", usersConectados[i]);
            }

            socket.on('disconnect', () => {
                const usuarioDesconectadoIndex = usersConectados.findIndex(user => user.id === socket.id);

                console.log(usersConectados);
                console.log(usuarioDesconectadoIndex);

                if (usuarioDesconectadoIndex) {
                    usersConectados.splice(usersConectados.indexOf(usuarioDesconectadoIndex), 1);

                    io.emit('arrayUsers', usersConectados);

                }
            });

        } catch (error) {
            console.error("Error ", error);
        }
    });
    socket.emit("username");
});

server.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
});
