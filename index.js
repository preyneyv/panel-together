const path = require('path')
const express = require('express')
const socket = require('socket.io')
const http = require('http')

const app = express()
const port = process.env.PORT || 3001

app.get('/', express.static(path.join(__dirname, 'client', 'build')))
const server = http.createServer(app)
const io = socket(server)

// in-instance data. not best but works.
const users = {}
const rooms = {}

io.on('connection', socket => {
    const user = users[socket.id] = {
        socket,
        joined: false, // would be room id
        name: null,
        raisedHand: false,
    }

    socket.on('disconnect', () => {
        leaveRoom(true)
        user[socket.id] = undefined;
    })

    socket.on('joinRoom', (roomId, name) => {
        if (user.joined)
            leaveRoom()
        
        user.name = name
        user.joined = roomId;
        // if room doesn't exist, this user is a moderator
        if (rooms[roomId]) {
            // already exists, join as user
            rooms[roomId].users.push(user)
        } else {
            // new room, join as mod
            rooms[roomId] = {
                users: [],
                moderators: [ user ]
            }
        }
    })

    const leaveRoom = (ignoreError = false) => {
        const roomId = user.joined
        if (!roomId) {
            if (ignoreError)
                return
            else
                throw "Tried to leave a room without joining any!"
        }
        rooms[roomId].users = rooms[roomId].users.filter(u => u != user)
        rooms[roomId].moderators = rooms[roomId].moderators.filter(u => u != user)
        io.to(roomId).emit('updateRoom', rooms[roomId])
        
        if (rooms[roomId].moderators.length == 0) {
            // TODO: everything.
        }
    }

    socket.on('leaveRoom', leaveRoom)


    socket.on('promote', () => {

    })

})

app.listen(port, () => {
    console.log(`App successfully started on port ${port}!`)
})
