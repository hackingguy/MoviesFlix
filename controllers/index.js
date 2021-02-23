exports.index = async(req,res) => {
    if(req.userID){
        return res.redirect('/home');
    }
    res.render('index');
}