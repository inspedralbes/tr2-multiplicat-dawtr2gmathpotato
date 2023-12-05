import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { join } from 'path';
import mysql from 'mysql';

// import fetch from 'node-fetch';
const app = express();

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

con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM preguntas", function (err, pregunta) {
        if (err) throw err;

        fetch(URL)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log('Datos obtenidos:', data);
                for (let i = 0; i < data.preguntas.length; i++) {
                    objPreguntes[i] = {
                        id: data.preguntas[i].id_pregunta,
                        pregunta: data.preguntas[i].pregunta,
                    };
                }

                io.emit('preguntasAleatorias', data);

                Object.keys(objPreguntes).forEach(key => {
                    console.log("La pregunta es: ", objPreguntes[key].pregunta);
                    const resultatPregunta = eval(objPreguntes[key].pregunta);
                    console.log("--> ", resultatPregunta);
                
                });
                for (let i = 0; i < pregunta.length; i++) {
                    if (pregunta[i].id_pregunta === objPreguntes[i].id) {
                        console.log(pregunta[i].id_pregunta, pregunta[i].pregunta);
                    }
                }
            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud fetch:', error);
            });
    });
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

    socket.emit('preguntas', objPreguntes);

});
// io.emit('arrayUsers', usersConectados);

server.listen(5175, () => {
    console.log('Listening on http://localhost:5175');

});
