const express = require("express")
var router = express.Router();
const axios = require('axios')
require('dotenv').config()


router.post("/fetchRecipe", async(req, res) => {
    searchQuery = req.body.searchQuery
    axios.get("https://api.edamam.com/search?q="+searchQuery+"&app_id="+process.env.APP_ID+"&app_key="+process.env.APP_KEY+ "&from=0&to=100&calories=591-722&health=alcohol-free")
    .then((result)=>{
        return res.status(200).json({recipies: result.data})
    })
    .catch((err)=>{
        return res.status(500).json({message: "Request Failed"})
    })
})


module.exports = router;