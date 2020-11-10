const express = require("express")
const bodyParser = require("body-parser")

const {mongoose} = require("./server.js")
var userController = require("./controllers/usercontroller.js")
var recipeController = require("./controllers/recipecontroller.js")
const path = require('path')

var app = express();
app.use(bodyParser.json({ limit: "50mb" }))
app.use(express.static(path.join(__dirname, "dist/varun")))
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("started at port" + port)
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'GET,POST,OPTIONS,DELETE,PUT');
    next();
  });

app.use("/users", userController)
app.use("/recipe", recipeController)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/varun/index.html'));
});