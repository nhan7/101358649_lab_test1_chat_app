const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/UserSchema')


router.post('/signup', (req,res) =>{
    const { username,firstName, lastName, password } = req.body
    if (!username || !firstName || !lastName || !password) {
        return res.status(400).json({message: "Missing required fields!"})
    }

    if(mongoose.connection.readyState){
            const user = new User({
                username,
                firstName,
                lastName,
                password
            })
            user.save().then(()=>{
                res.status(201).json({message:'user registered'});
            }).catch((err)=>{
                res.status(500).json({error:err})
            })
        
    }
})



router.post('/login', (req,res) =>{
    const user = {
        username: req.body.username,
        password: req.body.password
    }

    req.session.user = user;
    res.send('Login successful!')
})

module.exports = router