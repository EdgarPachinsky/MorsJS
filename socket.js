import express from "express";
import http from 'http'
import * as socketIO from 'socket.io'

const app = express();
const server = http.Server(app);
const io = new socketIO.Server(server,{cors: {origin: "http://localhost:7000" }});


const SOCKET_PORT = 4001;
let connectedUsersSockets = [];

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('connect-user', (data) => {
        if(data.userId)
            connectedUsersSockets[data.userId] = socket;

        io.emit("online-users-count", Object.keys(connectedUsersSockets).length);
        console.log(`connected users count -> ${Object.keys(connectedUsersSockets).length}`);
    });

    socket.on('message-out', (data) => {
        socket.broadcast.emit("message-in", data);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
        for (const key in connectedUsersSockets) {
            if(connectedUsersSockets[key].id === socket.id) {
                connectedUsersSockets[key].leaveAll();
                delete connectedUsersSockets[key];
                break;
            }
        }
        io.emit("online-users-count", Object.keys(connectedUsersSockets).length);
        console.log(`connected users count ${Object.keys(connectedUsersSockets).length}`);
    });
});

server.listen(SOCKET_PORT, () => {
    console.log(`Connecting to SOCKET - OK - : ${SOCKET_PORT}`);
});

function jsonParse(json) {
    return JSON.parse(json);
}