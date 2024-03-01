const http = require("http");
const app = require("./app");
const port = process.env.PORT || 5000;
const { Server } = require("socket.io");

const server = http.createServer(app);
server.listen(port,() => {
    console.log(`Delivary Management Backend API started on port no.: ${port}`);
});

const MesagesModel = require("./models/Messagesmodel");

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
});

global.onlineUsers = new Map();

function getByValue(map, searchValue) {
    for (let [key, value] of map.entries()) {
      if (value === searchValue)
        return key;
    }
}

io.on("connection", (socket) => {
    console.log("connect", global.onlineUsers);
    socket.on("add-user", (userId) => {
        console.log("add", global.onlineUsers);
        global.onlineUsers.set(userId, socket.id);
        const arr = Array.from(global.onlineUsers, ([name, value]) => ({ name, value }));
        io.emit("users", arr);
    });
    socket.on("send-msg", async ({ message, from, to }) => {
        const msg = await MesagesModel.create({
            message,
            from,
            to,
            members: JSON.stringify([from, to])
        });
        const socketId = global.onlineUsers.get(to);
        if(socketId){
            socket.to(socketId).emit("receive-msg", msg);
        }
    })
    socket.on("disconnect", () => {
        const userId = getByValue(global.onlineUsers, socket.id);
        console.log("disconnect", global.onlineUsers);
        global.onlineUsers.delete(userId);
        const arr = Array.from(global.onlineUsers, ([name, value]) => ({ name, value }));
        io.emit("users", arr);
    });
});