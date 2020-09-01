const express = require("express")
var router = express.Router()
//var ObjectId = require("mongoose").Types.ObjectId

var { User } = require("../models/users")


router.get("/", async(req, res) => {

    try{
        const allUsers = await User.find()
        res.json(allUsers)

    }
    catch(err){

        res.json({message: err})
    }
})

router.get("/fetchById/:email", async(req, res) => {

    try{
        const desiredUser = await User.findOne({email: req.params.email})
        res.json(desiredUser)
        console.log(desiredUser)
        return desiredUser;

    }
    catch(err){

        res.json({message: err})
    }
})

router.post("/saveUser", async(req, res) => {
    console.log("in post")
    console.log(req.body.recipies)
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        recipies: req.body.recipies
    })
    console.log("firstname: ", newUser.firstname);
    try{
    const savedUser = await newUser.save()
    res.json(savedUser)
    }
    catch(err){
        res.json({message: err})
    }         
})

router.put("/update/:userId", async (req, res)=> {
    console.log("inside put in usercontroller")
    console.log(req.body)
    
   try{
    updatedUser = await User.findByIdAndUpdate(req.params.userId, {$push: {recipies: req.body} } )
    console.log(updatedUser)
    res.send(updatedUser)
   }
   catch(err){
       console.log(err)
   }
})

router.put("/deleteItem/:userId", async (req, res)=> {
    console.log("inside put/deleteItem in usercontroller")
    console.log(req.body)
    
   try{
    updatedUser = await User.findByIdAndUpdate(req.params.userId, {$pull: {recipies: req.body} } )
    console.log(updatedUser)
    res.send(updatedUser)
   }
   catch(err){
       console.log(err)
   }
})

router.delete("/:userId", async(req, res) => {
    try{
    const deleteUser = await User.remove({_id: req.params.userId})
    res.json(deleteUser)
    }
    catch(err){
        res.json({message: err})
    }
})



module.exports = router;