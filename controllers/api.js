exports.apiController = (req,res)=>{
    var token = req.params.accessToken;
    if(!req.params.accessToken){
        res.send({"response":false,"error":"Token Needed"});
        return;
    }

    //Check Token Authentication
    var authorized = isAuthorized(token);

    if(authorized)
    {
        let data;
        //Routes
        //search on the basis of title
        //get top x results
        //get next x from the given token
        //get top x by genre and with skip attribute
        
        
        res.json({"response":true,"data":data});
    }
    else
    {
        res.json({"response":false,"error":"Token Not Valid"});
    }
}