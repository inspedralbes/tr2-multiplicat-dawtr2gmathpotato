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


const  usersConectados = [];

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
    socket.on('disconnect', () => {
        io.emit('usersDesconectados', usersConectados);
    });

    console.log('preguntasAleatorias', objPreguntes);

        socket.emit("username");
    
        socket.emit('preguntas', objPreguntes);

});
        // io.emit('arrayUsers', usersConectados);
 
server.listen(5175, () => {
    console.log('Listening on http://localhost:5175');

});
