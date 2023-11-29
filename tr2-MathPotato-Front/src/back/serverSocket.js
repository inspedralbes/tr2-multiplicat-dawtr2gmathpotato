
import express from 'express';
import cors from 'cors';
import { createServer} from 'node:http';

import {Server} from 'socket.io';

const app = express();
app.use(cors());

let usersConnected=[];
const server = createServer(app);
const io = new Server(server,{
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../../index.html'));
});

io.on('connection', (socket) => {
   
    console.log('a user connected');
    console.log(socket.id);

    socket.broadcast.emit('hi');
    socket.on('join', (data) => {
        usersConnected.push(data);
        console.log(data);
        socket.broadcast.emit('nuevosUsuario', usersConnected);
    });
});

server.listen(5175, () => {
    console.log('Server listening on port 5175');
});