const jwt = require('jsonwebtoken')

async(req,res,next)=>{
    try{
        //Authorization: Bearer <Auth Token>
        let token = req.headers.authorization;
        token = token.split(" ")[1];
        if(!token) return res.status(400).send({"error":"Access Token Missing"});
        let payload = jwt.verify(token,process.env.JWT_SECRET_KEY);
        let userID = payload._id;
        req.userID = userID;
    }
    catch{
        return res.status(400).send({"error":"Access Denied"})
    }
    next();
}

module.exports = auth;