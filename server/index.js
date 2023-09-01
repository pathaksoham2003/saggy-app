const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3001;
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messageRoute");
const db = require("./db");
db();
const socket = require("socket.io");
const cors = require("cors");
app.use(express.json());
app.use(cors({origin:"*"}));

app.use("api/auth" , userRoutes);
app.use("api/messages" , messageRoute);

const server = app.listen(PORT , () =>{
    console.log(`server has started at port : ${PORT}`)
})

const io = socket(server, {
    cors: {
        origin: "https://saggy-app.vercel.app",
        methods: ["GET", "POST"],
        credentials: true
    }
});
global.onlineUsers = new Map();

io.on("connection" , (socket) =>{
    
    global.chatSocket = socket;
    socket.on("add-user" , (userId) =>{
        onlineUsers.set(userId,socket.id);
        console.log(global.onlineUsers);
    })
    socket.on("send-msg" , (data) =>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve" , data.messages);
        }
    })
})
