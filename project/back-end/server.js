//const { Server } = require("socket.io");

function makeServer (server){

    const io = require("socket.io")(server, { cors: {origin: "*"} })
    //const io = new Server(server)
    let chatRoom = ""
    io.on('connection', socket => {
        console.log("New user is connected...")
        
        socket.on("chat message", (msg, room) => {
            socket.to(room).emit("chat message", msg)
        })
        socket.on("join-room", room => {
            chatRoom = room
            socket.to(chatRoom).emit("chat message", "Your friend joined to the room")
            socket.join(chatRoom)
        })
        socket.on('disconnect', s =>{
            console.log("Your friend left the room.")
            io.to(chatRoom).emit("chat message","Your friend left the room.")
        })
    })
}

module.exports = { makeServer };