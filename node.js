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
var gameRooms = [];
var lastRoom = 0;
var gameStart = false

app.use(cors());
const server = createServer(app);

const usersConectados = [];

const objPreguntes = {};
const URL = "http://mathpotato.daw.inspedralbes.cat/tr2-multiplicat-dawtr2gmathpotato/Back/api-laravel/public/api/preguntes/random";

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

    console.log('Salas: ', io.sockets.adapter.rooms);

    socket.on('join', (data) => {

        if (gameRooms.length == 0) {
            gameRooms.push({ idRoom: lastRoom, roomName: "gameRoom" + lastRoom, users: [], started: false, preguntas: [], pregActual: 0, timer: 0, timerAnterior: 0 });
        } else {
            if (gameRooms[gameRooms.length - 1].users.length == 6 || gameRooms[gameRooms.length - 1].started === true) {
                lastRoom++;
                gameRooms.push({ idRoom: lastRoom, roomName: "gameRoom" + lastRoom, users: [], started: false, preguntas: [], pregActual: 0, timer: 0, timerAnterior: 0 });
            }
        }

        if (gameRooms[gameRooms.length - 1].users.length == 0) {
            // Si no hay usuarios conectados, se agrega el primer usuario a la sala
            gameRooms[gameRooms.length - 1].users.push({ username: data.username, id: socket.id, bomba: true, image: data.image, roomPosition: lastRoom, lives: 3 });
        } else {
            // Si ya hay usuarios, se agrega un nuevo usuario a la sala
            gameRooms[gameRooms.length - 1].users.push({ username: data.username, id: socket.id, bomba: false, image: data.image, roomPosition: lastRoom, lives: 3 });
        }
        socket.join("gameRoom" + lastRoom);
        console.log(gameRooms[gameRooms.length - 1].users);
        io.to("gameRoom" + lastRoom).emit('usersConnected', gameRooms[gameRooms.length - 1].users, gameRooms[gameRooms.length - 1].roomName);
        console.log('Salas: ', io.sockets.adapter.rooms);
    });


    socket.on('register', (userData) => {
        console.log(userData);
        fetch('http://mathpotato.daw.inspedralbes.cat/tr2-multiplicat-dawtr2gmathpotato/Back/api-laravel/public/api/register', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response) {
                if (gameRooms.length == 0) {
                    gameRooms.push({ idRoom: lastRoom, roomName: "gameRoom" + lastRoom, users: [], started: false, preguntas: [], pregActual: 0, timer: 0, timerAnterior: 0 });
                } else {
                    if (gameRooms[gameRooms.length - 1].users.length == 6 || gameRooms[gameRooms.length - 1].started === true) {
                        lastRoom++;
                        gameRooms.push({ idRoom: lastRoom, roomName: "gameRoom" + lastRoom, users: [], started: false, preguntas: [], pregActual: 0, timer: 0, timerAnterior: 0 });
                    }
                }
                if (gameRooms[gameRooms.length - 1].users.length == 0) {
                    // Si no hay usuarios conectados, se agrega el primer usuario a la sala
                    gameRooms[gameRooms.length - 1].users.push({ username:userData.username, id: socket.id, bomba: true, image: "./assets/Icon_"+userData.foto_perfil+".png", roomPosition: lastRoom, lives: 3 });
                } else {
                    // Si ya hay usuarios, se agrega un nuevo usuario a la sala
                    gameRooms[gameRooms.length - 1].users.push({ username: userData.username, id: socket.id, bomba: false, image: "./assets/Icon_"+userData.foto_perfil+".png", roomPosition: lastRoom, lives: 3 });
                }
                socket.join("gameRoom" + lastRoom);
                console.log(gameRooms[gameRooms.length - 1].users);
                io.to("gameRoom" + lastRoom).emit('usersConnected', gameRooms[gameRooms.length - 1].users, gameRooms[gameRooms.length - 1].roomName);
                console.log('Salas: ', io.sockets.adapter.rooms);

                return response.json();
            } else {
                console.log(response);
                throw new Error('Network response was not ok.');
                
            }
        }).then(userData => {
            console.log("aaaaaaaaaaaaaaaaaaaaa");
            console.log(userData);
        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    });
    socket.on('login', async (data) => {
        console.log(data);
        await getUser(data);
    });
    async function getUser(data) {
        try {
            console.log("data to send...",data)
            const response = await fetch('http://mathpotato.daw.inspedralbes.cat/tr2-multiplicat-dawtr2gmathpotato/Back/api-laravel/public/api/login', {
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
                console.log(responseData)
                if (gameRooms.length == 0) {
                    gameRooms.push({ idRoom: lastRoom, roomName: "gameRoom" + lastRoom, users: [], started: false, preguntas: [], pregActual: 0, timer: 0, timerAnterior: 0 });
                } else {
                    if (gameRooms[gameRooms.length - 1].users.length == 6 || gameRooms[gameRooms.length - 1].started === true) {
                        lastRoom++;
                        gameRooms.push({ idRoom: lastRoom, roomName: "gameRoom" + lastRoom, users: [], started: false, preguntas: [], pregActual: 0, timer: 0, timerAnterior: 0 });
                    }
                }
                if (gameRooms[gameRooms.length - 1].users.length == 0) {
                    // Si no hay usuarios conectados, se agrega el primer usuario a la sala
                    gameRooms[gameRooms.length - 1].users.push({ username:responseData.username, id: socket.id, bomba: true, image: "./assets/Icon_"+responseData.foto_perfil+".png", roomPosition: lastRoom, lives: 3 });
                } else {
                    // Si ya hay usuarios, se agrega un nuevo usuario a la sala
                    gameRooms[gameRooms.length - 1].users.push({ username: responseData.username, id: socket.id, bomba: false, image: "./assets/Icon_"+responseData.foto_perfil+".png", roomPosition: lastRoom, lives: 3 });
                }
                socket.join("gameRoom" + lastRoom);
                console.log(gameRooms[gameRooms.length - 1].users);
                io.to("gameRoom" + lastRoom).emit('usersConnected', gameRooms[gameRooms.length - 1].users, gameRooms[gameRooms.length - 1].roomName);

                console.log('Salas: ', io.sockets.adapter.rooms);

                return responseData;
            } else {
                console.log(response);
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
    // socket.on('preguntes', () => {
    //     console.log('preguntasAleatorias', objPreguntes);
    //     io.emit('preguntas', objPreguntes);
    // });

    socket.on('startGame', (data) => {
        console.log("aaaaaaaaaaaaa " + data);
        gameRooms[data.roomPosition].started = true;
        if (gameRooms[data.roomPosition].users.length >= 3 && gameRooms[data.roomPosition].users.length <= 6) {
            console.log("startGame");
            getPreguntes(gameRooms[data.roomPosition]);
            iniciarTimer(data.roomPosition);
            startTimer(data.roomPosition);
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
                console.log(preguntas.preguntas);
                room.preguntas = preguntas.preguntas;

            }).then(() => {


                newPregunta(room);
            }
            );
    }


    function newPregunta(room) {
        console.log("pregunta actual: ", room.pregActual);
        io.to(room.roomName).emit('pregunta', { "id": room.preguntas[room.pregActual].id_pregunta, "pregunta": room.preguntas[room.pregActual].pregunta });
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
            if (socket.id == gameRooms[data.room].users[userWithBomb].id) {
                console.log("respuesta correcta");
                gameRooms[data.room].pregActual++;
                gameRooms[data.room].users[userWithBomb].bomba = false;

                console.log("user bomba: "+gameRooms[data.room].users[userWithBomb].bomba);
                if (userWithBomb == gameRooms[data.room].users.length - 1) {
                    gameRooms[data.room].users[0].bomba = true;
                    if (gameRooms[data.room].timerAnterior > 20) {
                        gameRooms[data.room].timerAnterior = gameRooms[data.room].timerAnterior - 5;
                    } else {
                        if (gameRooms[data.room].timerAnterior > 5) {
                            gameRooms[data.room].timerAnterior = gameRooms[data.room].timerAnterior - 2;
                        }
                    }
                } else {
                    gameRooms[data.room].users[userWithBomb + 1].bomba = true;
                }
                gameRooms[data.room].timer = gameRooms[data.room].timerAnterior;
                io.to("gameRoom" + data.room).emit('changeBomb', { "arrayUsers": gameRooms[data.room].users, "bombChange": true });
                
            } else {
                console.log("resposta correcta!");
                gameRooms[data.room].pregActual++;
                gameRooms[data.room].users[userWithBomb].bomba = true;
                gameRooms[data.room].timer -= 10;
                io.to("gameRoom" + data.room).emit('changeBomb', { "arrayUsers": gameRooms[data.room].users, "bombChange": true });
            }
        } else {
            if (gameRooms[data.room].users[userWithBomb].id == socket.id) {
                gameRooms[data.room].timer = gameRooms[data.room].timerAnterior;
                console.log("resposta incorrecta!");
                gameRooms[data.room].pregActual++;
                gameRooms[data.room].users[userWithBomb].bomba = true;
                gameRooms[data.room].users[userWithBomb].lives--;
                console.log("lives restantes -> " +gameRooms[data.room].users[userWithBomb].lives);

                if (gameRooms[data.room].users[userWithBomb].lives == 0) {
                    
                    if (userWithBomb == gameRooms[data.room].users.length - 1) {
                        gameRooms[data.room].users[0].bomba = true;
                    }
                    else {
                        gameRooms[data.room].users[userWithBomb + 1].bomba = true;
                    }
                    socket.leave(gameRooms[data.room].roomName);
                    socket.emit('userLost', gameRooms[data.room].users[userWithBomb]);
                    gameRooms[data.room].users.splice(userWithBomb, 1);
                    if (gameRooms[data.room].users.length == 1) {
                        io.to("gameRoom" + data.room).emit('gameOver', { "arrayUsers": gameRooms[data.room].users, "bombChange": true });
                    }
                }
                io.to("gameRoom" + data.room).emit('changeBomb', { "arrayUsers": gameRooms[data.room].users, "bombChange": true });
            } else {
                console.log("resposta incorrecta!");
                gameRooms[data.room].pregActual++;
                gameRooms[data.room].users[userWithBomb].bomba = false;

                console.log(gameRooms[data.room].users[userWithBomb].bomba);
                let userBombN = gameRooms[data.room].users.findIndex(user => user.id === socket.id);
                gameRooms[data.room].users[userBombN].bomba = true;
                io.to("gameRoom" + data.room).emit('changeBomb', { "arrayUsers": gameRooms[data.room].users, "bombChange": true });
            }
        }
        newPregunta(gameRooms[data.room]);
        
    });

    function iniciarTimer(roomPosition) {
        const size = gameRooms[roomPosition].users.length;

        switch (size) {
            case 3:
                gameRooms[roomPosition].timer = 31;
                break;
            case 4:
                gameRooms[roomPosition].timer = 36;
                break;
            case 5:
            case 6:
                gameRooms[roomPosition].timer = 41;
                break;
            default:
                gameRooms[roomPosition].timer = 0;
                break;
        }
        gameRooms[roomPosition].timerAnterior =  gameRooms[roomPosition].timer;
    }

    function startTimer(roomPosition) {
        if (gameRooms[roomPosition].timer > 0) {
            setTimeout(() => {
                gameRooms[roomPosition].timer--;
                io.to(gameRooms[roomPosition].roomName).emit('timer', gameRooms[roomPosition].timer);
                console.log("tiempo --> ", gameRooms[roomPosition].timer);
                
                
                if(gameRooms[roomPosition].users.length==1){
                    // console.log("game finished!!!!!!!!!");
                    // gameRooms[roomPosition].timer=0;
                    gameRooms[roomPosition].gameStarted=false;
                    gameRooms[roomPosition].timer = 0;
                    io.to(gameRooms[roomPosition].roomName).emit('finishGame', ({ gameStarted: false, timer: 0, username: gameRooms[roomPosition].users[0].username, image: gameRooms[roomPosition].users[0].image}));   
                }else{
                    startTimer(roomPosition);
                }
            }, 1000);
        } else {

            console.log("timer acabado");
            gameRooms[roomPosition].timer = gameRooms[roomPosition].timerAnterior - 1;
            io.to(gameRooms[roomPosition].roomName).emit('timer', gameRooms[roomPosition].timer);
            let userWithBomb = getUserWithBomb(roomPosition);
            gameRooms[roomPosition].users[userWithBomb].lives--;
            if (gameRooms[roomPosition].users[userWithBomb].lives==0){
                if (userWithBomb == gameRooms[roomPosition].users.length - 1) {
                    gameRooms[roomPosition].users[0].bomba = true;
                }
                else {
                    gameRooms[roomPosition].users[userWithBomb + 1].bomba = true;
                }
                let my_socket = io.sockets.sockets.get(gameRooms[roomPosition].users[userWithBomb].id);
                my_socket.leave(gameRooms[roomPosition].roomName);
                my_socket.emit('userLost', gameRooms[roomPosition].users[userWithBomb]);
                gameRooms[roomPosition].users.splice(userWithBomb, 1);

                if (gameRooms[roomPosition].users.length == 1) {
                    gameRooms[roomPosition].gameStarted=false;
                    // gameRooms[roomPosition].lives=0;
                    gameRooms[roomPosition].timer = 0;
                    io.to(gameRooms[roomPosition].roomName).emit('finishGame', ({ gameStarted: false, timer: 0, username: gameRooms[roomPosition].users[0].username, image: gameRooms[roomPosition].users[0].image}));

                    // gameRooms[roomPosition].users[0].bomba = false;
                    
                    // console.log("game over");
                    // io.to(gameRooms[roomPosition].roomName).emit('gameOver', { "arrayUsers": gameRooms[roomPosition].users, "bombChange": true });
                } else{
                    startTimer(roomPosition);
                }
            }
            io.to(gameRooms[roomPosition].roomName).emit('changeBomb', { "arrayUsers": gameRooms[roomPosition].users, "bombChange": true });
            gameRooms[roomPosition].pregActual++;
            newPregunta(gameRooms[roomPosition]);
            
        }
    }
    

    socket.on('disconnect', () => {
        // let CambiaEsta=
        gameRooms.forEach(room => {
            let usuarioDesconectadoIndex = room.users.findIndex(user => user.id === socket.id);
            console.log(usuarioDesconectadoIndex);
            if (usuarioDesconectadoIndex !== -1) {
                if (room.users[usuarioDesconectadoIndex].bomba) {
                    if (usuarioDesconectadoIndex == room.users.length - 1) {
                        room.users[0].bomba = true;
                    } else {
                        room.users[usuarioDesconectadoIndex + 1].bomba = true;
                    }
                }
                let usuarioDesconectado = room.users.splice(usuarioDesconectadoIndex, 1);
                socket.leave(room.roomName);
                io.to(room.roomName).emit('usersDesconectados', room.users, room.roomName);
                console.log('Usuario desconectado: ', usuarioDesconectado);

            }
        });

    });

    socket.on('login', (data) => {
        console.log(data);
    });

});
// io.emit('arrayUsers', usersConectados);

server.listen(3169, () => {
    console.log('Listening on http://localhost:3169');

});
