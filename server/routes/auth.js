const express = require('express');

const router = express.Router();            //now router hae properties of router()

//middleware
const {authCheck } = require('../middlewares/auth');

const mymiddleware = (req, res, next) =>{
    console.log("i am middleware / checking token");
    next();
}


//controller
const {createOrUpdateUser, currentUser} = require("../controllers/auth"); //importing from  controller


//route - take's the request eg /api and give response
router.post("/create-or-update-user",authCheck, createOrUpdateUser ); // when post api triggered auth func runs after success validatn create func runs if nit then error msg
router.post("/current-user",authCheck, currentUser );           //for safety its decided to make Post rather than Get

router.get("/test", mymiddleware , (req,res)=> {
    res.json({
        data:" you hit the middleware",
    });
});

module.exports = router;