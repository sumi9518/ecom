const express = require('express');

const router = express.Router();            //routes then controllers


//middleware
const { authCheck, adminCheck } = require('../middlewares/auth');


//controller
const { create, read } = require("../controllers/product"); //importing from  controller


//route - take's the request eg /api and give response
router.post("/product", authCheck, adminCheck, create);
router.get("/products", read);



module.exports = router;