
import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
app.use(cors());

let usersConnected = [];
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../../index.html'));
});

io.on('connection', (socket) => {
    console.log('User Connected');
    console.log(socket.id);

    socket.broadcast.emit('hi');

    socket.on('join', (data) => {
        usersConnected.push({username:data, id:socket.id});
        console.log(data);
        socket.broadcast.emit('nuevosUsuario', usersConnected);
    });

    socket.on('disconnect', () => {
        const disconnectedUser = usersConnected.find(user=> user.id === socket.id);
        // console.log(socket);
        console.log(usersConnected);
        console.log(disconnectedUser);
        
        if (disconnectedUser) {
            usersConnected.splice(usersConnected.indexOf(disconnectedUser), 1);
            io.emit('arrayUsers', usersConnected);
        }
        console.log('User Disconnected');

        // Perform any necessary cleanup or handling here
    });
});


server.listen(5175, () => {
    console.log('listening on *:5175');
});