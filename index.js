const express = require("express")
const bodyParser = require("body-parser")

const {mongoose} = require("./server.js")
var userController = require("./controllers/usercontroller.js")
var recipeController = require("./controllers/recipecontroller.js")
const { ConsoleReporter } = require("jasmine")
// var corejs = require('core-js')


var app = express();
app.use(bodyParser.json({ limit: "50mb" }))

app.listen(3000, () => console.log("server started at port 3000"))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'GET,POST,OPTIONS,DELETE,PUT');
    next();
  });

app.use("/users", userController)
app.use("/recipe", recipeController)

app.post("/convertRecipe", async (req, res) => {
	var http = require("https");
	var url = req.body.url.toString()
	console.log(url)
	

	var options = {
		"method": "POST",
		"hostname": "mycookbook-io1.p.rapidapi.com",
		"port": null,
		"path": "/recipes/rapidapi",
		"headers": {
			"x-rapidapi-host": "mycookbook-io1.p.rapidapi.com",
			"x-rapidapi-key": "f2210eec73msh358956628dc6ed7p1223a3jsn96139f0076d4",
			"content-type": "text/plain",
			"accept": "text/plain",
			"useQueryString": true
		}
	};

	var req = http.request(options, function (res) {
		var chunks = [];

		res.on("data", function (chunk) {
			chunks.push(chunk);
		});

		res.on("end", function () {
			var body = Buffer.concat(chunks);
			console.log(body.toString());
		});
	});

	console.log('hello')

	await req.write(url);

	console.log('pp')
	req.end();

})

//app.get("/users/:id/:name", function(req, res, next) {
//     console.log("ID: ", req.params.id, ", Name: ", req.params.name);
// })