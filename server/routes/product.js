const express = require('express');

const router = express.Router();            //routes then controllers


//middleware
const { authCheck, adminCheck } = require('../middlewares/auth');


//controller
const { create, listAll, listrelated, remove, read, update, list, productsCount, productStar } = require("../controllers/product"); //importing from  controller


//route - take's the request eg /api and give response

router.get('/products/abc', productsCount);
router.get("/product/:slug", read);
router.get("/products/:count", listAll);
router.get("/products/related/:productId", listrelated)

router.post("/product", authCheck, adminCheck, create);
router.post('/products', list);

router.put("/product/:slug", authCheck, adminCheck, update);

router.delete("/product/:slug", authCheck, adminCheck, remove)

//Rating

router.put("/product/star/:productId", authCheck, productStar);

module.exports = router;