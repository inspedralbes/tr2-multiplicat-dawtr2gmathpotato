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

    //obtener informacion sobre las salas
    console.log('Salas: ', io.sockets.adapter.rooms);


    socket.on('join', (data) => {

        if (usersConectados.length == 0) {
            // Si no hay usuarios conectados, se agrega el primer usuario a la sala
            usersConectados.push({ username: data, id: socket.id, bomba: true, image: './src/assets/Icon_1.png' });
        } else {
            // Si ya hay usuarios, se agrega un nuevo usuario a la sala
            usersConectados.push({ username: data, id: socket.id, bomba: false, image: './src/assets/Icon_1.png' });
        }
    
        // Se obtiene información sobre las salas existentes
        const gameRooms = io.sockets.adapter.rooms;
        
        
        // Se calcula el total de usuarios en todas las salas de juego
        const totalUsersInGameRooms = Object.keys(gameRooms).reduce((total, room) => {
            if(room.startsWith('gameRoom')){
                return total + gameRooms[room].length;
            }
            return total;
        }, 0);
        console.log(totalUsersInGameRooms);
        
        
        // Si el total de usuarios en todas las salas es menor o igual a 6
        if(totalUsersInGameRooms <= 6){
            // Se obtiene o crea una sala disponible
            let availableGameRoom = getAvailableGameRoom();
            
            // Se hace que el socket se una a la sala
            socket.join(availableGameRoom);
    
            // Se emite a la sala actualizada con los usuarios conectados
            io.to(availableGameRoom).emit('usersConnected', usersConectados, availableGameRoom);
        } else {
            // Si hay más de 6 usuarios, se crea una nueva sala
            const newGameRoom = `gameRoom${Object.keys(gameRooms).filter(room => room.startsWith('gameRoom')).length + 1}`;
            
            // Se hace que el socket se una a la nueva sala
            socket.join(newGameRoom);
    
            // Se emite a la nueva sala actualizada con los usuarios conectados
            io.to(newGameRoom).emit('usersConnected', usersConectados, newGameRoom);
        }
    });

        
        // Función para obtener una sala disponible o crear una nueva
        function getAvailableGameRoom(){
            const gameRooms = io.sockets.adapter.rooms;

            // Se filtran las salas que comienzan con 'gameRoom' y tienen menos de 6 usuarios
            const availableGameRooms = Object.keys(gameRooms).filter(room => {
                return room.startsWith('gameRoom') && gameRooms[room].length < 6;
            });

            // Si hay una sala disponible, se devuelve la primera encontrada
            if(availableGameRooms.length > 0){
                console.log('Sala disponible: ', availableGameRooms[0]);
                return availableGameRooms[0];
            } else {
                const newRoom = `gameRoom${Object.keys(gameRooms).filter(room => room.startsWith('gameRoom')).length + 1}`;
                // Si no hay salas disponibles, se crea una nueva con un número incrementado
                console.log('Nueva sala: ', newRoom);
                return newRoom;
            }
        }
    

    

    // socket.on('gameRooms', (gameRoom) => {
    //     const gameRooms = [];
    //     gameRooms.push({ idRoom: 1, roomName: "gameRoom", users: usersConectados });
    //     gameRooms.push({ idRoom: 2, roomName: "gameRoom2", users: usersConectados });
        
    //     console.log(gameRooms);
    //     io.emit('gameRooms', gameRooms);
    // });

    socket.on('preguntes', () => {
        console.log('preguntasAleatorias', objPreguntes);
        io.emit('preguntas', objPreguntes);
    })


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
            console.log("respuesta correcta");
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
            io.emit('changeBomb', {"arrayUsers":usersConectados, "bombChange":true});
            newPregunta();
        } else {
            console.log("resposta incorrecta!");
            pregActual++;
            usersConectados[userBomba].bomba = true;
            io.emit('changeBomb', {"arrayUsers":usersConectados, "bombChange":false});
            newPregunta();

        }
    });

    socket.on('disconnect', () => {
        const usuarioDesconectadoIndex = usersConectados.findIndex(user => user.id === socket.id);

        console.log(usersConectados);
        console.log(usuarioDesconectadoIndex);

        if (usuarioDesconectadoIndex >= 0) {
            const usuarioDesconectado = usersConectados.splice(usersConectados.indexOf(usuarioDesconectadoIndex), 1)[0];

            if(socket.rooms.has('gameRoom')){
                socket.leave('gameRoom');
                broadcast.to('gameRoom').emit('usersDesconectados', usersConectados, 'gameRoom');
            
            }else if(socket.rooms.has('waitingRoom')){
                socket.leave('waitingRoom');
                broadcast.to('waitingRoom').emit('usersDesconectados', usersConectados);
            }
            console.log('Usuario desconectado: ', usuarioDesconectado);
    }
        
        
        
    });

    
    console.log('preguntasAleatorias', objPreguntes);
    // socket.emit("username");

    socket.emit('preguntas', objPreguntes[pregActual]); //Primera pregunta

});
// io.emit('arrayUsers', usersConectados);

server.listen(5175, () => {
    console.log('Listening on http://localhost:5175');

});
