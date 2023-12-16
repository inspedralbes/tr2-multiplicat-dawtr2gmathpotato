import express, { response } from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { join } from 'path';
import mysql from 'mysql';

// import fetch from 'node-fetch';
const app = express();
var lastRoom = 0;
var gameRooms = [];

app.use(cors());
const server = createServer(app);



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

    //obtener informacion sobre las salas
    console.log('Salas: ', io.sockets.adapter.rooms);


    socket.on('join', (data) => {

        if (gameRooms.length == 0) {
            gameRooms.push({ idRoom: lastRoom, roomName: "gameRoom" + lastRoom, users: [], started: false, preguntas: [], pregActual: 0 });
        } else {
            if (gameRooms[gameRooms.length - 1].users.length == 6 || gameRooms[gameRooms.length - 1].started == true) {
                lastRoom++;
                gameRooms.push({ idRoom: lastRoom, roomName: "gameRoom" + lastRoom, users: [], started: false, preguntas: [], pregActual: 0 });
            }
        }

        if (gameRooms[gameRooms.length - 1].users.length == 0) {
            // Si no hay usuarios conectados, se agrega el primer usuario a la sala
            gameRooms[gameRooms.length - 1].users.push({ username: data, id: socket.id, bomba: true, image: './src/assets/Icon_1.png', roomPosition: lastRoom });
        } else {
            // Si ya hay usuarios, se agrega un nuevo usuario a la sala
            gameRooms[gameRooms.length - 1].users.push({ username: data, id: socket.id, bomba: false, image: './src/assets/Icon_1.png', roomPosition: lastRoom });
        }
        socket.join("gameRoom" + lastRoom);
        console.log(gameRooms[gameRooms.length - 1].users);
        io.to("gameRoom" + lastRoom).emit('usersConnected', gameRooms[gameRooms.length - 1].users, gameRooms[gameRooms.length - 1].roomName);
        console.log('Salas: ', io.sockets.adapter.rooms);
    });


    socket.on('startGame', (data) => {
        console.log("aaaaaaaaaaaaa " + data);
        gameRooms[data.roomPosition].started = true;
        if (gameRooms[data.roomPosition].users.length >= 3 && gameRooms[data.roomPosition].users.length <= 6) {
            console.log("startGame");
            getPreguntes(gameRooms[data.roomPosition]);
            io.to("gameRoom" + data.roomPosition).emit('gameStarted', data.gameStarted);
            //    CambiaEsta =
        }
    });

    function getPreguntes(room) {
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
                let preguntas = data;
                gameRooms[room].preguntas = preguntas;
                console.log("PreguntasAqui" + preguntas);
            }).then(() => {
                if (!gameRooms[room].started) {
                    gameRooms[room].started = true;
                    newPregunta(room);
                }
            }
            );
    }

    function newPregunta(room) {
        io.to("gameRoom" + room).emit('pregunta', { "id": gameRooms[room].preguntas[gameRooms[room].pregActual].id, "pregunta": gameRooms[room].preguntas[gameRooms[room].pregActual].pregunta });

    }
    function getUserWithBomb(room) {
        for (let i = 0; i < gameRooms[room].users.length; i++) {
            if (gameRooms[room].users[i].bomba) {
                return i;
            }
        }
    }
    socket.on('resposta', (data) => {
        // CambiaEsta =
        console.log("Pregunta: ", gameRooms[data.room].preguntas[gameRooms[data.room].pregActual].pregunta);

        const resultatPregunta = eval(gameRooms[data.room].preguntas[gameRooms[data.room].pregActual].pregunta);
        console.log("Result correct --> ", resultatPregunta); //FUNCIONA
        console.log(data.resposta);
        let userWithBomb = getUserWithBomb(data.room);
        if (resultatPregunta == data.resposta) {
            console.log("respuesta correcta");
            gameRooms[data.room].pregActual++;
            gameRooms[data.room].users[userWithBomb].bomba = false;

            console.log(gameRooms[data.room].users[userWithBomb].bomba);
            if (userWithBomb == gameRooms[data.room].users.length - 1) {
                gameRooms[data.room].users[0].bomba = true;
            } else {
                gameRooms[data.room].users[userWithBomb + 1].bomba = true;
            }

            io.to("gameRoom" + data.room).emit('changeBomb', { "arrayUsers": gameRooms[data.room].users, "bombChange": true });

        } else {
            console.log("resposta incorrecta!");
            gameRooms[data.room].pregActual++;
            gameRooms[data.room].users[userWithBomb].bomba = true;
            io.to(data.room).emit('changeBomb', { "arrayUsers": gameRooms[data.room].users, "bombChange": false });

        }
        newPregunta(data.room);
    });

    socket.on('disconnect', () => {
        // let CambiaEsta=
        let usuarioDesconectadoIndex = -1;
        gameRooms.forEach(room => {
            usuarioDesconectadoIndex = room.users.findIndex(user => user.id === socket.id);
            if (usuarioDesconectadoIndex >= 0) {
                let usuarioDesconectado = room.users.splice(usuarioDesconectadoIndex, 1)[0];
                socket.leave('gameRoom' + room);
                io.to('gameRoom' + room).emit('usersDesconectados', room.users, 'gameRoom' + room);
                console.log('Usuario desconectado: ', usuarioDesconectado);
            }
        });


        console.log(gameRooms[room].users);
        console.log(usuarioDesconectadoIndex);

        if (usuarioDesconectadoIndex >= 0) {
            let usuarioDesconectado = gameRooms[room].users.splice(gameRooms[room].users.indexOf(usuarioDesconectadoIndex), 1)[0];


            socket.leave('gameRoom' + room);
            io.to('gameRoom' + room).emit('usersDesconectados', gameRooms[room].users, 'gameRoom' + room);


            console.log('Usuario desconectado: ', usuarioDesconectado);
        }



    });


});
// io.emit('arrayUsers', usersConectados);

server.listen(5175, () => {
    console.log('Listening on http://localhost:5175');

});
