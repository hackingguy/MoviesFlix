let auth = async(req,res,next)=>{
    console.log("Authorization Successful!");
    next();
}

module.exports = auth;