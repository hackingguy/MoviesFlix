const sgMail = require('../config/sendgrid');

module.exports = async(msg)=>{
    try{
        await sgMail.send(msg)
        return true;
    }
    catch(err){
        return false;
    }
}