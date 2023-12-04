<<<<<<< HEAD
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
=======
import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { join } from 'path';
import { createPinia } from 'pinia';
// import { useAppStore } from './tr2-MathPotato-Front/src/stores/guestStore.js';
const app = express();

app.use(cors());

const usersConectados = [];
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
>>>>>>> parent of 03e8f7a (Revert "Merge branch 'develop' of https://github.com/inspedralbes/tr2-multiplicat-dawtr2gmathpotato into develop")
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
<<<<<<< HEAD
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
=======
    res.sendFile(join(__dirname, './tr2-MathPotato-Front/src/components/GuestView.vue'));
});

io.on('connection', (socket) => {
    console.log("Usuario conectado.");
    console.log(socket.id);

    try {
        socket.on('join', (dataUser) => {
            // Verifica si el usuario con el mismo socket.id ya existe en el array
            const existingUserIndex = usersConectados.findIndex(user => user.id === socket.id);

            if (existingUserIndex !== -1) {
                // Si el usuario ya existe, actualiza su nombre de usuario
                usersConectados[existingUserIndex].username = dataUser;
            } else {
                // Si el usuario no existe, agrégalo al array
                usersConectados.push({ username: dataUser, id: socket.id });
            }

            console.log(dataUser); // data = nombre de usuario
            io.emit('usersConnected', usersConectados);
        });

        socket.on('disconnect', () => {
            const usuarioDesconectadoIndex = usersConectados.findIndex(user => user.id === socket.id);

            console.log(usersConectados);
            console.log(usuarioDesconectadoIndex);
>>>>>>> parent of 03e8f7a (Revert "Merge branch 'develop' of https://github.com/inspedralbes/tr2-multiplicat-dawtr2gmathpotato into develop")

            if (usuarioDesconectadoIndex !== -1) {
                usersConectados.splice(usuarioDesconectadoIndex, 1);
                console.log(usuarioDesconectadoIndex);

                io.emit('usersDesconectados', usersConectados);
            }
            console.log('Usuario desconectado');
        });
    } catch (error) {
        console.error("Error ", error);
    }

<<<<<<< HEAD
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
=======
    // socket.emit("username");
    socket.on('disconnect', () => {
        io.emit('usersDesconectados', usersConectados);
    });
});
server.listen(5175, () => {
    console.log('Listening on http://localhost:5175');
>>>>>>> parent of 03e8f7a (Revert "Merge branch 'develop' of https://github.com/inspedralbes/tr2-multiplicat-dawtr2gmathpotato into develop")
});
