const express = require("express");
const app = express();

const server = require("http").createServer(app);
const {Server} = require("socket.io");
const { addUser } = require("./utils/users");

const io = new Server(server);

// routes
app.get("/", (req ,res)=> {
    res.send(
        "This is WhiteBoard App official server By Dhruval"
    );
});

    let roomIdG,imgURLG;

io.on("connection", (socket)=>{
    socket.on("userJoined", (data) =>{
        const {name,userId,roomId,host,presenter } = data;
        roomIdG = roomId;
        socket.join(roomId);
        const users = addUser(data);
        socket.emit("userIsJoined",{success:true, users });
        // socket.emit("presenter", users);
        socket.broadcast.to(roomId).emit("allUsers", users);
        socket.broadcast.to(roomId).emit("whiteBoardDataResponse",{
            imgURL: imgURLG,
        })
    });
    socket.on('whiteboardData',(data)=>{
        imgURLG = data;
        socket.broadcast.to(roomIdG).emit("whiteBoardDataResponse",{
            imgURL: data,
        })
    });
});

const port = process.env.PORT || 5000;

server.listen(port,()=> console.log("server is running on http://localhost:5000"))