'use strict';

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3030;
require('./config/config')(app);
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

// if (cluster.isMaster) {
//     console.log(`Master ${process.pid} is running`);
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }
//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`worker ${worker.process.pid} died`);
//     });
// }

let messages = [];
io.on('connection', function(socket) {
    console.log('Client Connected');
    socket.on('join', (data) => {
        console.log('DATA - ');
        socket.join(data.room);

        console.log(data.user + 'joined');

        socket.broadcast.to(data.room).emit('joined', {
            user: data.user,
            msg: 'joined the room'
        });

    });

    socket.on('leave', (data) => {
        console.log(data.user + ' Left the room');
        socket.broadcast.to(data.room).emit('left', {
            user: data.user,
            msg: 'left the room'
        });
        socket.leave(data.room);
    });

    socket.on('message', (data) => {
        io.in(data.room).emit('newMessage', {
            user: data.user,
            msg: data.chatMsg
        });
    })

    socket.on('disconnect', (data) => {
        console.log('user Disconnected');
    })
});
const morganLog = require('./morgan-logger/morgan-log')(app);
const db = require('./db/db-connnect')(app);
const route = require('./routes/routes')(app);

app.use(express.static('public'));
app.use('/lib', express.static('node_modules'));


server.listen(port, () => {
    console.log(`Server started Listening at ${port}`);
});