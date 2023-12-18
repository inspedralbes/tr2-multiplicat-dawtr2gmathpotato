import express, { response } from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { join } from 'path';
import mysql from 'mysql';
import { Console, clear, time } from 'node:console';
import { start } from 'node:repl';

// import fetch from 'node-fetch';
const app = express();
var pregActual = 0;
var userBomba = 0;
var preguntas = [];
var gameStart = false
var timer = 0;
var timerAnterior = 0;

app.use(cors());
const server = createServer(app);

const usersConectados = [];

const objPreguntes = {};
const URL = "http://127.0.0.1:8000/api/preguntes/random";

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

//--------------------------BASE DE DATOS----------------------------

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "potato"
});

io.on('connection', (socket) => {
    console.log("User connected.");
    console.log(socket.id);

    socket.on('join', (data) => {
        if (usersConectados.length === 0) {
            usersConectados.push({ username: data, id: socket.id, bomba: true, image: './src/assets/Icon_2.png' });
        } else {
            usersConectados.push({ username: data, id: socket.id, bomba: false, image: './src/assets/Icon_2.png' });
        }
        console.log(data);
        io.emit('usersConnected', usersConectados);


    });

    socket.on('preguntes', () => {
        console.log('preguntasAleatorias', objPreguntes);
        io.emit('preguntas', objPreguntes);
    })


    socket.on('startGame', (data) => {
        if (usersConectados.length >= 3 && usersConectados.length <= 6) {
            console.log("startGame");
            getPreguntes()
            iniciarTimer();
            startTimer();

        }
    });

    function getPreguntes() {

        fetch(URL)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response);
                    throw new Error('Network response was not ok.');
                }
            })
            .then(data => {
                preguntas = data;
                console.log(preguntas.preguntas[pregActual].id_pregunta)
                console.log(preguntas.preguntas[pregActual].pregunta)
                console.log("PreguntasAqui" + preguntas);
            }).then(() => {
                if (!gameStart) {
                    gameStart = true
                    newPregunta();
                }
            });
    }

    function newPregunta() {
        pregActual++;

        console.log(preguntas);
        io.emit('pregunta', { "id": preguntas.preguntas[pregActual].id_pregunta, "pregunta": preguntas.preguntas[pregActual].pregunta });

    }

    socket.on('resposta', (resposta) => {

        console.log("Pregunta: ", preguntas.preguntas[pregActual].pregunta);
        //console.log("La pregunta es: ", objPreguntes[pregActual].pregunta); //FUNCIONA

        const resultatPregunta = eval(preguntas.preguntas[pregActual].pregunta);
        console.log("Result correct --> ", resultatPregunta); //FUNCIONA
        console.log(resposta);

        if (resultatPregunta == resposta) {
            console.log("respuesta correcta");
            pregActual++;
            console.log(pregActual);

            usersConectados[userBomba].bomba = false;

            console.log(usersConectados[userBomba]);
            console.log(userBomba);
            console.log("timer inicial --> ", timer);
            if (userBomba + 1 == usersConectados.length) {
                userBomba = 0;
                if (timerAnterior > 20) {
                    timerAnterior = timerAnterior - 5;
                } else {
                    if (timerAnterior > 5) {
                        timerAnterior = timerAnterior - 2;
                    }
                }

            } else {
                userBomba++;
            }
            usersConectados[userBomba].bomba = true;
            console.log(userBomba);
            socket.emit('changeBomb', { "arrayUsers": usersConectados, "bombChange": true });



            newPregunta();

        } else {
            console.log("resposta incorrecta!");
            pregActual++;
            usersConectados[userBomba].bomba = true;
            socket.emit('changeBomb', { "arrayUsers": usersConectados, "bombChange": false });

            newPregunta();
        }
        timer = timerAnterior;
       
    });


    function iniciarTimer() {
        const size = usersConectados.length;

        switch (size) {
            case 3:
                timer = 31;
                break;
            case 4:
                timer = 36;
                break;
            case 5:
            case 6:
                timer = 41;
                break;
            default:
                timer = 0;
                break;
        }
        timerAnterior = timer;
    }

    function startTimer() {
        if (timer > 0) {
            setTimeout(() => {
                timer--;
                io.emit('timer', timer);
                console.log("tiempo --> ", timer);
                startTimer();
            }, 1000);
        } else {
            timer = timerAnterior;
            io.emit('timer', timer);
        }
    }

    socket.on('disconnect', () => {
        const usuarioDesconectadoIndex = usersConectados.findIndex(user => user.id === socket.id);

        console.log(usersConectados);
        console.log(usuarioDesconectadoIndex);

        if (usuarioDesconectadoIndex) {
            usersConectados.splice(usersConectados.indexOf(usuarioDesconectadoIndex), 1);

            io.emit('usersDesconectados', usersConectados);
        }
        console.log('Usuario desconectado');
    });

    socket.on('disconnect', () => {
        io.emit('usersDesconectados', usersConectados);
    });

    console.log('preguntasAleatorias', objPreguntes);
    // socket.emit("username");

    socket.emit('preguntas', objPreguntes[pregActual]); //Primera pregunta

});
// io.emit('arrayUsers', usersConectados);

server.listen(5175, () => {
    console.log('Listening on http://localhost:5175');

});
