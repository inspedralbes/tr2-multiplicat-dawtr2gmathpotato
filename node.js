import express, { response } from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { join } from 'path';
import mysql from 'mysql';

// import fetch from 'node-fetch';
const app = express();
var pregActual = 0;
var userBomba = 0;
var preguntas = [];
var gameStart = false

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
    socket.on('register', (userData) => {
        console.log(userData);
        fetch('http://localhost:8000/api/register', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                if (usersConectados.length === 0) {
                    usersConectados.push({ username: userData.username, id: socket.id, bomba: true, image: './src/assets/Icon_' + userData.foto_perfil + '.png' });
                } else {
                    usersConectados.push({ username: userData.username, id: socket.id, bomba: false, image: './src/assets/Icon_' + userData.foto_perfil + '.png' });
                }
                io.emit('usersConnected', usersConectados);
                return response.json(); 
            } else {
                console.log(response);
                throw new Error('Network response was not ok.');
                
            }
        }).then(userData => {
            console.log(userData);
        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    });
    socket.on('login', async (data) => {
        // console.log(data);
        await getUser(data);
    });
    async function getUser(data) {
        try {
            console.log("data to send...",data)
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // console.log("response..??", response);
            if (response) {
                
                const responseData = await response.json();
                console.log("response.ok....",responseData);

                if (usersConectados.length === 0) {
                    usersConectados.push({ username: responseData.username, id: socket.id, bomba: true, image: './src/assets/Icon_' + responseData.foto_perfil + '.png' });
                }else{
                    usersConectados.push({ username: responseData.username, id: socket.id, bomba: true, image: './src/assets/Icon_' + responseData.foto_perfil + '.png' });
                }
                io.emit('usersConnected', usersConectados);
                return responseData;
            } else {
                console.log(response);
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
    socket.on('preguntes', () => {
        console.log('preguntasAleatorias', objPreguntes);
        io.emit('preguntas', objPreguntes);
    });

    socket.on('startGame', (gameStarted) => {
        if (usersConectados.length >= 3 && usersConectados.length <= 6) {
            console.log("startGame");
            getPreguntes();
            io.emit('gameStarted', gameStarted);

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
            }
            );
    }

    function newPregunta() {
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
            pregActual++;
            console.log(pregActual);

            usersConectados[userBomba].bomba = false;

            console.log(usersConectados[userBomba]);
            console.log(userBomba);
            if (userBomba + 1 == usersConectados.length) {
                userBomba = 0;
            } else {
                userBomba++;
            }
            usersConectados[userBomba].bomba = true;
            console.log(userBomba);
            io.emit('changeBomb', { "arrayUsers": usersConectados, "bombChange": true });
            newPregunta();
        } else {
            console.log("resposta incorrecta!");
            pregActual++;
            usersConectados[userBomba].bomba = true;
            io.emit('changeBomb', { "arrayUsers": usersConectados, "bombChange": false });
            newPregunta();

        }
    });

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
    socket.on('login', (data) => {
        console.log(data);
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
