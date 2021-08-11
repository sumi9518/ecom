const express = require('express');

const router = express.Router();            //routes then controllers


//middleware
const { authCheck, adminCheck } = require('../middlewares/auth');


//controller
const { create, listAll, remove, read, update, list, productsCount } = require("../controllers/product"); //importing from  controller


//route - take's the request eg /api and give response

router.get('/products/abc', productsCount);

router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll);
router.delete("/product/:slug", authCheck, adminCheck, remove)
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);
router.post('/products', list);


module.exports = router;