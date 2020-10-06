const express = require("express")
var router = express.Router();
//var ObjectId = require("mongoose").Types.ObjectId
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/auth');
const checkAuthUserType = require('../middleware/authUserType')
require('dotenv').config()
var { User } = require("../models/users");


router.get("/", checkAuth, checkAuthUserType, async(req, res) => {
    if(req.userInfo === null){
        return res.status(401).json({
            message:"auth failed"
        })
    }
    if(req.userInfo.userType === "0"){
        try{
            const allUsers = await User.find()
            return res.json(allUsers)

        }
        catch(err){

            return res.json({message: err})
        }
    }
    return res.status(401).json({
        message:"auth failed"
    })
})

router.post("/checkValid", checkAuth, async(req, res) => {
    return res.status(200).json({
        message: "success"
    })
})

router.post("/retrieveContent", checkAuth, async(req, res) => {
    if(req.userInfo == null) {
        return res.status(401).json({
            message: "auth failed"
        })
    }
    const desiredUser = await User.findOne({email: req.userInfo.email})

    if(desiredUser == null){
        return res.status(401).json({
            message: "auth failed"
        })
    }
    else{
        return res.status(200).json({
            recipies: desiredUser.recipies
        })
    }

    
})

router.post("/fetchById", async(req, res) => {

    const desiredUser = await User.findOne({email: req.body.email})

    if(desiredUser == null){
        return res.status(401).json({
            message: "Authorization Failed"
        })
    }
    else{
        bcrypt.compare(req.body.password, desiredUser.password, (err, result) => {
            if(err){
                return res.status(401).json({
                    message: "Authorization Failed"
                })
            }
            if(result){
               const token = jwt.sign({
                    email: desiredUser.email,
                    recipies: desiredUser.recipies,
                    userType: desiredUser.userType
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "10h"
                }
                )
                return res.status(200).json({
                    message: "Authorization Successful",
                    token: token
                })
            }
            return res.status(401).json({
                message: "Authorization Failed"
            })
        })

    }

    
})

router.post("/saveUser", async(req, res) => {
    var userExists = await User.exists({email: req.body.email})
    if(userExists){
        return res.status(409).json({
            message:"Email already in Use"

        })
    }
    else{
        bcrypt.hash(req.body.password, 10, (err, hash) =>{
            if (err){
                return res.status(500).json({
                    error: err
                });
            } 
            else{
                const newUser = new User({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: hash,
                    recipies: req.body.recipies,
                    userType: "1",
                });
                newUser
                .save()
                .then(result => {
                    console.log(result)
                    res.status(201).json({
                        message: 'User Created'
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        error: err
                    })
                })
            }                
        })
    }
})


router.put("/update", checkAuth, async (req, res)=> {
    
   try{
    updatedUser = await User.findOneAndUpdate({email: req.userInfo.email}, {$push: {recipies: req.body.recipies} }, {useFindAndModify: false} )
    return res.send(updatedUser)
   }
   catch(err){
        res.json({message: err})
   }
})

router.put("/deleteItem", checkAuth, async (req, res)=> {
   try{
    updatedUser = await User.findOneAndUpdate({email: req.userInfo.email}, {$pull: {recipies: req.body.recipies} }, {useFindAndModify: false} )
    res.send(updatedUser)
   }
   catch(err){
       res.json({message: err})
   }
})

router.delete("deleteUser/:email", checkAuth, async(req, res) => {
    try{
    const deleteUser = await User.remove({email: req.params.email})
    res.json(deleteUser)
    }
    catch(err){
        res.json({message: err})
    }
})



module.exports = router;