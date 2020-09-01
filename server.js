const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/CrudDB",{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true  }, (err) => {
    if(!err){
        console.log("success")
    }
    else{
        console.log(JSON.stringify(err, undefined, 2))
    }
})

module.exports=mongoose
