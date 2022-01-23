const app  = require("express")();
const server = require("http").createServer(app);  
const cors = require("cors");

const io = require("socket.io")(server,{
    cors: {
        origin: "*",
        methods: ["POST","GET"]
    }
});

app.use(cors());

const PORT = process.env.PORT  || 5000;

app.get("/",(req,res)=>{
    res.send("server run"); 
}); 

io.on('connection',(socket)=>{
    console.log("someone connected")
    socket.emit('me', socket.id);

    socket.on('disconnet',()=>{
        socket.broadcast.emit("callended");
        
    });

    socket.on("calluser",({userToCall, signalData,from,name})=>{

    });

});

server.listen(PORT,() => console.log("server listen port ${'PORT'}"));