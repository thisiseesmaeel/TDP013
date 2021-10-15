function makeChatServer (server){

    const io = require("socket.io")(server, { cors: {origin: "*"} })
    let userChatroom = new Map()
    io.on('connection', socket => {
        socket.on("join-room", room => {
            userChatroom.set(socket.id, room)
            socket.to(room).emit("chat message", "joined to the room")
            socket.join(room)
        })
        
        socket.on("chat message", (msg, room) => {
            socket.to(room).emit("chat message", msg)
        })
        
        socket.on('disconnect', () =>{
            let room = userChatroom.get(socket.id)
            userChatroom.delete(socket.id)
            socket.to(room).emit("chat message", "left the room.")
        })
    })
}

module.exports = { makeChatServer };