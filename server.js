const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('A guest connected:', socket.id);
socket.broadcast.emit('chat notification', 'A guest joined the chat.');

    socket.on('chat message', (message) => {
        io.emit('chat message', message);
    });

    socket.on('disconnect', () => {
    console.log('A guest disconnected:', socket.id);

    socket.broadcast.emit(
        'chat notification',
        'A guest left the chat.'
    );
});
});

server.listen(port, () => {
    console.log(`Yhoww server running at http://localhost:${port}`);
});
