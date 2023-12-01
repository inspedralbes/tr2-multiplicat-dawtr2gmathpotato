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
        console.log("User connected.");
        console.log(socket.id);
        
        try {
            socket.on('join', (data) => {
                usersConectados.push({username:data, id:socket.id});
                console.log("esto"+data);
                io.emit('usersConnected', usersConectados);
                console.log(usersConectados);
                // io.to(socket.id).emit('redirect', '/waiting');

                // const appStore = useAppStore();
                // appStore.setGuestInfo(data, socket.id);
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

                if (usuarioDesconectadoIndex !== -1) {
                    usersConectados.splice(usuarioDesconectadoIndex, 1);

                    io.emit('usersDesconectados', usersConectados);
                    // io.to(socket.id).emit('redirect', '/');   

                }
                console.log('User Disconnected');
            });

        } catch (error) {
            console.error("Error ", error);
        }

    socket.emit("username");
});

server.listen(5175, () => {
    console.log('Listening on http://localhost:5175');
});
