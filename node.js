const express = require('express');
const app = express();
const server = require("http").Server(app);
const io = require('socket.io')(server);
const fs = require('fs');
const { Socket } = require('socket.io');
// import fetch from 'node-fetch';
var mysql = require('mysql');
var usersConectados = [];

const objPreguntes = {};
const URL = "http://127.0.0.1:8000/api/preguntes/random";

//--------------------------BASE DE DATOS----------------------------

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Potato"
});

con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM preguntas", function (err, pregunta) {
        if (err) throw err;

        fetch(URL)
            .then(response => {
                return response.json();
            })
            .then(data => {
                for (let i = 0; i < data.preguntas.length; i++) {
                    objPreguntes[i] = {
                        id: data.preguntas[i].id_pregunta,
                        pregunta: data.preguntas[i].pregunta,
                    };
                }

                io.emit('preguntasAleatorias', data);
            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud fetch:', error);
            });

        for (let i = 0; i < objPreguntes.length; i++) {
            console.log("La pregunta es: ", pregunta[i].pregunta);
            const resultatPregunta = eval(pregunta[i].pregunta);
            console.log("--> ", resultatPregunta);

            objPreguntes[i] = {
                id: pregunta[i].id_pregunta,
                pregunta: pregunta[i].pregunta,
            };
        }

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
    console.log('preguntasAleatorias', objPreguntes);

    socket.emit("username");

    socket.emit('preguntas', objPreguntes);

});

server.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
});
