const mongoose = require("mongoose")
require('dotenv').config()

mongoose.connect("mongodb+srv://varunbalusu:"+process.env.PASS+"@cluster0.sxey7.mongodb.net/CrudDB?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true  }, (err) => {
    if(!err){
        console.log("success")
    }
    else{
        console.log(JSON.stringify(err, undefined, 2))
    }
})

module.exports=mongoose
