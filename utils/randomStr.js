var crypto = require("crypto");

module.exports = (len)=>{
    return crypto.randomBytes(len).toString('hex')
}