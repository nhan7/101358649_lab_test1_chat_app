const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const app = express()
const UserRoutes = require('./routes/UserRoutes')
const cors = require('cors')

const server_port = 3004

app.use(cors({
    origin: ["http://localhost:3004","http://localhost:3002", "http://localhost:3000"], 
    methods: ["GET", "POST"],
    credentials: true 
}))
app.use(express.json())

app.use(express.urlencoded())
const DB_CONNECTION_STRING = "mongodb+srv://dbUser:nguyenvan2W@cluster0.ujphzpd.mongodb.net/chat_app_db?retryWrites=true&w=majority"


mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser:true,
    useUnifiedTopology:true})
    .then(()=> console.log('MongoDB Connected'))
    .catch(err=>console.error('MongoDB connection error:', err))

app.use(session({
    secret: 'qwrijojwaorjjJRiwr72824j',
    resave:false,
    saveUninitialized: false,
    cookie:{
        maxAge: 3600000
    }
}))



app.use('/api/v1/user', UserRoutes)


const express_server = app.listen(server_port, () => {
    console.log(`server running at http://localhost:${server_port}`)
})
const ioServer = require('socket.io')(express_server)

ioServer.on('connection', (socket)=>{
    console.log(`New user connected : ${socket.id}`);
    socket.on('disconnect', ()=>{
        console.log('user disconnected')
    })
    socket.on('say_hello', (msg)=>{
        console.log(msg);
        // io.emit('welcome', msg);// broadcast to all
        socket.emit('welcome', msg)
    })
    socket.on('chat_message', (msg) =>{
        ioServer.emit('chat_message', msg);
    })
    //join a room
    socket.on('join_group', (room)=>{
        console.log(`user ${socket.id} joined room ${room}`)
        socket.join(room)
    })

    socket.on('group_message', (data)=>{
        console.log(`User ${socket.id} sent message to room ${data.group}`)
        ioServer.to(data.group).emit('group_message_client', data.message);
    })

    //leave a room
    socket.on('leave_group', (group)=>{
        socket.leave(group)
    })

    socket.broadcast.emit('chat_message', 'a new user has joined the chat')
})

