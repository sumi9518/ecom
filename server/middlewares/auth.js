const admin = require("../firebase");
//This function will check user token with firebase after login to app & based on result data will be inserted in DB

exports.authCheck = async (req, res, next) => {
    //console.log(req.headers); //token
    try{
        const firebaseUser = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken);              //header received from login is verified in model then sent to controllers
        console.log('firebase User in Authcheck', firebaseUser)
        req.user = firebaseUser; //to access in controllers
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({
            err:"Invalid or expired Token",
        });
    }

};