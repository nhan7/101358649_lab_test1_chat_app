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



router.post('/login', async (req,res) =>{
    // const user = {
    //     username: req.body.username,
    //     password: req.body.password
    // }
    const {username, password} = req.body

    try{
        const user = await User.findOne({username})

        if(!user){
            return res.status(401).json({message: "username or password is incorrect"})
        }

        const isPasswordValid = await User.findOne({password})
        if(!isPasswordValid){
            return res.status(401).json({message:"password is incorrect"})
        }
        req.session.user = user;
        res.send('Login successful!')
    }catch(error){
        console.error("Login error:", error)
        res.status(500).json({message:"An error has occurred"})
    }
    


})

module.exports = router