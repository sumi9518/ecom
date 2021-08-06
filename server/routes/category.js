const express = require('express');

const router = express.Router();            //routes then controllers


//middleware
const { authCheck, adminCheck } = require('../middlewares/auth');


//controller
const {
    create,
    read,
    update,
    remove,
    list,
    getSubs,
} = require("../controllers/category"); //importing from  controller



//route - take's the request eg /api and give response
router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list);
router.get("/category/:slug", read);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);
router.get("/category/subs/:_id", getSubs);


module.exports = router;