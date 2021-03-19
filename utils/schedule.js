const schedule = require('node-schedule');
const sourceCheck = require('./sourceCheck');

module.exports = async()=>{
    schedule.scheduleJob('0 0 * * 7', function(){
        sourceCheck();
    });
}