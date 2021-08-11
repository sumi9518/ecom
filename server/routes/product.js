const express = require('express');

const router = express.Router();            //routes then controllers


//middleware
const { authCheck, adminCheck } = require('../middlewares/auth');


//controller
const { create, listAll, remove, read, update, list, productsCount } = require("../controllers/product"); //importing from  controller


//route - take's the request eg /api and give response

router.get('/products/abc', productsCount);
router.get("/product/:slug", read);
router.get("/products/:count", listAll);

router.post("/product", authCheck, adminCheck, create);
router.post('/products', list);

router.put("/product/:slug", authCheck, adminCheck, update);

router.delete("/product/:slug", authCheck, adminCheck, remove)

module.exports = router;