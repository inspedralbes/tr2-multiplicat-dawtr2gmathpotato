const express = require('express');
const app = express();
const server = require("http").Server(app);
const io = require('socket.io')(server);
const fs = require('fs');
const { Socket } = require('socket.io');
var mysql = require('mysql');
var usersConectados = [];

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Potato"
});

con.connect(function(err){
    if (err) throw err;
    con.query("SELECT * FROM preguntas", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});

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
