const express = require('express');
const app = express();
const server = require("http").Server(app);
const io = require('socket.io')(server);
const fs = require('fs');
const { Socket } = require('socket.io');
var mysql = require('mysql');
var usersConectados = [];

const objPreguntes = {};

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Potato"
});

con.connect(function(err){
    if (err) throw err;
    con.query("SELECT * FROM preguntas", function (err, pregunta) {
        if (err) throw err;

        for (let i = 0; i < pregunta.length; i++) {

            console.log("La pregunta es: ", pregunta[i].pregunta);           
            const resultatPregunta = eval(pregunta[i].pregunta);
            console.log("--> ", resultatPregunta);
            
            objPreguntes[i] = {
                id: pregunta[i].id_pregunta,
                pregunta: pregunta[i].pregunta,
            };
        }
        io.emit('preguntas', objPreguntes);
        
        console.log('Objeto con las preguntas y sus resultados:', objPreguntes);
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
    socket.emit("username");
});

server.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
});
