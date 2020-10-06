const mongoose = require("mongoose")

var User = mongoose.model("User", {
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String},
    password: {type: String},
    recipies: {type: []},
    userType: {type: String}

})

module.exports = {
    User
}