import express from 'express';
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

const allUsers = [];
let chatRoom = ''

io.on('connection', socket => {
    console.log(`user connected ${socket.id}`)

    socket.on('join_room', data => {
        const {name, room} = data;
        chatRoom = room;
        allUsers.push({id: socket.id, name, room})
        const chatRoomUsers = allUsers.filter(user => user.room === room)
        socket.join(room);

        // sends all chat room users to all in room, except new user
        socket.to(room).emit('chatroom_users', chatRoomUsers);

        // sends all chat room users to new user
        socket.emit('chatroom_users', chatRoomUsers);

        // .to(room) sends message to all users in the room, except for new user
        socket.to(room).emit('receive_message', {
            message: `${name} has entered the chat`,
            username: 'ChatBot'
        })

        socket.emit('receive_message', {
            message: `${name} has entered the chat`,
            username: 'ChatBot'
        })
    })

    socket.on('points_chosen', data => {
        socket.to(data.room).emit('points_chosen', {
            message: data.message,
            username: data.username
        })
        socket.emit('points_chosen', {
            message: data.message,
            username: data.username
        })
    })
})

server.listen(3001, () => 'server is running on 3001');

//TODO: https://www.freecodecamp.org/news/build-a-realtime-chat-app-with-react-express-socketio-and-harperdb/#how-to-build-the-join-a-room-page