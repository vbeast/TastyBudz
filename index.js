const express = require("express")
const bodyParser = require("body-parser")

const {mongoose} = require("./server.js")
var userController = require("./controllers/usercontroller.js")
var convertRecipe = require("./controllers/convertRecipe.js")
// var corejs = require('core-js')


var app = express();
app.use(bodyParser.json())

app.listen(3000, () => console.log("server started at port 3000"))

app.use(function(req, res, next) {
    console.log("inside")
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'GET,POST,OPTIONS,DELETE,PUT');
    next();
  });

app.use("/users", userController)

app.post("/convertRecipe", function(req, res){
	var url = req.body.url
	console.log(url)
	var unirest = require("unirest");
	var recipe = null

	var req = unirest("POST", "https://mycookbook-io1.p.rapidapi.com/recipes/rapidapi");

	req.headers({
		"x-rapidapi-host": "mycookbook-io1.p.rapidapi.com",
		"x-rapidapi-key": "f2210eec73msh358956628dc6ed7p1223a3jsn96139f0076d4",
		"content-type": "text/plain",
		"accept": "text/plain",
		"useQueryString": true
	});

	req.send(url);
	
	

	req.end(function (res) {
		//console.log(res.body)
		recipe = res.body
		console.log(recipe)
		//console.log(recipe)

	})



	console.log(recipe)

	return recipe
	
	//console.log(recipe)
	// console.log(recipe)
	
	// req.end(function (res) {
	// 	if (res.error) throw new Error(res.error);

	// 	console.log(res.body);
		
		
	// 	//return this data somehow!!
	// });

	// return recipe
	
	
})

//app.get("/users/:id/:name", function(req, res, next) {
//     console.log("ID: ", req.params.id, ", Name: ", req.params.name);
// })