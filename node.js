import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
const app = express();

app.use(cors());

var usersConectados = [];
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../../../index.html'));
});

io.on('connection', (socket) => {
        console.log("User connected.");
        console.log(socket.id);
        if (usersConectados.length > 0) {
            io.emit('nuevosUsuario', usersConectados);
            console.log("hi");
        }

        try {

            socket.on('join', (data) => {
                usersConectados.push({username:data, id:socket.id});
                console.log(data);
                io.emit('nuevosUsuario', usersConectados);
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

                    io.emit('arrayUsers', usersConectados);

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
