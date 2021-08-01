const admin = require("../firebase");
//This function will check user token with firebase after login to app & based on result data will be inserted in DB
const User = require("../models/user")

exports.authCheck = async (req, res, next) => {
    //console.log(req.headers); //token
    try {
        const firebaseUser = await admin
            .auth()
            .verifyIdToken(req.headers.authtoken);              //header received from login is verified in model then sent to controllers
        //console.log('firebase User in Authcheck', firebaseUser)
        req.user = firebaseUser; //to access in controllers
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            err: "Invalid or expired Token",
        });
    }

};

exports.adminCheck = async (req, res, next) => {            //gets data based on email & check if admin & pass to auth (routes)
    const { email } = req.user;
    const adminUser = await User.findOne({ email }).exec();
    if (adminUser.role !== 'admin') {
        res.status(403).json({
            err: "Admin Resource. Access Denied.",
        });
    } else {
        next();
    }
};
