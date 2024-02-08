const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const app = express()
const UserRoutes = require('./routes/UserRoutes')
const cors = require('cors')
const server_port = 3004

app.use(express.json())
app.use(cors())
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

app.listen(server_port, () => {
    console.log(`server running at http://localhost:${server_port}`)
})