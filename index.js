const PORT = process.env.PORT || 3001

const path = require('path')
const express = require('express')

const app = express()

const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

app.use(express.static(path.join(__dirname, 'client', 'build')))

const users = new Set;

io.on('connect', socket => {
    const user = {
        id: socket.id,
        name: null,
        raisedHand: false,
        goFaster: false,
        isModerator: false
    }

    users.add(user);
    
    socket.on('disconnect', () => {
        users.delete(user)
        io.emit('update', Array.from(users).filter(u => u.name != null));
    })

    socket.on('update', data => {
        Object.assign(user, data)
        io.emit('update', Array.from(users).filter(u => u.name != null));
    })

    socket.on('broadcast', message => socket.broadcast.emit(message, user))
})

http.listen(PORT, () => {
    console.log(`App successfully started on port ${PORT}!`)
})
