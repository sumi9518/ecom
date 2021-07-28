const express = require('express');

const router = express.Router();            //now router hae properties of router()


const {createOrUpdateUser} = require("../controllers/auth"); //importing from  controller


//route - take's the request eg /api and give response
router.get("/create-or-update-user",createOrUpdateUser ); //using imported controller


module.exports = router;