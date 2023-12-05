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

    try {
        socket.on('join', (data) => {
            if (usersConectados.length === 0) {
                usersConectados.push({ username: data, id: socket.id, bomba: true });
            } else {
                usersConectados.push({ username: data, id: socket.id, bomba: false });
            }
            console.log(data);
            io.emit('usersConnected', usersConectados);
        });

        socket.on('pregunta', (data) => {
            function newPregunta() {
                fetch(URL)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        objPreguntes[pregActual] = {
                            id: data.preguntas[pregActual].id_pregunta,
                            pregunta: data.preguntas[pregActual].pregunta,
                        };
                        socket.emit('preguntasAleatorias', data);
                    })
                    .catch(error => {
                        console.error('Hubo un problema con la solicitud fetch:', error);
                    });
            }
        });

        socket.on('resposta', (data) => {
            console.log("La pregunta es: ", objPreguntes[pregActual].pregunta); //FUNCIONA

            const resultatPregunta = eval(objPreguntes[pregActual].pregunta);
            console.log("--> ", resultatPregunta); //FUNCIONA

            console.log(usersConectados + "HOLAESTOYAQUIYTUCIEGO"); //FUNCIONA
            console.log(resultatPregunta);

            if (resultatPregunta === respuesta) {
                console.log("entraaaaaaaaaaaaaaaaaaaaaaaaaa?");
                pregActual++;
                console.log(pregActual);

                usersConectados[userBomba].bomba = false;

                console.log(usersConectados[userBomba]);
                console.log(userBomba);
                if (userBomba + 1 === usersConectados.length) {
                    userBomba = 0;
                } else {
                    userBomba++;
                }
                usersConectados[userBomba].bomba = true;
                console.log(userBomba);
                socket.emit('usersConnected', usersConectados);
                newPregunta();
            } else {
                console.log("has fallao tonto");
                pregActual++;
                usersConectados[userBomba].bomba = true;
                socket.emit('usersConnected', usersConectados);
                newPregunta();
            }
        });

        // usersConectados.push(nuevoUsuario);

        // socket.broadcast.emit('usuarioConectado', usersConectados);   
        // for (let i = 0; i < usersConectados.length; i++) {
        //     console.log("hola", usersConectados[i]);

        // }

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
    } catch (error) {
        console.error("Error ", error);
    }
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
