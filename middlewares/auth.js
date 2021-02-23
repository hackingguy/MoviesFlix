const jwt = require('jsonwebtoken')

var auth = async(req,res,next)=>{
    try{
        //Authorization: Bearer <Auth Token>
        let token = req.headers.cookie.split("token=")[1].split(";")[0];
        let payload = jwt.verify(token,process.env.JWT_SECRET_TOKEN);
        let userID = payload._id;
        req.userID = userID;
        return next();
    }
    catch(err){
        return next();
    }
}

module.exports = auth;