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
});
app.get('/', (req, res) => {
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

    // socket.emit("username");
    socket.on('disconnect', () => {
        io.emit('usersDesconectados', usersConectados);
    });
});
server.listen(5175, () => {
    console.log('Listening on http://localhost:5175');
});
